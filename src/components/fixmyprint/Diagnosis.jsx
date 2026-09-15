import { Link } from 'react-router-dom';
import StepNav from '@/components/fixmyprint/StepNav';
import { getProblem } from '@/components/fixmyprint/wizardData';

export default function Diagnosis({ option, setup, onBack, onNext }) {
  const problem = option && getProblem(option.slug);
  const chips = [problem?.name || option?.label, [setup.manufacturer, setup.model].filter(Boolean).join(' '), setup.filament, setup.slicer, setup.nozzle ? `${setup.nozzle} mm nozzle` : ''].filter(Boolean);
  return <div>
    <p className="eyebrow">STEP 6 · DIAGNOSIS</p>
    <h2 className="mt-2 font-heading text-2xl font-bold">Possible causes</h2>
    <p className="mt-3 text-sm leading-6 text-gray-500">We won’t pretend to know the exact cause. Based on “{option.label}”, these are common candidates worth checking first.</p>
    {problem ? <>
      <ul className="mt-6 space-y-3">{problem.causes.map(c => <li key={c} className="flex gap-3 text-sm leading-6 text-gray-700"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500"/>{c}</li>)}</ul>
      <h3 className="mt-8 font-heading text-lg font-bold">Before changing settings</h3>
      <ul className="mt-3 space-y-3">{problem.checks.map(c => <li key={c} className="flex gap-3 text-sm leading-6 text-gray-700"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300"/>{c}</li>)}</ul>
    </> : <p className="panel mt-6 p-5 text-sm leading-6 text-gray-600">We don’t have a focused workflow for that symptom yet. <Link className="text-orange-600 underline" to="/troubleshooting/">Browse the full troubleshooting index</Link> — every page follows the same test-led structure.</p>}
    <div className="mt-7 flex flex-wrap gap-2">{chips.map((c, i) => <span key={i} className="rounded bg-gray-100 px-2.5 py-1.5 text-[11px] text-gray-600">{c}</span>)}</div>
    <StepNav onBack={onBack} onNext={onNext} nextLabel="See the recommended test"/>
  </div>;
}