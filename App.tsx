import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext.tsx';
import ProtectedRoutes from './router/ProtectedRoutes.tsx';
import PublicRoutes from './router/PublicRoutes.tsx';
import ScreenProtectionWrapper from './components/ScreenProtectionWrapper.tsx';

// Public Pages
import SplashPage from './pages/SplashPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignUpPage from './pages/SignUpPage.tsx';
import OtpPage from './pages/OtpPage.tsx';

// Protected Pages
import ChatsPage from './pages/ChatsPage.tsx';
import StatusPage from './pages/StatusPage.tsx';
import CallsPage from './pages/CallsPage.tsx';
import ChatScreen from './pages/ChatScreen.tsx';
import CallingScreen from './pages/CallingScreen.tsx';
import NewChatPage from './pages/NewChatPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import AddStatusPage from './pages/AddStatusPage.tsx';
import FindContactPage from './pages/FindContactPage.tsx';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/otp" element={<OtpPage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ScreenProtectionWrapper><ProtectedRoutes /></ScreenProtectionWrapper>}>
            <Route path="/" element={<ChatsPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/calls" element={<CallsPage />} />
            <Route path="/chat/:chatId" element={<ChatScreen isIncognito={false} />} />
            <Route path="/incognito-chat/:chatId" element={<ChatScreen isIncognito={true} />} />
            <Route path="/call/:callType/:contactId" element={<CallingScreen />} />
            <Route path="/new-chat" element={<NewChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/add-status" element={<AddStatusPage />} />
            <Route path="/find-contact" element={<FindContactPage />} />
          </Route>

           {/* Splash Screen as entry */}
          <Route path="/*" element={<SplashPage />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
