import Link from "next/link";
import { TeamBadge } from "@/components/team/TeamBadge";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { isLiveStatus, STATUS_LABELS, PHASE_LABELS, type Match } from "@cdm/shared";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const isLive = isLiveStatus(match.status);
  const isFinished = match.status === "FINISHED";
  const date = new Date(match.dateUtc);

  return (
    <Link href={`/matches/${match.id}`}>
      <div
        className={`bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow ${
          isLive ? "border-red-300 ring-1 ring-red-100" : "border-gray-200"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500">
            {PHASE_LABELS[match.phase]} {match.group ? `- Groupe ${match.group.name}` : ""}
          </span>
          {isLive ? (
            <LiveIndicator />
          ) : (
            <span className={`text-xs font-medium ${isFinished ? "text-gray-500" : "text-primary-600"}`}>
              {STATUS_LABELS[match.status]}
            </span>
          )}
        </div>

        {/* Teams and Score */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <TeamBadge team={match.homeTeam ?? undefined} />
          </div>

          <div className="px-4 text-center min-w-[80px]">
            {match.homeScore !== null && match.awayScore !== null ? (
              <div className={`text-2xl font-bold ${isLive ? "text-red-600" : ""}`}>
                {match.homeScore} - {match.awayScore}
              </div>
            ) : (
              <div className="text-lg text-gray-400">
                {date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </div>
            )}
            {isLive && match.minute && (
              <span className="text-xs text-red-500 font-medium">{match.minute}&apos;</span>
            )}
            {match.homePenalties !== null && match.awayPenalties !== null && (
              <div className="text-xs text-gray-500">
                (TAB {match.homePenalties} - {match.awayPenalties})
              </div>
            )}
          </div>

          <div className="flex-1 text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="font-medium text-sm">
                {match.awayTeam?.name || "TBD"}
              </span>
              {match.awayTeam?.flagUrl ? (
                <img
                  src={match.awayTeam.flagUrl}
                  alt={match.awayTeam.name}
                  className="w-8 h-5 object-cover rounded-sm"
                />
              ) : (
                <div className="w-8 h-5 bg-gray-200 rounded-sm flex items-center justify-center text-[8px] text-gray-500 font-bold">
                  {match.awayTeam?.code || "?"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <span>{date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}</span>
          {match.stadium && <span>{match.stadium.name}</span>}
        </div>
      </div>
    </Link>
  );
}
