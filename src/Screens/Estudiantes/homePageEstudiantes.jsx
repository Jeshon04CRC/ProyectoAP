import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Style/Estudiantes/homePageEstudiantes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import URL from '../../Services/url';

const HomePageEstudiantes = () => {
  const navigation = useNavigation();
  const [contactInfo, setContactInfo] = useState(null);

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

  useEffect(() => {
    const fetchContactInfo = async () => {
      const userId = await AsyncStorage.getItem('userId');
      console.log("Consultando datos del estudiante con userId:", userId);

      if (!userId) return;

      try {
        const apiUrl = `${URL}:3000`;
        const response = await axios.get(`${apiUrl}/estudiantes/infoEstudiantes`, {
          params: { userId }
        });

        const datos = response.data.datos;

        const contactData = {
          correo: datos.correo,
          telefono: datos.telefono,
          nombreResponsable: datos.nombre,
          apellidosResponsable: datos.apellidos || '',
          escuelaDepartamento: datos.escuela || datos.departamento || 'No asignado',
          sede: datos.sede || 'Sin sede',
        };

        setContactInfo(contactData);
      } catch (error) {
        console.error("Error al cargar datos del estudiante:", error);
      }
    };

    fetchContactInfo();
  }, []);

  if (!contactInfo) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#002b5c" />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Cargando datos del estudiante...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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

      <Text style={{
        color: 'black',
        fontSize: 16,
        textAlign: 'left',
        marginVertical: 10,
        fontWeight: 'bold'
      }}>
        Publicación de Ofertas de Asistencias, Tutorías y Proyectos
      </Text>

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
