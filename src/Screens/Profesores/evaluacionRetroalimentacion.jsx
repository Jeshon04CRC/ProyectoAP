import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../../Style/Profesores/evaluacionRetroalimentacion';

// Componente para mostrar cada registro en una tarjeta
const HistorialCard = ({ registro }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{registro.nombre}</Text>
    <Text style={styles.cardDetail}>Carnet: {registro.carnet}</Text>
    <Text style={styles.cardDetail}>Tipo: {registro.tipo}</Text>
    <Text style={styles.cardDetail}>Curso: {registro.curso}</Text>
    <Text style={styles.cardDetail}>Semestre: {registro.semestre}</Text>
    <Text style={styles.cardDetail}>Estado: {registro.estado}</Text>
    <Text style={styles.cardDetail}>Año: {registro.año}</Text>
    <Text style={styles.cardDetail}>
      Comentario: {registro.comentario !== "" ? registro.comentario : "Sin comentario"}
    </Text>
    <Text style={styles.cardDetail}>
      Desempeño: {registro.desempeño !== "" ? registro.desempeño : "Sin desempeño"}
    </Text>
  </View>
);

const EvaluacionRetroalimentacion = () => {
  const { gestionAsignaturas: { historial = [] } = {} } = require('./mockData.json');
  const [filteredHistorial, setFilteredHistorial] = useState(historial);
  const [selectedCarnet, setSelectedCarnet] = useState("");
  const [customCarnet, setCustomCarnet] = useState("");
  const registroInicial = filteredHistorial[0] || {};
  const [registro, setRegistro] = useState(registroInicial);
  const [newComentario, setNewComentario] = useState("");
  const [newDesempeño, setNewDesempeño] = useState("");
  const uniqueCarnets = Array.from(new Set(historial.map(item => item.carnet)));

  // useEffect para filtrar el historial según el carnet seleccionado o el escrito
  useEffect(() => {
    let carnetFilter = selectedCarnet;
    if (selectedCarnet === "custom" && customCarnet.trim() !== "") {
      carnetFilter = customCarnet;
    }
    const newFiltered = carnetFilter !== ""
      ? historial.filter(item => item.carnet === carnetFilter)
      : historial;
    
    setFilteredHistorial(newFiltered);
    setRegistro(newFiltered[0] || {});
  }, [selectedCarnet, customCarnet, historial]);

  const handleGuardar = () => {
    if (filteredHistorial.length > 0) {
      const updatedRegistro = {
        ...filteredHistorial[0],
        comentario: newComentario,
        desempeño: newDesempeño
      };
      setRegistro(updatedRegistro);
      setNewComentario("");
      setNewDesempeño("");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Historial en modo carrusel */}
      <Text style={styles.sectionTitle}>Historial de Evaluación</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carouselContainer}>
        {filteredHistorial.map((reg, index) => (
          <HistorialCard key={reg.id || index} registro={reg} />
        ))}
      </ScrollView>

      {/* Formulario de Evaluación y Retroalimentación */}
      <Text style={styles.sectionTitle}>Evaluación y Retroalimentación</Text>
      {/* Sección para elegir el carnet */}
      <Text style={styles.label}>Seleccione un número de carnet:</Text>
      <Picker
        selectedValue={selectedCarnet}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCarnet(itemValue)}
      >
        <Picker.Item label="Todos" value="" />
        {uniqueCarnets.map(carnet => (
          <Picker.Item key={carnet} label={carnet} value={carnet} />
        ))}
        <Picker.Item label="Personalizado" value="custom" />
      </Picker>
      {selectedCarnet === "custom" && (
        <TextInput
          style={styles.input}
          placeholder="Escribe el carnet..."
          value={customCarnet}
          onChangeText={setCustomCarnet}
        />
      )}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Comentario:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu comentario..."
          value={newComentario}
          onChangeText={setNewComentario}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Desempeño:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa el desempeño..."
          value={newDesempeño}
          onChangeText={setNewDesempeño}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EvaluacionRetroalimentacion;