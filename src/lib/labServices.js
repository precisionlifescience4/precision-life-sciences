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
  {
    slug: 'biobanking-storage',
    name: 'Biobanking & Storage Solutions',
    pageTitle: 'Research Biobanking and Sample Storage in Peshawar',
    shortDescription: 'Project-based biobanking and storage support for research samples, with handling and access agreed in advance.',
    intro: 'Plan a documented research sample collection and storage workflow around your study, with acceptance criteria and storage arrangements confirmed before material is transferred.',
    supports: [
      'Research teams that need organised sample intake, inventory and retrieval',
      'Projects requiring an agreed storage plan alongside molecular laboratory services',
      'Studies that need sample custody, access and retention requirements defined before handover',
    ],
    planning: [
      'Sample type, quantity and current condition',
      'Required storage conditions, duration and retrieval frequency',
      'Consent or ethics documentation, ownership and access requirements where applicable',
    ],
    faqs: [
      ['Can I send samples directly?', 'Please discuss the project and sample requirements first. Acceptance and storage arrangements are confirmed before transfer.'],
      ['Are storage conditions fixed?', 'Conditions, duration, capacity and retrieval arrangements are agreed for each project before acceptance.'],
      ['Can storage be combined with laboratory services?', 'Yes. A storage plan can be discussed alongside an agreed extraction, PCR or other research workflow.'],
    ],
  },
  {
    slug: 'ngs-sequencing',
    name: 'Next-Generation Sequencing (NGS)',
    pageTitle: 'NGS and Research Sequencing Services in Peshawar',
    shortDescription: 'Project-scoped NGS support, from study and sample review to agreed sequencing and data deliverables.',
    intro: 'Discuss a sequencing project around the research question, sample inputs and data you need. The platform, workflow and delivery route are confirmed during technical review.',
    supports: [
      'Research projects requiring targeted or broader sequencing approaches',
      'Teams that need sample preparation, sequencing and analysis considered as one project',
      'Researchers comparing NGS with Sanger sequencing for a defined question',
    ],
    planning: [
      'Research objective, organism or target region, and intended analysis',
      'Sample material, count, quality information and available input',
      'Required data format, analysis scope and any platform preference',
    ],
    faqs: [
      ['Which NGS platforms are available?', 'Platform and workflow options are confirmed for each project; no platform is assumed from this website listing.'],
      ['Can analysis be included?', 'Discuss the required data and analysis deliverables during scoping so they can be included in the quotation where feasible.'],
      ['Can I send samples now?', 'Please obtain sample acceptance and transport instructions from the technical team before dispatch.'],
    ],
  },
  {
    slug: 'primer-design',
    name: 'Primer Design & Oligonucleotide Synthesis',
    pageTitle: 'PCR Primer Design and Oligonucleotide Synthesis Service in Peshawar',
    shortDescription: 'In-silico primer and probe design, with oligonucleotide synthesis coordinated for defined PCR, qPCR and sequencing research applications.',
    intro: 'Start with a target and intended application. Design criteria, sequence coverage and whether you need design only or supplied oligonucleotides are agreed before work begins.',
    supports: [
      'PCR or qPCR projects needing candidate primer or probe sets and, where requested, corresponding oligonucleotide supply',
      'Sequencing projects that require a planned amplification or read primer',
      'Assay development projects needing an in-silico design review',
    ],
    planning: [
      'Target sequence or accession, organism and intended application',
      'Known variants, regions to include or avoid, and assay constraints',
      'Whether you require design only, oligonucleotide synthesis, or laboratory evaluation'
    ],
    faqs: [
      ['Does a design include laboratory validation?', 'Laboratory testing is a separate project step and is included only when agreed in the scope.'],
      ['Can you review an existing primer set?', 'Yes. Share the sequences and target information so the team can assess the requested review.'],
      ['Can PLS arrange oligonucleotide synthesis?', 'Yes. Confirm the required sequences, modification requirements, purification level, scale and delivery format when requesting a quote.'],
    ],
  },
  {
    slug: 'cloning-constructs',
    name: 'Cloning & Construct Services',
    pageTitle: 'Molecular Cloning and Construct Services in Peshawar',
    shortDescription: 'Project-based cloning, subcloning and construct planning for defined molecular research goals.',
    intro: 'Discuss the source material, insert, vector and intended construct so feasibility, verification and handover can be specified before work begins.',
    supports: [
      'Research projects requiring an insert moved into an agreed vector',
      'Construct planning with a defined verification or sequencing step',
      'Integrated workflows linking PCR, cleanup, cloning and sequence review',
    ],
    planning: [
      'Insert sequence or source material and vector information',
      'Intended construct, permitted material and relevant institutional requirements',
      'Requested verification and final material or data deliverables',
    ],
    faqs: [
      ['Can I provide my own vector?', 'Vector suitability and submission requirements are reviewed during project scoping.'],
      ['How is a construct verified?', 'The verification approach and deliverables are agreed for the specific construct before the project is accepted.'],
      ['Do you accept every cloning project?', 'Acceptance depends on technical feasibility, material requirements and the agreed research scope.'],
    ],
  },
  {
    slug: 'pcr-cleanup',
    name: 'PCR Cleanup & Purification',
    pageTitle: 'PCR Product Cleanup and Purification in Peshawar',
    shortDescription: 'Cleanup of PCR products for agreed downstream sequencing, cloning or analysis workflows.',
    intro: 'Prepare an amplified product for its next research step. The cleanup approach and acceptance criteria depend on the product and downstream application.',
    supports: [
      'PCR products intended for Sanger sequencing or another agreed readout',
      'Amplified material needing purification before cloning or further analysis',
      'Integrated PCR-to-sequencing research workflows',
    ],
    planning: [
      'Product size, reaction volume and available gel or quality information',
      'Number of reactions and any visible non-specific products',
      'The intended downstream application and required handover format',
    ],
    faqs: [
      ['Can unpurified PCR reactions be submitted?', 'The team reviews the reaction information and intended use before confirming whether the material can be accepted.'],
      ['Is cleanup the same as sequencing?', 'No. Cleanup prepares a product for an agreed downstream step; sequencing is scoped separately.'],
      ['Can cleanup be combined with PCR or Sanger sequencing?', 'Yes. A combined research workflow can be discussed and quoted after the sample and target requirements are reviewed.'],
    ],
  },
  {
    slug: 'custom-molecular-biology',
    name: 'Custom Molecular Biology Projects',
    pageTitle: 'Custom Molecular Biology Research Services in Peshawar',
    shortDescription: 'A scoped molecular biology workflow for research questions that span several laboratory steps.',
    intro: 'Bring a defined research question to the PLS team. We will review the required design, preparation, amplification and analysis steps as one project.',
    supports: [
      'Projects needing a coordinated workflow rather than a single laboratory step',
      'Assay development or optimisation questions with agreed research deliverables',
      'Teams seeking technical input on sample-to-result study planning',
    ],
    planning: [
      'Research objective and the decision the results should support',
      'Available samples, protocols, target information and prior data',
      'Proposed milestones, reporting needs and any project constraints',
    ],
    faqs: [
      ['Is this a fixed package?', 'No. The workflow, milestones, deliverables and quotation are defined for each research project.'],
      ['Can PLS combine several listed services?', 'Yes. The team can assess a combined workflow and confirm which steps can be included.'],
      ['Is this a clinical diagnostic service?', 'No. This listing is for research projects; clinical use is outside the stated service scope.'],
    ],
  },
];

export const SERVICE_PACKAGES = [
  {
    id: 'sequencing-genomics',
    name: 'Sequencing & genomics',
    description: 'Choose a defined Sanger read or discuss an NGS project with the data deliverable in mind.',
    accent: 'border-t-navy',
    slugs: ['sanger-sequencing', 'ngs-sequencing'],
  },
  {
    id: 'design-build',
    name: 'Design & build',
    description: 'Plan primers, probes and oligonucleotide synthesis, constructs or a custom research workflow around your target.',
    accent: 'border-t-hiv',
    slugs: ['primer-design', 'cloning-constructs', 'custom-molecular-biology'],
  },
  {
    id: 'sample-preparation',
    name: 'Sample preparation & storage',
    description: 'Select a practical laboratory step, from intake and extraction to PCR cleanup and storage.',
    accent: 'border-t-cyan',
    slugs: ['dna-extraction', 'dna-rna-quantification', 'pcr-amplification', 'gel-electrophoresis', 'pcr-cleanup', 'biobanking-storage'],
  },
];

export function getLabService(slug) {
  return LAB_SERVICES.find((service) => service.slug === slug);
}
