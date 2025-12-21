import { Routes, Route } from 'react-router-dom'
import MobileFrame from './components/MobileFrame'

// Pages - Exact Figma copies
import SplashScreen from './pages/SplashScreen'
import Onboarding1 from './pages/Onboarding1'
import Onboarding2 from './pages/Onboarding2'
import Onboarding3 from './pages/Onboarding3'
import SignUpScreen from './pages/SignUpScreen'
import PhoneScreen from './pages/PhoneScreen'
import VerifyScreen from './pages/VerifyScreen'
import ProfileScreen from './pages/ProfileScreen'
import GenderScreen from './pages/GenderScreen'
import MajorScreen from './pages/MajorScreen'
import InterestsScreen from './pages/InterestsScreen'

// New screens
import SearchFriendsScreen from './pages/SearchFriendsScreen'
import NotificationsScreen from './pages/NotificationsScreen'
import DiscoverScreen from './pages/DiscoverScreen'
import FiltersScreen from './pages/FiltersScreen'
import ProfileDetailScreen from './pages/ProfileDetailScreen'
import MatchesScreen from './pages/MatchesScreen'
import MessagesScreen from './pages/MessagesScreen'
import ChatScreen from './pages/ChatScreen'

function App() {
  return (
    <div className="desktop-preview">
      <MobileFrame>
        <Routes>
          {/* Splash */}
          <Route path="/" element={<SplashScreen />} />
          
          {/* Onboarding Flow */}
          <Route path="/onboarding/1" element={<Onboarding1 />} />
          <Route path="/onboarding/2" element={<Onboarding2 />} />
          <Route path="/onboarding/3" element={<Onboarding3 />} />
          
          {/* Auth Flow */}
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/phone" element={<PhoneScreen />} />
          <Route path="/verify" element={<VerifyScreen />} />
          
          {/* Profile Setup Flow */}
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/major" element={<MajorScreen />} />
          <Route path="/gender" element={<GenderScreen />} />
          <Route path="/interests" element={<InterestsScreen />} />
          
          {/* Permissions Flow */}
          <Route path="/search-friends" element={<SearchFriendsScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          
          {/* Main App Screens */}
          <Route path="/discover" element={<DiscoverScreen />} />
          <Route path="/filters" element={<FiltersScreen />} />
          <Route path="/profile-detail" element={<ProfileDetailScreen />} />
          <Route path="/matches" element={<MatchesScreen />} />
          <Route path="/messages" element={<MessagesScreen />} />
          <Route path="/chat/:id" element={<ChatScreen />} />
          <Route path="/my-profile" element={<ProfileScreen />} />
        </Routes>
      </MobileFrame>
    </div>
  )
}

export default App

