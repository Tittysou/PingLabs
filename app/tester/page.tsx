"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ApiRequestBuilder } from "@/components/api-request-builder"
import { ApiResponseViewer } from "@/components/api-response-viewer"

export interface ApiRequest {
  url: string
  method: string
  headers: { key: string; value: string }[]
  body: string
  bearerToken: string
}

export interface ApiResponse {
  status: number
  statusText: string
  data: any
  headers: Record<string, string>
  responseTime: number
}

export default function TesterPage() {
  const [request, setRequest] = useState<ApiRequest>({
    url: "",
    method: "GET",
    headers: [{ key: "", value: "" }],
    body: "",
    bearerToken: "",
  })
  
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!request.url) return
    
    setIsLoading(true)
    const startTime = Date.now()
    
    try {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })
      
      const responseTime = Date.now() - startTime
      const data = await response.json()
      
      setResponse({
        status: response.status,
        statusText: response.statusText,
        data: data,
        headers: Object.fromEntries(response.headers.entries()),
        responseTime,
      })
    } catch (error) {
      console.error("Request failed:", error)
      setResponse({
        status: 0,
        statusText: "Network Error",
        data: { error: "Failed to make request" },
        headers: {},
        responseTime: Date.now() - startTime,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">API Tester</h1>
          <p className="text-gray-400">Test any API endpoint with ease</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ApiRequestBuilder
              request={request}
              setRequest={setRequest}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ApiResponseViewer
              response={response}
              isLoading={isLoading}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
