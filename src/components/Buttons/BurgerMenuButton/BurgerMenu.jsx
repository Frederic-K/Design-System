const BurgerMenu = ({ isOpen, onToggle, className = "" }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative h-6 w-8 focus:outline-none ${className}`}
      aria-label="Toggle menu"
    >
      {/* Top bar */}
      <span
        className={`absolute top-0 left-0 h-0.5 w-full bg-current transition-all duration-300 ease-in-out ${
          isOpen ? "top-3 rotate-45 transform" : "top-0 rotate-0 transform"
        }`}
      />

      {/* Middle bar */}
      <span
        className={`absolute top-3 left-0 h-0.5 w-full bg-current transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Bottom bar */}
      <span
        className={`absolute bottom-0 left-0 h-0.5 w-full bg-current transition-all duration-300 ease-in-out ${
          isOpen ? "bottom-3 -rotate-45 transform" : "bottom-0 rotate-0 transform"
        }`}
      />
    </button>
  )
}

export default BurgerMenu
