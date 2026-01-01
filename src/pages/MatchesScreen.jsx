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
 * - Create Project card at top of grid
 * - Grid of project cards with title, category, school badges
 * - Join indicator on cards
 * - Bottom navigation
 */

// Project categories/tags
const PROJECT_CATEGORIES = [
  'AI', 'ClimateTech', 'EdTech', 'FinTech', 'HealthTech', 
  'Civic Tech', 'Social', 'Design', 'Creative', 'Business', 'Research'
]

// Roles for collaboration
const ROLES = [
  { id: 'frontend', label: 'Frontend Dev' },
  { id: 'backend', label: 'Backend Dev' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'designer', label: 'Designer' },
  { id: 'data', label: 'Data Science' },
  { id: 'product', label: 'Product' },
  { id: 'business', label: 'Business' },
  { id: 'marketing', label: 'Marketing' },
]

// Collaboration types
const COLLAB_TYPES = [
  { id: 'cofounder', label: 'Co-founder', icon: '🚀' },
  { id: 'teammate', label: 'Teammate', icon: '👥' },
  { id: 'sideproject', label: 'Side Project', icon: '⚡' },
  { id: 'study', label: 'Study Group', icon: '📚' },
]

function MatchesScreen() {
  const navigate = useNavigate()
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [userProjects, setUserProjects] = useState([])
  
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

  const handleCreateProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData,
      school: 'NYU', // Current user's school
      joined: true,
      isOwner: true,
      image: null // User-created projects use placeholder
    }
    setUserProjects([newProject, ...userProjects])
    setShowCreateModal(false)
  }

  // Combine user-created projects with active projects
  const allActiveProjects = [...userProjects, ...activeProjects]

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
            {/* Create Project Card - First in grid */}
            <div 
              className="project-grid-card create-project-card"
              onClick={() => setShowCreateModal(true)}
              style={{
                backgroundColor: 'var(--surface-2, #F6F7FB)',
                border: '2px dashed var(--border, #E5E7EB)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s, border-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
                e.currentTarget.style.borderColor = '#5B4AE6'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'var(--border, #E5E7EB)'
              }}
            >
              {/* Plus Icon */}
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  border: '1px solid var(--border, #E5E7EB)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B4AE6" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
              
              <p style={{ 
                margin: 0, 
                fontSize: '13px', 
                fontWeight: 600, 
                color: '#5B4AE6',
                textAlign: 'center'
              }}>
                Create Project
              </p>
              <p style={{ 
                margin: 0, 
                marginTop: '4px',
                fontSize: '11px', 
                color: '#9CA3AF',
                textAlign: 'center'
              }}>
                Share your idea
              </p>
            </div>

            {/* User-created projects */}
            {userProjects.map(project => (
              <div 
                key={project.id}
                className="project-grid-card"
                onClick={() => navigate('/profile-detail')}
                style={{
                  backgroundColor: 'var(--surface-2, #F6F7FB)'
                }}
              >
                {/* Placeholder for user projects without images */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px'
                }}>
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '8px'
                  }}>
                    {project.type === 'startup' ? '🚀' : project.type === 'idea' ? '💡' : '📁'}
                  </div>
                </div>
                
                {/* Owner Badge */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
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
                
                {/* Title & Category */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '12px'
                  }}
                >
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>
                    {project.title}
                  </p>
                  <p style={{ margin: 0, marginTop: '2px', fontSize: '11px', color: '#6B7280' }}>
                    {project.category}
                  </p>
                </div>
              </div>
            ))}

            {/* Existing active projects */}
            {activeProjects.map(project => (
              <div 
                key={project.id}
                className="project-grid-card"
                onClick={() => navigate('/profile-detail')}
              >
                <img 
                  src={project.image}
                  alt={project.title}
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
                className="project-grid-card"
                onClick={() => navigate('/profile-detail')}
              >
                <img 
                  src={project.image}
                  alt={project.title}
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
      
      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal 
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  )
}

/**
 * CreateProjectModal - Create a new project
 */
function CreateProjectModal({ onClose, onCreate }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    type: 'project',
    description: '',
    categories: [],
    roles: [],
    collabType: '',
    contact: ''
  })

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const toggleArrayItem = (field, item) => {
    const arr = formData[field]
    if (arr.includes(item)) {
      updateField(field, arr.filter(i => i !== item))
    } else {
      updateField(field, [...arr, item])
    }
  }

  const handlePublish = () => {
    if (formData.title && formData.description) {
      onCreate({
        title: formData.title,
        type: formData.type,
        description: formData.description,
        category: formData.categories[0] || 'Project',
        categories: formData.categories,
        roles: formData.roles,
        collabType: formData.collabType,
        contact: formData.contact
      })
    }
  }

  const canProceed = () => {
    if (step === 1) return formData.title.length > 0
    if (step === 2) return formData.description.length > 0
    if (step === 3) return formData.categories.length > 0
    return true
  }

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '480px',
          maxHeight: '90vh',
          backgroundColor: 'white',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#111827' }}>
            Create Project
          </h2>
          <button 
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#F6F7FB',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Progress */}
        <div style={{ padding: '16px 24px 0', display: 'flex', gap: '8px' }}>
          {[1, 2, 3, 4].map(s => (
            <div 
              key={s}
              style={{
                flex: 1,
                height: '4px',
                borderRadius: '2px',
                backgroundColor: s <= step ? '#5B4AE6' : '#E5E7EB'
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {step === 1 && (
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
                What are you building?
              </h3>
              
              {/* Project Name */}
              <label style={{ display: 'block', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#6B7280', display: 'block', marginBottom: '6px' }}>
                  Project Name
                </span>
                <input 
                  type="text"
                  value={formData.title}
                  onChange={e => updateField('title', e.target.value)}
                  placeholder="e.g. ClimateTech Dashboard"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '15px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    outline: 'none'
                  }}
                />
              </label>

              {/* Project Type */}
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#6B7280', display: 'block', marginBottom: '10px' }}>
                Project Type
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { id: 'project', label: 'Project', icon: '📁' },
                  { id: 'idea', label: 'Idea', icon: '💡' },
                  { id: 'startup', label: 'Startup', icon: '🚀' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => updateField('type', type.id)}
                    style={{
                      flex: 1,
                      padding: '14px 12px',
                      border: formData.type === type.id ? '2px solid #5B4AE6' : '1px solid #E5E7EB',
                      borderRadius: '12px',
                      backgroundColor: formData.type === type.id ? '#EEEAFE' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{type.icon}</span>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: formData.type === type.id ? '#5B4AE6' : '#6B7280' }}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
                Tell us more
              </h3>
              
              <label style={{ display: 'block' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#6B7280', display: 'block', marginBottom: '6px' }}>
                  Description
                </span>
                <textarea 
                  value={formData.description}
                  onChange={e => updateField('description', e.target.value)}
                  placeholder="What problem are you solving? What will you build together?"
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '15px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    outline: 'none',
                    resize: 'none',
                    lineHeight: 1.5
                  }}
                />
              </label>
              <p style={{ margin: 0, marginTop: '8px', fontSize: '12px', color: '#9CA3AF' }}>
                {formData.description.length}/300 characters
              </p>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
                Categories & Tags
              </h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {PROJECT_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleArrayItem('categories', cat)}
                    style={{
                      padding: '8px 14px',
                      fontSize: '13px',
                      fontWeight: 500,
                      border: formData.categories.includes(cat) ? '1px solid #5B4AE6' : '1px solid #E5E7EB',
                      borderRadius: '20px',
                      backgroundColor: formData.categories.includes(cat) ? '#EEEAFE' : 'white',
                      color: formData.categories.includes(cat) ? '#5B4AE6' : '#6B7280',
                      cursor: 'pointer'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
                Who are you looking for?
              </h3>
              
              {/* Roles */}
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#6B7280', display: 'block', marginBottom: '10px' }}>
                Roles needed
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {ROLES.map(role => (
                  <button
                    key={role.id}
                    onClick={() => toggleArrayItem('roles', role.id)}
                    style={{
                      padding: '8px 14px',
                      fontSize: '13px',
                      fontWeight: 500,
                      border: formData.roles.includes(role.id) ? '1px solid #5B4AE6' : '1px solid #E5E7EB',
                      borderRadius: '20px',
                      backgroundColor: formData.roles.includes(role.id) ? '#EEEAFE' : 'white',
                      color: formData.roles.includes(role.id) ? '#5B4AE6' : '#6B7280',
                      cursor: 'pointer'
                    }}
                  >
                    {role.label}
                  </button>
                ))}
              </div>

              {/* Collaboration Type */}
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#6B7280', display: 'block', marginBottom: '10px' }}>
                Collaboration type
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {COLLAB_TYPES.map(type => (
                  <button
                    key={type.id}
                    onClick={() => updateField('collabType', type.id)}
                    style={{
                      padding: '14px 12px',
                      border: formData.collabType === type.id ? '2px solid #5B4AE6' : '1px solid #E5E7EB',
                      borderRadius: '12px',
                      backgroundColor: formData.collabType === type.id ? '#EEEAFE' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{type.icon}</span>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: formData.collabType === type.id ? '#5B4AE6' : '#6B7280' }}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Optional Contact */}
              <label style={{ display: 'block' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#6B7280', display: 'block', marginBottom: '6px' }}>
                  Preferred contact (optional)
                </span>
                <input 
                  type="text"
                  value={formData.contact}
                  onChange={e => updateField('contact', e.target.value)}
                  placeholder="e.g. Slack, Discord, or email"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '15px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    outline: 'none'
                  }}
                />
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px 24px',
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          gap: '12px'
        }}>
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                flex: 1,
                padding: '14px',
                fontSize: '15px',
                fontWeight: 600,
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                backgroundColor: 'white',
                color: '#6B7280',
                cursor: 'pointer'
              }}
            >
              Back
            </button>
          )}
          
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              style={{
                flex: 1,
                padding: '14px',
                fontSize: '15px',
                fontWeight: 600,
                border: 'none',
                borderRadius: '12px',
                backgroundColor: canProceed() ? '#5B4AE6' : '#E5E7EB',
                color: canProceed() ? 'white' : '#9CA3AF',
                cursor: canProceed() ? 'pointer' : 'not-allowed'
              }}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handlePublish}
              style={{
                flex: 1,
                padding: '14px',
                fontSize: '15px',
                fontWeight: 600,
                border: 'none',
                borderRadius: '12px',
                backgroundColor: '#5B4AE6',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Publish Project
            </button>
          )}
        </div>
      </div>
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
            border: '1px solid rgba(91, 74, 230, 0.2)',
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
