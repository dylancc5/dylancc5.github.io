// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Active Navigation Link Highlighting =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    // Check if user is at the very bottom of the page
    const isAtBottom = (window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight - 10;

    if (isAtBottom) {
        // Force contact section to be active when at the bottom
        current = 'contact';
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Intersection Observer for Fade-In Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Observe skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    observer.observe(category);
});

// ===== Animated Stats Counter =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toFixed(target % 1 === 0 ? 0 : 2);
            clearInterval(timer);
        } else {
            element.textContent = current.toFixed(target % 1 === 0 ? 0 : 2);
        }
    }, 16);
}

// Trigger stats animation when about section is in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('#about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('#navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(38, 38, 36, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(38, 38, 36, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== Custom Cursor Effect =====
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.classList.add('cursor-follower');
document.body.appendChild(cursorFollower);

// Add cursor styles
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    .custom-cursor {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #f4c430;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    }
    
    .cursor-follower {
        width: 40px;
        height: 40px;
        border: 2px solid rgba(244, 196, 48, 0.5);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.15s ease;
        transform: translate(-50%, -50%);
    }
    
    .custom-cursor.hover,
    .cursor-follower.hover {
        transform: scale(1.5);
    }
`;
document.head.appendChild(cursorStyles);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.transform = `translate(${cursorX - 5}px, ${cursorY - 5}px)`;
    cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Add hover effect to interactive elements
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-tag');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// ===== Parallax Effect for Hero Shapes =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// ===== Staggered Animation for Timeline Items =====
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// ===== Project Cards Staggered Animation =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// ===== Skill Categories Staggered Animation =====
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.style.transitionDelay = `${index * 0.1}s`;
});

// ===== Expandable Experience & Project Details (Accordion) =====
function setupExpandableSections() {
    const toggles = document.querySelectorAll('.expand-toggle');
    if (!toggles.length) return;

    let currentOpenExperience = null;
    let currentOpenProject = null;

    function closeSection(sectionState) {
        if (!sectionState) return;
        const { toggle, details } = sectionState;
        toggle.setAttribute('aria-expanded', 'false');
        // Ensure we animate from the current content height back to 0
        const currentHeight = details.scrollHeight;
        details.style.maxHeight = `${currentHeight}px`;
        // Force reflow so we have a concrete start value
        // eslint-disable-next-line no-unused-expressions
        details.offsetHeight;

        // Start fade-out and height collapse; opacity animates via .open removal
        details.classList.remove('open');
        details.style.maxHeight = '0px';

        // Wait for transition to finish before hiding
        const onTransitionEnd = (event) => {
            if (event.propertyName !== 'max-height') return;
            details.removeEventListener('transitionend', onTransitionEnd);
            if (!details.classList.contains('open')) {
                details.hidden = true;
            }
        };
        details.addEventListener('transitionend', onTransitionEnd);
    }

    function openSection(toggle, details, sectionKey, clickedContainer) {
        // Store the container's position before any changes
        const containerRect = clickedContainer.getBoundingClientRect();
        const initialTop = containerRect.top;

        // Close any currently open in this section
        if (sectionKey === 'experience' && currentOpenExperience) {
            closeSection(currentOpenExperience);
            currentOpenExperience = null;
        }
        if (sectionKey === 'projects' && currentOpenProject) {
            closeSection(currentOpenProject);
            currentOpenProject = null;
        }

        // If this one was already open, just ensure state is closed
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            closeSection({ toggle, details });
            return;
        }

        // Open this details panel
        toggle.setAttribute('aria-expanded', 'true');
        details.hidden = false;
        // Force reflow so transition works when we change maxHeight
        // eslint-disable-next-line no-unused-expressions
        details.offsetHeight;
        details.classList.add('open');
        // Add extra padding to account for any overflow from buttons/links
        details.style.maxHeight = `${details.scrollHeight + 20}px`;

        const state = { toggle, details };
        if (sectionKey === 'experience') {
            currentOpenExperience = state;
        } else if (sectionKey === 'projects') {
            currentOpenProject = state;
        }

        // Continuously monitor and adjust scroll position during animation
        const startTime = Date.now();
        const duration = 400; // Match CSS transition duration

        function maintainPosition() {
            const elapsed = Date.now() - startTime;
            if (elapsed < duration) {
                const currentTop = clickedContainer.getBoundingClientRect().top;
                const shift = currentTop - initialTop;
                if (Math.abs(shift) > 1) {
                    window.scrollBy({
                        top: shift,
                        behavior: 'instant'
                    });
                }
                requestAnimationFrame(maintainPosition);
            }
        }

        requestAnimationFrame(maintainPosition);
    }

    toggles.forEach(toggle => {
        const sectionKey = toggle.getAttribute('data-section');
        const controlsId = toggle.getAttribute('aria-controls');
        const details = controlsId ? document.getElementById(controlsId) : null;
        if (!details) return;

        // Find the container card (timeline-content or project-card)
        const container = toggle.closest('.timeline-content, .project-card');

        // Ensure collapsed initial state
        toggle.setAttribute('aria-expanded', 'false');
        details.classList.remove('open');
        details.style.maxHeight = '0px';
        details.hidden = true;

        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeSection({ toggle, details });
                if (sectionKey === 'experience') {
                    currentOpenExperience = null;
                } else if (sectionKey === 'projects') {
                    currentOpenProject = null;
                }
            } else {
                openSection(toggle, details, sectionKey, container);
            }
        });

        if (container) {
            container.addEventListener('click', (e) => {
                // Ignore clicks on links inside the details area
                if (e.target.closest('.details-link')) return;
                // Ignore clicks directly on the toggle itself to avoid double handling
                if (e.target.closest('.expand-toggle')) return;
                // Delegate to the same logic as the toggle click
                toggle.dispatchEvent(new Event('click'));
            });
        }
    });
}

// Initialize expandable sections once DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupExpandableSections);
} else {
    setupExpandableSections();
}

// ===== Easter Egg: Konami Code =====
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Smooth scroll to contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    // Wait for scroll to complete, then reveal piano button
    setTimeout(() => {
        const contactLinks = document.querySelector('.contact-links');
        const pianoBtn = document.querySelector('.piano-btn');

        if (contactLinks && pianoBtn) {
            // Add shifting class to trigger animation
            contactLinks.classList.add('shifting');

            // Expand and fade in the piano button
            pianoBtn.classList.add('visible');
        }

        // Create refined confetti effect
        const colors = ['#f4c430', '#4a9eff'];
        for (let i = 0; i < 50; i++) {
            createConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }
    }, 800);
}

function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        top: -10px;
        left: ${Math.random() * 100}vw;
        opacity: 1;
        z-index: 9999;
    `;
    document.body.appendChild(confetti);
    
    const fallDuration = Math.random() * 3 + 2;
    const fallDistance = Math.random() * window.innerHeight + window.innerHeight;
    const sway = Math.random() * 200 - 100;
    
    confetti.animate([
        { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${fallDistance}px) translateX(${sway}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: fallDuration * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    setTimeout(() => {
        confetti.remove();
    }, fallDuration * 1000);
}

// ===== Add pulse animation to CSS =====
const pulseAnimation = document.createElement('style');
pulseAnimation.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: translate(-50%, -50%) scale(1);
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
        }
    }
`;
document.head.appendChild(pulseAnimation);

// ===== Mobile Menu Toggle (if needed) =====
// This is a placeholder for future mobile menu implementation
const navLogo = document.querySelector('.nav-logo');
navLogo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Konami Hint Tooltip Fix =====
// Ensure the tooltip text is visible by setting it via JavaScript as a fallback
// Tooltip is appended to body to avoid parent opacity issues
const konamiHint = document.querySelector('.konami-hint');
if (konamiHint) {
    // Create a tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'konami-tooltip';
    tooltip.textContent = '↑↑↓↓←→←→BA';
    tooltip.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tooltip); // Append to body to avoid opacity inheritance
    
    // Function to update tooltip position based on konami-hint position
    const updateTooltipPosition = () => {
        const rect = konamiHint.getBoundingClientRect();
        // Position tooltip above the konami-hint element (fixed positioning is viewport-relative)
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 5}px`; // 5px margin above (no scrollY needed for fixed)
    };
    
    // Add hover event listeners
    konamiHint.addEventListener('mouseenter', () => {
        updateTooltipPosition();
        tooltip.classList.add('visible');
    });
    
    konamiHint.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });
    
    // Update position on scroll/resize to keep tooltip aligned
    window.addEventListener('scroll', updateTooltipPosition, { passive: true });
    window.addEventListener('resize', updateTooltipPosition);
}

// ===== Details Link Click Tracking =====
// Track clicked details links to remove shimmer animation
document.querySelectorAll('.details-link').forEach(link => {
    // Check if link was previously clicked (using data attribute or localStorage)
    const linkId = link.href || link.textContent.trim();
    const storageKey = `details-link-clicked-${linkId}`;
    
    // Check localStorage for persisted state
    if (localStorage.getItem(storageKey) === 'true') {
        link.classList.add('clicked');
    }
    
    // Add click event listener
    link.addEventListener('click', function() {
        // Mark as clicked
        this.classList.add('clicked');
        
        // Store in localStorage to persist across page loads
        try {
            localStorage.setItem(storageKey, 'true');
        } catch (e) {
            // localStorage might not be available, continue anyway
        }
    }, { once: false }); // Allow multiple clicks but keep the clicked state
});

console.log('🚀 Portfolio loaded successfully!');
console.log('🎹 Tip: Try the Konami code for a musical surprise!');