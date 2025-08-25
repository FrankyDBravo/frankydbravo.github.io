/**
 * Portfolio Site Main JavaScript
 * Handles language switching, mobile navigation, blog loading, and smooth scrolling
 */

class PortfolioSite {
    constructor() {
        this.currentLanguage = 'en';
        this.blogPosts = [];
        this.mobileNavOpen = false;
        
        this.init();
    }

    /**
     * Initialize the site functionality
     */
    init() {
        this.setupEventListeners();
        this.loadBlogPosts();
        this.updateCopyrightYear();
        this.initSmoothScrolling();
        this.handleInitialLanguage();
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Language switcher
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchLanguage(e.target.dataset.lang));
        });

        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => this.toggleMobileNav());
            
            // Close mobile nav when clicking on links
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMobileNav());
            });
        }

        // Contact form submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (this.mobileNavOpen && !e.target.closest('.nav') && !e.target.closest('.nav-toggle')) {
                this.closeMobileNav();
            }
        });

        // Handle escape key for mobile nav
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileNavOpen) {
                this.closeMobileNav();
            }
        });

        // Header scroll effect
        window.addEventListener('scroll', () => this.handleHeaderScroll());
    }

    /**
     * Switch between languages
     * @param {string} lang - Language code ('en' or 'fr')
     */
    switchLanguage(lang) {
        if (lang === this.currentLanguage) return;

        this.currentLanguage = lang;
        
        // Update language button states
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update all translatable elements
        this.updateTranslations();
        
        // Store language preference
        localStorage.setItem('preferredLanguage', lang);
        
        // Update document language attribute
        document.documentElement.lang = lang;
    }

    /**
     * Update all text elements with translations
     */
    updateTranslations() {
        const elementsWithTranslations = document.querySelectorAll('[data-en], [data-fr]');
        
        elementsWithTranslations.forEach(element => {
            const translation = element.dataset[this.currentLanguage];
            if (translation) {
                element.textContent = translation;
            }
        });

        // Update placeholders
        const elementsWithPlaceholders = document.querySelectorAll(`[data-${this.currentLanguage}-placeholder]`);
        elementsWithPlaceholders.forEach(element => {
            const placeholder = element.dataset[`${this.currentLanguage}Placeholder`];
            if (placeholder) {
                element.placeholder = placeholder;
            }
        });

        // Update page title
        const titles = {
            en: 'Tom S. - Software Engineer',
            fr: 'Tom S. - Ingénieur Logiciel'
        };
        document.title = titles[this.currentLanguage];

        // Update meta description
        const descriptions = {
            en: 'Tom S. - Software Engineer Portfolio. Explore my projects, blog posts, and get in touch.',
            fr: 'Tom S. - Portfolio d\'Ingénieur Logiciel. Explorez mes projets, articles de blog et contactez-moi.'
        };
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = descriptions[this.currentLanguage];
        }
    }

    /**
     * Handle initial language based on browser preferences or stored preference
     */
    handleInitialLanguage() {
        const storedLang = localStorage.getItem('preferredLanguage');
        const browserLang = navigator.language.split('-')[0];
        
        let initialLang = 'en'; // Default
        
        if (storedLang && ['en', 'fr'].includes(storedLang)) {
            initialLang = storedLang;
        } else if (['fr'].includes(browserLang)) {
            initialLang = browserLang;
        }
        
        this.switchLanguage(initialLang);
    }

    /**
     * Toggle mobile navigation
     */
    toggleMobileNav() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        this.mobileNavOpen = !this.mobileNavOpen;
        
        navToggle.setAttribute('aria-expanded', this.mobileNavOpen.toString());
        navMenu.classList.toggle('active', this.mobileNavOpen);
        
        // Prevent body scrolling when mobile nav is open
        document.body.style.overflow = this.mobileNavOpen ? 'hidden' : '';
    }

    /**
     * Close mobile navigation
     */
    closeMobileNav() {
        if (!this.mobileNavOpen) return;
        
        this.mobileNavOpen = false;
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Load and display blog posts
     */
    async loadBlogPosts() {
        try {
            const response = await fetch('blog/posts.json');
            if (!response.ok) {
                throw new Error('Failed to load blog posts');
            }
            
            const data = await response.json();
            this.blogPosts = data.posts || [];
            this.renderBlogPosts();
        } catch (error) {
            console.warn('Could not load blog posts:', error);
            this.renderBlogPlaceholder();
        }
    }

    /**
     * Render blog posts in the DOM
     */
    renderBlogPosts() {
        const blogContainer = document.getElementById('blog-posts');
        if (!blogContainer) return;

        if (this.blogPosts.length === 0) {
            this.renderBlogPlaceholder();
            return;
        }

        // Show only the 3 most recent posts
        const recentPosts = this.blogPosts.slice(0, 3);
        
        blogContainer.innerHTML = recentPosts.map(post => `
            <article class="blog-post">
                <h3 class="blog-post-title">
                    <a href="${post.url}" target="_blank" rel="noopener noreferrer">
                        ${this.getTranslatedText(post.title)}
                    </a>
                </h3>
                <div class="blog-post-meta">
                    <time datetime="${post.date}">${this.formatDate(post.date)}</time>
                    ${post.readTime ? `• ${post.readTime} min read` : ''}
                </div>
                <p class="blog-post-excerpt">
                    ${this.getTranslatedText(post.excerpt)}
                </p>
            </article>
        `).join('');
    }

    /**
     * Render placeholder blog content when posts can't be loaded
     */
    renderBlogPlaceholder() {
        const blogContainer = document.getElementById('blog-posts');
        if (!blogContainer) return;

        const placeholderPosts = [
            {
                title: { en: 'Getting Started with Modern Web Development', fr: 'Débuter avec le Développement Web Moderne' },
                date: '2024-01-15',
                excerpt: { 
                    en: 'A comprehensive guide to modern web development tools and practices that every developer should know.',
                    fr: 'Un guide complet des outils et pratiques de développement web moderne que tout développeur devrait connaître.'
                },
                url: '#',
                readTime: 5
            },
            {
                title: { en: 'Building Scalable React Applications', fr: 'Construire des Applications React Évolutives' },
                date: '2024-01-08',
                excerpt: { 
                    en: 'Learn best practices for building React applications that scale with your business needs.',
                    fr: 'Apprenez les meilleures pratiques pour construire des applications React qui évoluent avec vos besoins commerciaux.'
                },
                url: '#',
                readTime: 8
            },
            {
                title: { en: 'The Future of JavaScript', fr: 'L\'Avenir de JavaScript' },
                date: '2024-01-01',
                excerpt: { 
                    en: 'Exploring upcoming JavaScript features and how they will change the way we write code.',
                    fr: 'Explorer les fonctionnalités JavaScript à venir et comment elles changeront notre façon d\'écrire du code.'
                },
                url: '#',
                readTime: 6
            }
        ];

        blogContainer.innerHTML = placeholderPosts.map(post => `
            <article class="blog-post">
                <h3 class="blog-post-title">
                    <a href="${post.url}">
                        ${this.getTranslatedText(post.title)}
                    </a>
                </h3>
                <div class="blog-post-meta">
                    <time datetime="${post.date}">${this.formatDate(post.date)}</time>
                    ${post.readTime ? `• ${post.readTime} min read` : ''}
                </div>
                <p class="blog-post-excerpt">
                    ${this.getTranslatedText(post.excerpt)}
                </p>
            </article>
        `).join('');
    }

    /**
     * Get translated text for current language
     * @param {string|Object} text - Text string or object with language keys
     * @returns {string} Translated text
     */
    getTranslatedText(text) {
        if (typeof text === 'string') return text;
        return text[this.currentLanguage] || text.en || '';
    }

    /**
     * Format date for display
     * @param {string} dateString - ISO date string
     * @returns {string} Formatted date
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        const locale = this.currentLanguage === 'fr' ? 'fr-FR' : 'en-US';
        return date.toLocaleDateString(locale, options);
    }

    /**
     * Handle contact form submission
     * @param {Event} e - Submit event
     */
    handleFormSubmission(e) {
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Add loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        const originalText = submitButton.textContent;
        const loadingText = this.currentLanguage === 'fr' ? 'Envoi...' : 'Sending...';
        submitButton.textContent = loadingText;
        
        // Reset loading state after a delay (form will be submitted to Formspree)
        setTimeout(() => {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 2000);
    }

    /**
     * Handle smooth scrolling for anchor links
     * @param {Event} e - Click event
     */
    handleSmoothScroll(e) {
        const href = e.target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile nav if open
                this.closeMobileNav();
                
                // Update URL without causing scroll
                history.pushState(null, null, href);
            }
        }
    }

    /**
     * Initialize smooth scrolling behavior
     */
    initSmoothScrolling() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            document.documentElement.style.scrollBehavior = 'auto';
        }
    }

    /**
     * Handle header scroll effects
     */
    handleHeaderScroll() {
        const header = document.querySelector('.header');
        const scrolled = window.scrollY > 100;
        
        header.style.backgroundColor = scrolled 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'rgba(255, 255, 255, 0.95)';
    }

    /**
     * Update copyright year in footer
     */
    updateCopyrightYear() {
        const currentYear = new Date().getFullYear();
        const copyrightElements = document.querySelectorAll('[data-en*="© 2024"], [data-fr*="© 2024"]');
        
        copyrightElements.forEach(element => {
            const enText = element.dataset.en?.replace('2024', currentYear);
            const frText = element.dataset.fr?.replace('2024', currentYear);
            
            if (enText) element.dataset.en = enText;
            if (frText) element.dataset.fr = frText;
        });
        
        // Update the displayed text
        this.updateTranslations();
    }

    /**
     * Utility method to debounce function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
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
}

/**
 * Intersection Observer for animations
 */
class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        // Check if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );

        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll(
            '.project-card, .blog-post, .contact-method, .skill-tag'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(el);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

/**
 * Initialize the site when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main site functionality
    const portfolio = new PortfolioSite();
    
    // Initialize scroll animations
    const animations = new AnimationObserver();
    
    // Make portfolio instance globally available for debugging
    window.portfolio = portfolio;
});

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh any time-sensitive content when page becomes visible
        // This is useful for updating "time ago" displays or refreshing data
    }
});

/**
 * Service Worker registration for PWA capabilities (optional)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
