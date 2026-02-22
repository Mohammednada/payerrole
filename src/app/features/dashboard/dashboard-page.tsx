import { motion } from 'motion/react';
import { KpiGrid } from './kpi-grid';
import { ClaimsStatusChart } from './claims-status-chart';
import { ActionItems } from './action-items';
import { PaVolumeChart } from './pa-volume-chart';
import { ActivityFeed } from './activity-feed';
import { QuickLinks } from './quick-links';

export function DashboardPage() {
  return (
    <div className="space-y-4">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <h1 className="text-[16px] font-semibold text-text-primary">Dashboard</h1>
        <p className="mt-1 text-[13px] text-text-secondary">
          Welcome back, Sarah
        </p>
      </motion.div>

      {/* KPI cards */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
      >
        <KpiGrid />
      </motion.div>

      {/* Claims Status + Action Items */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="grid grid-cols-1 gap-4 lg:grid-cols-5"
      >
        <div className="lg:col-span-3">
          <ClaimsStatusChart />
        </div>
        <div className="lg:col-span-2">
          <ActionItems />
        </div>
      </motion.div>

      {/* PA Volume + Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.15 }}
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
      >
        <PaVolumeChart />
        <ActivityFeed />
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.2 }}
      >
        <QuickLinks />
      </motion.div>
    </div>
  );
}
