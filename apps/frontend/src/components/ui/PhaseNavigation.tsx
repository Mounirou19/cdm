"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHASE_LABELS, PHASE_SLUGS, Phase } from "@cdm/shared";

const phases = Object.values(Phase);

export function PhaseNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex overflow-x-auto gap-1 p-1 bg-gray-100 rounded-lg">
      {phases.map((phase) => {
        const slug = PHASE_SLUGS[phase];
        const isActive = pathname === `/phases/${slug}`;
        return (
          <Link
            key={phase}
            href={`/phases/${slug}`}
            className={`whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary-600 text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {PHASE_LABELS[phase]}
          </Link>
        );
      })}
    </nav>
  );
}
