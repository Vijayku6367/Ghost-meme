import { Github, Twitter, MessageSquare, Zap } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CipherMeme
              </span>
            </div>
            <p className="text-sm text-gray-600">
              First encrypted meme generator powered by FHE. 
              Create, share, and analyze memes without exposing data.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/generate" className="text-gray-600 hover:text-gray-900">Generator</Link></li>
              <li><Link href="/gallery" className="text-gray-600 hover:text-gray-900">Gallery</Link></li>
              <li><Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link></li>
              <li><Link href="/docs" className="text-gray-600 hover:text-gray-900">API Docs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Community</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © 2024 CipherMeme. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Powered by</span>
              <div className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border">
                <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Zama FHEVM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
