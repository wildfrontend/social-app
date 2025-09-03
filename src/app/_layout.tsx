import { Stack } from 'expo-router';

import AppThemeProvider from '../themes';

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AppThemeProvider>
  );
}
