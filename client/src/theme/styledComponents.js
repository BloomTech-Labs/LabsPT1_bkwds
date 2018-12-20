import styled from "styled-components"

import { flexCenterMixin } from "./mixins"

export const MainContainer = styled.div`
  background: ${props => props.theme.contentBackground};
  /* flex-grow: 2; */
  overflow: hidden;
`

export const Card = styled.div`
  ${flexCenterMixin};
`

export const Input = styled.input`
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.inputTextColor};
  border: ${props => `1px ${props.theme.inputBorderColor} solid`};
  border-radius: 5px;
  padding: 0.4rem 0.6rem;

  &::placeholder {
    color: ${props => props.theme.placeholderColor};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: ${props => `0 0 0 1px ${props.theme.primary}`};
  }
`

export const Form = styled.form`
  max-width: 100%;
  input {
    width: 100%;
    margin-bottom: 8px;
  }

  button {
    width: 100%;
  }
`

export const Button = styled.button`
  color: ${props => props.theme.white};
  border-radius: 5px;
  padding: 6px 12px;

  background-color: ${props => props.theme.primaryDark}
  border-color: ${props => props.theme.primaryDark}
  &:hover, &:focus {
    background-color: ${props => props.theme.primary}
    border-color: ${props => props.theme.primary}
  }

  &.btn-secondary {
    background-color: ${props => props.theme.secondary}
    border-color: ${props => props.theme.secondary}
    &:hover, &:focus {
      background-color: ${props => props.theme.secondaryDark}
      border-color: ${props => props.theme.secondaryDark}
    }
  }

  &:hover, &:focus {
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
  }

  &:not(:disabled) {
    cursor: pointer;
  }
`

// export const Label = styled.label`
//   color: ${props => props.theme.midGray};
// `

// export const FormGroup = styled.div`
//   position: relative;

//   input {
//     padding-top: 1.5em;
//     padding-bottom: 0.35714em;
//   }

//   label {
//     font-size: 0.85714em;
//     font-weight: normal;
//     position: absolute;
//     top: 0;
//     width: 100%;
//     margin-top: 0.42857em;
//     margin-left: 1px;
//     padding: 0 0.91667em;
//     z-index: 1;
//     transform: none;
//     opacity: 1;
//     -webkit-transition: all 0.2s ease-out;
//     transition: all 0.2s ease-out;
//   }

//   input:focus + input {
//     transform: translateY(-125%);
//     font-size: 0.75em;
//   }
// `
