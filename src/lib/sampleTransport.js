// Public planning guidance only. Lab-specific acceptance and shipping requirements
// must be agreed with PLS; these constants are also the chatbot's grounding source.
export const SAMPLE_TRANSPORT_REVIEW_DATE = '2026-10-25';
export const SAMPLE_TRANSPORT_REVIEW_LABEL = '25 October 2026';
export const SAMPLE_TRANSPORT_CONTACT = '/contact?topic=service&product=Sample%20submission%20and%20transport%20guidance';

export const SAMPLE_TRANSPORT_SOURCES = [
  {
    id: 'who',
    title: 'WHO — transport of infectious substances, 2023–2024 edition',
    href: 'https://www.who.int/publications/i/item/9789240089525',
    note: 'Background on packaging, transport planning and responsibilities. Check the rules in force when you dispatch.',
  },
  {
    id: 'cdc',
    title: 'CDC — specimen storage and shipping guidance (PDF)',
    href: 'https://www.cdc.gov/infectious-diseases-labs/specimen-submission/pdf/Specimen-Packing-and-Shipping-Guidance-Infectious-Diseases-Laboratories.pdf',
    note: 'General shipping principles. CDC receiving requirements are not PLS acceptance criteria.',
  },
  {
    id: 'iata',
    title: 'IATA — Dangerous Goods Regulations',
    href: 'https://www.iata.org/dgr',
    note: 'Air transport classification, packing, marking, documentation and training requirements.',
  },
];

export const SAMPLE_TRANSPORT_INTRO = 'Plan sample submission with the PLS technical team before collecting or sending material for an agreed research service.';
export const SAMPLE_TRANSPORT_ACCEPTANCE = 'Confirm the service, material type, quantity, container or transport medium, required temperature, maximum transit time, delivery address and receiving arrangements with PLS. There is no single transport condition suitable for every sample.';
export const SAMPLE_TRANSPORT_SCOPE = 'A specimen listed on an assay page does not confirm that PLS accepts it. Do not send clinical diagnostic samples, cultures or suspected high-risk infectious material without explicit written acceptance and an appropriate shipping plan. This page does not establish PLS diagnostic or high-containment capability.';

export const SAMPLE_TRANSPORT_STEPS = [
  {
    title: 'Label each container clearly',
    text: 'Use the sample identifier agreed with PLS and make it match the accompanying sample list. Record material type and collection or preparation details as requested. Keep paperwork protected and separate from the sample containers.',
  },
  {
    title: 'Protect sample information',
    text: 'Use coded research identifiers where appropriate. Do not enter patient names, reports or other sensitive identifiers in the public enquiry form or website chat. Ask the team how required submission records should be transferred.',
  },
  {
    title: 'Agree the journey',
    text: 'Confirm the delivery day, receiving contact and courier before dispatch. Use the agreed temperature control and notify PLS of tracking details and any delay or temperature deviation. Refrigerant choice, including dry ice, must be reviewed by the shipper.',
  },
];

export const SAMPLE_TRANSPORT_PACKAGING = [
  {
    title: 'Primary container',
    text: 'A compatible, securely closed, leakproof sample container. For liquids, add enough absorbent material to contain the entire contents if a leak occurs.',
  },
  {
    title: 'Secondary packaging',
    text: 'Leakproof packaging around the primary container and absorbent material. Separate and cushion individual containers so they cannot strike one another.',
  },
  {
    title: 'Outer packaging',
    text: 'A sturdy outer package that protects the contents during transport, with the required shipping marks, labels and documentation.',
  },
];

export const SAMPLE_TRANSPORT_CLASSIFICATION = 'These three layers explain the packaging principle; they are not a complete packing instruction or certification. A trained, competent shipper must determine classification, compliant packaging, markings, documents and any permits under current national, route and carrier rules. Research use does not automatically make a specimen exempt. Dry ice has additional dangerous-goods requirements.';

export const SAMPLE_TRANSPORT_MATERIALS = [
  {
    material: 'Samples for DNA extraction',
    guidance: 'Confirm the source material, container or preservative, quantity and storage history before collection. Follow the project-specific transport instructions supplied after acceptance.',
  },
  {
    material: 'Extracted DNA or RNA',
    guidance: 'For quantification or PCR, agree the buffer, concentration, volume and aliquot format. Protect against contamination and follow the agreed temperature and handling requirements; do not assume all nucleic acids can travel at room temperature.',
  },
  {
    material: 'PCR products for gels or Sanger sequencing',
    guidance: 'Confirm the product identity, expected size, cleanup status, buffer and required aliquots. For sequencing, also agree primer requirements. Use the approved preparation and transport conditions.',
  },
  {
    material: 'Plasma or nasopharyngeal swabs',
    guidance: 'These specimen types appear in the assay portfolio. Confirm acceptance, collection tube or swab medium and assay-specific handling before collection or dispatch; product-kit storage instructions do not apply to specimens.',
  },
];

export const SAMPLE_TRANSPORT_GROUNDING = [
  `Sample transport guidance. Last reviewed: ${SAMPLE_TRANSPORT_REVIEW_LABEL}.`,
  SAMPLE_TRANSPORT_INTRO,
  SAMPLE_TRANSPORT_ACCEPTANCE,
  SAMPLE_TRANSPORT_SCOPE,
  ...SAMPLE_TRANSPORT_STEPS.map((item) => `${item.title}: ${item.text}`),
  ...SAMPLE_TRANSPORT_PACKAGING.map((item) => `${item.title}: ${item.text}`),
  SAMPLE_TRANSPORT_CLASSIFICATION,
  ...SAMPLE_TRANSPORT_MATERIALS.map((item) => `${item.material}: ${item.guidance}`),
  'Do not provide unconfirmed sample volumes, temperatures, transit times, acceptance promises or transport classifications. Direct the visitor to PLS for project-specific instructions.',
  `Guide: /sample-transport. Contact: ${SAMPLE_TRANSPORT_CONTACT}.`,
  ...SAMPLE_TRANSPORT_SOURCES.map((source) => `${source.title}: ${source.href}`),
].join('\n');
