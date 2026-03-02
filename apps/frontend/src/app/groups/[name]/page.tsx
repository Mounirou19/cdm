"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import { GroupStandings } from "@/components/group/GroupStandings";
import { MatchList } from "@/components/match/MatchList";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import type { Group, GroupStanding, Team, Match } from "@cdm/shared";

type GroupDetail = Group & { standings: (GroupStanding & { team: Team })[] };

export default function GroupDetailPage() {
  const { name } = useParams<{ name: string }>();
  const { data: group, isLoading, error } = useFetch<GroupDetail>(`/groups/${name}`);
  const { data: matches, isLoading: matchesLoading } = useFetch<Match[]>(`/groups/${name}/matches`);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton className="h-8 w-48" />
        <LoadingSkeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error) return <ErrorMessage message={error.message} />;
  if (!group) return <ErrorMessage message="Groupe non trouvé" />;

  return (
    <div className="space-y-6">
      <Link href="/groups" className="text-primary-600 hover:underline text-sm">&larr; Retour aux groupes</Link>

      <h1 className="text-3xl font-bold text-gray-800">Groupe {group.name}</h1>

      {/* Standings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Classement</h2>
        <GroupStandings standings={group.standings} />
      </div>

      {/* Matches */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Matchs du groupe</h2>
        <MatchList matches={matches} isLoading={matchesLoading} />
      </div>
    </div>
  );
}
