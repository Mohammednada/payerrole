import { FileText, Download, Image, File } from 'lucide-react';
import { cn } from '../../../../shared/lib/utils';
import { formatDate } from '../../../../shared/lib/utils';
import { Card } from '../../../../shared/components/ui/card';
import { EmptyState } from '../../../../shared/components/ui/empty-state';
import { downloadTemplate } from '../../../../shared/lib/download';
import type { PaDocument } from '../../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PaDocumentsProps {
  documents: PaDocument[];
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function docIcon(type: string) {
  if (type.includes('pdf')) return FileText;
  if (type.includes('image') || type.includes('dicom')) return Image;
  return File;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PaDocuments({ documents }: PaDocumentsProps) {
  if (documents.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No documents"
        description="No documents have been uploaded for this authorization."
      />
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => {
        const Icon = docIcon(doc.type);

        return (
          <Card key={doc.id} className="flex items-center gap-4" padding>
            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-uhc-blue-50">
              <Icon className="h-5 w-5 text-uhc-blue" />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-text-primary">
                {doc.name}
              </p>
              <p className="mt-0.5 text-[10px] text-text-muted">
                {doc.type} &middot; {doc.size} &middot; Uploaded{' '}
                {formatDate(doc.uploadDate)}
              </p>
            </div>

            {/* Download button */}
            <button
              type="button"
              className={cn(
                'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-text-muted transition-colors',
                'hover:bg-surface hover:text-text-secondary',
              )}
              aria-label={`Download ${doc.name}`}
              onClick={() => {
                downloadTemplate(doc.name, doc.name, `Document: ${doc.name} (${doc.type}, ${doc.size})`);
              }}
            >
              <Download className="h-4 w-4" />
            </button>
          </Card>
        );
      })}
    </div>
  );
}
