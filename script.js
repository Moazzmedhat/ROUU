/* ================================================
   script.js — Happy 23rd Birthday!
   ================================================ */

// ── SPARKLE CURSOR ──────────────────────────────
const sparkleColors = ['#ff6eb4','#ffe566','#d8b4fe','#a8edbc','#ff9a4a','#fff'];
document.addEventListener('mousemove', e => {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const dot = document.createElement('div');
      dot.className = 'sparkle-dot';
      dot.style.cssText = `
        left:${e.clientX + (Math.random()-0.5)*20}px;
        top:${e.clientY  + (Math.random()-0.5)*20}px;
        width:${Math.random()*8+4}px;
        height:${Math.random()*8+4}px;
        background:${sparkleColors[Math.floor(Math.random()*sparkleColors.length)]};
      `;
      document.getElementById('sparkle-container').appendChild(dot);
      setTimeout(() => dot.remove(), 700);
    }, i * 60);
  }
});

// ── FLOATING EMOJIS ─────────────────────────────
const pool = ['🐰','🐇','🐐','🐄','❤️','💕','🌸','✨','🎀','🌟','💖','🥳','🎉','💫','🫶','🎈','🌈','🍓','🐐','🐄'];
function spawnFloatie() {
  const el = document.createElement('div');
  el.className = 'floatie';
  el.textContent = pool[Math.floor(Math.random() * pool.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (Math.random() * 1.5 + 0.9) + 'rem';
  const dur = Math.random() * 12 + 9;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = '0s';
  document.getElementById('floaties').appendChild(el);
  setTimeout(() => el.remove(), (dur + 0.5) * 1000);
}
for (let i = 0; i < 8; i++) setTimeout(spawnFloatie, i * 400);
setInterval(spawnFloatie, 900);

// ── 23 CANDLES ──────────────────────────────────
const candleRow = document.querySelector('.candle-row-big');
if (candleRow) {
  for (let i = 0; i < 23; i++) {
    const c = document.createElement('div');
    c.className = 'mini-candle';
    c.innerHTML = `<div class="mini-flame" style="animation-delay:${Math.random()*.5}s"></div><div class="mini-stick"></div>`;
    candleRow.appendChild(c);
  }
}

// ── 23 REASONS ──────────────────────────────────
const reasons = [
  ['😊','Your smile lights up every room'],
  ['🤗','The way you make everyone feel loved'],
  ['🧠','You are so clever and it blows my mind'],
  ['💪','Your strength when things get hard'],
  ['🎨','Your creativity and amazing style'],
  ['😂','You make me laugh like no one else'],
  ['🌸','Your kind heart — genuinely pure'],
  ['✨','The sparkle in your eyes'],
  ['🐰','You are my favorite person ever'],
  ['🌙','Our quiet moments together'],
  ['🗺️','You make every adventure magical'],
  ['💌','The little texts you send me'],
  ['🎵','Your taste in music'],
  ['🍕','you are my favorite cheif '],
  ['🌟','How hard you work at everything'],
  ['💕','The way you say my name'],
  ['🤝','I can tell you literally anything'],
  ['🫶','You care so deeply about people'],
  ['🌈','You make every ordinary day colorful'],
  ['☕','Lazy mornings are better with you'],
  ['🏡','Anywhere with you feels like home'],
  ['🎀','Your whole vibe — I just love it'],
  ['❤️','Everything. Literally everything about you'],
];

const grid = document.getElementById('reasonsGrid');
if (grid) {
  reasons.forEach(([emoji, text], i) => {
    const card = document.createElement('div');
    card.className = 'r-card';
    card.innerHTML = `
      <div class="r-front">
        <div class="r-num">${i + 1}</div>
        <div class="r-emoji">${emoji}</div>
      </div>
      <div class="r-back">${text}</div>
    `;
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      spawnMiniConfetti(card);
    });
    grid.appendChild(card);
  });
}

function spawnMiniConfetti(el) {
  const rect = el.getBoundingClientRect();
  for (let i = 0; i < 8; i++) {
    const dot = document.createElement('div');
    dot.className = 'sparkle-dot';
    dot.style.cssText = `
      left:${rect.left + rect.width/2 + (Math.random()-0.5)*40}px;
      top:${rect.top + (Math.random()-0.5)*30}px;
      width:10px; height:10px;
      background:${sparkleColors[Math.floor(Math.random()*sparkleColors.length)]};
    `;
    document.getElementById('sparkle-container').appendChild(dot);
    setTimeout(() => dot.remove(), 700);
  }
}

// ── DAYS COUNTER ────────────────────────────────
// *** Change this to your real start date ***
const START = new Date(2025, 9, 1); // Oct 1, 2025
const daysDiff = Math.ceil((Date.now() - START.getTime()) / 864e5);
const statEl = document.getElementById('daysStat');
if (statEl) {
  let n = 0;
  const step = Math.max(1, Math.floor(daysDiff / 80));
  const iv = setInterval(() => {
    n = Math.min(n + step, daysDiff);
    statEl.textContent = n.toLocaleString();
    if (n >= daysDiff) clearInterval(iv);
  }, 18);
}

// ── 23 DIGITS ENTRANCE ANIMATION ────────────────
const digits = document.querySelectorAll('.age-digit');
const ageObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animation = 'none';
      e.target.offsetHeight; // reflow
      e.target.style.animation = '';
      ageObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
digits.forEach(d => ageObs.observe(d));

// ── SCROLL REVEAL ────────────────────────────────
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.chapter').forEach(c => revObs.observe(c));

// ── CONFETTI ENGINE ──────────────────────────────
const canvas = document.getElementById('confetti');
const ctx    = canvas.getContext('2d');
let W = canvas.width  = window.innerWidth;
let H = canvas.height = window.innerHeight;
window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });

const COLORS = ['#ff6eb4','#ffe566','#a8edbc','#d8b4fe','#ff9a4a','#4fc3f7','#fff','#ff6eb4'];
let particles = []; let rafId = null;

class Particle {
  constructor(x, y) {
    this.x = x || Math.random() * W;
    this.y = y || -20;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = Math.random() * 4 + 1.5;
    this.w  = Math.random() * 12 + 4;
    this.h  = Math.random() * 7 + 3;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.rot = Math.random() * 360;
    this.rs  = (Math.random() - 0.5) * 10;
    this.shape = ['rect','circle','triangle'][Math.floor(Math.random()*3)];
    this.life  = 1;
    this.decay = Math.random() * 0.004 + 0.002;
  }
  update() { this.x += this.vx; this.y += this.vy; this.rot += this.rs; this.vy += 0.05; this.life -= this.decay; }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot * Math.PI / 180);
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    if (this.shape === 'rect') {
      ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
    } else if (this.shape === 'circle') {
      ctx.beginPath(); ctx.arc(0,0,this.w/2,0,Math.PI*2); ctx.fill();
    } else {
      ctx.beginPath(); ctx.moveTo(0,-this.h); ctx.lineTo(this.w/2,this.h/2); ctx.lineTo(-this.w/2,this.h/2); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  }
}

function burst(n=10, x, y) { for (let i=0;i<n;i++) particles.push(new Particle(x,y)); }

function animLoop() {
  ctx.clearRect(0,0,W,H);
  particles = particles.filter(p => p.life > 0 && p.y < H + 40);
  particles.forEach(p => { p.update(); p.draw(); });
  if (particles.length) rafId = requestAnimationFrame(animLoop);
  else { cancelAnimationFrame(rafId); rafId = null; ctx.clearRect(0,0,W,H); }
}

function bigConfetti() {
  let i = 0;
  const iv = setInterval(() => {
    burst(16);
    if (!rafId) rafId = requestAnimationFrame(animLoop);
    if (++i > 40) clearInterval(iv);
  }, 70);
}

// ── MUSIC PLAYER — Cigarettes After Sex: Keep On Loving You ─────
let musicPlayerCreated = false;
let songAudio = null;

function createMusicPlayer() {
  if (musicPlayerCreated) {
    document.getElementById('music-widget').classList.remove('music-hidden');
    if (songAudio && songAudio.paused) songAudio.play();
    return;
  }
  musicPlayerCreated = true;

  // Create Audio element — starts at 1:28 = 88 seconds
  songAudio = new Audio('Keep On Loving You - Cigarettes After Sex.mp3');
  songAudio.currentTime = 86;
  songAudio.volume = 0.85;
  songAudio.loop = true;
  songAudio.play().catch(() => {});

  // Inject styles
  const st = document.createElement('style');
  st.textContent = `
    #music-widget {
      position:fixed; bottom:20px; right:16px; z-index:9990;
      background:linear-gradient(135deg,#1a0020,#2d0040);
      border:2px solid rgba(255,110,180,.5);
      border-radius:20px; padding:14px 16px 12px;
      width:230px; box-shadow:0 8px 36px rgba(232,25,125,.45);
      font-family:'Nunito',sans-serif;
      animation:slideUpWidget .5s cubic-bezier(.4,0,.2,1) both;
    }
    @keyframes slideUpWidget {
      from{transform:translateY(120%);opacity:0}
      to{transform:translateY(0);opacity:1}
    }
    #music-widget.music-hidden { display:none; }
    .mw-top { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
    .mw-disc {
      width:38px; height:38px; border-radius:50%;
      background:linear-gradient(135deg,#ff6eb4,#9b59b6);
      display:flex; align-items:center; justify-content:center;
      font-size:1.2rem; flex-shrink:0;
      animation:spinDisc 4s linear infinite;
    }
    @keyframes spinDisc { to{transform:rotate(360deg)} }
    .mw-info { flex:1; min-width:0; }
    .mw-title { display:block; font-size:.78rem; font-weight:900; color:#ff6eb4; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .mw-artist { display:block; font-size:.65rem; color:rgba(255,255,255,.6); margin-top:1px; }
    .mw-close { background:none; border:none; color:rgba(255,255,255,.4); font-size:1rem; cursor:pointer; flex-shrink:0; line-height:1; }
    .mw-close:hover { color:#ff6eb4; }
    .mw-bar { height:3px; border-radius:2px; background:rgba(255,255,255,.15); overflow:hidden; margin-bottom:10px; }
    .mw-progress { height:100%; border-radius:2px; background:linear-gradient(90deg,#ff6eb4,#d8b4fe); width:0%; transition:width .5s linear; }
    .mw-bottom { display:flex; align-items:center; gap:8px; }
    .mc-pp {
      width:32px; height:32px; border-radius:50%; flex-shrink:0;
      background:linear-gradient(135deg,#ff6eb4,#e8197d);
      color:#fff; border:none; font-size:.95rem;
      cursor:pointer; transition:transform .2s;
      display:flex; align-items:center; justify-content:center;
    }
    .mc-pp:hover { transform:scale(1.12); }
    .mc-vol { flex:1; -webkit-appearance:none; height:3px; border-radius:2px;
      background:rgba(255,255,255,.25); outline:none; cursor:pointer; }
    .mc-vol::-webkit-slider-thumb { -webkit-appearance:none; width:13px; height:13px; background:#ff6eb4; border-radius:50%; }
    .mw-note { font-size:.9rem; }
  `;
  document.head.appendChild(st);

  // Build widget
  const w = document.createElement('div');
  w.id = 'music-widget';
  w.innerHTML = `
    <div class="mw-top">
      <div class="mw-disc" id="mw-disc">🎵</div>
      <div class="mw-info">
        <span class="mw-title">Keep On Loving You</span>
        <span class="mw-artist">Cigarettes After Sex</span>
      </div>
      <button class="mw-close" onclick="document.getElementById('music-widget').classList.add('music-hidden')" title="hide">✕</button>
    </div>
    <div class="mw-bar"><div class="mw-progress" id="mw-prog"></div></div>
    <div class="mw-bottom">
      <button class="mc-pp" id="mc-pp" onclick="toggleSong()">⏸</button>
      <input class="mc-vol" type="range" min="0" max="1" step="0.01" value="0.85" oninput="setSongVol(this.value)" />
      <span class="mw-note">🔊</span>
    </div>
  `;
  document.body.appendChild(w);

  // Live progress bar
  songAudio.addEventListener('timeupdate', () => {
    if (!songAudio.duration) return;
    const pct = (songAudio.currentTime / songAudio.duration) * 100;
    const bar = document.getElementById('mw-prog');
    if (bar) bar.style.width = pct + '%';
  });

  // Sync play/pause icon with audio state
  songAudio.addEventListener('pause', () => { const b = document.getElementById('mc-pp'); if(b) b.textContent='▶'; });
  songAudio.addEventListener('play',  () => { const b = document.getElementById('mc-pp'); if(b) b.textContent='⏸'; });
}

window.toggleSong = function() {
  if (!songAudio) return;
  songAudio.paused ? songAudio.play() : songAudio.pause();
};

window.setSongVol = function(v) {
  if (songAudio) songAudio.volume = parseFloat(v);
};

// ── CELEBRATE BUTTON ─────────────────────────────
window.celebrate = function() {
  bigConfetti();
  createMusicPlayer();

  const btn = document.getElementById('celebBtn');
  btn.textContent = '🐰💕 HAPPY 23RD BIRTHDAY!! 💕🐰';
  btn.style.background = 'linear-gradient(135deg,#ff6eb4,#d8b4fe)';
  btn.style.color = '#fff';

  document.getElementById('extra-msg').classList.remove('hidden');

  // Shower of bunnies & balloons
  for (let i = 0; i < 28; i++) {
    setTimeout(() => {
      const b = document.createElement('div');
      b.className = 'floatie';
      b.textContent = ['🐰','🐇','🐐','🐄','🎉','💕','🎂','🌸','🎈','✨','🥳','🎀','🐐','🐄'][Math.floor(Math.random()*14)];
      b.style.left = Math.random() * 100 + 'vw';
      b.style.fontSize = (Math.random() * 2.5 + 1.2) + 'rem';
      b.style.animationDuration = (Math.random() * 5 + 4) + 's';
      b.style.animationDelay = '0s';
      document.getElementById('floaties').appendChild(b);
      setTimeout(() => b.remove(), 12000);
    }, i * 100);
  }

  setTimeout(() => {
    btn.textContent = '🎊 Celebrate Again! 🎊';
    btn.style.background = 'linear-gradient(135deg,#ffe566,#ffb347)';
    btn.style.color = '#3b1f40';
  }, 9000);
};

// ── TYPEWRITER EFFECT ──────────────────────────
const twText = "Happy birthday to my go to person the one i enjoy their company most forever grateful for your presence in my life thank you 3ala kol haga ya rawda love you alby rabena ykhlena l baad forever enjoy it too the fullest!! 🌸";
const twEl = document.getElementById('typewriter');
if (twEl) {
  let i = 0;
  function type() {
    if (i < twText.length) {
      twEl.textContent += twText.charAt(i);
      i++;
      setTimeout(type, 50);
    }
  }
  window.addEventListener('load', () => setTimeout(type, 1500));
}

// ── POP BUNNY LOGIC ──────────────────────────
const popBunny = document.getElementById('pop-bunny');
if (popBunny) {
  function showPopBunny() {
    popBunny.classList.add('show');
    setTimeout(() => popBunny.classList.remove('show'), 3000);
    setTimeout(showPopBunny, Math.random() * 15000 + 10000); // Randomly between 10-25s
  }
  setTimeout(showPopBunny, 5000); // Start after 5s
  
  popBunny.addEventListener('click', () => {
    popBunny.textContent = '💖';
    setTimeout(() => popBunny.textContent = '🐰', 1000);
    burst(20, window.innerWidth - 40, window.innerHeight - 40);
  });
}

// ── CAKE INTERACTION ──────────────────────────
const cake = document.querySelector('.cake-scene');
if (cake) {
  cake.addEventListener('mouseenter', () => {
    const rect = cake.getBoundingClientRect();
    burst(15, rect.left + rect.width/2, rect.top);
  });
}

// ── FOOTER YEAR ──────────────────────────────────
document.getElementById('yr').textContent = new Date().getFullYear();

// ── AUTO CONFETTI on load ────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    for (let i = 0; i < 5; i++) setTimeout(() => burst(12), i * 200);
    if (!rafId) rafId = requestAnimationFrame(animLoop);
  }, 800);
});

// ── LOVE LETTER ──────────────────────────────────
let envelopeOpened = false;
window.openEnvelope = function () {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const env    = document.getElementById('envelope');
  const letter = document.getElementById('letter');

  env.classList.add('opened');

  // After flap folds back, reveal the letter
  setTimeout(() => {
    letter.classList.add('revealed');
    burst(14, window.innerWidth / 2, window.innerHeight / 2);
    if (!rafId) rafId = requestAnimationFrame(animLoop);
  }, 550);
};

// ── GIFT BOX ─────────────────────────────────────
const promiseList = [
  ['🌸', 'To make you feel safe, loved, and home every single day'],
  ['🌙', 'To hold you close on every quiet night'],
  ['💌', 'To never stop writing you love letters, even when we\'re old'],
  ['🫶', 'To choose you, again and again, every single day'],
  ['🌹', 'To make you feel like the most loved person in the world'],
  ['✨', 'To love every version of you — past, present, and forever'],
  ['🐑', 'To get you a real goat one day 🐐'],
];

let giftOpened = false;
window.openGift = function () {
  if (giftOpened) return;
  giftOpened = true;

  const box      = document.getElementById('giftBox');
  const promises = document.getElementById('promises');

  box.classList.add('opened');

  // Build and stagger-in the promise cards
  setTimeout(() => {
    promiseList.forEach(([emoji, text]) => {
      const card = document.createElement('div');
      card.className = 'promise-card';
      card.innerHTML = `<span class="promise-emoji">${emoji}</span><span class="promise-text">${text}</span>`;
      promises.appendChild(card);
    });

    promises.classList.add('revealed');
    burst(22, window.innerWidth / 2, window.innerHeight / 2);
    if (!rafId) rafId = requestAnimationFrame(animLoop);

    // Stagger each card in
    document.querySelectorAll('.promise-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('show'), i * 140);
    });

    // Reveal the goat GIF
    const goat = document.getElementById('goatGifWrap');
    if (goat) {
      setTimeout(() => {
        goat.classList.remove('hidden');
        goat.classList.add('revealed');
      }, promiseList.length * 140 + 200);
    }
  }, 400);
};
// ── HAPPY FARM LOGIC ─────────────────────────────
let feedingMode = false;
let farmAnimals = [];

const farmQuotes = {
  sheep: [
    'Happy 23rd Birthday, Rouu! ❤️', 
    'You make every day brighter! ✨', 
    'Wishing you the most beautiful year ahead!', 
    'You deserve all the happiness in the world! 🌸',
    'So grateful to celebrate this special day with you!'
  ],
  cow: [
    'Happy Birthday to the most amazing person! 🎂', 
    'Hope your 23rd year is filled with love and joy!', 
    'You are truly one of a kind, Rouu! 🌟', 
    'May all your birthday dreams come true! ❤️',
    'Sending you so much love on your big day!'
  ],
  bunny: [
    'Happy Birthday, my beautiful Rouu! 🎈', 
    'To many more years of laughter and love! ✨', 
    'You are such a blessing in my life! 💕', 
    'Cheers to 23 years of being wonderful! 🌸',
    'Enjoy every single moment of your day! 🎀'
  ]
};

class FarmAnimal {
  constructor(type, container) {
    this.type = type;
    this.container = container;
    this.element = document.createElement('div');
    this.element.className = `animal ${type}`;
    this.setupHTML();
    
    this.x = Math.random() * 80 + 10; // percentage (more spread)
    this.y = Math.random() * 25 + 65; // percentage (stay on green hills)
    this.targetX = this.x;
    this.targetY = this.y;
    
    this.updatePosition();
    container.appendChild(this.element);
    
    this.element.addEventListener('click', (e) => {
      e.stopPropagation();
      this.pet();
    });
    
    setTimeout(() => this.startWandering(), Math.random() * 2000);
  }

  setupHTML() {
    let innerHTML = '';
    if (this.type === 'sheep') {
      innerHTML += `
        <div class="sheep-body">
          <div class="sheep-head">
            <div class="party-hat"></div>
            <div class="sheep-wool-top"></div>
            <div class="sheep-ear e-l"></div><div class="sheep-ear e-r"></div>
            <div class="sheep-eye"></div><div class="sheep-eye r"></div>
          </div>
          <div class="sheep-tail"></div>
          <div class="sheep-leg l1"></div><div class="sheep-leg l2"></div>
          <div class="sheep-leg l3"></div><div class="sheep-leg l4"></div>
        </div>`;
    } else if (this.type === 'cow') {
      innerHTML += `
        <div class="cow-body">
          <div class="cow-spot s1"></div><div class="cow-spot s2"></div><div class="cow-spot s3"></div>
          <div class="cow-head">
            <div class="party-hat"></div>
            <div class="cow-horn h-l"></div><div class="cow-horn h-r"></div>
            <div class="cow-ear e-l"></div><div class="cow-ear e-r"></div>
            <div class="cow-eye"></div><div class="cow-eye r"></div>
            <div class="cow-nose"></div>
          </div>
          <div class="cow-tail"></div>
          <div class="cow-leg l1"><div class="cow-hoof"></div></div>
          <div class="cow-leg l2"><div class="cow-hoof"></div></div>
          <div class="cow-leg l3"><div class="cow-hoof"></div></div>
          <div class="cow-leg l4"><div class="cow-hoof"></div></div>
        </div>`;
    } else if (this.type === 'bunny-mini') {
      innerHTML += `
        <div class="b-body">
          <div class="b-head">
            <div class="party-hat"></div>
            <div class="b-ear e-l"></div><div class="b-ear e-r"></div>
            <div class="b-eye"></div><div class="b-eye r"></div>
            <div class="b-blush l"></div><div class="b-blush r"></div>
            <div class="b-nose"></div>
            <div class="b-whiskers w-l"></div><div class="b-whiskers w-r"></div>
          </div>
          <div class="b-paw p-l"></div><div class="b-paw p-r"></div>
          <div class="b-tail"></div>
        </div>`;
    }
    this.element.innerHTML = innerHTML;
  }

  updatePosition() {
    this.element.style.left = `${this.x}%`;
    this.element.style.top = `${this.y}%`;
    this.element.style.zIndex = Math.floor(this.y);
    
    // Flip based on direction
    if (this.targetX < this.x) {
      this.element.style.transform = 'scaleX(-1)';
      this.element.classList.add('is-flipped');
    } else {
      this.element.style.transform = 'scaleX(1)';
      this.element.classList.remove('is-flipped');
    }
  }

  startWandering() {
    const wander = () => {
      if (!feedingMode) {
        this.targetX = Math.random() * 80 + 10;
        this.targetY = Math.random() * 25 + 65;
        this.moveToTarget();
      }
      setTimeout(wander, Math.random() * 5000 + 3000);
    };
    wander();
  }

  moveToTarget() {
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 1) return;

    this.x += (dx / dist) * 0.5;
    this.y += (dy / dist) * 0.5;
    
    this.updatePosition();
    
    if (dist > 1) {
      requestAnimationFrame(() => this.moveToTarget());
    }
  }

  pet() {
    this.element.classList.add('hop');
    setTimeout(() => this.element.classList.remove('hop'), 500);
    
    // Show speech bubble
    const typeKey = this.type === 'bunny-mini' ? 'bunny' : this.type;
    const quotes = farmQuotes[typeKey];
    const msg = quotes[Math.floor(Math.random() * quotes.length)];
    
    const bubble = document.createElement('div');
    bubble.className = 'animal-speech';
    bubble.textContent = msg;
    this.element.appendChild(bubble);
    setTimeout(() => bubble.remove(), 2500);
    
    burst(10, this.element.getBoundingClientRect().left, this.element.getBoundingClientRect().top);
  }

  goToFood(fx, fy) {
    this.targetX = fx;
    this.targetY = fy;
    this.moveToTarget();
  }
}

function initFarm() {
  const pen = document.getElementById('animalPen');
  if (!pen) return;
  
  // Create initial animals (fewer on mobile)
  const isMobile = window.innerWidth <= 480;
  const counts = isMobile 
    ? { sheep: 2, cow: 2, bunny: 2 } 
    : { sheep: 3, cow: 2, bunny: 4 };

  for (let i = 0; i < counts.sheep; i++) farmAnimals.push(new FarmAnimal('sheep', pen));
  for (let i = 0; i < counts.cow; i++) farmAnimals.push(new FarmAnimal('cow', pen));
  for (let i = 0; i < counts.bunny; i++) farmAnimals.push(new FarmAnimal('bunny-mini', pen));
  
  // Handle feeding mode clicks
  const container = document.getElementById('farmContainer');
  container.addEventListener('click', (e) => {
    if (!feedingMode) return;
    
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    dropFood(x, y);
  });
}

function toggleFeedingMode() {
  feedingMode = !feedingMode;
  const bucket = document.getElementById('treatBucket');
  if (feedingMode) {
    bucket.classList.add('active');
    document.body.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'><text y=\'24\' font-size=\'24\'>🥕</text></svg>"), auto';
  } else {
    bucket.classList.remove('active');
    document.body.style.cursor = 'none'; // Back to custom cursor
  }
}

function dropFood(x, y) {
  const food = document.createElement('div');
  food.className = 'food-item';
  food.textContent = Math.random() > 0.5 ? '🥕' : '🌿';
  food.style.left = `${x}%`;
  food.style.top = `${y}%`;
  document.getElementById('feedOverlay').appendChild(food);
  
  // All animals move towards food
  farmAnimals.forEach(a => {
    // Add some randomness to their target so they don't overlap perfectly
    const offset = (Math.random() - 0.5) * 10;
    a.goToFood(x + offset, y + offset);
  });
  
  setTimeout(() => {
    food.style.opacity = '0';
    setTimeout(() => food.remove(), 500);
  }, 3000);
}

// Initialize farm on load
window.addEventListener('load', () => {
  setTimeout(initFarm, 2000);
});
