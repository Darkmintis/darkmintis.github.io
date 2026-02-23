// 🎨 THEME MANAGER
// Handles theme switching and persistence

export class ThemeManager {
  constructor(initialTheme) {
    this.currentTheme = initialTheme;
    this.themes = ['dark', 'light', 'neon', 'hacker', 'glass', 'gradient'];
    this.loadSavedTheme();
  }

  loadSavedTheme() {
    const savedTheme = localStorage.getItem('github-profile-theme');
    if (savedTheme && this.themes.includes(savedTheme)) {
      this.currentTheme = savedTheme;
    }
  }

  applyTheme(theme = this.currentTheme) {
    // Remove all theme classes
    this.themes.forEach(t => {
      document.body.classList.remove(`theme-${t}`);
    });

    // Add current theme class
    document.body.classList.add(`theme-${theme}`);
    this.currentTheme = theme;

    // Save to localStorage
    localStorage.setItem('github-profile-theme', theme);

    // Update theme toggle icon
    this.updateThemeIcon();

    console.log('🎨 Theme applied:', theme);
  }

  toggleTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    const nextTheme = this.themes[nextIndex];
    
    this.applyTheme(nextTheme);
    
    // Show theme notification
    this.showThemeNotification(nextTheme);
  }

  updateThemeIcon() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    const icons = {
      dark: '🌙',
      light: '☀️',
      neon: '✨',
      hacker: '💻',
      glass: '💎',
      gradient: '🌈',
    };

    const icon = toggle.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = icons[this.currentTheme] || '🎨';
    }
  }

  showThemeNotification(theme) {
    // Remove existing notification
    const existing = document.querySelector('.theme-notification');
    if (existing) {
      existing.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.textContent = `Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`;
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    // Hide and remove after 2 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 2000);
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  setTheme(theme) {
    if (this.themes.includes(theme)) {
      this.applyTheme(theme);
    } else {
      console.warn(`Theme "${theme}" not found. Available themes:`, this.themes);
    }
  }
}
