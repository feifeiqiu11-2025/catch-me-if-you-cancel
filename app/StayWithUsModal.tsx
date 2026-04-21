'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface StayWithUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: () => void;
}

const ROUNDS = [
  {
    emoji: '😢',
    title: 'Wait… are you really leaving?',
    message: 'Your stories will miss you so much.',
  },
  {
    emoji: '🦄',
    title: 'But your characters need you!',
    message: 'Who will bring them to life without their favorite storyteller?',
  },
  {
    emoji: '📖',
    title: 'Every great author has doubts.',
    message: "Don't let this be your final chapter — the best stories are yet to come.",
  },
  {
    emoji: '🌟',
    title: 'Think of all the stories waiting to be born.',
    message: "Dragons, unicorns, talking acorns — they're counting on you.",
  },
  {
    emoji: '✨',
    title: 'Okay… last chance to keep the magic alive.',
    message: 'Your imagination is a superpower. Are you really putting it away?',
  },
];

const YES_SCALES = [1, 0.9, 0.75, 0.6, 0.5];
const NO_SCALES = [1, 1.1, 1.22, 1.35, 1.5];

const CONFETTI_EMOJIS = ['🎉', '✨', '💖', '🌟', '🦄', '📖', '🎨', '🌈', '🎊', '💫', '🌳'];

export function StayWithUsModal({ isOpen, onClose, onConfirmCancel }: StayWithUsModalProps) {
  const [round, setRound] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [yesOffset, setYesOffset] = useState({ x: 0, y: 0 });
  const yesBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const naturalCenterRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setRound(0);
      setCelebrating(false);
      setYesOffset({ x: 0, y: 0 });
    }
  }, [isOpen]);

  const isFinalRound = round === ROUNDS.length - 1;

  useEffect(() => {
    if (!isOpen || celebrating || !isFinalRound) return;

    // Capture the button's natural (layout) center once. The button's transform
    // is `scale(S) translate(...)` so when offset is {0,0}, the visual center
    // equals the natural layout center (scale is around transform-origin: center).
    // This is measured before any dodge has moved the button.
    const btn = yesBtnRef.current;
    if (btn) {
      const r = btn.getBoundingClientRect();
      naturalCenterRef.current = {
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
      };
    }

    const handleMove = (e: MouseEvent) => {
      const btn = yesBtnRef.current;
      const modal = modalRef.current;
      const natural = naturalCenterRef.current;
      if (!btn || !modal || !natural) return;

      const bRect = btn.getBoundingClientRect();
      const mRect = modal.getBoundingClientRect();
      const cx = bRect.left + bRect.width / 2;
      const cy = bRect.top + bRect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < 100) {
        const margin = 8;
        const halfW = bRect.width / 2;
        const halfH = bRect.height / 2;

        // Allowed offset range to keep button entirely inside modal
        const minOX = mRect.left + margin + halfW - natural.x;
        const maxOX = mRect.right - margin - halfW - natural.x;
        const minOY = mRect.top + margin + halfH - natural.y;
        const maxOY = mRect.bottom - margin - halfH - natural.y;

        // Place button on the opposite side of the mouse relative to modal center
        const modalCx = (mRect.left + mRect.right) / 2;
        const modalCy = (mRect.top + mRect.bottom) / 2;
        const mouseLeft = e.clientX < modalCx;
        const mouseTop = e.clientY < modalCy;

        let nx = 0;
        let ny = 0;

        if (maxOX > minOX) {
          const mid = (minOX + maxOX) / 2;
          nx = mouseLeft
            ? mid + Math.random() * (maxOX - mid)
            : minOX + Math.random() * (mid - minOX);
        }
        if (maxOY > minOY) {
          const mid = (minOY + maxOY) / 2;
          ny = mouseTop
            ? mid + Math.random() * (maxOY - mid)
            : minOY + Math.random() * (mid - minOY);
        }

        // Final safety clamp
        nx = Math.max(minOX, Math.min(maxOX, nx));
        ny = Math.max(minOY, Math.min(maxOY, ny));

        setYesOffset({ x: nx, y: ny });
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isOpen, celebrating, isFinalRound]);

  const handleYes = useCallback(() => {
    if (round < ROUNDS.length - 1) {
      setRound((r) => r + 1);
      setYesOffset({ x: 0, y: 0 });
    } else {
      onConfirmCancel();
    }
  }, [round, onConfirmCancel]);

  const handleNo = useCallback(() => {
    setCelebrating(true);
    setTimeout(() => {
      onClose();
    }, 4500);
  }, [onClose]);

  if (!isOpen) return null;

  const current = ROUNDS[round];
  const yesScale = YES_SCALES[round];
  const noScale = NO_SCALES[round];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <style>{`
        @keyframes kw-confetti-fall {
          0% { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate3d(0, 110vh, 0) rotate(720deg); opacity: 0.6; }
        }
        @keyframes kw-celebrate-pop {
          0% { transform: scale(0.6); opacity: 0; }
          70% { transform: scale(1.04); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes kw-dragon-dance {
          0%   { transform: translateY(0) rotate(-4deg); }
          20%  { transform: translateY(-22px) rotate(4deg); }
          40%  { transform: translateY(0) rotate(-4deg); }
          60%  { transform: translateY(-14px) rotate(4deg); }
          80%  { transform: translateY(0) rotate(-2deg); }
          100% { transform: translateY(0) rotate(-4deg); }
        }
      `}</style>

      {celebrating ? (
        <>
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            {Array.from({ length: 60 }).map((_, i) => {
              const emoji = CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length];
              const left = Math.random() * 100;
              const delay = Math.random() * 0.8;
              const duration = 2.4 + Math.random() * 2.2;
              const size = 22 + Math.random() * 26;
              return (
                <span
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: 0,
                    fontSize: `${size}px`,
                    animation: `kw-confetti-fall ${duration}s linear ${delay}s forwards`,
                  }}
                >
                  {emoji}
                </span>
              );
            })}
          </div>
          <div
            className="relative bg-white border border-purple-100 rounded-lg shadow-xl max-w-xl w-full px-10 py-12 text-center"
            style={{ animation: 'kw-celebrate-pop 0.6s ease-out both' }}
          >
            <div className="flex justify-center mb-5">
              <img
                src="/demo-dragon.png"
                alt="Happy dragon celebrating"
                style={{
                  width: 220,
                  height: 'auto',
                  animation: 'kw-dragon-dance 1.1s ease-in-out infinite',
                  transformOrigin: 'bottom center',
                }}
              />
            </div>
            <h2 className="text-3xl font-semibold text-purple-700 mb-4">
              You&apos;re staying. Wonderful.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Thanks for keeping your imagination and creativity with us at{' '}
              <span className="font-semibold text-purple-700">KindleWood</span>. 🌳
            </p>
          </div>
        </>
      ) : (
        <div
          ref={modalRef}
          className="relative bg-white border border-gray-200 rounded-lg shadow-xl max-w-xl w-full px-10 py-12"
          style={{ minHeight: 360 }}
        >
          <div className="text-center">
            <div className="text-6xl mb-5">{current.emoji}</div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">{current.title}</h2>
            <p className="text-lg text-gray-600 mb-8">{current.message}</p>
          </div>

          <div className="flex items-center justify-center gap-4" style={{ minHeight: 160 }}>
            <button
              ref={yesBtnRef}
              onClick={handleYes}
              style={{
                transform: `translate(${yesOffset.x}px, ${yesOffset.y}px) scale(${yesScale})`,
                transition: isFinalRound
                  ? 'transform 0.1s ease-out'
                  : 'transform 0.35s ease-out',
                transformOrigin: 'center',
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-5 py-2.5 rounded-md shadow-sm whitespace-nowrap"
            >
              Yes, cancel
            </button>
            <button
              onClick={handleNo}
              style={{
                transform: `scale(${noScale})`,
                transition: 'transform 0.35s ease-out',
                transformOrigin: 'center',
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white text-base font-medium px-6 py-3 rounded-md shadow-sm"
            >
              No, keep my subscription 💖
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            Step {round + 1} of {ROUNDS.length}
          </div>
        </div>
      )}
    </div>
  );
}
