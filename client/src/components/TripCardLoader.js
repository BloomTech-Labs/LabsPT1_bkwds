import React from "react"
import ContentLoader from "react-content-loader"

export const TripCardLoader = () => (
  <ContentLoader
    rtl
    height={398}
    width={378}
    speed={4}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="216.63" y="250.61" rx="3" ry="3" width="140" height="13.82" />
    <rect x="155.73" y="281.61" rx="3" ry="3" width="201.4" height="7.81" />
    <rect x="156.59" y="299.61" rx="3" ry="3" width="201" height="6.91" />
    <rect x="-16.17" y="0.39" rx="0" ry="0" width="422.56" height="228.4" />
    <rect x="275.63" y="335.61" rx="0" ry="0" width="79.8" height="37" />
    <circle cx="57.83" cy="234.81" r="37.2" />
  </ContentLoader>
)

export default TripCardLoader
