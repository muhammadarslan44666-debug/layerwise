import React from 'react';

export default function ToolResult({ result, tool }) {
  if (!result) return null;

  // Safe checks for arrays
  const steps = Array.isArray(result.steps) ? result.steps : [];
  const warnings = Array.isArray(result.warnings) ? result.warnings : [];

  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-4">
      <h4 className="text-lg font-bold text-gray-800">
        Results: {tool?.name || ''}
      </h4>

      {result.summary && (
        <div className="p-3 bg-white rounded border border-gray-200">
          <p className="text-sm font-medium text-gray-900">{result.summary}</p>
        </div>
      )}

      {/* Numerical or Key-Value Outputs */}
      {result.values && typeof result.values === 'object' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(result.values).map(([key, val]) => (
            <div key={key} className="p-3 bg-white rounded border shadow-sm">
              <span className="text-xs text-gray-500 uppercase font-semibold block">
                {key.replace(/_/g, ' ')}
              </span>
              <span className="text-base font-bold text-blue-600">
                {String(val)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Warnings List */}
      {warnings.length > 0 && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-800 text-sm space-y-1">
          <strong className="block font-semibold">Warnings:</strong>
          <ul className="list-disc list-inside space-y-1">
            {warnings.map((warn, i) => (
              <li key={i}>{warn}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Steps */}
      {steps.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-sm font-semibold text-gray-700">Next Steps:</h5>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
            {steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}