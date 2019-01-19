import styled from "styled-components"

export const TripCardStyles = styled.div`
  a {
    text-decoration: underline;
  }

  button {
    margin-top: 1.25rem;
  }

  .container {
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: row;
    flex-wrap: wrap;
    align-items: start;
  }

  .card {
    display: flex;
    justify-content: flex-start;
    margin-top: 5%;
    margin-right: 2.5%;
    margin-left: 2.5%;
    padding-bottom: 1%;
    border: none !important;
    overflow: hidden;
    border-radius: 0.25rem;
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    img {
      transform: scale(1.05, 1.05);
      transition: all 1s ease;
    }
  }

  .card-content {
    position: relative;
    margin: 5%;
  }

  .card-cta {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .card-image {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    img {
      transition: all 1.86s ease;
    }

    img.grayscale {
      -webkit-filter: grayscale(100%);
      filter: grayscale(100%);
    }

    .text-overlay {
      position: absolute;
      color: rgba(30, 33, 37, 0.25);
      font-size: 5rem;
      font-weight: 600;
      transform: rotate(45deg);
    }
  }
`
