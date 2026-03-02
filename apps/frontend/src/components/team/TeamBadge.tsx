import type { Team } from "@cdm/shared";

interface TeamBadgeProps {
  team: Team | null | undefined;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

export function TeamBadge({ team, size = "md", showName = true }: TeamBadgeProps) {
  if (!team) {
    return (
      <div className="flex items-center gap-2">
        <div className={`bg-gray-200 rounded ${sizeClasses[size]}`} />
        {showName && <span className="text-gray-400 text-sm">TBD</span>}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {team.flagUrl ? (
        <img
          src={team.flagUrl}
          alt={team.name}
          className={`object-cover rounded-sm ${sizeClasses[size]}`}
        />
      ) : (
        <div className={`bg-gray-200 rounded-sm flex items-center justify-center text-[8px] text-gray-500 font-bold ${sizeClasses[size]}`}>
          {team.code}
        </div>
      )}
      {showName && (
        <span className={`font-medium ${textClasses[size]}`}>{team.name}</span>
      )}
    </div>
  );
}

const sizeClasses = { sm: "w-5 h-3.5", md: "w-8 h-5", lg: "w-10 h-7" };
const textClasses = { sm: "text-xs", md: "text-sm", lg: "text-base" };
