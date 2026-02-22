import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, ChevronRight } from 'lucide-react';
import { useAuth } from '../../../context/auth-context';
import { mockTinNpiList } from '../../../mock/auth';
import type { TinNpi } from '../../../shared/types';

export function TinNpiSelect() {
  const { selectTin } = useAuth();
  const [selected, setSelected] = useState<TinNpi | null>(null);

  const handleContinue = () => {
    if (selected) selectTin(selected);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6 text-center">
        <div className="mb-1 text-[20px] font-bold text-uhc-blue">
          Select Practice
        </div>
        <p className="text-[13px] text-text-secondary">
          Choose the TIN/NPI combination for this session
        </p>
      </div>

      <div className="space-y-3">
        {mockTinNpiList.map((item, i) => (
          <motion.button
            key={item.tin}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.08 }}
            onClick={() => setSelected(item)}
            className={`w-full rounded-2xl border-2 px-4 py-3 text-left transition-all ${
              selected?.tin === item.tin
                ? 'border-uhc-blue bg-uhc-blue-50'
                : 'border-border hover:border-uhc-blue-100 hover:bg-surface'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 rounded-lg p-2 ${
                  selected?.tin === item.tin
                    ? 'bg-uhc-blue text-white'
                    : 'bg-surface text-text-secondary'
                }`}
              >
                <Building2 size={18} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-text-primary">
                  {item.practiceName}
                </div>
                <div className="mt-1 text-xs text-text-secondary">
                  TIN: {item.tin} &middot; NPI: {item.npi}
                </div>
                <div className="mt-0.5 text-xs text-text-muted">
                  {item.address}
                </div>
              </div>
              {selected?.tin === item.tin && (
                <div className="mt-1 h-5 w-5 rounded-full bg-uhc-blue text-center text-xs leading-5 text-white">
                  &#10003;
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selected}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-uhc-blue px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-uhc-blue-mid disabled:opacity-40"
      >
        Continue
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
