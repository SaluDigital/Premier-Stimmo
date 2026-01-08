document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    });

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMenu() {
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : 'auto';
    }

    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .fade-in-up');

    function reveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    
    // Trigger once on load
    reveal();

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
