import { configureFonts, MD3LightTheme } from "react-native-paper";

export const notoSansTC = {
  100: "NotoSansTC_100Thin",
  200: "NotoSansTC_200ExtraLight",
  300: "NotoSansTC_300Light",
  400: "NotoSansTC_400Regular",
  500: "NotoSansTC_500Medium",
  600: "NotoSansTC_600SemiBold",
  700: "NotoSansTC_700Bold",
  800: "NotoSansTC_800ExtraBold",
  900: "NotoSansTC_900Black",
} as const;

const themeConfig = {
  ...MD3LightTheme,
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
