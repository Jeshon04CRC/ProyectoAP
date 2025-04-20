import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../../Style/Profesores/registroEdicion';

const RegistroEdicion = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { contactInfo, carrera} = route.params;

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [departamento, setDepartamento] = useState('');

  // Cuando el componente se monte, inicializa los estados con contactInfo recibido
  useEffect(() => {
    if (contactInfo) {
      setNombre(contactInfo.nombre || '');
      setCorreo(contactInfo.correo || '');
      setTelefono(contactInfo.telefono || '');
      setDepartamento(carrera);
    }
  }, [contactInfo]);

  // Función para manejar el guardado de cambios (POST/PUT al endpoint)
  const guardarCambios = async () => {
    console.log('Guardando cambios...');
    const updatedData = { nombre, apellidos, correo, telefono, departamento };
    console.log(updatedData);
    // Ejemplo de llamada al endpoint (debes ajustar la URL y método según tu API):
    // try {
    //   const response = await axios.post('https://tuservidor/api/actualizarContacto', updatedData);
    //   if (response.status === 200) {
    //     console.log('Datos actualizados correctamente');
    //     // Podrías navegar de regreso o mostrar un mensaje de éxito
    //   }
    // } catch (error) {
    //   console.error('Error al actualizar datos', error);
    // }
  };

  // Función para regresar a la ruta anterior
  const regresar = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Registro y Edición de Datos</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Campo: Nombre */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>1. Nombre Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su nombre"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        {/* Campo: Correo Institucional */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>2. Correo Institucional</Text>
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
          <Text style={styles.label}>3. Teléfono</Text>
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
          <Text style={styles.label}>4. Escuela o departamento</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su escuela o departamento"
            value={departamento}
            onChangeText={setDepartamento}
            keyboardType="phone-pad"
          />
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

export default RegistroEdicion;