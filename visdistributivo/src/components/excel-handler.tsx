"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Upload } from "lucide-react"

export default function ExcelHandler() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setMessage("")
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage("Por favor selecciona un archivo Excel")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload-excel", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (response.ok) {
        setMessage("Archivo cargado exitosamente")
        setFile(null)
      } else {
        setMessage(`Error: ${data.message}`)
      }
    } catch (error) {
      setMessage("Error al cargar el archivo")
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleExport = async () => {
    try {
      const response = await fetch("/api/export-excel", {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("Error al exportar datos")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "carga-horaria-docentes.xlsx"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      setMessage("Error al exportar el archivo")
      console.error(error)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Gestión de Archivos Excel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="cursor-pointer" />
          {file && <p className="text-sm text-gray-500">{file.name}</p>}
        </div>

        <div className="flex space-x-2">
          <Button onClick={handleUpload} disabled={!file || isUploading} className="flex-1">
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Cargando..." : "Importar Excel"}
          </Button>

          <Button onClick={handleExport} variant="outline" className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
        </div>

        {message && (
          <Alert variant={message.includes("Error") ? "destructive" : "default"}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
