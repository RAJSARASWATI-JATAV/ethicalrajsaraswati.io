// Global state
let currentTheme = 'dark';
let currentLanguage = 'en';
let isSearching = false;
let currentFilter = 'all';

// Tool data from the provided JSON
const toolCategories = [
    {
        "name": "Network Penetration Testing",
        "id": "network",
        "tools": ["Nmap", "Metasploit", "Wireshark", "Nessus", "OpenVAS", "Masscan", "Zmap", "Unicornscan", "Hping3", "Scapy", "Netcat", "Socat", "Proxychains", "Tor", "I2P", "Ettercap", "Bettercap", "MITMf", "Responder", "Impacket", "CrackMapExec", "BloodHound", "PowerSploit", "Empire", "Covenant"]
    },
    {
        "name": "Web Application Security",
        "id": "web",
        "tools": ["Burp Suite", "OWASP ZAP", "SQLmap", "Nikto", "Dirb", "Gobuster", "Dirbuster", "WPScan", "Joomscan", "CMSmap", "XSSer", "BeEF", "W3af", "Arachni", "WebScarab", "Paros", "WebGoat", "DVWA", "bWAPP", "Mutillidae", "NodeGoat", "WebSecLab", "Gruyere", "HackerOne", "Bugcrowd"]
    },
    {
        "name": "WiFi & Wireless Security",
        "id": "wifi", 
        "tools": ["Aircrack-ng", "Kismet", "Reaver", "Pixie-Dust", "Wifite", "Fern WiFi Cracker", "WiFi-Pumpkin", "Airgeddon", "Linset", "Fluxion", "WiFiPhisher", "EAPHammer", "HostAPD-WPE", "FreeRADIUS-WPE", "Asleap", "CoWPAtty", "Pyrit", "HashCat", "JohnTheRipper", "Crunch", "Cupp", "Mentalist", "Maskprocessor", "Statsprocessor", "Princeprocessor"]
    },
    {
        "name": "Cryptography Tools",
        "id": "crypto",
        "tools": ["John the Ripper", "Hashcat", "CyberChef", "OpenSSL", "GPG", "Cryptool", "Sage", "YAFU", "msieve", "Factordb", "RsaCtfTool", "PkCrack", "fcrackzip", "ZipCrack", "RarCrack", "Hydra", "Medusa", "Ncrack", "THC-Hydra", "Brutespray", "PatAtOr", "Crowbar", "OnlineHashCrack", "CrackStation", "Hashkiller"]
    },
    {
        "name": "OSINT Tools",
        "id": "osint",
        "tools": ["Maltego", "Shodan", "TheHarvester", "Recon-ng", "SpiderFoot", "Amass", "Subfinder", "Findomain", "Assetfinder", "Knockpy", "Fierce", "DNSrecon", "DNSenum", "DNSmap", "Sublist3r", "Aquatone", "EyeWitness", "Gowitness", "WebScreenshot", "Photon", "GoogleDorker", "GHunt", "Sherlock", "Holehe", "Twint"]
    },
    {
        "name": "Social Engineering",
        "id": "social",
        "tools": ["Social Engineering Toolkit", "Gophish", "King Phisher", "PhishX", "Lucy", "ThreatSim", "Cofense PhishMe", "KnowBe4", "Proofpoint", "Mimecast", "WePhish", "PhishingFrenzy", "SpeedPhish", "PhishingBox", "Wombat Security", "SANS Securing The Human", "PhishMe", "GreatHorn", "Area 1 Security", "Ironscales", "Vade Secure", "Anti-Phishing Working Group", "PhishTank", "OpenPhish", "PhishStats"]
    }
];

const translations = {
    'en': {
        'brand': 'RAJSARASWATI JATAV',
        'tagline': 'Ethical Hacking Platform',
        'hero_title': 'Advanced Ethical Hacking Platform',
        'hero_desc': 'Master cybersecurity with AI-powered tools, interactive labs, and expert community support. Join the world\'s most comprehensive ethical hacking platform.',
        'explore_tools': 'Explore Tools',
        'start_learning': 'Start Learning',
        'join_community': 'Join Community'
    },
    'hi': {
        'brand': 'राजसरस्वती जाटव',
        'tagline': 'एथिकल हैकिंग प्लेटफॉर्म',
        'hero_title': 'उन्नत एथिकल हैकिंग प्लेटफॉर्म',
        'hero_desc': 'AI-संचालित उपकरणों, इंटरैक्टिव लैब्स और विशेषज्ञ समुदाय सहायता के साथ साइबर सुरक्षा में महारत हासिल करें। दुनिया के सबसे व्यापक एथिकल हैकिंग प्लेटफॉर्म से जुड़ें।',
        'explore_tools': 'उपकरण देखें',
        'start_learning': 'सीखना शुरू करें',
        'join_community': 'समुदाय से जुड़ें'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    createMatrixBackground();
    startTypingAnimation();
    animateCounters();
    renderTools();
    setupSmoothScrolling();
    setupIntersectionObserver();
    
    // Set initial theme
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
        themeSelector.value = currentTheme;
    }
}

function setupEventListeners() {
    // Theme switcher
    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
        themeSelector.addEventListener('change', handleThemeChange);
    }

    // Language switcher
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.addEventListener('change', handleLanguageChange);
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
    }
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });

    // CTA buttons
    const exploreBtn = document.getElementById('exploreToolsBtn');
    const startLearningBtn = document.getElementById('startLearningBtn');
    const joinCommunityBtn = document.getElementById('joinCommunityBtn');

    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => scrollToSection('tools'));
    }
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', () => scrollToSection('learning'));
    }
    if (joinCommunityBtn) {
        joinCommunityBtn.addEventListener('click', () => scrollToSection('community'));
    }

    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', handleTabSwitch);
    });

    // Modal functionality - Fixed
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const modal = document.getElementById('authModal');
    const modalClose = document.getElementById('modalClose');
    const authSwitchLink = document.getElementById('authSwitchLink');
    const authForm = document.getElementById('authForm');

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal('login');
        });
    }
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal('register');
        });
    }
    if (modalClose) {
        modalClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    }
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    if (authSwitchLink) {
        authSwitchLink.addEventListener('click', toggleAuthMode);
    }
    if (authForm) {
        authForm.addEventListener('submit', handleAuthSubmit);
    }

    // Lab buttons and other interactive elements
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('lab-btn')) {
            handleLabLaunch(e.target);
        }
        if (e.target.classList.contains('course-btn')) {
            handleCourseStart(e.target);
        }
        if (e.target.classList.contains('cert-btn')) {
            handleCertStart(e.target);
        }
        if (e.target.classList.contains('tutorial-btn')) {
            handleTutorialStart(e.target);
        }
        if (e.target.classList.contains('feature-btn')) {
            handleFeatureAccess(e.target);
        }
        if (e.target.classList.contains('news-btn')) {
            handleNewsRead(e.target);
        }
        if (e.target.classList.contains('enterprise-btn')) {
            handleEnterpriseLearn(e.target);
        }
        if (e.target.classList.contains('newsletter-btn')) {
            handleNewsletterSubscribe(e.target);
        }
    });

    // Scroll effects for header
    window.addEventListener('scroll', handleScroll);
}

function handleThemeChange(e) {
    currentTheme = e.target.value;
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    
    // Add visual feedback
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

function handleLanguageChange(e) {
    currentLanguage = e.target.value;
    updateLanguage();
}

function updateLanguage() {
    const elements = {
        '.brand-name': 'brand',
        '.brand-tagline': 'tagline',
        '.hero-description': 'hero_desc',
        '#exploreToolsBtn': 'explore_tools',
        '#startLearningBtn': 'start_learning',
        '#joinCommunityBtn': 'join_community'
    };

    Object.entries(elements).forEach(([selector, key]) => {
        const element = document.querySelector(selector);
        if (element && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

function createMatrixBackground() {
    const matrixBg = document.getElementById('matrixBg');
    if (!matrixBg) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';

    for (let i = 0; i < 50; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDelay = Math.random() * 10 + 's';
        char.style.animationDuration = (5 + Math.random() * 10) + 's';
        matrixBg.appendChild(char);
    }
}

function startTypingAnimation() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;

    const texts = [
        'Advanced Ethical Hacking Platform',
        '500+ Premium Security Tools',
        'AI-Powered Vulnerability Analysis',
        'Interactive Learning Labs',
        'Global Security Community'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current);

            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            }
        }, 20);
    };

    // Start animation when counters come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

function renderTools() {
    const toolsGrid = document.getElementById('toolsGrid');
    if (!toolsGrid) return;

    toolsGrid.innerHTML = '';

    const filteredCategories = currentFilter === 'all' 
        ? toolCategories 
        : toolCategories.filter(cat => cat.id === currentFilter);

    filteredCategories.forEach(category => {
        const categoryElement = createToolCategoryElement(category);
        toolsGrid.appendChild(categoryElement);
    });

    // Add fade-in animation
    const categories = toolsGrid.querySelectorAll('.tool-category');
    categories.forEach((cat, index) => {
        cat.style.opacity = '0';
        cat.style.transform = 'translateY(20px)';
        setTimeout(() => {
            cat.style.transition = 'all 0.6s ease';
            cat.style.opacity = '1';
            cat.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createToolCategoryElement(category) {
    const div = document.createElement('div');
    div.className = 'tool-category';
    div.setAttribute('data-category', category.id);

    div.innerHTML = `
        <div class="category-header">
            <h3 class="category-title">${category.name}</h3>
            <span class="tool-count">${category.tools.length}</span>
        </div>
        <div class="tools-list">
            ${category.tools.slice(0, 12).map(tool => `
                <div class="tool-item">
                    <div class="tool-name">${tool}</div>
                    <div class="tool-description">Professional ${tool.toLowerCase()} for ethical hacking</div>
                </div>
            `).join('')}
        </div>
        <div class="category-actions">
            <button class="category-btn btn-explore">Explore All ${category.tools.length} Tools</button>
            <button class="category-btn btn-bookmark">⭐ Bookmark</button>
        </div>
    `;

    // Add click handlers for category actions
    const exploreBtn = div.querySelector('.btn-explore');
    const bookmarkBtn = div.querySelector('.btn-bookmark');

    exploreBtn.addEventListener('click', () => {
        showToolDetails(category);
    });

    bookmarkBtn.addEventListener('click', (e) => {
        e.target.textContent = e.target.textContent.includes('⭐') ? '☆ Bookmark' : '⭐ Bookmarked';
        e.target.classList.toggle('bookmarked');
    });

    return div;
}

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        renderTools();
        return;
    }

    const toolsGrid = document.getElementById('toolsGrid');
    toolsGrid.innerHTML = '';

    // Search through all categories and tools
    const results = [];
    toolCategories.forEach(category => {
        const matchingTools = category.tools.filter(tool => 
            tool.toLowerCase().includes(query)
        );
        
        if (matchingTools.length > 0 || category.name.toLowerCase().includes(query)) {
            results.push({
                ...category,
                tools: matchingTools.length > 0 ? matchingTools : category.tools.slice(0, 6)
            });
        }
    });

    if (results.length === 0) {
        toolsGrid.innerHTML = `
            <div class="no-results">
                <h3>No results found for "${query}"</h3>
                <p>Try searching with different keywords or browse our tool categories.</p>
                <button class="btn btn--primary" onclick="clearSearch()">Clear Search</button>
            </div>
        `;
        return;
    }

    results.forEach(category => {
        const categoryElement = createToolCategoryElement(category);
        toolsGrid.appendChild(categoryElement);
    });
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    renderTools();
}

function handleFilterChange(e) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    currentFilter = e.target.getAttribute('data-category');
    renderTools();
}

function handleTabSwitch(e) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    e.target.classList.add('active');
    const tabId = e.target.getAttribute('data-tab');
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

function handleScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Modal Functions - Fixed
function openModal(type) {
    const modal = document.getElementById('authModal');
    const modalTitle = document.getElementById('modalTitle');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const authSwitchText = document.getElementById('authSwitchText');
    const authSwitchLink = document.getElementById('authSwitchLink');

    if (!modal) return;

    if (type === 'login') {
        modalTitle.textContent = 'Login';
        authSubmitBtn.textContent = 'Login';
        confirmPasswordGroup.style.display = 'none';
        authSwitchText.textContent = "Don't have an account?";
        authSwitchLink.textContent = 'Register here';
        authSwitchLink.setAttribute('data-mode', 'register');
    } else {
        modalTitle.textContent = 'Register';
        authSubmitBtn.textContent = 'Register';
        confirmPasswordGroup.style.display = 'block';
        authSwitchText.textContent = 'Already have an account?';
        authSwitchLink.textContent = 'Login here';
        authSwitchLink.setAttribute('data-mode', 'login');
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function toggleAuthMode(e) {
    e.preventDefault();
    const mode = e.target.getAttribute('data-mode');
    openModal(mode);
}

function handleAuthSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const password = formData.get('password') || e.target.querySelector('input[type="password"]').value;
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert(`Authentication successful!\nEmail: ${email}`);
        closeModal();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        e.target.reset();
    }, 1500);
}

// Event Handlers for Interactive Elements
function showToolDetails(category) {
    const toolsList = category.tools.slice(0, 15).join('\n• ');
    const remainingCount = category.tools.length - 15;
    const message = `${category.name} Tools:\n\n• ${toolsList}${remainingCount > 0 ? `\n\n... and ${remainingCount} more tools!` : ''}`;
    alert(message);
}

function handleLabLaunch(btn) {
    const labCard = btn.closest('.lab-card');
    const labName = labCard.querySelector('h3').textContent;
    
    const originalText = btn.textContent;
    btn.textContent = 'Launching...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert(`Launching ${labName}...\n\nThis would normally open the interactive lab environment in a new window with:\n• Virtual machines\n• Pre-configured tools\n• Step-by-step guidance\n• Progress tracking`);
        btn.textContent = originalText;
        btn.disabled = false;
    }, 2000);
}

function handleCourseStart(btn) {
    const courseCard = btn.closest('.course-card');
    const courseTitle = courseCard.querySelector('h3').textContent;
    const progressFill = courseCard.querySelector('.progress-fill');
    const progressText = courseCard.querySelector('.course-progress span');
    
    const originalText = btn.textContent;
    btn.textContent = 'Starting...';
    btn.disabled = true;
    
    setTimeout(() => {
        progressFill.style.width = '10%';
        progressText.textContent = '10% Complete';
        btn.textContent = 'Continue Course';
        btn.disabled = false;
        alert(`Started course: ${courseTitle}\n\nYou can now access:\n• Video lectures\n• Hands-on exercises\n• Quizzes and assessments\n• Progress tracking`);
    }, 1500);
}

function handleCertStart(btn) {
    const certCard = btn.closest('.cert-card');
    const certTitle = certCard.querySelector('h3').textContent;
    alert(`Starting preparation for ${certTitle}\n\nThis includes:\n• Study materials\n• Practice exams\n• Expert guidance\n• Exam scheduling`);
}

function handleTutorialStart(btn) {
    const tutorialCard = btn.closest('.tutorial-card');
    const tutorialTitle = tutorialCard.querySelector('h3').textContent;
    alert(`Starting tutorial: ${tutorialTitle}\n\nThis tutorial includes:\n• Step-by-step instructions\n• Interactive examples\n• Practice exercises\n• Downloadable resources`);
}

function handleFeatureAccess(btn) {
    const featureCard = btn.closest('.feature-card');
    const featureTitle = featureCard.querySelector('h3').textContent;
    
    if (featureTitle.includes('Discussion')) {
        alert('Opening Discussion Forums...\n\nAccess:\n• General discussions\n• Tool-specific topics\n• Q&A sections\n• Community challenges');
    } else if (featureTitle.includes('Q&A')) {
        alert('Opening Q&A Section...\n\nFeatures:\n• Ask questions\n• Expert answers\n• Community voting\n• Best answer selection');
    } else if (featureTitle.includes('Chat')) {
        alert('Joining Live Chat...\n\nChat features:\n• Real-time messaging\n• Expert support\n• Study groups\n• Voice channels');
    }
}

function handleNewsRead(btn) {
    const newsCard = btn.closest('.news-card');
    const newsTitle = newsCard.querySelector('h3').textContent;
    alert(`Reading: ${newsTitle}\n\nThis article includes:\n• Detailed analysis\n• Expert commentary\n• Related resources\n• Action recommendations`);
}

function handleEnterpriseLearn(btn) {
    const enterpriseCard = btn.closest('.enterprise-card');
    const enterpriseTitle = enterpriseCard.querySelector('h3').textContent;
    alert(`Learning more about: ${enterpriseTitle}\n\nEnterprise features:\n• Custom deployment\n• Team management\n• Advanced analytics\n• Priority support`);
}

function handleNewsletterSubscribe(btn) {
    const emailInput = btn.parentElement.querySelector('.newsletter-input');
    const email = emailInput.value.trim();
    
    if (email && email.includes('@')) {
        const originalText = btn.textContent;
        btn.textContent = 'Subscribing...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = 'Subscribed!';
            btn.style.background = 'var(--color-success)';
            emailInput.value = '';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1000);
    } else {
        alert('Please enter a valid email address.');
    }
}

// Utility Functions
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

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add interactive effects
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('tool-item')) {
        e.target.classList.add('hover-scale');
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('tool-item')) {
        e.target.classList.remove('hover-scale');
    }
});

// Make global functions available
window.clearSearch = clearSearch;

// Console welcome message
console.log(`
██████╗  █████╗      ██╗███████╗ █████╗ ██████╗  █████╗ ███████╗██╗    ██╗ █████╗ ████████╗██╗
██╔══██╗██╔══██╗     ██║██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██║    ██║██╔══██╗╚══██╔══╝██║
██████╔╝███████║     ██║███████╗███████║██████╔╝███████║███████╗██║ █╗ ██║███████║   ██║   ██║
██╔══██╗██╔══██║██   ██║╚════██║██╔══██║██╔══██╗██╔══██║╚════██║██║███╗██║██╔══██║   ██║   ██║
██║  ██║██║  ██║╚█████╔╝███████║██║  ██║██║  ██║██║  ██║███████║╚███╔███╔╝██║  ██║   ██║   ██║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝

Welcome to RAJSARASWATI JATAV - Advanced Ethical Hacking Platform!

🔧 500+ Premium Tools Available
🎯 Interactive Learning Labs  
🌐 Global Security Community
🚀 AI-Powered Analysis

Happy Ethical Hacking! 🛡️
`);

// Initialize theme based on system preference or default to dark
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    currentTheme = 'dark';
} else {
    currentTheme = 'professional';
}