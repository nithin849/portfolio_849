document.addEventListener('DOMContentLoaded', function() {
    // Typing animation
    const typed = new Typed('#element', {
        strings: [
            'want to be associate softare engineer',
            'want to be Java Developer',
            'want to be Python Programmer',
            'want to be Web Developer',
            'and also Tech Enthusiast'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Resume download
    const resumeButton = document.getElementById('resumeButton');
    if (resumeButton) {
        resumeButton.addEventListener('click', function() {
        try {
            const link = document.createElement('a');
            link.href = 'https://drive.google.com/file/d/1VT-_6rwDHIr5VCg3_72-NNqvP0_vO89J/view?usp=drive_link';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.click();
        } catch (error) {
            console.error('Download error:', error);
            alert('Error downloading resume. Please try again.');
        }
    });
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        document.querySelectorAll('#nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header shadow on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.style.boxShadow = window.scrollY > 50 
                ? '0 5px 20px rgba(0,0,0,0.1)' 
                : 'none';
        }
    });

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcons(currentTheme === 'dark');

        themeToggle.addEventListener('click', function() {
            const isDark = document.documentElement.getAttribute('data-theme') !== 'dark';
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcons(isDark);
        });

        function updateThemeIcons(isDark) {
            const moonIcon = themeToggle.querySelector('.fa-moon');
            const sunIcon = themeToggle.querySelector('.fa-sun');

            if (moonIcon && sunIcon) {
                moonIcon.style.opacity = isDark ? '0' : '1';
                moonIcon.style.transform = isDark ? 'translateX(-20px)' : 'translateX(0)';
                sunIcon.style.opacity = isDark ? '1' : '0';
                sunIcon.style.transform = isDark ? 'translateX(0)' : 'translateX(20px)';
            }
        }
    }

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-level');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            if (barPosition < window.innerHeight * 0.8) {
                bar.style.width = bar.style.width;
            }
        });
    };
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);

    // Initialize charts
    function initCharts() {
        // Get computed CSS variables
        const styles = getComputedStyle(document.documentElement);
        const textColor = styles.getPropertyValue('--text-color').trim();

        // GitHub Language Chart
        const langCtx = document.getElementById('githubLanguageChart');
        if (langCtx) {
            new Chart(langCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Java', 'Python', 'JavaScript', 'HTML/CSS', 'Others'],
                    datasets: [{
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: [
                            '#FF6B35', '#2563EB', '#FFD166', '#EF476F', '#C4C4C4'
                        ],
                        borderWidth: 0,
                        cutout: '65%'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                boxWidth: 12,
                                padding: 20,
                                color: textColor
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.raw}% of code`;
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }

        // LeetCode Chart
        const lcCtx = document.getElementById('leetcodeChart');
        if (lcCtx) {
            new Chart(lcCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Easy', 'Medium', 'Hard'],
                    datasets: [
                        {
                            label: 'Problems Solved',
                            data: [210, 97, 3],
                            backgroundColor: [
                                'rgba(40, 167, 69, 0.8)',
                                'rgba(13, 110, 253, 0.8)',
                                'rgba(220, 53, 69, 0.8)'
                            ],
                            borderColor: [
                                'rgba(40, 167, 69, 1)',
                                'rgba(13, 110, 253, 1)',
                                'rgba(220, 53, 69, 1)'
                            ],
                            borderWidth: 1,
                            borderRadius: 5
                        },
                        {
                            label: 'Runtime Beats',
                            data: [98, 85, 32],
                            backgroundColor: [
                                'rgba(40, 167, 69, 0.4)',
                                'rgba(13, 110, 253, 0.4)',
                                'rgba(220, 53, 69, 0.4)'
                            ],
                            borderWidth: 0
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                boxWidth: 12,
                                padding: 20,
                                color: textColor
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw}${context.datasetIndex === 1 ? '%' : ''}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: val => val + '%'
                            }
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }

        // Create legend
        const container = document.querySelector('.language-legend');
        if (container) {
            const items = [
                { label: 'Java', color: '#FF6B35', value: '35%' },
                { label: 'Python', color: '#2563EB', value: '25%' },
                { label: 'JavaScript', color: '#FFD166', value: '20%' },
                { label: 'HTML/CSS', color: '#EF476F', value: '15%' },
                { label: 'Others', color: '#C4C4C4', value: '5%' }
            ];

            items.forEach(item => {
                const element = document.createElement('div');
                element.className = 'legend-item';
                element.innerHTML = `
                    <div class="legend-color" style="background:${item.color}"></div>
                    <span>${item.label} (${item.value})</span>
                `;
                container.appendChild(element);
            });
        }
    }

    // Load Chart.js if needed
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = initCharts;
        document.head.appendChild(script);
    } else {
        initCharts();
    }

    // Add this to your existing DOMContentLoaded event listener
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Disable button during submission
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formStatus.textContent = '';
        
        try {
            // Using FormSubmit.co service
            const response = await fetch('https://formsubmit.co/ajax/notyet1923@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = 'var(--primary)';
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            formStatus.textContent = 'Failed to send message. Please try again later.';
            formStatus.style.color = 'var(--pink-accent)';
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        }
    });
}
});