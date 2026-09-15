import { problems } from '@/components/data/problems';

// Symptom options for the Fix My Print wizard. Each option maps to the closest
// editorial workflow we publish; anything without one points to the index.
export const problemOptions = [
  { label: 'Stringing', slug: 'stringing' },
  { label: 'Under-extrusion', slug: 'under-extrusion' },
  { label: 'Over-extrusion', slug: 'over-extrusion' },
  { label: 'First-layer problems', slug: 'first-layer' },
  { label: 'Warping', slug: 'warping' },
  { label: 'Layer shifting', slug: 'layer-shifting' },
  { label: 'Poor surface quality', slug: 'surface-quality' },
  { label: 'Weak prints', slug: 'weak-prints' },
  { label: 'Poor bridging', slug: 'bridging' },
  { label: 'Dimensional accuracy', slug: 'dimensional-accuracy' },
  { label: 'Blobs / Zits', slug: 'stringing', note: 'No dedicated page yet — retraction restart behavior is covered alongside stringing.' },
  { label: 'Elephant foot', slug: 'first-layer', note: 'No dedicated page yet — first-layer distance is the usual starting point.' },
  { label: 'Ghosting / Ringing', slug: 'surface-quality', note: 'No dedicated page yet — start here, then review the motion checks on the layer-shifting page.' },
  { label: 'Gaps in the print', slug: 'under-extrusion' },
  { label: 'Poor overhangs', slug: 'bridging' },
  { label: 'Other', slug: null, note: 'We’ll point you to the full troubleshooting index.' }
];

export const getProblem = slug => problems.find(p => p.slug === slug);

// Setup questions for steps 2–5. Nothing is required: blank means "I don't know".
export const setupSteps = [
  { title: 'About your printer', hint: 'Anything you don’t know can be left blank. We use this for context — never to invent a hardware-specific setting.', inputs: [
    { key: 'manufacturer', label: 'Manufacturer', placeholder: 'e.g. Bambu Lab, Creality, Prusa' },
    { key: 'model', label: 'Printer model', placeholder: 'e.g. A1, Ender 3' },
    { key: 'firmware', label: 'Firmware (if relevant)', placeholder: 'e.g. Klipper, Marlin' }
  ] },
  { title: 'About your filament', hint: 'Material matters most. Brand and product help you interpret results later — blank is fine.', inputs: [
    { key: 'filament', label: 'Material', options: ['PLA', 'PETG', 'ABS', 'ASA', 'TPU', 'Nylon (PA)', 'PC'] },
    { key: 'brand', label: 'Manufacturer / brand', placeholder: 'e.g. Prusament, eSun' },
    { key: 'product', label: 'Product / series (if known)', placeholder: 'e.g. Galaxy Black' },
    { key: 'diameter', label: 'Diameter (if relevant)', options: ['1.75 mm', '2.85 mm'] }
  ] },
  { title: 'Which slicer are you using?', hint: 'Calibration features vary by slicer — we’ll flag where a linked workflow assumes a specific one.', inputs: [
    { key: 'slicer', label: 'Slicer', options: ['OrcaSlicer', 'Bambu Studio', 'PrusaSlicer', 'Cura', 'Other'] }
  ] },
  { title: 'Nozzle details', hint: 'Diameter affects flow tests. If you’re unsure, check your printer’s documentation rather than guessing.', inputs: [
    { key: 'nozzle', label: 'Nozzle diameter (mm)', options: ['0.2', '0.25', '0.3', '0.4', '0.5', '0.6', '0.8'] },
    { key: 'nozzleMaterial', label: 'Nozzle material (if relevant)', options: ['Brass', 'Hardened steel', 'Stainless steel', 'Other / not sure'] }
  ] }
];