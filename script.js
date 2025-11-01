 // =================================================================
// 🚀 JavaScript Final Robusto y Sin Errores de Inicialización
// =================================================================

// ⚠️ Lógica global que DEBE ejecutarse al cargar la página.
document.addEventListener("DOMContentLoaded", () => {
    // ---------------------------------------------
    // 1. Smooth scrolling for navigation links
    // ---------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ---------------------------------------------
    // 2. Floating contact widget & Keyboard navigation
    // ---------------------------------------------
    const floatingContact = document.querySelector('.floating-contact');
    const contactToggle = document.querySelector('.contact-toggle');

    if (floatingContact && contactToggle) {
        contactToggle.addEventListener('click', function() {
            floatingContact.classList.toggle('active');
        });

        // Close contact widget when clicking outside
        document.addEventListener('click', function(e) {
            // Se asegura de que no se haga clic en el widget ni en el botón de alternar
            if (!floatingContact.contains(e.target) && e.target !== contactToggle) {
                floatingContact.classList.remove('active');
            }
        });

        // Keyboard navigation (Escape key)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                floatingContact.classList.remove('active');
            }
        });
    }

    // ---------------------------------------------
    // 3. Lógica de tarjetas expandibles (Acordeón)
    // ---------------------------------------------
    const expandableItems = document.querySelectorAll(".service-item.expandable");

    expandableItems.forEach(item => {
        const header = item.querySelector(".service-header");
        const content = item.querySelector(".service-content");
        const icon = item.querySelector(".expand-icon");

        if (header && content && icon) {
            // Aseguramos que el contenido inicie oculto
            content.style.maxHeight = "0px";
            content.style.overflow = "hidden";
            content.style.transition = "max-height 0.4s ease, opacity 0.3s ease";
            content.style.opacity = "0";

            // Agregamos el evento de clic
            header.addEventListener("click", () => {
                const isActive = item.classList.toggle("active");

                if (isActive) {
                    content.style.maxHeight = content.scrollHeight + "px";
                    content.style.opacity = "1";
                    icon.textContent = "▲";
                } else {
                    content.style.maxHeight = "0px";
                    content.style.opacity = "0";
                    icon.textContent = "▼";
                }
            });
        }
    });

    // ---------------------------------------------
    // 4. Micro-interactions: Add loading states
    // ---------------------------------------------
    document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"], a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // ---------------------------------------------
    // 5. Touch-friendly interactions for mobile
    // ---------------------------------------------
    if ('ontouchstart' in window) {
        document.querySelectorAll('.service-item.expandable').forEach(item => {
            item.addEventListener('touchstart', function() {
                // Lógica para añadir feedback táctil.
            });
        });
    }
}); // Fin de DOMContentLoaded

// ---------------------------------------------
// 6. Lógica de Scroll (Debe estar fuera de DOMContentLoaded para reaccionar a la ventana)
// ---------------------------------------------
window.addEventListener('scroll', function() {
    // Scroll progress indicator
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    }

    // Active section highlighting on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').endsWith(`#${current}`)) {
            link.classList.add('active');
        }
    });
});

// ---------------------------------------------
// 7. Performance optimization: Lazy load images (Debe ser global para observar elementos)
// ---------------------------------------------
const images = document.querySelectorAll('img[data-src]:not(.loaded)');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));