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
  const money = (n) =>
    cfg.currency + Number(n).toLocaleString("es-AR");

  const igLink = () => `https://instagram.com/${cfg.instagram}`;

  const waLink = (text) =>
    `https://wa.me/${cfg.whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : "");

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
    // duplicado para loop continuo
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
      btn.href = waLink(msg);
      btn.target = "_blank";
      btn.rel = "noopener";
      btn.textContent = "Pedir";
      btn.addEventListener("click", (e) => burst(e.clientX, e.clientY));
      card.appendChild(btn);

      grid.appendChild(card);
    });
  }

  /* ----------------------------- Armá tu pedido ------------------------ */
  const order = { tipo: "", cantidad: "", tamano: "", idea: "", nombre: "" };

  function chipPicker(containerId, values, labelOf, key) {
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

  (function initCustom() {
    chipPicker("#tipoChips", SYL.custom.tipos, (t) => `${t.icon} ${t.label}`, "tipo");
    chipPicker("#cantidadChips", SYL.custom.cantidades, (t) => t, "cantidad");
    chipPicker("#tamanoChips", SYL.custom.tamanos, (t) => t, "tamano");

    $("#idea").addEventListener("input", updatePreview);
    $("#nombre").addEventListener("input", updatePreview);

    $("#customForm").addEventListener("submit", (e) => {
      e.preventDefault();
      updatePreview();
      burst(window.innerWidth / 2, window.innerHeight * 0.6);
      window.open(waLink(buildOrderMessage()), "_blank", "noopener");
    });
  })();

  /* ----------------------------- Galería ------------------------------- */
  const galleryMedia = []; // fotos/videos reales, en orden, para el visor
  let lbIndex = 0;

  (function renderGallery() {
    const grid = $("#galleryGrid");
    SYL.gallery.forEach((g, i) => {
      const item = el("div", "gallery-item");
      item.style.background = pastel(i + 2);

      const isVideo = g && typeof g === "object" && g.video;
      const isImg = g && typeof g === "object" && g.img;

      if (isVideo) {
        item.classList.add("is-video");
        const v = el("video");
        v.src = g.video;
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.setAttribute("playsinline", ""); // iOS
        v.setAttribute("aria-hidden", "true");
        v.preload = "metadata";
        v.tabIndex = -1;
        item.appendChild(v);
        item.insertAdjacentHTML(
          "beforeend",
          '<span class="gallery-play" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></span>'
        );
      } else if (isImg) {
        item.innerHTML = `<img src="${g.img}" alt="Sticker de Stick Your Life" loading="lazy">`;
      } else {
        // compatibilidad con emojis sueltos
        item.innerHTML = `<span class="die-cut">${typeof g === "string" ? g : (g && g.emoji) || "✨"}</span>`;
      }

      if (isVideo || isImg) {
        const idx = galleryMedia.length;
        galleryMedia.push(isVideo ? { type: "video", src: g.video } : { type: "img", src: g.img });
        item.tabIndex = 0;
        item.setAttribute("role", "button");
        item.setAttribute("aria-label", isVideo ? "Ver video en grande" : "Ver foto en grande");
        const open = () => openLightbox(idx);
        item.addEventListener("click", open);
        item.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
        });
      }

      grid.appendChild(item);
    });

    initGalleryAutoplay();
  })();

  /* Los videos de la galería se reproducen (en silencio) solo cuando están
     a la vista, y se pausan al salir. Respeta "prefiero menos movimiento". */
  function initGalleryAutoplay() {
    const vids = $$("#galleryGrid video");
    if (!vids.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

  /* ----------------------------- Visor / lightbox ---------------------- */
  function lbRender() {
    const stage = $("#lightboxStage");
    const m = galleryMedia[lbIndex];
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
    if (!galleryMedia.length) return;
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
    if (!galleryMedia.length) return;
    lbIndex = (lbIndex + dir + galleryMedia.length) % galleryMedia.length;
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
    const generalWa = waLink(
      "¡Hola Stick Your Life! 👋 Quiero hacer una consulta sobre los stickers 🙂"
    );
    $("#waFloat").href = generalWa;
    $("#contactWa").href = generalWa;

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

    // Footer
    const fl = $("#footerLinks");
    const links = [
      { href: generalWa, icon: "💬", label: "WhatsApp" },
      { href: igLink(), icon: "📸", label: "Instagram" },
    ];
    if (cfg.email) links.push({ href: "mailto:" + cfg.email, icon: "✉️", label: "Email" });
    fl.innerHTML = links
      .map((l) => `<a href="${l.href}" target="_blank" rel="noopener">${l.icon} ${l.label}</a>`)
      .join("");

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
    // Al elegir un enlace, se cierra
    $$("#navLinks a").forEach((a) => a.addEventListener("click", close));
    // Cerrar al tocar/clickear fuera del menú (mobile y desktop)
    document.addEventListener("click", (e) => {
      if (!links.classList.contains("open")) return;
      if (links.contains(e.target) || toggle.contains(e.target)) return;
      close();
    });
    // Cerrar con la tecla Escape
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

  /* ----------------------------- Stickers arrastrables ----------------- */
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
    let current = null;        // versión que se está viendo
    let pendingReload = false;

    const fetchVersion = async () => {
      try {
        const res = await fetch("version.json?t=" + Date.now(), { cache: "no-store" });
        if (!res.ok) return null;
        const data = await res.json();
        return data && data.commit ? data.commit : null;
      } catch {
        return null; // sin red o sin archivo (p. ej. abierto como file://)
      }
    };

    // No recargamos mientras se escribe, para no perder el pedido en curso.
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
      if (current === null) { current = latest; return; } // baseline al cargar
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
