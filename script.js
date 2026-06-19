/* ============================================
   Typing Animation
   ============================================ */
const typingEl = document.getElementById('typing-text');
const phrases = ['Software Engineer', 'Data Engineer', 'AI Enthusiast'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 80;
const deleteSpeed = 40;
const pauseAfterType = 1800;
const pauseAfterDelete = 400;

function type() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
            isDeleting = true;
            setTimeout(type, pauseAfterType);
            return;
        }
        setTimeout(type, typeSpeed);
    } else {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, pauseAfterDelete);
            return;
        }
        setTimeout(type, deleteSpeed);
    }
}

// Clear the fallback text, then start typing after a short delay
typingEl.textContent = '';
setTimeout(type, 600);

/* ============================================
   Scroll Reveal (Intersection Observer)
   ============================================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ============================================
   Navbar — Active Section Highlighting
   ============================================ */
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === '#' + id
                    );
                });
            }
        });
    },
    { rootMargin: '-40% 0px -60% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));

/* ============================================
   Mobile Hamburger Toggle
   ============================================ */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
});

// Close menu when a link is clicked
navLinksEl.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksEl.classList.remove('open');
    });
});

/* ============================================
   Project Category Filter
   ============================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

/* ============================================
   Animated Number Counters
   ============================================ */
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
let countersAnimated = false;

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                statNumbers.forEach((el) => {
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    const suffix = el.getAttribute('data-suffix') || '';
                    const duration = 1200;
                    const start = performance.now();

                    function update(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out quad
                        const eased = 1 - (1 - progress) * (1 - progress);
                        const current = Math.round(eased * target);
                        el.textContent = current + suffix;
                        if (progress < 1) {
                            requestAnimationFrame(update);
                        }
                    }
                    requestAnimationFrame(update);
                });
                counterObserver.disconnect();
            }
        });
    },
    { threshold: 0.5 }
);

if (statNumbers.length > 0) {
    counterObserver.observe(statNumbers[0].closest('.stats-row'));
}

/* ============================================
   Back to Top Button
   ============================================ */
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
