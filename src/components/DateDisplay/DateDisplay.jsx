import { useState, useEffect } from "react"

export default function DateDisplay({ className = "" }) {
  const [date, setDate] = useState("")

  useEffect(() => {
    let intervalId = null

    const updateDate = () => {
      const today = new Date()
      const userLocale = navigator.language || "en-US"

      const formattedDate = today.toLocaleDateString(userLocale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })

      setDate(formattedDate)
    }

    updateDate() // Initial update

    // Update at midnight
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const msUntilMidnight = tomorrow.getTime() - now.getTime()

    const timeoutId = setTimeout(() => {
      updateDate()
      // Then daily updates
      intervalId = setInterval(updateDate, 24 * 60 * 60 * 1000)
    }, msUntilMidnight)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [])

  return (
    <div className={`${className}`}>
      <p className="whitespace-nowrap">{date}</p>
    </div>
  )
}
