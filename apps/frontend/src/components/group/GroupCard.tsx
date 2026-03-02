import Link from "next/link";
import { GroupStandings } from "./GroupStandings";
import type { Group, GroupStanding, Team } from "@cdm/shared";

interface GroupCardProps {
  group: Group & { standings?: (GroupStanding & { team?: Team })[] };
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <Link
        href={`/groups/${group.name}`}
        className="block bg-primary-600 text-white px-4 py-2 font-bold hover:bg-primary-700 transition-colors"
      >
        Groupe {group.name}
      </Link>
      <div className="p-2">
        {group.standings && group.standings.length > 0 ? (
          <GroupStandings standings={group.standings} compact />
        ) : (
          <div className="p-4 text-center text-gray-400 text-sm">Aucun classement</div>
        )}
      </div>
    </div>
  );
}
