import { useRequest } from 'ahooks';

import { supabase } from './config';

export const useAnonymousLogin = () => {
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
      return updateRes.data.user ?? anonRes.data.user;
    },
    { manual: true }
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

export const useSignOut = () => {
  const request = useRequest(
    async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true as const;
    },
    { manual: true }
  );
  return request;
};
