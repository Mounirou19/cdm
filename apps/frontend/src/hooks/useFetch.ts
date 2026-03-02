"use client";

import useSWR from "swr";
import { API_BASE } from "@/lib/api";

async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.data;
}

export function useFetch<T>(path: string | null) {
  const { data, error, isLoading, mutate } = useSWR<T>(
    path ? `${API_BASE}${path}` : null,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 5000 }
  );

  return { data, error, isLoading, mutate };
}
