import { ReactNode } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { VoiceAssistant } from '@/components/common/VoiceAssistant';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
      <VoiceAssistant />
    </div>
  );
}
