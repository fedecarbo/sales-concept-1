"use client";

import { useState } from "react";
import {
  PaperAirplaneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { useWidget } from "@/app/context/WidgetContext";
import { WidgetCard } from "../WidgetCard";
import { WidgetHeader } from "../WidgetHeader";

interface EmailSenderProps {
  widgetId: string;
  stepNumber?: number;
  animationDelay?: number;
  isDragging?: boolean;
}

export function EmailSender({ widgetId, stepNumber, animationDelay, isDragging }: EmailSenderProps) {
  const { state, actions } = useWidget();
  const { emailDraft } = state;
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!emailDraft || emailDraft.status !== "ready") return;

    setIsSending(true);
    // Simulate sending delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    actions.sendEmail();
    setIsSending(false);
  };

  if (!emailDraft) {
    return (
      <WidgetCard className="h-full" stepNumber={stepNumber} animationDelay={animationDelay} isDragging={isDragging}>
        <WidgetHeader title="Send Email" subtitle="Ready to send" />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div
              className="mx-auto h-12 w-12 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-600 flex items-center justify-center mb-3"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(161,161,170,0.1) 4px, rgba(161,161,170,0.1) 8px)",
              }}
            >
              <EnvelopeIcon className="h-5 w-5 text-stone-300 dark:text-stone-600" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Compose an email first
            </p>
          </div>
        </div>
      </WidgetCard>
    );
  }

  const canSend = emailDraft.status === "ready" && emailDraft.subject.trim() && emailDraft.body.trim();
  const isSent = emailDraft.status === "sent";

  return (
    <WidgetCard className="h-full" stepNumber={stepNumber} animationDelay={animationDelay} isDragging={isDragging}>
      <WidgetHeader
        title="Send Email"
        subtitle={
          isSent
            ? "Delivered"
            : canSend
            ? "Ready to send"
            : "Complete your email"
        }
      />
      <div className="flex-1 flex flex-col justify-center p-4">
        {isSent ? (
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
              <CheckCircleIcon className="h-7 w-7 text-green-500" />
            </div>
            <p className="text-sm font-medium text-stone-900 dark:text-white">
              Email sent!
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Delivered to {emailDraft.toName}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Email preview mini */}
            <div className="rounded-lg bg-stone-50 dark:bg-stone-800/50 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-stone-500">To</span>
                <span className="text-xs text-stone-700 dark:text-stone-300 truncate max-w-[200px]">
                  {emailDraft.toName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500">Subject</span>
                <span className="text-xs text-stone-700 dark:text-stone-300 truncate max-w-[200px]">
                  {emailDraft.subject || "(no subject)"}
                </span>
              </div>
            </div>

            {/* Validation messages */}
            {!canSend && (
              <div className="flex items-start gap-2 text-xs text-amber-600 dark:text-amber-400">
                <ExclamationCircleIcon className="h-4 w-4 flex-shrink-0" />
                <span>
                  {!emailDraft.subject.trim()
                    ? "Add a subject line"
                    : !emailDraft.body.trim()
                    ? "Write your email content"
                    : "Complete your email to send"}
                </span>
              </div>
            )}

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!canSend || isSending}
              className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                canSend && !isSending
                  ? "bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-100"
                  : "bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed"
              }`}
            >
              {isSending ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="h-4 w-4" />
                  Send Email
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </WidgetCard>
  );
}
