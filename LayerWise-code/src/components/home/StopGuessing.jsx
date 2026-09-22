import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  ['01', 'Identify the problem', 'Tell us what your print looks like.'],
  ['02', 'Run the right test', 'Use the calibration test that matches the problem.'],
  ['03', 'Read the result', 'Understand what the test is showing you.'],
  ['04', 'Make one adjustment', 'Change one relevant variable at a time.'],
  ['05', 'Print again', 'Compare the result and save what worked.']
];

export default function StopGuessing() {
  return <section className="container-page section-space">
    <p className="eyebrow">HOW LAYERWISE WORKS</p>
    <h2 className="section-title mt-2">Stop guessing. Start testing.</h2>
    <p className="body-copy mt-3 max-w-2xl">No universal presets, no copy-paste settings. A guided path from symptom to a considered next adjustment.</p>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {STEPS.map(([n, t, d]) => <div className="panel p-5" key={n}>
        <span className="font-mono text-xs font-semibold text-orange-600">{n}</span>
        <h3 className="mt-3 text-sm font-bold">{t}</h3>
        <p className="mt-2 text-xs leading-5 text-gray-500">{d}</p>
      </div>)}
    </div>
    <Link className="button-primary mt-8" to="/fix-my-print/">Fix My Print<ArrowRight size={15}/></Link>
  </section>;
}