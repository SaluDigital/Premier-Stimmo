class TestimonialsCarousel {
    constructor() {
        this.track = document.getElementById('testimonialTrack');
        this.slides = Array.from(this.track.children);
        this.nextButton = document.querySelector('.carousel-controls .next');
        this.prevButton = document.querySelector('.carousel-controls .prev');
        this.dotsContainer = document.querySelector('.carousel-dots');

        this.slideWidth = 0;
        this.currentIndex = 0;
        this.slidesPerView = 1;

        this.init();
    }

    init() {
        this.updateDimensions();
        this.createDots();
        this.updateDots();

        window.addEventListener('resize', () => {
            this.updateDimensions();
            this.updatePosition();
        });

        this.nextButton.addEventListener('click', () => {
            this.moveSlide('next');
            this.resetAutoPlay();
        });

        this.prevButton.addEventListener('click', () => {
            this.moveSlide('prev');
            this.resetAutoPlay();
        });

        // Auto Play
        this.startAutoPlay();
    }

    updateDimensions() {
        // Calculate slides per view based on CSS breakpoints
        const width = window.innerWidth;
        if (width >= 992) this.slidesPerView = 3;
        else if (width >= 768) this.slidesPerView = 2;
        else this.slidesPerView = 1;

        // Get the width of a single slide including gap
        // (Assuming gap is 30px from CSS)
        const slideCard = this.slides[0];
        const gap = 30;
        // We can just use the offsetWidth of the card + gap
        // But better is to just calculate percentage translation

        // Actually, for a simple implementation with gap, we can translate by (100% / slidesPerView) + gap adjustment
        // But simpler: just translate by (cardWidth + gap) * index
    }

    moveSlide(direction) {
        const totalSlides = this.slides.length;
        const maxIndex = totalSlides - this.slidesPerView;

        if (direction === 'next') {
            if (this.currentIndex >= maxIndex) {
                this.currentIndex = 0; // Loop back to start
            } else {
                this.currentIndex++;
            }
        } else {
            if (this.currentIndex <= 0) {
                this.currentIndex = maxIndex; // Loop to end
            } else {
                this.currentIndex--;
            }
        }

        this.updatePosition();
        this.updateDots();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updatePosition();
        this.updateDots();
        this.resetAutoPlay();
    }

    updatePosition() {
        const slideCard = this.slides[0];
        const style = window.getComputedStyle(this.track);
        const gap = parseFloat(style.gap) || 30;
        const moveAmount = (slideCard.offsetWidth + gap) * this.currentIndex;

        this.track.style.transform = `translateX(-${moveAmount}px)`;
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        const totalSlides = this.slides.length;
        const dotsCount = totalSlides - this.slidesPerView + 1; // Simplification, strictly it's usually just totalSlides or totalPages. 
        // Let's do 1 dot per starting position possible

        // Valid positions are 0 to (total - visible)
        // If we have 6 slides and 3 visible: indices 0, 1, 2, 3 are valid. 4 would show 4,5,blank. 

        const maxIndex = totalSlides - this.slidesPerView;
        // If fewer slides than view, just 1 dot or 0.

        const count = (maxIndex < 0) ? 0 : maxIndex + 1;

        for (let i = 0; i < count; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    updateDots() {
        const dots = Array.from(this.dotsContainer.children);
        dots.forEach((dot, index) => {
            if (index === this.currentIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.moveSlide('next'), 5000);
    }

    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.startAutoPlay();
    }
}

// Initialize when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if slider exists
    if (document.getElementById('testimonialTrack')) {
        new TestimonialsCarousel();
    }
});
