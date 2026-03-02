// ===== ZION 2026 - Main JavaScript =====

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initCountdown();
    initNavigation();
    initMobileMenu();
    initScheduleTabs();
    initTeamFilter();
    initScrollAnimations();
    initSmoothScroll();
    initParallax();
    initVideoControls();
    initCosmicParticles();
    initTeamModal();
});

// ===== Countdown Timer =====
function initCountdown() {
    const targetDate = new Date('2026-03-27T00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== Navigation Scroll Effect =====
function initNavigation() {
    const nav = document.getElementById('navigation');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.classList.remove('nav-transparent');
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
            nav.classList.add('nav-transparent');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    menuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');

        // Change icon based on state
        const isOpen = mobileMenu.classList.contains('active');
        menuBtn.innerHTML = isOpen
            ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
            : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            menuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        }
    });
}

// ===== Schedule Tabs =====
function initScheduleTabs() {
    const tabs = document.querySelectorAll('.schedule-tab');
    const days = document.querySelectorAll('.schedule-day');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const dayNumber = this.dataset.day;

            // Remove active class from all tabs and days
            tabs.forEach(t => t.classList.remove('active'));
            days.forEach(d => d.classList.remove('active'));

            // Add active class to clicked tab and corresponding day
            this.classList.add('active');
            document.querySelector(`.schedule-day[data-day="${dayNumber}"]`).classList.add('active');

            // Animate timeline items
            const timelineItems = document.querySelectorAll(`.schedule-day[data-day="${dayNumber}"] .timeline-item`);
            timelineItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    });
}

// ===== Team Filter =====
function initTeamFilter() {
    const filters = document.querySelectorAll('.team-filter');
    const cards = document.querySelectorAll('.team-card');

    filters.forEach(filter => {
        filter.addEventListener('click', function () {
            const category = this.dataset.filter;

            // Update active filter
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');

            // Filter cards
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Stagger animation for child elements
                const staggerChildren = entry.target.querySelectorAll('.stat-card, .category-card, .event-card, .team-card, .sponsor-card, .timeline-item');
                staggerChildren.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        child.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Parallax Effect =====
function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const videoOverlay = document.querySelector('.video-overlay');

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }

        if (videoOverlay && scrolled < window.innerHeight) {
            videoOverlay.style.opacity = 0.3 + (scrolled / window.innerHeight) * 0.65;
        }
    }, { passive: true });
}

// ===== Scroll to Section Helper =====
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== Register Button Click Handler =====
document.querySelectorAll('.register-btn, .btn-primary, .event-register-btn, .mobile-register-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Show coming soon alert
        showNotification('Registration coming soon! Stay tuned.');
    });
});

// ===== View Profile Button Click Handler =====
document.querySelectorAll('.view-profile-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        showNotification('Profile page coming soon!');
    });
});

// ===== Download Schedule Button =====
document.querySelector('.download-schedule .btn-outline')?.addEventListener('click', function () {
    showNotification('Schedule download coming soon!');
});

// ===== View All Events Button =====
document.querySelector('.view-all-events .btn-outline')?.addEventListener('click', function () {
    showNotification('Full events list coming soon!');
});

// ===== Video Mute/Unmute Toggle =====
function initVideoControls() {
    const video = document.getElementById('heroVideo');
    const muteBtn = document.getElementById('videoMuteBtn');
    const muteIcon = muteBtn?.querySelector('.mute-icon');
    const unmuteIcon = muteBtn?.querySelector('.unmute-icon');

    if (video && muteBtn) {
        muteBtn.addEventListener('click', function () {
            video.muted = !video.muted;

            if (video.muted) {
                muteIcon.style.display = 'block';
                unmuteIcon.style.display = 'none';
                showNotification('Video muted');
            } else {
                muteIcon.style.display = 'none';
                unmuteIcon.style.display = 'block';
                showNotification('Video unmuted');
            }
        });
    }
}

// ===== Notification System =====
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: rgba(20, 20, 25, 0.95);
        backdrop-filter: blur(24px);
        border: 1px solid rgba(168, 85, 247, 0.3);
        border-radius: 1rem;
        padding: 1rem 1.5rem;
        z-index: 10000;
        transition: transform 0.3s ease;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: white;
        font-size: 0.875rem;
    `;

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Stats Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// ===== Intersection Observer for Stats =====
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const value = parseInt(stat.textContent);
                if (!isNaN(value)) {
                    stat.textContent = '0';
                    animateCounter(stat, value);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.stats-grid')?.forEach(grid => {
    statsObserver.observe(grid);
});

// ===== Event Card Hover Effect =====
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        const siblings = this.parentElement.querySelectorAll('.event-card');
        siblings.forEach(sibling => {
            if (sibling !== this) {
                sibling.style.filter = 'blur(4px)';
                sibling.style.opacity = '0.6';
                sibling.style.transform = 'scale(0.95)';
                sibling.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    });

    card.addEventListener('mouseleave', function () {
        const siblings = this.parentElement.querySelectorAll('.event-card');
        siblings.forEach(sibling => {
            sibling.style.filter = '';
            sibling.style.opacity = '';
            sibling.style.transform = '';
        });
    });
});

// ===== Gallery Image Hover =====
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        const overlay = this.querySelector('.gallery-overlay');
        if (overlay) {
            overlay.style.opacity = '1';
        }
    });

    item.addEventListener('mouseleave', function () {
        const overlay = this.querySelector('.gallery-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
        }
    });
});

// ===== Team Card Hover =====
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// ===== Sponsor Card Hover =====
document.querySelectorAll('.sponsor-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.3)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', function (e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        }
    }
});

// ===== Performance: Pause animations when tab is hidden =====
document.addEventListener('visibilitychange', function () {
    const video = document.getElementById('heroVideo');
    if (document.hidden) {
        video?.pause();
    } else {
        video?.play();
    }
});

// ===== Preload Critical Resources =====
function preloadResources() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload after initial load
window.addEventListener('load', preloadResources);

// ===== Console Easter Egg =====
console.log('%c ZION 2026 ', 'background: linear-gradient(135deg, #a855f7, #3b82f6); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
console.log('%c Palimpsest - Rewrite the Future ', 'color: #a855f7; font-size: 14px; font-style: italic;');
console.log('%c Made with ❤ by ZION Team ', 'color: #666; font-size: 12px;');

// Atomic Particle Network Animation - Full Page Version
class ParticleNetwork {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.heroSection = document.querySelector('.hero');

        this.config = {
            particleCount: options.particleCount || 80,
            connectionDistance: options.connectionDistance || 150,
            particleSpeed: options.particleSpeed || 0.5,
            particleSize: options.particleSize || 2,
            lineOpacity: options.lineOpacity || 0.15,
            particleColor: options.particleColor || '168, 85, 247',
            lineColor: options.lineColor || '59, 130, 246',
            startAfterHero: options.startAfterHero !== false, // Default true
            ...options
        };

        this.init();
        this.animate();

        window.addEventListener('resize', () => this.handleResize());
    }

    getHeroHeight() {
        return this.heroSection ? this.heroSection.offsetHeight : window.innerHeight;
    }

    handleResize() {
        this.resize();
        // Reposition particles if needed
        if (this.config.startAfterHero) {
            this.adjustForHero();
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = document.body.scrollHeight; // Full page height
    }

    adjustForHero() {
        const heroHeight = this.getHeroHeight();
        // Only spawn particles below hero section
        this.particles.forEach(particle => {
            if (particle.y < heroHeight) {
                particle.y = heroHeight + Math.random() * (this.canvas.height - heroHeight);
            }
        });
    }

    init() {
        this.resize();
        const heroHeight = this.getHeroHeight();

        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            // Spawn particles only in the visible area (below hero)
            const minY = this.config.startAfterHero ? heroHeight : 0;
            const availableHeight = this.canvas.height - minY;

            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: minY + Math.random() * availableHeight,
                vx: (Math.random() - 0.5) * this.config.particleSpeed * 2,
                vy: (Math.random() - 0.5) * this.config.particleSpeed * 2,
                size: Math.random() * this.config.particleSize + 1,
                pulse: Math.random() * Math.PI * 2,
                // Store original bounds for wrapping
                minY: minY,
                maxY: this.canvas.height
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const heroHeight = this.getHeroHeight();

        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.pulse += 0.02;

            // Horizontal bounce
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }

            // Vertical bounds (stay below hero, wrap at bottom)
            if (this.config.startAfterHero) {
                // Bounce off hero bottom
                if (particle.y < heroHeight) {
                    particle.y = heroHeight;
                    particle.vy *= -1;
                }
                // Wrap to top of particle area (not hero)
                if (particle.y > this.canvas.height) {
                    particle.y = heroHeight;
                }
            } else {
                // Normal bounce
                if (particle.y < 0 || particle.y > this.canvas.height) {
                    particle.vy *= -1;
                }
            }

            // Keep in horizontal bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));

            // Skip drawing if in hero section (double safety)
            if (this.config.startAfterHero && particle.y < heroHeight) {
                return;
            }

            // Draw particle with glow
            const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;

            // Glow effect
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, pulseSize * 4
            );
            gradient.addColorStop(0, `rgba(${this.config.particleColor}, 0.8)`);
            gradient.addColorStop(0.5, `rgba(${this.config.particleColor}, 0.2)`);
            gradient.addColorStop(1, 'transparent');

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, pulseSize * 4, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Core particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${this.config.particleColor}, 1)`;
            this.ctx.fill();

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];

                // Skip if other particle is in hero section
                if (this.config.startAfterHero && other.y < heroHeight) {
                    continue;
                }

                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.connectionDistance) {
                    const opacity = (1 - distance / this.config.connectionDistance) * this.config.lineOpacity;

                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(${this.config.lineColor}, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Wait for hero to render
    setTimeout(() => {
        new ParticleNetwork('particleCanvas', {
            particleCount: window.innerWidth < 768 ? 40 : 100,
            connectionDistance: 150,
            particleSpeed: 0.4,
            particleSize: 2.5,
            lineOpacity: 0.25,
            particleColor: '168, 85, 247', // Purple
            lineColor: '59, 130, 246', // Blue
            startAfterHero: true // KEY: Start after hero section
        });
    }, 100);
});

// ===== Cosmic Particle Background Effect =====
function initCosmicParticles() {
    const container = document.createElement('div');
    container.className = 'cosmic-particles-container';
    
    // Create gradient orbs for depth
    const orb1 = document.createElement('div');
    orb1.className = 'cosmic-orb orb-1';
    container.appendChild(orb1);
    
    const orb2 = document.createElement('div');
    orb2.className = 'cosmic-orb orb-2';
    container.appendChild(orb2);
    
    const orb3 = document.createElement('div');
    orb3.className = 'cosmic-orb orb-3';
    container.appendChild(orb3);
    
    // Create floating particles
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    const particleTypes = ['type-1', 'type-2', 'type-3', 'type-4', 'cross', 'ring'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        particle.className = `cosmic-particle ${type}`;
        
        // Random positioning and animation
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${15 + Math.random() * 25}s`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        
        // Randomize animation type
        const animations = ['cosmicFloat', 'cosmicFloatDiagonal', 'cosmicFloatSlow'];
        particle.style.animationName = animations[Math.floor(Math.random() * animations.length)];
        
        container.appendChild(particle);
    }
    
    // Insert after hero section
    const hero = document.querySelector('.hero');
    if (hero && hero.nextElementSibling) {
        hero.parentNode.insertBefore(container, hero.nextElementSibling);
    } else {
        document.body.appendChild(container);
    }
}

// ===== Team Modal Functionality =====
function initTeamModal() {
    // Create modal HTML structure
    const modalHTML = `
        <div class="team-modal-overlay" id="teamModal">
            <div class="team-modal">
                <button class="team-modal-close" id="teamModalClose">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div class="team-modal-header">
                    <div class="team-modal-avatar">
                        <img src="" alt="" id="modalAvatar">
                    </div>
                    <span class="team-modal-badge" id="modalBadge"></span>
                    <h3 class="team-modal-name" id="modalName"></h3>
                    <p class="team-modal-role" id="modalRole"></p>
                    <p class="team-modal-dept" id="modalDept"></p>
                </div>
                <div class="team-modal-body">
                    <p class="team-modal-bio" id="modalBio"></p>
                    <div class="team-modal-details">
                        <div class="team-modal-detail">
                            <div class="team-modal-detail-label">Year</div>
                            <div class="team-modal-detail-value" id="modalYear"></div>
                        </div>
                        <div class="team-modal-detail">
                            <div class="team-modal-detail-label">Department</div>
                            <div class="team-modal-detail-value" id="modalDepartment"></div>
                        </div>
                        <div class="team-modal-detail">
                            <div class="team-modal-detail-label">Experience</div>
                            <div class="team-modal-detail-value" id="modalExperience"></div>
                        </div>
                        <div class="team-modal-detail">
                            <div class="team-modal-detail-label">Events Managed</div>
                            <div class="team-modal-detail-value" id="modalEvents"></div>
                        </div>
                    </div>
                    <div class="team-modal-social">
                        <a href="#" class="team-modal-social-link instagram" id="modalInstagram" target="_blank" aria-label="Instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="#" class="team-modal-social-link linkedin" id="modalLinkedIn" target="_blank" aria-label="LinkedIn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                        <a href="#" class="team-modal-social-link twitter" id="modalTwitter" target="_blank" aria-label="Twitter">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                            </svg>
                        </a>
                        <a href="#" class="team-modal-social-link github" id="modalGitHub" target="_blank" aria-label="GitHub">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Team member data with enhanced details
    const teamData = {
        'Arjun Sharma': {
            bio: 'Leading the technical team with expertise in full-stack development and system architecture. Passionate about creating innovative solutions and mentoring fellow developers.',
            experience: '4+ Years',
            events: '12+ Events',
            social: {
                instagram: 'https://instagram.com/arjunsharma',
                linkedin: 'https://linkedin.com/in/arjunsharma',
                twitter: 'https://twitter.com/arjunsharma',
                github: 'https://github.com/arjunsharma'
            }
        },
        'Priya Patel': {
            bio: 'Expert event coordinator with exceptional organizational skills. Ensures seamless execution of all ZION events from planning to completion.',
            experience: '3+ Years',
            events: '15+ Events',
            social: {
                instagram: 'https://instagram.com/priyapatel',
                linkedin: 'https://linkedin.com/in/priyapatel',
                twitter: 'https://twitter.com/priyapatel',
                github: 'https://github.com/priyapatel'
            }
        },
        'Rahul Verma': {
            bio: 'Robotics enthusiast with hands-on experience in building autonomous systems. Leads the robotics competitions and workshops at ZION.',
            experience: '2+ Years',
            events: '8+ Events',
            social: {
                instagram: 'https://instagram.com/rahulverma',
                linkedin: 'https://linkedin.com/in/rahulverma',
                twitter: 'https://twitter.com/rahulverma',
                github: 'https://github.com/rahulverma'
            }
        },
        'Sneha Gupta': {
            bio: 'Creative designer with a keen eye for aesthetics and user experience. Responsible for all visual branding and design elements of ZION.',
            experience: '3+ Years',
            events: '10+ Events',
            social: {
                instagram: 'https://instagram.com/snehagupta',
                linkedin: 'https://linkedin.com/in/snehagupta',
                twitter: 'https://twitter.com/snehagupta',
                github: 'https://github.com/snehagupta'
            }
        },
        'Vikram Rao': {
            bio: 'Sports enthusiast and competitive gamer. Manages all sports and esports events, ensuring fair play and exciting competitions.',
            experience: '2+ Years',
            events: '6+ Events',
            social: {
                instagram: 'https://instagram.com/vikramrao',
                linkedin: 'https://linkedin.com/in/vikramrao',
                twitter: 'https://twitter.com/vikramrao',
                github: 'https://github.com/vikramrao'
            }
        },
        'Ananya Desai': {
            bio: 'Cultural ambassador with a passion for arts and performance. Coordinates all cultural events from dance to drama competitions.',
            experience: '1+ Year',
            events: '5+ Events',
            social: {
                instagram: 'https://instagram.com/ananyadesai',
                linkedin: 'https://linkedin.com/in/ananyadesai',
                twitter: 'https://twitter.com/ananyadesai',
                github: 'https://github.com/ananyadesai'
            }
        },
        'Karan Malhotra': {
            bio: 'Full-stack developer specializing in modern web technologies. Built and maintains the ZION website and registration platform.',
            experience: '4+ Years',
            events: '9+ Events',
            social: {
                instagram: 'https://instagram.com/karanmalhotra',
                linkedin: 'https://linkedin.com/in/karanmalhotra',
                twitter: 'https://twitter.com/karanmalhotra',
                github: 'https://github.com/karanmalhotra'
            }
        },
        'Meera Iyer': {
            bio: 'Marketing strategist with expertise in digital campaigns and brand promotion. Drives ZION\'s outreach and sponsorship initiatives.',
            experience: '2+ Years',
            events: '7+ Events',
            social: {
                instagram: 'https://instagram.com/meeraiyer',
                linkedin: 'https://linkedin.com/in/meeraiyer',
                twitter: 'https://twitter.com/meeraiyer',
                github: 'https://github.com/meeraiyer'
            }
        }
    };
    
    const modal = document.getElementById('teamModal');
    const modalClose = document.getElementById('teamModalClose');
    
    // Add click event to all team cards
    document.querySelectorAll('.team-card').forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('.team-name').textContent;
            const role = this.querySelector('.team-role').textContent;
            const dept = this.querySelector('.team-dept').textContent;
            const year = this.querySelector('.team-year').textContent;
            const avatar = this.querySelector('.team-avatar img').src;
            const category = this.dataset.category;
            
            const data = teamData[name] || {
                bio: 'Passionate team member contributing to the success of ZION 2026.',
                experience: '2+ Years',
                events: '5+ Events',
                social: { instagram: '#', linkedin: '#', twitter: '#', github: '#' }
            };
            
            // Populate modal
            document.getElementById('modalAvatar').src = avatar;
            document.getElementById('modalAvatar').alt = name;
            document.getElementById('modalName').textContent = name;
            document.getElementById('modalRole').textContent = role;
            document.getElementById('modalDept').textContent = dept;
            document.getElementById('modalYear').textContent = year;
            document.getElementById('modalDepartment').textContent = dept;
            document.getElementById('modalExperience').textContent = data.experience;
            document.getElementById('modalEvents').textContent = data.events;
            document.getElementById('modalBio').textContent = data.bio;
            
            // Set badge color
            const badge = document.getElementById('modalBadge');
            badge.className = `team-modal-badge ${category}`;
            badge.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            
            // Set social links
            document.getElementById('modalInstagram').href = data.social.instagram;
            document.getElementById('modalLinkedIn').href = data.social.linkedin;
            document.getElementById('modalTwitter').href = data.social.twitter;
            document.getElementById('modalGitHub').href = data.social.github;
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal on button click
    modalClose.addEventListener('click', closeModal);
    
    // Close modal on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}
