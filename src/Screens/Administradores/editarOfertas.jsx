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
import { styles } from '../../Style/Administradores/editarUsuario'; // reutilizando estilos

const EditarOferta = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    nombre = '',
    tipo = '',
    fechaInicio = '',
    fechaCierre = '',
    estado = '',
    horasSemana = '',
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
      case 'tipo': return 'Nuevo tipo';
      case 'fechaInicio': return 'Nueva fecha de inicio';
      case 'fechaCierre': return 'Nueva fecha de cierre';
      case 'estado': return 'Nuevo estado';
      case 'horasSemana': return 'Nuevas horas por semana';
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
        <Text style={styles.headerText}>Editar Oferta</Text>
      </View>

      {/* Datos actuales */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.input}>{nombre}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.input}>{tipo}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fecha de inicio:</Text>
        <Text style={styles.input}>{fechaInicio}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fecha de cierre:</Text>
        <Text style={styles.input}>{fechaCierre}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.input}>{estado}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Horas por semana:</Text>
        <Text style={styles.input}>{horasSemana}</Text>
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
          <Picker.Item label="Tipo" value="tipo" />
          <Picker.Item label="Fecha de inicio" value="fechaInicio" />
          <Picker.Item label="Fecha de cierre" value="fechaCierre" />
          <Picker.Item label="Estado" value="estado" />
          <Picker.Item label="Horas por semana" value="horasSemana" />
        </Picker>
      </View>

      {/* Campo editable */}
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

export default EditarOferta;
