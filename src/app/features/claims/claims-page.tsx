import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Claim } from '../../../shared/types';
import { ClaimsList } from './claims-list';
import { ClaimDetailPage } from './claim-detail/claim-detail-page';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SubView = 'list' | 'detail';

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

export function ClaimsPage() {
  const [subView, setSubView] = useState<SubView>('list');
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  /* ---- Navigation handlers ---- */

  const handleSelect = useCallback((claim: Claim) => {
    setSelectedClaim(claim);
    setSubView('detail');
  }, []);

  const handleBack = useCallback(() => {
    setSelectedClaim(null);
    setSubView('list');
  }, []);

  /* ---- Render ---- */

  return (
    <AnimatePresence mode="wait">
      {subView === 'list' && (
        <motion.div
          key="list"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <ClaimsList onSelect={handleSelect} />
        </motion.div>
      )}

      {subView === 'detail' && selectedClaim && (
        <motion.div
          key="detail"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <ClaimDetailPage claim={selectedClaim} onBack={handleBack} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
