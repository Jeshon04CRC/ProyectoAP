import { transporter } from "../Services/emails.js";
import { Timestamp } from 'firebase/firestore';
import { db, app } from "../Services/fireBaseConnect.js";
import { collection, getDocs, updateDoc, doc, doc as docRef, getDoc, addDoc, query, where, arrayUnion, arrayRemove} from "firebase/firestore";
import PDFDocument from 'pdfkit';


//---------------------------------------------------------------------------------------------------------------
// Funcion que busca la informacion de un estudiante especiico, luego de ser ingresado la informacion del login
//----------------------------------------------------------------------------------------------------------------

export const informacionEstudiante = async (req, res) => {
  const { userId } = req.query;
  try {
    let carrera = '';
    const userDoc = await getDoc(doc(db, "Usuarios", userId));
    const escuelaDoc = await getDocs(collection(db, "Usuarios"));
    if (!userDoc.exists()) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const datos = userDoc.data();

    // Obtener nombres de cursos aprobados si existen
    const cursosNombres = [];
    if (Array.isArray(datos.cursosAprovados)) {
      for (const idCurso of datos.cursosAprovados) {
        const cursoDoc = await getDoc(doc(db, "Cursos", idCurso));

        if (cursoDoc.exists()) {
          cursosNombres.push(cursoDoc.data().nombre || idCurso);
        } else {
          cursosNombres.push(idCurso);
        }
      }
    }

    for(const docs of escuelaDoc.docs){
      const datos1 = docs.data();
      if(docs.id === datos.carrera){
        carrera = datos1.carrera;
      }
    }

    const respuesta = {
      ...datos,
      carrera: carrera,
      cursosAprovados: cursosNombres
    };

    return res.status(200).json({ datos: respuesta });
  } catch (error) {
    console.error("Error al obtener la información del estudiante:", error);
    return res.status(500).json({ error: "Error al obtener la información del estudiante" });
  }
};

//---------------------------------------------------------------------------------------------------------------
// Funcion que busca la informacion de todas las carreras
//----------------------------------------------------------------------------------------------------------------

export const obtenerCarreras = async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "Usuarios"));
    const carrerasSet = new Set();

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.tipoUsuario === "Escuela" && data.carrera) {
        carrerasSet.add(data.carrera.trim());
      }
    });

    return res.status(200).json({ carreras: Array.from(carrerasSet) });
  } catch (error) {
    console.error("Error al extraer carreras:", error);
    return res.status(500).json({ error: "Error al extraer las carreras" });
  }
};

//---------------------------------------------------------------------------------------------------------------
// Funcion crea con correo institucional, ingreso de carrera y nivel, carga de documentos, sincronización de notas
//  y promedio a un estudiante 
//----------------------------------------------------------------------------------------------------------------

export const registrarPerfilAcademico = async (req, res) => {
  const { userId, carrera, nivelAcademico, promedio } = req.body;

  console.log("Datos recibidos en registrarPerfilAcademico:");
  console.log("userId:", userId);
  console.log("carrera:", carrera);
  console.log("nivelAcademico:", nivelAcademico);
  console.log("promedio:", promedio);

  try {
    const ref = doc(db, "Usuarios", userId);
    const docSnap = await getDoc(ref);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    await updateDoc(ref, {
      carrera: carrera || "",
      nivelAcademico: nivelAcademico || "",
      ponderado: promedio || ""
    });

    return res.status(200).json({ message: "Perfil académico registrado" });
  } catch (error) {
    console.error("Error en Firestore:", error);
    return res.status(500).json({ error: "Error al registrar perfil académico" });
  }
};

//---------------------------------------------------------------------------------------------------------------
// Funcion que obtiene todas las oportunidades que existen ya aprobadas
//----------------------------------------------------------------------------------------------------------------

export const obtenerOportunidades = async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "Asistencias"));
    const usuariosSnapshot = await getDocs(collection(db, "Usuarios"));

    const usuariosMap = {};
    usuariosSnapshot.forEach(doc => {
      const data = doc.data();
      usuariosMap[doc.id] = data.nombre;
    });

    const oportunidades = snapshot.docs
      .filter(doc => doc.data().estado !== "Cerrado")
      .map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        titulo: data.tituloPrograma || "Sin título",
        escuela: usuariosMap[data.departamento] || "Desconocido",
        encargado: usuariosMap[data.personaACargo] || "Sin encargado",
        horas: `${data.totalHoras || "0"} horas mínimas a la semana`,
        requisitos: Array.isArray(data.requisitos) ? data.requisitos.join(', ') : "Sin requisitos",
        descripcion: data.descripcion || "",
        tipo: data.tipo || "",
        estado: data.estado || "",
        horario: data.horario || "Sin horario definido",
        cantidadVacantes: data.cantidadVacantes || "0",
        cantidadSolicitudes: data.cantidadSolicitudes || "0",
        objetivos: data.objetivos || "No especificados",
        beneficio: data.beneficio || "No aplica",
        promedioRequerido: data.promedioRequerido || "No especificado",
        semestre: data.semestre || "No definido",
        fechaInicio: data.fechaInicio || "No definida",
        fechaFin: data.fechaFin || "No definida",
        totalHoras: data.totalHoras || "0"
      };
    });

    return res.status(200).json({ oportunidades });

  } catch (error) {
    console.error("Error al obtener oportunidades:", error);
    return res.status(500).json({ error: "No se pudieron obtener las oportunidades" });
  }
};

//---------------------------------------------------------------------------------------------------------------
// Funcion que registra la solicitud de un estudiante a una Asistencia especifica 
//----------------------------------------------------------------------------------------------------------------
export const registrarSolicitud = async (req, res) => {
  const {
    nombre, correo, telefono, promedio, horas, nota,
    comentarios, documento, tituloOportunidad, userId
  } = req.body;

  try {
    // 1. Guardar la solicitud
    await addDoc(collection(db, 'Solicitudes'), {
      nombre,
      correo,
      telefono,
      promedio,
      horas,
      nota,
      comentarios,
      documento,
      tituloOportunidad,
      userId,
      estado: 'Pendiente',
      fecha: Timestamp.now()
    });

    // 2. Buscar la oportunidad en Asistencias por título
    const asistenciasQuery = query(collection(db, 'Asistencias'), where('tituloPrograma', '==', tituloOportunidad));
    const snapshot = await getDocs(asistenciasQuery);

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      const data = snapshot.docs[0].data();

      const cantidadActual = parseInt(data.cantidadSolicitudes || 0);

      // 3. Actualizar postulaciones y cantidadSolicitudes
      await updateDoc(docRef, {
        postulaciones: arrayUnion(userId),
        cantidadSolicitudes: cantidadActual + 1
      });
    }

    return res.status(200).json({ mensaje: 'Solicitud registrada correctamente' });
  } catch (error) {
    console.error('Error al registrar la solicitud:', error);
    return res.status(500).json({ error: 'Error al registrar la solicitud' });
  }
};


//---------------------------------------------------------------------------------------------------------------
// Funcion que registra el seguimiento de las solicitudes 
//----------------------------------------------------------------------------------------------------------------

export const seguimientoSolicitudes = async (req, res) => {
  const { userId } = req.query;

  try {
    if (!userId) {
      return res.status(400).json({ error: 'Falta el ID del usuario' });
    }

    // Obtener referencias necesarias
    const solicitudesRef = collection(db, 'Solicitudes');
    const asistenciasRef = collection(db, 'Asistencias');
    const usuariosRef = collection(db, 'Usuarios');
    const asistenciasAsigRef = collection(db, 'AsistenciasAsignadas');


    // Obtener las solicitudes del estudiante
    const q = query(solicitudesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const asistencias = await getDocs(asistenciasRef);
    const usuarios = await getDocs(usuariosRef);

    const asistenciasAsi = await getDocs(asistenciasAsigRef);

    const solicitudesMap = new Map();

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      // Evitar duplicados por ID (más confiable que título)
      if (!data.tituloOportunidad || solicitudesMap.has(doc.id)) continue;

      let tipoBeca = 'Sin tipo';
      let periodo = 'Sin periodo';
      let responsable = 'No asignado';
      let retroalimentacion = 'Sin retroalimentación';
      let avances = 'Sin avances';
      let certificados = 'Sin certificados';
      // Buscar el tipo y responsable en la colección de asistencias
      for (const asistencia of asistencias.docs) {
        const a = asistencia.data();
        if (a.tituloPrograma === data.tituloOportunidad) {
          tipoBeca = a.tipo || 'Sin tipo';
          periodo = a.semestre || 'Sin periodo';
          // Buscar nombre del profesor responsable
          const usuario = usuarios.docs.find(u => u.id === a.personaACargo);
          responsable = usuario?.data()?.nombre || 'No asignado';

          const datosAsistencias = asistenciasAsi.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const asistenciaAux = datosAsistencias.find(u => u.userId === data.userId);
          console.log("Asistencia Aux:", asistenciaAux);
          retroalimentacion = asistenciaAux?.retroalimentacion || 'Sin retroalimentación';
          avances = asistenciaAux?.desempeno || 'Sin avances';
          certificados = asistenciaAux?.cumplimientoTareas || 'Sin certificados'; 

        }
      }

      solicitudesMap.set(doc.id, {
        id: doc.id,
        titulo: data.tituloOportunidad || 'Sin título',
        tipoBeca,
        periodo,
        responsable,
        estado: data.estado || 'Pendiente',
        horasTrabajadas: parseInt(data.horas) || 0,
        avances: avances,
        retroalimentacion: retroalimentacion,
        certificados: certificados,
      });
    }

    const resultado = Array.from(solicitudesMap.values());
    console.log("Solicitudes enviadas al frontend:", resultado);

    return res.status(200).json({ solicitudes: resultado });
  } catch (error) {
    console.error('Error al obtener las solicitudes:', error);
    return res.status(500).json({ error: 'Error al obtener las solicitudes' });
  }
};


//---------------------------------------------------------------------------------------------------------------
// Funcion que obtiene las oportunidades favoritas de un estudiante
//----------------------------------------------------------------------------------------------------------------
export const oportunidadesFavoritas = async (req, res) => {
  const { userId } = req.query;

  try {
    if (!userId) {
      return res.status(400).json({ error: 'Falta el ID del usuario' });
    }

    // Obtener el documento del usuario
    const favoritosRef = collection(db, 'Favoritos');
    const userDoc = await getDocs(favoritosRef);

    for (const doc of userDoc.docs) {
      const data = doc.data();
      if (data.idUsuario === userId) {
        const oportunidadesFavoritas = data.idOportunidades || [];
        return res.status(200).json({ oportunidadesFavoritas });
      }
    }

  } catch (error) {
    console.error('Error al obtener las oportunidades favoritas:', error);
    return res.status(500).json({ error: 'Error al obtener las oportunidades favoritas' });
  }
};

//---------------------------------------------------------------------------------------------------------------
// Funcion que selecciona una oportunidad como favorita
//----------------------------------------------------------------------------------------------------------------
export const selecionarFavoritas = async (req, res) => {
  const { userId, idOportunidad } = req.body;
  console.log("ID de la oportunidad seleccionada:", idOportunidad);

  try {
    const favoritosRef = collection(db, 'Favoritos');
    const snapshot = await getDocs(favoritosRef);

    let encontrado = false;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data.idUsuario === userId) {
        // Ya existe el documento del usuario, se actualiza
        await updateDoc(doc.ref, {
          idOportunidades: arrayUnion(idOportunidad)
        });
        encontrado = true;
        break;
      }
    }

    // Si no se encontró un documento con ese usuario, se crea uno nuevo
    if (!encontrado) {
      await addDoc(favoritosRef, {
        idUsuario: userId,
        idOportunidades: [idOportunidad]
      });
    }

    return res.status(200).json({ mensaje: 'Oportunidad seleccionada como favorita' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al seleccionar la oportunidad favorita' });
  }
};

//---------------------------------------------------------------------------------------------------------------
// Funcion que elimina una oportunidad de la lista de favoritas
//----------------------------------------------------------------------------------------------------------------
export const eliminarFavoritas = async (req, res) => {
  const { userId, idOportunidad } = req.query;
  console.log("ID de la oportunidad eliminada:", idOportunidad);
  try {

    // Obtener el documento del usuario
    const favoritosRef = collection(db, 'Favoritos');
    const userDocs = await getDocs(favoritosRef);

    for (const doc of userDocs.docs) {
      const data = doc.data();
      if (data.idUsuario === userId) {
        // Aquí eliminamos el idOportunidad del array
        await updateDoc(doc.ref, {
          idOportunidades: arrayRemove(idOportunidad)
        });
        return res.status(200).json({ mensaje: 'Oportunidad eliminada de favoritas' });
      }
    }

    // Si no se encontró el usuario
    return res.status(404).json({ error: 'Usuario no encontrado' });

  } catch (error) {
    console.error('Error al eliminar la oportunidad favorita:', error);
    return res.status(500).json({ error: 'Error al eliminar la oportunidad favorita' });
  }
};


//---------------------------------------------------------------------------------------------------------------
// Funcion que genera un PDF con el seguimiento de las solicitudes
//----------------------------------------------------------------------------------------------------------------
export const seguimientoPDF = async (req, res) => {
  const { userId } = req.query;

  try {
if (!userId) {
      return res.status(400).json({ error: 'Falta el ID del usuario' });
    }

    // Obtener referencias necesarias
    const solicitudesRef = collection(db, 'Solicitudes');
    const asistenciasRef = collection(db, 'Asistencias');
    const usuariosRef = collection(db, 'Usuarios');
    const asistenciasAsigRef = collection(db, 'AsistenciasAsignadas');


    // Obtener las solicitudes del estudiante
    const q = query(solicitudesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const asistencias = await getDocs(asistenciasRef);
    const usuarios = await getDocs(usuariosRef);

    const asistenciasAsi = await getDocs(asistenciasAsigRef);

    const solicitudesMap = new Map();

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      // Evitar duplicados por ID (más confiable que título)
      if (!data.tituloOportunidad || solicitudesMap.has(doc.id)) continue;

      let tipoBeca = 'Sin tipo';
      let periodo = 'Sin periodo';
      let responsable = 'No asignado';
      let retroalimentacion = 'Sin retroalimentación';
      let avances = 'Sin avances';
      let certificados = 'Sin certificados';
      let pago = 'Sin pago';
      let nombre = data.nombre || 'Sin nombre';
      // Buscar el tipo y responsable en la colección de asistencias
      for (const asistencia of asistencias.docs) {
        const a = asistencia.data();
        if (a.tituloPrograma === data.tituloOportunidad) {
          tipoBeca = a.tipo || 'Sin tipo';
          periodo = a.semestre || 'Sin periodo';
          // Buscar nombre del profesor responsable
          const usuario = usuarios.docs.find(u => u.id === a.personaACargo);
          responsable = usuario?.data()?.nombre || 'No asignado';

          const datosAsistencias = asistenciasAsi.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const asistenciaAux = datosAsistencias.find(u => u.userId === data.userId);
          console.log("Asistencia Aux:", asistenciaAux);
          retroalimentacion = asistenciaAux?.retroalimentacion || 'Sin retroalimentación';
          avances = asistenciaAux?.desempeno || 'Sin avances';
          certificados = asistenciaAux?.cumplimientoTareas || 'Sin certificados'; 
          pago = asistenciaAux?.pago || 'Sin pago';

        }
      }

      solicitudesMap.set(doc.id, {
        id: doc.id,
        nombre: nombre,
        titulo: data.tituloOportunidad || 'Sin título',
        tipoBeca,
        periodo,
        responsable,
        estado: data.estado || 'Pendiente',
        horasTrabajadas: parseInt(data.horas) || 0,
        avances: avances,
        retroalimentacion: retroalimentacion,
        certificados: certificados,
        pago: pago
      });
    }

    const solicitudes = Array.from(solicitudesMap.values());

    // Crear documento PDF
    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=seguimiento.pdf');
    doc.pipe(res);

    // Encabezado
    doc.fontSize(20).fillColor('#0A0A0A').text('Reporte de Seguimiento', { align: 'center' });
    doc.moveDown();

    const fecha = new Date().toLocaleDateString('es-CR');
    doc.fontSize(10).fillColor('gray').text(`Generado el: ${fecha}`, { align: 'right' });
    doc.moveDown();

    doc.moveTo(doc.x, doc.y).lineTo(550, doc.y).stroke(); // Línea separadora
    doc.moveDown();

    if (solicitudes.length > 0) {
      doc.fontSize(14).fillColor('#1F4E79').text(`Usuario: ${solicitudes[0].nombre}`);
      doc.moveDown();
    } else {
      doc.fontSize(14).fillColor('red').text('Usuario: No encontrado');
      doc.moveDown();
    }

    solicitudes.forEach((sol, index) => {
      doc.fontSize(13).fillColor('#2E74B5').text(`Solicitud ${index + 1}: ${sol.titulo}`);
      doc.moveDown(0.3);

      doc.fontSize(11).fillColor('black')
        .text(`- Tipo de Beca: ${sol.tipoBeca}`, { indent: 20 })
        .text(`- Periodo: ${sol.periodo}`, { indent: 20 })
        .text(`- Responsable: ${sol.responsable}`, { indent: 20 })
        .text(`- Estado: ${sol.estado}`, { indent: 20 })
        .text(`- Horas Trabajadas: ${sol.horasTrabajadas}`, { indent: 20 })
        .text(`- Avances: ${sol.avances}`, { indent: 20 })
        .text(`- Retroalimentación: ${sol.retroalimentacion}`, { indent: 20 })
        .text(`- Certificados: ${sol.certificados}`, { indent: 20 })
        .text(`- Pago: ${sol.pago}`, { indent: 20 });

      doc.moveDown();
      doc.moveTo(doc.x, doc.y).lineTo(550, doc.y).dash(1, { space: 2 }).stroke(); // Línea separadora punteada
      doc.undash();
      doc.moveDown();
    });

    doc.end();

  } catch (error) {
    console.error('Error al generar el PDF:', error);
    res.status(500).send('Error generando el PDF');
  }
};

//---------------------------------------------------------------------------------------------------------------
// Funcion que genera un PDF con la evaluacion de las solicitudes
//----------------------------------------------------------------------------------------------------------------
export const evaluacionPDF = async (req, res) => {
  const { userId } = req.query;
  try {
      if (!userId) {
        return res.status(400).json({ message: "Falta el parámetro userId." });
      }

      // 1. Obtener asistencias a cargo del usuario
      const asistenciasRef = collection(db, "Asistencias");
      const qAsistencias = query(asistenciasRef, where("personaACargo", "==", userId));
      const snapshotAsistencias = await getDocs(qAsistencias);
      const usuariosRef = collection(db, 'Usuarios');

      const usuarios = await getDocs(usuariosRef);

      const asistenciaIds = snapshotAsistencias.docs.map(doc => doc.id);
      if (asistenciaIds.length === 0) {
        return res.status(404).json({ message: "No se encontraron asistencias para este profesor." });
      }

      // 2. Obtener asignaciones en chunks (máx. 10 por consulta)
      const asignadasRef = collection(db, "AsistenciasAsignadas");
      const chunks = [];
      const idsCopy = [...asistenciaIds];
      while (idsCopy.length) chunks.push(idsCopy.splice(0, 10));

      const asistenciasRelacionadas = [];
      for (const chunk of chunks) {
        const qAsign = query(asignadasRef, where("asistenciaId", "in", chunk));
        const snapAsign = await getDocs(qAsign);

        for (const asignDoc of snapAsign.docs) {
          const dataAsign = asignDoc.data();
          const asistDocSnap = await getDoc(docRef(db, "Asistencias", dataAsign.asistenciaId));

          if (asistDocSnap.exists()) {
            asistenciasRelacionadas.push({
              asignacionId: asignDoc.id,
              datosAsignacion: dataAsign,
              datosAsistencia: asistDocSnap.data(),
            });
          }
        }
      }

      // 3. Obtener asistencias cerradas del usuario
      const qCerradas = query(
        asistenciasRef,
        where("personaACargo", "==", userId),
        where("estado", "==", "Cerrado")
      );
      const snapCerradas = await getDocs(qCerradas);
      const asistenciasCerradas = snapCerradas.docs.map(doc => ({
        asistenciaId: doc.id,
        datosAsistencia: doc.data(),
      }));

      // 4. Filtrar cerradas que no estén asignadas
      const titulosAsignadas = new Set(
        asistenciasRelacionadas.map(a => a.datosAsistencia.tituloPrograma.trim().toLowerCase())
      );
      const cerradasFiltradas = asistenciasCerradas.filter(c => {
        const titulo = c.datosAsistencia.tituloPrograma.trim().toLowerCase();
        return !titulosAsignadas.has(titulo);
      });

      // 5. Simular solicitudes (debes reemplazarlo con datos reales si aplica)
      const solicitudes = [
        ...asistenciasRelacionadas.map(a => ({
          nombre: a.datosAsistencia.nombre || "Desconocido",
          titulo: a.datosAsistencia.tituloPrograma,
          tipoBeca: a.datosAsistencia.beneficio || "N/A",
          periodo: a.datosAsistencia.semestre || "N/A",
          responsable: a.datosAsistencia.responsable || "N/A",
          estado: a.datosAsistencia.estado || "N/A",
          horasTotales: a.datosAsistencia.totalHoras || 0,
          avances: a.datosAsignacion.desempeno || "N/A",
          retroalimentacion: a.datosAsignacion.retroalimentacion || "N/A",
          certificados: a.datosAsignacion.cumplimientoTareas || "N/A",
          pago: a.datosAsignacion.pago || "N/A",
        })),
        ...cerradasFiltradas.map(c => ({
          nombre: "Sin asignación",
          titulo: c.datosAsistencia.tituloPrograma,
          tipoBeca: "N/A",
          periodo: "N/A",
          responsable: "N/A",
          estado: "Cerrado",
          horasTrabajadas: 0,
          avances: "N/A",
          retroalimentacion: "N/A",
          certificados: "N/A",
          pago: "N/A",
        })),
      ];

      let responsable = 'No asignado';
      const usuario = usuarios.docs.find(u => u.id === userId);
      responsable = usuario?.data()?.nombre || 'No asignado';

      console.log("Solicitudes para el PDF:", asistenciasRelacionadas);

      // 6. Crear documento PDF
      const doc = new PDFDocument({ margin: 50 });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=seguimiento.pdf');
      doc.pipe(res);

      // Encabezado
      doc.fontSize(20).fillColor('#0A0A0A').text('Reporte de Seguimiento', { align: 'center' });
      doc.moveDown();
      const fecha = new Date().toLocaleDateString('es-CR');
      doc.fontSize(10).fillColor('gray').text(`Generado el: ${fecha}`, { align: 'right' });
      doc.moveDown().moveTo(doc.x, doc.y).lineTo(550, doc.y).stroke().moveDown();

      // Nombre (del primero que tenga)
      if (solicitudes.length > 0) {
        doc.fontSize(14).fillColor('#1F4E79').text(`Usuario: ${responsable}`);
      } else {
        doc.fontSize(14).fillColor('red').text('Usuario: No encontrado');
      }
      doc.moveDown();

      // Contenido de cada solicitud
      solicitudes.forEach((sol, index) => {
        doc.fontSize(13).fillColor('#2E74B5').text(`Solicitud ${index + 1}: ${sol.titulo}`);
        doc.moveDown(0.3);

        doc.fontSize(11).fillColor('black')
          .text(`- Tipo de Beca: ${sol.tipoBeca}`, { indent: 20 })
          .text(`- Periodo: ${sol.periodo}`, { indent: 20 })
          .text(`- Estado: ${sol.estado}`, { indent: 20 })
          .text(`- Horas Totales: ${sol.horasTotales}`, { indent: 20 })
          .text(`- Avances: ${sol.avances}`, { indent: 20 })
          .text(`- Retroalimentación: ${sol.retroalimentacion}`, { indent: 20 })
          .text(`- Certificados: ${sol.certificados}`, { indent: 20 })
          .text(`- Pago: ${sol.pago}`, { indent: 20 });

        doc.moveDown();
        doc.moveTo(doc.x, doc.y).lineTo(550, doc.y).dash(1, { space: 2 }).stroke();
        doc.undash().moveDown();
      });

      doc.end();
    } catch (error) {
      console.error('❌ Error al generar el PDF:', error);
      res.status(500).send('Error generando el PDF');
    }
}