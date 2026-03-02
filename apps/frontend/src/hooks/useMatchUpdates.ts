"use client";

import { useEffect, useState, useCallback } from "react";
import { getSocket } from "@/lib/socket";
import type { Match } from "@cdm/shared";

export function useMatchUpdates(initialMatches: Match[]) {
  const [matches, setMatches] = useState<Match[]>(initialMatches);

  useEffect(() => {
    setMatches(initialMatches);
  }, [initialMatches]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket.connected) socket.connect();

    socket.emit("subscribe:live");

    const handleUpdate = (updatedMatch: Match) => {
      setMatches((prev) =>
        prev.map((m) => (m.id === updatedMatch.id ? updatedMatch : m))
      );
    };

    socket.on("match:update", handleUpdate);

    return () => {
      socket.off("match:update", handleUpdate);
      socket.emit("unsubscribe:live");
    };
  }, []);

  const refresh = useCallback((newMatches: Match[]) => {
    setMatches(newMatches);
  }, []);

  return { matches, refresh };
}

export function useSingleMatchUpdates(matchId: number, initialMatch: Match | null) {
  const [match, setMatch] = useState<Match | null>(initialMatch);

  useEffect(() => {
    setMatch(initialMatch);
  }, [initialMatch]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket.connected) socket.connect();

    socket.emit("subscribe:match", matchId);

    socket.on("match:update", (updatedMatch: Match) => {
      if (updatedMatch.id === matchId) {
        setMatch(updatedMatch);
      }
    });

    return () => {
      socket.off("match:update");
      socket.emit("unsubscribe:match", matchId);
    };
  }, [matchId]);

  return match;
}
