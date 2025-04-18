import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
    View, Text, TextInput, ScrollView,
    TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../Style/Module1/crearOferta';
import axios from 'axios';
import URL from '../../Services/url';



export default function EditarOfertaScreen() {
  const route = useRoute();
  const oferta = route.params?.oferta;

  const [nombreCurso, setNombreCurso] = useState(oferta?.nombre || '');
  const [profesor, setProfesor] = useState(oferta?.profesor || '');
  const [tipo, setTipo] = useState(oferta?.tipo || '');
  const [estado, setEstado] = useState(oferta?.estado || '');
  const [estudiantes, setEstudiantes] = useState(oferta?.estudiantes?.toString() || '');
  const [horas, setHoras] = useState(oferta?.horas?.toString() || '');
  const [beneficio, setBeneficio] = useState(oferta?.beneficio || '');
  const [descripcion, setDescripcion] = useState(oferta?.descripcion || '');
  const [requisitos, setRequisitos] = useState(oferta?.requisitos || '');
  const [fechaInicio, setFechaInicio] = useState(oferta?.fechaInicio ? new Date(oferta.fechaInicio) : new Date());
  const [fechaCierre, setFechaCierre] = useState(oferta?.fechaLimite ? new Date(oferta.fechaLimite) : new Date());
  const router = useRoute();
  const { userId } = router.params;



  const handleConfirmInicio = (event, selectedDate) => {
    if (selectedDate) setFechaInicio(selectedDate);
  };

  const handleConfirmCierre = (event, selectedDate) => {
    if (selectedDate) setFechaCierre(selectedDate);
  };

  const handleCrearOferta = async () => {
    try {
      const storedUrl = URL;
      const apiUrl = `${storedUrl}:3000`;

      const response = await axios.post(`${apiUrl}/login`, {
        nombreCurso,
        profesor,
        tipo,
        estado,
        estudiantes,
        horas,
        beneficio,
        descripcion,
        requisitos,
        fechaInicio: fechaInicio.toISOString().split('T')[0],
        fechaCierre: fechaCierre.toISOString().split('T')[0]
      });
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      alert("Error de red o del servidor.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{oferta ? 'Editar Oferta' : 'Crear nueva oferta'}</Text>

      <Text>Nombre de la oferta</Text>
      <TextInput style={styles.input} value={nombreCurso} onChangeText={setNombreCurso} />

      <Text>Nombre del profesor</Text>
      <TextInput style={styles.input} value={profesor} onChangeText={setProfesor} />

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Text>Tipo</Text>
          <Picker selectedValue={tipo} onValueChange={setTipo} style={styles.picker}>
            <Picker.Item label="Seleccione el tipo" value="" />
            <Picker.Item label="Tutoria" value="Tutotía" />
            <Picker.Item label="Laboratorio" value="Laboratorio" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text>Estado</Text>
          <Picker selectedValue={estado} onValueChange={setEstado} style={styles.picker}>
            <Picker.Item label="Seleccione el estado" value="" />
            <Picker.Item label="Abierto" value="Abierto" />
            <Picker.Item label="Cerrado" value="Cerrado" />
          </Picker>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text>Número de estudiantes</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={estudiantes}
            onChangeText={setEstudiantes}
          />
        </View>

        <View style={styles.halfInput}>
          <Text>Horas por semana</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={horas}
            onChangeText={setHoras}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text>Fecha de inicio</Text>
          <DateTimePicker
            value={fechaInicio}
            mode="date"
            display="default"
            onChange={handleConfirmInicio}
          />
        </View>

        <View style={styles.halfInput}>
          <Text>Fecha de cierre</Text>
          <DateTimePicker
            value={fechaCierre}
            mode="date"
            display="default"
            onChange={handleConfirmCierre}
          />
        </View>
      </View>

      <Text>Beneficio financiero</Text>
      <TextInput style={styles.input} value={beneficio} onChangeText={setBeneficio} />

      <Text>Descripción</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text>Requisitos académicos</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        value={requisitos}
        onChangeText={setRequisitos}
      />

      <TouchableOpacity style={styles.button} onPress={handleCrearOferta}>
        <Text style={styles.buttonText}>{oferta ? 'Actualizar oferta' : 'Crear oferta'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
