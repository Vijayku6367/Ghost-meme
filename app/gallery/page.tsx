'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, TrendingUp, Clock, Lock, Eye } from 'lucide-react'
import MemeCanvas from '@/components/MemeCanvas'

const memes = [
  { id: 1, top: 'When you realize', bottom: 'your meme is FHE encrypted', encryptedScore: '0x8f3ac2b1', views: '2.4K', creator: '0xabc...123' },
  { id: 2, top: 'Me waiting for', bottom: 'my encrypted analytics', encryptedScore: '0x5e9f3d8a', views: '1.8K', creator: '0xdef...456' },
  { id: 3, top: 'How I explain', bottom: 'FHE to my friends', encryptedScore: '0x3b7c5f9d', views: '3.2K', creator: '0xghi...789' },
  { id: 4, top: 'Zero knowledge', bottom: 'maximimum laughs', encryptedScore: '0x9a2b4c6d', views: '4.1K', creator: '0xjkl...012' },
  { id: 5, top: 'My data when', bottom: 'it\'s homomorphically encrypted', encryptedScore: '0x1e3d5f7a', views: '2.9K', creator: '0xmno...345' },
  { id: 6, top: 'Trying to decrypt', bottom: 'without the FHE key', encryptedScore: '0x8c9d1b3f', views: '5.7K', creator: '0xpqr...678' },
]

export default function GalleryPage() {
  const [filter, setFilter] = useState('trending')
  const [search, setSearch] = useState('')

  const filteredMemes = memes.filter(meme =>
    meme.top.toLowerCase().includes(search.toLowerCase()) ||
    meme.bottom.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Encrypted Meme Gallery
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through memes with encrypted captions. All engagement metrics are 
            computed on encrypted data.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search encrypted memes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              {[
                { id: 'trending', label: 'Trending', icon: TrendingUp },
                { id: 'recent', label: 'Recent', icon: Clock },
                { id: 'encrypted', label: 'Most Encrypted', icon: Lock },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex items-center px-4 py-3 rounded-xl font-medium ${
                    filter === f.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'border hover:bg-gray-50'
                  }`}
                >
                  <f.icon className="h-4 w-4 mr-2" />
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { value: '12.8K', label: 'Total Encrypted Memes' },
              { value: '456.2K', label: 'Encrypted Engagements' },
              { value: '98.3%', label: 'Privacy Maintained' },
              { value: '24/7', label: 'FHE Processing' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-4 border shadow-sm">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Meme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemes.map((meme, index) => (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl border overflow-hidden shadow-lg card-hover"
            >
              {/* Meme Preview */}
              <div className="p-4">
                <MemeCanvas
                  imageUrl="/placeholder-meme.jpg"
                  topText={meme.top}
                  bottomText={meme.bottom}
                  fontSize={36}
                />
              </div>

              {/* Meme Info */}
              <div className="p-4 border-t">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <div className="p-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded mr-2">
                      <Lock className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Encrypted Score</span>
                  </div>
                  <span className="text-sm font-mono bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-2 py-1 rounded">
                    {meme.encryptedScore}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {meme.views} views
                  </div>
                  <div className="text-xs">
                    by {meme.creator}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between">
                  <button className="flex-1 py-2 text-center border rounded-lg hover:bg-white">
                    🔒 View Encrypted
                  </button>
                  <button className="flex-1 py-2 text-center ml-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90">
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
                  }
