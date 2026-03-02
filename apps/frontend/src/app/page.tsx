"use client";

import { useFetch } from "@/hooks/useFetch";
import { useMatchUpdates } from "@/hooks/useMatchUpdates";
import { MatchList } from "@/components/match/MatchList";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import type { Match } from "@cdm/shared";

export default function HomePage() {
  const { data: liveMatches, isLoading: liveLoading, error: liveError } = useFetch<Match[]>("/matches/live");
  const { data: todayMatches, isLoading: todayLoading, error: todayError } = useFetch<Match[]>("/matches/today");

  const { matches: liveMUpdated } = useMatchUpdates(liveMatches || []);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-2xl p-8 text-white text-center">
        <h1 className="text-4xl font-extrabold mb-2">Coupe du Monde FIFA 2026</h1>
        <p className="text-primary-200 text-lg">USA - Mexique - Canada</p>
      </div>

      {/* Live Matches */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Matchs en direct</h2>
          {liveMUpdated.length > 0 && <LiveIndicator />}
        </div>
        <MatchList
          matches={liveMUpdated.length > 0 ? liveMUpdated : liveMatches}
          isLoading={liveLoading}
          error={liveError}
          emptyMessage="Aucun match en direct actuellement"
        />
      </section>

      {/* Today's Matches */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Matchs du jour</h2>
        <MatchList
          matches={todayMatches}
          isLoading={todayLoading}
          error={todayError}
          emptyMessage="Aucun match prévu aujourd'hui"
        />
      </section>
    </div>
  );
}
