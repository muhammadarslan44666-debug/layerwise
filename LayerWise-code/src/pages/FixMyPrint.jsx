import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageIntro from '@/components/shared/PageIntro';
import Progress from '@/components/fixmyprint/Progress';
import ProblemPicker from '@/components/fixmyprint/ProblemPicker';
import SetupStep from '@/components/fixmyprint/SetupStep';
import Diagnosis from '@/components/fixmyprint/Diagnosis';
import RecommendedTest from '@/components/fixmyprint/RecommendedTest';
import ResultLogger from '@/components/fixmyprint/ResultLogger';
import { getProblem, problemOptions, setupSteps } from '@/components/fixmyprint/wizardData';
import { tools } from '@/components/data/tools';

const STEP_LABELS = ['Problem', 'Printer', 'Filament', 'Slicer', 'Nozzle', 'Diagnosis', 'Test', 'Retest & save'];

export default function FixMyPrint() {
  const [params] = useSearchParams();
  const preset = problemOptions.find(o => o.slug === params.get('problem')) || null;
  const [option, setOption] = useState(preset);
  const [setup, setSetup] = useState({});
  const [step, setStep] = useState(preset ? 1 : 0);
  useEffect(() => { document.title = 'Fix My Print | Layerwise'; }, []);
  const problem = option ? getProblem(option.slug) : null;
  const tool = problem ? tools.find(t => t.slug === problem.tool) : null;
  const query = new URLSearchParams(Object.entries(setup).filter(([, v]) => v)).toString();
  const toolUrl = tool ? `/tools/${tool.slug}/${query ? `?${query}` : ''}` : '/printers/';

  return <div className="container-page py-10 pb-20">
    <PageIntro eyebrow="GUIDED WORKFLOW" title="Fix my print."
      description="Answer a few quick questions about what you see and what you’re printing with. We’ll point you to the right test, how to read it, and what to investigate next — no guesswork."/>
    <div className="max-w-3xl">
      <Progress step={step} labels={STEP_LABELS}/>
      {step === 0 && <ProblemPicker value={option} onPick={o => { setOption(o); setStep(1); }}/>}
      {step >= 1 && step <= 4 && <SetupStep key={step} index={step} config={setupSteps[step - 1]} values={setup}
        onChange={(k, v) => setSetup(s => ({ ...s, [k]: v }))} onBack={() => setStep(step - 1)} onNext={() => setStep(step + 1)}/>}
      {step === 5 && <Diagnosis option={option} setup={setup} onBack={() => setStep(4)} onNext={() => setStep(6)}/>}
      {step === 6 && <RecommendedTest problem={problem} tool={tool} toolUrl={toolUrl} onBack={() => setStep(5)} onNext={() => setStep(7)}/>}
      {step === 7 && <ResultLogger option={option} problem={problem} setup={setup} tool={tool} onBack={() => setStep(6)}/>}
    </div>
  </div>;
}