"use client";

import { useFetch } from "@/hooks/useFetch";
import { GroupCard } from "@/components/group/GroupCard";
import { GroupCardSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import type { Group, GroupStanding, Team } from "@cdm/shared";

type GroupWithStandings = Group & { standings: (GroupStanding & { team: Team })[] };

export default function GroupsPage() {
  const { data: groups, isLoading, error } = useFetch<GroupWithStandings[]>("/groups");

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Groupes</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => <GroupCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Groupes</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups?.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
