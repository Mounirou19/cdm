"use client";

import { MatchCard } from "@/components/match/MatchCard";
import type { Match } from "@cdm/shared";

interface BracketViewProps {
  matches: Match[];
}

export function BracketView({ matches }: BracketViewProps) {
  const roundOf32 = matches.filter((m) => m.phase === "ROUND_OF_32");
  const roundOf16 = matches.filter((m) => m.phase === "ROUND_OF_16");
  const quarters = matches.filter((m) => m.phase === "QUARTER_FINAL");
  const semis = matches.filter((m) => m.phase === "SEMI_FINAL");
  const thirdPlace = matches.filter((m) => m.phase === "THIRD_PLACE");
  const final = matches.filter((m) => m.phase === "FINAL");

  const rounds = [
    { label: "32èmes de finale", matches: roundOf32 },
    { label: "16èmes de finale", matches: roundOf16 },
    { label: "Quarts de finale", matches: quarters },
    { label: "Demi-finales", matches: semis },
    { label: "3ème place", matches: thirdPlace },
    { label: "Finale", matches: final },
  ].filter((r) => r.matches.length > 0);

  if (!matches.length) {
    return (
      <p className="text-center text-gray-500 py-8">
        Les matchs à élimination directe n&apos;ont pas encore commencé.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {rounds.map((round) => (
        <div key={round.label}>
          <h3 className="text-lg font-bold text-gray-800 mb-3">{round.label}</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {round.matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
