import { Link, Stack, Tabs } from 'expo-router';

import { HeaderButton } from '~/components/HeaderButton';
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
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Favoritos',
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: '#00000050',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
    </Tabs>
  );
}
