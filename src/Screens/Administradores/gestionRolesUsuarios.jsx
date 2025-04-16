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

const usuariosData = [
  {
    nombre: 'Jaime',
    rol: 'Profesor',
    correo: 'jaime@ejemplo.com',
    carrera: 'Computación',
    telefono: '8888-8888',
    departamento: 'Escuela de Computación'
  },
  {
    nombre: 'Roberto',
    rol: 'Estudiante',
    correo: 'roberto@ejemplo.com',
    carrera: 'Electrónica',
    telefono: '8999-9999',
    departamento: 'Escuela de Electrónica'
  },
  {
    nombre: 'Felix',
    rol: 'Estudiante',
    correo: 'felix@ejemplo.com',
    carrera: 'Computación',
    telefono: '8777-7777',
    departamento: 'Escuela de Computación'
  },
  {
    nombre: 'Jefferson',
    rol: 'Estudiante',
    correo: 'jefferson@ejemplo.com',
    carrera: 'Mecatrónica',
    telefono: '8666-6666',
    departamento: 'Escuela de Mecatrónica'
  },
  {
    nombre: 'Barbara',
    rol: 'Administrador',
    correo: 'barbara@ejemplo.com',
    carrera: 'Gestión',
    telefono: '8555-5555',
    departamento: 'Administración General'
  },
  {
    nombre: 'IC',
    rol: 'Escuela',
    correo: 'ic@tec.ac.cr',
    carrera: '',
    telefono: '8484-8484',
    departamento: 'Escuela de Computación'
  }
];


const GestionUsuariosRoles = () => {
  const navigation = useNavigation();
  const [busqueda, setBusqueda] = useState('');
  const [filtrados, setFiltrados] = useState(usuariosData);

  const realizarBusqueda = () => {
    const texto = busqueda.toLowerCase();
    const resultado = usuariosData.filter(usuario =>
      usuario.nombre.toLowerCase().includes(texto) ||
      usuario.rol.toLowerCase().includes(texto)
    );
    setFiltrados(resultado);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Nombre */}
      <View style={styles.cardRow}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{item.nombre}</Text>
      </View>
  
      {/* Rol */}
      <View style={styles.cardRow}>
        <Text style={styles.label}>Rol:</Text>
        <Text style={styles.value}>{item.rol}</Text>
      </View>
  
      {/* Correo */}
      <View style={styles.cardRow}>
        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{item.correo}</Text>
      </View>
  
      {/* Carrera */}
      <View style={styles.cardRow}>
        <Text style={styles.label}>Carrera:</Text>
        <Text style={styles.value}>{item.carrera}</Text>
      </View>
  
      {/* Teléfono */}
      <View style={styles.cardRow}>
        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{item.telefono}</Text>
      </View>
  
      {/* Departamento */}
      <View style={styles.cardRow}>
        <Text style={styles.label}>Departamento:</Text>
        <Text style={styles.value}>{item.departamento}</Text>
      </View>
  
      {/* Botones */}
      <View style={styles.cardRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate('CambioRol', { nombre: item.nombre, rol: item.rol })
          }
        >
          <Text style={styles.actionButtonText}>Cambiar Rol</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate('EditarUsuario', {
              nombre: item.nombre,
              correo: item.correo,
              carrera: item.carrera,
              telefono: item.telefono,
              departamento: item.departamento,
              rol: item.rol,
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
              `¿Deseas eliminar al usuario ${item.nombre}?`,
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

      <Text style={styles.header}>Gestión de usuarios y roles</Text>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o rol"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        <TouchableOpacity onPress={realizarBusqueda} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de usuarios */}
      <FlatList
        data={filtrados}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Botones finales */}
      <View style={styles.footerButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('HomePageAdmin')}
        >
          <Text style={styles.actionButtonText}>Salir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CrearUsuario')}
        >
          <Text style={styles.actionButtonText}>Crear nuevo usuario</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GestionUsuariosRoles;
