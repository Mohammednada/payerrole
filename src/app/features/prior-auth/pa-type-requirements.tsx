import { useState, useMemo } from 'react';
import {
  ArrowLeft,
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
import type { PaTypeGuideline, PaDocumentRequirement } from '../../../shared/types';
import { Card } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Tabs, type Tab } from '../../../shared/components/ui/tabs';
import { PaClinicalPathway } from './pa-clinical-pathway';
import {
  CriteriaCategoriesSection,
  CoverageRulesSection,
  PolicyReferencesSection,
  QualifyingCodesSection,
  AppealProcessSection,
} from './pa-enhanced-sections';
import { downloadTemplate } from '../../../shared/lib/download';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PaTypeRequirementsProps {
  guideline: PaTypeGuideline;
  documents: PaDocumentRequirement[];
  onBack: () => void;
}

/* ------------------------------------------------------------------ */
/*  Tabs                                                               */
/* ------------------------------------------------------------------ */

const BASE_TABS: Tab[] = [
  { id: 'criteria', label: 'Clinical Criteria' },
  { id: 'criteria-categories', label: 'Criteria Categories' },
  { id: 'clinical-pathway', label: 'Clinical Pathway' },
  { id: 'coverage-rules', label: 'Coverage Rules' },
  { id: 'documents', label: 'Required Documents' },
  { id: 'policy-codes', label: 'Policy & Codes' },
  { id: 'appeal', label: 'Appeal Process' },
  { id: 'fields', label: 'Required Information' },
  { id: 'tips', label: 'Tips for Approval' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PaTypeRequirements({ guideline, documents, onBack }: PaTypeRequirementsProps) {
  const [activeTab, setActiveTab] = useState('criteria');

  const requiredCriteria = guideline.clinicalCriteria.filter(c => c.required);
  const optionalCriteria = guideline.clinicalCriteria.filter(c => !c.required);
  const requiredDocs = documents.filter(d => d.required);
  const optionalDocs = documents.filter(d => !d.required);

  // Build dynamic tabs based on available enhanced data
  const activeTabs = useMemo<Tab[]>(() => {
    return BASE_TABS.filter((tab) => {
      if (tab.id === 'criteria-categories') return !!guideline.criteriaCategories?.length;
      if (tab.id === 'clinical-pathway') return !!guideline.clinicalPathway?.length;
      if (tab.id === 'coverage-rules') return !!guideline.coverageRules;
      if (tab.id === 'policy-codes') return !!guideline.policyReferences?.length || !!guideline.qualifyingCodes;
      if (tab.id === 'appeal') return !!guideline.appealProcess?.length;
      return true;
    });
  }, [guideline]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} icon={<ArrowLeft className="h-4 w-4" />}>
          Back
        </Button>
        <div>
          <h1 className="text-[16px] font-semibold text-text-primary">
            {guideline.label} PA Requirements
          </h1>
          <p className="mt-1 text-[13px] text-text-secondary">
            Complete guide for {guideline.label.toLowerCase()} prior authorization submissions
          </p>
        </div>
      </div>

      {/* Overview card */}
      <Card>
        <p className="text-[13px] text-text-secondary leading-relaxed">{guideline.description}</p>

        {/* Turnaround times */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border border-border p-3">
            <Clock className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Standard</p>
              <p className="text-[13px] font-medium text-text-primary">{guideline.turnaroundStandard}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <Clock className="h-4 w-4 text-amber-600 shrink-0" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">Urgent</p>
              <p className="text-[13px] font-medium text-amber-700">{guideline.turnaroundUrgent}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
            <Clock className="h-4 w-4 text-red-600 shrink-0" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-red-600">Emergent</p>
              <p className="text-[13px] font-medium text-red-700">{guideline.turnaroundEmergent}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="!p-3 text-center">
          <ShieldCheck className="h-5 w-5 text-uhc-blue mx-auto" />
          <p className="mt-1 text-[18px] font-bold text-text-primary">{requiredCriteria.length}</p>
          <p className="text-[10px] text-text-muted">Required Criteria</p>
        </Card>
        <Card className="!p-3 text-center">
          <FileText className="h-5 w-5 text-green-600 mx-auto" />
          <p className="mt-1 text-[18px] font-bold text-text-primary">{requiredDocs.length}</p>
          <p className="text-[10px] text-text-muted">Required Documents</p>
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
      <Tabs tabs={activeTabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-4">
        {/* Clinical Criteria tab */}
        {activeTab === 'criteria' && (
          <div className="space-y-4">
            {/* Required criteria */}
            <div>
              <h3 className="flex items-center gap-2 text-[14px] font-semibold text-text-primary mb-3">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Required Criteria ({requiredCriteria.length})
              </h3>
              <div className="space-y-2">
                {requiredCriteria.map((criterion, index) => (
                  <Card key={criterion.id} className="!p-3">
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-[11px] font-bold text-red-600">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-[13px] text-text-primary">{criterion.description}</p>
                        <span className="mt-1 inline-flex rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                          Required
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Optional criteria */}
            {optionalCriteria.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-[14px] font-semibold text-text-primary mb-3">
                  <CheckCircle className="h-4 w-4 text-text-muted" />
                  Recommended Criteria ({optionalCriteria.length})
                </h3>
                <div className="space-y-2">
                  {optionalCriteria.map((criterion) => (
                    <Card key={criterion.id} className="!p-3">
                      <div className="flex items-start gap-3">
                        <Circle className="h-4 w-4 shrink-0 text-text-muted mt-0.5" />
                        <div className="flex-1">
                          <p className="text-[13px] text-text-secondary">{criterion.description}</p>
                          <span className="mt-1 inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-text-muted">
                            Recommended
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Criteria Categories tab */}
        {activeTab === 'criteria-categories' && guideline.criteriaCategories && (
          <CriteriaCategoriesSection categories={guideline.criteriaCategories} />
        )}

        {/* Clinical Pathway tab */}
        {activeTab === 'clinical-pathway' && guideline.clinicalPathway && (
          <PaClinicalPathway steps={guideline.clinicalPathway} paTypeLabel={guideline.label} />
        )}

        {/* Coverage Rules tab */}
        {activeTab === 'coverage-rules' && guideline.coverageRules && (
          <CoverageRulesSection rules={guideline.coverageRules} />
        )}

        {/* Policy & Codes tab */}
        {activeTab === 'policy-codes' && (
          <div className="space-y-6">
            {guideline.policyReferences && guideline.policyReferences.length > 0 && (
              <PolicyReferencesSection policies={guideline.policyReferences} />
            )}
            {guideline.qualifyingCodes && (
              <QualifyingCodesSection codes={guideline.qualifyingCodes} />
            )}
          </div>
        )}

        {/* Appeal Process tab */}
        {activeTab === 'appeal' && guideline.appealProcess && (
          <AppealProcessSection levels={guideline.appealProcess} />
        )}

        {/* Documents tab */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            {/* Required docs */}
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
                          <span className="inline-flex rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                            Required
                          </span>
                          {doc.fileFormat && (
                            <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-text-muted">
                              {doc.fileFormat}
                            </span>
                          )}
                        </div>
                      </div>
                      {doc.templateAvailable && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); downloadTemplate(doc.templateName ?? doc.name, doc.name, doc.description); }}
                          className="flex items-center gap-1.5 rounded-lg border border-uhc-blue/30 bg-uhc-blue/5 px-3 py-1.5 text-[12px] font-medium text-uhc-blue hover:bg-uhc-blue/10 transition-colors shrink-0"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download Template
                        </button>
                      )}
                    </div>
                    {doc.templateAvailable && doc.templateName && (
                      <div className="mt-2 ml-7 flex items-center gap-1.5 text-[11px] text-text-muted">
                        <FileText className="h-3 w-3" />
                        {doc.templateName}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Optional docs */}
            {optionalDocs.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-[14px] font-semibold text-text-primary mb-3">
                  <FileText className="h-4 w-4 text-text-muted" />
                  Optional / Supporting Documents ({optionalDocs.length})
                </h3>
                <div className="space-y-2">
                  {optionalDocs.map((doc) => (
                    <Card key={doc.id} className="!p-3">
                      <div className="flex items-start gap-3">
                        <Circle className="h-4 w-4 shrink-0 text-text-muted mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-text-secondary">{doc.name}</p>
                          <p className="mt-0.5 text-[12px] text-text-muted">{doc.description}</p>
                          <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                            <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-text-muted">
                              Optional
                            </span>
                            {doc.fileFormat && (
                              <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-text-muted">
                                {doc.fileFormat}
                              </span>
                            )}
                          </div>
                        </div>
                        {doc.templateAvailable && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); downloadTemplate(doc.templateName ?? doc.name, doc.name, doc.description); }}
                            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-text-secondary hover:border-uhc-blue hover:text-uhc-blue transition-colors shrink-0"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Download
                          </button>
                        )}
                      </div>
                      {doc.templateAvailable && doc.templateName && (
                        <div className="mt-2 ml-7 flex items-center gap-1.5 text-[11px] text-text-muted">
                          <FileText className="h-3 w-3" />
                          {doc.templateName}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Note */}
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
              <p className="text-[13px] text-amber-700">
                <strong>Note:</strong> Submitting all required documents with the initial request significantly reduces processing time
                and the likelihood of information request delays.
              </p>
            </div>
          </div>
        )}

        {/* Required Fields tab */}
        {activeTab === 'fields' && (
          <div className="space-y-4">
            <Card>
              <h3 className="text-[14px] font-semibold text-text-primary mb-3">
                Information Required for {guideline.label} PA Submission
              </h3>
              <div className="space-y-2">
                {guideline.requiredFields.map((field, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-start gap-3 rounded-lg px-3 py-2.5',
                      index % 2 === 0 ? 'bg-surface' : 'bg-card',
                    )}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-uhc-blue text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-[13px] text-text-primary">{field}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <p className="text-[13px] text-blue-700">
                <strong>Tip:</strong> All fields marked above must be completed in the PA submission form. Missing or incomplete fields
                will result in the request being returned for additional information.
              </p>
            </div>
          </div>
        )}

        {/* Tips tab */}
        {activeTab === 'tips' && (
          <div className="space-y-3">
            <Card>
              <h3 className="flex items-center gap-2 text-[14px] font-semibold text-text-primary mb-4">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Tips for Faster Approval
              </h3>
              <div className="space-y-3">
                {guideline.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-lg border border-border p-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-[11px] font-bold text-amber-600">
                      {index + 1}
                    </span>
                    <p className="text-[13px] text-text-secondary leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Common denial reasons */}
            <Card>
              <h3 className="flex items-center gap-2 text-[14px] font-semibold text-text-primary mb-3">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Common Reasons for Denial
              </h3>
              <ul className="space-y-2 text-[13px] text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">&#x2022;</span>
                  Incomplete or missing required documentation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">&#x2022;</span>
                  Clinical criteria not met per UHC clinical policy guidelines
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">&#x2022;</span>
                  Insufficient documentation of prior conservative treatment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">&#x2022;</span>
                  Service not covered under the member's current benefit plan
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">&#x2022;</span>
                  Out-of-network provider without prior network exception approval
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">&#x2022;</span>
                  Diagnosis codes do not support the requested procedure
                </li>
              </ul>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
