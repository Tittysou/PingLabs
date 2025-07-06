"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const scrollToDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Code Snippets */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-20 left-10 bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 backdrop-blur-sm"
        >
          <code className="text-green-400 text-sm font-mono">
            GET /api/users
            <br />
            <span className="text-gray-500">200 OK</span>
          </code>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 2, delay: 0.7 }}
          className="absolute top-40 right-20 bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 backdrop-blur-sm"
        >
          <code className="text-blue-400 text-sm font-mono">
            POST /api/data
            <br />
            <span className="text-gray-500">201 Created</span>
          </code>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 2, delay: 0.9 }}
          className="absolute bottom-40 left-20 bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 backdrop-blur-sm"
        >
          <code className="text-purple-400 text-sm font-mono">
            PUT /api/update
            <br />
            <span className="text-gray-500">204 No Content</span>
          </code>
        </motion.div>
      </div>
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                Now Available
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                  <span className="block text-white">API Testing</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Redefined
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Lightning-fast API testing with a beautiful interface.
                <br />
                <span className="text-gray-400">No setup required. Just test.</span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
              >
                <Link href="/tester">
                  <Button 
                    size="lg" 
                    className="group bg-white text-black hover:bg-gray-100 font-semibold px-8 py-3 text-lg h-auto"
                  >
                    Start Testing
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={scrollToDemo}
                  className="group border border-gray-700 hover:border-gray-600 px-8 py-3 text-lg h-auto"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">0ms</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Setup Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">∞</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Requests</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Free</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400"
        >
          <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={scrollToDemo}>
            <span className="text-sm font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div id="demo-section" className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 text-center shadow-lg">
              <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">Test any API endpoint in seconds with our streamlined interface</p>
            </div>
            
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 text-center shadow-lg">
              <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Play className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Beautiful UI</h3>
              <p className="text-gray-400 text-sm">Dark theme optimized for focus with syntax highlighting</p>
            </div>
            
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 text-center shadow-lg">
              <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Setup</h3>
              <p className="text-gray-400 text-sm">Start testing immediately - no accounts or downloads required</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Try it out with example APIs</h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              We&apos;ve prepared some example APIs for you to test. Click &quot;Try it now&quot; and then &quot;Try Example&quot; to get started instantly.
            </p>
            
            <div className="grid gap-4 max-w-3xl mx-auto">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 rounded text-xs font-medium text-green-400 bg-green-400/10">GET</span>
                  <span className="font-mono text-sm text-gray-300">https://jsonplaceholder.typicode.com/posts</span>
                </div>
                <p className="text-gray-400 text-sm">Fetch sample blog posts data</p>
              </div>
              
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 rounded text-xs font-medium text-blue-400 bg-blue-400/10">POST</span>
                  <span className="font-mono text-sm text-gray-300">https://jsonplaceholder.typicode.com/posts</span>
                </div>
                <p className="text-gray-400 text-sm">Create a new post with JSON data</p>
              </div>
              
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 rounded text-xs font-medium text-green-400 bg-green-400/10">GET</span>
                  <span className="font-mono text-sm text-gray-300">https://catfact.ninja/fact</span>
                </div>
                <p className="text-gray-400 text-sm">Get a random cat fact</p>
              </div>
            </div>

            <div className="mt-12">
              <Link href="/tester">
                <Button size="lg" className="group">
                  Start Testing APIs
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
