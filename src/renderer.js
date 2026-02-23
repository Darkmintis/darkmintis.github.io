// 🎨 RENDERER
// Handles rendering of all components

import { renderProfile } from '../components/Profile.js';
import { renderStats } from '../components/Stats.js';
import { renderRepoCards } from '../components/RepoCards.js';

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
