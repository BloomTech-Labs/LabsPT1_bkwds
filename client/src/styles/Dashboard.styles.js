import styled from "styled-components"

export const DashboardStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  .onboarding-flow {
    z-index: 101;
    max-width: 630px;
    max-height: 590px;
    padding: 2rem;
  }
  .flow-header {
    padding: 0px 30px 0 30px;
    margin-bottom: 24px;
    h4 {
      font-size: 2rem;
      font-weight: 600;
    }
  }
  .text-align-right {
    text-align: right;
  }
  button {
    width: unset;
    padding-left: 3.5rem;
    padding-right: 3.5rem;
  }
`
