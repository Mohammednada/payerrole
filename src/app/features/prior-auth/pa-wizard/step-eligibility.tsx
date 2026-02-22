import { useState } from 'react';
import { CheckCircle, AlertTriangle, ShieldCheck, Loader2 } from 'lucide-react';
import { cn } from '../../../../shared/lib/utils';
import { Button } from '../../../../shared/components/ui/button';
import { Card } from '../../../../shared/components/ui/card';
import type { PaEligibilityCheck, PaType } from '../../../../shared/types';
import { simulateEligibilityCheck } from '../../../../mock/prior-auth';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StepEligibilityProps {
  paType: PaType;
  memberId: string;
  memberName: string;
  data?: PaEligibilityCheck;
  onChange: (check: PaEligibilityCheck) => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StepEligibility({ paType, memberId, memberName, data, onChange }: StepEligibilityProps) {
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const result = simulateEligibilityCheck(paType);
      onChange(result);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[14px] font-semibold text-text-primary">
          Eligibility Verification
        </h2>
        <p className="mt-1 text-[13px] text-text-secondary">
          Verify member eligibility and coverage for the requested service.
        </p>
      </div>

      {/* Member summary */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="h-5 w-5 text-uhc-blue" />
          <div>
            <p className="text-[13px] font-medium text-text-primary">{memberName || 'No member selected'}</p>
            <p className="text-[12px] text-text-muted">Member ID: {memberId || '\u2014'}</p>
          </div>
        </div>

        {!data?.checked ? (
          <Button
            variant="primary"
            onClick={handleCheck}
            disabled={loading || !memberId}
            icon={loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
          >
            {loading ? 'Checking Eligibility...' : 'Check Eligibility'}
          </Button>
        ) : (
          <div className="space-y-4">
            {/* Status banner */}
            <div
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-3 text-[13px] font-medium',
                data.eligible
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200',
              )}
            >
              {data.eligible ? (
                <CheckCircle className="h-4 w-4 shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0" />
              )}
              {data.eligible
                ? `Member is eligible \u2014 ${data.planName}, Coverage ${data.coverageStatus}`
                : `Member is not eligible \u2014 Coverage ${data.coverageStatus}`}
            </div>

            {/* Coverage details */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Plan</p>
                <p className="mt-0.5 text-[13px] text-text-primary">{data.planName}</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Coverage Status</p>
                <p className={cn('mt-0.5 text-[13px] font-medium capitalize', data.coverageStatus === 'active' ? 'text-green-600' : 'text-red-600')}>
                  {data.coverageStatus}
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Auth Required</p>
                <p className={cn('mt-0.5 text-[13px] font-medium', data.authRequired ? 'text-amber-600' : 'text-green-600')}>
                  {data.authRequired ? 'Yes \u2014 Prior authorization required' : 'No \u2014 Not required'}
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Benefit Note</p>
                <p className="mt-0.5 text-[13px] text-text-primary">{data.benefitNote || '\u2014'}</p>
              </div>
            </div>

            {/* Deductible progress */}
            <div className="rounded-lg border border-border p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">Individual Deductible</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-uhc-blue rounded-full transition-all"
                    style={{ width: `${Math.min(100, (data.deductibleMet / data.deductibleMax) * 100)}%` }}
                  />
                </div>
                <span className="text-[12px] text-text-secondary whitespace-nowrap">
                  ${data.deductibleMet.toLocaleString()} / ${data.deductibleMax.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Re-check button */}
            <Button variant="secondary" size="sm" onClick={handleCheck} disabled={loading}>
              Re-check Eligibility
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
