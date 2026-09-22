import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import StepNav from '@/components/fixmyprint/StepNav';

const KEY = 'layerwise_calibration_history';

export default function ResultLogger({ option, problem, setup, tool, onBack }) {
  const [form, setForm] = useState({ original: '', adjusted: '', outcome: 'Improved', notes: '' });
  const [history, setHistory] = useState([]);
  useEffect(() => { try { setHistory(JSON.parse(localStorage.getItem(KEY)) || []); } catch { setHistory([]); } }, []);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const save = () => {
    const rec = {
      date: new Date().toISOString(), problem: option?.label || 'Other',
      printer: [setup.manufacturer, setup.model].filter(Boolean).join(' ') || 'Not provided',
      filament: [setup.filament, setup.brand].filter(Boolean).join(' ') || 'Not provided',
      nozzle: setup.nozzle ? `${setup.nozzle} mm` : 'Not provided',
      slicer: setup.slicer || 'Not provided', test: tool ? tool.fullName : 'User-selected test',
      original: form.original, adjusted: form.adjusted, outcome: form.outcome, notes: form.notes,
      provenance: 'user_entered'
    };
    const list = [rec, ...history];
    localStorage.setItem(KEY, JSON.stringify(list));
    setHistory(list);
  };
  const download = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'layerwise-calibration-history.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return <div>
    <p className="eyebrow">STEP 8 · RETEST</p>
    <h2 className="mt-2 font-heading text-2xl font-bold">Change one thing, then run the test again.</h2>
    <p className="mt-3 text-sm leading-7 text-gray-600">{problem?.retest || 'Repeat the test after your change and compare against the baseline. If it did not improve, undo the change before trying the next candidate.'}</p>
    <p className="eyebrow mt-10">STEP 9 · SAVE THE RESULT</p>
    <h2 className="mt-2 font-heading text-2xl font-bold">Keep what worked.</h2>
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      <label className="text-xs font-semibold">Original value<input className="field mt-2" placeholder="e.g. retraction 1.2 mm" value={form.original} onChange={e => set('original', e.target.value)}/></label>
      <label className="text-xs font-semibold">New value<input className="field mt-2" placeholder="e.g. retraction 0.8 mm" value={form.adjusted} onChange={e => set('adjusted', e.target.value)}/></label>
      <label className="text-xs font-semibold">Result<select className="field mt-2" value={form.outcome} onChange={e => set('outcome', e.target.value)}>{['Improved', 'No change', 'Worse', 'Not tested yet'].map(o => <option key={o}>{o}</option>)}</select></label>
      <label className="text-xs font-semibold">Notes<input className="field mt-2" placeholder="Anything worth remembering" value={form.notes} onChange={e => set('notes', e.target.value)}/></label>
    </div>
    <div className="mt-7 flex flex-wrap gap-3">
      <StepNav onBack={onBack} onNext={save} nextLabel="Save to history"/>
      {history.length > 0 && <button className="button-secondary" onClick={download}>Download JSON<Download size={15}/></button>}
    </div>
    <p className="mt-4 text-[10px] leading-5 text-gray-400">Saved entries stay in this browser only — labeled user-entered, not verified. Cross-device calibration history arrives with user accounts in a later release.</p>
    {history.length > 0 && <div className="mt-8">
      <h3 className="text-xs font-bold">Saved on this device</h3>
      <div className="mt-3 space-y-2">{history.slice(0, 5).map((r, i) => <div key={i} className="panel flex flex-wrap items-center justify-between gap-2 p-3.5 text-xs">
        <span className="font-semibold">{r.problem} · {r.test}</span>
        <span className="text-gray-400">{new Date(r.date).toLocaleDateString()}</span>
        <span className={`rounded px-2 py-1 text-[10px] font-semibold ${r.outcome === 'Improved' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{r.outcome}</span>
      </div>)}</div>
    </div>}
  </div>;
}