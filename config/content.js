/**
 * ═══════════════════════════════════════════════════════════
 *   ARCHIVO DE CONFIGURACIÓN — EDITA TODO LO QUE QUIERAS
 * ═══════════════════════════════════════════════════════════
 */

const CONFIG = {

  // ── Fecha de inicio de nuestra historia ───────────────────
  // 21 de mayo a las 10:00 PM (22:00:00)
  startDate: "2025-05-21T22:00:00",

  // ── Número de meses ───────────────────────────────────────
  months: 17,

  // ── Trivia Romántica: ¿Cuánto nos conocemos? ───────────────
  quiz: [
    {
      question: "¿Mi amor, dónde fue nuestro primer beso?",
      options: [
        { text: "Cerca de casa", correct: true },
        { text: "En casa", correct: false },
        { text: "En el colegio", correct: false },
        { text: "Nunca", correct: false }
      ],
      comment: "¡Sí, mi vida! Cerca de casa... imposible olvidar ese instante tan mágico. 💜"
    },
    {
      question: "¿Cuál es la canción que más te mencioné que era mi favorita?",
      options: [
        { text: "THE LONELIEST — Måneskin", correct: true },
        { text: "Apocalypse — Cigarettes After Sex", correct: false },
        { text: "Yellow — Coldplay", correct: false },
        { text: "Sweater Weather — The Neighbourhood", correct: false }
      ],
      comment: "¡Exacto, mi amor! THE LONELIEST de Måneskin... siempre te la mencionaba con el corazón. 🎵"
    },
    {
      question: "¿Nuestra relación tiene fecha de caducidad?",
      options: [
        { text: "Hasta el infinito y más allá 🚀💜", correct: true },
        { text: "Solo 100 años", correct: false },
        { text: "Hasta que se apaguen las estrellas", correct: false },
        { text: "Depende de la vida", correct: false }
      ],
      comment: "¡Hasta el infinito y más allá! Contigo no hay límites ni final. ✨"
    },
    {
      question: "¿A qué olía una de nuestras primeras cartas?",
      options: [
        { text: "A café ☕", correct: true },
        { text: "A chocolate y vainilla", correct: false },
        { text: "A perfume de rosas", correct: false },
        { text: "A lavanda fresca", correct: false }
      ],
      comment: "¡A café! Ese aroma que guardaba tantas ilusiones y que hoy es un recuerdo hermoso. ☕💜"
    }
  ],

  // ── Rasca y Descubre (Juego Bonus tras la Trivia) ─────────
  scratchCard: {
    badge: "✦ RECOMPENSA DESBLOQUEADA ✦",
    title: "Rasca con tu dedo para descubrir tu premio",
    subtitle: "Por acertar todas las preguntas de nuestra historia... 💜",
    couponTitle: "TICKET DE AMOR OFICIAL",
    couponReward: "Una cena romántica donde tú elijas + Abrazos y besos ilimitados + Escribir juntos todos los capítulos que faltan 💜",
    couponFooter: "Válido para siempre • Sin fecha de vencimiento"
  },

  // ── 1. Frasco de las 17 Razones por las que te amo ─────────
  reasons: [
    "Por tu risa cuando algo te toma por sorpresa y llena todo de luz.",
    "Por la ternura silenciosa con la que cuidas a las personas que amas.",
    "Por la forma en que me miras cuando crees que no me doy cuenta.",
    "Por ser mi paz y mi refugio después de cualquier día difícil.",
    "Por esas conversaciones que se nos pasan volando hasta la madrugada.",
    "Por ser el motorcito que me motiva a levantarme y dar lo mejor de mí.",
    "Por tus abrazos, que tienen el poder de reiniciar mi mundo entero.",
    "Por cómo te emocionas con los pequeños detalles que para otros pasan desapercibidos.",
    "Por ser mi compañera de risas, de tonterías y de aventuras.",
    "Por la dulzura única de tu voz cuando me dices 'mi amor'.",
    "Por enseñarme a amar de una manera bonita, honesta y real.",
    "Por tu inteligencia, tu determinación y esa luz propia que brilla donde vas.",
    "Por ser tan tú: transparente, auténtica y hermosa por dentro y por fuera.",
    "Por quererme con todo y mis imperfecciones, haciéndome sentir el más afortunado.",
    "Por cada memoria hermosa que hemos construido juntos en estos 17 meses.",
    "Por ser mi presente favorito y el futuro que más deseo construir.",
    "Porque de todas las personas de este planeta, te volvería a elegir a ti mil vidas más 💜"
  ],

  // ── 4. Cofre de Promesas para el Futuro ───────────────────
  promises: [
    {
      id: "carta-1",
      tag: "Para cuando tengas un día difícil...",
      title: "Para cuando me extrañes en un día nublado 🌧️",
      content: "Mi amorcito lindo, recuerda siempre que no estás sola. Aunque haya distancia o momentos difíciles, estoy contigo en cada pensamiento y en cada latido. Cierra los ojos, respira profundo y recuerda que hay alguien que daría todo por verte sonreír. Eres más fuerte de lo que crees, y pase lo que pase, yo siempre estaré aquí para cuidarte y recordarte lo valiosa que eres. Te amo con toda mi alma."
    },
    {
      id: "carta-2",
      tag: "Para cuando cumplamos 2 años...",
      title: "Para nuestro próximo aniversario 🥂",
      content: "Mi querida Dania, si hoy a los 17 meses siento que mi corazón no cabe en el pecho de tanto amarte, para cuando leas esto habremos sumado muchos más capítulos, risas y victorias juntos. Prometo que seguiré enamorándome de ti cada día, aprendiendo a tu lado y cuidando este amor bonito que Dios nos regaló. ¡Por muchos años más juntos!"
    },
    {
      id: "carta-3",
      tag: "Para cuando estemos viejitos...",
      title: "Para cuando miremos atrás con el pelo blanco 👵👴",
      content: "Mi doncella, mi princesa de toda la vida: te prometo que cuando pasen las décadas, seguiré tomándote de la mano con el mismo temblor bonito del primer día. Te recordaré siempre que sigues siendo la niña de mis ojos, la más hermosa del universo, y daré gracias al cielo por el 21 de mayo en que comenzó nuestra historia de amor. Siempre tuyo, Sergio."
    }
  ],

  // ── La Carta para Dania ──────────────────────────────────
  letter: {
    salutation: "Mi amorcito lindo,",

    dedication: "Mi querida Dania, mi querida dama, mi querida doncella, mi querida princesa, mi querida bebita:",

    paragraphs: [
      "Han pasado 17 meses desde que me regalaste la oportunidad de conocerte de verdad, y todavía me cuesta creer que tengo la suerte de llamarte mía.",

      "Recuerdo cómo empezó todo: aquellos primeros nervios, las primeras conversaciones que se extendían hasta la madrugada, la forma en que poco a poco fui descubriendo que tú eras exactamente lo que necesitaba.",

      "Lo que más admiro de ti no son solo las cosas grandes. Son los pequeños detalles que haces sin darte cuenta: la manera en que te ríes cuando algo te sorprende, cómo cuidas a las personas que quieres con una intensidad silenciosa, la forma en que me miras cuando crees que no me doy cuenta.",

      "Estos 17 meses han sido los más bonitos y honestos de mi vida. Hemos reído, hemos crecido, hemos aprendido a querernos con todo y nuestras imperfecciones. Con el favor de Dios nunca me dejarás solito, y si pudiera volver al principio, volvería a elegirte sin dudar un segundo.",

      "Hoy quiero que sepas que no me imagino los capítulos que siguen sin que estés en cada página. A pesar de esta nueva etapa de nuestra relación, cada día te amo mucho más, vida mía. Nunca sales de mi corazón ni de mis pensamientos; eres ese motorcito por el cual me levanto motivado a hacer mis cosas del día a día.",

      "Eres mi favorita, mi tranquilidad y mi aventura al mismo tiempo.",

      "Gracias por existir. Gracias por quedarte. Gracias por ser tú."
    ],

    closing: "Con todo mi amor,",
    signature: "Sergio Andrés Alfonso Piñeros 💜"
  },

  // ── Posdata del sobre (final de la página) ────────────────
  postdata: "P.D.: Cada vez que te miro pienso que soy la persona más afortunada del mundo. Y eso no va a cambiar jamás, mi Dania hermosa.",

  // ── Fotografías en el árbol ───────────────────────────────
  photos: [
    {
      src: "public/images/foto1.jpeg",
      fallbackSrc: "img/Whats.jpeg",
      phrase: "El día que supe que eras mi favorita en el mundo entero 💜",
      alt: "Dania y Sergio juntos"
    },
    {
      src: "public/images/foto2.jpeg",
      fallbackSrc: "img/WhatsApp Image 2026-10-.jpeg",
      phrase: "Cada sonrisa tuya ilumina por completo todos mis días ✨",
      alt: "Sonriendo juntos"
    },
    {
      src: "public/images/foto3.jpeg",
      fallbackSrc: "img/WhatsApp Image 2026-10-20 at  PM.jpeg",
      phrase: "Eres mi tranquilidad, mi paz y mi lugar seguro siempre 🌙",
      alt: "Un momento especial"
    },
    {
      src: "public/images/foto4.jpeg",
      fallbackSrc: "img/WhatsApp Image 2026-10-20 at 11.25.25 PM.jpeg",
      phrase: "17 meses de risas, miradas y complicidad infinita 💕",
      alt: "Aventuras juntos"
    },
    {
      src: "public/images/foto5.jpeg",
      fallbackSrc: "img/WhatsApp Image 2026-10-20 at 11.25.26 PMhbkjb.jpeg",
      phrase: "El motor de mi vida por el cual me levanto motivado cada día 🌸",
      alt: "Un recuerdo inolvidable"
    },
    {
      src: "public/images/foto6.jpeg",
      fallbackSrc: "img/WhatsApp Image.jpeg",
      phrase: "Te elijo hoy y te elegiría en todas mis vidas, mi princesa 👑",
      alt: "Nuestra historia de amor"
    }
  ],

  // ── Música de fondo ───────────────────────────────────────
  audio: {
    src: "Sound/apocalypse.mp3",
    fallbackSrc: "public/cancion.mp3",
    title: "Apocalypse",
    artist: "Cigarettes After Sex"
  }
};
