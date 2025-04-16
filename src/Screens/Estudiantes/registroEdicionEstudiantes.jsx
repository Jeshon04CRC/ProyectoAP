import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Style/Estudiantes/resgistroEdicionEstudiantes';

const RegistroEdicionEstudiantes = () => {
  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nivelAcademico, setNivelAcademico] = useState('');
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

  const guardarCambios = () => {
    console.log('Guardando datos...');
  };

  const sincronizar = () => {
    console.log('Sincronización automática...');
  };

  const seleccionarDocumento = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true
    });

    if (result.type === 'success') {
      setArchivoSeleccionado(result);
      console.log("Archivo:", result);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/*Encabezado institucional */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePageEstudiantes')}>
          <Image
            source={require('../../../assets/LogoTec.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => navigation.navigate('perfilEstudiante')}> 
          <Image
            source={require('../../../assets/avataricon.png')}
            style={styles.headerAvatar}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Título de sección */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Registro y edición del perfil</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
      </View>

      {/* Campos */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>1. Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          value={nombre}
          onChangeText={setNombre}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>2. Correo Institucional</Text>
        <TextInput
          style={styles.input}
          placeholder="usuario@estudiantec.cr"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>3. Carrera</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su carrera"
          value={carrera}
          onChangeText={setCarrera}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>4. Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Número telefónico"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>5. Nivel académico</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={nivelAcademico}
            onValueChange={setNivelAcademico}
          >
            <Picker.Item label="Seleccione..." value="" />
            <Picker.Item label="Bachillerato" value="bachillerato" />
            <Picker.Item label="Licenciatura" value="licenciatura" />
            <Picker.Item label="Maestría" value="maestria" />
          </Picker>
        </View>
      </View>

      {/* Documentos adicionales */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Documentos adicionales</Text>
        <TouchableOpacity onPress={seleccionarDocumento}>
          <View style={styles.documentUploadBox}>
            {archivoSeleccionado ? (
              <Text style={styles.uploadPlaceholder}>{archivoSeleccionado.name}</Text>
            ) : (
              <Text style={styles.uploadPlaceholder}>[Ningún archivo seleccionado]</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Botones */}
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={guardarCambios}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.saveButton, { marginTop: 10 }]} onPress={sincronizar}>
          <Text style={styles.buttonText}>Sincronización automática</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegistroEdicionEstudiantes;
