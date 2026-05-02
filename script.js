const pages = Array.from(document.querySelectorAll('.page'));
const bgMusic = document.getElementById('bgMusic');
let currentPage = 0;
let musicStarted = false;

function prepareMusic(){
  if(!bgMusic || musicStarted) return;
  bgMusic.volume = 0.75;
  bgMusic.play().then(()=>{ musicStarted = true; }).catch(()=>{});
}

function showPage(index){
  if(index < 0 || index >= pages.length) return;
  pages.forEach(page => page.classList.remove('active'));
  pages[index].classList.add('active');
  currentPage = index;
  window.scrollTo(0,0);
  const mainWrap = document.querySelector('.main');
  if(mainWrap) mainWrap.scrollTop = 0;
  pages[index].scrollTop = 0;
  pages[index].querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
  if(pages[index].id === 'heroPage') startPremiumTypingWhenVisible();
}

function startExperience(){
  prepareMusic();
  showPage(1);
}
function nextPage(){ prepareMusic(); showPage(currentPage + 1); }
function prevPage(){ prepareMusic(); showPage(currentPage - 1); }
function replayStory(){ showPage(0); }

function tiltCard(e){
  const photo = document.getElementById('tiltPhoto');
  if(!photo) return;
  const rect = photo.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateY = ((x / rect.width) - 0.5) * 16;
  const rotateX = ((y / rect.height) - 0.5) * -16;
  photo.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
}
function resetTilt(){
  const photo = document.getElementById('tiltPhoto');
  if(photo) photo.style.transform = 'rotateX(0) rotateY(0) scale(1)';
}
function openLetter(){
  const letter = document.getElementById('letterPaper');
  if(letter) letter.classList.toggle('open');
}

function dropConfetti(){
  const colors = ['#ff7eb6','#ffd166','#8fc7ff','#ffffff','#f7aef8','#b8ff9f'];
  for(let i=0;i<100;i++){
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.7 + 's';
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    document.body.appendChild(piece);
    setTimeout(()=>piece.remove(),4000);
  }
}
function burstParty(amount=18){
  const colors = ['#ff7eb6','#ffd166','#8fc7ff','#ffffff','#f7aef8','#b8ff9f'];
  for(let i=0;i<amount;i++){
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.left = 45 + Math.random() * 10 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.2 + 's';
    document.body.appendChild(piece);
    setTimeout(()=>piece.remove(),3800);
  }
}

const premiumTypeText = "A premium birthday page made with heartfelt wishes, beautiful memories, and a gentle surprise that unfolds just for you. 💖";
let premiumTypeIndex = 0;
let premiumTypingStarted = false;
function runPremiumType(){
  const el = document.getElementById('typewriter');
  if(!el) return;
  if(premiumTypeIndex < premiumTypeText.length){
    el.textContent += premiumTypeText.charAt(premiumTypeIndex);
    premiumTypeIndex++;
    setTimeout(runPremiumType,32);
  }
}
function startPremiumTypingWhenVisible(){
  if(premiumTypingStarted) return;
  premiumTypingStarted = true;
  runPremiumType();
}

const galleryImages = Array.from(document.querySelectorAll('.gallery img'));
const lightbox = document.getElementById('photoLightbox');
const lightboxImage = document.getElementById('lightboxImage');
let activePhotoIndex = 0;
galleryImages.forEach((img,index)=> img.addEventListener('click',()=>openLightbox(index)));
function openLightbox(index){
  activePhotoIndex = index;
  if(!lightbox || !lightboxImage) return;
  lightboxImage.src = galleryImages[activePhotoIndex].src;
  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden','false');
}
function closeLightbox(){
  if(!lightbox) return;
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden','true');
}
function changeLightboxPhoto(direction){
  activePhotoIndex = (activePhotoIndex + direction + galleryImages.length) % galleryImages.length;
  if(lightboxImage) lightboxImage.src = galleryImages[activePhotoIndex].src;
}
if(lightbox){
  lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
}
document.addEventListener('keydown', e => {
  if(!lightbox || !lightbox.classList.contains('show')) return;
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowLeft') changeLightboxPhoto(-1);
  if(e.key === 'ArrowRight') changeLightboxPhoto(1);
});

document.addEventListener('pointerdown', function firstPointerPlay(){
  prepareMusic();
  document.removeEventListener('pointerdown', firstPointerPlay);
}, {once:true});
window.addEventListener('load',()=>{
  if(bgMusic){ bgMusic.load(); bgMusic.volume = 0.75; }
  showPage(0);
});

/* Strong birthday coding-rain background effect */
const codeRainCanvas = document.getElementById('codeRain');
let codeRainCtx;
let codeRainColumns = [];
let codeRainFontSize = 15;

function resizeCodeRain(){
  if(!codeRainCanvas) return;
  const dpr = window.devicePixelRatio || 1;
  codeRainCanvas.width = window.innerWidth * dpr;
  codeRainCanvas.height = window.innerHeight * dpr;
  codeRainCanvas.style.width = window.innerWidth + 'px';
  codeRainCanvas.style.height = window.innerHeight + 'px';
  codeRainCtx = codeRainCanvas.getContext('2d');
  codeRainCtx.setTransform(dpr,0,0,dpr,0,0);
  codeRainFontSize = window.innerWidth <= 430 ? 11 : 14;
  const columnCount = Math.ceil(window.innerWidth / codeRainFontSize) + 10;
  codeRainColumns = Array.from({length:columnCount},()=>Math.random() * -window.innerHeight);
}

function drawCodeRain(){
  if(!codeRainCtx || !codeRainCanvas) return;
  codeRainCtx.fillStyle = 'rgba(96, 110, 210, 0.06)';
  codeRainCtx.fillRect(0,0,window.innerWidth,window.innerHeight);
  codeRainCtx.font = '800 ' + codeRainFontSize + 'px monospace';
  codeRainCtx.shadowBlur = 12;
  codeRainCtx.shadowColor = 'rgba(255, 209, 102, 0.45)';
  const letters = 'HBD0101BIRTHDAYGIFTCAKEWISHSMILESTARPARTY';
  for(let i=0;i<codeRainColumns.length;i++){
    const char = letters[Math.floor(Math.random() * letters.length)];
    const x = i * codeRainFontSize;
    const y = codeRainColumns[i];
    const brightHead = Math.random() > 0.78;
    const accent = Math.random() > 0.55;
    codeRainCtx.fillStyle = brightHead ? 'rgba(255, 255, 255, 0.90)' : accent ? 'rgba(255, 209, 102, 0.72)' : 'rgba(111, 231, 255, 0.66)';
    codeRainCtx.fillText(char,x,y);
    if(Math.random() > 0.88){
      codeRainCtx.fillStyle = 'rgba(255, 158, 207, 0.34)';
      codeRainCtx.fillText(char,x,y - codeRainFontSize * 1.6);
    }
    if(y > window.innerHeight + Math.random() * 900){
      codeRainColumns[i] = Math.random() * -150;
    }else{
      codeRainColumns[i] = y + codeRainFontSize * (1.05 + Math.random() * 0.85);
    }
  }
  requestAnimationFrame(drawCodeRain);
}

window.addEventListener('resize',resizeCodeRain);
resizeCodeRain();
drawCodeRain();
