import { problemOptions } from '@/components/fixmyprint/wizardData';

export default function ProblemPicker({ value, onPick }) {
  return <div>
    <p className="eyebrow">STEP 1 · THE SYMPTOM</p>
    <h2 className="mt-2 font-heading text-2xl font-bold">What problem are you having?</h2>
    <p className="mt-3 text-sm leading-6 text-gray-500">Pick the symptom closest to what you see on your print. Nothing else is required to start.</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {problemOptions.map(o => <button key={o.label} onClick={() => onPick(o)}
        className={`rounded-xl border p-4 text-left transition-colors hover:border-orange-300 ${value?.label === o.label ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white'}`}>
        <span className="text-sm font-bold">{o.label}</span>
        {o.note && <span className="mt-1.5 block text-[10px] leading-4 text-gray-400">{o.note}</span>}
      </button>)}
    </div>
  </div>;
}