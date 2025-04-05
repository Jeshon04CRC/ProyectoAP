import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native"
import { View, Text, TouchableOpacity, FlatList, TextInput} from "react-native";
import { styles } from "../../Style/Module1/publiOferta";

const ofertasIniciales = [
{
    id: "1",
    nombre: "Tuto mate",
    tipo: "Tutotía",
    estado: "Abierto",
    estudiantes: 25,
    horas: 40,
    fechaLimite: "Apr 15, 2025",
    beneficio: "Exoneración",
},
{
    id: "2",
    nombre: "Tuto física",
    tipo: "Tutotía",
    estado: "Cerrado",
    estudiantes: 30,
    horas: 50,
    fechaLimite: "May 10, 2025",
    beneficio: "Beca",
},
];

export default function OfertasScreen() {
    const [search, setSearch] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("Todo");
    const [ofertas, setOfertas] = useState(ofertasIniciales);
    const navigation = useNavigation()

    const filtrarOfertas = (texto) => {
        setSearch(texto);
        actualizarFiltro(texto, estadoFiltro);
    };

    const filtrarPorEstado = (estado) => {
        setEstadoFiltro(estado);
        actualizarFiltro(search, estado);
    };

    const actualizarFiltro = (texto, estado) => {
        let filtradas = ofertasIniciales;
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

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Estados de las ofertas</Text>
        <View style={styles.filters}>
            {['Todo', 'Abierto', 'Revisión', 'Cerrado'].map((estado) => (
            <TouchableOpacity
                key={estado}
                style={[styles.filterButton, estadoFiltro === estado && styles.activeFilter]}
                onPress={() => filtrarPorEstado(estado)}
            >
                <Text style={styles.filterText}>{estado}</Text>
            </TouchableOpacity>
            ))}
        </View>
        <TouchableOpacity style={styles.newOfferButton} onPress={() => navigation.navigate("crearOferta")}>
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={styles.card}>
                <Text style={styles.offerName}>{item.nombre}</Text>
                <Text>Tipo: {item.tipo}</Text>
                <View style={styles.chip}><Text style={styles.chipText}>{item.estado}</Text></View>
                <Text>Estudiantes: {item.estudiantes}</Text>
                <Text>Horas: {item.horas}</Text>
                <Text>Fecha límite: {item.fechaLimite}</Text>
                <Text>Beneficio: {item.beneficio}</Text>
                <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>
            </View>
            )}
        />
        </View>
    );
}
