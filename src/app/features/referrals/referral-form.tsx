import { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '../../../shared/lib/utils';
import { Card } from '../../../shared/components/ui/card';
import { Input } from '../../../shared/components/ui/input';
import { Select } from '../../../shared/components/ui/select';
import { Button } from '../../../shared/components/ui/button';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ReferralFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

/* ------------------------------------------------------------------ */
/*  Select options                                                     */
/* ------------------------------------------------------------------ */

const SPECIALTY_OPTIONS = [
  { value: 'Cardiology', label: 'Cardiology' },
  { value: 'Orthopedics', label: 'Orthopedics' },
  { value: 'Neurology', label: 'Neurology' },
  { value: 'Dermatology', label: 'Dermatology' },
  { value: 'Gastroenterology', label: 'Gastroenterology' },
  { value: 'Oncology', label: 'Oncology' },
  { value: 'Pulmonology', label: 'Pulmonology' },
  { value: 'Endocrinology', label: 'Endocrinology' },
];

const URGENCY_OPTIONS = [
  { value: 'routine', label: 'Routine' },
  { value: 'urgent', label: 'Urgent' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ReferralForm({ onSubmit, onCancel }: ReferralFormProps) {
  const [memberId, setMemberId] = useState('');
  const [memberName, setMemberName] = useState('');
  const [referringProvider, setReferringProvider] = useState('');
  const [referringNpi, setReferringNpi] = useState('');
  const [referredToProvider, setReferredToProvider] = useState('');
  const [referredToNpi, setReferredToNpi] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [urgency, setUrgency] = useState('');
  const [diagnosisCode, setDiagnosisCode] = useState('');
  const [diagnosisDescription, setDiagnosisDescription] = useState('');
  const [authorizedVisits, setAuthorizedVisits] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate and POST to an API.
    onSubmit();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[16px] font-semibold text-text-primary">
          New Referral
        </h1>
        <p className="mt-1 text-[13px] text-text-secondary">
          Submit a new referral request for a member.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ---- Member Information ---- */}
          <fieldset>
            <legend className="mb-3 text-[14px] font-semibold text-text-primary">
              Member Information
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Member ID"
                placeholder="e.g. UHC882014521"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                required
              />
              <Input
                label="Member Name"
                placeholder="e.g. Diana Kowalski"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                required
              />
            </div>
          </fieldset>

          {/* ---- Referring Provider ---- */}
          <fieldset>
            <legend className="mb-3 text-[14px] font-semibold text-text-primary">
              Referring Provider
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Referring Provider"
                placeholder="e.g. Dr. Rajesh Patel"
                value={referringProvider}
                onChange={(e) => setReferringProvider(e.target.value)}
                required
              />
              <Input
                label="Referring NPI"
                placeholder="e.g. 1234567890"
                value={referringNpi}
                onChange={(e) => setReferringNpi(e.target.value)}
                required
              />
            </div>
          </fieldset>

          {/* ---- Referred-To Provider ---- */}
          <fieldset>
            <legend className="mb-3 text-[14px] font-semibold text-text-primary">
              Referred-To Provider
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Referred-To Provider"
                placeholder="e.g. Dr. Catherine Nguyen"
                value={referredToProvider}
                onChange={(e) => setReferredToProvider(e.target.value)}
                required
              />
              <Input
                label="Referred-To NPI"
                placeholder="e.g. 9876543210"
                value={referredToNpi}
                onChange={(e) => setReferredToNpi(e.target.value)}
                required
              />
            </div>
          </fieldset>

          {/* ---- Specialty & Urgency ---- */}
          <fieldset>
            <legend className="mb-3 text-[14px] font-semibold text-text-primary">
              Referral Details
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select
                label="Specialty"
                options={SPECIALTY_OPTIONS}
                placeholder="Select specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                required
              />
              <Select
                label="Urgency"
                options={URGENCY_OPTIONS}
                placeholder="Select urgency"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                required
              />
            </div>
          </fieldset>

          {/* ---- Diagnosis ---- */}
          <fieldset>
            <legend className="mb-3 text-[14px] font-semibold text-text-primary">
              Diagnosis
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Diagnosis Code"
                placeholder="e.g. I25.10"
                value={diagnosisCode}
                onChange={(e) => setDiagnosisCode(e.target.value)}
                required
              />
              <Input
                label="Diagnosis Description"
                placeholder="e.g. Atherosclerotic heart disease"
                value={diagnosisDescription}
                onChange={(e) => setDiagnosisDescription(e.target.value)}
                required
              />
            </div>
          </fieldset>

          {/* ---- Visits & Notes ---- */}
          <fieldset>
            <legend className="mb-3 text-[14px] font-semibold text-text-primary">
              Additional Information
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Authorized Visits"
                type="number"
                min={1}
                max={99}
                placeholder="e.g. 6"
                value={authorizedVisits}
                onChange={(e) => setAuthorizedVisits(e.target.value)}
                required
              />
              {/* Spacer for alignment */}
              <div className="hidden sm:block" />
            </div>

            <div className="mt-4">
              <label
                htmlFor="referral-notes"
                className="mb-1.5 block text-[13px] font-medium text-text-primary"
              >
                Notes
              </label>
              <textarea
                id="referral-notes"
                rows={4}
                placeholder="Add any additional notes or clinical context..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={cn(
                  'w-full rounded-2xl border border-border bg-card px-3 py-2 text-[13px] text-text-primary placeholder:text-text-muted transition-colors duration-150',
                  'focus:outline-none focus:ring-2 focus:ring-uhc-blue/30 focus:border-uhc-blue',
                  'resize-none',
                )}
              />
            </div>
          </fieldset>

          {/* ---- Actions ---- */}
          <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={<Send className="h-4 w-4" />}
            >
              Submit Referral
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
