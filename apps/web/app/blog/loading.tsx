import { PageSkeleton } from "@/components/skeletons/PageSkeleton";

export default function BlogLoading() {
  return <PageSkeleton cards={6} showHero={true} />;
}
