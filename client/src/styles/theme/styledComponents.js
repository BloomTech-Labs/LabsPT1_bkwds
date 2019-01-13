import styled from "styled-components"

import { flexCenterMixin } from "./mixins"

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
			box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .15);
			text-align: center;
			text-decoration: bold;
      color: #1abc9c;
      transition: all .3s ease;
			&::after
				margin-left: 2%;
				content: '\f054';
				font-family: FontAwesome;
        line-height: 10%;
        
      &:hover, 
      &:focus{
				background: #1abc9c;
				color: #fff;
				box-shadow: 0 2px 8px 0 rgba(#1abc9c, .4);
				&::after
					text-shadow: 0 2px 8px rgba(0, 0, 0, .15);
      }

  }


`
