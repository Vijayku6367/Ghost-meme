'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MemeCanvasProps {
  imageUrl: string
  topText: string
  bottomText: string
  fontSize?: number
  fontColor?: string
}

const MemeCanvas = ({ imageUrl, topText, bottomText, fontSize = 48, fontColor = 'white' }: MemeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 600
    canvas.height = 400

    // Load image
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      // Draw image
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

      // Text styling
      ctx.fillStyle = fontColor
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 4
      ctx.textAlign = 'center'
      ctx.font = `bold ${fontSize}px Impact`

      // Draw top text with stroke
      if (topText) {
        ctx.strokeText(topText, canvas.width / 2, 60)
        ctx.fillText(topText, canvas.width / 2, 60)
      }

      // Draw bottom text with stroke
      if (bottomText) {
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 40)
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 40)
      }
    }

    image.src = imageUrl || '/placeholder-meme.jpg'
  }, [imageUrl, topText, bottomText, fontSize, fontColor])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-auto bg-gradient-to-br from-purple-100 to-blue-100"
      />
      <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
        Encrypted Preview
      </div>
    </motion.div>
  )
}

export default MemeCanvas
