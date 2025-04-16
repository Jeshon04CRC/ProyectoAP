import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Style/Administradores/monitoreoActividades';

const seguimientoData = [
  {
    tipoBeca: 'Tutoría',
    periodo: 'IS2025',
    responsable: 'Lupita Perez',
    estado: 'Aprobada',
  },
  {
    tipoBeca: 'Oferta',
    periodo: 'IS2025',
    responsable: 'Lupita Perez',
    estado: 'Aprobada',
   
  },
  {
    tipoBeca: 'Cambio de rol',
    periodo: 'IS2025',
    responsable: 'Lupita Perez',
    estado: 'Aprobada',
  
  },
];

const MonitoreoActividades = () => {
  const navigation = useNavigation();
  const [busqueda, setBusqueda] = useState('');
  const [filtradas, setFiltradas] = useState(seguimientoData);

  const realizarBusqueda = () => {
    const texto = busqueda.toLowerCase();
    const resultado = seguimientoData.filter(item =>
      item.tipoBeca.toLowerCase().includes(texto) ||
      item.responsable.toLowerCase().includes(texto) ||
      item.estado.toLowerCase().includes(texto)
    );
    setFiltradas(resultado);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Text style={styles.label}>Actividad:</Text>
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
        <View style={styles.cellEstado}>
            <View style={item.estado === 'Aprobada' ? styles.badgeGreen : styles.badgeRed}>
            <Text style={styles.badgeText}>{item.estado}</Text>
            </View>
        </View>
        </View>


    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con logo y perfil */}
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

      {/* Título */}
      <Text style={styles.header}>Monitoreo de actividades</Text>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por actividad, responsable o estado"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        <TouchableOpacity onPress={realizarBusqueda} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de actividades */}
      <FlatList
        data={filtradas}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
      />

      {/* Botón regresar */}
      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.returnButtonText}>Regresar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MonitoreoActividades;
