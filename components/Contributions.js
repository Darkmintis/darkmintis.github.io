// CONTRIBUTIONS COMPONENT
// Renders GitHub contribution graph

export function renderContributions(username) {
  // Using GitHub's contribution graph image
  return `
    <div class="contributions-wrapper">
      <div class="contribution-graph">
        <img 
          src="https://ghchart.rshah.org/${username}" 
          alt="${username}'s GitHub Contributions"
          class="contribution-image"
          loading="lazy"
        />
      </div>
      <div class="contribution-stats">
        <p class="contribution-note">
          <i class="fas fa-info-circle"></i>
          Showing contribution activity from the last year
        </p>
      </div>
    </div>
  `;
}

// Alternative: GitHub Readme Stats contribution graph
export function renderContributionsAlt(username) {
  return `
    <div class="contributions-wrapper">
      <div class="contribution-graph">
        <img 
          src="https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-compact&hide_border=true&area=true" 
          alt="${username}'s GitHub Activity Graph"
          class="contribution-image"
          loading="lazy"
        />
      </div>
    </div>
  `;
}
