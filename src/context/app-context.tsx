import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ViewId, Notification, Breadcrumb } from '../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface AppState {
  currentView: ViewId;
  sidebarCollapsed: boolean;
  notifications: Notification[];
  breadcrumbs: Breadcrumb[];
}

interface AppContextValue extends AppState {
  navigate: (viewId: ViewId) => void;
  toggleSidebar: () => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const VIEW_LABELS: Record<ViewId, string> = {
  dashboard: 'Dashboard',
  'prior-auth': 'Prior Authorization',
  claims: 'Claims',
  eligibility: 'Eligibility',
  members: 'Members',
  reports: 'Reports',
  messages: 'Messages',
  settings: 'Settings',
  referrals: 'Referrals',
};

function buildBreadcrumbs(viewId: ViewId): Breadcrumb[] {
  const crumbs: Breadcrumb[] = [{ label: 'Home', viewId: 'dashboard' }];
  if (viewId !== 'dashboard') {
    crumbs.push({ label: VIEW_LABELS[viewId], viewId });
  }
  return crumbs;
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'PA Approved',
    message: 'Prior authorization PA-2024-0892 has been approved.',
    type: 'success',
    date: '2026-02-21T09:15:00Z',
    read: false,
  },
  {
    id: 'n2',
    title: 'Claim Denied',
    message: 'Claim CLM-441987 was denied due to missing documentation.',
    type: 'error',
    date: '2026-02-21T08:42:00Z',
    read: false,
  },
  {
    id: 'n3',
    title: 'System Maintenance',
    message: 'Scheduled maintenance window tonight from 11 PM to 2 AM EST.',
    type: 'warning',
    date: '2026-02-20T16:00:00Z',
    read: false,
  },
  {
    id: 'n4',
    title: 'New Message',
    message: 'You have a new message from UHC Provider Relations.',
    type: 'info',
    date: '2026-02-20T14:30:00Z',
    read: true,
  },
  {
    id: 'n5',
    title: 'Eligibility Updated',
    message: 'Member eligibility for John Doe has been verified and updated.',
    type: 'info',
    date: '2026-02-20T11:05:00Z',
    read: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Initial state                                                      */
/* ------------------------------------------------------------------ */

const initialState: AppState = {
  currentView: 'dashboard',
  sidebarCollapsed: false,
  notifications: INITIAL_NOTIFICATIONS,
  breadcrumbs: buildBreadcrumbs('dashboard'),
};

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const AppContext = createContext<AppContextValue | undefined>(undefined);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const navigate = useCallback((viewId: ViewId) => {
    setState((prev) => ({
      ...prev,
      currentView: viewId,
      breadcrumbs: buildBreadcrumbs(viewId),
    }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setState((prev) => ({
      ...prev,
      sidebarCollapsed: !prev.sidebarCollapsed,
    }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  }, []);

  const clearNotifications = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: [],
    }));
  }, []);

  const value: AppContextValue = {
    ...state,
    navigate,
    toggleSidebar,
    markNotificationRead,
    clearNotifications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
