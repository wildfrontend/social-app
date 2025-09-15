import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Session, User } from '@supabase/supabase-js';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';

import { supabase } from './config';

export const useAnonymousLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: Required<Parameters<typeof useRequest>>[1]['onSuccess'];
  onError?: Required<Parameters<typeof useRequest>>[1]['onError'];
}) => {
  const request = useRequest(
    async (nickname: string) => {
      const trimmed = nickname?.trim();
      if (!trimmed) throw new Error('請輸入暱稱');
      const anonRes = await supabase.auth.signInAnonymously();
      if (anonRes.error) throw anonRes.error;
      const updateRes = await supabase.auth.updateUser({
        data: { nickname: trimmed },
      });
      if (updateRes.error) throw updateRes.error;
      const user = updateRes.data.user ?? anonRes.data.user;
      if (user?.id) {
        await AsyncStorage.setItem('ANON_USER_ID', user.id);
      }
      return user;
    },
    { manual: true, onSuccess, onError }
  );
  return request;
};

export const useGetProfile = () => {
  const request = useRequest(async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    const user = data.user;
    if (!user) throw new Error('未登入');
    return user;
  });
  return request;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  await AsyncStorage.removeItem('ANON_USER_ID');
  return true;
};

export const useSignOut = () => {
  const request = useRequest(signOut, { manual: true });
  return request;
};

export const getSavedAnonymousUserId = async () => {
  return await AsyncStorage.getItem('ANON_USER_ID');
};

export const getAuthSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data;
};

export const useAuthSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session ?? null);
      setInitializing(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, newSession) => {
        if (!mounted) return;
        setSession(newSession);
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const user: User | null = session?.user ?? null;
  return {
    session,
    user,
    isAuth: Boolean(user),
    loading: initializing,
  } as const;
};
