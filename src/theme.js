// THEME MANAGER
// Handles theme switching and persistence

export class ThemeManager {
  constructor(initialTheme) {
    this.currentTheme = initialTheme;
    this.themes = ['dark', 'light', 'neon', 'hacker'];
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

    console.log('Theme applied:', theme);
  }

  toggleTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    const nextTheme = this.themes[nextIndex];
    
    this.applyTheme(nextTheme);
  }

  updateThemeIcon() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    const icons = {
      dark: 'fa-moon',
      light: 'fa-sun',
      neon: 'fa-bolt',
      hacker: 'fa-terminal',
    };

    const icon = toggle.querySelector('.theme-icon');
    if (icon) {
      // Remove all icon classes
      icon.className = 'fas theme-icon';
      // Add the new icon class
      icon.classList.add(icons[this.currentTheme] || 'fa-palette');
    }
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
