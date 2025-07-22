import { useState } from "react"
import BurgerMenu from "../BurgerMenu/BurgerMenu"

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="relative">
      {/* Burger Menu Button */}
      <div className="flex items-center justify-between p-4">
        <div className="text-xl font-bold">Logo</div>
        <BurgerMenu
          isOpen={isMenuOpen}
          onToggle={toggleMenu}
          className="text-gray-800 hover:text-gray-600"
        />
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <div className="text-xl font-bold">Menu</div>
          <BurgerMenu isOpen={isMenuOpen} onToggle={toggleMenu} className="text-gray-800" />
        </div>

        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <a href="#home" className="block py-2 text-lg">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="block py-2 text-lg">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="block py-2 text-lg">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="block py-2 text-lg">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
