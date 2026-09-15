import { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import StopGuessing from '@/components/home/StopGuessing';
import CatalogPreview from '@/components/home/CatalogPreview';
import GettingStarted from '@/components/home/GettingStarted';
import SectionHeading from '@/components/shared/SectionHeading';
import ProblemCard from '@/components/cards/ProblemCard';
import ToolCard from '@/components/cards/ToolCard';
import GuideCard from '@/components/cards/GuideCard';
import { problems } from '@/components/data/problems';
import { tools } from '@/components/data/tools';
import { guides } from '@/components/data/guides';
export default function Home(){useEffect(()=>{document.title='Layerwise · Fix your 3D print, one test at a time.';const meta=document.querySelector('meta[name="description"]');if(meta)meta.content='A source-transparent 3D printer troubleshooting and calibration assistant. Find your problem, run a focused test, interpret the result and retest.';},[]);return <><Hero/><StopGuessing/><section className="bg-[#f7f8f9] section-space"><div className="container-page"><SectionHeading eyebrow="LET’S FIGURE IT OUT" title="What problem are you having?" description="Pick what you see. We’ll help you work out what to do next." link="/troubleshooting/" label="All troubleshooting"/><div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">{problems.map(p=><ProblemCard key={p.slug} problem={p}/>)}</div></div></section><section className="container-page section-space"><SectionHeading eyebrow="LESS TWEAKING. MORE UNDERSTANDING." title="Popular calibration tools" description="Purpose-built tools that explain the why, not just the number." link="/tools/" label="Explore all 8 tools"/><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{tools.map(t=><ToolCard key={t.slug} tool={t}/>)}</div></section><div className="border-t border-gray-100"><CatalogPreview/></div><GettingStarted/><section className="container-page pb-20"><SectionHeading eyebrow="KNOW YOUR PRINTER BETTER" title="A little knowledge goes a long way." description="Practical field notes, connected to your next test." link="/guides/" label="Browse guides"/><div className="grid gap-6 md:grid-cols-3">{[guides[0],guides[3],guides[2]].map((g,i)=><GuideCard guide={g} index={i} key={g.slug}/>)}</div></section></>;}