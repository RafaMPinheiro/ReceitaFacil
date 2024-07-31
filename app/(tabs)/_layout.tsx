import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { TabBarIcon } from '~/components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          height: 85,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarInactiveTintColor: '#FF000090',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} style={{ marginBottom: -10 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Favoritos',
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: '#00000050',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="heart" color={color} style={{ marginBottom: -10 }} />
          ),
        }}
      />
    </Tabs>
  );
}
