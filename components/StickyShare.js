"use client"

import { useEffect, useState } from "react"

export default function StickyShare() {
  const [pageUrl, setPageUrl] = useState("")
  const [pageTitle, setPageTitle] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(encodeURIComponent(window.location.href))
      setPageTitle(encodeURIComponent(document.title))
    }
  }, [])

  if (!pageUrl) return null // Prevent rendering until ready

  return (
    <div className="fixed left-2 top-1/3 flex flex-col gap-3 z-50">
      
      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded flex items-center justify-center transition"
        title="Share on Facebook"
      >
        {/* SVG */}
      </a>

      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded flex items-center justify-center transition"
        title="Share on Twitter"
      >
        {/* SVG */}
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 hover:bg-green-700 text-white p-3 rounded flex items-center justify-center transition"
        title="Share on WhatsApp"
      >
        {/* SVG */}
      </a>

    </div>
  )
}