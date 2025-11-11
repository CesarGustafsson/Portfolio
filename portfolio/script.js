// Navbar scroll effect
document.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  nav.classList.toggle("scrolled", window.scrollY > 0);
});
