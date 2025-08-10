import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"

import ErrorBoundary from "./components/ErrorBoundary"

function App() {
  const [count, setCount] = useState(0)

  return (
    <ErrorBoundary
      title="Application Error"
      message="We're sorry, but something went wrong. Our team has been notified."
      showReload={true}
      showDetails={process.env.NODE_ENV === "development"}
      onError={(error, errorInfo) => {
        // Log to external service in production
        console.error("App Error:", error, errorInfo)
      }}
    >
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </ErrorBoundary>
  )
}

export default App
