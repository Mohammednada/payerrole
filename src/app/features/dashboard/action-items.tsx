import { motion } from 'motion/react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '../../../shared/lib/utils';
import { Card } from '../../../shared/components/ui/card';
import { useApp } from '../../../context/app-context';
import { mockActionItems } from '../../../mock/dashboard';
import type { ActionItem } from '../../../mock/dashboard';

const TYPE_STYLES: Record<ActionItem['type'], { border: string; icon: typeof AlertCircle; iconColor: string }> = {
  urgent: {
    border: 'border-l-error',
    icon: AlertCircle,
    iconColor: 'text-error',
  },
  warning: {
    border: 'border-l-warning',
    icon: AlertTriangle,
    iconColor: 'text-warning',
  },
  info: {
    border: 'border-l-uhc-blue',
    icon: Info,
    iconColor: 'text-uhc-blue',
  },
};

export function ActionItems() {
  const { navigate } = useApp();

  return (
    <Card className="flex h-full flex-col">
      <h2 className="mb-3 text-[14px] font-semibold text-text-primary">
        Action Items
      </h2>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {mockActionItems.map((item, i) => {
          const style = TYPE_STYLES[item.type];
          const Icon = style.icon;

          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              onClick={() => navigate(item.link)}
              className={cn(
                'w-full rounded-md border border-border bg-white px-3 py-2.5 text-left transition-colors hover:bg-[#f0f2f4]',
                'border-l-4',
                style.border,
              )}
            >
              <div className="flex items-start gap-2.5">
                <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', style.iconColor)} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-text-primary">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                  <p className="mt-1.5 text-[11px] text-text-muted">
                    {item.date}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </Card>
  );
}
