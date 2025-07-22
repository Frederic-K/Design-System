const AnimatedBurgerMenu = ({ isOpen, onToggle, className = "" }) => {
  return (
    <button
      onClick={onToggle}
      className={`group relative h-8 w-8 focus:outline-none ${className}`}
      aria-label="Toggle menu"
    >
      <div className="absolute top-1/2 left-1/2 block w-6 -translate-x-1/2 -translate-y-1/2 transform">
        <span
          className={`absolute block h-0.5 w-6 transform bg-current transition duration-500 ease-in-out ${
            isOpen ? "rotate-45" : "-translate-y-1.5"
          }`}
        />
        <span
          className={`absolute block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`absolute block h-0.5 w-6 transform bg-current transition duration-500 ease-in-out ${
            isOpen ? "-rotate-45" : "translate-y-1.5"
          }`}
        />
      </div>
    </button>
  )
}

export default AnimatedBurgerMenu
