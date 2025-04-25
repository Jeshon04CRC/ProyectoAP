import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import opciones from './mockData.json';
import { styles } from '../../Style/Profesores/homePageProfesores';
import URL from '../../Services/url';
import axios from 'axios';

const HomePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  const [contactInfo, setContactInfo] = useState({});
  const [options, setOptions] = useState([]);
  const [carreraId, setCarreraId] = useState('');
  const [carrera, setCarrera] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleInformacion = async () => {
    try {
      const apiUrl = `${URL}:3000`;
      const response = await axios.get(
        `${apiUrl}/moduloProfesores/infoProfesores/${userId}`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error al obtener los datos:', response.statusText);
        return null;
      }
    } catch (err) {
      console.error('Error al realizar la solicitud:', err);
      return null;
    }
  };

  const handleCarreras = async (id) => {
    try {
      const apiUrl = `${URL}:3000`;
      const response = await axios.get(
        `${apiUrl}/moduloProfesores/infoProfesores/${id}`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(
          'Error al obtener los datos de la carrera:',
          response.statusText
        );
        return null;
      }
    } catch (err) {
      console.error(
        'Error al realizar la solicitud de la carrera:',
        err.message
      );
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleInformacion();
        if (data) {
          setContactInfo(data);
          setOptions(opciones.options);
          setCarreraId(data.carrera);

          const carreraData = await handleCarreras(data.carrera);
          if (carreraData) {
            setCarrera(carreraData.nombre);
            console.log('Datos de carrera:', carreraData);
          }
        }
      } catch (err) {
        console.error('Error en fetchData:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (carrera !== null) {
      console.log('Carrera actualizada en estado:', carrera);
    }
  }, [carrera]);

  
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#002b5c" />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>
          Cargando datos del profesor...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', textAlign: 'center' }}>
          Ocurrió un error al cargar los datos.
        </Text>
      </View>
    );
  }

  const screenMapping = {
    'Registro y edición del perfil': 'registroEdicion',
    'Gestión de asignaturas y proyectos': 'gestionAsignaturas',
    'Evaluación y retroalimentación': 'evaluacionRetroalimentacion',
    'Creación de nuevas ofertas académicas': 'creacionOfertasProfesores',
    'Edición y eliminación de ofertas': 'edicionOfertas',
    'Gestión de Postulaciones': 'gestionPostulaciones',
    'Seguimiento de estudiantes': 'seguimientoEstudiantes',
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
          Nombre:{' '}
          <Text style={styles.value}>{contactInfo.nombre}</Text>
        </Text>
        <Text style={styles.label}>
          Escuela / Departamento:{' '}
          <Text style={styles.value}>{carrera}</Text>
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
                navigation.navigate(routeName, { contactInfo: contactInfo, carrera: carrera, userId: userId} );
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
