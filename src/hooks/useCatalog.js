import { useState, useEffect } from 'react';

// सैंपल टूल्स और ट्रबलशूटिंग डेटा
const sampleCatalog = {
  tools: [
    {
      id: 'flow-rate',
      slug: 'flow-rate',
      name: 'Flow Rate Calibration',
      description: 'Calculate and fine-tune your extrusion multiplier for precise dimensions.'
    },
    {
      id: 'temp-tower',
      slug: 'temp-tower',
      name: 'Temperature Tower Generator',
      description: 'Find the optimal printing temperature for your specific filament.'
    },
    {
      id: 'pressure-advance',
      slug: 'pressure-advance',
      name: 'Pressure Advance / Pressure Control',
      description: 'Optimize corner sharpest and reduce bulging on acceleration changes.'
    }
  ],
  problems: [
    {
      id: 'layer-shifting',
      slug: 'layer-shifting',
      name: 'Layer Shifting',
      title: 'Layer Shifting Issues',
      description: 'Diagnose mechanical slipping, stepper driver overheating, or belt tension issues.',
      symptoms: ['X or Y axis misaligned mid-print', 'Stepped layer output'],
      solutions: [{ title: 'Check Belt Tension', description: 'Ensure X/Y belts are properly tensioned without slipping.' }]
    },
    {
      id: 'under-extrusion',
      slug: 'under-extrusion',
      name: 'Weak Print / Under-extrusion',
      title: 'Under-extrusion Troubleshooter',
      description: 'Resolve gaps in perimeter walls, brittle layers, and nozzle clogs.',
      symptoms: ['Gaps in walls', 'Weak layer adhesion'],
      solutions: [{ title: 'Clear Nozzle Clog', description: 'Perform a cold pull or check extruder gears.' }]
    }
  ]
};

export function useCatalog() {
  const [catalog, setCatalog] = useState(sampleCatalog);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // डेटा लोड सेट करें
    setCatalog(sampleCatalog);
  }, []);

  return { catalog, loading };
}

export default useCatalog;