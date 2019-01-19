import styled from "styled-components"
import { media } from "./theme/mixins"

export const CheckoutFormStyles = styled.div`
  width: 400px;
  float: none;
  margin: 0 auto;
  .StripeElement {
    float: none;
    margin: 0 auto;
    width: 400px;
    background-color: #fff;
    color: rgb(32, 34, 51);
    border: 1px #505050 solid;
    border-radius: 5px;
    padding: 0.6rem 0.6rem;
    margin-bottom: 8px;
  }
  .StripeElement--focus {
    margin-top: 30px;
    outline: none;
    border-color: #1e306e;
    box-shadow: 0 0 0 1px #1e306e;
  }
  ${media.phone`
  width: 250px;
  .StripeElement {
    margin: 0;
    width: 250px;
    margin-top: 20px;
  }
  `}
`
