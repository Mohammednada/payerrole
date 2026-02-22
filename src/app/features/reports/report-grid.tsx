import { motion } from 'motion/react';
import { ReportCard } from './report-card';
import type { Report } from '../../../shared/types';

interface ReportGridProps {
  reports: Report[];
  onSelect: (report: Report) => void;
}

export function ReportGrid({ reports, onSelect }: ReportGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {reports.map((report, index) => (
        <motion.div
          key={report.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.25,
            delay: index * 0.05,
            ease: 'easeOut',
          }}
        >
          <ReportCard report={report} onClick={() => onSelect(report)} />
        </motion.div>
      ))}
    </div>
  );
}
