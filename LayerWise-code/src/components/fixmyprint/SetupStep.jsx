import StepNav from '@/components/fixmyprint/StepNav';

export default function SetupStep({ index, config, values, onChange, onBack, onNext }) {
  return <div>
    <p className="eyebrow">STEP {index + 1} · YOUR SETUP</p>
    <h2 className="mt-2 font-heading text-2xl font-bold">{config.title}</h2>
    <p className="mt-3 text-sm leading-6 text-gray-500">{config.hint}</p>
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      {config.inputs.map(f => <label key={f.key} className="text-xs font-semibold">{f.label}
        {f.options
          ? <select className="field mt-2" value={values[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}>
              <option value="">I don’t know</option>
              {f.options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          : <input className="field mt-2" value={values[f.key] || ''} placeholder={f.placeholder} onChange={e => onChange(f.key, e.target.value)} autoComplete="off"/>}
      </label>)}
    </div>
    <StepNav onBack={onBack} onNext={onNext}/>
  </div>;
}