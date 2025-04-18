// Funktion zum Prüfen, ob die Seite existiert
function checkPageExists() {
    const path = window.location.pathname;
    const validPages = ['/index.html', '/404.html'];
    const currentPage = path === '/' ? '/index.html' : path;

    if (!validPages.includes(currentPage) && !path.includes('#')) {
        window.location.replace('/404.html');
    }
}

// Beim Laden der Seite prüfen
document.addEventListener('DOMContentLoaded', () => {
    checkPageExists();
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Kontaktformular-Logik
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const form = this;
        const formData = new FormData(form);
        const formMessage = document.getElementById('form-message');

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formMessage.textContent = 'Deine Anfrage wurde erfolgreich gesendet! Wir melden uns in Kürze.';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
                form.reset();
            } else {
                throw new Error('Fehler beim Senden des Formulars.');
            }
        } catch (error) {
            formMessage.textContent = 'Es gab ein Problem beim Senden deiner Anfrage. Bitte versuche es später erneut.';
            formMessage.classList.remove('success');
            formMessage.classList.add('error');
        }
    });
}

// Scroll- und Navigations-Logik
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href.includes('#') && href.split('#')[1] === currentSection) {
            link.classList.add('active');
        }
    });

    // Scroll-Triggered Animations
    const scrollElements = document.querySelectorAll('.animate-scroll');
    const footer = document.querySelector('.animate-footer');
    
    scrollElements.forEach(el => {
        if (!el.classList.contains('visible')) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                el.classList.add('visible');
            }
        }
    });

    if (footer && !footer.classList.contains('visible')) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top < window.innerHeight) {
            footer.classList.add('visible');
        }
    }
});

// Dark Mode Toggle
const themeSwitch = document.getElementById('theme-switch');
if (themeSwitch) {
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });

    // Theme Persistence
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
        themeSwitch.checked = true;
    }
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}