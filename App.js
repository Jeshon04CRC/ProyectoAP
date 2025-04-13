import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screens/Login/login'; // Asegúrate de que la ruta sea correcta
import RegisterScrreen from './src/Screens/Login/register'; // Asegúrate de que la ruta sea correcta

//Modulo 1, conexiones 
import HomePageEscuelaScreen  from './src/Screens/Module1/homePageEscuela';
import publiOfertaScreen from './src/Screens/Module1/publiOferta';
import listaOfertasScreen from './src/Screens/Module1/listaOfertas';
import crearOfertaScreen from './src/Screens/Module1/crearOferta';
import cursosEscuelaScreen from './src/Screens/Module1/cursosEscuela';  
import infoEscuelaScreen from './src/Screens/Module1/infoEscuela'; 
import actualizarPoliticasScreen from './src/Screens/Module1/actualizarPoliticas';
import adminPerfinEscuelaScreen from './src/Screens/Module1/adminPerfinEscuela'; // Asegúrate de que la ruta sea correcta
import historialAsistenciaScreen from './src/Screens/Module1/historialAsistencia';
import editarOfertaScreen from './src/Screens/Module1/editarOferta';
import historialPostulantesScreen from './src/Screens/Module1/historialPostulantes'; // Asegúrate de que la ruta sea correcta
import perfilEstudianteScreen from './src/Screens/Module1/perfilPostulante';
import asistenciaTotalHistScreen from './src/Screens/Module1/asistenciaTotalHist'; // Asegúrate de que la ruta sea correcta
import historialPagoAsisScreen from './src/Screens/Module1/historialPagoAsis'; // Asegúrate de que la ruta sea correcta


//Modulo de Profesores
import HomePage from './src/Screens/Profesores/homePage';
import RegistroEdicion from './src/Screens/Profesores/registroEdicion';
import GestionAsignaturas from './src/Screens/Profesores/gestionAsignaturas';
import EvaluacionRetroalimentacion from './src/Screens/Profesores/evaluacionRetroalimentacion'; 
import creacionOfertas from './src/Screens/Profesores/creacionOfertas';  
import EdicionOfertas from './src/Screens/Profesores/edicionOfertas';
import GestionPostulaciones from './src/Screens/Profesores/gestionPostulaciones';
import InfoEstudiante from './src/Screens/Profesores/infoEstudiante';


const Stack = createStackNavigator();

export default function App() {
  // Return the main navigation container with stack navigator
  return (
    <NavigationContainer>

        <Stack.Navigator initialRouteName="login">

        {/* Login and Registration Screens */}
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="registroPage" component={RegisterScrreen} />

        {/* Module 1 Screens */}
        <Stack.Screen name="homePageEscuela" component={HomePageEscuelaScreen} />
        <Stack.Screen name="publiOferta" component={publiOfertaScreen} />
        <Stack.Screen name="listaOfertas" component={listaOfertasScreen} />
        <Stack.Screen name="crearOferta" component={crearOfertaScreen} />
        <Stack.Screen name="cursosEscuela" component={cursosEscuelaScreen} />
        <Stack.Screen name="infoEscuela" component={infoEscuelaScreen} />
        <Stack.Screen name="actualizarPoliticas" component={actualizarPoliticasScreen} />
        <Stack.Screen name="adminPerfinEscuela" component={adminPerfinEscuelaScreen} />
        <Stack.Screen name="historialAsistencia" component={historialAsistenciaScreen} />
        <Stack.Screen name="editarOferta" component={editarOfertaScreen} />
        <Stack.Screen name="historialPostulantes" component={historialPostulantesScreen} />
        <Stack.Screen name="perfilEstudiante" component={perfilEstudianteScreen} />
        <Stack.Screen name="asistenciaTotalHist" component={asistenciaTotalHistScreen} />
        <Stack.Screen name="historialPagoAsis" component={historialPagoAsisScreen} />

        {/* Module Profesores*/}
        <Stack.Screen name="HomePageProfesores" component={HomePage} options={{title: "Inicio"}} />
        <Stack.Screen name="registroEdicion" component={RegistroEdicion} options={{title: "Registro y edición"}}/>
        <Stack.Screen name="gestionAsignaturas" component={GestionAsignaturas} options={{title: "Gestión de Asignaturas"}}/>
        <Stack.Screen name="evaluacionRetroalimentacion" component={EvaluacionRetroalimentacion} options={{title: "Evaluación"}}/>
        <Stack.Screen name="creacionOfertasProfesores" component={creacionOfertas} options={{title: "Crear Oferta"}}/>
        <Stack.Screen name="edicionOfertas" component={EdicionOfertas} options={{title: "Edición de Ofertas"}}/>
        <Stack.Screen name="gestionPostulaciones" component={GestionPostulaciones} options={{title: "Gestión de Postulaciones"}}/>
        <Stack.Screen name="InfoEstudiante" component={InfoEstudiante} options={{title: "Información del Estudiante"}}/>




      </Stack.Navigator>
    </NavigationContainer>
  );
}
