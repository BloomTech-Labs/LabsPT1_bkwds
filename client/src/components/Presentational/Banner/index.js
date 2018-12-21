import React from "react"
import * as s from "./styles"

const Banner = props => {
  return (
    <s.Banner seconds={props.seconds}>
      <div className="landing-page-banner">
        <span className="banner-title">
          <span className="banner-app-name">Backwoods Tracker</span>
          <span className="banner-rotating-tagline">
            {" ..."}
            {props.tagline}
          </span>
        </span>
      </div>
    </s.Banner>
  )
}

export default Banner
