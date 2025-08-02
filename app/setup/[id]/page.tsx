"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, ArrowLeft, Heart, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"

export default function SetupPage() {
  const router = useRouter()
  const params = useParams()
  const tagId = params.id as string
  const { t } = useLanguage()

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
      const profileData = {
        ...formData,
        id: tagId,
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem(`oli-tag-${tagId}`, JSON.stringify(profileData))
      router.push(`/profile/${tagId}`)
    } catch (error) {
      console.error("Error creating profile:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/scan">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="h-5 w-5 text-orange-500" />
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900">{t("setupTitle")}</h1>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                {t("setupCode")}: <span className="font-mono font-semibold">{tagId}</span>
              </p>
            </div>
          </div>

          {/* Success Message */}
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800 text-sm sm:text-base">{t("tagFoundTitle")}</p>
                  <p className="text-xs sm:text-sm text-green-700">{t("tagFoundDescription")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Pet Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{t("petInfoTitle")}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{t("petInfoDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="petName" className="text-sm sm:text-base">
                    {t("petNameLabel")} *
                  </Label>
                  <Input
                    id="petName"
                    name="petName"
                    value={formData.petName}
                    onChange={handleInputChange}
                    placeholder={t("petNamePlaceholder") as string}
                    required
                    className="text-sm sm:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="petImage" className="text-sm sm:text-base">
                    {t("petPhotoLabel")}
                  </Label>
                  <div className="mt-2">
                    <input type="file" id="petImage" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("petImage")?.click()}
                      className="w-full text-sm sm:text-base"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {t("uploadPhoto")}
                    </Button>
                    {imagePreview && (
                      <div className="mt-4">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mx-auto"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="petDescription" className="text-sm sm:text-base">
                    {t("petDescriptionLabel")}
                  </Label>
                  <Textarea
                    id="petDescription"
                    name="petDescription"
                    value={formData.petDescription}
                    onChange={handleInputChange}
                    placeholder={t("petDescriptionPlaceholder") as string}
                    rows={3}
                    className="text-sm sm:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="medicalInfo" className="text-sm sm:text-base">
                    {t("medicalInfoLabel")}
                  </Label>
                  <Textarea
                    id="medicalInfo"
                    name="medicalInfo"
                    value={formData.medicalInfo}
                    onChange={handleInputChange}
                    placeholder={t("medicalInfoPlaceholder") as string}
                    rows={2}
                    className="text-sm sm:text-base"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Owner Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{t("ownerInfoTitle")}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{t("ownerInfoDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ownerName" className="text-sm sm:text-base">
                      {t("ownerNameLabel")} *
                    </Label>
                    <Input
                      id="ownerName"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      placeholder={t("ownerNamePlaceholder") as string}
                      required
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerPhone" className="text-sm sm:text-base">
                      {t("ownerPhoneLabel")} *
                    </Label>
                    <Input
                      id="ownerPhone"
                      name="ownerPhone"
                      type="tel"
                      value={formData.ownerPhone}
                      onChange={handleInputChange}
                      placeholder={t("ownerPhonePlaceholder") as string}
                      required
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="ownerEmail" className="text-sm sm:text-base">
                    {t("ownerEmailLabel")} *
                  </Label>
                  <Input
                    id="ownerEmail"
                    name="ownerEmail"
                    type="email"
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                    placeholder={t("ownerEmailPlaceholder") as string}
                    required
                    className="text-sm sm:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="ownerAddress" className="text-sm sm:text-base">
                    {t("ownerAddressLabel")}
                  </Label>
                  <Input
                    id="ownerAddress"
                    name="ownerAddress"
                    value={formData.ownerAddress}
                    onChange={handleInputChange}
                    placeholder={t("ownerAddressPlaceholder") as string}
                    className="text-sm sm:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyContact" className="text-sm sm:text-base">
                    {t("emergencyContactLabel")}
                  </Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder={t("emergencyContactPlaceholder") as string}
                    className="text-sm sm:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="veterinarian" className="text-sm sm:text-base">
                    {t("veterinarianLabel")}
                  </Label>
                  <Input
                    id="veterinarian"
                    name="veterinarian"
                    value={formData.veterinarian}
                    onChange={handleInputChange}
                    placeholder={t("veterinarianPlaceholder") as string}
                    className="text-sm sm:text-base"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                t("activatingTag")
              ) : (
                <>
                  <Heart className="h-4 w-4 mr-2" />
                  {t("activateTag")}
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
