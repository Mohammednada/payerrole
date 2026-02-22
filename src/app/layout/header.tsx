import { useApp } from '../../context/app-context';
import { NotificationPopover } from './notification-popover';
import { UserMenu } from './user-menu';
import { Breadcrumbs } from '../../shared/components/ui/breadcrumbs';

export function Header() {
  const { breadcrumbs, navigate } = useApp();

  const breadcrumbItems = breadcrumbs.map((b) => ({
    label: b.label,
    onClick: b.viewId ? () => navigate(b.viewId!) : undefined,
  }));

  return (
    <header className="flex h-14 items-center justify-between border-b border-white/10 bg-uhc-blue px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15 text-[13px] font-bold text-white">
            R
          </div>
          <span className="text-[14px] font-semibold text-white">RolePayer</span>
        </div>
        <div className="hidden h-5 w-px bg-white/20 md:block" />
        <div className="hidden md:block">
          <Breadcrumbs items={breadcrumbItems} dark />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <NotificationPopover />
        <UserMenu />
      </div>
    </header>
  );
}
