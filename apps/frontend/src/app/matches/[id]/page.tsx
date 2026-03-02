"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import { useSingleMatchUpdates } from "@/hooks/useMatchUpdates";
import { TeamBadge } from "@/components/team/TeamBadge";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { isLiveStatus, STATUS_LABELS, PHASE_LABELS, type Match, type MatchEvent } from "@cdm/shared";

export default function MatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: matchData, isLoading, error } = useFetch<Match>(`/matches/${id}`);
  const { data: events } = useFetch<MatchEvent[]>(`/matches/${id}/events`);
  const match = useSingleMatchUpdates(parseInt(id, 10), matchData ?? null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton className="h-8 w-48" />
        <LoadingSkeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error) return <ErrorMessage message={error.message} />;
  if (!match) return <ErrorMessage message="Match non trouvé" />;

  const isLive = isLiveStatus(match.status);
  const date = new Date(match.dateUtc);

  return (
    <div className="space-y-6">
      <Link href="/matches" className="text-primary-600 hover:underline text-sm">&larr; Retour aux matchs</Link>

      {/* Match Header */}
      <div className={`bg-white rounded-xl shadow-sm border p-8 ${isLive ? "border-red-300" : "border-gray-200"}`}>
        <div className="text-center mb-4">
          <span className="text-sm text-gray-500">
            {PHASE_LABELS[match.phase]}{match.group ? ` - Groupe ${match.group.name}` : ""}
          </span>
          {isLive && <div className="mt-1"><LiveIndicator /></div>}
        </div>

        <div className="flex items-center justify-center gap-8">
          <div className="text-center flex-1">
            <TeamBadge team={match.homeTeam ?? undefined} size="lg" />
          </div>

          <div className="text-center min-w-[120px]">
            {match.homeScore !== null && match.awayScore !== null ? (
              <div className={`text-5xl font-extrabold ${isLive ? "text-red-600" : ""}`}>
                {match.homeScore} - {match.awayScore}
              </div>
            ) : (
              <div className="text-2xl text-gray-400">vs</div>
            )}
            {isLive && match.minute && (
              <p className="text-red-500 font-medium mt-1">{match.minute}&apos;</p>
            )}
            {!isLive && (
              <p className="text-sm text-gray-500 mt-1">{STATUS_LABELS[match.status]}</p>
            )}
            {match.homePenalties !== null && match.awayPenalties !== null && (
              <p className="text-sm text-gray-500">(TAB {match.homePenalties} - {match.awayPenalties})</p>
            )}
          </div>

          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-2">
              {match.awayTeam?.flagUrl ? (
                <img
                  src={match.awayTeam.flagUrl}
                  alt={match.awayTeam.name}
                  className="w-10 h-7 object-cover rounded-sm"
                />
              ) : (
                <div className="w-10 h-7 bg-gray-200 rounded-sm flex items-center justify-center text-xs text-gray-500 font-bold">
                  {match.awayTeam?.code || "?"}
                </div>
              )}
              <span className="text-base font-medium">{match.awayTeam?.name || "TBD"}</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 text-sm text-gray-400">
          <p>{date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
          <p>{date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</p>
          {match.stadium && <p className="mt-1">{match.stadium.name}, {match.stadium.city}</p>}
        </div>
      </div>

      {/* Events Timeline */}
      {events && events.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Événements du match</h2>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm font-mono text-gray-500 w-12 text-right">
                  {event.minute}&apos;{event.extraMinute ? `+${event.extraMinute}` : ""}
                </span>
                <EventIcon type={event.type} />
                <div>
                  <span className="font-medium text-sm">{event.playerName || "—"}</span>
                  {event.detail && <span className="text-xs text-gray-500 ml-2">({event.detail})</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EventIcon({ type }: { type: string }) {
  const icons: Record<string, { emoji: string; color: string }> = {
    GOAL: { emoji: "⚽", color: "text-green-600" },
    OWN_GOAL: { emoji: "⚽", color: "text-red-600" },
    PENALTY_GOAL: { emoji: "⚽", color: "text-green-600" },
    PENALTY_MISS: { emoji: "❌", color: "text-red-600" },
    YELLOW_CARD: { emoji: "🟨", color: "text-yellow-500" },
    RED_CARD: { emoji: "🟥", color: "text-red-600" },
    SECOND_YELLOW: { emoji: "🟨🟥", color: "text-red-600" },
    SUBSTITUTION: { emoji: "🔄", color: "text-blue-600" },
    VAR_DECISION: { emoji: "📺", color: "text-purple-600" },
  };
  const icon = icons[type] || { emoji: "📋", color: "text-gray-600" };
  return <span className={icon.color}>{icon.emoji}</span>;
}
