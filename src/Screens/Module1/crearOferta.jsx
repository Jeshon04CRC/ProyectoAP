import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../Style/Module1/crearOferta';
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import URL from '../../Services/url';
import { useNavigation } from '@react-navigation/native';

export default function CrearOfertaScreen () {
    const [nombreCurso, setNombreCurso] = useState('');
    const [profesor, setProfesor] = useState('');
    const [tipo, setTipo] = useState('');
    const [tipoPago, setTipoPago] = useState('');
    const [estado, setEstado] = useState('');
    const [estudiantes, setEstudiantes] = useState('');
    const [horas, setHoras] = useState('');
    const [beneficio, setBeneficio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [requisitos, setRequisitos] = useState('');
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaCierre, setFechaCierre] = useState(new Date());
    const [showInicio, setShowInicio] = useState(false);
    const [showCierre, setShowCierre] = useState(false);
    const [promedioMinimo, setPromedioMinimo] = useState("");
    const [cursosPrevios, setCursosPrevios] = useState("");
    const [horasMaximas, setHorasMaximas] = useState("");
    const [requisitosAdicionales, setRequisitosAdicionales] = useState("");
    const [listaProfesores, setListaProfesores] = useState([]);
    const navigation = useNavigation();

    const router = useRoute();
    const { userId } = router.params;

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'login' }],
            });
        }, 1800000); // 20 minutos

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const cargarProfesores = async () => {
            const data = await handleInformacionProfesor();
            setListaProfesores(data);
        };
        cargarProfesores();
    }, []);

    const handleInformacionProfesor = async () => {
        try {
            const apiUrl = `${URL}:3000`;
            const response = await axios.get(`${apiUrl}/escuelas/profesoresEscuela`, { params : {userId }});   
            return response.data.profesor; 
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
            alert("Error de red o del servidor.");
            return [];
        }
    }

    // --- Cambios para el calendario en web ---
    const handleFechaInicioWeb = (e) => {
        setFechaInicio(new Date(e.target.value));
    };
    const handleFechaCierreWeb = (e) => {
        setFechaCierre(new Date(e.target.value));
    };

    const handleCrearOferta = async () => {
        const data = {  
            id: userId,              
            nombreCurso: nombreCurso,
            profesor: profesor,
            tipo: tipo,
            estudiantes: estudiantes,
            horas: horasMaximas,
            beneficio: tipoPago,
            promedio: promedioMinimo,
            cursosPrevios: cursosPrevios,
            descripcion: descripcion,
            requisitos: requisitosAdicionales,
            fechaInicio: fechaInicio.toISOString().split('T')[0],
            fechaCierre: fechaCierre.toISOString().split('T')[0],
        };
        const camposRequeridos = [
            "id", "nombreCurso", "profesor", "tipo", 
            "estudiantes", "horas", "beneficio", "descripcion", 
            "requisitos", "fechaInicio", "fechaCierre"
        ];

        const camposFaltantes = camposRequeridos.filter((campo) => {
            return data[campo] === undefined || data[campo] === null || data[campo] === '';
        });

        if (camposFaltantes.length > 0) {
            alert(`⚠️ Por favor complete los siguientes campos: ${camposFaltantes.join(", ")}`);
            return;
        }

        try {
            const apiUrl = `${URL}:3000`;
            const response = await axios.post(`${apiUrl}/escuelas/publiOferta`, { data: data });
            alert("Oferta creada exitosamente.");
            navigation.goBack();
        }
        catch (error) {
            console.error("Error al hacer la solicitud:", error);
            alert("Error de red o del servidor.");
        }
    };

    const contenido = (
        <View style={styles.container}>
            <Text style={styles.title}>Crear nueva oferta</Text>
            <Text>Nombre de la oferta</Text>
            <TextInput style={styles.input} value={nombreCurso} onChangeText={setNombreCurso} />
            <Text>Nombre del profesor</Text>
            <Picker
                selectedValue={profesor}
                onValueChange={(value) => setProfesor(value)}
                style={styles.picker}
            >
                <Picker.Item label="Seleccione un profesor" value="" />
                {listaProfesores.map((prof) => (
                    <Picker.Item
                        key={prof.id}
                        label={prof.titulo}
                        value={prof.id}
                    />
                ))}
            </Picker>

            <View style={styles.row}>
                <View style={styles.pickerContainer}>
                    <Text>Tipo</Text>
                    <Picker selectedValue={tipo} onValueChange={setTipo} style={styles.picker}>
                        <Picker.Item label="Seleccione el tipo" value="" />
                        <Picker.Item label="Tutoria" value="tutoria" />
                        <Picker.Item label="Asistencia" value="asistencia" />
                    </Picker>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.pickerContainer}>
                    <Text>Tipo de beneficio</Text>
                    <Picker selectedValue={tipoPago} onValueChange={setTipoPago} style={styles.picker}>
                        <Picker.Item label="Seleccione el pago" value="" />
                        <Picker.Item label="Exoneracion" value="Exoneracion" />
                        <Picker.Item label="Remuneracion" value="Remuneracion" />
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
                    {Platform.OS === 'web' ? (
                        <input
                            type="date"
                            className="input-date"
                            style={{ ...styles.input, padding: 8, fontSize: 16 }}
                            value={fechaInicio.toISOString().split('T')[0]}
                            onChange={handleFechaInicioWeb}
                        />
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => setShowInicio(true)} style={styles.input}>
                                <Text>{fechaInicio.toISOString().split('T')[0]}</Text>
                            </TouchableOpacity>
                            {showInicio && (
                                <DateTimePicker
                                    value={fechaInicio}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowInicio(false);
                                        if (selectedDate) setFechaInicio(selectedDate);
                                    }}
                                />
                            )}
                        </>
                    )}
                </View>

                <View style={styles.halfInput}>
                    <Text>Fecha de cierre</Text>
                    {Platform.OS === 'web' ? (
                        <input
                            type="date"
                            className="input-date"
                            style={{ ...styles.input, padding: 8, fontSize: 16 }}
                            value={fechaCierre.toISOString().split('T')[0]}
                            onChange={handleFechaCierreWeb}
                        />
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => setShowCierre(true)} style={styles.input}>
                                <Text>{fechaCierre.toISOString().split('T')[0]}</Text>
                            </TouchableOpacity>
                            {showCierre && (
                                <DateTimePicker
                                    value={fechaCierre}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowCierre(false);
                                        if (selectedDate) setFechaCierre(selectedDate);
                                    }}
                                />
                            )}
                        </>
                    )}
                </View>
            </View>
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

            <Text>Descripcion</Text>
            <TextInput
                style={[styles.input, { height: 80 }]}
                multiline
                placeholder=""
                value={descripcion}
                onChangeText={setDescripcion}
            />

            <TouchableOpacity style={styles.button} onPress={handleCrearOferta}>
                <Text style={styles.buttonText}>Crear oferta</Text>
            </TouchableOpacity>
        </View>
    );

    if (Platform.OS === 'web') {
        return (
            <div style={{ height: '100vh', overflowY: 'auto', background: '#fff' }}>
                {contenido}
            </div>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {contenido}
        </ScrollView>
    );
}
