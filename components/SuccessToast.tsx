import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, ArrowRight, ShieldCheck } from 'lucide-react';

export interface SuccessToastProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  clientName?: string;
  duration?: number; // duration in ms, default 6000
  onActionClick?: () => void;
  actionLabel?: string;
}

export const SuccessToast: React.FC<SuccessToastProps> = ({
  isOpen,
  onClose,
  title = 'Project Brief Submitted!',
  message,
  clientName,
  duration = 6000,
  onActionClick,
  actionLabel
}) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(100);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      if (isPaused) return;

      const elapsed = Date.now() - startTime;
      const remainingPercent = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remainingPercent);

      if (remainingPercent <= 0) {
        clearInterval(interval);
        onClose();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isOpen, duration, isPaused, onClose]);

  const defaultMessage = clientName
    ? `Thank you, ${clientName}! Our team has received your brief and will respond within 24 hours.`
    : 'Your project brief has been delivered to Qarvion. We will review your vision within 24 hours.';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="qarvion-success-toast-container"
          className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-[70] max-w-md w-[calc(100vw-2.5rem)] pointer-events-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            id="qarvion-success-toast-card"
            initial={{ opacity: 0, y: 24, scale: 0.94, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 16, scale: 0.95, filter: 'blur(2px)' }}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 30,
              mass: 0.8
            }}
            className="relative overflow-hidden rounded-2xl bg-[#090F20]/95 backdrop-blur-xl border border-[#00D2FF]/40 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(0,210,255,0.18)] p-5 text-white"
            role="status"
            aria-live="polite"
          >
            {/* Top decorative ambient glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#00D2FF]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative flex items-start gap-4">
              {/* Success Badge Icon with pulsating effect */}
              <div className="relative shrink-0 mt-0.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-[#00D2FF]/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-xl border border-emerald-400 pointer-events-none"
                />
              </div>

              {/* Toast Text Content */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-white font-['Montserrat'] tracking-tight">
                    {title}
                  </h4>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-semibold text-emerald-400 font-['Inter']">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    Sent
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-['Poppins']">
                  {message || defaultMessage}
                </p>

                {onActionClick && actionLabel && (
                  <button
                    type="button"
                    onClick={onActionClick}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#00D2FF] hover:text-white transition-colors cursor-pointer group"
                  >
                    <span>{actionLabel}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Dismiss notification"
                className="shrink-0 -mr-1 -mt-1 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Countdown Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-[#00D2FF]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
