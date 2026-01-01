import { useNavigate } from 'react-router-dom'

/**
 * SplashScreen - Nested NYC
 * 
 * Layout:
 * - White background
 * - Centered geometric logo (polygonal shape)
 * - Brand name "NESTED" below logo
 * - Home indicator at bottom
 * 
 * Tap anywhere to proceed to onboarding
 */

function SplashScreen() {
  const navigate = useNavigate()
  
  return (
    <div 
      className="flex flex-col h-full bg-white relative cursor-pointer"
      onClick={() => navigate('/onboarding/1')}
    >
      {/* Centered Logo + Brand Name */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        <NestedLogo />
        <h1 
          className="mt-4 text-[18px] font-bold tracking-[0.15em] uppercase"
          style={{ color: '#5B4AE6' }}
        >
          NESTED
        </h1>
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2">
        <div 
          style={{
            width: '134px',
            height: '5px',
            backgroundColor: '#000000',
            borderRadius: '100px'
          }}
        />
      </div>
    </div>
  )
}

/**
 * NestedLogo - Geometric polygonal design
 * Clean geometric design with purple accent shades
 */
function NestedLogo() {
  return (
    <svg 
      width="100" 
      height="90" 
      viewBox="0 0 100 90" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Geometric shape made of polygons - purple monochrome */}
      
      {/* Top left lobe - outer */}
      <path 
        d="M50 20L25 8L8 25L15 45L50 75L50 20Z" 
        fill="#5B4AE6"
      />
      
      {/* Top right lobe - outer */}
      <path 
        d="M50 20L75 8L92 25L85 45L50 75L50 20Z" 
        fill="#7A6BD6"
      />
      
      {/* Left side accent */}
      <path 
        d="M8 25L15 45L25 35L20 20L8 25Z" 
        fill="#4A3CD4"
      />
      
      {/* Right side accent */}
      <path 
        d="M92 25L85 45L75 35L80 20L92 25Z" 
        fill="#8B7DE8"
      />
      
      {/* Inner left piece */}
      <path 
        d="M25 8L20 20L35 30L50 20L25 8Z" 
        fill="#6959D5"
      />
      
      {/* Inner right piece */}
      <path 
        d="M75 8L80 20L65 30L50 20L75 8Z" 
        fill="#9E92E9"
      />
      
      {/* Center top */}
      <path 
        d="M35 30L50 20L65 30L50 45L35 30Z" 
        fill="#9690E9"
      />
      
      {/* Bottom left */}
      <path 
        d="M15 45L35 50L50 75L15 45Z" 
        fill="#4A3CD4"
      />
      
      {/* Bottom right */}
      <path 
        d="M85 45L65 50L50 75L85 45Z" 
        fill="#7A6BD6"
      />
      
      {/* Center bottom */}
      <path 
        d="M35 50L50 45L65 50L50 75L35 50Z" 
        fill="#EEEAFE"
      />
      
      {/* Left inner accent */}
      <path 
        d="M25 35L35 30L35 50L25 35Z" 
        fill="#5B4AE6"
      />
      
      {/* Right inner accent */}
      <path 
        d="M75 35L65 30L65 50L75 35Z" 
        fill="#B2A9EA"
      />
    </svg>
  )
}

export default SplashScreen
