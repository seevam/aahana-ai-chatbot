'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Send, X, ChevronLeft } from 'lucide-react'

type Language = 'en' | 'hi' | 'te'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const translations = {
  en: {
    quickExit: 'Quick Exit',
    back: 'Back',
    typeMessage: 'Type a message...',
    send: 'Send',
    followUp: 'Is there anything else I can help you with?',
    locationPrompt: 'Please share your city or district name to find local resources near you.',
  },
  hi: {
    quickExit: 'तुरंत बाहर निकलें',
    back: 'वापस',
    typeMessage: 'संदेश लिखें...',
    send: 'भेजें',
    followUp: 'क्या मैं आपकी कोई और मदद कर सकता हूँ?',
    locationPrompt: 'कृपया अपने शहर या जिले का नाम साझा करें ताकि मैं आपके पास के स्थानीय संसाधन खोज सकूं।',
  },
  te: {
    quickExit: 'త్వరగా నిష్క్రమించండి',
    back: 'వెనుకకు',
    typeMessage: 'సందేశం టైప్ చేయండి...',
    send: 'పంపించు',
    followUp: 'నేను మీకు ఇంకా ఏదైనా సహాయం చేయగలనా?',
    locationPrompt: 'దయచేసి మీ నగరం లేదా జిల్లా పేరును పంచుకోండి, స్థానిక వనరులను కనుగొనడానికి.',
  },
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [language, setLanguage] = useState<Language>('en')
  const [isWaitingForLocation, setIsWaitingForLocation] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const t = translations[language]

  useEffect(() => {
    // Get language preference
    const lang = sessionStorage.getItem('preferredLanguage') as Language
    if (lang) {
      setLanguage(lang)
    }

    // Add welcome message
    setMessages([
      {
        id: '1',
        text: getWelcomeMessage(lang || 'en'),
        sender: 'bot',
        timestamp: new Date(),
      },
    ])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const getWelcomeMessage = (lang: Language): string => {
    const welcomeMessages = {
      en: 'Hello! I\'m here to help you. You can ask me questions or type "resources" to find local support services.',
      hi: 'नमस्ते! मैं आपकी मदद के लिए यहाँ हूँ। आप मुझसे सवाल पूछ सकते हैं या "resources" टाइप करके स्थानीय सहायता सेवाएं खोज सकते हैं।',
      te: 'హలో! నేను మీకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను. మీరు నన్ను ప్రశ్నలు అడగవచ్చు లేదా స్థానిక మద్దతు సేవలను కనుగొనడానికి "resources" అని టైప్ చేయవచ్చు.',
    }
    return welcomeMessages[lang]
  }

  const handleQuickExit = () => {
    // Clear all data and redirect to a safe site
    sessionStorage.clear()
    window.location.replace('https://www.google.com')
  }

  const handleBack = () => {
    router.push('/')
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')

    // Handle location-based resources
    if (isWaitingForLocation) {
      const locationResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thank you! Searching for resources in ${inputMessage}...`,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, locationResponse])
      setIsWaitingForLocation(false)

      // Simulate resource search
      setTimeout(() => {
        const resourcesMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: `Here are some local resources in ${inputMessage}:\n\n1. Women's Helpline: 181\n2. Emergency: 112\n3. Local police station\n\n${t.followUp}`,
          sender: 'bot',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, resourcesMessage])
      }, 1000)
      return
    }

    // Check if user is asking for resources
    if (inputMessage.toLowerCase().includes('resource')) {
      setIsWaitingForLocation(true)
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: t.locationPrompt,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      return
    }

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand your concern. I'm here to help. ${t.followUp}`,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="bg-primary-500 text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-3 py-2 hover:bg-primary-600 rounded-lg transition-colors"
            aria-label={t.back}
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="font-medium">{t.back}</span>
          </button>
          <div>
            <h1 className="font-semibold text-lg">Sahayata Support</h1>
            <p className="text-xs opacity-90">Anonymous & Confidential</p>
          </div>
        </div>
      </div>

      {/* Quick Exit Button */}
      <button
        onClick={handleQuickExit}
        className="quick-exit-btn"
        aria-label={t.quickExit}
      >
        <X className="w-5 h-5" />
        <span className="hidden sm:inline">{t.quickExit}</span>
        <span className="sm:hidden">{t.quickExit}</span>
      </button>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={message.sender === 'user' ? 'message-user' : 'message-bot'}>
              <p className="whitespace-pre-wrap">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.typeMessage}
              className="flex-1 bg-transparent outline-none text-gray-900"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-primary-500 text-white p-3 rounded-full hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t.send}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
