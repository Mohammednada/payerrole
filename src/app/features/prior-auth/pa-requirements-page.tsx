import { useState } from 'react';
import {
  ArrowLeft,
  Building2,
  Stethoscope,
  Pill,
  ScanLine,
  Armchair,
  Home,
  ChevronRight,
  FileText,
  Clock,
  ListChecks,
  Download,
} from 'lucide-react';
import { cn } from '../../../shared/lib/utils';
import type { PaType, PaTypeGuideline } from '../../../shared/types';
import { Card } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { PA_TYPE_GUIDELINES, PA_DOCUMENT_REQUIREMENTS } from '../../../mock/prior-auth';
import { PaTypeRequirements } from './pa-type-requirements';
import { PaPharmacyRequirements } from './pa-pharmacy-requirements';
import { downloadAllTemplates } from '../../../shared/lib/download';

/* ------------------------------------------------------------------ */
/*  Type icon map                                                      */
/* ------------------------------------------------------------------ */

const typeIcons: Record<PaType, React.ReactNode> = {
  inpatient: <Building2 className="h-6 w-6" />,
  outpatient: <Stethoscope className="h-6 w-6" />,
  pharmacy: <Pill className="h-6 w-6" />,
  imaging: <ScanLine className="h-6 w-6" />,
  DME: <Armchair className="h-6 w-6" />,
  'home-health': <Home className="h-6 w-6" />,
};

const typeColors: Record<PaType, string> = {
  inpatient: 'bg-blue-50 text-blue-600 border-blue-200',
  outpatient: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  pharmacy: 'bg-purple-50 text-purple-600 border-purple-200',
  imaging: 'bg-amber-50 text-amber-600 border-amber-200',
  DME: 'bg-rose-50 text-rose-600 border-rose-200',
  'home-health': 'bg-cyan-50 text-cyan-600 border-cyan-200',
};

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface PaRequirementsPageProps {
  onBack: () => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PaRequirementsPage({ onBack }: PaRequirementsPageProps) {
  const [selectedType, setSelectedType] = useState<PaTypeGuideline | null>(null);

  // Pharmacy type → show drug sub-categories page
  if (selectedType && selectedType.type === 'pharmacy' && selectedType.drugCategories) {
    return (
      <PaPharmacyRequirements
        drugCategories={selectedType.drugCategories}
        onBack={() => setSelectedType(null)}
      />
    );
  }

  // Other types → show standard type requirements
  if (selectedType) {
    return (
      <PaTypeRequirements
        guideline={selectedType}
        documents={PA_DOCUMENT_REQUIREMENTS[selectedType.type]}
        onBack={() => setSelectedType(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} icon={<ArrowLeft className="h-4 w-4" />}>
          Back
        </Button>
        <div>
          <h1 className="text-[16px] font-semibold text-text-primary">
            PA Requirements & Guidelines
          </h1>
          <p className="mt-1 text-[13px] text-text-secondary">
            Review authorization requirements, clinical criteria, and documentation checklists for each PA type.
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-uhc-blue/10 text-uhc-blue">
              <ListChecks className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[20px] font-bold text-text-primary">6</p>
              <p className="text-[12px] text-text-muted">PA Types</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[20px] font-bold text-text-primary">
                {Object.values(PA_DOCUMENT_REQUIREMENTS).reduce((sum, docs) => sum + docs.filter(d => d.required).length, 0)}
              </p>
              <p className="text-[12px] text-text-muted">Total Required Documents</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[20px] font-bold text-text-primary">3-10</p>
              <p className="text-[12px] text-text-muted">Business Days (Standard)</p>
            </div>
          </div>
        </Card>
      </div>

      {/* PA Type cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PA_TYPE_GUIDELINES.map((guideline) => {
          const docs = PA_DOCUMENT_REQUIREMENTS[guideline.type];
          const requiredDocs = docs.filter(d => d.required).length;
          const totalDocs = docs.length;
          const requiredCriteria = guideline.clinicalCriteria.filter(c => c.required).length;

          return (
            <Card
              key={guideline.type}
              className="!p-0 overflow-hidden hover:shadow-md transition-shadow"
              onClick={() => setSelectedType(guideline)}
            >
              {/* Color header */}
              <div className={cn('flex items-center gap-3 px-5 py-4 border-b', typeColors[guideline.type])}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/60">
                  {typeIcons[guideline.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-semibold">{guideline.label}</h3>
                  <p className="text-[11px] opacity-75">Prior Authorization</p>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </div>

              {/* Body */}
              <div className="px-5 py-4 space-y-3">
                <p className="text-[12px] text-text-secondary line-clamp-2">
                  {guideline.description}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <p className="text-[16px] font-bold text-text-primary">{requiredCriteria}</p>
                    <p className="text-[10px] text-text-muted">Criteria</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[16px] font-bold text-text-primary">{requiredDocs}/{totalDocs}</p>
                    <p className="text-[10px] text-text-muted">Req'd Docs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[16px] font-bold text-uhc-blue">{guideline.turnaroundStandard}</p>
                    <p className="text-[10px] text-text-muted">Turnaround</p>
                  </div>
                </div>

                {/* Urgency turnaround */}
                <div className="flex items-center gap-2 pt-1 border-t border-border">
                  <Clock className="h-3 w-3 text-text-muted" />
                  <span className="text-[11px] text-text-muted">
                    Urgent: {guideline.turnaroundUrgent}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Downloadable forms & templates */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-semibold text-text-primary">Forms & Document Templates</h3>
          <button
            type="button"
            onClick={() => {
              const allDocs = Object.values(PA_DOCUMENT_REQUIREMENTS).flat();
              downloadAllTemplates(allDocs);
            }}
            className="flex items-center gap-1.5 rounded-lg border border-uhc-blue/30 bg-uhc-blue/5 px-3 py-1.5 text-[12px] font-medium text-uhc-blue hover:bg-uhc-blue/10 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Download All Templates
          </button>
        </div>
        <p className="text-[12px] text-text-muted mb-3">
          Pre-formatted templates to help ensure your submission includes all required information. Click any type above to see type-specific templates.
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PA_TYPE_GUIDELINES.map((g) => {
            const docs = PA_DOCUMENT_REQUIREMENTS[g.type];
            const templates = docs.filter(d => d.templateAvailable);
            return (
              <button
                key={g.type}
                type="button"
                onClick={() => setSelectedType(g)}
                className="flex items-center gap-3 rounded-lg border border-border p-3 text-left hover:border-uhc-blue hover:bg-uhc-blue/5 transition-colors"
              >
                <FileText className="h-4 w-4 text-uhc-blue shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-text-primary">{g.label}</p>
                  <p className="text-[11px] text-text-muted">{templates.length} template{templates.length !== 1 ? 's' : ''} available</p>
                </div>
                <ChevronRight className="h-4 w-4 text-text-muted shrink-0" />
              </button>
            );
          })}
        </div>
      </Card>

      {/* General information */}
      <Card>
        <h3 className="text-[14px] font-semibold text-text-primary mb-3">General PA Submission Guidelines</h3>
        <div className="space-y-2 text-[13px] text-text-secondary">
          <p>1. <strong>Submit complete documentation</strong> — Incomplete submissions are the leading cause of delays and denials.</p>
          <p>2. <strong>Use correct codes</strong> — Ensure ICD-10 diagnosis codes and CPT/HCPCS procedure codes match the clinical documentation.</p>
          <p>3. <strong>Document medical necessity</strong> — Clearly articulate why the requested service is medically necessary for this specific patient.</p>
          <p>4. <strong>Include prior treatment history</strong> — Document what conservative or alternative treatments have been tried.</p>
          <p>5. <strong>Monitor your requests</strong> — Check the status of submitted PAs regularly and respond promptly to information requests.</p>
          <p>6. <strong>Know the appeal process</strong> — If denied, you have 180 days to submit an appeal with additional documentation.</p>
        </div>
      </Card>
    </div>
  );
}
