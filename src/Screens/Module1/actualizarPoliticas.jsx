import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';

export default function PolicyUpdateScreen() {
  const [formData, setFormData] = useState({
    promedio: '',
    horas: '',
    cursos: '',
    requisitos: '',
  });

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleUpdate = () => {
    console.log('Datos actualizados:', formData);
    // Aquí puedes hacer una petición a la base de datos o API
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={require("../../../assets/LogoTec.png")} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={styles.title}>Actualización de políticas</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Promedio mínimo</Text>
              <TextInput
                style={styles.input}
                value={formData.promedio}
                onChangeText={(text) => handleChange('promedio', text)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Horas por semestre</Text>
              <TextInput
                style={styles.input}
                value={formData.horas}
                onChangeText={(text) => handleChange('horas', text)}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={styles.label}>Cursos aprobados</Text>
          <TextInput
            style={styles.textArea}
            value={formData.cursos}
            onChangeText={(text) => handleChange('cursos', text)}
            multiline
          />

          <Text style={styles.label}>Requisitos adicionales</Text>
          <TextInput
            style={styles.textArea}
            value={formData.requisitos}
            onChangeText={(text) => handleChange('requisitos', text)}
            multiline
          />

          <Button
            mode="contained"
            buttonColor="#002b5c"
            style={styles.button}
            onPress={handleUpdate}
          >
            Actualizar datos
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002b5c',
    borderWidth: 2,
    borderColor: '#007aff',
    padding: 10,
    textAlign: 'center',
    width: '100%',
    backgroundColor: '#e6f0ff',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#e6eeff',
    width: '100%',
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  inputContainer: {
    flex: 1,
  },
  button: {
    marginTop: 16,
    alignSelf: 'flex-start',
  },
});
