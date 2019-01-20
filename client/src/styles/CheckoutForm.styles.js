import styled from "styled-components"
import { media } from "./theme/mixins"

export const CheckoutFormStyles = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px auto 0;
  width: 400px;

  input {
    margin-bottom: 10px;
    border: 1px solid #d1d5da;
    font-size: 0.95rem;
  }

  .stripe-card-input {
    height: 38px;
    margin-bottom: 10px;
  }

  .StripeElement {
    padding: 0.6rem 0.6rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5da;
    background-color: white;
    color: #f6f6f6;
  }

  .StripeElement--focus {
    outline: none;
    border-color: #1e306e;
    box-shadow: 0 0 0 1px #1e306e;
  }

  .form-city-state {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-gap: 10px;
    width: 100%;

    input {
      width: inherit;
    }
  }

  ${media.phone`
    width: 300px;

    .input-button {
      width: 300px;
      float: none;
      margin: 10px auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `}
`
