import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Save } from 'lucide-react';
import { Card } from '../../../shared/components/ui/card';
import { Input } from '../../../shared/components/ui/input';
import { Button } from '../../../shared/components/ui/button';
import { useToast } from '../../../shared/hooks/use-toast';
import { mockPracticeInfo } from '../../../mock/settings';
import type { PracticeInfo } from '../../../mock/settings';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PracticeInfoForm() {
  const { addToast } = useToast();
  const [form, setForm] = useState<PracticeInfo>({ ...mockPracticeInfo });
  const [saving, setSaving] = useState(false);

  const handleChange = useCallback(
    (field: keyof PracticeInfo) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
      },
    [],
  );

  const handleSave = useCallback(async () => {
    setSaving(true);
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    addToast('Practice information saved successfully.', 'success');
  }, [addToast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card>
        <h2 className="mb-4 text-[14px] font-semibold text-text-primary">
          Practice Information
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Input
              label="Practice Name"
              value={form.name}
              onChange={handleChange('name')}
            />
          </div>

          <Input
            label="Tax Identification Number (TIN)"
            value={form.tin}
            onChange={handleChange('tin')}
          />

          <Input
            label="National Provider Identifier (NPI)"
            value={form.npi}
            onChange={handleChange('npi')}
          />

          <Input
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={handleChange('phone')}
          />

          <Input
            label="Fax"
            type="tel"
            value={form.fax}
            onChange={handleChange('fax')}
          />

          <div className="md:col-span-2">
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
            />
          </div>

          {/* Address field */}
          <div className="md:col-span-2">
            <Input
              label="Address"
              value={form.address}
              onChange={handleChange('address')}
            />
          </div>

          <div className="md:col-span-2">
            <Input
              label="Specialty"
              value={form.specialty}
              onChange={handleChange('specialty')}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex justify-end">
          <Button
            icon={<Save className="h-4 w-4" />}
            loading={saving}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
