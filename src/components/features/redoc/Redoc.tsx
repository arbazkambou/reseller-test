"use client";
import { useEffect, useRef } from "react";

type RedocViewProps = {
  specUrl?: string;
};

declare global {
  interface Window {
    Redoc?: {
      init: (
        specUrl: string,
        options: Record<string, unknown>,
        element: Element
      ) => void;
    };
  }
}

export default function Redoc({ specUrl = "/openapi.json" }: RedocViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const initRedoc = () => {
      if (!initializedRef.current && window.Redoc && containerRef.current) {
        initializedRef.current = true;
        window.Redoc.init(specUrl, {}, containerRef.current);
      }
    };

    if (typeof window === "undefined") return;

    const existingScript = document.getElementById(
      "redoc-standalone"
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if (window.Redoc) initRedoc();
      else existingScript.addEventListener("load", initRedoc, { once: true });
    } else {
      const script = document.createElement("script");
      script.id = "redoc-standalone";
      script.src =
        "https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js";
      script.async = true;
      script.onload = initRedoc;
      document.body.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        const fresh = containerRef.current.cloneNode(false) as HTMLDivElement;
        containerRef.current.replaceWith(fresh);
        containerRef.current = fresh;
        initializedRef.current = false;
      }
    };
  }, [specUrl]);

  return <div ref={containerRef} className="min-h-screen w-full" />;
}
