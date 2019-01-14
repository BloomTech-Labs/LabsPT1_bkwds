import styled from "styled-components"

import { flexCenterMixin } from "./mixins"

export const Card = styled.div`
  ${flexCenterMixin};
`

export const Label = styled.label`
  color: ${props => props.theme.primary};
  font-weight: 500;
  text-transform: capitalize;
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
  font-weight: 500;

  background-color: ${props => props.theme.primaryDark};
  border-color: ${props => props.theme.primaryDark};
  &:hover,
  &:focus {
    background-color: ${props => props.theme.primary};
    border-color: ${props => props.theme.primary};
  }

  /* Styles for Link/anchor elements that might be children of Button */
  a {
    color: ${props => props.theme.white};
  }

  &.btn-light {
    background-color: ${props => props.theme.primaryLight};
    border-color: ${props => props.theme.primaryLight};
    &:hover,
    &:focus {
      background-color: ${props => props.theme.primaryDark};
      border-color: ${props => props.theme.primaryDark};
    }
  }

  &.btn-inverted {
    color: ${props => props.theme.primary};
    /* target anchors for when we nest Links inside buttons */
    & a {
      color: ${props => props.theme.primary};
    }
    background-color: ${props => props.theme.primaryLight};
    border-color: ${props => props.theme.primaryLight};
    &:hover,
    &:focus {
      background-color: ${props => props.theme.primary};
      border-color: ${props => props.theme.primary};
      color: ${props => props.theme.white};
      & a {
        color: ${props => props.theme.white};
      }
    }
  }

  &.btn-secondary {
    background-color: ${props => props.theme.secondary};
    border-color: ${props => props.theme.secondary};
    &:hover,
    &:focus {
      background-color: ${props => props.theme.secondaryDark};
      border-color: ${props => props.theme.secondaryDark};
    }
  }

  &:hover,
  &:focus {
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
  }

  &:not(:disabled) {
    cursor: pointer;
  }
`
