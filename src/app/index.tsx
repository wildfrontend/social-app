import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAnonymousLogin } from '@/apis/supabase/auth';
import { supabase } from '@/apis/supabase/config';

const Index = () => {
  const router = useRouter();
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
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>匿名登入</Text>
        <Text style={styles.subtitle}>請先填寫暱稱以建立匿名帳號</Text>

        <TextInput
          editable={!loading}
          onChangeText={setNickname}
          onSubmitEditing={onAnonLogin}
          placeholder="輸入暱稱"
          returnKeyType="done"
          style={styles.input}
          value={nickname}
        />

        {error ? (
          <Text style={styles.error}>{(error as Error).message}</Text>
        ) : null}

        <Pressable
          disabled={loading}
          onPress={onAnonLogin}
          style={[styles.button, loading && styles.buttonDisabled]}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>以暱稱匿名登入</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
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

export default Index;
