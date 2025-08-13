
    
    const backBtn = document.getElementById('btn-back');
    if (backBtn) backBtn.addEventListener('click', () => history.back());

    
    document.querySelectorAll('a[target="_blank"]').forEach(a => {
    if (!a.rel.includes('noopener')) a.rel += ' noopener';
    });


    const form = document.querySelector('.login__form');
    if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const status = document.getElementById('form-status');
        if (status) {
        status.textContent = 'Iniciando sesión…';
        setTimeout(() => {
            status.textContent = 'Sesión iniciada. Redirigiendo a productos…';
            
            window.location.href = 'Products.html';
        }, 800);
        } else {
        window.location.href = 'Products.html';
        }
    });
    }
