import React from "react"
import styled from "styled-components"

const ChevronSvg = ({
  width = "1rem",
  height = "1rem",
  fill = "currentColor"
}) => {
  const Icon = styled.span`
    position: relative;
    display: inline-block;
    vertical-align: middle;
    pointer-events: none;

    align-self: center;
    width: ${width};
    height: ${height};
    margin-top: 0.25rem;
    margin-left: 0.375rem;
    fill: ${fill};

    svg {
      position: absolute;
      top: 1.5px;
      left: 1px;
      width: auto;
      height: 100%;
    }
  `

  return (
    <Icon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        <path fill="none" d="M0 0h24v24H0V0z" />
      </svg>
    </Icon>
  )
}

export default ChevronSvg
