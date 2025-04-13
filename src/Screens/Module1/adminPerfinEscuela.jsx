import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ProfileRegistrationScreen = () => {
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
};

export default ProfileRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileIcon: {
    marginRight: 10,
  },
  profileEmoji: {
    fontSize: 28,
  },
  titleBox: {
    backgroundColor: '#e6f0ff',
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#3399ff',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#002b5c',
  },
  subTitleBox: {
    backgroundColor: '#f0f4ff',
    padding: 8,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ccdfff',
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#002b5c',
  },
  formBox: {
    backgroundColor: '#e6edff',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
    color: '#002b5c',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 10,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#2d4f87',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
