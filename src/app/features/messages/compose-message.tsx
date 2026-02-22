import { useState } from 'react';
import { Send, X } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../../shared/lib/utils';
import { Card } from '../../../shared/components/ui/card';
import { Input } from '../../../shared/components/ui/input';
import { Select } from '../../../shared/components/ui/select';
import { Button } from '../../../shared/components/ui/button';
import type { MessageCategory } from '../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ComposeMessageProps {
  onSend: () => void;
  onCancel: () => void;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CATEGORY_OPTIONS = [
  { value: 'claims', label: 'Claims' },
  { value: 'prior-auth', label: 'Prior Auth' },
  { value: 'eligibility', label: 'Eligibility' },
  { value: 'general', label: 'General' },
  { value: 'billing', label: 'Billing' },
  { value: 'technical', label: 'Technical' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ComposeMessage({ onSend, onCancel }: ComposeMessageProps) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<MessageCategory | ''>('');
  const [body, setBody] = useState('');

  const isValid = to.trim() !== '' && subject.trim() !== '' && body.trim() !== '';

  const handleSend = () => {
    if (!isValid) return;
    // In a real app this would POST to an API.
    onSend();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="max-w-3xl">
        <h2 className="text-[14px] font-semibold text-text-primary mb-4">
          Compose Message
        </h2>

        <div className="space-y-4">
          {/* To */}
          <Input
            label="To"
            placeholder="Recipient name or department..."
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          {/* Subject */}
          <Input
            label="Subject"
            placeholder="Message subject..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          {/* Category */}
          <Select
            label="Category"
            placeholder="Select a category..."
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(e) => setCategory(e.target.value as MessageCategory | '')}
          />

          {/* Body */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="compose-body"
              className="text-[13px] font-medium text-text-primary"
            >
              Message
            </label>
            <textarea
              id="compose-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type your message..."
              rows={8}
              className={cn(
                'w-full rounded-2xl border border-border bg-card px-3 py-2.5 text-[13px] text-text-primary placeholder:text-text-muted',
                'transition-colors duration-150 resize-y',
                'focus:outline-none focus:ring-2 focus:ring-uhc-blue/30 focus:border-uhc-blue',
                'hover:border-border-dark',
                'min-h-[200px]',
              )}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-3">
          <Button
            variant="primary"
            icon={<Send className="h-4 w-4" />}
            onClick={handleSend}
            disabled={!isValid}
          >
            Send
          </Button>
          <Button
            variant="ghost"
            icon={<X className="h-4 w-4" />}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
