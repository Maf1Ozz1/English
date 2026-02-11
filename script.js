// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');


hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Video play buttons simulation
document.querySelectorAll('.video-play-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const videoThumbnail = this.closest('.video-thumbnail');
        const videoTitle = videoThumbnail.querySelector('img').alt;
        
        // In a real implementation, this would open a modal with the video
        alert(`Now playing: ${videoTitle}\n\nIn a real implementation, this would open a video player.`);
    });
});

// Newsletter form submission
document.querySelector('.newsletter-form button').addEventListener('click', function() {
    const emailInput = this.parentElement.querySelector('input');
    const email = emailInput.value;
    
    if (email && validateEmail(email)) {
        alert(`Thank you for subscribing with: ${email}`);
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});

// Simple email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});
// Video functionality for index.html
document.addEventListener('DOMContentLoaded', function() {
    // Change main video when clicking on thumbnails
    const videoItems = document.querySelectorAll('.video-item');
    const videoIframe = document.querySelector('.video-wrapper iframe');
    
    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const videoTitle = this.querySelector('img').alt;
            
            // Update the main iframe with new video
            if (videoIframe) {
                videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                videoIframe.title = videoTitle;
                
                // Update the caption
                const caption = document.querySelector('.video-caption');
                if (caption) {
                    caption.textContent = videoTitle;
                }
                
                // Highlight selected video
                videoItems.forEach(v => v.classList.remove('selected'));
                this.classList.add('selected');
            }
        });
    });
    
    // Video play buttons for thumbnails
    document.querySelectorAll('.video-play-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering parent click
            const videoItem = this.closest('.video-item');
            const videoId = videoItem.getAttribute('data-video');
            
            // Open video in new tab
            window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        });
    });
});
