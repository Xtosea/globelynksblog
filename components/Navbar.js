"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const toggleDark = () => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark")
    }
  }

  const categories = [
    "breaking",
    "politics",
    "business",
    "tech",
    "sports",
    "entertainment",
    "education",
    "international",
    "health",
    "interview",
    "news bulletins",
    "wedding",
    "ceremonies",
  ]

  return (
    <>
      {/* 🔴 Top Red Header */}
      <div className="bg-red-700 text-white text-sm py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-bold text-lg tracking-wide">GLOBELYNKS</span>

          {/* Search, Dark Mode & Hamburger */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-1 rounded text-sm text-black"
            />
            <button
              onClick={toggleDark}
              className="bg-gray-200 text-black px-3 py-1 rounded"
            >
              🌙
            </button>
            <button
              className="md:hidden text-2xl px-3 py-1"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* 📰 Category Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div
          className={`max-w-7xl mx-auto flex-col md:flex md:flex-row gap-6 px-6 py-3 overflow-x-auto ${
            open ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Home Link */}
          <Link
            href="/"
            className={`font-semibold ${
              router.pathname === "/" ? "text-red-600 border-b-2 border-red-600" : "text-gray-700"
            }`}
          >
            HOME
          </Link>

          {/* Category Links */}
          {categories.map((cat) => {
            const slug = cat.toLowerCase().replace(/\s+/g, "-")
            const isActive = router.pathname === `/category/${slug}`
            return (
              <Link
                key={slug}
                href={`/category/${slug}`}
                className={`uppercase text-sm font-semibold pb-1 transition ${
                  isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                {cat}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}