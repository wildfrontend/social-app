import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native';
import { supabase } from '@/utils/supabase';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';

function maskUrl(url: string) {
  if (!url) return '';
  try {
    const u = new URL(url);
    const host = u.host;
    if (host.length <= 8) return host;
    return `${host.slice(0, 4)}…${host.slice(-4)}`;
  } catch {
    return url.slice(0, 4) + '…';
  }
}

export default function SupabaseTest() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [table, setTable] = useState('profiles');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<string>('(未登入)');

  // Realtime 測試
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const [rtSubscribed, setRtSubscribed] = useState(false);
  const [rtPingCount, setRtPingCount] = useState(0);

  const urlMasked = useMemo(() => maskUrl(SUPABASE_URL), []);

  const run = useCallback(async (fn: () => Promise<void>) => {
    setLoading(true);
    setOutput(null);
    try {
      await fn();
    } catch (e: any) {
      setOutput(`Error: ${e?.message ?? String(e)}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkConnectivity = useCallback(() =>
    run(async () => {
      const { data, error, status } = await supabase.from(table).select('*').limit(1);
      if (error) {
        // 42P01 = relation does not exist -> still proves connectivity/auth is fine
        const tableMissing = (error as any)?.code === '42P01' || /relation .* does not exist/i.test(error.message);
        if (tableMissing) {
          setOutput(`Connected (table "${table}" missing). Status ${status}.`);
          return;
        }
        setOutput(`Request error (status ${status}): ${error.message}`);
        return;
      }
      setOutput(`Success. Rows fetched: ${Array.isArray(data) ? data.length : 0}`);
    }),
  [run, table]);

  const signIn = useCallback(() =>
    run(async () => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setOutput(`Signed in. User: ${data.user?.email ?? data.user?.id}`);
    }),
  [email, password, run]);

  const signOut = useCallback(() =>
    run(async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setOutput('Signed out.');
    }),
  [run]);

  const getSession = useCallback(() =>
    run(async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      const session = data.session;
      setOutput(`Session: ${session ? 'active' : 'none'}`);
      setUserInfo(session?.user?.email ?? session?.user?.id ?? '(未登入)');
    }),
  [run]);

  // 初始化：讀取目前 Session 資訊
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;
      setUserInfo(session?.user?.email ?? session?.user?.id ?? '(未登入)');
    });
  }, []);

  // Realtime 訂閱/取消與 ping 測試
  const subscribeRealtime = useCallback(() =>
    run(async () => {
      if (rtSubscribed) {
        setOutput('已訂閱 Realtime。');
        return;
      }
      const channel = supabase.channel('test-connection');
      channelRef.current = channel;

      channel
        .on('broadcast', { event: 'ping' }, (payload) => {
          setRtPingCount((n) => n + 1);
          setOutput(`收到 ping：${JSON.stringify(payload?.payload ?? {}, null, 2)}`);
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setRtSubscribed(true);
            setOutput('Realtime 已連線 (SUBSCRIBED)。');
          } else if (status === 'CHANNEL_ERROR') {
            setOutput('Realtime 發生錯誤 (CHANNEL_ERROR)。');
          } else if (status === 'TIMED_OUT') {
            setOutput('Realtime 連線逾時 (TIMED_OUT)。');
          } else if (status === 'CLOSED') {
            setOutput('Realtime 已關閉 (CLOSED)。');
            setRtSubscribed(false);
          }
        });
    }),
  [run, rtSubscribed]);

  const unsubscribeRealtime = useCallback(() =>
    run(async () => {
      if (!channelRef.current) {
        setOutput('尚未訂閱 Realtime。');
        return;
      }
      await channelRef.current.unsubscribe();
      channelRef.current = null;
      setRtSubscribed(false);
      setOutput('已取消訂閱 Realtime。');
    }),
  [run]);

  const broadcastPing = useCallback(() =>
    run(async () => {
      if (!channelRef.current || !rtSubscribed) {
        setOutput('請先訂閱 Realtime 再進行 ping。');
        return;
      }
      const ok = await channelRef.current.send({
        type: 'broadcast',
        event: 'ping',
        payload: { at: new Date().toISOString() },
      });
      setOutput(ok ? '已廣播 ping。' : '廣播 ping 失敗。');
    }),
  [run, rtSubscribed]);

  // 卸載時自動清理訂閱
  useEffect(() => {
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, padding: 16, gap: 12, justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Supabase 測試頁</Text>
      <Text>URL: {urlMasked || '(未設定)'}</Text>
      <Text>目前使用者：{userInfo}</Text>

      <View style={{ gap: 8 }}>
        <Text>資料表名稱（可輸入存在的表，預設 profiles）</Text>
        <TextInput
          value={table}
          onChangeText={setTable}
          placeholder="profiles"
          autoCapitalize="none"
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8 }}
        />
        <Button title={loading ? '測試中…' : '測試連線（SELECT 1）'} onPress={checkConnectivity} disabled={loading} />
      </View>

      <View style={{ height: 12 }} />

      <View style={{ gap: 8 }}>
        <Text>電子郵件</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="email@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8 }}
        />
        <Text>密碼</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Your password"
          secureTextEntry
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8 }}
        />
        <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Button title="登入" onPress={signIn} disabled={loading} />
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Button title="登出" onPress={signOut} color="#b91c1c" disabled={loading} />
          </View>
        </View>
        <Button title="取得 Session 狀態" onPress={getSession} disabled={loading} />
      </View>

      <View style={{ height: 12 }} />

      <View style={{ gap: 8 }}>
        <Text>Realtime 測試</Text>
        <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Button title={rtSubscribed ? '已訂閱' : '訂閱'} onPress={subscribeRealtime} disabled={loading || rtSubscribed} />
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Button title="取消訂閱" onPress={unsubscribeRealtime} color="#b91c1c" disabled={loading || !rtSubscribed} />
          </View>
        </View>
        <Button title={`廣播 ping（已收到 ${rtPingCount} 次）`} onPress={broadcastPing} disabled={loading || !rtSubscribed} />
      </View>

      {loading ? (
        <View style={{ alignItems: 'center', padding: 12 }}>
          <ActivityIndicator />
        </View>
      ) : null}

      <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 12 }}>
        <Text style={{ fontWeight: '600', marginBottom: 6 }}>輸出</Text>
        <Text selectable>{output ?? '(尚無輸出)'}</Text>
      </View>
    </View>
  );
}
