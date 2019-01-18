import Styled from "styled-components"
import { media } from "./theme/mixins"

export const MapWrapper = Styled.div`
  position:relative;
  width:100%;
  height:100%;

  #plus-icon{
    visibility: hidden;

    ${media.tablet`
      visibility: visible;
      cursor: pointer;
      right: 5%;
      bottom: 30%;
      position: absolute;
      `}
    }
`
