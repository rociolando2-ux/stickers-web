/* ============================================================================
   STICK YOUR LIFE — Contenido editable del sitio
   ----------------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitás tocar para cambiar:
     · El número de WhatsApp y las redes
     · Los productos del catálogo (nombre, precio, emoji o foto)
     · Las preguntas frecuentes

   👉 IMPORTANTE: cambiá el número de WhatsApp en `config.whatsapp`
      (está con un número de ejemplo / placeholder).
   ========================================================================== */

const SYL = {
  /* ----------------------------- DATOS DEL NEGOCIO ----------------------- */
  config: {
    brand: "Stick Your Life",
    brandLines: ["Stick", "Your", "Life"], // se muestra en 3 líneas en el hero
    tagline: "Stickers personalizados resistentes al agua 💦",
    subtitle:
      "Convertí lo que más te gusta en stickers troquelados, brillantes y de larga duración. Hechos a mano en Bahía Blanca.",

    // ⚠️ CAMBIAR: número de WhatsApp en formato internacional, sin "+", sin espacios.
    // Argentina = 54, celular = 9, código de área (Bahía Blanca = 291), número.
    // Ejemplo real: 5492915123456
    whatsapp: "5492915000000", // <-- PLACEHOLDER, reemplazar por el número real
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
     Cada producto:
       name   -> nombre que se muestra
       cat    -> id de categoría (de la lista de arriba)
       price  -> precio en pesos (solo el número)
       emoji  -> dibujo placeholder (se usa si no hay foto)
       img    -> (opcional) ruta a una foto, ej "assets/stickers/perro.png"
                 Si ponés img, se muestra la foto en vez del emoji.
       badge  -> (opcional) etiqueta, ej "Nuevo", "Más pedido"
       from   -> (opcional) true para mostrar "desde $..."
     --------------------------------------------------------------------- */
  products: [
    { name: "Tu mascota", cat: "mascotas", price: 800, emoji: "🐶", badge: "Más pedido" },
    { name: "Michi en maceta", cat: "ilustra", price: 800, emoji: "🐱", badge: "Nuevo" },
    { name: "Plantita feliz", cat: "plantas", price: 700, emoji: "🪴" },
    { name: "Matecito argento", cat: "comida", price: 800, emoji: "🧉", badge: "Argento" },
    { name: "Frase a elección", cat: "frases", price: 700, emoji: "💬" },
    { name: "Corazón retro", cat: "ilustra", price: 600, emoji: "💖" },
    { name: "Arcoíris", cat: "ilustra", price: 700, emoji: "🌈" },
    { name: "Estrellita", cat: "ilustra", price: 600, emoji: "⭐" },
    { name: "Frutillita", cat: "comida", price: 700, emoji: "🍓" },
    { name: "Solcito feliz", cat: "ilustra", price: 600, emoji: "🌞" },
    { name: "Florcita", cat: "plantas", price: 600, emoji: "🌸" },
    { name: "Pack mix x6", cat: "packs", price: 4000, emoji: "🎁", badge: "Ahorrás", from: true },
  ],

  /* ----------------------------- ARMÁ TU PEDIDO (formulario) ------------- */
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

  /* ----------------------------- GALERÍA --------------------------------
     Fotos y videos reales de los stickers. Cada item puede ser:
       { img: "assets/stickers/archivo.webp" }    -> una foto
       { video: "assets/stickers/archivo.mp4" }   -> un video (se reproduce
                                                      en silencio y en bucle)
     Para sumar más, copiá una línea y cambiá la ruta. Tocá una imagen/video
     en el sitio para verla en grande.
     --------------------------------------------------------------------- */
  gallery: [
    { img: "assets/stickers/613631416_18080984384585773_4096998826846672114_n.webp" },
    { img: "assets/stickers/613652575_18080984147585773_3307648246962913521_n.webp" },
    { img: "assets/stickers/621377445_18082223702585773_1653489531585223048_n.webp" },
    { img: "assets/stickers/621438463_18082223684585773_8864590651044056781_n.webp" },
    { video: "assets/stickers/AQOq6DZFq5fdsrEQ8P0iKGqkevr1G03PkqA8MCVYryezZVrA_dKDyq4GCM7R606qtB2nQS9p1ePVfztGYS-bDHpi6h6qnHhXYNEG8Fw.mp4" },
    { img: "assets/stickers/621721017_18082223675585773_229522009255610656_n.webp" },
    { img: "assets/stickers/621773914_18082223714585773_5786363395387612278_n.webp" },
    { img: "assets/stickers/622393419_18082223465585773_8487853056861630923_n.webp" },
    { img: "assets/stickers/622579488_18082223693585773_4393377786749890752_n.webp" },
    { img: "assets/stickers/623540937_18082223666585773_8381284011273995570_n.webp" },
    { img: "assets/stickers/639768288_18085816556585773_8916189002647091332_n.webp" },
    { img: "assets/stickers/640384806_18085816823585773_8707246916963487065_n.webp" },
    { img: "assets/stickers/640516942_18085816856585773_6336792455344119519_n.webp" },
    { video: "assets/stickers/AQPC5P4_6x101qA-W52oGLnHkyYp0yIFSDB774vdt3r6fNlNRLIYsT9SX7-BmyiYoRyPrKKAsyVOYgoPhjrq04HbeT827QOJx1Qrork.mp4" },
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
