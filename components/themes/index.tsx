import { NotoSansTC_100Thin } from "@expo-google-fonts/noto-sans-tc/100Thin";
import { NotoSansTC_200ExtraLight } from "@expo-google-fonts/noto-sans-tc/200ExtraLight";
import { NotoSansTC_300Light } from "@expo-google-fonts/noto-sans-tc/300Light";
import { NotoSansTC_400Regular } from "@expo-google-fonts/noto-sans-tc/400Regular";
import { NotoSansTC_500Medium } from "@expo-google-fonts/noto-sans-tc/500Medium";
import { NotoSansTC_600SemiBold } from "@expo-google-fonts/noto-sans-tc/600SemiBold";
import { NotoSansTC_700Bold } from "@expo-google-fonts/noto-sans-tc/700Bold";
import { NotoSansTC_800ExtraBold } from "@expo-google-fonts/noto-sans-tc/800ExtraBold";
import { NotoSansTC_900Black } from "@expo-google-fonts/noto-sans-tc/900Black";
import { useFonts } from "@expo-google-fonts/noto-sans-tc/useFonts";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import themeConfig from "./variables";

void SplashScreen.preventAutoHideAsync();

type Props = { children: React.ReactNode };

export default function AppThemeProvider({ children }: Props) {
  const [loaded] = useFonts({
    NotoSansTC_100Thin,
    NotoSansTC_200ExtraLight,
    NotoSansTC_300Light,
    NotoSansTC_400Regular,
    NotoSansTC_500Medium,
    NotoSansTC_600SemiBold,
    NotoSansTC_700Bold,
    NotoSansTC_800ExtraBold,
    NotoSansTC_900Black,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return <PaperProvider theme={themeConfig}>{children}</PaperProvider>;
}
