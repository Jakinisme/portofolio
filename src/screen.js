
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

function setActiveLink() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-link');
    
    navItems.forEach(item => {
        item.classList.remove('active-link');
    });
    
    if (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
        const homeLink = document.querySelector('[data-page="home"]');
        if (homeLink) homeLink.classList.add('active-link');
    } else if (currentPath.includes('about.html')) {
        const aboutLink = document.querySelector('[data-page="about"]');
        if (aboutLink) aboutLink.classList.add('active-link');
    } else if (currentPath.includes('contact.html')) {
        const contactLink = document.querySelector('[data-page="contact"]');
        if (contactLink) contactLink.classList.add('active-link');
    } else if (currentPath.includes('project.html')) {
        const projectLink = document.querySelector('[data-page="projects"]');
        if (projectLink) projectLink.classList.add('active-link');
    }
}

function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

mobileMenuToggle.addEventListener('click', toggleMobileMenu);
mobileOverlay.addEventListener('click', toggleMobileMenu);

const navLinksItems = navLinks.querySelectorAll('a');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        link.style.opacity = '0.7';
        link.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            link.style.opacity = '';
            link.style.transform = '';
        }, 200);
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 600 && navLinks.classList.contains('active')) {
        toggleMobileMenu();
    }
});

if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

navLinksItems.forEach(link => {
    const indicator = link.querySelector('.nav-indicator');
    const dot = link.querySelector('.indicator-dot');
    const line = link.querySelector('.indicator-line');
    
    if (indicator && dot && line) {
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active-link')) {
                dot.style.transform = 'scale(0.7)';
                line.style.width = '50%';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active-link')) {
                dot.style.transform = 'scale(0)';
                line.style.width = '0%';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', setActiveLink);