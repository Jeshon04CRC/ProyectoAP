import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../../Style/Estudiantes/detallesOportunidad';

const DetalleOportunidad = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    titulo,
    escuela,
    encargado,
    horas,
    descripcion,
    horario,
    cantidadVacantes,
    objetivos,
    beneficio
  } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/LogoTec.png')} style={styles.headerLogo} resizeMode="contain" />
        </TouchableOpacity>
        <Image source={require('../../../assets/avataricon.png')} style={styles.headerAvatar} />
      </View>

      {/* Título */}
      <Text style={styles.title}>Detalle de la Oportunidad</Text>

      {/* Contenido */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{titulo}</Text>
        <Text style={styles.cardText}>Escuela: {escuela}</Text>
        <Text style={styles.cardText}>Encargado: {encargado}</Text>
        <Text style={styles.cardText}>Tipo de asistencia: {descripcion}</Text>
        <Text style={styles.cardText}>Horario: {horario}</Text>
        <Text style={styles.cardText}>Vacantes: {cantidadVacantes}</Text>
        <Text style={styles.cardText}>Horas a la semana: {horas}</Text>
        <Text style={styles.cardText}>Objetivos: {objetivos}</Text>
        <Text style={styles.cardText}>Beneficio: {beneficio}</Text>
      </View>

      {/* Botón de aplicar */}
      <TouchableOpacity
        style={[styles.button, styles.applyButton]}
        onPress={() => navigation.navigate('formularioAplicacion', { titulo })}
      >
        <Text style={styles.buttonText}>Aplicar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetalleOportunidad;
