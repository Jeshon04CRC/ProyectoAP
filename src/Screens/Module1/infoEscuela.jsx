import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../Style/Module1/infoEscuela';

export default function ContactInfoScreen() {
    const [formData, setFormData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

  // Simulación de datos desde una base de datos
    const fakeFetchContactData = () => {
    return {
        correo: 'sanchaves@estudiantec.cr',
        telefono: '110505500',
        nombre: 'Santiago',
        apellidos: 'Chaves Garbanzo',
        escuela: 'Escuela de Computación',
        sede: 'Campus Tecnológico Central Cartago',
    };
    };

  useEffect(() => {
    setTimeout(() => {
      const data = fakeFetchContactData();
      setFormData(data);
      setOriginalData(data);
    }, 500); // Simula retraso de API
  }, []);

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = () => {
    console.log('Datos guardados:', formData);
    setOriginalData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  if (!formData) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#002b5c" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
            <Image source={require('../../../assets/Login/ImagenLogin.png')} style={styles.image} />
          <Text style={styles.title}>Información de Contacto</Text>
        </View>

        <View style={styles.card}>
          {renderInput("Correo", "correo")}
          {renderInput("Teléfono", "telefono")}
          {renderInput("Nombre del responsable", "nombre")}
          {renderInput("Apellidos del responsable", "apellidos")}
          {renderInput("Escuela", "escuela")}
          {renderInput("Sede", "sede")}
        </View>

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <Button mode="contained" style={styles.button} buttonColor="#002b5c"  onPress={handleSave}>
                Guardar
              </Button>
              <Button mode="outlined" style={styles.button} onPress={handleCancel}>
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button mode="contained" style={styles.button} buttonColor="#002b5c" onPress={() => setIsEditing(true)}>
                Actualizar datos
              </Button>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  function renderInput(label: string, key: string) {
    return (
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.label}>{label}</Text>
        {isEditing ? (
          <TextInput
            value={formData[key]}
            onChangeText={(text) => handleChange(key, text)}
            style={styles.input}
          />
        ) : (
          <Text style={styles.text}>{formData[key]}</Text>
        )}
      </View>
    );
  }
}
