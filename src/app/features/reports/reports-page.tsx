import { useState } from 'react';
import { motion } from 'motion/react';
import { DateRangePicker } from '../../../shared/components/ui/date-range-picker';
import { ReportGrid } from './report-grid';
import { ReportViewer } from './report-viewer';
import { mockReports } from '../../../mock/reports';
import type { Report } from '../../../shared/types';

type SubView = 'grid' | 'viewer';

export function ReportsPage() {
  const [subView, setSubView] = useState<SubView>('grid');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [startDate, setStartDate] = useState('2024-07-01');
  const [endDate, setEndDate] = useState('2025-01-31');

  function handleSelect(report: Report) {
    setSelectedReport(report);
    setSubView('viewer');
  }

  function handleBack() {
    setSubView('grid');
    setSelectedReport(null);
  }

  if (subView === 'viewer' && selectedReport) {
    return <ReportViewer report={selectedReport} onBack={handleBack} />;
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h1 className="text-[16px] font-semibold text-text-primary">
            Reports & Analytics
          </h1>
          <p className="mt-1 text-[13px] text-text-secondary">
            Generate and view operational reports across all categories
          </p>
        </div>

        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
        />
      </motion.div>

      {/* Report grid */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
      >
        <ReportGrid reports={mockReports} onSelect={handleSelect} />
      </motion.div>
    </div>
  );
}
