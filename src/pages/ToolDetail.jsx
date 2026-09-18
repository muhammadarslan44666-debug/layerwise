import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ToolForm from '../components/tools/ToolForm';
import { useCatalog } from '../hooks/useCatalog';

export default function ToolDetail() {
  const { id } = useParams();
  const { catalog, loading } = useCatalog();

  const toolsList = Array.isArray(catalog?.tools) ? catalog.tools : [];

  // ID या Slug से टूल ढूँढें या फिर Dynamic Fallback बनाएँ
  const tool = toolsList.find((t) => t?.slug === id || t?.id === id) || {
    id: id,
    slug: id,
    name: id ? id.replace(/-/g, ' ').toUpperCase() : 'Calibration Tool',
    description: 'Interactive calibration tool for 3D printer parameters.'
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium">
        Loading tool parameters...
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

      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        {ToolForm ? (
          <ToolForm tool={tool} />
        ) : (
          <div className="p-4 bg-gray-50 text-gray-600 rounded">
            Tool interface is currently loading...
          </div>
        )}
      </div>
    </div>
  );
}