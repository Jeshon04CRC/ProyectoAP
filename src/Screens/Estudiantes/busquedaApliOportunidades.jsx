import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Style/Estudiantes/busquedaApliOportunidades'; 

const oportunidades = [
  {
    id: 1,
    titulo: 'Tutoría de Matemática Discreta',
    escuela: 'Escuela de Matemática',
    encargado: 'Sofía Méndez',
    horas: '50 horas mínimas a la semana'
  },
  {
    id: 2,
    titulo: 'Asistencia a profesor',
    escuela: 'Escuela de Computación',
    encargado: 'Félix Méndez',
    horas: '50 horas mínimas a la semana'
  },
  {
    id: 3,
    titulo: 'Tutoría de Física I',
    escuela: 'Escuela de Física',
    encargado: 'Luis Quesada',
    horas: '30 horas mínimas a la semana'
  },
  {
    id: 4,
    titulo: 'Asistencia en laboratorio de Química',
    escuela: 'Escuela de Química',
    encargado: 'María Brenes',
    horas: '25 horas mínimas a la semana'
  },
  {
    id: 5,
    titulo: 'Tutoría de Programación I',
    escuela: 'Escuela de Computación',
    encargado: 'Daniela Chacón',
    horas: '40 horas mínimas a la semana'
  },
  {
    id: 6,
    titulo: 'Asistencia administrativa',
    escuela: 'Departamento de Becas',
    encargado: 'Carlos Jiménez',
    horas: '20 horas mínimas a la semana'
  },
  {
    id: 7,
    titulo: 'Asistencia a curso de Ética Profesional',
    escuela: 'Escuela de Ciencias Sociales',
    encargado: 'Jorge Rivera',
    horas: '35 horas mínimas a la semana'
  },
  {
    id: 8,
    titulo: 'Tutoría de Álgebra Lineal',
    escuela: 'Escuela de Matemática',
    encargado: 'Andrea Salazar',
    horas: '45 horas mínimas a la semana'
  }
];

const BusquedaOportunidades = () => {
  const navigation = useNavigation();
  const [busqueda, setBusqueda] = useState('');
  const [resultadosFiltrados, setResultadosFiltrados] = useState(oportunidades);

  const realizarBusqueda = () => {
    const texto = busqueda.toLowerCase();
    const filtrados = oportunidades.filter(item =>
      item.titulo.toLowerCase().includes(texto) ||
      item.escuela.toLowerCase().includes(texto) ||
      item.encargado.toLowerCase().includes(texto)
    );
    setResultadosFiltrados(filtrados);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.headerBar}>
        <Image
          source={require('../../../assets/LogoTec.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation.navigate('perfilEstudiante')}>
          <Image
            source={require('../../../assets/avataricon.png')}
            style={styles.headerAvatar}
          />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <Text style={styles.title}>Búsqueda y Aplicación a Oportunidades</Text>

      {/* Buscador con botón */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por título, escuela o encargado"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        <TouchableOpacity onPress={realizarBusqueda} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Tarjetas */}
      <View style={styles.cardsContainer}>
        {resultadosFiltrados.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardText}>Escuela: {item.escuela}</Text>
            <Text style={styles.cardText}>Encargado: {item.encargado}</Text>
            <Text style={styles.cardText}>{item.horas}</Text>

            <View style={styles.cardButtons}>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => navigation.navigate('detallesOportunidad', {
                  titulo: item.titulo,
                  escuela: item.escuela,
                  encargado: item.encargado,
                  horas: item.horas,
                  requisitos: item.requisitos || 'Sin requisitos'
                })}
              >
                <Text style={styles.buttonText}>Detalles</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('formularioAplicacion',  { titulo: item.titulo })}>
                <Text style={styles.buttonText}>Aplicar</Text>
              </TouchableOpacity>

            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default BusquedaOportunidades;
