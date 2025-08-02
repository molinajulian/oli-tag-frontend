"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { parsePhoneNumber } from 'libphonenumber-js'
import { useLanguage } from "@/contexts/LanguageContext"

interface PhoneInputProps {
  value?: string
  onChange: (value: string | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  required?: boolean
}

export function PhoneInputComponent({
  value,
  onChange,
  placeholder = "+34 600 000 000",
  className,
  disabled = false,
  required = false,
  ...props
}: PhoneInputProps) {
  const { t } = useLanguage()
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [hasBeenTouched, setHasBeenTouched] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    
    // Only validate if field has been touched AND has value
    if (hasBeenTouched && newValue && newValue.trim()) {
      validatePhone(newValue)
    } else if (hasBeenTouched && (!newValue || !newValue.trim()) && required) {
      setIsValid(false)
    } else if (hasBeenTouched && (!newValue || !newValue.trim()) && !required) {
      setIsValid(null)
    }
  }

  const validatePhone = (phoneValue: string) => {
    try {
      // Use libphonenumber-js for smart validation
      const phoneNumber = parsePhoneNumber(phoneValue)
      const valid = phoneNumber && phoneNumber.isValid()
      setIsValid(valid)
    } catch {
      setIsValid(false)
    }
  }

  const handleBlur = () => {
    setHasBeenTouched(true)
    
    // Validate only if there's content OR if it's required
    if (value && value.trim()) {
      validatePhone(value)
    } else if (required) {
      setIsValid(false)
    } else {
      setIsValid(null)
    }
  }

  const getValidationClasses = () => {
    if (!hasBeenTouched || isValid === null) return ""
    if (isValid === false) return "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
    if (isValid === true) return "border-green-500 focus-within:ring-green-500/20 focus-within:border-green-500"
    return ""
  }

  return (
    <div className={cn("w-full", className)}>
      <Input
        type="tel"
        value={value || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={hasBeenTouched && isValid === false}
        className={cn(
          getValidationClasses()
        )}
        {...props}
      />
      
      {/* Validation messages - only if field was touched */}
      {hasBeenTouched && isValid === false && (
        <p className="text-xs text-red-600 mt-1">
          {!value || !value.trim() 
            ? t("phoneRequired")
            : t("phoneInvalid")
          }
        </p>
      )}
      {hasBeenTouched && isValid === true && (
        <p className="text-xs text-green-600 mt-1">
          {t("phoneValid")}
        </p>
      )}
    </div>
  )
}

export { PhoneInputComponent as PhoneInput }