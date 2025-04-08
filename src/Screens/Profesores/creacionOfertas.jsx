import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { styles } from '../../Style/Profesores/creacionOfertas'; // Asegúrate de que la ruta sea correcta
const CreacionOfertas = () => {
  // Estados para cada campo del formulario
  const [nombrePrograma, setNombrePrograma] = useState('');
  const [objetivos, setObjetivos] = useState('');
  const [tipo, setTipo] = useState('');
  const [horario, setHorario] = useState('');
  const [vacantes, setVacantes] = useState('');
  const [horasSemanal, setHorasSemanal] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaCierre, setFechaCierre] = useState('');
  const [beneficios, setBeneficios] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [requisitos, setRequisitos] = useState('');

  const handleCrearOferta = () => {
    // Aquí se podría enviar los datos a un API, agregar validaciones, etc.
    console.log('Creando oferta con datos:', {
      nombrePrograma,
      objetivos,
      tipo,
      horario,
      vacantes,
      horasSemanal,
      fechaInicio,
      fechaCierre,
      beneficios,
      descripcion,
      requisitos,
    });
  };

  const handleRegresar = () => {
    console.log('Regresar');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Crear Nueva Oferta</Text>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre del programa</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el nombre del programa"
            value={nombrePrograma}
            onChangeText={setNombrePrograma}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Objetivos del programa</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ingrese los objetivos"
            multiline
            value={objetivos}
            onChangeText={setObjetivos}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tipo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el tipo"
            value={tipo}
            onChangeText={setTipo}
          />
          {/* Alternativamente, se podría usar un Picker para elegir el tipo */}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Horario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el horario"
            value={horario}
            onChangeText={setHorario}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Vacantes</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el número de vacantes"
            keyboardType="numeric"
            value={vacantes}
            onChangeText={setVacantes}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Horas por semana</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese las horas por semana"
            keyboardType="numeric"
            value={horasSemanal}
            onChangeText={setHorasSemanal}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Fecha de inicio</Text>
          <TextInput
            style={styles.input}
            placeholder="AAAA-MM-DD"
            value={fechaInicio}
            onChangeText={setFechaInicio}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Fecha de cierre</Text>
          <TextInput
            style={styles.input}
            placeholder="AAAA-MM-DD"
            value={fechaCierre}
            onChangeText={setFechaCierre}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Beneficios</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese beneficios"
            value={beneficios}
            onChangeText={setBeneficios}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ingrese descripción"
            multiline
            value={descripcion}
            onChangeText={setDescripcion}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Requisitos</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ingrese requisitos"
            multiline
            value={requisitos}
            onChangeText={setRequisitos}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCrearOferta}>
          <Text style={styles.buttonText}>Crear oferta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.regresarButton]} onPress={handleRegresar}>
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreacionOfertas;