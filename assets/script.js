// Simple mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if (btn) btn.addEventListener("click", () => nav.classList.toggle("open"));
});
