# GitHub Profile Stats Service

A production-ready microservice that generates beautiful, dynamically-rendered SVG stats cards for GitHub profiles, built strictly with Node.js, Express, and the official GitHub GraphQL API.

## Project Overview

This service replaces third-party stats generators (like github-readme-stats) to provide full ownership and customizability over profile widgets. It fetches real-time data using a GitHub Personal Access Token, caches the results, and constructs valid SVGs without using headless browsers or DOM libraries.

## Architecture

We follow Clean Architecture principles. Business logic, caching, API routing, and SVG rendering are strictly decoupled.

\`\`\`
src/
├── api/          # Express setup and routes
├── cache/        # In-memory caching layer
├── config/       # Environment variables
├── controllers/  # Route handlers mapping requests to services
├── github/       # GraphQL queries and API client
├── services/     # Core business logic tying data, cache, and rendering
├── svg/          # SVG templates and visual logic
├── themes/       # Centralized color schemes
├── types/        # TypeScript interfaces
└── utils/        # Generic helpers
\`\`\`

### Caching Strategy
The service implements a configurable `InMemoryCache` (default: 3600 seconds) to ensure the GitHub API is not called on every request. The `CacheProvider` interface makes it trivial to swap this out for Redis in the future without touching the business logic.

### SVG Generation
SVGs are constructed manually using pure template strings. This prevents the heavy memory overhead associated with headless browsers (Puppeteer) or Canvas libraries.

## Deployment

The project is configured for seamless deployment to Google Cloud Run via Docker.

1. Build the Docker image:
   \`\`\`bash
   docker build -t profile-stats .
   \`\`\`
2. Run locally:
   \`\`\`bash
   docker run -p 8080:8080 -e PORT=8080 -e GITHUB_TOKEN=your_token profile-stats
   \`\`\`

A GitHub Actions workflow (`deploy.yml`) is included for CI/CD to Google Cloud.

## Environment Variables

| Variable | Description |
|---|---|
| \`PORT\` | Port for the Express server (default: 3000) |
| \`GITHUB_TOKEN\` | Your GitHub Personal Access Token (Required) |
| \`CACHE_TTL_SECONDS\` | Cache expiry duration in seconds (default: 3600) |

## Future Roadmap
The codebase is designed to naturally support new widgets:
- Repository Stats
- Contribution Calendar
- Recent Activity
- Custom Themes
