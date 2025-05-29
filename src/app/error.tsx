// app/error.js
'use client'
import { useEffect } from 'react'

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Global error caught:', error)
  }, [error])

  return (
    <html>
      <body>
        <h2>Oops! An error occurred.</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Retry</button>
      </body>
    </html>
  )
}
