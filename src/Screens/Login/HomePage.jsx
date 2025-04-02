import { View, Text, ScrollView, Image, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { styles } from '../../Style/Login/homePage';


export default function HomePageScreen() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.logoContainer}>
          <Image source={require("../../../assets/LogoTec.png")} style={styles.logo} resizeMode="contain" />
        </View>

        <Text style={styles.sectionTitle}>Perfiles de Escuela/Departamento</Text>

        <View style={styles.menuContainer}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Registro y Administración de Perfiles</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Información del usuario</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Áreas Académicas</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Asignar Estudiantes y Grupos profesores</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Publicaciones de Ofertas de Asistencias, Tutorías y Proyectos</Text>

        <View style={styles.menuContainer}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Publicación de ofertas</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Control de Resultados</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Asignación de Estudiantes a Tutorías</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Publicaciones de Evaluaciones</Text>

        <View style={styles.menuContainer}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Publicación de evaluaciones</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Análisis de evaluaciones</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Gestión de Proyectos</Text>

        <View style={styles.menuContainer}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Control de proyectos</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Gestión de pagos y presupuestos</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>Cursos activos</Text>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statDescription}>Ver todos los estudiantes</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>Estudiantes participantes</Text>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statDescription}>Revisar estudiantes</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>Número de profesores</Text>
              <Text style={styles.statValue}>18</Text>
              <Text style={styles.statDescription}>Ver todos los profesores</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>Desafíos pendientes</Text>
              <Text style={styles.statValue}>6</Text>
              <Text style={styles.statDescription}>Administrar desafíos</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
