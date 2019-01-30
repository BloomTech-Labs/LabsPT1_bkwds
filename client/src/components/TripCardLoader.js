import React from "react"
import ContentLoader from "react-content-loader"

export const TripCardLoader = props => (
  <ContentLoader
    rtl
    height={475}
    width={399}
    speed={4}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="1" y="-2" rx="5" ry="5" width="378" height="231.51" />
    <circle cx="322.3" cy="235.03" r="40" />
    <rect x="20.94" y="248.67" rx="0" ry="0" width="93" height="18" />
    <rect x="20.94" y="277.67" rx="0" ry="0" width="171" height="20" />
    <rect x="19.94" y="303.67" rx="0" ry="0" width="173" height="20" />
    <rect x="19.94" y="341.67" rx="0" ry="0" width="79.8" height="39" />
  </ContentLoader>
)

export default TripCardLoader
