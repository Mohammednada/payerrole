export interface Member {
  id: string;
  memberId: string;
  firstName: string;
  lastName: string;
  dob: string;
  ssn: string;
  gender: 'M' | 'F' | 'O';
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  subscriberId: string;
  groupNumber: string;
  groupName: string;
  planName: string;
  planType: string;
  coverageStatus: 'active' | 'inactive' | 'terminated';
  effectiveDate: string;
  pcpName: string;
  pcpNpi: string;
  coverageHistory: CoverageHistoryItem[];
  recentClaims: MemberClaim[];
  recentPAs: MemberPA[];
}

export interface CoverageHistoryItem {
  planName: string;
  planType: string;
  effectiveDate: string;
  terminationDate: string;
  status: string;
}

export interface MemberClaim {
  claimNumber: string;
  serviceDate: string;
  provider: string;
  amount: number;
  status: string;
}

export interface MemberPA {
  authNumber: string;
  requestDate: string;
  service: string;
  status: string;
}
