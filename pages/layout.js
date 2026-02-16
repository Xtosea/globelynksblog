// app/layout.js (remove "use client")
import "../styles/globals.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export const metadata = {
  title: "Globelynks News And Entertainment",
  description: "News & Articles",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black transition-colors duration-300 dark:bg-gray-900 dark:text-white">
        <Navbar />   {/* Client component inside server layout is fine */}
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}