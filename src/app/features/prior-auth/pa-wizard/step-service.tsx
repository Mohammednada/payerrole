import { Input } from '../../../../shared/components/ui/input';
import { Select } from '../../../../shared/components/ui/select';
import type { PaWizardData } from '../../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StepServiceProps {
  data: PaWizardData['serviceInfo'];
  onChange: (updated: PaWizardData['serviceInfo']) => void;
}

/* ------------------------------------------------------------------ */
/*  Select options                                                     */
/* ------------------------------------------------------------------ */

const TYPE_OPTIONS = [
  { value: 'inpatient', label: 'Inpatient' },
  { value: 'outpatient', label: 'Outpatient' },
  { value: 'pharmacy', label: 'Pharmacy' },
  { value: 'imaging', label: 'Imaging' },
  { value: 'DME', label: 'DME' },
  { value: 'home-health', label: 'Home Health' },
];

const URGENCY_OPTIONS = [
  { value: 'standard', label: 'Standard' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'emergent', label: 'Emergent' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StepService({ data, onChange }: StepServiceProps) {
  const update = <K extends keyof PaWizardData['serviceInfo']>(
    field: K,
    value: PaWizardData['serviceInfo'][K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[14px] font-semibold text-text-primary">
          Service Information
        </h2>
        <p className="mt-1 text-[13px] text-text-secondary">
          Provide details about the service being requested.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Type"
          options={TYPE_OPTIONS}
          placeholder="Select type"
          value={data.type}
          onChange={(e) =>
            update('type', e.target.value as PaWizardData['serviceInfo']['type'])
          }
        />

        <Select
          label="Urgency"
          options={URGENCY_OPTIONS}
          placeholder="Select urgency"
          value={data.urgency}
          onChange={(e) =>
            update('urgency', e.target.value as PaWizardData['serviceInfo']['urgency'])
          }
        />

        <Input
          label="Service Code"
          placeholder="e.g. 70553"
          value={data.serviceCode}
          onChange={(e) => update('serviceCode', e.target.value)}
        />

        <Input
          label="Service Description"
          placeholder="e.g. Brain MRI with contrast"
          value={data.serviceDescription}
          onChange={(e) => update('serviceDescription', e.target.value)}
        />

        <Input
          label="Diagnosis Code"
          placeholder="e.g. G43.909"
          value={data.diagnosisCode}
          onChange={(e) => update('diagnosisCode', e.target.value)}
        />

        <Input
          label="Diagnosis Description"
          placeholder="e.g. Migraine, unspecified"
          value={data.diagnosisDescription}
          onChange={(e) => update('diagnosisDescription', e.target.value)}
        />

        <Input
          label="Start Date"
          type="date"
          value={data.startDate}
          onChange={(e) => update('startDate', e.target.value)}
        />

        <Input
          label="End Date"
          type="date"
          value={data.endDate}
          onChange={(e) => update('endDate', e.target.value)}
        />

        <Input
          label="Quantity"
          type="number"
          min={1}
          placeholder="1"
          value={data.quantity || ''}
          onChange={(e) => update('quantity', Number(e.target.value) || 0)}
        />
      </div>
    </div>
  );
}
