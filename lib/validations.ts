import { z } from "zod"

// Frontend form validation schemas for Oli Tag

// Pet profile form validation
export const petProfileFormSchema = z.object({
  name: z.string().min(1, "Pet name is required").max(50, "Pet name is too long"),
  description: z.string().max(500, "Description is too long").optional(),
  medicalInfo: z.string().max(500, "Medical info is too long").optional(),
  photo: z.instanceof(File).optional().or(z.string().url("Invalid photo URL").optional()),
})

// Owner contact form validation
export const ownerContactFormSchema = z.object({
  name: z.string().min(1, "Owner name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Invalid phone number").max(20, "Phone number is too long"),
  address: z.string().max(200, "Address is too long").optional(),
  emergencyContact: z.string().max(200, "Emergency contact is too long").optional(),
  veterinarian: z.string().max(200, "Veterinarian info is too long").optional(),
})

// Complete tag setup form validation
export const tagSetupFormSchema = z.object({
  pet: petProfileFormSchema,
  owner: ownerContactFormSchema,
})

// Tag code validation
export const tagCodeSchema = z.object({
  code: z.string().min(3, "Tag code is required").regex(/^OLI\d{3,4}$/, "Invalid tag code format"),
})

// API response schemas for frontend
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
})

// Pet profile response from API
export const petProfileResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  medicalInfo: z.string().optional(),
  photo: z.string().optional(),
  tagCode: z.string(),
  owner: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string().optional(),
    emergencyContact: z.string().optional(),
    veterinarian: z.string().optional(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// Types derived from schemas for frontend use
export type PetProfileForm = z.infer<typeof petProfileFormSchema>
export type OwnerContactForm = z.infer<typeof ownerContactFormSchema>
export type TagSetupForm = z.infer<typeof tagSetupFormSchema>
export type TagCode = z.infer<typeof tagCodeSchema>
export type ApiResponse<T = any> = Omit<z.infer<typeof apiResponseSchema>, 'data'> & { data?: T }
export type PetProfileResponse = z.infer<typeof petProfileResponseSchema>