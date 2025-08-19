// DOM Elements
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
const contactForm = document.getElementById('contact-form');
const alertSuccess = document.querySelector('.alert.success');
const alertError = document.querySelector('.alert.error');

// Variables
let currentPortfolioIndex = 0;
const portfolioDetails = document.querySelectorAll('.portfolio-detail');
const portfolioSlides = document.querySelector('.img-slide');

// Fetch data from JSON file
async function fetchData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback data if fetch fails
        return {
            "experience": [
                {
                    "role": "Front-End Developer",
                    "company": "TechCorp Ltd",
                    "start": "Jan 2022",
                    "end": "Present",
                    "description": "Building responsive web apps using HTML, CSS, JavaScript, and modern frameworks."
                },
                {
                    "role": "Web Developer Intern",
                    "company": "Creative Agency",
                    "start": "Jun 2021",
                    "end": "Dec 2021",
                    "description": "Assisted in developing dynamic landing pages and optimizing cross-browser compatibility."
                }
            ],
            "education": [
                {
                    "degree": "B.Sc. in Computer Science",
                    "institution": "Dhaka University",
                    "year": "2021"
                },
                {
                    "degree": "Higher Secondary Certificate",
                    "institution": "City College",
                    "year": "2017"
                }
            ],
            "skills": [
                "HTML5",
                "CSS3",
                "JavaScript",
                "React",
                "Git",
                "Responsive Design",
                "Node.js"
            ]
        };
    }
}

// Functions
function toggleMenu() {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
}

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Remove the showSection function as we don't need it anymore

function showResumeDetail(target) {
    resumeBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-target') === target) {
            btn.classList.add('active');
        }
    });
    
    resumeDetails.forEach(detail => {
        detail.classList.remove('active');
        if (detail.classList.contains(target)) {
            detail.classList.add('active');
        }
    });
}

function navigatePortfolio(direction) {
    if (direction === 'next' && currentPortfolioIndex < portfolioDetails.length - 1) {
        currentPortfolioIndex++;
    } else if (direction === 'prev' && currentPortfolioIndex > 0) {
        currentPortfolioIndex--;
    }
    
    updatePortfolioView();
}

function updatePortfolioView() {
    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    
    portfolioDetails[currentPortfolioIndex].classList.add('active');
    portfolioSlides.style.transform = `translateX(calc(${currentPortfolioIndex * -100}% - ${currentPortfolioIndex * 2}rem))`;
    
    arrowLeft.classList.toggle('disabled', currentPortfolioIndex === 0);
    arrowRight.classList.toggle('disabled', currentPortfolioIndex === portfolioDetails.length - 1);
}

function loadResumeData(data) {
    // Load experience data
    const experienceList = document.getElementById('experience-list');
    experienceList.innerHTML = ''; // Clear any existing content
    data.experience.forEach(exp => {
        const experienceItem = document.createElement('div');
        experienceItem.classList.add('resume-item');
        experienceItem.innerHTML = `
            <p class="year">${exp.start} - ${exp.end}</p>
            <h3 class="resume-tital">${exp.role}</h3>
            <p class="company">${exp.company}</p>
            <p class="resume-desc">${exp.description}</p>
        `;
        experienceList.appendChild(experienceItem);
    });
    
    // Load education data
    const educationList = document.getElementById('education-list');
    educationList.innerHTML = ''; // Clear any existing content
    data.education.forEach(edu => {
        const educationItem = document.createElement('div');
        educationItem.classList.add('resume-item');
        educationItem.innerHTML = `
            <p class="year">${edu.year}</p>
            <h3 class="education-tital">${edu.degree}</h3>
            <p class="company">${edu.institution}</p>
        `;
        educationList.appendChild(educationItem);
    });
    
    // Load skills data
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = ''; // Clear any existing content
    const skillIcons = {
        'HTML5': 'bxl-html5',
        'CSS3': 'bxl-css3',
        'JavaScript': 'bxl-javascript',
        'React': 'bxl-react',
        'Git': 'bx-git-branch',
        'Responsive Design': 'bx-devices',
        'Node.js': 'bxl-nodejs',
        'Vue.js': 'bxl-vuejs',
        'Tailwind CSS': 'bxl-tailwind-css',
        'MongoDB': 'bxl-mongodb',
        'Express.js': 'bx-code-alt',
        'Python': 'bxl-python',
        'Java': 'bxl-java',
        'PHP': 'bxl-php',
        'MySQL': 'bx-data',
        'PostgreSQL': 'bx-data',
        'AWS': 'bxl-aws',
        'Firebase': 'bxl-firebase',
        'Docker': 'bxl-docker',
        'Figma': 'bxl-figma',
        'Adobe XD': 'bxl-adobe',
        'Photoshop': 'bxl-adobe'
    };
    
    data.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.classList.add('resume-item');
        
        const iconClass = skillIcons[skill] || 'bx-code-alt';
        
        skillItem.innerHTML = `
            <i class='bx ${iconClass}'></i>
            <span class="skill">${skill}</span>
        `;
        skillsList.appendChild(skillItem);
    });
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            alertSuccess.style.display = 'block';
            contactForm.reset();
            
            setTimeout(() => {
                alertSuccess.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        alertError.style.display = 'block';
        
        setTimeout(() => {
            alertError.style.display = 'none';
        }, 5000);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}

// Event Listeners
menuIcon.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove the preventDefault to allow native scrolling
        // We'll still update the active class
        const targetSection = link.getAttribute('href').substring(1);
        
        // Update active class
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
        
        if (window.innerWidth < 768) {
            toggleMenu();
        }
    });
});

resumeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        showResumeDetail(target);
    });
});

arrowRight.addEventListener('click', () => navigatePortfolio('next'));
arrowLeft.addEventListener('click', () => navigatePortfolio('prev'));

contactForm.addEventListener('submit', handleFormSubmit);

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    activateNavLink();
});

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchData();
    loadResumeData(data);
    updatePortfolioView();
    
    // Remove the showSection call as all sections are now visible
});