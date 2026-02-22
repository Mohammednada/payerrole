import { useState } from 'react';
import {
  ArrowLeft,
  Pill,
  Syringe,
  Ban,
  ShieldAlert,
  FlaskConical,
  ArrowUpDown,
  ChevronRight,
  CheckCircle,
  Circle,
  FileText,
  Clock,
  Lightbulb,
  ClipboardList,
  ShieldCheck,
  AlertTriangle,
  Download,
} from 'lucide-react';
import { cn } from '../../../shared/lib/utils';
import type { PharmacyDrugCategory, PharmacyDrugGuideline } from '../../../shared/types';
import { Card } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Tabs, type Tab } from '../../../shared/components/ui/tabs';
import { downloadTemplate } from '../../../shared/lib/download';

/* ------------------------------------------------------------------ */
/*  Category icon/color map                                            */
/* ------------------------------------------------------------------ */

const categoryIcons: Record<PharmacyDrugCategory, React.ReactNode> = {
  specialty: <Syringe className="h-5 w-5" />,
  'non-formulary': <Ban className="h-5 w-5" />,
  'controlled-substance': <ShieldAlert className="h-5 w-5" />,
  oncology: <FlaskConical className="h-5 w-5" />,
  'step-therapy-exception': <ArrowUpDown className="h-5 w-5" />,
  'quantity-limit-override': <Pill className="h-5 w-5" />,
};

const categoryColors: Record<PharmacyDrugCategory, string> = {
  specialty: 'bg-purple-50 text-purple-600 border-purple-200',
  'non-formulary': 'bg-orange-50 text-orange-600 border-orange-200',
  'controlled-substance': 'bg-red-50 text-red-600 border-red-200',
  oncology: 'bg-blue-50 text-blue-600 border-blue-200',
  'step-therapy-exception': 'bg-amber-50 text-amber-600 border-amber-200',
  'quantity-limit-override': 'bg-emerald-50 text-emerald-600 border-emerald-200',
};

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface PaPharmacyRequirementsProps {
  drugCategories: PharmacyDrugGuideline[];
  onBack: () => void;
}

/* ------------------------------------------------------------------ */
/*  Drug Category Detail                                               */
/* ------------------------------------------------------------------ */

const DETAIL_TABS: Tab[] = [
  { id: 'criteria', label: 'Clinical Criteria' },
  { id: 'documents', label: 'Required Documents' },
  { id: 'fields', label: 'Required Information' },
  { id: 'tips', label: 'Tips for Approval' },
];

function DrugCategoryDetail({ guideline, onBack }: { guideline: PharmacyDrugGuideline; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('criteria');

  const requiredCriteria = guideline.clinicalCriteria.filter(c => c.required);
  const optionalCriteria = guideline.clinicalCriteria.filter(c => !c.required);
  const requiredDocs = guideline.requiredDocuments.filter(d => d.required);
  const optionalDocs = guideline.requiredDocuments.filter(d => !d.required);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} icon={<ArrowLeft className="h-4 w-4" />}>
          Back
        </Button>
        <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', categoryColors[guideline.category])}>
          {categoryIcons[guideline.category]}
        </div>
        <div>
          <h1 className="text-[16px] font-semibold text-text-primary">{guideline.label}</h1>
          <p className="text-[12px] text-text-muted">Pharmacy PA — Drug Category Requirements</p>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <p className="text-[13px] text-text-secondary leading-relaxed">{guideline.description}</p>

        {/* Examples */}
        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2">Common Examples</p>
          <div className="flex flex-wrap gap-1.5">
            {guideline.examples.map((ex) => (
              <span key={ex} className="inline-flex rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-text-secondary">
                {ex}
              </span>
            ))}
          </div>
        </div>

        {/* Turnaround */}
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-border p-3">
          <Clock className="h-4 w-4 text-text-muted" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Turnaround Time</p>
            <p className="text-[13px] font-medium text-text-primary">{guideline.turnaround}</p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="!p-3 text-center">
          <ShieldCheck className="h-5 w-5 text-uhc-blue mx-auto" />
          <p className="mt-1 text-[18px] font-bold text-text-primary">{requiredCriteria.length}</p>
          <p className="text-[10px] text-text-muted">Required Criteria</p>
        </Card>
        <Card className="!p-3 text-center">
          <FileText className="h-5 w-5 text-green-600 mx-auto" />
          <p className="mt-1 text-[18px] font-bold text-text-primary">{requiredDocs.length}</p>
          <p className="text-[10px] text-text-muted">Required Docs</p>
        </Card>
        <Card className="!p-3 text-center">
          <ClipboardList className="h-5 w-5 text-purple-600 mx-auto" />
          <p className="mt-1 text-[18px] font-bold text-text-primary">{guideline.requiredFields.length}</p>
          <p className="text-[10px] text-text-muted">Required Fields</p>
        </Card>
        <Card className="!p-3 text-center">
          <Lightbulb className="h-5 w-5 text-amber-500 mx-auto" />
          <p className="mt-1 text-[18px] font-bold text-text-primary">{guideline.tips.length}</p>
          <p className="text-[10px] text-text-muted">Submission Tips</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs tabs={DETAIL_TABS} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-4">
        {/* Clinical Criteria */}
        {activeTab === 'criteria' && (
          <div className="space-y-4">
            <div>
              <h3 className="flex items-center gap-2 text-[14px] font-semibold text-text-primary mb-3">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Required Criteria ({requiredCriteria.length})
              </h3>
              <div className="space-y-2">
                {requiredCriteria.map((c, i) => (
                  <Card key={c.id} className="!p-3">
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-[11px] font-bold text-red-600">{i + 1}</span>
                      <div>
                        <p className="text-[13px] text-text-primary">{c.description}</p>
                        <span className="mt-1 inline-flex rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">Required</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            {optionalCriteria.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-[14px] font-semibold text-text-primary mb-3">
                  <CheckCircle className="h-4 w-4 text-text-muted" />
                  Recommended ({optionalCriteria.length})
                </h3>
                <div className="space-y-2">
                  {optionalCriteria.map((c) => (
                    <Card key={c.id} className="!p-3">
                      <div className="flex items-start gap-3">
                        <Circle className="h-4 w-4 shrink-0 text-text-muted mt-0.5" />
                        <div>
                          <p className="text-[13px] text-text-secondary">{c.description}</p>
                          <span className="mt-1 inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-text-muted">Recommended</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Documents */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div>
              <h3 className="flex items-center gap-2 text-[14px] font-semibold text-text-primary mb-3">
                <FileText className="h-4 w-4 text-red-500" />
                Required Documents ({requiredDocs.length})
              </h3>
              <div className="space-y-2">
                {requiredDocs.map((doc) => (
                  <Card key={doc.id} className="!p-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-text-primary">{doc.name}</p>
                        <p className="mt-0.5 text-[12px] text-text-muted">{doc.description}</p>
                        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                          <span className="inline-flex rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">Required</span>
                          {doc.fileFormat && <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-text-muted">{doc.fileFormat}</span>}
                        </div>
                      </div>
                      {doc.templateAvailable && (
                        <button type="button" onClick={() => downloadTemplate(doc.templateName ?? doc.name, doc.name, doc.description)} className="flex items-center gap-1.5 rounded-lg border border-uhc-blue/30 bg-uhc-blue/5 px-3 py-1.5 text-[12px] font-medium text-uhc-blue hover:bg-uhc-blue/10 transition-colors shrink-0">
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </button>
                      )}
                    </div>
                    {doc.templateAvailable && doc.templateName && (
                      <div className="mt-2 ml-7 flex items-center gap-1.5 text-[11px] text-text-muted">
                        <FileText className="h-3 w-3" />{doc.templateName}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
            {optionalDocs.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-[14px] font-semibold text-text-primary mb-3">
                  <FileText className="h-4 w-4 text-text-muted" />
                  Optional / Supporting ({optionalDocs.length})
                </h3>
                <div className="space-y-2">
                  {optionalDocs.map((doc) => (
                    <Card key={doc.id} className="!p-3">
                      <div className="flex items-start gap-3">
                        <Circle className="h-4 w-4 shrink-0 text-text-muted mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-text-secondary">{doc.name}</p>
                          <p className="mt-0.5 text-[12px] text-text-muted">{doc.description}</p>
                          <span className="mt-1 inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-text-muted">Optional</span>
                        </div>
                        {doc.templateAvailable && (
                          <button type="button" onClick={() => downloadTemplate(doc.templateName ?? doc.name, doc.name, doc.description)} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-text-secondary hover:border-uhc-blue hover:text-uhc-blue transition-colors shrink-0">
                            <Download className="h-3.5 w-3.5" />
                            Download
                          </button>
                        )}
                      </div>
                      {doc.templateAvailable && doc.templateName && (
                        <div className="mt-2 ml-7 flex items-center gap-1.5 text-[11px] text-text-muted">
                          <FileText className="h-3 w-3" />{doc.templateName}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Required Fields */}
        {activeTab === 'fields' && (
          <Card>
            <h3 className="text-[14px] font-semibold text-text-primary mb-3">Required Information for {guideline.label}</h3>
            <div className="space-y-2">
              {guideline.requiredFields.map((field, i) => (
                <div key={i} className={cn('flex items-start gap-3 rounded-lg px-3 py-2.5', i % 2 === 0 ? 'bg-surface' : 'bg-card')}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-uhc-blue text-[10px] font-bold text-white">{i + 1}</span>
                  <p className="text-[13px] text-text-primary">{field}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tips */}
        {activeTab === 'tips' && (
          <Card>
            <h3 className="flex items-center gap-2 text-[14px] font-semibold text-text-primary mb-4">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Tips for Faster Approval
            </h3>
            <div className="space-y-3">
              {guideline.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-[11px] font-bold text-amber-600">{i + 1}</span>
                  <p className="text-[13px] text-text-secondary leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component — Category Grid                                     */
/* ------------------------------------------------------------------ */

export function PaPharmacyRequirements({ drugCategories, onBack }: PaPharmacyRequirementsProps) {
  const [selectedCategory, setSelectedCategory] = useState<PharmacyDrugGuideline | null>(null);

  if (selectedCategory) {
    return <DrugCategoryDetail guideline={selectedCategory} onBack={() => setSelectedCategory(null)} />;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} icon={<ArrowLeft className="h-4 w-4" />}>
          Back
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
          <Pill className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-[16px] font-semibold text-text-primary">Pharmacy PA — Drug Categories</h1>
          <p className="mt-1 text-[13px] text-text-secondary">
            Select a drug category to view specific requirements, clinical criteria, and required documentation.
          </p>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {drugCategories.map((cat) => {
          const reqCriteria = cat.clinicalCriteria.filter(c => c.required).length;
          const reqDocs = cat.requiredDocuments.filter(d => d.required).length;
          const templates = cat.requiredDocuments.filter(d => d.templateAvailable).length;

          return (
            <Card
              key={cat.category}
              className="!p-0 overflow-hidden hover:shadow-md transition-shadow"
              onClick={() => setSelectedCategory(cat)}
            >
              {/* Color header */}
              <div className={cn('flex items-center gap-3 px-5 py-4 border-b', categoryColors[cat.category])}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/60">
                  {categoryIcons[cat.category]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[13px] font-semibold leading-tight">{cat.label}</h3>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50 shrink-0" />
              </div>

              {/* Body */}
              <div className="px-5 py-4 space-y-3">
                <p className="text-[12px] text-text-secondary line-clamp-2">{cat.description}</p>

                {/* Examples */}
                <div className="flex flex-wrap gap-1">
                  {cat.examples.slice(0, 3).map((ex) => (
                    <span key={ex} className="inline-flex rounded-full bg-surface px-2 py-0.5 text-[10px] text-text-muted">{ex}</span>
                  ))}
                  {cat.examples.length > 3 && (
                    <span className="inline-flex rounded-full bg-surface px-2 py-0.5 text-[10px] text-text-muted">+{cat.examples.length - 3} more</span>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                  <div className="text-center">
                    <p className="text-[14px] font-bold text-text-primary">{reqCriteria}</p>
                    <p className="text-[9px] text-text-muted">Criteria</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] font-bold text-text-primary">{reqDocs}</p>
                    <p className="text-[9px] text-text-muted">Req'd Docs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] font-bold text-uhc-blue">{templates}</p>
                    <p className="text-[9px] text-text-muted">Templates</p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* General pharmacy note */}
      <Card>
        <h3 className="text-[14px] font-semibold text-text-primary mb-2">General Pharmacy PA Notes</h3>
        <ul className="space-y-1.5 text-[13px] text-text-secondary">
          <li>All pharmacy PAs require a valid prescription from a licensed prescriber.</li>
          <li>NDC code, drug name, strength, and dosage must be specified on every request.</li>
          <li>The prescriber's NPI, DEA number (for controlled substances), and specialty are required.</li>
          <li>Standard turnaround is 72 hours; urgent requests are processed within 24 hours.</li>
          <li>Appeals for denied pharmacy PAs must be submitted within 180 days with additional documentation.</li>
        </ul>
      </Card>
    </div>
  );
}
