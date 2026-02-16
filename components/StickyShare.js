"use client"

export default function StickyShare() {
  // Replace with your actual page URL
  const pageUrl = encodeURIComponent(window?.location?.href || "https://yourwebsite.com")
  const pageTitle = encodeURIComponent(document?.title || "Check this out!")

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
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12.07C22 6.49 17.52 2 12 2S2 6.49 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22C18.34 21.2 22 17.07 22 12.07z"/>
        </svg>
      </a>

      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded flex items-center justify-center transition"
        title="Share on Twitter"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.56c-.89.39-1.84.65-2.84.77a4.92 4.92 0 0 0 2.15-2.71 9.85 9.85 0 0 1-3.13 1.2A4.92 4.92 0 0 0 16.62 3c-2.72 0-4.92 2.2-4.92 4.92 0 .39.04.77.13 1.14C7.72 8.96 4.1 6.91 1.67 3.91a4.92 4.92 0 0 0-.66 2.48c0 1.71.87 3.22 2.19 4.1a4.9 4.9 0 0 1-2.23-.62v.06c0 2.39 1.7 4.38 3.95 4.83a4.93 4.93 0 0 1-2.22.08c.63 1.97 2.46 3.41 4.63 3.45A9.87 9.87 0 0 1 0 19.54a13.93 13.93 0 0 0 7.55 2.21c9.05 0 14-7.5 14-14v-.64c.96-.7 1.79-1.56 2.45-2.55z"/>
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 hover:bg-green-700 text-white p-3 rounded flex items-center justify-center transition"
        title="Share on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.671.149-.198.297-.768.967-.941 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.654-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.074-.149-.671-1.611-.918-2.207-.242-.579-.487-.5-.671-.51l-.571-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347zM12.004 2c-5.514 0-9.996 4.482-9.996 9.996 0 1.763.464 3.394 1.271 4.797L2 22l5.393-1.374a9.962 9.962 0 0 0 4.611 1.193c5.514 0 9.996-4.482 9.996-9.996S17.518 2 12.004 2z"/>
        </svg>
      </a>
    </div>
  )
}