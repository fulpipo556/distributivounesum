"use client"

import { useState } from "react"
import type { Docente, Asignacion } from "../App"
import "../styles/DistributivoTable.css"

interface DistributivoTableProps {
  docentes: Docente[]
  onEdit: (docente: Docente) => void
  onDelete: (id: string) => void
}

export const DistributivoTable = ({ docentes, onEdit, onDelete }: DistributivoTableProps) => {
  const [expandidos, setExpandidos] = useState<Record<string, boolean>>({})

  const toggleExpandir = (id: string) => {
    setExpandidos({
      ...expandidos,
      [id]: !expandidos[id],
    })
  }

  const calcularTotalHoras = (asignaciones: Asignacion[]) => {
    return asignaciones.reduce((total, asignacion) => total + asignacion.horasSemanales, 0)
  }

  const contarAsignaturas = (asignaciones: Asignacion[]) => {
    // Crear un conjunto para evitar contar asignaturas duplicadas
    const asignaturasUnicas = new Set(asignaciones.map((a) => a.asignatura))
    return asignaturasUnicas.size
  }

  return (
    <div className="table-container">
      <table className="distributivo-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>DOCENTE</th>
            <th>NÚMERO DE CÉDULA</th>
            <th>CATEGORÍA</th>
            <th>TIEMPO DE DEDICACIÓN</th>
            <th>NIVEL</th>
            <th>PARALELO</th>
            <th>JORNADA</th>
            <th>ASIGNATURAS</th>
            <th>NÚMERO DE ASIGNATURAS</th>
            <th>CARRERA</th>
            <th>HORAS SEMANALES</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {docentes.map((docente, index) => {
            const isExpanded = expandidos[docente.id] || false
            const totalHoras = calcularTotalHoras(docente.asignaciones)
            const numAsignaturas = contarAsignaturas(docente.asignaciones)

            // Renderizar la primera fila del docente
            return (
              <>
                <tr key={docente.id} className={isExpanded ? "expanded" : ""}>
                  <td>{index + 1}</td>
                  <td>{docente.nombre}</td>
                  <td>{docente.cedula}</td>
                  <td>{docente.categoria}</td>
                  <td>{docente.tiempoDedicacion}</td>
                  <td colSpan={5} className="expandir-celda">
                    <button onClick={() => toggleExpandir(docente.id)} className="btn-expandir">
                      {isExpanded ? "Ocultar detalles" : "Ver detalles"}
                    </button>
                  </td>
                  <td>{numAsignaturas}</td>
                  <td>{totalHoras}</td>
                  <td>
                    <button onClick={() => onEdit(docente)} className="btn-edit">
                      Editar
                    </button>
                    <button onClick={() => onDelete(docente.id)} className="btn-delete">
                      Eliminar
                    </button>
                  </td>
                </tr>

                {/* Renderizar las filas de asignaciones si está expandido */}
                {isExpanded &&
                  docente.asignaciones.map((asignacion, asigIndex) => (
                    <tr key={`${docente.id}-${asigIndex}`} className="detalle-row">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{asignacion.nivel}</td>
                      <td>{asignacion.paralelo}</td>
                      <td>{asignacion.jornada}</td>
                      <td>{asignacion.asignatura}</td>
                      <td></td>
                      <td>{asignacion.carrera}</td>
                      <td>{asignacion.horasSemanales}</td>
                      <td></td>
                    </tr>
                  ))}
              </>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
