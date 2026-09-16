import React from 'react';

export default function ToolForm({ tool, formData = {}, onChange, onSubmit }) {
  if (!tool) return null;

  // Safe checks for fields array
  const fields = Array.isArray(tool.fields) ? tool.fields : [];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-xl font-bold mb-2">{tool.name || 'Tool Inputs'}</h3>
      {fields.length === 0 ? (
        <p className="text-gray-500">No inputs required for this tool.</p>
      ) : (
        fields.map((field) => {
          if (!field || !field.key) return null;
          
          return (
            <div key={field.key} className="flex flex-col space-y-1">
              <label htmlFor={field.key} className="text-sm font-medium text-gray-700">
                {field.label || field.key}
              </label>
              
              {field.type === 'select' ? (
                <select
                  id={field.key}
                  name={field.key}
                  value={formData[field.key] ?? field.defaultValue ?? ''}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className="p-2 border rounded-md w-full bg-white"
                >
                  {Array.isArray(field.options) &&
                    field.options.map((opt, idx) => (
                      <option key={idx} value={opt?.value ?? opt}>
                        {opt?.label ?? opt}
                      </option>
                    ))}
                </select>
              ) : (
                <input
                  type={field.type || 'number'}
                  id={field.key}
                  name={field.key}
                  step={field.step || 'any'}
                  min={field.min}
                  max={field.max}
                  value={formData[field.key] ?? field.defaultValue ?? ''}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className="p-2 border rounded-md w-full"
                  placeholder={field.placeholder || ''}
                />
              )}
              {field.description && (
                <span className="text-xs text-gray-500">{field.description}</span>
              )}
            </div>
          );
        })
      )}

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full font-semibold"
      >
        Calculate Result
      </button>
    </form>
  );
}