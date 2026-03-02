import { config } from "../config";

interface ExternalMatch {
  id: number;
  status: string;
  score: {
    fullTime: { home: number | null; away: number | null };
    penalties?: { home: number | null; away: number | null };
  };
  minute?: number;
}

export const footballDataAdapter = {
  isConfigured(): boolean {
    return !!config.footballDataApiKey;
  },

  async fetchLiveMatches(): Promise<ExternalMatch[]> {
    if (!this.isConfigured()) return [];

    try {
      const res = await fetch("https://api.football-data.org/v4/competitions/WC/matches?status=LIVE", {
        headers: { "X-Auth-Token": config.footballDataApiKey },
      });
      if (!res.ok) return [];
      const data = await res.json();
      return data.matches || [];
    } catch {
      console.warn("Failed to fetch from football-data.org");
      return [];
    }
  },

  async fetchAllMatches(): Promise<ExternalMatch[]> {
    if (!this.isConfigured()) return [];

    try {
      const res = await fetch("https://api.football-data.org/v4/competitions/WC/matches", {
        headers: { "X-Auth-Token": config.footballDataApiKey },
      });
      if (!res.ok) return [];
      const data = await res.json();
      return data.matches || [];
    } catch {
      console.warn("Failed to fetch from football-data.org");
      return [];
    }
  },
};
