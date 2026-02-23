// 👤 PROFILE COMPONENT
// Renders user profile information

export function renderProfile(userData, config) {
  const bio = config.sections.bio && userData.bio 
    ? `<p class="profile-bio">${truncateText(userData.bio, config.settings.bioMaxLength)}</p>` 
    : '';

  const location = userData.location 
    ? `<span class="profile-info-item">📍 ${userData.location}</span>` 
    : '';

  const company = userData.company 
    ? `<span class="profile-info-item">🏢 ${userData.company}</span>` 
    : '';

  const blog = userData.blog 
    ? `<span class="profile-info-item">
        <a href="${formatURL(userData.blog)}" target="_blank" rel="noopener noreferrer">
          🔗 ${userData.blog}
        </a>
      </span>` 
    : '';

  const twitter = userData.twitter_username 
    ? `<span class="profile-info-item">
        <a href="https://twitter.com/${userData.twitter_username}" target="_blank" rel="noopener noreferrer">
          🐦 @${userData.twitter_username}
        </a>
      </span>` 
    : '';

  // Social links from config
  const socialLinks = renderSocialLinks(config.social);

  return `
    <div class="profile-container">
      <div class="profile-header">
        <img 
          src="${userData.avatar_url}" 
          alt="${userData.name || userData.login}" 
          class="profile-avatar"
        />
        <div class="profile-info">
          <h1 class="profile-name">${userData.name || userData.login}</h1>
          <p class="profile-username">@${userData.login}</p>
          ${bio}
          <div class="profile-meta">
            ${location}
            ${company}
            ${blog}
            ${twitter}
          </div>
          ${socialLinks}
          <div class="profile-follow">
            <span class="follow-item">
              <strong>${formatNumber(userData.followers)}</strong> Followers
            </span>
            <span class="follow-item">
              <strong>${formatNumber(userData.following)}</strong> Following
            </span>
            <span class="follow-item">
              <strong>${formatNumber(userData.public_repos)}</strong> Repositories
            </span>
          </div>
          <a 
            href="${userData.html_url}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="profile-github-link"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderSocialLinks(social) {
  const links = [];

  if (social.twitter) {
    links.push(`
      <a href="https://twitter.com/${social.twitter}" target="_blank" rel="noopener noreferrer" class="social-link">
        Twitter
      </a>
    `);
  }

  if (social.linkedin) {
    links.push(`
      <a href="https://linkedin.com/in/${social.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link">
        LinkedIn
      </a>
    `);
  }

  if (social.website) {
    links.push(`
      <a href="${social.website}" target="_blank" rel="noopener noreferrer" class="social-link">
        Website
      </a>
    `);
  }

  if (social.email) {
    links.push(`
      <a href="mailto:${social.email}" class="social-link">
        Email
      </a>
    `);
  }

  if (links.length === 0) return '';

  return `<div class="social-links">${links.join('')}</div>`;
}

function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

function formatURL(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
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
