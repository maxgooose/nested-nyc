import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * FiltersScreen - Project Filters
 * Nested NYC – Student-only project network
 * 
 * Specs:
 * - Team size slider: 1-10+ members
 * - Duration slider: 1 week - 6 months
 * - Continue button: 56px height, 15px radius, #E5385A bg
 */

function FiltersScreen() {
  const navigate = useNavigate()
  const [teamSize, setTeamSize] = useState(5)
  const [duration, setDuration] = useState({ min: 2, max: 12 }) // weeks

  // Format duration for display
  const formatDuration = (weeks) => {
    if (weeks === 1) return '1 week'
    if (weeks < 4) return `${weeks} weeks`
    if (weeks < 8) return '1-2 months'
    if (weeks < 12) return '2-3 months'
    if (weeks < 20) return '3-5 months'
    return '6+ months'
  }

  return (
    <div 
      className="flex flex-col h-full bg-white relative"
      style={{ paddingLeft: '40px', paddingRight: '40px' }}
    >
      {/* Header */}
      <div style={{ paddingTop: '50px' }}>
        <button 
          onClick={() => navigate(-1)}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '15px',
            border: '1px solid #E8E6EA',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <path 
              d="M10 2L2 10L10 18" 
              stroke="#E5385A" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      
      {/* Filters Content */}
      <div style={{ marginTop: '40px' }}>
        {/* Team Size Filter */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <label 
              style={{ 
                fontSize: '16px', 
                fontWeight: 700, 
                color: '#E5385A' 
              }}
            >
              Team Size
            </label>
            <span 
              style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#E5385A' 
              }}
            >
              {teamSize === 10 ? '10+' : teamSize} members
            </span>
          </div>
          
          {/* Custom Slider */}
          <div style={{ position: 'relative', height: '4px', backgroundColor: '#E8E6EA', borderRadius: '2px' }}>
            <div 
              style={{ 
                position: 'absolute',
                left: 0,
                top: 0,
                height: '4px',
                width: `${(teamSize / 10) * 100}%`,
                backgroundColor: '#E5385A',
                borderRadius: '2px'
              }} 
            />
            <input
              type="range"
              min="1"
              max="10"
              value={teamSize}
              onChange={(e) => setTeamSize(parseInt(e.target.value))}
              style={{
                position: 'absolute',
                width: '100%',
                height: '20px',
                top: '-8px',
                opacity: 0,
                cursor: 'pointer'
              }}
            />
            <div 
              style={{
                position: 'absolute',
                left: `calc(${(teamSize / 10) * 100}% - 10px)`,
                top: '-8px',
                width: '20px',
                height: '20px',
                backgroundColor: '#E5385A',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(229, 56, 90, 0.4)'
              }}
            />
          </div>
        </div>
        
        {/* Duration Filter */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <label 
              style={{ 
                fontSize: '16px', 
                fontWeight: 700, 
                color: '#E5385A' 
              }}
            >
              Project Duration
            </label>
            <span 
              style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#E5385A' 
              }}
            >
              {formatDuration(duration.min)} - {formatDuration(duration.max)}
            </span>
          </div>
          
          {/* Dual Range Slider */}
          <div style={{ position: 'relative', height: '4px', backgroundColor: '#E8E6EA', borderRadius: '2px' }}>
            {/* Active range track */}
            <div 
              style={{ 
                position: 'absolute',
                left: `${((duration.min - 1) / (24 - 1)) * 100}%`,
                right: `${100 - ((duration.max - 1) / (24 - 1)) * 100}%`,
                top: 0,
                height: '4px',
                backgroundColor: '#E5385A',
                borderRadius: '2px'
              }} 
            />
            
            {/* Min thumb */}
            <div 
              style={{
                position: 'absolute',
                left: `calc(${((duration.min - 1) / (24 - 1)) * 100}% - 10px)`,
                top: '-8px',
                width: '20px',
                height: '20px',
                backgroundColor: '#E5385A',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(229, 56, 90, 0.4)'
              }}
            />
            
            {/* Max thumb */}
            <div 
              style={{
                position: 'absolute',
                left: `calc(${((duration.max - 1) / (24 - 1)) * 100}% - 10px)`,
                top: '-8px',
                width: '20px',
                height: '20px',
                backgroundColor: '#E5385A',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(229, 56, 90, 0.4)'
              }}
            />
            
            {/* Invisible inputs for interaction */}
            <input
              type="range"
              min="1"
              max="24"
              value={duration.min}
              onChange={(e) => {
                const val = parseInt(e.target.value)
                if (val < duration.max) {
                  setDuration({ ...duration, min: val })
                }
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '20px',
                top: '-8px',
                opacity: 0,
                cursor: 'pointer',
                pointerEvents: 'auto'
              }}
            />
            <input
              type="range"
              min="1"
              max="24"
              value={duration.max}
              onChange={(e) => {
                const val = parseInt(e.target.value)
                if (val > duration.min) {
                  setDuration({ ...duration, max: val })
                }
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '20px',
                top: '-8px',
                opacity: 0,
                cursor: 'pointer',
                pointerEvents: 'auto'
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Spacer */}
      <div style={{ flex: 1 }} />
      
      {/* Apply Filters Button */}
      <button 
        onClick={() => navigate('/discover')}
        style={{
          width: '100%',
          height: '56px',
          backgroundColor: '#E5385A',
          color: 'white',
          fontSize: '16px',
          fontWeight: 700,
          borderRadius: '15px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '60px'
        }}
      >
        Apply Filters
      </button>
      
      {/* Home Indicator */}
      <div 
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: '8px' }}
      >
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

export default FiltersScreen
