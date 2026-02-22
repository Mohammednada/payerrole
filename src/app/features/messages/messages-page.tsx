import { useState, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import type { Message } from '../../../shared/types';
import { mockMessages } from '../../../mock/messages';
import { Tabs } from '../../../shared/components/ui/tabs';
import { Badge } from '../../../shared/components/ui/badge';
import { Button } from '../../../shared/components/ui/button';
import { MessageList } from './message-list';
import { MessageDetail } from './message-detail';
import { ComposeMessage } from './compose-message';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SubView = 'list' | 'detail' | 'compose';
type TabId = 'inbox' | 'sent';

/* ------------------------------------------------------------------ */
/*  Transition variants                                                */
/* ------------------------------------------------------------------ */

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const pageTransition = { duration: 0.25, ease: "easeInOut" as const };

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MessagesPage() {
  const [subView, setSubView] = useState<SubView>('list');
  const [activeTab, setActiveTab] = useState<TabId>('inbox');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  /* ---- Derived data ---- */

  const inboxMessages = useMemo(
    () =>
      mockMessages
        .filter((msg) => msg.isInbound)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [],
  );

  const sentMessages = useMemo(
    () =>
      mockMessages
        .filter((msg) => !msg.isInbound)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [],
  );

  const unreadCount = useMemo(
    () => inboxMessages.filter((msg) => msg.status === 'unread').length,
    [inboxMessages],
  );

  const currentMessages = activeTab === 'inbox' ? inboxMessages : sentMessages;

  /* ---- Tabs with badge ---- */

  const tabs = useMemo(
    () => [
      {
        id: 'inbox',
        label: unreadCount > 0 ? `Inbox (${unreadCount})` : 'Inbox',
      },
      { id: 'sent', label: 'Sent' },
    ],
    [unreadCount],
  );

  /* ---- Navigation handlers ---- */

  const handleSelect = useCallback((message: Message) => {
    setSelectedMessage(message);
    setSubView('detail');
  }, []);

  const handleCompose = useCallback(() => {
    setSubView('compose');
  }, []);

  const handleBack = useCallback(() => {
    setSelectedMessage(null);
    setSubView('list');
  }, []);

  const handleSend = useCallback(() => {
    // In a real app this would POST to an API.
    setSubView('list');
  }, []);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId as TabId);
    setSelectedMessage(null);
    setSubView('list');
  }, []);

  /* ---- Render ---- */

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[16px] font-semibold text-text-primary">Messages</h1>
            {unreadCount > 0 && (
              <Badge variant="default">{unreadCount} unread</Badge>
            )}
          </div>
          <p className="mt-1 text-[13px] text-text-secondary">
            View and manage your secure messages.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Plus className="h-4 w-4" />}
          onClick={handleCompose}
        >
          Compose
        </Button>
      </div>

      {/* Tabs — only shown in list view */}
      {subView === 'list' && (
        <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />
      )}

      {/* Sub-views */}
      <AnimatePresence mode="wait">
        {subView === 'list' && (
          <motion.div
            key={`list-${activeTab}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <MessageList
              messages={currentMessages}
              onSelect={handleSelect}
            />
          </motion.div>
        )}

        {subView === 'detail' && selectedMessage && (
          <motion.div
            key="detail"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <MessageDetail message={selectedMessage} onBack={handleBack} />
          </motion.div>
        )}

        {subView === 'compose' && (
          <motion.div
            key="compose"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <ComposeMessage onSend={handleSend} onCancel={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
