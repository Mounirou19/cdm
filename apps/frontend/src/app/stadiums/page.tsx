"use client";

import { useFetch } from "@/hooks/useFetch";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import type { Stadium } from "@cdm/shared";

export default function StadiumsPage() {
  const { data: stadiums, isLoading, error } = useFetch<Stadium[]>("/stadiums");

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Stades</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <LoadingSkeleton key={i} className="h-32" />)}
        </div>
      </div>
    );
  }

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Stades ({stadiums?.length || 0})</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stadiums?.map((stadium) => (
          <div key={stadium.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-lg text-gray-800">{stadium.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{stadium.city}, {stadium.country}</p>
            <p className="text-primary-600 font-medium text-sm mt-2">
              Capacité : {stadium.capacity.toLocaleString("fr-FR")} places
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
