document.addEventListener('DOMContentLoaded', function() {
    // Page navigation functionality
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show target page, hide others
            pages.forEach(page => {
                if (page.id === `${targetPage}-page`) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
        });
    });

    // Gift opening functionality
    const giftBox = document.getElementById('giftBox');
    const giftContent = document.getElementById('giftContent');
    let isGiftOpened = false;

    giftBox.addEventListener('click', function() {
        if (!isGiftOpened) {
            openGift();
        }
    });

    function openGift() {
        // Add opening animation class
        giftBox.classList.add('opening');
        
        // Animate the gift opening
        const giftLid = giftBox.querySelector('.gift-lid');
        giftLid.style.transform = 'rotate(-45deg) translateY(-30px)';
        giftLid.style.opacity = '0.7';
        
        // Animate the gift body
        const giftBody = giftBox.querySelector('.gift-body');
        giftBody.style.transform = 'scale(1.2)';
        
        // Show gift content after animation
        setTimeout(() => {
            giftContent.classList.remove('hidden');
            giftContent.style.opacity = '0';
            giftContent.style.display = 'block';
            
            // Fade in gift content
            let opacity = 0;
            const fadeIn = setInterval(() => {
                if (opacity < 1) {
                    opacity += 0.05;
                    giftContent.style.opacity = opacity;
                } else {
                    clearInterval(fadeIn);
                }
            }, 30);
            
            isGiftOpened = true;
            
            // Scroll to gift content
            giftContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
        }, 800);
    }

    // Add hover effect to gift box
    giftBox.addEventListener('mouseenter', function() {
        if (!isGiftOpened) {
            this.style.transform = 'scale(1.05)';
            this.style.cursor = 'pointer';
        }
    });

    giftBox.addEventListener('mouseleave', function() {
        if (!isGiftOpened) {
            this.style.transform = 'scale(1)';
        }
    });

    // Add some interactive elements to the birthday page
    const cake = document.querySelector('.cake');
    if (cake) {
        cake.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    }

    // Add confetti effect when gift is opened
    function createConfetti() {
        const colors = ['#ff69b4', '#ff1493', '#ffcc00', '#ff4500', '#87ceeb'];
        const container = document.querySelector('.gift-container');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.opacity = '0';
            
            container.appendChild(confetti);
            
            // Animate confetti
            setTimeout(() => {
                confetti.style.opacity = '1';
                confetti.style.transition = 'all 2s ease-out';
                confetti.style.transform = `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`;
                confetti.style.opacity = '0';
                
                // Remove confetti after animation
                setTimeout(() => {
                    confetti.remove();
                }, 2000);
            }, i * 50);
        }
    }

    // Enhanced gift opening with confetti
    const originalOpenGift = openGift;
    openGift = function() {
        originalOpenGift();
        createConfetti();
    };

    // Make navigation responsive
    function handleResize() {
        if (window.innerWidth < 768) {
            document.querySelector('.gift-items').style.flexDirection = 'column';
            document.querySelector('.gift-items').style.alignItems = 'center';
        } else {
            document.querySelector('.gift-items').style.flexDirection = 'row';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add some interactive text effects
    const birthdayTitle = document.querySelector('.birthday-title');
    if (birthdayTitle) {
        birthdayTitle.addEventListener('mouseenter', function() {
            this.style.textShadow = '2px 2px 4px rgba(255, 105, 180, 0.5)';
        });
        
        birthdayTitle.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    }

    console.log('Birthday website loaded successfully! 🎉');
});
