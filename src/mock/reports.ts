import type { Report, ChartDataPoint } from '../shared/types';

export const mockReports: Report[] = [
  {
    id: 'rpt-1',
    title: 'PA Turnaround Time',
    description:
      'Average and target turnaround times for prior authorization requests across all payers.',
    type: 'pa-turnaround',
    icon: 'Clock',
    lastGenerated: '2025-01-20T08:00:00',
    frequency: 'daily',
  },
  {
    id: 'rpt-2',
    title: 'Claims Summary',
    description:
      'Monthly breakdown of paid, denied, and pending claims by volume and dollar amount.',
    type: 'claims-summary',
    icon: 'DollarSign',
    lastGenerated: '2025-01-19T06:00:00',
    frequency: 'weekly',
  },
  {
    id: 'rpt-3',
    title: 'Denial Trends',
    description:
      'Tracking denial volumes and rates over time to identify patterns and root causes.',
    type: 'denial-trends',
    icon: 'TrendingDown',
    lastGenerated: '2025-01-18T06:00:00',
    frequency: 'weekly',
  },
  {
    id: 'rpt-4',
    title: 'Approval Rate Trend',
    description:
      'Prior authorization approval rate trend compared against the 85% organizational target.',
    type: 'approval-rate',
    icon: 'CheckCircle',
    lastGenerated: '2025-01-20T08:00:00',
    frequency: 'daily',
  },
  {
    id: 'rpt-5',
    title: 'Financial Summary',
    description:
      'Revenue, reimbursement, and write-off totals by payer and service category.',
    type: 'financial-summary',
    icon: 'PieChart',
    lastGenerated: '2025-01-15T06:00:00',
    frequency: 'monthly',
  },
  {
    id: 'rpt-6',
    title: 'Provider Performance',
    description:
      'Key performance metrics per provider including submission accuracy and turnaround.',
    type: 'provider-performance',
    icon: 'BarChart3',
    lastGenerated: '2025-01-01T06:00:00',
    frequency: 'quarterly',
  },
  {
    id: 'rpt-7',
    title: 'Member Utilization',
    description:
      'Service utilization patterns across the member population by category and payer.',
    type: 'member-utilization',
    icon: 'Users',
    lastGenerated: '2025-01-15T06:00:00',
    frequency: 'monthly',
  },
  {
    id: 'rpt-8',
    title: 'Compliance & Audit',
    description:
      'Compliance scorecard tracking timely filing, documentation completeness, and audit readiness.',
    type: 'compliance',
    icon: 'Shield',
    lastGenerated: '2025-01-01T06:00:00',
    frequency: 'quarterly',
  },
];

export const mockPaTurnaroundData: ChartDataPoint[] = [
  { name: 'Jul', value: 4.2, average: 4.2, target: 3.0 },
  { name: 'Aug', value: 3.8, average: 3.8, target: 3.0 },
  { name: 'Sep', value: 3.5, average: 3.5, target: 3.0 },
  { name: 'Oct', value: 3.9, average: 3.9, target: 3.0 },
  { name: 'Nov', value: 3.1, average: 3.1, target: 3.0 },
  { name: 'Dec', value: 2.7, average: 2.7, target: 3.0 },
  { name: 'Jan', value: 2.3, average: 2.3, target: 3.0 },
];

export const mockClaimsSummaryData: ChartDataPoint[] = [
  { name: 'Jul', value: 510, paid: 380, denied: 72, pending: 58 },
  { name: 'Aug', value: 540, paid: 405, denied: 68, pending: 67 },
  { name: 'Sep', value: 495, paid: 370, denied: 60, pending: 65 },
  { name: 'Oct', value: 580, paid: 440, denied: 75, pending: 65 },
  { name: 'Nov', value: 520, paid: 400, denied: 55, pending: 65 },
  { name: 'Dec', value: 610, paid: 456, denied: 82, pending: 72 },
  { name: 'Jan', value: 570, paid: 430, denied: 70, pending: 70 },
];

export const mockDenialTrendsData: ChartDataPoint[] = [
  { name: 'Jul', value: 72 },
  { name: 'Aug', value: 68 },
  { name: 'Sep', value: 60 },
  { name: 'Oct', value: 75 },
  { name: 'Nov', value: 55 },
  { name: 'Dec', value: 82 },
  { name: 'Jan', value: 70 },
];

export const mockApprovalRateData: ChartDataPoint[] = [
  { name: 'Jul', value: 82.5 },
  { name: 'Aug', value: 84.1 },
  { name: 'Sep', value: 86.3 },
  { name: 'Oct', value: 83.7 },
  { name: 'Nov', value: 87.2 },
  { name: 'Dec', value: 85.9 },
  { name: 'Jan', value: 87.6 },
];
