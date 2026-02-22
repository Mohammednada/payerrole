import { Input } from '../../../../../shared/components/ui/input';
import { Select } from '../../../../../shared/components/ui/select';
import { cn } from '../../../../../shared/lib/utils';
import type { OutpatientDetails, PaTypeDetails } from '../../../../../shared/types';

interface OutpatientFormProps {
  data?: OutpatientDetails;
  onChange: (details: PaTypeDetails) => void;
}

const FACILITY_TYPE_OPTIONS = [
  { value: 'ambulatory', label: 'Ambulatory Surgery Center' },
  { value: 'hospital-outpatient', label: 'Hospital Outpatient' },
  { value: 'office', label: 'Office-Based' },
];

const defaults: OutpatientDetails = {
  type: 'outpatient',
  procedureCode: '',
  facilityType: '' as OutpatientDetails['facilityType'],
  anesthesiaRequired: false,
  followUpPlan: '',
};

export function OutpatientForm({ data, onChange }: OutpatientFormProps) {
  const form = data ?? defaults;

  const update = <K extends keyof OutpatientDetails>(field: K, value: OutpatientDetails[K]) => {
    onChange({ ...form, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input
        label="Procedure Code"
        placeholder="e.g. 29881"
        value={form.procedureCode}
        onChange={(e) => update('procedureCode', e.target.value)}
      />
      <Select
        label="Facility Type"
        options={FACILITY_TYPE_OPTIONS}
        placeholder="Select facility type"
        value={form.facilityType}
        onChange={(e) => update('facilityType', e.target.value as OutpatientDetails['facilityType'])}
      />

      {/* Anesthesia checkbox */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-text-primary">Anesthesia Required</span>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.anesthesiaRequired}
            onChange={(e) => update('anesthesiaRequired', e.target.checked)}
            className={cn(
              'h-4 w-4 rounded border-border text-uhc-blue focus:ring-uhc-blue/20',
            )}
          />
          <span className="text-[13px] text-text-secondary">Yes, anesthesia is required</span>
        </label>
      </div>

      {/* Follow-up plan */}
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-[13px] font-medium text-text-primary">Follow-Up Plan</label>
        <textarea
          value={form.followUpPlan}
          onChange={(e) => update('followUpPlan', e.target.value)}
          placeholder="Describe the post-procedure follow-up plan..."
          rows={3}
          className={cn(
            'w-full resize-none rounded-lg border border-border bg-[#f3f3f5] px-3 py-2 text-[13px] text-text-primary placeholder:text-text-muted',
            'focus:border-uhc-blue focus:ring-1 focus:ring-uhc-blue/20 outline-none',
          )}
        />
      </div>
    </div>
  );
}
