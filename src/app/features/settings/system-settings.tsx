import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Settings2, Save, Globe } from 'lucide-react';
import { Card } from '../../../shared/components/ui/card';
import { Select } from '../../../shared/components/ui/select';
import { Input } from '../../../shared/components/ui/input';
import { Button } from '../../../shared/components/ui/button';
import { useToast } from '../../../shared/hooks/use-toast';

/* ------------------------------------------------------------------ */
/*  Option data                                                        */
/* ------------------------------------------------------------------ */

const SESSION_TIMEOUT_OPTIONS = [
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '60', label: '1 hour' },
  { value: '120', label: '2 hours' },
];

const LANDING_PAGE_OPTIONS = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'prior-auth', label: 'Prior Authorization' },
  { value: 'claims', label: 'Claims' },
  { value: 'eligibility', label: 'Eligibility' },
  { value: 'members', label: 'Members' },
  { value: 'messages', label: 'Messages' },
  { value: 'reports', label: 'Reports' },
];

const DATE_FORMAT_OPTIONS = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SystemSettings() {
  const { addToast } = useToast();

  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [landingPage, setLandingPage] = useState('dashboard');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    addToast('System settings saved.', 'success');
  }, [addToast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card>
        <div className="mb-4 flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-uhc-blue" />
          <h2 className="text-[14px] font-semibold text-text-primary">
            System Settings
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Select
            label="Session Timeout"
            options={SESSION_TIMEOUT_OPTIONS}
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
          />

          <Select
            label="Default Landing Page"
            options={LANDING_PAGE_OPTIONS}
            value={landingPage}
            onChange={(e) => setLandingPage(e.target.value)}
          />

          <Select
            label="Date Format"
            options={DATE_FORMAT_OPTIONS}
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
          />

          <div className="flex flex-col gap-1.5">
            <Input
              label="Timezone"
              value="Eastern Time (ET)"
              readOnly
              icon={<Globe className="h-4 w-4" />}
              className="bg-surface cursor-default"
            />
            <p className="text-[10px] text-text-muted">
              Timezone is managed by your organization administrator.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex justify-end">
          <Button
            icon={<Save className="h-4 w-4" />}
            loading={saving}
            onClick={handleSave}
          >
            Save Settings
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
