import axios, { AxiosResponse } from 'axios'
import { ApiResponse, PetProfileResponse, TagSetupForm } from './validations'

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add any auth tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add any authentication headers here if needed
    // const token = localStorage.getItem('auth_token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// API functions for frontend
export const api = {
  // Get pet profile by tag code
  getPetProfile: async (tagCode: string): Promise<PetProfileResponse> => {
    try {
      const response: AxiosResponse<ApiResponse<PetProfileResponse>> = await apiClient.get(
        `/api/v1/tags/${tagCode}`
      )
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch pet profile')
      }
      
      return response.data.data!
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error('Pet profile not found or not configured')
      }
      throw error
    }
  },

  // Create/update pet profile
  createPetProfile: async (tagCode: string, data: TagSetupForm): Promise<PetProfileResponse> => {
    try {
      const formData = new FormData()
      
      // Append pet data
      formData.append('pet_name', data.pet.name)
      if (data.pet.description) formData.append('pet_description', data.pet.description)
      if (data.pet.medicalInfo) formData.append('pet_medical_info', data.pet.medicalInfo)
      if (data.pet.photo instanceof File) {
        formData.append('pet_photo', data.pet.photo)
      }
      
      // Append owner data
      formData.append('owner_name', data.owner.name)
      formData.append('owner_email', data.owner.email)
      formData.append('owner_phone', data.owner.phone)
      if (data.owner.address) formData.append('owner_address', data.owner.address)
      if (data.owner.emergencyContact) formData.append('owner_emergency_contact', data.owner.emergencyContact)
      if (data.owner.veterinarian) formData.append('owner_veterinarian', data.owner.veterinarian)

      const response: AxiosResponse<ApiResponse<PetProfileResponse>> = await apiClient.post(
        `/api/v1/tags/${tagCode}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to create pet profile')
      }
      
      return response.data.data!
    } catch (error) {
      throw error
    }
  },

  // Record scan event (when someone finds a pet)
  recordScanEvent: async (tagCode: string): Promise<void> => {
    try {
      // Get user's location if available
      const location = await getCurrentLocation()
      
      await apiClient.post(`/api/v1/scans/${tagCode}`, {
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      })
    } catch (_error) {
      // Don't throw error for scan events, just log it
      console.error('Failed to record scan event:', _error)
    }
  },

  // Check if tag exists and is available
  checkTagAvailability: async (tagCode: string): Promise<boolean> => {
    try {
      const response = await apiClient.get(`/api/v1/tags/${tagCode}/availability`)
      return response.data.available
    } catch {
      return false
    }
  },
}

// Helper function to get user's current location
const getCurrentLocation = (): Promise<GeolocationPosition | null> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => {
        console.warn('Location access denied:', error)
        resolve(null)
      },
      {
        timeout: 5000,
        enableHighAccuracy: false,
      }
    )
  })
}

export default apiClient