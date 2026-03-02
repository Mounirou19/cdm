const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }
  const json = await res.json();
  return json.data;
}

export const api = {
  // Matches
  getMatches: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return fetcher<unknown[]>(`/matches${qs}`);
  },
  getMatch: (id: number) => fetcher<unknown>(`/matches/${id}`),
  getLiveMatches: () => fetcher<unknown[]>("/matches/live"),
  getTodayMatches: () => fetcher<unknown[]>("/matches/today"),
  getMatchEvents: (id: number) => fetcher<unknown[]>(`/matches/${id}/events`),

  // Teams
  getTeams: () => fetcher<unknown[]>("/teams"),
  getTeam: (id: number) => fetcher<unknown>(`/teams/${id}`),
  getTeamMatches: (id: number) => fetcher<unknown[]>(`/teams/${id}/matches`),

  // Groups
  getGroups: () => fetcher<unknown[]>("/groups"),
  getGroup: (name: string) => fetcher<unknown>(`/groups/${name}`),
  getGroupStandings: (name: string) => fetcher<unknown[]>(`/groups/${name}/standings`),
  getGroupMatches: (name: string) => fetcher<unknown[]>(`/groups/${name}/matches`),

  // Phases
  getPhases: () => fetcher<unknown[]>("/phases"),
  getPhaseMatches: (slug: string) => fetcher<unknown[]>(`/phases/${slug}/matches`),

  // Stadiums
  getStadiums: () => fetcher<unknown[]>("/stadiums"),
  getStadium: (id: number) => fetcher<unknown>(`/stadiums/${id}`),

  // Standings
  getStandings: () => fetcher<unknown[]>("/standings"),
};

// SWR fetcher
export const swrFetcher = (url: string) => fetcher(url);

export { API_BASE };
