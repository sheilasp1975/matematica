// =============================================
//   PORTAFOLIO WEB MATEMÁTICA – scripts.js
//   HTML5 · CSS3 · JavaScript – UPRIT
// =============================================

// ── 1. ESTRELLAS INTERACTIVAS ──────────────────
function initEstrellas() {
  const estrellas = document.querySelectorAll('.estrella');
  const contador  = document.getElementById('contador-estrellas');
  let activas = 0;

  estrellas.forEach((estrella, idx) => {
    estrella.addEventListener('click', () => {
      activas = idx + 1;
      estrellas.forEach((e, i) => {
        e.classList.toggle('apagada', i >= activas);
      });
      if (contador) contador.textContent = `Contaste ${activas} estrella${activas !== 1 ? 's' : ''} ⭐`;
    });
  });
}

// ── 2. CALCULADORA SUMA ────────────────────────
function calcularSuma() {
  const a   = parseFloat(document.getElementById('suma-a').value) || 0;
  const b   = parseFloat(document.getElementById('suma-b').value) || 0;
  const res = document.getElementById('resultado-suma');
  if (res) {
    const total = a + b;
    res.textContent = `= ${total} ${'🍎'.repeat(Math.min(total, 10))}`;
    res.style.animation = 'none';
    requestAnimationFrame(() => { res.style.animation = ''; });
  }
}

// ── 3. CALCULADORA RESTA ──────────────────────
function calcularResta() {
  const a   = parseFloat(document.getElementById('resta-a').value) || 0;
  const b   = parseFloat(document.getElementById('resta-b').value) || 0;
  const res = document.getElementById('resultado-resta');
  if (res) {
    const total = a - b;
    res.textContent = total >= 0
      ? `= ${total} ${'🍊'.repeat(Math.min(total, 10))}`
      : `= ${total} 🤔 (resultado negativo)`;
  }
}

// ── 4. FIGURAS GEOMÉTRICAS ─────────────────────
function initFiguras() {
  const figuras = document.querySelectorAll('.figura-item');
  const info    = document.getElementById('info-figura');
  const datos   = {
    circulo:    { texto: '⭕ El círculo no tiene lados ni esquinas. Es redondo y perfecto.',       color: '#bae6fd' },
    cuadrado:   { texto: '🟦 El cuadrado tiene 4 lados iguales y 4 esquinas (ángulos rectos).',    color: '#bbf7d0' },
    triangulo:  { texto: '🔺 El triángulo tiene 3 lados y 3 esquinas. ¡Muy fuerte!',               color: '#fed7aa' },
    rectangulo: { texto: '▭ El rectángulo tiene 4 lados: 2 largos y 2 cortos.',                   color: '#e9d5ff' },
    rombo:      { texto: '🔷 El rombo tiene 4 lados iguales pero sus ángulos no son rectos.',      color: '#fde68a' },
    pentagono:  { texto: '⬠ El pentágono tiene 5 lados y 5 esquinas. ¡Como una casa!',             color: '#fecdd3' },
  };

  figuras.forEach(fig => {
    fig.addEventListener('click', () => {
      const tipo = fig.dataset.figura;
      if (info && datos[tipo]) {
        info.textContent = datos[tipo].texto;
        info.style.background = datos[tipo].color;
        info.style.padding    = '0.7rem 1rem';
        info.style.borderRadius = '10px';
        info.style.marginTop  = '0.8rem';
        info.style.fontWeight = '700';
      }
    });
  });
}

// ── 5. EMOCIONES ──────────────────────────────
function initEmociones() {
  const btns    = document.querySelectorAll('.emocion-btn');
  const mensaje = document.getElementById('mensaje-emocion');
  const textos  = {
    feliz:     '¡Qué bueno! ¡Eres genial! 🌟 ¡Sigue así!',
    normal:    '¡Mañana será mejor! Tú puedes 💪',
    triste:    '¡No te preocupes! Aprender toma tiempo 🤗',
    sorpresa:  '¡Guau! ¡Eso es fantástico! ✨',
    orgulloso: '¡Estás aprendiendo mucho! ¡Bravo! 🏆',
  };

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('seleccionado'));
      btn.classList.add('seleccionado');
      if (mensaje) mensaje.textContent = textos[btn.dataset.emocion] || '¡Gracias por compartir! 😊';
    });
  });
}

// ── 6. QUIZ DE SUMAS ALEATORIO ────────────────
let quizCorrecto = null;

function nuevaPregunta() {
  const a       = Math.floor(Math.random() * 10) + 1;
  const b       = Math.floor(Math.random() * 10) + 1;
  quizCorrecto  = a + b;

  const pregEl  = document.getElementById('quiz-pregunta');
  const optsEl  = document.getElementById('quiz-opciones');
  const feedEl  = document.getElementById('quiz-feedback');

  if (!pregEl || !optsEl) return;

  pregEl.textContent = `¿Cuánto es ${a} + ${b}?`;
  feedEl.textContent = '';

  // Generar opciones únicas
  const opciones = new Set([quizCorrecto]);
  while (opciones.size < 4) {
    opciones.add(quizCorrecto + Math.floor(Math.random() * 7) - 3);
  }
  const arr = [...opciones].sort(() => Math.random() - 0.5);

  optsEl.innerHTML = '';
  arr.forEach(op => {
    const btn = document.createElement('button');
    btn.className    = 'quiz-opcion';
    btn.textContent  = op;
    btn.addEventListener('click', () => verificarRespuesta(op, btn));
    optsEl.appendChild(btn);
  });
}

function verificarRespuesta(respuesta, btnEl) {
  const feedEl  = document.getElementById('quiz-feedback');
  const opciones = document.querySelectorAll('.quiz-opcion');
  opciones.forEach(b => b.disabled = true);

  if (respuesta === quizCorrecto) {
    btnEl.classList.add('correcto');
    feedEl.textContent = '✅ ¡Correcto! ¡Muy bien! 🎉';
    feedEl.style.color = '#15803d';
  } else {
    btnEl.classList.add('incorrecto');
    feedEl.textContent = `❌ La respuesta era ${quizCorrecto}. ¡Inténtalo de nuevo!`;
    feedEl.style.color = '#b91c1c';
    opciones.forEach(b => {
      if (parseInt(b.textContent) === quizCorrecto) b.classList.add('correcto');
    });
  }
}

// ── INIT ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initEstrellas();
  initFiguras();
  initEmociones();
  nuevaPregunta();

  // Enter en inputs de calculadoras
  document.getElementById('suma-a')?.addEventListener('keydown', e => { if (e.key === 'Enter') calcularSuma(); });
  document.getElementById('suma-b')?.addEventListener('keydown', e => { if (e.key === 'Enter') calcularSuma(); });
  document.getElementById('resta-a')?.addEventListener('keydown', e => { if (e.key === 'Enter') calcularResta(); });
  document.getElementById('resta-b')?.addEventListener('keydown', e => { if (e.key === 'Enter') calcularResta(); });
});
