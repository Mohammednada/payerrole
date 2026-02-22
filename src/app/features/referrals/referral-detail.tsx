import { ArrowLeft, Check } from 'lucide-react';
import type { Referral, ReferralStatus } from '../../../shared/types';
import { cn, formatDate } from '../../../shared/lib/utils';
import { Button } from '../../../shared/components/ui/button';
import { StatusBadge } from '../../../shared/components/ui/status-badge';
import { Badge } from '../../../shared/components/ui/badge';
import { Card } from '../../../shared/components/ui/card';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ReferralDetailProps {
  referral: Referral;
  onBack: () => void;
}

/* ------------------------------------------------------------------ */
/*  Info field helper                                                   */
/* ------------------------------------------------------------------ */

interface FieldDef {
  label: string;
  value: string | undefined;
}

function InfoField({ label, value }: FieldDef) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
        {label}
      </dt>
      <dd className="text-[13px] text-text-primary">{value || '\u2014'}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Status step tracker                                                */
/* ------------------------------------------------------------------ */

interface StepDef {
  key: string;
  label: string;
}

const STATUS_STEPS: StepDef[] = [
  { key: 'submitted', label: 'Submitted' },
  { key: 'in-review', label: 'In Review' },
  { key: 'approved', label: 'Approved' },
  { key: 'completed', label: 'Completed' },
];

function resolveCurrentStep(status: ReferralStatus): number {
  switch (status) {
    case 'pending':
      return 0;
    case 'in-review':
      return 1;
    case 'approved':
      return 2;
    case 'completed':
      return 3;
    case 'denied':
      return 1; // Stopped at review stage
    case 'expired':
      return 2; // Was approved but expired
    default:
      return 0;
  }
}

function isDeniedOrExpired(status: ReferralStatus): boolean {
  return status === 'denied' || status === 'expired';
}

function StatusTracker({ status }: { status: ReferralStatus }) {
  const currentStep = resolveCurrentStep(status);
  const isTerminal = isDeniedOrExpired(status);

  return (
    <Card>
      <h3 className="mb-4 text-[14px] font-semibold text-text-primary">
        Status Tracking
      </h3>

      <div className="flex w-full items-start">
        {STATUS_STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLast = index === STATUS_STEPS.length - 1;

          // For denied/expired, the active step gets special styling
          const isTerminalActive = isActive && isTerminal;

          return (
            <div
              key={step.key}
              className={cn('flex items-start', !isLast && 'flex-1')}
            >
              {/* Step circle + label */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[13px] font-semibold transition-colors',
                    isCompleted && 'border-uhc-blue bg-uhc-blue text-white',
                    isActive && !isTerminalActive && 'border-uhc-blue bg-white text-uhc-blue',
                    isTerminalActive && status === 'denied' && 'border-red-500 bg-red-500 text-white',
                    isTerminalActive && status === 'expired' && 'border-gray-400 bg-gray-400 text-white',
                    !isCompleted && !isActive && 'border-gray-300 bg-white text-gray-400',
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>

                <span
                  className={cn(
                    'mt-2 text-center text-[11px] font-medium',
                    isActive && !isTerminalActive && 'text-uhc-blue',
                    isTerminalActive && status === 'denied' && 'text-red-500',
                    isTerminalActive && status === 'expired' && 'text-gray-500',
                    !isActive && 'text-text-secondary',
                  )}
                >
                  {isTerminalActive
                    ? status === 'denied'
                      ? 'Denied'
                      : 'Expired'
                    : step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div className="mt-4 flex flex-1 items-center px-2">
                  <div
                    className={cn(
                      'h-0.5 w-full rounded-full',
                      index < currentStep ? 'bg-uhc-blue' : 'bg-gray-200',
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ReferralDetail({ referral, onBack }: ReferralDetailProps) {
  const fields: FieldDef[] = [
    { label: 'Member ID', value: referral.memberId },
    { label: 'Member Name', value: referral.memberName },
    { label: 'Referring Provider', value: referral.referringProvider },
    { label: 'Referring NPI', value: referral.referringNpi },
    { label: 'Referred-To Provider', value: referral.referredToProvider },
    { label: 'Referred-To NPI', value: referral.referredToNpi },
    { label: 'Specialty', value: referral.specialty },
    { label: 'Diagnosis Code', value: referral.diagnosisCode },
    { label: 'Diagnosis Description', value: referral.diagnosisDescription },
    { label: 'Request Date', value: formatDate(referral.requestDate) },
    { label: 'Approval Date', value: referral.approvalDate ? formatDate(referral.approvalDate) : undefined },
    { label: 'Expiration Date', value: referral.expirationDate ? formatDate(referral.expirationDate) : undefined },
    { label: 'Authorized Visits', value: String(referral.authorizedVisits) },
    { label: 'Used Visits', value: String(referral.usedVisits) },
    { label: 'Urgency', value: referral.urgency.charAt(0).toUpperCase() + referral.urgency.slice(1) },
    { label: 'Notes', value: referral.notes },
  ];

  return (
    <div className="space-y-6">
      {/* ---- Header ---- */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </Button>

          <h1 className="text-[16px] font-semibold text-text-primary">
            {referral.referralNumber}
          </h1>

          <StatusBadge status={referral.status} />

          <Badge variant={referral.urgency === 'urgent' ? 'error' : 'info'}>
            {referral.urgency.charAt(0).toUpperCase() + referral.urgency.slice(1)}
          </Badge>
        </div>
      </div>

      {/* ---- Info Card ---- */}
      <Card>
        <h3 className="mb-3 text-[14px] font-semibold text-text-primary">
          Referral Details
        </h3>

        <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          {fields.map((field) => (
            <InfoField key={field.label} label={field.label} value={field.value} />
          ))}
        </dl>
      </Card>

      {/* ---- Status Tracking ---- */}
      <StatusTracker status={referral.status} />
    </div>
  );
}
