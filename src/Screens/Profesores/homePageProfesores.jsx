import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import data from './mockData.json'; 
import { styles } from '../../Style/Profesores/homePageProfesores'; // Asegúrate de que la ruta sea correcta

const HomePage = () => {
  const navigation = useNavigation(); // Usar useNavigation para la navegación
  const { contactInfo, options } = data; 

  const screenMapping = {
    "Registro y edición del perfil": "registroEdicion",
    "Gestión de asignaturas y proyectos": "gestionAsignaturas",
    "Evaluación y retroalimentación": "evaluacionRetroalimentacion",
    "Creación de nuevas ofertas académicas": "creacionOfertasProfesores",
    "Edición y eliminación de ofertas": "edicionOfertas",
    "Gestión de Postulaciones": "gestionPostulaciones",
    "Seguimiento de estudiantes": "seguimientoEstudiantes",
  };

  return (

    <ScrollView style={styles.container}>

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
          Responsable:{' '}
          <Text style={styles.value}>
            {contactInfo.nombreResponsable} {contactInfo.apellidosResponsable}
          </Text>
        </Text>
        <Text style={styles.label}>
          Escuela / Departamento:{' '}
          <Text style={styles.value}>{contactInfo.escuelaDepartamento}</Text>
        </Text>
        <Text style={styles.label}>
          Sede: <Text style={styles.value}>{contactInfo.sede}</Text>
        </Text>
      </View>

      {/* Sección de Botones */}
      <View style={styles.buttonsContainer}>
        {options.map((buttonLabel, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => {
                const routeName = screenMapping[buttonLabel];
                if (routeName) {
                  navigation.navigate(routeName);
                } else {
                  alert('Ruta no definida para este botón: ' + buttonLabel);
                }
            }}
          >
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sección para la imagen */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/Login/ImagenLogin.png')} 
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
};

export default HomePage;