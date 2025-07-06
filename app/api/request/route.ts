import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { url, method, headers, body, bearerToken } = await request.json()

    // Build headers
    const requestHeaders: Record<string, string> = {}
    
    // Add bearer token if provided
    if (bearerToken) {
      requestHeaders.Authorization = `Bearer ${bearerToken}`
    }
    
    // Add custom headers
    headers.forEach(({ key, value }: { key: string; value: string }) => {
      if (key && value) {
        requestHeaders[key] = value
      }
    })

    // Add content-type for non-GET requests with body
    if (body && method !== "GET" && method !== "HEAD") {
      requestHeaders["Content-Type"] = requestHeaders["Content-Type"] || "application/json"
    }

    // Make the request
    const fetchOptions: RequestInit = {
      method,
      headers: requestHeaders,
    }

    // Add body for non-GET/HEAD requests
    if (body && method !== "GET" && method !== "HEAD") {
      fetchOptions.body = body
    }

    const response = await fetch(url, fetchOptions)
    const responseText = await response.text()
    
    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch {
      responseData = responseText
    }

    // Return the response
    return NextResponse.json(responseData, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Content-Type": "application/json",
        // Pass through some important headers
        ...(response.headers.get("content-type") && {
          "X-Original-Content-Type": response.headers.get("content-type")!
        }),
      },
    })
  } catch (error) {
    console.error("API request failed:", error)
    return NextResponse.json(
      { 
        error: "Request failed",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
