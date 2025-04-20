import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../Style/Module1/crearOferta';  // Importamos los estilos
import axios from 'axios'; 
import URL from '../../Services/url'

export default function CrearOfertaScreen () {
    const [nombreCurso, setNombreCurso] = useState('');
    const [profesor, setProfesor] = useState('');
    const [tipo, setTipo] = useState('');
    const [estado, setEstado] = useState('');
    const [estudiantes, setEstudiantes] = useState('');
    const [horas, setHoras] = useState('');
    const [beneficio, setBeneficio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [requisitos, setRequisitos] = useState('');
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaCierre, setFechaCierre] = useState(new Date());
    const [promedioMinimo, setPromedioMinimo] = useState("");
    const [cursosPrevios, setCursosPrevios] = useState("");
    const [horasMaximas, setHorasMaximas] = useState("");
    const [requisitosAdicionales, setRequisitosAdicionales] = useState("");


    const handleConfirmInicio = (event, selectedDate) => {
        if (selectedDate) setFechaInicio(selectedDate);
    };

    const handleConfirmCierre = (event, selectedDate) => {
        if (selectedDate) setFechaCierre(selectedDate);
    };

    const handleCrearOferta = async () => {
        try {
            const storedUrl = URL;  // Esto obtiene la URL que has definido en url.js
            
            // Concatenar correctamente la URL con el puerto
            const apiUrl = `${storedUrl}:3000`; // Asegúrate de usar las comillas correctas
            
            // Usando Axios en vez de fetch
            const response = await axios.post(`${apiUrl}/login`, 
            {
                nombreCurso: nombreCurso,
                profesor: profesor,
                tipo: tipo,
                estado: estado,
                estudiantes: estudiantes,
                horas: horas,
                beneficio: beneficio,
                descripcion: descripcion,
                requisitos: requisitos,
                fechaInicio: fechaInicio.toISOString().split('T')[0], // Formato YYYY-MM-DD
                fechaCierre: fechaCierre.toISOString().split('T')[0], // Formato YYYY-MM-DD
            });
        }
        catch (error) {
            console.error("Error al hacer la solicitud:", error);
            alert("Error de red o del servidor.");
        
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Crear nueva oferta</Text>
            <Text>Nombre de la oferta</Text>
            <TextInput style={styles.input} value={nombreCurso} onChangeText={setNombreCurso} />
            <Text>Nombre del profesor</Text>
            <TextInput style={styles.input} value={profesor} onChangeText={setProfesor} />
            <View style={styles.row}>
                <View style={styles.pickerContainer}>
                    <Text>Tipo</Text>
                    <Picker selectedValue={tipo} onValueChange={setTipo} style={styles.picker}>
                        <Picker.Item label="Seleccione el tipo" value="" />
                        <Picker.Item label="Tutoria" value="tutoria" />
                        <Picker.Item label="Laboratorio" value="laboratorio" />
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Text>Estado</Text>
                    <Picker selectedValue={estado} onValueChange={setEstado} style={styles.picker}>
                        <Picker.Item label="Seleccione el estado" value="" />
                        <Picker.Item label="Abierto" value="abierto" />
                        <Picker.Item label="Cerrado" value="cerrado" />
                    </Picker>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.halfInput}>
                    <Text>Número de estudiantes</Text>
                    <TextInput style={styles.input} keyboardType="numeric" value={estudiantes} onChangeText={setEstudiantes} />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.halfInput}>
                    <Text>Fecha de inicio</Text>
                    <DateTimePicker
                        value={fechaInicio}
                        mode="date"
                        display="default"
                        onChange={handleConfirmInicio}
                    />
                </View>
                <View style={styles.halfInput}>
                    <Text>Fecha de cierre</Text>
                    <DateTimePicker
                        value={fechaCierre}
                        mode="date"
                        display="default"
                        onChange={handleConfirmCierre}
                    />
                </View>
                
            </View>
            <Text>Beneficio financiero</Text>
            <TextInput style={styles.input} value={beneficio} onChangeText={setBeneficio} />
            <Text style={styles.title}>Políticas internas</Text>

            <Text>Promedio mínimo requerido</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={promedioMinimo}
                onChangeText={setPromedioMinimo}
            />

            <Text>Cursos previos aprobados y notas</Text>
            <TextInput
                style={[styles.input, { height: 80 }]}
                multiline
                placeholder="Ej: Cálculo I: 85, Programación I: 90"
                value={cursosPrevios}
                onChangeText={setCursosPrevios}
            />

            <Text>Horas máximas por semestre</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={horasMaximas}
                onChangeText={setHorasMaximas}
            />

            <Text>Requisitos adicionales</Text>
            <TextInput
                style={[styles.input, { height: 80 }]}
                multiline
                placeholder="Ej: Entrevista, Prueba técnica, etc."
                value={requisitosAdicionales}
                onChangeText={setRequisitosAdicionales}
            />

            <TouchableOpacity style={styles.button} onPress={() => handleCrearOferta()}>
                <Text style={styles.buttonText}>Crear oferta</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
