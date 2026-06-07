# Stick Your Life 🌈

Sitio web para **Stick Your Life** — stickers personalizados resistentes al agua, hechos a mano en Bahía Blanca 🇦🇷.

Es una página **estática** (HTML, CSS y JavaScript, sin frameworks ni base de datos), fácil de editar y gratis de hostear en **GitHub Pages**. Los pedidos se hacen por **WhatsApp** e **Instagram**.

🔗 **En vivo:** https://rociolando2-ux.github.io/stickers-web/

![Hecho con 💛](https://img.shields.io/badge/hecho%20con-%F0%9F%92%9B-ffb8d2)

> 🤖 ¿Sos un agente de IA trabajando en este repo? Leé primero **[`CLAUDE.md`](CLAUDE.md)**.

---

## ✨ Qué incluye

- **Inicio (hero)** con el logo dentro de una forma orgánica que se mueve ("morphing blob") y stickers reales que se pueden arrastrar 🖐️
- **Catálogo** filtrable por categoría; cada sticker tiene un botón **"Pedir"** que abre WhatsApp con el pedido ya escrito
- **Armá tu sticker**: un formulario **paso a paso** (wizard) para pedidos personalizados; se completa un paso y recién ahí se habilita el siguiente, y al final arma el mensaje de WhatsApp
- **Mini-juego** 🎮: arrastrá cada sticker hasta su silueta (anda con mouse, touch y teclado)
- **Reels** 🎬: los videos se reproducen solos (en silencio) y se ven en grande con sonido al tocarlos
- **Galería** de fotos + enlace a Instagram, con visor ampliado (lightbox)
- **Preguntas frecuentes**, sección "Sobre nosotras" y datos de contacto
- Botón flotante de WhatsApp siempre visible
- **Número de WhatsApp protegido** contra bots/scrapers (no aparece en el código)
- Diseño **responsive** y colorido, y se actualiza solo cuando publicás una nueva versión

---

## 🛠️ Cómo editar el contenido

**Casi todo se cambia en un solo archivo: [`js/data.js`](js/data.js)** (el objeto `SYL`).

### 1. Número de WhatsApp (¡importante!) 🔒

El número va **ofuscado** a propósito (para que los bots no lo levanten del código),
así que **no se escribe el número tal cual**. Para cambiarlo:

1. Abrí la página en el navegador y abrí la consola (tecla **F12** → pestaña *Console*).
2. Pegá esto, reemplazando por tu número internacional **sin `+` ni espacios**
   (Argentina = `54` + `9` + código de área + número), y apretá Enter:

   ```js
   const n = "54XXXXXXXXXX"; [btoa(n.slice(0,7)), btoa(n.slice(7))]
   ```
3. Copiá el resultado (algo como `["...", "..."]`) y pegalo en `js/data.js`:

   ```js
   waEnc: ["...", "..."],
   ```

> Ahora mismo tiene un **número de prueba**. Hasta que no pongas el tuyo, el botón
> de WhatsApp abre el chat de ese número de prueba.

### 2. Redes y datos

```js
instagram: "stickyourlifebb",        // sin @
email: "",                            // opcional
location: "Bahía Blanca, Buenos Aires 🇦🇷",
```

### 3. Productos del catálogo

Cada sticker es una línea en la lista `products`:

```js
{ name: "Perro globo", cat: "ilustra", price: 800, img: "assets/stickers/cut/balloon-dog.webp", badge: "Más pedido" },
```

- `price`: solo el número (se muestra como `$800`)
- `img`: ruta a la foto. Los recortes con **fondo transparente** de
  `assets/stickers/cut/` son los que mejor quedan. Si no ponés `img`, usá `emoji`.
- `badge`: etiqueta opcional ("Nuevo", "Más pedido"…)
- `cat`: una categoría de la lista `categories`

### 4. Fotos, reels y juego

- **Galería:** sumá fotos a `assets/stickers/` y agregá la ruta en la lista `gallery`.
- **Reels:** poné los `.mp4` en `assets/stickers/` y agregalos en `reels`.
- **Mini-juego:** las piezas salen de `game.pieces` (usan los recortes de `cut/`).

### 5. Preguntas frecuentes

Editá la lista `faq` (`{ q: "pregunta", a: "respuesta" }`).

---

## 👀 Ver la página en tu compu

Doble clic en `index.html`, o con Python desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
# después abrí http://localhost:8000
```

(Las tipografías y el link de WhatsApp necesitan internet; el resto anda offline.)

---

## 🚀 Publicar en GitHub Pages

Ya viene un workflow en `.github/workflows/deploy.yml`. En **Settings → Pages**,
elegí **Source: GitHub Actions**. Cada vez que hagas **push a `main`**, se publica
solo en ~1–2 minutos 🎉, y las pestañas abiertas se actualizan a la nueva versión.

La dirección queda como `https://TU-USUARIO.github.io/stickers-web/`.

> ¿Dominio propio (ej. `stickyourlife.com.ar`)? Se conecta desde
> **Settings → Pages → Custom domain**.

---

## 📁 Estructura

```
.
├── index.html              # la página (todas las secciones)
├── css/styles.css          # estilos (colores, animaciones, layout)
├── js/
│   ├── data.js             # ⭐ CONTENIDO EDITABLE (productos, contacto, reels, juego, FAQ…)
│   └── main.js             # interactividad (no hace falta tocarlo)
├── assets/
│   ├── logo.png            # logo del hero (fondo transparente)
│   └── stickers/           # fotos (.webp), videos (.mp4), loguito.jpg
│       └── cut/            # recortes con fondo transparente (catálogo + juego)
├── favicon.svg             # ícono de la pestaña (la estatua de David)
├── version.json            # lo actualiza el deploy (para refrescar el sitio solo)
├── CLAUDE.md               # guía para agentes de IA
└── .github/workflows/      # publicación automática en GitHub Pages
```

---

Hecho con 💛 para Stick Your Life.
