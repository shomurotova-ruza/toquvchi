import CoursesPageClient from "@/components/CoursesPageClient";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const params = await searchParams;
  return <CoursesPageClient catParam={params.cat ?? null} queryParam={params.q ?? null} />;
}
