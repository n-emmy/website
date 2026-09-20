document.addEventListener("DOMContentLoaded", () => {
  // 1. Rimuove la classe preload
  document.body.classList.remove("preload");

  // 2. Gestione del Cambio Tema (Dark Mode)
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      if (themeIcon) themeIcon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
    });
  }

  // 3. Gestione del Menu Hamburger per schermi piccoli
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navControls = document.querySelector('.nav-controls');
  const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

  if (mobileMenuBtn && navLinks) {
    // Funzione per chiudere il menu
    const closeMenu = () => {
      navLinks.classList.remove('show');
      if (navControls) navControls.classList.remove('show');
      if (menuIcon) {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      }
    };

    // Toggle al click sul bottone hamburger
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('show');
      if (navControls) navControls.classList.toggle('show', isOpen);

      // Cambia l'icona tra "bars" (hamburger) e "xmark" (X)
      if (menuIcon) {
        if (isOpen) {
          menuIcon.classList.remove('fa-bars');
          menuIcon.classList.add('fa-xmark');
        } else {
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
        }
      }
    });

    // Chiudi il menu quando si clicca su qualsiasi link della nav
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Chiudi il menu se si clicca fuori dalla navbar
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar') && navLinks.classList.contains('show')) {
        closeMenu();
      }
    });
  }
});