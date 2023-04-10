import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Details } from '../screens/Details';
import { Search } from '../screens/Search';

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ title: 'Detalhes sobre a receita' }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ title: 'Veja o que encontramos' }}
      />
    </Stack.Navigator>
  );
}
