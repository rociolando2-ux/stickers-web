# Carpeta de fotos de stickers

Poné acá las fotos reales de los stickers (formato `.jpg`, `.png` o `.webp`).

Después, en `js/data.js`, agregá la ruta de la foto a cada producto con `img`.
Por ejemplo:

```js
{ name: "Tu mascota", cat: "mascotas", price: 800, img: "assets/stickers/perro.png" },
```

Si un producto **no** tiene `img`, se muestra el emoji que pongas en `emoji`.

> Consejo: recortá las fotos cuadradas (1:1) para que se vean parejas en el catálogo.
