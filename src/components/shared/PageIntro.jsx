import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
export default function PageIntro({eyebrow,title,description,parent}){
 useEffect(()=>{document.title=`${title} | Layerwise`;let meta=document.querySelector('meta[name="description"]');if(!meta){meta=document.createElement('meta');meta.name='description';document.head.appendChild(meta);}meta.content=description||title;},[title,description]);
 return <header className="mb-10"><div className="mb-8 flex flex-wrap items-center gap-2 text-xs text-gray-400"><Link to="/" className="hover:text-orange-600">Home</Link><ChevronRight size={12}/>{parent&&<><Link to={parent.path}>{parent.name}</Link><ChevronRight size={12}/></>}<span className="text-gray-600">{title}</span></div><p className="eyebrow mb-3">{eyebrow}</p><h1 className="font-heading text-3xl font-extrabold tracking-tight md:text-[44px] md:leading-tight">{title}</h1>{description&&<p className="body-copy mt-4 max-w-3xl">{description}</p>}</header>;
}