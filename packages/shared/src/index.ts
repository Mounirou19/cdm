// Enums
export enum MatchStatus {
  SCHEDULED = "SCHEDULED",
  TIMED = "TIMED",
  IN_PLAY = "IN_PLAY",
  PAUSED = "PAUSED",
  HALF_TIME = "HALF_TIME",
  EXTRA_TIME = "EXTRA_TIME",
  PENALTY_SHOOTOUT = "PENALTY_SHOOTOUT",
  FINISHED = "FINISHED",
  SUSPENDED = "SUSPENDED",
  POSTPONED = "POSTPONED",
  CANCELLED = "CANCELLED",
}

export enum Phase {
  GROUP_STAGE = "GROUP_STAGE",
  ROUND_OF_32 = "ROUND_OF_32",
  ROUND_OF_16 = "ROUND_OF_16",
  QUARTER_FINAL = "QUARTER_FINAL",
  SEMI_FINAL = "SEMI_FINAL",
  THIRD_PLACE = "THIRD_PLACE",
  FINAL = "FINAL",
}

export enum EventType {
  GOAL = "GOAL",
  OWN_GOAL = "OWN_GOAL",
  PENALTY_GOAL = "PENALTY_GOAL",
  PENALTY_MISS = "PENALTY_MISS",
  YELLOW_CARD = "YELLOW_CARD",
  RED_CARD = "RED_CARD",
  SECOND_YELLOW = "SECOND_YELLOW",
  SUBSTITUTION = "SUBSTITUTION",
  VAR_DECISION = "VAR_DECISION",
}

// Entity types
export interface Stadium {
  id: number;
  name: string;
  city: string;
  country: string;
  capacity: number;
  imageUrl?: string | null;
}

export interface Team {
  id: number;
  name: string;
  code: string;
  flagUrl?: string | null;
  confederation: string;
  groupId?: number | null;
}

export interface Group {
  id: number;
  name: string;
  teams?: Team[];
  standings?: GroupStanding[];
}

export interface GroupStanding {
  id: number;
  groupId: number;
  teamId: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  team?: Team;
  group?: Group;
}

export interface Match {
  id: number;
  externalId?: string | null;
  phase: Phase;
  groupId?: number | null;
  matchDay?: number | null;
  dateUtc: string;
  stadiumId?: number | null;
  homeTeamId?: number | null;
  awayTeamId?: number | null;
  homeScore?: number | null;
  awayScore?: number | null;
  homePenalties?: number | null;
  awayPenalties?: number | null;
  status: MatchStatus;
  minute?: number | null;
  homeTeam?: Team | null;
  awayTeam?: Team | null;
  stadium?: Stadium | null;
  group?: Group | null;
  events?: MatchEvent[];
}

export interface MatchEvent {
  id: number;
  matchId: number;
  type: EventType;
  minute: number;
  extraMinute?: number | null;
  teamId?: number | null;
  playerName?: string | null;
  detail?: string | null;
  team?: Team | null;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface ApiError {
  success: false;
  error: string;
  statusCode: number;
}

// Socket.io event types
export interface ServerToClientEvents {
  "match:update": (match: Match) => void;
  "match:event": (event: MatchEvent & { match: Match }) => void;
  "match:status_change": (data: { matchId: number; oldStatus: MatchStatus; newStatus: MatchStatus; match: Match }) => void;
  "standings:update": (standings: GroupStanding[]) => void;
}

export interface ClientToServerEvents {
  "subscribe:match": (matchId: number) => void;
  "unsubscribe:match": (matchId: number) => void;
  "subscribe:live": () => void;
  "unsubscribe:live": () => void;
}

// Phase display helpers
export const PHASE_LABELS: Record<Phase, string> = {
  [Phase.GROUP_STAGE]: "Phase de groupes",
  [Phase.ROUND_OF_32]: "32èmes de finale",
  [Phase.ROUND_OF_16]: "16èmes de finale",
  [Phase.QUARTER_FINAL]: "Quarts de finale",
  [Phase.SEMI_FINAL]: "Demi-finales",
  [Phase.THIRD_PLACE]: "Match pour la 3ème place",
  [Phase.FINAL]: "Finale",
};

export const PHASE_SLUGS: Record<Phase, string> = {
  [Phase.GROUP_STAGE]: "group-stage",
  [Phase.ROUND_OF_32]: "round-of-32",
  [Phase.ROUND_OF_16]: "round-of-16",
  [Phase.QUARTER_FINAL]: "quarter-finals",
  [Phase.SEMI_FINAL]: "semi-finals",
  [Phase.THIRD_PLACE]: "third-place",
  [Phase.FINAL]: "final",
};

export const SLUG_TO_PHASE: Record<string, Phase> = Object.entries(PHASE_SLUGS).reduce(
  (acc, [phase, slug]) => ({ ...acc, [slug]: phase as Phase }),
  {} as Record<string, Phase>
);

export const STATUS_LABELS: Record<MatchStatus, string> = {
  [MatchStatus.SCHEDULED]: "Programmé",
  [MatchStatus.TIMED]: "Horaire confirmé",
  [MatchStatus.IN_PLAY]: "En cours",
  [MatchStatus.PAUSED]: "Pause",
  [MatchStatus.HALF_TIME]: "Mi-temps",
  [MatchStatus.EXTRA_TIME]: "Prolongations",
  [MatchStatus.PENALTY_SHOOTOUT]: "Tirs au but",
  [MatchStatus.FINISHED]: "Terminé",
  [MatchStatus.SUSPENDED]: "Suspendu",
  [MatchStatus.POSTPONED]: "Reporté",
  [MatchStatus.CANCELLED]: "Annulé",
};

export function isLiveStatus(status: MatchStatus): boolean {
  return [
    MatchStatus.IN_PLAY,
    MatchStatus.PAUSED,
    MatchStatus.HALF_TIME,
    MatchStatus.EXTRA_TIME,
    MatchStatus.PENALTY_SHOOTOUT,
  ].includes(status);
}
