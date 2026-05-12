// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    
    // Welcome Page Functionality
    const welcomePage = document.getElementById('welcome-page');
    const enterButton = document.getElementById('enter-portfolio');
    const mainNav = document.getElementById('main-nav');
    const sections = document.querySelectorAll('section');
    const footer = document.querySelector('footer');
    const backToTop = document.getElementById('backToTop');

    // Enter Portfolio Button Click
    enterButton.addEventListener('click', () => {
        // Fade out welcome page
        welcomePage.classList.add('fade-out');
        
        // Show main content after a delay
        setTimeout(() => {
            mainNav.classList.add('show-main');
            sections.forEach(section => section.classList.add('show-main'));
            footer.classList.add('show-main');
            backToTop.classList.add('show-main');
        }, 500);
    });

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // If the element is visible in the viewport
            if (entry.isIntersecting) {
                // Add the 'show' class to trigger the CSS transition
                entry.target.classList.add('show');
                
                // Optional: Stop observing once it has animated in
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class when out of view to animate again on scroll up
                entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.1 // Triggers when 10% of the element is visible
    });

    // Select all elements with the class 'hidden'
    const hiddenElements = document.querySelectorAll('.hidden');
    
    // Observe each hidden element
    hiddenElements.forEach((el) => observer.observe(el));

    // Back to Top Button Functionality
    const backToTopButton = document.getElementById('backToTop');
    const heroImageContainer = document.querySelector('.profile-img-container');
    const floatingProfile = document.getElementById('floatingProfile');
    const navProfileImg = document.querySelector('.nav-profile-img');

    const updateFloatingProfile = () => {
        const scrollY = window.pageYOffset;
        const startShow = 50;
        const endShow = 200;
        const progress = Math.min(Math.max((scrollY - startShow) / (endShow - startShow), 0), 1);

        const heroRect = heroImageContainer.getBoundingClientRect();
        const navRect = navProfileImg.getBoundingClientRect();

        if (progress > 0) {
            floatingProfile.classList.add('visible');
        } else {
            floatingProfile.classList.remove('visible');
        }

        const startX = heroRect.left + heroRect.width / 2 - 75;
        const startY = heroRect.top + heroRect.height / 2 - 75;
        const endX = navRect.left + navRect.width / 2 - 75;
        const endY = navRect.top + navRect.height / 2 - 75;

        const currentX = startX + (endX - startX) * progress;
        const currentY = startY + (endY - startY) * progress;
        const currentScale = 1 - progress * 0.72;
        floatingProfile.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;

        heroImageContainer.style.opacity = `${1 - progress}`;

        if (scrollY > 150) {
            mainNav.classList.add('nav-scrolled');
        } else {
            mainNav.classList.remove('nav-scrolled');
        }
    };

    // Show/hide button based on scroll position and animate image movement
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }

        updateFloatingProfile();
    });

    window.addEventListener('resize', updateFloatingProfile);

    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    updateFloatingProfile();
});