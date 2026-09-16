import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function useCatalog() {
  const printersQuery = useQuery({
    queryKey: ['printers'],
    queryFn: () => base44.entities.Printer.list(),
  });

  const filamentsQuery = useQuery({
    queryKey: ['filaments'],
    queryFn: () => base44.entities.Filament.list(),
  });

  const toolsQuery = useQuery({
    queryKey: ['tools'],
    queryFn: () => base44.entities.Tool.list(),
  });

  const problemsQuery = useQuery({
    queryKey: ['problems'],
    queryFn: () => base44.entities.Problem.list(),
  });

  // Extract data safely, checking for both array structures or nested data properties
  const printersRaw = printersQuery.data?.items || printersQuery.data;
  const filamentsRaw = filamentsQuery.data?.items || filamentsQuery.data;
  const toolsRaw = toolsQuery.data?.items || toolsQuery.data;
  const problemsRaw = problemsQuery.data?.items || problemsQuery.data;

  return {
    printers: Array.isArray(printersRaw) ? printersRaw : [],
    filaments: Array.isArray(filamentsRaw) ? filamentsRaw : [],
    tools: Array.isArray(toolsRaw) ? toolsRaw : [],
    problems: Array.isArray(problemsRaw) ? problemsRaw : [],
    isLoading:
      printersQuery.isLoading ||
      filamentsQuery.isLoading ||
      toolsQuery.isLoading ||
      problemsQuery.isLoading,
    isError:
      printersQuery.isError ||
      filamentsQuery.isError ||
      toolsQuery.isError ||
      problemsQuery.isError,
  };
}