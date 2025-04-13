import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Style/Module1/historialPagos'; // Asegúrate de que la ruta sea correcta

const beneficiosBD = [
  {
    id: '1',
    estudiante: 'Tomás',
    carrera: 'Computación',
    oferta: 'Tuto mate',
    tipo: 'Pago',
    monto: 1200,
    semestre: 'II Semestre',
    estado: 'Aprobada',
  },
  {
    id: '2',
    estudiante: 'Santiago',
    carrera: 'Computación',
    oferta: 'Elementos',
    tipo: 'Pago',
    monto: 900,
    semestre: 'I Semestre',
    estado: 'Inactivo',
  },
];

export default function BeneficiosScreen(){
  const [filtro, setFiltro] = useState('Todo');
  const [busqueda, setBusqueda] = useState('');
  const navigation = useNavigation();

  const filtrarBeneficios = () => {
    let resultados = beneficiosBD;

    if (filtro === 'Activo') {
      resultados = resultados.filter((b) => b.estado === 'Aprobada');
    } else if (filtro === 'Inactivo') {
      resultados = resultados.filter((b) => b.estado === 'Inactivo');
    }

    if (busqueda.trim() !== '') {
      resultados = resultados.filter((b) =>
        b.estudiante.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    return resultados;
  };

  const beneficiosFiltrados = filtrarBeneficios();

  const renderBeneficio = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.estudiante}</Text>
      <Text style={styles.cell}>{item.carrera}</Text>
      <Text style={styles.cell}>{item.oferta}</Text>
      <Text style={styles.cell}>{item.tipo}</Text>
      <Text style={styles.cell}>{item.monto}</Text>
      <Text style={styles.cell}>{item.semestre}</Text>
      <Text
        style={[
          styles.cell,
          styles.estado,
          item.estado === 'Aprobada' ? styles.aprobado : styles.inactivo,
        ]}
      >
        {item.estado}
      </Text>
      <TouchableOpacity style={styles.detallesBtn} onPress={() => navigation.navigate("perfilPostulante")}>
        <Text style={styles.detallesText}>Detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODOS LOS BENEFICIOS</Text>
      <Text style={styles.subtitle}>
        Administre todos los beneficios financieros asignados
      </Text>

      {/* Buscador */}
      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* Botones de filtro */}
      <View style={styles.filtros}>
        {['Todo', 'Activo', 'Inactivo'].map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={[
              styles.filtroBtn,
              filtro === tipo && styles.filtroActivo,
            ]}
            onPress={() => setFiltro(tipo)}
          >
            <Text
              style={[
                styles.filtroTexto,
                filtro === tipo && { color: 'white' },
              ]}
            >
              {tipo}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Encabezado */}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Estudiante</Text>
        <Text style={styles.headerCell}>Carrera</Text>
        <Text style={styles.headerCell}>Oferta</Text>
        <Text style={styles.headerCell}>Tipo</Text>
        <Text style={styles.headerCell}>Monto</Text>
        <Text style={styles.headerCell}>Semestre</Text>
        <Text style={styles.headerCell}>Estado</Text>
        <Text style={styles.headerCell}>Acciones</Text>
      </View>

      {/* Lista */}
      <FlatList
        data={beneficiosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderBeneficio}
      />
    </View>
  );
}
