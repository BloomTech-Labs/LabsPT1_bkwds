import Styled from "styled-components"
import { media } from "./theme/mixins"

export const MapWrapper = Styled.div`
  position:relative;
  margin-left: -50px;
  ${media.tablet`
    margin-left: 0;
  `}

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
