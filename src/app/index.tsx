import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  let fontSize = 24;
  let paddingVertical = 6;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: 'NotoSansTC_100Thin',
        }}
      >
        Noto Sans TC Thin
      </Text>
      <Text
        style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: 'NotoSansTC_200ExtraLight',
        }}
      >
        Noto Sans TC Extra Light
      </Text>
      <Text
        style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: 'NotoSansTC_300Light',
        }}
      >
        Noto Sans TC Light
      </Text>
      <Text
        style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: 'NotoSansTC_400Regular',
        }}
      >
        Noto Sans TC Regular
      </Text>
      <Text
        style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: 'NotoSansTC_500Medium',
        }}
      >
        Noto Sans TC Medium
      </Text>
      <Text
        style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: 'NotoSansTC_600SemiBold',
        }}
      >
        Noto Sans TC Semi Bold
      </Text>
      <Text
        style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: 'NotoSansTC_700Bold',
        }}
      >
        Noto Sans TC Bold
      </Text>
      <Text
        style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: 'NotoSansTC_800ExtraBold',
        }}
      >
        Noto Sans TC Extra Bold
      </Text>
      <Text
        style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: 'NotoSansTC_900Black',
        }}
      >
        Noto Sans TC Black
      </Text>
      <View style={{ height: 24 }} />
      <Link href="/supabase-test" style={{ color: '#2563eb', fontSize: 16 }}>
        前往 Supabase 測試頁
      </Link>
    </View>
  );
}
