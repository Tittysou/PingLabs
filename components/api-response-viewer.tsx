"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import type { ApiResponse } from "@/app/tester/page"
import { toast } from "sonner"

interface ApiResponseViewerProps {
  response: ApiResponse | null
  isLoading: boolean
}

export function ApiResponseViewer({ response, isLoading }: ApiResponseViewerProps) {
  const [activeTab, setActiveTab] = useState<"response" | "headers" | "raw">("response")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-400"
    if (status >= 400 && status < 500) return "text-yellow-400"
    if (status >= 500) return "text-red-400"
    return "text-gray-400"
  }

  const generateCurlCommand = () => {
    if (!response) return ""
    
    return `curl -X GET "https://api.example.com/endpoint" \\
  -H "Content-Type: application/json"`
  }

  if (isLoading) {
    return (
      <div className="glass-panel p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-400/20 border-t-blue-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Sending request...</p>
        </div>
      </div>
    )
  }

  if (!response) {
    return (
      <div className="glass-panel p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gray-600 rounded-full" />
          </div>
          <p className="text-gray-400">No response yet</p>
          <p className="text-gray-500 text-sm">Send a request to see the response</p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-panel p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Response</h2>
        <div className="flex items-center gap-4 text-sm">
          <span className={`font-mono ${getStatusColor(response.status)}`}>
            {response.status} {response.statusText}
          </span>
          <span className="text-gray-400">
            {response.responseTime}ms
          </span>
        </div>
      </div>

      <div className="flex border-b border-gray-700 mb-4">
        {[
          { id: "response", label: "Response" },
          { id: "headers", label: "Headers" },
          { id: "raw", label: "Raw" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-blue-400 text-blue-400"
                : "border-transparent text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === "response" && (
          <div className="h-full">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">JSON Response</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2))}
                className="text-gray-400 hover:text-gray-300"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="h-[calc(100%-2rem)] overflow-auto rounded border border-gray-700">
              <SyntaxHighlighter
                language="json"
                style={oneDark}
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  background: "rgba(15, 23, 42, 0.5)",
                  fontSize: "0.875rem",
                }}
              >
                {JSON.stringify(response.data, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {activeTab === "headers" && (
          <div className="h-full">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Response Headers</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(JSON.stringify(response.headers, null, 2))}
                className="text-gray-400 hover:text-gray-300"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="space-y-2 h-[calc(100%-2rem)] overflow-auto">
              {Object.entries(response.headers).map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 gap-4 p-3 bg-gray-900/50 rounded">
                  <span className="text-blue-400 font-mono text-sm">{key}</span>
                  <span className="col-span-2 text-gray-300 font-mono text-sm break-all">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "raw" && (
          <div className="h-full">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">cURL Command</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(generateCurlCommand())}
                className="text-gray-400 hover:text-gray-300"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="h-[calc(100%-2rem)] overflow-auto rounded border border-gray-700">
              <SyntaxHighlighter
                language="bash"
                style={oneDark}
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  background: "rgba(15, 23, 42, 0.5)",
                  fontSize: "0.875rem",
                }}
              >
                {generateCurlCommand()}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
