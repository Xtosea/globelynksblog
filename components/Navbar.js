"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

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
        <div className="max-w-7xl mx-auto flex justify-between">
          <span className="font-bold text-lg tracking-wide">
            GLOBELYNKS
          </span>
          <span>News & Entertainment</span>
        </div>
      </div>

      {/* 📰 Category Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex gap-6 px-6 py-3 overflow-x-auto">
          
          <Link
            href="/"
            className={`font-semibold ${
              pathname === "/"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-700"
            }`}
          >
            HOME
          </Link>

          {categories.map((cat) => {
            const slug = cat.toLowerCase().replace(/\s+/g, "-")
            const isActive = pathname === `/category/${slug}`

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