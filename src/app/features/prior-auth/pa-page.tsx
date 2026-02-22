import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { PriorAuth, PaWizardData } from '../../../shared/types';
import { PaList } from './pa-list';
import { PaDetailPage } from './pa-detail/pa-detail-page';
import { PaWizard } from './pa-wizard/pa-wizard';
import { PaRequirementsPage } from './pa-requirements-page';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SubView = 'list' | 'detail' | 'wizard' | 'requirements';

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

export function PaPage() {
  const [subView, setSubView] = useState<SubView>('list');
  const [selectedPa, setSelectedPa] = useState<PriorAuth | null>(null);

  /* ---- Navigation handlers ---- */

  const handleSelect = useCallback((pa: PriorAuth) => {
    setSelectedPa(pa);
    setSubView('detail');
  }, []);

  const handleNewRequest = useCallback(() => {
    setSubView('wizard');
  }, []);

  const handleViewRequirements = useCallback(() => {
    setSubView('requirements');
  }, []);

  const handleBack = useCallback(() => {
    setSelectedPa(null);
    setSubView('list');
  }, []);

  const handleWizardClose = useCallback(() => {
    setSubView('list');
  }, []);

  const handleWizardSubmit = useCallback((_data: PaWizardData) => {
    // In a real app this would POST to an API.
    // For the prototype, simply return to the list.
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
          <PaList
            onSelect={handleSelect}
            onNewRequest={handleNewRequest}
            onViewRequirements={handleViewRequirements}
          />
        </motion.div>
      )}

      {subView === 'detail' && selectedPa && (
        <motion.div
          key="detail"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <PaDetailPage pa={selectedPa} onBack={handleBack} />
        </motion.div>
      )}

      {subView === 'wizard' && (
        <motion.div
          key="wizard"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <PaWizard onClose={handleWizardClose} onSubmit={handleWizardSubmit} />
        </motion.div>
      )}

      {subView === 'requirements' && (
        <motion.div
          key="requirements"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <PaRequirementsPage onBack={handleBack} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
