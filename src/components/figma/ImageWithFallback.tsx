'use client';
import React, { useState, useCallback, useRef } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

// Multiple fallback images for better reliability - fresh working URLs plus non-Unsplash fallbacks
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGFpciUyMHRyZWF0bWVudCUyMGRlcm1hdG9sb2d5fGVufDF8fHx8MTc1Nzg2MTc5MHww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1666886573452-9dc8ce8f5cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xpbmljJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NTc3NzI2NTJ8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1682663947127-ac9d59d7f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTc4NjE3OTd8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1666886573230-2b730505f298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcHJvZmVzc2lvbmFsJTIwZG9jdG9yfGVufDF8fHx8MTc1Nzg2MTgwMXww&ixlib=rb-4.1.0&q=80&w=400',
  // Non-Unsplash fallback - solid color placeholder
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjY2Ij7Xqteq157XldeV14nXlCDXkNek16jXldeZPC90ZXh0Pjwvc3ZnPg=='
]

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)
  const [currentFallbackIndex, setCurrentFallbackIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(true)
  const retryCountRef = useRef(0)
  const maxRetries = 3

  const handleError = useCallback(() => {
    const { src } = props
    if (process.env.NODE_ENV === 'development') {
      console.warn('Image failed to load:', src?.substring(0, 100) + '...')
    }
    
    // If we haven't tried all fallbacks yet
    if (currentFallbackIndex < FALLBACK_IMAGES.length - 1) {
      const nextIndex = currentFallbackIndex + 1
      setCurrentFallbackIndex(nextIndex)
      if (process.env.NODE_ENV === 'development') {
        console.log(`Trying fallback image ${nextIndex + 1}/${FALLBACK_IMAGES.length}:`, FALLBACK_IMAGES[nextIndex].substring(0, 50) + '...')
      }
      setIsLoading(true)
    } else if (retryCountRef.current < maxRetries && src) {
      // Try the original URL again with a small delay
      retryCountRef.current += 1
      if (process.env.NODE_ENV === 'development') {
        console.log(`Retrying original image (attempt ${retryCountRef.current}/${maxRetries})...`)
      }
      setCurrentFallbackIndex(-1)
      setIsLoading(true)
      
      // Add a small delay before retry
      setTimeout(() => {
        // Force re-render by updating a state
        setIsLoading(false)
        setTimeout(() => setIsLoading(true), 10)
      }, 1000 * retryCountRef.current) // Progressive delay
    } else {
      // All fallbacks and retries failed, show error placeholder
      if (process.env.NODE_ENV === 'development') {
        console.error('All fallback images failed, showing error placeholder')
      }
      setDidError(true)
      setIsLoading(false)
    }
  }, [currentFallbackIndex, props.src, maxRetries])

  const handleLoad = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Image loaded successfully:', getCurrentSrc().substring(0, 50) + '...')
    }
    setDidError(false)
    setIsLoading(false)
    retryCountRef.current = 0 // Reset retry count on successful load
  }, [])

  const { src, alt, style, className, loading = "lazy", ...rest } = props

  // Reset error state when src changes
  React.useEffect(() => {
    setDidError(false)
    setCurrentFallbackIndex(-1)
    setIsLoading(true)
    retryCountRef.current = 0
  }, [src])

  // Get current source (original or fallback)
  const getCurrentSrc = useCallback(() => {
    if (currentFallbackIndex >= 0 && currentFallbackIndex < FALLBACK_IMAGES.length) {
      return FALLBACK_IMAGES[currentFallbackIndex]
    }
    return src
  }, [currentFallbackIndex, src])

  const actualSrc = getCurrentSrc()

  // Loading state
  if (isLoading && !didError) {
    return (
      <div
        className={`inline-block bg-gray-50 text-center align-middle ${className ?? ''}`}
        style={style}
        {...rest}
      >
        <div className="flex items-center justify-center w-full h-full">
          <div className="animate-pulse bg-gray-200 w-full h-full flex items-center justify-center rounded">
            <div className="text-gray-400 text-xs opacity-50">טוען תמונה...</div>
          </div>
          <img 
            src={actualSrc} 
            alt={alt} 
            className="opacity-0 absolute inset-0 w-full h-full object-cover" 
            onError={handleError} 
            onLoad={handleLoad}
            loading={loading}
          />
        </div>
      </div>
    )
  }

  // Error state
  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle border border-gray-200 ${className ?? ''}`}
        style={style}
      >
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
          <img src={ERROR_IMG_SRC} alt="Error loading image" className="mb-2 opacity-60" />
          <div className="text-xs text-gray-500 text-center">
            <div>שגיאה בטעינת התמונה</div>
            {src && (
              <div className="mt-1 font-mono text-xs opacity-70 truncate max-w-full" title={src}>
                {src.substring(0, 30)}...
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Success state
  return (
    <img 
      src={actualSrc} 
      alt={alt} 
      className={className} 
      style={style} 
      loading={loading}
      onError={handleError} 
      onLoad={handleLoad}
      {...rest} 
    />
  )
}
