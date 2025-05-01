document.addEventListener('DOMContentLoaded', () => {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 导航栏滚动效果
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // 内容卡片动画
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-card').forEach(card => {
        observer.observe(card);
    });

    // 副标题动态感叹号+emoji动画+文案切换
    const subtitle = document.querySelector('.hero-subtitle');
    const subtitleDefault = document.querySelector('.subtitle-default');
    const subtitleHover = document.querySelector('.subtitle-hover');
    const exclamations = document.querySelector('.subtitle-exclamations');
    const subtitleExtraDefault = document.querySelector('.subtitle-extra-default');
    const subtitleExtraHover = document.querySelector('.subtitle-extra-hover');
    let exclamationInterval = null;
    let exclamationCount = 0;
    const emojis = ['✨','😃','🎉','🌈','🔥','🥳','💡','🦄','🤩','💫','🎈','🧠','🌟','🫧','🦋'];
    function createEmoji() {
        const emoji = document.createElement('span');
        emoji.className = 'emoji-float';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        // 范围更大
        const offset = (Math.random() - 0.5) * 320;
        emoji.style.left = `calc(50% + ${offset}px)`;
        emoji.style.top = `${-Math.random() * 30}px`;
        subtitle.appendChild(emoji);
        setTimeout(() => {
            emoji.remove();
        }, 1400);
    }
    function startExclamations() {
        if (exclamationInterval) return;
        exclamationCount = 0;
        subtitleDefault.style.display = 'none';
        subtitleHover.style.display = '';
        subtitleExtraDefault.style.display = 'none';
        subtitleExtraHover.style.display = '';
        exclamationInterval = setInterval(() => {
            exclamationCount = (exclamationCount + 1) % 7;
            exclamations.textContent = '!'.repeat(exclamationCount);
            createEmoji();
        }, 150);
    }
    function stopExclamations() {
        clearInterval(exclamationInterval);
        exclamationInterval = null;
        exclamations.textContent = '';
        subtitleDefault.style.display = '';
        subtitleHover.style.display = 'none';
        subtitleExtraDefault.style.display = '';
        subtitleExtraHover.style.display = 'none';
    }
    if (subtitle && exclamations) {
        subtitle.addEventListener('mouseenter', startExclamations);
        subtitle.addEventListener('mouseleave', stopExclamations);
    }
}); 