import { Input } from '../../../../../shared/components/ui/input';
import { Select } from '../../../../../shared/components/ui/select';
import { cn } from '../../../../../shared/lib/utils';
import type { ImagingDetails, PaTypeDetails } from '../../../../../shared/types';

interface ImagingFormProps {
  data?: ImagingDetails;
  onChange: (details: PaTypeDetails) => void;
}

const MODALITY_OPTIONS = [
  { value: 'MRI', label: 'MRI' },
  { value: 'CT', label: 'CT' },
  { value: 'PET', label: 'PET' },
  { value: 'Ultrasound', label: 'Ultrasound' },
  { value: 'X-Ray', label: 'X-Ray' },
  { value: 'Nuclear', label: 'Nuclear Medicine' },
];

const defaults: ImagingDetails = {
  type: 'imaging',
  modality: '' as ImagingDetails['modality'],
  bodyPart: '',
  contrastRequired: false,
  clinicalIndication: '',
  orderingProvider: '',
};

export function ImagingForm({ data, onChange }: ImagingFormProps) {
  const form = data ?? defaults;

  const update = <K extends keyof ImagingDetails>(field: K, value: ImagingDetails[K]) => {
    onChange({ ...form, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Select
        label="Modality"
        options={MODALITY_OPTIONS}
        placeholder="Select modality"
        value={form.modality}
        onChange={(e) => update('modality', e.target.value as ImagingDetails['modality'])}
      />
      <Input
        label="Body Part"
        placeholder="e.g. Brain, Lumbar Spine"
        value={form.bodyPart}
        onChange={(e) => update('bodyPart', e.target.value)}
      />

      {/* Contrast checkbox */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-text-primary">Contrast Required</span>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.contrastRequired}
            onChange={(e) => update('contrastRequired', e.target.checked)}
            className={cn(
              'h-4 w-4 rounded border-border text-uhc-blue focus:ring-uhc-blue/20',
            )}
          />
          <span className="text-[13px] text-text-secondary">Yes, contrast is required</span>
        </label>
      </div>

      <Input
        label="Ordering Provider"
        placeholder="e.g. Dr. Rajesh Patel"
        value={form.orderingProvider}
        onChange={(e) => update('orderingProvider', e.target.value)}
      />
      <Input
        label="Clinical Indication"
        placeholder="e.g. Chronic migraine unresponsive to treatment"
        value={form.clinicalIndication}
        onChange={(e) => update('clinicalIndication', e.target.value)}
        className="sm:col-span-2"
      />
    </div>
  );
}
