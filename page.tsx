'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Heart, Lock } from 'lucide-react'

type Language = 'en' | 'hi' | 'te'

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)
  const router = useRouter()

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang)
    // Store language preference in sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('preferredLanguage', lang)
    }
    // Redirect to chat
    setTimeout(() => {
      router.push('/chat')
    }, 500)
  }

  const languages = [
    { code: 'te' as Language, name: 'తెలుగు', nameEn: 'Telugu' },
    { code: 'hi' as Language, name: 'हिंदी', nameEn: 'Hindi' },
    { code: 'en' as Language, name: 'English', nameEn: 'English' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-500 rounded-full mb-4 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sahayata</h1>
          <p className="text-xl text-gray-600">सहायता | సహాయత | Support</p>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            Welcome • स्वागत है • స్వాగతం
          </h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">100% Anonymous</h3>
                <p className="text-sm text-gray-600">No registration, no data storage, completely private</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-safe-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Safe & Confidential</h3>
                <p className="text-sm text-gray-600">Your conversation is secure and protected</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Heart className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">24/7 Support</h3>
                <p className="text-sm text-gray-600">Get help anytime in your preferred language</p>
              </div>
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Choose Your Language • भाषा चुनें • మీ భాషను ఎంచుకోండి
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`language-btn text-left ${
                    selectedLanguage === lang.code
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-gray-900 hover:border-primary-500'
                  }`}
                >
                  <div className="text-xl font-bold">{lang.name}</div>
                  <div className="text-sm opacity-80">{lang.nameEn}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-sm text-gray-600 space-y-2">
          <p>
            This is a support tool and not a substitute for professional help.
          </p>
          <p>
            In case of emergency, please call <strong>181 (Women Helpline)</strong> or <strong>112 (Emergency)</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
