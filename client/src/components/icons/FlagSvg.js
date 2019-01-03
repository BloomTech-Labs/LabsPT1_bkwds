import React from "react"

const FlagSvg = ({ height = "32px", width = "32px", fill }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="icon-16-flag" fill={fill}>
          <path
            d="M9,9.5 L9,29 L10,29 L10,14.5714286 L23,9 L9,3 L9,9.5 L9,9.5 Z M10,4.5 L10,13.5 L20.5,9 L10,4.5 L10,4.5 Z"
            id="flag"
          />
        </g>
      </g>
    </svg>
  )
}

export default FlagSvg
