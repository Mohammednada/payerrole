import { Input } from '../../../../../shared/components/ui/input';
import type { PharmacyDetails, PaTypeDetails } from '../../../../../shared/types';

interface PharmacyFormProps {
  data?: PharmacyDetails;
  onChange: (details: PaTypeDetails) => void;
}

const defaults: PharmacyDetails = {
  type: 'pharmacy',
  ndcCode: '',
  drugName: '',
  dosage: '',
  quantityRequested: 0,
  daysSupply: 0,
  pharmacyNpi: '',
};

export function PharmacyForm({ data, onChange }: PharmacyFormProps) {
  const form = data ?? defaults;

  const update = <K extends keyof PharmacyDetails>(field: K, value: PharmacyDetails[K]) => {
    onChange({ ...form, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input
        label="NDC Code"
        placeholder="e.g. 00074-3799-02"
        value={form.ndcCode}
        onChange={(e) => update('ndcCode', e.target.value)}
      />
      <Input
        label="Drug Name"
        placeholder="e.g. Adalimumab (Humira)"
        value={form.drugName}
        onChange={(e) => update('drugName', e.target.value)}
      />
      <Input
        label="Dosage"
        placeholder="e.g. 40 mg subcutaneous"
        value={form.dosage}
        onChange={(e) => update('dosage', e.target.value)}
      />
      <Input
        label="Quantity Requested"
        type="number"
        min={1}
        placeholder="e.g. 2"
        value={form.quantityRequested || ''}
        onChange={(e) => update('quantityRequested', Number(e.target.value) || 0)}
      />
      <Input
        label="Days Supply"
        type="number"
        min={1}
        placeholder="e.g. 30"
        value={form.daysSupply || ''}
        onChange={(e) => update('daysSupply', Number(e.target.value) || 0)}
      />
      <Input
        label="Pharmacy NPI"
        placeholder="e.g. 1234567890"
        value={form.pharmacyNpi}
        onChange={(e) => update('pharmacyNpi', e.target.value)}
      />
    </div>
  );
}
