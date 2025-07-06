import { useEffect, useState } from "react"
import ScrollToSection from "./ScrollToSection"

const NavBarHeader = ({ links, className }) => {
  //////////////////////////////////////
  // NOTE: The following state and effect are for visual enhancement only.
  // They create a scroll-based appearance change for the navigation bar.
  // This does not affect the core functionality of ScrollToSection.
  // You can safely remove this if you don't need the visual effect.
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  //////////////////////////////////////

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        // Add background color and shadow when the navigation bar is scrolled.
        isScrolled ? "bg-white/95 shadow-lg backdrop-blur-sm" : "bg-transparent"
      } ${className}`}
    >
      <nav className="container-max section-padding py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">Your Logo</div>

          <div className="hidden space-x-8 md:flex">
            {links.map((link) => (
              <ScrollToSection key={link.id} sectionId={link.id}>
                <span className="hover:text-mauve-600 text-gray-600 transition-colors duration-200">
                  {link.text}
                </span>
              </ScrollToSection>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavBarHeader
