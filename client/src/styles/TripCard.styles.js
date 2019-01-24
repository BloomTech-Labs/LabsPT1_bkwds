import styled from "styled-components"
import { media } from "./theme/mixins"

export const TripCardStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  a {
    text-decoration: underline;
  }

  button {
    margin-top: 1.25rem;
    cursor: pointer;
  }

  .container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    max-width: 100%;
    height: 100%;

    @media (max-width: 40.25em) {
      justify-content: center;
    }
  }

  .card {
    display: flex;
    justify-content: flex-start;
    align-self: center;
    border-radius: 0.25rem;
    height: 400px;
    width: 380px;
    max-height: 100%;
    max-width: 100%;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0.0625rem 0px,
      rgba(0, 0, 5, 0.1) 0px 0.0625rem 0.125rem,
      rgba(0, 0, 0, 0.05) 0px 0.3125rem 0.9375rem;

    transition: transform 0.22s ease-out 0s, box-shadow;

    @media (max-width: 55.875em) {
      height: 300px;
      width: 280px;
    }
  }

  .card:hover {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0.3125rem 0.9375rem,
      rgba(0, 0, 0, 0.1) 0px 0.3125rem 0.3125rem,
      rgba(0, 0, 0, 0.05) 0px 0.125rem 0.3125rem;
    transform: translate3d(0px, -0.1875rem, 0px);
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
    overflow: hidden;

    ${media.tablet`
      width: 100%;
    `}

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
      font-size: 3.75rem;
      font-weight: 600;
      transform: rotate(45deg);
      @media all and (max-width: 894px) {
        font-size: 2.125rem;
      }
    }
  }
`
