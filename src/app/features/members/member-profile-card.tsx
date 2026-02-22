import {
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
  Stethoscope,
} from 'lucide-react';
import type { Member } from '../../../shared/types';
import { cn, formatDate, formatPhone } from '../../../shared/lib/utils';
import { Card } from '../../../shared/components/ui/card';
import { Badge } from '../../../shared/components/ui/badge';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MemberProfileCardProps {
  member: Member;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function coverageVariant(status: Member['coverageStatus']) {
  switch (status) {
    case 'active':
      return 'success' as const;
    case 'inactive':
      return 'warning' as const;
    case 'terminated':
      return 'error' as const;
  }
}

function genderLabel(gender: Member['gender']) {
  switch (gender) {
    case 'M':
      return 'Male';
    case 'F':
      return 'Female';
    case 'O':
      return 'Other';
  }
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function DetailRow({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-0.5', className)}>
      <dt className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
        {label}
      </dt>
      <dd className="text-[13px] text-text-primary">{value}</dd>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 pb-3 border-b border-border">
      <Icon className="h-4 w-4 text-text-muted" />
      <h3 className="text-[14px] font-semibold text-text-primary">{title}</h3>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MemberProfileCard({ member }: MemberProfileCardProps) {
  const fullAddress = `${member.address.street}, ${member.address.city}, ${member.address.state} ${member.address.zip}`;

  return (
    <Card className="space-y-5">
      {/* Header: avatar + name + status */}
      <div className="flex items-start gap-4">
        {/* Initials avatar */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-uhc-blue-50 text-[16px] font-semibold text-uhc-blue">
          {member.firstName[0]}
          {member.lastName[0]}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[16px] font-semibold text-text-primary">
              {member.firstName} {member.lastName}
            </h2>
            <Badge variant={coverageVariant(member.coverageStatus)}>
              {member.coverageStatus.charAt(0).toUpperCase() +
                member.coverageStatus.slice(1)}
            </Badge>
          </div>
          <p className="mt-0.5 text-[13px] text-text-secondary">
            {member.memberId}
          </p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <SectionHeader icon={User} title="Personal Information" />

        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
          <DetailRow label="Date of Birth" value={formatDate(member.dob)} />
          <DetailRow label="Gender" value={genderLabel(member.gender)} />
          <DetailRow label="SSN" value={member.ssn} />
          <DetailRow label="Member ID" value={member.memberId} />
        </dl>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <SectionHeader icon={Phone} title="Contact Information" />

        <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          <DetailRow
            label="Phone"
            value={
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-text-muted" />
                {formatPhone(member.phone)}
              </span>
            }
          />
          <DetailRow
            label="Email"
            value={
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-text-muted" />
                {member.email}
              </span>
            }
          />
          <DetailRow
            label="Address"
            value={
              <span className="flex items-start gap-1.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-muted" />
                {fullAddress}
              </span>
            }
            className="sm:col-span-2 lg:col-span-1"
          />
        </dl>
      </div>

      {/* Plan Information */}
      <div className="space-y-4">
        <SectionHeader icon={Shield} title="Plan Information" />

        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
          <DetailRow label="Plan Name" value={member.planName} />
          <DetailRow label="Plan Type" value={member.planType} />
          <DetailRow label="Group" value={`${member.groupName} (${member.groupNumber})`} />
          <DetailRow label="Subscriber ID" value={member.subscriberId} />
          <DetailRow
            label="Effective Date"
            value={formatDate(member.effectiveDate)}
          />
        </dl>
      </div>

      {/* Primary Care Physician */}
      <div className="space-y-4">
        <SectionHeader icon={Stethoscope} title="Primary Care Physician" />

        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
          <DetailRow label="PCP Name" value={member.pcpName} />
          <DetailRow label="NPI" value={member.pcpNpi} />
        </dl>
      </div>
    </Card>
  );
}
