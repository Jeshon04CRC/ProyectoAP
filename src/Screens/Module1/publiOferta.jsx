import React, { use, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native"
import { View, Text, TouchableOpacity, FlatList, TextInput, Platform} from "react-native";
import { styles } from "../../Style/Module1/publiOferta";
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import URL from '../../Services/url';
import { Ionicons } from '@expo/vector-icons'; // Agrega esta línea al inicio



export default function OfertasScreen() {
    const [search, setSearch] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("Todo");
    const [ofertas, setOfertas] = useState();
    const [ofertasOriginales, setOfertasOriginales] = useState();
    const navigation = useNavigation();
    const router = useRoute();
    const { userId } = router.params;

    useEffect(() => {
    const timer = setTimeout(() => {
        navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
        });
    }, 1800000); // 20 segundos

    return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const datos = await handleInformacion();
            if (datos) {
                setOfertas(datos);
                setOfertasOriginales(datos);
            }
        };
        fetchData();
    }, []);

    const handleInformacion = async () => {
        try {
            const apiUrl = `${URL}:3000`;
            const response = await axios.get(`${apiUrl}/escuelas/historialOfertasActivas`, {
                params: { userId }
            });

            if (response.status === 200) {
                const data = response.data.ofertasActuales;
                return data;
            } else {
                console.error("Error al obtener los datos:", response.statusText);
                return null;
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
            return null;
        }
    };

    const filtrarOfertas = (texto) => {
        setSearch(texto);
        actualizarFiltro(texto, estadoFiltro);
    };

    const filtrarPorEstado = (estado) => {
        setEstadoFiltro(estado);
        actualizarFiltro(search, estado);
    };

    const actualizarFiltro = (texto, estado) => {
        let filtradas = ofertasOriginales;
        if (estado !== "Todo") {
            filtradas = filtradas.filter((oferta) => oferta.estado === estado);
        }
        if (texto !== "") {
            filtradas = filtradas.filter((oferta) =>
                oferta.nombre.toLowerCase().includes(texto.toLowerCase())
            );
        }
        setOfertas(filtradas);
    };

    const bloquearOferta = async (ofertaId, bandera) =>  {

        console.log("Bloqueando oferta con ID:", ofertaId);

            try {
            const apiUrl = `${URL}:3000`;
            const response = await axios.put(`${apiUrl}/escuelas/bloquearOferta`, {
                 ofertaId, bandera
            });

            if (response.status === 200) {
                const data = response.data.ofertasActuales;
                return data;
            } else {
                console.error("Error al obtener los datos:", response.statusText);
                return null;
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
            return null;
        }
    };

    const contenido = (
        <View style={styles.container}>
            <Text style={styles.title}>Estados de las ofertas</Text>
            <View style={styles.filters}>
                {['Todo', 'Abierto', 'Revision', 'Bloqueado'].map((estado) => (
                    <TouchableOpacity
                        key={estado}
                        style={[styles.filterButton, estadoFiltro === estado && styles.activeFilter]}
                        onPress={() => filtrarPorEstado(estado)}
                    >
                        <Text style={styles.filterText}>{estado}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={styles.newOfferButton}
                onPress={() => navigation.navigate("crearOferta", { userId: userId })}
            >
                <Text style={styles.newOfferText}>+ Nueva oferta</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.searchBar}
                placeholder="Buscar..."
                value={search}
                onChangeText={filtrarOfertas}
            />

            <FlatList
                data={ofertas}
                keyExtractor={(item) => item.nombre}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {/* Botón de bloquear/desbloquear en la esquina superior derecha */}
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                zIndex: 1,
                                backgroundColor: 'white',
                                borderRadius: 20,
                                padding: 2,
                            }}
                            onPress={() => {
                                if (item.estado === "Bloqueado") {
                                    // Aquí llamas a la función que quieras cuando está bloqueada
                                    // Por ejemplo: desbloquearOferta(item.idAsistencia)
                                    bloquearOferta(item.idAsistencia, 2);
                                    alert("Oferta desbloqueada");
                                } else {
                                    bloquearOferta(item.idAsistencia, 1);
                                    alert
                                }
                            }}
                        >
                            <Ionicons
                                name={item.estado === "Bloqueado" ? "lock-open-outline" : "lock-closed-outline"}
                                size={24}
                                color={item.estado === "Bloqueado" ? "#f0ad4e" : "#d9534f"}
                            />
                        </TouchableOpacity>

                        <Text style={styles.offerName}>{item.nombre}</Text>
                        <Text>Tipo: {item.tipo}</Text>
                        <View style={styles.chip}>
                            <Text style={styles.chipText}>{item.estado}</Text>
                        </View>
                        <Text>Estudiantes: {item.estudiantes}</Text>
                        <Text>Horas: {item.horas}</Text>
                        <Text>Fecha límite: {item.fechaLimite}</Text>
                        <Text>Beneficio: {item.beneficio}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => navigation.navigate("editarOferta", { oferta: item.idAsistencia, userId : userId })}
                            >
                                <Text style={styles.editText}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );

    if (Platform.OS === 'web') {
        return (
            <div style={{ height: '100vh', overflowY: 'auto', background: '#fff' }}>
                {contenido}
            </div>
        );
    }

    return contenido;
}