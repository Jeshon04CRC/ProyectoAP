import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity, Image, Switch
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Style/Estudiantes/busquedaApliOportunidades';
import axios from 'axios';
import URL from '../../Services/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BusquedaOportunidades = () => {
  const navigation = useNavigation();
  const [busqueda, setBusqueda] = useState('');
  const [oportunidades, setOportunidades] = useState([]);
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
  const [favoritos, setFavoritos] = useState([]); // IDs de oportunidades favoritas
  const [soloFavoritos, setSoloFavoritos] = useState(false); // Filtro toggle


  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    }, 1800000); // 20 segundos

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const fetchOportunidades = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        console.log("🔐 userId desde AsyncStorage:", userId);

        // Obtener todas las oportunidades
        const response = await axios.get(`${URL}:3000/asistencias/oportunidades`);
        setOportunidades(response.data.oportunidades);
        setResultadosFiltrados(response.data.oportunidades);

        // Obtener las oportunidades favoritas del usuario
        const res = await axios.get(`${URL}:3000/favoritos`, {
          params: { userId }
        });

        console.log("📦 Respuesta de /favoritos:", res.data);
        const idsFavoritos = res.data.oportunidadesFavoritas || [];
        setFavoritos(idsFavoritos);

      } catch (error) {
        console.error("Error al obtener oportunidades:", error.message);
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

  const toggleFavorito = async (id) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error("❌ userId no encontrado en AsyncStorage");
        return;
      }

      if (favoritos.includes(id)) {
        // Quitar favorito - llamada DELETE
        await axios.delete(`${URL}:3000/eliminarFavoritas`, {
          params: { userId, idOportunidad: id }
        });
        setFavoritos(favoritos.filter(favId => favId !== id));
      } else {
        // Agregar favorito - llamada POST
        await axios.post(`${URL}:3000/selecionarFavoritas`, {
          userId,
          idOportunidad: id
        });
        setFavoritos([...favoritos, id]);
      }
    } catch (error) {
      console.error("❌ Error al actualizar favorito:", error.message);
    }
  };

  // Aplica el filtro de favoritos si está activado
  const oportunidadesAMostrar = soloFavoritos
    ? resultadosFiltrados.filter(item => favoritos.includes(item.id))
    : resultadosFiltrados;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBar}>
        <Image source={require('../../../assets/LogoTec.png')} style={styles.headerLogo} resizeMode="contain" />
        <TouchableOpacity onPress={() => navigation.goBack()}>
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

      {/* Toggle para ver solo favoritos */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 20 }}>
        <Text style={{ marginRight: 10 }}>Mostrar solo favoritos</Text>
        <Switch value={soloFavoritos} onValueChange={setSoloFavoritos} />
      </View>

      <View style={styles.cardsContainer}>
        {oportunidadesAMostrar.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <TouchableOpacity onPress={() => toggleFavorito(item.id)}>
                <Text style={{ fontSize: 22 }}>
                  {favoritos.includes(item.id) ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.cardText}>Escuela: {item.escuela}</Text>
            <Text style={styles.cardText}>Encargado: {item.encargado}</Text>
            <Text style={styles.cardText}>{item.horas}</Text>

            <View style={styles.cardButtons}>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => navigation.navigate('detallesOportunidad', { ...item })}
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
