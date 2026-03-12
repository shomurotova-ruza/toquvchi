import "./globals.css";
import AuthControls from "@/components/AuthControls";

export const metadata = {
  title: "To‘quvchi qiz — Kurslar",
  description: "To‘qish bo‘yicha video darslar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className="min-h-screen bg-[#FBFAFD] text-slate-900">
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside className="w-[260px] border-r border-purple-100 bg-purple-50/40 p-6">
            <div className="text-3xl font-semibold text-purple-700">
              To‘quvchi qiz
            </div>

            <nav className="mt-8 space-y-2 text-[15px]">
              <a className="block px-3 py-2 rounded-xl hover:bg-purple-100" href="/">
                Bosh sahifa
              </a>
              <a className="block px-3 py-2 rounded-xl hover:bg-purple-100" href="/register">
                Ro‘yxatdan o‘tish
              </a>
              <a className="block px-3 py-2 rounded-xl hover:bg-purple-100" href="/courses">
                Kurslar
              </a>
              <a className="block px-3 py-2 rounded-xl hover:bg-purple-100" href="/contact">
                Biz bilan bog‘lanish
              </a>
            </nav>

            <div className="mt-10 space-y-3 text-sm">
              <div className="rounded-2xl bg-white p-3 border border-purple-100">
                📞 +998 12 345 67 77
              </div>
              <div className="rounded-2xl bg-white p-3 border border-purple-100">
                ✉️ example@gmail.com
              </div>
              <div className="rounded-2xl bg-white p-3 border border-purple-100">
                Telegram • Instagram
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1">
            <header className="h-20 border-b border-purple-100 bg-white/70 backdrop-blur flex items-center justify-between px-8">
              <div className="w-[460px]">
                <input
                  className="w-full h-11 rounded-2xl border border-purple-100 bg-white px-4 outline-none focus:ring-2 focus:ring-purple-200"
                  placeholder="Qidirish..."
                />
              </div>

              <div className="flex items-center gap-3 text-purple-700">
                <button className="w-11 h-11 rounded-2xl border border-purple-100 hover:bg-purple-50">
                  ♡
                </button>
                <button className="w-11 h-11 rounded-2xl border border-purple-100 hover:bg-purple-50">
                  👤
                </button>
                <AuthControls />
              </div>
            </header>

            <div className="p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}