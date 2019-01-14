import styled from "styled-components"

export const AddTripButtonStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 515px;
  border-radius: 3%;
  width: 30%;
  flex-wrap: wrap;
  font-size: large;
  border-style: solid;
  box-sizing: border-box;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .a {
    font-size: 5rem;
  }

  .TripMsg {
    font-size: 5rem;
    opacity: 0.5;
  }
  .AddTripButton {
    border-radius: 100%;
    opacity: 0.5;
  }
`
