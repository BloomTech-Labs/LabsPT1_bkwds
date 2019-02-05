import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { media } from "../styles/theme/mixins"

const MobileMapPanelStyles = styled.div`
  .mobile-trip-panel {
    display: none;
  }

  ${media.tablet`
    .mobile-trip-panel {
      display: block;
    }

    .mobile-panel {
      position: absolute;
      z-index: 6;
      display: flex;
      flex-direction: column;
      width: 50px;
      height: 100vh;
      overflow: hidden;
      background-color: ${props => props.theme.offWhite};
      box-shadow: 2px 2px 2px rgba(0,0,0,0.15);

      button {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0;
        margin: 0;
      }
      i {
        font-size: 1.5rem;
        color: ${props => props.theme.midGray};
      }

    }
  `}

  .btn-neutral {
    &:focus {
      background-color: ${props => props.theme.offWhite};
      border-color: ${props => props.theme.offWhite};
      color: midGray;
    }
  }

  .active-button {
    background-color: ${props => props.theme.primary};
    border-color: ${props => props.theme.primary};
    color: white;
    i {
      font-size: 1.5rem;
      color: white;
    }
    &:hover,
    &:focus {
      background-color: ${props => props.theme.primary};
      border-color: ${props => props.theme.primary};
      color: white;
    }
  }

  ${media.tablet`
    .hide-mobile {
      display: none;
    }
    #plus-icon {
      z-index: 1;
      bottom: 255px;
    }
  `}
`

const MobileMapPanel = ({ children }) => (
  <MobileMapPanelStyles>
    <div className="mobile-trip-panel">{children}</div>
  </MobileMapPanelStyles>
)

MobileMapPanel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
}

export default MobileMapPanel
