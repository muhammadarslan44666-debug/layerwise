import { tools } from '@/components/data/tools';
import { problems } from '@/components/data/problems';
import { guides } from '@/components/data/guides';

export function searchIndex(printers, filaments, q) {
  const safeProblems = Array.isArray(problems) ? problems : [];
  const safeTools = Array.isArray(tools) ? tools : [];
  const safeGuides = Array.isArray(guides) ? guides : [];
  const safePrinters = Array.isArray(printers) ? printers : [];
  const safeFilaments = Array.isArray(filaments) ? filaments : [];

  const records = [
    ...safeProblems.map(p => ({
      title: p.name,
      description: p.short,
      text: `${p.description} ${Array.isArray(p.causes) ? p.causes.join(' ') : ''} ${p.test || ''}`,
      type: 'Troubleshooting',
      url: `/troubleshooting/${p.slug}/`
    })),
    ...safeTools.map(t => ({
      title: t.fullName,
      description: t.description,
      text: `${t.how || ''} ${t.problem || ''}`,
      type: 'Tool',
      url: `/tools/${t.slug}/`
    })),
    ...safePrinters.map(p => ({
      title: `${p.manufacturer} ${p.model}`,
      description: 'Manufacturer documentation and calibration references.',
      text: `${p.model} calibration`,
      type: 'Printer',
      url: `/printers/${p.manufacturer_slug}/${p.slug}/`
    })),
    ...safeFilaments.map(f => ({
      title: f.material,
      description: f.description,
      text: f.use_cases || '',
      type: 'Filament',
      url: `/filaments/${f.slug}/`
    })),
    ...safeGuides.map(g => ({
      title: g.title,
      description: g.description,
      text: Array.isArray(g.sections) ? g.sections.flat().join(' ') : '',
      type: 'Guide',
      url: `/guides/${g.slug}/`
    }))
  ];

  const tokens = (q || '').toLowerCase().split(/[\s-]+/).filter(Boolean);
  if (!tokens.length) return [];

  return records.map(r => {
    const m = tokens.map(t =>
      (r.title || '').toLowerCase().includes(t) ? 5 :
      (r.description || '').toLowerCase().includes(t) ? 3 :
      (r.text || '').toLowerCase().includes(t) ? 1 : 0
    );
    const hits = m.filter(Boolean).length;
    return {
      ...r,
      score: m.reduce((a, b) => a + b, 0) + (hits === tokens.length ? 4 : hits > 1 ? 2 : 0)
    };
  }).filter(r => r.score > 0).sort((a, b) => b.score - a.score);
}