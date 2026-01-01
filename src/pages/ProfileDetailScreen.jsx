import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProjectById } from '../utils/projectData'

/**
 * ProfileDetailScreen - Project Detail View
 * Nested NYC – Student-only project network
 * 
 * Desktop: Two-column layout (content left, CTA right)
 * Mobile: Single column with sticky bottom CTA
 */

function ProfileDetailScreen() {
  const navigate = useNavigate()
  const { projectId } = useParams()
  const [isDesktop, setIsDesktop] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  // Responsive check
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  
  // Load project by ID
  useEffect(() => {
    if (projectId) {
      const foundProject = getProjectById(projectId)
      setProject(foundProject)
    }
    setLoading(false)
  }, [projectId])

  // Loading state
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        backgroundColor: 'white'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid #E5E7EB',
          borderTopColor: '#5B4AE6',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
      </div>
    )
  }

  // Project not found state
  if (!project) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        backgroundColor: 'white',
        padding: '40px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#F3F4F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#111827' }}>
          Project not found
        </h2>
        <p style={{ margin: '8px 0 24px 0', fontSize: '14px', color: '#6B7280' }}>
          This project may have been removed or the link is incorrect.
        </p>
        <button 
          onClick={() => navigate('/discover')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#5B4AE6',
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Browse Projects
        </button>
      </div>
    )
  }

  // Desktop Layout
  if (isDesktop) {
    return (
      <div className="project-detail-desktop">
        {/* Back Button - Desktop */}
        <div className="project-detail-back">
          <button 
            onClick={() => navigate(-1)}
            className="back-btn-desktop"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to projects
          </button>
        </div>

        <div className="project-detail-layout">
          {/* Left Column - Main Content */}
          <div className="project-detail-main">
            {/* Hero Image */}
            <div className="project-detail-hero">
              <img 
                src={project.image}
                alt={project.title}
                className="project-detail-image"
              />
              <div className="project-detail-hero-overlay" />
              <div className="project-detail-category-badge">
                {project.category}
              </div>
            </div>

            {/* Project Header */}
            <div className="project-detail-header">
              <h1 className="project-detail-title">{project.title}</h1>
              <div className="project-detail-schools">
                {project.schools.map((school, idx) => (
                  <span key={idx} className="school-badge-desktop">
                    {school}
                  </span>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="project-detail-section">
              <h3 className="section-title-desktop">About this project</h3>
              <p className="project-description-desktop">
                {project.description}
              </p>
            </div>

            {/* Skills Section */}
            <div className="project-detail-section">
              <h3 className="section-title-desktop">Skills needed</h3>
              <div className="skills-grid-desktop">
                {project.skillsNeeded?.map((skill, index) => (
                  <span key={index} className="skill-tag-desktop">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Team Section */}
            <div className="project-detail-section">
              <div className="team-header-desktop">
                <h3 className="section-title-desktop">Meet the team</h3>
                <span className="team-count-desktop">
                  {project.team?.length || 0} {(project.team?.length || 0) === 1 ? 'member' : 'members'}
                </span>
              </div>
              <div className="team-grid-desktop">
                {project.team?.map((member, index) => (
                  <div key={index} className="team-card-desktop">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="team-avatar-desktop"
                    />
                    <div className="team-info-desktop">
                      <p className="team-name-desktop">{member.name}</p>
                      <p className="team-school-desktop">{member.school}</p>
                    </div>
                    <span className="team-role-desktop">{member.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - CTA Sidebar */}
          <div className="project-detail-sidebar">
            <div className="project-cta-card">
              {/* Spots Left */}
              <div className="spots-indicator">
                <div className="spots-number">{project.spotsLeft}</div>
                <div className="spots-text">
                  <span className="spots-label">{project.spotsLeft === 1 ? 'Spot' : 'Spots'} left</span>
                  <span className="spots-sublabel">Open positions on this team</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <button className="join-btn-desktop">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
                Request to Join
              </button>

              <button 
                className={`save-btn-desktop ${isSaved ? 'saved' : ''}`}
                onClick={() => setIsSaved(!isSaved)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                {isSaved ? 'Saved' : 'Save for later'}
              </button>

              {/* Quick Info */}
              <div className="project-quick-info">
                <div className="quick-info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <span>{project.team?.length || 0} team members</span>
                </div>
                <div className="quick-info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Active project</span>
                </div>
                <div className="quick-info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>NYC area</span>
                </div>
              </div>
            </div>

            {/* Share Card */}
            <div className="project-share-card">
              <h4>Share this project</h4>
              <div className="share-buttons">
                <button className="share-btn" title="Copy link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </button>
                <button className="share-btn" title="Share on Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button className="share-btn" title="Share on LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Mobile Layout (unchanged)
  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '100px' }}>
        {/* Hero Image Section */}
        <div style={{ position: 'relative', height: '280px', flexShrink: 0 }}>
          <img 
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            style={{
              position: 'absolute',
              top: '48px',
              left: '20px',
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <svg width="10" height="16" viewBox="0 0 12 20" fill="none">
              <path 
                d="M10 2L2 10L10 18" 
                stroke="#231429" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
          {/* Bottom Gradient */}
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '120px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)'
            }}
          />
          
          {/* Category Badge */}
          <div 
            style={{
              position: 'absolute',
              top: '48px',
              right: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#5B4AE6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {project.category}
          </div>
          
          {/* Project Title Overlay */}
          <div 
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px'
            }}
          >
            <h1 
              style={{ 
                margin: 0,
                fontSize: '24px',
                fontWeight: 700,
                color: 'white'
              }}
            >
              {project.title}
            </h1>
          </div>
        </div>
        
        {/* Content Section */}
        <div style={{ padding: '20px' }}>
          {/* Schools + Spots Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {project.schools.map((school, idx) => (
                <span 
                  key={idx}
                  style={{
                    backgroundColor: '#5B4AE6',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '5px 12px',
                    borderRadius: '20px'
                  }}
                >
                  {school}
                </span>
              ))}
            </div>
            <span 
              style={{
                backgroundColor: 'rgba(109, 93, 246, 0.1)',
                color: '#5B4AE6',
                fontSize: '12px',
                fontWeight: 600,
                padding: '5px 10px',
                borderRadius: '8px'
              }}
            >
              {project.spotsLeft} {project.spotsLeft === 1 ? 'spot' : 'spots'} left
            </span>
          </div>
          
          {/* Description */}
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#231429' }}>
              About
            </h3>
            <p style={{ 
              margin: 0, 
              marginTop: '8px', 
              fontSize: '14px', 
              color: '#666', 
              lineHeight: 1.6 
            }}>
              {project.description}
            </p>
          </div>
          
          {/* Skills Needed */}
          <div style={{ marginTop: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#231429' }}>
              Skills needed
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
              {project.skillsNeeded?.map((skill, index) => (
                <span 
                  key={index}
                  style={{
                    backgroundColor: '#FAFAFA',
                    color: '#231429',
                    border: '1px solid #E5E7EB',
                    fontSize: '13px',
                    fontWeight: 500,
                    padding: '8px 14px',
                    borderRadius: '20px'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Team Section */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#231429' }}>
                Meet the team
              </h3>
              <span style={{ fontSize: '13px', color: '#ADAFBB' }}>
                {project.team?.length || 0} {(project.team?.length || 0) === 1 ? 'member' : 'members'}
              </span>
            </div>
            
            {/* Team Member Cards */}
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {project.team?.map((member, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: '#FAFAFA',
                    borderRadius: '14px',
                    gap: '12px'
                  }}
                >
                  {/* Member Photo */}
                  <div 
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}
                  >
                    <img 
                      src={member.image}
                      alt={member.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  
                  {/* Member Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#231429' }}>
                      {member.name}
                    </p>
                    <p style={{ margin: 0, marginTop: '2px', fontSize: '12px', color: '#ADAFBB' }}>
                      {member.school}
                    </p>
                  </div>
                  
                  {/* Role Badge */}
                  <span 
                    style={{
                      backgroundColor: 'rgba(109, 93, 246, 0.1)',
                      color: '#5B4AE6',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      flexShrink: 0
                    }}
                  >
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Sticky Bottom CTA - Mobile Only */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px 20px',
          paddingBottom: '28px',
          backgroundColor: 'white',
          borderTop: '1px solid #F0F0F0',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}
      >
        {/* Save Button */}
        <button 
          onClick={() => setIsSaved(!isSaved)}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            border: '1.5px solid #E5E7EB',
            backgroundColor: isSaved ? 'rgba(91, 74, 230, 0.1)' : 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={isSaved ? '#5B4AE6' : 'none'} stroke={isSaved ? '#5B4AE6' : '#231429'} strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
        
        {/* Request to Join Button */}
        <button 
          style={{
            flex: 1,
            height: '52px',
            backgroundColor: '#5B4AE6',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            borderRadius: '14px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="8.5" cy="7" r="4"/>
            <line x1="20" y1="8" x2="20" y2="14"/>
            <line x1="23" y1="11" x2="17" y2="11"/>
          </svg>
          Request to Join
        </button>
      </div>
      
      {/* Home Indicator - Mobile Only */}
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

export default ProfileDetailScreen
