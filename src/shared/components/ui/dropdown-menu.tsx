import { type ReactNode, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useClickOutside } from '../../hooks/use-click-outside';

export interface DropdownMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  danger?: boolean;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownMenuItem[];
  align?: 'left' | 'right';
}

export function DropdownMenu({ trigger, items, align = 'right' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const ref = useClickOutside<HTMLDivElement>(close);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        {trigger}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className={cn(
              'absolute z-50 mt-1 min-w-[180px] rounded-2xl border border-border bg-card py-1',
              align === 'right' ? 'right-0' : 'left-0',
            )}
          >
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] transition-colors',
                  item.danger
                    ? 'text-error hover:bg-error-light'
                    : 'text-text-primary hover:bg-[#f0f2f4]',
                )}
              >
                {item.icon && (
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
