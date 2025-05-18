"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TablaEjemplo() {
  // Datos de ejemplo basados en la imagen proporcionada
  const docenteEjemplo = {
    numero: 1,
    nombre: "Docente por contratar",
    cedula: "",
    categoria: "No Titular",
    tiempoDedicacion: "Exclusivo o Tiempo Completo",
    asignaciones: [
      {
        nivel: "QUINTO",
        paralelo: "C",
        jornada: "INTENSIVA",
        asignatura: "TICS Aplicadas a la Educación",
        numAsignaturas: 3,
        carrera: "PEDAGOGÍA DE LOS IDIOMAS NACIONALES Y EXTRANJEROS PRESENCIAL",
        horasSemanales: 3,
      },
      {
        nivel: "PRIMERO",
        paralelo: "A",
        jornada: "INTENSIVA",
        asignatura: "Problematización de la realidad educativa",
        numAsignaturas: null,
        carrera: "PEDAGOGÍA DE LOS IDIOMAS NACIONALES Y EXTRANJEROS PRESENCIAL",
        horasSemanales: 4,
      },
      {
        nivel: "PRIMERO",
        paralelo: "B",
        jornada: "INTENSIVA",
        asignatura: "Problematización de la realidad educativa",
        numAsignaturas: null,
        carrera: "PEDAGOGÍA DE LOS IDIOMAS NACIONALES Y EXTRANJEROS PRESENCIAL",
        horasSemanales: 4,
      },
      {
        nivel: "SEGUNDO",
        paralelo: "A",
        jornada: "INTENSIVA",
        asignatura: "Educación: Hecho Social",
        numAsignaturas: null,
        carrera: "PEDAGOGÍA DE LOS IDIOMAS NACIONALES Y EXTRANJEROS PRESENCIAL",
        horasSemanales: 4,
      },
      {
        nivel: "SEGUNDO",
        paralelo: "B",
        jornada: "INTENSIVA",
        asignatura: "Educación: Hecho Social",
        numAsignaturas: null,
        carrera: "PEDAGOGÍA DE LOS IDIOMAS NACIONALES Y EXTRANJEROS PRESENCIAL",
        horasSemanales: 4,
      },
    ],
    totalHoras: 19,
  }

  // Calcular el número total de filas (1 para el docente + número de asignaciones)
  const totalFilas = 1 + docenteEjemplo.asignaciones.length

  return (
    <Card className="w-full border-unesum-green">
      <CardHeader className="bg-unesum-green text-white">
        <CardTitle className="text-center text-xl">EJEMPLO DE DISTRIBUCIÓN DE CARGA HORARIA</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-unesum-green-light/20">
              <TableRow>
                <TableHead className="text-center font-bold text-unesum-green border border-gray-300" rowSpan="2">
                  No.
                </TableHead>
                <TableHead className="text-center font-bold text-unesum-green border border-gray-300" rowSpan="2">
                  DOCENTE
                </TableHead>
                <TableHead className="text-center font-bold text-unesum-green border border-gray-300" rowSpan="2">
                  NÚMERO DE CÉDULA
                </TableHead>
                <TableHead className="text-center font-bold text-unesum-green border border-gray-300" rowSpan="2">
                  CATEGORÍA
                </TableHead>
                <TableHead className="text-center font-bold text-unesum-green border border-gray-300" rowSpan="2">
                  TIEMPO DE DEDICACIÓN
                </TableHead>
                <TableHead className="text-center font-bold text-unesum-green border border-gray-300" rowSpan="2">
                  NIVEL
                </TableHead>
                <TableHead className="text-center font-bold text-unesum-green border border-gray-300" rowSpan="2">
                  PARALELO
                </TableHead>
                <TableHead className="text-center font-bold text-unesum-green border border-gray-300" rowSpan="2">
                  JORNADA
                </TableHead>
                <TableHead className="text-center font-bold text-unesum-green border border-gray-300" rowSpan="2">
                  ASIGNATURAS
                </TableHead>
                <TableHead className="text-center font-bold text-unesum-green border border-gray-300" rowSpan="2">
                  NÚMERO DE ASIGNATURAS
                </TableHead>
                <TableHead className="text-center font-bold text-unesum-green border border-gray-300" rowSpan="2">
                  CARRERA
                </TableHead>
                <TableHead className="text-center font-bold text-unesum-green border border-gray-300" rowSpan="2">
                  ASIGNACIÓN DE HORAS SEMANALES
                </TableHead>
                <TableHead className="text-center font-bold text-unesum-green border border-gray-300" rowSpan="2">
                  TOTAL
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docenteEjemplo.asignaciones.map((asignacion, index) => (
                <TableRow key={index} className={getRowColor(index)}>
                  {index === 0 && (
                    <>
                      <TableCell
                        className="text-center border border-gray-300"
                        rowSpan={docenteEjemplo.asignaciones.length}
                      >
                        {docenteEjemplo.numero}
                      </TableCell>
                      <TableCell
                        className="text-center border border-gray-300"
                        rowSpan={docenteEjemplo.asignaciones.length}
                      >
                        {docenteEjemplo.nombre}
                      </TableCell>
                      <TableCell
                        className="text-center border border-gray-300"
                        rowSpan={docenteEjemplo.asignaciones.length}
                      >
                        {docenteEjemplo.cedula}
                      </TableCell>
                      <TableCell
                        className="text-center border border-gray-300"
                        rowSpan={docenteEjemplo.asignaciones.length}
                      >
                        {docenteEjemplo.categoria}
                      </TableCell>
                      <TableCell
                        className="text-center border border-gray-300"
                        rowSpan={docenteEjemplo.asignaciones.length}
                      >
                        {docenteEjemplo.tiempoDedicacion}
                      </TableCell>
                    </>
                  )}
                  <TableCell className="text-center border border-gray-300">{asignacion.nivel}</TableCell>
                  <TableCell className="text-center border border-gray-300">{asignacion.paralelo}</TableCell>
                  <TableCell className="text-center border border-gray-300">{asignacion.jornada}</TableCell>
                  <TableCell className="border border-gray-300">{asignacion.asignatura}</TableCell>
                  <TableCell className="text-center border border-gray-300">
                    {asignacion.numAsignaturas !== null ? asignacion.numAsignaturas : ""}
                  </TableCell>
                  <TableCell className="border border-gray-300">{asignacion.carrera}</TableCell>
                  <TableCell className="text-center border border-gray-300">{asignacion.horasSemanales}</TableCell>
                  {index === 0 && (
                    <TableCell
                      className="text-center font-bold border border-gray-300"
                      rowSpan={docenteEjemplo.asignaciones.length}
                    >
                      {docenteEjemplo.totalHoras}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

// Función para alternar colores de fila según el nivel
function getRowColor(index) {
  const colors = [
    "bg-yellow-100", // QUINTO
    "bg-orange-100", // PRIMERO A
    "bg-orange-100", // PRIMERO B
    "bg-green-100", // SEGUNDO A
    "bg-green-100", // SEGUNDO B
  ]
  return colors[index] || ""
}
