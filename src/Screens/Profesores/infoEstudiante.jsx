import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { styles } from '../../Style/Profesores/infoEstudiante'; 

const InfoEstudiante = ({ route, navigation }) => {
  // Se espera que los datos del estudiante se envíen en route.params.student
  const { student } = route.params; 

  return (
    <ScrollView style={styles.container}>
      {/* Sección: Mis Datos */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Mis Datos</Text>
        <View style={styles.dataContainer}>
          <Image 
            source={require('../../../assets/avataricon.png')}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.infoText}>Correo: {student.correo || "Tomas13@estudiantec.cr"}</Text>
            <Text style={styles.infoText}>Cédula: {student.cedula || "11000500"}</Text>
            <Text style={styles.infoText}>Nombre: {student.nombre || "Tomas Abarca"}</Text>
            <Text style={styles.infoText}>Carrera: {student.carrera || "Ingeniería en Computación"}</Text>
            <Text style={styles.infoText}>Ponderado: {student.ponderado || "75.8"}</Text>
            <Text style={styles.infoText}>Cursos aprobados: {student.cursosAprobados || "20"}</Text>
          </View>
        </View>
      </View>
      
      {/* Sección: Documentos adjuntos */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Documentos adjuntos</Text>
        <View style={styles.documentosContainer}>
          <View style={styles.documentCard}>
            <View style={styles.documentDetails}>
              <Text style={styles.documentTitle}>Registro de notas</Text>
              <Text style={styles.documentDate}>Mar 15, 2025</Text>
            </View>
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadButtonText}>Descargar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {/* Sección: Acciones */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.approveButton]}>
          <Text style={styles.actionButtonText}>Aprobar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
          <Text style={styles.actionButtonText}>Rechazar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.meetingButton]}>
          <Text style={styles.actionButtonText}>Solicitar reunión</Text>
        </TouchableOpacity>
      </View>
      
      {/* Botón Regresar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default InfoEstudiante;