import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { styles } from '../../Style/Estudiantes/formularioAplicacion';

const FormularioAplicacion = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { titulo } = route.params || {};
  const [documento, setDocumento] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    carnet: '',
    telefono: '',
    promedio: '',
    horas: '',
    nota: '',
    comentarios: ''
  });

  const handleChange = (key, value) => {
    setFormulario({ ...formulario, [key]: value });
  };

  const seleccionarDocumento = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (result.type === 'success') setDocumento(result);
  };

  const aplicar = () => {
    console.log('Datos enviados:', formulario, documento);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header con logo */}
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
        {/* Columna izquierda */}
        <View style={{ flex: 1 }}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>1. Nombre</Text>
            <TextInput style={styles.input} onChangeText={t => handleChange('nombre', t)} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>2. Correo Institucional</Text>
            <TextInput style={styles.input} onChangeText={t => handleChange('correo', t)} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>3. Carnet</Text>
            <TextInput style={styles.input} onChangeText={t => handleChange('carnet', t)} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>4. Teléfono</Text>
            <TextInput style={styles.input} onChangeText={t => handleChange('telefono', t)} keyboardType="phone-pad" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>5. Promedio en el último semestre cursado</Text>
            <TextInput style={styles.input} onChangeText={t => handleChange('promedio', t)} keyboardType="decimal-pad" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>6. Cantidad de horas a la semana</Text>
            <TextInput style={styles.input} onChangeText={t => handleChange('horas', t)} keyboardType="numeric" />
          </View>
        </View>

        {/* Columna derecha */}
        <View style={{ flex: 1 }}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>7. Nota con la cual aprobó el curso</Text>
            <TextInput style={styles.input} onChangeText={t => handleChange('nota', t)} keyboardType="decimal-pad" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>8. Comentarios adicionales</Text>
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

      {/* Botón Aplicar */}
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={aplicar}>
          <Text style={styles.buttonText}>Aplicar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FormularioAplicacion;
