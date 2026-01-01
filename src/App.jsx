import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Layout components
import MobileFrame from './components/MobileFrame'
import WebLayout from './components/WebLayout'

// Page components
import SplashScreen from './pages/SplashScreen'
import Onboarding1 from './pages/Onboarding1'
import Onboarding2 from './pages/Onboarding2'
import Onboarding3 from './pages/Onboarding3'
import SignUpScreen from './pages/SignUpScreen'
import UniEmailScreen from './pages/UniEmailScreen'
import VerifyScreen from './pages/VerifyScreen'
import ProfileScreen from './pages/ProfileScreen'
import MajorScreen from './pages/MajorScreen'
import GenderScreen from './pages/GenderScreen'
import InterestsScreen from './pages/InterestsScreen'
import SearchFriendsScreen from './pages/SearchFriendsScreen'
import NotificationsScreen from './pages/NotificationsScreen'
import DiscoverScreen from './pages/DiscoverScreen'
import EventsScreen from './pages/EventsScreen'
import MatchesScreen from './pages/MatchesScreen'
import MessagesScreen from './pages/MessagesScreen'
import ChatScreen from './pages/ChatScreen'
import FiltersScreen from './pages/FiltersScreen'
import ProfileDetailScreen from './pages/ProfileDetailScreen'

/**
 * useIsDesktop - Hook to detect desktop screen width
 * Returns true when screen width is ≥1024px
 */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  )

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isDesktop
}

/**
 * Route categories for layout decisions
 */
// Routes that should use WebLayout on desktop (main app pages with sidebar)
const DESKTOP_APP_ROUTES = ['/discover', '/events', '/matches', '/messages', '/my-profile', '/filters']

// Auth/onboarding routes - use WebLayout with auth layout type on desktop
const AUTH_ROUTES = ['/signup', '/uni-email', '/verify', '/onboarding/1', '/onboarding/2', '/onboarding/3']

// Profile setup forms - use WebLayout with form layout type on desktop
const FORM_ROUTES = ['/profile', '/major', '/gender', '/interests', '/search-friends', '/notifications']

// Routes that should remain mobile-only (splash, profile-detail, chat)
const MOBILE_ONLY_ROUTES = ['/', '/profile-detail']

/**
 * AppContent - Main routing component with responsive layout handling
 */
function AppContent() {
  const location = useLocation()
  const isDesktop = useIsDesktop()
  const pathname = location.pathname
  
  // On desktop, redirect from splash/root to discover immediately
  // This bypasses the landing screen on desktop
  if (isDesktop && pathname === '/') {
    return <Navigate to="/discover" replace />
  }
  
  // Determine which layout to use based on route and screen size
  const isAppRoute = DESKTOP_APP_ROUTES.includes(pathname)
  const isAuthRoute = AUTH_ROUTES.includes(pathname)
  const isFormRoute = FORM_ROUTES.includes(pathname)
  const isChatRoute = pathname.startsWith('/chat/')
  const isMobileOnlyRoute = MOBILE_ONLY_ROUTES.includes(pathname)
  
  // On desktop, use WebLayout for app, auth, form, and chat routes
  const useDesktopLayout = isDesktop && (isAppRoute || isAuthRoute || isFormRoute || isChatRoute)
  
  // Determine layout type for WebLayout
  const getLayoutType = () => {
    if (isAuthRoute) return 'auth'
    if (isFormRoute) return 'form'
    if (isChatRoute) return 'chat'
    return 'app'
  }

  return (
    <Routes>
      {/* Root/Splash - Mobile only, desktop redirects to /discover */}
      <Route 
        path="/" 
        element={
          <MobileFrame>
            <SplashScreen />
          </MobileFrame>
        } 
      />
      
      {/* Onboarding Routes */}
      <Route 
        path="/onboarding/1" 
        element={
          useDesktopLayout ? (
            <WebLayout layoutType="auth"><Onboarding1 /></WebLayout>
          ) : (
            <MobileFrame><Onboarding1 /></MobileFrame>
          )
        } 
      />
      <Route 
        path="/onboarding/2" 
        element={
          useDesktopLayout ? (
            <WebLayout layoutType="auth"><Onboarding2 /></WebLayout>
          ) : (
            <MobileFrame><Onboarding2 /></MobileFrame>
          )
        } 
      />
      <Route 
        path="/onboarding/3" 
        element={
          useDesktopLayout ? (
            <WebLayout layoutType="auth"><Onboarding3 /></WebLayout>
          ) : (
            <MobileFrame><Onboarding3 /></MobileFrame>
          )
        } 
      />
      
      {/* Auth Routes */}
      <Route 
        path="/signup" 
        element={
          useDesktopLayout ? (
            <WebLayout layoutType="auth"><SignUpScreen /></WebLayout>
          ) : (
            <MobileFrame><SignUpScreen /></MobileFrame>
          )
        } 
      />
      <Route 
        path="/uni-email" 
        element={
          useDesktopLayout ? (
            <WebLayout layoutType="auth"><UniEmailScreen /></WebLayout>
          ) : (
            <MobileFrame><UniEmailScreen /></MobileFrame>
          )
        } 
      />
      <Route 
        path="/verify" 
        element={
          useDesktopLayout ? (
            <WebLayout layoutType="auth"><VerifyScreen /></WebLayout>
          ) : (
            <MobileFrame><VerifyScreen /></MobileFrame>
          )
        } 
      />
      
      {/* Profile Setup Forms */}
      <Route 
        path="/profile" 
        element={
          useDesktopLayout ? (
            <WebLayout layoutType="form"><ProfileScreen /></WebLayout>
          ) : (
            <MobileFrame><ProfileScreen /></MobileFrame>
          )
        } 
      />
      <Route 
        path="/major" 
        element={
          useDesktopLayout ? (
            <WebLayout layoutType="form"><MajorScreen /></WebLayout>
          ) : (
            <MobileFrame><MajorScreen /></MobileFrame>
          )
        } 
      />
      <Route 
        path="/gender" 
        element={
          useDesktopLayout ? (
            <WebLayout layoutType="form"><GenderScreen /></WebLayout>
          ) : (
            <MobileFrame><GenderScreen /></MobileFrame>
          )
        } 
      />
      <Route 
        path="/interests" 
        element={
          useDesktopLayout ? (
            <WebLayout layoutType="form"><InterestsScreen /></WebLayout>
          ) : (
            <MobileFrame><InterestsScreen /></MobileFrame>
          )
        } 
      />
      <Route 
        path="/search-friends" 
        element={
          useDesktopLayout ? (
            <WebLayout layoutType="form"><SearchFriendsScreen /></WebLayout>
          ) : (
            <MobileFrame><SearchFriendsScreen /></MobileFrame>
          )
        } 
      />
      <Route 
        path="/notifications" 
        element={
          useDesktopLayout ? (
            <WebLayout layoutType="form"><NotificationsScreen /></WebLayout>
          ) : (
            <MobileFrame><NotificationsScreen /></MobileFrame>
          )
        } 
      />
      
      {/* Main App Routes */}
      <Route 
        path="/discover" 
        element={
          isDesktop ? (
            <WebLayout layoutType="app"><DiscoverScreen /></WebLayout>
          ) : (
            <MobileFrame><DiscoverScreen /></MobileFrame>
          )
        } 
      />
      <Route 
        path="/events" 
        element={
          isDesktop ? (
            <WebLayout layoutType="app"><EventsScreen /></WebLayout>
          ) : (
            <MobileFrame><EventsScreen /></MobileFrame>
          )
        } 
      />
      <Route 
        path="/matches" 
        element={
          isDesktop ? (
            <WebLayout layoutType="app"><MatchesScreen /></WebLayout>
          ) : (
            <MobileFrame><MatchesScreen /></MobileFrame>
          )
        } 
      />
      <Route 
        path="/messages" 
        element={
          isDesktop ? (
            <WebLayout layoutType="app"><MessagesScreen /></WebLayout>
          ) : (
            <MobileFrame><MessagesScreen /></MobileFrame>
          )
        } 
      />
      <Route 
        path="/filters" 
        element={
          isDesktop ? (
            <WebLayout layoutType="app"><FiltersScreen /></WebLayout>
          ) : (
            <MobileFrame><FiltersScreen /></MobileFrame>
          )
        } 
      />
      
      {/* Chat Route - uses chat layout on desktop */}
      <Route 
        path="/chat/:id" 
        element={
          isDesktop ? (
            <WebLayout layoutType="chat"><ChatScreen /></WebLayout>
          ) : (
            <MobileFrame><ChatScreen /></MobileFrame>
          )
        } 
      />
      
      {/* Profile Detail - Mobile frame always */}
      <Route 
        path="/profile-detail/:id" 
        element={
          <MobileFrame><ProfileDetailScreen /></MobileFrame>
        } 
      />
      
      {/* My Profile */}
      <Route 
        path="/my-profile" 
        element={
          isDesktop ? (
            <WebLayout layoutType="app"><ProfileScreen /></WebLayout>
          ) : (
            <MobileFrame><ProfileScreen /></MobileFrame>
          )
        } 
      />
      
      {/* Fallback - redirect to discover on desktop, splash on mobile */}
      <Route 
        path="*" 
        element={<Navigate to={isDesktop ? '/discover' : '/'} replace />} 
      />
    </Routes>
  )
}

/**
 * App - Root component with BrowserRouter
 */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
