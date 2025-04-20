import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { styles } from '../../Style/Profesores/evaluacionDesempeno';

const EvaluacionDesempeno = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // Se espera que se pase el nombre seleccionado desde la pantalla anterior en route.params.selectedName
  const { student } = route.params;

  // Estado para el Picker de Desempeño General y el input de Retroalimentación
  const [desempenoGeneral, setDesempenoGeneral] = useState("Bueno");
  const [retroalimentacion, setRetroalimentacion] = useState("");

  const handleGuardar = () => {
    // Aquí se pueden enviar los datos al API o almacenarlos según tu lógica
    console.log("Evaluación guardada:", {
      selectedName,
      desempenoGeneral,
      retroalimentacion,
    });
    // Ejemplo opcional: mostrar un alert o navegar a otra pantalla
  };

  const handleRegresar = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* El título se construye concatenando el texto fijo con el nombre recibido */}
      <Text style={styles.title}>Evaluación de desempeño de {student.nombre}</Text>
      
      <View style={styles.fieldContainer}>
      {/* Sección del Picker */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Desempeño General</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={desempenoGeneral}
            onValueChange={(itemValue) => setDesempenoGeneral(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Bueno" value="Bueno" />
            <Picker.Item label="Regular" value="Regular" />
            <Picker.Item label="Malo" value="Malo" />
          </Picker>
        </View>
      </View>
      
      {/* Sección de Retroalimentación */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Retroalimentación</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ingrese su retroalimentación..."
          multiline={true}
          value={retroalimentacion}
          onChangeText={setRetroalimentacion}
        />
      </View>
      </View>
      
      {/* Botones de Guardar y Regresar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGuardar}>
          <Text style={styles.buttonText}>Guardar evaluación</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.regresarButton]} onPress={handleRegresar}>
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EvaluacionDesempeno;