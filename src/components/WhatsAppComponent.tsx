'use client'
import axios from 'axios'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function WhatsAppComponent() {
  const { data: session } = useSession()
  const [carregou, setiscarregou] = useState(false)
  const router = useRouter()
  if (session) {
    /*     console.log(session) */

    if (!carregou) {
      console.log(session.user.nome)
      if (session.user.nome !== 'Fabiano Bispo') {
        router.push('https://www.jfimperadores.com.br/dashboard')
      }
      setiscarregou(true)
    }
  }

  const [sessionData, setSessionData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [qrKey, setQrKey] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')

  const startWhatsAppSession = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/whatsapp/start')
      setSessionData(response.data)
    } catch (error) {
      console.error('Error starting WhatsApp session:', error)
    }
    setLoading(false)
  }

  const terminateWhatsAppSessions = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/whatsapp/terminate')
      setSessionData(response.data)
      setShowQR(false)
    } catch (error) {
      console.error('Error terminating WhatsApp sessions:', error)
    }
    setLoading(false)
  }

  const fetchQRCode = () => {
    setShowQR(true)
    setQrKey((prev) => prev + 1)
  }

  const sendMessage = async () => {
    setLoading(true)
    try {
      const formattedPhone = phoneNumber.replace(/\D/g, '')
      const chatId = `55${formattedPhone}@c.us`

      const response = await axios.post('/api/whatsapp/sendMessage', {
        chatId,
        contentType: 'string',
        content: message,
      })

      setMessage('')
      setSessionData(response.data)
    } catch (error) {
      console.error('Error sending message:', error)
    }
    setLoading(false)
  }

  const checkStatus = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/whatsapp/status')
      setSessionData(response.data)
    } catch (error) {
      console.error('Error checking status:', error)
    }
    setLoading(false)
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">WhatsApp Session Manager</h2>

      <div className="flex gap-4 flex-wrap">
        <Button onClick={startWhatsAppSession} disabled={loading}>
          Iniciar sessão
        </Button>

        <Button
          onClick={terminateWhatsAppSessions}
          disabled={loading}
          variant="destructive"
        >
          Terminar todas as sessões
        </Button>

        <Button onClick={fetchQRCode} disabled={loading} variant="outline">
          gerar QR Code
        </Button>

        <Button onClick={checkStatus} disabled={loading} variant="secondary">
          Verfica status
        </Button>
      </div>

      <div className="space-y-4 mt-4">
        <h3 className="text-lg font-semibold">Enviar mensagem</h3>
        <div className="flex flex-col gap-2 max-w-md">
          <Input
            placeholder="Nuemro telefone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Input
            placeholder="Mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            onClick={sendMessage}
            disabled={loading || !phoneNumber || !message}
          >
            Enviar
          </Button>
        </div>
      </div>

      {showQR && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">QR Code</h3>
          <div className="border rounded p-4 inline-block bg-white">
            <img
              key={qrKey}
              src="/api/whatsapp/qrcode"
              alt="WhatsApp QR Code"
              width={256}
              height={256}
              className="object-contain"
            />
          </div>
        </div>
      )}

      {sessionData && (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(sessionData, null, 2)}
        </pre>
      )}
    </div>
  )
}
