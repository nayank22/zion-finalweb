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
