import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Card({
  children,
  className,
  padding = true,
  onClick,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card',
        padding && 'p-5',
        onClick && 'cursor-pointer transition-colors hover:bg-[#f8f9fb]',
        className,
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

export default Card;
