import { motion } from 'motion/react';
import { cn } from '../../../shared/lib/utils';
import { Card } from '../../../shared/components/ui/card';
import { mockActivityFeed } from '../../../mock/dashboard';

const TYPE_DOT_COLOR: Record<string, string> = {
  claim: 'bg-uhc-blue',
  'prior-auth': 'bg-success',
  eligibility: 'bg-warning',
  message: 'bg-purple-500',
  referral: 'bg-teal-500',
  report: 'bg-gray-400',
  settings: 'bg-gray-400',
};

function formatFeedDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function ActivityFeed() {
  return (
    <Card className="flex h-full flex-col">
      <h2 className="mb-3 text-[14px] font-semibold text-text-primary">
        Recent Activity
      </h2>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {mockActivityFeed.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            className="flex items-start gap-3"
          >
            <span
              className={cn(
                'mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full',
                TYPE_DOT_COLOR[entry.type] ?? 'bg-gray-300',
              )}
            />

            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-text-primary">
                <span className="font-semibold">{entry.action}</span>
                {' '}
                {entry.description}
              </p>
              <p className="mt-0.5 text-xs text-text-muted">
                {entry.user} &middot; {formatFeedDate(entry.date)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
