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
     Placeholders con emoji. Para usar fotos reales, agregá { img: "..." }.
     --------------------------------------------------------------------- */
  gallery: ["🐶", "🐱", "🧉", "🌈", "🍓", "🪴", "⭐", "💖"],

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
