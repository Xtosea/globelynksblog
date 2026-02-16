"use client"

import { useEffect, useState } from "react"
import { Facebook, Twitter, Whatsapp } from "lucide-react"

export default function StickyShare() {
  const [url, setUrl] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href)
    }
  }, [])

  const buttons = [
    {
      name: "Facebook",
      color: "bg-blue-600 hover:bg-blue-700",
      icon: <Facebook size={20} />,
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Twitter",
      color: "bg-sky-500 hover:bg-sky-600",
      icon: <Twitter size={20} />,
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    {
      name: "WhatsApp",
      color: "bg-green-600 hover:bg-green-700",
      icon: <Whatsapp size={20} />,
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
    },
  ]

  return (
    <div className="fixed left-2 top-1/3 flex flex-col gap-3 z-[250]"> {/* higher z-index */}
      {buttons.map((btn) => (
        <a
          key={btn.name}
          href={btn.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-10 h-10 rounded-full text-white transition-transform transform hover:scale-110 shadow-lg ${btn.color}`}
          title={`Share on ${btn.name}`}
        >
          {btn.icon}
        </a>
      ))}
    </div>
  )
}