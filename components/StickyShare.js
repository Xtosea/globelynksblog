"use client"

import { useState, useEffect } from "react"

export default function StickyShare() {
  const [url, setUrl] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href)  // get current page URL
    }
  }, [])

  return (
    <div className="sticky-share fixed left-2 top-1/3 flex flex-col gap-3 z-[200]">
      {/* Facebook Share */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-3 py-2 rounded"
      >
        F
      </a>

      {/* Twitter Share */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-sky-500 text-white px-3 py-2 rounded"
      >
        T
      </a>

      {/* WhatsApp Share */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-white px-3 py-2 rounded"
      >
        W
      </a>
    </div>
  )
}