import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
function setMeta(attr,key,content){let el=document.querySelector(`meta[${attr}="${key}"]`);if(!el){el=document.createElement('meta');el.setAttribute(attr,key);document.head.appendChild(el);}el.setAttribute('content',content);}
export default function PageIntro({eyebrow,title,description,parent,image}){
 useEffect(()=>{
  const fullTitle=`${title} | Layerwise`;
  const desc=description||title;
  const url=typeof window!=='undefined'?window.location.href.split('#')[0]:'';
  const img=image||'https://media.base44.com/images/public/6aa188491a7c4a53d699d217/d1debad42_generated_image.png';
  document.title=fullTitle;
  setMeta('name','description',desc);
  setMeta('property','og:title',fullTitle);
  setMeta('property','og:description',desc);
  setMeta('property','og:type','article');
  setMeta('property','og:image',img);
  if(url)setMeta('property','og:url',url);
  setMeta('name','twitter:card','summary_large_image');
  setMeta('name','twitter:title',fullTitle);
  setMeta('name','twitter:description',desc);
  if(url){let link=document.querySelector('link[rel="canonical"]');if(!link){link=document.createElement('link');link.rel='canonical';document.head.appendChild(link);}link.href=url;}
 },[title,description,image]);
 return <header className="mb-10"><div className="mb-8 flex flex-wrap items-center gap-2 text-xs text-gray-400"><Link to="/" className="hover:text-orange-600">Home</Link><ChevronRight size={12}/>{parent&&<><Link to={parent.path}>{parent.name}</Link><ChevronRight size={12}/></>}<span className="text-gray-600">{title}</span></div><p className="eyebrow mb-3">{eyebrow}</p><h1 className="font-heading text-3xl font-extrabold tracking-tight md:text-[44px] md:leading-tight">{title}</h1>{description&&<p className="body-copy mt-4 max-w-3xl">{description}</p>}</header>;
}