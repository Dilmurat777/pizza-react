import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
	<ContentLoader 
		className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="136" cy="116" r="113" /> 
    <rect x="7" y="245" rx="0" ry="0" width="295" height="24" /> 
    <rect x="2" y="288" rx="10" ry="10" width="276" height="87" /> 
    <rect x="6" y="391" rx="10" ry="10" width="112" height="32" /> 
    <rect x="149" y="386" rx="20" ry="20" width="124" height="39" />
  </ContentLoader>
)

export default Skeleton