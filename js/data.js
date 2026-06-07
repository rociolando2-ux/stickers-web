/* ============================================================================
   STICK YOUR LIFE — Contenido editable del sitio
   ----------------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitás tocar para cambiar:
     · El número de WhatsApp y las redes
     · Los productos del catálogo (nombre, precio, foto/categoría)
     · Las preguntas frecuentes

   👉 IMPORTANTE — número de WhatsApp:
      El número va OFUSCADO (base64, en 2 partes) para que los bots/scrapers
      no lo levanten del código. Para cambiarlo, abrí la consola del navegador
      (F12) y pegá, reemplazando por tu número internacional sin "+":
      (Argentina = 54, 9, código de área, número. No lo dejamos escrito acá
       en texto plano justamente para que los bots no lo levanten.)

         const n = "54XXXXXXXXXX";  [btoa(n.slice(0,7)), btoa(n.slice(7))]

      Copiá el resultado y pegalo en `config.waEnc` acá abajo.
   ========================================================================== */

const SYL = {
  /* ----------------------------- DATOS DEL NEGOCIO ----------------------- */
  config: {
    brand: "Stick Your Life",
    brandLines: ["Stick", "Your", "Life"], // se muestra en 3 líneas en el hero
    tagline: "Stickers personalizados resistentes al agua 💦",
    subtitle:
      "Convertí lo que más te gusta en stickers troquelados, brillantes y de larga duración. Hechos a mano en Bahía Blanca.",

    // ⚠️ Número de WhatsApp OFUSCADO (ver instrucciones arriba). Estos valores
    // son de ejemplo: reemplazalos por los de TU número con el snippet de arriba.
    waEnc: ["NTQ5MjkxNQ==", "MDAwMDAw"],
    whatsappDisplay: "WhatsApp",

    instagram: "stickyourlifebb", // sin @
    email: "", // opcional, dejar "" si no querés mostrarlo

    location: "Bahía Blanca, Buenos Aires 🇦🇷",
    shipping: "Envíos a todo el país",
    currency: "$",
  },

  /* ----------------------------- FRANJA DE BENEFICIOS -------------------- */
  perks: [
    { icon: "💦", text: "Resistentes al agua" },
    { icon: "✂️", text: "Troquelados (die-cut)" },
    { icon: "🎨", text: "Diseños personalizados" },
    { icon: "🐾", text: "Stickers de tus mascotas" },
    { icon: "📦", text: "Envíos a todo el país" },
    { icon: "✨", text: "De larga duración" },
  ],

  /* ----------------------------- CATEGORÍAS DEL CATÁLOGO ----------------- */
  // El id "todos" es obligatorio y muestra todo.
  categories: [
    { id: "todos", label: "Todos", icon: "🌈" },
    { id: "mascotas", label: "Mascotas", icon: "🐾" },
    { id: "ilustra", label: "Ilustraciones", icon: "🎨" },
    { id: "plantas", label: "Plantas", icon: "🌿" },
    { id: "comida", label: "Comida & mate", icon: "🧉" },
    { id: "frases", label: "Frases", icon: "💬" },
    { id: "packs", label: "Packs", icon: "🎁" },
  ],

  /* ----------------------------- PRODUCTOS ------------------------------
     Cada producto usa una foto real de `assets/stickers/` y va en su
     categoría (cat) correspondiente.
       name   -> nombre que se muestra
       cat    -> id de categoría (de la lista de arriba)
       price  -> precio en pesos (solo el número)
       img    -> ruta a la foto (recortes con fondo transparente en /cut)
       emoji  -> dibujo placeholder (se usa si un producto no tiene foto)
       badge  -> (opcional) etiqueta, ej "Nuevo", "Más pedido"
       from   -> (opcional) true para mostrar "desde $..."
     --------------------------------------------------------------------- */
  products: [
    { name: "Perro globo", cat: "ilustra", price: 800, img: "assets/stickers/cut/balloon-dog.webp", badge: "Más pedido" },
    { name: "Snoopy", cat: "ilustra", price: 800, img: "assets/stickers/cut/snoopy.webp" },
    { name: "David", cat: "ilustra", price: 900, img: "assets/stickers/cut/david.webp", badge: "Pop / arte" },
    { name: "Tortuga mosaico", cat: "mascotas", price: 850, img: "assets/stickers/cut/tortuga.webp", badge: "Nuevo" },
    { name: "Tu mascota", cat: "mascotas", price: 800, emoji: "🐾" },
    { name: "Florcitas", cat: "plantas", price: 700, img: "assets/stickers/cut/flores.webp" },
    { name: "Sandía corazón", cat: "comida", price: 800, img: "assets/stickers/cut/watermelon.webp", badge: "Argento 💦" },
    { name: "Alto nivel de locura", cat: "frases", price: 850, img: "assets/stickers/cut/locura.webp" },
    { name: "Frase a elección", cat: "frases", price: 700, emoji: "💬" },
    { name: "Pack mix x6", cat: "packs", price: 4000, img: "assets/stickers/613631416_18080984384585773_4096998826846672114_n.webp", badge: "Ahorrás", from: true },
  ],

  /* ----------------------------- ARMÁ TU PEDIDO (formulario por pasos) --- */
  custom: {
    tipos: [
      { icon: "🐾", label: "Mascota" },
      { icon: "💬", label: "Frase" },
      { icon: "🏷️", label: "Logo / marca" },
      { icon: "🎤", label: "Personaje / pop" },
      { icon: "🎨", label: "Diseño propio" },
      { icon: "✨", label: "Otro" },
    ],
    cantidades: ["1", "6", "12", "25", "50+"],
    tamanos: ["Chico (~5 cm)", "Mediano (~7 cm)", "Grande (~10 cm)"],
  },

  /* ----------------------------- REELS (videos) -------------------------
     Se reproducen solos (en silencio) apenas entrás a la página y mientras
     están a la vista. Tocá uno para verlo en grande con sonido.
     --------------------------------------------------------------------- */
  reels: [
    { video: "assets/stickers/AQOq6DZFq5fdsrEQ8P0iKGqkevr1G03PkqA8MCVYryezZVrA_dKDyq4GCM7R606qtB2nQS9p1ePVfztGYS-bDHpi6h6qnHhXYNEG8Fw.mp4" },
    { video: "assets/stickers/AQPC5P4_6x101qA-W52oGLnHkyYp0yIFSDB774vdt3r6fNlNRLIYsT9SX7-BmyiYoRyPrKKAsyVOYgoPhjrq04HbeT827QOJx1Qrork.mp4" },
  ],

  /* ----------------------------- MINI-JUEGO -----------------------------
     Arrastrá cada sticker hasta su silueta. Usa los recortes con fondo
     transparente de /cut. Cada pieza tiene un id único.
     --------------------------------------------------------------------- */
  game: {
    pieces: [
      { id: "perro",    label: "Perro globo", img: "assets/stickers/cut/balloon-dog.webp" },
      { id: "sandia",   label: "Sandía",      img: "assets/stickers/cut/watermelon.webp" },
      { id: "snoopy",   label: "Snoopy",      img: "assets/stickers/cut/snoopy.webp" },
      { id: "tortuga",  label: "Tortuga",     img: "assets/stickers/cut/tortuga.webp" },
      { id: "david",    label: "David",       img: "assets/stickers/cut/david.webp" },
      { id: "flores",   label: "Florcitas",   img: "assets/stickers/cut/flores.webp" },
    ],
  },

  /* ----------------------------- GALERÍA (fotos) ------------------------
     Solo fotos. Los videos van en `reels`. Tocá una foto para verla grande.
     --------------------------------------------------------------------- */
  gallery: [
    { img: "assets/stickers/613631416_18080984384585773_4096998826846672114_n.webp" },
    { img: "assets/stickers/613652575_18080984147585773_3307648246962913521_n.webp" },
    { img: "assets/stickers/621377445_18082223702585773_1653489531585223048_n.webp" },
    { img: "assets/stickers/621438463_18082223684585773_8864590651044056781_n.webp" },
    { img: "assets/stickers/621721017_18082223675585773_229522009255610656_n.webp" },
    { img: "assets/stickers/621773914_18082223714585773_5786363395387612278_n.webp" },
    { img: "assets/stickers/622393419_18082223465585773_8487853056861630923_n.webp" },
    { img: "assets/stickers/622579488_18082223693585773_4393377786749890752_n.webp" },
    { img: "assets/stickers/623540937_18082223666585773_8381284011273995570_n.webp" },
    { img: "assets/stickers/639768288_18085816556585773_8916189002647091332_n.webp" },
    { img: "assets/stickers/640384806_18085816823585773_8707246916963487065_n.webp" },
    { img: "assets/stickers/640516942_18085816856585773_6336792455344119519_n.webp" },
    { img: "assets/stickers/641292318_18085816844585773_8796271499262057096_n.webp" },
    { img: "assets/stickers/642418567_18085816835585773_4453736110022946296_n.webp" },
    { img: "assets/stickers/647440993_18087005549585773_5886293999029672902_n.webp" },
    { img: "assets/stickers/647516459_18087005531585773_1592366052198970069_n.webp" },
    { img: "assets/stickers/648308298_18087006092585773_8696961360178370452_n.webp" },
    { img: "assets/stickers/649214319_18087005540585773_621526766637841665_n.webp" },
    { img: "assets/stickers/649393137_18087006113585773_1058222218537117983_n.webp" },
    { img: "assets/stickers/650030215_18087006083585773_5999174198647778322_n.webp" },
    { img: "assets/stickers/658530242_18089487554585773_8543247059023360242_n.webp" },
  ],

  /* ----------------------------- PREGUNTAS FRECUENTES -------------------- */
  faq: [
    {
      q: "¿Son resistentes al agua?",
      a: "¡Sí! Son de vinilo resistente al agua y de larga duración. Aguantan sol, lluvia y el uso de todos los días sin despegarse ni borrarse.",
    },
    {
      q: "¿Hacen diseños personalizados?",
      a: "Obvio 💛 Hacemos stickers de tus mascotas, frases, logos de tu emprendimiento, personajes y cualquier idea que tengas. Mandanos la foto o la idea por WhatsApp.",
    },
    {
      q: "¿Cuánto salen?",
      a: "Los stickers individuales arrancan en $800 cada uno, y los packs tienen precio especial. Escribinos para un presupuesto según cantidad y tamaño.",
    },
    {
      q: "¿Hacen envíos?",
      a: "Sí, enviamos a todo el país por correo. En Bahía Blanca coordinamos entrega en persona.",
    },
    {
      q: "¿Cómo puedo pagar?",
      a: "Aceptamos transferencia, Mercado Pago y efectivo (en entregas presenciales).",
    },
    {
      q: "¿Cuánto tardan?",
      a: "Los diseños del catálogo salen en pocos días. Los personalizados dependen del diseño; te avisamos los tiempos al hacer el pedido.",
    },
  ],
};
