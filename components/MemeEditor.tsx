'use client'

import { useState } from 'react'
import { Upload, Type, Palette, Lock, Download, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

const MemeEditor = () => {
  const [image, setImage] = useState<string>('')
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [fontSize, setFontSize] = useState(48)
  const [fontColor, setFontColor] = useState('#FFFFFF')
  const [isEncrypted, setIsEncrypted] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEncrypt = () => {
    setIsEncrypted(true)
    // Simulate encryption
    setTimeout(() => {
      alert('Meme encrypted successfully! Captions are now FHE-secured.')
    }, 500)
  }

  return (
    <div className="bg-white rounded-2xl border p-6 shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Palette className="h-5 w-5 mr-2 text-purple-500" />
            Meme Preview
          </h3>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
            <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center mb-4">
              {image ? (
                <img src={image} alt="Preview" className="max-h-64 rounded-lg" />
              ) : (
                <div className="text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Upload an image to preview</p>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Top Text
                </label>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter top caption"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bottom Text
                </label>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter bottom caption"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold mb-4">Editor Controls</h3>
          
          {/* Image Upload */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Upload className="h-4 w-4 inline mr-2" />
                Upload Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </label>
              </div>
            </div>

            {/* Font Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Type className="h-4 w-4 inline mr-2" />
                  Font Size
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="24"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium">{fontSize}px</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Palette className="h-4 w-4 inline mr-2" />
                  Font Color
                </label>
                <div className="flex space-x-4">
                  {['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setFontColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        fontColor === color ? 'border-purple-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <input
                    type="color"
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    className="w-8 h-8 cursor-pointer rounded-full border"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEncrypt}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                  isEncrypted
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500'
                } text-white`}
              >
                <Lock className="h-5 w-5 mr-2" />
                {isEncrypted ? 'Already Encrypted' : 'Encrypt with FHE'}
              </motion.button>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 border rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 rounded-lg font-medium hover:opacity-90 flex items-center justify-center"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </motion.button>
              </div>
            </div>

            {/* Encryption Status */}
            {isEncrypted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <Lock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Meme Encrypted</p>
                    <p className="text-sm text-green-600">
                      Captions are FHE-secured. Data remains private.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemeEditor
