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
  padding: 0.5rem 1rem 0.43rem;
  border-radius: 0.375rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: ${props => `0 0 0 1px ${props.theme.primary}`};
  }
`

export const GhostInput = styled.input`
  padding: 0.5rem 1rem 0.43rem;
  border-radius: 0.375rem;
  border: ${props => `1px ${props.theme.inputBorderColor} solid`};
  font-size: 1rem;
`

export const Form = styled.form`
  width: 100%;
  padding: 30px 20px 20px 20px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0.3125rem 0.0625rem 0 rgba(0, 0, 0, 0.05),
    0 0 0 0.0625rem rgba(0, 0, 0, 0.03), 0 0.0625rem 0 0 rgba(0, 0, 0, 0.05),
    0 0.0625rem 0.1875rem 0 rgba(0, 0, 0, 0.01);

  input {
    width: 100%;
    margin-bottom: 20px;
    background: white;
  }

  button {
    width: 100%;
  }

  .text-align-right {
    text-align: right;
    button {
      width: unset;
      padding-left: 3.5rem;
      padding-right: 3.5rem;
    }
  }
`

export const Button = styled.button`
  color: white;
  border-radius: 5px;
  margin-top: 8px;
  padding: 6px 12px;
  font-weight: 500;
  width: ${props => props.width};

  /* Button & btn-primary */
  will-change: background-color, border-color, color;
  -webkit-transition: background-color 0.15s ease, border-color 0.15s ease,
    color 0.15s ease;
  transition: background-color 0.15s ease, border-color 0.15s ease,
    color 0.15s ease;
  background-color: ${props => props.theme.primary};
  border-color: ${props => props.theme.primary};
  &:hover,
  &:focus {
    background-color: ${props => props.theme.primaryHover};
    border-color: ${props => props.theme.primaryHover};
  }

  /* Styles for Link/anchor elements that might be children of Button */
  a {
    color: ${props => props.theme.white};
    &:hover {
      color: ${props => props.theme.white};
    }
  }

  &.btn-primary {
    border: 0;
  }

  &.btn-tertiary {
    background-color: ${props => props.theme.tertiary};
    border-color: ${props => props.theme.tertiary};
    color: ${props => props.theme.white};
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    &:hover,
    &:focus {
      background-color: ${props => props.theme.tertiaryHover};
      border-color: ${props => props.theme.tertiaryHover};
      color: ${props => props.theme.white};
    }
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

  &.btn-gray {
    background-color: ${props => props.theme.lightGray};
    border-color: ${props => props.theme.lightGray};
  }

  &.btn-neutral {
    background-color: ${props => props.theme.offWhite};
    border-color: ${props => props.theme.offWhite};
    color: ${props => props.theme.midGray};

    &:hover,
    &:focus {
      background-color: ${props => props.theme.lightGray};
      border-color: ${props => props.theme.lightGray};
      color: ${props => props.theme.darkGray};
    }
  }

  &.btn-inverted {
    color: ${props => props.theme.white};
    /* target anchors for when we nest Links inside buttons */
    & a {
      color: ${props => props.theme.white};
    }
    background-color: ${props => props.theme.primary};
    border-color: ${props => props.theme.primary};
    &:hover,
    &:focus {
      background-color: ${props => props.theme.primaryLight};
      border-color: ${props => props.theme.primaryLight};
      color: ${props => props.theme.primary};
      & a {
        color: ${props => props.theme.primary};
      }
    }
  }

  &.btn-secondary {
    background-color: ${props => props.theme.secondaryDark};
    border-color: ${props => props.theme.secondaryDark};
    &:hover,
    &:focus {
      background-color: ${props => props.theme.secondary};
      border-color: ${props => props.theme.secondary};
    }
  }

  &:not(:disabled) {
    cursor: pointer;
  }
`

export const CardButton = styled.button`
  position: absolute;
  right: 1%;
  top: -50%;
  display: block;
  width: 65px;
  height: 65px;
  font-weight: bold;
  border-radius: 100%;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
  text-decoration: bold;
  color: ${props => props.theme.tertiary};
  transition: all 0.3s ease;
  /* &::after {
    margin-left: 2%;
    content: "\f054";
    font-family: FontAwesome;
    line-height: 10%;
  } */

  &:hover,
  &:focus {
    background: ${props => props.theme.tertiary};
    color: #fff;
    box-shadow: 0 2px 8px 0 rgba(${props => props.theme.tertiary}, 0.4);
    &::after {
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
  }
`

export const CloseModalIcon = styled.button`
  position: absolute;
  right: 4rem;
  border: 0;
  cursor: pointer;
  color: rgba(128, 128, 128, 0.5);
  padding: 0;
  font-size: 2rem;
  padding: 0 !important;
  font-weight: 300;
  background: white;
`
