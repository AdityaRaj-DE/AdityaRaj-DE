export interface GitHubStats {
  name: string;
  login: string;
  avatarUrl: string;
  avatarBase64?: string;
  bio: string | null;
  totalRepositories: number;
  totalFollowers: number;
  totalFollowing: number;
  totalStars: number;
  totalCommits: number;
}

export interface LanguageStat {
  name: string;
  color: string;
  size: number;
}

export interface TopLanguages {
  languages: LanguageStat[];
  totalSize: number;
}

export interface Theme {
  bgColor: string;
  textColor: string;
  iconColor: string;
  borderColor: string;
  titleColor: string;
}

export interface CardOptions {
  username: string;
  theme?: string;
  hideBorder?: boolean;
  showIcons?: boolean;
}

export interface Project {
  name: string;
  description: string;
  language: string;
  languageColor: string;
}
