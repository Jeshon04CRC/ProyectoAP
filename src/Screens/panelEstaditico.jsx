import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import URL from '../Services/url';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function PanelEstaditico() {
  const [totalEstudiantes, setTotalEstudiantes] = useState(0);
  const [estudiantesActivos, setEstudiantesActivos] = useState(0);
  const [estudiantesPostulados, setEstudiantesPostulados] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const apiUrl = `${URL}:3000`;
        const response = await axios.get(`${apiUrl}/admin/obtenerDatosEstadistica`);
        setTotalEstudiantes(response.data.totalUsuarios);
        setEstudiantesActivos(response.data.estudiantesActivos);
        setEstudiantesPostulados(response.data.estudiantesPostulados);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, []);

  const dataActivos = {
    labels: ['Total', 'Activos'],
    datasets: [
      {
        label: 'Estudiantes Activos',
        data: [totalEstudiantes, estudiantesActivos],
        backgroundColor: ['#b0b0b0', '#405F90'],
      },
    ],
  };

  // Aquí la gráfica de postulados se compara contra los activos
  const dataPostulados = {
    labels: ['Activos', 'Postulados'],
    datasets: [
      {
        label: 'Estudiantes Postulados',
        data: [estudiantesActivos, estudiantesPostulados],
        backgroundColor: ['#b0b0b0', '#2196F3'],
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        max: totalEstudiantes > 0 ? totalEstudiantes : undefined,
        title: {
          display: true,
          text: 'Cantidad',
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center' }}>Panel Estadístico</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <h3>Estudiantes Activos</h3>
          <table style={{ margin: '0 auto 16px auto', borderCollapse: 'collapse', minWidth: 200 }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: 8 }}>Total</th>
                <th style={{ border: '1px solid #ccc', padding: 8 }}>Activos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{totalEstudiantes}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{estudiantesActivos}</td>
              </tr>
            </tbody>
          </table>
          <div style={{ maxWidth: 350, margin: '0 auto 32px auto' }}>
            <Bar data={dataActivos} options={options} height={120} width={350} />
          </div>

          <h3>Estudiantes Postulados</h3>
          <table style={{ margin: '0 auto 16px auto', borderCollapse: 'collapse', minWidth: 200 }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: 8 }}>Activos</th>
                <th style={{ border: '1px solid #ccc', padding: 8 }}>Postulados</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{estudiantesActivos}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{estudiantesPostulados}</td>
              </tr>
            </tbody>
          </table>
          <div style={{ maxWidth: 350, margin: '0 auto' }}>
            <Bar data={dataPostulados} options={options} height={120} width={350} />
          </div>
        </>
      )}
    </div>
  );
}