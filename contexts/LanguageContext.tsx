"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { translations, type Language, type TranslationKey } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string | string[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es")
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (initialized) return // Prevent multiple initializations

    // Check for saved language preference
    const savedLanguage = localStorage.getItem("oli-tag-language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguageState(savedLanguage)
    } else {
      // Detect browser language
      const browserLanguage = navigator.language.toLowerCase()
      if (browserLanguage.startsWith("en")) {
        setLanguageState("en")
      } else {
        setLanguageState("es") // Default to Spanish
      }
    }
    setInitialized(true)
  }, [initialized])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("oli-tag-language", lang)
  }

  const t = (key: TranslationKey): string | string[] => {
    return translations[language][key] || translations.es[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
