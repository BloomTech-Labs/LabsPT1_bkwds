import styled from "styled-components"
import { media } from "../styles/theme/mixins"

export const SidebarStyles = styled.div`
  /* width: ${props => `${props.theme.sidebarWidth}px`}; */
  ${media.tablet`
    display: none;
  `}

  > div {
    height: 100%;
    width: 50px;
    transition: width ease-in-out 0.3s;
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
      transition: all ease-in-out 0.4s;
      width: 100%;
      text-align: left;
      display: ${props => (props.isSidebarOpen ? "block" : "none")};
    }
  }

  .open {
    width: ${props => `${props.theme.sidebarWidth}px`};
    transition: width ease-in-out 0.3s;

    a:last-child {
      opacity: 1;
      transition: all ease-in-out 0.5s;
    }
  }
`
