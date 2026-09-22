import { printers } from '@/components/data/printers';
import { filaments } from '@/components/data/filaments';

// Printers and filaments are static, source-transparent reference data —
// the same pattern already used for tools.js, problems.js and guides.js.
// This intentionally does not depend on a Base44 backend/catalog, so the
// Printers and Filaments sections work the same locally and in production,
// with or without VITE_BASE44_APP_BASE_URL configured.
export default function useCatalog() {
  return {
    printers,
    filaments,
    loading: false,
    error: false,
  };
}
