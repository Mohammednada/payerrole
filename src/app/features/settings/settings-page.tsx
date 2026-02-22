import { useState } from 'react';
import { motion } from 'motion/react';
import { Tabs } from '../../../shared/components/ui/tabs';
import { PracticeInfoForm } from './practice-info-form';
import { UserManagementTable } from './user-management-table';
import { NotificationPreferences } from './notification-preferences';
import { SystemSettings } from './system-settings';

/* ------------------------------------------------------------------ */
/*  Tab definitions                                                    */
/* ------------------------------------------------------------------ */

const SETTINGS_TABS = [
  { id: 'practice', label: 'Practice Info' },
  { id: 'users', label: 'User Management' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'system', label: 'System' },
] as const;

type SettingsTabId = (typeof SETTINGS_TABS)[number]['id'];

/* ------------------------------------------------------------------ */
/*  Tab content map                                                    */
/* ------------------------------------------------------------------ */

const TAB_CONTENT: Record<SettingsTabId, React.FC> = {
  practice: PracticeInfoForm,
  users: UserManagementTable,
  notifications: NotificationPreferences,
  system: SystemSettings,
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabId>('practice');

  const ActivePanel = TAB_CONTENT[activeTab];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <h1 className="text-[16px] font-semibold text-text-primary">Settings</h1>
        <p className="mt-1 text-[13px] text-text-secondary">
          Manage your practice, users, notifications, and system preferences.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
      >
        <Tabs
          tabs={[...SETTINGS_TABS]}
          activeTab={activeTab}
          onChange={(id) => setActiveTab(id as SettingsTabId)}
        />
      </motion.div>

      {/* Active panel */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.15 }}
      >
        <ActivePanel />
      </motion.div>
    </div>
  );
}
