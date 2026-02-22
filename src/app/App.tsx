import { AnimatePresence, motion } from 'motion/react';
import { AuthProvider, useAuth } from '../context/auth-context';
import { AppProvider, useApp } from '../context/app-context';
import { ToastProvider } from '../context/toast-context';
import { ErrorBoundary } from '../shared/components/error-boundary';
import { ToastContainer } from '../shared/components/ui/toast';
import { useToast } from '../context/toast-context';
import { AppShell } from './layout/app-shell';
import { AuthLayout } from './features/auth/auth-layout';
import { LoginPage } from './features/auth/login-page';
import { TinNpiSelect } from './features/auth/tin-npi-select';
import { MfaVerify } from './features/auth/mfa-verify';
import { DashboardPage } from './features/dashboard/dashboard-page';
import { PaPage } from './features/prior-auth/pa-page';
import { ClaimsPage } from './features/claims/claims-page';
import { EligibilityPage } from './features/eligibility/eligibility-page';
import { MembersPage } from './features/members/members-page';
import { ReportsPage } from './features/reports/reports-page';
import { MessagesPage } from './features/messages/messages-page';
import { SettingsPage } from './features/settings/settings-page';
import { ReferralsPage } from './features/referrals/referrals-page';
import type { ViewId } from '../shared/types';

function AuthFlow() {
  const { authStep } = useAuth();

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {authStep === 'login' && (
          <motion.div key="login" exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <LoginPage />
          </motion.div>
        )}
        {authStep === 'tin-select' && (
          <motion.div key="tin" exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <TinNpiSelect />
          </motion.div>
        )}
        {authStep === 'mfa' && (
          <motion.div key="mfa" exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <MfaVerify />
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}

const viewComponents: Record<ViewId, React.ComponentType> = {
  dashboard: DashboardPage,
  'prior-auth': PaPage,
  claims: ClaimsPage,
  eligibility: EligibilityPage,
  members: MembersPage,
  reports: ReportsPage,
  messages: MessagesPage,
  settings: SettingsPage,
  referrals: ReferralsPage,
};

function MainApp() {
  const { currentView } = useApp();
  const ViewComponent = viewComponents[currentView];

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          <ViewComponent />
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}

function ToastLayer() {
  const { toasts, removeToast } = useToast();
  return <ToastContainer toasts={toasts} onClose={removeToast} />;
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <MainApp /> : <AuthFlow />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <ToastProvider>
            <AppContent />
            <ToastLayer />
          </ToastProvider>
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
