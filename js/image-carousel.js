// Image carousel for logs with multiple images
const logImageState = {};

function initLogImageCarousel() {
    // Initialize state for each gallery
    document.querySelectorAll('.log-image-gallery').forEach(gallery => {
        const logIndex = gallery.dataset.logIndex;
        const images = gallery.querySelectorAll('.log-image');
        logImageState[logIndex] = {
            currentIndex: 0,
            totalImages: images.length
        };
    });
}

function nextLogImage(logIndex) {
    const state = logImageState[logIndex];
    const gallery = document.querySelector(`.log-image-gallery[data-log-index="${logIndex}"]`);
    const images = gallery.querySelectorAll('.log-image');

    // Hide current image
    images[state.currentIndex].classList.add('hidden');

    // Move to next
    state.currentIndex = (state.currentIndex + 1) % state.totalImages;

    // Show next image
    images[state.currentIndex].classList.remove('hidden');

    // Update counter
    updateImageCounter(gallery, state.currentIndex, state.totalImages);
}

function prevLogImage(logIndex) {
    const state = logImageState[logIndex];
    const gallery = document.querySelector(`.log-image-gallery[data-log-index="${logIndex}"]`);
    const images = gallery.querySelectorAll('.log-image');

    // Hide current image
    images[state.currentIndex].classList.add('hidden');

    // Move to previous
    state.currentIndex = (state.currentIndex - 1 + state.totalImages) % state.totalImages;

    // Show previous image
    images[state.currentIndex].classList.remove('hidden');

    // Update counter
    updateImageCounter(gallery, state.currentIndex, state.totalImages);
}

function updateImageCounter(gallery, currentIndex, totalImages) {
    const counter = gallery.querySelector('.image-counter');
    if (counter) {
        counter.querySelector('.current').textContent = currentIndex + 1;
    }
}

// Keyboard navigation for image galleries
document.addEventListener('keydown', (e) => {
    const gallery = document.querySelector('.log-image-gallery:focus-within');
    if (!gallery) return;

    const logIndex = gallery.dataset.logIndex;
    if (e.key === 'ArrowRight') {
        nextLogImage(logIndex);
    } else if (e.key === 'ArrowLeft') {
        prevLogImage(logIndex);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initLogImageCarousel);
