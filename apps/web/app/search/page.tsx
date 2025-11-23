import type { Metadata } from "next";
import { Header, Footer } from "@/components";
import { SearchPanel } from "./SearchPanel";

export const metadata: Metadata = {
  title: "Search | ZephorTech",
  description: "Search all ZephorTech services, case studies, and blog posts.",
};

interface SearchPageProps {
  searchParams?: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const initialQuery = params?.q ?? "";

  return (
    <div
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
      }}
    >
      <Header />
      <SearchPanel initialQuery={initialQuery} />
      <Footer />
    </div>
  );
}


