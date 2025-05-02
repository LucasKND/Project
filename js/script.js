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
});