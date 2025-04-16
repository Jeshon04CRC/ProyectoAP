import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Style/Estudiantes/homePageEstudiantes';

const HomePageEstudiantes = () => {
  const navigation = useNavigation();

  const contactInfo = {
    correo: "sanchaves@itcr.ac.cr",
    telefono: "87789002",
    nombreResponsable: "Santiago",
    apellidosResponsable: "Chaves Garbanzo",
    escuelaDepartamento: "Escuela de Computación",
    sede: "Campus Tecnológico Central Cartago"
  };

  const options = [
    "Registro y edición del perfil",
    "Busqueda y aplicacion de oportunidades",
    "Seguimiento de actividades"
  ];

  const screenMapping = {
    "Registro y edición del perfil": "RegistroEdicionEstudiantes",
    "Busqueda y aplicacion de oportunidades": "busquedaApliOportunidades",
    "Seguimiento de actividades": "seguimientoSolicitudes",
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header con logo institucional y avatar */}
      <View style={styles.headerBar}>
        <Image
          source={require('../../../assets/LogoTec.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation.navigate('perfilEstudiante')}>
          <Image
            source={require('../../../assets/avataricon.png')}
            style={styles.headerAvatar}
          />
        </TouchableOpacity>
      </View>

      {/* Sección de Información de Contacto */}
      <Text style={styles.title}>Información de Contacto</Text>
      <View style={styles.contactContainer}>
        <Text style={styles.headerText}>Mis Datos</Text>
        <Text style={styles.label}>
          Correo: <Text style={styles.value}>{contactInfo.correo}</Text>
        </Text>
        <Text style={styles.label}>
          Teléfono: <Text style={styles.value}>{contactInfo.telefono}</Text>
        </Text>
        <Text style={styles.label}>
          Responsable: <Text style={styles.value}>{contactInfo.nombreResponsable} {contactInfo.apellidosResponsable}</Text>
        </Text>
        <Text style={styles.label}>
          Escuela / Departamento: <Text style={styles.value}>{contactInfo.escuelaDepartamento}</Text>
        </Text>
        <Text style={styles.label}>
          Sede: <Text style={styles.value}>{contactInfo.sede}</Text>
        </Text>
      </View>

      {/* Texto adicional debajo de la información de contacto */}
      <Text style={{
        color: 'black',
        fontSize: 16,
        textAlign: 'left',
        marginVertical: 10,
        fontWeight: 'bold'
      }}>
        Publicación de Ofertas de Asistencias, Tutorías y Proyectos
      </Text>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        {options.map((label, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => {
              const route = screenMapping[label];
              if (route) {
                navigation.navigate(route);
              } else {
                alert(`Ruta no definida para: ${label}`);
              }
            }}
          >
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Imagen decorativa */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/Login/ImagenLogin.png')}
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
};

export default HomePageEstudiantes;
