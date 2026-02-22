import { motion } from 'motion/react';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '../../../shared/components/ui/button';
import { Card } from '../../../shared/components/ui/card';
import { PaTurnaroundChart } from './report-charts/pa-turnaround-chart';
import { ClaimsSummaryChart } from './report-charts/claims-summary-chart';
import { DenialTrendsChart } from './report-charts/denial-trends-chart';
import { ApprovalRateChart } from './report-charts/approval-rate-chart';
import type { Report } from '../../../shared/types';

interface ReportViewerProps {
  report: Report;
  onBack: () => void;
}

function ReportChartContent({ type }: { type: Report['type'] }) {
  switch (type) {
    case 'pa-turnaround':
      return <PaTurnaroundChart />;
    case 'claims-summary':
      return <ClaimsSummaryChart />;
    case 'denial-trends':
      return <DenialTrendsChart />;
    case 'approval-rate':
      return <ApprovalRateChart />;
    default:
      return (
        <Card className="flex h-[350px] items-center justify-center">
          <p className="text-[13px] text-text-secondary">
            Chart visualization for this report type is coming soon.
          </p>
        </Card>
      );
  }
}

export function ReportViewer({ report, onBack }: ReportViewerProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="h-4 w-4" />}
            onClick={onBack}
            aria-label="Back to reports"
          >
            Back
          </Button>
          <div>
            <h2 className="text-[16px] font-semibold text-text-primary">
              {report.title}
            </h2>
            <p className="mt-1 text-[13px] text-text-secondary">
              {report.description}
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={<Download className="h-4 w-4" />}
        >
          Export
        </Button>
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
      >
        <ReportChartContent type={report.type} />
      </motion.div>
    </div>
  );
}
