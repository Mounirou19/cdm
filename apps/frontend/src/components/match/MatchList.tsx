"use client";

import { MatchCard } from "./MatchCard";
import { MatchCardSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import type { Match } from "@cdm/shared";

interface MatchListProps {
  matches: Match[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
  emptyMessage?: string;
}

export function MatchList({ matches, isLoading, error, emptyMessage = "Aucun match trouvé" }: MatchListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <MatchCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) return <ErrorMessage message={error.message} />;
  if (!matches?.length) return <p className="text-center text-gray-500 py-8">{emptyMessage}</p>;

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}
