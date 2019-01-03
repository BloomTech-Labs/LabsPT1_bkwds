import styled from "styled-components"

export const SidebarStyles = styled.div`
  width: ${props => `${props.theme.sidebarWidth}px`};
  button {
    width: 100%;
    border-radius: 0;
    display: flex;
    padding: 0;
    border-bottom: 1px solid ${props => props.theme.ghostWhite};
    a {
      flex: 0 0 100%;
      padding: 6px 12px;
    }
  }
`
