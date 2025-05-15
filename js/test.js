document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const cartTray = document.getElementById('cartTray');
    const cartOverlay = document.getElementById('cartOverlay');
    const openCartBtn = document.getElementById('openCartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const cartTotal = document.getElementById('cartTotal');
    const cartItemCount = document.getElementById('cartItemCount');
    
    // Carrito en memoria
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Inicializar carrito
    updateCart();
    
    // Eventos para abrir/cerrar carrito
    openCartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // Delegación de eventos para los botones "Añadir al carrito"
    document.addEventListener('click', function(e) {
        if (e.target.closest('.product-card__add-cart')) {
            const button = e.target.closest('.product-card__add-cart');
            addToCart(button);
        }
        
        // Controles dentro del carrito
        if (e.target.closest('.decrease')) {
            const itemId = e.target.closest('.cart-item').dataset.id;
            updateItemQuantity(itemId, -1);
        }
        
        if (e.target.closest('.increase')) {
            const itemId = e.target.closest('.cart-item').dataset.id;
            updateItemQuantity(itemId, 1);
        }
        
        if (e.target.closest('.remove-item')) {
            const itemId = e.target.closest('.cart-item').dataset.id;
            removeItem(itemId);
        }
    });
    
    // Función para abrir el carrito
    function openCart(e) {
        e.preventDefault();
        cartTray.classList.add('active');
        cartOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar el carrito
    function closeCart() {
        cartTray.classList.remove('active');
        cartOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Función para añadir producto al carrito
    function addToCart(button) {
        const id = button.dataset.id || '1'; // Valor por defecto si no hay data-id
        const name = button.closest('.product-card').querySelector('.product-card__title').textContent;
        const priceText = button.closest('.product-card').querySelector('.product-card__description').nextElementSibling?.textContent || '5.99';
        const price = parseFloat(priceText.replace('$', '')) || 5.99;
        const image = button.dataset.image || button.closest('.product-card').querySelector('.product-card__image').src;
        
        const product = {
            id,
            name,
            price,
            image,
            quantity: 1
        };
        
        // Verificar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }
        
        updateCart();
        animateAddToCart(button);
    }
    
    // Función para actualizar el carrito
    function updateCart() {
        // Guardar en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Calcular total de items
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Actualizar badge
        cartBadge.textContent = totalItems;
        cartItemCount.textContent = totalItems;
        
        // Mostrar/ocultar badge
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        
        // Renderizar items del carrito
        renderCartItems();
        
        // Actualizar total
        updateTotal();
    }
    
    // Función para renderizar los items del carrito
    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
            return;
        }
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase">+</button>
                    </div>
                </div>
                <button class="remove-item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    // Función para actualizar cantidad de un item
    function updateItemQuantity(itemId, change) {
        const item = cart.find(item => item.id === itemId);
        
        if (item) {
            item.quantity += change;
            
            if (item.quantity < 1) {
                cart = cart.filter(item => item.id !== itemId);
            }
            
            updateCart();
        }
    }
    
    // Función para eliminar item
    function removeItem(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        updateCart();
    }
    
    // Función para actualizar total
    function updateTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
    
    // Animación al añadir al carrito
    function animateAddToCart(button) {
        button.classList.add('animate');
        setTimeout(() => {
            button.classList.remove('animate');
        }, 300);
        
        // Animación del badge
        cartBadge.classList.add('bounce');
        setTimeout(() => {
            cartBadge.classList.remove('bounce');
        }, 300);
    }
});