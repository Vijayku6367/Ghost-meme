'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Book, Code, Lock, Zap, Terminal, Key, Shield, Cpu } from 'lucide-react'

const DocsPage = () => {
  const [activeTab, setActiveTab] = useState('fhe')

  const sections = {
    fhe: {
      title: 'What is FHE?',
      icon: Shield,
      content: `Fully Homomorphic Encryption (FHE) allows computations to be performed on encrypted data without decrypting it first. This means your meme captions and engagement metrics remain encrypted throughout processing.

## Key Benefits:
- **Data Privacy**: Your content never leaves your device unencrypted
- **Secure Analytics**: Get insights without exposing raw data
- **Zero Trust**: No need to trust the platform with your data
- **Regulatory Compliance**: Meets strict data protection requirements

## How It Works in CipherMeme:
1. Meme captions are encrypted locally in your browser
2. Encrypted data is sent to our servers
3. All processing (analytics, trends) happens on encrypted data
4. Results are returned still encrypted
5. You decrypt only the final insights`
    },
    api: {
      title: 'API Documentation',
      icon: Code,
      content: `# CipherMeme API

## Base URL
\`\`\`
https://api.ciphermeme.com/v1
\`\`\`

## Authentication
All API requests require an API key:
\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### Create Meme
\`\`\`http
POST /memes
Content-Type: multipart/form-data

{
  "image": "file",
  "top_text": "encrypted_string",
  "bottom_text": "encrypted_string",
  "font_size": 48
}
\`\`\`

### Get Meme Analytics
\`\`\`http
GET /memes/{id}/analytics
\`\`\`

Returns encrypted analytics that can be decrypted locally.`
    },
    sdk: {
      title: 'SDK Usage',
      icon: Terminal,
      content: `# JavaScript SDK

## Installation
\`\`\`bash
npm install @ciphermeme/sdk
\`\`\`

## Basic Usage
\`\`\`javascript
import { CipherMeme } from '@ciphermeme/sdk';

const client = new CipherMeme({
  apiKey: 'your_api_key',
  encryptionKey: 'your_fhe_key'
});

// Create encrypted meme
const meme = await client.createMeme({
  image: file,
  topText: 'My encrypted caption',
  bottomText: 'This stays private'
});

// Get encrypted analytics
const analytics = await client.getAnalytics(meme.id);
\`\`\`

## React Hook
\`\`\`javascript
import { useCipherMeme } from '@ciphermeme/react';

function MyComponent() {
  const { createMeme, isLoading } = useCipherMeme();
  
  const handleSubmit = async () => {
    const result = await createMeme({
      image: selectedImage,
      captions: encryptedCaptions
    });
  };
}
\`\`\``
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200 mb-4">
            <Book className="h-4 w-4 mr-2 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Documentation</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Technical Documentation
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn how to use CipherMeme's FHE-powered platform. Everything you need to build with encrypted memes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border p-6 shadow-lg">
              <h3 className="font-semibold text-lg mb-4">Topics</h3>
              <nav className="space-y-2">
                {Object.entries(sections).map(([key, section]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                      activeTab === key
                        ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 border border-purple-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <section.icon className="h-4 w-4 mr-3" />
                    {section.title}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Quick Links</h4>
                <div className="space-y-2">
                  {['Getting Started', 'Security', 'Best Practices', 'Examples', 'Troubleshooting'].map((link) => (
                    <a key={link} href="#" className="block text-sm text-gray-600 hover:text-gray-900 py-2">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 mr-4">
                  {sections[activeTab as keyof typeof sections].icon({ className: 'h-6 w-6 text-purple-600' })}
                </div>
                <h2 className="text-2xl font-bold">{sections[activeTab as keyof typeof sections].title}</h2>
              </div>

              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-gray-700">
                  {sections[activeTab as keyof typeof sections].content}
                </pre>
              </div>

              {/* Features */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border rounded-xl">
                  <Zap className="h-8 w-8 text-purple-600 mb-4" />
                  <h4 className="font-semibold mb-2">Fast Encryption</h4>
                  <p className="text-sm text-gray-600">Client-side FHE encryption in milliseconds</p>
                </div>
                
                <div className="p-6 border rounded-xl">
                  <Key className="h-8 w-8 text-blue-600 mb-4" />
                  <h4 className="font-semibold mb-2">Key Management</h4>
                  <p className="text-sm text-gray-600">Secure key generation and storage</p>
                </div>
                
                <div className="p-6 border rounded-xl">
                  <Cpu className="h-8 w-8 text-green-600 mb-4" />
                  <h4 className="font-semibold mb-2">Optimized Processing</h4>
                  <p className="text-sm text-gray-600">Efficient FHE computations</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocsPage
