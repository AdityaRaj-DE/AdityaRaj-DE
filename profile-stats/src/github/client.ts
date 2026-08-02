import { config } from '../config/env';
import { userInfoQuery, userLanguagesQuery } from './queries';
import { GitHubStats, LanguageStat, TopLanguages } from '../types';

async function fetchGraphQL(query: string, variables: Record<string, any>) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.githubToken}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`GitHub API GraphQL error: ${JSON.stringify(data.errors)}`);
  }

  return data.data;
}

export async function fetchUserStats(username: string): Promise<GitHubStats> {
  const data = await fetchGraphQL(userInfoQuery, { login: username });
  const user = data.user;

  if (!user) {
    throw new Error(`User ${username} not found`);
  }

  let totalStars = 0;
  if (user.repositories && user.repositories.nodes) {
    for (const repo of user.repositories.nodes) {
      totalStars += repo.stargazerCount;
    }
  }

  const totalCommits =
    user.contributionsCollection.totalCommitContributions +
    user.contributionsCollection.restrictedContributionsCount;

  return {
    name: user.name || user.login,
    login: user.login,
    totalRepositories: user.repositories.totalCount,
    totalFollowers: user.followers.totalCount,
    totalFollowing: user.following.totalCount,
    totalStars,
    totalCommits,
  };
}

export async function fetchUserLanguages(username: string): Promise<TopLanguages> {
  const data = await fetchGraphQL(userLanguagesQuery, { login: username });
  const user = data.user;

  if (!user) {
    throw new Error(`User ${username} not found`);
  }

  const languageMap = new Map<string, LanguageStat>();
  let totalSize = 0;

  if (user.repositories && user.repositories.nodes) {
    for (const repo of user.repositories.nodes) {
      if (repo.languages && repo.languages.edges) {
        for (const edge of repo.languages.edges) {
          const langSize = edge.size;
          const langName = edge.node.name;
          const langColor = edge.node.color || '#cccccc';

          totalSize += langSize;

          if (languageMap.has(langName)) {
            const existing = languageMap.get(langName)!;
            existing.size += langSize;
          } else {
            languageMap.set(langName, { name: langName, color: langColor, size: langSize });
          }
        }
      }
    }
  }

  const languages = Array.from(languageMap.values())
    .sort((a, b) => b.size - a.size)
    .slice(0, 5); // Return top 5 languages

  // Recalculate total size based on the top 5 to show correct percentages among the top 5, 
  // or use absolute total. Usually we use absolute total or just total of the top ones.
  // We'll use the totalSize of just the top languages so percentages add up to 100% of the displayed chart.
  const topTotalSize = languages.reduce((acc, curr) => acc + curr.size, 0);

  return {
    languages,
    totalSize: topTotalSize,
  };
}
