"use client"

import Link from "next/link"

export default function Navbar() {
  const categories = [
    "breaking",
    "politics",
    "business",
    "tech",
    "sports",
    "Entertainment",
    "Education",
    "Wedding",
    "International/World",
    "Health & Science",
    "News Bulletins/Alerts",
    "Interviews/Profiles",
    "Ceremonies",
  ]

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-black">
          Globelynks
        </Link>

        {/* Menu */}
        <div className="flex gap-4 flex-wrap ml-auto">
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="text-sm text-gray-700 hover:text-blue-600"
            >
              {cat}
            </Link>
          ))}
        </div>

      </div>
    </nav>
  )
}