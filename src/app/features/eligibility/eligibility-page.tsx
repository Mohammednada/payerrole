import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { EligibilityResult as EligibilityResultType } from '../../../shared/types';
import { MemberSearchForm } from './member-search-form';
import { EligibilityResult } from './eligibility-result';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SubView = 'search' | 'result';

/* ------------------------------------------------------------------ */
/*  Transition variants                                                */
/* ------------------------------------------------------------------ */

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const pageTransition = { duration: 0.25, ease: "easeInOut" as const };

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function EligibilityPage() {
  const [subView, setSubView] = useState<SubView>('search');
  const [result, setResult] = useState<EligibilityResultType | null>(null);

  /* ---- Navigation handlers ---- */

  const handleResult = useCallback((data: EligibilityResultType) => {
    setResult(data);
    setSubView('result');
  }, []);

  const handleBack = useCallback(() => {
    setResult(null);
    setSubView('search');
  }, []);

  /* ---- Render ---- */

  return (
    <AnimatePresence mode="wait">
      {subView === 'search' && (
        <motion.div
          key="search"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <div className="space-y-5">
            {/* Page header */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h1 className="text-[16px] font-semibold text-text-primary">
                Verify Eligibility
              </h1>
              <p className="mt-1 text-[13px] text-text-secondary">
                Look up member coverage, benefits, and plan details
              </p>
            </motion.div>

            {/* Search form */}
            <MemberSearchForm onResult={handleResult} />
          </div>
        </motion.div>
      )}

      {subView === 'result' && result && (
        <motion.div
          key="result"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <div className="space-y-5">
            {/* Page header */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h1 className="text-[16px] font-semibold text-text-primary">
                Verify Eligibility
              </h1>
              <p className="mt-1 text-[13px] text-text-secondary">
                Coverage details for {result.memberName}
              </p>
            </motion.div>

            {/* Result view */}
            <EligibilityResult result={result} onBack={handleBack} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
