// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
    const warnings = [];

    // Check required fields
    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = Shivani;
    }

    // Validate colors
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    // Validate animation values
    if (parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 2;
    }

    // Log warnings if any
    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(warning => console.warn("- " + warning));
    }
}

// Default color values
function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };
    return defaults[key];
}

// Set page title
document.title = config.pageTitle;

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {


    
    // Validate configuration first
    validateConfig();

    // Set texts from config
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, the chatgpt bhalu...`;
    
    // Set first question texts
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;
    
    // Set second question texts
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;
    
    // Set third question texts
    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent = config.questions.third.noBtn;

    // Create initial floating elements
    createFloatingElements();

    // Setup music player
    setupMusicPlayer();
});


// Create floating hearts and bears
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    
    // Create hearts
    config.floatingEmojis.hearts.forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);


        /* ===== createSticker — create a pasted sticker at top of your container ===== */
function createSticker(options = {}) {
  // options: { text, emoji, href, id }
  const text = options.text || 'Are you a princess?';
  const emoji = options.emoji || '👑';
  const href = options.href || null;
  const id = options.id || 'topSticker';

  // try to use existing container variable, else fallback to selector
  const container = (typeof window.container !== 'undefined' && window.container) || document.querySelector('.container') || document.body;
  if (!container) return;

  // ensure container is positioned to allow absolute inside it
  const computed = window.getComputedStyle(container);
  if (computed.position === 'static') container.style.position = 'relative';

  // remove existing sticker with same id (if any)
  const existing = container.querySelector('#' + id);
  if (existing) existing.remove();

  // create base element (anchor if href provided, else div)
  const el = href ? document.createElement('a') : document.createElement('div');
  el.className = 'sticker';
  el.id = id;
  if (href) {
    el.href = href;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  }
  // build inner HTML (emoji + text + close)
  el.innerHTML = `
    <span class="sticker-emoji">${emoji}</span>
    <span class="sticker-text">${text}</span>
    <button class="sticker-close" aria-label="Close sticker">✕</button>
  `;

  // insert at top of container (so it appears pasted on upper side)
  container.prepend(el);

  // close handler (remove sticker)
  el.querySelector('.sticker-close').addEventListener('click', function (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    el.remove();
  });

  // if it's a link, avoid closing when clicking the element (let link open)
  if (href) {
    el.addEventListener('click', (ev) => {
      // if click target was the close button, ignore
      if (ev.target.closest('.sticker-close')) return;
      // allow normal anchor behavior
    });
  }

  // small entrance animation (optional)
  el.style.opacity = '0';
  el.style.transform = 'translateY(-10px) translateX(-50%) scale(.98)';
  requestAnimationFrame(() => {
    el.style.transition = 'opacity .26s ease, transform .26s cubic-bezier(.2,.9,.3,1)';
    el.style.opacity = '1';
    el.style.transform = 'translateX(-50%) rotate(-1deg) scale(1)';
  });

  return el;
}

/* ===== Example usage =====
   Put this where you currently create hearts (or after), so the sticker is added on top.
   - Change text, emoji, href as needed.
*/
createSticker({
  text: 'Are you a princess, Shivani?',
  emoji: '🌸',
  href: 'https://www.crazygames.com/game/cloudy-with-a-chance-of-kittens',
  id: 'shivaniPrincessSticker'
});

    });

    // Create bears
    config.floatingEmojis.bears.forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

// Set random position for floating elements
function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// Function to show next question
function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${questionNumber}`).classList.remove('hidden');
}

// Function to move the "No" button when clicked
function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// Love meter functionality
const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');

function setInitialPosition() {
    loveMeter.value = 100;
    loveValue.textContent = 100;
    loveMeter.style.width = '100%';
}

loveMeter.addEventListener('input', () => {
    const value = parseInt(loveMeter.value);
    loveValue.textContent = value;
    
    if (value > 100) {
        extraLove.classList.remove('hidden');
        const overflowPercentage = (value - 100) / 9900;
        const extraWidth = overflowPercentage * window.innerWidth * 0.8;
        loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
        loveMeter.style.transition = 'width 0.3s';
        
        // Show different messages based on the value
        if (value >= 5000) {
            extraLove.classList.add('super-love');
            extraLove.textContent = config.loveMessages.extreme;
        } else if (value > 1000) {
            extraLove.classList.remove('super-love');
            extraLove.textContent = config.loveMessages.high;
        } else {
            extraLove.classList.remove('super-love');
            extraLove.textContent = config.loveMessages.normal;
        }
    } else {
        extraLove.classList.add('hidden');
        extraLove.classList.remove('super-love');
        loveMeter.style.width = '100%';
    }
});

// Initialize love meter
window.addEventListener('DOMContentLoaded', setInitialPosition);
window.addEventListener('load', setInitialPosition);


function yesReaction1() {
    alert("Ohh my god! 😳❤️");

    // Go to question 2 automatically after message
    showNextQuestion(2);
}

function celebrate() {
    alert("Sachhii! 😳❤️");

    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');

    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;

    createHeartExplosion();
}


// Create heart explosion animation
function createHeartExplosion() {
    for (let i = 0; i < 60; i++) {
        const heart = document.createElement('div');
        const randomHeart = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        heart.innerHTML = randomHeart;
        heart.className = 'heart';
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".open-flower");
    btn.addEventListener("click", () => {
        window.open("flower.html", "_blank"); // change this link
    });
});

function setupMusicPlayer() {
    const musicToggle = document.getElementById("musicToggle");

    musicToggle.addEventListener("click", () => {
        window.open(
            "https://www.youtube.com/watch?v=RVeLrwoB_xw",
            "_blank"
        );
    });
}

// special music button ONLY
document.getElementById("specialMusicBtn").addEventListener("click", () => {
  const bgMusic = document.getElementById("bgMusic");

  bgMusic.volume = 0.6;    // optional
  bgMusic.currentTime = 0; // optional reset

  bgMusic.play()
    .catch(err => console.log("Autoplay blocked:", err));
});
