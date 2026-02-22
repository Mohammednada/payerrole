import { useState, useMemo } from 'react';
import { Mail, Inbox } from 'lucide-react';
import { cn, formatDate } from '../../../shared/lib/utils';
import type { Message } from '../../../shared/types';
import { SearchInput } from '../../../shared/components/ui/search-input';
import { Badge } from '../../../shared/components/ui/badge';
import { EmptyState } from '../../../shared/components/ui/empty-state';
import { MessageFilters, type MessageFilterValue } from './message-filters';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MessageListProps {
  messages: Message[];
  onSelect: (message: Message) => void;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const categoryBadgeVariant: Record<string, 'default' | 'success' | 'error' | 'warning' | 'info' | 'teal'> = {
  'claims': 'default',
  'prior-auth': 'info',
  'eligibility': 'success',
  'general': 'teal',
  'billing': 'warning',
  'technical': 'error',
};

const categoryLabel: Record<string, string> = {
  'claims': 'Claims',
  'prior-auth': 'Prior Auth',
  'eligibility': 'Eligibility',
  'general': 'General',
  'billing': 'Billing',
  'technical': 'Technical',
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MessageList({ messages, onSelect }: MessageListProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<MessageFilterValue>('all');

  /* -- Filtering -- */
  const filteredMessages = useMemo(() => {
    let result = messages;

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((msg) => msg.category === categoryFilter);
    }

    // Search filter
    if (search.trim()) {
      const lower = search.toLowerCase();
      result = result.filter(
        (msg) =>
          msg.subject.toLowerCase().includes(lower) ||
          msg.from.toLowerCase().includes(lower) ||
          msg.to.toLowerCase().includes(lower),
      );
    }

    return result;
  }, [messages, search, categoryFilter]);

  /* -- Render -- */
  return (
    <div className="space-y-4">
      {/* Filters */}
      <MessageFilters
        activeFilter={categoryFilter}
        onFilterChange={setCategoryFilter}
      />

      {/* Search */}
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search by subject, sender, or recipient..."
        className="max-w-md"
      />

      {/* Message rows */}
      {filteredMessages.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No messages found"
          description="No messages match your current search or filter criteria."
        />
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
          {filteredMessages.map((message) => {
            const isUnread = message.status === 'unread';

            return (
              <button
                key={message.id}
                type="button"
                onClick={() => onSelect(message)}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors duration-150',
                  'hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-uhc-blue',
                  isUnread && 'bg-uhc-blue-50/30',
                )}
              >
                {/* Unread indicator */}
                <div className="flex-shrink-0 w-2.5">
                  {isUnread && (
                    <span className="block h-2.5 w-2.5 rounded-full bg-uhc-blue" />
                  )}
                </div>

                {/* Icon */}
                <div className="flex-shrink-0">
                  <Mail
                    className={cn(
                      'h-4.5 w-4.5',
                      isUnread ? 'text-uhc-blue' : 'text-text-muted',
                    )}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'text-[13px] truncate',
                        isUnread
                          ? 'font-semibold text-text-primary'
                          : 'font-normal text-text-primary',
                      )}
                    >
                      {message.subject}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-text-muted truncate">
                    {message.isInbound ? `From: ${message.from}` : `To: ${message.to}`}
                  </p>
                </div>

                {/* Category badge */}
                <div className="flex-shrink-0 hidden sm:block">
                  <Badge variant={categoryBadgeVariant[message.category] ?? 'default'}>
                    {categoryLabel[message.category] ?? message.category}
                  </Badge>
                </div>

                {/* Date */}
                <div className="flex-shrink-0 text-[11px] text-text-muted whitespace-nowrap">
                  {formatDate(message.date)}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
