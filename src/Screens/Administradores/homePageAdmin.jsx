import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Style/Administradores/homePageAdmin';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import URL from '../../Services/url';
import { Buffer } from 'buffer';


const HomePageAdmin = () => {
  const navigation = useNavigation();

  const options = [
    "Gestión de Usuarios y Roles",
    "Monitoreo de actividades",
    "Validación de ofertas publicadas"
  ];

  const screenMapping = {
    "Gestión de Usuarios y Roles": "GestionRolesUsuarios",
    "Monitoreo de actividades": "MonitoreoActividades",
    "Validación de ofertas publicadas": "ValidacionOfertas"
  };


  // Aquí defines la función que se llamará cuando presionen el botón
  const handleRespaldoMasivo = async () => {
    try {
      const response = await fetch(`${URL}:3000/respaldos/masivo`);

      if (!response.ok) {
        throw new Error('Respuesta no OK del servidor');
      }

      const blob = await response.blob();

      // Crear una URL para el blob
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace invisible para descargar
      const a = document.createElement('a');
      a.href = url;
      a.download = 'respaldo_masivo.zip';
      document.body.appendChild(a);
      a.click();

      // Limpiar
      a.remove();
      window.URL.revokeObjectURL(url);

      alert('Respaldo descargado correctamente.');
    } catch (error) {
      console.error('Error al descargar respaldo:', error);
      alert('Ocurrió un error al descargar el respaldo.');
    }
  };


  return (
    <ScrollView style={styles.container}>
      {/* Header institucional */}
      <View style={styles.headerBar}>
        <Image
          source={require('../../../assets/LogoTec.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation.navigate('perfilAdmin')}>
          <Image
            source={require('../../../assets/avataricon.png')}
            style={styles.headerAvatar}
          />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <Text style={styles.title}>Menú de Administradores</Text>

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

        {/* Botón Respaldo Masivo */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4CAF50', marginTop: 10 }]}
          onPress={handleRespaldoMasivo}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>Respaldo Masivo</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de salir */}
      <TouchableOpacity
        style={[styles.button, { marginTop: 40, backgroundColor: '#405F90' }]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>Salir</Text>
      </TouchableOpacity>

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

export default HomePageAdmin;
