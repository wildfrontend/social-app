import { MD3LightTheme, configureFonts } from 'react-native-paper';

export const notoSansTC = {
  100: 'NotoSansTC_100Thin',
  200: 'NotoSansTC_200ExtraLight',
  300: 'NotoSansTC_300Light',
  400: 'NotoSansTC_400Regular',
  500: 'NotoSansTC_500Medium',
  600: 'NotoSansTC_600SemiBold',
  700: 'NotoSansTC_700Bold',
  800: 'NotoSansTC_800ExtraBold',
  900: 'NotoSansTC_900Black',
} as const;

const themeConfig = {
  ...MD3LightTheme,
  dark: false,
  colors: {
    ...MD3LightTheme.colors,
    // Threads-like, high-contrast light palette
    primary: '#111111',
    onPrimary: '#ffffff',
    background: '#ffffff',
    onBackground: '#111111',
    surface: '#ffffff',
    onSurface: '#111111',
    surfaceVariant: '#f5f5f5',
    onSurfaceVariant: '#555555',
    outline: '#e5e5e5',
    outlineVariant: '#d9d9d9',
    secondary: '#666666',
    onSecondary: '#ffffff',
    error: '#ff4d4f',
    onError: '#ffffff',
    elevation: {
      level0: 'transparent',
      level1: '#ffffff',
      level2: '#fafafa',
      level3: '#f5f5f5',
      level4: '#f0f0f0',
      level5: '#ebebeb',
    },
  },
  fonts: configureFonts({
    config: {
      displayLarge: { fontFamily: notoSansTC[100] },
      displayMedium: { fontFamily: notoSansTC[200] },
      displaySmall: { fontFamily: notoSansTC[300] },
      headlineLarge: { fontFamily: notoSansTC[400] },
      headlineMedium: { fontFamily: notoSansTC[500] },
      headlineSmall: { fontFamily: notoSansTC[600] },
      titleLarge: { fontFamily: notoSansTC[700] },
      titleMedium: { fontFamily: notoSansTC[800] },
      titleSmall: { fontFamily: notoSansTC[900] },
      labelLarge: { fontFamily: notoSansTC[100] },
      labelMedium: { fontFamily: notoSansTC[200] },
      labelSmall: { fontFamily: notoSansTC[300] },
      bodyLarge: { fontFamily: notoSansTC[400] },
      bodyMedium: { fontFamily: notoSansTC[500] },
      bodySmall: { fontFamily: notoSansTC[600] },
    },
  }),
};

export default themeConfig;
