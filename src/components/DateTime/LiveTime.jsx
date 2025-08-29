import { useEffect, useMemo, useRef, useState } from "react"
import { Clock } from "lucide-react"

/**
 * LiveTime — locale-aware, 24h clock with realtime updates
 *
 * Props
 * - locale?: string                 // e.g., "fr-FR"; defaults to browser locale
 * - timeZone?: string               // e.g., "Europe/Paris"; defaults to browser TZ
 * - timeStyle?: 'short'|'medium'|'long'|'full'     (default: 'medium')
 * - showSeconds?: boolean           // if true, updates every second; default false (per-minute)
 * - className?: string              // extra Tailwind classes for outer wrapper
 * - updateOnVisibilityChange?: boolean // if true, updates time when tab becomes visible (default: true)
 * - pauseWhenHidden?: boolean       // if true, pauses updates when tab is hidden (default: true)
 *
 * Notes
 * - Forces 24h display using hourCycle:'h23' and hour12:false.
 * - Renders an accessible <time> element with ISO datetime in @dateTime.
 * - Automatically pauses updates when tab is hidden to save battery/CPU.
 * - Includes error handling for invalid locales/timezones with fallback.
 * - Tailwind v4 utility classes only; no custom CSS needed.
 */
export default function LiveTime({
  locale,
  timeZone,
  timeStyle = "medium",
  showSeconds = false,
  className = "",
  updateOnVisibilityChange = true,
  pauseWhenHidden = true,
}) {
  // Detect sensible defaults from the runtime environment
  const resolvedLocale = useMemo(() => locale || navigator.language || "fr-FR", [locale])
  const resolvedTimeZone = useMemo(
    () => timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Paris",
    [timeZone]
  )

  const [now, setNow] = useState(() => new Date())
  const timerRef = useRef(null)
  const isVisibleRef = useRef(true) // Track tab visibility state

  // Performance optimization: pause updates when tab is not visible
  useEffect(() => {
    if (!pauseWhenHidden) return

    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden
      // Immediate update when tab becomes visible again
      if (!document.hidden && updateOnVisibilityChange) {
        setNow(new Date())
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [pauseWhenHidden, updateOnVisibilityChange])

  // Build a stable formatter whenever inputs change with error handling
  const formatter = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(resolvedLocale, {
        timeStyle,
        timeZone: resolvedTimeZone,
        // Force 24h even for locales using 12h by default
        hourCycle: "h23",
        hour12: false,
        // Show seconds only if requested
        second: showSeconds ? "2-digit" : undefined,
      })
    } catch (error) {
      console.warn("LiveTime: Invalid locale/timezone, falling back to defaults", error)
      // Fallback formatter with safe defaults
      return new Intl.DateTimeFormat("fr-FR", {
        timeStyle,
        timeZone: "Europe/Paris",
        hourCycle: "h23",
        hour12: false,
        second: showSeconds ? "2-digit" : undefined,
      })
    }
  }, [resolvedLocale, resolvedTimeZone, timeStyle, showSeconds])

  // Efficient realtime updates with visibility-aware pausing
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) clearInterval(timerRef.current)

    const intervalMs = showSeconds ? 1000 : 60_000 // per-second or per-minute

    // Align the first tick to the next exact boundary for smoother updates
    const alignAndStart = () => {
      const now = new Date()
      const ms = showSeconds ? 1000 : 60_000
      const delay = ms - (now.getTime() % ms)

      const timeoutId = setTimeout(() => {
        setNow(new Date())
        timerRef.current = setInterval(() => {
          // Skip update if tab is hidden and pause is enabled
          if (pauseWhenHidden && !isVisibleRef.current) return
          setNow(new Date())
        }, intervalMs)
      }, delay)

      return () => clearTimeout(timeoutId)
    }

    const cleanupAlign = alignAndStart()
    return () => {
      cleanupAlign()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [showSeconds, pauseWhenHidden])

  // Format the current time with error handling
  const formattedTime = useMemo(() => {
    try {
      return formatter.format(now)
    } catch (error) {
      console.warn("LiveTime: Formatting error", error)
      // Fallback to basic locale string
      return now.toLocaleTimeString("fr-FR", { hour12: false })
    }
  }, [formatter, now])

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-live="polite" aria-atomic="true">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl shadow-inner ring-1 ring-black/5">
        <Clock className="h-5 w-5" aria-hidden="true" />
      </div>

      <time
        className="text-xl leading-tight font-semibold"
        dateTime={now.toISOString()}
        title={`${resolvedLocale} • ${resolvedTimeZone}`}
      >
        {formattedTime}
      </time>
    </div>
  )
}

/**
 * Usage examples
 *
 * <LiveTime />                                     // auto locale & TZ from browser
 * <LiveTime showSeconds />                         // per-second updates
 * <LiveTime timeStyle="short" />                   // short time format
 * <LiveTime locale="en-US" timeZone="America/New_York" />
 * <LiveTime pauseWhenHidden={false} />             // always active, never pauses
 * <LiveTime updateOnVisibilityChange={false} />    // no immediate update on tab focus
 */
