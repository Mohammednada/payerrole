import { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Stethoscope,
  FileText,
  Globe,
  BarChart3,
  Code,
  ShieldCheck,
  Clock,
  Ban,
  AlertTriangle,
  ExternalLink,
  Search,
  X,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { cn } from '../../../shared/lib/utils';
import { Card } from '../../../shared/components/ui/card';
import { Tabs, type Tab } from '../../../shared/components/ui/tabs';
import type {
  CriteriaCategory,
  CoverageRules,
  PolicyReference,
  QualifyingCodes,
  AppealLevel,
} from '../../../shared/types';

/* ================================================================== */
/*  Icon resolver                                                      */
/* ================================================================== */

const CATEGORY_ICONS = {
  medical: Stethoscope,
  document: FileText,
  network: Globe,
  utilization: BarChart3,
  coding: Code,
} as const;

/* ================================================================== */
/*  1. CriteriaCategoriesSection                                       */
/* ================================================================== */

interface CriteriaCategoriesSectionProps {
  categories: CriteriaCategory[];
}

export function CriteriaCategoriesSection({ categories }: CriteriaCategoriesSectionProps) {
  // Track expanded state per category name; all start expanded
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const cat of categories) init[cat.name] = true;
    return init;
  });

  const toggle = (name: string) =>
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));

  if (categories.length === 0) return null;

  return (
    <Card>
      <h3 className="mb-4 text-[14px] font-semibold text-text-primary">
        Criteria by Category
      </h3>

      <div className="space-y-3">
        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.icon] ?? Stethoscope;
          const isOpen = expanded[cat.name] ?? true;
          const requiredCount = cat.criteria.filter((c) => c.required).length;

          return (
            <div
              key={cat.name}
              className="rounded-xl border border-border overflow-hidden"
            >
              {/* Header */}
              <button
                type="button"
                onClick={() => toggle(cat.name)}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer',
                  'hover:bg-surface/60',
                  isOpen && 'bg-surface/40',
                )}
              >
                <Icon className="h-4 w-4 shrink-0 text-uhc-blue" />
                <span className="flex-1 text-[13px] font-semibold text-text-primary">
                  {cat.name}
                </span>
                <span className="inline-flex rounded-full bg-uhc-blue-50 px-2 py-0.5 text-[10px] font-semibold text-uhc-blue">
                  {cat.criteria.length} criteria
                </span>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-text-muted" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-text-muted" />
                )}
              </button>

              {/* Body */}
              {isOpen && (
                <div className="border-t border-border px-4 py-3 space-y-2">
                  {requiredCount > 0 && (
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">
                      {requiredCount} required &middot;{' '}
                      {cat.criteria.length - requiredCount} recommended
                    </p>
                  )}

                  {cat.criteria.map((criterion) => (
                    <div
                      key={criterion.id}
                      className="flex items-start gap-3 rounded-lg px-3 py-2.5 bg-surface/30"
                    >
                      {criterion.required ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-uhc-blue mt-0.5" />
                      ) : (
                        <Circle className="h-4 w-4 shrink-0 text-text-muted mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-text-primary">
                          {criterion.description}
                        </p>
                        <span
                          className={cn(
                            'mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold',
                            criterion.required
                              ? 'bg-red-50 text-red-600'
                              : 'bg-gray-100 text-text-muted',
                          )}
                        >
                          {criterion.required ? 'Required' : 'Recommended'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ================================================================== */
/*  2. CoverageRulesSection                                            */
/* ================================================================== */

interface CoverageRulesSectionProps {
  rules: CoverageRules;
}

/* Small helper for label-value pairs */
function RuleField({ label, value }: { label: string; value: string | undefined }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
        {label}
      </dt>
      <dd className="text-[13px] text-text-primary">{value}</dd>
    </div>
  );
}

export function CoverageRulesSection({ rules }: CoverageRulesSectionProps) {
  return (
    <Card>
      <h3 className="mb-4 text-[14px] font-semibold text-text-primary">
        Coverage Rules &amp; Limitations
      </h3>

      <div className="space-y-5">
        {/* Limits & Maximums */}
        {(rules.maxUnits || rules.maxDollar || rules.renewalPeriod) && (
          <div>
            <h4 className="flex items-center gap-2 text-[12px] font-semibold text-text-secondary mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-uhc-blue" />
              Limits &amp; Maximums
            </h4>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
              <RuleField label="Max Units" value={rules.maxUnits} />
              <RuleField label="Max Dollar Amount" value={rules.maxDollar} />
              <RuleField label="Renewal Period" value={rules.renewalPeriod} />
            </dl>
          </div>
        )}

        {/* Authorization Validity */}
        {(rules.authValidityPeriod || rules.concurrentReview || rules.retrospectiveReview) && (
          <div>
            <h4 className="flex items-center gap-2 text-[12px] font-semibold text-text-secondary mb-3">
              <Clock className="h-3.5 w-3.5 text-amber-600" />
              Authorization Validity
            </h4>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
              <RuleField label="Validity Period" value={rules.authValidityPeriod} />
              <RuleField label="Concurrent Review" value={rules.concurrentReview} />
              <RuleField label="Retrospective Review" value={rules.retrospectiveReview} />
            </dl>
          </div>
        )}

        {/* Network Requirements */}
        {(rules.inNetworkRules || rules.outOfNetworkRules || rules.preExistingConditions) && (
          <div>
            <h4 className="flex items-center gap-2 text-[12px] font-semibold text-text-secondary mb-3">
              <Globe className="h-3.5 w-3.5 text-green-600" />
              Network Requirements
            </h4>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              <RuleField label="In-Network Rules" value={rules.inNetworkRules} />
              <RuleField label="Out-of-Network Rules" value={rules.outOfNetworkRules} />
              <RuleField label="Pre-Existing Conditions" value={rules.preExistingConditions} />
            </dl>
          </div>
        )}

        {/* Age / Gender restrictions */}
        {((rules.ageRestrictions && rules.ageRestrictions.length > 0) ||
          (rules.genderRestrictions && rules.genderRestrictions.length > 0)) && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <h4 className="flex items-center gap-2 text-[12px] font-semibold text-amber-700 mb-2">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
              Demographic Restrictions
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {rules.ageRestrictions && rules.ageRestrictions.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 mb-1">
                    Age Restrictions
                  </p>
                  <ul className="space-y-1">
                    {rules.ageRestrictions.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[12px] text-amber-800"
                      >
                        <span className="text-amber-400 mt-0.5">&#x2022;</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {rules.genderRestrictions && rules.genderRestrictions.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 mb-1">
                    Gender Restrictions
                  </p>
                  <ul className="space-y-1">
                    {rules.genderRestrictions.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[12px] text-amber-800"
                      >
                        <span className="text-amber-400 mt-0.5">&#x2022;</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Exclusions */}
        {rules.exclusions.length > 0 && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h4 className="flex items-center gap-2 text-[12px] font-semibold text-red-700 mb-2">
              <Ban className="h-3.5 w-3.5 text-red-500" />
              Exclusions
            </h4>
            <ul className="space-y-1.5">
              {rules.exclusions.map((ex, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-red-700">
                  <span className="text-red-400 mt-0.5">&#x2022;</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Review Requirements */}
        {(rules.concurrentReview || rules.retrospectiveReview) && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
            <h4 className="flex items-center gap-2 text-[12px] font-semibold text-blue-700 mb-2">
              <FileText className="h-3.5 w-3.5 text-blue-600" />
              Review Requirements
            </h4>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <RuleField label="Concurrent Review" value={rules.concurrentReview} />
              <RuleField label="Retrospective Review" value={rules.retrospectiveReview} />
            </dl>
          </div>
        )}
      </div>
    </Card>
  );
}

/* ================================================================== */
/*  3. PolicyReferencesSection                                         */
/* ================================================================== */

interface PolicyReferencesSectionProps {
  policies: PolicyReference[];
}

export function PolicyReferencesSection({ policies }: PolicyReferencesSectionProps) {
  if (policies.length === 0) return null;

  return (
    <Card>
      <h3 className="mb-4 text-[14px] font-semibold text-text-primary">
        UHC Policy References
      </h3>

      <div className="space-y-3">
        {policies.map((policy) => (
          <div
            key={policy.policyNumber}
            className="rounded-xl border border-border p-4 transition-colors hover:bg-surface/40"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                {/* Policy number */}
                <p className="text-[12px] font-mono font-semibold text-uhc-blue">
                  {policy.policyNumber}
                </p>

                {/* Title */}
                <p className="mt-1 text-[13px] font-semibold text-text-primary">
                  {policy.title}
                </p>

                {/* Description */}
                <p className="mt-1.5 text-[12px] text-text-secondary leading-relaxed">
                  {policy.description}
                </p>

                {/* Effective date */}
                <p className="mt-2 text-[10px] text-text-muted">
                  Effective: {policy.effectiveDate}
                </p>
              </div>

              {/* View Policy button (simulated) */}
              <button
                type="button"
                onClick={() => {
                  /* no-op */
                }}
                className={cn(
                  'flex items-center gap-1.5 shrink-0 rounded-lg border border-uhc-blue/30 bg-uhc-blue/5 px-3 py-1.5',
                  'text-[12px] font-medium text-uhc-blue hover:bg-uhc-blue/10 transition-colors',
                )}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View Policy
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ================================================================== */
/*  4. QualifyingCodesSection                                          */
/* ================================================================== */

interface QualifyingCodesSectionProps {
  codes: QualifyingCodes;
}

export function QualifyingCodesSection({ codes }: QualifyingCodesSectionProps) {
  // Build tabs dynamically based on available data
  const availableTabs = useMemo<Tab[]>(() => {
    const tabs: Tab[] = [];
    if (codes.icd10.length > 0) tabs.push({ id: 'icd10', label: 'ICD-10' });
    if (codes.cpt && codes.cpt.length > 0) tabs.push({ id: 'cpt', label: 'CPT' });
    if (codes.hcpcs && codes.hcpcs.length > 0) tabs.push({ id: 'hcpcs', label: 'HCPCS' });
    return tabs;
  }, [codes]);

  const [activeTab, setActiveTab] = useState<string>(availableTabs[0]?.id ?? 'icd10');
  const [search, setSearch] = useState('');

  // Resolve the active list
  const activeList = useMemo(() => {
    let list: { code: string; description: string }[] = [];
    if (activeTab === 'icd10') list = codes.icd10;
    if (activeTab === 'cpt') list = codes.cpt ?? [];
    if (activeTab === 'hcpcs') list = codes.hcpcs ?? [];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (item) =>
          item.code.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q),
      );
    }

    return list;
  }, [activeTab, codes, search]);

  if (availableTabs.length === 0) return null;

  return (
    <Card>
      <h3 className="mb-4 text-[14px] font-semibold text-text-primary">
        Qualifying Diagnosis &amp; Procedure Codes
      </h3>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter codes..."
          className={cn(
            'h-9 w-full rounded-lg border border-border bg-[#f3f3f5] pl-9 pr-8 text-[13px] text-text-primary',
            'placeholder:text-text-muted',
            'outline-none transition-colors',
            'focus:border-uhc-blue focus:ring-1 focus:ring-uhc-blue/20',
          )}
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-text-muted transition-colors hover:bg-surface hover:text-text-secondary"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <Tabs tabs={availableTabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Code list */}
      <div className="mt-3">
        {activeList.length === 0 ? (
          <p className="py-6 text-center text-[13px] text-text-muted">
            {search ? 'No codes match your search.' : 'No codes available.'}
          </p>
        ) : (
          <div className="rounded-lg border border-border overflow-hidden">
            {/* Header row */}
            <div className="flex items-center gap-4 bg-surface px-4 py-2">
              <span className="w-28 shrink-0 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                Code
              </span>
              <span className="flex-1 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                Description
              </span>
            </div>

            {/* Rows */}
            {activeList.map((item, index) => (
              <div
                key={item.code}
                className={cn(
                  'flex items-center gap-4 px-4 py-2.5',
                  index % 2 === 0 ? 'bg-card' : 'bg-surface/40',
                )}
              >
                <span className="w-28 shrink-0 text-[13px] font-mono font-semibold text-uhc-blue">
                  {item.code}
                </span>
                <span className="flex-1 text-[13px] text-text-primary">
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Result count */}
        <p className="mt-2 text-[10px] text-text-muted text-right">
          {activeList.length} code{activeList.length !== 1 ? 's' : ''}{' '}
          {search && 'matching'}
        </p>
      </div>
    </Card>
  );
}

/* ================================================================== */
/*  5. AppealProcessSection                                            */
/* ================================================================== */

interface AppealProcessSectionProps {
  levels: AppealLevel[];
}

/** Colour scheme that progresses with appeal levels. */
const LEVEL_COLORS = [
  {
    ring: 'ring-blue-400',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    number: 'bg-blue-500 text-white',
    line: 'bg-blue-300',
    badge: 'bg-blue-100 text-blue-700',
    bullet: 'text-blue-400',
  },
  {
    ring: 'ring-amber-400',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    number: 'bg-amber-500 text-white',
    line: 'bg-amber-300',
    badge: 'bg-amber-100 text-amber-700',
    bullet: 'text-amber-500',
  },
  {
    ring: 'ring-orange-400',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    number: 'bg-orange-500 text-white',
    line: 'bg-orange-300',
    badge: 'bg-orange-100 text-orange-700',
    bullet: 'text-orange-500',
  },
  {
    ring: 'ring-red-400',
    bg: 'bg-red-50',
    text: 'text-red-700',
    number: 'bg-red-600 text-white',
    line: 'bg-red-300',
    badge: 'bg-red-100 text-red-700',
    bullet: 'text-red-500',
  },
] as const;

export function AppealProcessSection({ levels }: AppealProcessSectionProps) {
  if (levels.length === 0) return null;

  return (
    <Card>
      <h3 className="mb-1 text-[14px] font-semibold text-text-primary">
        Appeal Process
      </h3>
      <p className="mb-5 text-[12px] text-text-secondary">
        If a prior authorization request is denied, the following appeal levels are available.
      </p>

      <div className="relative pl-8">
        {/* Vertical connecting line */}
        <span
          className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-300 via-amber-300 via-60% to-red-300"
          aria-hidden="true"
        />

        <div className="space-y-6">
          {levels.map((level, index) => {
            const colors = LEVEL_COLORS[index % LEVEL_COLORS.length];

            return (
              <div key={level.level} className="relative">
                {/* Level number circle */}
                <span
                  className={cn(
                    'absolute -left-8 top-0 flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold ring-2',
                    colors.number,
                    colors.ring,
                  )}
                >
                  {level.level}
                </span>

                {/* Content card */}
                <div
                  className={cn(
                    'rounded-xl border border-border p-4',
                    colors.bg,
                  )}
                >
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <p className={cn('text-[13px] font-semibold', colors.text)}>
                      {level.name}
                    </p>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold',
                        colors.badge,
                      )}
                    >
                      <Clock className="h-3 w-3" />
                      {level.timeline}
                    </span>
                  </div>

                  <p className="text-[12px] text-text-secondary leading-relaxed mb-3">
                    {level.description}
                  </p>

                  {/* Requirements checklist */}
                  {level.requirements.length > 0 && (
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                        Requirements
                      </p>
                      <ul className="space-y-1">
                        {level.requirements.map((req, ri) => (
                          <li
                            key={ri}
                            className="flex items-start gap-2 text-[12px] text-text-primary"
                          >
                            <CheckCircle2
                              className={cn('h-3.5 w-3.5 shrink-0 mt-0.5', colors.bullet)}
                            />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
