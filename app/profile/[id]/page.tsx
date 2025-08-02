"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Phone, Mail, MapPin, User, Stethoscope, AlertTriangle, Share2, Edit } from "lucide-react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

interface PetProfile {
  id: string
  petName: string
  petImage: string
  petDescription: string
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  ownerAddress: string
  emergencyContact: string
  veterinarian: string
  medicalInfo: string
  createdAt: string
}

export default function ProfilePage() {
  const params = useParams()
  const { t } = useLanguage()
  const [profile, setProfile] = useState<PetProfile | null>(null)
  const [_userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [hasNotified, setHasNotified] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  const sendLocationNotification = useCallback(async (location: { lat: number; lng: number } | null) => {
    if (!profile) return

    console.log("Sending notification to:", profile.ownerEmail)
    console.log("Location:", location)

    const notificationData = {
      tagId: params.id,
      petName: profile.petName,
      ownerEmail: profile.ownerEmail,
      scanTime: new Date().toISOString(),
      location: location ? `${location.lat}, ${location.lng}` : "Location not available",
      mapUrl: location ? `https://maps.google.com/?q=${location.lat},${location.lng}` : null,
    }

    const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
    notifications.push(notificationData)
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }, [profile, params.id])

  useEffect(() => {
    // Load profile data
    const profileData = localStorage.getItem(`oli-tag-${params.id}`)
    if (profileData) {
      setProfile(JSON.parse(profileData))
    }

    // Check if this is the owner viewing (simple check for demo)
    const ownerCheck = localStorage.getItem(`owner-${params.id}`)
    setIsOwner(!!ownerCheck)

    // Get user location and send notification (only if not owner)
    if (navigator.geolocation && !hasNotified && !isOwner) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(location)
          sendLocationNotification(location)
          setHasNotified(true)
        },
        (error) => {
          console.log("Location access denied:", error)
          sendLocationNotification(null)
          setHasNotified(true)
        },
      )
    }
  }, [params.id, hasNotified, isOwner, sendLocationNotification])

  const handleShare = async () => {
    if (!profile) return
    
    const shareData = {
      title: `${profile.petName} - Oli Tag`,
      text: t("shareOliTag"),
      url: window.location.origin,
    }

    try {
      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.origin)
        alert(t("linkCopied"))
      }
    } catch (_error) {
      // If share fails or is cancelled, try clipboard as fallback
      try {
        await navigator.clipboard.writeText(window.location.origin)
        alert(t("linkCopied"))
      } catch (_clipboardError) {
        // Final fallback: show the URL to copy manually
        const url = window.location.origin
        prompt(t("copyLinkPrompt"), url)
      }
    }
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-6 sm:py-8">
            <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold mb-2">{t("tagNotConfigured")}</h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">{t("tagNotConfiguredDescription")}</p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600">
              <Link href={`/setup/${params.id}`}>{t("configureNow")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          {/* Alert Banner - Only show if not owner */}
          {!isOwner && (
            <Card className="mb-4 sm:mb-6 border-green-200 bg-green-50">
              <CardContent className="py-3 sm:py-4">
                <div className="flex items-center gap-3">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-800 text-sm sm:text-base">{t("petFound")}</p>
                    <p className="text-xs sm:text-sm text-green-700">{t("ownerNotified")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pet Profile */}
          <Card className="mb-4 sm:mb-6">
            <CardHeader className="text-center pb-4">
              {profile.petImage && (
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4">
                  <img
                    src={profile.petImage || "/placeholder.svg"}
                    alt={profile.petName}
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                  />
                </div>
              )}
              <div className="flex items-center justify-center gap-2 mb-2">
                <CardTitle className="text-2xl sm:text-3xl">{profile.petName}</CardTitle>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
              </div>
              <Badge variant="outline" className="text-xs sm:text-sm">
                Oli Tag: {params.id}
              </Badge>
              {profile.petDescription && (
                <CardDescription className="text-sm sm:text-base mt-2">{profile.petDescription}</CardDescription>
              )}
            </CardHeader>
          </Card>

          {/* Owner Contact */}
          <Card className="mb-4 sm:mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  {t("ownerInformation")}
                </CardTitle>
                {isOwner && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/setup/${params.id}`}>
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {t("edit")}
                    </Link>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">{profile.ownerName}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <a href={`tel:${profile.ownerPhone}`} className="text-blue-600 hover:underline text-sm sm:text-base">
                  {profile.ownerPhone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <a
                  href={`mailto:${profile.ownerEmail}`}
                  className="text-blue-600 hover:underline text-sm sm:text-base break-all"
                >
                  {profile.ownerEmail}
                </a>
              </div>

              {profile.ownerAddress && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{profile.ownerAddress}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Information */}
          {(profile.emergencyContact || profile.veterinarian || profile.medicalInfo) && (
            <Card className="mb-4 sm:mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5" />
                  {t("additionalInformation")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {profile.emergencyContact && (
                  <div>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {t("emergencyContact")}
                    </Badge>
                    <p className="text-xs sm:text-sm">{profile.emergencyContact}</p>
                  </div>
                )}

                {profile.veterinarian && (
                  <div>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {t("veterinarian")}
                    </Badge>
                    <p className="text-xs sm:text-sm">{profile.veterinarian}</p>
                  </div>
                )}

                {profile.medicalInfo && (
                  <div>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {t("medicalInformation")}
                    </Badge>
                    <p className="text-xs sm:text-sm">{profile.medicalInfo}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Share Button */}
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <CardContent className="p-4 sm:p-6 text-center">
              <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("helpedReunite")}</h3>
              <p className="text-orange-100 mb-4 text-xs sm:text-sm">{t("shareOliTagDescription")}</p>
              <Button onClick={handleShare} variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                <Share2 className="h-4 w-4 mr-2" />
                {t("shareOliTagButton")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
