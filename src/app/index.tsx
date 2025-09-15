import React from 'react';
import { Redirect } from 'expo-router';
import { View } from 'react-native';

import { useAuthSession } from '@/apis/supabase/auth';
import LoginPanel from '@/components/auth/login';

const Index = () => {
  const { isAuth, loading } = useAuthSession();
  console.log('isAuth', isAuth, loading);
  if (loading) {
    return <View />;
  }
  if (isAuth) {
    return <Redirect href="/(tabs)" />;
  }
  return <LoginPanel />;
};

export default Index;

