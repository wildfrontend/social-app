import { useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Text,
  useTheme,
} from 'react-native-paper';

import { useGetProfile, useSignOut } from '@/apis/supabase/auth';

const Profile = () => {
  const router = useRouter();
  const theme = useTheme();
  const { loading, error, data: user } = useGetProfile();
  const {
    run: signOut,
    loading: signingOut,
    error: signoutError,
  } = useSignOut();

  const onSignOut = useCallback(async () => {
    try {
      await signOut();
      router.replace('/');
    } catch {
      // handled by hook error
    }
  }, [router, signOut]);

  useEffect(() => {
    if ((error as Error | undefined)?.message === '未登入') router.replace('/');
  }, [error, router]);

  if (loading)
    return (
      <View
        style={[styles.center, { backgroundColor: theme.colors.background }]}
      >
        <ActivityIndicator />
      </View>
    );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Card mode="elevated" style={styles.card}>
        <Card.Content>
          <Text style={{ color: theme.colors.onSurface }} variant="titleLarge">
            使用者資料
          </Text>
          {!!error && (error as Error).message !== '未登入' ? (
            <Text style={{ color: theme.colors.error }} variant="bodySmall">
              {(error as Error).message}
            </Text>
          ) : null}

          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.colors.outline }]}>
              暱稱：
            </Text>
            <Text style={[styles.value, { color: theme.colors.onSurface }]}>
              {user?.user_metadata?.nickname ?? '—'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.colors.outline }]}>
              User ID：
            </Text>
            <Text style={[styles.value, { color: theme.colors.onSurface }]}>
              {user?.id ?? '—'}
            </Text>
          </View>

          {signoutError ? (
            <Text style={{ color: theme.colors.error }} variant="bodySmall">
              {(signoutError as Error).message}
            </Text>
          ) : null}

          <Button
            loading={signingOut}
            mode="contained"
            onPress={onSignOut}
            style={{ marginTop: 12 }}
          >
            登出
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 90,
    fontSize: 16,
  },
  value: {
    flex: 1,
    fontSize: 16,
  },
});

export default Profile;
