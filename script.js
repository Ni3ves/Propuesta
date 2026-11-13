/*
  💖 SORPRESA PARA JENNIFER
  Personaliza aquí el mensaje y las palabras del universo.
  Este sitio funciona de forma estática en GitHub Pages.
*/

const escenas = {
  pregunta: document.getElementById('escena-pregunta'),
  si: document.getElementById('escena-si'),
  galaxia: document.getElementById('escena-galaxia')
};

// La canción COMPLETA se reproducirá desde tu archivo local, no desde Spotify.
// Pon en esta carpeta un archivo legalmente utilizable llamado cancion-jennifer.mp3.
// El toque en «Para ti» inicia el audio sin tener que presionar ▶ por separado.
const audio = document.getElementById('audio');
const estadoMusica = document.getElementById('estado-musica');

function iniciarCancion() {
  // La llamada a play() sucede directamente en el evento del botón, para
  // que la mayoría de navegadores móviles permitan reproducirla con sonido.
  audio.currentTime = 0;
  reproducirMusica();
}
function detenerCancion() {
  audio.pause();
  audio.currentTime = 0;
  actualizarBotonMusica();
  actualizarProgreso();
  estadoMusica.textContent = '';
}
const botonMusica = document.getElementById('btn-musica');
const progreso = document.getElementById('progreso');
const tiempo = document.getElementById('tiempo');

function mostrarEscena(nombre) {
  Object.entries(escenas).forEach(([clave, elemento]) => {
    const activa = clave === nombre;
    elemento.hidden = !activa;
    elemento.classList.toggle('is-active', activa);
  });
  const titulo = escenas[nombre].querySelector('h1, h2');
  if (titulo) titulo.setAttribute('tabindex', '-1');
  if (titulo) titulo.focus({ preventScroll: true });
}

function lluviaDeCorazones() {
  const contenedor = document.getElementById('corazones');
  const emojis = ['💗', '💕', '💖', '💞', '✨', '🌷'];
  for (let i = 0; i < 30; i++) {
    const corazon = document.createElement('span');
    corazon.className = 'burst-heart';
    corazon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    corazon.style.setProperty('--left', `${Math.random() * 100}%`);
    corazon.style.setProperty('--size', `${17 + Math.random() * 23}px`);
    corazon.style.setProperty('--drift', `${(Math.random() - .5) * 180}px`);
    corazon.style.setProperty('--duration', `${2.6 + Math.random() * 2.5}s`);
    corazon.style.animationDelay = `${Math.random() * .9}s`;
    contenedor.appendChild(corazon);
    corazon.addEventListener('animationend', () => corazon.remove(), { once: true });
  }
}

document.getElementById('btn-si').addEventListener('click', () => {
  mostrarEscena('si');
  lluviaDeCorazones();
});
// BOTÓN "NO": se escapa del cursor y del dedo, como en el TikTok.
const botonNo = document.getElementById('btn-no');
const botonSi = document.getElementById('btn-si');
const filaBotones = botonNo.parentElement;

function moverBotonNo(evento) {
  // Evita que un toque en el celular active accidentalmente un clic.
  if (evento.cancelable && (evento.type === 'pointerdown' || evento.type === 'click')) {
    evento.preventDefault();
  }

  const margen = 18;
  const ancho = botonNo.offsetWidth;
  const alto = botonNo.offsetHeight;
  const anchoUtil = Math.max(0, window.innerWidth - ancho - margen * 2);
  const altoUtil = Math.max(0, window.innerHeight - alto - margen * 2);
  const antes = botonNo.getBoundingClientRect();
  const zonaSi = botonSi.getBoundingClientRect();
  // Permitir que el botón se mueva por toda la pantalla
if (!botonNo.classList.contains('se-escapa')) {
    escenas.pregunta.appendChild(botonNo);
}
  let x = margen;
  let y = margen;

  // Busca una nueva ubicación visible, sin tapar el botón de "Sí".
  for (let intento = 0; intento < 35; intento++) {
    x = margen + Math.random() * anchoUtil;
    y = margen + Math.random() * altoUtil;
    const lejosDeAntes = Math.hypot(x - antes.left, y - antes.top) > 115;
    const lejosDelSi = x + ancho < zonaSi.left - 16 ||
      x > zonaSi.right + 16 || y + alto < zonaSi.top - 16 || y > zonaSi.bottom + 16;
    if (lejosDeAntes && lejosDelSi) break;
  }

  botonNo.classList.add('se-escapa');
  botonNo.style.left = `${x}px`;
  botonNo.style.top = `${y}px`;
}

// Computadora: huye cuando se acerca el puntero.
botonNo.addEventListener('pointerenter', (evento) => {
  if (evento.pointerType === 'mouse' || evento.pointerType === 'pen') moverBotonNo(evento);
});
// Celular: cambia de lugar en cuanto intenta tocarlo.
botonNo.addEventListener('pointerdown', moverBotonNo);
// Respaldo para clic con teclado y navegadores que no emiten eventos de puntero.
botonNo.addEventListener('click', moverBotonNo);

document.getElementById('btn-sorpresa').addEventListener('click', () => {
  mostrarEscena('galaxia');
  iniciarCancion(); // El toque en «Para ti» también activa la música.
  ajustarCosmos();
  encenderCosmos();
});
document.getElementById('btn-repetir').addEventListener('click', () => {
  detenerCancion();
  apagarCosmos();
  botonNo.classList.remove('se-escapa');
  botonNo.style.left = '';
  botonNo.style.top = '';

// Regresar el botón a su posición original
filaBotones.appendChild(botonNo);

mostrarEscena('pregunta');
});

// FRASES FLOTANTES: cambia o agrega las que tú quieras.
const palabrasBonitas = [
  '❤️ Te Amo',
  '💗 Jennifer', '✨ Tu sonrisa', '🌙 Mi cielo', '💖 Tú y yo',
  '🌷 Eres especial', '💫 Qué bonito coincidir', '💕 Me encantas',
  '🌎 Mi universo', '🫶 Contigo', '🌟 Brillas', '💞 Mi persona favorita',
  '☀️ Mi sol', '🥰 Tu risa', '🌈 Mi alegría', '💌 Te elijo',
  '❤️ Mi cariño', '🎁 Mi regalo', '🌹 Eres única', '⭐ Mis estrellas',
  '💐 Gracias por llegar', '🦋 Momentos bonitos', '✨ Mi ilusión',
  '💗 Siempre tú', '🌸 Nuestra historia', '🌠 Mis deseos'
];

// Generador pseudoaleatorio estable para que la galaxia no cambie bruscamente.
let semilla = 2026;
function azar() {
  semilla = (semilla * 1664525 + 1013904223) >>> 0;
  return semilla / 4294967296;
}

// Distribución por filas: evita que las palabras se encimen y deja
// visible el corazón del centro y el reproductor de abajo.
function crearGalaxia() {
  const palabras = document.getElementById('palabras');
  const estrellas = document.getElementById('estrellas');
  palabras.replaceChildren();
  estrellas.replaceChildren();

  const movil = window.innerWidth < 650;
  const filas = [31, 37, 43, 49, 55, 61, 67, 73, 79];
  const colores = ['#fff8fa', '#ffe2f4', '#ffe7cc', '#e6dbff', '#ffeefe'];
  let indice = 0;
  filas.forEach((altura, numero) => {
    const posiciones = movil
      ? (numero % 2 ? [20, 82] : [24, 78])
      : (numero === 0 || numero === 8 ? [22, 50, 79] : [11, 31, 70, 89]);
    posiciones.forEach((horizontal, cual) => {
      // En móviles no hay palabras sobre el centro del planeta.
      const frase = document.createElement('span');
      frase.className = 'galaxy-word' + (indice % 6 === 0 ? ' featured' : '');
      frase.textContent = palabrasBonitas[indice % palabrasBonitas.length];
      // ❤️ Efecto especial para la frase "Te amo"
if (frase.textContent.toLowerCase().includes('te amo')) {
    frase.classList.add('te-amo');
}
      frase.style.setProperty('--left', `${horizontal}%`);
      frase.style.setProperty('--top', `${altura + (cual % 2 ? 1.4 : -1.4)}%`);
      frase.style.setProperty('--size', movil ? `${10.7 + azar()*2.3}px` : `${13 + azar() * 6}px`);
      frase.style.setProperty('--opacity', `${.68 + azar() * .29}`);
      frase.style.setProperty('--duration', `${5 + azar() * 8}s`);
      frase.style.setProperty('--delay', `${-azar() * 10}s`);
      frase.style.setProperty('--color', colores[indice % colores.length]);
      palabras.appendChild(frase);
      indice++;
    });
  });

  // Algunas estrellas se iluminan mediante CSS; otras se mueven en canvas.
  for (let i = 0; i < (movil ? 52 : 90); i++) {
    const estrella = document.createElement('span');
    estrella.className = 'space-star';
    estrella.style.left = `${azar() * 100}%`;
    estrella.style.top = `${azar() * 100}%`;
    estrella.style.setProperty('--s', `${1 + azar()*2.6}px`);
    estrella.style.setProperty('--t', `${2 + azar()*4}s`);
    estrella.style.setProperty('--color', colores[i % colores.length]);
    estrella.style.animationDelay = `${-azar()*5}s`;
    estrellas.appendChild(estrella);
  }
}
crearGalaxia();

// Un cielo estrellado animado con JavaScript sin librerías externas.
// Se dibuja únicamente al ver la galaxia, y se detiene al cambiar de pestaña.
const canvas = document.getElementById('cosmos-canvas');
const contexto = canvas.getContext('2d', { alpha: true });
const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let puntos = [];
let estrellasGiratorias = [];
let anchoCanvas = 0;
let altoCanvas = 0;
let fotograma = null;

function ajustarCosmos() {
  if (!contexto) return;
  anchoCanvas = canvas.clientWidth;
  altoCanvas = canvas.clientHeight;
  const escala = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(anchoCanvas * escala);
  canvas.height = Math.round(altoCanvas * escala);
  contexto.setTransform(escala, 0, 0, escala, 0, 0);
  const cantidad = window.innerWidth < 650 ? 90 : 180;
  puntos = Array.from({ length: cantidad }, () => ({
    x: azar() * anchoCanvas, y: azar() * altoCanvas,
    radio: .5 + azar() * 1.5, fase: azar() * 7,
    tono: ['#fffaf4', '#ffc2e6', '#bdb4ff', '#ffdcb8'][Math.floor(azar()*4)]
  }));
  estrellasGiratorias = Array.from({ length: window.innerWidth < 650 ? 100 : 250 }, () => ({
    angulo: azar() * Math.PI * 2,
    radio: .08 + Math.sqrt(azar()) * .94,
    fase: azar() * Math.PI * 2,
    radioPunto: .5 + azar() * 1.5,
    tono: ['#ffcbf0', '#ffecf7', '#b7a8ff', '#ffd8a2'][Math.floor(azar()*4)]
  }));
}

function dibujarCosmos(tiempo) {
  if (!contexto || !anchoCanvas || !altoCanvas) return;
  contexto.clearRect(0,0,anchoCanvas,altoCanvas);
  const t = tiempo * .001;

  // El firmamento en diferentes profundidades.
  for (const punto of puntos) {
    const destello = .32 + .5 * (Math.sin(t * 1.2 + punto.fase) + 1) / 2;
    contexto.globalAlpha = destello;
    contexto.fillStyle = punto.tono;
    contexto.beginPath();
    contexto.arc(punto.x, punto.y, punto.radio, 0, Math.PI * 2);
    contexto.fill();
  }

  // Dos brazos de luz girando alrededor del pequeño planeta del centro.
  const cx = anchoCanvas * .5;
  const cy = altoCanvas * .55;
  const extensionX = Math.min(anchoCanvas * .53, altoCanvas * .53);
  const extensionY = Math.min(altoCanvas * .29, anchoCanvas * .35);
  contexto.globalCompositeOperation = 'screen';
  for (const estrella of estrellasGiratorias) {
    const theta = estrella.angulo + t * (.025 + .03 / (estrella.radio + .4)) + estrella.radio * 8.2;
    const ondulacion = 1 + .055 * Math.sin(t*.7 + estrella.fase);
    const x = cx + Math.cos(theta) * extensionX * estrella.radio * ondulacion;
    const y = cy + Math.sin(theta) * extensionY * estrella.radio + Math.sin(theta * 3 + estrella.fase) * 7;
    contexto.fillStyle = estrella.tono;
    contexto.globalAlpha = .3 + .65 * Math.max(0,Math.sin(t*.9 + estrella.fase));
    contexto.beginPath();
    contexto.arc(x,y,estrella.radioPunto,0,Math.PI*2);
    contexto.fill();
  }

  // Estrella fugaz: una estela suave reaparece de vez en cuando.
  const ciclo = (t % 9.7) / 9.7;
  if (ciclo < .22) {
    const avance = ciclo / .22;
    const x = anchoCanvas * (.03 + avance * .9);
    const y = altoCanvas * (.22 + avance * .22);
    const cola = 110;
    const degradado = contexto.createLinearGradient(x-cola, y-cola*.3, x, y);
    degradado.addColorStop(0,'#ffecff00');
    degradado.addColorStop(.75,'#cda6ff8a');
    degradado.addColorStop(1,'#fffaff');
    contexto.strokeStyle = degradado;
    contexto.lineWidth = 2;
    contexto.globalAlpha = .8;
    contexto.beginPath(); contexto.moveTo(x-cola,y-cola*.3); contexto.lineTo(x,y); contexto.stroke();
  }
  contexto.globalAlpha = 1;
  contexto.globalCompositeOperation = 'source-over';
}

function animarCosmos(tiempo) {
  if (escenas.galaxia.hidden || document.hidden) { fotograma = null; return; }
  dibujarCosmos(tiempo);
  fotograma = movimientoReducido ? null : requestAnimationFrame(animarCosmos);
}
function encenderCosmos() {
  if (!contexto) return;
  if (!anchoCanvas || !altoCanvas) ajustarCosmos();
  if (fotograma !== null) cancelAnimationFrame(fotograma);
  fotograma = null;
  if (movimientoReducido) dibujarCosmos(0);
  else fotograma = requestAnimationFrame(animarCosmos);
}
function apagarCosmos() {
  if (fotograma !== null) cancelAnimationFrame(fotograma);
  fotograma = null;
}
const esperarTamano = () => {
  if (escenas.galaxia.hidden) return;
  ajustarCosmos();
  encenderCosmos();
};
window.addEventListener('resize', esperarTamano, { passive:true });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) apagarCosmos();
  else if (!escenas.galaxia.hidden) encenderCosmos();
});

// REPRODUCTOR MP3: reproduce el archivo completo que coloques en esta carpeta.
function formatoTiempo(segundos) {
  if (!Number.isFinite(segundos)) return '0:00';
  const numero = Math.floor(segundos);
  return `${Math.floor(numero / 60)}:${String(numero % 60).padStart(2, '0')}`;
}
function actualizarBotonMusica() {
  const sonando = !audio.paused;
  botonMusica.textContent = sonando ? 'Ⅱ' : '▶';
  botonMusica.setAttribute('aria-label', sonando ? 'Pausar música' : 'Reproducir música');
}
function actualizarProgreso() {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    progreso.value = String((audio.currentTime / audio.duration) * 100);
  }
  tiempo.textContent = `${formatoTiempo(audio.currentTime)} / ${formatoTiempo(audio.duration)}`;
}
function reproducirMusica() {
  estadoMusica.textContent = '';
  const intento = audio.play();
  if (intento && typeof intento.catch === 'function') {
    intento.catch((error) => {
      if (error.name === 'NotAllowedError') {
        estadoMusica.textContent = 'Tu navegador pide un toque más. Presiona ▶.';
      } else {
        estadoMusica.textContent = 'No se encuentra la canción. Agrega cancion-jennifer.mp3 a esta carpeta.';
      }
      actualizarBotonMusica();
      console.info('No se pudo iniciar el audio:', error);
    });
  }
}
botonMusica.addEventListener('click', () => {
  if (audio.paused) reproducirMusica();
  else audio.pause();
});
audio.addEventListener('play', actualizarBotonMusica);
audio.addEventListener('pause', actualizarBotonMusica);
audio.addEventListener('timeupdate', actualizarProgreso);
audio.addEventListener('loadedmetadata', actualizarProgreso);
audio.addEventListener('error', () => {
  estadoMusica.textContent = 'Falta el archivo cancion-jennifer.mp3 en esta carpeta.';
});
audio.addEventListener('ended', () => { actualizarBotonMusica(); actualizarProgreso(); });
progreso.addEventListener('input', () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = (Number(progreso.value) / 100) * audio.duration;
});
actualizarBotonMusica();
