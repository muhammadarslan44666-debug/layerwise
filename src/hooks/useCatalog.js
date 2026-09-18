import { useState, useEffect } from 'react';

const fullCatalog = {
  tools: [
    {
      id: 'flow-rate',
      slug: 'flow-rate',
      name: 'Flow Rate Calibration',
      description: 'Calculate and fine-tune your extrusion multiplier for precise wall thickness.',
      inputs: [
        { id: 'targetWall', label: 'Target Wall Thickness (mm)', defaultValue: 0.8, type: 'number' },
        { id: 'measuredWall', label: 'Measured Wall Thickness (mm)', defaultValue: 0.84, type: 'number' },
        { id: 'currentFlow', label: 'Current Flow Rate / Extrusion Multiplier (%)', defaultValue: 100, type: 'number' }
      ],
      formula: 'newFlow = (targetWall / measuredWall) * currentFlow',
      instructions: 'Print a 2-wall hollow cube with 0% infill. Measure all four wall sides with a digital caliper, average them, and enter the values above.'
    },
    {
      id: 'temperature-tower',
      slug: 'temperature-tower',
      name: 'Temperature Tower Generator',
      description: 'Find the optimal printing temperature for strength, stringing, and surface finish.',
      inputs: [
        { id: 'startTemp', label: 'Starting Temperature (°C)', defaultValue: 220, type: 'number' },
        { id: 'endTemp', label: 'Ending Temperature (°C)', defaultValue: 190, type: 'number' },
        { id: 'tempStep', label: 'Temperature Change Step (°C)', defaultValue: 5, type: 'number' },
        { id: 'blockHeight', label: 'Height Per Temperature Block (mm)', defaultValue: 10, type: 'number' }
      ],
      instructions: 'Generate G-code modifications to drop nozzle temperature automatically every set height interval.'
    },
    {
      id: 'retraction-test',
      slug: 'retraction-test',
      name: 'Retraction Test',
      description: 'Eliminate stringing and oozing by fine-tuning retraction distance and speed.',
      inputs: [
        { id: 'startDistance', label: 'Start Distance (mm)', defaultValue: 0.5, type: 'number' },
        { id: 'endDistance', label: 'End Distance (mm)', defaultValue: 3.0, type: 'number' },
        { id: 'stepDistance', label: 'Step Distance (mm)', defaultValue: 0.5, type: 'number' },
        { id: 'retractionSpeed', label: 'Retraction Speed (mm/s)', defaultValue: 45, type: 'number' }
      ],
      instructions: 'Test multiple retraction distances on a twin-tower model to identify the zero-stringing threshold.'
    },
    {
      id: 'pressure-advance',
      slug: 'pressure-advance',
      name: 'Pressure Advance / Linear Advance',
      description: 'Optimize sharp corners and reduce bulging on acceleration and deceleration.',
      inputs: [
        { id: 'startK', label: 'Start K / PA Value', defaultValue: 0.0, type: 'number' },
        { id: 'endK', label: 'End K / PA Value', defaultValue: 0.1, type: 'number' },
        { id: 'stepK', label: 'Step Value', defaultValue: 0.01, type: 'number' }
      ],
      instructions: 'Analyze corner line widths across test acceleration lines to find the uniform line width value.'
    },
    {
      id: 'max-volumetric-flow',
      slug: 'max-volumetric-flow',
      name: 'Max Volumetric Flow',
      description: 'Determine the maximum speed limit your hotend can melt filament without under-extrusion.',
      inputs: [
        { id: 'layerHeight', label: 'Layer Height (mm)', defaultValue: 0.2, type: 'number' },
        { id: 'extrusionWidth', label: 'Extrusion Width (mm)', defaultValue: 0.45, type: 'number' },
        { id: 'printSpeed', label: 'Print Speed (mm/s)', defaultValue: 150, type: 'number' }
      ],
      formula: 'volumetricFlow = layerHeight * extrusionWidth * printSpeed',
      instructions: 'Calculate your hotend volumetric flow limit (mm³/s) to prevent extruder slipping at high speeds.'
    },
    {
      id: 'z-offset',
      slug: 'z-offset',
      name: 'Z-Offset / First Layer',
      description: 'Get perfect bed adhesion with correct nozzle height calibration.',
      inputs: [
        { id: 'currentOffset', label: 'Current Z-Offset (mm)', defaultValue: -1.25, type: 'number' },
        { id: 'adjustment', label: 'Adjustment Needed (+/- mm)', defaultValue: 0.05, type: 'number' }
      ],
      instructions: 'Adjust Z-height live during first layer print until lines squish together without overlapping ridges.'
    },
    {
      id: 'dimensional-accuracy',
      slug: 'dimensional-accuracy',
      name: 'Dimensional Accuracy',
      description: 'Calibrate stepper motor steps/mm for exact physical object dimensions.',
      inputs: [
        { id: 'expectedSize', label: 'Expected Dimension (mm)', defaultValue: 20.0, type: 'number' },
        { id: 'measuredSize', label: 'Measured Dimension (mm)', defaultValue: 19.8, type: 'number' },
        { id: 'currentSteps', label: 'Current Steps/mm', defaultValue: 80.0, type: 'number' }
      ],
      formula: 'newSteps = (expectedSize / measuredSize) * currentSteps',
      instructions: 'Print a calibration cube, measure axes with calipers, and update your firmware steps per mm.'
    },
    {
      id: 'filament-cost',
      slug: 'filament-cost',
      name: 'Filament Cost Calculator',
      description: 'Calculate exact print material cost based on print weight and spool price.',
      inputs: [
        { id: 'spoolPrice', label: 'Spool Cost ($)', defaultValue: 20, type: 'number' },
        { id: 'spoolWeight', label: 'Spool Weight (grams)', defaultValue: 1000, type: 'number' },
        { id: 'printWeight', label: 'Print Weight Used (grams)', defaultValue: 45, type: 'number' }
      ],
      formula: 'cost = (spoolPrice / spoolWeight) * printWeight',
      instructions: 'Enter spool details and slicer estimated print weight to get exact material expense per print.'
    }
  ],
  problems: []
};

export function useCatalog() {
  const [catalog, setCatalog] = useState(fullCatalog);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCatalog(fullCatalog);
  }, []);

  return { catalog, loading };
}

export default useCatalog;