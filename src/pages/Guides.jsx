import PageIntro from '@/components/shared/PageIntro';
import GuideCard from '@/components/cards/GuideCard';
import { guides } from '@/components/data/guides';
export default function Guides(){return <div className="container-page py-10 pb-20"><PageIntro eyebrow="FROM THE WORKBENCH" title="Understand the why." description="Focused field guides that connect the symptom, the tool and the retest. No endless list of settings to copy."/><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{guides.map((g,i)=><GuideCard guide={g} key={g.slug} index={i}/>)}</div></div>;}