"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BuscadorCedulaProps {
  onSearch: (cedula: string) => void
  onReset: () => void
}

export default function BuscadorCedula({ onSearch, onReset }: BuscadorCedulaProps) {
  const { toast } = useToast()
  const [cedula, setCedula] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (cedula.trim() === "") {
      toast({
        title: "Campo vacío",
        description: "Por favor ingrese un número de cédula para buscar",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    onSearch(cedula)
  }

  const handleReset = () => {
    setCedula("")
    setIsSearching(false)
    onReset()
  }

  return (
    <Card className="border-unesum-green">
      <CardHeader className="bg-unesum-green text-white py-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Search className="mr-2 h-4 w-4" />
          Buscar por Cédula
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex w-full">
            <Input
              placeholder="Ingrese número de cédula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="border-unesum-green rounded-r-none"
            />
            <Button onClick={handleSearch} className="bg-unesum-green hover:bg-unesum-green-dark rounded-l-none">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {isSearching && (
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-unesum-green text-unesum-green hover:bg-unesum-green hover:text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Mostrar todos
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
