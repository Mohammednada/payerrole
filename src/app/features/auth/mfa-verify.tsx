import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../context/auth-context';

export function MfaVerify() {
  const { verifyMfa, loading } = useAuth();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    if (newCode.every((d) => d !== '') && index === 5) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const newCode = pasted.split('');
      setCode(newCode);
      inputs.current[5]?.focus();
      handleSubmit(pasted);
    }
  };

  const handleSubmit = async (codeStr?: string) => {
    const finalCode = codeStr ?? code.join('');
    if (finalCode.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }
    setError('');
    try {
      await verifyMfa(finalCode);
    } catch {
      setError('Invalid code. Please try again.');
      setCode(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-uhc-blue-50">
          <ShieldCheck size={24} className="text-uhc-blue" />
        </div>
        <div className="mb-1 text-[20px] font-bold text-uhc-blue">
          Verify Identity
        </div>
        <p className="text-[13px] text-text-secondary">
          Enter the 6-digit code sent to your registered device
        </p>
      </div>

      <div className="mb-4 flex justify-center gap-2" onPaste={handlePaste}>
        {code.map((digit, i) => (
          <motion.input
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-12 w-12 rounded-lg border-2 border-border bg-white text-center text-[16px] font-semibold text-text-primary outline-none transition-colors focus:border-uhc-blue focus:ring-2 focus:ring-uhc-blue/20"
          />
        ))}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-md bg-error-light px-3 py-2 text-center text-[13px] text-error"
        >
          {error}
        </motion.div>
      )}

      <button
        onClick={() => handleSubmit()}
        disabled={loading || code.some((d) => !d)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-uhc-blue px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-uhc-blue-mid disabled:opacity-60"
      >
        {loading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <ShieldCheck size={16} />
        )}
        {loading ? 'Verifying...' : 'Verify Code'}
      </button>

      <div className="mt-4 text-center text-xs text-text-muted">
        Demo: enter any 6 digits (e.g., 123456) to proceed.
      </div>
    </div>
  );
}
