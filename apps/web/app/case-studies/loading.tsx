import { PageSkeleton } from "@/components/skeletons/PageSkeleton";

export default function CaseStudiesLoading() {
  return <PageSkeleton cards={3} showHero={true} />;
}
