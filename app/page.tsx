'use client';

import { useState } from 'react';
import { StayWithUsModal } from './StayWithUsModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const handleProceedCancel = () => {
    setModalOpen(false);
    setCancelled(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold text-gray-900">Billing</h1>
          <p className="text-lg text-gray-500 mt-2">Manage your plan and payment details.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
          <div className="px-8 py-6 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-gray-900">Premium</h2>
                <span className="text-sm font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded">
                  Active
                </span>
              </div>
              <p className="text-base text-gray-500 mt-2">$14.99 / month · renews May 20, 2026</p>
            </div>
            <button className="text-base font-medium text-gray-700 hover:text-gray-900 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
              Change plan
            </button>
          </div>

          <div className="px-8 py-6 grid grid-cols-2 gap-6 text-base">
            <div>
              <div className="text-gray-500 mb-1">Payment method</div>
              <div className="text-gray-900 text-lg">Visa •••• 4242</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Next invoice</div>
              <div className="text-gray-900 text-lg">$14.99 on May 20</div>
            </div>
          </div>

          <div className="px-8 py-6 bg-gray-50 rounded-b-lg">
            {cancelled ? (
              <div className="flex items-center justify-between text-base">
                <span className="text-gray-600">
                  Cancellation scheduled. Access ends May 20, 2026.
                </span>
                <button
                  onClick={() => setCancelled(false)}
                  className="text-gray-500 hover:text-gray-700 underline"
                >
                  Undo
                </button>
              </div>
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 border border-red-300 bg-white text-red-600 hover:bg-red-50 hover:border-red-400 text-base font-medium px-5 py-2.5 rounded-md transition-colors"
              >
                Cancel subscription
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-400">
          Try clicking &ldquo;Cancel subscription&rdquo;. Good luck.
        </div>
      </div>

      <StayWithUsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirmCancel={handleProceedCancel}
      />
    </div>
  );
}
