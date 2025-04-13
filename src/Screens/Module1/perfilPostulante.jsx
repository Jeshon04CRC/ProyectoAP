import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Avatar } from 'react-native-paper';

// 🔹 Datos del estudiante
const datosEstudiante = {
  correo: "sanchaves@estudiantec.cr",
  cedula: "110050500",
  nombre: "Santiago Chaves Garbanzo",
  carrera: "Ingeniería en Computación",
  ponderado: 80.9,
  cursosAprobados: 30,
};

// 🔹 Historial de ofertas
const historialOfertas = [
  {
    titulo: "Tuto mate",
    fecha: "Apr 15, 2025",
    horas: "40 horas/semana"
  }
];

export default function PerfilEstudiante() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Perfil del estudiante</Text>

      <View style={styles.contenido}>
        {/* Información del estudiante */}
        <View style={styles.card}>
          <Avatar.Icon size={100} icon="account" style={styles.avatar} />
          <Text style={styles.seccionTitulo}>Mis Datos</Text>
          <Text style={styles.dato}><Text style={styles.etiqueta}>Correo: </Text>{datosEstudiante.correo}</Text>
          <Text style={styles.dato}><Text style={styles.etiqueta}>Cédula: </Text>{datosEstudiante.cedula}</Text>
          <Text style={styles.dato}><Text style={styles.etiqueta}>Nombre: </Text>{datosEstudiante.nombre}</Text>
          <Text style={styles.dato}><Text style={styles.etiqueta}>Carrera: </Text>{datosEstudiante.carrera}</Text>
          <Text style={styles.dato}><Text style={styles.etiqueta}>Ponderado: </Text>{datosEstudiante.ponderado}</Text>
          <Text style={styles.dato}><Text style={styles.etiqueta}>Cursos aprobados: </Text>{datosEstudiante.cursosAprobados}</Text>
        </View>

        {/* Historial de ofertas */}
        <View style={styles.card}>
          <Text style={styles.seccionTitulo}>Historial de ofertas</Text>
          {historialOfertas.map((oferta, index) => (
            <Card key={index} style={styles.oferta}>
              <Card.Title title={oferta.titulo} subtitle={oferta.fecha} />
              <Card.Content>
                <Text style={styles.chip}>{oferta.horas}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// 🎨 Estilos separados pero en el mismo archivo
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F7F9FC',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A2558',
    marginBottom: 16,
  },
  contenido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    flex: 1,
    backgroundColor: '#EAF0FA',
    padding: 16,
    margin: 8,
    borderRadius: 12,
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 16,
    backgroundColor: '#0A2558',
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0A2558',
  },
  etiqueta: {
    fontWeight: 'bold',
    color: '#000',
  },
  dato: {
    marginBottom: 4,
    fontSize: 14,
  },
  oferta: {
    backgroundColor: '#3B5998',
    marginBottom: 8,
    borderRadius: 8,
  },
  chip: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    fontSize: 12,
    marginTop: 4,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  boton: {
    paddingHorizontal: 16,
  },
});
