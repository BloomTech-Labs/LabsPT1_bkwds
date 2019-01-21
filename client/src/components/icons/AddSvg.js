import React from "react"

const AddSvg = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={props.width}
      height={props.height}
      viewBox="0 0 42 42"
    >
      <polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22 " />
      <g />
    </svg>
  )
}

export default AddSvg
