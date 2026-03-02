"use client";

import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import type { Team, Group } from "@cdm/shared";

type TeamWithGroup = Team & { group?: Group };

export default function TeamsPage() {
  const { data: teams, isLoading, error } = useFetch<TeamWithGroup[]>("/teams");

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Équipes</h1>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <LoadingSkeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Équipes ({teams?.length || 0})</h1>
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teams?.map((team) => (
          <Link
            key={team.id}
            href={`/teams/${team.id}`}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow flex items-center gap-3"
          >
            {team.flagUrl ? (
              <img
                src={team.flagUrl}
                alt={team.name}
                className="w-10 h-7 object-cover rounded-sm"
              />
            ) : (
              <div className="w-10 h-7 bg-gray-200 rounded-sm flex items-center justify-center text-xs text-gray-500 font-bold">
                {team.code}
              </div>
            )}
            <div>
              <p className="font-medium text-sm">{team.name}</p>
              <p className="text-xs text-gray-400">
                Groupe {team.group?.name || "—"} · {team.confederation}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
