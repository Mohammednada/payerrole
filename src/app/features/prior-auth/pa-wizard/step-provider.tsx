import { Input } from '../../../../shared/components/ui/input';
import type { PaWizardData } from '../../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StepProviderProps {
  data: PaWizardData['providerInfo'];
  onChange: (updated: PaWizardData['providerInfo']) => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StepProvider({ data, onChange }: StepProviderProps) {
  const update = (field: keyof PaWizardData['providerInfo'], value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[14px] font-semibold text-text-primary">
          Provider Information
        </h2>
        <p className="mt-1 text-[13px] text-text-secondary">
          Enter the requesting provider and facility details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Provider Name"
          placeholder="e.g. Dr. Rajesh Patel"
          value={data.providerName}
          onChange={(e) => update('providerName', e.target.value)}
        />

        <Input
          label="NPI"
          placeholder="e.g. 1234567890"
          value={data.providerNpi}
          onChange={(e) => update('providerNpi', e.target.value)}
        />

        <Input
          label="Facility Name"
          placeholder="e.g. Fairview Southdale Hospital"
          value={data.facilityName}
          onChange={(e) => update('facilityName', e.target.value)}
        />

        <Input
          label="Facility Address"
          placeholder="e.g. 6401 France Ave S, Edina, MN 55435"
          value={data.facilityAddress}
          onChange={(e) => update('facilityAddress', e.target.value)}
          className="sm:col-span-2"
        />
      </div>
    </div>
  );
}
