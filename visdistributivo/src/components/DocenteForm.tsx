"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Docente, Asignacion } from "../App"
import "../styles/DocenteForm.css"

interface DocenteFormProps {
  onSubmit: (docente: Docente) => void
  docenteInicial: Docente | null
}

export const DocenteForm = ({ onSubmit, docenteInicial }: DocenteFormProps) => {
  const [docente, setDocente] = useState<Docente>({
    id: "",
    nombre: "",
    cedula: "",
    categoria: "",
    tiempoDedicacion: "",
    asignaciones: [],
  })

  const [nuevaAsignacion, setNuevaAsignacion] = useState<Omit<Asignacion, "id">>({
    nivel: "",
    paralelo: "",
    jornada: "",
    asignatura: "",
    carrera: "",
    horasSemanales: 0,
  })

  useEffect(() => {
    if (docenteInicial) {
      setDocente(docenteInicial)
    } else {
      // Generar un ID único para un nuevo docente
      setDocente({
        id: Date.now().toString(),
        nombre: "",
        cedula: "",
        categoria: "",
        tiempoDedicacion: "",
        asignaciones: [],
      })
    }
  }, [docenteInicial])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setDocente({
      ...docente,
      [name]: value,
    })
  }

  const handleAsignacionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNuevaAsignacion({
      ...nuevaAsignacion,
      [name]: name === "horasSemanales" ? Number.parseInt(value) || 0 : value,
    })
  }

  const agregarAsignacion = () => {
    const asignacionCompleta: Asignacion = {
      id: `${docente.id}-${Date.now()}`,
      ...nuevaAsignacion,
    }

    setDocente({
      ...docente,
      asignaciones: [...docente.asignaciones, asignacionCompleta],
    })

    // Limpiar el formulario de asignación
    setNuevaAsignacion({
      nivel: "",
      paralelo: "",
      jornada: "",
      asignatura: "",
      carrera: "",
      horasSemanales: 0,
    })
  }

  const eliminarAsignacion = (id: string) => {
    setDocente({
      ...docente,
      asignaciones: docente.asignaciones.filter((a) => a.id !== id),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(docente)
  }

  return (
    <div className="docente-form-container">
      <h2 className="form-title">{docenteInicial ? "Editar Docente" : "Agregar Nuevo Docente"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Información del Docente</h3>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={docente.nombre} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="cedula">Número de Cédula:</label>
            <input type="text" id="cedula" name="cedula" value={docente.cedula} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoría:</label>
            <select id="categoria" name="categoria" value={docente.categoria} onChange={handleInputChange} required>
              <option value="">Seleccione...</option>
              <option value="Titular">Titular</option>
              <option value="No Titular">No Titular</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tiempoDedicacion">Tiempo de Dedicación:</label>
            <select
              id="tiempoDedicacion"
              name="tiempoDedicacion"
              value={docente.tiempoDedicacion}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione...</option>
              <option value="Exclusivo o Tiempo Completo">Exclusivo o Tiempo Completo</option>
              <option value="Semi-exclusivo o Medio Tiempo">Semi-exclusivo o Medio Tiempo</option>
              <option value="Tiempo Parcial">Tiempo Parcial</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>Asignaciones</h3>

          <div className="asignaciones-list">
            {docente.asignaciones.length > 0 ? (
              <table className="asignaciones-table">
                <thead>
                  <tr>
                    <th>Nivel</th>
                    <th>Paralelo</th>
                    <th>Jornada</th>
                    <th>Asignatura</th>
                    <th>Carrera</th>
                    <th>Horas</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {docente.asignaciones.map((asignacion) => (
                    <tr key={asignacion.id}>
                      <td>{asignacion.nivel}</td>
                      <td>{asignacion.paralelo}</td>
                      <td>{asignacion.jornada}</td>
                      <td>{asignacion.asignatura}</td>
                      <td>{asignacion.carrera}</td>
                      <td>{asignacion.horasSemanales}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => eliminarAsignacion(asignacion.id)}
                          className="btn-delete-small"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay asignaciones. Agregue al menos una asignación.</p>
            )}
          </div>

          <div className="nueva-asignacion">
            <h4>Agregar Nueva Asignación</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nivel">Nivel:</label>
                <input
                  type="text"
                  id="nivel"
                  name="nivel"
                  value={nuevaAsignacion.nivel}
                  onChange={handleAsignacionChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="paralelo">Paralelo:</label>
                <input
                  type="text"
                  id="paralelo"
                  name="paralelo"
                  value={nuevaAsignacion.paralelo}
                  onChange={handleAsignacionChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="jornada">Jornada:</label>
                <select id="jornada" name="jornada" value={nuevaAsignacion.jornada} onChange={handleAsignacionChange}>
                  <option value="">Seleccione...</option>
                  <option value="INTENSIVA">INTENSIVA</option>
                  <option value="MATUTINA">MATUTINA</option>
                  <option value="VESPERTINA">VESPERTINA</option>
                  <option value="NOCTURNA">NOCTURNA</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="asignatura">Asignatura:</label>
                <input
                  type="text"
                  id="asignatura"
                  name="asignatura"
                  value={nuevaAsignacion.asignatura}
                  onChange={handleAsignacionChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="carrera">Carrera:</label>
                <input
                  type="text"
                  id="carrera"
                  name="carrera"
                  value={nuevaAsignacion.carrera}
                  onChange={handleAsignacionChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="horasSemanales">Horas Semanales:</label>
                <input
                  type="number"
                  id="horasSemanales"
                  name="horasSemanales"
                  value={nuevaAsignacion.horasSemanales}
                  onChange={handleAsignacionChange}
                  min="1"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={agregarAsignacion}
              className="btn-add"
              disabled={
                !nuevaAsignacion.nivel ||
                !nuevaAsignacion.asignatura ||
                !nuevaAsignacion.carrera ||
                nuevaAsignacion.horasSemanales <= 0
              }
            >
              Agregar Asignación
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={docente.asignaciones.length === 0}>
            {docenteInicial ? "Actualizar Docente" : "Guardar Docente"}
          </button>
        </div>
      </form>
    </div>
  )
}
