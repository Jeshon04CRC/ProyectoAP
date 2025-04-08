import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../Style/Profesores/gestionPostulaciones";

// Importa el JSON actualizado (asegúrate de que la ruta sea correcta)
const mockData = require("./mockData.json");
// Extrae la data de postulaciones del JSON
const { postulacionesData } = mockData;

const GestionPostulaciones = () => {
  const navigation = useNavigation();

  // Estados para el filtrado y resultados
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos"); // Filtro único para los 6 botones
  const [filteredPostulaciones, setFilteredPostulaciones] = useState(postulacionesData);
  const [entriesNumber, setEntriesNumber] = useState("All");

  // Función que aplica los filtros
  const handleFilter = () => {
    let filtered = [...postulacionesData];

    // Filtro por estado o extra (de los 6 botones)
    if (selectedFilter === "Aprobados") {
      filtered = filtered.filter((p) => p.estado === "Aprobado");
    } else if (selectedFilter === "En Espera") {
      filtered = filtered.filter((p) => p.estado === "En espera");
    } else if (selectedFilter === "Requisitos") {
      // Ejemplo: filtra postulaciones con 25 o más cursos aprobados
      filtered = filtered.filter((p) => p.cursosAprobados >= 25);
    } else if (selectedFilter === "Promedio") {
      filtered.sort((a, b) => b.ponderado - a.ponderado);
    } else if (selectedFilter === "Experiencia") {
      filtered.sort((a, b) => a.experiencia.localeCompare(b.experiencia));
    }
    // "Todos" no filtra nada

    // Filtra por búsqueda en el nombre
    if (searchText.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.nombre.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Aquí podrías limitar la cantidad según entriesNumber si lo deseas

    setFilteredPostulaciones(filtered);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Gestión de Postulaciones</Text>

      {/* Bloque de 6 botones en 2 filas (con estado único) */}
      <View style={styles.allFilterButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Todos" && styles.activeFilterButton,
          ]}
          onPress={() => setSelectedFilter("Todos")}
        >
          <Text style={styles.filterButtonText}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Aprobados" && styles.activeFilterButton,
          ]}
          onPress={() => setSelectedFilter("Aprobados")}
        >
          <Text style={styles.filterButtonText}>Aprobados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "En Espera" && styles.activeFilterButton,
          ]}
          onPress={() => setSelectedFilter("En Espera")}
        >
          <Text style={styles.filterButtonText}>En Espera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Requisitos" && styles.activeFilterButton,
          ]}
          onPress={() => setSelectedFilter("Requisitos")}
        >
          <Text style={styles.filterButtonText}>Requisitos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Promedio" && styles.activeFilterButton,
          ]}
          onPress={() => setSelectedFilter("Promedio")}
        >
          <Text style={styles.filterButtonText}>Promedio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Experiencia" && styles.activeFilterButton,
          ]}
          onPress={() => setSelectedFilter("Experiencia")}
        >
          <Text style={styles.filterButtonText}>Experiencia</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de búsqueda y botón para filtrar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleFilter}>
          <Text style={styles.searchButtonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      {/* Picker para seleccionar número de entradas (opcional) */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Mostrar: </Text>
        <Picker
          selectedValue={entriesNumber}
          style={styles.picker}
          onValueChange={(itemValue) => setEntriesNumber(itemValue)}
        >
          <Picker.Item label="Todos" value="All" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="10" value="10" />
        </Picker>
      </View>

      {/* Carrusel de cards de postulaciones */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carouselContainer}>
        {filteredPostulaciones.map((postulacion) => (
          <View key={postulacion.id} style={styles.card}>
            <Text style={styles.cardTitle}>{postulacion.nombre}</Text>
            <Text style={styles.cardDetail}>Experiencia: {postulacion.experiencia}</Text>
            <Text style={styles.cardDetail}>Carrera: {postulacion.carrera}</Text>
            <Text style={styles.cardDetail}>Nivel: {postulacion.nivel}</Text>
            <Text style={styles.cardDetail}>Ponderado: {postulacion.ponderado}</Text>
            <Text style={styles.cardDetail}>Cursos Aprobados: {postulacion.cursosAprobados}</Text>
            <Text style={styles.cardDetail}>Estado: {postulacion.estado}</Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => navigation.navigate("InfoEstudiante", { student: postulacion })}
            >
              <Text style={styles.cardButtonText}>Ver</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Botón Regresar */}
      <View style={styles.regresarContainer}>
        <TouchableOpacity style={styles.regresarButton} onPress={() => console.log("Regresar")}>
          <Text style={styles.regresarButtonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default GestionPostulaciones;