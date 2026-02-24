// 🎨 RENDERER
// Handles rendering of all components

import { renderProfile } from '../components/Profile.js';
import { renderStats } from '../components/Stats.js';
import { renderRepoCards } from '../components/RepoCards.js';
import { renderContributionsAlt } from '../components/Contributions.js';

export class Renderer {
  constructor(config) {
    this.config = config;
  }

  async renderProfile(userData) {
    const container = document.getElementById('profile');
    const html = renderProfile(userData, this.config);
    container.innerHTML = html;
  }

  async renderStats(userData, repos) {
    if (!this.config.sections.stats) {
      document.getElementById('stats').style.display = 'none';
      return;
    }

    const container = document.getElementById('stats');
    const html = renderStats(userData, repos, this.config);
    container.innerHTML = html;
  }

  async renderContributions(username) {
    const container = document.getElementById('contributionsContainer');
    const html = renderContributionsAlt(username);
    container.innerHTML = html;
  }

  async renderProfileViews(username, theme = 'dark') {
    const viewCount = document.getElementById('viewCount');
    if (!viewCount) return;

    // Map themes to badge colors
    const themeColors = {
      dark: 'blue',
      light: 'blue',
      neon: 'blueviolet',
      hacker: 'brightgreen'
    };
    
    const badgeColor = themeColors[theme] || 'blue';
    const badgeUrl = `https://komarev.com/ghpvc/?username=${username}&style=flat-square&color=${badgeColor}`;
    
    viewCount.innerHTML = `<img src="${badgeUrl}" alt="Profile Views" style="height: 20px; vertical-align: middle;">`;
  }

  async renderPinnedRepos(repos) {
    const container = document.getElementById('pinnedReposContainer');
    const html = renderRepoCards(repos, this.config);
    container.innerHTML = html;
  }

  async renderAllRepos(repos) {
    const container = document.getElementById('allReposContainer');
    const html = renderRepoCards(repos, this.config);
    container.innerHTML = html;
  }
}
