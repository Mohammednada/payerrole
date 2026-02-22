import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Bell, Save } from 'lucide-react';
import { cn } from '../../../shared/lib/utils';
import { Card } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { useToast } from '../../../shared/hooks/use-toast';
import { mockNotificationPrefs } from '../../../mock/settings';
import type { NotificationPref } from '../../../mock/settings';

/* ------------------------------------------------------------------ */
/*  Toggle Switch                                                      */
/* ------------------------------------------------------------------ */

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uhc-blue',
        checked ? 'bg-uhc-blue' : 'bg-border-dark',
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200',
          checked ? 'translate-x-[18px]' : 'translate-x-[3px]',
        )}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function NotificationPreferences() {
  const { addToast } = useToast();
  const [prefs, setPrefs] = useState<NotificationPref[]>(
    () => mockNotificationPrefs.map((p) => ({ ...p })),
  );
  const [saving, setSaving] = useState(false);

  const handleToggle = useCallback(
    (id: string, channel: 'email' | 'portal', value: boolean) => {
      setPrefs((prev) =>
        prev.map((p) => (p.id === id ? { ...p, [channel]: value } : p)),
      );
    },
    [],
  );

  const handleSave = useCallback(async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    addToast('Notification preferences saved.', 'success');
  }, [addToast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card>
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-uhc-blue" />
          <h2 className="text-[14px] font-semibold text-text-primary">
            Notification Preferences
          </h2>
        </div>

        {/* Column headers */}
        <div className="mb-3 grid grid-cols-[1fr_80px_80px] items-center gap-4 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          <span>Notification Type</span>
          <span className="text-center">Email</span>
          <span className="text-center">Portal</span>
        </div>

        {/* Preference rows */}
        <div className="divide-y divide-border">
          {prefs.map((pref, i) => (
            <motion.div
              key={pref.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="grid grid-cols-[1fr_80px_80px] items-center gap-4 py-3.5"
            >
              <span className="text-[13px] text-text-primary">{pref.label}</span>
              <div className="flex justify-center">
                <ToggleSwitch
                  checked={pref.email}
                  onChange={(v) => handleToggle(pref.id, 'email', v)}
                  label={`${pref.label} email`}
                />
              </div>
              <div className="flex justify-center">
                <ToggleSwitch
                  checked={pref.portal}
                  onChange={(v) => handleToggle(pref.id, 'portal', v)}
                  label={`${pref.label} portal`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-5 flex justify-end">
          <Button
            icon={<Save className="h-4 w-4" />}
            loading={saving}
            onClick={handleSave}
          >
            Save Preferences
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
