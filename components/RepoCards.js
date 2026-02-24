// REPO CARDS COMPONENT
// Renders repository cards

export function renderRepoCards(repos, config) {
  if (!repos || repos.length === 0) {
    return '<p class="no-repos">No repositories to display</p>';
  }

  const cards = repos.map(repo => renderRepoCard(repo, config)).join('');
  return `<div class="repo-grid">${cards}</div>`;
}

function renderRepoCard(repo, config) {
  const language = config.layout.showLanguageColors && repo.language
    ? `
      <span class="repo-language">
        <span class="language-dot" style="background-color: ${repo.languageColor}"></span>
        ${repo.language}
      </span>
    `
    : '';

  const stars = config.layout.showStars
    ? `
      <span class="repo-stat">
        <i class="fas fa-star repo-stat-icon"></i>
        ${formatNumber(repo.stargazers_count)}
      </span>
    `
    : '';

  const forks = config.layout.showForks
    ? `
      <span class="repo-stat">
        <i class="fas fa-code-fork repo-stat-icon"></i>
        ${formatNumber(repo.forks_count)}
      </span>
    `
    : '';

  const topics = repo.topics && repo.topics.length > 0
    ? renderTopics(repo.topics)
    : '';

  return `
    <a 
      href="${repo.html_url}" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="repo-card"
    >
      <div class="repo-card-header">
        <h3 class="repo-name">
          <i class="fas fa-folder repo-icon"></i>
          ${repo.name}
        </h3>
        ${repo.private ? '<span class="repo-badge">Private</span>' : ''}
        ${repo.fork ? '<span class="repo-badge">Fork</span>' : ''}
        ${repo.archived ? '<span class="repo-badge archived">Archived</span>' : ''}
      </div>
      
      <p class="repo-description">${repo.shortDescription}</p>
      
      ${topics}
      
      <div class="repo-footer">
        <div class="repo-meta">
          ${language}
          ${stars}
          ${forks}
        </div>
      </div>
    </a>
  `;
}

function renderTopics(topics) {
  const topicTags = topics
    .slice(0, 5)
    .map(topic => `<span class="repo-topic">${topic}</span>`)
    .join('');
  
  return `<div class="repo-topics">${topicTags}</div>`;
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
