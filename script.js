document.addEventListener('DOMContentLoaded', () => {
    // ScrollReveal Animation
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // Navbar style on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 8, 0.9)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(5, 5, 8, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle (Basic setup)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple interaction for submit button
    const submitBtn = document.querySelector('.submit-btn');
    if(submitBtn) {
        submitBtn.addEventListener('click', () => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const msg = document.getElementById('message').value;

            if(name && email && msg) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
                
                // Simulate network request
                setTimeout(() => {
                    submitBtn.innerHTML = 'Sent Successfully <i class="fas fa-check"></i>';
                    submitBtn.style.background = '#10b981';
                    
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('message').value = '';

                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                    }, 3000);
                }, 1500);
            } else {
                alert('Please fill out all fields before sending.');
            }
        });
    }

    // Dynamic Blob following mouse slightly
    const blobs = document.querySelectorAll('.blob');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        blobs.forEach((blob, index) => {
            const speed = index === 0 ? 30 : -30;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
});
