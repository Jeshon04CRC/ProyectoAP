import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import { styles } from '../../Style/Module1/historialAsistencia';

const allData = [
  {
    fecha: 'Nov 15, 2024',
    estudiante: 'Tomas',
    tutor: 'Jaime',
    curso: 'Reque',
    semestre: 'I Semestre',
    estado: 'Completado',
    valoracion: 4.8,
  },
  {
    fecha: 'Sep 10, 2024',
    estudiante: 'Jeffer',
    tutor: 'Bena',
    curso: 'Arky',
    semestre: 'I Semestre',
    estado: 'Pendiente',
    valoracion: 2.8,
  },
  {
    fecha: 'Dic 01, 2024',
    estudiante: 'Luis',
    tutor: 'Ana',
    curso: 'Progra',
    semestre: 'II Semestre',
    estado: 'Completado',
    valoracion: 3.8,
  },
];

export default function HistorialAsistenciaScreen() {
  const [search, setSearch] = useState('');
  const [selectedSemestre, setSelectedSemestre] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');
  const [showSemestreModal, setShowSemestreModal] = useState(false);
  const [showEstadoModal, setShowEstadoModal] = useState(false);

  // 🔁 Obtener valores únicos de semestre y estado
  const uniqueSemestres = [...new Set(allData.map(item => item.semestre))];
  const uniqueEstados = [...new Set(allData.map(item => item.estado))];

  const filteredData = allData.filter(item =>
    item.curso.toLowerCase().includes(search.toLowerCase()) &&
    (selectedSemestre ? item.semestre === selectedSemestre : true) &&
    (selectedEstado ? item.estado === selectedEstado : true)
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardDate}>{item.fecha}</Text>
      <View style={styles.cardRow}>
        <Text style={styles.label}>Estudiante:</Text>
        <Text style={styles.value}>{item.estudiante}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.label}>Tutor:</Text>
        <Text style={styles.value}>{item.tutor}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.label}>Curso:</Text>
        <Text style={styles.value}>{item.curso}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.label}>Semestre:</Text>
        <Text style={styles.value}>{item.semestre}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.estado}>{item.estado}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.label}>Valoración:</Text>
        <Text style={styles.valoracion}>{item.valoracion.toFixed(1)}/5</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Historial de asistencia</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          placeholder="Buscar por curso..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowSemestreModal(true)}>
          <Text style={styles.filterText}>{selectedSemestre || 'Semestre'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowEstadoModal(true)}>
          <Text style={styles.filterText}>{selectedEstado || 'Estado'}</Text>
        </TouchableOpacity>
      </View>

      {/* SEMESTRE MODAL */}
      <Modal transparent visible={showSemestreModal} animationType="slide">
        <Pressable style={styles.modalBackground} onPress={() => setShowSemestreModal(false)}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Seleccionar Semestre</Text>
            {uniqueSemestres.map(sem => (
              <TouchableOpacity
                key={sem}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedSemestre(sem);
                  setShowSemestreModal(false);
                }}>
                <Text>{sem}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => { setSelectedSemestre(''); setShowSemestreModal(false); }}>
              <Text style={styles.modalClear}>Limpiar filtro</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* ESTADO MODAL */}
      <Modal transparent visible={showEstadoModal} animationType="slide">
        <Pressable style={styles.modalBackground} onPress={() => setShowEstadoModal(false)}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Seleccionar Estado</Text>
            {uniqueEstados.map(est => (
              <TouchableOpacity
                key={est}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedEstado(est);
                  setShowEstadoModal(false);
                }}>
                <Text>{est}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => { setSelectedEstado(''); setShowEstadoModal(false); }}>
              <Text style={styles.modalClear}>Limpiar filtro</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}