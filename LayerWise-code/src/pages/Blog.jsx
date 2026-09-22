import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageIntro from '@/components/shared/PageIntro';
import Icon from '@/components/shared/Icon';
import { blogPosts } from '@/components/data/blogPosts';

const cardColors = ['bg-[#f1f2ee] text-[#76816b]', 'bg-[#eef0f2] text-[#738292]', 'bg-[#f7eee6] text-[#b98b65]'];

export default function Blog() {
  const sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div className="container-page py-10 pb-20">
      <PageIntro
        eyebrow="FROM THE WORKBENCH"
        title="The Layerwise blog."
        description="Short, practical reads on calibration and troubleshooting — connected back to the tools and diagnostics that put the ideas into practice."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((post, i) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}/`}
            className="group overflow-hidden rounded-xl border border-gray-200"
          >
            <div className={`relative flex h-36 items-center justify-center ${cardColors[i % 3]}`}>
              <div className="absolute inset-5 border border-current opacity-10" />
              <Icon name={post.coverImage} size={52} strokeWidth={1} />
            </div>
            <div className="p-5">
              <p className="mb-2 text-[9px] font-bold tracking-widest text-orange-600">
                {post.tags?.join(' · ')}
              </p>
              <h2 className="font-heading text-[16px] font-bold leading-6">{post.title}</h2>
              <p className="mt-2 text-xs leading-5 text-gray-500">{post.summary}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold">
                  Read post
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
