import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Check, X } from 'lucide-react';
import { useApp } from '../../context/app-context';
import { useClickOutside } from '../../shared/hooks/use-click-outside';
import { cn } from '../../shared/lib/utils';

export function NotificationPopover() {
  const { notifications, markNotificationRead, clearNotifications } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
  const unreadCount = notifications.filter((n) => !n.read).length;

  const typeColors = {
    info: 'bg-info-light text-info',
    warning: 'bg-warning-light text-warning',
    success: 'bg-success-light text-success',
    error: 'bg-error-light text-error',
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-[14px] font-semibold text-text-primary">
                Notifications
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={clearNotifications}
                  className="text-xs text-uhc-blue-light hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-[13px] text-text-muted">
                  No notifications
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      'flex items-start gap-3 border-b border-border/50 px-4 py-3 last:border-0',
                      !n.read && 'bg-surface'
                    )}
                  >
                    <div
                      className={cn(
                        'mt-0.5 rounded-full px-1.5 py-1 text-[10px]',
                        typeColors[n.type]
                      )}
                    >
                      <Check size={12} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-medium text-text-primary">
                        {n.title}
                      </div>
                      <div className="text-xs text-text-secondary">{n.message}</div>
                      <div className="mt-1 text-[10px] text-text-muted">{n.date}</div>
                    </div>
                    {!n.read && (
                      <button
                        onClick={() => markNotificationRead(n.id)}
                        className="mt-0.5 text-text-muted hover:text-text-secondary"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
