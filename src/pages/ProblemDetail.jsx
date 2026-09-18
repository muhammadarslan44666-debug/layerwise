import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCatalog } from '../hooks/useCatalog';

export default function ProblemDetail() {
  const { id } = useParams();
  const { catalog, loading } = useCatalog();

  const problemsList = Array.isArray(catalog?.problems) ? catalog.problems : [];

  // Exact match search or fallback matching
  const problem = problemsList.find((p) => p?.slug === id || p?.id === id) || {
    id: id,
    slug: id,
    name: id ? id.replace(/-/g, ' ').toUpperCase() : 'Troubleshooting Guide',
    title: id ? id.replace(/-/g, ' ').toUpperCase() : 'Troubleshooting Guide',
    description: 'Dynamic resolution guide for print performance issues.',
    symptoms: ['Unusual print artifacts or dimensional deviations.'],
    solutions: [{ title: 'General Calibration', description: 'Check mechanical alignment, belt tension, and filament feed setup.' }]
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium">
        Loading troubleshooting details...
      </div>
    );
  }

  const symptoms = Array.isArray(problem.symptoms) ? problem.symptoms : [];
  const solutions = Array.isArray(problem.solutions) ? problem.solutions : [];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <Link
        to="/troubleshooting"
        className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1 font-medium"
      >
        &larr; Back to Troubleshooting
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{problem.title || problem.name}</h1>
        {problem.description && (
          <p className="text-gray-600 mt-1">{problem.description}</p>
        )}
      </div>

      {symptoms.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-2">
          <h3 className="font-semibold text-amber-900">Symptoms</h3>
          <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
            {symptoms.map((symptom, idx) => (
              <li key={idx}>{symptom}</li>
            ))}
          </ul>
        </div>
      )}

      {solutions.length > 0 && (
        <div className="p-4 bg-white border rounded-lg shadow-sm space-y-3">
          <h3 className="font-bold text-gray-800 text-lg">Recommended Solutions</h3>
          <div className="space-y-4">
            {solutions.map((sol, idx) => (
              <div key={idx} className="p-3 bg-gray-50 border rounded space-y-1">
                <h4 className="font-semibold text-gray-900">{sol.title || `Solution ${idx + 1}`}</h4>
                <p className="text-sm text-gray-600">{sol.description || sol}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}