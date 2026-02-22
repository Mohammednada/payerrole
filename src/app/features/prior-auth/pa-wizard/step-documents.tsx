import { Upload, FileText, Check, Circle } from 'lucide-react';
import { cn } from '../../../../shared/lib/utils';
import { Card } from '../../../../shared/components/ui/card';
import type { PaType, DocumentChecklistItem } from '../../../../shared/types';
import { PA_DOCUMENT_REQUIREMENTS } from '../../../../mock/prior-auth';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StepDocumentsProps {
  paType: PaType;
  data: DocumentChecklistItem[];
  onChange: (checklist: DocumentChecklistItem[]) => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StepDocuments({ paType, data, onChange }: StepDocumentsProps) {
  const requirements = PA_DOCUMENT_REQUIREMENTS[paType] ?? [];

  // Ensure checklist items exist for all requirements
  const checklist: DocumentChecklistItem[] = requirements.map((req) => {
    const existing = data.find((d) => d.requirementId === req.id);
    return existing ?? { requirementId: req.id, uploaded: false };
  });

  const uploadedCount = checklist.filter((c) => c.uploaded).length;
  const totalCount = requirements.length;
  const requiredCount = requirements.filter((r) => r.required).length;
  const requiredUploaded = checklist.filter((c) => {
    const req = requirements.find((r) => r.id === c.requirementId);
    return req?.required && c.uploaded;
  }).length;

  const handleToggle = (requirementId: string) => {
    const updated = checklist.map((item) => {
      if (item.requirementId === requirementId) {
        return {
          ...item,
          uploaded: !item.uploaded,
          fileName: !item.uploaded ? `${requirementId}_document.pdf` : undefined,
        };
      }
      return item;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[14px] font-semibold text-text-primary">
          Document Requirements
        </h2>
        <p className="mt-1 text-[13px] text-text-secondary">
          Review and attach the required documents for this{' '}
          <span className="font-medium capitalize">{paType}</span> authorization.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-uhc-blue rounded-full transition-all"
            style={{ width: `${totalCount > 0 ? (uploadedCount / totalCount) * 100 : 0}%` }}
          />
        </div>
        <span className="text-[12px] text-text-secondary whitespace-nowrap">
          {uploadedCount} of {totalCount} documents attached
        </span>
      </div>

      <p className="text-[12px] text-text-muted">
        {requiredUploaded} of {requiredCount} required documents attached
      </p>

      {/* Checklist */}
      <div className="space-y-2">
        {requirements.map((req) => {
          const item = checklist.find((c) => c.requirementId === req.id);
          const isUploaded = item?.uploaded ?? false;

          return (
            <Card key={req.id} className="!p-3">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle(req.id)}
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors',
                    isUploaded
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-border hover:border-uhc-blue',
                  )}
                >
                  {isUploaded ? <Check className="h-3 w-3" /> : <Circle className="h-3 w-3 text-transparent" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={cn('text-[13px] font-medium', isUploaded ? 'text-text-primary' : 'text-text-secondary')}>
                      {req.name}
                    </p>
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold',
                        req.required
                          ? 'bg-red-50 text-red-600'
                          : 'bg-gray-100 text-text-muted',
                      )}
                    >
                      {req.required ? 'Required' : 'Optional'}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-text-muted">{req.description}</p>
                  {isUploaded && item?.fileName && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-green-600">
                      <FileText className="h-3 w-3" />
                      {item.fileName}
                    </div>
                  )}
                </div>

                {!isUploaded && (
                  <button
                    type="button"
                    onClick={() => handleToggle(req.id)}
                    className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-text-secondary hover:border-uhc-blue hover:text-uhc-blue transition-colors"
                  >
                    <Upload className="h-3 w-3" />
                    Upload
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
