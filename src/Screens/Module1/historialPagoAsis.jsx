import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../../Style/Module1/historialPagoAsis';

const datosIniciales = [
  { id: '1', estudiante: 'Tomas', carrera: 'Computación', tipo: 'Exoneración', monto: 14500, semestre: 'II Semestre', estado: 'Aprobada' },
  { id: '2', estudiante: 'Laura', carrera: 'Administración', tipo: 'Pago', monto: 5000, semestre: 'I Semestre', estado: 'Aprobada' },
  { id: '3', estudiante: 'Carlos', carrera: 'Electrónica', tipo: 'Pago', monto: 5000, semestre: 'II Semestre', estado: 'Activo' },
];

export default function ListaEstudiantes() {
  const [carrera, setCarrera] = useState('');
  const [nivel, setNivel] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [datos, setDatos] = useState(datosIniciales);

  const beneficioExoneracion = datos
    .filter(d => d.tipo === 'Exoneración')
    .reduce((sum, d) => sum + d.monto, 0);

  const beneficioPago = datos
    .filter(d => d.tipo === 'Pago')
    .reduce((sum, d) => sum + d.monto, 0);

  const beneficioTotal = beneficioExoneracion + beneficioPago;

  const datosFiltrados = datos.filter(d => {
    return (carrera === '' || d.carrera === carrera) &&
           (nivel === '' || d.nivel === nivel) &&
           (filtroEstado === 'Todos' || d.estado === filtroEstado);
  });

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <Card title="Beneficio total" value={beneficioTotal} />
        <Card title="Exoneración de Matrícula" value={beneficioExoneracion} />
        <Card title="Pagos por Hora" value={beneficioPago} />
      </View>

      <View style={styles.filtersRow}>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={carrera}
            style={styles.picker}
            onValueChange={value => setCarrera(value)}
          >
            <Picker.Item label="Carrera" value="" />
            <Picker.Item label="Computación" value="Computación" />
            <Picker.Item label="Administración" value="Administración" />
            <Picker.Item label="Electrónica" value="Electrónica" />
          </Picker>
        </View>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={nivel}
            style={styles.picker}
            onValueChange={value => setNivel(value)}
          >
            <Picker.Item label="Nivel académico" value="" />
            <Picker.Item label="Principiante" value="Principiante" />
            <Picker.Item label="Intermedio" value="Intermedio" />
            <Picker.Item label="Avanzado" value="Avanzado" />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        {['Todos', 'Activo', 'Aprobada'].map(f => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterButton,
              filtroEstado === f && styles.activeButton
            ]}
            onPress={() => setFiltroEstado(f)}
          >
            <Text style={styles.buttonText}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Estudiante</Text>
            <Text style={styles.headerCell}>Carrera</Text>
            <Text style={styles.headerCell}>Tipo</Text>
            <Text style={styles.headerCell}>Monto</Text>
            <Text style={styles.headerCell}>Semestre</Text>
            <Text style={styles.headerCell}>Estado</Text>
        </View>

        <FlatList
            data={datosFiltrados}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
            <View
                style={[
                styles.tableRow,
                { backgroundColor: index % 2 === 0 ? '#f8f9ff' : '#ffffff' },
                ]}
            >
                <Text style={styles.rowCell}>{item.estudiante}</Text>
                <Text style={styles.rowCell}>{item.carrera}</Text>
                <Text style={styles.rowCell}>{item.tipo}</Text>
                <Text style={styles.rowCell}>${item.monto}</Text>
                <Text style={styles.rowCell}>{item.semestre}</Text>
                <Text style={[styles.rowCell, { color: item.estado === 'Aprobada' ? 'green' : 'gray' }]}>
                {item.estado}
                </Text>
            </View>
            )}
        />
        </View>

    </View>
  );
}

function Card({ title, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>${value.toLocaleString()}</Text>
    </View>
  );
}
