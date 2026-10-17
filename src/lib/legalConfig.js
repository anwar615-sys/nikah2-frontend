// The company details shown in the Privacy Policy, Cookie Policy, Terms and Beta Notice.
//
// FILL THESE IN before sharing the site publicly. Any value left empty appears on
// the legal pages as "[to be completed]", so nothing goes out silently incomplete.
// Have a lawyer review the policy texts (src/lib/legalContent.js) once these are filled.
export const LEGAL = {
  companyName: "", // registered legal name of the company that runs Nikha2
  registeredAddress: "", // full postal address
  contactEmail: "", // general privacy/contact email
  grievanceOfficerName: "", // Grievance Officer under India's DPDP Act 2023
  grievanceOfficerEmail: "",
  governingLaw: "", // e.g. "the laws of India, courts of Hyderabad"
};

// Date the current texts took effect (shown as "Last updated").
export const LEGAL_LAST_UPDATED = "18 October 2026";

export const TO_BE_COMPLETED = "[to be completed]";

export function legalValue(key) {
  const v = LEGAL[key];
  return typeof v === "string" && v.trim() ? v.trim() : TO_BE_COMPLETED;
}

export function legalDetailsComplete() {
  return Object.keys(LEGAL).every((k) => legalValue(k) !== TO_BE_COMPLETED);
}
