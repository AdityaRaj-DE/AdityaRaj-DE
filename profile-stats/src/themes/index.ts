import { Theme } from '../types';

export const themes: Record<string, Theme> = {
  transparent: {
    bgColor: '#ffffff00',
    textColor: '#a3a3a3',
    iconColor: '#58a6ff',
    borderColor: '#e4e2e200',
    titleColor: '#2f81f7',
  },
  light: {
    bgColor: '#ffffff',
    textColor: '#434d58',
    iconColor: '#2f81f7',
    borderColor: '#e4e2e2',
    titleColor: '#151515',
  },
  dark: {
    bgColor: '#0d1117',
    textColor: '#c9d1d9',
    iconColor: '#58a6ff',
    borderColor: '#30363d',
    titleColor: '#58a6ff',
  },
  github: {
    bgColor: '#ffffff',
    textColor: '#24292f',
    iconColor: '#0969da',
    borderColor: '#d0d7de',
    titleColor: '#0969da',
  },
  'one-dark': {
    bgColor: '#282c34',
    textColor: '#abb2bf',
    iconColor: '#e5c07b',
    borderColor: '#e4e2e200',
    titleColor: '#61afef',
  },
};

export function getTheme(themeName: string = 'transparent'): Theme {
  return themes[themeName] || themes.transparent;
}
