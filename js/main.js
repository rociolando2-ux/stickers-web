/* ============================================================================
   STICK YOUR LIFE — Interactividad
   Lee el contenido de js/data.js (objeto global `SYL`) y arma la página.
   ========================================================================== */
(function () {
  "use strict";

  const cfg = SYL.config;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ----------------------------- Helpers ------------------------------- */
  const money = (n) => cfg.currency + Number(n).toLocaleString("es-AR");

  const igLink = () => `https://instagram.com/${cfg.instagram}`;

  /* WhatsApp: el número va OFUSCADO (base64, en partes) en data.js y nunca se
     escribe en el HTML. Se reconstruye y se abre SOLO cuando el visitante hace
     click, así los bots/scrapers no pueden levantarlo del código de la página. */
  const waNumber = () => (cfg.waEnc || []).map((p) => atob(p)).join("");
  const waUrl = (text) =>
    "https://wa.me/" + waNumber() + (text ? "?text=" + encodeURIComponent(text) : "");
  const openWa = (text) => window.open(waUrl(text), "_blank", "noopener");
  const onWaClick = (text) => (e) => {
    e.preventDefault();
    openWa(typeof text === "function" ? text() : text);
  };

  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* Fondos pastel rotativos para thumbs/galería */
  const PASTELS = [
    "var(--pink-soft)", "var(--lilac-soft)", "var(--peach-soft)",
    "#d7f3e6", "var(--sky)", "#fff6c9",
  ];
  const pastel = (i) => PASTELS[i % PASTELS.length];

  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /* ----------------------------- Textos del hero ----------------------- */
  $("#heroTagline").textContent = cfg.tagline;
  $("#heroSubtitle").textContent = cfg.subtitle;

  /* ----------------------------- Beneficios (marquee) ------------------ */
  (function renderPerks() {
    const track = $("#perksTrack");
    const make = () =>
      SYL.perks
        .map((p) => `<span class="perk"><span class="perk-icon">${p.icon}</span>${p.text}</span>`)
        .join("");
    track.innerHTML = make() + make();
  })();

  /* ----------------------------- Catálogo ------------------------------ */
  let activeCat = "todos";

  function renderFilters() {
    const wrap = $("#filters");
    wrap.innerHTML = "";
    SYL.categories.forEach((c) => {
      const b = el("button", "filter-chip" + (c.id === activeCat ? " active" : ""));
      b.innerHTML = `${c.icon || ""} ${c.label}`;
      b.setAttribute("role", "tab");
      b.addEventListener("click", () => {
        activeCat = c.id;
        renderFilters();
        renderCatalog();
      });
      wrap.appendChild(b);
    });
  }

  function renderCatalog() {
    const grid = $("#catalogGrid");
    grid.innerHTML = "";
    const items = SYL.products.filter(
      (p) => activeCat === "todos" || p.cat === activeCat
    );

    if (!items.length) {
      grid.appendChild(el("p", "empty-msg", "Pronto vas a ver más diseños acá ✨"));
      return;
    }

    items.forEach((p, i) => {
      const card = el("article", "product");
      card.style.animationDelay = i * 0.05 + "s";

      const thumb = el("div", "product-thumb");
      thumb.style.background = pastel(i);
      thumb.innerHTML = p.img
        ? `<img src="${p.img}" alt="${p.name}" loading="lazy">`
        : `<span class="emoji die-cut">${p.emoji || "✨"}</span>`;

      const priceTxt = (p.from ? `<small>desde </small>` : "") + money(p.price);

      card.innerHTML =
        (p.badge ? `<span class="badge">${p.badge}</span>` : "") +
        `<div class="product-name">${p.name}</div>` +
        `<div class="product-price">${priceTxt}</div>`;
      card.prepend(thumb);

      const msg =
        `¡Hola Stick Your Life! 👋 Quiero pedir este sticker:\n` +
        `• ${p.name} — ${money(p.price)}\n\n¿Cómo seguimos? 🙂`;
      const btn = el("a", "btn btn-whatsapp");
      btn.href = "#";
      btn.setAttribute("role", "button");
      btn.textContent = "Pedir";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        burst(e.clientX, e.clientY);
        openWa(msg);
      });
      card.appendChild(btn);

      grid.appendChild(card);
    });
  }

  /* ----------------------------- Armá tu pedido (estado + chips) ------- */
  const order = { tipo: "", cantidad: "", tamano: "", idea: "", nombre: "" };

  function chipPicker(containerId, values, labelOf, key, onPick) {
    const wrap = $(containerId);
    wrap.innerHTML = "";
    values.forEach((v) => {
      const b = el("button", "chip");
      b.type = "button";
      b.innerHTML = labelOf(v);
      b.addEventListener("click", () => {
        order[key] = typeof v === "string" ? v : v.label;
        $$(".chip", wrap).forEach((c) => c.classList.remove("active"));
        b.classList.add("active");
        updatePreview();
        if (onPick) onPick();
      });
      wrap.appendChild(b);
    });
  }

  function buildOrderMessage() {
    const lines = ["¡Hola Stick Your Life! 👋 Quiero armar un sticker personalizado:"];
    if (order.tipo) lines.push(`• Tipo: ${order.tipo}`);
    if (order.cantidad) lines.push(`• Cantidad: ${order.cantidad}`);
    if (order.tamano) lines.push(`• Tamaño: ${order.tamano}`);
    if (order.idea) lines.push(`• Idea: ${order.idea}`);
    if (order.nombre) lines.push(`\nSoy ${order.nombre} 🙂`);
    return lines.join("\n");
  }

  function updatePreview() {
    order.idea = $("#idea").value.trim();
    order.nombre = $("#nombre").value.trim();
    const hasAny = order.tipo || order.cantidad || order.tamano || order.idea;
    $("#customPreview").textContent = hasAny
      ? buildOrderMessage()
      : "Elegí las opciones y te armamos el mensaje ✨";
  }

  /* ----------------------------- Wizard (paso a paso) ------------------
     Cada paso se completa antes de poder avanzar al siguiente. */
  (function initWizard() {
    const stepsWrap = $("#wizardSteps");
    if (!stepsWrap) return;
    const steps = $$(".wizard-step", stepsWrap);
    const total = steps.length;
    let cur = 0;

    const back = $("#wizardBack");
    const next = $("#wizardNext");
    const send = $("#wizardSend");
    const barFill = $("#wizardBarFill");
    const numEl = $("#wizardStepNum");
    const totEl = $("#wizardStepTotal");
    if (totEl) totEl.textContent = total;

    const refresh = () => updateWizard();

    chipPicker("#tipoChips", SYL.custom.tipos, (t) => `${t.icon} ${t.label}`, "tipo", refresh);
    chipPicker("#cantidadChips", SYL.custom.cantidades, (t) => t, "cantidad", refresh);
    chipPicker("#tamanoChips", SYL.custom.tamanos, (t) => t, "tamano", refresh);

    const valueFor = (key) => {
      if (key === "idea") return $("#idea").value.trim();
      if (key === "nombre") return $("#nombre").value.trim();
      return order[key];
    };
    const stepValid = (i) => Boolean(valueFor(steps[i].dataset.required));

    function updateWizard() {
      steps.forEach((s, i) => s.classList.toggle("is-active", i === cur));
      if (numEl) numEl.textContent = cur + 1;
      if (barFill) barFill.style.width = ((cur + 1) / total) * 100 + "%";
      back.hidden = cur === 0;
      const last = cur === total - 1;
      next.hidden = last;
      send.hidden = !last;
      const ok = stepValid(cur);
      next.disabled = !ok;
      send.disabled = !ok;
      if (last) updatePreview();
    }

    next.addEventListener("click", () => {
      if (stepValid(cur) && cur < total - 1) { cur++; updateWizard(); }
    });
    back.addEventListener("click", () => {
      if (cur > 0) { cur--; updateWizard(); }
    });

    $("#idea").addEventListener("input", () => { updatePreview(); updateWizard(); });
    $("#nombre").addEventListener("input", () => { updatePreview(); updateWizard(); });

    $("#customForm").addEventListener("submit", (e) => {
      e.preventDefault();
      if (!stepValid(cur)) return;
      updatePreview();
      burst(window.innerWidth / 2, window.innerHeight * 0.6);
      openWa(buildOrderMessage());
    });

    updateWizard();
  })();

  /* ----------------------------- Visor (reels + galería) --------------- */
  const media = [];   // {type:'video'|'img', src} en orden, para el visor
  let lbIndex = 0;

  const mutedIcon = (muted) =>
    muted
      ? '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M4 9v6h4l5 5V4L8 9H4z"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 9l5 6M21 9l-5 6"/></svg>'
      : '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M4 9v6h4l5 5V4L8 9H4z"/><path fill="currentColor" d="M14.5 8a4 4 0 0 1 0 8v-1.8a2.2 2.2 0 0 0 0-4.4V8z"/></svg>';

  /* Reproduce los videos (en silencio) cuando están a la vista y los pausa
     al salir, para que arranquen solos sin gastar datos de más. */
  function observePlay(vids) {
    if (!vids.length) return;
    if (!("IntersectionObserver" in window)) {
      vids.forEach((v) => v.play && v.play().catch(() => {}));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.play && en.target.play().catch(() => {});
          else en.target.pause && en.target.pause();
        });
      },
      { threshold: 0.35 }
    );
    vids.forEach((v) => io.observe(v));
  }

  /* ----------------------------- Reels --------------------------------- */
  (function renderReels() {
    const grid = $("#reelsGrid");
    if (!grid) return;
    (SYL.reels || []).forEach((r) => {
      const card = el("div", "reel-card");
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Ver reel en grande");

      const v = el("video");
      v.src = r.video;
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      v.setAttribute("muted", "");
      v.preload = "metadata";
      v.tabIndex = -1;
      if (r.poster) v.poster = r.poster;
      card.appendChild(v);

      card.insertAdjacentHTML("beforeend", '<span class="reel-badge">🎬 Reel</span>');

      const mute = el("button", "reel-mute");
      mute.type = "button";
      mute.setAttribute("aria-label", "Activar sonido");
      mute.innerHTML = mutedIcon(true);
      mute.addEventListener("click", (e) => {
        e.stopPropagation();
        v.muted = !v.muted;
        mute.innerHTML = mutedIcon(v.muted);
        mute.setAttribute("aria-label", v.muted ? "Activar sonido" : "Silenciar");
        if (!v.muted) v.play && v.play().catch(() => {});
      });
      card.appendChild(mute);

      const idx = media.length;
      media.push({ type: "video", src: r.video });
      const open = () => openLightbox(idx);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });

      grid.appendChild(card);
    });

    observePlay($$("#reelsGrid video"));
  })();

  /* ----------------------------- Galería (fotos) ----------------------- */
  (function renderGallery() {
    const grid = $("#galleryGrid");
    if (!grid) return;
    SYL.gallery.forEach((g, i) => {
      const item = el("div", "gallery-item");
      item.style.background = pastel(i + 2);

      const src = g && typeof g === "object" ? g.img : null;
      if (src) {
        item.innerHTML = `<img src="${src}" alt="Sticker de Stick Your Life" loading="lazy">`;
        const idx = media.length;
        media.push({ type: "img", src });
        item.tabIndex = 0;
        item.setAttribute("role", "button");
        item.setAttribute("aria-label", "Ver foto en grande");
        const open = () => openLightbox(idx);
        item.addEventListener("click", open);
        item.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
        });
      } else {
        item.innerHTML = `<span class="die-cut">${typeof g === "string" ? g : (g && g.emoji) || "✨"}</span>`;
      }

      grid.appendChild(item);
    });
  })();

  /* ----------------------------- Visor / lightbox ---------------------- */
  function lbRender() {
    const stage = $("#lightboxStage");
    const m = media[lbIndex];
    stage.innerHTML = "";
    if (!m) return;
    if (m.type === "video") {
      const v = el("video");
      v.src = m.src;
      v.controls = true;
      v.autoplay = true;
      v.loop = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      stage.appendChild(v);
      v.play && v.play().catch(() => {});
    } else {
      const img = el("img");
      img.src = m.src;
      img.alt = "Sticker de Stick Your Life";
      stage.appendChild(img);
    }
  }

  function openLightbox(i) {
    if (!media.length) return;
    lbIndex = i;
    lbRender();
    $("#lightbox").classList.add("open");
    document.body.classList.add("no-scroll");
    $("#lightboxClose").focus();
  }

  function closeLightbox() {
    const lb = $("#lightbox");
    if (!lb.classList.contains("open")) return;
    lb.classList.remove("open");
    document.body.classList.remove("no-scroll");
    const clear = () => { $("#lightboxStage").innerHTML = ""; }; // detiene el video
    const done = () => { clear(); lb.removeEventListener("transitionend", done); };
    lb.addEventListener("transitionend", done);
    setTimeout(() => { if (!lb.classList.contains("open")) clear(); }, 350);
  }

  function lbStep(dir) {
    if (!media.length) return;
    lbIndex = (lbIndex + dir + media.length) % media.length;
    lbRender();
  }

  (function initLightbox() {
    const lb = $("#lightbox");
    if (!lb) return;
    $("#lightboxClose").addEventListener("click", closeLightbox);
    $("#lightboxPrev").addEventListener("click", () => lbStep(-1));
    $("#lightboxNext").addEventListener("click", () => lbStep(1));
    lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") lbStep(-1);
      else if (e.key === "ArrowRight") lbStep(1);
    });
  })();

  /* ----------------------------- Mini-juego (drag a la silueta) -------- */
  (function initGame() {
    const targetsEl = $("#gameTargets");
    const trayEl = $("#gameTray");
    const statusEl = $("#gameStatus");
    const resetBtn = $("#gameReset");
    const gameEl = $("#game");
    if (!targetsEl || !trayEl || !gameEl) return;

    const pieces = (SYL.game && SYL.game.pieces) || [];
    const total = pieces.length;
    let solved = 0;

    function setStatus() {
      if (solved === total && total > 0) {
        statusEl.textContent = "¡Los ubicaste todos! 🎉";
        statusEl.classList.add("win");
        gameEl.classList.add("done");
        const r = gameEl.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + Math.min(r.height / 2, 220));
      } else {
        statusEl.textContent = `${solved} de ${total} ubicados`;
        statusEl.classList.remove("win");
        gameEl.classList.remove("done");
      }
    }

    const slots = () => $$(".game-slot", targetsEl);
    const clearOver = () => slots().forEach((s) => s.classList.remove("over"));

    function slotUnderPoint(x, y) {
      return slots().find((s) => {
        if (s.classList.contains("solved")) return false;
        const r = s.getBoundingClientRect();
        return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      });
    }

    function place(piece, slot) {
      const p = pieces.find((x) => x.id === piece.dataset.id);
      slot.classList.add("solved");
      slot.classList.remove("over");
      slot.insertAdjacentHTML("beforeend", `<img class="placed" src="${p.img}" alt="${p.label}">`);
      piece.classList.add("dropped");
      piece.removeAttribute("style");
      solved++;
      setStatus();
    }

    function attachDrag(piece) {
      let dragging = false, ox = 0, oy = 0;
      const move = (e) => {
        if (!dragging) return;
        piece.style.left = e.clientX - ox + "px";
        piece.style.top = e.clientY - oy + "px";
        clearOver();
        const s = slotUnderPoint(e.clientX, e.clientY);
        if (s) s.classList.add("over");
      };
      const up = (e) => {
        if (!dragging) return;
        dragging = false;
        piece.classList.remove("dragging");
        try { piece.releasePointerCapture(e.pointerId); } catch (_) {}
        piece.removeEventListener("pointermove", move);
        piece.removeEventListener("pointerup", up);
        piece.removeEventListener("pointercancel", up);
        const s = slotUnderPoint(e.clientX, e.clientY);
        clearOver();
        if (s && s.dataset.id === piece.dataset.id) place(piece, s);
        else piece.removeAttribute("style"); // vuelve a la bandeja
      };
      const down = (e) => {
        if (piece.classList.contains("dropped")) return;
        dragging = true;
        const r = piece.getBoundingClientRect();
        ox = e.clientX - r.left;
        oy = e.clientY - r.top;
        piece.classList.add("dragging");
        piece.style.position = "fixed";
        piece.style.width = r.width + "px";
        piece.style.height = r.height + "px";
        piece.style.left = r.left + "px";
        piece.style.top = r.top + "px";
        try { piece.setPointerCapture(e.pointerId); } catch (_) {}
        piece.addEventListener("pointermove", move);
        piece.addEventListener("pointerup", up);
        piece.addEventListener("pointercancel", up);
      };
      piece.addEventListener("pointerdown", down);
      // Accesible: con Enter/Espacio se coloca en su silueta
      piece.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const s = slots().find((sl) => sl.dataset.id === piece.dataset.id && !sl.classList.contains("solved"));
          if (s) place(piece, s);
        }
      });
    }

    function build() {
      targetsEl.innerHTML = "";
      trayEl.innerHTML = "";
      solved = 0;

      shuffle(pieces).forEach((p) => {
        const slot = el("div", "game-slot");
        slot.dataset.id = p.id;
        slot.innerHTML = `<img class="silhouette" src="${p.img}" alt="" aria-hidden="true">`;
        targetsEl.appendChild(slot);
      });

      shuffle(pieces).forEach((p) => {
        const piece = el("div", "game-piece");
        piece.dataset.id = p.id;
        piece.setAttribute("role", "button");
        piece.setAttribute("aria-label", "Sticker " + p.label);
        piece.tabIndex = 0;
        piece.innerHTML = `<img src="${p.img}" alt="${p.label}" draggable="false">`;
        attachDrag(piece);
        trayEl.appendChild(piece);
      });

      setStatus();
    }

    if (resetBtn) resetBtn.addEventListener("click", build);
    build();
  })();

  /* ----------------------------- FAQ (acordeón) ------------------------ */
  (function renderFaq() {
    const list = $("#faqList");
    SYL.faq.forEach((f) => {
      const item = el("div", "faq-item");
      const a = el("div", "faq-a", `<p>${f.a}</p>`);
      const q = el("button", "faq-q",
        `<span>${f.q}</span><span class="faq-icon" aria-hidden="true">+</span>`);
      q.setAttribute("aria-expanded", "false");
      q.addEventListener("click", () => {
        const open = item.classList.toggle("open");
        q.setAttribute("aria-expanded", open ? "true" : "false");
        a.style.maxHeight = open ? a.scrollHeight + "px" : null;
      });
      item.append(q, a);
      list.appendChild(item);
    });
  })();

  /* ----------------------------- Enlaces (WA / IG / mail / footer) ----- */
  function wireLinks() {
    const generalText =
      "¡Hola Stick Your Life! 👋 Quiero hacer una consulta sobre los stickers 🙂";

    // WhatsApp: sin número en el HTML; se arma y abre al hacer click.
    ["#waFloat", "#contactWa"].forEach((id) => {
      const a = $(id);
      if (!a) return;
      a.setAttribute("href", "#");
      a.setAttribute("rel", "nofollow noopener");
      a.addEventListener("click", onWaClick(generalText));
    });

    $("#navIg").href = igLink();
    $("#galleryIg").href = igLink();
    $("#contactIg").href = igLink();
    $("#contactIgHandle").textContent = "@" + cfg.instagram;

    $("#contactLoc").textContent = cfg.location;
    $("#contactShip").textContent = cfg.shipping;

    if (cfg.email) {
      const m = $("#contactEmail");
      m.hidden = false;
      m.href = "mailto:" + cfg.email;
      $("#contactEmailAddr").textContent = cfg.email;
    }

    // Footer (WhatsApp también se arma al click, sin exponer el número)
    const fl = $("#footerLinks");
    fl.innerHTML = "";
    const waA = el("a", null, "💬 WhatsApp");
    waA.href = "#";
    waA.rel = "nofollow noopener";
    waA.addEventListener("click", onWaClick(generalText));
    fl.appendChild(waA);
    const igA = el("a", null, "📸 Instagram");
    igA.href = igLink();
    igA.target = "_blank";
    igA.rel = "noopener";
    fl.appendChild(igA);
    if (cfg.email) {
      const mailA = el("a", null, "✉️ Email");
      mailA.href = "mailto:" + cfg.email;
      fl.appendChild(mailA);
    }

    $("#year").textContent = new Date().getFullYear();
  }

  /* ----------------------------- Menú (mobile + desktop) --------------- */
  (function nav() {
    const toggle = $("#navToggle");
    const links = $("#navLinks");
    const close = () => {
      if (!links.classList.contains("open")) return;
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", (e) => {
      e.stopPropagation(); // evita que el mismo click dispare "cerrar al tocar fuera"
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("#navLinks a").forEach((a) => a.addEventListener("click", close));
    document.addEventListener("click", (e) => {
      if (!links.classList.contains("open")) return;
      if (links.contains(e.target) || toggle.contains(e.target)) return;
      close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  })();

  /* ----------------------------- Scroll reveal ------------------------- */
  (function reveal() {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            obs.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    $$(".reveal").forEach((n) => obs.observe(n));
  })();

  /* ----------------------------- Stickers arrastrables del hero -------- */
  (function drag() {
    const layer = $("#heroStickers");
    if (!layer) return;
    $$("[data-drag]", layer).forEach((s) => {
      let ox = 0, oy = 0;
      const down = (e) => {
        const r = layer.getBoundingClientRect();
        const sr = s.getBoundingClientRect();
        ox = e.clientX - sr.left;
        oy = e.clientY - sr.top;
        s.classList.add("dragging");
        s.setPointerCapture(e.pointerId);
        const move = (ev) => {
          const x = ev.clientX - r.left - ox;
          const y = ev.clientY - r.top - oy;
          s.style.left = Math.max(0, Math.min(r.width - sr.width, x)) + "px";
          s.style.top = Math.max(0, Math.min(r.height - sr.height, y)) + "px";
        };
        const up = (ev) => {
          s.classList.remove("dragging");
          s.releasePointerCapture(ev.pointerId);
          s.removeEventListener("pointermove", move);
          s.removeEventListener("pointerup", up);
        };
        s.addEventListener("pointermove", move);
        s.addEventListener("pointerup", up);
      };
      s.addEventListener("pointerdown", down);
    });
  })();

  /* ----------------------------- Estallido de stickers ----------------- */
  const BURST = ["⭐", "💖", "🌈", "✨", "🐾", "🧉", "🌸", "💛"];
  function burst(x, y) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layer = $("#burstLayer");
    for (let i = 0; i < 12; i++) {
      const p = el("span", "burst-piece", BURST[(Math.random() * BURST.length) | 0]);
      const ang = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 120;
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.setProperty("--bx", Math.cos(ang) * dist + "px");
      p.style.setProperty("--by", Math.sin(ang) * dist - 40 + "px");
      p.style.setProperty("--brot", (Math.random() * 360 - 180) + "deg");
      layer.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }

  /* ----------------------------- Auto-actualización -------------------- */
  /* Cada deploy regenera version.json con el commit publicado (ver
     .github/workflows/deploy.yml). La página lo consulta cada tanto y, si
     cambió, se recarga sola para mostrar la última versión — pero espera si
     estás completando el formulario, para no borrar tu pedido. */
  (function autoRefresh() {
    const POLL_MS = 60000;
    let current = null;
    let pendingReload = false;

    const fetchVersion = async () => {
      try {
        const res = await fetch("version.json?t=" + Date.now(), { cache: "no-store" });
        if (!res.ok) return null;
        const data = await res.json();
        return data && data.commit ? data.commit : null;
      } catch {
        return null;
      }
    };

    const isBusy = () => {
      const a = document.activeElement;
      if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return true;
      const idea = $("#idea"), nombre = $("#nombre");
      return Boolean((idea && idea.value.trim()) || (nombre && nombre.value.trim()));
    };

    const maybeReload = () => {
      if (pendingReload && !isBusy()) location.reload();
    };

    const check = async () => {
      const latest = await fetchVersion();
      if (!latest) return;
      if (current === null) { current = latest; return; }
      if (latest !== current) { pendingReload = true; maybeReload(); }
    };

    check();
    setInterval(check, POLL_MS);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible") return;
      if (pendingReload) maybeReload(); else check();
    });
    document.addEventListener("focusout", maybeReload);
  })();

  /* ----------------------------- Init ---------------------------------- */
  renderFilters();
  renderCatalog();
  wireLinks();
})();
