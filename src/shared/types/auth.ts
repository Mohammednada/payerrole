export type AuthStep = 'login' | 'tin-select' | 'mfa';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'staff' | 'billing';
  avatar?: string;
}

export interface TinNpi {
  tin: string;
  npi: string;
  practiceName: string;
  address: string;
}
