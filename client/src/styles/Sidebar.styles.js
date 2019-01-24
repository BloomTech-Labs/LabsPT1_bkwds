import styled from "styled-components"
import { media } from "../styles/theme/mixins"

export const SidebarStyles = styled.div`gitk

  /* width: ${props => `${props.theme.sidebarWidth}px`}; */
  z-index: 1;
  position: absolute;

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
    padding: 6px 12px;
    border: none;
    margin-top: 2px;

    i {
      width: 26px;
    }

    a:last-child {
      white-space: nowrap;
      opacity: 0;
      width: 0;
      margin-left: 10px;
      transition: all ease-in-out 0.4s;
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
