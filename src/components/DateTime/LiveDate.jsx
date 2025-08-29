import { useEffect, useMemo, useRef, useState } from "react"

/**
 * LiveDate — locale-aware date display with daily updates
 *
 * Props
 * - locale?: string                 // e.g., "fr-FR"; defaults to browser locale
 * - timeZone?: string               // e.g., "Europe/Paris"; defaults to browser TZ
 * - dateStyle?: 'full'|'long'|'medium'|'short' (default: 'long')
 * - className?: string              // extra Tailwind classes for outer wrapper
 * - updateOnVisibilityChange?: boolean // if true, updates date when tab becomes visible (default: true)
 * - pauseWhenHidden?: boolean       // if true, pauses updates when tab is hidden (default: true)
 *
 * Notes
 * - Updates automatically at midnight in the specified timezone.
 * - Automatically pauses updates when tab is hidden to save battery/CPU.
 * - Includes error handling for invalid locales/timezones with fallback.
 * - Uses efficient timer management with proper cleanup.
 */
export default function LiveDate({
  locale,
  timeZone,
  dateStyle = "long",
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

  const [today, setToday] = useState(() => new Date())
  const timeoutRef = useRef(null)
  const intervalRef = useRef(null)
  const isVisibleRef = useRef(true) // Track tab visibility state

  // Performance optimization: pause updates when tab is not visible
  useEffect(() => {
    if (!pauseWhenHidden) return

    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden
      // Immediate update when tab becomes visible again
      if (!document.hidden && updateOnVisibilityChange) {
        setToday(new Date())
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [pauseWhenHidden, updateOnVisibilityChange])

  // Build a stable formatter whenever inputs change with error handling
  const formatter = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(resolvedLocale, {
        dateStyle,
        timeZone: resolvedTimeZone,
      })
    } catch (error) {
      console.warn("LiveDate: Invalid locale/timezone, falling back to defaults", error)
      // Fallback formatter with safe defaults
      return new Intl.DateTimeFormat("fr-FR", {
        dateStyle,
        timeZone: "Europe/Paris",
      })
    }
  }, [resolvedLocale, resolvedTimeZone, dateStyle])

  // Update the date at midnight with visibility-aware scheduling
  useEffect(() => {
    // Clear any existing timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)

    const scheduleNextUpdate = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)

      const msUntilMidnight = tomorrow.getTime() - now.getTime()

      timeoutRef.current = setTimeout(() => {
        // Only update if tab is visible or pause is disabled
        if (!pauseWhenHidden || isVisibleRef.current) {
          setToday(new Date())
        }

        // Schedule daily updates
        intervalRef.current = setInterval(
          () => {
            // Skip update if tab is hidden and pause is enabled
            if (pauseWhenHidden && !isVisibleRef.current) return
            setToday(new Date())
          },
          24 * 60 * 60 * 1000
        )
      }, msUntilMidnight)
    }

    scheduleNextUpdate()

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [pauseWhenHidden])

  // Format the current date with error handling
  const formattedDate = useMemo(() => {
    try {
      return formatter.format(today)
    } catch (error) {
      console.warn("LiveDate: Formatting error", error)
      // Fallback to basic locale string
      return today.toLocaleDateString("fr-FR")
    }
  }, [formatter, today])

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <time
        className="text-xl leading-tight font-semibold"
        dateTime={today.toISOString().split("T")[0]}
        title={`${resolvedLocale} • ${resolvedTimeZone}`}
      >
        {formattedDate}
      </time>
    </div>
  )
}

/**
 * Usage examples
 *
 * <LiveDate />                                     // auto locale & TZ from browser
 * <LiveDate dateStyle="full" />                    // full date format
 * <LiveDate locale="en-US" timeZone="America/New_York" />
 * <LiveDate pauseWhenHidden={false} />             // always active, never pauses
 * <LiveDate updateOnVisibilityChange={false} />    // no immediate update on tab focus
 */
