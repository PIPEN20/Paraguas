/* =============================================================================
 * slides.js - all the text of the presentation
 *
 * Every entry of SLIDES is   { w: author shown bottom-left, h: slide HTML }.
 * To edit a text, change it here. The slides are built from three helpers:
 *   cards()  - title + a row of cards (benefits, audience, business model...)
 *   diag()   - title + umbrella illustration + text cards (function slides)
 *   plain HTML strings for the cover and the text-heavy slides
 * ========================================================================== */

// Authors (shown at the bottom-left of the slides they present)
const LOGO_PATH = "images/logo.png";
const D = "DIEGO AYBAR - A00118859",
  A = "ANDRÉS AQUINO - A00126512",
  J = "JULIAN EMILIANO - A00126812",
  B = "BRYAN POLANCO - A00126764";
// Which umbrella drawing goes with a function slide, chosen by the title of its first card.
const ILLUSTRATION_BY_CARD = {
  "Canalización del Agua": "tank",
  "Conexión móvil": "bt",
  "Sistema de alerta háptica": "haptic",
};

/** Title (+ icon on the right) and a grid of cards: items = [[emoji, heading, text], ...]. */
const cards = (title, icon, items) => `
  <h2 class="rv">${title}<i>${icon}</i>
      </h2>
  <div class="grid rv">
    ${items
      .map(
        ([
          emoji,
          heading,
          text,
        ]) => `<div class="card dark">${emoji ? `<span class="ic">${emoji}</span>` : ""}<h3>${heading}</h3>
      <p>${text}</p>
      </div>`,
      )
      .join("")}
  </div>`;

/** Function slide: umbrella drawing on the left, text cards on the right: items = [[heading, text], ...]. */
const diag = (title, items) => `
  <h2 class="rv">${title}</h2>
  <div class="two">
    ${umbrellaSVG(ILLUSTRATION_BY_CARD[items[0][0]] || "")}
    <div class="grid rv">
      ${items
        .map(
          ([heading, text]) => `<div class="card dark">
      <h3>${heading}</h3>
      <p>${text}</p>
      </div>`,
        )
        .join("")}
    </div>
  </div>`;

/** The 13 slides, in order. */
const SLIDES = [
  // 1. Cover
  {
    h: `<div class="cover">
      <img class="rv" src="${LOGO_PATH}" alt="UNAPEC Universidad APEC">
      <h1 class="rv">PARAGUAS<br>INTELIGENTE</h1>
      <p class="rv">Julian Emiliano - A00126812 | Bryan Polanco - A00126764 | Diego Aybar - A00118859 | Andrés Aquino - A00126512<br>INF250 - Fundamentos de Ingeniería</p>
      </div>`,
  },
  // 2. Problems to solve
  {
    w: B,
    h: `<h2 class="rv">PROBLEMÁTICAS A RESOLVER<i style="color:var(--purple)">🔋</i>
      </h2>
      <div class="grid rv" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))">${[
        [
          "Goteo en espacios cerrados y transporte",
          "Evita que el agua residual del paraguas moje el suelo, los asientos o tu ropa al abordar el metro o entrar a un edificio, gracias al sistema de cierre invertido y al depósito con válvula de silicona en el mango.",
        ],
        [
          "Pérdida u olvido del accesorio",
          "Resuelve el problema de dejar la sombrilla olvidada en restaurantes o universidades mediante la alarma de separación por Bluetooth, buzzer de búsqueda e integración con redes de rastreo global.",
        ],
        [
          "Sorpresas por cambios repentinos del clima",
          "Previene salir desprotegido ante un aguacero inesperado gracias a la alerta háptica en el mango que vibra de forma anticipada cuando la probabilidad de lluvia supera el 70% en tu zona.",
        ],
        [
          "Batería baja en dispositivos móviles",
          "Elimina la preocupación de quedarte incomunicado en la calle al ofrecer una fuente de energía portátil integrada de 5,000 mAh lista para cargar tu celular por USB-C.",
        ],
      ]
        .map(
          (c) => `<div class="card dark">
      <h3>${c[0]}</h3>
      <p>${c[1]}</p>
      </div>`,
        )
        .join("")}</div>`,
  },
  // 3. Value proposition
  {
    w: B,
    h: `<h2 class="rv">PROPUESTA DE VALOR<i style="color:#ff4d4d">🚫💧</i>
      </h2>
      <div class="big rv">
      <p>Transforma un objeto tradicional en un asistente de movilidad urbana inteligente que combina el confort físico, la gestión meteorológica, la seguridad antirrobo y la autonomía energética, todo en un solo dispositivo equilibrado.</p>
      <p>Ofrece una experiencia de uso más limpia y sin fricciones, eliminando las incomodidades asociadas al goteo y almacenamiento de paraguas convencionales en espacios públicos concurridos.</p>
      <p>Gracias a la integración de conectividad Bluetooth de bajo consumo y pantalla E-Ink, podrás mantenerte informado sobre el clima local en tiempo real sin sacrificar la duración de la batería ni añadir peso excesivo a la estructura.</p>
      </div>`,
  },
  // 4. Functions - overview
  {
    w: J,
    h: `<h2 class="rv">FUNCIONES</h2>
      <div style="display:grid;place-items:center">${umbrellaSVG()}</div>`,
  },
  // 5. Functions - closing mechanism
  {
    w: J,
    h: `<h2 class="rv">FUNCIONES</h2>
      <div class="two">
      <div class="grid rv">${closingStagesSVG()}<div class="card dark">
      <h3>Mecanismo de Cierre</h3>
      <p>La cara exterior (mojada) cierra hacia adentro dejando la superficie seca al exterior</p>
      </div>
      </div>${umbrellaSVG("closed")}</div>`,
  },
  // 6. Functions - water channelling and handle
  {
    w: J,
    h: diag("FUNCIONES", [
      [
        "Canalización del Agua",
        "Tela interior con recubrimiento nano-hidrofóbico. Las gotas resbalan por gravedad hacia el eje central",
      ],
      [
        "Mango con Depósito",
        "Tubo central hueco para almacenar el agua · Válvula unidireccional de silicona · Depósito de agua en el mango · Rosca inferior para vaciar el agua acumulada",
      ],
    ]),
  },
  // 7. Functions - mobile connection and energy
  {
    w: J,
    h: diag(
      "FUNCIONES",
      [
        ["Conexión móvil", "La app consulta una API meteorológica y envía los datos al paraguas"],
        ["Módulo de energía", "Baterías de litio ubicadas verticalmente dentro del tubo del bastón."],
        ["Alimentación dual", "Carga externa (powerbank) · Seguros + Pantalla + Vibración"],
        ["Puerto USB-C", "Puerto USB-C bidireccional (PD/QC) a prueba de agua"],
      ],
      0,
    ),
  },
  // 8. Functions - haptic alert and location
  {
    w: J,
    h: diag(
      "FUNCIONES",
      [
        ["Sistema de alerta háptica", "Micro motor de vibración x2"],
        ["Localización y seguridad", "Compatible con Apple Find My o Google Find My Device"],
      ],
      0,
    ),
  },
  // 9. Key benefits (1/2)
  {
    w: D,
    h: cards("BENEFICIOS CLAVE", "⚙️⭐$", [
      ["☂️", "Confort y Sequedad", "Cierre inverso antihumedad."],
      ["🌧️", "Clima Inteligente", "Alertas de lluvia por vibración."],
      ["🛡️", "Seguridad Anti-Pérdida", "Compatible con Find My (Google/iPhone)."],
    ]),
  },
  // 10. Key benefits (2/2)
  {
    w: D,
    h: cards("BENEFICIOS CLAVE", "⚙️⭐$", [
      ["🔋", "Power Bank Portátil", "Carga por puerto USB-C."],
      ["🍃", "Alto Impacto Sostenible", "Reduce sombrillas desechables."],
    ]),
  },
  // 11. Target audience
  {
    w: D,
    h: cards("PÚBLICO OBJETIVO", "👥", [
      ["🚶", "Tránsito Urbano", "Estudiantes y profesionales móviles."],
      ["🔲", "Early Adopters", "Entusiastas de la tecnología IoT."],
      ["✈️", "Viajeros Frecuentes", "Turistas explorando ciudades."],
    ]),
  },
  // 12. Business model
  {
    w: A,
    h: cards("MODELO DE NEGOCIO", "💼", [
      ["", "Ingresos", "Venta directa B2C y accesorios de repuesto."],
      ["", "Costos", "Manufactura electrónica y telas nano-hidrofóbicas."],
      ["", "Canales", "E-commerce, crowdfunding y tiendas tecnológicas."],
      ["", "Precios", "PVP de $89.99 USD con margen bruto del 55%."],
    ]),
  },
  // 13. Key partners
  {
    w: A,
    h: cards("ALIANZAS CLAVE", "🤝", [
      ["", "Redes de Rastreo", "Integración global con Apple Find My y Google Find My Device."],
      ["", "Tecnología Clima", "Proveedores de APIs meteorológicas para alertas hápticas."],
      ["", "Manufactura", "Alianzas con proveedores certificados de baterías y componentes IP67."],
    ]),
  },
];
