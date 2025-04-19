import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import URL from '../../Services/url';
import { styles } from '../../Style/Estudiantes/formularioAplicacion';

const FormularioAplicacion = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { titulo } = route.params || {};
  const [documento, setDocumento] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    promedio: '',
    horas: '',
    nota: '',
    comentarios: ''
  });

  useEffect(() => {
    const fetchDatosPersonales = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await axios.get(`${URL}:3000/escuelas/infoEscuela`, {
          params: { userId }
        });

        const datos = response.data.datos;

        setFormulario(prev => ({
          ...prev,
          nombre: datos.nombre || '',
          correo: datos.correo || '',
          telefono: datos.telefono || ''
        }));
      } catch (error) {
        console.error("❌ Error al cargar datos del usuario:", error.message);
      }
    };

    fetchDatosPersonales();
  }, []);

  const handleChange = (key, value) => {
    setFormulario({ ...formulario, [key]: value });
  };

  const seleccionarDocumento = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (result.type === 'success') setDocumento(result);
  };

  const aplicar = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
  
      const payload = {
        ...formulario,
        documento: documento?.name || null,
        tituloOportunidad: titulo,
        userId
      };
  
      await axios.post(`${URL}:3000/solicitudes/registrar`, payload);
  
      Alert.alert("Éxito", "Tu solicitud fue enviada correctamente");
      navigation.goBack();
    } catch (error) {
      console.error("❌ Error al registrar solicitud:", error);
      Alert.alert("Error", "No se pudo registrar la solicitud.");
    }
  };
   

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePageEstudiantes')}>
          <Image source={require('../../../assets/LogoTec.png')} style={styles.headerLogo} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/avataricon.png')} style={styles.headerAvatar} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {titulo ? `Formulario - ${titulo}` : 'Formulario para aplicar a asistencias estudiantiles'}
        </Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 20 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>1. Nombre</Text>
            <TextInput style={styles.input} value={formulario.nombre} onChangeText={t => handleChange('nombre', t)} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>2. Correo Institucional</Text>
            <TextInput style={styles.input} value={formulario.correo} onChangeText={t => handleChange('correo', t)} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>3. Teléfono</Text>
            <TextInput style={styles.input} value={formulario.telefono} onChangeText={t => handleChange('telefono', t)} keyboardType="phone-pad" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>4. Promedio en el último semestre cursado</Text>
            <TextInput style={styles.input} onChangeText={t => handleChange('promedio', t)} keyboardType="decimal-pad" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>5. Cantidad de horas a la semana</Text>
            <TextInput style={styles.input} onChangeText={t => handleChange('horas', t)} keyboardType="numeric" />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>6. Nota con la cual aprobó el curso</Text>
            <TextInput style={styles.input} onChangeText={t => handleChange('nota', t)} keyboardType="decimal-pad" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>7. Comentarios adicionales</Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              multiline
              numberOfLines={4}
              onChangeText={t => handleChange('comentarios', t)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Documentos adicionales</Text>
            <TouchableOpacity onPress={seleccionarDocumento}>
              <View style={styles.documentUploadBox}>
                <Text style={styles.uploadPlaceholder}>
                  {documento ? documento.name : '[Tocar para seleccionar]'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={aplicar}>
          <Text style={styles.buttonText}>Aplicar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FormularioAplicacion;
