"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, ArrowLeft, Search, Heart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"

export default function ScanPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [tagId, setTagId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tagId.trim()) {
      // Check if profile exists, if not redirect to setup
      const profileData = localStorage.getItem(`oli-tag-${tagId.trim()}`)
      if (profileData) {
        router.push(`/profile/${tagId.trim()}`)
      } else {
        router.push(`/setup/${tagId.trim()}`)
      }
    }
  }

  const handleQRScan = () => {
    // In a real app, this would open the camera for QR scanning
    // For demo purposes, we'll simulate with a random ID
    const demoIds = ["OLI001", "OLI002", "OLI003", "OLI004", "OLI005"]
    const randomId = demoIds[Math.floor(Math.random() * demoIds.length)]

    // Check if this tag is already configured
    const profileData = localStorage.getItem(`oli-tag-${randomId}`)
    if (profileData) {
      router.push(`/profile/${randomId}`)
    } else {
      router.push(`/setup/${randomId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t("scanTitle")}</h1>
              <p className="text-gray-600 text-sm sm:text-base">{t("scanSubtitle")}</p>
            </div>
            <LanguageSelector />
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* QR Scanner */}
            <Card>
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <QrCode className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">{t("scanWithCameraTitle")}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{t("scanWithCameraDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleQRScan} className="w-full bg-orange-500 hover:bg-orange-600" size="lg">
                  <QrCode className="h-4 w-4 mr-2" />
                  {t("openScanner")}
                </Button>
              </CardContent>
            </Card>

            {/* Manual Input */}
            <Card>
              <CardHeader className="text-center pb-3">
                <Search className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-3" />
                <CardTitle className="text-lg sm:text-xl">{t("manualCodeTitle")}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{t("manualCodeDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="tagId" className="text-sm sm:text-base">
                      {t("tagCodeLabel")}
                    </Label>
                    <Input
                      id="tagId"
                      value={tagId}
                      onChange={(e) => setTagId(e.target.value.toUpperCase())}
                      placeholder={t("tagCodePlaceholder")}
                      className="text-center font-mono text-lg"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-transparent" variant="outline" size="lg">
                    <Search className="h-4 w-4 mr-2" />
                    {t("searchTag")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2 text-sm sm:text-base">{t("foundPetTitle")}</h3>
                    <ul className="text-xs sm:text-sm text-orange-800 space-y-1">
                      {t("foundPetInstructions").map((instruction, index) => (
                        <li key={index}>• {instruction}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Demo Tags */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4 sm:pt-6">
                <h3 className="font-semibold text-blue-900 mb-3 text-sm sm:text-base">{t("demoCodesTitle")}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["OLI001", "OLI002", "OLI003", "OLI004"].map((code) => (
                    <Button
                      key={code}
                      variant="outline"
                      size="sm"
                      onClick={() => setTagId(code)}
                      className="text-xs font-mono bg-white"
                    >
                      {code}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
