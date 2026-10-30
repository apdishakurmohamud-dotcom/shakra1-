// ===================================================================
// TECHNICAL & ELECTRONIC STORE - APPLICATION LOGIC
// Features: Category Filtering, Live Search, Sort, Cart Drawer,
// Quick View, Checkout with Local Payment Gateways, Wishlist, Toasts
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    products: [...productsData],
    categories: [...categoriesData],
    cart: JSON.parse(localStorage.getItem('tech_electronic_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('tech_electronic_wishlist')) || [],
    currentCategory: 'all',
    searchQuery: '',
    sortBy: 'featured'
  };

  // DOM Elements
  const productsGrid = document.getElementById('products-grid');
  const categoriesBar = document.getElementById('categories-bar');
  const productCount = document.getElementById('product-count');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const sortSelect = document.getElementById('sort-select');

  // Cart DOM Elements
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartItemsBody = document.getElementById('cart-items-body');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTotal = document.getElementById('cart-total');
  const cartBadge = document.getElementById('cart-badge');
  const btnProceedCheckout = document.getElementById('btn-proceed-checkout');
  const btnClearCart = document.getElementById('btn-clear-cart');

  // Checkout DOM Elements
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutCloseBtn = document.getElementById('checkout-close-btn');
  const checkoutForm = document.getElementById('checkout-form');
  const checkoutTotalPrice = document.getElementById('checkout-total-price');
  const checkoutItemsList = document.getElementById('checkout-items-list');

  // Invoice DOM Elements
  const invoiceModal = document.getElementById('invoice-modal');
  const invoiceDetails = document.getElementById('invoice-details');
  const btnInvoiceDone = document.getElementById('btn-invoice-done');

  // Quick View DOM Elements
  const quickViewModal = document.getElementById('quick-view-modal');
  const quickViewBody = document.getElementById('quick-view-body');
  const quickViewCloseBtn = document.getElementById('qv-close-btn');

  // Wishlist DOM Elements
  const wishlistToggleBtn = document.getElementById('wishlist-toggle-btn');
  const wishlistBadge = document.getElementById('wishlist-badge');
  const wishlistModal = document.getElementById('wishlist-modal');
  const wishlistCloseBtn = document.getElementById('wishlist-close-btn');
  const wishlistItemsContainer = document.getElementById('wishlist-items-container');

  // Toast Container
  const toastContainer = document.getElementById('toast-container');

  // Set current year in footer
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // =================================================================
  // 1. RENDER CATEGORIES
  // =================================================================
  function renderCategories() {
    categoriesBar.innerHTML = '';
    state.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `category-tab ${state.currentCategory === cat.id ? 'active' : ''}`;
      btn.innerHTML = `<i class="fa-solid ${cat.icon}"></i> ${cat.name}`;
      btn.addEventListener('click', () => {
        state.currentCategory = cat.id;
        document.querySelectorAll('.category-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts();
      });
      categoriesBar.appendChild(btn);
    });
  }

  // Global helper to filter by category (e.g. from hero / footer links)
  window.filterByCategory = function(categoryId) {
    state.currentCategory = categoryId;
    document.querySelectorAll('.category-tab').forEach(b => {
      if (b.innerText.toLowerCase().includes(categoryId.toLowerCase()) || 
          (categoryId === 'all' && b.innerText.includes('Dhammaan'))) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    renderProducts();
    const target = document.getElementById('products-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // =================================================================
  // 2. RENDER PRODUCTS
  // =================================================================
  function getFilteredAndSortedProducts() {
    let list = [...state.products];

    // Filter by Category
    if (state.currentCategory !== 'all') {
      list = list.filter(p => p.category === state.currentCategory);
    }

    // Filter by Search Query
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Sort Products
    if (state.sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (state.sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }

  function renderProducts() {
    const filtered = getFilteredAndSortedProducts();
    productCount.textContent = filtered.length;
    productsGrid.innerHTML = '';

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-products">
          <i class="fa-solid fa-box-open"></i>
          <h3>Wax alaab ah lama helin</h3>
          <p>Fadlan isku day inaad beddesho ereyga raadinta ama qaybta aad dooratay.</p>
          <button class="btn-primary" style="margin-top: 16px;" onclick="filterByCategory('all')">
            <i class="fa-solid fa-rotate-left"></i> Tus Dhammaan Alaabta
          </button>
        </div>
      `;
      return;
    }

    filtered.forEach(product => {
      const isWishlisted = state.wishlist.includes(product.id);
      const card = document.createElement('div');
      card.className = 'product-card';

      // Stars generation
      const fullStars = Math.floor(product.rating);
      let starsHtml = '';
      for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fa-solid fa-star"></i>';
      }
      if (product.rating % 1 !== 0) {
        starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
      }

      card.innerHTML = `
        <div class="product-thumb">
          <span class="badge badge-${product.badgeType}">${product.badge}</span>
          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${product.id}" title="Ku dar / Ka saar Jecleysiga">
            <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
          </button>
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'">
          <button class="quick-view-btn" data-id="${product.id}">
            <i class="fa-solid fa-eye"></i> Fiiri Faahfaahinta
          </button>
        </div>

        <div class="product-content">
          <div class="product-category-tag">${product.categoryName}</div>
          <h3 class="product-title" title="${product.name}">${product.name}</h3>
          
          <div class="product-rating">
            <div class="rating-stars">${starsHtml}</div>
            <span class="rating-count">(${product.rating} | ${product.reviews} dib-u-eegis)</span>
          </div>

          <div class="product-price-row">
            <div class="current-price"><span>$</span>${product.price.toFixed(2)}</div>
            ${product.oldPrice ? `<div class="old-price">$${product.oldPrice.toFixed(2)}</div>` : ''}
          </div>

          <div class="card-actions">
            <button class="btn-add-cart" data-id="${product.id}">
              <i class="fa-solid fa-cart-plus"></i> Kudar Gaariga
            </button>
            <button class="btn-buy-instant" data-id="${product.id}" title="Iibso Hadda">
              <i class="fa-solid fa-bolt"></i> Iibso
            </button>
          </div>
        </div>
      `;

      // Event Listeners for Card buttons
      card.querySelector('.btn-add-cart').addEventListener('click', () => {
        addToCart(product.id, 1);
      });

      card.querySelector('.btn-buy-instant').addEventListener('click', () => {
        addToCart(product.id, 1, false);
        openCheckoutModal();
      });

      card.querySelector('.quick-view-btn').addEventListener('click', () => {
        openQuickView(product.id);
      });

      card.querySelector('.wishlist-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(product.id);
      });

      productsGrid.appendChild(card);
    });
  }

  // =================================================================
  // 3. CART MANAGEMENT (ADEEG IIBSI)
  // =================================================================
  function saveCart() {
    localStorage.setItem('tech_electronic_cart', JSON.stringify(state.cart));
    updateCartUI();
  }

  function addToCart(productId, qty = 1, showFeedback = true) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += qty;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        categoryName: product.categoryName,
        quantity: qty
      });
    }

    saveCart();
    if (showFeedback) {
      showToast(`"${product.name}" waxaa lagu daray gaarigaaga!`, 'success');
      openCartDrawer();
    }
  }

  function updateCartQty(productId, delta) {
    const itemIndex = state.cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      state.cart[itemIndex].quantity += delta;
      if (state.cart[itemIndex].quantity <= 0) {
        state.cart.splice(itemIndex, 1);
        showToast('Alaabta waa laga saaray gaariga.', 'info');
      }
      saveCart();
    }
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveCart();
    showToast('Alaabta waa laga saaray gaariga.', 'info');
  }

  function clearCart() {
    if (state.cart.length === 0) return;
    if (confirm('Ma hubtaa inaad rabto inaad faaruqiso gaarigaaga iibsiga?')) {
      state.cart = [];
      saveCart();
      showToast('Gaarigaaga iibsiga waa la faaruqiyay.', 'info');
    }
  }

  function getCartSubtotal() {
    return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalCount;
    const subtotal = getCartSubtotal();
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${subtotal.toFixed(2)}`;

    // Render cart items inside drawer
    cartItemsBody.innerHTML = '';
    if (state.cart.length === 0) {
      cartItemsBody.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-cart-arrow-down"></i>
          <h4>Gaarigaagu Wuu Maran Yahay</h4>
          <p>Kudar qalabka aad xiisaynayso si aad u iibsato.</p>
          <button class="btn-primary" onclick="document.getElementById('cart-close-btn').click();">
            <i class="fa-solid fa-store"></i> Bilow Dukaamaysiga
          </button>
        </div>
      `;
      btnProceedCheckout.style.display = 'none';
      btnClearCart.style.display = 'none';
    } else {
      btnProceedCheckout.style.display = 'flex';
      btnClearCart.style.display = 'block';

      state.cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'">
          <div class="cart-item-info">
            <div>
              <h4 class="cart-item-title">${item.name}</h4>
              <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
              <div class="qty-control">
                <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
                <span class="qty-number">${item.quantity}</span>
                <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
              </div>
              <button class="cart-item-remove" data-id="${item.id}" title="Tirtir">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        `;

        itemEl.querySelector('[data-action="decrease"]').addEventListener('click', () => updateCartQty(item.id, -1));
        itemEl.querySelector('[data-action="increase"]').addEventListener('click', () => updateCartQty(item.id, 1));
        itemEl.querySelector('.cart-item-remove').addEventListener('click', () => removeFromCart(item.id));

        cartItemsBody.appendChild(itemEl);
      });
    }
  }

  function openCartDrawer() {
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  cartToggleBtn.addEventListener('click', openCartDrawer);
  cartCloseBtn.addEventListener('click', closeCartDrawer);
  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) closeCartDrawer();
  });
  btnClearCart.addEventListener('click', clearCart);

  // =================================================================
  // 4. CHECKOUT PROCESS & PAYMENT (ADEEG IIBSI)
  // =================================================================
  function openCheckoutModal() {
    if (state.cart.length === 0) {
      showToast('Gaarigaagu wuu maran yahay! Fadlan marka hore ku dar alaab.', 'error');
      return;
    }
    closeCartDrawer();

    const subtotal = getCartSubtotal();
    checkoutTotalPrice.textContent = `$${subtotal.toFixed(2)}`;

    // Populate checkout item summary
    checkoutItemsList.innerHTML = '';
    state.cart.forEach(item => {
      const row = document.createElement('div');
      row.className = 'checkout-item-row';
      row.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
      `;
      checkoutItemsList.appendChild(row);
    });

    checkoutModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckoutModal() {
    checkoutModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  btnProceedCheckout.addEventListener('click', openCheckoutModal);
  checkoutCloseBtn.addEventListener('click', closeCheckoutModal);
  checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) closeCheckoutModal();
  });

  // Handle Order Submission
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const city = document.getElementById('cust-city').value;
    const district = document.getElementById('cust-district').value.trim();
    const notes = document.getElementById('cust-notes').value.trim();
    const selectedPayment = document.querySelector('input[name="payment-method"]:checked').value;

    const btnSubmit = document.getElementById('btn-submit-order');
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Dalabkaaga waa la xaqiijinayaa...`;

    setTimeout(() => {
      // Generate Order ID & Timestamp
      const orderId = 'TE-' + Math.floor(100000 + Math.random() * 900000);
      const orderDate = new Date().toLocaleString();
      const totalAmount = getCartSubtotal().toFixed(2);
      const itemsPurchased = [...state.cart];

      // Reset Submit Button
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = `<i class="fa-solid fa-shield-check"></i> Xaqiiji & Dalbo Hadda`;

      // Close Checkout Modal
      closeCheckoutModal();
      checkoutForm.reset();

      // Show Invoice / Order Receipt Modal
      showInvoiceModal({
        orderId,
        orderDate,
        name,
        phone,
        city,
        district,
        notes,
        paymentMethod: selectedPayment,
        totalAmount,
        items: itemsPurchased
      });

      // Clear Cart
      state.cart = [];
      saveCart();
      showToast('Hambalyo! Dalabkaagu si guul leh ayuu u diiwaangalay.', 'success');
    }, 1200);
  });

  // =================================================================
  // 5. INVOICE / SUCCESS RECEIPT
  // =================================================================
  function showInvoiceModal(orderData) {
    let itemsRows = '';
    orderData.items.forEach(it => {
      itemsRows += `
        <div class="invoice-row">
          <span>${it.name} &times; ${it.quantity}</span>
          <span>$${(it.price * it.quantity).toFixed(2)}</span>
        </div>
      `;
    });

    invoiceDetails.innerHTML = `
      <div class="invoice-row">
        <strong>Tixraaca Dalabka (Order ID):</strong>
        <strong style="color: var(--accent); font-family: 'Space Grotesk', sans-serif;">#${orderData.orderId}</strong>
      </div>
      <div class="invoice-row">
        <span>Taariikhda:</span>
        <span>${orderData.orderDate}</span>
      </div>
      <div class="invoice-row">
        <span>Macmiilka:</span>
        <span>${orderData.name} (${orderData.phone})</span>
      </div>
      <div class="invoice-row">
        <span>Goobta Gaarsiinta:</span>
        <span>${orderData.city}, ${orderData.district}</span>
      </div>
      <div class="invoice-row">
        <span>Habka Lacag-bixinta:</span>
        <span style="color: #10b981; font-weight: 700;">${orderData.paymentMethod}</span>
      </div>
      ${orderData.notes ? `
        <div class="invoice-row">
          <span>Faahfaahin:</span>
          <span>${orderData.notes}</span>
        </div>
      ` : ''}

      <div style="border-top: 1px solid var(--border-color); margin: 12px 0 8px 0; padding-top: 8px;">
        <strong style="display: block; margin-bottom: 8px; color: #fff;">Alaabta Aad Iibsatay:</strong>
        ${itemsRows}
      </div>

      <div class="invoice-row total">
        <span>Wadarta Guud:</span>
        <span>$${orderData.totalAmount}</span>
      </div>
    `;

    invoiceModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  btnInvoiceDone.addEventListener('click', () => {
    invoiceModal.classList.remove('open');
    document.body.style.overflow = '';
  });

  // =================================================================
  // 6. QUICK VIEW MODAL
  // =================================================================
  function openQuickView(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    let specsRows = '';
    if (product.specs) {
      for (const [key, value] of Object.entries(product.specs)) {
        specsRows += `
          <tr>
            <td>${key}:</td>
            <td>${value}</td>
          </tr>
        `;
      }
    }

    quickViewBody.innerHTML = `
      <div class="quick-view-content">
        <div>
          <img src="${product.image}" alt="${product.name}" class="quick-view-img" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'">
          <div style="margin-top: 12px; display: flex; gap: 8px;">
            <span class="badge badge-${product.badgeType}">${product.badge}</span>
            <span style="font-size: 0.8rem; color: #10b981;"><i class="fa-solid fa-circle-check"></i> Qalab Asal ah oo Diyaar ah</span>
          </div>
        </div>

        <div>
          <div class="product-category-tag">${product.categoryName}</div>
          <h2 style="font-size: 1.4rem; color: #fff; margin-bottom: 8px;">${product.name}</h2>
          
          <div class="product-rating" style="margin-bottom: 12px;">
            <span class="rating-stars"><i class="fa-solid fa-star"></i> ${product.rating}</span>
            <span class="rating-count">(${product.reviews} qiimeyn)</span>
          </div>

          <div class="product-price-row" style="margin-bottom: 14px;">
            <div class="current-price"><span>$</span>${product.price.toFixed(2)}</div>
            ${product.oldPrice ? `<div class="old-price">$${product.oldPrice.toFixed(2)}</div>` : ''}
          </div>

          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">
            ${product.description}
          </p>

          <h4 style="font-size: 0.95rem; color: #fff; margin-bottom: 6px;">
            <i class="fa-solid fa-sliders"></i> Astaamaha Farsamada (Specs):
          </h4>
          <table class="specs-table">
            <tbody>
              ${specsRows}
            </tbody>
          </table>

          <div style="display: flex; gap: 12px; margin-top: 20px;">
            <button class="btn-primary" id="qv-add-cart-btn" style="flex: 1;">
              <i class="fa-solid fa-cart-plus"></i> Kudar Gaariga
            </button>
            <button class="btn-outline" id="qv-buy-btn">
              <i class="fa-solid fa-bolt"></i> Iibso Hadda
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('qv-add-cart-btn').addEventListener('click', () => {
      addToCart(product.id, 1);
      closeQuickView();
    });

    document.getElementById('qv-buy-btn').addEventListener('click', () => {
      addToCart(product.id, 1, false);
      closeQuickView();
      openCheckoutModal();
    });

    quickViewModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    quickViewModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  quickViewCloseBtn.addEventListener('click', closeQuickView);
  quickViewModal.addEventListener('click', (e) => {
    if (e.target === quickViewModal) closeQuickView();
  });

  // =================================================================
  // 7. WISHLIST MANAGEMENT
  // =================================================================
  function saveWishlist() {
    localStorage.setItem('tech_electronic_wishlist', JSON.stringify(state.wishlist));
    updateWishlistUI();
  }

  function toggleWishlist(productId) {
    const index = state.wishlist.indexOf(productId);
    const product = state.products.find(p => p.id === productId);

    if (index > -1) {
      state.wishlist.splice(index, 1);
      showToast(`"${product.name}" waa laga saaray jecleysiga.`, 'info');
    } else {
      state.wishlist.push(productId);
      showToast(`"${product.name}" waxaa lagu daray jecleysiga!`, 'success');
    }

    saveWishlist();
    renderProducts();
  }

  function updateWishlistUI() {
    wishlistBadge.textContent = state.wishlist.length;
  }

  function openWishlistModal() {
    wishlistItemsContainer.innerHTML = '';
    if (state.wishlist.length === 0) {
      wishlistItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 10px;">
          <i class="fa-regular fa-heart" style="font-size: 3rem; color: var(--text-dim); margin-bottom: 12px; display: block;"></i>
          <h4>Weli Waxba Kumaadan Darin Jecleysiga</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Guji astaanta wadnaha ee ku taal alaabta si aad halkan ugu keydiso.</p>
        </div>
      `;
    } else {
      state.wishlist.forEach(id => {
        const prod = state.products.find(p => p.id === id);
        if (!prod) return;

        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
          <img src="${prod.image}" alt="${prod.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${prod.name}</h4>
            <div class="cart-item-price">$${prod.price.toFixed(2)}</div>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
              <button class="btn-primary" style="padding: 6px 12px; font-size: 0.8rem;" data-wish-id="${prod.id}">
                <i class="fa-solid fa-cart-plus"></i> Kudar Gaariga
              </button>
              <button class="cart-item-remove" data-remove-wish="${prod.id}" title="Ka saar">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        `;

        row.querySelector('[data-wish-id]').addEventListener('click', () => {
          addToCart(prod.id, 1);
          wishlistModal.classList.remove('open');
          document.body.style.overflow = '';
        });

        row.querySelector('[data-remove-wish]').addEventListener('click', () => {
          toggleWishlist(prod.id);
          openWishlistModal();
        });

        wishlistItemsContainer.appendChild(row);
      });
    }

    wishlistModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  wishlistToggleBtn.addEventListener('click', openWishlistModal);
  wishlistCloseBtn.addEventListener('click', () => {
    wishlistModal.classList.remove('open');
    document.body.style.overflow = '';
  });
  wishlistModal.addEventListener('click', (e) => {
    if (e.target === wishlistModal) {
      wishlistModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // =================================================================
  // 8. SEARCH & SORT LISTENERS
  // =================================================================
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderProducts();
  });

  searchBtn.addEventListener('click', () => {
    state.searchQuery = searchInput.value;
    renderProducts();
  });

  sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  // =================================================================
  // 9. TOAST NOTIFICATIONS
  // =================================================================
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = '<i class="fa-solid fa-circle-info" style="color: var(--accent);"></i>';
    if (type === 'success') {
      icon = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i>';
    } else if (type === 'error') {
      icon = '<i class="fa-solid fa-triangle-exclamation" style="color: #ef4444;"></i>';
    }

    toast.innerHTML = `
      ${icon}
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
  window.showToast = showToast;

  // Initial Initialization
  renderCategories();
  renderProducts();
  updateCartUI();
  updateWishlistUI();
});
