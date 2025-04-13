import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { styles } from '../../Style/Module1/cursoEscuela';

const DATA = [
  { id: '1', nombre: 'Curso de elementos', estudiantes: 26, profesor: 'Jalina', semestre: 'II Semestre', tipo: 'curso' },
  { id: '2', nombre: 'Arky', estudiantes: 10, profesor: 'Bena', semestre: 'II Semestre', tipo: 'programa' },
  { id: '3', nombre: 'AP', estudiantes: 23, profesor: 'Jalina', semestre: 'II Semestre', tipo: 'curso' },
  { id: '4', nombre: 'Compi', estudiantes: 30, profesor: 'Vargas', semestre: 'II Semestre', tipo: 'curso' },
  { id: '5', nombre: 'Lenguajes', estudiantes: 26, profesor: 'Vargas', semestre: 'II Semestre', tipo: 'programa' },
  { id: '6', nombre: 'FOC', estudiantes: 26, profesor: 'Kristin', semestre: 'II Semestre', tipo: 'curso' },
];

export default function App() {
  const [busqueda, setBusqueda] = useState('');
  const [vista, setVista] = useState('todos');
  const [cantidadMostrar, setCantidadMostrar] = useState(10);
  const navigator = useNavigation();

  const filtrado = useMemo(() => {
    const datosFiltrados = DATA.filter(item => {
      const coincideBusqueda = item.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const coincideVista = vista === 'todos' || item.tipo === vista;
      return coincideBusqueda && coincideVista;
    });
    return datosFiltrados.slice(0, cantidadMostrar);
  }, [busqueda, vista, cantidadMostrar]);

  const header = useMemo(() => (
    <>
      <Text style={styles.header}>Programas de la escuela</Text>

      <View style={styles.searchRow}>
        <Text style={styles.label}>Show</Text>
        <TextInput
          style={styles.entriesBox}
          keyboardType="numeric"
          value={String(cantidadMostrar)}
          onChangeText={(text) => {
            const num = parseInt(text);
            setCantidadMostrar(isNaN(num) ? 0 : num);
          }}
        />
        <TextInput
          style={styles.search}
          placeholder="Search..."
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <View style={styles.toggleRow}>
      <TouchableOpacity
          style={vista === 'todos' ? styles.toggleButtonActive : styles.toggleButton}
          onPress={() => setVista('todos')}
        >
          <Text style={vista === 'todos' ? styles.toggleTextActive : styles.toggleText}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={vista === 'curso' ? styles.toggleButtonActive : styles.toggleButton}
          onPress={() => setVista('curso')}
        >
          <Text style={vista === 'curso' ? styles.toggleTextActive : styles.toggleText}>Cursos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={vista === 'programa' ? styles.toggleButtonActive : styles.toggleButton}
          onPress={() => setVista('programa')}
        >
          <Text style={vista === 'programa' ? styles.toggleTextActive : styles.toggleText}>Programas</Text>
        </TouchableOpacity>
      </View>
    </>
  ), [busqueda, vista, cantidadMostrar]);

  return (
    <FlatList
      ListHeaderComponent={header}
      keyboardShouldPersistTaps="handled"
      data={filtrado}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.cardsContainer}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.nombre}</Text>
          <Text>Estudiantes requeridos: {item.estudiantes}</Text>
          <Text>Profesor: {item.profesor}</Text>
          <Text>{item.semestre}</Text>
          <TouchableOpacity onPress={() => navigator.navigate('actualizarPoliticas')}>
            <Text style={styles.updateLink}>Actualizar políticas </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
