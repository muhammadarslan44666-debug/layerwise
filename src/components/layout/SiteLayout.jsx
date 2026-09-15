import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
export default function SiteLayout(){return <div className="flex min-h-screen flex-col"><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-2 focus:z-50 focus:bg-white focus:p-3">Skip to content</a><Header/><main id="main-content" className="flex-1"><Outlet/></main><Footer/></div>;}