var isCremeOn = false,
    clearCount = {
      'testa': 12,
      'face_esquerda': 12,
      'face_direita': 12,
      'queixo': 12
    };

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
  var lente = document.getElementById('lente'),
      retina = document.getElementById('retina');
  lente.style.backgroundPosition = (bgOffset.left - pos.left + 350) + 'px ' + (bgOffset.top - pos.top + 200) + 'px';
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

function drawGorduras(ctx, qtde, left, top, lquota, tquota) {
  for (var i = 0; i < qtde; i++) {
    var x = left + Math.floor(Math.random() * lquota);
    var y = top + Math.floor(Math.random() * tquota);
    ctx.beginPath();
    ctx.fillStyle = '#CC3300';
    ctx.arc(x, y, 5, 0, 360, false);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#993300';
    ctx.arc(x, y, 4, 0, 360, false);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#333000';
    ctx.arc(x, y, 3, 0, 360, false);
    ctx.fill();
  }
}

function drawLenteBackground() {
  var ctx = document.getCSSCanvasContext('2d', 'lentebg', 1024, 768),
      img = new Image();
  img.src = 'img/rosto_zoom.jpg';
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    drawGorduras(ctx, clearCount['testa'], 360, 115, 280, 120);
    drawGorduras(ctx, clearCount['face_esquerda'], 280, 340, 100, 140);
    drawGorduras(ctx, clearCount['face_direita'], 520, 360, 100, 140);
    drawGorduras(ctx, clearCount['queixo'], 300, 560, 270, 50);
  }
}

function clearRosto(parte) {
  var partes = ['testa', 'face_esquerda', 'face_direita', 'queixo'];
  if (partes.indexOf(parte) > -1) {
    if (clearCount[parte] <= 4) {
      var imagem = document.getElementById(parte);
      imagem.src = 'img/sem_brilho/' + parte + '.jpg';
    }
    clearCount[parte] -= 4;
    drawLenteBackground();
  }
}

function cremeClick(event) {
  onOffCreme();
}

function rostoTouchStart(event) {
  rostoTouchMove(event);
  displayRetina(!isCremeOn);
  if (isCremeOn) {
    clearRosto(event.target.id);
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
      rosto = document.getElementById('rosto');
  creme.addEventListener('click', cremeClick, false);
  rosto.addEventListener('touchstart', rostoTouchStart, false);
  rosto.addEventListener('touchend', rostoTouchEnd, false);
  rosto.addEventListener('touchmove', rostoTouchMove, false);
  drawLenteBackground();
}
