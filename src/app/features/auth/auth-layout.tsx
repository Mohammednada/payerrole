import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left branding panel */}
      <div className="hidden w-[480px] flex-col justify-between bg-uhc-blue p-10 lg:flex">
        <div>
          <div className="mb-2 text-[20px] font-bold text-white">RolePayer</div>
          <div className="text-[13px] text-white/60">Provider Portal</div>
        </div>
        <div className="space-y-6">
          <h1 className="text-[24px] font-bold leading-tight text-white">
            Streamline your
            <br />
            healthcare operations
          </h1>
          <p className="text-[13px] leading-relaxed text-white/70">
            Access prior authorizations, claims, eligibility verification, and
            more — all in one unified portal designed for healthcare providers.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              'Prior Auth Management',
              'Claims Processing',
              'Eligibility Checks',
              'Real-time Reporting',
            ].map((feat) => (
              <div
                key={feat}
                className="flex items-center gap-2 text-[13px] text-white/80"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-teal" />
                {feat}
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs text-white/40">
          &copy; 2025 RolePayer Health Solutions. All rights reserved.
        </div>
      </div>

      {/* Right auth form panel */}
      <div className="flex flex-1 items-center justify-center bg-surface px-5 py-4">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
