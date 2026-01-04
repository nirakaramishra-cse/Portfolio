

/* =========================
   Mobile Navigation Toggle
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuIcon");
  const navLinks = document.getElementById("navLinks");

  if (!menuToggle || !navLinks) return;

  // Toggle menu open / close
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);

    // Accessibility sync
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // Auto-close menu when a nav link is clicked
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("open");

      // Accessibility sync
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
});



/* =========================
   Back To Top Button
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.classList.toggle("show", window.scrollY > 250);
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});


/* =========================
   Dark / Light Mode Toggle
   ========================= */
const darkModeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (!darkModeToggle) return;

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️ Light";
  } else {
    document.body.classList.remove("dark-mode");
    darkModeToggle.textContent = "🌙 Dark";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark"; // default = dark
  applyTheme(savedTheme);

  // Start typing animation if available
  if (typeof type === "function") type();
});

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    const theme = isDark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  });
}


/* =========================
   Email Obfuscation (Security)
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const emailContainer = document.getElementById("email-link");
  if (!emailContainer) return;

  const user = "nirakaramishra.cse";
  const domain = "gmail.com";
  const email = `${user}@${domain}`;

  emailContainer.innerHTML = `
    <a href="mailto:${email}" 
       class="email-link" 
       aria-label="Email Nirakar" 
       title="">
      <img src="assets/icons/Gmail.svg" 
           alt="Email icon" 
           class="email-icon">
    </a>
  `;
});



/* =========================
  TYPING EFFECT
========================= */
const textArray = [
  "Hello, I’m Nirakara Mishra 👋",
  "Aspiring Cybersecurity Analyst",
  "SOC & Threat Detection Enthusiast 🛡️",
];

let typingIndex = 0;
let charIndex = 0;
let typingTimeout = null;
let typingActive = false;

const typingEl = document.getElementById("typing");

function startTyping() {
  if (!typingEl || typingActive) return;
  typingActive = true;
  typeText();
}

function stopTyping() {
  typingActive = false;
  clearTimeout(typingTimeout);
}

function typeText() {
  if (!typingActive) return;

  if (charIndex < textArray[typingIndex].length) {
    typingEl.textContent += textArray[typingIndex].charAt(charIndex++);
    typingTimeout = setTimeout(typeText, 70);
  } else {
    typingTimeout = setTimeout(eraseText, 2000);
  }
}

function eraseText() {
  if (!typingActive) return;

  if (charIndex > 0) {
    typingEl.textContent = typingEl.textContent.slice(0, --charIndex);
    typingTimeout = setTimeout(eraseText, 40);
  } else {
    typingIndex = (typingIndex + 1) % textArray.length;
    typingTimeout = setTimeout(typeText, 500);
  }
}

/* Start typing only when hero visible */
const heroObserver = new IntersectionObserver(
  ([entry]) => {
    entry.isIntersecting ? startTyping() : stopTyping();
  },
  { threshold: 0.4 }
);

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  if (hero) heroObserver.observe(hero);
});



/* =========================
  BINARY RAIN
========================= */
(function () {
  const canvas = document.getElementById("binaryRain");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const chars = ["0", "1"];

  let width, height, columns, drops;
  let fontSize = 16;
  let animationId = null;
  let lastFrame = 0;
  const FPS = 30;
  const frameInterval = 1000 / FPS;

  function isDarkMode() {
    return document.body.classList.contains("dark-mode");
  }

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    width = canvas.clientWidth;
    height = canvas.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    fontSize = Math.max(14, Math.min(18, Math.floor(width / 60)));
    ctx.font = `${fontSize}px monospace`;

    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(0);
  }

  function draw(timestamp) {
    if (!isDarkMode()) return stop();

    if (timestamp - lastFrame < frameInterval) {
      animationId = requestAnimationFrame(draw);
      return;
    }
    lastFrame = timestamp;

    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < drops.length; i++) {
      if (Math.random() > 0.5) continue; // reduce draw density

      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = "#7fff7f";
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      drops[i] = drops[i] * fontSize > height && Math.random() > 0.98
        ? 0
        : drops[i] + 1;
    }

    animationId = requestAnimationFrame(draw);
  }

  function start() {
    if (animationId) return;
    resizeCanvas();
    animationId = requestAnimationFrame(draw);
  }

  function stop() {
    cancelAnimationFrame(animationId);
    animationId = null;
    ctx.clearRect(0, 0, width, height);
  }

  /* Pause when tab hidden */
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stop() : isDarkMode() && start();
  });

  /* React to dark mode toggle */
  new MutationObserver(() => {
    isDarkMode() ? start() : stop();
  }).observe(document.body, { attributes: true });

  window.addEventListener("resize", resizeCanvas);

  window.addEventListener("load", () => {
    resizeCanvas();
    if (isDarkMode()) start();
  });
})();








