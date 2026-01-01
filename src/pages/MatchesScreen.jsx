import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { getMyProjects, getSavedProjects } from '../utils/projectData'

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
 * - User-created projects from localStorage
 */

function MatchesScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [activeProjects, setActiveProjects] = useState([])
  const [savedProjects, setSavedProjects] = useState([])

  // Load projects from centralized store
  useEffect(() => {
    setActiveProjects(getMyProjects())
    setSavedProjects(getSavedProjects())
  }, [])

  // Show success toast if coming from project creation
  useEffect(() => {
    if (location.state?.projectCreated) {
      setSuccessMessage(`"${location.state.projectName}" created!`)
      setShowSuccessToast(true)
      // Clear state to prevent showing again on refresh
      window.history.replaceState({}, document.title)
      // Refresh projects list
      setActiveProjects(getMyProjects())
      // Hide toast after 3 seconds
      const timer = setTimeout(() => setShowSuccessToast(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [location.state])

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
            color: '#5B4AE6'
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B4AE6" strokeWidth="2">
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
            {/* Create Project Card - Always first */}
            <div 
              onClick={() => navigate('/create-project')}
              style={{
                position: 'relative',
                borderRadius: '15px',
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: '0.75',
                backgroundColor: '#FAFAFA',
                border: '2px dashed #E5E7EB',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#5B4AE6'
                e.currentTarget.style.backgroundColor = 'rgba(91, 74, 230, 0.03)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB'
                e.currentTarget.style.backgroundColor = '#FAFAFA'
              }}
            >
              {/* Plus Icon */}
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(91, 74, 230, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B4AE6" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
              
              {/* Text */}
              <div style={{ textAlign: 'center', padding: '0 12px' }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#5B4AE6' }}>
                  Create Project
                </p>
                <p style={{ margin: 0, marginTop: '4px', fontSize: '11px', color: '#9CA3AF' }}>
                  Share your idea
                </p>
              </div>
            </div>

            {activeProjects.map(project => (
              <div 
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
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
                
                {/* Badges */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    display: 'flex',
                    gap: '6px'
                  }}
                >
                  {project.isOwner && (
                    <div
                      style={{
                        backgroundColor: '#5B4AE6',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: 600,
                        color: 'white'
                      }}
                    >
                      Owner
                    </div>
                  )}
                  <div
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#5B4AE6'
                    }}
                  >
                    {project.school}
                  </div>
                </div>
                
                {/* Gradient overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '80px',
                    background: '#5B4AE6 0%, rgba(0,0,0,0) 100%)'
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
                      backgroundColor: project.joined ? '#5B4AE6' : 'white',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill={project.joined ? 'white' : '#5B4AE6'}>
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
                onClick={() => navigate(`/projects/${project.id}`)}
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
                    color: '#5B4AE6'
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
                    background: '#5B4AE6 0%, rgba(0,0,0,0) 100%)'
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#4A3CD4">
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

      {/* Success Toast */}
      {showSuccessToast && (
        <div 
          style={{
            position: 'fixed',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#10B981',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'slideUp 0.3s ease'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
          {successMessage}
        </div>
      )}
      
      <style>{`
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}</style>
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
          color: '#5B4AE6',
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
            backgroundColor: '#5B4AE6',
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
            color: '#5B4AE6',
            fontSize: '16px',
            fontWeight: 700,
            borderRadius: '15px',
            border: '1px solid rgba(109, 93, 246, 0.2)',
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

