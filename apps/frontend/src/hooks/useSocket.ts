"use client";

import { useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket";
import type { Socket } from "socket.io-client";

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = getSocket();
    socket.connect();
    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  return socketRef;
}
