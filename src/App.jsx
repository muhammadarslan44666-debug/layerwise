import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import SiteLayout from '@/components/layout/SiteLayout';
import Home from '@/pages/Home';
import FixMyPrint from '@/pages/FixMyPrint';
import Troubleshooting from '@/pages/Troubleshooting';
import ProblemDetail from '@/pages/ProblemDetail';
import Tools from '@/pages/Tools';
import ToolDetail from '@/pages/ToolDetail';
import Catalog from '@/pages/Catalog';
import CatalogDetail from '@/pages/CatalogDetail';
import Guides from '@/pages/Guides';
import GuideDetail from '@/pages/GuideDetail';
import Search from '@/pages/Search';
import Contact from '@/pages/Contact';
import Legal from '@/pages/Legal';
import NotFound from '@/pages/NotFound';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/fix-my-print" element={<FixMyPrint />} />
        <Route path="/troubleshooting" element={<Troubleshooting />} />
        <Route path="/troubleshooting/:slug" element={<ProblemDetail />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/:slug" element={<ToolDetail />} />
        <Route path="/printers" element={<Catalog />} />
        <Route path="/printers/:manufacturer" element={<Catalog />} />
        <Route path="/printers/:manufacturer/:model" element={<CatalogDetail />} />
        <Route path="/filaments" element={<Catalog />} />
        <Route path="/filaments/:slug" element={<CatalogDetail />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/guides/:slug" element={<GuideDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        {['about','privacy','terms','disclaimer','affiliate-disclosure','policies'].map(path=><Route key={path} path={`/${path}`} element={<Legal />} />)}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App