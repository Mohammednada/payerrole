import { useState, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Users } from 'lucide-react';
import type { Member } from '../../../shared/types';
import { formatDate } from '../../../shared/lib/utils';
import { mockMembers } from '../../../mock/members';
import { Card } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { Badge } from '../../../shared/components/ui/badge';
import { EmptyState } from '../../../shared/components/ui/empty-state';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MemberSearchProps {
  onSelect: (member: Member) => void;
}

interface SearchCriteria {
  memberId: string;
  name: string;
  dob: string;
  last4Ssn: string;
}

const INITIAL_CRITERIA: SearchCriteria = {
  memberId: '',
  name: '',
  dob: '',
  last4Ssn: '',
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function coverageVariant(status: Member['coverageStatus']) {
  switch (status) {
    case 'active':
      return 'success' as const;
    case 'inactive':
      return 'warning' as const;
    case 'terminated':
      return 'error' as const;
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MemberSearch({ onSelect }: MemberSearchProps) {
  const [criteria, setCriteria] = useState<SearchCriteria>(INITIAL_CRITERIA);
  const [hasSearched, setHasSearched] = useState(false);

  /* ---- Handle field changes ---- */

  const updateField = useCallback(
    (field: keyof SearchCriteria, value: string) => {
      setCriteria((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  /* ---- Filtering logic ---- */

  const results = useMemo(() => {
    if (!hasSearched) return [];

    const hasCriteria =
      criteria.memberId.trim() ||
      criteria.name.trim() ||
      criteria.dob.trim() ||
      criteria.last4Ssn.trim();

    if (!hasCriteria) return mockMembers;

    return mockMembers.filter((m) => {
      const matchesId = criteria.memberId.trim()
        ? m.memberId.toLowerCase().includes(criteria.memberId.trim().toLowerCase())
        : true;

      const matchesName = criteria.name.trim()
        ? `${m.firstName} ${m.lastName}`
            .toLowerCase()
            .includes(criteria.name.trim().toLowerCase())
        : true;

      const matchesDob = criteria.dob.trim()
        ? m.dob === criteria.dob.trim()
        : true;

      const matchesSsn = criteria.last4Ssn.trim()
        ? m.ssn.endsWith(criteria.last4Ssn.trim())
        : true;

      return matchesId && matchesName && matchesDob && matchesSsn;
    });
  }, [criteria, hasSearched]);

  /* ---- Actions ---- */

  const handleSearch = useCallback(() => {
    setHasSearched(true);
  }, []);

  const handleClear = useCallback(() => {
    setCriteria(INITIAL_CRITERIA);
    setHasSearched(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch],
  );

  /* ---- Render ---- */

  return (
    <div className="space-y-5">
      {/* Search form */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-[14px] font-semibold text-text-primary">
            Search Criteria
          </h2>

          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            onKeyDown={handleKeyDown}
          >
            <Input
              label="Member ID"
              placeholder="e.g. UHC-900214587"
              value={criteria.memberId}
              onChange={(e) => updateField('memberId', e.target.value)}
            />
            <Input
              label="Name"
              placeholder="First or last name"
              value={criteria.name}
              onChange={(e) => updateField('name', e.target.value)}
            />
            <Input
              label="Date of Birth"
              type="date"
              value={criteria.dob}
              onChange={(e) => updateField('dob', e.target.value)}
            />
            <Input
              label="Last 4 SSN"
              placeholder="e.g. 4521"
              maxLength={4}
              value={criteria.last4Ssn}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                updateField('last4Ssn', val);
              }}
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <Button
              icon={<Search className="h-4 w-4" />}
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </Card>

      {/* Results */}
      {hasSearched && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-text-primary">
              Results
            </h2>
            <span className="text-[13px] text-text-secondary">
              {results.length} member{results.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {results.length === 0 ? (
            <Card>
              <EmptyState
                icon={Users}
                title="No members found"
                description="No members match your search criteria. Try adjusting your filters or search with different information."
              />
            </Card>
          ) : (
            <div className="space-y-2">
              {results.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.04 }}
                >
                  <Card
                    className="flex items-center justify-between gap-4"
                    onClick={() => onSelect(member)}
                  >
                    {/* Left: avatar + info */}
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Initials avatar */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-uhc-blue-50 text-[13px] font-semibold text-uhc-blue">
                        {member.firstName[0]}
                        {member.lastName[0]}
                      </div>

                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-text-primary truncate">
                          {member.lastName}, {member.firstName}
                        </p>
                        <p className="text-[11px] text-text-secondary truncate">
                          {member.memberId} &middot; DOB: {formatDate(member.dob)}
                        </p>
                      </div>
                    </div>

                    {/* Right: plan + status */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden text-right sm:block">
                        <p className="text-[13px] text-text-secondary">
                          {member.planName}
                        </p>
                        <p className="text-[11px] text-text-muted">{member.planType}</p>
                      </div>
                      <Badge variant={coverageVariant(member.coverageStatus)}>
                        {member.coverageStatus.charAt(0).toUpperCase() +
                          member.coverageStatus.slice(1)}
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
