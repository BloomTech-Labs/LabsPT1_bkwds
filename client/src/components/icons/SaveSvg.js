import React from "react"
import PropTypes from "prop-types"

const SaveSvg = ({ width = "20px", height = "20px" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width}
      height={height}
      viewBox="0 0 249.425 249.425"
    >
      <g>
        <path
          d="M206.79,81.505c-3.313,0-6,2.687-6,6v149.919H12V48.635h146.792c3.314,0,6-2.687,6-6s-2.686-6-6-6H6c-3.313,0-6,2.687-6,6
		v200.789c0,3.313,2.687,6,6,6h200.79c3.313,0,6-2.687,6-6V87.505C212.79,84.192,210.103,81.505,206.79,81.505z"
        />
        <path
          d="M247.667,1.758c-2.343-2.343-6.142-2.345-8.485,0L80.416,160.523L41.023,121.13c-2.343-2.344-6.143-2.344-8.485,0
		c-2.343,2.343-2.343,6.142,0,8.484l43.636,43.636c1.171,1.172,2.707,1.758,4.243,1.758s3.071-0.586,4.243-1.758L247.667,10.243
		C250.011,7.9,250.011,4.101,247.667,1.758z"
        />
      </g>
    </svg>
  )
}

SaveSvg.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
}

export default SaveSvg
