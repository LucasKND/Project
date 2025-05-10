document.addEventListener('DOMContentLoaded', function() {
    // Textos do carrossel
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
    
    // Elementos
    const carouselTextElement = document.getElementById('carousel-text');
    let currentTextIndex = 0;
    const transitionDelay = 6000; // 6 segundos para cada texto
    const fadeTime = 500; // 500ms para o efeito de fade
    
    // Iniciar com o primeiro texto
    carouselTextElement.textContent = carouselTexts[0];
    
    // Função para mudar o texto com fade
    function changeText() {
        // Adicionar classe de fade out
        carouselTextElement.classList.add('fade');
        
        // Após a animação de fade out, mudar o texto e fazer fade in
        setTimeout(() => {
            // Avançar para o próximo texto
            currentTextIndex = (currentTextIndex + 1) % carouselTexts.length;
            
            // Mudar o texto
            carouselTextElement.textContent = carouselTexts[currentTextIndex];
            
            // Remover classe de fade para que o texto apareça
            carouselTextElement.classList.remove('fade');
        }, fadeTime);
    }
    
    // Iniciar o intervalo para trocar os textos de forma consistente
    let carouselInterval = setInterval(changeText, transitionDelay);
    
    // Parar e reiniciar o carrossel quando a página não estiver visível
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(carouselInterval);
        } else {
            // Limpar qualquer intervalo existente antes de criar um novo
            clearInterval(carouselInterval);
            carouselInterval = setInterval(changeText, transitionDelay);
        }
    });
    
    // Navegação responsiva
    const navigationBar = document.querySelector('.navigation-bar');
    const navToggleBtn = document.querySelector('.nav-toggle-btn');
    const navCloseBtn = document.querySelector('.nav-close-btn');
    
    // Função para colapsar a navegação
    function collapseNav() {
        navigationBar.classList.add('collapsed');
        navigationBar.classList.remove('expanded');
    }
    
    // Função para expandir a navegação
    function expandNav() {
        navigationBar.classList.remove('collapsed');
        navigationBar.classList.add('expanded');
    }
    
    // Adicionar os event listeners para os botões
    if (navToggleBtn) {
        navToggleBtn.addEventListener('click', expandNav);
    }
    
    if (navCloseBtn) {
        navCloseBtn.addEventListener('click', collapseNav);
    }
    
    // Verificar tamanho da tela para aplicar o comportamento responsivo
    function checkScreenSize() {
        if (window.innerWidth <= 991) {
            // Em telas menores, iniciar com a navegação colapsada
            if (!navigationBar.classList.contains('expanded')) {
                collapseNav();
            }
        } else {
            // Em telas maiores, remover todas as classes específicas
            navigationBar.classList.remove('collapsed', 'expanded');
        }
    }
    
    // Verificar no carregamento e quando a tela for redimensionada
    window.addEventListener('load', checkScreenSize);
    window.addEventListener('resize', checkScreenSize);
    
    // Ajustar o tamanho do vídeo de fundo
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
    
    // Menu móvel
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

    // Animação de scroll para os cards
    const featureCard = document.querySelector('.feature-card');
    const highlightCard = document.querySelector('.highlight-card');
    let lastScrollTop = 0;
    const scrollSpeed = 0.3; // Mesma velocidade para ambos os cards
    
    // Função unificada para animar os dois cards durante o scroll
    function animateCardsOnScroll() {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calcular a posição Y dos cards baseado no scroll de forma mais suave
        if (st > 0) {
            // Mesmo limite de deslocamento para ambos os cards (300px)
            const scrollAmount = -Math.min(st * scrollSpeed, 300);
            
            // Aplicar a transformação ao card da imagem
            if (featureCard) {
                requestAnimationFrame(() => {
                    featureCard.style.transform = `translateY(${scrollAmount}px)`;
                });
            }
            
            // Aplicar a mesma transformação ao highlight card
            if (highlightCard) {
                requestAnimationFrame(() => {
                    highlightCard.style.transform = `translateY(${scrollAmount}px)`;
                });
            }
        } else {
            // Retorna à posição original quando volta ao topo
            if (featureCard) {
                featureCard.style.transform = 'translateY(0)';
            }
            if (highlightCard) {
                highlightCard.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = st <= 0 ? 0 : st;
    }

    // Adicionar evento de scroll com throttling para melhor performance
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

    // Animação para elementos aparecerem com scroll
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
                
                // Remover o listener depois que as animações são ativadas
                window.removeEventListener('scroll', checkScroll);
            }
        };
        
        // Verificar logo no carregamento caso a seção já esteja visível
        checkScroll();
        
        // Adicionar evento de scroll para verificar quando a seção estiver visível
        window.addEventListener('scroll', checkScroll, { passive: true });
    }
    
    // Iniciar a animação com scroll
    window.addEventListener('load', animateOnScroll);

    // Funcionalidade de amenidades
    const amenityItems = document.querySelectorAll('.amenity-item');
    const amenityImages = document.querySelectorAll('.amenity-image');
    let currentAmenityIndex = 0;
    let isManualSelection = false;
    let autoAdvanceTimeout;

    // Função para selecionar uma amenidade
    function selectAmenity(index, isManual = false) {
        // Limpar seleção atual
        amenityItems.forEach(item => {
            item.classList.remove('active');
            const progressBar = item.querySelector('.progress-bar');
            progressBar.style.width = '0';
        });
        
        amenityImages.forEach(image => {
            image.classList.remove('active');
        });
        
        // Ativar a nova seleção
        const selectedItem = amenityItems[index];
        selectedItem.classList.add('active');
        
        // Forçar um reflow antes de adicionar a animação para garantir que seja visível
        selectedItem.querySelector('.progress-bar').getBoundingClientRect();
        
        // Definir explicitamente o progresso da barra visualmente
        const progressBar = selectedItem.querySelector('.progress-bar');
        progressBar.style.transition = 'none';
        progressBar.style.width = '0';
        
        // Forçar outro reflow antes de iniciar a animação
        progressBar.getBoundingClientRect();
        
        // Iniciar a animação de preenchimento da barra
        progressBar.style.transition = 'width 4.8s linear';
        progressBar.style.width = '100%';
        
        amenityImages[index].classList.add('active');
        
        // Atualizar índice atual
        currentAmenityIndex = index;
        
        // Se foi seleção manual, parar o avanço automático temporariamente
        if (isManual) {
            isManualSelection = true;
            clearTimeout(autoAdvanceTimeout);
            
            // Reiniciar o avanço automático após um tempo
            setTimeout(() => {
                isManualSelection = false;
                scheduleNextAmenity();
            }, 8000); // Permite que o usuário veja a seleção manual por 8 segundos
        }
    }
    
    // Função para avançar para a próxima amenidade
    function advanceToNextAmenity() {
        if (isManualSelection) return;
        
        const nextIndex = (currentAmenityIndex + 1) % amenityItems.length;
        selectAmenity(nextIndex);
        scheduleNextAmenity();
    }
    
    // Agendar o próximo avanço
    function scheduleNextAmenity() {
        clearTimeout(autoAdvanceTimeout);
        autoAdvanceTimeout = setTimeout(advanceToNextAmenity, 5000); // 5 segundos para cada amenidade
    }
    
    // Adicionar event listeners para cliques manuais
    amenityItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            selectAmenity(index, true);
        });
    });
    
    // Iniciar o carrossel de amenidades
    selectAmenity(0);
    scheduleNextAmenity();

    // Scroll Hijacking para a seção de amenidades - versão aprimorada
    function setupScrollHijacking() {
        // Elementos que vamos manipular
        const amenitiesSection = document.querySelector('.amenities-section');
        const amenitiesList = document.querySelector('.amenities-list');
        const amenityItems = document.querySelectorAll('.amenity-item');
        const body = document.body;
        
        // Variáveis de controle
        let isScrollHijackActive = false;
        let lastScrollTime = 0;
        let sectionHeight = 0;
        let sectionTop = 0;
        let isLastItemVisible = false;
        let originalSectionPosition = 0;
        const scrollCooldown = 100;
        const scrollAmount = 80;
        
        // Função para atualizar as dimensões da seção
        function updateSectionDimensions() {
            const rect = amenitiesSection.getBoundingClientRect();
            sectionTop = window.pageYOffset + rect.top;
            sectionHeight = rect.height;
            originalSectionPosition = sectionTop;
        }
        
        // Atualizar dimensões quando a página carregar ou redimensionar
        window.addEventListener('load', updateSectionDimensions);
        window.addEventListener('resize', updateSectionDimensions);
        
        // Função para verificar se a seção está na posição exata para fixar
        function shouldFixSection() {
            const scrollPosition = window.pageYOffset;
            return scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight);
        }
        
        // Função para verificar se o último item está visível
        function checkIfLastItemVisible() {
            const lastItem = amenityItems[amenityItems.length - 1];
            const rect = lastItem.getBoundingClientRect();
            const listRect = amenitiesList.getBoundingClientRect();
            
            // Verificar se o último item está visível no final da lista
            isLastItemVisible = rect.bottom <= listRect.bottom + 20;
            return isLastItemVisible;
        }
        
        // Função para ativar o scroll hijacking
        function activateScrollHijack() {
            if (!isScrollHijackActive) {
                isScrollHijackActive = true;
                
                // Fixa a seção na tela
                amenitiesSection.classList.add('fixed');
                body.style.paddingTop = `${sectionHeight}px`;
                
                // Adiciona classe visual para indicar que o scroll está sendo hijacked
                body.classList.add('scroll-hijack-active');
            }
        }
        
        // Função para desativar o scroll hijacking
        function deactivateScrollHijack() {
            if (isScrollHijackActive) {
                isScrollHijackActive = false;
                
                // Remove a fixação da seção
                amenitiesSection.classList.remove('fixed');
                body.style.paddingTop = '0';
                
                // Remove a classe visual
                body.classList.remove('scroll-hijack-active');
                
                // Só permitir desativar quando o último item for visível
                if (isLastItemVisible) {
                    // Posicionar a janela para continuar a partir do final da seção
                    window.scrollTo({
                        top: originalSectionPosition + sectionHeight,
                        behavior: 'auto'
                    });
                }
            }
        }
        
        // Função principal para lidar com o scroll
        function handleScroll(event) {
            // Verifica se deve fixar a seção
            if (shouldFixSection()) {
                // Verifica se já está no fim da lista
                if (checkIfLastItemVisible() && event.deltaY > 0) {
                    deactivateScrollHijack();
                    return;
                }
                
                // Ativa o hijack do scroll
                activateScrollHijack();
                
                // Verifica se pode rolar (cooldown)
                const now = Date.now();
                if (now - lastScrollTime < scrollCooldown) {
                    event.preventDefault();
                    return;
                }
                
                // Determina a direção do scroll
                const delta = Math.sign(event.deltaY);
                
                if (delta > 0) {
                    // Scroll para baixo - rola a lista para cima
                    amenitiesList.scrollBy({
                        top: scrollAmount,
                        behavior: 'smooth'
                    });
                    
                    // Previne o scroll normal da página para manter a posição fixa
                    event.preventDefault();
                } else if (delta < 0) {
                    // Scroll para cima - rola a lista para baixo
                    if (amenitiesList.scrollTop <= 0) {
                        // Se já está no topo da lista e o usuário continua rolando para cima
                        deactivateScrollHijack();
                    } else {
                        amenitiesList.scrollBy({
                            top: -scrollAmount,
                            behavior: 'smooth'
                        });
                        
                        // Previne o scroll normal da página
                        event.preventDefault();
                    }
                }
                
                lastScrollTime = now;
            } else if (isScrollHijackActive) {
                // Se a seção não está mais na posição certa, desativa o hijack
                deactivateScrollHijack();
            }
        }
        
        // Suporte para dispositivos touch
        let touchStartY = 0;
        
        function handleTouchStart(event) {
            touchStartY = event.touches[0].clientY;
        }
        
        function handleTouchMove(event) {
            if (!shouldFixSection()) return;
            
            // Ativa o hijack do scroll
            activateScrollHijack();
            
            const touchY = event.touches[0].clientY;
            const diff = touchStartY - touchY;
            
            // Verifica se pode rolar (cooldown)
            const now = Date.now();
            if (now - lastScrollTime < scrollCooldown) {
                event.preventDefault();
                return;
            }
            
            // Determina a direção do toque com um limiar mínimo
            if (Math.abs(diff) > 10) {
                if (diff > 0) {
                    // Toque para baixo - rola a lista para cima
                    if (checkIfLastItemVisible()) {
                        deactivateScrollHijack();
                    } else {
                        amenitiesList.scrollBy({
                            top: scrollAmount,
                            behavior: 'smooth'
                        });
                        
                        // Previne o scroll normal da página
                        event.preventDefault();
                    }
                } else {
                    // Toque para cima - rola a lista para baixo
                    if (amenitiesList.scrollTop <= 0) {
                        deactivateScrollHijack();
                    } else {
                        amenitiesList.scrollBy({
                            top: -scrollAmount,
                            behavior: 'smooth'
                        });
                        
                        // Previne o scroll normal da página
                        event.preventDefault();
                    }
                }
                
                lastScrollTime = now;
                touchStartY = touchY;
            }
        }
        
        // Adiciona o listener de scroll com passive: false para permitir preventDefault
        window.addEventListener('wheel', handleScroll, { passive: false });
        
        // Adiciona suporte touch
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    // Inicializa o scroll hijacking
    setupScrollHijacking();

    // Função aprimorada para verificar se um elemento está visível na viewport
    function isElementInViewport(el, offset = 0) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
            rect.bottom >= 0 + offset &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) - offset &&
            rect.right >= 0 + offset
        );
    }

    // Função para inicializar as animações de amenidades
    function initAmenitiesAnimations() {
        const amenitiesSection = document.querySelector('.new-amenities-section');
        if (!amenitiesSection) return;

        const title = amenitiesSection.querySelector('.new-amenities-title h2');
        const amenityItems = Array.from(amenitiesSection.querySelectorAll('.new-amenity-item'));
        const amenityImages = Array.from(amenitiesSection.querySelectorAll('.new-amenity-image'));
        const cta = amenitiesSection.querySelector('.new-amenities-cta');
        
        // Definir índices para animação em cascata
        amenityItems.forEach((item, index) => {
            item.style.setProperty('--item-index', index);
        });

        // Função para animar elementos quando visíveis
        function animateElementsInView() {
            if (isElementInViewport(amenitiesSection, 100)) {
                title?.classList.add('fade-in');
                
                // Animação em cascata para os itens
                amenityItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, 100 * (index + 1));
                });
                
                // Animar o primeiro item e a imagem por padrão
                if (amenityItems.length > 0 && amenityImages.length > 0) {
                    setTimeout(() => {
                        amenityItems[0].classList.add('active');
                        amenityImages[0].classList.add('active', 'fade-in');
                    }, 300);
                }
                
                // Animar o CTA com um pequeno atraso
                setTimeout(() => {
                    cta?.classList.add('fade-in');
                }, 200 + (amenityItems.length * 100));
                
                // Remover o listener após a animação
                window.removeEventListener('scroll', animateElementsInView);
            }
        }

        // Gerenciar interatividade entre itens e imagens
        amenityItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                // Remover classes ativas de todos os itens e imagens
                amenityItems.forEach(i => i.classList.remove('active'));
                amenityImages.forEach(img => {
                    img.classList.remove('active', 'fade-in');
                });
                
                // Adicionar classes ativas ao item atual e à imagem correspondente
                item.classList.add('active');
                if (amenityImages[index]) {
                    amenityImages[index].classList.add('active', 'fade-in');
                }
            });
        });

        // Iniciar animações quando a página carrega se já estiver visível
        if (isElementInViewport(amenitiesSection, 100)) {
            animateElementsInView();
        } else {
            window.addEventListener('scroll', animateElementsInView);
        }
    }

    // Função para animar todos os elementos ao scroll
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
        
        // Verificar elementos visíveis no carregamento
        window.addEventListener('load', checkScroll);
        // Verificar elementos visíveis durante o scroll
        window.addEventListener('scroll', checkScroll);
    }

    // Inicializar animações
    initAmenitiesAnimations();
    initScrollAnimations();

    // Implementação performática para as amenidades
    initAmenitiesSection();
});

/**
 * Inicializa a seção de amenidades com interações otimizadas
 */
function initAmenitiesSection() {
    const section = document.querySelector('.new-amenities-section');
    if (!section) return;

    const amenityItems = section.querySelectorAll('.new-amenity-item');
    const amenityImages = section.querySelectorAll('.new-amenity-image');
    const title = section.querySelector('.new-amenities-title');
    const cta = section.querySelector('.new-amenities-cta');

    // Função para ativar um item e sua imagem correspondente
    function activateItem(index) {
        // Desativa todos os itens e imagens
        amenityItems.forEach(item => item.classList.remove('active'));
        amenityImages.forEach(img => img.classList.remove('active'));
        
        // Ativa apenas o item e imagem correspondentes ao índice
        amenityItems[index].classList.add('active');
        amenityImages[index].classList.add('active');
    }

    // Adiciona os event listeners com delegação de eventos para melhor performance
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

    // Adiciona animações de entrada usando IntersectionObserver para performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === title || entry.target === cta) {
                    entry.target.classList.add('fade-in');
                } else {
                    // Animação em cascata para os itens
                    const items = Array.from(amenityItems);
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('fade-in');
                        }, 100 * index);
                    });
                }
                // Desconecta o observer após a animação
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observa os elementos para animações
    observer.observe(title);
    observer.observe(amenitiesList);
    observer.observe(cta);

    // Define o primeiro item como ativo por padrão
    activateItem(0);
}

// Função otimizada para a seção de amenidades
function initNewAmenitiesSection() {
    const amenityItems = document.querySelectorAll('.new-amenity-item');
    const amenityImages = document.querySelectorAll('.new-amenity-image');

    // Função para ativar um item específico
    function activateItem(index) {
        // Remover classes ativas de todos os itens e imagens
        amenityItems.forEach(item => item.classList.remove('active'));
        amenityImages.forEach(img => img.classList.remove('active'));
        
        // Adicionar classe ativa ao item e imagem correspondente
        amenityItems[index].classList.add('active');
        amenityImages[index].classList.add('active');
    }

    // Adicionar event listeners para os itens
    amenityItems.forEach((item, index) => {
        // Ao passar o mouse sobre o item
        item.addEventListener('mouseenter', () => {
            activateItem(index);
        });
        
        // Também ativar ao clicar no item para dispositivos móveis
        item.addEventListener('click', () => {
            activateItem(index);
        });
    });

    // Ativar o primeiro item por padrão
    activateItem(0);

    // Implementar animação de entrada para os itens
    const animateItems = () => {
        amenityItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, index * 100);
        });
    };

    // Verificar se a seção está no viewport
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

// Função para a rolagem suave
function initSmoothScroll() {
    // Seleciona todos os links que começam com #
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Previne o comportamento padrão do link
            e.preventDefault();
            
            // Obtém o alvo do link
            const targetId = this.getAttribute('href');
            
            // Retorna se o link é apenas "#"
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Faz a rolagem suave até o elemento
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Iniciar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar a nova seção de amenidades
    initNewAmenitiesSection();
    
    // Inicializar a rolagem suave
    initSmoothScroll();
});

// Contact Section Animations with anime.js
function initContactAnimations() {
    const contactSection = document.getElementById('contato');
    if (!contactSection) return;

    // Elements to animate
    const contactHeader = contactSection.querySelector('.contact-header');
    const formGroups = contactSection.querySelectorAll('.form-group');
    const submitButton = contactSection.querySelector('.contact-button');
    const infoItems = contactSection.querySelectorAll('.info-item');
    const socialMedia = contactSection.querySelector('.social-media');

    // Make sure elements are visible by default - this ensures content appears even without animations
    anime.set([contactHeader, formGroups, submitButton, infoItems, socialMedia], {
        opacity: 1,
        translateY: 0,
        translateX: 0
    });

    // Prepare for animation only if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        // Setup initial animation state only when observer is created
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

        // Intersection Observer to trigger animations when section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate header first
                    anime({
                        targets: contactHeader,
                        opacity: 1,
                        translateY: 0,
                        easing: 'easeOutCubic',
                        duration: 800
                    });

                    // Then animate form groups with staggered delay
                    anime({
                        targets: formGroups,
                        opacity: 1,
                        translateY: 0,
                        delay: anime.stagger(100),
                        easing: 'easeOutCubic',
                        duration: 600
                    });

                    // Animate submit button
                    anime({
                        targets: submitButton,
                        opacity: 1,
                        translateY: 0,
                        easing: 'easeOutCubic',
                        duration: 600,
                        delay: 400
                    });

                    // Animate info items with staggered delay
                    anime({
                        targets: infoItems,
                        opacity: 1,
                        translateX: 0,
                        delay: anime.stagger(150, {start: 300}),
                        easing: 'easeOutCubic',
                        duration: 800
                    });

                    // Animate social media last
                    anime({
                        targets: socialMedia,
                        opacity: 1,
                        translateY: 0,
                        easing: 'easeOutCubic',
                        duration: 600,
                        delay: 800
                    });

                    // Disconnect observer after triggering animations
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(contactSection);
    }

    // Add hover animations for form elements
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

    // Add hover animations for social media icons
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

    // Add animation for submit button
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

// Disappearing animations when scrolling away
function setupDisappearingAnimations() {
    const contactSection = document.getElementById('contato');
    if (!contactSection) return;

    const elements = {
        header: contactSection.querySelector('.contact-header'),
        form: contactSection.querySelector('.contact-form'),
        info: contactSection.querySelector('.contact-info')
    };

    // Observer for triggering disappearing animations
    const disappearObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // When scrolling away, fade out elements
                anime({
                    targets: [elements.header, elements.form, elements.info],
                    opacity: [1, 0],
                    translateY: [0, -30],
                    easing: 'easeInCubic',
                    duration: 600,
                    delay: anime.stagger(100)
                });
            } else {
                // When coming back into view, fade in elements
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
        threshold: 0.1,
        rootMargin: '-20% 0px'
    });

    disappearObserver.observe(contactSection);
}

// Animações para a seção de amenidades com anime.js
function initAmenitiesAnimeAnimations() {
    const amenitiesSection = document.querySelector('.new-amenities-section');
    if (!amenitiesSection) return;

    // Elementos para animar
    const amenitiesTitle = amenitiesSection.querySelector('.new-amenities-title h2');
    const amenityItems = amenitiesSection.querySelectorAll('.new-amenity-item');
    const amenityImages = amenitiesSection.querySelector('.new-amenities-images');
    const amenitiesCta = amenitiesSection.querySelector('.new-amenities-cta');

    // Função para configurar estado inicial
    function resetAnimationState() {
        anime.set(amenitiesTitle, {
            opacity: 0,
            translateY: 30
        });

        anime.set(amenityItems, {
            opacity: 0,
            translateY: 20
        });

        anime.set(amenityImages, {
            opacity: 0,
            translateX: 30
        });

        anime.set(amenitiesCta, {
            opacity: 0,
            translateY: 20
        });
    }

    // Função para executar as animações
    function animateElements() {
        // Animar o título primeiro
        anime({
            targets: amenitiesTitle,
            opacity: 1,
            translateY: 0,
            easing: 'easeOutCubic',
            duration: 800
        });

        // Animar os itens de amenidades com delay escalonado
        anime({
            targets: amenityItems,
            opacity: 1,
            translateY: 0,
            delay: anime.stagger(100),
            easing: 'easeOutCubic',
            duration: 600
        });

        // Animar as imagens
        anime({
            targets: amenityImages,
            opacity: 1,
            translateX: 0,
            easing: 'easeOutCubic',
            duration: 800,
            delay: 300
        });

        // Animar o CTA por último
        anime({
            targets: amenitiesCta,
            opacity: 1,
            translateY: 0,
            easing: 'easeOutCubic',
            duration: 600,
            delay: 800
        });
    }

    // Inicializar o estado antes da primeira animação
    resetAnimationState();

    // Observer para disparar animações quando a seção estiver visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Quando a seção entra no viewport
            if (entry.isIntersecting) {
                // Animar os elementos
                animateElements();
            } else {
                // Quando a seção sai do viewport, resetamos o estado
                // para que possa ser animado novamente na próxima vez
                resetAnimationState();
            }
        });
    }, {
        threshold: 0.2,  // 20% da seção visível para disparar
        rootMargin: '-10% 0px'  // Margem para melhorar a experiência visual
    });

    // Iniciar a observação da seção
    observer.observe(amenitiesSection);

    // Adicionar animações de hover para os itens de amenidades
    amenityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });

        item.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });
    });
}

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for anime.js to be loaded and available
    if (typeof anime !== 'undefined') {
        initContactAnimations();
        setupDisappearingAnimations();
        initAmenitiesAnimeAnimations(); // Adicionando as novas animações
    } else {
        // If anime.js isn't loaded yet, wait for it
        window.addEventListener('load', function() {
            if (typeof anime !== 'undefined') {
                initContactAnimations();
                setupDisappearingAnimations();
                initAmenitiesAnimeAnimations(); // Adicionando as novas animações
            } else {
                console.error('anime.js library is not loaded');
            }
        });
    }
});