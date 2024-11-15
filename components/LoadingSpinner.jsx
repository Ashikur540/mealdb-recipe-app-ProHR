import React from "react"

export default function LoadingSpinner({ size ="large"}) {

    return (
        <div className={`${size === "large" ? 'h-[400px]' : null} flex justify-center items-center`}>
            {/*<!-- Component: Colored amber base sized 1/2 spinner --> */}
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-live="polite"
                aria-busy="true"
                aria-labelledby="title-05 desc-05"
                className={` animate animate-spin ${size==="large" ? 'w-12 h-12':'w-5 h-5'}`}
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    className="stroke-slate-200"
                    strokeWidth="4"
                />
                <path
                    d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2"
                    className="stroke-amber-500"
                    strokeWidth="4"
                />
            </svg>
            {/*<!-- End Colored amber base sized 1/2 spinner --> */}
        </div>
    )
}
