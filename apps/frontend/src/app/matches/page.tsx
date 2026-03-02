"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { MatchList } from "@/components/match/MatchList";
import { PhaseNavigation } from "@/components/ui/PhaseNavigation";
import type { Match } from "@cdm/shared";

export default function MatchesPage() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const params = statusFilter ? `?status=${statusFilter}` : "";
  const { data: matches, isLoading, error } = useFetch<Match[]>(`/matches${params}`);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Tous les matchs</h1>

      <PhaseNavigation />

      <div className="flex gap-2 flex-wrap">
        {[
          { value: "", label: "Tous" },
          { value: "SCHEDULED", label: "Programmés" },
          { value: "IN_PLAY", label: "En cours" },
          { value: "FINISHED", label: "Terminés" },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setStatusFilter(value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              statusFilter === value
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <MatchList matches={matches} isLoading={isLoading} error={error} />
    </div>
  );
}
