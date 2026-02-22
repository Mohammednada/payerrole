import { useState } from 'react';
import { ArrowLeft, ArrowRight, Send, X } from 'lucide-react';
import type { PaWizardData, PaType, PaUrgency, PaEligibilityCheck, PaTypeDetails, DocumentChecklistItem } from '../../../../shared/types';
import { Stepper, type StepDefinition } from '../../../../shared/components/ui/stepper';
import { Button } from '../../../../shared/components/ui/button';
import { Card } from '../../../../shared/components/ui/card';
import { StepMember } from './step-member';
import { StepService } from './step-service';
import { StepEligibility } from './step-eligibility';
import { StepTypeDetails } from './step-type-details';
import { StepProvider } from './step-provider';
import { StepDocuments } from './step-documents';
import { StepReview } from './step-review';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PaWizardProps {
  onClose: () => void;
  onSubmit: (data: PaWizardData) => void;
}

/* ------------------------------------------------------------------ */
/*  Steps definition                                                   */
/* ------------------------------------------------------------------ */

const STEPS: StepDefinition[] = [
  { label: 'Member Info' },
  { label: 'Service Info' },
  { label: 'Eligibility' },
  { label: 'Type Details' },
  { label: 'Provider Info' },
  { label: 'Documents' },
  { label: 'Review & Submit' },
];

/* ------------------------------------------------------------------ */
/*  Initial form state                                                 */
/* ------------------------------------------------------------------ */

function emptyWizardData(): PaWizardData {
  return {
    memberInfo: {
      memberId: '',
      memberName: '',
      dob: '',
      subscriberId: '',
    },
    serviceInfo: {
      type: '' as PaType,
      urgency: '' as PaUrgency,
      serviceCode: '',
      serviceDescription: '',
      diagnosisCode: '',
      diagnosisDescription: '',
      startDate: '',
      endDate: '',
      quantity: 1,
    },
    eligibilityCheck: undefined,
    typeDetails: undefined,
    providerInfo: {
      providerName: '',
      providerNpi: '',
      facilityName: '',
      facilityAddress: '',
    },
    documentChecklist: [],
    documents: [],
    notes: '',
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PaWizard({ onClose, onSubmit }: PaWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PaWizardData>(emptyWizardData);

  /* ---- Step navigation ---- */

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === STEPS.length - 1;

  const goNext = () => {
    if (!isLastStep) setCurrentStep((s) => s + 1);
  };

  const goBack = () => {
    if (!isFirstStep) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  /* ---- Updaters ---- */

  const updateMember = (memberInfo: PaWizardData['memberInfo']) => {
    setFormData((prev) => ({ ...prev, memberInfo }));
  };

  const updateService = (serviceInfo: PaWizardData['serviceInfo']) => {
    setFormData((prev) => ({ ...prev, serviceInfo }));
  };

  const updateEligibility = (eligibilityCheck: PaEligibilityCheck) => {
    setFormData((prev) => ({ ...prev, eligibilityCheck }));
  };

  const updateTypeDetails = (typeDetails: PaTypeDetails) => {
    setFormData((prev) => ({ ...prev, typeDetails }));
  };

  const updateProvider = (providerInfo: PaWizardData['providerInfo']) => {
    setFormData((prev) => ({ ...prev, providerInfo }));
  };

  const updateDocumentChecklist = (documentChecklist: DocumentChecklistItem[]) => {
    setFormData((prev) => ({ ...prev, documentChecklist }));
  };

  const updateNotes = (notes: string) => {
    setFormData((prev) => ({ ...prev, notes }));
  };

  /* ---- Render ---- */

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[16px] font-semibold text-text-primary">
            New PA Request
          </h1>
          <p className="mt-1 text-[13px] text-text-secondary">
            Complete all steps to submit a prior authorization request.
          </p>
        </div>
        <Button variant="ghost" size="sm" icon={<X className="h-4 w-4" />} onClick={onClose}>
          Cancel
        </Button>
      </div>

      {/* Stepper */}
      <Card>
        <Stepper steps={STEPS} currentStep={currentStep} />
      </Card>

      {/* Step content */}
      <Card>
        {currentStep === 0 && (
          <StepMember data={formData.memberInfo} onChange={updateMember} />
        )}
        {currentStep === 1 && (
          <StepService data={formData.serviceInfo} onChange={updateService} />
        )}
        {currentStep === 2 && (
          <StepEligibility
            paType={formData.serviceInfo.type}
            memberId={formData.memberInfo.memberId}
            memberName={formData.memberInfo.memberName}
            data={formData.eligibilityCheck}
            onChange={updateEligibility}
          />
        )}
        {currentStep === 3 && (
          <StepTypeDetails
            paType={formData.serviceInfo.type}
            data={formData.typeDetails}
            onChange={updateTypeDetails}
          />
        )}
        {currentStep === 4 && (
          <StepProvider data={formData.providerInfo} onChange={updateProvider} />
        )}
        {currentStep === 5 && (
          <StepDocuments
            paType={formData.serviceInfo.type}
            data={formData.documentChecklist}
            onChange={updateDocumentChecklist}
          />
        )}
        {currentStep === 6 && (
          <StepReview data={formData} onNotesChange={updateNotes} />
        )}
      </Card>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={isFirstStep ? onClose : goBack}
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          {isFirstStep ? 'Cancel' : 'Back'}
        </Button>

        {isLastStep ? (
          <Button
            variant="primary"
            onClick={handleSubmit}
            icon={<Send className="h-4 w-4" />}
          >
            Submit Request
          </Button>
        ) : (
          <Button variant="primary" onClick={goNext}>
            Next
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
