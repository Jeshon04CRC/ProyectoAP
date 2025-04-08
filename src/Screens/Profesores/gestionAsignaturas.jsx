import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import data from "./mockData.json"; 
import { styles } from "../../Style/Profesores/gestionAsignaturas";


const HistorialCard = ({ item }) => (
  <View style={styles.historialCard}>
    <Text style={styles.historialCardText}>Nombre: {item.nombre}</Text>
    <Text style={styles.historialCardText}>Carnet: {item.carnet}</Text>
    <Text style={styles.historialCardText}>Tipo: {item.tipo}</Text>
    <Text style={styles.historialCardText}>Curso: {item.curso}</Text>
    <Text style={styles.historialCardText}>Semestre: {item.semestre}</Text>
    <Text style={styles.historialCardText}>Estado: {item.estado}</Text>
    <Text style={styles.historialCardText}>Año: {item.año}</Text>
  </View>
);

const GestionAsignaturas = () => {
  // Extraemos las secciones de datos del JSON
  const { courses = [], proyectos = [], historial = [] } =
    data.gestionAsignaturas || {};

  
  const [carouselSearchText, setCarouselSearchText] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [filteredProyectos, setFilteredProyectos] = useState(proyectos);

  const [historialSearchText, setHistorialSearchText] = useState("");
  const [filteredHistorial, setFilteredHistorial] = useState(historial);

  
  const handleCarouselSearch = () => {
    const filteredC = courses.filter((item) =>
      item.nombre.toLowerCase().includes(carouselSearchText.toLowerCase())
    );
    const filteredP = proyectos.filter((item) =>
      item.nombre.toLowerCase().includes(carouselSearchText.toLowerCase())
    );
    setFilteredCourses(filteredC);
    setFilteredProyectos(filteredP);
  };

  const resetCarousel = () => {
    setCarouselSearchText("");
    setFilteredCourses(courses);
    setFilteredProyectos(proyectos);
  };

  const handleRegresar = () => {
    console.log("Botón de regresar presionado en el carrusel");
  };

  const filterHistorialByYear = () => {
    const filtered = historial.filter(
      (item) => item.año === historialSearchText
    );
    setFilteredHistorial(filtered);
  };

  const filterHistorialByState = () => {
    const filtered = historial.filter(
      (item) =>
        item.estado.toLowerCase() === historialSearchText.toLowerCase()
    );
    setFilteredHistorial(filtered);
  };

  const resetHistorial = () => {
    setHistorialSearchText("");
    setFilteredHistorial(historial);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Título Principal */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Gestión de Asignaturas</Text>
      </View>

      {/* Carrusel de Cursos y Proyectos */}
      <Text style={styles.sectionTitle}>Carrusel de Cursos y Proyectos</Text>
      {/* Barra de búsqueda del carrusel */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar en el carrusel..."
          value={carouselSearchText}
          onChangeText={setCarouselSearchText}
        />
      </View>
      {/* Fila de botones del carrusel */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleCarouselSearch}
        >
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetCarousel}>
          <Text style={styles.buttonText}>Restablecer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.regresarButton} onPress={handleRegresar}>
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>

      {/* Mostrando cursos y proyectos filtrados */}
      <Text style={styles.subSectionTitle}>Cursos</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carouselContainer}
      >
        {filteredCourses.map((course, index) => (
          <View key={course.id || index} style={styles.card}>
            <Text style={styles.cardTitle}>{course.nombre}</Text>
            <Text style={styles.cardDetail}>Código: {course.codigo}</Text>
            <Text style={styles.cardDetail}>Créditos: {course.creditos}</Text>
            <Text style={styles.cardDetail}>Semestre: {course.semestre}</Text>
            <Text style={styles.cardDetail}>Aula: {course.aula}</Text>
            <Text style={styles.cardDetail}>Profesor: {course.profesor}</Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() =>
                console.log(`Solicitar asistente para ${course.nombre}`)
              }
            >
              <Text style={styles.cardButtonText}>Solicitar Asistente</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.subSectionTitle}>Proyectos</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carouselContainer}
      >
        {filteredProyectos.map((proyecto, index) => (
          <View key={proyecto.id || index} style={styles.card}>
            <Text style={styles.cardTitle}>{proyecto.nombre}</Text>
            <Text style={styles.cardDetail}>Código: {proyecto.codigo}</Text>
            <Text style={styles.cardDetail}>Créditos: {proyecto.creditos}</Text>
            <Text style={styles.cardDetail}>Semestre: {proyecto.semestre}</Text>
            <Text style={styles.cardDetail}>Aula: {proyecto.aula}</Text>
            <Text style={styles.cardDetail}>Profesor: {proyecto.profesor}</Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() =>
                console.log(`Solicitar asistencia para ${proyecto.nombre}`)
              }
            >
              <Text style={styles.cardButtonText}>Solicitar Asistente</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/*  Historial como carrusel */}
      <Text style={styles.sectionTitle}>Historial</Text>
      {/* Barra de búsqueda del historial */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Escribe para filtrar Historial..."
          value={historialSearchText}
          onChangeText={setHistorialSearchText}
        />
      </View>
      {/* Fila de botones para el historial */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={filterHistorialByYear}
        >
          <Text style={styles.buttonText}>Filtrar Año</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={filterHistorialByState}
        >
          <Text style={styles.buttonText}>Filtrar Estado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetHistorial}>
          <Text style={styles.buttonText}>Restablecer</Text>
        </TouchableOpacity>
      </View>
      {/* Carrusel de Historial */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.historialContainer}>
        {filteredHistorial.map((item, index) => (
          <HistorialCard key={item.id || index} item={item} />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default GestionAsignaturas;