import { Input } from '../../../../../shared/components/ui/input';
import { Select } from '../../../../../shared/components/ui/select';
import { cn } from '../../../../../shared/lib/utils';
import type { DmeDetails, PaTypeDetails } from '../../../../../shared/types';

interface DmeFormProps {
  data?: DmeDetails;
  onChange: (details: PaTypeDetails) => void;
}

const RENTAL_OPTIONS = [
  { value: 'rental', label: 'Rental' },
  { value: 'purchase', label: 'Purchase' },
];

const defaults: DmeDetails = {
  type: 'DME',
  hcpcsCode: '',
  itemDescription: '',
  rentalOrPurchase: '' as DmeDetails['rentalOrPurchase'],
  durationMonths: 0,
  cmnRequired: false,
};

export function DmeForm({ data, onChange }: DmeFormProps) {
  const form = data ?? defaults;

  const update = <K extends keyof DmeDetails>(field: K, value: DmeDetails[K]) => {
    onChange({ ...form, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input
        label="HCPCS Code"
        placeholder="e.g. K0823"
        value={form.hcpcsCode}
        onChange={(e) => update('hcpcsCode', e.target.value)}
      />
      <Input
        label="Item Description"
        placeholder="e.g. Power wheelchair, Group 2"
        value={form.itemDescription}
        onChange={(e) => update('itemDescription', e.target.value)}
      />
      <Select
        label="Rental or Purchase"
        options={RENTAL_OPTIONS}
        placeholder="Select option"
        value={form.rentalOrPurchase}
        onChange={(e) => update('rentalOrPurchase', e.target.value as DmeDetails['rentalOrPurchase'])}
      />
      <Input
        label="Duration (months)"
        type="number"
        min={1}
        placeholder="e.g. 12"
        value={form.durationMonths || ''}
        onChange={(e) => update('durationMonths', Number(e.target.value) || 0)}
      />

      {/* CMN checkbox */}
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <span className="text-[13px] font-medium text-text-primary">Certificate of Medical Necessity</span>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.cmnRequired}
            onChange={(e) => update('cmnRequired', e.target.checked)}
            className={cn(
              'h-4 w-4 rounded border-border text-uhc-blue focus:ring-uhc-blue/20',
            )}
          />
          <span className="text-[13px] text-text-secondary">CMN is required for this equipment</span>
        </label>
      </div>
    </div>
  );
}
