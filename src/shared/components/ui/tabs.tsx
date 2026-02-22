import React from 'react';
import { cn } from '../../lib/utils';

export interface Tab {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn('flex border-b border-border', className)}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-4 py-2.5 text-[13px] font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap',
              'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-uhc-blue',
              isActive
                ? 'text-uhc-blue'
                : 'text-text-secondary hover:text-text-primary',
            )}
          >
            {tab.label}

            {/* Active underline indicator */}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-uhc-blue rounded-t-full"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
