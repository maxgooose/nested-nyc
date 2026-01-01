import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { getUpcomingEvents, getPastEvents } from '../utils/eventData'

/**
 * EventsScreen - Campus Events Discovery
 * Nested NYC – Student-only project network
 * 
 * Specs:
 * - Header: "Events" title with filter icon
 * - Tab bar: Upcoming | Past
 * - Event cards with image, title, date, location, attendees (clickable)
 * - Bottom navigation
 */

function EventsScreen() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('upcoming')
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])

  // Load events from centralized store
  useEffect(() => {
    setUpcomingEvents(getUpcomingEvents())
    setPastEvents(getPastEvents())
  }, [])

  const events = activeTab === 'upcoming' ? upcomingEvents : pastEvents

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
          Events
        </h1>
        
        {/* Filter Icon */}
        <button 
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B4AE6" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="8" y1="12" x2="20" y2="12"/>
            <line x1="4" y1="18" x2="20" y2="18"/>
            <circle cx="6" cy="6" r="2" fill="#5B4AE6"/>
            <circle cx="10" cy="12" r="2" fill="#5B4AE6"/>
            <circle cx="6" cy="18" r="2" fill="#5B4AE6"/>
          </svg>
        </button>
      </div>

      {/* Tab Bar */}
      <div 
        style={{ 
          display: 'flex',
          marginTop: '16px',
          borderBottom: '1px solid #E5E7EB'
        }}
      >
        <button
          onClick={() => setActiveTab('upcoming')}
          style={{
            flex: 1,
            padding: '14px 0',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'upcoming' ? '2px solid #5B4AE6' : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            color: activeTab === 'upcoming' ? '#5B4AE6' : '#ADAFBB',
            transition: 'all 0.2s ease'
          }}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('past')}
          style={{
            flex: 1,
            padding: '14px 0',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'past' ? '2px solid #5B4AE6' : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            color: activeTab === 'past' ? '#5B4AE6' : '#ADAFBB',
            transition: 'all 0.2s ease'
          }}
        >
          Past
        </button>
      </div>

      {/* Events List */}
      <div 
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          paddingBottom: '100px',
          padding: '16px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {events.map(event => (
            <div 
              key={event.id}
              onClick={() => navigate(`/events/${event.id}`)}
              style={{
                backgroundColor: '#FAFAFA',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Event Image - Clickable */}
              <div 
                style={{
                  width: '100%',
                  height: '140px',
                  position: 'relative'
                }}
              >
                <img 
                  src={event.image}
                  alt={event.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {/* Tags */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'flex',
                    gap: '6px'
                  }}
                >
                  {event.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(4px)',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '20px'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Event Info */}
              <div style={{ padding: '16px' }}>
                <h3 
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#231429'
                  }}
                >
                  {event.title}
                </h3>
                
                <p 
                  style={{
                    margin: 0,
                    marginTop: '6px',
                    fontSize: '13px',
                    color: '#6B7280',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {event.description}
                </p>

                <div 
                  style={{
                    marginTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flexWrap: 'wrap'
                  }}
                >
                  {/* Date */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B4AE6" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span style={{ fontSize: '12px', color: '#5B4AE6', fontWeight: 500 }}>
                      {event.date}
                    </span>
                  </div>

                  {/* Location */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>
                      {event.location}
                    </span>
                  </div>

                  {/* Attendees */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>
                      {event.attendees} going
                    </span>
                  </div>
                </div>

                {/* RSVP Button */}
                {activeTab === 'upcoming' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/events/${event.id}`)
                    }}
                    style={{
                      marginTop: '16px',
                      width: '100%',
                      height: '44px',
                      backgroundColor: '#5B4AE6',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 600,
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4A3CD4'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5B4AE6'}
                  >
                    RSVP
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}

export default EventsScreen

