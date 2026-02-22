import { cn } from '../../shared/lib/utils';
import type { LucideIcon } from 'lucide-react';
import type { ViewId } from '../../shared/types';

interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  viewId: ViewId;
  active: boolean;
  collapsed: boolean;
  badge?: number;
  onClick: (viewId: ViewId) => void;
}

export function SidebarNavItem({
  icon: Icon,
  label,
  viewId,
  active,
  collapsed,
  badge,
  onClick,
}: SidebarNavItemProps) {
  return (
    <button
      onClick={() => onClick(viewId)}
      title={collapsed ? label : undefined}
      className={cn(
        'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all',
        collapsed && 'justify-center px-0',
        active
          ? 'bg-uhc-blue-50 text-uhc-blue'
          : 'text-text-secondary hover:bg-[#f0f2f4] hover:text-text-primary'
      )}
    >
      <Icon
        size={20}
        className={cn(
          'shrink-0',
          active ? 'text-uhc-blue' : 'text-text-muted group-hover:text-text-secondary'
        )}
      />
      {!collapsed && (
        <>
          <span className="flex-1 text-left">{label}</span>
          {badge != null && badge > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-error px-1.5 text-[10px] font-semibold text-white">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </>
      )}
    </button>
  );
}
