import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../../Style/Module1/historialPostulantes';

const estudiantesData = [
  {
    id: '1',
    nombre: 'Tomás Abarca',
    idEstudiante: 'ISTA',
    carrera: 'Computación',
    nivel: 'Principiante',
    ponderado: '89.5',
    cursosAprobados: '20',
    estado: 'Aprobado'
  },
  {
    id: '2',
    nombre: 'Ana Pérez',
    idEstudiante: 'TPS',
    carrera: 'Ingeniería Civil',
    nivel: 'Avanzado',
    ponderado: '90.1',
    cursosAprobados: '30',
    estado: 'Inactivo'
  },
  {
    id: '3',
    nombre: 'Carlos Martínez',
    idEstudiante: 'CML',
    carrera: 'Computación',
    nivel: 'Intermedio',
    ponderado: '85.0',
    cursosAprobados: '15',
    estado: 'Activo'
  },
  // Puedes agregar más estudiantes aquí
];

export default function EstudiantesPostuladosScreen() {
  const [filtro, setFiltro] = useState('Todos');
  const [search, setSearch] = useState('');
  const [carreraFilter, setCarreraFilter] = useState('');
  const [nivelFilter, setNivelFilter] = useState('');
  const navigator = useNavigation();

  // Filtrar por nombre, estado, carrera y nivel
  const filteredData = estudiantesData.filter((estudiante) => {
    const matchesEstado = filtro === 'Todos' || estudiante.estado === filtro;
    const matchesCarrera = carreraFilter === '' || estudiante.carrera === carreraFilter;
    const matchesNivel = nivelFilter === '' || estudiante.nivel === nivelFilter;
    const matchesSearch = estudiante.nombre.toLowerCase().includes(search.toLowerCase());

    return matchesEstado && matchesCarrera && matchesNivel && matchesSearch;
  });

  // Obtener las carreras y niveles únicos
  const carreras = [...new Set(estudiantesData.map((item) => item.carrera))];
  const niveles = [...new Set(estudiantesData.map((item) => item.nivel))];

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TEC | Tecnológico de Costa Rica</Text>
      <View style={styles.filterRow}>
        {['Todos', 'Aprobado', 'Activo', 'Inactivo'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.filterButton, filtro === item && styles.activeFilter]}
            onPress={() => setFiltro(item)}
          >
            <Text style={styles.filterText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.controlsRow}>
        <Text>Show</Text>
        <View style={styles.entriesBox}><Text>10</Text></View>
        <Text>entries</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.filterDropdowns}>
          <Text>Carrera</Text>
          <Picker
            selectedValue={carreraFilter}
            style={styles.picker}
            onValueChange={(itemValue) => setCarreraFilter(itemValue)}
          >
            <Picker.Item label="Todos" value="" />
            {carreras.map((carrera) => (
              <Picker.Item key={carrera} label={carrera} value={carrera} />
            ))}
          </Picker>

          <Text>Nivel académico</Text>
          <Picker
            selectedValue={nivelFilter}
            style={styles.picker}
            onValueChange={(itemValue) => setNivelFilter(itemValue)}
          >
            <Picker.Item label="Todos" value="" />
            {niveles.map((nivel) => (
              <Picker.Item key={nivel} label={nivel} value={nivel} />
            ))}
          </Picker>
        </View>
        <Ionicons name="filter-outline" size={24} color="black" />
      </View>

      <Text style={styles.header}>TODOS LOS ESTUDIANTES POSTULADOS</Text>
      <Text style={styles.subheader}>Gestión de todos los estudiantes</Text>

      <View style={styles.tableHeader}>
        {['Nombre', 'ID', 'Carrera', 'Nivel', 'Ponderado', 'Cursos aprobados', 'Estado', 'Acciones'].map((header) => (
          <Text key={header} style={styles.tableHeaderText}>{header}</Text>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.nombre}</Text>
            <Text style={styles.cell}>{item.idEstudiante}</Text>
            <Text style={styles.cell}>{item.carrera}</Text>
            <Text style={styles.cell}>{item.nivel}</Text>
            <Text style={styles.cell}>{item.ponderado}</Text>
            <Text style={styles.cell}>{item.cursosAprobados}</Text>
            <Text style={[styles.estado, { backgroundColor: '#D6F5E3', color: '#2B8C58' }]}>{item.estado}</Text>
            <TouchableOpacity style={styles.detailsButton} onPress={() => navigator.navigate("perfilEstudiante")}>
              <Text style={styles.detailsButtonText}>Detalles</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}