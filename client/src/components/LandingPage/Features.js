import React from "react"
import styled from "styled-components"
import iphone from "../../assets/iphone.png"

//WIP --VIC
const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  width: 100%;
`
const PhoneContainer = styled.div`

 }


`

const Img = styled.img`
  background-image: url(./images/iphone.jpg);

  height: 100%;
  width: 100%
  margin-top: 3rem;
`
const DescriptionContainer = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
  grid-gap: 25px;
  grid-auto-columns: 350px;

  div {
    margin-top: 1rem;
    line-height: 1.25;
  }

  .accent {
    color: #f26a21 !important;
    font-size: 35px !important;
  }

  .features-content {
    align-self: center;
  }
`

const Features = () => {
  return (
    <FeaturesContainer>
      <PhoneContainer>
        <Img src={iphone} />
      </PhoneContainer>
      <DescriptionContainer>
        <div className="features-content">
          <h4>
            Travel the backroads<span className="accent">.</span>
          </h4>
          <div>
            Discover new trails and trek through the unknown with our state of
            the art GPS tracker and trail setter planning. Explore new peaks.
          </div>
        </div>
        <div className="features-content">
          <h4>
            Keep track<span className="accent">.</span>
          </h4>
          <div>
            Create hiking goals and track your progress over time. Share and
            compete with other hikers or mountain climbers.
          </div>
        </div>
        <div className="features-content">
          <h4>
            Share and connect<span className="accent">.</span>
          </h4>
          <div>
            Connect with our growing community of climbers and hikers, join a
            quest with members of ur community or plan a trip with your friends
          </div>
        </div>
        <div className="features-content">
          <h4>
            Peace of mind<span className="accent">.</span>
          </h4>
          <div>
            Create waypoints, broadcast your location and alert others of your
            whereabouts — wander into the wild with a peace of mind.
          </div>
        </div>
      </DescriptionContainer>
    </FeaturesContainer>
  )
}

export default Features
