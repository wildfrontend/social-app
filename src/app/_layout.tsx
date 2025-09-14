import { Stack } from 'expo-router';
import React from 'react';

import AppThemeProvider from '@/themes';

const RootLayout = () => {
  return (
    <AppThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AppThemeProvider>
  );
};

export default RootLayout;
