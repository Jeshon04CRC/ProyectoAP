import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Style/Administradores/gestionRolesUsuarios';
import axios from 'axios';
import URL from '../../Services/url';
import { useRoute } from '@react-navigation/native';

const ValidacionOfertas = () => {
  const navigation = useNavigation();
  const [busqueda, setBusqueda] = useState('');
  const [ofertas, setOfertas] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const route = useRoute();

  useEffect(() => {
    handlerDatos();
  }, []);

  const handlerDatos = async () => {
    try {
      const apiUrl = `${URL}:3000`;
      const response = await axios.get(`${apiUrl}/admin/Ofertas`);

      if (response.status === 200) {
        console.log('Datos obtenidos:', response.data.ofertas);
        setOfertas(response.data.ofertas);
        setFiltradas(response.data.ofertas); // Mostramos todas por defecto
      } else {
        console.error('Error al obtener los datos:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red o del servidor:', error);
    }
  };

  const handleAceptarAsistencia = async (idAsistencia) => {
    try {
      const apiUrl = `${URL}:3000`;
      const response = await axios.put(`${apiUrl}/admin/aceptarOferta`, {
        id: idAsistencia // Asegúrate de enviar el id dentro del cuerpo
      });
      if(response.status === 200){
        alert("Asistencia aceptada", "La asistencia ha sido aceptada correctamente.");
        handlerDatos();
      }
      
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      alert("Error de red o del servidor.");
      return null;
    }
  }

  const handleEliminarAsistencia = async (idAsistencia) => {
    try {
      const apiUrl = `${URL}:3000`;
      const response = await axios.delete(`${apiUrl}/admin/eliminarOferta`, {
        params: { id : idAsistencia}
      });
      if(response.status === 200){
        alert("Asistencia cerrada", "La asistencia ha sido cerrada correctamente.");
        handlerDatos();
      }
      
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      alert("Error de red o del servidor.");
      return null;
    }
  }

  const realizarBusqueda = () => {
    const texto = busqueda.toLowerCase();
    const resultado = ofertas.filter(oferta =>
      oferta.nombre.toLowerCase().includes(texto) ||
      oferta.tipo.toLowerCase().includes(texto) ||
      oferta.estado.toLowerCase().includes(texto)
    );
    setFiltradas(resultado);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{item.nombre}</Text>
      </View>

      <View style={styles.cardRow}>
        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{item.tipo}</Text>
      </View>

      <View style={styles.cardRow}>
        <Text style={styles.label}>Estado:</Text>
        <Text
          style={[
            styles.value,
            {
              backgroundColor:
                item.estado === 'Aprobado' ? '#D4F4D1' :
                item.estado === 'Revision' ? '#FFF59D' :
                '#FFCC80',
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 6,
              color: '#000',
              overflow: 'hidden',
            },
          ]}
        >
          {item.estado}
        </Text>
      </View>

      <View style={styles.cardRow}>
        <Text style={styles.label}>Estudiantes:</Text>
        <Text style={styles.value}>{item.estudiantes}</Text>
      </View>

      <View style={styles.cardRow}>
        <Text style={styles.label}>Horas:</Text>
        <Text style={styles.value}>{item.horas}</Text>
      </View>

      {/* Botones de acción */}
      <View style={styles.cardRow}>
        {item.estado === 'Revision' && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              alert(`Cambiar estado: ${item.nombre}`);
              handleAceptarAsistencia(item.id);
            }}
          >
            <Text style={styles.actionButtonText}>Aprobar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate('EditarOferta', {
              nombre: item.nombre,
              tipo: item.tipo,
              estado: item.estado,
              horasSemana: item.horas,
              fechaInicio: '2024-05-01',
              fechaCierre: '2024-07-15',
            })
          }
        >
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            Alert.alert(
              'Confirmar eliminación',
              `¿Deseas eliminar la oferta "${item.nombre}"?`,
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', onPress: () => handleEliminarAsistencia(item.id) },
              ]
            )
          }
        >
          <Text style={styles.actionButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <Image
          source={require('../../../assets/LogoTec.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <TouchableOpacity>
          <Image
            source={require('../../../assets/avataricon.png')}
            style={styles.headerAvatar}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Validación de ofertas</Text>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre, tipo o estado"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        <TouchableOpacity onPress={realizarBusqueda} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de ofertas */}
      <FlatList
        data={filtradas}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Botón regresar */}
      <View style={styles.footerButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.actionButtonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ValidacionOfertas;
