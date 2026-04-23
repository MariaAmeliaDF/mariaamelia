// ============================================
// EFEITO PARALLAX
// ============================================

document.addEventListener('mousemove', (e) => {
    const parallaxBg = document.getElementById('parallaxBg');
    const moveX = (e.clientX / window.innerWidth) * 20;
    const moveY = (e.clientY / window.innerHeight) * 20;
    
    parallaxBg.style.backgroundPosition = `${moveX}px ${moveY}px`;
});

// ============================================
// INTERATIVIDADE DA IMAGEM HERO
// ============================================

const heroImage = document.getElementById('heroImage');

if (heroImage) {
    heroImage.addEventListener('mousemove', (e) => {
        const rect = heroImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const rotateX = ((y / rect.height) - 0.5) * 10;
        const rotateY = ((x / rect.width) - 0.5) * -10;
        
        heroImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    heroImage.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// ============================================
// ANIMAÇÃO DO CORAÇÃO
// ============================================

const heart = document.querySelector('.heart');

if (heart) {
    heart.addEventListener('click', () => {
        heart.style.animation = 'none';
        setTimeout(() => {
            heart.style.animation = 'heartBeat 1.5s ease-in-out infinite';
        }, 10);
    });

    heart.addEventListener('mouseover', () => {
        heart.style.transform = 'scale(1.3) rotate(15deg)';
    });

    heart.addEventListener('mouseleave', () => {
        heart.style.transform = 'scale(1) rotate(0deg)';
    });
}

// ============================================
// FORMULÁRIO DE MENSAGEM
// ============================================

const messageForm = document.getElementById('messageForm');
const successMessage = document.getElementById('successMessage');

if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obter valores do formulário
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validação básica
        if (!name || !email || !message) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido!');
            return;
        }

        // Simular envio (em produção, seria uma chamada AJAX)
        console.log('Mensagem enviada:', { name, email, message });

        // Mostrar mensagem de sucesso
        messageForm.style.display = 'none';
        successMessage.style.display = 'block';

        // Limpar formulário
        messageForm.reset();

        // Restaurar formulário após 5 segundos
        setTimeout(() => {
            messageForm.style.display = 'flex';
            successMessage.style.display = 'none';
        }, 5000);
    });
}

// ============================================
// SCROLL REVEAL - REVELAR ELEMENTOS AO ROLAR
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar seções
document.querySelectorAll('.about, .social-section, .message-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// ============================================
// EFEITO HOVER NOS LINKS SOCIAIS
// ============================================

const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 100;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ANIMAÇÃO DO TÍTULO PRINCIPAL
// ============================================

const mainTitle = document.getElementById('mainTitle');

if (mainTitle) {
    const titleText = mainTitle.textContent;
    mainTitle.textContent = '';
    
    let index = 0;
    const typeInterval = setInterval(() => {
        if (index < titleText.length) {
            mainTitle.textContent += titleText[index];
            index++;
        } else {
            clearInterval(typeInterval);
        }
    }, 80);
}

// ============================================
// EFEITO DE DIGITAÇÃO NO LOGO DO RODAPÉ
// ============================================

const footerLogo = document.getElementById('footerLogo');

if (footerLogo) {
    footerLogo.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(0) invert(1) drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))';
    });

    footerLogo.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(0) invert(1)';
    });
}

// ============================================
// DETECÇÃO DE MOVIMENTO DO MOUSE PARA PARALLAX AVANÇADO
// ============================================

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Aplicar efeito parallax aos elementos
function updateParallax() {
    const elements = document.querySelectorAll('[data-parallax]');
    
    elements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        const yPos = -(mouseY * speed);
        const xPos = -(mouseX * speed);
        
        element.style.transform = `translate(${xPos * 0.1}px, ${yPos * 0.1}px)`;
    });
    
    requestAnimationFrame(updateParallax);
}

updateParallax();

// ============================================
// CARREGAMENTO PROGRESSIVO DE IMAGENS
// ============================================

const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });

    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-out';
    }
});

// ============================================
// VALIDAÇÃO DE FORMULÁRIO EM TEMPO REAL
// ============================================

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

if (nameInput) {
    nameInput.addEventListener('input', () => {
        if (nameInput.value.length > 0) {
            nameInput.style.borderColor = 'var(--primary-green)';
        }
    });
}

if (emailInput) {
    emailInput.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = 'var(--primary-green)';
        } else if (emailInput.value.length > 0) {
            emailInput.style.borderColor = '#ff6b6b';
        }
    });
}

if (messageInput) {
    messageInput.addEventListener('input', () => {
        if (messageInput.value.length > 0) {
            messageInput.style.borderColor = 'var(--primary-green)';
        }
    });
}

// ============================================
// EFEITO DE SCROLL PARALLAX PARA HERO
// ============================================

window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    const scrollPosition = window.scrollY;
    
    if (hero && scrollPosition < window.innerHeight) {
        hero.style.opacity = 1 - (scrollPosition / window.innerHeight) * 0.3;
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ============================================
// INICIALIZAÇÃO
// ============================================

console.log('Landing Page Maria Amélia carregada com sucesso!');
