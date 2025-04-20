import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../../Style/Profesores/seguimientoEstudiantes';
import { useNavigation } from "@react-navigation/native";


const mockData = require('./mockData.json');
const { postulacionesData } = mockData;


const SeguimientoEstudiantes = () => {
  const navigation = useNavigation();
  const acceptedAssistants = postulacionesData.filter(
    (a) => a.estado === "Aprobado"
  );
  
  const [selectedAssistant, setSelectedAssistant] = useState(
    acceptedAssistants.length > 0 ? acceptedAssistants[0] : null
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Seguimiento de estudiantes</Text>
      
      {/* Picker para seleccionar entre los asistentes aceptados */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedAssistant ? selectedAssistant.id.toString() : ''}
          style={styles.picker}
          onValueChange={(itemValue) => {
            const assistant = acceptedAssistants.find(
              (a) => a.id.toString() === itemValue
            );
            setSelectedAssistant(assistant);
          }}
        >
          {acceptedAssistants.map((assistant) => (
            <Picker.Item
              key={assistant.id}
              label={assistant.nombre}
              value={assistant.id.toString()}
            />
          ))}
        </Picker>
      </View>

      {/* Card con la información del asistente seleccionado */}
      {selectedAssistant && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{selectedAssistant.nombre}</Text>
          <Text style={styles.cardDetail}>
            Experiencia: {selectedAssistant.experiencia}
          </Text>
          <Text style={styles.cardDetail}>
            Carrera: {selectedAssistant.carrera}
          </Text>
          <Text style={styles.cardDetail}>
            Nivel: {selectedAssistant.nivel}
          </Text>
          <Text style={styles.cardDetail}>
            Ponderado: {selectedAssistant.ponderado}
          </Text>
          <Text style={styles.cardDetail}>
            Cursos Aprobados: {selectedAssistant.cursosAprobados}
          </Text>
          <Text style={styles.cardDetail}>
            Estado: {selectedAssistant.estado}
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("evaluacionDesempeno", { student: selectedAssistant })}>
            <Text style={styles.buttonText}>Evaluar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botón Regresar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("editarSeguimiento")}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log("Regresar")}>
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SeguimientoEstudiantes;