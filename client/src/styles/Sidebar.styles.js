import styled from "styled-components"
import { media } from "../styles/theme/mixins"

export const SidebarStyles = styled.div`
  position: absolute;
  z-index: 6;

  .sidebar-links {
    width: 50px;
    background: transparent;
    /* Sidebar open & close transition (Desktop) */
    transition: visibility, width ease-in-out 0.3s;
  }

  button {
    width: 100%;
    border-radius: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    border: none;
    margin-top: 2px;

    i {
      width: 26px;
    }

    a:first-child {
      padding: 6px 12px;
      min-width: 50px;
    }

    a:last-child {
      white-space: nowrap;
      opacity: 0;
      width: 0;
      padding: 6px 0;
      width: 100%;
      text-align: left;
      display: ${props => (props.isSidebarOpen ? "block" : "none")};
    }
  }

  .open {
    width: ${props => `${props.theme.sidebarWidth}px`};
    a:last-child {
      opacity: 1;
    }
  }

  /* MEDIA QUERIES */
  ${media.tablet`
    height: ${props => (props.isSidebarOpen ? "100vh" : "inherit")};
    min-width: ${props => (props.isSidebarOpen ? "100vw" : "inherit")};
    background: rgba(0, 0, 0, 0.5);
    z-index: ${props => (props.isSidebarOpen ? 6 : -1)}

    .sidebar-links {
      opacity: ${props => (props.isSidebarOpen ? 1 : 0)};
      /* Sidebar open & close transition (Tablet & Phone) */
      transition: opacity ease-in-out 0.3s;
      width: 100%;
      button {
        height: 54px;
        a {
          font-size: 1.5rem;
        }
      }
    }
  `}
`
