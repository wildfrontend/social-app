import { Stack } from "expo-router";
import AppThemeProvider from "../components/themes";

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AppThemeProvider>
  );
}
