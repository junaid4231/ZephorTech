import { PageSkeleton } from "@/components/skeletons/PageSkeleton";

export default function ServicesLoading() {
  return <PageSkeleton cards={6} showHero={true} />;
}
