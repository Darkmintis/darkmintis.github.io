// 🔌 GITHUB API INTEGRATION
// Handles all GitHub API calls using public endpoints

export class GitHubAPI {
  constructor(username, token = null) {
    this.username = username;
    this.token = token;
    this.baseURL = 'https://api.github.com';
    this.cache = new Map();
  }

  getHeaders() {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }
    
    return headers;
  }

  async checkRateLimit() {
    try {
      const response = await fetch(`${this.baseURL}/rate_limit`, {
        headers: this.getHeaders()
      });
      const data = await response.json();
      return data.rate;
    } catch {
      return null;
    }
  }

  async fetchUserData() {
    const cacheKey = `user_${this.username}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const url = `${this.baseURL}/users/${this.username}`;
      console.log('🔍 Fetching user data from:', url);
      
      const response = await fetch(url, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`GitHub user "${this.username}" not found`);
        }
        if (response.status === 403) {
          const rateLimit = await this.checkRateLimit();
          if (rateLimit?.remaining === 0) {
            const resetDate = new Date(rateLimit.reset * 1000);
            throw new Error(
              `GitHub API rate limit exceeded. ` +
              `Resets at ${resetDate.toLocaleTimeString()}. ` +
              `Add a GitHub token in config.js to increase limit from 60 to 5000 requests/hour. ` +
              `Get token at: https://github.com/settings/tokens/new`
            );
          }
        }
        throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.cache.set(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching user data:', error);
      throw error;
    }
  }

  async fetchRepositories() {
    const cacheKey = `repos_${this.username}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const url = `${this.baseURL}/users/${this.username}/repos?per_page=100&sort=updated`;
      console.log('🔍 Fetching repositories from:', url);
      
      const response = await fetch(url, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        if (response.status === 403) {
          const rateLimit = await this.checkRateLimit();
          if (rateLimit?.remaining === 0) {
            const resetDate = new Date(rateLimit.reset * 1000);
            throw new Error(
              `GitHub API rate limit exceeded. ` +
              `Resets at ${resetDate.toLocaleTimeString()}. ` +
              `Add a GitHub token in config.js for higher limits.`
            );
          }
        }
        throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
      }

      let repos = await response.json();
      
      // Filter out forks if needed
      repos = repos.filter(repo => !repo.fork);
      
      // Enhance repo data
      repos = repos.map(repo => ({
        ...repo,
        languageColor: this.getLanguageColor(repo.language),
        formattedDate: this.formatDate(repo.updated_at),
        shortDescription: this.truncateDescription(repo.description),
      }));
      
      this.cache.set(cacheKey, repos);
      
      return repos;
    } catch (error) {
      console.error('❌ Error fetching repositories:', error);
      throw error;
    }
  }

  getLanguageColor(language) {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      C: '#555555',
      'C++': '#f34b7d',
      'C#': '#178600',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Vue: '#41b883',
      React: '#61dafb',
      Shell: '#89e051',
      Dart: '#00B4AB',
      Scala: '#c22d40',
      R: '#198CE7',
      Lua: '#000080',
      Perl: '#0298c3',
      Haskell: '#5e5086',
      Elixir: '#6e4a7e',
      Clojure: '#db5855',
      Jupyter: '#DA5B0B',
    };

    return colors[language] || '#858585';
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'Updated today';
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 7) return `Updated ${diffDays} days ago`;
    if (diffDays < 30) return `Updated ${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
    return `Updated ${Math.floor(diffDays / 365)} years ago`;
  }

  truncateDescription(description, maxLength = 120) {
    if (!description) return 'No description provided';
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + '...';
  }

  // Calculate total stars across all repos
  calculateTotalStars(repos) {
    return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
  }

  // Calculate total forks across all repos
  calculateTotalForks(repos) {
    return repos.reduce((total, repo) => total + repo.forks_count, 0);
  }

  // Get most used languages
  getMostUsedLanguages(repos, limit = 5) {
    const languageCount = {};
    
    repos.forEach(repo => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    });

    return Object.entries(languageCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([language, count]) => ({
        name: language,
        count: count,
        color: this.getLanguageColor(language),
      }));
  }
}
