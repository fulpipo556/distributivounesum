"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, RefreshCw } from "lucide-react"

// Datos de ejemplo
const docentesDB = [
  {
    id: "1",
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
    ],
    totalHoras: 7,
  },
]

export default function TablaCargaHoraria() {
  const [docentes] = useState(docentesDB)
  const [filteredDocentes, setFilteredDocentes] = useState(docentes)
  const [isSearching, setIsSearching] = useState(false)
  const [searchCedula, setSearchCedula] = useState("")

  const handleSearch = () => {
    if (searchCedula.trim() === "") {
      setFilteredDocentes(docentes)
      setIsSearching(false)
      return
    }

    const filtered = docentes.filter((docente) => docente.cedula.includes(searchCedula))
    setFilteredDocentes(filtered)
    setIsSearching(true)
  }

  const resetSearch = () => {
    setSearchCedula("")
    setFilteredDocentes(docentes)
    setIsSearching(false)
  }

  // Función para obtener el color de fondo según el nivel
  const getRowColor = (nivel) => {
    const colorMap = {
      QUINTO: "bg-green-50",
      PRIMERO: "bg-red-50",
      SEGUNDO: "bg-green-100",
      TERCERO: "bg-red-100",
      CUARTO: "bg-green-100",
    }
    return colorMap[nivel] || "bg-white"
  }

  return (
    <Card className="w-full border-green-700">
      <CardHeader className="bg-green-700 text-white">
        <CardTitle className="text-center text-xl">PERÍODO ACADÉMICO ORDINARIO DEL AÑO 2025 (P1)</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 bg-green-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <Button onClick={() => {}} className="bg-green-700 hover:bg-green-800 text-white">
            Añadir Docente
          </Button>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="flex w-full md:w-auto">
              <Input
                placeholder="Buscar por cédula"
                value={searchCedula}
                onChange={(e) => setSearchCedula(e.target.value)}
                className="border-green-700 rounded-r-none"
              />
              <Button onClick={handleSearch} className="bg-red-600 hover:bg-red-700 rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {isSearching && (
              <Button
                onClick={resetSearch}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Mostrar todos
              </Button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead className="text-center font-bold text-green-700 border border-gray-300">No.</TableHead>
                <TableHead className="text-center font-bold text-green-700 border border-gray-300">DOCENTE</TableHead>
                <TableHead className="text-center font-bold text-green-700 border border-gray-300">
                  NÚMERO DE CÉDULA
                </TableHead>
                <TableHead className="text-center font-bold text-green-700 border border-gray-300">CATEGORÍA</TableHead>
                <TableHead className="text-center font-bold text-green-700 border border-gray-300">
                  TIEMPO DE DEDICACIÓN
                </TableHead>
                <TableHead className="text-center font-bold text-green-700 border border-gray-300">NIVEL</TableHead>
                <TableHead className="text-center font-bold text-green-700 border border-gray-300">PARALELO</TableHead>
                <TableHead className="text-center font-bold text-green-700 border border-gray-300">JORNADA</TableHead>
                <TableHead className="text-center font-bold text-green-700 border border-gray-300">
                  ASIGNATURAS
                </TableHead>
                <TableHead className="text-center font-bold text-green-700 border border-gray-300">
                  NÚMERO DE ASIGNATURAS
                </TableHead>
                <TableHead className="text-center font-bold text-green-700 border border-gray-300">CARRERA</TableHead>
                <TableHead className="text-center font-bold text-green-700 border border-gray-300">
                  HORAS SEMANALES
                </TableHead>
                <TableHead className="text-center font-bold text-green-700 border border-gray-300">TOTAL</TableHead>
                <TableHead className="text-center font-bold text-green-700 border border-gray-300">ACCIONES</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocentes.map((docente) =>
                docente.asignaciones.map((asignacion, asignacionIndex) => (
                  <TableRow key={`${docente.id}-${asignacionIndex}`} className={getRowColor(asignacion.nivel)}>
                    {asignacionIndex === 0 && (
                      <>
                        <TableCell className="text-center border border-gray-300" rowSpan={docente.asignaciones.length}>
                          {docente.numero}
                        </TableCell>
                        <TableCell className="text-center border border-gray-300" rowSpan={docente.asignaciones.length}>
                          {docente.nombre}
                        </TableCell>
                        <TableCell className="text-center border border-gray-300" rowSpan={docente.asignaciones.length}>
                          {docente.cedula}
                        </TableCell>
                        <TableCell className="text-center border border-gray-300" rowSpan={docente.asignaciones.length}>
                          {docente.categoria}
                        </TableCell>
                        <TableCell className="text-center border border-gray-300" rowSpan={docente.asignaciones.length}>
                          {docente.tiempoDedicacion}
                        </TableCell>
                      </>
                    )}
                    <TableCell className="text-center border border-gray-300">{asignacion.nivel}</TableCell>
                    <TableCell className="text-center border border-gray-300">{asignacion.paralelo}</TableCell>
                    <TableCell className="text-center border border-gray-300">{asignacion.jornada}</TableCell>
                    <TableCell className="border border-gray-300">{asignacion.asignatura}</TableCell>
                    <TableCell className="text-center border border-gray-300">{asignacion.numAsignaturas}</TableCell>
                    <TableCell className="border border-gray-300">{asignacion.carrera}</TableCell>
                    <TableCell className="text-center border border-gray-300">{asignacion.horasSemanales}</TableCell>
                    {asignacionIndex === 0 && (
                      <TableCell
                        className="text-center font-bold border border-gray-300"
                        rowSpan={docente.asignaciones.length}
                      >
                        {docente.totalHoras}
                      </TableCell>
                    )}
                    <TableCell className="border border-gray-300 text-center">
                      <Button
                        onClick={() => {}}
                        variant="outline"
                        className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                )),
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
