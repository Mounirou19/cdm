"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import { MatchList } from "@/components/match/MatchList";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import type { Team, Group, Match } from "@cdm/shared";

type TeamDetail = Team & { group?: Group };

export default function TeamDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: team, isLoading, error } = useFetch<TeamDetail>(`/teams/${id}`);
  const { data: matches, isLoading: matchesLoading } = useFetch<Match[]>(`/teams/${id}/matches`);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton className="h-8 w-48" />
        <LoadingSkeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error) return <ErrorMessage message={error.message} />;
  if (!team) return <ErrorMessage message="Équipe non trouvée" />;

  return (
    <div className="space-y-6">
      <Link href="/teams" className="text-primary-600 hover:underline text-sm">&larr; Retour aux équipes</Link>

      {/* Team Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-4">
          {team.flagUrl ? (
            <img
              src={team.flagUrl}
              alt={team.name}
              className="w-16 h-11 object-cover rounded shadow"
            />
          ) : (
            <div className="w-16 h-11 bg-gray-200 rounded shadow flex items-center justify-center text-sm text-gray-500 font-bold">
              {team.code}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{team.name}</h1>
            <p className="text-gray-500">
              {team.code} · {team.confederation}
              {team.group && ` · Groupe ${team.group.name}`}
            </p>
          </div>
        </div>
      </div>

      {/* Team Matches */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Matchs</h2>
        <MatchList matches={matches} isLoading={matchesLoading} />
      </div>
    </div>
  );
}
