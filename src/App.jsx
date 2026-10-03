import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./admin/AdminLayout";
import { AdminLoginPage } from "./admin/AdminLoginPage";
import { CallOverlay } from "./calls/CallOverlay";
import { CallProvider } from "./calls/CallProvider";
import {
  ProfileCompletionGate,
  RequireAdmin,
  RequireAuth,
  ScrollToTop,
} from "./components/RouteGuards";
import { AuthProvider } from "./context/AuthContext";
import { AccountPage } from "./pages/AccountPage";
import { CompleteProfilePage } from "./pages/CompleteProfilePage";
import { ExplorePage } from "./pages/ExplorePage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { HomePage } from "./pages/HomePage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { LegalPage, NotFoundPage } from "./pages/LegalPage";
import { LoginPage } from "./pages/LoginPage";
import { SafetyPage } from "./pages/SafetyPage";
import { SignupPage } from "./pages/SignupPage";
import { SuccessStoriesPage } from "./pages/SuccessStoriesPage";
import { MessagingPage } from "./pages/messaging/MessagingPage";

function App() {
  return (
    <AuthProvider>
      <CallProvider>
        <ScrollToTop />
        <ProfileCompletionGate />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route
            path="/complete-profile"
            element={
              <RequireAuth>
                <CompleteProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="/account"
            element={
              <RequireAuth>
                <AccountPage />
              </RequireAuth>
            }
          />
          <Route
            path="/messaging"
            element={
              <RequireAuth>
                <MessagingPage />
              </RequireAuth>
            }
          />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/terms" element={<LegalPage page="terms" />} />
          <Route path="/privacy" element={<LegalPage page="privacy" />} />
          <Route path="/cookies" element={<LegalPage page="cookies" />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/*"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <CallOverlay />
      </CallProvider>
    </AuthProvider>
  );
}

export { App };
