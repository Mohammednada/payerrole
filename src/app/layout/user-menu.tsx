import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../context/auth-context';
import { useApp } from '../../context/app-context';
import { useClickOutside } from '../../shared/hooks/use-click-outside';

export function UserMenu() {
  const { user, logout } = useAuth();
  const { navigate } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-white/80 hover:bg-white/10 hover:text-white"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal text-xs font-semibold text-white">
          {user.firstName[0]}
          {user.lastName[0]}
        </div>
        <span className="hidden text-[13px] font-medium md:inline">
          {user.firstName} {user.lastName}
        </span>
        <ChevronDown size={14} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-border bg-card py-1"
          >
            <div className="border-b border-border px-4 py-3">
              <div className="text-[13px] font-medium text-text-primary">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-xs text-text-secondary">{user.email}</div>
              <div className="mt-1 inline-block rounded-full bg-uhc-blue-50 px-2 py-0.5 text-[10px] font-medium capitalize text-uhc-blue">
                {user.role}
              </div>
            </div>
            <div className="py-1">
              <button
                onClick={() => { navigate('settings'); setOpen(false); }}
                className="flex w-full items-center gap-2.5 px-4 py-2 text-[13px] text-text-secondary hover:bg-[#f0f2f4] hover:text-text-primary"
              >
                <Settings size={15} />
                Settings
              </button>
              <button
                onClick={() => { navigate('settings'); setOpen(false); }}
                className="flex w-full items-center gap-2.5 px-4 py-2 text-[13px] text-text-secondary hover:bg-[#f0f2f4] hover:text-text-primary"
              >
                <User size={15} />
                Profile
              </button>
            </div>
            <div className="border-t border-border py-1">
              <button
                onClick={logout}
                className="flex w-full items-center gap-2.5 px-4 py-2 text-[13px] text-error hover:bg-error-light"
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
