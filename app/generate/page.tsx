'use client'

import { motion } from 'framer-motion'
import { Sparkles, Lock, Upload, Zap } from 'lucide-react'
import MemeEditor from '@/components/MemeEditor'
import MemeCanvas from '@/components/MemeCanvas'

export default function GeneratePage() {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Encrypted Meme Generator
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create hilarious memes with fully encrypted captions. Your humor stays private, 
            while the meme goes viral.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: '2.4K', label: 'Memes Encrypted', icon: Lock },
            { value: '98%', label: 'Privacy Score', icon: Shield },
            { value: '15.7K', label: 'Active Users', icon: Zap },
            { value: '4.2K', label: 'Daily Encryptions', icon: Sparkles },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 border shadow-sm"
            >
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 mr-3">
                  <stat.icon className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Generator */}
        <div className="mb-8">
          <MemeEditor />
        </div>

        {/* How FHE Works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Lock className="h-8 w-8 mr-3" />
              <h2 className="text-2xl font-bold">How FHE Encryption Works</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-2xl mb-2">🔐</div>
                <h3 className="font-semibold mb-2">Encrypt Locally</h3>
                <p className="text-sm opacity-90">
                  Your meme captions are encrypted in your browser before leaving your device.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold mb-2">Process Encrypted</h3>
                <p className="text-sm opacity-90">
                  Our FHE engine processes and analyzes your meme without ever decrypting it.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold mb-2">Get Encrypted Insights</h3>
                <p className="text-sm opacity-90">
                  Receive analytics and trends while keeping your data completely private.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
