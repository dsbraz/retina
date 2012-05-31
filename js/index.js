var isCremeOn = false,
    clearCount = 0;

function rostoOffset() {
  var rosto = document.getElementById('rosto');
  return {
    left: rosto.offsetLeft,
    top: rosto.offsetTop
  }
}

function touchePosition(event) {
  return {
    left: event.touches[0].pageX,
    top: event.touches[0].pageY,
  }
}

function moveRetina(pos, bgOffset) {
  var retina = document.getElementById('retina');
  var lens = document.getElementById('lens');
  retina.style.left = (pos.left - 350) + 'px';
  retina.style.top = (pos.top - 250) + 'px';
  lens.style.backgroundPosition = (bgOffset.left - pos.left + 350) + 'px ' + (bgOffset.top - pos.top + 200) + 'px';
}

function displayRetina(show) {
  var retina = document.getElementById('retina');
  retina.style.display = show? 'block' : 'none';
}

function onOffCreme() {
  isCremeOn = !isCremeOn;
  var creme = document.getElementById('creme');
  if (isCremeOn) {
    creme.style.borderStyle = 'inset';
    creme.style.backgroundColor = '#FF9933';
  } else {
    creme.style.borderStyle = 'outset';
    creme.style.backgroundColor = '#FFCC33';
  } 
}

function cleanRosto(parte) {
  var partes = ['testa', 'face_esquerda', 'nariz', 'face_direita', 'queixo'];
  if (partes.indexOf(parte) > -1) {
    var lens = document.getElementById('lens'),
        imagem = document.getElementById(parte);
    lens.style.backgroundImage = 'url("img/rosto_limpo.jpg")';
    imagem.src = 'img/sem_brilho/' + parte + '.jpg';
    clearCount += 1;
  }
}

function cremeClick(event) {
  if (isCremeOn && clearCount < 5) {
    alert('Tsc, tsc.. voce ainda nao limpou o rosto todo, faltam limpar ' + (5 - clearCount) + ' areas');
    return;
  }
  onOffCreme();
}

function rostoTouchStart(event) {
  rostoTouchMove(event);
  displayRetina(!isCremeOn);
  if (isCremeOn) {
    cleanRosto(event.target.id);
  }
}

function rostoTouchEnd(event) {
  var retina = document.getElementById('retina');
  displayRetina(false);
}

function rostoTouchMove(event) {
  event.preventDefault();
  if (!isCremeOn) {
    moveRetina(touchePosition(event), rostoOffset());
  }
}

function load() {
  var creme = document.getElementById('creme'),
      rosto = document.getElementById('rosto');
  creme.addEventListener('click', cremeClick, false);
  rosto.addEventListener('touchstart', rostoTouchStart, false);
  rosto.addEventListener('touchend', rostoTouchEnd, false);
  rosto.addEventListener('touchmove', rostoTouchMove, false);
}
