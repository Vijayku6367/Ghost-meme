'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Lock, EyeOff, TrendingUp, Shield } from 'lucide-react' // Fixed TrendingUp
import Link from 'next/link'
import MemeCanvas from '@/components/MemeCanvas'

export default function Home() {
  return (
    <div className="gradient-bg">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200 mb-6">
              <Lock className="h-4 w-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">
                Powered by Zama FHEVM
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block">Create Memes</span>
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Securely.
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              First encrypted meme generator powered by Fully Homomorphic Encryption (FHE). 
              Share memes without exposing your data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/generate">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold text-lg flex items-center"
                >
                  Create Meme
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              </Link>
              <Link href="/gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold text-lg hover:bg-gray-50"
                >
                  View Gallery
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: '📸', title: 'Upload Image', desc: 'Select or upload your meme template' },
              { icon: '💬', title: 'Add Caption', desc: 'Type your hilarious caption' },
              { icon: '🔐', title: 'Encrypt Meme', desc: 'FHE encrypts your captions' },
              { icon: '📊', title: 'Share & Track', desc: 'Share privately, track encrypted insights' },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl border shadow-lg card-hover"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: <EyeOff className="h-8 w-8" />, title: 'Private Analytics', desc: 'Track meme performance with encrypted engagement metrics' },
              { icon: <Lock className="h-8 w-8" />, title: 'Encrypted Engagement', desc: 'Likes, shares, and views remain encrypted' },
              { icon: <TrendingUp className="h-8 w-8" />, title: 'Zero-Knowledge Trends', desc: 'Discover trends without exposing your data' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border shadow-lg card-hover"
              >
                <div className="p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl w-fit mb-4">
                  <div className="text-purple-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
        
      {/* Showcase */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold">Trending Encrypted Memes</h2>
            <Link href="/gallery" className="text-purple-600 font-semibold hover:underline">
              View All →
            </Link>
          </div>
           <div className="bg-red-500 p-8 text-white">
  Tailwind is working!
</div>  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl border overflow-hidden shadow-lg"
              >
                <div className="p-4">
                  <MemeCanvas
                    imageUrl="/placeholder-meme.jpg"
                    topText="When I realize"
                    bottomText="my meme is FHE encrypted"
                    fontSize={36}
                  />
                </div>
                <div className="p-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Encrypted Score:</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full text-sm font-medium">
                      🔒 0x8f3a...c2b1
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
