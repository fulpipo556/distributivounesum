"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface Docente {
  id: string
  nombre: string
  departamento: string
  horasAsignadas: number
  horasMaximas: number
}

interface Asignatura {
  id: string
  nombre: string
  horasSemanales: number
  docente: string | null
}

export default function CargaHorariaForm() {
  const { toast } = useToast()
  const [docentes, setDocentes] = useState<Docente[]>([])
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([])
  const [formData, setFormData] = useState({
    docenteId: "",
    asignaturaId: "",
  })

  // Simulación de carga de datos - en producción esto vendría de una API
  useState(() => {
    // Datos de ejemplo
    setDocentes([
      { id: "1", nombre: "Juan Pérez", departamento: "Matemáticas", horasAsignadas: 10, horasMaximas: 40 },
      { id: "2", nombre: "María López", departamento: "Física", horasAsignadas: 15, horasMaximas: 35 },
    ])

    setAsignaturas([
      { id: "1", nombre: "Cálculo I", horasSemanales: 6, docente: null },
      { id: "2", nombre: "Física Básica", horasSemanales: 4, docente: null },
      { id: "3", nombre: "Álgebra Lineal", horasSemanales: 5, docente: null },
    ])
  }, [])

  const handleAsignar = () => {
    const { docenteId, asignaturaId } = formData

    if (!docenteId || !asignaturaId) {
      toast({
        title: "Error",
        description: "Debes seleccionar un docente y una asignatura",
        variant: "destructive",
      })
      return
    }

    const docente = docentes.find((d) => d.id === docenteId)
    const asignatura = asignaturas.find((a) => a.id === asignaturaId)

    if (!docente || !asignatura) return

    // Verificar si el docente tiene horas disponibles
    if (docente.horasAsignadas + asignatura.horasSemanales > docente.horasMaximas) {
      toast({
        title: "Error",
        description: `El docente excedería su carga horaria máxima de ${docente.horasMaximas} horas`,
        variant: "destructive",
      })
      return
    }

    // Actualizar asignatura
    const updatedAsignaturas = asignaturas.map((a) => (a.id === asignaturaId ? { ...a, docente: docenteId } : a))

    // Actualizar docente
    const updatedDocentes = docentes.map((d) =>
      d.id === docenteId ? { ...d, horasAsignadas: d.horasAsignadas + asignatura.horasSemanales } : d,
    )

    setAsignaturas(updatedAsignaturas)
    setDocentes(updatedDocentes)

    toast({
      title: "Asignación exitosa",
      description: `Se asignó ${asignatura.nombre} a ${docente.nombre}`,
    })

    // Limpiar formulario
    setFormData({ docenteId: "", asignaturaId: "" })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Asignación de Carga Horaria</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="docente">Seleccionar Docente</Label>
            <Select
              value={formData.docenteId}
              onValueChange={(value) => setFormData({ ...formData, docenteId: value })}
            >
              <SelectTrigger id="docente">
                <SelectValue placeholder="Seleccionar docente" />
              </SelectTrigger>
              <SelectContent>
                {docentes.map((docente) => (
                  <SelectItem key={docente.id} value={docente.id}>
                    {docente.nombre} - {docente.horasAsignadas}/{docente.horasMaximas} horas
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="asignatura">Seleccionar Asignatura</Label>
            <Select
              value={formData.asignaturaId}
              onValueChange={(value) => setFormData({ ...formData, asignaturaId: value })}
            >
              <SelectTrigger id="asignatura">
                <SelectValue placeholder="Seleccionar asignatura" />
              </SelectTrigger>
              <SelectContent>
                {asignaturas
                  .filter((a) => !a.docente) // Solo mostrar asignaturas sin asignar
                  .map((asignatura) => (
                    <SelectItem key={asignatura.id} value={asignatura.id}>
                      {asignatura.nombre} - {asignatura.horasSemanales} horas
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleAsignar} className="w-full">
            Asignar Carga Horaria
          </Button>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-2">Resumen de Asignaciones</h3>
          <div className="space-y-2">
            {asignaturas
              .filter((a) => a.docente)
              .map((asignatura) => {
                const docente = docentes.find((d) => d.id === asignatura.docente)
                return (
                  <div key={asignatura.id} className="p-3 border rounded-md">
                    <p>
                      <strong>Asignatura:</strong> {asignatura.nombre} ({asignatura.horasSemanales} horas)
                    </p>
                    <p>
                      <strong>Docente:</strong> {docente?.nombre}
                    </p>
                  </div>
                )
              })}
            {asignaturas.filter((a) => a.docente).length === 0 && (
              <p className="text-gray-500 italic">No hay asignaciones realizadas</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
