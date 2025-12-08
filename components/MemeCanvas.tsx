'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Share2 } from 'lucide-react'

interface MemeCanvasProps {
  imageUrl: string
  topText: string
  bottomText: string
  fontSize?: number
  fontColor?: string
  isEncrypted?: boolean
}

const MemeCanvas = ({ 
  imageUrl, 
  topText, 
  bottomText, 
  fontSize = 48, 
  fontColor = '#FFFFFF',
  isEncrypted = false 
}: MemeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 600
    canvas.height = 400

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Load image
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      // Draw image with aspect ratio
      const ratio = Math.min(canvas.width / image.width, canvas.height / image.height)
      const x = (canvas.width - image.width * ratio) / 2
      const y = (canvas.height - image.height * ratio) / 2
      
      ctx.drawImage(image, x, y, image.width * ratio, image.height * ratio)

      // Text styling
      ctx.fillStyle = fontColor
      ctx.strokeStyle = 'black'
      ctx.lineWidth = Math.max(3, fontSize * 0.08)
      ctx.textAlign = 'center'
      ctx.font = `bold ${fontSize}px Impact, Arial, sans-serif`

      // Add text shadow for better readability
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
      ctx.shadowBlur = 5

      // Draw top text
      if (topText) {
        const yPos = y + 60
        ctx.strokeText(topText, canvas.width / 2, yPos)
        ctx.fillText(topText, canvas.width / 2, yPos)
      }

      // Draw bottom text
      if (bottomText) {
        const yPos = canvas.height - y - 40
        ctx.strokeText(bottomText, canvas.width / 2, yPos)
        ctx.fillText(bottomText, canvas.width / 2, yPos)
      }

      // Reset shadow
      ctx.shadowBlur = 0
    }

    image.src = imageUrl || '/placeholder-meme.jpg'
  }, [imageUrl, topText, bottomText, fontSize, fontColor])

  const handleDownload = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    setIsDownloading(true)
    try {
      const link = document.createElement('a')
      link.download = `ciphermeme-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleShare = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png')
      })

      const file = new File([blob], 'ciphermeme.png', { type: 'image/png' })
      
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Check out my encrypted meme!',
          text: 'Created with CipherMeme - Encrypted Meme Generator',
        })
      } else {
        // Fallback to download
        handleDownload()
      }
    } catch (error) {
      console.error('Share failed:', error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-purple-100 to-blue-100"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
      />
      
      <div className="absolute top-4 right-4 flex space-x-2">
        {isEncrypted && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <span className="mr-1">🔒</span> Encrypted
          </div>
        )}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          FHE Secured
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={isDownloading}
          className="bg-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 hover:bg-gray-50 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          <span>{isDownloading ? 'Downloading...' : 'Download'}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 hover:opacity-90"
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default MemeCanvas
