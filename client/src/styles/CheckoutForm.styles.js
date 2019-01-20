import styled from "styled-components"
import { media } from "./theme/mixins"

export const CheckoutFormStyles = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px auto 0;
  width: 400px;

  input {
    margin-bottom: 10px;
    padding: 0.5rem 1rem 0.43rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5da;
    color: #f6f6f6;
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
  /* 
  .input-checkout {
    margin: 10px;
  } */
  /* 
  .input-button {
    margin-left: 30px;
  } */

  ${media.phone`
    .input-checkout {
      display: flex;
      /* width: 250px; */
      float: none;
      /* margin: 10px auto; */
    }

    .input-button {
      width: 250px;
      height: 50px;
      float: none;
      margin: 10px auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `}

  ${media.phone`
    width: 250px;
    .StripeElement {
      margin: 0;
      width: 250px;
      margin-top: 20px;
    }
  `}
`
