// Carousel Navigation System
class LogCarousel {
    constructor() {
        this.wrapper = document.querySelector('.carousel-wrapper');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.totalSlides = this.slides.length;
        this.currentSlide = 0;
        this.isTransitioning = false;
        this.wheelTimeout = null;

        this.init();
    }

    init() {
        // Navigation buttons
        document.getElementById('carousel-prev')?.addEventListener('click', () => this.prevSlide());
        document.getElementById('carousel-next')?.addEventListener('click', () => this.nextSlide());

        // Navigation tabs (both desktop and mobile)
        document.querySelectorAll('.log-nav-btn, .log-nav-btn-mobile').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const logNumber = parseInt(e.target.dataset.log);
                const slideIndex = Array.from(this.slides).findIndex(slide => parseInt(slide.dataset.log) === logNumber);
                this.goToSlide(slideIndex);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });


        this.updateCarousel();
    }

    goToSlide(index) {
        if (this.isTransitioning) return;

        // Clamp index between 0 and totalSlides - 1
        this.currentSlide = Math.max(0, Math.min(index, this.totalSlides - 1));
        this.updateCarousel();
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
            this.updateCarousel();
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateCarousel();
        }
    }

    updateCarousel() {
        // Translate the wrapper
        const offset = -this.currentSlide * 100;
        this.wrapper.style.transform = `translateX(${offset}%)`;

        // Update counter
        const counter = document.getElementById('carousel-counter');
        if (counter) {
            counter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
        }

        // Update active navigation tab (both desktop and mobile)
        document.querySelectorAll('.log-nav-btn, .log-nav-btn-mobile').forEach((btn, index) => {
            if (index === this.currentSlide) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update prev/next button states
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');

        if (prevBtn) {
            prevBtn.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
            prevBtn.style.cursor = this.currentSlide === 0 ? 'not-allowed' : 'pointer';
        }

        if (nextBtn) {
            nextBtn.style.opacity = this.currentSlide === this.totalSlides - 1 ? '0.5' : '1';
            nextBtn.style.cursor = this.currentSlide === this.totalSlides - 1 ? 'not-allowed' : 'pointer';
        }
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LogCarousel();
});
