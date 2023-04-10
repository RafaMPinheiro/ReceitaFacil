import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { Routes } from './src/routes';

function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

export default App;
