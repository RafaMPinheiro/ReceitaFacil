import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { StackRoutes } from './stackRoutes';
import { Favoritos } from '../screens/Favoritos';

import { colors } from '../styles/color';

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintiColor: '#121212',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={StackRoutes}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused }) => {
            if (focused) {
              return <Ionicons name="home" color="#2f2f2f" size={size} />;
            }
            return <Ionicons name="home-outline" color="#2f2f2f" size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          title: 'Receitas Favoritas',
          tabBarIcon: ({ size, focused }) => {
            if (focused) {
              return (
                <Ionicons name="heart" color={colors.favorite[1]} size={size} />
              );
            }
            return (
              <Ionicons
                name="heart-outline"
                color={colors.favorite[1]}
                size={size}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
