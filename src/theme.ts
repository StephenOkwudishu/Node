export const lightTheme = {
  colors: {
    bg: {
      base: '#F5F5F7',
      sidebar: '#FFFFFF',
      surface: 'rgba(255, 255, 255, 0.7)',
      elevated: 'rgba(241, 245, 249, 0.5)',
      overlay: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(0, 0, 0, 0.08)',
    },
    text: {
      primary: '#1D1D1F',
      secondary: '#424245', 
      muted: '#86868B',
      accent: '#0066CC',
    },
    accent: {
      primary: '#0066CC',
      secondary: '#10B981',
      success: '#28CD41',
      warning: '#FF9F0A',
      danger: '#FF3B30',
      info: '#007AFF',
      teal: '#59ADFF',
      glow: 'rgba(0, 102, 204, 0.1)',
    },
    health: {
      firing: '#28CD41',
      coasting: '#FF9F0A',
      cold: '#FF3B30',
      shipped: '#5856D6',
      shelved: '#8E8E93',
    }
  },
  radii: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    pill: '9999px',
  },
  fonts: {
    display: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"IBM Plex Mono", monospace',
  },
  glass: 'blur(30px)',
  shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
};

export const darkTheme: ThemeType = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    bg: {
      base: '#0D0D0E',
      sidebar: '#1C1C1E',
      surface: 'rgba(28, 28, 30, 0.7)',
      elevated: 'rgba(44, 44, 46, 0.5)',
      overlay: 'rgba(28, 28, 30, 0.8)',
      border: 'rgba(255, 255, 255, 0.08)',
    },
    text: {
      primary: '#F5F5F7',
      secondary: '#A1A1A6', 
      muted: '#86868B',
      accent: '#59ADFF',
    },
    accent: {
      ...lightTheme.colors.accent,
      primary: '#59ADFF',
      glow: 'rgba(89, 173, 255, 0.1)',
    }
  }
};

export const bearingTheme = lightTheme;
export type ThemeType = typeof lightTheme;
export const T = lightTheme;
