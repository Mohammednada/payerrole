import type { PaType, PaTypeDetails } from '../../../../shared/types';
import { InpatientForm } from './type-forms/inpatient-form';
import { OutpatientForm } from './type-forms/outpatient-form';
import { PharmacyForm } from './type-forms/pharmacy-form';
import { ImagingForm } from './type-forms/imaging-form';
import { DmeForm } from './type-forms/dme-form';
import { HomeHealthForm } from './type-forms/home-health-form';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StepTypeDetailsProps {
  paType: PaType;
  data?: PaTypeDetails;
  onChange: (details: PaTypeDetails) => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StepTypeDetails({ paType, data, onChange }: StepTypeDetailsProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[14px] font-semibold text-text-primary">
          Type-Specific Details
        </h2>
        <p className="mt-1 text-[13px] text-text-secondary">
          Provide additional details required for{' '}
          <span className="font-medium capitalize">{paType}</span> authorization requests.
        </p>
      </div>

      {paType === 'inpatient' && (
        <InpatientForm
          data={data?.type === 'inpatient' ? data : undefined}
          onChange={onChange}
        />
      )}
      {paType === 'outpatient' && (
        <OutpatientForm
          data={data?.type === 'outpatient' ? data : undefined}
          onChange={onChange}
        />
      )}
      {paType === 'pharmacy' && (
        <PharmacyForm
          data={data?.type === 'pharmacy' ? data : undefined}
          onChange={onChange}
        />
      )}
      {paType === 'imaging' && (
        <ImagingForm
          data={data?.type === 'imaging' ? data : undefined}
          onChange={onChange}
        />
      )}
      {paType === 'DME' && (
        <DmeForm
          data={data?.type === 'DME' ? data : undefined}
          onChange={onChange}
        />
      )}
      {paType === 'home-health' && (
        <HomeHealthForm
          data={data?.type === 'home-health' ? data : undefined}
          onChange={onChange}
        />
      )}
    </div>
  );
}
