import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../../Style/Profesores/registroEdicion'; 

const registroEdicion = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [departamento, setDepartamento] = useState('');

  const guardarCambios = () => {
    console.log('Guardando cambios...');
    console.log({ nombre, apellidos, correo, telefono, departamento });
  };

  const regresar = () => {
    console.log('Regresando...');
  };

  return (
    <ScrollView style={styles.container}>
      {/**Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Registro y Edición de Datos</Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Información</Text>
      </View>
      <View style={styles.formContainer}>

        {/* Campo: Nombre */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>1. Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su nombre"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        {/* Campo: Apellidos */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>2. Apellidos</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese sus apellidos"
            value={apellidos}
            onChangeText={setApellidos}
          />
        </View>

        {/* Campo: Correo Institucional */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>3. Correo Institucional</Text>
          <TextInput
            style={styles.input}
            placeholder="usuario@itcr.ac.cr"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Campo: Teléfono */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>4. Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su teléfono"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />
        </View>

        {/* Campo: Departamento/Escuela (Picker) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>5. Departamento/Escuela</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={departamento}
              onValueChange={(itemValue) => setDepartamento(itemValue)}
            >
              <Picker.Item label="Seleccione..." value="" />
              <Picker.Item label="Escuela de Computación" value="computacion" />
              <Picker.Item
                label="Escuela de Ingeniería en Computación"
                value="ingenieria"
              />
              <Picker.Item
                label="Escuela de Administración de Empresas"
                value="administracion"
              />
              <Picker.Item
                label="Departamento de Becas y Gestión Social"
                value="becas"
              />
            </Picker>
          </View>
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={guardarCambios}
          >
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.returnButton]}
            onPress={regresar}
          >
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default registroEdicion;

