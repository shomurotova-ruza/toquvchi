import CoursesClient from "./CoursesClient";

type Category = "beginner" | "crochet" | "knitting";
type CatParam = Category | "all";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const sp = await searchParams;

  const raw = sp?.cat;
  const allowed = ["beginner", "crochet", "knitting"] as const;

  const initialCat: CatParam = allowed.includes(raw as any)
    ? (raw as Category)
    : "all";

  return (
    <div className="max-w-5xl">
      <h1 className="text-4xl font-semibold text-purple-800">Kurslar</h1>
      <p className="mt-2 text-slate-600">
        Filtr orqali daraja va yo‘nalishni tanlab darslarni ko‘ring.
      </p>

      <CoursesClient initialCat={initialCat} />
    </div>
  );
}