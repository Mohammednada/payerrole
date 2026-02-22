import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface StepDefinition {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: StepDefinition[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="flex w-full items-start">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isUpcoming = index > currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.label}
            className={cn('flex items-start', !isLast && 'flex-1')}
          >
            {/* Step circle + label */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => onStepClick?.(index)}
                disabled={!onStepClick}
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-semibold transition-colors',
                  isCompleted &&
                    'border-uhc-blue bg-uhc-blue text-white',
                  isActive &&
                    'border-uhc-blue bg-white text-uhc-blue',
                  isUpcoming &&
                    'border-gray-300 bg-white text-gray-400',
                  onStepClick
                    ? 'cursor-pointer hover:opacity-80'
                    : 'cursor-default',
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </button>

              <span
                className={cn(
                  'mt-2 text-center text-[11px] font-medium',
                  isActive ? 'text-uhc-blue' : 'text-text-secondary',
                )}
              >
                {step.label}
              </span>

              {step.description && (
                <span className="mt-0.5 text-center text-[11px] text-text-muted">
                  {step.description}
                </span>
              )}
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
  );
}
