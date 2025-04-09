import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Login y registro
import LoginScreen from './src/Screens/Login/login';
import RegisterScrreen from './src/Screens/Login/register';

// Módulo 1
import HomePageEscuelaScreen from './src/Screens/Module1/homePageEscuela';
import publiOfertaScreen from './src/Screens/Module1/publiOferta';
import listaOfertasScreen from './src/Screens/Module1/listaOfertas';
import crearOfertaScreen from './src/Screens/Module1/crearOferta';

// Módulo Profesores
import HomePageProfesores from './src/Screens/Profesores/homePage';
import RegistroEdicion from './src/Screens/Profesores/registroEdicion';





// Módulo Estudiantes
import HomePageEstudiantes from './src/Screens/Estudiantes/homePageEstudiantes';






const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePageEstudiantes" screenOptions={{ headerShown: false }}>

        {/* Login */}
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="registroPage" component={RegisterScrreen} />

        {/* Módulo 1 */}
        <Stack.Screen name="homePageEscuela" component={HomePageEscuelaScreen} />
        <Stack.Screen name="publiOferta" component={publiOfertaScreen} />
        <Stack.Screen name="listaOfertas" component={listaOfertasScreen} />
        <Stack.Screen name="crearOferta" component={crearOfertaScreen} />

        {/* Módulo Profesores */}
        <Stack.Screen name="HomePageProfesores" component={HomePageProfesores} />
        <Stack.Screen name="registroEdicion" component={RegistroEdicion} />




        {/* Módulo Estudiantes */}
        <Stack.Screen name="HomePageEstudiantes" component={HomePageEstudiantes} />







      </Stack.Navigator>
    </NavigationContainer>
  );
}
