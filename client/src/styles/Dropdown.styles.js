import styled from "styled-components"

import { boxShadowMixin, media } from "./theme/mixins"

export const DropdownStyles = styled.div`
  /* BOOTSTRAP OVERRIDES: */
  margin-right: 0.75rem;

  .dropdown {
      ${media.phone`display: none !important;`}

      width: 240px;
      a:hover,
      button:hover {
        text-decoration: none;
      }

    .navbar-toggle {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      height: 50px;
      padding: 0;
    }

      /* dropdown button AND nested dropdown items styles */
      button {
        background-color: transparent;
        color: ${props => props.theme.midGray};
        &:hover {
          color: ${props => props.theme.primary};
        }
      }


    .dropdown-menu {
      width: 75%;
      /* background: tomato !important; */
    }

    /* DROPDOWN HEADER BUTTON STYLES */
    & > button {
      display: flex;
      flex: 1 100%;
    }

    & > div {
      left: 64px !important;
      margin: 0;
      padding: 0;
      ${boxShadowMixin}
      border: 0;
      border-radius: 0;
    }

    /* DROPDOWN LIST ITEM STYLES */
    button.dropdown-item {
      margin: 0;
      padding: 0;
      a {
        transition: padding-left 0.15s ease-in, color 0.15s ease-in;
        height: auto;
        padding: 9px 20px;
        font-size: 1rem;
        font-weight: 300;

        &:hover {
          padding-left: 1.5rem;
        }
        &:last-child {
          /* background-color: ${props => props.theme.primary};
          color: ${props => props.theme.white};
          font-weight: 400; */
        }
      }
    }

    .dropdown-divider {
      margin: 0;
    }
  }
`
