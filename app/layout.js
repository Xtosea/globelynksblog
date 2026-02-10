import "../styles/globals.css"

export const metadata = {
  title: "Globelynks Blog",
  description: "News & Articles",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}