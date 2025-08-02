import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="relative">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="absolute inset-0 w-12 h-12 bg-orange-500 rounded-full animate-ping opacity-75"></div>
          </div>
          <p className="text-gray-600 text-center mt-4 font-medium">
            Cargando Oli Tag...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}