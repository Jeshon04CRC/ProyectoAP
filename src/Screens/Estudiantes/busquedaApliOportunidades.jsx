import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Style/Estudiantes/busquedaApliOportunidades';
import axios from 'axios';
import URL from '../../Services/url';

const BusquedaOportunidades = () => {
  const navigation = useNavigation();
  const [busqueda, setBusqueda] = useState('');
  const [oportunidades, setOportunidades] = useState([]);
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);

  useEffect(() => {
    const fetchOportunidades = async () => {
      try {
        const response = await axios.get(`${URL}:3000/asistencias/oportunidades`);
        console.log("🔍 Oportunidades cargadas:", response.data.oportunidades);
        setOportunidades(response.data.oportunidades);
        setResultadosFiltrados(response.data.oportunidades);
      } catch (error) {
        console.error("❌ Error al obtener oportunidades:", error.message);
      }
    };

    fetchOportunidades();
  }, []);

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
      <View style={styles.headerBar}>
        <Image source={require('../../../assets/LogoTec.png')} style={styles.headerLogo} resizeMode="contain" />
        <TouchableOpacity onPress={() => navigation.navigate('perfilEstudiante')}>
          <Image source={require('../../../assets/avataricon.png')} style={styles.headerAvatar} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Búsqueda y Aplicación a Oportunidades</Text>

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
                  ...item // pasa todos los campos como props
                })}
              >
                <Text style={styles.buttonText}>Detalles</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => navigation.navigate('formularioAplicacion', { titulo: item.titulo })}
              >
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
