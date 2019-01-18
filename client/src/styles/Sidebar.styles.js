import styled from "styled-components"

export const SidebarStyles = styled.div`
  > div {
    height: 100%;
    width: 50px;
    transition: width ease-in-out 0.3s;
  }

  button {
    width: 100%;
    border-radius: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0;
    border: none;
    margin-top: 2px;
    a {
      padding: 6px 12px;
    }

    a:last-child {
      white-space: nowrap;
      opacity: 0;
      width: 0;
      height: 0;
      padding: 0;
      transition: all ease-in-out 0.4s;
    }
  }

  .open {
    width: ${props => `${props.theme.sidebarWidth}px`};
    transition: width ease-in-out 0.3s;

    a:last-child {
      opacity: 1;
      width: initial;
      height: initial;
      padding: 6px 12px;
      transition: all ease-in-out 0.5s;
    }
  }
`
