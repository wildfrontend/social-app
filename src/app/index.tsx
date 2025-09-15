import React from 'react';
import { View } from 'react-native';

import { useAuthSession } from '@/apis/supabase/auth';
import LoginPanel from '@/components/auth/login';

const Index = () => {
  const { isAuth, loading } = useAuthSession();
  if (loading) {
    return <View>載入中...</View>;
  }
  if (isAuth) {
    return <View>已登入</View>;
  }
  return <LoginPanel />;
};

export default Index;
