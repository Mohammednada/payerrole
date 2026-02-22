import { motion } from 'motion/react';
import { cn } from '../../../../shared/lib/utils';
import { formatDate } from '../../../../shared/lib/utils';
import { Card } from '../../../../shared/components/ui/card';
import type { PaTimelineEvent } from '../../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PaTimelineProps {
  events: PaTimelineEvent[];
}

/* ------------------------------------------------------------------ */
/*  Dot colour mapping (derived from event title keywords)             */
/* ------------------------------------------------------------------ */

function dotColor(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('approved') || lower.includes('auto-approved')) return 'bg-green-500';
  if (lower.includes('denied')) return 'bg-red-500';
  if (lower.includes('cancelled')) return 'bg-gray-400';
  if (lower.includes('expired')) return 'bg-gray-400';
  if (lower.includes('submitted') || lower.includes('request')) return 'bg-uhc-blue';
  if (lower.includes('info') || lower.includes('additional')) return 'bg-orange-500';
  return 'bg-blue-400';
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PaTimeline({ events }: PaTimelineProps) {
  return (
    <Card>
      <h3 className="mb-4 text-[14px] font-semibold text-text-primary">Timeline</h3>

      <div className="relative pl-6">
        {/* Vertical line */}
        <span
          className="absolute left-[7px] top-1.5 bottom-1.5 w-0.5 bg-border"
          aria-hidden="true"
        />

        <ul className="space-y-5">
          {events.map((event, index) => (
            <motion.li
              key={event.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.06 }}
              className="relative"
            >
              {/* Dot */}
              <span
                className={cn(
                  'absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 border-white',
                  dotColor(event.title),
                )}
                aria-hidden="true"
              />

              {/* Content */}
              <div>
                <p className="text-[13px] font-medium text-text-primary">
                  {event.title}
                </p>
                <p className="mt-0.5 text-[12px] text-text-secondary">
                  {event.description}
                </p>
                <div className="mt-1 flex items-center gap-3 text-[10px] text-text-muted">
                  <span>{formatDate(event.date)}</span>
                  {event.user && <span>{event.user}</span>}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
