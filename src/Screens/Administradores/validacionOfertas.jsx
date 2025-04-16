import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Style/Administradores/gestionRolesUsuarios';

const ofertasData = [
  {
    nombre: 'Tuto mate',
    tipo: 'Tutoría',
    estado: 'Aprobado',
    estudiantes: 25,
    horas: 40,
  },
  {
    nombre: 'Tutoría Prog',
    tipo: 'Tutoría',
    estado: 'Pendiente',
    estudiantes: 20,
    horas: 35,
  },
];

const ValidacionOfertas = () => {
  const navigation = useNavigation();
  const [busqueda, setBusqueda] = useState('');
  const [filtradas, setFiltradas] = useState(ofertasData);

  const realizarBusqueda = () => {
    const texto = busqueda.toLowerCase();
    const resultado = ofertasData.filter(oferta =>
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
                item.estado === 'Aprobado' ? '#D4F4D1' : '#FFCC80',
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
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => alert(`Cambiar estado: ${item.nombre}`)}
        >
          <Text style={styles.actionButtonText}>Aprobar/No aprobar</Text>
        </TouchableOpacity>

       <TouchableOpacity
                 style={styles.actionButton}
                 onPress={() =>
                   navigation.navigate('EditarOferta', {
                    nombre: item.nombre,
                    tipo: item.tipo,
                    estado: item.estado,
                    horasSemana: item.horas,
                    fechaInicio: '2024-05-01',     // podés dejar vacío si no los usás
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
                { text: 'Eliminar', onPress: () => console.log('Eliminado') },
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
