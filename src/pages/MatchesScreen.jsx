import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

/**
 * MatchesScreen - My Projects (Saved/Joined)
 * Nested NYC – Student-only project network
 * 
 * Specs:
 * - Header: "My Projects" title with sort icon
 * - Description text
 * - Grid of project cards with title, category, school badges
 * - Join indicator on cards
 * - Bottom navigation
 */

function MatchesScreen() {
  const navigate = useNavigate()
  const [showJoinModal, setShowJoinModal] = useState(false)
  
  const activeProjects = [
    { id: 1, title: 'ClimateTech Dashboard', category: 'Sustainability', school: 'NYU', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=280&fit=crop', joined: true },
    { id: 2, title: 'AI Study Buddy', category: 'EdTech', school: 'Columbia', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=200&h=280&fit=crop', joined: true },
    { id: 3, title: 'NYC Transit App', category: 'Civic Tech', school: 'NYU', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=200&h=280&fit=crop', joined: false },
    { id: 4, title: 'Campus Events', category: 'Social', school: 'Parsons', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=280&fit=crop', joined: true },
  ]
  
  const savedProjects = [
    { id: 5, title: 'Startup Pitch Deck', category: 'Business', school: 'Stern', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=280&fit=crop', timestamp: 'Yesterday' },
    { id: 6, title: 'Music Collab Platform', category: 'Creative', school: 'Tisch', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=280&fit=crop', timestamp: 'Yesterday' },
  ]

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div 
        style={{ 
          paddingTop: '50px',
          paddingLeft: '20px',
          paddingRight: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h1 
          style={{ 
            margin: 0,
            fontSize: '28px',
            fontWeight: 700,
            color: '#E5385A'
          }}
        >
          My Projects
        </h1>
        
        {/* Sort Icon */}
        <button 
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E5385A" strokeWidth="2">
            <path d="M3 6h18M3 12h12M3 18h6"/>
          </svg>
        </button>
      </div>
      
      {/* Description */}
      <p 
        style={{ 
          margin: 0,
          marginTop: '8px',
          paddingLeft: '20px',
          paddingRight: '20px',
          fontSize: '14px',
          color: '#ADAFBB',
          lineHeight: 1.5
        }}
      >
        Projects you've saved or joined.
        <br />
        Your collaboration hub.
      </p>
      
      {/* Content - Scrollable */}
      <div 
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          paddingBottom: '100px',
          paddingLeft: '20px',
          paddingRight: '20px'
        }}
      >
        {/* Active Section */}
        <div style={{ marginTop: '24px' }}>
          <p style={{ margin: 0, marginBottom: '12px', fontSize: '12px', color: '#ADAFBB', fontWeight: 600 }}>
            Active
          </p>
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '12px' 
            }}
          >
            {activeProjects.map(project => (
              <div 
                key={project.id}
                onClick={() => navigate('/profile-detail')}
                style={{
                  position: 'relative',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  aspectRatio: '0.75'
                }}
              >
                <img 
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                
                {/* School Badge */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#E5385A'
                  }}
                >
                  {project.school}
                </div>
                
                {/* Gradient overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '80px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)'
                  }}
                />
                
                {/* Title & Category */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '40px'
                  }}
                >
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'white', lineHeight: 1.2 }}>
                    {project.title}
                  </p>
                  <p style={{ margin: 0, marginTop: '2px', fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
                    {project.category}
                  </p>
                </div>
                
                {/* Join Indicator */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px'
                  }}
                >
                  <div 
                    onClick={(e) => { e.stopPropagation(); if (!project.joined) setShowJoinModal(true) }}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: project.joined ? '#E5385A' : 'white',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill={project.joined ? 'white' : '#E5385A'}>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Saved Section */}
        <div style={{ marginTop: '24px' }}>
          <p style={{ margin: 0, marginBottom: '12px', fontSize: '12px', color: '#ADAFBB', fontWeight: 600 }}>
            Saved
          </p>
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '12px' 
            }}
          >
            {savedProjects.map(project => (
              <div 
                key={project.id}
                onClick={() => navigate('/profile-detail')}
                style={{
                  position: 'relative',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  aspectRatio: '0.75'
                }}
              >
                <img 
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                
                {/* School Badge */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#E5385A'
                  }}
                >
                  {project.school}
                </div>
                
                {/* Gradient overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '80px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)'
                  }}
                />
                
                {/* Title & Category */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '40px'
                  }}
                >
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'white', lineHeight: 1.2 }}>
                    {project.title}
                  </p>
                  <p style={{ margin: 0, marginTop: '2px', fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
                    {project.category}
                  </p>
                </div>
                
                {/* Save indicator */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#8A2387">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
      
      {/* Join Modal */}
      {showJoinModal && (
        <JoinModal onClose={() => setShowJoinModal(false)} />
      )}
    </div>
  )
}

/**
 * JoinModal - "You're In!" project join confirmation
 */
function JoinModal({ onClose }) {
  const navigate = useNavigate()
  
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(35, 20, 41, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '40px'
      }}
    >
      {/* Project + User photos */}
      <div style={{ display: 'flex', position: 'relative', marginBottom: '32px' }}>
        <div 
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid white',
            marginRight: '-20px',
            zIndex: 1
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop"
            alt="Project"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div 
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid white'
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
            alt="You"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
      
      {/* Title */}
      <h2 
        style={{ 
          margin: 0,
          fontSize: '32px',
          fontWeight: 700,
          color: '#E5385A',
          textAlign: 'center'
        }}
      >
        You're In! 🚀
      </h2>
      
      {/* Description */}
      <p 
        style={{ 
          margin: 0,
          marginTop: '12px',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.7)',
          textAlign: 'center'
        }}
      >
        You've joined the project team
      </p>
      
      {/* Buttons */}
      <div style={{ width: '100%', marginTop: '40px' }}>
        <button 
          onClick={() => { onClose(); navigate('/chat/project') }}
          style={{
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
          Open chat
        </button>
        
        <button 
          onClick={onClose}
          style={{
            width: '100%',
            height: '56px',
            backgroundColor: 'transparent',
            color: '#E5385A',
            fontSize: '16px',
            fontWeight: 700,
            borderRadius: '15px',
            border: '1px solid rgba(229, 56, 90, 0.5)',
            cursor: 'pointer',
            marginTop: '16px'
          }}
        >
          Keep browsing
        </button>
      </div>
    </div>
  )
}

export default MatchesScreen

