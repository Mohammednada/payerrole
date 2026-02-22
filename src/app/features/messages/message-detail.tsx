import { ArrowLeft, Reply, Archive, FileText, FileSpreadsheet, File } from 'lucide-react';
import { motion } from 'motion/react';
import { cn, formatDate } from '../../../shared/lib/utils';
import type { Message, MessageAttachment } from '../../../shared/types';
import { Badge } from '../../../shared/components/ui/badge';
import { Button } from '../../../shared/components/ui/button';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MessageDetailProps {
  message: Message;
  onBack: () => void;
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

function getFileIcon(type: string) {
  if (type.includes('pdf')) return FileText;
  if (type.includes('spreadsheet') || type.includes('excel')) return FileSpreadsheet;
  return File;
}

/* ------------------------------------------------------------------ */
/*  Attachment row                                                     */
/* ------------------------------------------------------------------ */

function AttachmentRow({ attachment }: { attachment: MessageAttachment }) {
  const Icon = getFileIcon(attachment.type);

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-border bg-surface px-3 py-2.5',
        'hover:border-border-dark transition-colors duration-150',
      )}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-uhc-blue-50 flex-shrink-0">
        <Icon className="h-4.5 w-4.5 text-uhc-blue" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-text-primary truncate">
          {attachment.name}
        </p>
        <p className="text-[11px] text-text-muted">{attachment.size}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MessageDetail({ message, onBack }: MessageDetailProps) {
  const bodyParagraphs = message.body.split('\n').filter((line) => line.trim() !== '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to messages
      </button>

      {/* Header card */}
      <div className="rounded-2xl border border-border bg-card p-5">
        {/* Subject + category */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-[16px] font-semibold text-text-primary">
            {message.subject}
          </h1>
          <Badge variant={categoryBadgeVariant[message.category] ?? 'default'}>
            {categoryLabel[message.category] ?? message.category}
          </Badge>
        </div>

        {/* Metadata */}
        <div className="mt-4 flex flex-col gap-1.5 text-[13px] text-text-secondary">
          <div className="flex gap-2">
            <span className="font-medium text-text-primary w-12">From:</span>
            <span>{message.from}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-text-primary w-12">To:</span>
            <span>{message.to}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-text-primary w-12">Date:</span>
            <span>{formatDate(message.date)}</span>
          </div>
          {message.relatedRef && (
            <div className="flex gap-2">
              <span className="font-medium text-text-primary w-12">Ref:</span>
              <span className="text-uhc-blue font-medium">{message.relatedRef}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <hr className="my-4 border-border" />

        {/* Body */}
        <div className="space-y-3">
          {bodyParagraphs.map((paragraph, index) => (
            <p key={index} className="text-[13px] leading-relaxed text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-4">
            <h3 className="text-[14px] font-semibold text-text-primary mb-3">
              Attachments ({message.attachments.length})
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {message.attachments.map((attachment) => (
                <AttachmentRow key={attachment.id} attachment={attachment} />
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center gap-3">
          <Button
            variant="primary"
            icon={<Reply className="h-4 w-4" />}
          >
            Reply
          </Button>
          <Button
            variant="secondary"
            icon={<Archive className="h-4 w-4" />}
          >
            Archive
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
