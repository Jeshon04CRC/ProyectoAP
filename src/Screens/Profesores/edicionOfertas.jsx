import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../../Style/Profesores/edicionOfertas";
import OfertaModal from "./ofertaModal";


const mockData = require("./mockData.json");

const EdicionOfertas = () => {
  const { ofertas = [] } = mockData;

  const [selectedOfertaId, setSelectedOfertaId] = useState("");
  const [currentOferta, setCurrentOferta] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOferta, setModalOferta] = useState(null);

  const handlePickerChange = (id) => {
    setSelectedOfertaId(id);
    const oferta = ofertas.find((o) => o.id === parseInt(id));
    setCurrentOferta(oferta);
  };

  const handleVerMas = (oferta) => {
    setModalOferta(oferta);
    setModalVisible(true);
  };

  const handleCancelar = () => {
    setCurrentOferta(null);
    setSelectedOfertaId("");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Carrusel de Ofertas */}
      <Text style={styles.header}>Ofertas Disponibles</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carouselContainer}
      >
        {ofertas.map((oferta) => (
          <View key={oferta.id} style={styles.card}>
            <Text style={styles.cardTitle}>{oferta.nombre}</Text>
            <Text style={styles.cardDetail}>Estudiantes: {oferta.estudiantes}</Text>
            <Text style={styles.cardDetail}>Profesor: {oferta.profesor}</Text>
            <Text style={styles.cardDetail}>Semestre: {oferta.semestre}</Text>
            <Text style={styles.cardDetail}>Beneficio: {oferta.beneficio}</Text>
            <Text style={styles.cardDetail}>Descripción: {oferta.descripcion}</Text>
            <TouchableOpacity style={styles.cardButton} onPress={() => handleVerMas(oferta)}>
                <Text style={styles.cardButtonText}>Ver más</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal para mostrar la información completa de la oferta */}
      <OfertaModal
        visible={modalVisible}
        oferta={modalOferta}
        onClose={() => setModalVisible(false)}
      />

      {/* Picker para elegir la oferta a editar */}
      <Text style={styles.sectionTitle}>Editar Oferta</Text>
      <Picker
        selectedValue={selectedOfertaId}
        style={styles.picker}
        onValueChange={(itemValue) => handlePickerChange(itemValue)}
      >
        <Picker.Item label="Seleccione una oferta" value="" />
        {ofertas.map((oferta) => (
          <Picker.Item
            key={oferta.id}
            label={oferta.nombre}
            value={oferta.id.toString()}
          />
        ))}
      </Picker>

      {/* Formulario de edición con información básica y extra */}
      {currentOferta && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre del programa</Text>
          <TextInput
            style={styles.input}
            value={currentOferta.nombre}
            onChangeText={(text) =>
              setCurrentOferta({ ...currentOferta, nombre: text })
            }
          />

          <Text style={styles.label}>Beneficio</Text>
          <TextInput
            style={styles.input}
            value={currentOferta.beneficio}
            onChangeText={(text) =>
              setCurrentOferta({ ...currentOferta, beneficio: text })
            }
          />

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={currentOferta.descripcion}
            onChangeText={(text) =>
              setCurrentOferta({ ...currentOferta, descripcion: text })
            }
            multiline
          />

          {/* Campos extra */}
          <Text style={styles.label}>Objetivos</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={currentOferta.objetivos || ""}
            onChangeText={(text) =>
              setCurrentOferta({ ...currentOferta, objetivos: text })
            }
            multiline
            placeholder="Ingrese los objetivos del programa"
          />

          <Text style={styles.label}>Horario</Text>
          <TextInput
            style={styles.input}
            value={currentOferta.horario || ""}
            onChangeText={(text) =>
              setCurrentOferta({ ...currentOferta, horario: text })
            }
            placeholder="Ingrese el horario"
          />

          <Text style={styles.label}>Vacantes</Text>
          <TextInput
            style={styles.input}
            value={currentOferta.vacantes ? currentOferta.vacantes.toString() : ""}
            onChangeText={(text) =>
              setCurrentOferta({ ...currentOferta, vacantes: parseInt(text) })
            }
            placeholder="Cantidad de vacantes"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Horas por semana</Text>
          <TextInput
            style={styles.input}
            value={currentOferta.horasSemanal ? currentOferta.horasSemanal.toString() : ""}
            onChangeText={(text) =>
              setCurrentOferta({ ...currentOferta, horasSemanal: parseInt(text) })
            }
            placeholder="Horas semanales"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Fecha de inicio</Text>
          <TextInput
            style={styles.input}
            value={currentOferta.fechaInicio || ""}
            onChangeText={(text) =>
              setCurrentOferta({ ...currentOferta, fechaInicio: text })
            }
            placeholder="AAAA-MM-DD"
          />

          <Text style={styles.label}>Fecha de cierre</Text>
          <TextInput
            style={styles.input}
            value={currentOferta.fechaCierre || ""}
            onChangeText={(text) =>
              setCurrentOferta({ ...currentOferta, fechaCierre: text })
            }
            placeholder="AAAA-MM-DD"
          />

          <Text style={styles.label}>Requisitos</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={currentOferta.requisitos || ""}
            onChangeText={(text) =>
              setCurrentOferta({ ...currentOferta, requisitos: text })
            }
            multiline
            placeholder="Ingrese los requisitos"
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => console.log("Guardar cambios", currentOferta)}
            >
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
              <Text style={styles.cancelButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
              <Text style={styles.cancelButtonText}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default EdicionOfertas;