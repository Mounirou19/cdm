"use client";

import { useFetch } from "@/hooks/useFetch";
import { BracketView } from "@/components/bracket/BracketView";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import type { Match } from "@cdm/shared";

export default function BracketPage() {
  const { data: r32 } = useFetch<Match[]>("/phases/round-of-32/matches");
  const { data: r16 } = useFetch<Match[]>("/phases/round-of-16/matches");
  const { data: qf } = useFetch<Match[]>("/phases/quarter-finals/matches");
  const { data: sf } = useFetch<Match[]>("/phases/semi-finals/matches");
  const { data: tp } = useFetch<Match[]>("/phases/third-place/matches");
  const { data: final, isLoading, error } = useFetch<Match[]>("/phases/final/matches");

  if (isLoading) return <LoadingSkeleton className="h-96 w-full" />;
  if (error) return <ErrorMessage message={error.message} />;

  const allMatches = [...(r32 || []), ...(r16 || []), ...(qf || []), ...(sf || []), ...(tp || []), ...(final || [])];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Tableau des éliminatoires</h1>
      <BracketView matches={allMatches} />
    </div>
  );
}
