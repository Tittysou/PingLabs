"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Minus, Send, TestTube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CustomDropdown } from "@/components/ui/custom-dropdown"
import type { ApiRequest } from "@/app/tester/page"
import { toast } from "sonner"

interface ApiRequestBuilderProps {
  request: ApiRequest
  setRequest: (request: ApiRequest) => void
  onSubmit: () => void
  isLoading: boolean
}

const TEST_APIS = [
  {
    name: "JSONPlaceholder - Get Posts",
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
    headers: [],
    body: "",
    bearerToken: "",
  },
  {
    name: "JSONPlaceholder - Create Post",
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    headers: [{ key: "Content-Type", value: "application/json" }],
    body: JSON.stringify({
      title: "Test Post",
      body: "This is a test post from PingLab",
      userId: 1,
    }, null, 2),
    bearerToken: "",
  },
  {
    name: "Random User API",
    url: "https://randomuser.me/api/",
    method: "GET",
    headers: [],
    body: "",
    bearerToken: "",
  },
  {
    name: "Cat Facts API",
    url: "https://catfact.ninja/fact",
    method: "GET",
    headers: [],
    body: "",
    bearerToken: "",
  },
]

export function ApiRequestBuilder({ request, setRequest, onSubmit, isLoading }: ApiRequestBuilderProps) {
  const [showTestApis, setShowTestApis] = useState(false)

  const addHeader = () => {
    setRequest({
      ...request,
      headers: [...request.headers, { key: "", value: "" }],
    })
  }

  const removeHeader = (index: number) => {
    setRequest({
      ...request,
      headers: request.headers.filter((_, i) => i !== index),
    })
  }

  const updateHeader = (index: number, field: "key" | "value", value: string) => {
    const newHeaders = [...request.headers]
    newHeaders[index][field] = value
    setRequest({
      ...request,
      headers: newHeaders,
    })
  }

  const loadTestApi = (testApi: typeof TEST_APIS[0]) => {
    setRequest({
      url: testApi.url,
      method: testApi.method,
      headers: testApi.headers.length > 0 ? testApi.headers : [{ key: "", value: "" }],
      body: testApi.body,
      bearerToken: testApi.bearerToken,
    })
    setShowTestApis(false)
    toast.success(`Loaded ${testApi.name}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!request.url) {
      toast.error("Please enter a URL")
      return
    }
    onSubmit()
  }

  return (
    <div className="glass-panel p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Request Builder</h2>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowTestApis(!showTestApis)}
          className="flex items-center gap-2"
        >
          <TestTube className="h-4 w-4" />
          Try Example
        </Button>
      </div>

      {showTestApis && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6 glass-panel p-4 border border-blue-500/20"
        >
          <h3 className="text-sm font-medium mb-3 text-blue-400">Example APIs to try:</h3>
          <div className="grid gap-2">
            {TEST_APIS.map((api, index) => (
              <button
                key={index}
                onClick={() => loadTestApi(api)}
                className="text-left p-3 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
              >
                <div className="font-medium text-sm">{api.name}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {api.method} {api.url}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-3">
          <div className="w-32 flex-shrink-0">
            <CustomDropdown
              options={[
                { value: "GET", label: "GET" },
                { value: "POST", label: "POST" },
                { value: "PUT", label: "PUT" },
                { value: "DELETE", label: "DELETE" },
                { value: "PATCH", label: "PATCH" },
                { value: "HEAD", label: "HEAD" },
                { value: "OPTIONS", label: "OPTIONS" },
              ]}
              value={request.method}
              onChange={(value) => setRequest({ ...request, method: value })}
            />
          </div>
          <div className="flex-1">
            <Input
              placeholder="Enter API URL..."
              value={request.url}
              onChange={(e) => setRequest({ ...request, url: e.target.value })}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium mb-2">Bearer Token (Optional)</label>
          <Input
            placeholder="Enter bearer token..."
            value={request.bearerToken}
            onChange={(e) => setRequest({ ...request, bearerToken: e.target.value })}
            type="password"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Headers</label>
            <Button type="button" variant="ghost" size="sm" onClick={addHeader}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {request.headers.map((header, index) => (
              <div key={index} className="flex gap-2 items-center">
                <div className="flex-1">
                  <Input
                    placeholder="Header Key"
                    value={header.key}
                    onChange={(e) => updateHeader(index, "key", e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Header Value"
                    value={header.value}
                    onChange={(e) => updateHeader(index, "value", e.target.value)}
                    className="text-sm"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeHeader(index)}
                  className="text-red-400 hover:text-red-300 flex-shrink-0 p-2"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {request.method !== "GET" && request.method !== "HEAD" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium mb-2">Request Body (JSON)</label>
            <Textarea
              placeholder="Enter JSON body..."
              value={request.body}
              onChange={(e) => setRequest({ ...request, body: e.target.value })}
              className="min-h-[200px] font-mono text-sm"
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            type="submit"
            disabled={isLoading || !request.url}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Request
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  )
}
