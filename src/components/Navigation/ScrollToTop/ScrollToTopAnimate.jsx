import { useState, useEffect, useRef } from "react"

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const tickingRef = useRef(false)

  useEffect(() => {
    // Use scrollY for readability; passive listener avoids blocking scrolling
    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true
        requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 300
          setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev))
          tickingRef.current = false
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    // Run once on mount in case user reloads mid-page
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    // Respect reduced motion when possible
    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches

    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Revenir en haut"
      // Tailwind styles: fixed FAB, subtle animation, focus ring
      className={`fixed right-6 bottom-6 z-50 rounded-full bg-blue-600 p-3 text-white shadow-lg transition-opacity transition-transform duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none ${isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  )
}

export default ScrollToTop
