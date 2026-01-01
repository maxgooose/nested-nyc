import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
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
import CreateProjectScreen from './pages/CreateProjectScreen'
import EventDetailScreen from './pages/EventDetailScreen'

/**
 * Check if onboarding is complete
 */
function isOnboardingComplete() {
  return localStorage.getItem('nested_onboarding_complete') === 'true'
}

/**
 * Mark onboarding as complete - exported for use in NotificationsScreen
 */
export function completeOnboarding() {
  localStorage.setItem('nested_onboarding_complete', 'true')
}

/**
 * Reset onboarding - for testing (call from console: window.resetOnboarding())
 */
export function resetOnboarding() {
  localStorage.removeItem('nested_onboarding_complete')
}

// Expose reset function globally for testing
if (typeof window !== 'undefined') {
  window.resetOnboarding = resetOnboarding
}

/**
 * useIsDesktop - Hook to detect desktop screen width
 */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isDesktop
}

/**
 * Route categories for layout decisions
 */
const AUTH_ROUTES = ['/signup', '/uni-email', '/verify', '/onboarding/1', '/onboarding/2', '/onboarding/3']
const FORM_ROUTES = ['/profile', '/major', '/gender', '/interests', '/search-friends', '/notifications']
const APP_ROUTES = ['/discover', '/events', '/matches', '/messages', '/my-profile', '/filters']

/**
 * Public routes that don't require onboarding completion
 */
const PUBLIC_ROUTES = [
  '/', 
  '/onboarding/1', '/onboarding/2', '/onboarding/3',
  '/signup', '/uni-email', '/verify',
  '/profile', '/major', '/gender', '/interests', '/search-friends', '/notifications'
]

/**
 * AppContent - Main app content with routing and onboarding gate
 */
function AppContent() {
  const location = useLocation()
  const navigate = useNavigate()
  const isDesktop = useIsDesktop()
  const pathname = location.pathname

  const [hasOnboarded, setHasOnboarded] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Check onboarding status on mount
  useEffect(() => {
    const status = isOnboardingComplete()
    setHasOnboarded(status)
    setIsReady(true)
  }, [])

  // Handle redirects
  useEffect(() => {
    if (!isReady) return

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

    // On desktop, redirect from splash to discover if onboarded
    if (isDesktop && pathname === '/' && hasOnboarded) {
      navigate('/discover', { replace: true })
      return
    }

    // If not onboarded and trying to access protected route, redirect to onboarding
    if (!hasOnboarded && !isPublicRoute) {
      navigate('/onboarding/1', { replace: true })
      return
    }
  }, [isReady, hasOnboarded, pathname, isDesktop, navigate])

  // Show loading spinner while checking localStorage
  if (!isReady) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
      </div>
    )
  }

  // Determine layout type based on route
  const isAuthRoute = AUTH_ROUTES.includes(pathname)
  const isFormRoute = FORM_ROUTES.includes(pathname)
  const isAppRoute = APP_ROUTES.includes(pathname)
  const isChatRoute = pathname.startsWith('/chat/')
  const useDesktopLayout = isDesktop && (isAppRoute || isAuthRoute || isFormRoute || isChatRoute)

  const getLayoutType = () => {
    if (isAuthRoute) return 'auth'
    if (isFormRoute) return 'form'
    if (isChatRoute) return 'chat'
    return 'app'
  }

  return (
    <Routes>
      {/* Splash - Mobile landing */}
      <Route path="/" element={
        isDesktop 
          ? <Navigate to={hasOnboarded ? '/discover' : '/onboarding/1'} replace />
          : <MobileFrame><SplashScreen /></MobileFrame>
      } />
      
      {/* Onboarding */}
      <Route path="/onboarding/1" element={
        useDesktopLayout 
          ? <WebLayout layoutType="auth"><Onboarding1 /></WebLayout>
          : <MobileFrame><Onboarding1 /></MobileFrame>
      } />
      <Route path="/onboarding/2" element={
        useDesktopLayout 
          ? <WebLayout layoutType="auth"><Onboarding2 /></WebLayout>
          : <MobileFrame><Onboarding2 /></MobileFrame>
      } />
      <Route path="/onboarding/3" element={
        useDesktopLayout 
          ? <WebLayout layoutType="auth"><Onboarding3 /></WebLayout>
          : <MobileFrame><Onboarding3 /></MobileFrame>
      } />
      
      {/* Auth */}
      <Route path="/signup" element={
        useDesktopLayout 
          ? <WebLayout layoutType="auth"><SignUpScreen /></WebLayout>
          : <MobileFrame><SignUpScreen /></MobileFrame>
      } />
      <Route path="/uni-email" element={
        useDesktopLayout 
          ? <WebLayout layoutType="auth"><UniEmailScreen /></WebLayout>
          : <MobileFrame><UniEmailScreen /></MobileFrame>
      } />
      <Route path="/verify" element={
        useDesktopLayout 
          ? <WebLayout layoutType="auth"><VerifyScreen /></WebLayout>
          : <MobileFrame><VerifyScreen /></MobileFrame>
      } />
      
      {/* Profile Setup */}
      <Route path="/profile" element={
        useDesktopLayout 
          ? <WebLayout layoutType="form"><ProfileScreen /></WebLayout>
          : <MobileFrame><ProfileScreen /></MobileFrame>
      } />
      <Route path="/major" element={
        useDesktopLayout 
          ? <WebLayout layoutType="form"><MajorScreen /></WebLayout>
          : <MobileFrame><MajorScreen /></MobileFrame>
      } />
      <Route path="/gender" element={
        useDesktopLayout 
          ? <WebLayout layoutType="form"><GenderScreen /></WebLayout>
          : <MobileFrame><GenderScreen /></MobileFrame>
      } />
      <Route path="/interests" element={
        useDesktopLayout 
          ? <WebLayout layoutType="form"><InterestsScreen /></WebLayout>
          : <MobileFrame><InterestsScreen /></MobileFrame>
      } />
      <Route path="/search-friends" element={
        useDesktopLayout 
          ? <WebLayout layoutType="form"><SearchFriendsScreen /></WebLayout>
          : <MobileFrame><SearchFriendsScreen /></MobileFrame>
      } />
      <Route path="/notifications" element={
        useDesktopLayout 
          ? <WebLayout layoutType="form"><NotificationsScreen /></WebLayout>
          : <MobileFrame><NotificationsScreen /></MobileFrame>
      } />
      
      {/* Main App Routes */}
      <Route path="/discover" element={
        isDesktop 
          ? <WebLayout layoutType="app"><DiscoverScreen /></WebLayout>
          : <MobileFrame><DiscoverScreen /></MobileFrame>
      } />
      <Route path="/events" element={
        isDesktop 
          ? <WebLayout layoutType="app"><EventsScreen /></WebLayout>
          : <MobileFrame><EventsScreen /></MobileFrame>
      } />
      <Route path="/events/:eventId" element={
        isDesktop 
          ? <WebLayout layoutType="app"><EventDetailScreen /></WebLayout>
          : <MobileFrame><EventDetailScreen /></MobileFrame>
      } />
      <Route path="/matches" element={
        isDesktop 
          ? <WebLayout layoutType="app"><MatchesScreen /></WebLayout>
          : <MobileFrame><MatchesScreen /></MobileFrame>
      } />
      <Route path="/messages" element={
        isDesktop 
          ? <WebLayout layoutType="app"><MessagesScreen /></WebLayout>
          : <MobileFrame><MessagesScreen /></MobileFrame>
      } />
      <Route path="/filters" element={
        isDesktop 
          ? <WebLayout layoutType="app"><FiltersScreen /></WebLayout>
          : <MobileFrame><FiltersScreen /></MobileFrame>
      } />
      <Route path="/my-profile" element={
        isDesktop 
          ? <WebLayout layoutType="app"><ProfileScreen /></WebLayout>
          : <MobileFrame><ProfileScreen /></MobileFrame>
      } />
      <Route path="/create-project" element={
        isDesktop 
          ? <WebLayout layoutType="form"><CreateProjectScreen /></WebLayout>
          : <MobileFrame><CreateProjectScreen /></MobileFrame>
      } />
      
      {/* Chat */}
      <Route path="/chat/:id" element={
        isDesktop 
          ? <WebLayout layoutType="chat"><ChatScreen /></WebLayout>
          : <MobileFrame><ChatScreen /></MobileFrame>
      } />
      
      {/* Project Detail - uses projectId param */}
      <Route path="/projects/:projectId" element={
        isDesktop 
          ? <WebLayout layoutType="app"><ProfileDetailScreen /></WebLayout>
          : <MobileFrame><ProfileDetailScreen /></MobileFrame>
      } />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to={hasOnboarded ? '/discover' : '/'} replace />} />
    </Routes>
  )
}

/**
 * App - Root component
 */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
