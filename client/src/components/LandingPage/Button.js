import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { withRouter } from "react-router-dom"

import { scrollTo } from "../../utils"

const Button = styled.div`
  display: flex;
  margin: ${({ margin }) => (margin ? "2rem" : 0)} auto;
  align-items: center;
  justify-content: center;
  background: #f26a21;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 12px;
  box-shadow: 0 0.3125rem 0.0625rem 0 rgba(0, 0, 0, 0.25),
    0 0 0 0.0625rem rgba(255, 255, 255, 0.03),
    0 0.0625rem 2px 0 rgba(0, 0, 0, 0.75),
    0 0.0625rem 0.1875rem 0 rgba(0, 0, 0, 0.1);

  button {
    display: inline;
    margin: 0;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    text-decoration: none;
  }

  &:hover {
    background: #f9873b;
    transition: background 500ms;
  }

  h4 {
    margin: 0;
    color: white;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 1.5px;
  }
`

const ButtonCTA = ({ height, history, margin, text, to, width }) => {
  const navigate = () => (to === "features" ? scrollTo(to) : history.push(to))

  return (
    <Button height={height} margin={margin} width={width}>
      <button onClick={navigate}>
        <h4>{text}</h4>
      </button>
    </Button>
  )
}

ButtonCTA.defaultProps = {
  height: "50px",
  margin: true,
  width: "175px",
  text: "Learn more",
  to: "features"
}

ButtonCTA.propTypes = {
  height: PropTypes.string,
  history: PropTypes.object.isRequired,
  margin: PropTypes.bool,
  text: PropTypes.string,
  to: PropTypes.string,
  width: PropTypes.string
}

export default withRouter(ButtonCTA)
