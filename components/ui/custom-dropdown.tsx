"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Option {
  value: string
  label: string
  color?: string
}

interface CustomDropdownProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function CustomDropdown({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select...",
  className 
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(option => option.value === value)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET': return 'text-green-400 bg-green-400/10'
      case 'POST': return 'text-blue-400 bg-blue-400/10'
      case 'PUT': return 'text-yellow-400 bg-yellow-400/10'
      case 'DELETE': return 'text-red-400 bg-red-400/10'
      case 'PATCH': return 'text-purple-400 bg-purple-400/10'
      case 'HEAD': return 'text-gray-400 bg-gray-400/10'
      case 'OPTIONS': return 'text-cyan-400 bg-cyan-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-gray-700 bg-gray-950/50 px-3 py-1 text-sm text-white",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300",
          "hover:bg-gray-900/50 transition-colors"
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          {selectedOption ? (
            <span className={cn("px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap", getMethodColor(selectedOption.value))}>
              {selectedOption.label}
            </span>
          ) : (
            <span className="text-gray-400 truncate">{placeholder}</span>
          )}
        </div>
        <ChevronDown 
          className={cn(
            "h-4 w-4 text-gray-400 transition-transform duration-200 flex-shrink-0",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto",
              "rounded-md border border-gray-700 bg-gray-950 shadow-lg backdrop-blur-sm"
            )}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2 text-sm transition-colors",
                  "hover:bg-gray-800 focus:bg-gray-800 focus:outline-none",
                  value === option.value && "bg-gray-800"
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap", getMethodColor(option.value))}>
                    {option.label}
                  </span>
                </div>
                {value === option.value && (
                  <Check className="h-4 w-4 text-blue-400 flex-shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
