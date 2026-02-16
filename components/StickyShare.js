"use client"

export default function StickyShare() {
  return (
    <div className="fixed left-2 top-1/3 flex flex-col gap-3 z-[200] pointer-events-auto">
      <a href="#" className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition">F</a>
      <a href="#" className="bg-sky-500 text-white px-3 py-2 rounded hover:bg-sky-600 transition">T</a>
      <a href="#" className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition">W</a>
    </div>
  )
}