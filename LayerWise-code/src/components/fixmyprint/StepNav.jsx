import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function StepNav({ onBack, onNext, nextLabel = 'Continue', back = true }) {
  return <div className="mt-7 flex flex-wrap gap-3">
    {back && <button className="button-secondary" onClick={onBack}><ArrowLeft size={15}/>Back</button>}
    <button className="button-primary" onClick={onNext}>{nextLabel}<ArrowRight size={15}/></button>
  </div>;
}