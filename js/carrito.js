// Variables globales
let cart = [];
const cartTray = document.getElementById('cartTray');
const cartOverlay = document.getElementById('cartOverlay');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItems');
const cartBadge = document.getElementById('cartBadge');
const cartTotal = document.getElementById('cartTotal');
const cartItemCount = document.getElementById('cartItemCount');

// Abrir carrito al hacer clic en el icono
openCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartTray.classList.add('active');
    cartOverlay.classList.add('active');
});

// Cerrar carrito
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function closeCart() {
    cartTray.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// Añadir al carrito
document.addEventListener('click', function(e) {
    if (e.target.closest('.product-card__add-cart')) {
        const button = e.target.closest('.product-card__add-cart');
        addToCart(button);
    }
});

function addToCart(button) {
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const image = button.getAttribute('data-image');
    
    // Verificar si el producto ya está en el carrito
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
}

// Actualizar carrito
function updateCart() {
    // Calcular total de items
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Actualizar badge
    cartBadge.textContent = totalItems;
    cartItemCount.textContent = totalItems;
    
    // Mostrar/ocultar badge
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Actualizar lista de productos si el carrito está abierto
    if (cartTray.classList.contains('active')) {
        renderCartItems();
    }
    
    // Actualizar total
    updateTotal();
}

// Renderizar items del carrito
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
    
    // Event listeners para controles
    setupCartItemControls();
}

// Configurar controles de items del carrito
function setupCartItemControls() {
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.closest('.cart-item').getAttribute('data-id');
            updateItemQuantity(itemId, -1);
        });
    });
    
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.closest('.cart-item').getAttribute('data-id');
            updateItemQuantity(itemId, 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.closest('.cart-item').getAttribute('data-id');
            removeItem(itemId);
        });
    });
}

// Actualizar cantidad de un item
function updateItemQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity < 1) {
            cart = cart.filter(item => item.id !== itemId);
        }
        
        updateCart();
        renderCartItems(); // Volver a renderizar para reflejar cambios
    }
}

// Eliminar item
function removeItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
    renderCartItems();
}

// Actualizar total
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




// Mejora: Script para mejorar accesibilidad dinámica 
    
        document.addEventListener('DOMContentLoaded', function() {
            // Manejar el foco para elementos interactivos
            const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
            
            interactiveElements.forEach(el => {
                el.addEventListener('focus', function() {
                    this.style.outline = '2px solid #0066cc';
                    this.style.outlineOffset = '2px';
                });
                
                el.addEventListener('blur', function() {
                    this.style.outline = 'none';
                });
            });
            
            // Manejar el botón de saltar al contenido
            const skipLink = document.querySelector('.skip-link');
            const mainContent = document.getElementById('main-content');
            
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
            });
        });