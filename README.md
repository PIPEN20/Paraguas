# Paraguas Inteligente - presentación web

Presentación interactiva (13 slides) para INF250 - Fundamentos de Ingeniería, UNAPEC.

## Cómo usarla
- **PC:** flechas ← → (también Espacio, AvPág / RePág).
- **Móvil / pantalla táctil:** tocar la mitad izquierda o derecha de la pantalla, o deslizar.
- Se puede abrir `index.html` directamente o publicarla en GitHub Pages, Netlify, etc.
  (no necesita instalación ni servidor especial).

## Estructura
```
index.html              Página: estructura, definiciones SVG compartidas y carga de archivos
css/
  base.css              Colores, layout, transiciones entre slides y componentes de texto
  illustration.css      Animaciones de las ilustraciones del paraguas
  effects.css           Fondos animados (ambiente + uno por slide)
js/                     (se cargan en este orden)
  umbrella.js           Ilustración SVG del paraguas en sus 5 variantes
  stages.js             Dibujo de las 4 etapas del cierre invertido (slide 5)
  slides.js             TODO EL TEXTO de los slides (editar aquí)
  effects.js            Animación de fondo de cada slide
  navigation.js         Crea los slides y controla teclado / toque / deslizar
images/
  logo.png              Logotipo de UNAPEC
```

## Cambios frecuentes
- **Cambiar un texto o autor:** `js/slides.js`.
- **Cambiar colores:** variables al inicio de `css/base.css`.
- **Cambiar un fondo animado:** `js/effects.js` (lista `FX`) y `css/effects.css`.
- **Cambiar la ilustración del paraguas:** `js/umbrella.js`.
- **Tipografías:** Google Fonts (Chakra Petch e Inter), enlazadas en `index.html`; sin internet se usa la fuente del sistema.
