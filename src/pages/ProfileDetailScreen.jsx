import { useNavigate, useLocation } from 'react-router-dom'

/**
 * ProfileDetailScreen - Project Detail View
 * Nested NYC – Student-only project network
 * 
 * The conversion moment: where browsing becomes action
 * 
 * Layout:
 * - Hero image with gradient + back button
 * - Project info (title, category, schools, spots)
 * - Description
 * - Skills needed
 * - Team members with names/schools/roles
 * - Sticky "Request to Join" CTA
 */

function ProfileDetailScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get project from navigation state, or use fallback
  const project = location.state?.project || {
    title: 'ClimateTech Dashboard',
    category: 'Sustainability × Data Viz',
    schools: ['NYU', 'Columbia'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=800&fit=crop',
    description: 'Building an interactive dashboard to visualize NYC climate data and track sustainability initiatives across campuses. We want to help students understand their environmental impact and find ways to reduce it together.',
    skillsNeeded: ['React', 'D3.js', 'Python', 'Data Viz'],
    spotsLeft: 3,
    team: [
      { name: 'Marcus Chen', school: 'NYU', role: 'Lead / Backend', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
      { name: 'Sofia Rodriguez', school: 'Columbia', role: 'Data Science', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
    ]
  }

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
              background: '#5B4AE6 0%, rgba(0,0,0,0) 100%)'
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
      
      {/* Sticky Bottom CTA */}
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
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            border: '1.5px solid #E5E7EB',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#231429" strokeWidth="2">
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

export default ProfileDetailScreen
