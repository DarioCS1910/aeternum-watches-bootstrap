/* =============================================
   Chronos Elite - Interactividad JS
   Filtro, Carrito, Checkout multi-paso
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- 1. FILTRO DE CATEGORIAS ---- */
  const filterButtons = document.querySelectorAll('.filter-buttons .btn');
  const products = document.querySelectorAll('.product-item');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      products.forEach(function (product) {
        const category = product.getAttribute('data-category');
        product.style.display = (filter === 'all' || filter === category) ? '' : 'none';
      });
    });
  });

  /* ---- 2. VALIDACION FORMULARIO CONTACTO ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }
      document.getElementById('contactSuccess').classList.remove('d-none');
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });
  }

  /* ---- 3. CARRITO DE COMPRA ---- */
  let cart = JSON.parse(localStorage.getItem('chronosCart') || '[]');

  function saveCart() {
    localStorage.setItem('chronosCart', JSON.stringify(cart));
  }

  function formatPrice(n) {
    return n.toLocaleString('es-ES') + ' \u20ac';
  }

  function renderCart() {
    const cartItemsEl = document.getElementById('cartItems');
    const cartCountEl = document.getElementById('cartCount');
    const cartSubtotalEl = document.getElementById('cartSubtotal');

    cartCountEl.textContent = cart.reduce(function (sum, i) { return sum + i.qty; }, 0);

    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p class="text-muted text-center" id="emptyCartMsg">Tu carrito est\u00e1 vac\u00edo.</p>';
      cartSubtotalEl.textContent = formatPrice(0);
      return;
    }

    let html = '';
    let subtotal = 0;
    cart.forEach(function (item, index) {
      const lineTotal = item.price * item.qty;
      subtotal += lineTotal;
      html += '<div class="cart-item">' +
        '<img src="' + item.img + '" alt="' + item.name + '">' +
        '<div class="flex-grow-1">' +
          '<div class="d-flex justify-content-between">' +
            '<strong>' + item.brand + ' ' + item.name + '</strong>' +
            '<button class="btn btn-sm btn-link text-danger p-0" data-remove="' + index + '"><i class="bi bi-trash"></i></button>' +
          '</div>' +
          '<small class="text-muted d-block">' + item.strap + ' / ' + item.size + '</small>' +
          '<div class="d-flex justify-content-between align-items-center mt-1">' +
            '<div class="qty-controls d-flex align-items-center gap-1">' +
              '<button class="btn btn-sm btn-outline-secondary" data-decrease="' + index + '">-</button>' +
              '<span class="px-2">' + item.qty + '</span>' +
              '<button class="btn btn-sm btn-outline-secondary" data-increase="' + index + '">+</button>' +
            '</div>' +
            '<span class="fw-bold">' + formatPrice(lineTotal) + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    });
    cartItemsEl.innerHTML = html;
    cartSubtotalEl.textContent = formatPrice(subtotal);

    cartItemsEl.querySelectorAll('[data-remove]').forEach(function (b) {
      b.addEventListener('click', function () {
        cart.splice(parseInt(b.getAttribute('data-remove')), 1);
        saveCart(); renderCart();
      });
    });
    cartItemsEl.querySelectorAll('[data-increase]').forEach(function (b) {
      b.addEventListener('click', function () {
        cart[parseInt(b.getAttribute('data-increase'))].qty++;
        saveCart(); renderCart();
      });
    });
    cartItemsEl.querySelectorAll('[data-decrease]').forEach(function (b) {
      b.addEventListener('click', function () {
        const i = parseInt(b.getAttribute('data-decrease'));
        cart[i].qty--;
        if (cart[i].qty <= 0) cart.splice(i, 1);
        saveCart(); renderCart();
      });
    });
  }

  /* ---- 4. MODAL PRODUCTO -> AÑADIR AL CARRITO ---- */
  const productModal = document.getElementById('productModal');
  productModal.addEventListener('show.bs.modal', function (event) {
    const btn = event.relatedTarget;
    document.getElementById('modalBrand').textContent = btn.getAttribute('data-brand');
    document.getElementById('modalName').textContent = btn.getAttribute('data-name');
    document.getElementById('modalDesc').textContent = btn.getAttribute('data-desc');
    document.getElementById('modalImg').src = btn.getAttribute('data-img');
    document.getElementById('modalPrice').textContent = formatPrice(parseInt(btn.getAttribute('data-price')));
    document.getElementById('modalQty').value = 1;
    productModal.dataset.currentId = btn.getAttribute('data-id');
    productModal.dataset.currentBrand = btn.getAttribute('data-brand');
    productModal.dataset.currentName = btn.getAttribute('data-name');
    productModal.dataset.currentPrice = btn.getAttribute('data-price');
    productModal.dataset.currentImg = btn.getAttribute('data-img');
  });

  document.getElementById('addToCartBtn').addEventListener('click', function () {
    const qty = parseInt(document.getElementById('modalQty').value) || 1;
    const strap = document.getElementById('modalStrap').value;
    const size = document.getElementById('modalSize').value;
    cart.push({
      id: productModal.dataset.currentId,
      brand: productModal.dataset.currentBrand,
      name: productModal.dataset.currentName,
      price: parseInt(productModal.dataset.currentPrice),
      img: productModal.dataset.currentImg,
      strap: strap,
      size: size,
      qty: qty
    });
    saveCart(); renderCart();
    bootstrap.Modal.getInstance(productModal).hide();
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('cartOffcanvas'));
    offcanvas.show();
  });

  renderCart();

  /* ---- 5. CHECKOUT MULTI-PASO ---- */
  let currentStep = 1;
  const totalSteps = 4;
  const stepEls = document.querySelectorAll('.checkout-stepper .step');
  const panelEls = document.querySelectorAll('.checkout-panel');
  const nextBtn = document.getElementById('checkoutNextBtn');
  const backBtn = document.getElementById('checkoutBackBtn');
  const confirmBtn = document.getElementById('checkoutConfirmBtn');

  function goToStep(step) {
    currentStep = step;
    stepEls.forEach(function (s) {
      const n = parseInt(s.getAttribute('data-step'));
      s.classList.remove('active', 'done');
      if (n === step) s.classList.add('active');
      else if (n < step) s.classList.add('done');
    });
    panelEls.forEach(function (p, i) {
      p.classList.toggle('d-none', i !== (step - 1));
    });
    backBtn.classList.toggle('d-none', step === 1);
    nextBtn.classList.toggle('d-none', step === totalSteps);
    confirmBtn.classList.toggle('d-none', step !== totalSteps);
    if (step === 4) buildSummary();
  }

  function validatePanel(step) {
    if (step === 1) {
      const form = document.getElementById('shippingForm');
      if (!form.checkValidity()) { form.classList.add('was-validated'); return false; }
      return true;
    }
    if (step === 3) {
      const payCard = document.getElementById('payCard').checked;
      if (payCard) {
        const form = document.getElementById('cardForm');
        if (!form.checkValidity()) { form.classList.add('was-validated'); return false; }
      }
      return true;
    }
    return true;
  }

  nextBtn.addEventListener('click', function () {
    if (!validatePanel(currentStep)) return;
    if (currentStep < totalSteps) goToStep(currentStep + 1);
  });

  backBtn.addEventListener('click', function () {
    if (currentStep > 1) goToStep(currentStep - 1);
  });

  document.getElementById('checkoutModal').addEventListener('show.bs.modal', function () {
    goToStep(1);
    document.getElementById('orderConfirmedMsg').classList.add('d-none');
    confirmBtn.disabled = false;
  });

  /* Cambiar metodo de pago */
  ['payCard', 'payPaypal', 'payTransfer'].forEach(function (id) {
    document.getElementById(id).addEventListener('change', function () {
      document.getElementById('cardForm').classList.toggle('d-none', id !== 'payCard');
      document.getElementById('paypalMsg').classList.toggle('d-none', id !== 'payPaypal');
      document.getElementById('transferMsg').classList.toggle('d-none', id !== 'payTransfer');
    });
  });

  function getDeliveryCost() {
    const checked = document.querySelector('input[name="delivery"]:checked');
    return checked ? parseInt(checked.value) : 0;
  }

  function buildSummary() {
    const summaryItemsEl = document.getElementById('summaryItems');
    let subtotal = 0;
    let html = '';
    cart.forEach(function (item) {
      const lineTotal = item.price * item.qty;
      subtotal += lineTotal;
      html += '<div class="d-flex justify-content-between mb-1">' +
        '<span>' + item.brand + ' ' + item.name + ' (' + item.strap + ', ' + item.size + ') x' + item.qty + '</span>' +
        '<span>' + formatPrice(lineTotal) + '</span>' +
      '</div>';
    });
    summaryItemsEl.innerHTML = html;
    const shipping = getDeliveryCost();
    document.getElementById('summarySubtotal').textContent = formatPrice(subtotal);
    document.getElementById('summaryShipping').textContent = shipping === 0 ? 'Gratis' : formatPrice(shipping);
    document.getElementById('summaryTotal').textContent = formatPrice(subtotal + shipping);
  }

  confirmBtn.addEventListener('click', function () {
    if (cart.length === 0) return;
    const orderNum = 'CE-' + Date.now().toString().slice(-8);
    document.getElementById('orderNumber').textContent = orderNum;
    document.getElementById('orderConfirmedMsg').classList.remove('d-none');
    confirmBtn.disabled = true;
    cart = [];
    saveCart();
    renderCart();
  });

});
