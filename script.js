// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Swiper
const gallerySwiper = new Swiper('.gallery-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    }
});

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    }
});

// Music Control
let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.querySelector('.music-control');
const musicIcon = document.querySelector('.music-icon');

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.textContent = '🎵';
        musicControl.classList.remove('playing');
        isPlaying = false;
    } else {
        bgMusic.play().catch(e => {
            console.log('Audio play failed:', e);
        });
        musicIcon.textContent = '🔇';
        musicControl.classList.add('playing');
        isPlaying = true;
    }
}

// Auto-play music on first user interaction
document.addEventListener('click', function() {
    if (!isPlaying) {
        bgMusic.play().catch(e => {
            console.log('Audio play failed:', e);
        });
    }
}, { once: true });

// Smooth scrolling for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typewriter Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typewriter when intro section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const typewriterElement = entry.target.querySelector('.typewriter');
            if (typewriterElement && !typewriterElement.classList.contains('typed')) {
                const text = typewriterElement.getAttribute('data-text');
                typeWriter(typewriterElement, text, 100);
                typewriterElement.classList.add('typed');
            }
        }
    });
});

observer.observe(document.querySelector('.intro-section'));

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const currentYear = new Date().getFullYear();
    let nextBirthday = new Date(currentYear, 5, 15).getTime(); // June 15th (month is 0-indexed)
    
    // If birthday has passed this year, set it for next year
    if (now > nextBirthday) {
        nextBirthday = new Date(currentYear + 1, 5, 15).getTime();
    }
    
    const distance = nextBirthday - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(3, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = "<h2>🎉 Happy Birthday! 🎉</h2>";
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Confetti Animation
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fab1a0'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Floating Hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const hearts = ['💖', '💕', '💗', '💝', '💘', '💞'];
    
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 8000);
        }
    }, 2000);
}

// Floating Balloons
function createFloatingBalloons() {
    const balloonsContainer = document.querySelector('.floating-balloons');
    const balloons = ['🎈', '🎀', '🌟', '✨', '🎊', '🎁'];
    
    setInterval(() => {
        if (Math.random() < 0.2) { // 20% chance every interval
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.textContent = balloons[Math.floor(Math.random() * balloons.length)];
            balloon.style.left = Math.random() * 100 + '%';
            balloon.style.animationDuration = (Math.random() * 4 + 4) + 's';
            balloonsContainer.appendChild(balloon);
            
            setTimeout(() => {
                if (balloon.parentNode) {
                    balloon.parentNode.removeChild(balloon);
                }
            }, 8000);
        }
    }, 2000);
}

// Initialize animations
createFloatingHearts();
createFloatingBalloons();

// Initialize message section
document.addEventListener('DOMContentLoaded', function() {
    const messageSection = document.querySelector('.message-section');
    if (messageSection) {
        messageSection.style.display = 'flex';
        messageSection.style.visibility = 'visible';
        messageSection.style.opacity = '1';
    }
});

// Add message section to scroll observer
const messageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.addEventListener('DOMContentLoaded', function() {
    const messageSection = document.querySelector('.message-section');
    if (messageSection) {
        messageObserver.observe(messageSection);
    }
});

// Music Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bgMusic');
    
    // Set audio properties
    audio.loop = true; // Enable looping
    audio.volume = 0.5; // Set default volume to 50%

    // Function to start playing
    function startMusic() {
        audio.muted = false; // Unmute the audio
        audio.play().catch(error => {
            console.log("Autoplay failed:", error);
        });
    }

    // Try to start playing immediately
    startMusic();

    // Also try to start playing on any user interaction
    document.addEventListener('click', function initAudio() {
        startMusic();
        // Remove the event listener after first interaction
        document.removeEventListener('click', initAudio);
    }, { once: true });

    // Also try to start playing on any touch interaction
    document.addEventListener('touchstart', function initAudio() {
        startMusic();
        // Remove the event listener after first interaction
        document.removeEventListener('touchstart', initAudio);
    }, { once: true });

    // Prevent pausing
    audio.addEventListener('pause', () => {
        audio.play();
    });

    // Handle audio end (should not happen due to loop)
    audio.addEventListener('ended', () => {
        audio.play();
    });
});
