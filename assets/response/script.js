
// Toggle Navigation mobile menu
  function toggleMenu(icon) {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("open");
    if (navLinks.classList.contains("open")) {
      icon.textContent = "✖";
    } else {
      icon.textContent = "☰";
    }
  }

   // Auto-close menu when clicking any nav link (fixed icon reset)
  document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    const navLinks = document.getElementById("navLinks");
    const menuBtn = document.getElementById("menuIcon");
    if (navLinks.classList.contains("open")) {
      navLinks.classList.remove("open"); 
      menuBtn.textContent = "☰";        
    }
  });
  });

// Scroll to top smoothly
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

// Back-to-top button show/hide on scrolling
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.style.display = window.scrollY > 250 ? "block" : "none";
    });
  }

  // Get the toggle button
const darkModeToggle = document.getElementById('themeToggle');

// Function to apply the theme and update button text
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️ Light Mode';
  } else {
    document.body.classList.remove('dark-mode');
    darkModeToggle.textContent = '🌙 Dark Mode';
  }
}

// Apply saved theme on page load (default: dark)
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark'; // default dark
  applyTheme(savedTheme);

  // Start typing animation if you have one
  if (typeof type === 'function') type();
});

// Toggle on click and save state
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    const newTheme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });
}

// Typing animation
  const textArray = [
  "Hello, I'm Nirakara Mishra 👋" ,
  "Cybersecurity Enthusiast 🔐",
  "Digital Defender & Ethical Hacker-in-Training 🛡️", 
  "Committed to Building a Safer Digital Future 🌐"
];

  let typingIndex = 0;
  let charIndex = 0;

  function type() {
    const typingElement = document.getElementById("typing");
    if (!typingElement) return;
    if (charIndex < textArray[typingIndex].length) {
      typingElement.textContent += textArray[typingIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 70);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    const typingElement = document.getElementById("typing");
    if (!typingElement) return;

    if (charIndex > 0) {
      typingElement.textContent = textArray[typingIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 40);
    } else {
      typingIndex = (typingIndex + 1) % textArray.length;
      setTimeout(type, 500);
    }
  }

  // Define parts of the email address
    const user = "nirakaramishra.cse";        // your username
    const domain = "gmail.com";               // your email domain
    const email = `${user}@${domain}`;        // full email address

  // Create the mailto link with the icon only
    const mailto = `mailto:${email}`;
    const iconHTML = `<a href="${mailto}" class="email-link" aria-label="Email Nirakar" title="Gmail">
      <img src="assets/icons/Gmail.svg" alt="email icon" class="email-icon">
    </a>`;

  // Inject icon as the email link
    document.getElementById("email-link").innerHTML = iconHTML;


  (function () {
  const canvas = document.getElementById('binaryRain');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let width = 0;
  let height = 0;
  let animationId = null;
  let drops = [];
  let columns = 0;
  let fontSize = 18;
  let density = 0.5; // 0..1, relative density
  const binaryChars = ['0', '1'];

  // Respect reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    canvas.style.display = 'none';
    return;
  }

  function isDarkMode() {
    return document.body.classList.contains('dark-mode');
  }

  function setupCanvas() {
    // Match CSS pixel size to device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    width = canvas.clientWidth || canvas.offsetWidth;
    height = canvas.clientHeight || canvas.offsetHeight;
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Column size depends on font size
    // Adjust fontSize based on width to keep look consistent
    fontSize = Math.max(12, Math.min(20, Math.round(width / 60)));
    ctx.font = `${fontSize}px monospace`;

    columns = Math.floor(width / fontSize) || 1;

    // Density adjustments for mobile
    const isMobile = window.matchMedia('(max-width: 786px)').matches;
    density = isMobile ? 0.18 : 0.45; // softer on mobile

    // Build drops array (one per column) with random start position
    drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * height / fontSize));
  }

  function draw() {
    if (!isDarkMode()) {
      // hide & stop animation if not dark mode
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, width, height);
      return;
    }

    // semi-transparent black to create fade trail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, width, height);

    // green color for characters
    // use slightly varied greens for subtle depth
    for (let i = 0; i < drops.length; i++) {
      if (Math.random() > density) continue; // skip some columns for airy look

      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // choose character
      const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];

      // head is brighter
      ctx.fillStyle = Math.random() > 0.9 ? '#b3ffb3' : '#7fff7f';
      ctx.fillText(text, x, y);
     

      // move drop down
      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      } else {
        drops[i]++;
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  // Start only when visible & dark-mode enabled
  function startIfNeeded() {
    if (!isDarkMode()) {
      // ensure canvas cleared
      ctx.clearRect(0, 0, width, height);
      cancelAnimationFrame(animationId);
      return;
    }
    if (!animationId) {
      setupCanvas();
      draw();
    }
  }

  // Resize handler
  let resizeTimer;
  function handleResize() {
    clearTimeout(resizeTimer);
    cancelAnimationFrame(animationId);
    animationId = null;
    resizeTimer = setTimeout(() => {
      setupCanvas();
      if (isDarkMode()) draw();
    }, 120);
  }

  // Pause when not visible (tab hidden)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
      animationId = null;
    } else {
      startIfNeeded();
    }
  });

  // Watch theme changes (if you toggle dark-mode)
  const observer = new MutationObserver(() => {
    if (document.body.classList.contains('dark-mode')) {
      // ensure canvas visible
      canvas.style.display = '';
      startIfNeeded();
    } else {
      // stop and clear
      cancelAnimationFrame(animationId);
      animationId = null;
      ctx.clearRect(0, 0, width, height);
      canvas.style.display = 'none';
    }
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  // Window resize
  window.addEventListener('resize', handleResize);

  // Initial setup
  window.addEventListener('load', () => {
    setupCanvas();
    // do not auto-start unless dark-mode is active
    if (isDarkMode()) {
      canvas.style.display = '';
      startIfNeeded();
    } else {
      canvas.style.display = 'none';
    }
  });

  // Also try to start on DOMContentLoaded if needed (in case load already fired)
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setupCanvas();
    if (isDarkMode()) startIfNeeded();
  }
})();


    // icon.textContent = navLinks.classList.contains("open") ? "✖" : "☰";
  // Toggle ☰ and ✖

