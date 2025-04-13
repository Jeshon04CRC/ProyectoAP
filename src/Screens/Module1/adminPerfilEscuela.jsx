import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../Style/Module1/adminPerfilEscuela.js';

export default function ProfileRegistrationScreen(){
  const [schoolName, setSchoolName] = useState('');
  const [faculty, setFaculty] = useState('');

  const handleSave = () => {
    // Lógica para guardar cambios
    console.log({ schoolName, faculty });
  };

  const handleClose = () => {
    // Lógica para cerrar o navegar atrás
    console.log('Cerrar');
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("../../../assets/LogoTec.png")} style={styles.logo} resizeMode="contain" />
        </View>

      <View style={styles.titleBox}>
        <Text style={styles.title}>Registro y administración de perfiles</Text>
      </View>

      <View style={styles.subTitleBox}>
        <Text style={styles.subTitle}>Información de la Escuela o Departamento</Text>
      </View>

      <View style={styles.formBox}>
        <Text style={styles.label}>1. Nombre de la Escuela o Departamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Escuela de Computación"
          value={schoolName}
          onChangeText={setSchoolName}
        />

        <Text style={styles.label}>2. Facultad a la que pertenece</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Facultad de Ingeniería"
          value={faculty}
          onChangeText={setFaculty}
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
