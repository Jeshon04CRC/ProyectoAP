import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../../Style/Administradores/cambioRolStyle';

const CambioRol = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { nombre = 'Nombre del usuario', rol = '' } = route.params || {};

  const [rolSeleccionado, setRolSeleccionado] = useState(rol);

  const guardarCambios = () => {
    console.log(`Rol actualizado: ${nombre} ahora es ${rolSeleccionado}`);
    navigation.goBack();
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
        <Text style={styles.headerText}>Cambio de Rol</Text>
      </View>

      {/* Información del Usuario */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre del usuario:</Text>
        <Text style={styles.input}>{nombre}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Rol actual:</Text>
        <Text style={styles.input}>{rol}</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Seleccionar nuevo rol</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={rolSeleccionado}
          onValueChange={(itemValue) => setRolSeleccionado(itemValue)}
        >
          <Picker.Item label="Seleccione un rol" value="" />
          <Picker.Item label="Escuela" value="Escuela" />
          <Picker.Item label="Profesor" value="Profesor" />
          <Picker.Item label="Estudiante" value="Estudiante" />
          <Picker.Item label="Administrador" value="Administrador" />
        </Picker>
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

export default CambioRol;