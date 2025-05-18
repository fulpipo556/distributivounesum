"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BuscadorAvanzado({ onSearch, onReset }) {
  const { toast } = useToast()
  const [searchField, setSearchField] = useState("cedula")
  const [searchValue, setSearchValue] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (searchValue.trim() === "") {
      toast({
        title: "Campo vacío",
        description: "Por favor ingrese un valor para buscar",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    onSearch(searchField, searchValue)
  }

  const handleReset = () => {
    setSearchValue("")
    setIsSearching(false)
    onReset()
  }

  return (
    <Card className="border-unesum-green">
      <CardHeader className="bg-unesum-green text-white py-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Search className="mr-2 h-4 w-4" />
          Búsqueda Avanzada
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={searchField} onValueChange={setSearchField}>
            <SelectTrigger className="border-unesum-green sm:w-[180px]">
              <SelectValue placeholder="Campo de búsqueda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cedula">Cédula</SelectItem>
              <SelectItem value="nombre">Nombre</SelectItem>
              <SelectItem value="apellidos">Apellidos</SelectItem>
              <SelectItem value="carrera">Carrera</SelectItem>
              <SelectItem value="facultad">Facultad</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex w-full">
            <Input
              placeholder={`Buscar por ${searchField}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
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
