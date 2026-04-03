import type { ReactNode } from "react";
import SidebarNav from "./SidebarNav";
import Topbar from "./Topbar";

export default function AppFrame({ children }: { children: ReactNode }) {
  return (
    <main className="page-shell">
      <div className="page-frame">
        <Topbar />
        <div className="content-grid">
          <SidebarNav />
          <section className="main-content">{children}</section>
        </div>
      </div>
    </main>
  );
}
