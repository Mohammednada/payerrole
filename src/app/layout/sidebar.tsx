import { motion } from 'motion/react';
import {
  LayoutDashboard,
  FileCheck,
  Receipt,
  UserCheck,
  Users,
  BarChart3,
  Mail,
  Settings,
  ArrowRightLeft,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { useApp } from '../../context/app-context';
import { SidebarNavItem } from './sidebar-nav-item';
import type { ViewId } from '../../shared/types';

const navItems: { icon: typeof LayoutDashboard; label: string; viewId: ViewId; badge?: number }[] = [
  { icon: LayoutDashboard, label: 'Dashboard', viewId: 'dashboard' },
  { icon: FileCheck, label: 'Prior Auth', viewId: 'prior-auth', badge: 5 },
  { icon: Receipt, label: 'Claims', viewId: 'claims' },
  { icon: UserCheck, label: 'Eligibility', viewId: 'eligibility' },
  { icon: Users, label: 'Members', viewId: 'members' },
  { icon: BarChart3, label: 'Reports', viewId: 'reports' },
  { icon: Mail, label: 'Messages', viewId: 'messages', badge: 3 },
  { icon: Settings, label: 'Settings', viewId: 'settings' },
  { icon: ArrowRightLeft, label: 'Referrals', viewId: 'referrals' },
];

export function Sidebar() {
  const { currentView, sidebarCollapsed, toggleSidebar, navigate } = useApp();

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 64 : 240 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="flex h-full flex-col border-r border-border bg-card"
    >
      <div className="flex items-center justify-between px-3 py-3">
        {!sidebarCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-semibold uppercase tracking-wider text-text-muted"
          >
            Navigation
          </motion.span>
        )}
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1.5 text-text-muted hover:bg-surface hover:text-text-secondary"
        >
          {sidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.viewId}
            icon={item.icon}
            label={item.label}
            viewId={item.viewId}
            active={currentView === item.viewId}
            collapsed={sidebarCollapsed}
            badge={item.badge}
            onClick={navigate}
          />
        ))}
      </nav>

      {!sidebarCollapsed && (
        <div className="border-t border-border px-4 py-3">
          <div className="text-[10px] text-text-muted">
            RolePayer v1.0 &middot; Provider Portal
          </div>
        </div>
      )}
    </motion.aside>
  );
}
