import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
        <Link href="/" className="font-bold text-xl">
          Globelynks
        </Link>

        <div className="space-x-6 text-sm text-gray-600">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </nav>
  )
}
