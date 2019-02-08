import styled from "styled-components"

import { media } from "./theme/mixins"

export const ExploreHeader = styled.h4`
  margin: 40px 0 20px 50px;

  ${media.phone`
    margin: 40px 0 20px 60px;
  `}
`
