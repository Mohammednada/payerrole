import { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../context/auth-context';

export function LoginPage() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('sarah.chen@acmehealth.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    try {
      await login(email, password);
    } catch {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6 text-center">
        <div className="mb-1 text-[20px] font-bold text-uhc-blue">Welcome Back</div>
        <p className="text-[13px] text-text-secondary">
          Sign in to your provider portal
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-[13px] font-medium text-text-primary">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-[#f3f3f5] px-3 py-2.5 text-[13px] outline-none transition-colors focus:border-uhc-blue focus:ring-1 focus:ring-uhc-blue/20"
            placeholder="you@practice.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-[13px] font-medium text-text-primary">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-border bg-white px-3 py-2.5 pr-10 text-[13px] outline-none transition-colors focus:border-uhc-blue-light focus:ring-2 focus:ring-uhc-blue-light/20"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-error-light px-3 py-2 text-[13px] text-error"
          >
            {error}
          </motion.div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-uhc-blue px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-uhc-blue-mid disabled:opacity-60"
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <LogIn size={16} />
          )}
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button className="text-[13px] text-uhc-blue-light hover:underline">
          Forgot password?
        </button>
      </div>

      <div className="mt-6 border-t border-border pt-4 text-center text-xs text-text-muted">
        Demo credentials are pre-filled. Click Sign In to continue.
      </div>
    </div>
  );
}
