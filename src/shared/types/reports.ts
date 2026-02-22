export type ReportType = 'pa-turnaround' | 'claims-summary' | 'denial-trends' | 'approval-rate' | 'financial-summary' | 'provider-performance' | 'member-utilization' | 'compliance';

export interface Report {
  id: string;
  title: string;
  description: string;
  type: ReportType;
  icon: string;
  lastGenerated: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}
