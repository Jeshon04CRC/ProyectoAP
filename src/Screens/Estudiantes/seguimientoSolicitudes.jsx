import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from '../../Style/Estudiantes/seguimientoSolicitudes';
import URL from '../../Services/url';

const SeguimientoSolicitudes = () => {
  const navigation = useNavigation();
  const [busqueda, setBusqueda] = useState('');
  const [seguimientoData, setSeguimientoData] = useState([]);
  const [filtradas, setFiltradas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchSolicitudes = async () => {
        try {
          const userId = await AsyncStorage.getItem('userId');
          const response = await axios.get(`${URL}:3000/solicitudes/seguimiento`, {
            params: { userId }
          });

          const unicos = [];
          const titulosVistos = new Set();

          for (const solicitud of response.data.solicitudes) {
            if (!titulosVistos.has(solicitud.titulo)) {
              titulosVistos.add(solicitud.titulo);
              unicos.push(solicitud);
            }
          }

          setSeguimientoData(unicos);
          setFiltradas(unicos);
        } catch (error) {
          console.error("Error al obtener seguimiento:", error.message);
          Alert.alert("Error", "No se pudo cargar el seguimiento de tus solicitudes.");
        }
      };

      fetchSolicitudes();
    }, [])
  );

  const realizarBusqueda = () => {
    const texto = busqueda.toLowerCase();
    const resultado = seguimientoData.filter(item =>
      item.tipoBeca.toLowerCase().includes(texto) ||
      item.responsable.toLowerCase().includes(texto) ||
      item.estado.toLowerCase().includes(texto)
    );
    setFiltradas(resultado);
  };

  const descargarPDF = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Error', 'Usuario no encontrado.');
        return;
      }

      const response = await axios.get(`${URL}:3000/seguimiento/pdf`, {
        params: { userId },
        responseType: 'blob',
      });

      if (Platform.OS === 'web') {
        const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = urlBlob;
        link.setAttribute('download', 'seguimiento.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(urlBlob);
      } else {
        Alert.alert('No compatible', 'La descarga solo está disponible en la versión Web.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo descargar el PDF.');
      console.error(error);
    }
  };

const renderItem = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardRow}>
      <Text style={styles.label}>Tipo de beca:</Text>
      <Text style={styles.value}>{item.tipoBeca}</Text>
    </View>
    <View style={styles.cardRow}>
      <Text style={styles.label}>Período:</Text>
      <Text style={styles.value}>{item.periodo}</Text>
    </View>
    <View style={styles.cardRow}>
      <Text style={styles.label}>Responsable:</Text>
      <Text style={styles.value}>{item.responsable}</Text>
    </View>
    <View style={styles.cardRow}>
      <Text style={styles.label}>Estado:</Text>
      <Text style={styles.badgeGreen}>{item.estado}</Text>
    </View>
    <View style={styles.cardRow}>
      <Text style={styles.label}>Horas trabajadas:</Text>
      <Text style={item.alertaHoras ? styles.badgeOrange : styles.value}>
        {item.horasTrabajadas}
      </Text>
    </View>
    <View style={styles.cardRow}>
      <Text style={styles.label}>Avances:</Text>
      <Text style={styles.value}>
        {item.avances || 'Sin avances'}
      </Text>
    </View>
    <View style={styles.cardRow}>
      <Text style={styles.label}>Retroalimentación:</Text>
      <Text style={styles.value}>
        {item.retroalimentacion || 'Sin retroalimentación'}
      </Text>
    </View>
    <View style={styles.cardRow}>
      <Text style={styles.label}>Certificados:</Text>
      <Text style={styles.value}>
        {item.certificados || 'Sin certificados'}
      </Text>
    </View>
  </View>
);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <Image source={require('../../../assets/LogoTec.png')} style={styles.headerLogo} resizeMode="contain" />
        <TouchableOpacity onPress={()  => navigation.goBack()}>
          <Image source={require('../../../assets/avataricon.png')} style={styles.headerAvatar} />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Seguimiento de actividades</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por tipo de beca, responsable o estado"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        <TouchableOpacity onPress={realizarBusqueda} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* BOTÓN PARA GENERAR PDF */}
      <TouchableOpacity onPress={descargarPDF} style={styles.pdfButton}>
        <Text style={styles.pdfButtonText}>📄 Generar PDF</Text>
      </TouchableOpacity>

      <FlatList
        data={filtradas}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default SeguimientoSolicitudes;
