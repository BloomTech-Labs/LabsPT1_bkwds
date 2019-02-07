import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { media } from "../../styles/theme/mixins"
import Button from "./Button"

const Card = styled.div`
  display: flex:
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 350px;
  width: 350px;
  border-radius: 12px;
  box-shadow: 0 0.3125rem 0.0625rem 0 rgba(0, 0, 0, 0.25),
    0 0 0 0.0625rem rgba(255, 255, 255, 0.03),
    0 0.0625rem 2px 0 rgba(0, 0, 0, 0.75),
    0 0.0625rem 0.1875rem 0 rgba(0, 0, 0, 0.1);
  background: white;
  padding: 1.5rem;
  transition: transform 100ms;
  transition-timing-function: ease-in-out;

  &:hover {
    transform: translate3d(0px, -0.1875rem, 0px);
  }

  h5 {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  h2 {
    margin: 10% 0;
    font-size: 1.9rem;
    font-weight: 400;
    color: ${props => props.theme.primaryDark};

    span {
      font-size: 2.5rem;
      color: ${props => props.theme.primary};
    }
  }

  span.bold {
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 1%;
  }

  ${media.tablet`
    height: 300px;
    width: 300px;

    h2 {
    margin: 10% 0;
    font-size: 1.7rem;

    span {
      font-size: 2.25rem;
    }
  }

    li {
      font-size: 0.9rem;
    }
  `}
`

const PlansCard = ({ price, title }) => (
  <Card>
    <h5>{title}</h5>
    <h2>
      $<span className="bold">{price}</span>/mo.
    </h2>
    <ul>
      <li>
        <span className="bold">Unlimited</span> trips
      </li>
      <li>
        <span className="bold">Unlimited</span> archived trips
      </li>
      <li>
        <span className="bold">Unlimited</span> trip photos
      </li>
    </ul>
    <Button
      height="40px"
      margin={false}
      text="Get started"
      to="/register"
      width="130px"
    />
  </Card>
)

PlansCard.propTypes = {
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default PlansCard
