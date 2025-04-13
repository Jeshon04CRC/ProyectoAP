import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Button, Avatar, Menu, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const estudiantes = [
  {
    nombre: 'Tomas Abarca',
    id: 'ISTA',
    carrera: 'Computación',
    nivel: 'Principiante',
    ponderado: 89.5,
    cursosAprobados: 20,
    estado: 'Aprobado',
  },
  {
    nombre: 'Isaac',
    id: 'IS12',
    carrera: 'Administración',
    nivel: 'Principiante',
    ponderado: 75.5,
    cursosAprobados: 25,
    estado: 'Inactivo',
  },
  {
    nombre: 'Gabriel',
    id: 'GA32',
    carrera: 'Computación',
    nivel: 'Principiante',
    ponderado: 70.5,
    cursosAprobados: 15,
    estado: 'Aprobado',
  },
];

export default function ListaEstudiantes() {
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [menuCarreraVisible, setMenuCarreraVisible] = useState(false);
  const [menuNivelVisible, setMenuNivelVisible] = useState(false);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState('');
  const [nivelSeleccionado, setNivelSeleccionado] = useState('');
  const navigation = useNavigation();

  const carreras = useMemo(() => [...new Set(estudiantes.map(e => e.carrera))], []);
  const niveles = useMemo(() => [...new Set(estudiantes.map(e => e.nivel))], []);

  const estudiantesFiltrados = estudiantes.filter(e => {
    return (
      (estadoFiltro === '' || e.estado === estadoFiltro) &&
      (busqueda === '' || e.nombre.toLowerCase().includes(busqueda.toLowerCase())) &&
      (carreraSeleccionada === '' || e.carrera === carreraSeleccionada) &&
      (nivelSeleccionado === '' || e.nivel === nivelSeleccionado)
    );
  });

  return (
    <Provider>
      <ScrollView style={styles.container}>

        {/* Filtros por estado */}
        <View style={styles.filtros}>
          <Button onPress={() => setEstadoFiltro('')} style={styles.azulBtn} labelStyle={styles.blancoTexto}>Todos</Button>
          <Button onPress={() => setEstadoFiltro('Aprobado')} style={styles.azulBtn} labelStyle={styles.blancoTexto}>Activos</Button>
          <Button onPress={() => setEstadoFiltro('Inactivo')} style={styles.azulBtn} labelStyle={styles.blancoTexto}>Inactivos</Button>
        </View>

        {/* Búsqueda */}
        <TextInput
          placeholder="Buscar por nombre..."
          style={styles.searchInput}
          value={busqueda}
          onChangeText={setBusqueda}
        />

        {/* Filtros de carrera y nivel en una fila */}
        <View style={styles.filaMenus}>
          <View style={styles.menuContainer}>
            <Menu
              visible={menuCarreraVisible}
              onDismiss={() => setMenuCarreraVisible(false)}
              anchor={
                <Button
                  mode="contained"
                  onPress={() => setMenuCarreraVisible(true)}
                  style={styles.azulBtn}
                  labelStyle={styles.blancoTexto}
                >
                  {carreraSeleccionada || 'Carrera'}
                </Button>
              }
            >
              <Menu.Item onPress={() => { setCarreraSeleccionada(''); setMenuCarreraVisible(false); }} title="Todas" />
              {carreras.map(c => (
                <Menu.Item key={c} onPress={() => { setCarreraSeleccionada(c); setMenuCarreraVisible(false); }} title={c} />
              ))}
            </Menu>
          </View>

          <View style={styles.menuContainer}>
            <Menu
              visible={menuNivelVisible}
              onDismiss={() => setMenuNivelVisible(false)}
              anchor={
                <Button
                  mode="contained"
                  onPress={() => setMenuNivelVisible(true)}
                  style={styles.azulBtn}
                  labelStyle={styles.blancoTexto}
                >
                  {nivelSeleccionado || 'Nivel'}
                </Button>
              }
            >
              <Menu.Item onPress={() => { setNivelSeleccionado(''); setMenuNivelVisible(false); }} title="Todos" />
              {niveles.map(n => (
                <Menu.Item key={n} onPress={() => { setNivelSeleccionado(n); setMenuNivelVisible(false); }} title={n} />
              ))}
            </Menu>
          </View>
        </View>

        {/* Títulos */}
        <Text style={styles.titulo}>TODOS LOS ESTUDIANTES POSTULADOS</Text>
        <Text style={styles.subtitulo}>Gestión de todos los estudiantes</Text>

        {/* Tabla */}
        <View style={styles.tabla}>
          <View style={styles.filaEncabezado}>
            <Text style={styles.encabezado}>Nombre</Text>
            <Text style={styles.encabezado}>ID</Text>
            <Text style={styles.encabezado}>Carrera</Text>
            <Text style={styles.encabezado}>Nivel</Text>
            <Text style={styles.encabezado}>Ponderado</Text>
            <Text style={styles.encabezado}>Cursos</Text>
            <Text style={styles.encabezado}>Estado</Text>
            <Text style={styles.encabezado}>Acciones</Text>
          </View>

          {estudiantesFiltrados.map((est, index) => (
            <View key={index} style={styles.fila}>
              <Text style={styles.celda}>{est.nombre}</Text>
              <Text style={styles.celda}>{est.id}</Text>
              <Text style={styles.celda}>{est.carrera}</Text>
              <Text style={styles.celda}>{est.nivel}</Text>
              <Text style={styles.celda}>{est.ponderado}</Text>
              <Text style={styles.celda}>{est.cursosAprobados}</Text>
              <Text style={[styles.estado, est.estado === 'Aprobado' ? styles.estadoAprobado : styles.estadoInactivo]}>{est.estado}</Text>
              <TouchableOpacity style={styles.botonDetalles} onPress={() => navigation.navigate("perfilEstudiante")}>
                <Text style={styles.textoDetalles}>Detalles</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#F8FAFF' },
  header: { alignItems: 'flex-end', marginBottom: 16 },
  avatar: { backgroundColor: '#3B5998' },
  filtros: { flexDirection: 'row', justifyContent: 'center', marginBottom: 12, gap: 8 },
  azulBtn: { backgroundColor: '#3B5998', marginHorizontal: 4 },
  blancoTexto: { color: '#fff' },
  searchInput: {
    backgroundColor: '#fff', borderColor: '#DDD', borderWidth: 1, borderRadius: 8,
    paddingHorizontal: 12, height: 40, marginBottom: 12
  },
  filaMenus: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginBottom: 12 },
  menuContainer: { flex: 1 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  subtitulo: { fontSize: 14, color: '#555', marginBottom: 16 },
  tabla: { borderTopWidth: 1, borderColor: '#333' },
  filaEncabezado: { flexDirection: 'row', paddingVertical: 8, backgroundColor: '#E6ECF5' },
  encabezado: { flex: 1, fontWeight: 'bold', fontSize: 12, textAlign: 'center' },
  fila: {
    flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5,
    borderColor: '#999', paddingVertical: 10
  },
  celda: { flex: 1, fontSize: 12, textAlign: 'center' },
  estado: { flex: 1, padding: 4, borderRadius: 8, textAlign: 'center', color: '#fff', fontSize: 12 },
  estadoAprobado: { backgroundColor: '#4CAF50' },
  estadoInactivo: { backgroundColor: '#F44336' },
  botonDetalles: {
    flex: 1, backgroundColor: '#3B5998', padding: 6,
    borderRadius: 6, alignItems: 'center'
  },
  textoDetalles: { color: '#fff', fontSize: 12 },
});
