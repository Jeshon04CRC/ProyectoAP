import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screens/Login/login'; // Asegúrate de que la ruta sea correcta
import RegisterScrreen from './src/Screens/Login/register'; // Asegúrate de que la ruta sea correcta

//Modulo 1, conexiones 
import HomePageEscuelaScreen  from './src/Screens/Module1/homePageEscuela';
import publiOfertaScreen from './src/Screens/Module1/publiOferta';
import listaOfertasScreen from './src/Screens/Module1/listaOfertas';
import crearOfertaScreen from './src/Screens/Module1/crearOferta';


//Modulo de Profesores
import HomePage from './src/Screens/Profesores/homePage';
import registroEdicion from './src/Screens/Profesores/registroEdicion';

const Stack = createStackNavigator();

export default function App() {
  // Return the main navigation container with stack navigator
  return (
    <NavigationContainer>

      {/** Comentar y descomentar la ruta inicial a necesidad de cada uno */}
      {/*<Stack.Navigator initialRouteName="login">*/}
      <Stack.Navigator initialRouteName="HomePageProfesores" screenOptions={{ headerShown: false }}>

        {/* Login and Registration Screens */}
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="registroPage" component={RegisterScrreen} />

        {/* Module 1 Screens */}
        <Stack.Screen name="homePageEscuela" component={HomePageEscuelaScreen} />
        <Stack.Screen name="publiOferta" component={publiOfertaScreen} />
        <Stack.Screen name="listaOfertas" component={listaOfertasScreen} />
        <Stack.Screen name="crearOferta" component={crearOfertaScreen} />

        {/* Module Profesores*/}
        <Stack.Screen name="HomePageProfesores" component={HomePage} />
        <Stack.Screen name="registroEdicion" component={registroEdicion} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
