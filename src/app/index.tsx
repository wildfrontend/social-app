import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import { useAnonymousLogin } from '@/apis/supabase/auth';
import { supabase } from '@/apis/supabase/config';

const Index = () => {
  const router = useRouter();
  const theme = useTheme();
  const [nickname, setNickname] = useState<string>('');
  const { run, loading, error } = useAnonymousLogin();

  useEffect(() => {
    let mounted = true;
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (data.session?.user) {
        router.replace('/profile');
      }
    };
    void checkSession();
    return () => {
      mounted = false;
    };
  }, [router]);

  const onAnonLogin = useCallback(() => {
    run(nickname);
    router.replace('/profile');
  }, [nickname, router, run]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Card mode="elevated" style={styles.card}>
        <Card.Content>
          <Text style={{ color: theme.colors.onSurface }} variant="titleLarge">
            匿名登入
          </Text>
          <Text style={{ color: theme.colors.outline }} variant="bodyMedium">
            請先填寫暱稱以建立匿名帳號
          </Text>

          <TextInput
            editable={!loading}
            mode="outlined"
            onChangeText={setNickname}
            onSubmitEditing={onAnonLogin}
            placeholder="輸入暱稱"
            returnKeyType="done"
            style={{ marginTop: 12 }}
            value={nickname}
          />

          {error ? (
            <Text
              style={{ color: theme.colors.error, marginTop: 8 }}
              variant="bodySmall"
            >
              {(error as Error).message}
            </Text>
          ) : null}

          <Button
            disabled={loading}
            mode="contained"
            onPress={onAnonLogin}
            style={{ marginTop: 12 }}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.onPrimary} />
            ) : (
              '以暱稱匿名登入'
            )}
          </Button>
        </Card.Content>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 480,
  },
});

export default Index;
