import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Style/Login/login';
import axios from 'axios'; 
import URL from '../../Services/url.js'; // 👈 IMPORTANTE
import AsyncStorage from '@react-native-async-storage/async-storage'; // 👈 IMPORTANTE

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegistro = () => {
    navigation.navigate("registroPage");
  };

  const handleInicioSeccion = async () => {
    try {
      const apiUrl = `${URL}:3000`;
      const response = await axios.post(`${apiUrl}/login`, { email, password });

      if (response.status === 200) {
        const { rol, id } = response.data;

        // Guardar en AsyncStorage
        await AsyncStorage.setItem('userId', id);
        await AsyncStorage.setItem('rol', rol);

        // Navegar según el rol
        if (rol === "estudiante") {
          alert("Login exitoso como estudiante");
          navigation.navigate("HomePageEstudiantes", { userId: id });

        } else if (rol === "profesor") {
          alert("Login exitoso como profesor");
          navigation.navigate("HomePageProfesores", { userId: id });

        } else if (rol === "escuela") {
          alert("Login exitoso como escuela");
          navigation.navigate("homePageEscuela", { userId: id });

        } else if (rol === "admin") {
          alert("Login exitoso como administrador");
          navigation.navigate("HomePageAdmin", { userId: id });
        }
      }

    } catch (error) {
      if (error.response?.status === 401) {
        alert(error.response.data.message);
      } else {
        console.error("Error al hacer la solicitud:", error);
        alert("Error de red o del servidor.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <Text style={styles.subtitle}>Gestión de Asistencias, Tutorías y Proyectos</Text>

      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="correo@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
    
      <TouchableOpacity onPress={handleRegistro}>
        <Text style={styles.forgotPassword}>Registrarse</Text>
      </TouchableOpacity>

      {/*
      <TouchableOpacity onPress={handleRegistro}>
        <Text style={styles.forgotPassword}>Registrarse</Text>
      </TouchableOpacity>
      */}

      <Image source={require('../../../assets/Login/ImagenLogin.png')} style={styles.image} />
    </View>
  );
};

export default LoginScreen;
