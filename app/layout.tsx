import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/LanguageContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Oli Tag - Protección para Mascotas",
  description:
    "La chapita inteligente que protege a tu mascota con código QR. Si se pierde, quien la encuentre podrá contactarte al instante.",
  keywords: ["mascota", "perro", "gato", "QR", "chapita", "protección", "Oli", "Fausto"],
  authors: [{ name: "Fausto & Oli" }],
  creator: "Fausto",
  publisher: "Oli Tag",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://oli-tag.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Oli Tag - Protección para Mascotas",
    description: "La chapita inteligente que protege a tu mascota con código QR",
    url: "https://oli-tag.com",
    siteName: "Oli Tag",
    images: [
      {
        url: "/placeholder.svg?height=1200&width=630&text=Oli+Tag",
        width: 1200,
        height: 630,
        alt: "Oli Tag - Protección para Mascotas",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oli Tag - Protección para Mascotas",
    description: "La chapita inteligente que protege a tu mascota con código QR",
    images: ["/placeholder.svg?height=1200&width=630&text=Oli+Tag"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Oli Tag",
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F97316",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Oli Tag" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
