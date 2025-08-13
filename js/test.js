document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const cartTray = document.getElementById('cartTray');
    const cartOverlay = document.getElementById('cartOverlay');
    const openCartBtn = document.getElementById('openCartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const cartTotal = document.getElementById('cartTotal');
    
    // Carrito en memoria
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Inicializar carrito
    updateCart();
    
    // Abrir carrito
    openCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openCart();
    });
    
    // Cerrar carrito
    closeCartBtn.addEventListener('click', closeCart);
    
    // Cerrar al hacer click fuera
    cartOverlay.addEventListener('click', function(e) {
        if (e.target === cartOverlay) {
            closeCart();
        }
    });
    
    // Delegación de eventos
    document.addEventListener('click', function(e) {
        // Añadir al carrito
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
    function openCart() {
        cartTray.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar el carrito
    function closeCart() {
        cartTray.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Función para añadir producto al carrito
    function addToCart(button) {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        const image = button.dataset.image;
        
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1
            });
        }
        
        updateCart();
        animateAddToCart(button);
        openCart();
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
    
    // Función para renderizar los items del carrito (CORREGIDA)
   // Función para renderizar items del carrito (versión responsive)
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

    // Agrupar productos
    const groupedItems = cart.reduce((acc, item) => {
        const existing = acc.find(i => i.id === item.id);
        if (existing) existing.quantity += item.quantity;
        else acc.push({...item});
        return acc;
    }, []);

    cartItemsContainer.innerHTML = groupedItems.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name} <span class="quantity-badge">${item.quantity}x</span></h4>
                <div class="price-info">
                    <span>$${item.price.toFixed(2)} c/u</span>
                    <strong>Total: $${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase">+</button>
                </div>
            </div>
            <button class="remove-item" aria-label="Eliminar">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    setupCartControls();
}
    
    // Función para configurar los controles de cantidad
    function setupCartControls() {
        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                updateItemQuantity(itemId, -1);
            });
        });
        
        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                updateItemQuantity(itemId, 1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                removeItem(itemId);
            });
        });
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