import styled from "styled-components"

export const AddTripButtonStyles = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;

  .add-trip-card-wrapper {
    background: ${props => props.theme.white};
    border-radius: 0.25rem;
  }

  .add-trip-card-container {
    height: 400px;
    width: 380px;
    max-height: 100%;
    max-width: 100%;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0.0625rem 0px,
      rgba(0, 0, 5, 0.1) 0px 0.0625rem 0.125rem,
      rgba(0, 0, 0, 0.05) 0px 0.3125rem 0.9375rem;
    cursor: pointer;
    border-radius: 0.25rem;
    max-width: 25rem;
    overflow: hidden;
    transition: transform 0.22s ease-out 0s, box-shadow;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.05) 0px 0.3125rem 0.9375rem,
        rgba(0, 0, 0, 0.1) 0px 0.3125rem 0.3125rem,
        rgba(0, 0, 0, 0.05) 0px 0.125rem 0.3125rem;
      transform: translate3d(0px, -0.1875rem, 0px);
    }
  }

  .add-trip-card-link {
    position: relative;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem 2.5rem;
    height: 100%;
    width: 100%;
    max-width: 380px;
    color: rgba(179, 179, 179, 0.75);
    &:hover {
      h2,
      span {
        color: ${props => props.theme.midGray};
      }
    }
  }

  h2 {
    font-size: 2.25rem;
    padding: 0;
    margin: 0;
  }
  span {
    font-size: 3.5rem;
    margin-top: -0.25rem;
  }
`
