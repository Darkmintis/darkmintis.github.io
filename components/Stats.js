// STATS COMPONENT
// Renders GitHub statistics

export function renderStats(userData, repos, config) {
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  
  // Get top languages
  const languages = getTopLanguages(repos, 5);

  return `
    <div class="stats-container">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon"><i class="fas fa-box"></i></div>
          <div class="stat-value">${formatNumber(userData.public_repos)}</div>
          <div class="stat-label">Public Repos</div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fas fa-star"></i></div>
          <div class="stat-value">${formatNumber(totalStars)}</div>
          <div class="stat-label">Total Stars</div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fas fa-code-fork"></i></div>
          <div class="stat-value">${formatNumber(totalForks)}</div>
          <div class="stat-label">Total Forks</div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fas fa-users"></i></div>
          <div class="stat-value">${formatNumber(userData.followers)}</div>
          <div class="stat-label">Followers</div>
        </div>
      </div>

      ${languages.length > 0 ? renderLanguages(languages) : ''}
    </div>
  `;
}

function renderLanguages(languages) {
  const languageBars = languages.map(lang => {
    const percentage = (lang.count / languages.reduce((sum, l) => sum + l.count, 0)) * 100;
    
    return `
      <div class="language-item">
        <div class="language-info">
          <span class="language-dot" style="background-color: ${lang.color}"></span>
          <span class="language-name">${lang.name}</span>
          <span class="language-percentage">${percentage.toFixed(1)}%</span>
        </div>
        <div class="language-bar">
          <div 
            class="language-bar-fill" 
            style="width: ${percentage}%; background-color: ${lang.color}"
          ></div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="languages-section">
      <h3 class="languages-title">🔤 Most Used Languages</h3>
      <div class="languages-list">
        ${languageBars}
      </div>
    </div>
  `;
}

function getTopLanguages(repos, limit) {
  const languageCount = {};
  const languageColors = {};

  repos.forEach(repo => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      if (!languageColors[repo.language]) {
        languageColors[repo.language] = repo.languageColor;
      }
    }
  });

  return Object.entries(languageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({
      name,
      count,
      color: languageColors[name],
    }));
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
