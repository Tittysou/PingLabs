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
      <div className="h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              Test APIs
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Instantly
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Built for Speed & Focus
              <br />
              Professional API testing made simple and beautiful
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Link href="/tester">
                <Button size="lg" className="group">
                  Try it now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button variant="secondary" size="lg" className="group" onClick={scrollToDemo}>
                <Play className="mr-2 h-4 w-4" />
                See how it works
              </Button>
            </motion.div>
          </motion.div>
        </div>
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
              We've prepared some example APIs for you to test. Click "Try it now" and then "Try Example" to get started instantly.
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
