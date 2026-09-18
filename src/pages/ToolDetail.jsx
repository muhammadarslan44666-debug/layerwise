import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ToolForm from '../components/tools/ToolForm';
import ToolResult from '../components/tools/ToolResult';
import { useCatalog } from '../hooks/useCatalog';

export default function ToolDetail() {
  const { id } = useParams();
  const catalogData = useCatalog ? useCatalog() : {};
  const catalog = catalogData?.catalog || catalogData;
  const loading = catalogData?.loading || false;

  const toolsList = Array.isArray(catalog?.tools)
    ? catalog.tools
    : Array.isArray(catalog)
    ? catalog
    : [];

  const tool = Array.isArray(toolsList)
    ? toolsList.find((t) => t?.slug === id || t?.id === id)
    : null;

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium">
        Loading tool parameters...
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="max-w-xl mx-auto my-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Tool Not Found</h2>
        <p className="text-sm text-gray-600">
          The requested calibration tool could not be found or loaded.
        </p>
        <Link
          to="/tools"
          className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
        >
          Back to Tools List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <Link
        to="/tools"
        className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1 font-medium"
      >
        &larr; Back to Tools
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
        {tool.description && (
          <p className="text-gray-600 mt-1">{tool.description}</p>
        )}
      </div>

      <ToolForm tool={tool} />
    </div>
  );
}