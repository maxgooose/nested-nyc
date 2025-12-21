import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * VerifyScreen - Code Verification Screen
 * EXACT Figma Copy
 * 
 * Precise measurements:
 * - Back button: 52x52px, 15px radius, border #E8E6EA, top 44px, left 40px
 * - Timer: 34px bold, #E5385A, centered, margin-top 32px from back
 * - Instructions: 18px, #E5385A, centered, margin-top 10px
 * - Code boxes: 4x 60x60px, 15px radius, gap 12px, margin-top 40px
 *   - Filled: bg #E5385A, text white
 *   - Active (next): border #E5385A, text pink
 *   - Empty: border #E8E6EA, text gray
 * - Number pad: 3 columns, 24px text, row gap 32px, margin-top 40px
 * - Send again: 16px bold, #E5385A, margin-top 32px
 */

function VerifyScreen() {
  const navigate = useNavigate()
  const [code, setCode] = useState(['', '', '', ''])
  const [timer, setTimer] = useState(42)
  
  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])
  
  // Handle number pad press
  const handleNumberPress = (num) => {
    const newCode = [...code]
    const emptyIndex = newCode.findIndex(c => c === '')
    if (emptyIndex !== -1) {
      newCode[emptyIndex] = num.toString()
      setCode(newCode)
      
      // Auto-navigate when complete
      if (emptyIndex === 3) {
        setTimeout(() => navigate('/profile'), 500)
      }
    }
  }
  
  // Handle backspace
  const handleBackspace = () => {
    const newCode = [...code]
    const lastFilledIndex = newCode.map(c => c !== '').lastIndexOf(true)
    if (lastFilledIndex !== -1) {
      newCode[lastFilledIndex] = ''
      setCode(newCode)
    }
  }
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Determine box styles
  const getBoxStyle = (index, digit) => {
    const isFilled = digit !== ''
    const isActive = !isFilled && code.findIndex(c => c === '') === index
    
    if (isFilled) {
      return {
        backgroundColor: '#E5385A',
        border: 'none',
        color: 'white'
      }
    } else if (isActive) {
      return {
        backgroundColor: 'transparent',
        border: '1px solid #E5385A',
        color: '#E5385A'
      }
    } else {
      return {
        backgroundColor: 'transparent',
        border: '1px solid #E8E6EA',
        color: '#ADAFBB'
      }
    }
  }

  return (
    <div 
      className="flex flex-col h-full bg-white relative"
      style={{ paddingLeft: '40px', paddingRight: '40px' }}
    >
      {/* Back Button */}
      <div style={{ paddingTop: '44px' }}>
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
      
      {/* Timer */}
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <p 
          style={{ 
            fontSize: '34px',
            fontWeight: 700,
            color: '#E5385A',
            margin: 0
          }}
        >
          {formatTime(timer)}
        </p>
      </div>
      
      {/* Instructions */}
      <p 
        style={{ 
          marginTop: '10px',
          fontSize: '18px',
          color: '#E5385A',
          textAlign: 'center',
          lineHeight: 1.4
        }}
      >
        Type the verification code
        <br />
        we've sent you
      </p>
      
      {/* Code Input Boxes */}
      <div 
        style={{ 
          marginTop: '40px',
          display: 'flex',
          justifyContent: 'center',
          gap: '12px'
        }}
      >
        {code.map((digit, index) => {
          const boxStyle = getBoxStyle(index, digit)
          return (
            <div
              key={index}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 700,
                ...boxStyle
              }}
            >
              {digit || '0'}
            </div>
          )
        })}
      </div>
      
      {/* Number Pad */}
      <div style={{ marginTop: '40px' }}>
        <div 
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            rowGap: '20px'
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handleNumberPress(num)}
              style={{
                height: '48px',
                fontSize: '24px',
                fontWeight: 500,
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#E5385A'
              }}
            >
              {num}
            </button>
          ))}
          {/* Empty cell */}
          <div />
          {/* Zero */}
          <button
            onClick={() => handleNumberPress(0)}
            style={{
              height: '48px',
              fontSize: '24px',
              fontWeight: 500,
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#E5385A'
            }}
          >
            0
          </button>
          {/* Backspace */}
          <button
            onClick={handleBackspace}
            style={{
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
              <rect 
                x="1" 
                y="1" 
                width="22" 
                height="16" 
                rx="3" 
                stroke="#E5385A" 
                strokeWidth="1.5"
              />
              <path 
                d="M15 5L9 13M9 5L15 13" 
                stroke="#E5385A" 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Send Again Link */}
      <button 
        onClick={() => setTimer(42)}
        style={{
          marginTop: '32px',
          fontSize: '16px',
          fontWeight: 700,
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#E5385A'
        }}
      >
        Send again
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

export default VerifyScreen
