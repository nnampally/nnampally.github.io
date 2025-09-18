// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Dynamic quotes for the quote section
    const quotes = [
        "\"Reliability is not just about keeping systems running; it's about building trust with every line of code.\"",
        "\"In database engineering, performance is not just speed—it's the foundation of user experience.\"",
        "\"The best database optimization is the one your users never notice because everything just works.\"",
        "\"Automation isn't about replacing human intelligence; it's about amplifying it.\"",
        "\"Every query tells a story. The art is in making sure it's a good one.\"",
        "\"Site reliability engineering is not about preventing all failures, but about gracefully handling them.\"",
        "\"The cloud is not a destination; it's a tool for building better, more resilient systems.\""
    ];

    const quoteElement = document.getElementById('dynamic-quote');
    let currentQuoteIndex = 0;

    function displayQuote() {
        if (quoteElement) {
            quoteElement.style.opacity = '0';
            setTimeout(() => {
                quoteElement.textContent = quotes[currentQuoteIndex];
                quoteElement.style.opacity = '1';
                currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            }, 300);
        }
    }

    // Display initial quote and rotate every 8 seconds
    displayQuote();
    setInterval(displayQuote, 8000);

    // Add loading animations for cards when they come into view
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
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add typing animation to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.borderRight = '2px solid rgba(255,255,255,0.8)';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                heroSubtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroSubtitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing animation after a brief delay
        setTimeout(typeWriter, 1000);
    }

    // Add skill tag hover effects with staggered animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add progress indicators for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const countUpObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isNumberOnly = /^\d+\+?$/.test(finalValue);
                
                if (isNumberOnly) {
                    const numericValue = parseInt(finalValue.replace('+', ''));
                    const hasPlus = finalValue.includes('+');
                    
                    let current = 0;
                    const increment = numericValue / 50; // Animation duration control
                    target.textContent = '0';
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            target.textContent = numericValue + (hasPlus ? '+' : '');
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                        }
                    }, 30);
                }
                
                countUpObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        countUpObserver.observe(stat);
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Enhanced navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add background blur when scrolled
        if (scrollTop > 50) {
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.backdropFilter = 'none';
            navbar.style.backgroundColor = 'var(--card-background)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Contact form iframe responsive height adjustment
    const contactIframe = document.querySelector('.contact-form-container iframe');
    if (contactIframe) {
        function adjustIframeHeight() {
            if (window.innerWidth < 768) {
                contactIframe.style.height = '500px';
            } else {
                contactIframe.style.height = '600px';
            }
        }
        
        adjustIframeHeight();
        window.addEventListener('resize', adjustIframeHeight);
    }

    // Add loading state for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll-heavy functions
    const debouncedUpdateActiveNavLink = debounce(updateActiveNavLink, 10);
    window.addEventListener('scroll', debouncedUpdateActiveNavLink);

    // Add error handling for missing elements
    function safelyExecute(func, errorMessage) {
        try {
            func();
        } catch (error) {
            console.warn(errorMessage, error);
        }
    }

    // Initialize all features safely
    safelyExecute(() => {
        // Any additional initialization code can go here
        console.log('Portfolio website initialized successfully');
    }, 'Error during initialization:');
});
