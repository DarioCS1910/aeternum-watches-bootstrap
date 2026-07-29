/* ============================================
   Aeternum Watches - Interactividad JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- 1. FILTRO DE CATEGORÍAS ---- */
  const filterButtons = document.querySelectorAll('.filter-buttons .btn');
  const products = document.querySelectorAll('.product-item');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Activar visualmente el botón seleccionado
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      products.forEach(function (product) {
        const category = product.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          product.classList.remove('hidden');
        } else {
          product.classList.add('hidden');
        }
      });
    });
  });

  /* ---- 2. MODAL DINÁMICO DE PRODUCTO ---- */
  const productModal = document.getElementById('productModal');
  if (productModal) {
    productModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const name = button.getAttribute('data-name');
      const price = button.getAttribute('data-price');
      const img = button.getAttribute('data-img');
      const desc = button.getAttribute('data-desc');

      productModal.querySelector('#modalProductName').textContent = name;
      productModal.querySelector('#modalProductPrice').textContent = price;
      productModal.querySelector('#modalProductImg').setAttribute('src', img);
      productModal.querySelector('#modalProductDesc').textContent = desc;
    });
  }

  /* ---- 3. VALIDACIÓN Y ENVÍO DE FORMULARIO DE CONTACTO ---- */
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }

      // Simulación de envío correcto
      formAlert.classList.remove('d-none');
      contactForm.reset();
      contactForm.classList.remove('was-validated');

      setTimeout(function () {
        formAlert.classList.add('d-none');
      }, 4000);
    });
  }

  /* ---- 4. NAVBAR: cerrar menú móvil al hacer click en un enlace ---- */
  const navLinks = document.querySelectorAll('#navMenu .nav-link');
  const navMenu = document.getElementById('navMenu');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
      }
    });
  });

});
