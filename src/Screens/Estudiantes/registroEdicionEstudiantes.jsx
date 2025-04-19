import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Style/Estudiantes/resgistroEdicionEstudiantes';
import URL from '../../Services/url';

const RegistroPerfilAcademico = () => {
  const navigation = useNavigation();
  const [correo, setCorreo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [nivelAcademico, setNivelAcademico] = useState('');
  const [promedio, setPromedio] = useState('');
  const [documento, setDocumento] = useState(null);

  useEffect(() => {
    const cargarCorreo = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await axios.get(`${URL}:3000/escuelas/infoEscuela`, {
          params: { userId }
        });

        const datos = response.data.datos;
        setCorreo(datos.correo || '');
      } catch (error) {
        console.error("❌ Error al cargar correo:", error.message);
      }
    };

    cargarCorreo();
  }, []);

  const seleccionarDocumento = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (result.type === 'success') setDocumento(result);
  };

  const sincronizarNotas = () => {
    Alert.alert("Sincronización completa", "Notas sincronizadas exitosamente.");
  };

  const registrarPerfil = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      Alert.alert("Error", "No se encontró el usuario.");
      return;
    }
  
    try {
      await axios.post(`${URL}:3000/estudiantes/registrarPerfil`, {
        userId,
        carrera,
        nivelAcademico,
        promedio
      });
  
      Alert.alert("Perfil registrado", "Tu perfil académico ha sido registrado correctamente.");
    } catch (error) {
      console.error("❌ Error al registrar perfil académico:", error.response?.data || error.message);
      Alert.alert("Error", "No se pudo registrar el perfil académico.");
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePageEstudiantes')}>
          <Image source={require('../../../assets/LogoTec.png')} style={styles.headerLogo} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/avataricon.png')} style={styles.headerAvatar} />
        </TouchableOpacity>
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Registro de Perfil Académico</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>1. Correo Institucional</Text>
        <TextInput style={styles.input} value={correo} editable={false} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>2. Carrera</Text>
        <TextInput style={styles.input} value={carrera} onChangeText={setCarrera} placeholder="Ingrese su carrera" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>3. Nivel académico</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={nivelAcademico} onValueChange={setNivelAcademico}>
            <Picker.Item label="Seleccione..." value="" />
            <Picker.Item label="Bachillerato" value="bachillerato" />
            <Picker.Item label="Licenciatura" value="licenciatura" />
            <Picker.Item label="Maestría" value="maestria" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>4. Promedio ponderado</Text>
        <TextInput style={styles.input} value={promedio} onChangeText={setPromedio} keyboardType="decimal-pad" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>5. Documento adicional</Text>
        <TouchableOpacity onPress={seleccionarDocumento}>
          <View style={styles.documentUploadBox}>
            <Text style={styles.uploadPlaceholder}>
              {documento ? documento.name : '[Tocar para seleccionar]'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={sincronizarNotas}>
          <Text style={styles.buttonText}>Sincronizar notas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.saveButton, { marginTop: 10 }]} onPress={registrarPerfil}>
          <Text style={styles.buttonText}>Registrar perfil académico</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegistroPerfilAcademico;
