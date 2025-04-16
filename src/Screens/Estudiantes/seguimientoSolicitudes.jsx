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
import { styles } from '../../Style/Estudiantes/seguimientoSolicitudes';

const seguimientoData = [
  {
    tipoBeca: 'Tutoría',
    periodo: 'IS2025',
    responsable: 'Lupita Perez',
    estado: 'Aprobada',
    estadoDias: 14,
    horasTrabajadas: 50,
    avances: true,
    retroalimentacion: true,
    certificados: true,
    alertaHoras: true,
  },
  {
    tipoBeca: 'Tutoría',
    periodo: 'IS2025',
    responsable: 'Lupita Perez',
    estado: 'Aprobada',
    estadoDias: 14,
    horasTrabajadas: 50,
    avances: true,
    retroalimentacion: true,
    certificados: true,
    alertaHoras: true,
  },
  // Más registros si se desea...
];

const SeguimientoSolicitudes = () => {
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
        {item.avances ? (
            <TouchableOpacity onPress={() => alert('Descargando archivo de avances...')}>
            <Text style={styles.downloadLink}>Descargar</Text>
            </TouchableOpacity>
        ) : (
            <Text style={styles.value}>No disponible</Text>
        )}
        </View>

        <View style={styles.cardRow}>
        <Text style={styles.label}>Retroalimentación:</Text>
        {item.retroalimentacion ? (
            <TouchableOpacity onPress={() => alert('Descargando retroalimentación...')}>
            <Text style={styles.downloadLink}>Descargar</Text>
            </TouchableOpacity>
        ) : (
            <Text style={styles.value}>No disponible</Text>
        )}
        </View>

        <View style={styles.cardRow}>
        <Text style={styles.label}>Certificados:</Text>
        {item.certificados ? (
            <TouchableOpacity onPress={() => alert('Descargando certificado...')}>
            <Text style={styles.downloadLink}>Descargar</Text>
            </TouchableOpacity>
        ) : (
            <Text style={styles.value}>No disponible</Text>
        )}
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
        <TouchableOpacity onPress={() => navigation.navigate('perfilEstudiante')}>
          <Image
            source={require('../../../assets/avataricon.png')}
            style={styles.headerAvatar}
          />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <Text style={styles.header}>Seguimiento de actividades</Text>

      {/* Buscador */}
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

      {/* Lista */}
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
