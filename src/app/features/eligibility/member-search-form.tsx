import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Search, UserSearch } from 'lucide-react';
import { Card } from '../../../shared/components/ui/card';
import { Input } from '../../../shared/components/ui/input';
import { Button } from '../../../shared/components/ui/button';
import { mockEligibilityResult } from '../../../mock/eligibility';
import type { EligibilityResult } from '../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MemberSearchFormProps {
  onResult: (result: EligibilityResult) => void;
}

interface FormFields {
  memberId: string;
  firstName: string;
  lastName: string;
  dob: string;
  subscriberId: string;
}

const EMPTY_FORM: FormFields = {
  memberId: '',
  firstName: '',
  lastName: '',
  dob: '',
  subscriberId: '',
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MemberSearchForm({ onResult }: MemberSearchFormProps) {
  const [fields, setFields] = useState<FormFields>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFields((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const canSubmit =
    fields.memberId.trim() !== '' ||
    fields.subscriberId.trim() !== '' ||
    (fields.firstName.trim() !== '' && fields.lastName.trim() !== '');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!canSubmit || loading) return;

      setLoading(true);

      // Simulate API delay
      setTimeout(() => {
        setLoading(false);
        onResult(mockEligibilityResult);
      }, 1000);
    },
    [canSubmit, loading, onResult],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-uhc-blue-50">
            <UserSearch className="h-5 w-5 text-uhc-blue" />
          </div>
          <div>
            <h2 className="text-[14px] font-semibold text-text-primary">
              Member Search
            </h2>
            <p className="text-[12px] text-text-muted">
              Search by Member ID, Subscriber ID, or member name
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Member ID & Subscriber ID */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Member ID"
              name="memberId"
              placeholder="e.g. UHC882014521"
              value={fields.memberId}
              onChange={handleChange}
              disabled={loading}
            />
            <Input
              label="Subscriber ID"
              name="subscriberId"
              placeholder="e.g. SUB-44201987"
              value={fields.subscriberId}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Row 2: First Name, Last Name, DOB */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              label="First Name"
              name="firstName"
              placeholder="First name"
              value={fields.firstName}
              onChange={handleChange}
              disabled={loading}
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Last name"
              value={fields.lastName}
              onChange={handleChange}
              disabled={loading}
            />
            <Input
              label="Date of Birth"
              name="dob"
              type="date"
              value={fields.dob}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
            <Button
              variant="ghost"
              size="md"
              type="button"
              disabled={loading}
              onClick={() => setFields(EMPTY_FORM)}
            >
              Clear
            </Button>
            <Button
              variant="primary"
              size="md"
              type="submit"
              loading={loading}
              disabled={!canSubmit}
              icon={<Search className="h-4 w-4" />}
            >
              Search
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
