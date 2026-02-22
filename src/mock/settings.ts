/* ------------------------------------------------------------------ */
/*  Settings mock data                                                 */
/* ------------------------------------------------------------------ */

export interface PracticeInfo {
  name: string;
  tin: string;
  npi: string;
  phone: string;
  fax: string;
  email: string;
  address: string;
  specialty: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Provider' | 'Billing' | 'Front Desk' | 'Nurse';
  lastLogin: string;
  status: 'active' | 'inactive';
}

export interface NotificationPref {
  id: string;
  label: string;
  email: boolean;
  portal: boolean;
}

/* ------------------------------------------------------------------ */
/*  Practice Info                                                       */
/* ------------------------------------------------------------------ */

export const mockPracticeInfo: PracticeInfo = {
  name: 'Northstar Family Medicine',
  tin: '123456789',
  npi: '1234567890',
  phone: '(555) 234-5678',
  fax: '(555) 234-5679',
  email: 'admin@northstarfm.com',
  address: '4200 Meridian Health Blvd, Suite 300, Minneapolis, MN 55401',
  specialty: 'Family Medicine',
};

/* ------------------------------------------------------------------ */
/*  Staff Members                                                      */
/* ------------------------------------------------------------------ */

export const mockStaffMembers: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@northstarfm.com',
    role: 'Admin',
    lastLogin: '2025-01-20T14:32:00',
    status: 'active',
  },
  {
    id: 'staff-2',
    name: 'Dr. Rajesh Patel',
    email: 'rajesh.patel@northstarfm.com',
    role: 'Provider',
    lastLogin: '2025-01-20T09:15:00',
    status: 'active',
  },
  {
    id: 'staff-3',
    name: 'Maria Gonzalez',
    email: 'maria.gonzalez@northstarfm.com',
    role: 'Billing',
    lastLogin: '2025-01-20T11:48:00',
    status: 'active',
  },
  {
    id: 'staff-4',
    name: 'Dr. Amanda Liu',
    email: 'amanda.liu@northstarfm.com',
    role: 'Provider',
    lastLogin: '2025-01-19T16:30:00',
    status: 'active',
  },
  {
    id: 'staff-5',
    name: 'Kevin Park',
    email: 'kevin.park@northstarfm.com',
    role: 'Front Desk',
    lastLogin: '2025-01-17T09:15:00',
    status: 'active',
  },
  {
    id: 'staff-6',
    name: 'NP Richardson',
    email: 'np.richardson@northstarfm.com',
    role: 'Nurse',
    lastLogin: '2025-01-18T13:22:00',
    status: 'active',
  },
  {
    id: 'staff-7',
    name: 'David Thompson',
    email: 'david.thompson@northstarfm.com',
    role: 'Billing',
    lastLogin: '2024-12-15T10:00:00',
    status: 'inactive',
  },
  {
    id: 'staff-8',
    name: 'Jennifer Wu',
    email: 'jennifer.wu@northstarfm.com',
    role: 'Front Desk',
    lastLogin: '2025-01-20T08:45:00',
    status: 'active',
  },
];

/* ------------------------------------------------------------------ */
/*  Notification Preferences                                           */
/* ------------------------------------------------------------------ */

export const mockNotificationPrefs: NotificationPref[] = [
  {
    id: 'notif-1',
    label: 'Prior Authorization Status Updates',
    email: true,
    portal: true,
  },
  {
    id: 'notif-2',
    label: 'Claim Denials & Adjustments',
    email: true,
    portal: true,
  },
  {
    id: 'notif-3',
    label: 'Eligibility Verification Alerts',
    email: false,
    portal: true,
  },
  {
    id: 'notif-4',
    label: 'New Messages from Payer',
    email: true,
    portal: true,
  },
  {
    id: 'notif-5',
    label: 'Referral Status Changes',
    email: false,
    portal: true,
  },
  {
    id: 'notif-6',
    label: 'Report Generation Complete',
    email: true,
    portal: false,
  },
  {
    id: 'notif-7',
    label: 'Staff Account Activity',
    email: false,
    portal: false,
  },
  {
    id: 'notif-8',
    label: 'System Maintenance Notices',
    email: true,
    portal: true,
  },
];
