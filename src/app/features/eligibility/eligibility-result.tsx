import { motion } from 'motion/react';
import { ArrowLeft, Printer } from 'lucide-react';
import { Button } from '../../../shared/components/ui/button';
import { CoverageSummaryCard } from './coverage-summary-card';
import { BenefitsTable } from './benefits-table';
import type { EligibilityResult as EligibilityResultType } from '../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface EligibilityResultProps {
  result: EligibilityResultType;
  onBack: () => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function EligibilityResult({ result, onBack }: EligibilityResultProps) {
  return (
    <div className="space-y-5">
      {/* Header with navigation and actions */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to Search
          </Button>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={<Printer className="h-4 w-4" />}
          onClick={() => window.print()}
        >
          Print
        </Button>
      </motion.div>

      {/* Coverage Summary */}
      <CoverageSummaryCard result={result} />

      {/* Benefits Table */}
      <BenefitsTable benefits={result.benefits} />
    </div>
  );
}
