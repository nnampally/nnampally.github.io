document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    // Hamburger menu toggle with close on outside click or link click
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        
        if (hamburger && navLinks) {
            hamburger.onclick = function (e) {
                navLinks.classList.toggle('show');
                e.stopPropagation(); // Prevent the click from bubbling up
            };
        
            // Close menu when clicking outside
            document.addEventListener('click', function (e) {
                if (
                    navLinks.classList.contains('show') &&
                    !navLinks.contains(e.target) &&
                    e.target !== hamburger
                ) {
                    navLinks.classList.remove('show');
                }
            });
        
            // Close menu when a nav link is clicked
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function () {
                    navLinks.classList.remove('show');
                });
            });
        }

    // Dynamic Quotes
    const dynamicQuote = document.getElementById('dynamic-quote');
    if (dynamicQuote) {
        const quotes = [
            "Strive for reliability, automate for efficiency.",
            "Database performance is the backbone of scalability.",
            "Cloud migrations are the future of resilient systems.",
            "Observability is key to proactive problem-solving."
        ];
        dynamicQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }

    // Dynamic content loading
    const timelineItems = document.querySelectorAll('.timeline-item');
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add visible class when in view
            } else {
                entry.target.classList.remove('visible'); // Remove visible class when out of view
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        observer.observe(section);
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
});
