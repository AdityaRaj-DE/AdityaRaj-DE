import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  githubToken: process.env.GITHUB_TOKEN,
  cacheTtlSeconds: parseInt(process.env.CACHE_TTL_SECONDS || '3600', 10)
};

if (!config.githubToken) {
  console.error('CRITICAL: GITHUB_TOKEN environment variable is missing.');
  process.exit(1);
}
