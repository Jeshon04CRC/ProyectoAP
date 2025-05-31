//---------------------------------------------------------------------------------------------------------------

// Detalle de cada solicitud mejor explicada -  funcion que va al tocar el boton de detalles de cada solicitud 
// en la pantalla de busquedaApliOportunidades

//----------------------------------------------------------------------------------------------------------------

import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../../Style/Estudiantes/detallesOportunidad';

// Importa las imágenes correctamente para web
import logoTec from '../../../assets/LogoTec.png';
import avatarIcon from '../../../assets/avataricon.png';

const fuenteRiel = { fontFamily: 'Arial, Helvetica, "Segoe UI", "Riel", sans-serif' }; // Arial como fallback si Riel no está disponible

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
    cantidadSolicitudes,
    estado,
    promedioRequerido,
    requisitos,
    fechaInicio,
    fechaFin,
    objetivos,
    beneficio,
    tipo,
    semestre,
    totalHoras
  } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    }, 1800000); // 20 minutos

    return () => clearTimeout(timer);
  }, []);

  // SOLO PARA WEB: Renderiza usando HTML nativo y corrige imágenes
  if (Platform.OS === 'web') {
    return (
      <div style={{ height: '100vh', overflowY: 'auto', background: '#fff', padding: 24, ...fuenteRiel }}>
        <h2 style={fuenteRiel}>Detalle de la Oportunidad</h2>
        <div style={{ background: '#f9f9f9', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <h3 style={fuenteRiel}>{titulo}</h3>
          <p style={fuenteRiel}><b>Tipo:</b> {tipo}</p>
          <p style={fuenteRiel}><b>Escuela / Departamento:</b> {escuela}</p>
          <p style={fuenteRiel}><b>Encargado:</b> {encargado}</p>
          <p style={fuenteRiel}><b>Descripción:</b> {descripcion}</p>
          <p style={fuenteRiel}><b>Horario:</b> {horario}</p>
          <p style={fuenteRiel}><b>Vacantes:</b> {cantidadVacantes}</p>
          <p style={fuenteRiel}><b>Horas por semana:</b> {horas}</p>
          <p style={fuenteRiel}><b>Objetivos:</b> {objetivos}</p>
          <p style={fuenteRiel}><b>Beneficio:</b> {beneficio}</p>
          <p style={fuenteRiel}><b>Estado de la oportunidad:</b> {estado}</p>
          <p style={fuenteRiel}><b>Promedio requerido:</b> {promedioRequerido}</p>
          <p style={fuenteRiel}><b>Requisitos:</b> {requisitos}</p>
          <p style={fuenteRiel}><b>Semestre:</b> {semestre}</p>
          <p style={fuenteRiel}><b>Fecha de inicio:</b> {fechaInicio}</p>
          <p style={fuenteRiel}><b>Fecha de finalización:</b> {fechaFin}</p>
        </div>
        <button
          style={{
            background: '#405F90',
            color: '#fff',
            padding: '12px 32px',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            cursor: 'pointer',
            ...fuenteRiel
          }}
          onClick={() => navigation.navigate('formularioAplicacion', { titulo })}
        >
          Aplicar
        </button>
      </div>
    );
  }

  // Para móvil, sigue usando ScrollView y componentes nativos
  return (
    <ScrollView style={styles.container}>
      {/* Header con logo y perfil */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={logoTec} style={styles.headerLogo} resizeMode="contain" />
        </TouchableOpacity>
        <Image source={avatarIcon} style={styles.headerAvatar} />
      </View>

      <Text style={[styles.title, fuenteRiel]}>Detalle de la Oportunidad</Text>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, fuenteRiel]}>{titulo}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Tipo: {tipo}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Escuela / Departamento: {escuela}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Encargado: {encargado}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Descripción: {descripcion}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Horario: {horario}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Vacantes: {cantidadVacantes}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Horas por semana: {horas}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Objetivos: {objetivos}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Beneficio: {beneficio}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Estado de la oportunidad: {estado}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Promedio requerido: {promedioRequerido}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Requisitos: {requisitos}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Semestre: {semestre}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Fecha de inicio: {fechaInicio}</Text>
        <Text style={[styles.cardText, fuenteRiel]}>Fecha de finalización: {fechaFin}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.applyButton]}
        onPress={() => navigation.navigate('formularioAplicacion', { titulo })}
      >
        <Text style={[styles.buttonText, fuenteRiel]}>Aplicar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetalleOportunidad;
