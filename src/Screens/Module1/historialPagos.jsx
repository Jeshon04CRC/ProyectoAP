import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../../Style/Module1/historialPagos';
import URL from '../../Services/url';
import axios from 'axios';

export default function BeneficiosScreen() {
  const [filtro, setFiltro] = useState('Todo');
  const [busqueda, setBusqueda] = useState('');
  const [filtroSemestre, setFiltroSemestre] = useState('Todo');
  const [filtroTipo, setFiltroTipo] = useState('Todo');
  const navigation = useNavigation();
  const [datos, setDatos] = useState([]);
  const route = useRoute();
  const { userId } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    }, 1800000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleInformacion();
      setDatos(data);
    };
    fetchData();
  }, []);

  const handleInformacion = async () => {
    try {
      const apiUrl = `${URL}:3000`;
      const response = await axios.get(`${apiUrl}/escuelas/historialBeneficiarios`, {
        params: { userId }
      });
      const data = response.data;
      if (response.status === 200) {
        return data || [];
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  // Obtener valores únicos para los pickers
  const semestres = ['Todo', ...Array.from(new Set((datos || []).map(b => b.semestre).filter(Boolean)))];
  const tiposOferta = ['Todo', ...Array.from(new Set((datos || []).map(b => b.tipo).filter(Boolean)))];

  const filtrarBeneficios = () => {
    let resultados = datos || [];

    if (filtro === 'Activo') {
      resultados = resultados.filter((b) => b.estado === 'Aprobada');
    } else if (filtro === 'Inactivo') {
      resultados = resultados.filter((b) => b.estado === 'Inactivo');
    }

    if (filtroSemestre !== 'Todo') {
      resultados = resultados.filter((b) => b.semestre === filtroSemestre);
    }
    if (filtroTipo !== 'Todo') {
      resultados = resultados.filter((b) => b.tipo === filtroTipo);
    }

    if (busqueda.trim() !== '') {
      resultados = resultados.filter((b) =>
        b.estudiante.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    return resultados;
  };

  const beneficiosFiltrados = filtrarBeneficios();

  // Generar PDF solo en web, usando solo jsPDF y opcionalmente jspdf-autotable (NO usa html2canvas)
  const generarReportePDF = async () => {
    if (Platform.OS !== 'web') {
      alert('La generación de PDF solo está disponible en la versión web.');
      return;
    }
    const { jsPDF } = await import('jspdf');
    let autoTable;
    try {
      autoTable = (await import('jspdf-autotable')).default;
    } catch (e) {
      autoTable = null;
    }
    const doc = new jsPDF({ orientation: 'landscape' });

    // Título con estilo
    doc.setFontSize(18);
    doc.setTextColor(33, 150, 243); // Azul
    doc.text('Reporte de Beneficios', 14, 18);

    // Subtítulo
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text('Datos generados por el sistema', 14, 26);

    // Encabezados y datos
    const headers = [
      ['Estudiante', 'Carrera', 'Oferta', 'Tipo', 'Monto', 'Semestre', 'Estado']
    ];
    const rows = beneficiosFiltrados.map(item => [
      item.estudiante,
      item.carrera,
      item.oferta,
      item.tipo,
      String(item.monto),
      item.semestre,
      item.estado
    ]);

    if (autoTable) {
      autoTable(doc, {
        head: headers,
        body: rows,
        startY: 32,
        headStyles: {
          fillColor: [33, 150, 243], // Azul
          textColor: 255,
          fontStyle: 'bold',
          halign: 'center',
          fontSize: 12,
        },
        bodyStyles: {
          fontSize: 10,
          halign: 'center',
          textColor: 50,
        },
        alternateRowStyles: {
          fillColor: [240, 248, 255], // Azul muy claro
        },
        styles: {
          cellPadding: 3,
          overflow: 'linebreak',
          valign: 'middle',
        },
        margin: { left: 14, right: 14 },
        tableLineColor: [200, 200, 200],
        tableLineWidth: 0.1,
      });
    } else {
      // Fallback: solo texto plano si no hay autotable
      let y = 38;
      doc.setFontSize(12);
      doc.setTextColor(33, 150, 243);
      doc.text(headers[0].join(' | '), 14, y);
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      rows.forEach(row => {
        y += 8;
        doc.text(row.join(' | '), 14, y);
      });
    }

    doc.save('reporte_beneficios.pdf');
  };

  const renderBeneficio = ({ item }) => (
    <View
      style={[
        styles.row,
        {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#e0e0e0',
        },
      ]}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[styles.cell, { textAlign: 'center' }]}>{item.estudiante}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[styles.cell, { textAlign: 'center' }]}>{item.carrera}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[styles.cell, { textAlign: 'center' }]}>{item.oferta}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[styles.cell, { textAlign: 'center' }]}>{item.tipo}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[styles.cell, { textAlign: 'center' }]}>{item.monto}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[styles.cell, { textAlign: 'center' }]}>{item.semestre}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.detallesBtn}
          onPress={() =>
            navigation.navigate('perfilPostulante', { userId: item.idEstudiante })
          }
        >
          <Text style={styles.detallesText}>Detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Encabezado alineado igual que los datos
  <View
    style={[
      styles.headerRow,
      {
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
    ]}
  >
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={[styles.headerCell, { textAlign: 'center' }]}>Estudiante</Text>
    </View>
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={[styles.headerCell, { textAlign: 'center' }]}>Carrera</Text>
    </View>
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={[styles.headerCell, { textAlign: 'center' }]}>Oferta</Text>
    </View>
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={[styles.headerCell, { textAlign: 'center' }]}>Tipo</Text>
    </View>
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={[styles.headerCell, { textAlign: 'center' }]}>Monto</Text>
    </View>
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={[styles.headerCell, { textAlign: 'center' }]}>Semestre</Text>
    </View>
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={[styles.headerCell, { textAlign: 'center' }]}>Acciones</Text>
    </View>
  </View>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODOS LOS BENEFICIOS</Text>
      <Text style={styles.subtitle}>
        Administre todos los beneficios financieros asignados
      </Text>

      {/* Buscador */}
      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* Filtros adicionales */}
      <View style={[styles.filtros, { flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }]}>
        {['Todo', 'Activo', 'Inactivo'].map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={[
              styles.filtroBtn,
              filtro === tipo && styles.filtroActivo,
            ]}
            onPress={() => setFiltro(tipo)}
          >
            <Text
              style={[
                styles.filtroTexto,
                filtro === tipo && { color: 'white' },
              ]}
            >
              {tipo}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Filtro por semestre */}
        <View style={{ minWidth: 150 }}>
          <Picker
            selectedValue={filtroSemestre}
            onValueChange={setFiltroSemestre}
            style={{ height: 40 }}
          >
            {semestres.map((sem) => (
              <Picker.Item key={sem} label={sem} value={sem} />
            ))}
          </Picker>
        </View>

        {/* Filtro por tipo de oferta */}
        <View style={{ minWidth: 150 }}>
          <Picker
            selectedValue={filtroTipo}
            onValueChange={setFiltroTipo}
            style={{ height: 40 }}
          >
            {tiposOferta.map((tipo) => (
              <Picker.Item key={tipo} label={tipo} value={tipo} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Botón de reporte */}
      {Platform.OS === 'web' && (
        <TouchableOpacity
          style={[
            styles.button,
            {
              marginVertical: 16,
              alignSelf: 'center',
              backgroundColor: '#2196F3',
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            },
          ]}
          onPress={generarReportePDF}
        >
          <Text style={[styles.buttonText, { color: '#fff', fontWeight: 'bold', fontSize: 16 }]}>
             Generar reporte PDF
          </Text>
        </TouchableOpacity>
      )}

      {/* Encabezado */}
      <View
        style={[
          styles.headerRow,
          {
            backgroundColor: '#f0f0f0',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          },
        ]}
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.headerCell, { textAlign: 'center' }]}>Estudiante</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.headerCell, { textAlign: 'center' }]}>Carrera</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.headerCell, { textAlign: 'center' }]}>Oferta</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.headerCell, { textAlign: 'center' }]}>Tipo</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.headerCell, { textAlign: 'center' }]}>Monto</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.headerCell, { textAlign: 'center' }]}>Semestre</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.headerCell, { textAlign: 'center' }]}>Acciones</Text>
        </View>
      </View>

      {/* Lista */}
      <FlatList
        data={beneficiosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderBeneficio}
        contentContainerStyle={{ minWidth: 700 }}
      />
    </View>
  );
}
