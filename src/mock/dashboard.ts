import type { ViewId } from '../shared/types';

export interface KPI {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  type: 'urgent' | 'warning' | 'info';
  date: string;
  link: ViewId;
}

export interface ActivityEntry {
  id: string;
  action: string;
  description: string;
  user: string;
  date: string;
  type: string;
}

export interface QuickLink {
  id: string;
  label: string;
  icon: string;
  viewId: ViewId;
}

export interface ClaimsStatusDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface PaVolumeDataPoint {
  month: string;
  submitted: number;
  approved: number;
  denied: number;
}

export const mockKpis: KPI[] = [
  {
    id: 'kpi-1',
    title: 'Total Claims',
    value: '$2.4M',
    change: 8.3,
    icon: 'DollarSign',
  },
  {
    id: 'kpi-2',
    title: 'Pending PAs',
    value: '47',
    change: -12.5,
    icon: 'FileText',
  },
  {
    id: 'kpi-3',
    title: 'Avg Turnaround',
    value: '2.3 days',
    change: -15.2,
    icon: 'Clock',
  },
  {
    id: 'kpi-4',
    title: 'Approval Rate',
    value: '87.6%',
    change: 3.1,
    icon: 'CheckCircle',
  },
  {
    id: 'kpi-5',
    title: 'Active Members',
    value: '12,847',
    change: 2.4,
    icon: 'Users',
  },
  {
    id: 'kpi-6',
    title: 'Open Appeals',
    value: '23',
    change: 18.7,
    icon: 'AlertTriangle',
  },
];

export const mockActionItems: ActionItem[] = [
  {
    id: 'act-1',
    title: 'Claim denial rate spike detected',
    description: 'Denial rate increased 12% over last 7 days. Review denied claims for patterns.',
    type: 'urgent',
    date: '2025-01-20',
    link: 'claims',
  },
  {
    id: 'act-2',
    title: '5 PAs expiring within 48 hours',
    description: 'Prior authorizations for imaging services are nearing expiration. Submit extensions or schedule services.',
    type: 'urgent',
    date: '2025-01-20',
    link: 'prior-auth',
  },
  {
    id: 'act-3',
    title: 'Additional info requested on PA-2025-0892',
    description: 'UHC is requesting updated clinical notes for knee replacement authorization.',
    type: 'warning',
    date: '2025-01-19',
    link: 'prior-auth',
  },
  {
    id: 'act-4',
    title: '3 unread messages from UHC Provider Relations',
    description: 'New policy updates regarding Q1 2025 formulary changes and PA requirement modifications.',
    type: 'info',
    date: '2025-01-19',
    link: 'messages',
  },
  {
    id: 'act-5',
    title: 'Referral REF-2025-0341 pending review',
    description: 'Cardiology referral for member Janet Torres awaiting approval for over 3 business days.',
    type: 'warning',
    date: '2025-01-18',
    link: 'referrals',
  },
  {
    id: 'act-6',
    title: 'Monthly claims summary report available',
    description: 'December 2024 claims summary report has been generated and is ready for download.',
    type: 'info',
    date: '2025-01-17',
    link: 'reports',
  },
  {
    id: 'act-7',
    title: 'Eligibility verification failed for 2 members',
    description: 'Members with IDs ending in 4521 and 7803 returned inactive coverage status. Verify with plan.',
    type: 'warning',
    date: '2025-01-17',
    link: 'eligibility',
  },
  {
    id: 'act-8',
    title: 'Staff credential renewal reminder',
    description: 'Dr. Patel and NP Richardson have credentialing renewals due within 30 days.',
    type: 'info',
    date: '2025-01-16',
    link: 'settings',
  },
];

export const mockActivityFeed: ActivityEntry[] = [
  {
    id: 'feed-1',
    action: 'Claim Submitted',
    description: 'Claim CLM-2025-01847 submitted for member Robert Chen — $4,250.00',
    user: 'Sarah Mitchell',
    date: '2025-01-20T14:32:00',
    type: 'claim',
  },
  {
    id: 'feed-2',
    action: 'PA Approved',
    description: 'Prior auth PA-2025-0871 approved for Brain MRI — member Diana Kowalski',
    user: 'System',
    date: '2025-01-20T13:15:00',
    type: 'prior-auth',
  },
  {
    id: 'feed-3',
    action: 'Eligibility Checked',
    description: 'Eligibility verified for member James Whitfield — Active, PPO Choice Plus',
    user: 'Maria Gonzalez',
    date: '2025-01-20T11:48:00',
    type: 'eligibility',
  },
  {
    id: 'feed-4',
    action: 'Message Sent',
    description: 'Reply sent to UHC regarding claim adjustment on CLM-2024-09832',
    user: 'Sarah Mitchell',
    date: '2025-01-20T10:22:00',
    type: 'message',
  },
  {
    id: 'feed-5',
    action: 'PA Submitted',
    description: 'New prior auth submitted for Total Knee Replacement — member Harold Bennett',
    user: 'Dr. Rajesh Patel',
    date: '2025-01-20T09:05:00',
    type: 'prior-auth',
  },
  {
    id: 'feed-6',
    action: 'Claim Paid',
    description: 'Payment received for CLM-2024-11293 — $1,875.40 deposited via EFT',
    user: 'System',
    date: '2025-01-19T16:45:00',
    type: 'claim',
  },
  {
    id: 'feed-7',
    action: 'Referral Created',
    description: 'Referral REF-2025-0355 created for Neurology consult — member Patricia Okafor',
    user: 'Dr. Amanda Liu',
    date: '2025-01-19T14:30:00',
    type: 'referral',
  },
  {
    id: 'feed-8',
    action: 'PA Denied',
    description: 'Prior auth PA-2025-0865 denied for DME wheelchair — member Thomas Gray. Reason: insufficient documentation.',
    user: 'System',
    date: '2025-01-19T11:20:00',
    type: 'prior-auth',
  },
  {
    id: 'feed-9',
    action: 'Report Generated',
    description: 'Q4 2024 denial trends report generated and available for download',
    user: 'System',
    date: '2025-01-18T08:00:00',
    type: 'report',
  },
  {
    id: 'feed-10',
    action: 'Staff Login',
    description: 'New staff member Kevin Park completed first login and portal orientation',
    user: 'Kevin Park',
    date: '2025-01-17T09:15:00',
    type: 'settings',
  },
];

export const mockQuickLinks: QuickLink[] = [
  {
    id: 'ql-1',
    label: 'Submit Prior Auth',
    icon: 'FilePlus',
    viewId: 'prior-auth',
  },
  {
    id: 'ql-2',
    label: 'Check Eligibility',
    icon: 'Search',
    viewId: 'eligibility',
  },
  {
    id: 'ql-3',
    label: 'View Claims',
    icon: 'FileText',
    viewId: 'claims',
  },
  {
    id: 'ql-4',
    label: 'Member Lookup',
    icon: 'Users',
    viewId: 'members',
  },
  {
    id: 'ql-5',
    label: 'Messages',
    icon: 'Mail',
    viewId: 'messages',
  },
  {
    id: 'ql-6',
    label: 'Run Reports',
    icon: 'BarChart3',
    viewId: 'reports',
  },
];

export const mockClaimsStatusData: ClaimsStatusDataPoint[] = [
  { name: 'Paid', value: 456, color: '#2E8540' },
  { name: 'In Process', value: 123, color: '#0066F5' },
  { name: 'Denied', value: 34, color: '#D4183D' },
  { name: 'Pending', value: 67, color: '#FF612B' },
  { name: 'Appealed', value: 12, color: '#7C3AED' },
];

export const mockPaVolumeData: PaVolumeDataPoint[] = [
  { month: 'Sep', submitted: 45, approved: 38, denied: 7 },
  { month: 'Oct', submitted: 52, approved: 43, denied: 9 },
  { month: 'Nov', submitted: 39, approved: 34, denied: 5 },
  { month: 'Dec', submitted: 61, approved: 50, denied: 11 },
  { month: 'Jan', submitted: 48, approved: 41, denied: 7 },
  { month: 'Feb', submitted: 55, approved: 47, denied: 8 },
];
