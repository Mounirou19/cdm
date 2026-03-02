"use client";

import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { MatchList } from "@/components/match/MatchList";
import { PhaseNavigation } from "@/components/ui/PhaseNavigation";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { SLUG_TO_PHASE, PHASE_LABELS } from "@cdm/shared";
import type { Match } from "@cdm/shared";

export default function PhasePage() {
  const { slug } = useParams<{ slug: string }>();
  const phase = SLUG_TO_PHASE[slug];
  const { data: matches, isLoading, error } = useFetch<Match[]>(
    phase ? `/phases/${slug}/matches` : null
  );

  if (!phase) return <ErrorMessage message="Phase non trouvée" />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{PHASE_LABELS[phase]}</h1>
      <PhaseNavigation />
      <MatchList matches={matches} isLoading={isLoading} error={error} />
    </div>
  );
}
