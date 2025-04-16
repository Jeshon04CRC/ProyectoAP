import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../../Style/Administradores/editarUsuario';

const EditarUsuario = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    nombre = '',
    correo = '',
    carrera = '',
    telefono = '',
    departamento = '',
  } = route.params || {};

  const [campoSeleccionado, setCampoSeleccionado] = useState('');
  const [nuevoValor, setNuevoValor] = useState('');

  const guardarCambios = () => {
    if (!campoSeleccionado || !nuevoValor) {
      alert('Por favor seleccione un campo y escriba un nuevo valor.');
      return;
    }
    console.log(`Campo actualizado: ${campoSeleccionado} → ${nuevoValor}`);
    alert(`Se actualizó el campo ${campoSeleccionado}`);
    navigation.goBack();
  };

  const obtenerPlaceholder = () => {
    switch (campoSeleccionado) {
      case 'nombre': return 'Nuevo nombre';
      case 'correo': return 'Nuevo correo';
      case 'carrera': return 'Nueva carrera';
      case 'telefono': return 'Nuevo teléfono';
      case 'departamento': return 'Nuevo departamento';
      default: return '';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePageAdmin')}>
          <Image
            source={require('../../../assets/LogoTec.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/avataricon.png')}
            style={styles.headerAvatar}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Editar Usuario</Text>
      </View>

      {/* Datos actuales */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.input}>{nombre}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.input}>{correo}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Carrera:</Text>
        <Text style={styles.input}>{carrera}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.input}>{telefono}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Escuela / Departamento:</Text>
        <Text style={styles.input}>{departamento}</Text>
      </View>

      {/* Selector de campo */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Seleccionar campo a editar</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={campoSeleccionado}
          onValueChange={(itemValue) => {
            setCampoSeleccionado(itemValue);
            setNuevoValor('');
          }}
        >
          <Picker.Item label="Seleccione un campo" value="" />
          <Picker.Item label="Nombre" value="nombre" />
          <Picker.Item label="Correo" value="correo" />
          <Picker.Item label="Carrera" value="carrera" />
          <Picker.Item label="Teléfono" value="telefono" />
          <Picker.Item label="Escuela / Departamento" value="departamento" />
        </Picker>
      </View>

      {/* Campo editable para nuevo valor */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nuevo valor:</Text>
        <TextInput
          style={styles.input}
          value={nuevoValor}
          onChangeText={setNuevoValor}
          placeholder={obtenerPlaceholder()}
        />
      </View>

      {/* Botones */}
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={guardarCambios}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.returnButton, { marginTop: 10 }]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditarUsuario;
