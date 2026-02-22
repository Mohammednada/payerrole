import type { ReactNode } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-surface px-6 py-5">
          {children}
        </main>
      </div>
    </div>
  );
}
