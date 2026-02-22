/**
 * Generate and download a placeholder template document.
 * Creates a text-based document with form fields and instructions
 * that simulates a real UHC template.
 */

function buildTemplateContent(fileName: string, docName: string, description: string): string {
  const now = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const formId = fileName.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ').toUpperCase();

  return `
================================================================================
                        UNITEDHEALTH GROUP (UHC)
                     PRIOR AUTHORIZATION TEMPLATE
================================================================================

  Form: ${formId}
  Document: ${docName}
  Generated: ${now}

--------------------------------------------------------------------------------
  DESCRIPTION
--------------------------------------------------------------------------------

  ${description}

--------------------------------------------------------------------------------
  INSTRUCTIONS
--------------------------------------------------------------------------------

  1. Complete all required fields below.
  2. Sign and date the form.
  3. Upload this completed form via the UHC Provider Portal along with
     any supporting documentation referenced in the PA submission checklist.
  4. Ensure all information is legible and accurate.
  5. Incomplete forms will be returned and may delay the authorization process.

--------------------------------------------------------------------------------
  SECTION 1: MEMBER INFORMATION
--------------------------------------------------------------------------------

  Member Name:       ____________________________________________________
  Member ID:         ____________________________________________________
  Date of Birth:     ______ / ______ / __________
  Subscriber ID:     ____________________________________________________
  Group Number:      ____________________________________________________
  Plan Name:         ____________________________________________________

--------------------------------------------------------------------------------
  SECTION 2: PROVIDER INFORMATION
--------------------------------------------------------------------------------

  Provider Name:     ____________________________________________________
  Provider NPI:      ____________________________________________________
  Tax ID (TIN):      ____________________________________________________
  Facility Name:     ____________________________________________________
  Facility Address:  ____________________________________________________
                     ____________________________________________________
  Phone:             (______) ______-__________
  Fax:               (______) ______-__________
  Contact Person:    ____________________________________________________

--------------------------------------------------------------------------------
  SECTION 3: SERVICE / CLINICAL INFORMATION
--------------------------------------------------------------------------------

  Primary Diagnosis Code (ICD-10):    ______________________________________
  Diagnosis Description:              ______________________________________
  Procedure/Service Code (CPT/HCPCS): ______________________________________
  Service Description:                ______________________________________
  Date of Service (Requested):        ______ / ______ / __________
  Urgency:  [ ] Standard    [ ] Urgent    [ ] Emergent
  Clinical Justification:
  _________________________________________________________________________
  _________________________________________________________________________
  _________________________________________________________________________
  _________________________________________________________________________

--------------------------------------------------------------------------------
  SECTION 4: ADDITIONAL INFORMATION
--------------------------------------------------------------------------------

  (Complete this section as applicable to the specific template type.)

  _________________________________________________________________________
  _________________________________________________________________________
  _________________________________________________________________________
  _________________________________________________________________________
  _________________________________________________________________________
  _________________________________________________________________________
  _________________________________________________________________________
  _________________________________________________________________________

--------------------------------------------------------------------------------
  SECTION 5: ATTESTATION
--------------------------------------------------------------------------------

  I certify that the information provided is true and accurate to the best
  of my knowledge. I understand that UHC may verify the information submitted
  and request additional documentation as needed.

  Provider Signature: ______________________________  Date: ____/____/________

  Print Name:         ______________________________

  Title:              ______________________________

================================================================================
  CONFIDENTIALITY NOTICE: This document contains Protected Health Information
  (PHI) and is intended solely for the authorized recipient. Unauthorized
  disclosure is prohibited under HIPAA regulations (45 CFR Parts 160-164).
================================================================================

  UHC Provider Services: 1-800-555-0199
  UHC Prior Authorization Fax: 1-800-555-0188
  UHC Provider Portal: https://provider.uhc.com

  File: ${fileName}
  Form Version: 2024-01 Rev. A
================================================================================
`.trim();
}

/**
 * Trigger a browser file download with the given content.
 */
function triggerDownload(content: string, fileName: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download a single template document.
 */
export function downloadTemplate(fileName: string, docName: string, description: string) {
  // Map file extensions to txt-based output (prototype — real app would serve actual files)
  const ext = fileName.split('.').pop()?.toLowerCase() ?? 'txt';
  const txtFileName = fileName.replace(/\.[^.]+$/, '.txt');

  let mimeType = 'text/plain';
  if (ext === 'csv' || ext === 'xlsx') mimeType = 'text/plain';

  const content = buildTemplateContent(fileName, docName, description);
  triggerDownload(content, txtFileName, mimeType);
}

/**
 * Download all templates for a given set of documents.
 * Each document is downloaded individually with a small delay to avoid browser blocking.
 */
export function downloadAllTemplates(
  documents: { templateAvailable?: boolean; templateName?: string; name: string; description: string }[],
) {
  const templated = documents.filter((d) => d.templateAvailable && d.templateName);

  templated.forEach((doc, index) => {
    setTimeout(() => {
      downloadTemplate(doc.templateName!, doc.name, doc.description);
    }, index * 300);
  });
}
