import Link from "next/link";
import type { GroupStanding, Team } from "@cdm/shared";

interface GroupStandingsProps {
  standings: (GroupStanding & { team?: Team })[];
  compact?: boolean;
}

export function GroupStandings({ standings, compact = false }: GroupStandingsProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-gray-500 text-xs">
            <th className="text-left py-2 px-2">#</th>
            <th className="text-left py-2 px-2">Équipe</th>
            <th className="text-center py-2 px-1">MJ</th>
            {!compact && (
              <>
                <th className="text-center py-2 px-1">G</th>
                <th className="text-center py-2 px-1">N</th>
                <th className="text-center py-2 px-1">P</th>
              </>
            )}
            <th className="text-center py-2 px-1">BP</th>
            <th className="text-center py-2 px-1">BC</th>
            <th className="text-center py-2 px-1">DB</th>
            <th className="text-center py-2 px-1 font-bold">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s, i) => (
            <tr
              key={s.id}
              className={`border-b last:border-0 ${
                i < 2 ? "bg-green-50" : i === 2 ? "bg-yellow-50" : ""
              }`}
            >
              <td className="py-2 px-2 text-gray-500">{i + 1}</td>
              <td className="py-2 px-2">
                {s.team ? (
                  <Link href={`/teams/${s.teamId}`} className="flex items-center gap-2 hover:text-primary-600">
                    {s.team.flagUrl ? (
                      <img
                        src={s.team.flagUrl}
                        alt={s.team.name}
                        className="w-5 h-3.5 object-cover rounded-sm"
                      />
                    ) : (
                      <div className="w-5 h-3.5 bg-gray-200 rounded-sm flex items-center justify-center text-[6px] text-gray-500 font-bold">
                        {s.team.code}
                      </div>
                    )}
                    <span className="font-medium">{compact ? s.team.code : s.team.name}</span>
                  </Link>
                ) : (
                  "—"
                )}
              </td>
              <td className="text-center py-2 px-1">{s.played}</td>
              {!compact && (
                <>
                  <td className="text-center py-2 px-1">{s.won}</td>
                  <td className="text-center py-2 px-1">{s.drawn}</td>
                  <td className="text-center py-2 px-1">{s.lost}</td>
                </>
              )}
              <td className="text-center py-2 px-1">{s.goalsFor}</td>
              <td className="text-center py-2 px-1">{s.goalsAgainst}</td>
              <td className="text-center py-2 px-1">{s.goalDifference}</td>
              <td className="text-center py-2 px-1 font-bold">{s.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
