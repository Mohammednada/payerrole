import { useState, useRef, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: TooltipPosition;
  className?: string;
}

const positionClasses: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowClasses: Record<TooltipPosition, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-[#1b2124] border-x-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[#1b2124] border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-[#1b2124] border-y-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-[#1b2124] border-y-transparent border-l-transparent',
};

export function Tooltip({
  content,
  children,
  position = 'top',
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), 150);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), 100);
  };

  return (
    <div
      className={cn('relative inline-flex', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {visible && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-50 whitespace-nowrap rounded-md bg-[#1b2124] px-2 py-1 text-[10px] font-medium text-white',
            'pointer-events-none animate-in fade-in duration-150',
            positionClasses[position],
          )}
        >
          {content}
          <span
            className={cn(
              'absolute h-0 w-0 border-4',
              arrowClasses[position],
            )}
          />
        </div>
      )}
    </div>
  );
}
