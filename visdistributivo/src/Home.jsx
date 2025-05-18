
import { useState } from "react";
import { DocenteForm } from "./components/DocenteForm";
import { DistributivoTable } from "./components/DistributivoTable";
import "./App.css";
function Home() {
  const [docentes, setDocentes] = useState([
    {
      id: "1",
      nombre: "Docente por contratar",
      cedula: "",
      categoria: "No Titular",
      tiempoDedicacion: "Exclusivo o Tiempo Completo",
      asignaciones: [
        {
          id: "1-1",
          nivel: "QUINTO",
          paralelo: "C",
          jornada: "INTENSIVA",
          asignatura: "TICS Aplicadas a la Educación",
          carrera: "PEDAGOGÍA DE LOS IDIOMAS NACIONALES Y EXTRANJEROS PRESENCIAL",
          horasSemanales: 3,
        },
        {
          id: "1-2",
          nivel: "PRIMERO",
          paralelo: "A",
          jornada: "INTENSIVA",
          asignatura: "Problematización de la realidad educativa",
          carrera: "PEDAGOGÍA DE LOS IDIOMAS NACIONALES Y EXTRANJEROS PRESENCIAL",
          horasSemanales: 4,
        },
        {
          id: "1-3",
          nivel: "PRIMERO",
          paralelo: "B",
          jornada: "INTENSIVA",
          asignatura: "Problematización de la realidad educativa",
          carrera: "PEDAGOGÍA DE LOS IDIOMAS NACIONALES Y EXTRANJEROS PRESENCIAL",
          horasSemanales: 4,
        },
        {
          id: "1-4",
          nivel: "SEGUNDO",
          paralelo: "A",
          jornada: "INTENSIVA",
          asignatura: "Educación: Hecho Social",
          carrera: "PEDAGOGÍA DE LOS IDIOMAS NACIONALES Y EXTRANJEROS PRESENCIAL",
          horasSemanales: 4,
        },
        {
          id: "1-5",
          nivel: "SEGUNDO",
          paralelo: "B",
          jornada: "INTENSIVA",
          asignatura: "Educación: Hecho Social",
          carrera: "PEDAGOGÍA DE LOS IDIOMAS NACIONALES Y EXTRANJEROS PRESENCIAL",
          horasSemanales: 4,
        },
      ],
    },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [docenteEditar, setDocenteEditar] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const agregarDocente = (docente) => {
    setDocentes([...docentes, docente]);
    setMostrarFormulario(false);
  };

  const actualizarDocente = (docenteActualizado) => {
    setDocentes(docentes.map((doc) => (doc.id === docenteActualizado.id ? docenteActualizado : doc)));
    setDocenteEditar(null);
    setMostrarFormulario(false);
  };

  const eliminarDocente = (id) => {
    setDocentes(docentes.filter((doc) => doc.id !== id));
  };

  const editarDocente = (docente) => {
    setDocenteEditar(docente);
    setMostrarFormulario(true);
  };

  const docentesFiltrados = docentes.filter(
    (docente) =>
      docente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      docente.cedula.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <h2 className="main-title">Distribución de Carga Horaria</h2>
      <p className="main-description">Sistema para la gestión y distribución de carga horaria docente.</p>

      <div className="period-button">Período Académico 2025 (P1)</div>

      <div className="period-header">
        <h3>PERÍODO ACADÉMICO ORDINARIO DEL AÑO 2025 (P1)</h3>
      </div>

      <div className="actions-bar">
        <button
          className="add-button"
          onClick={() => {
            setDocenteEditar(null);
            setMostrarFormulario(!mostrarFormulario);
          }}
        >
          {mostrarFormulario ? "Cancelar" : "Añadir Docente"}
        </button>

        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por cédula"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
          <button className="search-button">
            <i className="search-icon">🔍</i>
          </button>
        </div>
      </div>

      {mostrarFormulario && (
        <DocenteForm onSubmit={docenteEditar ? actualizarDocente : agregarDocente} docenteInicial={docenteEditar} />
      )}

      <DistributivoTable docentes={docentesFiltrados} onEdit={editarDocente} onDelete={eliminarDocente} />
    </>
  );
}

export default Home;
