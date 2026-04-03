import type { ReactNode } from 'react';
import SidebarNav from '@/components/SidebarNav';
import Topbar from '@/components/Topbar';

type Props = {
  children: ReactNode;
  active?: string;
  showContacts?: boolean;
  initialSearch?: string;
  homeVariant?: boolean;
  pageTitle?: string;
};

export default function AppShell({ children, active, showContacts, initialSearch, homeVariant, pageTitle }: Props) {
  return (
    <main className="page-shell">
      <div className="page-frame">
        <Topbar initialValue={initialSearch} />
        <div className={`content-grid ${homeVariant ? 'content-grid-home' : ''}`.trim()}>
          <SidebarNav active={active} showContacts={showContacts} />
          <section className={`main-content ${homeVariant ? 'main-content-home' : ''}`.trim()}>
            {pageTitle ? (
              <div className={`hero-title-wrap ${homeVariant ? 'hero-title-wrap-home' : ''}`.trim()}>
                <h1 className="page-title">{pageTitle}</h1>
              </div>
            ) : null}
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
