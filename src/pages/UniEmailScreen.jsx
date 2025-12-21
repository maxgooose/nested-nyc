import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * UniEmailScreen - University Email Input Screen
 * 
 * Precise measurements (matching PhoneScreen):
 * - Screen padding: 40px horizontal
 * - Top padding: 130px
 * - Title: "My university email", 34px bold, #E5385A, left-aligned
 * - Title-desc gap: 10px
 * - Description: 14px, #E5385A, line-height 1.5
 * - Input margin-top: 40px
 * - Input height: 58px, border-radius 15px, border #E8E6EA
 * - Button margin-top: 48px
 * - Button: 56px height, 15px radius, #E5385A bg
 * - Home indicator: 134x5px black, 8px from bottom
 */

function UniEmailScreen() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleContinue = () => {
    navigate('/verify')
  }

  return (
    <div 
      className="flex flex-col h-full bg-white relative"
      style={{ paddingLeft: '40px', paddingRight: '40px' }}
    >
      {/* Header Section */}
      <div style={{ paddingTop: '130px' }}>
        {/* Title */}
        <h1 
          style={{ 
            fontSize: '34px',
            fontWeight: 700,
            color: '#E5385A',
            margin: 0,
            letterSpacing: 'normal',
            wordSpacing: 'normal'
          }}
        >
          My university email
        </h1>
        
        {/* Description */}
        <p 
          style={{ 
            margin: 0,
            marginTop: '10px',
            fontSize: '14px',
            lineHeight: 1.5,
            color: '#E5385A'
          }}
        >
          Enter your .edu email address to verify
          <br />
          you're a real student. We'll send a code.
        </p>
      </div>
      
      {/* Email Input */}
      <div style={{ marginTop: '40px' }}>
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '58px',
            borderRadius: '15px',
            border: '1px solid #E8E6EA',
            overflow: 'hidden'
          }}
        >
          {/* Email Icon */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: '16px',
              paddingRight: '12px',
              height: '100%'
            }}
          >
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <path 
                d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z" 
                fill="#E5385A"
              />
            </svg>
          </div>
          
          {/* Email Input Field */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@university.edu"
            style={{
              flex: 1,
              height: '100%',
              paddingRight: '16px',
              fontSize: '14px',
              color: '#231429',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent'
            }}
          />
        </div>
      </div>
      
      {/* Continue Button */}
      <button 
        onClick={handleContinue}
        style={{
          marginTop: '48px',
          width: '100%',
          height: '56px',
          backgroundColor: '#E5385A',
          color: 'white',
          fontSize: '16px',
          fontWeight: 700,
          borderRadius: '15px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Continue
      </button>
      
      {/* Spacer */}
      <div style={{ flex: 1 }} />
      
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

export default UniEmailScreen

