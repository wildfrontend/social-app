import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Text,
  useTheme,
} from 'react-native-paper';

import { signOut, useAnonymousLogin } from '@/apis/supabase/auth';

import NickNameField from './nickname';
import { styles } from './styles';

const LoginPanel = () => {
  const theme = useTheme();
  const [nickname, setNickname] = useState<string>('');

  const { runAsync, loading, error } = useAnonymousLogin({
    onError: async () => {
      await signOut();
    },
  });

  const onAnonLogin = useCallback(async () => {
    await runAsync(nickname);
  }, [nickname, runAsync]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={[styles.container]}
    >
      <Card mode="elevated" style={styles.card}>
        <Card.Content>
          <View style={{ gap: '8px', flexDirection: 'column' }}>
            <Text style={{ color: theme.colors.primary }} variant="titleLarge">
              Satori 登入
            </Text>
            <Text
              style={{ color: theme.colors.secondary }}
              variant="bodyMedium"
            >
              請先填寫暱稱以建立帳號
            </Text>
            <NickNameField
              disabled={!!loading}
              error={error?.message}
              onChange={(value) => {
                setNickname(value);
              }}
              onSubmit={onAnonLogin}
              value={nickname}
            />
            <Button
              disabled={loading}
              mode="contained"
              onPress={onAnonLogin}
              style={{ marginTop: 12 }}
            >
              {loading ? (
                <ActivityIndicator color={theme.colors.primary} />
              ) : (
                '以暱稱匿名登入'
              )}
            </Button>
          </View>
        </Card.Content>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default LoginPanel;
