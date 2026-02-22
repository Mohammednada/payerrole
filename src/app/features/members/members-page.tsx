import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import type { Member } from '../../../shared/types';
import { Button } from '../../../shared/components/ui/button';
import { MemberSearch } from './member-search';
import { MemberProfileCard } from './member-profile-card';
import { MemberCoverageHistory } from './member-coverage-history';
import { MemberRecentActivity } from './member-recent-activity';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SubView = 'search' | 'profile';

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

export function MembersPage() {
  const [subView, setSubView] = useState<SubView>('search');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  /* ---- Navigation handlers ---- */

  const handleSelect = useCallback((member: Member) => {
    setSelectedMember(member);
    setSubView('profile');
  }, []);

  const handleBack = useCallback(() => {
    setSelectedMember(null);
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
          className="space-y-5"
        >
          {/* Page header */}
          <div>
            <h1 className="text-[16px] font-semibold text-text-primary">
              Member Lookup
            </h1>
            <p className="mt-1 text-[13px] text-text-secondary">
              Search for members by ID, name, date of birth, or SSN
            </p>
          </div>

          <MemberSearch onSelect={handleSelect} />
        </motion.div>
      )}

      {subView === 'profile' && selectedMember && (
        <motion.div
          key="profile"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="space-y-5"
        >
          {/* Back button + header */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              icon={<ArrowLeft className="h-4 w-4" />}
              onClick={handleBack}
            >
              Back to Search
            </Button>
          </div>

          <div>
            <h1 className="text-[16px] font-semibold text-text-primary">
              {selectedMember.firstName} {selectedMember.lastName}
            </h1>
            <p className="mt-1 text-[13px] text-text-secondary">
              Member ID: {selectedMember.memberId}
            </p>
          </div>

          {/* Profile + Coverage side by side on large screens */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <MemberProfileCard member={selectedMember} />
            </div>
            <div className="xl:col-span-1">
              <MemberCoverageHistory history={selectedMember.coverageHistory} />
            </div>
          </div>

          {/* Recent Activity full width */}
          <MemberRecentActivity
            claims={selectedMember.recentClaims}
            pas={selectedMember.recentPAs}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
