"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">{t("language")}</span>
          <span className="text-xs font-mono">{language.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("es")}>
          <span className="mr-2">🇪🇸</span>
          {t("spanish")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          <span className="mr-2">🇺🇸</span>
          {t("english")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
