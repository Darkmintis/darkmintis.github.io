// MAIN APPLICATION ENTRY POINT
// Orchestrates the entire profile generation flow

import { GitHubAPI } from './github.js';
import { ThemeManager } from './theme.js';
import { AnimationManager } from './animations.js';
import { Renderer } from './renderer.js';

class ProfileEngine {
  constructor() {
    // Ensure config is available
    if (!globalThis.config?.username) {
      throw new Error('Config not loaded. Please ensure config.js is loaded before app.js');
    }
    
    this.config = globalThis.config;
    this.github = new GitHubAPI(this.config.username, this.config.githubToken);
    this.theme = new ThemeManager(this.config.theme);
    this.animations = new AnimationManager(this.config.animation, this.config.settings.animationDelay);
    this.renderer = new Renderer(this.config);
  }

  async init() {
    try {
      console.log('🚀 Initializing Profile Engine...');
      
      // Step 1: Apply theme
      this.theme.applyTheme();
      console.log('✅ Theme applied:', this.config.theme);

      // Step 2: Fetch GitHub user data
      const userData = await this.github.fetchUserData();
      console.log('✅ User data fetched:', userData.login);
      
      // Step 3: Update favicon with user's profile image
      this.updateFavicon(userData.avatar_url);

      // Step 4: Fetch repositories
      const repos = await this.github.fetchRepositories();
      console.log('✅ Repositories fetched:', repos.length);

      // Step 4: Sort and process repos
      const sortedRepos = this.sortRepositories(repos);
      const pinnedRepos = this.getPinnedRepos(sortedRepos);
      const allRepos = this.getAllRepos(sortedRepos);

      // Step 5: Render everything
      await this.renderer.renderProfile(userData);
      await this.renderer.renderStats(userData, repos);
      
      // Render contributions graph
      if (this.config.sections.contributions) {
        await this.renderer.renderContributions(this.config.username);
      } else {
        document.getElementById('contributions').style.display = 'none';
      }
      
      // Render profile views counter with theme color
      await this.renderer.renderProfileViews(this.config.username, this.config.theme);
      
      if (this.config.sections.pinnedRepos && pinnedRepos.length > 0) {
        await this.renderer.renderPinnedRepos(pinnedRepos);
      } else {
        document.getElementById('pinnedRepos').style.display = 'none';
      }
      
      if (this.config.sections.allRepos) {
        await this.renderer.renderAllRepos(allRepos);
      } else {
        document.getElementById('allRepos').style.display = 'none';
      }

      // Step 6: Apply animations
      this.animations.applyAnimations();
      console.log('✅ Animations applied');

      // Step 7: Setup interactivity
      this.setupInteractivity();

      // Step 8: Show app, hide loading
      this.showApp();
      console.log('✅ Profile Engine initialized successfully!');

    } catch (error) {
      console.error('❌ Error initializing Profile Engine:', error);
      this.showError(error.message);
    }
  }

  sortRepositories(repos) {
    const sortBy = this.config.layout.sortReposBy;
    
    return repos.sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'updated':
          return new Date(b.updated_at) - new Date(a.updated_at);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return b.stargazers_count - a.stargazers_count;
      }
    });
  }

  getPinnedRepos(sortedRepos) {
    const pinnedNames = this.config.pinnedRepos;
    
    if (pinnedNames && pinnedNames.length > 0) {
      return pinnedNames
        .map(name => sortedRepos.find(repo => repo.name === name))
        .filter(repo => repo !== undefined);
    }
    
    // Auto-select top repos by stars
    return sortedRepos.slice(0, 6);
  }

  getAllRepos(sortedRepos) {
    const maxRepos = this.config.settings.maxReposToShow;
    return sortedRepos.slice(0, maxRepos);
  }

  setupInteractivity() {
    // Theme toggle
    if (this.config.features.darkModeToggle) {
      const toggle = document.getElementById('themeToggle');
      if (toggle) {
        toggle.addEventListener('click', () => {
          this.theme.toggleTheme();
        });
      }
    }

    // Scroll effects
    if (this.config.settings.enableScrollEffects) {
      this.setupScrollEffects();
    }
  }

  setupScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  }

  showApp() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('app').style.display = 'block';
  }

  showError(message) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'flex';
    document.getElementById('errorMessage').textContent = message;
  }

  updateFavicon(avatarUrl) {
    // Remove old favicon
    const oldFavicon = document.querySelector('link[rel="icon"]');
    if (oldFavicon) {
      oldFavicon.remove();
    }
    
    // Add new favicon with user's avatar
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = avatarUrl;
    document.head.appendChild(link);
  }
}

// Initialize when DOM and config are ready
function initApp() {
  // Wait for config to be available
  if (globalThis.config === undefined) {
    console.log('⏳ Waiting for config to load...');
    setTimeout(initApp, 50);
    return;
  }
  
  try {
    const engine = new ProfileEngine();
    engine.init();
  } catch (error) {
    console.error('Failed to initialize:', error);
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'flex';
    document.getElementById('errorMessage').textContent = error.message;
  }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

export { ProfileEngine };
