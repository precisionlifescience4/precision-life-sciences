export const LAB_SERVICES = [
  {
    slug: 'dna-extraction',
    name: 'DNA Extraction',
    pageTitle: 'DNA Extraction Service in Peshawar, Pakistan',
    shortDescription: 'DNA extraction for sequencing and other defined molecular research workflows.',
    intro: 'Prepare DNA for a defined downstream research workflow with requirements confirmed before samples are accepted.',
    supports: [
      'Research projects requiring DNA as an input for PCR, sequencing or another agreed molecular workflow',
      'Projects that need extraction integrated with a later laboratory service',
      'Researchers who want sample and submission requirements reviewed before dispatch',
    ],
    planning: [
      'Sample type, condition and approximate quantity',
      'The intended downstream research application',
      'Number of samples and any project-specific handling requirements',
    ],
    faqs: [
      ['Can I submit samples without prior confirmation?', 'Please confirm the sample type, quantity and project objective with the technical team before sending material.'],
      ['Can extraction be combined with another service?', 'Yes. An integrated workflow can be discussed where DNA extraction is followed by an agreed PCR, electrophoresis or sequencing step.'],
      ['Is this a clinical diagnostic service?', 'No. The service is presented for defined research projects; scope and acceptance are agreed before submission.'],
    ],
  },
  {
    slug: 'dna-rna-quantification',
    name: 'DNA/RNA Quantification',
    pageTitle: 'DNA and RNA Quantification Service in Peshawar',
    shortDescription: 'Nucleic-acid quantification to support downstream molecular research planning and quality checks.',
    intro: 'Review DNA or RNA concentration within a defined research workflow before proceeding to the next laboratory step.',
    supports: [
      'Research teams preparing nucleic acid for PCR or other agreed downstream work',
      'Projects that need concentration information before sample normalization or workflow planning',
      'Integrated projects in which extraction and quantification are scoped together',
    ],
    planning: [
      'Whether the submitted material is DNA or RNA',
      'Sample buffer, approximate volume and number of samples',
      'The intended downstream research application and required reporting format',
    ],
    faqs: [
      ['What information should accompany each sample?', 'Provide a clear sample identifier, material type, buffer information and the downstream research objective.'],
      ['Can quantification follow extraction by the same team?', 'An integrated extraction and quantification workflow can be scoped before sample submission.'],
      ['Will requirements be confirmed before dispatch?', 'Yes. Sample requirements, pricing, turnaround time and deliverables are confirmed before acceptance.'],
    ],
  },
  {
    slug: 'pcr-amplification',
    name: 'PCR Amplification',
    pageTitle: 'PCR Amplification Service in Peshawar, Pakistan',
    shortDescription: 'Target amplification for defined research projects, scoped against sample and project requirements.',
    intro: 'Plan a conventional PCR amplification step around a defined research target, sample input and downstream objective.',
    supports: [
      'Research projects requiring target amplification before electrophoresis or sequencing',
      'Defined PCR work where primer, template and expected-product information can be reviewed in advance',
      'Integrated workflows that combine extraction, amplification and an agreed downstream step',
    ],
    planning: [
      'Target and expected amplicon information',
      'Primer availability and relevant sequence or protocol details',
      'Template type, sample number and intended downstream use',
    ],
    faqs: [
      ['Do I need to provide target and primer information?', 'Yes. The technical team needs sufficient target, primer and expected-product information to review feasibility and scope.'],
      ['Can PCR products proceed to electrophoresis or sequencing?', 'A combined workflow can be discussed and quoted where the requested downstream step is appropriate for the project.'],
      ['Is every submitted project automatically accepted?', 'No. Feasibility, sample requirements, deliverables and acceptance are confirmed before material is submitted.'],
    ],
  },
  {
    slug: 'gel-electrophoresis',
    name: 'Gel Electrophoresis',
    pageTitle: 'Gel Electrophoresis Service in Peshawar',
    shortDescription: 'Gel electrophoresis support for visualising and reviewing molecular research products.',
    intro: 'Use gel electrophoresis as a defined review step for PCR products or other agreed molecular research material.',
    supports: [
      'Visual review of agreed molecular research products',
      'PCR workflows requiring an electrophoresis step before the project proceeds',
      'Integrated molecular projects where the gel step is planned with amplification or sequencing support',
    ],
    planning: [
      'Material type and expected product size or range',
      'Number of samples and available sample volume',
      'The project question and the next intended workflow step',
    ],
    faqs: [
      ['Can electrophoresis be requested as a standalone service?', 'Standalone or integrated requests can be discussed; the material and required output are confirmed before acceptance.'],
      ['What project information is useful?', 'Share the sample identifiers, material type, expected product information and the purpose of the electrophoresis step.'],
      ['Can the gel step be combined with PCR support?', 'Yes. A combined PCR and electrophoresis workflow can be scoped when it fits the research objective.'],
    ],
  },
  {
    slug: 'sanger-sequencing',
    name: 'Sanger Sequencing',
    pageTitle: 'Sanger Sequencing Support in Peshawar, Pakistan',
    shortDescription: 'Sanger sequencing support for submitted PCR products and integrated molecular research workflows.',
    intro: 'Discuss Sanger sequencing support for an agreed research target, submitted PCR product or integrated molecular workflow.',
    supports: [
      'Research projects requiring sequence information from an agreed PCR product or target',
      'Projects that need amplification and sequencing support considered as one workflow',
      'Researchers who want submission requirements and expected deliverables confirmed before dispatch',
    ],
    planning: [
      'Target, amplicon and primer information relevant to the request',
      'Material type, number of samples and available volume',
      'The research objective and required sequence-data deliverables',
    ],
    faqs: [
      ['What should I share before sending a PCR product?', 'Share the target, product and primer information, sample count and the research objective so the team can confirm submission requirements.'],
      ['Can amplification and sequencing be scoped together?', 'Yes. An integrated workflow can be discussed where the project requires PCR amplification before sequencing support.'],
      ['Are turnaround time and deliverables fixed?', 'They are confirmed for the specific project before samples are accepted, along with pricing and submission requirements.'],
    ],
  },
];

export function getLabService(slug) {
  return LAB_SERVICES.find((service) => service.slug === slug);
}
