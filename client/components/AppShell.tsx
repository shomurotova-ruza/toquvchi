import type { ReactNode } from "react";
import SidebarNav from "@/components/SidebarNav";
import Topbar from "@/components/Topbar";

type Props = {
  children: ReactNode;
  active?: string;
  showContacts?: boolean;
  initialSearch?: string;
};

export default function AppShell({ children, active, showContacts, initialSearch }: Props) {
  return (
    <main className="page-shell">
      <div className="page-frame">
        <Topbar initialValue={initialSearch} />
        <div className="content-grid">
          <SidebarNav active={active} showContacts={showContacts} />
          <section className="main-content">{children}</section>
        </div>
      </div>
    </main>
  );
}
