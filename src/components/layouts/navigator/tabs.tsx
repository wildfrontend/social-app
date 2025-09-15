import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Button, Modal, Portal, Text, useTheme } from 'react-native-paper';

const TabsNavigator = () => {
  const theme = useTheme();
  const tabBarHeight = Platform.select({ ios: 72, android: 60, default: 60 });
  const [composeOpen, setComposeOpen] = useState(false);
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitleStyle: { color: theme.colors.background },
          headerShadowVisible: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.secondary,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.outline,
            height: tabBarHeight,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Threads',
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size ?? 24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="compose"
          options={{
            tabBarButton: () => (
              <Ionicons
                onPress={() => setComposeOpen(true)}
                name={
                  Platform.select({
                    ios: 'add-circle',
                    android: 'add-circle',
                    default: 'add-circle',
                  }) as any
                }
                size={40}
                color={theme.colors.primary}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: '個人檔案',
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={size ?? 24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <Portal>
        <Modal
          visible={composeOpen}
          onDismiss={() => setComposeOpen(false)}
          contentContainerStyle={{
            margin: 24,
            padding: 16,
            borderRadius: 16,
            backgroundColor: theme.colors.surface,
          }}
        >
          <Text style={{ color: theme.colors.onSurface }} variant="titleMedium">
            發佈貼文
          </Text>
          <Text
            style={{ color: theme.colors.onSurface, marginTop: 8 }}
            variant="bodyMedium"
          >
            這是簡單的發佈視窗（示意）。
          </Text>
          <Button
            style={{ marginTop: 16 }}
            mode="contained"
            onPress={() => setComposeOpen(false)}
          >
            關閉
          </Button>
        </Modal>
      </Portal>
    </>
  );
};

export default TabsNavigator;
