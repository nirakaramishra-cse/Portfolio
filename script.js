// Typing Effect
const typing = document.getElementById('typing');
const text = "Hi, I'm [Nirakara Mishra]";
let i = 0;

function type() {
  if (i < text.length) {
    typing.innerHTML += text.charAt(i);
    i++;
    setTimeout(type, 100);
  }
}
type();

function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

 
  