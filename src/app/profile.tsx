import { useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useGetProfile, useSignOut } from '@/apis/supabase/auth';

const Profile = () => {
  const router = useRouter();
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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>使用者資料</Text>
        {!!error && (error as Error).message !== '未登入' ? (
          <Text style={styles.error}>{(error as Error).message}</Text>
        ) : null}
        <View style={styles.row}>
          <Text style={styles.label}>暱稱：</Text>
          <Text style={styles.value}>
            {user?.user_metadata?.nickname ?? '—'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>User ID：</Text>
          <Text style={styles.value}>{user?.id ?? '—'}</Text>
        </View>

        {signoutError ? (
          <Text style={styles.error}>{(signoutError as Error).message}</Text>
        ) : null}

        <Pressable
          accessibilityRole="button"
          disabled={signingOut}
          onPress={onSignOut}
          style={[styles.button, signingOut && styles.buttonDisabled]}
        >
          {signingOut ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>登出</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  card: {
    width: '100%',
    maxWidth: 480,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 90,
    color: '#555',
    fontSize: 16,
  },
  value: {
    flex: 1,
    color: '#111',
    fontSize: 16,
  },
  error: {
    color: '#b00020',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;
