// ✨ ANIMATION MANAGER
// Handles animations and scroll effects

export class AnimationManager {
  constructor(animationType, delay = 100) {
    this.animationType = animationType;
    this.delay = delay;
    this.animations = ['fade-in', 'slide-up', 'floating', 'bounce', 'glow', 'none'];
  }

  applyAnimations() {
    if (this.animationType === 'none') {
      console.log('✨ Animations disabled');
      return;
    }

    // Apply animation class to body
    document.body.classList.add(`animation-${this.animationType}`);

    // Animate sections with stagger effect
    const sections = document.querySelectorAll('section, .profile-container, .stats-container');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('animate-in');
      }, index * this.delay);
    });

    // Animate repo cards with stagger - smoother timing
    const repoCards = document.querySelectorAll('.repo-card');
    repoCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, sections.length * this.delay + index * 75);
    });

    console.log('✨ Animations applied:', this.animationType);
  }

  addFloatingEffect(selector = '.repo-card') {
    if (this.animationType !== 'floating') return;

    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.1}s`;
    });
  }

  addHoverEffects() {
    // Add hover listeners for enhanced effects
    const cards = document.querySelectorAll('.repo-card, .stat-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        this.createParticles(e.target);
      });
    });
  }

  createParticles(element) {
    if (this.animationType === 'glow') {
      element.classList.add('particle-effect');
      setTimeout(() => {
        element.classList.remove('particle-effect');
      }, 600);
    }
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const elements = document.querySelectorAll('.repo-card, .stat-card, section');
    elements.forEach(element => {
      observer.observe(element);
    });
  }

  enableParallax() {
    if (this.animationType === 'none') return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.profile-avatar');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  setAnimationType(type) {
    if (this.animations.includes(type)) {
      this.animationType = type;
      this.applyAnimations();
    }
  }
}
