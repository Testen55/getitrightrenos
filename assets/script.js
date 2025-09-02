// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navList = document.querySelector('nav ul');
if (menuBtn && navList) {
  menuBtn.addEventListener('click', () => {
    navList.classList.toggle('show');
  });
}
