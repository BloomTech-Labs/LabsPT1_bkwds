import Styled from "styled-components"
import { media } from "./theme/mixins"

export const MapWrapper = Styled.div`
  position:relative;
  margin-left: -50px;
  overflow-x: hidden;
  overflow-y: hidden;
  ${media.tablet`
    margin-left: 0;
  `}

  height: 100%;

  #plus-icon {
    visibility: hidden;

    ${media.tablet`
      visibility: visible;
      cursor: pointer;
      z-index: 1;
      right: 40px;
      bottom: 200px;
      background: white;
      border-radius: 50%;
      position: absolute;
    `}
  }
`
