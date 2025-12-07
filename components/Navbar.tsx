'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Shield, Lock, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Generate', href: '/generate' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Docs', href: '/docs' },
  ]

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CipherMeme
              </span>
              <span className="text-xs text-muted-foreground">Encrypted Meme Generator</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 border border-purple-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="ml-4 flex items-center space-x-2">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                <Lock className="h-4 w-4 inline mr-2" />
                Connect Wallet
              </button>
              <button className="p-2 rounded-lg border hover:bg-gray-50">
                <Sparkles className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-3 rounded-lg font-medium ${
                    pathname === item.href
                      ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button className="mt-4 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium">
                <Lock className="h-4 w-4 inline mr-2" />
                Connect Wallet
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
