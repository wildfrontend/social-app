import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const Home = () => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: theme.colors.onBackground }}>Home Feed</Text>
    </View>
  );
};

export default Home;
