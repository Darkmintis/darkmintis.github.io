# 🚀 GitHub Portfolio Generator

> Create a beautiful portfolio website in 5 minutes. No coding required—just edit one config file!

## What is this?

A ready-to-use portfolio website that syncs with your GitHub profile. Fork it, add your username, deploy—done! Your professional portfolio is live.

**Perfect for developers who want a portfolio site without building one from scratch.**

## ✨ Features

- 🎨 **4 Themes** - Dark, Light, Neon, Hacker
- ✨ **Animations** - Fade, Slide, Float, Bounce, Glow
- 📊 **Auto Stats** - Repos, stars, forks, languages (pulled from GitHub)
- 📱 **Responsive** - Works on mobile, tablet, desktop
- ⚡ **Zero Cost** - Free hosting on GitHub Pages
- 🔧 **One Config** - Edit only `config.js`

## 🚀 Quick Setup (5 Minutes)

### Step 1: Fork & Rename
1. Click **Fork** (top right)
2. Go to **Settings** → Rename repository to: `your-username.github.io`

### Step 2: Edit Config
Open `config.js` and change your username:

```javascript
const config = {
  username: "your-github-username",  // ← Change this!
  githubToken: "",                    // Optional: Add token to avoid rate limits
  theme: "dark",                      // Choose: dark, light, neon, hacker
  animation: "fade-in",               // Choose: fade-in, slide-up, floating, bounce, glow
};
```

### Step 3: Deploy
1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** → Folder: **/ (root)**
4. Click **Save**

### Step 4: Visit
Wait 2-5 minutes, then visit: `https://your-username.github.io`

**That's it! Your portfolio is live! 🎉**

---

## ⚙️ Customization Options

### Basic Config
```javascript
const config = {
  username: "your-github-username",   // Required
  githubToken: "",                    // Optional but recommended
  theme: "dark",                      // dark, light, neon, hacker
  animation: "fade-in",               // fade-in, slide-up, floating, bounce, glow, none
};
```

### Pin Specific Projects
```javascript
pinnedRepos: [
  "project-name-1",
  "project-name-2",
  "project-name-3",
]
// Leave empty [] to auto-select your most starred repos
```

### Add Social Links
```javascript
social: {
  twitter: "yourusername",
  linkedin: "yourprofile",
  website: "https://yoursite.com",
  email: "you@email.com",
}
```

### Control What Shows
```javascript
sections: {
  bio: true,           // Show your bio
  stats: true,         // Show stats (stars, repos, etc)
  pinnedRepos: true,   // Show pinned projects
  allRepos: true,      // Show all repositories
}
```

### Layout Options
```javascript
layout: {
  reposPerRow: 3,            // 1-4 repos per row
  sortReposBy: "stars",      // Sort by: "stars", "updated", "name"
  showLanguageColors: true,  // Show language colors
  showStars: true,           // Show star counts
  showForks: true,           // Show fork counts
}

settings: {
  maxReposToShow: 12,        // Max number of repos to display
}
```

---

## 🎨 Available Themes

| Theme | Style |
|-------|-------|
| `dark` | GitHub dark mode (professional) |
| `light` | GitHub light mode (clean) |
| `neon` | Cyberpunk with glowing effects |
| `hacker` | Matrix terminal style |

---

## 🔑 GitHub Token (Optional but Recommended)

**Why?** Without token: 60 requests/hour | With token: 5000 requests/hour

**Setup in 3 steps:**

1. **Create token:** https://github.com/settings/tokens/new
   - Name: `Portfolio Generator`
   - Expiration: `1 year`
   - **Select ONLY:** ☑️ `public_repo` (uncheck everything else!)
   - Click **Generate token**

2. **Copy token:** Starts with `ghp_...`

3. **Paste in config.js:**
   ```javascript
   githubToken: "ghp_your_token_here",
   ```

### Security Notes

✅ **Safe because:** Token is read-only, only accesses your public data  
⚠️ **Visible in browser:** This is OK - it's your portfolio, minimal permissions  
🔒 **Each developer:** Creates their own token for their own fork

---

## 🛠️ What Gets Displayed

**Auto-pulled from GitHub:**
- ✅ Profile picture, name, bio
- ✅ Location, company, website
- ✅ Follower/following counts
- ✅ All your repositories
- ✅ Stars, forks, languages
- ✅ Top 5 programming languages with percentages

---

## 🐛 Troubleshooting

**Profile not loading?**
- Check your username in `config.js` is correct
- Make sure your GitHub profile is public

**"Rate limit exceeded" error?**
- GitHub limits unauthenticated requests to 60/hour
- Add a GitHub token in `config.js` to get 5000/hour
- See "GitHub Token" section above

**No repos showing?**
- Ensure you have public repositories
- Check `maxReposToShow` setting

**Theme not working?**
- Clear browser cache (Ctrl+Shift+R)
- Check theme name spelling

**GitHub Pages not deploying?**
- Verify repo name is `username.github.io`
- Wait 5 minutes after enabling Pages

---

## 🔒 Privacy & Security

- ✅ Uses only **public** GitHub API
- ✅ Token (if used) only accesses public data
- ✅ No private data accessed
- ✅ 100% client-side (no backend)
- ✅ Zero cost, zero tracking

---

## 📄 License

MIT License - Use it however you want!

---

## 🌟 Show Your Support

**If this helped you, give it a ⭐ star!**

Made with ❤️ for developers who want quick portfolios.
