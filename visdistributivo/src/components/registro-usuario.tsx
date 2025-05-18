"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { UserPlus, Key } from "lucide-react"

export default function RegistroUsuario() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    rol: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombres) newErrors.nombres = "El nombre es requerido"
    if (!formData.apellidos) newErrors.apellidos = "Los apellidos son requeridos"

    if (!formData.cedula) {
      newErrors.cedula = "La cédula es requerida"
    } else if (!/^\d{10}$/.test(formData.cedula)) {
      newErrors.cedula = "La cédula debe tener 10 dígitos"
    }

    if (!formData.email) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El formato del email es inválido"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    if (!formData.rol) newErrors.rol = "El rol es requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Aquí iría la lógica para enviar los datos al servidor
      console.log("Datos de registro:", formData)

      toast({
        title: "Registro exitoso",
        description: "El usuario ha sido registrado correctamente",
      })

      // Limpiar el formulario
      setFormData({
        nombres: "",
        apellidos: "",
        cedula: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: "",
        rol: "",
      })
    } else {
      toast({
        title: "Error en el formulario",
        description: "Por favor, corrija los errores en el formulario",
        variant: "destructive",
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  return (
    <Card className="w-full border-unesum-green">
      <CardHeader className="bg-unesum-green text-white">
        <CardTitle className="flex items-center">
          <UserPlus className="mr-2" />
          Registro de Usuario
        </CardTitle>
        <CardDescription className="text-white/80">
          Complete el formulario para registrar un nuevo usuario en el sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombres">Nombres</Label>
              <Input
                id="nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                className={`border-unesum-green ${errors.nombres ? "border-red-500" : ""}`}
              />
              {errors.nombres && <p className="text-red-500 text-sm">{errors.nombres}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos</Label>
              <Input
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className={`border-unesum-green ${errors.apellidos ? "border-red-500" : ""}`}
              />
              {errors.apellidos && <p className="text-red-500 text-sm">{errors.apellidos}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cedula">Número de Cédula</Label>
              <Input
                id="cedula"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                maxLength={10}
                className={`border-unesum-green ${errors.cedula ? "border-red-500" : ""}`}
              />
              {errors.cedula && <p className="text-red-500 text-sm">{errors.cedula}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`border-unesum-green ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="border-unesum-green"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rol">Rol</Label>
              <Select
                value={formData.rol}
                onValueChange={(value) => {
                  setFormData({ ...formData, rol: value })
                  if (errors.rol) {
                    setErrors({ ...errors, rol: "" })
                  }
                }}
              >
                <SelectTrigger id="rol" className={`border-unesum-green ${errors.rol ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="coordinador">Coordinador</SelectItem>
                  <SelectItem value="docente">Docente</SelectItem>
                  <SelectItem value="asistente">Asistente</SelectItem>
                </SelectContent>
              </Select>
              {errors.rol && <p className="text-red-500 text-sm">{errors.rol}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`border-unesum-green ${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`border-unesum-green ${errors.confirmPassword ? "border-red-500" : ""}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full bg-unesum-green hover:bg-unesum-green-dark">
              <Key className="mr-2 h-4 w-4" />
              Registrar Usuario
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
