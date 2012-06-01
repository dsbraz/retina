var isCremeOn = false,
    clearCount = 5;

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
  var lens = document.getElementById('lens'),
      retina = document.getElementById('retina');
  lens.style.backgroundPosition = (bgOffset.left - pos.left + 350) + 'px ' + (bgOffset.top - pos.top + 200) + 'px';
  retina.style.left = (pos.left - 350) + 'px';
  retina.style.top = (pos.top - 250) + 'px';
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

function drawBackground() {
  var ctx = document.getCSSCanvasContext('2d', 'lensbg', 1024, 768),
      img = new Image();
  img.src = 'img/rosto_zoom.jpg';
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = 'red';
    // Desenhando na testa
    for (var i = 0; i < clearCount; i++) {
      var rand_x = 350 + Math.floor(Math.random() * 300);
      var rand_y = 115 + Math.floor(Math.random() * 120);
      ctx.beginPath();
      ctx.arc(rand_x,rand_y,6,0,360,false);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(rand_x,rand_y,5,0,360,false);
      ctx.fill();
    }
  }
}

function cleanRosto(parte) {
  var partes = ['testa', 'face_esquerda', 'face_direita', 'queixo'];
  if (partes.indexOf(parte) > -1) {
    var lens = document.getElementById('lens'),
        imagem = document.getElementById(parte);
    if (clearCount == 1) {
      imagem.src = 'img/sem_brilho/' + parte + '.jpg';
    }
    drawBackground();
    clearCount--;
  }
}

function cremeClick(event) {
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
      rosto = document.getElementById('rosto'),
      lens = document.getElementById('lens');
  creme.addEventListener('click', cremeClick, false);
  rosto.addEventListener('touchstart', rostoTouchStart, false);
  rosto.addEventListener('touchend', rostoTouchEnd, false);
  rosto.addEventListener('touchmove', rostoTouchMove, false);
  drawBackground();
}
