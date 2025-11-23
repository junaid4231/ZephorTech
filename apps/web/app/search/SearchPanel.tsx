"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Loader2, Command } from "lucide-react";

type SearchResult = {
  id: string;
  type: "service" | "case-study" | "blog";
  title: string;
  excerpt: string;
  url: string;
  tag?: string;
  meta?: string;
};

interface SearchPanelProps {
  initialQuery?: string;
}

export function SearchPanel({ initialQuery = "" }: SearchPanelProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setStatus("idle");
      setErrorMessage("");
      return;
    }

    const controller = new AbortController();
    const fetchResults = async () => {
      setStatus("loading");
      setErrorMessage("");
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const data = await response.json();
        setResults(data.results || []);
        setStatus("idle");
      } catch (error) {
        if (controller.signal.aborted) return;
        setStatus("error");
        setErrorMessage("We couldn't fetch results. Please try again.");
      }
    };

    const timeout = setTimeout(fetchResults, 250);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    if (!router || !query) return;
    const params = new URLSearchParams();
    params.set("q", query);
    const url = `/search?${params.toString()}`;
    window.history.replaceState(null, "", url);
  }, [query, router]);

  const groupedResults = useMemo(() => {
    return results.reduce<Record<string, SearchResult[]>>((groups, result) => {
      const key = result.type;
      groups[key] = groups[key] || [];
      groups[key].push(result);
      return groups;
    }, {});
  }, [results]);

  return (
    <section 
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
        minHeight: "calc(100vh - 200px)",
      }}
    >
      <div className="container-standard relative z-10 max-w-4xl text-white">
        <div className="mb-6 text-center md:mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary md:mb-4 md:text-sm">Search</p>
          <h1 className="heading-2 mb-3">Find anything on ZephorTech</h1>
          <p className="text-sm text-white/60 md:text-base">Services, case studies, blog posts, and more.</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur md:rounded-2xl md:p-6">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 md:h-5 md:w-5" />
            <input
              ref={inputRef}
              type="search"
              placeholder='Try "AI agents", "headless commerce", or "fintech case study"'
              className="w-full rounded-xl border border-white/10 bg-transparent py-3 pl-12 pr-28 text-sm text-white placeholder:text-white/30 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 md:rounded-2xl md:py-4 md:pr-32 md:text-base"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <span className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/60 md:rounded-xl md:px-3 md:text-xs">
              <Command className="h-3 w-3 md:h-3.5 md:w-3.5" />
              K
            </span>
          </div>

          <div className="min-h-[100px] md:min-h-[120px]">
            {status === "loading" && (
              <div className="flex items-center gap-2 text-sm text-white/70 md:text-base">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Searching the knowledge base…</span>
              </div>
            )}

            {status === "error" && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 md:p-4">
                <p className="text-sm text-rose-300 md:text-base">{errorMessage}</p>
              </div>
            )}

            {status === "idle" && results.length === 0 && query.length >= 2 && (
              <p className="text-sm text-white/60 md:text-base">No results found. Try refining your query or use different keywords.</p>
            )}

            {status === "idle" && query.length < 2 && query.length > 0 && (
              <p className="text-sm text-white/50 md:text-base">Type at least 2 characters to search...</p>
            )}
          </div>
        </div>

        {Object.keys(groupedResults).length > 0 && (
          <div className="mt-8 space-y-8 md:mt-10 md:space-y-10">
            {Object.entries(groupedResults).map(([type, items]) => (
              <div key={type}>
                <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-primary md:text-sm">
                  {type === "service" ? "Services" : type === "case-study" ? "Case Studies" : "Blog"}
                </h2>
                <div className="space-y-3 md:space-y-4">
                  {items.map((result) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      className="block rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-primary/60 hover:bg-white/[0.04] md:rounded-2xl md:p-5"
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 md:gap-3">
                        <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] tracking-[0.2em] text-white/70 md:px-3 md:py-1">
                          {result.tag || type}
                        </span>
                        {result.meta && <span className="text-xs text-white/50 md:text-sm">{result.meta}</span>}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">{result.title}</h3>
                      <p className="line-clamp-2 text-sm text-white/60 md:text-base">{result.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


