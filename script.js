// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        
        if (mobileMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars';
        });
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
    function showMailPopup(mailto, subject, body) {
        // Popup-Overlay erstellen
        let popup = document.createElement('div');
        popup.className = 'mail-popup-overlay';
        popup.innerHTML = `
            <div class="mail-popup">
                <h2>Mailversand</h2>
                <p>Falls sich Ihr Mailprogramm nicht automatisch geöffnet hat, kopieren Sie bitte die folgende Nachricht und senden Sie sie manuell an:</p>
                <div class="mail-popup-address"><b>Astrid.Eitschberger@cmi-ochsenfurt.de</b></div>
                <div class="mail-popup-subject"><b>Betreff:</b> ${subject}</div>
                <div class="mail-popup-body"><b>Nachricht:</b><br><pre>${body}</pre></div>
                <button class="mail-popup-close">Schließen</button>
            </div>
        `;
        document.body.appendChild(popup);
        document.querySelector('.mail-popup-close').onclick = () => popup.remove();
    }

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
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // E-Mail optional, da im Join-Formular kein Feld vorhanden ist
            let emailLine = '';
            if (data.email) {
                emailLine = `E-Mail: ${data.email}\n`;
            }

            const subject = 'Interesse am Mitmachen beim CMI Orchester';
            const body = 
                `Name: ${data.name || ''}\n` +
                emailLine +
                `Instrument: ${data.instrument || ''}\n` +
                `Erfahrung: ${data.experience || ''}\n` +
                `Nachricht: ${data.message || ''}`;
            const mailto = `mailto:Astrid.Eitschberger@cmi-ochsenfurt.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailto;
            setTimeout(() => showMailPopup(mailto, subject, body), 800);

            this.reset();
        });
    }

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            const subject = 'Kontaktanfrage über die CMI Website';
            const body =
                `Name: ${data.name || ''}\n` +
                `Nachricht: ${data.message || 'Hall ich habe eigentlich eine Nachricht, aber habe sie dann doch nicht verfasst.'}`;
            const mailto = `mailto:Astrid.Eitschberger@cmi-ochsenfurt.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailto;
            setTimeout(() => showMailPopup(mailto, subject, body), 800);

            this.reset();
        });
    }

    // Mailto for "Kontakt aufnehmen" and "Nächste Konzerte" buttons
    const contactMailBtn = document.getElementById('contactMailBtn');
    if (contactMailBtn) {
        contactMailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'mailto:Astrid.Eitschberger@cmi-ochsenfurt.de?subject=Kontaktaufnahme%20über%20die%20CMI%20Website';
        });
    }
    const heroMailBtn = document.getElementById('heroMailBtn');

    // Mail mit anfrage für konzerte

    //if (heroMailBtn) {
    //    heroMailBtn.addEventListener('click', function(e) {
    //        e.preventDefault();
    //        window.location.href = 'mailto:Astrid.Eitschberger@cmi-ochsenfurt.de?subject=Konzertanfrage%20über%20die%20CMI%20Website';
    //    });
    //}

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background based on scroll position
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat-card, .cause-card, .event-card, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Event card interactions
    const eventLinks = document.querySelectorAll('.event-link');
    eventLinks.forEach(link => {
        link.addEventListener('click', function() {
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            showNotification(`Weitere Informationen zu "${eventTitle}" folgen bald auf unserer Website!`, 'info');
        });
    });

    // Add loading states to buttons
    // Entfernt für Mailto-Formulare, da Seite verlassen wird und Button-Loading keinen Sinn macht

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
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
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
});

// Galerie-Overlay für Bilder, Videos, Audios
document.addEventListener('DOMContentLoaded', function() {
    // Galerie Overlay
    const galleryOverlay = document.getElementById('galleryOverlay');
    const galleryOverlayMedia = document.querySelector('.gallery-overlay-media');
    const galleryOverlayClose = document.querySelector('.gallery-overlay-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Referenz auf aktuell abgespieltes Audio/Video
    let currentMedia = null;

    function closeGalleryOverlay() {
        // Stoppe Audio/Video falls vorhanden
        if (currentMedia) {
            if (currentMedia.tagName === 'AUDIO' || currentMedia.tagName === 'VIDEO') {
                currentMedia.pause();
                currentMedia.currentTime = 0;
            }
            currentMedia = null;
        }
        galleryOverlay.style.display = 'none';
        galleryOverlayMedia.innerHTML = '';
        document.body.style.overflow = '';
    }

    galleryOverlayClose.addEventListener('click', closeGalleryOverlay);
    galleryOverlay.addEventListener('click', function(e) {
        if (e.target === galleryOverlay || e.target === document.querySelector('.gallery-overlay-bg')) {
            closeGalleryOverlay();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (galleryOverlay.style.display !== 'none' && (e.key === 'Escape' || e.key === 'Esc')) {
            closeGalleryOverlay();
        }
    });

    function openGalleryItem(item) {
        const type = item.getAttribute('data-type');
        const src = item.getAttribute('data-src');
        galleryOverlayMedia.innerHTML = '';
        document.body.style.overflow = 'hidden';
        currentMedia = null;

        if (type === 'image') {
            const img = document.createElement('img');
            img.src = src;
            img.alt = item.querySelector('img')?.alt || '';
            galleryOverlayMedia.appendChild(img);
        } else if (type === 'video') {
            const container = document.createElement('div');
            container.className = 'custom-video-container';
            container.innerHTML = `
                <video class="custom-video"></video>
                <div class="custom-video-controls">
                    <button class="custom-video-btn" title="Play/Pause">&#9654;</button>
                    <div class="custom-video-progress"><div class="custom-video-progress-bar"></div></div>
                    <span class="custom-video-time">0:00 / 0:00</span>
                </div>
            `;
            const video = container.querySelector('.custom-video');
            video.src = src;
            video.playsInline = true;
            video.preload = "metadata";
            video.style.background = "#111";
            video.style.borderRadius = "0";
            video.removeAttribute('controls');
            currentMedia = video;
            const playBtn = container.querySelector('.custom-video-btn');
            const progress = container.querySelector('.custom-video-progress');
            const progressBar = container.querySelector('.custom-video-progress-bar');
            const time = container.querySelector('.custom-video-time');

            function formatTime(s) {
                s = Math.floor(s);
                return `${Math.floor(s/60)}:${('0'+(s%60)).slice(-2)}`;
            }
            function updateTime() {
                time.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration || 0)}`;
            }
            function updateProgress() {
                const percent = (video.currentTime / (video.duration || 1)) * 100;
                progressBar.style.width = percent + '%';
            }
            playBtn.onclick = function() {
                if (video.paused) {
                    video.play();
                    playBtn.innerHTML = '&#10073;&#10073;';
                } else {
                    video.pause();
                    playBtn.innerHTML = '&#9654;';
                }
            };
            video.addEventListener('play', () => playBtn.innerHTML = '&#10073;&#10073;');
            video.addEventListener('pause', () => playBtn.innerHTML = '&#9654;');
            video.addEventListener('timeupdate', () => {
                updateTime();
                updateProgress();
            });
            video.addEventListener('loadedmetadata', updateTime);
            progress.onclick = function(e) {
                const rect = progress.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = x / rect.width;
                video.currentTime = percent * video.duration;
            };
            galleryOverlayMedia.appendChild(container);
        } else if (type === 'audio') {
            const container = document.createElement('div');
            container.className = 'custom-audio-container';
            container.innerHTML = `
                <div class="audio-waves"></div>
                <button class="custom-audio-btn" title="Play/Pause">&#9654;</button>
                <span class="custom-audio-time">0:00 / 0:00</span>
            `;
            const audio = new Audio(src);
            audio.preload = "metadata";
            currentMedia = audio;
            let isPlaying = false;
            const playBtn = container.querySelector('.custom-audio-btn');
            const time = container.querySelector('.custom-audio-time');
            const waves = container.querySelector('.audio-waves');
            const barCount = 24;
            let bars = [];
            for (let i = 0; i < barCount; i++) {
                const bar = document.createElement('div');
                bar.className = 'audio-wave-bar';
                bar.style.height = (10 + Math.random()*40) + 'px';
                waves.appendChild(bar);
                bars.push(bar);
            }
            let waveAnim = null;
            function animateWaves() {
                if (!isPlaying) return;
                bars.forEach((bar, i) => {
                    bar.style.height = (18 + Math.random()*42) + 'px';
                });
                waveAnim = requestAnimationFrame(animateWaves);
            }
            function stopWaves() {
                bars.forEach(bar => bar.style.height = '20px');
                if (waveAnim) cancelAnimationFrame(waveAnim);
            }
            function formatTime(s) {
                s = Math.floor(s);
                return `${Math.floor(s/60)}:${('0'+(s%60)).slice(-2)}`;
            }
            function updateTime() {
                time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 0)}`;
            }
            playBtn.onclick = function() {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
            };
            audio.addEventListener('play', () => {
                isPlaying = true;
                playBtn.innerHTML = '&#10073;&#10073;';
                animateWaves();
            });
            audio.addEventListener('pause', () => {
                isPlaying = false;
                playBtn.innerHTML = '&#9654;';
                stopWaves();
            });
            audio.addEventListener('ended', () => {
                isPlaying = false;
                playBtn.innerHTML = '&#9654;';
                stopWaves();
                audio.currentTime = 0;
            });
            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', updateTime);
            galleryOverlayMedia.appendChild(container);
        }
        galleryOverlay.style.display = 'flex';
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            openGalleryItem(item);
        });
        // Öffnen per Tastatur (Enter/Space)
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                openGalleryItem(item);
            }
        });
    });

    console.log('Galerie-Skripte geladen!');
});

// Zeitspanne seit gründung berechnen
const currentYear = new Date().getFullYear();
const yearsSince1981 = currentYear - 1981;
document.getElementById("yearsPassed").textContent = yearsSince1981;