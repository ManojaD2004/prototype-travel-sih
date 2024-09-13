'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

export default function CameraApp() {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleStartCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(mediaStream)
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }, [])

  const handleStopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }, [stream])

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Camera App</h2>
        <div className="flex flex-col items-center space-y-4">
          {stream ? (
            <>
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full rounded-lg shadow-lg" 
              />
              <button 
                onClick={handleStopCamera}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Stop Camera
              </button>
            </>
          ) : (
            <button 
              onClick={handleStartCamera}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Start Camera
            </button>
          )}
        </div>
      </div>
    </div>
  )
}