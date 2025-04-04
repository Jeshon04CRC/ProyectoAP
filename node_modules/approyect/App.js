import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screens/Login/login'; // Asegúrate de que la ruta sea correcta
import HomePageScreen  from './src/Screens/Login/homePage';
import RegisterScrreen from './src/Screens/Login/register'; // Asegúrate de que la ruta sea correcta

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="homePage" component={HomePageScreen} />
        <Stack.Screen name="registroPage" component={RegisterScrreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
