import React, { Component } from "react"
import styled from "styled-components"
import iphone from "../../assets/iphone.png"
import mapview from "../../assets/mapview.png"
import plan from "../../assets/iphoneplan.png"
import list from "../../assets/iphonelist.png"

//WIP --VIC

const TitleContainer = styled.div`
  height: 100%;
  width: 70%;
  margin-left: 30%;
  margin-top: 5%;
  display: flex;
  flex-direction: column;

  h1 {
    flex-direction: column;
    align-self: center;

    justify-content: center;
  }
  h4 {
    flex-direction: column;
    align-self: center;

    justify-content: center;
  }

  div {
    margin-top: 1rem;
  }
`
const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`
const Img = styled.img`
  display: flex;
  flex-direction: column;
  justify-self: center;

  width: 55%;
  margin: 3rem;
`

const DescriptionContainer = styled.div`
  height: 100%;
  grid-template-columns: 1fr 1fr;
  display: grid;
  grid-gap: 5%;
  padding: 5%;
  grid-auto-columns: 200px;

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

class Features extends Component {
  state = {
    image: iphone
  }
  handleMouseOver = e => {
    console.log(e.currentTarget.id, "LOG")
    let image = iphone
    switch (e.currentTarget.id) {
      case "plan":
        image = plan
        break
      case "track":
        image = mapview
        break
      case "share":
        image = iphone
        break
      case "list":
        image = list
        break
      default:
        image = iphone
        break
    }
    this.setState({ image })
  }

  render() {
    return (
      <div>
        <TitleContainer>
          <h1>Join our global community</h1>
          <h4>The incredible experience of out app</h4>
        </TitleContainer>
        <FeaturesContainer>
          <Img src={this.state.image} />

          <DescriptionContainer>
            <div
              id="plan"
              onMouseEnter={this.handleMouseOver}
              className="features-content"
            >
              <h4>
                Travel the backroads<span className="accent">.</span>
              </h4>
              <p>
                Discover new trails and trek through the unknown with our state
                of the art GPS tracker and trail setter planning. Explore new
                peaks. Discover new trails and trek through the unknown with our
                state of the art GPS tracker and trail setter planning. Explore
                new peaks.
              </p>
            </div>
            <div
              id="track"
              onMouseEnter={this.handleMouseOver}
              className="features-content"
            >
              <h4>
                Keep track<span className="accent">.</span>
              </h4>
              <p>
                Create hiking goals and track your progress over time. Share and
                compete with other hikers or mountain climbers. Discover new
                trails and trek through the unknown with our state of the art
                GPS tracker and trail setter planning. Explore new peaks.
              </p>
            </div>
            <div
              id="share"
              onMouseEnter={this.handleMouseOver}
              className="features-content"
            >
              <h4>
                Share and connect<span className="accent">.</span>
              </h4>
              <p>
                Connect with our growing community of climbers and hikers, join
                a quest with members of ur community or plan a trip with your
                friends
              </p>
            </div>
            <div
              id="list"
              onMouseEnter={this.handleMouseOver}
              className="features-content"
            >
              <h4>
                Peace of mind<span className="accent">.</span>
              </h4>
              <p>
                Create waypoints, broadcast your location and alert others of
                your whereabouts — wander into the wild with a peace of mind.
              </p>
              <p>
                Create waypoints, broadcast your location and alert others of
                your whereabouts — wander into the wild with a peace of mind.
              </p>
            </div>
          </DescriptionContainer>
        </FeaturesContainer>
      </div>
    )
  }
}

export default Features
