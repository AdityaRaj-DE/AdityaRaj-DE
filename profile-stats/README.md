# 📊 GitHub Profile Stats Service

A lightning-fast, production-ready microservice that generates beautiful, dynamically-rendered SVG stats cards for your GitHub profile README. 

Built from scratch with **Node.js, Express, and the GitHub GraphQL API**, this service is designed as an open-source alternative to third-party stat generators. Host it yourself to gain full ownership, privacy, and customizability over your profile widgets!

---

## ✨ Features

- **⚡ Blazing Fast SVGs**: SVGs are constructed mathematically via pure template strings—no heavy DOM parsing or Puppeteer headless browsers required.
- **🔒 Full Privacy**: Run it on your own domain. Never share your GitHub Personal Access Token (PAT) with random third-party servers again.
- **💾 Smart Caching**: Built-in memory cache (extensible to Redis) prevents API rate limits and keeps your widgets loading instantly.
- **🎨 Theming System**: Easily define your own custom color palettes in a centralized configuration.
- **🛠️ Clean Architecture**: Strict separation of concerns makes it trivially easy to extend and build your own custom widgets.

---

## 🚀 How to Build Your Own

You can deploy this service for free in less than 5 minutes using Vercel or Docker.

### Option 1: 1-Click Vercel Deployment (Recommended)

1. **Fork/Clone** this repository to your own GitHub account.
2. Go to your [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens) and generate a new token (classic) with the `read:user` and `repo` scopes.
3. Import your cloned repository into [Vercel](https://vercel.com).
4. In the Vercel deployment settings, ensure the **Root Directory** is set to `profile-stats`.
5. Add an Environment Variable:
   - `GITHUB_TOKEN`: *<paste_your_token_here>*
6. **Deploy!**

### Option 2: Docker / Google Cloud Run

We provide a lightweight multi-stage `Dockerfile`.

```bash
# Build the image
docker build -t profile-stats .

# Run the container locally
docker run -p 3000:3000 -e PORT=3000 -e GITHUB_TOKEN=your_token_here profile-stats
```
*Note: A GitHub Actions workflow (`deploy.yml`) is included in the `.github` folder if you want automated CI/CD directly to Google Cloud.*

---

## 💻 Usage

Once deployed, simply embed the image links inside your `README.md`:

**Overall Profile Stats:**
```html
<img src="https://YOUR-DEPLOYED-URL/api/stats.svg?username=YOUR_GITHUB_NAME&theme=transparent" />
```

**Most Used Languages:**
```html
<img src="https://YOUR-DEPLOYED-URL/api/languages.svg?username=YOUR_GITHUB_NAME&theme=dark" />
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `username` | string | **(Required)** The GitHub username to fetch stats for. |
| `theme` | string | The color theme (`transparent`, `light`, `dark`, `github`, `one-dark`). Default: `dark` |
| `hide_border`| boolean | Set to `true` to remove the border around the card. |
| `show_icons` | boolean | Set to `true` to show icons next to the stats. |

*(Pro Tip: Add `&v=1` at the end of the URL to bypass GitHub's Camo Image Cache when debugging layout changes!)*

---

## 🏗️ Architecture & Codebase

The codebase strictly follows Clean Architecture principles. If you want to contribute or build new widgets, everything is cleanly decoupled!

```text
src/
├── api/          # Express app setup and server entrypoint
├── cache/        # Abstracted caching layer (InMemoryCache)
├── config/       # Strict environment variable validation
├── controllers/  # Express route handlers
├── github/       # GitHub GraphQL queries and HTTP client
├── services/     # Core business logic (glues GitHub data, cache, and SVG rendering)
├── svg/          # Pure functions returning SVG template strings
├── themes/       # Centralized color palettes and themes
├── types/        # Global TypeScript interfaces
└── utils/        # Generic helper functions (URL param parsing, etc.)
```

---

## 🛠️ Local Development

Want to test or tweak the code locally?

1. Clone the project and navigate to the directory:
   ```bash
   cd profile-stats
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root and add your token:
   ```env
   GITHUB_TOKEN=your_token_here
   PORT=3000
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. View your stats at: `http://localhost:3000/api/stats.svg?username=YOUR_NAME`

---

## 📜 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port for the Express server (default: 3000) |
| `GITHUB_TOKEN` | Your GitHub Personal Access Token **(Required)** |
| `CACHE_TTL_SECONDS` | Cache expiry duration in seconds (default: 3600) |
