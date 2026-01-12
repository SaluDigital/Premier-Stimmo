document.addEventListener('DOMContentLoaded', () => {



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

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentGallery = [];
    let currentIndex = 0;

    function openLightbox(index, gallery) {
        currentIndex = index;
        currentGallery = gallery;
        const item = gallery[currentIndex];
        lightboxImg.src = item.src;
        lightboxCaption.innerHTML = item.alt;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Lock scroll
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Unlock scroll
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        openLightbox(currentIndex, currentGallery);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        openLightbox(currentIndex, currentGallery);
    }

    // Attach to all gallery items
    const galleries = ['.showroom-gallery', '.lifestyle-gallery', '.casacor-gallery'];

    galleries.forEach(selector => {
        const galleryContainer = document.querySelector(selector);
        if (galleryContainer) {
            const images = Array.from(galleryContainer.querySelectorAll('img')).map(img => ({
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt')
            }));

            galleryContainer.querySelectorAll('.gallery-item, .casacor-item').forEach((item, index) => {
                item.addEventListener('click', () => openLightbox(index, images));
            });
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);

    // Close on click outside image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });
});
