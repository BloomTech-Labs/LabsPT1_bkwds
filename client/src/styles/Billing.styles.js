import styled from "styled-components"
import { media } from "./theme/mixins"

export const BillingStyles = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  padding: 0px;
  align-items: center;

  .form-container {
    width: 100px;
    background-color: white;
  }

  .input-checkout {
    margin: 10px;
  }

  .input-button {
    margin-left: 30px;
  }

  ${media.phone` 
  .input-checkout {
    display: flex;
    width: 250px;
    float: none;
    margin: 10px auto;
  }

  .form-container {
    margin-top: 10px;
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
`
