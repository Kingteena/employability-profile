// Image Gallery Lightbox Functionality

let currentImageIndex = 0;
let currentEventImages = [];

// Initialize image gallery
document.addEventListener('DOMContentLoaded', function() {
    const eventCards = document.querySelectorAll('.event-card');

    eventCards.forEach((card, cardIndex) => {
        const images = card.querySelectorAll('.event-image');

        images.forEach((img, imgIndex) => {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                currentEventImages = Array.from(images);
                currentImageIndex = imgIndex;
                openLightbox(img.src, img.alt);
            });
        });
    });

    // Lightbox controls
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', showPrevImage);
    document.getElementById('lightbox-next').addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (document.getElementById('lightbox-modal').classList.contains('hidden')) return;

        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'Escape') closeLightbox();
    });

    // Close lightbox when clicking outside image
    document.getElementById('lightbox-modal').addEventListener('click', function(e) {
        if (e.target === this) closeLightbox();
    });
});

function openLightbox(src, alt) {
    const modal = document.getElementById('lightbox-modal');
    const image = document.getElementById('lightbox-image');

    image.src = src;
    image.alt = alt;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    updateImageCounter();
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function showNextImage() {
    if (currentEventImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % currentEventImages.length;
    const img = currentEventImages[currentImageIndex];
    document.getElementById('lightbox-image').src = img.src;
    document.getElementById('lightbox-image').alt = img.alt;
    updateImageCounter();
}

function showPrevImage() {
    if (currentEventImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + currentEventImages.length) % currentEventImages.length;
    const img = currentEventImages[currentImageIndex];
    document.getElementById('lightbox-image').src = img.src;
    document.getElementById('lightbox-image').alt = img.alt;
    updateImageCounter();
}

function updateImageCounter() {
    const counter = document.getElementById('image-counter');
    if (currentEventImages.length > 1) {
        counter.textContent = `${currentImageIndex + 1} / ${currentEventImages.length}`;
    } else {
        counter.textContent = '';
    }
}
