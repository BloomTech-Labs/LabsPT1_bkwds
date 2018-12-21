import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { boxShadowMixin } from "../../theme/mixins"
import ChevronSvg from "../icons/ChevronSvg"

const DropdownStyles = styled.li`
  flex-direction: row;
  align-items: center;
  position: relative;

  width: 100%;
  pointer-events: auto;
  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;

  .dropdown {
    position: absolute;
    top: 100%;
    right: -0.625rem;
    left: -0.625rem;
    display: flex;
    padding: 0.625rem;
    padding-top: 0;
    overflow: hidden;
    width: 14rem;
  }

  .dropdown-content {
    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
    width: 100%;
  }

  .dropdown-content-visible {
    ${boxShadowMixin};
    transform: translateY(0);
  }

  .dropdown-content-hidden {
    visibility: hidden;
    transition: padding-left 0.15s ease-in, color 0.15s ease-in;
  }

  .dropdown:hover .dropdown-content-hidden {
    visibility: visible;
    transition-delay: 0s;
  }

  .dropdown-list {
    background: ${props => props.theme.white};
    box-shadow: inset 1px 5px 9px -6px #a3a3a3;
  }

  .dropdown-list-item {
    display: flex;
    align-items: center;
    padding: 0.625rem 1.25rem;
    color: #525252;
    font-size: 1rem;
    font-weight: 300;
    border-bottom: 1px solid #e6e6e6;
    transition: padding-left 0.15s ease-in, color 0.15s ease-in;
    &:hover {
      padding-left: 1.5rem;
      color: ${props => props.theme.primary};
    }
    &:last-child {
      background-color: ${props => props.theme.primary};
      color: ${props => props.theme.white};
      font-weight: 400;
    }
  }

  .new-icon {
    position: relative;
    top: -0.125rem;
    padding: 0 0.25rem;
    margin-left: 0.5rem;
    font-size: 0.6875rem;
    font-weight: 400;
    text-align: center;
    color: #526699;
    border-radius: 0.75rem;
    background-color: #d7ecf7;
  }

  .hover-button {
    color: ${props => props.theme.midGray};
    display: flex;
    padding: 0;
    &:hover {
      text-decoration: none;
      color: ${props => props.theme.primary};
    }

    /* Chevron Icon overrides: */
    span {
      margin-top: 0;
      margin-left: 0.275rem;
    }
  }
`
const Dropdown = props => {
  return (
    <DropdownStyles>
      <button className="hover-button">
        Account <ChevronSvg fill="#a3a3a3" />
      </button>

      <div className="dropdown">
        <div className="dropdown-content dropdown-content-hidden">
          <div className="dropdown-list">
            <Link to="/settings" className="dropdown-list-item">
              Settings
            </Link>
            <Link to="/invoices" className="dropdown-list-item">
              Invoices
              <div className="new-icon">NEW</div>
            </Link>
            <Link to="/billing" className="dropdown-list-item">
              Billing
            </Link>
            <Link to="/profile" className="dropdown-list-item">
              Your Profile
            </Link>
          </div>
        </div>
      </div>
    </DropdownStyles>
  )
}

export default Dropdown
