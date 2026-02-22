import { useState } from 'react';
import { StickyNote, Send } from 'lucide-react';
import { cn } from '../../../../shared/lib/utils';
import { EmptyState } from '../../../../shared/components/ui/empty-state';
import { Button } from '../../../../shared/components/ui/button';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PaNotesProps {
  initialNotes: string[];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PaNotes({ initialNotes }: PaNotesProps) {
  const [notes, setNotes] = useState<string[]>(initialNotes);
  const [draft, setDraft] = useState('');

  const handleAdd = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setNotes((prev) => [...prev, trimmed]);
    setDraft('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-4">
      {/* Notes list */}
      {notes.length === 0 ? (
        <EmptyState
          icon={StickyNote}
          title="No notes"
          description="No notes have been added yet."
        />
      ) : (
        <ul className="space-y-2">
          {notes.map((note, idx) => (
            <li
              key={idx}
              className={cn(
                'rounded-2xl border border-border bg-surface/50 px-4 py-3 text-[13px] text-text-primary',
              )}
            >
              {note}
            </li>
          ))}
        </ul>
      )}

      {/* Add note */}
      <div className="flex items-end gap-2">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a note..."
          rows={2}
          className={cn(
            'flex-1 resize-none rounded-md border border-border bg-card px-3 py-2 text-[13px] text-text-primary placeholder:text-text-muted',
            'focus:outline-none focus:ring-2 focus:ring-uhc-blue/30 focus:border-uhc-blue',
          )}
        />
        <Button
          variant="primary"
          size="sm"
          icon={<Send className="h-3.5 w-3.5" />}
          disabled={!draft.trim()}
          onClick={handleAdd}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
