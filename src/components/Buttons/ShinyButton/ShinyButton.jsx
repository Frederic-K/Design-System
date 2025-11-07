// ShinyButton.jsx
// Simple glossy CTA button using Tailwind v4 + pseudo-elements
// Props:
// - label: button label
// - type: "button" | "submit" | "reset" (default: "button")
// - onClick: click handler
// - className: extra Tailwind or custom classes
// - disabled: boolean

export function ShinyButton({ label, type = "button", onClick, className = "", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-white/25 bg-slate-800 px-5 py-3 text-sm font-semibold text-white uppercase transition before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] before:opacity-0 before:transition-opacity before:duration-300 before:ease-linear before:content-[''] after:absolute after:top-[-40px] after:left-0 after:h-[160px] after:w-[60px] after:translate-x-[-140%] after:rotate-[35deg] after:transform after:bg-white after:opacity-20 after:transition-transform after:duration-[550ms] after:[transition-timing-function:cubic-bezier(0.19,1,0.22,1)] after:[will-change:transform] after:content-[''] hover:bg-slate-900 hover:before:opacity-100 hover:after:translate-x-[220%] focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:outline-none active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span className="relative z-[1]">{label}</span>
    </button>
  )
}
