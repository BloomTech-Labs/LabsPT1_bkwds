import styled from "styled-components"
import { media } from "../styles/theme/mixins"

export const DashboardStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  /* Modal styles: */

  ${media.phone`

    form {
      padding: 0 0.5rem;
      border-radius: none;
      background: inherit;
      box-shadow: none;

      label, input {
        font-size: 0.825rem;
      }
      input {
        margin-bottom: 0.625rem;
        padding: 0.375rem 0.625rem;
      }

      button {
        width: 100%;
      }
    }

  `}

  /* h6 is only used to greet a first timer in the modal */
  h6 {
    color: ${({ theme }) => theme.tertiary};
    font-weight: 300;
    font-size: 1.5rem;
    ${media.tablet`
      font-size: 1.25rem;
      font-style: italic;
    `}
    ${media.phone`
      font-size: 1.125rem;
      text-align: center;
    `}
  }
`
