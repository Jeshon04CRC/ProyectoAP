import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../../Style/Module1/crearPagoEstudiante';


// "Base de datos" local
const estudiantesBD = [
  { id: '1', nombre: 'Ana Pérez' },
  { id: '2', nombre: 'Luis Gómez' },
  { id: '3', nombre: 'Carlos Mora' }
];

const ofertasBD = [
  { id: '101', nombre: 'Beca Alimentaria' },
  { id: '102', nombre: 'Subsidio Transporte' },
  { id: '103', nombre: 'Ayuda Económica Especial' }
];

export default function CrearBeneficio() {
  const [estudiante, setEstudiante] = useState('');
  const [oferta, setOferta] = useState('');
  const [tipo, setTipo] = useState('');
  const [monto, setMonto] = useState('');
  const [semestre, setSemestre] = useState('');

  const crearBeneficio = () => {
    const beneficio = {
      estudiante,
      oferta,
      tipo,
      monto,
      semestre
    };
    console.log('Beneficio creado:', beneficio);
    // Aquí podrías hacer un POST a un servidor si lo necesitaras
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear un nuevo beneficiario</Text>

      <Text style={styles.label}>Estudiante</Text>
      <Picker
        selectedValue={estudiante}
        onValueChange={(value) => setEstudiante(value)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione el estudiante" value="" />
        {estudiantesBD.map((est) => (
          <Picker.Item key={est.id} label={est.nombre} value={est.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Oferta</Text>
      <Picker
        selectedValue={oferta}
        onValueChange={(value) => setOferta(value)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione la oferta" value="" />
        {ofertasBD.map((of) => (
          <Picker.Item key={of.id} label={of.nombre} value={of.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Tipo de beneficio</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={(value) => setTipo(value)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione el tipo" value="" />
        <Picker.Item label="Exoneración" value="Exoneración" />
        <Picker.Item label="Pago" value="Pago" />
      </Picker>

      <Text style={styles.label}>Monto</Text>
      <TextInput
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={styles.input}
        placeholder="Ingrese el monto"
      />

      <Text style={styles.label}>Semestre</Text>
      <Picker
        selectedValue={semestre}
        onValueChange={(value) => setSemestre(value)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione el semestre" value="" />
        <Picker.Item label="I Semestre" value="I Semestre" />
        <Picker.Item label="II Semestre" value="II Semestre" />
      </Picker>

      <View style={styles.buttonRow}>

        <TouchableOpacity style={styles.buttonCreate} onPress={crearBeneficio}>
          <Text style={styles.buttonText}>Crear beneficio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
