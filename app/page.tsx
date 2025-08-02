"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, QrCode, MapPin, Bell, Smartphone } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">{t("homeTitle")}</h1>
              <p className="text-sm sm:text-base text-orange-600 font-medium">{t("homeSubtitle")}</p>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto px-4">{t("homeDescription")}</p>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mb-8 sm:mb-12">
          <div className="max-w-md mx-auto">
            <img
              src="/placeholder.svg?height=300&width=400&text=Oli+con+su+chapita+QR"
              alt={t("heroImageAlt")}
              className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card className="text-center">
            <CardHeader className="pb-3">
              <QrCode className="h-10 w-10 sm:h-12 sm:w-12 text-orange-500 mx-auto mb-2" />
              <CardTitle className="text-lg sm:text-xl">{t("qrChipTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm sm:text-base">{t("qrChipDescription")}</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-3">
              <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 mx-auto mb-2" />
              <CardTitle className="text-lg sm:text-xl">{t("instantLocationTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm sm:text-base">{t("instantLocationDescription")}</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3">
              <Bell className="h-10 w-10 sm:h-12 sm:w-12 text-blue-500 mx-auto mb-2" />
              <CardTitle className="text-lg sm:text-xl">{t("immediateNotificationTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm sm:text-base">
                {t("immediateNotificationDescription")}
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg max-w-lg mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{t("haveTagTitle")}</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">{t("haveTagDescription")}</p>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 bg-orange-500 hover:bg-orange-600"
            >
              <Link href="/scan">
                <QrCode className="h-5 w-5 mr-2" />
                {t("scanMyTag")}
              </Link>
            </Button>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            {t("howItWorksTitle")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-orange-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="font-semibold mb-2 text-base sm:text-lg">{t("step1Title")}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{t("step1Description")}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="font-semibold mb-2 text-base sm:text-lg">{t("step2Title")}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{t("step2Description")}</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="font-semibold mb-2 text-base sm:text-lg">{t("step3Title")}</h3>
              <p className="text-gray-600 text-sm:text-base">{t("step3Description")}</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-bold mb-4 mx-auto">
                4
              </div>
              <h3 className="font-semibold mb-2 text-base sm:text-lg">{t("step4Title")}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{t("step4Description")}</p>
            </div>
          </div>
        </div>

        {/* PWA Install Prompt */}
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-4">
              <Smartphone className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-base sm:text-lg mb-1">{t("installTitle")}</h3>
                <p className="text-orange-100 text-sm sm:text-base">{t("installDescription")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm">
          <p className="mb-2">{t("footerText")}</p>
          <p>{t("footerCopyright")}</p>
        </div>
      </div>
    </div>
  )
}
