"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, ArrowLeft, QrCode } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function CreateProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    petName: "",
    petImage: "",
    petDescription: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    ownerAddress: "",
    emergencyContact: "",
    veterinarian: "",
    medicalInfo: "",
  })
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, petImage: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Generate unique ID for the pet profile
      const petId = Math.random().toString(36).substring(2, 15)

      // Save to localStorage (in a real app, this would be saved to a database)
      const profileData = {
        ...formData,
        id: petId,
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem(`pet-profile-${petId}`, JSON.stringify(profileData))

      // Redirect to the generated profile page
      router.push(`/profile/${petId}`)
    } catch (error) {
      console.error("Error creating profile:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Crear Perfil de Mascota</h1>
              <p className="text-gray-600">Completa la información de tu mascota y tus datos de contacto</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pet Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información de la Mascota</CardTitle>
                <CardDescription>Datos básicos de tu mascota</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="petName">Nombre de la mascota *</Label>
                  <Input
                    id="petName"
                    name="petName"
                    value={formData.petName}
                    onChange={handleInputChange}
                    placeholder="Ej: Max, Luna, Rocky..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="petImage">Foto de la mascota</Label>
                  <div className="mt-2">
                    <input type="file" id="petImage" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("petImage")?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Subir Foto
                    </Button>
                    {imagePreview && (
                      <div className="mt-4">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          width={128}
                          height={128}
                          className="w-32 h-32 object-cover rounded-lg mx-auto"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="petDescription">Descripción adicional</Label>
                  <Textarea
                    id="petDescription"
                    name="petDescription"
                    value={formData.petDescription}
                    onChange={handleInputChange}
                    placeholder="Raza, color, características especiales, comportamiento..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="medicalInfo">Información médica</Label>
                  <Textarea
                    id="medicalInfo"
                    name="medicalInfo"
                    value={formData.medicalInfo}
                    onChange={handleInputChange}
                    placeholder="Medicamentos, alergias, condiciones especiales..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Owner Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Dueño</CardTitle>
                <CardDescription>Tus datos de contacto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ownerName">Nombre completo *</Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="ownerEmail">Email *</Label>
                  <Input
                    id="ownerEmail"
                    name="ownerEmail"
                    type="email"
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="ownerPhone">Teléfono *</Label>
                  <Input
                    id="ownerPhone"
                    name="ownerPhone"
                    type="tel"
                    value={formData.ownerPhone}
                    onChange={handleInputChange}
                    placeholder="+34 600 000 000"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="ownerAddress">Dirección</Label>
                  <Input
                    id="ownerAddress"
                    name="ownerAddress"
                    value={formData.ownerAddress}
                    onChange={handleInputChange}
                    placeholder="Tu dirección completa"
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyContact">Contacto de emergencia</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Nombre y teléfono de contacto alternativo"
                  />
                </div>

                <div>
                  <Label htmlFor="veterinarian">Veterinario</Label>
                  <Input
                    id="veterinarian"
                    name="veterinarian"
                    value={formData.veterinarian}
                    onChange={handleInputChange}
                    placeholder="Nombre y teléfono del veterinario"
                  />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                "Creando perfil..."
              ) : (
                <>
                  <QrCode className="h-4 w-4 mr-2" />
                  Crear Perfil y Generar QR
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
