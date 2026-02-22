import { Input } from '../../../../../shared/components/ui/input';
import { Select } from '../../../../../shared/components/ui/select';
import type { InpatientDetails, PaTypeDetails } from '../../../../../shared/types';

interface InpatientFormProps {
  data?: InpatientDetails;
  onChange: (details: PaTypeDetails) => void;
}

const BED_TYPE_OPTIONS = [
  { value: 'medical-surgical', label: 'Medical-Surgical' },
  { value: 'icu', label: 'ICU' },
  { value: 'step-down', label: 'Step-Down' },
  { value: 'rehab', label: 'Rehabilitation' },
];

const defaults: InpatientDetails = {
  type: 'inpatient',
  admissionDate: '',
  estimatedLOS: 1,
  bedType: '' as InpatientDetails['bedType'],
  attendingPhysician: '',
  facilityName: '',
};

export function InpatientForm({ data, onChange }: InpatientFormProps) {
  const form = data ?? defaults;

  const update = <K extends keyof InpatientDetails>(field: K, value: InpatientDetails[K]) => {
    onChange({ ...form, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input
        label="Admission Date"
        type="date"
        value={form.admissionDate}
        onChange={(e) => update('admissionDate', e.target.value)}
      />
      <Input
        label="Estimated Length of Stay (days)"
        type="number"
        min={1}
        placeholder="e.g. 3"
        value={form.estimatedLOS || ''}
        onChange={(e) => update('estimatedLOS', Number(e.target.value) || 0)}
      />
      <Select
        label="Bed Type"
        options={BED_TYPE_OPTIONS}
        placeholder="Select bed type"
        value={form.bedType}
        onChange={(e) => update('bedType', e.target.value as InpatientDetails['bedType'])}
      />
      <Input
        label="Attending Physician"
        placeholder="e.g. Dr. Amanda Liu"
        value={form.attendingPhysician}
        onChange={(e) => update('attendingPhysician', e.target.value)}
      />
      <Input
        label="Facility Name"
        placeholder="e.g. Fairview Southdale Hospital"
        value={form.facilityName}
        onChange={(e) => update('facilityName', e.target.value)}
        className="sm:col-span-2"
      />
    </div>
  );
}
