// ⚙️ CONFIG-DRIVEN GITHUB PROFILE ENGINE
// Edit this file ONLY to customize your profile

const config = {
  // 👤 Your GitHub Username
  username: "darkmintis",

  // 🔑 GitHub Personal Access Token (optional but recommended)
  // Go to: https://github.com/settings/tokens/new
  // Select ONLY: ☑️ public_repo (uncheck everything else!)
  // Without token: 60 requests/hour | With token: 5000 requests/hour
  githubToken: "",

  // 🎨 Theme Selection
  // Options: "dark", "light", "neon", "hacker"
  theme: "dark",

  // ✨ Animation Style
  // Options: "fade-in", "slide-up", "floating", "bounce", "glow", "none"
  animation: "fade-in",

  // 📊 Profile Sections Visibility
  sections: {
    bio: true,
    stats: true,
    pinnedRepos: true,
    allRepos: true,
    contributions: true,  // Show contribution graph
  },

  // 🔧 Layout Options
  layout: {
    reposPerRow: 3,        // Number of repo cards per row
    showLanguageColors: true,
    showStars: true,
    showForks: true,
    sortReposBy: "stars",  // Options: "stars", "updated", "name"
  },

  // 📌 Custom Pinned Repos (optional)
  // If empty, will auto-select top repos by stars
  pinnedRepos: [
    // "repo-name-1",
    // "repo-name-2",
    // "repo-name-3",
  ],

  // 🔗 Social Links (optional)
  social: {
    twitter: "",           // Username only
    linkedin: "",          // Username only
    website: "",           // Full URL
    email: "",             // Email address
  },

  // 🎯 Custom Settings
  settings: {
    maxReposToShow: 12,    // Maximum repos to display
    bioMaxLength: 160,     // Characters to show in bio
    animationDelay: 100,   // Delay between animations (ms)
    enableScrollEffects: true,
  },

  // 🌟 Feature Flags
  features: {
    darkModeToggle: true,
    searchRepos: false,    // Coming soon
    filterByLanguage: false, // Coming soon
  }
};

// Make config available globally
if (typeof globalThis !== 'undefined') {
  globalThis.config = config;
}

// Export for Node.js (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}
