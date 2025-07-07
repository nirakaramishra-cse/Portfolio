
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

// Dark Mode Toggle 
  const darkModeToggle = document.getElementById('themeToggle');

// Toggle dark mode on click and save state
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

// Apply saved theme on page load
  window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
    // Start typing animation
    type();
  });

// Typing animation
  const textArray = [
  "Hello, I'm Nirakara Mishra 👋",
  "Aspiring Cybersecurity Professional 🔐",
  "Ethical Hacker in Training 💻",
  "Committed to Building Secure Systems 🛡️"
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




    // icon.textContent = navLinks.classList.contains("open") ? "✖" : "☰";
  // Toggle ☰ and ✖
