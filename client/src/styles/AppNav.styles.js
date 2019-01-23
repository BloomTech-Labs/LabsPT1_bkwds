import styled from "styled-components"
import { boxShadowMixin, media } from "./theme/mixins"

export const NavStyles = styled.div`
  background: ${props => props.theme.white};
  min-height: ${props => props.theme.navHeight};

  /* relative positioning so that nav-links-cta 
     can position absolute with Nav as its parent */
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${boxShadowMixin};

  padding-left: 0.5rem;
  padding-right: 1.25rem;
  ${media.phone`padding-right: 0;`}

  .appnav-left {
    display: flex
  }

  .logo {
    color: ${props => props.theme.primary};
    font-weight: 700;
    font-size: 1.75rem;
    letter-spacing: -0.0275rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: 10px;
  }
  .hamburger-icon-wrapper {
    display: flex;
  }
  .hamburger-icon {
    display: flex;
    margin-right: 20px;
  }

  ul {
    display: flex;
    flex-direction: row;
  }

  li {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  a {
    display: flex;
    align-items: center;
    height: 3.125rem;
    padding-left: 8px;
    padding-right: 8px;
    color: ${props => props.theme.midGray};
    font-size: 1.0625rem;
    font-weight: 400;
    &:hover {
      color: ${props => props.theme.primary};
    }
  }

  button {
    cursor: pointer;
    border: none;
    &:hover {
      text-decoration: underline;
    }
    padding-top: 0;
    padding-bottom: 0;
  }

  ul.authenticated-links {
    li {
      padding-left: 14px;
      padding-right: 14px;
    }
  }

  .call-to-action {
    ${media.tablet`display: none !important;`}
  }

  /* Aha! This didn't take forever, fucking Bootstrap */
  .dropdown-menu {
    width: 102vw;
    right: 0;
    top: 0;
    left: 0;
    border-radius: 0;
    margin: 0.05rem 0 0;
    margin-left: -6px;
  }

  .mobile-links-wrapper {
    display: none;
    width: 100%;
    li.dropdown.nav-item {
      justify-content: flex-end !important;
    }

    ${media.phone`
      display: block;

      .mobile-dropdown-toggle {
        background: transparent;
      }
    `}
  }

  .appnav-right {
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    justify-content: flex-end;
  }

  .navlinks-wrapper {
    display: block;
    ${media.phone`display: none;`}
  }

  /* SHARED STYLES WITH DROPDOWN.STYLES.JS */
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
`
