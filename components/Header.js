// HEADER COMPONENT
// Renders the header with theme toggle

export function renderHeader(config) {
  const themeToggle = config.features.darkModeToggle
    ? `
      <div class="theme-toggle" id="themeToggle">
        <span class="theme-icon">🌙</span>
      </div>
    `
    : '';

  return `
    <div class="header-container">
      <div class="header-content">
        <h1 class="header-title">GitHub Profile</h1>
        ${themeToggle}
      </div>
    </div>
  `;
}
