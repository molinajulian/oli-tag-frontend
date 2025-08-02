"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
    
    // You can add error tracking here (Sentry, LogRocket, etc.)
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error)
    // }
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            ¡Algo salió mal!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600 mb-6">
            Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado.
          </CardDescription>
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-100 p-3 rounded text-xs text-left mb-4 font-mono">
              <strong>Error:</strong> {error.message}
              {error.digest && (
                <>
                  <br />
                  <strong>Digest:</strong> {error.digest}
                </>
              )}
            </div>
          )}
          <div className="space-y-3">
            <Button 
              onClick={reset}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Intentar de Nuevo
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}