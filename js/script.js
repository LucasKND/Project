document.addEventListener('DOMContentLoaded', function() {
    const carouselTexts = [
        "O CONDOMÍNIO DE LOTES FEITO PARA VOCÊ",
        "ENTREGA TOTALMENTE LEGALIZADA E COM RGI INDIVIDUALIZADO",
        "ONDE O BEM-ESTAR FAZ PARTE DA SUA ROTINA",
        "O MELHOR DAS VARGENS PARA QUEM QUER DESFRUTAR OS SEUS MELHORES MOMENTOS",
        "SE A VIDA É FEITA DE CICLOS, VOCÊ ESTÁ PRESTES A VIVER O MELHOR DELES",
        "CONHEÇA O NOVO CONCEITO DE MORADIA",
        "SEGURANÇA E CONFORTO EM HARMONIA",
        "NATUREZA E MODERNIDADE SE ENCONTRAM"
    ];
    
    const carouselTextElement = document.getElementById('carousel-text');
    let currentTextIndex = 0;
    const transitionDelay = 6000;
    const fadeTime = 500;
    
    carouselTextElement.textContent = carouselTexts[0];
    
    function changeText() {
        carouselTextElement.classList.add('fade');
        
        setTimeout(() => {
            currentTextIndex = (currentTextIndex + 1) % carouselTexts.length;
            
            carouselTextElement.textContent = carouselTexts[currentTextIndex];
            
            carouselTextElement.classList.remove('fade');
        }, fadeTime);
    }
    
    let carouselInterval = setInterval(changeText, transitionDelay);
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(carouselInterval);
        } else {
            clearInterval(carouselInterval);
            carouselInterval = setInterval(changeText, transitionDelay);
        }
    });
    
    const navigationBar = document.querySelector('.navigation-bar');
    const navToggleBtn = document.querySelector('.nav-toggle-btn');
    const navCloseBtn = document.querySelector('.nav-close-btn');
    
    function collapseNav() {
        navigationBar.classList.add('collapsed');
        navigationBar.classList.remove('expanded');
    }
    
    function expandNav() {
        navigationBar.classList.remove('collapsed');
        navigationBar.classList.add('expanded');
    }
    
    if (navToggleBtn) {
        navToggleBtn.addEventListener('click', expandNav);
    }
    
    if (navCloseBtn) {
        navCloseBtn.addEventListener('click', collapseNav);
    }
    
    function checkScreenSize() {
        if (window.innerWidth <= 991) {
            if (!navigationBar.classList.contains('expanded')) {
                collapseNav();
            }
        } else {
            navigationBar.classList.remove('collapsed', 'expanded');
        }
    }
    
    window.addEventListener('load', checkScreenSize);
    window.addEventListener('resize', checkScreenSize);
    
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        function adjustVideoSize() {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const videoRatio = 16 / 9;
            
            if (windowWidth / windowHeight > videoRatio) {
                heroVideo.style.width = '100%';
                heroVideo.style.height = 'auto';
            } else {
                heroVideo.style.width = 'auto';
                heroVideo.style.height = '100%';
            }
        }
        
        window.addEventListener('resize', adjustVideoSize);
        window.addEventListener('load', adjustVideoSize);
    }
    
    function setupMobileMenu() {
        if (window.innerWidth <= 991) {
            const navigationBar = document.querySelector('.navigation-bar .container');
            
            if (!document.querySelector('.mobile-toggle')) {
                const mobileToggle = document.createElement('div');
                mobileToggle.className = 'mobile-toggle';
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                
                navigationBar.appendChild(mobileToggle);
                
                mobileToggle.addEventListener('click', function() {
                    const navMenu = document.querySelector('nav ul');
                    if (navMenu.style.display === 'flex') {
                        navMenu.style.display = 'none';
                    } else {
                        navMenu.style.display = 'flex';
                        navMenu.style.flexDirection = 'column';
                        navMenu.style.position = 'absolute';
                        navMenu.style.top = '100%';
                        navMenu.style.right = '0';
                        navMenu.style.backgroundColor = '#282828';
                        navMenu.style.padding = '20px';
                        navMenu.style.width = '250px';
                    }
                });
            }
        }
    }
    
    window.addEventListener('load', setupMobileMenu);
    window.addEventListener('resize', setupMobileMenu);

    const featureCard = document.querySelector('.feature-card');
    const highlightCard = document.querySelector('.highlight-card');
    let lastScrollTop = 0;
    const scrollSpeed = 0.3;
    
    function animateCardsOnScroll() {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        
        if (st > 0) {
            const scrollAmount = -Math.min(st * scrollSpeed, 300);
            
            if (featureCard) {
                requestAnimationFrame(() => {
                    featureCard.style.transform = `translateY(${scrollAmount}px)`;
                });
            }
            
            if (highlightCard) {
                requestAnimationFrame(() => {
                    highlightCard.style.transform = `translateY(${scrollAmount}px)`;
                });
            }
        } else {
            if (featureCard) {
                featureCard.style.transform = 'translateY(0)';
            }
            if (highlightCard) {
                highlightCard.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = st <= 0 ? 0 : st;
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                animateCardsOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    function animateOnScroll() {
        const aboutSection = document.querySelector('.about-section');
        if (!aboutSection) return;
        
        const animateElements = aboutSection.querySelectorAll('.about-content h2, .about-text p, .more-info-btn, .about-logo');
        const triggerPosition = window.innerHeight * 0.8;
        
        const checkScroll = function() {
            const aboutSectionTop = aboutSection.getBoundingClientRect().top;
            
            if (aboutSectionTop < triggerPosition) {
                animateElements.forEach(element => {
                    element.classList.add('animate');
                });
                
                window.removeEventListener('scroll', checkScroll);
            }
        };
        
        checkScroll();
        
        window.addEventListener('scroll', checkScroll, { passive: true });
    }
    
    window.addEventListener('load', animateOnScroll);

    const amenityItems = document.querySelectorAll('.amenity-item');
    const amenityImages = document.querySelectorAll('.amenity-image');
    let currentAmenityIndex = 0;
    let isManualSelection = false;
    let autoAdvanceTimeout;

    function selectAmenity(index, isManual = false) {
        amenityItems.forEach(item => {
            item.classList.remove('active');
            const progressBar = item.querySelector('.progress-bar');
            progressBar.style.width = '0';
        });
        
        amenityImages.forEach(image => {
            image.classList.remove('active');
        });
        
        const selectedItem = amenityItems[index];
        selectedItem.classList.add('active');
        
        selectedItem.querySelector('.progress-bar').getBoundingClientRect();
        
        const progressBar = selectedItem.querySelector('.progress-bar');
        progressBar.style.transition = 'none';
        progressBar.style.width = '0';
        
        progressBar.getBoundingClientRect();
        
        progressBar.style.transition = 'width 4.8s linear';
        progressBar.style.width = '100%';
        
        amenityImages[index].classList.add('active');
        
        currentAmenityIndex = index;
        
        if (isManual) {
            isManualSelection = true;
            clearTimeout(autoAdvanceTimeout);
            
            setTimeout(() => {
                isManualSelection = false;
                scheduleNextAmenity();
            }, 8000);
        }
    }
    
    function advanceToNextAmenity() {
        if (isManualSelection) return;
        
        const nextIndex = (currentAmenityIndex + 1) % amenityItems.length;
        selectAmenity(nextIndex);
        scheduleNextAmenity();
    }
    
    function scheduleNextAmenity() {
        clearTimeout(autoAdvanceTimeout);
        autoAdvanceTimeout = setTimeout(advanceToNextAmenity, 5000);
    }
    
    amenityItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            selectAmenity(index, true);
        });
    });
    
    selectAmenity(0);
    scheduleNextAmenity();

    function setupScrollHijacking() {
        const amenitiesSection = document.querySelector('.amenities-section');
        const amenitiesList = document.querySelector('.amenities-list');
        const amenityItems = document.querySelectorAll('.amenity-item');
        const body = document.body;
        
        let isScrollHijackActive = false;
        let lastScrollTime = 0;
        let sectionHeight = 0;
        let sectionTop = 0;
        let isLastItemVisible = false;
        let originalSectionPosition = 0;
        const scrollCooldown = 100;
        const scrollAmount = 80;
        
        function updateSectionDimensions() {
            const rect = amenitiesSection.getBoundingClientRect();
            sectionTop = window.pageYOffset + rect.top;
            sectionHeight = rect.height;
            originalSectionPosition = sectionTop;
        }
        
        window.addEventListener('load', updateSectionDimensions);
        window.addEventListener('resize', updateSectionDimensions);
        
        function shouldFixSection() {
            const scrollPosition = window.pageYOffset;
            return scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight);
        }
        
        function checkIfLastItemVisible() {
            const lastItem = amenityItems[amenityItems.length - 1];
            const rect = lastItem.getBoundingClientRect();
            const listRect = amenitiesList.getBoundingClientRect();
            
            isLastItemVisible = rect.bottom <= listRect.bottom + 20;
            return isLastItemVisible;
        }
        
        function activateScrollHijack() {
            if (!isScrollHijackActive) {
                isScrollHijackActive = true;
                
                amenitiesSection.classList.add('fixed');
                body.style.paddingTop = `${sectionHeight}px`;
                
                body.classList.add('scroll-hijack-active');
            }
        }
        
        function deactivateScrollHijack() {
            if (isScrollHijackActive) {
                isScrollHijackActive = false;
                
                amenitiesSection.classList.remove('fixed');
                body.style.paddingTop = '0';
                
                body.classList.remove('scroll-hijack-active');
                
                if (isLastItemVisible) {
                    window.scrollTo({
                        top: originalSectionPosition + sectionHeight,
                        behavior: 'auto'
                    });
                }
            }
        }
        
        function handleScroll(event) {
            if (shouldFixSection()) {
                if (checkIfLastItemVisible() && event.deltaY > 0) {
                    deactivateScrollHijack();
                    return;
                }
                
                activateScrollHijack();
                
                const now = Date.now();
                if (now - lastScrollTime < scrollCooldown) {
                    event.preventDefault();
                    return;
                }
                
                const delta = Math.sign(event.deltaY);
                
                if (delta > 0) {
                    amenitiesList.scrollBy({
                        top: scrollAmount,
                        behavior: 'smooth'
                    });
                    
                    event.preventDefault();
                } else if (delta < 0) {
                    if (amenitiesList.scrollTop <= 0) {
                        deactivateScrollHijack();
                    } else {
                        amenitiesList.scrollBy({
                            top: -scrollAmount,
                            behavior: 'smooth'
                        });
                        
                        event.preventDefault();
                    }
                }
                
                lastScrollTime = now;
            } else if (isScrollHijackActive) {
                deactivateScrollHijack();
            }
        }
        
        let touchStartY = 0;
        
        function handleTouchStart(event) {
            touchStartY = event.touches[0].clientY;
        }
        
        function handleTouchMove(event) {
            if (!shouldFixSection()) return;
            
            activateScrollHijack();
            
            const touchY = event.touches[0].clientY;
            const diff = touchStartY - touchY;
            
            const now = Date.now();
            if (now - lastScrollTime < scrollCooldown) {
                event.preventDefault();
                return;
            }
            
            if (Math.abs(diff) > 10) {
                if (diff > 0) {
                    if (checkIfLastItemVisible()) {
                        deactivateScrollHijack();
                    } else {
                        amenitiesList.scrollBy({
                            top: scrollAmount,
                            behavior: 'smooth'
                        });
                        
                        event.preventDefault();
                    }
                } else {
                    if (amenitiesList.scrollTop <= 0) {
                        deactivateScrollHijack();
                    } else {
                        amenitiesList.scrollBy({
                            top: -scrollAmount,
                            behavior: 'smooth'
                        });
                        
                        event.preventDefault();
                    }
                }
                
                lastScrollTime = now;
                touchStartY = touchY;
            }
        }
        
        window.addEventListener('wheel', handleScroll, { passive: false });
        
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    setupScrollHijacking();

    function isElementInViewport(el, offset = 0) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
            rect.bottom >= 0 + offset &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) - offset &&
            rect.right >= 0 + offset
        );
    }

    function initAmenitiesAnimations() {
        const amenitiesSection = document.querySelector('.new-amenities-section');
        if (!amenitiesSection) return;

        const title = amenitiesSection.querySelector('.new-amenities-title h2');
        const amenityItems = Array.from(amenitiesSection.querySelectorAll('.new-amenity-item'));
        const amenityImages = Array.from(amenitiesSection.querySelectorAll('.new-amenity-image'));
        const cta = amenitiesSection.querySelector('.new-amenities-cta');
        
        amenityItems.forEach((item, index) => {
            item.style.setProperty('--item-index', index);
        });

        function animateElementsInView() {
            if (isElementInViewport(amenitiesSection, 100)) {
                title?.classList.add('fade-in');
                
                amenityItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, 100 * (index + 1));
                });
                
                if (amenityItems.length > 0 && amenityImages.length > 0) {
                    setTimeout(() => {
                        amenityItems[0].classList.add('active');
                        amenityImages[0].classList.add('active', 'fade-in');
                    }, 300);
                }
                
                setTimeout(() => {
                    cta?.classList.add('fade-in');
                }, 200 + (amenityItems.length * 100));
                
                window.removeEventListener('scroll', animateElementsInView);
            }
        }

        amenityItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                amenityItems.forEach(i => i.classList.remove('active'));
                amenityImages.forEach(img => {
                    img.classList.remove('active', 'fade-in');
                });
                
                item.classList.add('active');
                if (amenityImages[index]) {
                    amenityImages[index].classList.add('active', 'fade-in');
                }
            });
        });

        if (isElementInViewport(amenitiesSection, 100)) {
            animateElementsInView();
        } else {
            window.addEventListener('scroll', animateElementsInView);
        }
    }

    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        function checkScroll() {
            animatedElements.forEach(element => {
                if (isElementInViewport(element, 150)) {
                    element.classList.add('fade-in');
                } else if (element.hasAttribute('data-repeat-animation')) {
                    element.classList.remove('fade-in');
                }
            });
        }
        
        window.addEventListener('load', checkScroll);
        window.addEventListener('scroll', checkScroll);
    }

    initAmenitiesAnimations();
    initScrollAnimations();

    initAmenitiesSection();
    initContactAnimations();
    setupDisappearingAnimations();

    // Corrigir comportamento dos botões do carrossel para evitar rolagem
    const carouselControls = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');
    carouselControls.forEach(control => {
        control.addEventListener('click', function(e) {
            e.preventDefault();
            
            const direction = this.classList.contains('carousel-control-prev') ? 'prev' : 'next';
            
            const targetId = this.getAttribute('href');
            
            const carousel = document.querySelector(targetId);
            if (carousel) {
                if (typeof $ !== 'undefined' && typeof $(targetId).carousel === 'function') {
                    $(targetId).carousel(direction);
                } 
                else if (typeof bootstrap !== 'undefined') {
                    const carouselInstance = bootstrap.Carousel.getInstance(carousel);
                    if (carouselInstance) {
                        direction === 'prev' ? carouselInstance.prev() : carouselInstance.next();
                    }
                }
            }
        });
    });
});

function initAmenitiesSection() {
    const section = document.querySelector('.new-amenities-section');
    if (!section) return;

    const amenityItems = section.querySelectorAll('.new-amenity-item');
    const amenityImages = section.querySelectorAll('.new-amenity-image');
    const title = section.querySelector('.new-amenities-title');
    const cta = section.querySelector('.new-amenities-cta');

    function activateItem(index) {
        amenityItems.forEach(item => item.classList.remove('active'));
        amenityImages.forEach(img => img.classList.remove('active'));
        
        amenityItems[index].classList.add('active');
        amenityImages[index].classList.add('active');
    }

    const amenitiesList = section.querySelector('.new-amenities-list');
    amenitiesList.addEventListener('mouseover', function(e) {
        const item = e.target.closest('.new-amenity-item');
        if (item) {
            const index = parseInt(item.dataset.index);
            if (!isNaN(index)) {
                activateItem(index);
            }
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === title || entry.target === cta) {
                    entry.target.classList.add('fade-in');
                } else {
                    const items = Array.from(amenityItems);
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('fade-in');
                        }, 100 * index);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(title);
    observer.observe(amenitiesList);
    observer.observe(cta);

    activateItem(0);
}

function initNewAmenitiesSection() {
    const amenityItems = document.querySelectorAll('.new-amenity-item');
    const amenityImages = document.querySelectorAll('.new-amenity-image');

    function activateItem(index) {
        amenityItems.forEach(item => item.classList.remove('active'));
        amenityImages.forEach(img => img.classList.remove('active'));
        
        amenityItems[index].classList.add('active');
        amenityImages[index].classList.add('active');
    }

    amenityItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            activateItem(index);
        });
        
        item.addEventListener('click', () => {
            activateItem(index);
        });
    });

    activateItem(0);

    const animateItems = () => {
        amenityItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, index * 100);
        });
    };

    const amenitiesSection = document.querySelector('.new-amenities-section');
    if (amenitiesSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateItems();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(amenitiesSection);
    }
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initNewAmenitiesSection();
    initSmoothScroll();
    initContactAnimations();
    setupDisappearingAnimations();
});

function initContactAnimations() {
    const contactSection = document.getElementById('contato');
    if (!contactSection) return;

    const contactHeader = contactSection.querySelector('.contact-header');
    const formGroups = contactSection.querySelectorAll('.form-group');
    const submitButton = contactSection.querySelector('.contact-button');
    const infoItems = contactSection.querySelectorAll('.info-item');
    const socialMedia = contactSection.querySelector('.social-media');

    anime.set([contactHeader, formGroups, submitButton, infoItems, socialMedia], {
        opacity: 1,
        translateY: 0,
        translateX: 0
    });

    if ('IntersectionObserver' in window) {
        anime.set(contactHeader, {
            opacity: 0,
            translateY: 30
        });

        anime.set(formGroups, {
            opacity: 0,
            translateY: 20
        });

        anime.set(submitButton, {
            opacity: 0,
            translateY: 20
        });

        anime.set(infoItems, {
            opacity: 0,
            translateX: 30
        });

        anime.set(socialMedia, {
            opacity: 0,
            translateY: 20
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: contactHeader,
                        opacity: 1,
                        translateY: 0,
                        easing: 'easeOutCubic',
                        duration: 800
                    });

                    anime({
                        targets: formGroups,
                        opacity: 1,
                        translateY: 0,
                        delay: anime.stagger(100),
                        easing: 'easeOutCubic',
                        duration: 600
                    });

                    anime({
                        targets: submitButton,
                        opacity: 1,
                        translateY: 0,
                        easing: 'easeOutCubic',
                        duration: 600,
                        delay: 400
                    });

                    anime({
                        targets: infoItems,
                        opacity: 1,
                        translateX: 0,
                        delay: anime.stagger(150, {start: 300}),
                        easing: 'easeOutCubic',
                        duration: 800
                    });

                    anime({
                        targets: socialMedia,
                        opacity: 1,
                        translateY: 0,
                        easing: 'easeOutCubic',
                        duration: 600,
                        delay: 800
                    });

                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(contactSection);
    }

    const formInputs = contactSection.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            anime({
                targets: this.parentElement,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        input.addEventListener('blur', function() {
            anime({
                targets: this.parentElement,
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });

    const socialIcons = contactSection.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.2,
                rotate: '5deg',
                duration: 300,
                easing: 'easeOutBack'
            });
        });

        icon.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotate: '0deg',
                duration: 300,
                easing: 'easeOutBack'
            });
        });
    });

    if (submitButton) {
        submitButton.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });

        submitButton.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });
    }
}

function setupDisappearingAnimations() {
    const contactSection = document.getElementById('contato');
    if (!contactSection) return;

    const elements = {
        header: contactSection.querySelector('.contact-header'),
        form: contactSection.querySelector('.contact-form'),
        info: contactSection.querySelector('.contact-info')
    };

    const disappearObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                anime({
                    targets: [elements.header, elements.form, elements.info],
                    opacity: [1, 0],
                    translateY: [0, -30],
                    easing: 'easeInCubic',
                    duration: 600,
                    delay: anime.stagger(100)
                });
            } else {
                anime({
                    targets: [elements.header, elements.form, elements.info],
                    opacity: [0, 1],
                    translateY: [-30, 0],
                    easing: 'easeOutCubic',
                    duration: 800,
                    delay: anime.stagger(150)
                });
            }
        });
    }, {
        threshold: 0.2
    });

    disappearObserver.observe(contactSection);
}