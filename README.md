# 💜 Carta Romántica — 17 Meses

Página web romántica e interactiva para celebrar 17 meses de amor.
Diseñada con HTML, CSS y JavaScript puro. Lista para publicarse en **GitHub Pages**.

---

## 📱 ¿Qué incluye?

| Sección | Descripción |
|---|---|
| **Pantalla inicial** | Partículas y destellos que forman corazones lilas luminosos flotantes, que explotan en lluvia de estrellas al pulsar «Feliz día mi amor» |
| **Cronómetro en vivo** | Contador exacto en alta velocidad (Días, Horas, Minutos, Segundos, Microsegundos) sin revelar la fecha para que ella la deduzca |
| **Trivia de Recuerdos** | Mini-juego interactivo de 4 preguntas sobre su historia con retroalimentación inmediata |
| **Rasca y Gana** | Tarjeta raspable con el dedo que devela un ticket oficial de amor como recompensa |
| **Árbol de recuerdos** | Árbol SVG animado por etapas con las 6 fotografías reales de Dania y Sergio en marcos camafeo |
| **Carta de amor** | Efecto máquina de escribir con cadencia natural, cursor activo y texto personalizable |
| **Final emotivo** | Corazones flotantes, pregunta interactiva, ráfaga de destellos y sobre 3D con posdata |
| **Tocadiscos de vinilo** | Reproductor flotante con disco giratorio y aguja móvil al ritmo de "Apocalypse" |

---

## 🚀 Cómo ejecutar en local

1. Abre la carpeta del proyecto en tu explorador de archivos.
2. Haz doble clic en `index.html` → se abre en el navegador.

> **Nota:** Para que las fotos carguen correctamente al probar en local, usa un servidor local sencillo.  
> Si tienes Node.js instalado:
> ```bash
> npx serve .
> ```
> O con Python:
> ```bash
> python -m http.server 8080
> ```
> Luego abre `http://localhost:8080` en el navegador.

---

## ✏️ Cómo personalizar el contenido

**Todo el contenido editable está en un solo archivo:**

```
config/content.js
```

### Cambiar el texto de la carta

Abre `config/content.js` y edita el objeto `letter`:

```js
letter: {
  salutation: "Mi amor,",
  paragraphs: [
    "Tu primer párrafo...",
    "Tu segundo párrafo...",
    // Añade o quita párrafos aquí
  ],
  closing: "Con todo mi amor,",
  signature: "Tu nombre 💜"
},
```

### Cambiar la posdata del sobre

```js
postdata: "P.D.: Tu posdata personalizada aquí.",
```

---

## 📸 Cómo añadir las fotografías

1. Copia tus fotos a la carpeta:
   ```
   public/images/
   ```
   Nombres sugeridos: `foto1.jpg`, `foto2.jpg`, ..., `foto6.jpg`

2. En `config/content.js`, actualiza el array `photos`:
   ```js
   photos: [
     {
       src:    "public/images/foto1.jpg",
       phrase: "El día que supe que eras mi favorita",
       alt:    "Descripción breve de la foto"
     },
     // ...hasta 6 fotos
   ],
   ```

> **Recomendaciones para las fotos:**
> - Formato: JPG o WebP
> - Tamaño: máximo 1 MB por foto (usa [Squoosh](https://squoosh.app) para comprimir)
> - Relación de aspecto: cuadrada (1:1) para mejor resultado

Si una foto no existe, se muestra un marcador elegante automáticamente.

---

## 🎵 Cómo añadir música

1. Coloca tu archivo de audio en:
   ```
   public/cancion.mp3
   ```

2. En `config/content.js`, verifica que la ruta sea correcta:
   ```js
   audio: {
     src: "public/cancion.mp3",
     label: "Nuestra canción"
   }
   ```

3. Para **desactivar** la música, deja `src` vacío:
   ```js
   audio: { src: "" }
   ```

> La música solo se activa tras la primera interacción del usuario, respetando las políticas del navegador.

---

## 🌐 Cómo publicar en GitHub Pages

### Primera vez

1. Crea un repositorio en [github.com](https://github.com/new)  
   Nombre sugerido: `carta-17-meses`

2. Sube todos los archivos:
   ```bash
   git init
   git add .
   git commit -m "💜 Carta romántica 17 meses"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/carta-17-meses.git
   git push -u origin main
   ```

3. En GitHub, ve a **Settings → Pages**:
   - Source: `Deploy from a branch`
   - Branch: `main` / `/ (root)`
   - Guarda.

4. En ~1 minuto tu página estará en:
   ```
   https://TU_USUARIO.github.io/carta-17-meses/
   ```

### Actualizar el contenido

```bash
git add .
git commit -m "Actualizo carta y fotos"
git push
```

---

## 📂 Estructura del proyecto

```
Cart/
├── index.html              ← Página principal
├── css/
│   └── main.css            ← Todos los estilos
├── js/
│   ├── utils.js            ← Funciones de utilidad
│   ├── particles.js        ← Sistema de partículas + corazones
│   ├── tree.js             ← Árbol SVG animado
│   ├── letter.js           ← Efecto máquina de escribir
│   ├── finale.js           ← Escena final + sobre
│   ├── audio.js            ← Reproductor de audio
│   └── app.js              ← Coordinador + modal de fotos
├── config/
│   └── content.js          ← ⭐ EDITA AQUÍ el contenido
└── public/
    └── images/             ← Coloca aquí las fotos
        └── foto1.jpg
        └── foto2.jpg
        └── ...
```

---

Hecho con 💜 — que sea un momento que ella recuerde siempre.
