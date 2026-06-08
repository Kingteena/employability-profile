// Main JavaScript - Initialization & Scroll Animations

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Scroll animations - fade in elements as user scrolls
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.event-card').forEach(card => {
        observer.observe(card);
    });

    // Update navigation active state based on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('font-semibold', 'text-gray-900');
            link.classList.add('text-gray-600');

            if (link.getAttribute('href').slice(1) === current) {
                link.classList.remove('text-gray-600');
                link.classList.add('font-semibold', 'text-gray-900');
            }
        });
    });

    // Add subtle parallax effect to hero section
    const hero = document.getElementById('hero');
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        if (scrollY < hero.offsetHeight) {
            hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
        }
    });
});

// Utility function: scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
