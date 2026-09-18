import { useState, useEffect } from 'react';

export function useCatalog() {
  const [catalog, setCatalog] = useState({ tools: [], problems: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Basic fallback catalog state
    setCatalog({
      tools: [],
      problems: []
    });
  }, []);

  return { catalog, loading };
}

export default useCatalog;