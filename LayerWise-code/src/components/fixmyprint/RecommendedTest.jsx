import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import StepNav from '@/components/fixmyprint/StepNav';

export default function RecommendedTest({ problem, tool, toolUrl, onBack, onNext }) {
  return <div>
    <p className="eyebrow">STEP 7 · RECOMMENDED TEST</p>
    <h2 className="mt-2 font-heading text-2xl font-bold">{problem ? (tool ? `Recommended next step: run the ${tool.name} test` : 'Recommended next step: check the machine first') : 'Recommended next step'}</h2>
    {problem ? <>
      <p className="mt-3 text-sm leading-7 text-gray-600">{problem.test}</p>
      <h3 className="mt-7 font-heading text-lg font-bold">What to look for</h3>
      <p className="mt-2 text-sm leading-7 text-gray-600">{problem.interpret}</p>
      <h3 className="mt-7 font-heading text-lg font-bold">What setting may need investigation</h3>
      <p className="mt-2 text-sm leading-7 text-gray-600">{problem.parameter}</p>
      <div className="mt-7"><Link className="button-primary" to={toolUrl}>{tool ? `Open the ${tool.name} tool` : 'Find manufacturer documentation'}<ArrowRight size={15}/></Link></div>
    </> : <p className="mt-3 text-sm leading-7 text-gray-600">Pick a specific symptom from the <Link className="text-orange-600 underline" to="/troubleshooting/">troubleshooting index</Link> to get a recommended test — or continue to record your own test below.</p>}
    <StepNav onBack={onBack} onNext={onNext} nextLabel="Retest & save"/>
  </div>;
}