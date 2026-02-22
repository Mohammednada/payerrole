import { Input } from '../../../../../shared/components/ui/input';
import { cn } from '../../../../../shared/lib/utils';
import type { HomeHealthDetails, PaTypeDetails } from '../../../../../shared/types';

interface HomeHealthFormProps {
  data?: HomeHealthDetails;
  onChange: (details: PaTypeDetails) => void;
}

const DISCIPLINE_OPTIONS: { value: HomeHealthDetails['discipline'][number]; label: string }[] = [
  { value: 'skilled-nursing', label: 'Skilled Nursing' },
  { value: 'pt', label: 'Physical Therapy' },
  { value: 'ot', label: 'Occupational Therapy' },
  { value: 'speech', label: 'Speech Therapy' },
  { value: 'msw', label: 'Medical Social Worker' },
  { value: 'aide', label: 'Home Health Aide' },
];

const defaults: HomeHealthDetails = {
  type: 'home-health',
  visitFrequency: '',
  discipline: [],
  homeboundStatus: false,
  certificationPeriodStart: '',
  certificationPeriodEnd: '',
};

export function HomeHealthForm({ data, onChange }: HomeHealthFormProps) {
  const form = data ?? defaults;

  const update = <K extends keyof HomeHealthDetails>(field: K, value: HomeHealthDetails[K]) => {
    onChange({ ...form, [field]: value });
  };

  const toggleDiscipline = (disc: HomeHealthDetails['discipline'][number]) => {
    const current = form.discipline;
    const updated = current.includes(disc)
      ? current.filter((d) => d !== disc)
      : [...current, disc];
    update('discipline', updated);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input
        label="Visit Frequency"
        placeholder="e.g. 3 visits/week for 4 weeks"
        value={form.visitFrequency}
        onChange={(e) => update('visitFrequency', e.target.value)}
      />

      {/* Homebound checkbox */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-text-primary">Homebound Status</span>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.homeboundStatus}
            onChange={(e) => update('homeboundStatus', e.target.checked)}
            className={cn(
              'h-4 w-4 rounded border-border text-uhc-blue focus:ring-uhc-blue/20',
            )}
          />
          <span className="text-[13px] text-text-secondary">Patient meets homebound criteria</span>
        </label>
      </div>

      <Input
        label="Certification Period Start"
        type="date"
        value={form.certificationPeriodStart}
        onChange={(e) => update('certificationPeriodStart', e.target.value)}
      />
      <Input
        label="Certification Period End"
        type="date"
        value={form.certificationPeriodEnd}
        onChange={(e) => update('certificationPeriodEnd', e.target.value)}
      />

      {/* Disciplines multi-checkbox */}
      <div className="flex flex-col gap-2 sm:col-span-2">
        <span className="text-[13px] font-medium text-text-primary">Disciplines Required</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {DISCIPLINE_OPTIONS.map((opt) => (
            <label key={opt.value} className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.discipline.includes(opt.value)}
                onChange={() => toggleDiscipline(opt.value)}
                className={cn(
                  'h-4 w-4 rounded border-border text-uhc-blue focus:ring-uhc-blue/20',
                )}
              />
              <span className="text-[13px] text-text-secondary">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
