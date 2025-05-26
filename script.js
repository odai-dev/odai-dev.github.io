   document.addEventListener('DOMContentLoaded', function() {
        // --- Mobile Menu ---
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mainNav = document.getElementById('mainNav');
        const menuIconOpen = document.getElementById('menuIconOpen');
        const menuIconClose = document.getElementById('menuIconClose');
        const body = document.body;

        if (mobileMenuButton && mainNav && menuIconOpen && menuIconClose) {
            mobileMenuButton.addEventListener('click', function() {
                const isExpanded = mainNav.classList.toggle('menu-open');
                mobileMenuButton.setAttribute('aria-expanded', isExpanded);
                body.classList.toggle('menu-open');

                if (isExpanded) {
                    menuIconOpen.style.display = 'none';
                    menuIconClose.style.display = 'inline';
                } else {
                    menuIconOpen.style.display = 'inline';
                    menuIconClose.style.display = 'none';
                }
            });
        }

        // --- Smooth Scrolling & Close Mobile Menu on Nav Link Click ---
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        // Calculate header height to offset scroll position
                        const headerHeight = document.querySelector('.site-header').offsetHeight;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }

                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('menu-open')) {
                    mainNav.classList.remove('menu-open');
                    body.classList.remove('menu-open');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    menuIconOpen.style.display = 'inline';
                    menuIconClose.style.display = 'none';
                }
            });
        });

        // --- Active Navigation Link Highlighting on Scroll ---
        const sections = document.querySelectorAll('.scroll-section'); // Add 'scroll-section' class to sections
        const headerHeightOffset = document.querySelector('.site-header').offsetHeight + 20; // Offset for header + a little buffer

        function highlightNavLink() {
            let currentSectionId = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeightOffset;
                const sectionBottom = sectionTop + section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                    currentSectionId = section.id;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
        window.addEventListener('scroll', highlightNavLink);
        highlightNavLink(); // Initial call to highlight on page load


        // --- Contact Form Handling ---
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');

        if (contactForm && formMessage) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent actual form submission for this demo

                // Basic client-side validation
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const messageText = document.getElementById('message').value.trim();
                let isValid = true;
                let errors = [];

                if (name === '') {
                    isValid = false;
                    errors.push('Full Name is required.');
                }
                if (email === '') {
                    isValid = false;
                    errors.push('Email Address is required.');
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // Simple email regex
                    isValid = false;
                    errors.push('Please enter a valid Email Address.');
                }
                if (messageText === '') {
                    isValid = false;
                    errors.push('Message is required.');
                }

                formMessage.style.display = 'block'; // Show the message area
                if (isValid) {
                    // Simulate form submission (replace with actual AJAX call)
                    formMessage.textContent = 'Thank you! Your message has been sent.';
                    formMessage.className = 'form-message success'; // Reset classes and add success
                    contactForm.reset(); // Clear the form
                } else {
                    formMessage.innerHTML = '<strong>Please correct the errors:</strong><br>' + errors.join('<br>');
                    formMessage.className = 'form-message error'; // Reset classes and add error
                }

                // Hide the message after a few seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.textContent = '';
                    formMessage.className = 'form-message'; // Reset classes
                }, 7000);
            });
        }

        // --- Set Current Year in Footer ---
        const currentYearSpan = document.getElementById('currentYear');
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
    });