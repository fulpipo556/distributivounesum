"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Upload, FileSpreadsheet } from "lucide-react"

export default function ExcelManager() {
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState("")

  const handleFileChange = (e) => {
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
    // Simulación de carga
    setTimeout(() => {
      setMessage("Archivo cargado exitosamente")
      setIsUploading(false)
      setFile(null)
    }, 1500)
  }

  const handleExport = async () => {
    setMessage("Exportando datos a Excel...")
    // Simulación de exportación
    setTimeout(() => {
      setMessage("Datos exportados exitosamente")
    }, 1500)
  }

  return (
    <Card className="border-unesum-green">
      <CardHeader className="bg-unesum-red text-white">
        <CardTitle className="flex items-center">
          <FileSpreadsheet className="mr-2" />
          Importar/Exportar Datos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-unesum-green">Seleccionar archivo Excel</label>
          <Input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="cursor-pointer border-unesum-green"
          />
          {file && <p className="text-sm text-gray-500">{file.name}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="flex-1 bg-unesum-green hover:bg-unesum-green-dark"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Importando..." : "Importar Excel"}
          </Button>

          <Button
            onClick={handleExport}
            variant="outline"
            className="flex-1 border-unesum-red text-unesum-red hover:bg-unesum-red hover:text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
        </div>

        {message && (
          <Alert
            variant={message.includes("Error") ? "destructive" : "default"}
            className={message.includes("Error") ? "bg-red-50" : "bg-unesum-green-light/10 border-unesum-green"}
          >
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
