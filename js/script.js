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
});