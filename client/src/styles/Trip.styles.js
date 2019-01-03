import styled from "styled-components"

export const TripStyles = styled.div`
  a {
    text-decoration: underline;
  }

  .container {
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .card {
    display: flex;
    justify-content: flex-start;
    margin-top: 2%;
    margin-right: 2%;
    padding-bottom: 1%;
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .card-container {
    padding: 2px 16px;
    max-width: 100%;
  }

  .img {
    max-width: 100%;
  }
`
