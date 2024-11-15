import React from "react"

export default function AlertBanner({ title, desc }) {
  return (
    <>
      <div
        className="flex rounded-lg items-start gap-4 mx-auto border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-500"
        role="alert"
        style={{ width: 'calc(100% - 100px)' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          role="graphics-symbol"
          aria-labelledby="title-07 desc-07"
        >
          <title id="title-07">Icon Alert</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <div>
          <h3 className="mb-2 font-semibold text-amber-600">
            {title}
          </h3>
          <p>
            {desc}
          </p>
        </div>
      </div>
    </>
  )
}
