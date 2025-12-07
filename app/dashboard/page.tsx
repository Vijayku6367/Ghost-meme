'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Eye, Share2, Download, Filter, Calendar, Lock } from 'lucide-react'

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('7d')

  const stats = [
    { label: 'Total Memes', value: '142', change: '+12%', icon: TrendingUp, color: 'from-purple-500 to-blue-500' },
    { label: 'Total Views', value: '24.8K', change: '+34%', icon: Eye, color: 'from-green-500 to-emerald-500' },
    { label: 'Shares', value: '3.2K', change: '+18%', icon: Share2, color: 'from-orange-500 to-red-500' },
    { label: 'Engagement Rate', value: '4.8%', change: '+5%', icon: Users, color: 'from-blue-500 to-cyan-500' },
  ]

  const topMemes = [
    { name: 'FHE Explained', views: '8.4K', encryptedScore: '0x9a2b...4c6d', change: '+42%' },
    { name: 'Zero Knowledge Humor', views: '6.7K', encryptedScore: '0x3b7c...5f9d', change: '+28%' },
    { name: 'Encrypted Reactions', views: '5.2K', encryptedScore: '0x8f3a...c2b1', change: '+15%' },
    { name: 'Private Meme 101', views: '4.8K', encryptedScore: '0x5e9f...3d8a', change: '+23%' },
  ]

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Analytics Dashboard
              </span>
            </h1>
            <p className="text-gray-600">
              Private insights from your encrypted memes. All metrics computed on encrypted data.
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <div className="flex items-center border rounded-lg p-2">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent focus:outline-none"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg">
              <Download className="h-4 w-4 mr-2" />
              Export Insights
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border p-6 shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    <span className="text-sm text-gray-500 ml-2">vs last period</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl border p-6 shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Encrypted Engagement Trend</h3>
              <button className="flex items-center text-sm text-gray-600">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
            
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <p className="text-gray-600">Encrypted engagement chart visualization</p>
                <p className="text-sm text-gray-500 mt-1">(All data processed under FHE)</p>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: 'Peak Engagement', value: '4:00 PM', color: 'bg-purple-500' },
                { label: 'Avg. View Time', value: '42s', color: 'bg-blue-500' },
                { label: 'Encryption Rate', value: '100%', color: 'bg-green-500' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-2xl font-bold mb-1">{item.value}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Memes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-6">Top Performing Memes</h3>
            
            <div className="space-y-4">
              {topMemes.map((meme, index) => (
                <div key={meme.name} className="flex items-center p-4 border rounded-xl hover:bg-gray-50">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 flex items-center justify-center mr-4">
                    <span className="font-bold text-purple-600">{index + 1}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{meme.name}</h4>
                      <span className="text-sm text-green-600 font-medium">{meme.change}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Eye className="h-3 w-3 mr-1" />
                        {meme.views} views
                      </div>
                      <div className="flex items-center text-sm">
                        <Lock className="h-3 w-3 mr-1 text-purple-600" />
                        <span className="font-mono">{meme.encryptedScore}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* FHE Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <Lock className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-semibold">FHE Encryption Active</h3>
              </div>
              <p className="opacity-90">
                All your analytics are computed on encrypted data. Your privacy is 100% maintained.
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-sm opacity-90">Privacy Score</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
              }
