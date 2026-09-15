import { Link, useLocation } from 'react-router-dom';
import PageIntro from '@/components/shared/PageIntro';
import { legal } from '@/components/data/legal';
import NotFound from '@/pages/NotFound';
export default function Legal(){const key=useLocation().pathname.split('/').filter(Boolean)[0];const page=legal[key];if(!page)return <NotFound/>;return <div className="container-page py-10 pb-20"><PageIntro {...page}/><article className="max-w-3xl space-y-8">{page.sections.map(([heading,text],i)=><section id={heading==='Source standards'?'sources':`section-${i}`} key={heading}><h2 className="font-heading text-xl font-bold">{heading}</h2><p className="body-copy mt-3">{text}</p></section>)}<Link to="/contact/" className="button-secondary">Contact & corrections →</Link></article></div>;}