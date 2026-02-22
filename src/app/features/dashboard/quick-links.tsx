import { motion } from 'motion/react';
import {
  FilePlus,
  Search,
  FileText,
  Users,
  Mail,
  BarChart3,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useApp } from '../../../context/app-context';
import { mockQuickLinks } from '../../../mock/dashboard';

const ICON_MAP: Record<string, LucideIcon> = {
  FilePlus,
  Search,
  FileText,
  Users,
  Mail,
  BarChart3,
};

export function QuickLinks() {
  const { navigate } = useApp();

  return (
    <div>
      <h2 className="mb-3 text-[14px] font-semibold text-text-primary">
        Quick Links
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {mockQuickLinks.map((link, i) => {
          const Icon = ICON_MAP[link.icon] ?? FileText;

          return (
            <motion.button
              key={link.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              onClick={() => navigate(link.viewId)}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-5 text-center transition-colors hover:bg-[#f0f2f4]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-uhc-blue-50">
                <Icon className="h-5 w-5 text-uhc-blue" />
              </div>
              <span className="text-[13px] font-medium text-text-primary">
                {link.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
