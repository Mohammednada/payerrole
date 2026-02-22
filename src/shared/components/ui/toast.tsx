import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps extends ToastData {
  onClose: (id: string) => void;
}

const variantStyles: Record<ToastType, string> = {
  success: 'border-success bg-success-light text-success',
  error: 'border-error bg-error-light text-error',
  warning: 'border-warning bg-warning-light text-warning',
  info: 'border-info bg-info-light text-info',
};

const variantIcons: Record<ToastType, React.ElementType> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

export function Toast({ id, message, type, onClose }: ToastProps) {
  const Icon = variantIcons[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'pointer-events-auto flex w-80 items-start gap-3 rounded-2xl border border-l-4 p-3',
        variantStyles[type],
      )}
      role="alert"
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="flex-1 text-[13px] font-medium text-text-primary">{message}</p>
      <button
        type="button"
        onClick={() => onClose(id)}
        className="shrink-0 rounded-full p-0.5 opacity-60 transition-opacity hover:opacity-100"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: ToastData[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
}
