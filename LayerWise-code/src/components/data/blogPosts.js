// Static blog post data. Editorial content only — no fabricated printer,
// filament or firmware specifications. Where a post references a setting,
// it points to the relevant Tool or Troubleshooting page rather than
// stating a number as universally correct.

export const blogPosts = [
  {
    id: 'why-temperature-tower-first',
    slug: 'why-you-should-run-a-temperature-tower-first',
    title: 'Why a temperature tower should be your first calibration test',
    summary: 'Before touching retraction or pressure advance, get your nozzle temperature right. Here\u2019s why the order matters.',
    author: 'Layerwise Editorial',
    date: '2026-08-04',
    tags: ['Calibration', 'Beginner'],
    coverImage: 'Thermometer',
    fullContent: [
      { heading: 'Temperature is the foundation, not one setting among many', body: 'Nozzle temperature affects flow, layer adhesion, stringing, and surface finish all at once. If you tune retraction or pressure advance before you\u2019ve found a good temperature, you\u2019re calibrating on top of a moving target — a temperature change later can undo work you already did elsewhere.' },
      { heading: 'What a temperature tower actually tests', body: 'A temperature tower prints the same small model in sections, dropping the nozzle temperature by a fixed step at each section height. You end up with one printed object that lets you visually compare several temperatures side by side, rather than printing separate full objects for each guess.' },
      { heading: 'What to look for', body: 'Look at stringing between the tower\u2019s overhang test features, layer adhesion (does it snap cleanly or peel apart?), and surface quality. The best section is rarely the highest or lowest temperature — it\u2019s usually the one with the cleanest overhangs and the least stringing without visible under-extrusion.', callout: 'Reminder: the result is a starting point for your specific filament and printer, not a universal number. Retest if you change filament brand, color, or spool.' },
      { heading: 'What to test next', body: 'Once you\u2019ve picked a temperature from the tower, that\u2019s the point to move to a Flow Rate calibration, and then Retraction if stringing is still present at your chosen temperature.' },
    ],
    relatedTool: 'temperature-tower',
    relatedProblem: 'stringing',
  },
  {
    id: 'stringing-vs-oozing',
    slug: 'stringing-vs-oozing-what-is-the-difference',
    title: 'Stringing vs. oozing: are they actually the same problem?',
    summary: 'They look similar on a finished print, but the fix that solves one won\u2019t always solve the other.',
    author: 'Layerwise Editorial',
    date: '2026-08-18',
    tags: ['Troubleshooting', 'Retraction'],
    coverImage: 'MoveVertical',
    fullContent: [
      { heading: 'Two different moments, one visible symptom', body: 'Stringing happens during travel moves — the nozzle moves from one printed feature to another and leaves a fine strand of material behind. Oozing happens when the nozzle sits still (or moves slowly) and material leaks out without the extruder actively pushing.' },
      { heading: 'Why the distinction matters', body: 'If your problem is mostly travel-move stringing, a Retraction Test is the right first step. If material is leaking during pauses — like at the start of a print, or during a slow first layer — the issue is more often temperature-too-high or a worn nozzle, not retraction distance.' },
      { heading: 'A quick way to tell them apart', body: 'Look at where the fine strands originate. If they connect two separate printed islands across open air, that\u2019s classic travel-move stringing. If material is oozing from a stationary nozzle before or after a print starts, retraction tuning won\u2019t fix that on its own — check your temperature and consider a "coast" or "wipe" setting in your slicer.', callout: 'Don\u2019t chase both problems with the same fix. Diagnose which one you actually have before changing settings.' },
    ],
    relatedTool: 'retraction-test',
    relatedProblem: 'stringing',
  },
  {
    id: 'why-first-layer-matters',
    slug: 'why-the-first-layer-decides-everything',
    title: 'Why the first layer decides more than people think',
    summary: 'A messy first layer isn\u2019t just cosmetic — it\u2019s often the root cause of problems that show up much later in the print.',
    author: 'Layerwise Editorial',
    date: '2026-09-01',
    tags: ['Beginner', 'First Layer'],
    coverImage: 'Layers',
    fullContent: [
      { heading: 'The first layer is your foundation, literally', body: 'Every layer above the first one is built on the adhesion, flatness, and consistency the first layer established. A first layer with gaps or excessive squish can lead to warping, poor dimensional accuracy, or even a part detaching from the bed mid-print — problems that look unrelated to the first layer if you only look at where they appear.' },
      { heading: 'What a good first layer actually looks like', body: 'Lines should touch their neighbors and fuse into a continuous surface, without visible gaps and without ridges where material has piled up. It should look slightly squished, not perfectly round like a single strand of spaghetti.' },
      { heading: 'Read it before reaching for numbers', body: 'The most common mistake is treating first-layer problems as a single Z-offset number to search for online. Nozzle distance is genuinely printer- and even bed-region-specific — an observation-based check on your own print tells you more than any number from a forum post.', callout: 'This is exactly why our Z-Offset / First Layer tool asks what you observe instead of asking for a number to plug in.' },
    ],
    relatedTool: 'z-offset',
    relatedProblem: 'first-layer',
  },
  {
    id: 'dialing-in-flow-rate',
    slug: 'what-flow-rate-actually-fixes',
    title: 'What flow rate calibration actually fixes (and what it doesn\u2019t)',
    summary: 'Flow rate is one of the most misunderstood settings in 3D printing. Here\u2019s what it changes — and what it can\u2019t.',
    author: 'Layerwise Editorial',
    date: '2026-09-12',
    tags: ['Calibration', 'Flow Rate'],
    coverImage: 'Droplets',
    fullContent: [
      { heading: 'Flow rate is a correction factor, not a temperature substitute', body: 'Flow rate (sometimes called extrusion multiplier) tells your slicer to push slightly more or less material than the geometry alone would suggest, to correct for real-world variance between your printer\u2019s extrusion system and its theoretical calculation.' },
      { heading: 'What over- and under-extrusion actually look like', body: 'Over-extrusion typically shows as slightly bulging walls, rough top surfaces, or dimensions that measure larger than designed. Under-extrusion shows as gaps between wall lines, weak layer bonding, or dimensions measuring smaller than designed.' },
      { heading: 'Why it won\u2019t fix everything', body: 'If your real problem is a partially clogged nozzle, a bad temperature, or a mechanical extruder issue, adjusting flow rate can mask the symptom in one test print without fixing the underlying cause — and it can reappear on a different model or infill percentage.', callout: 'Run flow rate calibration after temperature is dialed in, not instead of it.' },
    ],
    relatedTool: 'flow-rate',
    relatedProblem: 'surface-quality',
  },
];

export default blogPosts;
