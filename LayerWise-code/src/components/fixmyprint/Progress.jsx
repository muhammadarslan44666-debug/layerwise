export default function Progress({ step, labels }) {
  return <ol className="mb-10 flex flex-wrap gap-2 text-[10px] font-semibold">
    {labels.map((l, i) => {
      const state = i === step ? 'current' : i < step ? 'done' : 'todo';
      return <li key={l} className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 ${state === 'current' ? 'border-orange-300 bg-orange-50 text-orange-700' : state === 'done' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-400'}`}>
        <span className="font-mono">{String(i + 1).padStart(2, '0')}</span><span>{l}</span>
      </li>;
    })}
  </ol>;
}