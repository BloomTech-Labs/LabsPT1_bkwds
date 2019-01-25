import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { theme } from "../../styles/theme/variables"

const UserSvg = ({ height, width }) => {
  const Icon = styled.span`
    display: inline-block;
    cursor: pointer;
    height: ${height * 2}rem;
    width: ${width * 2}rem;
    text-align: center;

    svg {
      height: ${height}rem;
      width: ${width}rem;
      fill: ${theme.secondaryDark};
      margin-top: 11px;
    }
  `
  return (
    <Icon>
      <svg viewBox="0 0 19 21">
        <g fillRule="evenodd">
          <path d="M9.585 2a3.637 3.637 0 0 0-3.632 3.633 3.636 3.636 0 0 0 3.632 3.632 3.637 3.637 0 0 0 3.633-3.632A3.637 3.637 0 0 0 9.585 2m0 9.265a5.639 5.639 0 0 1-5.632-5.632A5.64 5.64 0 0 1 9.585 0a5.64 5.64 0 0 1 5.633 5.633 5.64 5.64 0 0 1-5.633 5.632" />
          <path d="M18.837 20.095H.334V15.91c0-2.737 3.478-5.424 3.874-5.721l1.2 1.599c-1.188.895-3.074 2.805-3.074 4.122v2.185h14.503V15.91c0-1.482-2.277-3.523-3.074-4.122l1.199-1.6c.396.298 3.875 2.985 3.875 5.722v4.185z" />
        </g>
      </svg>
    </Icon>
  )
}

UserSvg.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string
}

export default UserSvg
