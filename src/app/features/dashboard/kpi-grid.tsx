import { motion } from 'motion/react';
import {
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { KpiCard } from '../../../shared/components/ui/kpi-card';
import { mockKpis } from '../../../mock/dashboard';

const ICON_MAP: Record<string, LucideIcon> = {
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
};

export function KpiGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mockKpis.map((kpi, i) => {
        const Icon = ICON_MAP[kpi.icon] ?? FileText;
        return (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
          >
            <KpiCard
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              icon={Icon}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
