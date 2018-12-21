import React from "react"
import styled from "styled-components"

const ChevronSvg = ({ width, height }) => {
  const Icon = styled.span`
    position: relative;
    width: 0.5rem;
    height: 0.5rem;
    margin-left: 0.3125rem;
    fill: #a3a3a3;
    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
    svg {
      position: absolute;
      top: 1px;
      left: 0;
      width: ${width};
      height: ${height};
    }
  `
  return (
    <Icon>
      <svg viewBox="0 0 11.8 6.8">
        <path d="M5.8 6.7L0 .9.9 0l4.9 5 5-5 .9.9z" />
      </svg>
    </Icon>
  )
}

export default ChevronSvg

// ;<span
//   class="Icon__icon___QhhbM HeaderNavMenu__arrow___nOq6B"
//   data-icon="arrow-down"
//   role="img"
// >
//   <svg class="Icon__icon-svg___1t1lX" viewBox="0 0 11.8 6.8">
//     {/* <title>Arrow</title>
// <desc>Down pointing arrow</desc> */}
//   </svg>
// </span>
