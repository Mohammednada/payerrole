import { Input } from '../../../../shared/components/ui/input';
import type { PaWizardData } from '../../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StepMemberProps {
  data: PaWizardData['memberInfo'];
  onChange: (updated: PaWizardData['memberInfo']) => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StepMember({ data, onChange }: StepMemberProps) {
  const update = (field: keyof PaWizardData['memberInfo'], value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[14px] font-semibold text-text-primary">
          Member Information
        </h2>
        <p className="mt-1 text-[13px] text-text-secondary">
          Enter the member details for this prior authorization request.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Member ID"
          placeholder="e.g. UHC882014521"
          value={data.memberId}
          onChange={(e) => update('memberId', e.target.value)}
        />

        <Input
          label="Member Name"
          placeholder="e.g. Diana Kowalski"
          value={data.memberName}
          onChange={(e) => update('memberName', e.target.value)}
        />

        <Input
          label="Date of Birth"
          type="date"
          value={data.dob}
          onChange={(e) => update('dob', e.target.value)}
        />

        <Input
          label="Subscriber ID"
          placeholder="e.g. SUB-882014521"
          value={data.subscriberId}
          onChange={(e) => update('subscriberId', e.target.value)}
        />
      </div>
    </div>
  );
}
