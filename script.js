// Lightbox für Event-Bilder
document.addEventListener('DOMContentLoaded', function() {
    const lightboxModal = document.getElementById('eventLightboxModal');
    const lightboxImg = document.getElementById('eventLightboxImg');
    const lightboxCloseBtn = document.getElementById('eventLightboxClose');
    document.querySelectorAll('.event-lightbox-img').forEach(img => {
        img.addEventListener('click', function() {
            if (lightboxImg && lightboxModal) {
                lightboxImg.src = this.src;
                lightboxModal.style.display = 'flex';
            }
        });
    });
    if (lightboxCloseBtn && lightboxModal && lightboxImg) {
        lightboxCloseBtn.addEventListener('click', function(e) {
            lightboxModal.style.display = 'none';
            lightboxImg.src = '';
        });
    }
    if (lightboxModal) {
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal || e.target === lightboxImg) {
                lightboxModal.style.display = 'none';
                lightboxImg.src = '';
            }
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxModal && lightboxModal.style.display === 'flex') {
            lightboxModal.style.display = 'none';
            lightboxImg.src = '';
        }
    });
});
// Dynamisch Abstand zwischen Gallery und nächster Section minimieren
function minimizeGallerySectionGap() {
    const heroBg = document.querySelector('.hero-bg');
    // Finde die nächste Section nach .hero-bg
    let nextSection = heroBg;
    while (nextSection && nextSection.nextElementSibling && nextSection.nextElementSibling.nodeType !== 1) {
        nextSection = nextSection.nextElementSibling;
    }
    nextSection = nextSection && nextSection.nextElementSibling;
    if (nextSection) {
        // Setze einen festen Abstand, z.B. 8vw, damit der Abstand zur Navbar und zur Section gleich ist
        nextSection.style.marginTop = '8vw';
    }
}
window.addEventListener('resize', minimizeGallerySectionGap);
window.addEventListener('DOMContentLoaded', minimizeGallerySectionGap);
// Bild in .hero-bg immer vollständig anzeigen, unabhängig von der Screen-Größe
window.addEventListener('DOMContentLoaded', function() {
    // Dynamisch hero-bg-Containerhöhe an Bildhöhe für mobile Screens anpassen
    function setHeroBgHeightResponsive() {
        const heroBg = document.querySelector('.hero-bg');
        if (!heroBg) return;
        let heroImg = heroBg.querySelector('img');
        if (window.innerWidth <= 900 && heroImg && heroImg.complete && heroImg.naturalHeight) {
            // Für mobile und Tablet: Containerhöhe exakt wie Bildhöhe, aber max 100vh
            let imgRatio = heroImg.naturalWidth / heroImg.naturalHeight;
            let containerWidth = heroBg.offsetWidth;
            let newHeight = containerWidth / imgRatio;
            if (newHeight > window.innerHeight) newHeight = window.innerHeight;
            heroBg.style.height = newHeight + 'px';
            heroBg.style.minHeight = '0';
        } else {
            // Für größere Screens: Standardhöhe (z.B. 100vh)
            heroBg.style.height = '';
            heroBg.style.minHeight = '100vh';
        }
    }
    setHeroBgHeightResponsive();
    window.addEventListener('resize', setHeroBgHeightResponsive);
    const heroBgImg = document.querySelector('.hero-bg img');
    if (heroBgImg) heroBgImg.onload = setHeroBgHeightResponsive;
    // Charity-Projekt: Christmette 2024 Bild auf mobilen Screens volle Breite und flexible Höhe
    function fitChristmetteImg() {
        var christmetteImg = document.querySelector('.christmette-img-tall');
        if (!christmetteImg) return;
        if (window.innerWidth <= 600) {
            christmetteImg.style.width = '100vw';
            christmetteImg.style.height = 'auto';
            christmetteImg.style.objectFit = 'cover';
            christmetteImg.style.display = 'block';
            christmetteImg.style.margin = '0 auto';
        } else {
            christmetteImg.style.width = '';
            christmetteImg.style.height = '';
            christmetteImg.style.objectFit = '';
            christmetteImg.style.display = '';
            christmetteImg.style.margin = '';
        }
    }
    fitChristmetteImg();
    window.addEventListener('resize', fitChristmetteImg);
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    const heroImg = heroBg.querySelector('img');
    if (!heroImg) return;

    function fitHeroImg() {
        // Setze das Bild so, dass es immer komplett sichtbar ist
        heroImg.style.width = '';
        heroImg.style.height = '';
        heroImg.style.maxWidth = '100%';
        heroImg.style.maxHeight = '100vh';
        heroImg.style.objectFit = 'contain';
        heroImg.style.display = 'block';
        heroImg.style.margin = '0 auto';
        // Optional: Passe Höhe an, falls Container kleiner als Bild ist
        const containerRect = heroBg.getBoundingClientRect();
        if (heroImg.naturalWidth && heroImg.naturalHeight) {
            const aspect = heroImg.naturalWidth / heroImg.naturalHeight;
            let newWidth = containerRect.width;
            let newHeight = newWidth / aspect;
            if (newHeight > window.innerHeight) {
                newHeight = window.innerHeight;
                newWidth = newHeight * aspect;
            }
            heroImg.style.width = newWidth + 'px';
            heroImg.style.height = newHeight + 'px';
        }
    }

    if (heroImg.complete) {
        fitHeroImg();
    } else {
        heroImg.onload = fitHeroImg;
    }
    window.addEventListener('resize', fitHeroImg);
});
// Hero-BG Gallery/Slideshow
const heroGallery = [
    { src: 'bilder/Mitte.jpg', title: 'Mitte' },
    { src: 'bilder/Ochsenfurt 23.07.2005.JPG', title: 'Ochsenfurt 23.07.2005' },
    { src: 'bilder/Tutti insieme 2016.jpg', title: 'Tutti insieme 2016' },
    { src: 'bilder/CMI 2016.jpg', title: 'CMI 2016' },
    { src: 'bilder/CMI in chiesa St.Wolfgang.jpg', title: 'CMI in St.Wolfgang' },
    { src: 'bilder/Totale.jpg', title: 'Totale' },
    { src: 'bilder/Gruppe17.09.11.jpg', title: 'Jubiläumskonzert zum 30-jährigen Bestehen am 17.09.11' },
    { src: 'bilder/Ochsenfurt 23.07.2005 (1).JPG', title: 'Ochsenfurt 23.07.2005 (1)' },
    { src: 'bilder/Ochsenfurt 23.07.2005.JPG', title: 'Ochsenfurt 23.07.2005' },
    { src: 'bilder/Mitte.jpg', title: 'Mitte' },
    { src: 'bilder/Ochsenfurt 05.03.2011.JPG', title: 'Ochsenfurt 05.03.2011' },
    { src: 'bilder/DSC_6083.JPG', title: 'DSC_6083' },
    { src: 'bilder/7 Gruppe CMI 2013.JPG', title: 'Gruppe CMI 2013' },
    { src: 'bilder/6 Gruppe 05.01.2013.jpg', title: 'Gruppe 05.01.2013' },
        // Neue Bilder
        { src: 'bilder/DSC_4296.JPG', title: 'DSC_4296' },
        { src: 'bilder/DSC_4255.JPG', title: 'St Thekla 2017' },
        { src: 'bilder/Gruppe CMI BGS Veehnklang April 2023.jpg', title: 'Gruppe CMI BGS Veehnklang April 2023' },
        { src: 'bilder/Gruppe 2016 2.jpg', title: 'Gruppe 2016' },
        { src: 'bilder/Grundschule.JPG', title: 'Grundschule' },
        { src: 'bilder/Spendenübergabe.jpg', title: 'Spendenübergabe' },
        { src: 'bilder/Singen schenke uns.png', title: 'Singen schenke uns' },
        { src: 'bilder/Gruppenfoto_St._Thekla_2022.jpg', title: 'Gruppenfoto St. Thekla 2022' },
        { src: 'bilder/Gib uns Fireden 1.png', title: 'Gib uns Frieden' },
        { src: 'bilder/Gruppenbild 2022.jpg', title: 'Gruppenbild 2022' },
        { src: 'bilder/Scheunenkonzert 17.07.jpg', title: 'Scheunenkonzert 17.07' },
        { src: 'bilder/GoPro002 (4).png', title: 'GoPro002 (4)' },
        { src: 'bilder/Gruppenfoto Weikersheim.jpg', title: 'Gruppenfoto Weikersheim 2006' },
        { src: 'bilder/Opern-Gala-BGS - 20 von 44.jpg', title: 'Opern-Gala-BGS - 20 von 44' },
        { src: 'bilder/Gruppenfoto CMI BGS St. Thekla 2022.jpg', title: 'Gruppenfoto CMI BGS St. Thekla 2022' },
        // Alte Bilder
        { src: 'bilder/Weikersheim_2006.png', title: 'Weikersheim 2006' },
        { src: 'bilder/Gruppenbild.jpg', title: 'Collegium Musicum Iuvenale 2025' },
        { src: 'bilder/peterbild.jpg', title: 'Gedenkfeier - „80 Jahre Kriegsende, 80 Jahre Frieden in Ochsenfurt 2025' },
        { src: 'bilder/concello.jfif', title: 'Concello 2025 in der Klosterkirche Ochsenfurt' },
        { src: 'bilder/Gruppenbild2.jpg', title: 'Benefizkonzert für „Ärzte ohne Grenzen“ 2025 im Maintz Hotel Ochsenfurt' },
        { src: 'bilder/klosterkirche.jpg', title: 'Klosterkirche 2024' },
        { src: 'bilder/gaukönigshofen.jpg', title: 'Benefizkonzert 2024 in Gaukönigshofen' },
        { src: 'bilder/gruppemitflagge.jpg', title: 'Gruppenbild 2025' },
        { src: 'bilder/christuskirche_27_april_2024.jpg', title: 'Christuskirche 27. April 2024' },
        { src: 'bilder/christuskirche_27_april_2024_2.jpg', title: 'Christuskirche 2024' },
        { src: 'bilder/christuskirche_27_april_2024_3.jpg', title: 'Christuskirche 2024' },
        { src: 'bilder/konzert.jpg', title: 'Benefizkonzert für „Ärzte ohne Grenzen“ 2025 im Maintz Hotel Ochsenfurt' },
        { src: 'bilder/salboro_santa_maria_assunta_2024.jpg', title: 'Salboro Santa Maria Assunta 2024' },
        { src: 'bilder/salboro_santa_maria_assunta_2024_2.jpg', title: 'Salboro Santa Maria Assunta 2024 – 2' },
];
let heroIndex = 0;
const fadeDuration = 7000;
let fadeToggle = false;
function setHeroBgCrossfade(idx) {
    const fadeContainer = document.querySelector('.hero-bg-fade-container');
    if (!fadeContainer) return;
    const fadeA = fadeContainer.children[0];
    const fadeB = fadeContainer.children[1];
    const current = fadeToggle ? fadeA : fadeB;
    const next = fadeToggle ? fadeB : fadeA;
    // Set next image and bring to front
    next.style.backgroundImage = `url('${heroGallery[idx].src}')`;
    next.style.opacity = '0';
    next.style.transition = `opacity ${fadeDuration/1000}s cubic-bezier(.77,0,.18,1)`;
    // Set or update title overlay
    let titleDiv = next.querySelector('.hero-bg-title');
    if (!titleDiv) {
        titleDiv = document.createElement('div');
        titleDiv.className = 'hero-bg-title';
        next.appendChild(titleDiv);
    }
    titleDiv.textContent = heroGallery[idx].title;
    titleDiv.style.opacity = '0';
    // Individual background position logic (existing)
    if (window.innerWidth <= 600) {
        if (idx === 2) {
            next.style.backgroundPosition = 'center 8%';
            next.style.backgroundSize = '100vw auto';
        } else {
            next.style.backgroundPosition = 'center 10%';
            next.style.backgroundSize = '100vw auto';
        }
    } else {
        if (
            heroGallery[idx].src.includes('bilder/peterbild.jpg') ||
            heroGallery[idx].src.includes('bilder/klosterkirche.jpg') ||
            heroGallery[idx].src.includes('salboro_santa_maria_assunta_2024.jpg') ||
            heroGallery[idx].src.includes('salboro_santa_maria_assunta_2024_2.jpg') ||
            heroGallery[idx].src.includes('christuskirche_27_april_2024.jpg') ||
            heroGallery[idx].src.includes('christuskirche_27_april_2024_2.jpg') ||
            heroGallery[idx].src.includes('christuskirche_27_april_2024_3.jpg')
        ) {
            next.style.backgroundPosition = 'center 50%';
        } else if (idx === 1) {
            next.style.backgroundPosition = 'center 50%';
        } else if (idx === 3) {
            next.style.backgroundPosition = 'center 70%';
        } else if (idx === 0) {
            next.style.backgroundPosition = 'center 30%';
        } else if (idx === 2) {
            next.style.backgroundPosition = 'center 10%';
        } else {
            next.style.backgroundPosition = '';
        }
    }
    // Start fade in
    setTimeout(() => {
        next.style.opacity = '1';
        current.style.opacity = '0';
        current.style.transition = `opacity ${fadeDuration/1000}s cubic-bezier(.77,0,.18,1)`;
        // Fade in title overlay
        setTimeout(() => {
            titleDiv.style.opacity = '1';
        }, 600);
        // Hide previous title
        let prevTitle = current.querySelector('.hero-bg-title');
        if (prevTitle) prevTitle.style.opacity = '0';
        fadeToggle = !fadeToggle;
    }, 50);
}
function nextHeroBgImage() {
    heroIndex = (heroIndex + 1) % heroGallery.length;
    setHeroBgCrossfade(heroIndex);
}
document.addEventListener('DOMContentLoaded', function() {
    setHeroBgCrossfade(heroIndex);
    setInterval(nextHeroBgImage, fadeDuration);
});
// Dynamisch Hintergrundlayer für about-me-section je nach Screengröße
function updateAboutMeBackground() {
    const aboutMeSection = document.querySelector('.about-me-section');
    if (!aboutMeSection) return;
    if (window.innerWidth <= 600) {
        aboutMeSection.style.background = 'none';
    } else {
        aboutMeSection.style.background = "url('bilder/Astrid var.jpg') center center/cover no-repeat";
    }
}

window.addEventListener('resize', updateAboutMeBackground);
window.addEventListener('DOMContentLoaded', updateAboutMeBackground);
// Scroll-Reveal für Cards
function revealOnScroll(selector) {
    const elements = document.querySelectorAll(selector);
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    elements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', function() {
    revealOnScroll('.modern-card');
    revealOnScroll('.musikfamilie-card');
});
// Highlight active nav link on scroll
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks).map(link => {
        const id = link.getAttribute('href').replace('#','');
        return document.getElementById(id);
    });

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                const id = this.getAttribute('href').replace('#','');
                const section = document.getElementById(id);
                if (section) {
                    section.scrollIntoView({behavior:'smooth'});
                }
            });
        });
});
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Keyboard accessibility: close menu with Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submissions
    const joinForm = document.getElementById('joinForm');
    const contactForm = document.getElementById('contactForm');

    // Hilfsfunktion für Mail-Popup
    // Accordion für Chronik-Timeline
    function initAccordion() {
        // Event Delegation für maximale Zuverlässigkeit
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('accordion-toggle')) {
                const btn = e.target;
                const content = btn.parentElement.querySelector('.accordion-content');
                const expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', !expanded);
                if (expanded) {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            }
        });
    }
    window.addEventListener('DOMContentLoaded', function() {
        initAccordion();
    });

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles for notification only once
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    z-index: 10000;
                    max-width: 400px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    transform: translateX(100%);
                    transition: transform 0.3s ease-in-out;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-success {
                    border-left: 4px solid var(--accent-green);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px 20px;
                }
                .notification-content i:first-child {
                    color: var(--accent-green);
                    font-size: 18px;
                }
                .notification-content span {
                    flex: 1;
                    color: var(--dark);
                    font-weight: 500;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--gray-400);
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                    transition: color 0.2s;
                }
                .notification-close:hover {
                    color: var(--gray-600);
                }
            `;
            document.head.appendChild(style);
        }

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Join form submission



    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Add/remove background based on scroll position
        if (scrollTop > 50) {
            navbar.style.background = '#000';
            navbar.style.zindex = '5000';
        } else {
            navbar.style.background = 'transparent';
        }
        lastScrollTop = scrollTop;
    });

    function setNavbarStyle(isScrolled) {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        if (isScrolled) {
            navbar.style.background = '#222';
            navbar.style.zIndex = '5000';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.zIndex = '5000'; // Optional: keep high z-index always
        }
    }

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        if (window.scrollY > 40) {
            setNavbarStyle(true);
        } else {
            setNavbarStyle(false);
        }
    });

    // Parallax effect for hero shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.stat-card, .cause-card, .event-card');
    cards.forEach(card => {
        // Removed hover effect for flat design
    });

    // Form validation enhancements
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Dieses Feld ist erforderlich.';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
            }
        }

        // Show error if invalid
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        }

        return isValid;
    }

    // Add error styles
    const errorStyles = document.createElement('style');
    errorStyles.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        .error-message {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 4px;
        }
    `;
    document.head.appendChild(errorStyles);

    // Popup-Styles ergänzen
    const mailPopupStyles = document.createElement('style');
    mailPopupStyles.textContent = `
    .mail-popup-overlay {
        position: fixed;
        z-index: 99999;
        inset: 0;
        background: rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .mail-popup {
        background: #fff;
        border-radius: 16px;
        max-width: 420px;
        width: 90%;
        padding: 32px 24px 24px 24px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.18);
        font-size: 1rem;
        color: #222;
        position: relative;
    }
    .mail-popup h2 {
        margin-top: 0;
        font-size: 1.3em;
        margin-bottom: 12px;
    }
    .mail-popup-address, .mail-popup-subject {
        margin-bottom: 8px;
        word-break: break-all;
    }
    .mail-popup-body pre {
        background: #f7f7f7;
        padding: 8px;
        border-radius: 8px;
        font-size: 0.97em;
        white-space: pre-wrap;
        margin: 0;
    }
    .mail-popup-close {
        margin-top: 18px;
        padding: 8px 24px;
        background: #00e0c6;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        font-size: 1em;
        transition: background 0.2s;
    }
    .mail-popup-close:hover {
        background: #53e386;
    }
    `;
    document.head.appendChild(mailPopupStyles);

    console.log('CMI Orchester Website loaded successfully!');

    // Cookie Banner Logic
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
    const cookieDeclineBtn = document.getElementById('cookieDeclineBtn');
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '')  + expires + '; path=/';
    }
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    function setCookieConsent(value) {
        setCookie('cookieAccepted', value === 'accepted' ? 'true' : '', 365);
        setCookie('cookieDeclined', value === 'declined' ? 'true' : '', 365);
        localStorage.setItem('cookieConsent', value);
    }
    function getCookieConsent() {
        if (getCookie('cookieAccepted')) return 'accepted';
        if (getCookie('cookieDeclined')) return 'declined';
        return localStorage.getItem('cookieConsent');
    }
    if (cookieBanner && cookieAcceptBtn && cookieDeclineBtn) {
        if (getCookieConsent()) {
            cookieBanner.style.display = 'none';
        } else {
            cookieBanner.style.display = 'flex';
            cookieAcceptBtn.addEventListener('click', function() {
                setCookieConsent('accepted');
                cookieBanner.style.display = 'none';
            });
            cookieDeclineBtn.addEventListener('click', function() {
                setCookieConsent('declined');
                cookieBanner.style.display = 'none';
            });
        }
    }

    // Zeitspanne seit gründung berechnen
    const currentYear = new Date().getFullYear();
    const yearsSince1981 = currentYear - 1981;
    const yearsPassedEl = document.getElementById("yearsPassed");
    if (yearsPassedEl) {
        yearsPassedEl.textContent = yearsSince1981;
    }
});

const hamburger = document.getElementById('navbarHamburger');
const mobileMenu = document.getElementById('navbarMobileMenu');
hamburger && hamburger.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
});
window.addEventListener('resize', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (window.innerWidth > 700 && mobileMenu) mobileMenu.style.display = 'none';
});

// Dynamische Anpassung des Hintergrundbildes
function updateHeroBg() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    if (window.innerWidth <= 900) {
        heroBg.style.backgroundSize = '120vw 100vh';
        heroBg.style.backgroundPosition = '60% 35%';
        heroBg.style.backgroundRepeat = 'no-repeat';
    } else {
        heroBg.style.backgroundSize = 'cover';
        heroBg.style.backgroundPosition = 'center 35%';
        heroBg.style.backgroundRepeat = 'no-repeat';
    }
}
window.addEventListener('resize', updateHeroBg);
window.addEventListener('DOMContentLoaded', updateHeroBg);
// Sprachumschalter: Zeige nur die passende Sprache
function setLang(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        if (el.getAttribute('data-lang') === lang) {
            el.style.display = '';
        } else {
            el.style.display = 'none';
        }
    });
    // Sprache persistent speichern
    try {
        localStorage.setItem('siteLang', lang);
    } catch (e) {}
    // Optionale Anpassung für Buttons, Banner etc. falls benötigt
}
window.setLang = setLang;
// Beim Laden der Seite: Sprache aus localStorage übernehmen
window.addEventListener('DOMContentLoaded', function() {
    try {
        var lang = localStorage.getItem('siteLang');
        if (lang && (lang === 'de' || lang === 'en' || lang === 'it')) {
            setLang(lang);
        }
    } catch (e) {}
});