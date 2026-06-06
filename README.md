# Stick Your Life 🌈

Sitio web para **Stick Your Life** — stickers personalizados resistentes al agua, hechos a mano en Bahía Blanca 🇦🇷.

Es una página **estática** (HTML, CSS y JavaScript, sin frameworks ni base de datos), pensada para ser fácil de editar y gratis de hostear en **GitHub Pages**. Los pedidos se hacen por **WhatsApp** e **Instagram**.

![Hecho con 💛](https://img.shields.io/badge/hecho%20con-%F0%9F%92%9B-ffb8d2)

---

## ✨ Qué incluye

- **Inicio** con el logo animado y stickers que se pueden arrastrar 🖐️
- **Catálogo** filtrable por categoría; cada sticker tiene un botón **"Pedir"** que abre WhatsApp con el pedido ya escrito
- **Armá tu sticker**: un formulario interactivo para pedidos personalizados (mascotas, frases, logos…) que también arma el mensaje de WhatsApp
- **Galería** y enlace a Instagram
- **Preguntas frecuentes**, sección "Sobre nosotras" y datos de contacto
- Botón flotante de WhatsApp siempre visible
- Diseño **responsive** (se ve bien en el celu) y colorido, siguiendo el estilo del Instagram

---

## 🛠️ Cómo editar el contenido

**Casi todo se cambia en un solo archivo: [`js/data.js`](js/data.js).**

### 1. Poné el número de WhatsApp (¡importante!)

En `js/data.js`, dentro de `config`, cambiá `whatsapp` por el número real
en formato internacional, sin `+` ni espacios:

```js
// Argentina (54) + celular (9) + área (Bahía Blanca = 291) + número
whatsapp: "5492915123456",
```

> Ahora mismo tiene un número de ejemplo (`5492915000000`). Hasta que no lo cambies, el botón de WhatsApp no va a llegar a un chat real.

### 2. Redes y datos

```js
instagram: "stickyourlifebb",      // sin @
email: "",                          // opcional
location: "Bahía Blanca, Buenos Aires 🇦🇷",
```

### 3. Productos del catálogo

Cada sticker es una línea en la lista `products`:

```js
{ name: "Tu mascota", cat: "mascotas", price: 800, emoji: "🐶", badge: "Más pedido" },
```

- `price`: solo el número (se muestra como `$800`)
- `emoji`: dibujo que aparece si no hay foto
- `badge`: etiqueta opcional ("Nuevo", "Más pedido"…)
- `cat`: una categoría de la lista `categories`

### 4. Usar fotos reales en vez de emojis

1. Subí las fotos a la carpeta `assets/stickers/` (cuadradas se ven mejor)
2. En el producto, agregá `img`:

```js
{ name: "Tu mascota", cat: "mascotas", price: 800, img: "assets/stickers/perro.png" },
```

Lo mismo sirve para la galería (`gallery`).

---

## 👀 Ver la página en tu compu

Solo abrí el archivo `index.html` con doble clic en el navegador.

O, si tenés Python, desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
# después abrí http://localhost:8000
```

---

## 🚀 Publicar gratis en GitHub Pages

**Opción A — Automática (recomendada).** Ya viene un workflow en
`.github/workflows/deploy.yml`. Solo tenés que:

1. Subir el proyecto a un repositorio de GitHub
2. Ir a **Settings → Pages**
3. En **Source**, elegir **GitHub Actions**
4. Cada vez que hagas push a la rama `main`, se publica solo 🎉

**Opción B — Manual.**

1. **Settings → Pages**
2. En **Source**, elegir **Deploy from a branch**
3. Branch: `main`, carpeta `/ (root)` → Save

En ambos casos, la dirección queda como
`https://TU-USUARIO.github.io/stickers-web/`.

> ¿Querés un dominio propio (ej. `stickyourlife.com.ar`)? Se puede conectar
> desde **Settings → Pages → Custom domain**.

---

## 📁 Estructura

```
.
├── index.html          # la página
├── css/styles.css      # estilos (colores, animaciones)
├── js/
│   ├── data.js         # ⭐ CONTENIDO EDITABLE (productos, contacto, FAQ)
│   └── main.js         # interactividad (no hace falta tocarlo)
├── assets/stickers/    # fotos de los stickers
├── favicon.svg         # ícono de la pestaña
└── .github/workflows/  # publicación automática en GitHub Pages
```

---

Hecho con 💛 para Stick Your Life.
