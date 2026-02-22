import { useMemo } from 'react';
import {
  Play,
  Cog,
  CheckCircle2,
  XCircle,
  Users,
  Info,
  Diamond,
  ArrowDown,
  ArrowRight,
} from 'lucide-react';
import { cn } from '../../../shared/lib/utils';
import { Card } from '../../../shared/components/ui/card';
import type { PathwayStep } from '../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PaClinicalPathwayProps {
  steps: PathwayStep[];
  paTypeLabel: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Resolve the icon for a given step type + outcome. */
function stepIcon(step: PathwayStep) {
  if (step.type === 'start') return Play;
  if (step.type === 'decision') return Diamond;
  if (step.type === 'action') return Cog;

  // outcome
  switch (step.outcome) {
    case 'approved':
      return CheckCircle2;
    case 'denied':
      return XCircle;
    case 'peer-review':
      return Users;
    case 'info-requested':
      return Info;
    default:
      return CheckCircle2;
  }
}

/** Card colour classes based on step type + outcome. */
function stepStyles(step: PathwayStep) {
  if (step.type === 'start') {
    return {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      icon: 'text-uhc-blue',
      badge: 'bg-blue-100 text-uhc-blue',
      badgeLabel: 'Start',
    };
  }
  if (step.type === 'decision') {
    return {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      icon: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-700',
      badgeLabel: 'Decision',
    };
  }
  if (step.type === 'action') {
    return {
      bg: 'bg-white',
      border: 'border-gray-300',
      icon: 'text-gray-500',
      badge: 'bg-gray-100 text-gray-600',
      badgeLabel: 'Action',
    };
  }

  // outcome colours
  switch (step.outcome) {
    case 'approved':
      return {
        bg: 'bg-green-50',
        border: 'border-green-300',
        icon: 'text-green-600',
        badge: 'bg-green-100 text-green-700',
        badgeLabel: 'Approved',
      };
    case 'denied':
      return {
        bg: 'bg-red-50',
        border: 'border-red-300',
        icon: 'text-red-600',
        badge: 'bg-red-100 text-red-700',
        badgeLabel: 'Denied',
      };
    case 'peer-review':
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-300',
        icon: 'text-amber-600',
        badge: 'bg-amber-100 text-amber-700',
        badgeLabel: 'Peer Review',
      };
    case 'info-requested':
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-300',
        icon: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-700',
        badgeLabel: 'Info Requested',
      };
    default:
      return {
        bg: 'bg-gray-50',
        border: 'border-gray-300',
        icon: 'text-gray-500',
        badge: 'bg-gray-100 text-gray-600',
        badgeLabel: 'Outcome',
      };
  }
}

/* ------------------------------------------------------------------ */
/*  Step Card                                                          */
/* ------------------------------------------------------------------ */

function StepCard({ step, compact = false }: { step: PathwayStep; compact?: boolean }) {
  const styles = stepStyles(step);
  const Icon = stepIcon(step);

  return (
    <div
      className={cn(
        'relative rounded-xl border-2 px-4 py-3',
        styles.bg,
        styles.border,
        compact ? 'max-w-[280px]' : 'max-w-[400px] w-full',
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
            step.type === 'decision' ? 'bg-amber-100' : 'bg-white/70',
          )}
        >
          <Icon className={cn('h-4 w-4', styles.icon)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[13px] font-semibold text-text-primary">{step.label}</p>
            <span
              className={cn(
                'inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold',
                styles.badge,
              )}
            >
              {styles.badgeLabel}
            </span>
          </div>
          <p className="mt-1 text-[12px] text-text-secondary leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Connectors                                                         */
/* ------------------------------------------------------------------ */

function VerticalConnector({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-0.5 h-6 bg-gray-300" />
      {label && (
        <span className="text-[10px] font-semibold text-gray-500 -my-0.5">{label}</span>
      )}
      {label && <div className="w-0.5 h-2 bg-gray-300" />}
      <ArrowDown className="h-3 w-3 text-gray-400 -mt-0.5" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Build ordered flow from step graph                                 */
/* ------------------------------------------------------------------ */

interface FlowNode {
  step: PathwayStep;
  noBranch?: PathwayStep; // for decision nodes, the "No" side branch target
}

function buildFlow(steps: PathwayStep[]): FlowNode[] {
  const map = new Map<string, PathwayStep>();
  for (const s of steps) map.set(s.id, s);

  const flow: FlowNode[] = [];
  const visited = new Set<string>();

  // Find the start node (or first node)
  let current = steps.find((s) => s.type === 'start') ?? steps[0];
  if (!current) return flow;

  while (current && !visited.has(current.id)) {
    visited.add(current.id);

    const node: FlowNode = { step: current };

    // For decision nodes, resolve the no-branch
    if (current.type === 'decision' && current.noNext) {
      const noTarget = map.get(current.noNext);
      if (noTarget) node.noBranch = noTarget;
    }

    flow.push(node);

    // Follow the primary path (yesNext for decisions, nextStep for others)
    const nextId = current.yesNext ?? current.nextStep;
    if (nextId && !visited.has(nextId)) {
      current = map.get(nextId)!;
    } else {
      break;
    }
  }

  return flow;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PaClinicalPathway({ steps, paTypeLabel }: PaClinicalPathwayProps) {
  const flow = useMemo(() => buildFlow(steps), [steps]);

  if (flow.length === 0) {
    return null;
  }

  return (
    <Card>
      <h3 className="mb-1 text-[14px] font-semibold text-text-primary">
        Clinical Pathway
      </h3>
      <p className="mb-5 text-[12px] text-text-secondary">
        Decision flow for {paTypeLabel} prior authorization review
      </p>

      <div className="flex flex-col items-center">
        {flow.map((node, index) => {
          const isLast = index === flow.length - 1;
          const isDecision = node.step.type === 'decision';

          return (
            <div key={node.step.id} className="flex flex-col items-center w-full">
              {/* The step card */}
              <div
                className={cn(
                  'flex w-full',
                  isDecision ? 'justify-center' : 'justify-center',
                )}
              >
                <StepCard step={node.step} />
              </div>

              {/* Decision branching: Yes / No labels + side branch */}
              {isDecision && node.noBranch && (
                <div className="relative flex w-full items-start mt-0">
                  {/* Centre connector (Yes path continues down) */}
                  <div className="flex-1 flex justify-center">
                    <VerticalConnector label="Yes" />
                  </div>

                  {/* Side branch connector (No path) */}
                  <div className="absolute right-0 top-0 flex items-start" style={{ right: '2%' }}>
                    {/* Horizontal line from centre to side */}
                    <div className="flex items-center mt-3">
                      <div className="w-8 h-0.5 bg-gray-300" />
                      <ArrowRight className="h-3 w-3 text-gray-400 -ml-0.5" />
                    </div>

                    {/* Side branch card */}
                    <div className="flex flex-col items-center ml-1">
                      <span className="text-[10px] font-semibold text-red-500 mb-1">No</span>
                      <StepCard step={node.noBranch} compact />
                    </div>
                  </div>
                </div>
              )}

              {/* Decision without a resolved no-branch: just show Yes label */}
              {isDecision && !node.noBranch && !isLast && (
                <VerticalConnector label="Yes" />
              )}

              {/* Non-decision connector */}
              {!isDecision && !isLast && <VerticalConnector />}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 border-t border-border pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">
          Legend
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Start', bg: 'bg-blue-100', dot: 'bg-blue-400' },
            { label: 'Decision', bg: 'bg-amber-100', dot: 'bg-amber-400' },
            { label: 'Action', bg: 'bg-gray-100', dot: 'bg-gray-400' },
            { label: 'Approved', bg: 'bg-green-100', dot: 'bg-green-500' },
            { label: 'Denied', bg: 'bg-red-100', dot: 'bg-red-500' },
            { label: 'Peer Review', bg: 'bg-amber-100', dot: 'bg-amber-500' },
            { label: 'Info Requested', bg: 'bg-blue-100', dot: 'bg-blue-500' },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-2.5 py-1',
                item.bg,
              )}
            >
              <span className={cn('h-2 w-2 rounded-full', item.dot)} />
              <span className="text-[10px] font-medium text-text-secondary">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
