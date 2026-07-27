import { Href } from 'expo-router';

/**
 * Per-resort color identity for the "Vivid Resort Worlds" design (option 1b).
 *
 * Each resort washes its screens in its own hue. Wait times use a single-hue,
 * three-step scale derived from the resort accent (low / medium / high) instead
 * of a green→red scale. Every resort ships a light and a dark variant.
 */

export type ResortKey = 'disney' | 'universal' | 'seaworld' | 'legoland';

/** Filled time-badge colors for one wait level. */
export interface WaitShade {
  bg: string;
  fg: string;
}

/** Colors that change between light and dark mode for a resort. */
export interface ResortVariant {
  /** Washed screen background for the resort's detail screens. */
  screenBg: string;
  /** Attraction / favorite card background. */
  cardBg: string;
  /** Card drop-shadow color. */
  cardShadow: string;
  /** Header + park title color. */
  title: string;
  /** Section header ("PINNED FAVORITES") color. */
  sectionLabel: string;
  /** Muted subtitle / secondary text. */
  subtitle: string;
  /** Back-button circle background. */
  backChip: string;
  /** Low / medium / high wait-time badge colors. */
  wait: [WaitShade, WaitShade, WaitShade];
  /** Neutral badge for closed attractions. */
  closed: WaitShade;
  /** Forecast bar color (single hue). */
  forecastBar: string;
  /** Forecast value label color. */
  forecastLabel: string;
  /** Bottom liquid-glass tab bar shadow. */
  tabShadow: string;
}

export interface ResortTheme {
  key: ResortKey;
  name: string;
  /** Sub-label shown on the park picker card. */
  sub: string;
  /** Single-letter monogram for the picker avatar. */
  mono: string;
  /** Brand accent used for tab tint, avatars and chevrons. */
  accent: string;
  /** Very light accent wash used behind the picker card. */
  tint: string;
  /** Destination the picker card routes to. */
  href: Href;
  light: ResortVariant;
  dark: ResortVariant;
}

const WHITE = '#FFFFFF';

export const RESORT_THEMES: Record<ResortKey, ResortTheme> = {
  disney: {
    key: 'disney',
    name: 'Walt Disney World',
    sub: '4 theme parks · 2 water parks',
    mono: 'W',
    accent: '#7C6AE8',
    tint: '#F1EEFF',
    href: '/(disney)/(tabs)/magic-kingdom',
    light: {
      screenBg: '#F1EEFF',
      cardBg: WHITE,
      cardShadow: 'rgba(76,63,184,0.10)',
      title: '#4C3FB8',
      sectionLabel: '#8B7CF6',
      subtitle: '#9A9A9E',
      backChip: 'rgba(255,255,255,0.7)',
      wait: [
        { bg: '#E4E0FC', fg: '#5B4FC4' },
        { bg: '#7C6AE8', fg: WHITE },
        { bg: '#4433A6', fg: WHITE },
      ],
      closed: { bg: '#ECEAF0', fg: '#8A8A90' },
      forecastBar: '#7C6AE8',
      forecastLabel: '#4C3FB8',
      tabShadow: 'rgba(76,63,184,0.20)',
    },
    dark: {
      screenBg: '#15121F',
      cardBg: '#221D33',
      cardShadow: 'rgba(0,0,0,0.4)',
      title: WHITE,
      sectionLabel: '#9E90F5',
      subtitle: 'rgba(255,255,255,0.5)',
      backChip: 'rgba(255,255,255,0.1)',
      wait: [
        { bg: 'rgba(255,255,255,0.08)', fg: '#C9C2FA' },
        { bg: '#5B4FC4', fg: WHITE },
        { bg: '#9E90F5', fg: '#1B1330' },
      ],
      closed: { bg: 'rgba(255,255,255,0.06)', fg: 'rgba(255,255,255,0.5)' },
      forecastBar: '#9E90F5',
      forecastLabel: '#C9C2FA',
      tabShadow: 'rgba(0,0,0,0.4)',
    },
  },

  universal: {
    key: 'universal',
    name: 'Universal Orlando Resort',
    sub: '3 theme parks',
    mono: 'U',
    accent: '#0EA5A0',
    tint: '#E6FBF8',
    href: '/(universal)/(tabs)/islands-of-adventure',
    light: {
      screenBg: '#E6FBF8',
      cardBg: WHITE,
      cardShadow: 'rgba(11,122,118,0.10)',
      title: '#0B6B67',
      sectionLabel: '#12A39D',
      subtitle: '#9A9A9E',
      backChip: 'rgba(255,255,255,0.7)',
      wait: [
        { bg: '#CFF3F0', fg: '#0B7A76' },
        { bg: '#0EA5A0', fg: WHITE },
        { bg: '#0B6B67', fg: WHITE },
      ],
      closed: { bg: '#E8EDEC', fg: '#8A8A90' },
      forecastBar: '#0EA5A0',
      forecastLabel: '#0B6B67',
      tabShadow: 'rgba(11,122,118,0.20)',
    },
    dark: {
      screenBg: '#0C1A19',
      cardBg: '#14302E',
      cardShadow: 'rgba(0,0,0,0.4)',
      title: WHITE,
      sectionLabel: '#5FD6D0',
      subtitle: 'rgba(255,255,255,0.5)',
      backChip: 'rgba(255,255,255,0.1)',
      wait: [
        { bg: 'rgba(255,255,255,0.08)', fg: '#8FE3DE' },
        { bg: '#0E8A86', fg: WHITE },
        { bg: '#5FD6D0', fg: '#08201F' },
      ],
      closed: { bg: 'rgba(255,255,255,0.06)', fg: 'rgba(255,255,255,0.5)' },
      forecastBar: '#5FD6D0',
      forecastLabel: '#8FE3DE',
      tabShadow: 'rgba(0,0,0,0.4)',
    },
  },

  seaworld: {
    key: 'seaworld',
    name: 'SeaWorld Orlando',
    sub: '1 park · water park',
    mono: 'S',
    accent: '#2E9FE0',
    tint: '#EAF6FF',
    href: '/(seaworld)/(tabs)/seaworld-orlando',
    light: {
      screenBg: '#EAF6FF',
      cardBg: WHITE,
      cardShadow: 'rgba(27,111,168,0.10)',
      title: '#1B6FA8',
      sectionLabel: '#2E9FE0',
      subtitle: '#9A9A9E',
      backChip: 'rgba(255,255,255,0.7)',
      wait: [
        { bg: '#D3ECFB', fg: '#1B6FA8' },
        { bg: '#2E9FE0', fg: WHITE },
        { bg: '#175E8F', fg: WHITE },
      ],
      closed: { bg: '#E7ECF0', fg: '#8A8A90' },
      forecastBar: '#2E9FE0',
      forecastLabel: '#1B6FA8',
      tabShadow: 'rgba(27,111,168,0.20)',
    },
    dark: {
      screenBg: '#0C1720',
      cardBg: '#14293A',
      cardShadow: 'rgba(0,0,0,0.4)',
      title: WHITE,
      sectionLabel: '#74C4F0',
      subtitle: 'rgba(255,255,255,0.5)',
      backChip: 'rgba(255,255,255,0.1)',
      wait: [
        { bg: 'rgba(255,255,255,0.08)', fg: '#A9D8F5' },
        { bg: '#2277B0', fg: WHITE },
        { bg: '#74C4F0', fg: '#08161F' },
      ],
      closed: { bg: 'rgba(255,255,255,0.06)', fg: 'rgba(255,255,255,0.5)' },
      forecastBar: '#74C4F0',
      forecastLabel: '#A9D8F5',
      tabShadow: 'rgba(0,0,0,0.4)',
    },
  },

  legoland: {
    key: 'legoland',
    name: 'LEGOLAND Florida',
    sub: '1 park · water park',
    mono: 'L',
    accent: '#FF7A45',
    tint: '#FFF1EA',
    href: '/(legoland)',
    light: {
      screenBg: '#FFF1EA',
      cardBg: WHITE,
      cardShadow: 'rgba(198,80,42,0.10)',
      title: '#C6502A',
      sectionLabel: '#FF7A45',
      subtitle: '#9A9A9E',
      backChip: 'rgba(255,255,255,0.7)',
      wait: [
        { bg: '#FFE0D2', fg: '#C6502A' },
        { bg: '#FF7A45', fg: WHITE },
        { bg: '#C6502A', fg: WHITE },
      ],
      closed: { bg: '#F0EAE7', fg: '#8A8A90' },
      forecastBar: '#FF7A45',
      forecastLabel: '#C6502A',
      tabShadow: 'rgba(198,80,42,0.20)',
    },
    dark: {
      screenBg: '#1C130E',
      cardBg: '#33221A',
      cardShadow: 'rgba(0,0,0,0.4)',
      title: WHITE,
      sectionLabel: '#FFA579',
      subtitle: 'rgba(255,255,255,0.5)',
      backChip: 'rgba(255,255,255,0.1)',
      wait: [
        { bg: 'rgba(255,255,255,0.08)', fg: '#FFC6A8' },
        { bg: '#D65A30', fg: WHITE },
        { bg: '#FFA579', fg: '#241009' },
      ],
      closed: { bg: 'rgba(255,255,255,0.06)', fg: 'rgba(255,255,255,0.5)' },
      forecastBar: '#FFA579',
      forecastLabel: '#FFC6A8',
      tabShadow: 'rgba(0,0,0,0.4)',
    },
  },
};

/** Ordered list of resorts for the park picker. */
export const RESORT_LIST: ResortTheme[] = [
  RESORT_THEMES.disney,
  RESORT_THEMES.universal,
  RESORT_THEMES.seaworld,
  RESORT_THEMES.legoland,
];

/**
 * Map a standby wait time to a single-hue scale index: 0 = low, 1 = medium,
 * 2 = high. Thresholds match the original green/amber/red buckets.
 */
export function waitLevel(waitTime: number): 0 | 1 | 2 {
  if (waitTime < 20) return 0;
  if (waitTime < 45) return 1;
  return 2;
}
