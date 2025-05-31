import { View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity, Platform} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { styles } from '../../Style/Module1/homePageEscuela';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';

export default function HomePageScreen() {
  const navigation = useNavigation()
  const route = useRoute();
  const { userId } = route.params;


  console.log("User ID:", userId); // Log the userId to verify it's being passed correctly


  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    }, 1800000); // 20 segundos

    return () => clearTimeout(timer);
  }, []);
  
  if (Platform.OS === 'web') {
    return (
      <div style={{ height: '100vh', overflowY: 'auto', background: '#fff' }}>
        <View style={styles.logoContainer}>
          <Image source={require("../../../assets/LogoTec.png")} style={styles.logo} resizeMode="contain" />
        </View>

        <Text style={styles.sectionTitle}>Perfiles de Escuela/Departamento</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("adminPerfilEscuela", { userId: userId })}>
            <Text style={styles.menuItemText}>Registro y edición de perfil institucional</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("infoEscuela", { userId: userId })}>
            <Text style={styles.menuItemText}>Gestión de información de contacto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("cursosEscuela", { userId: userId })}>
            <Text style={styles.menuItemText}>Áreas Académicas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("historialAsistencia", { userId: userId })}>
            <Text style={styles.menuItemText}>Historial de asistencias/tutorías </Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.sectionTitle}>Publicación de Ofertas de Asistencias, Tutorías y Proyectos</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("publiOferta", { userId: userId })}>
            <Text style={styles.menuItemText}>Sistema de publicación de ofertas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("listaOfertas", { userId: userId })}>
            <Text style={styles.menuItemText}>Historial de cambios en la oferta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("historialPostulantes", { userId: userId })}>
            <Text style={styles.menuItemText}>Asignación de Estudiantes a Tutorías</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Gestión de Postulaciones de Estudiantes</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("asistenciaTotalHist", { userId: userId })}>
            <Text style={styles.menuItemText}>Visualización de postulantes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("crearPagoEstudiante", { userId: userId })}>
            <Text style={styles.menuItemText}>Gestion de postulaciones</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Gestión de Proyectos</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("historialPagoAsis", { userId: userId })}>
            <Text style={styles.menuItemText}>Pagos actuales</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("historialPagos", { userId: userId })}>
            <Text style={styles.menuItemText}>Historial y reportes</Text>
          </TouchableOpacity>
        </View>

      
      </div>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.logoContainer}>
          <Image source={require("../../../assets/LogoTec.png")} style={styles.logo} resizeMode="contain" />
        </View>

        <Text style={styles.sectionTitle}>Perfiles de Escuela/Departamento</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("adminPerfilEscuela", { userId: userId })}>
            <Text style={styles.menuItemText}>Registro y edición de perfil institucional</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("infoEscuela", { userId: userId })}>
            <Text style={styles.menuItemText}>Gestión de información de contacto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("cursosEscuela", { userId: userId })}>
            <Text style={styles.menuItemText}>Áreas Académicas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("historialAsistencia", { userId: userId })}>
            <Text style={styles.menuItemText}>Historial de asistencias/tutorías </Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.sectionTitle}>Publicación de Ofertas de Asistencias, Tutorías y Proyectos</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("publiOferta", { userId: userId })}>
            <Text style={styles.menuItemText}>Sistema de publicación de ofertas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("listaOfertas", { userId: userId })}>
            <Text style={styles.menuItemText}>Historial de cambios en la oferta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("historialPostulantes", { userId: userId })}>
            <Text style={styles.menuItemText}>Asignación de Estudiantes a Tutorías</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Gestión de Postulaciones de Estudiantes</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("asistenciaTotalHist", { userId: userId })}>
            <Text style={styles.menuItemText}>Visualización de postulantes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("crearPagoEstudiante", { userId: userId })}>
            <Text style={styles.menuItemText}>Gestion de postulaciones</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Gestión de Proyectos</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("historialPagoAsis", { userId: userId })}>
            <Text style={styles.menuItemText}>Pagos actuales</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("historialPagos", { userId: userId })}>
            <Text style={styles.menuItemText}>Historial y reportes</Text>
          </TouchableOpacity>
        </View>

      
      </ScrollView>
    </SafeAreaView>
  )
}
