import { css } from "styled-components"

export const flexCenterMixin = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const containerMixin = css`
  display: flex;
  /* flex-grow: 2; */
`

export const modalBlur = css`
  filter: blur(1px);
`

export const card = css`
  background: ${props => props.theme.primary};
  box-shadow: ${props => props.theme.boxShadow};
`

export const animations = css`
  /* -webkit-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out; */
`
