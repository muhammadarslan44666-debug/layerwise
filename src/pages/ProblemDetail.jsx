import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCatalog } from '../hooks/useCatalog';

export default function ProblemDetail() {
  const { id } = useParams();
  const { catalog, loading } = useCatalog();

  // Safe checks for problems array
  const problemsList = Array.isArray(catalog?.problems)
    ? catalog.problems
    : Array.isArray(catalog)
    ? catalog
    : [];

  // Safe .find call
  const problem = Array.isArray(problemsList)
    ? problemsList.find((p) => p?.slug === id || p?.id === id)
    : null;

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium">
        Loading troubleshooting details...
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="max-w-xl mx-auto my-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Problem Not Found</h2>
        <p className="text-sm text-gray-600">
          The selected troubleshooting issue could not be found.
        </p>
        <Link
          to="/troubleshooting"
          className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
        >
          Back to Troubleshooting
        </Link>
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