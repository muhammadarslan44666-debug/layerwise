import { Link, useParams } from 'react-router-dom';
import { Info, CalendarDays, User } from 'lucide-react';
import PageIntro from '@/components/shared/PageIntro';
import { blogPosts } from '@/components/data/blogPosts';
import { tools } from '@/components/data/tools';
import { problems } from '@/components/data/problems';
import NotFound from '@/pages/NotFound';

export default function BlogPostDetail() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <NotFound />;

  const relatedTool = tools.find((t) => t.slug === post.relatedTool);
  const relatedProblem = problems.find((p) => p.slug === post.relatedProblem);

  return (
    <div className="container-page py-10 pb-20">
      <PageIntro
        eyebrow={post.tags?.join(' · ') || 'BLOG'}
        title={post.title}
        description={post.summary}
        parent={{ name: 'Blog', path: '/blog/' }}
      />
      <div className="mb-8 flex flex-wrap items-center gap-5 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <User size={13} />
          {post.author}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={13} />
          {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
      </div>
      <div className="grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
        <article className="space-y-9">
          {post.fullContent.map((block, i) => (
            <section key={block.heading}>
              <p className="eyebrow mb-2">0{i + 1}</p>
              <h2 className="font-heading text-xl font-bold">{block.heading}</h2>
              <p className="body-copy mt-3">{block.body}</p>
              {block.callout && (
                <div className="mt-4 flex gap-3 rounded-lg border border-orange-100 bg-orange-50 p-4 text-xs leading-6 text-orange-900">
                  <Info size={16} className="mt-0.5 shrink-0 text-orange-600" />
                  <span>{block.callout}</span>
                </div>
              )}
            </section>
          ))}
          <p className="border-t pt-5 text-xs leading-6 text-gray-400">
            Editorial content for general understanding. Where a specific setting is discussed, use the
            linked tool to calculate it from your own measurements rather than reusing a number from this
            article.
          </p>
        </article>
        <aside>
          <div className="panel p-6">
            <h2 className="mb-5 text-sm font-bold">Put this into practice</h2>
            <div className="space-y-4 text-sm text-orange-600">
              {relatedTool && (
                <Link className="block" to={`/tools/${relatedTool.slug}/`}>
                  Open {relatedTool.name} →
                </Link>
              )}
              {relatedProblem && (
                <Link className="block" to={`/troubleshooting/${relatedProblem.slug}/`}>
                  Diagnose: {relatedProblem.name} →
                </Link>
              )}
              <Link className="block" to="/blog/">
                All blog posts →
              </Link>
              <Link className="block" to="/guides/">
                Field guides →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
