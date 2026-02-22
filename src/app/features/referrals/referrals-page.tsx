import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Referral } from '../../../shared/types';
import { ReferralList } from './referral-list';
import { ReferralDetail } from './referral-detail';
import { ReferralForm } from './referral-form';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SubView = 'list' | 'detail' | 'form';

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

export function ReferralsPage() {
  const [subView, setSubView] = useState<SubView>('list');
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  /* ---- Navigation handlers ---- */

  const handleSelect = useCallback((referral: Referral) => {
    setSelectedReferral(referral);
    setSubView('detail');
  }, []);

  const handleNewReferral = useCallback(() => {
    setSubView('form');
  }, []);

  const handleBack = useCallback(() => {
    setSelectedReferral(null);
    setSubView('list');
  }, []);

  const handleFormSubmit = useCallback(() => {
    // In a real app this would POST to an API.
    // For the prototype, simply return to the list.
    setSubView('list');
  }, []);

  const handleFormCancel = useCallback(() => {
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
          <ReferralList onSelect={handleSelect} onNewReferral={handleNewReferral} />
        </motion.div>
      )}

      {subView === 'detail' && selectedReferral && (
        <motion.div
          key="detail"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <ReferralDetail referral={selectedReferral} onBack={handleBack} />
        </motion.div>
      )}

      {subView === 'form' && (
        <motion.div
          key="form"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <ReferralForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
