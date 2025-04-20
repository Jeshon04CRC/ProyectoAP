import { transporter } from "../Services/emails.js";
import { db, app } from "../Services/fireBaseConnect.js";
import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";


//PARA EL INFOESCUELA 

export const informacionEscuela = async (req, res) => {
    const { userId } = req.query;
    try {
      const querySnapshot = await getDocs(collection(db, "Usuarios"));

      for (const doc of querySnapshot.docs) {
        const datos = doc.data();
        if (doc.id === userId) {
          console.log("InformacionDepatamento:", datos);
          return res.status(200).json({datos});
        }
      }
  
      console.log("Correo o contraseña incorrectos.");
      return res.status(400).json({ error: "Correo o contraseña incorrectos." });
  
    } catch (error) {
      console.error("Error al validar credenciales:", error);
      return res.status(401).json({ error: "Error al validar credenciales" });
    }
}

export const actualizarInfoEscuela = async (req, res) => {
    const { userId, formData } = req.body;
    try {

      console.log("userId:", userId);
      console.log("formData:", formData);
      // Obtén la referencia al documento del usuario en la colección "Usuarios"
      const docRef = doc(db, 'Usuarios', userId); // 'Usuarios' es la colección, y userId es el ID del documento
  
      // Actualiza solo los campos que deseas modificar
      await updateDoc(docRef, formData);
  
      console.log("Documento actualizado correctamente");
      return res.status(200).json({ message: "Documento actualizado correctamente" });
    } 
    catch (error) {
      console.error("Error al actualizar el documento:", error);
      return res.status(400).json({ error: "Error al actualizar el documento" });
    }
  };
  

//PARA EL CURSOSESCUELA
export const informacionCursosEscuela = async (req, res) => {
  const { userId } = req.query;

  try {
    // 1. Obtener todos los usuarios
    const usuariosSnapshot = await getDocs(collection(db, "Usuarios"));
    const usuariosMap = new Map();

    let cursosIds = [];
    let programasIds = [];

    for (const doc of usuariosSnapshot.docs) {
      const datos = doc.data();
      usuariosMap.set(doc.id, { id: doc.id, ...datos });

      if (doc.id === userId) {
        cursosIds = datos.cursos || [];
        programasIds = datos.programas || [];
      }
    }

    if (cursosIds.length === 0 && programasIds.length === 0) {
      return res.status(404).json({ error: "El usuario no tiene cursos ni programas" });
    }

    // 2. Obtener todos los cursos
    const cursosSnapshot = await getDocs(collection(db, "Cursos"));
    const cursosFiltrados = cursosSnapshot.docs
      .filter(doc => cursosIds.includes(doc.id))
      .map(doc => {
        const curso = doc.data();

        const profesorInfo = usuariosMap.get(curso.profesor) || { id: curso.profesor, nombre: "Desconocido" };
        const estudiantesInfo = (curso.estudiantes || []).map(id => usuariosMap.get(id) || { id, nombre: "Desconocido" });

        return {
          id: doc.id,
          nombre: curso.nombre,
          semestre: curso.semestre,
          tipo: curso.tipo,
          profesor: profesorInfo,
          estudiantes: estudiantesInfo
        };
      });

    // 3. Obtener todos los programas
    const programasSnapshot = await getDocs(collection(db, "Programas"));
    const programasFiltrados = programasSnapshot.docs
      .filter(doc => programasIds.includes(doc.id))
      .map(doc => ({ id: doc.id, ...doc.data() }));

    // 4. Devolver respuesta
    return res.status(200).json({
      cursos: cursosFiltrados,
      programas: programasFiltrados
    });

  } catch (error) {
    console.error("Error al obtener la información:", error);
    return res.status(500).json({ error: "Error al obtener la información de cursos y programas" });
  }
};




//PARA EL HISTORIAL DE ASISTENCIAS
export const historialAsistencias = async (req, res) => {
  const { userId } = req.query;
  const historialAsistencia = [];
  try {
    const asistenciasSnapshot = await getDocs(collection(db, "Asistencias"));
    const usuariosSnapshot = await getDocs(collection(db, "Usuarios"));

    for(const doc of asistenciasSnapshot.docs) {
        const datos = doc.data();

        if (datos.departamento === userId) {
          for (const doc of usuariosSnapshot.docs) {
            const datosUsuario = doc.data();
            if (doc.id === datos.personaACargo) {
              const profesor =  datosUsuario.nombre;

              const entrada = {
                fecha: datos.fechaInicio || '00/00/2025',
                estudiante: datos.cantidadVacantes, // Aquí podrías ligarlo a una colección "Postulaciones" si hay
                tutor: profesor,
                curso: datos.tituloPrograma || 'Sin curso',
                semestre: datos.semestre, // Podés usar lógica para calcularlo con base en fechaInicio si querés
                estado: datos.estado
              };
              historialAsistencia.push(entrada);
            }
          }
        }
      } 
    return res.status(200).json({historialAsistencia});
  }
  catch (error) {
    console.error("Error al obtener informacion:", error);
    return res.status(401).json({ error: "Error al obtener informacion" });
  }
} 


//PARA LA PUBLICACION DE OFERTAS

export const informacionOfertas = async (req, res) => {
  const { userId } = req.query;
  const ofertasActuales = [];
  try {
    const asistenciasSnapshot = await getDocs(collection(db, "Asistencias"));
    const usuariosSnapshot = await getDocs(collection(db, "Usuarios"));

    for(const doc of asistenciasSnapshot.docs) {
        const datos = doc.data();

        if (datos.departamento === userId && (datos.estado === "Abierto" || datos.estado === "Revision")) {
          for (const doc of usuariosSnapshot.docs) {
            const datosUsuario = doc.data();
            if (doc.id === datos.personaACargo) {
              const profesor =  datosUsuario.nombre;

              const ofertas = {
                id: doc.id,
                nombre: datos.tituloPrograma,
                tipo: datos.tipo, // Aquí podrías ligarlo a una colección "Postulaciones" si hay
                estado: datos.estado,
                estudiantes: datos.cantidadVacantes,
                horas: datos.totalHoras, // Podés usar lógica para calcularlo con base en fechaInicio si querés
                fechaLimite: datos.fechaFin,
                beneficio: datos.beneficio
              };
              ofertasActuales.push(ofertas);
            }
          }
        }
      } 
    return res.status(200).json({ofertasActuales});
  }
  catch (error) {
    console.error("Error al obtener informacion:", error);
    return res.status(401).json({ error: "Error al obtener informacion" });
  }
}


export const publicarOfertas = async (req, res) => {

}

export const actualizarInfoOferta = async (req, res) => {


}


//PARA LISTA DE TODAS LAS OFERTAS
export const historialOfertas = async (req, res) => {
  const { userId } = req.query;
  const ofertasActuales = [];
  try {
    const asistenciasSnapshot = await getDocs(collection(db, "Asistencias"));
    const usuariosSnapshot = await getDocs(collection(db, "Usuarios"));

    for(const doc of asistenciasSnapshot.docs) {
        const datos = doc.data();

        if (datos.departamento === userId && (datos.estado === "Abierto" || datos.estado === "Revision" || datos.estado === "Cerrado" || datos.estado === "Cancelada")) {
          for (const doc of usuariosSnapshot.docs) {
            const datosUsuario = doc.data();
            if (doc.id === datos.personaACargo) {
              const profesor =  datosUsuario.nombre;

              const ofertas = {
                id: doc.id,
                nombre: datos.tituloPrograma,
                tipo: datos.tipo, // Aquí podrías ligarlo a una colección "Postulaciones" si hay
                estado: datos.estado,
                estudiantes: datos.cantidadVacantes,
                horas: datos.totalHoras, // Podés usar lógica para calcularlo con base en fechaInicio si querés
                fechaLimite: datos.fechaFin,
                beneficio: datos.beneficio
              };
              ofertasActuales.push(ofertas);
            }
          }
        }
      } 
    return res.status(200).json({ofertasActuales});
  }
  catch (error) {
    console.error("Error al obtener informacion:", error);
    return res.status(401).json({ error: "Error al obtener informacion" });
  }
}


//PARA HISTORIAL DE POSTULANTES

export const informacionPostulantes = async (req, res) => {
  const { userId } = req.query;
  const postulantes = [];
  let carrera = "";
  const estudiantes = [];
  try {
    const asistenciasSnapshot = await getDocs(collection(db, "Asistencias"));
    const usuariosSnapshot = await getDocs(collection(db, "Usuarios"));

    for(const doc of asistenciasSnapshot.docs) {
        const datos = doc.data();
        if(datos.departamento === userId) {
          postulantes.push(datos.postulaciones);
      }
    }

    for(const doc of usuariosSnapshot.docs) {
      if(doc.id === userId) {
        carrera = doc.data().carrera;
        }
      }
    
    const postulantesUnicos = [...new Set(postulantes.flat())];
    
    for (const postulante of postulantesUnicos) {
      for (const doc of usuariosSnapshot.docs) {
        const datos = doc.data(); 
        if (doc.id === postulante) {
          const estudiante = {
            id: doc.id,
            nombre: datos.nombre,
            carrera: carrera,
            nivel: datos.nivelAcademico,
            ponderado: datos.ponderado,
            cursosAprobados: datos.cursosAprovados.length,
            estado: datos.estado
          };
          estudiantes.push(estudiante);
        }
      }
    }
    return res.status(200).json({estudiantes});
  }
  catch (error) {
    console.error("Error al obtener informacion:", error);
    return res.status(401).json({ error: "Error al obtener informacion" });
  }
};

export const informacionEstudiante = async (req, res) => {
  const { userId } = req.query;
  const estudiante = {};
  
  const historialAsistencia = [];
  try {
    const usuariosSnapshot = await getDocs(collection(db, "Usuarios"));
    const asistenciasSnapshot = await getDocs(collection(db, "Asistencias"));

    for (const doc of usuariosSnapshot.docs) {
      const datos = doc.data();
      if (doc.id === userId) {
        for(const doc of usuariosSnapshot.docs) {
          if (doc.id === datos.carrera) {
            const carrera = doc.data().nombre;
            estudiante.carrera = carrera;
          }
        }
        estudiante.correo = datos.correo;
        estudiante.nombre = datos.nombre;
        estudiante.nivelAcademico = datos.nivelAcademico;
        estudiante.ponderado = datos.ponderado;
        estudiante.cursosAprobados = datos.cursosAprovados.length;
      }
    }
    for(const doc of asistenciasSnapshot.docs) {
      const datos = doc.data();
      if(datos.postulaciones.includes(userId)) {
        const asistencia = {
          fecha: datos.fechaInicio || '00/00/2025', 
          titulo: datos.tituloPrograma || 'Sin curso',
          horas: datos.totalHoras
        };
        historialAsistencia.push(asistencia);
      }
    }

    console.log("estudiante:", estudiante);
    return res.status(200).json({estudiante, historialAsistencia});
  }
  catch (error) {
    console.error("Error al obtener informacion:", error);
    return res.status(401).json({ error: "Error al obtener informacion" });
  }
};

///PARA EL HISTORIAL DE PAGOS Y ASISTENCIAS ACTIVOS

export const informacionPagoAsisActivos = async (req, res) => {
  const { userId } = req.query;
  const asistenciasActivas = [];
  try{
    const asistenciasAsignadasSnapshot = await getDocs(collection(db, "AsistenciasAsignadas"));
    const usuariosSnapshot = await getDocs(collection(db, "Usuarios"));
    const asistenciaSnapshot = await getDocs(collection(db, "Asistencias"));

    for(const doc of asistenciasAsignadasSnapshot.docs) {
        const datos = doc.data();
        if(datos.idEscuela === userId && datos.activo === true) {
          let estudiante = '';
          let escuela = '';
          let semestre = '';
          let tipo = '';

          for (const doc1 of usuariosSnapshot.docs) {
            if(doc1.id === datos.userId) {
              estudiante = doc1.data().nombre;
              }
            else if(doc1.id === userId) {
              escuela = doc1.data().nombre;
              };
            }
          
          for (const doc2 of asistenciaSnapshot.docs) {
            if(doc2.id === datos.asistenciaId) {
              semestre = doc2.data().semestre;
              tipo = doc2.data().tipo;
              };
            }
          const asistencia = {
            id: doc.id, 
            estudiante: estudiante,
            carrera: escuela,
            tipo: tipo,
            monto: datos.pago,
            semestre: semestre,
            estado: datos.activo
          };
          console.log("asistencia:", asistencia);
          asistenciasActivas.push(asistencia);
        }
      }

    return res.status(200).json(asistenciasActivas);
  }
  catch (error) {
    console.error("Error al obtener informacion:", error);
    return res.status(401).json({ error: "Error al obtener informacion" });
  }
}


//PARA CREAR UN PAGO DE OFERTA

export const obtenerDatosCrearOferta = async (req, res) => {
  const { userId } = req.query;
  const ofertas = [];
  try {
    const asistenciasSnapshot = await getDocs(collection(db, "Asistencias"));
    for (const doc of asistenciasSnapshot.docs) {
      const datos = doc.data();
      if (datos.departamento === userId) {
        ofertas.push({titulo : datos.tituloPrograma, id: doc.id});
      }
    }
    return res.status(200).json({ ofertas });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return res.status(500).json({ error: "Error al obtener los datos" });
  }
}


export const crearPagoOferta = async (req, res) => {
  const { estudiante, oferta, tipo, monto, semestre, userId } = req.body;

  try {
    const nuevoPago = {
      activo: true,
      asistenciaId : oferta,
      userId : estudiante,
      idEscuela : userId,
      pago : monto, // si lo querés como número, usá parseFloat(pago)
      fechaAsignacion: new Date(),
    };

    await addDoc(collection(db, "AsistenciasAsignadas"), nuevoPago);

    return res.status(200).json({
      message: "Pago creado exitosamente",
      nuevoPago,
    });
  } catch (error) {
    console.error("Error al crear el pago:", error);
    return res.status(500).json({ error: "Error al crear el pago" });
  }
};

export const estudiantesPostulados = async (req, res) => {
  const { ofertaId } = req.query;
  const estudiantes = [];

  try {
    const asistenciasSnapshot = await getDocs(collection(db, "Asistencias"));
    const usuariosSnapshot = await getDocs(collection(db, "Usuarios"));

    for (const doc of asistenciasSnapshot.docs) {
      const datos = doc.data();
      if (doc.id === ofertaId) {
        for (const estudianteId of datos.postulaciones) {
          for (const usuarioDoc of usuariosSnapshot.docs) {
            if (usuarioDoc.id === estudianteId) {
              estudiantes.push({ id: usuarioDoc.id, nombre: usuarioDoc.data().nombre });
            }
          }
        }
      }
    }

    return res.status(200).json({ estudiantes });
  } catch (error) {
    console.error("Error al obtener los estudiantes postulados:", error);
    return res.status(500).json({ error: "Error al obtener los estudiantes postulados" });
  }
}


//PARA EL HISTORIAL DE BENEFICIOS

export const historialBeneficiarios = async (req, res) => {
  const { userId } = req.query;
  const asistenciasActivas = [];
  try{
    const asistenciasAsignadasSnapshot = await getDocs(collection(db, "AsistenciasAsignadas"));
    const usuariosSnapshot = await getDocs(collection(db, "Usuarios"));
    const asistenciaSnapshot = await getDocs(collection(db, "Asistencias"));

    for(const doc of asistenciasAsignadasSnapshot.docs) {
        const datos = doc.data();
        if(datos.idEscuela === userId && datos.activo === true) {
          let estudiante = '';
          let escuela = '';
          let semestre = '';
          let tipo = '';
          let oferta = '';
          let idEstudiante = '';

          for (const doc1 of usuariosSnapshot.docs) {
            if(doc1.id === datos.userId) {
              estudiante = doc1.data().nombre;
              idEstudiante = doc1.id;
              }
            else if(doc1.id === userId) {
              escuela = doc1.data().nombre;
              };
            }
          
          for (const doc2 of asistenciaSnapshot.docs) {
            if(doc2.id === datos.asistenciaId) {
              semestre = doc2.data().semestre;
              tipo = doc2.data().tipo;
              oferta = doc2.data().tituloPrograma;
              };
            }
          const asistencia = {
            id: doc.id, 
            idEstudiante: datos.userId,
            estudiante: estudiante,
            oferta : oferta,
            carrera: escuela,
            tipo: tipo,
            monto: datos.pago,
            semestre: semestre,
            estado: datos.activo
          };
          console.log("asistencia:", asistencia);
          asistenciasActivas.push(asistencia);
        }
      }

    return res.status(200).json(asistenciasActivas);
  }
  catch (error) {
    console.error("Error al obtener informacion:", error);
    return res.status(401).json({ error: "Error al obtener informacion" });
  }
}