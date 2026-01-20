"use client";

import { useState } from "react";
import { SparklesIcon, ArrowPathIcon, CheckIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useWidget } from "@/app/context/WidgetContext";
import { WidgetCard } from "../WidgetCard";
import { WidgetHeader } from "../WidgetHeader";
import { WidgetFooter } from "../WidgetFooter";

interface EmailComposerProps {
  widgetId: string;
  stepNumber?: number;
  animationDelay?: number;
  isDragging?: boolean;
}

const aiSuggestions = [
  "Write intro",
  "Make formal",
  "Shorten",
  "Add CTA",
];

const sampleDrafts: Record<string, string> = {
  "Write intro": `Hi {name},

I hope this message finds you well. I wanted to reach out regarding our recent conversation about {company}'s goals for this quarter.`,
  "Make formal": `Dear {name},

I am writing to follow up on our previous discussion regarding the partnership opportunity between our organizations.

Please find below the key points we discussed, along with proposed next steps.`,
  "Shorten": `Hi {name},

Quick follow-up on our chat. Ready to move forward when you are.

Let me know if you have any questions.`,
  "Add CTA": `{current}

Would you be available for a 15-minute call this week to discuss next steps? I'm free Tuesday or Thursday afternoon.

Looking forward to hearing from you.`,
};

export function EmailComposer({ widgetId, stepNumber, animationDelay, isDragging }: EmailComposerProps) {
  const { state, actions } = useWidget();
  const { selectedClient, clientContext, emailDraft } = state;
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleAiAction = async (action: string) => {
    if (!emailDraft) return;

    setIsGenerating(true);
    setLastAction(action);

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    let newBody = sampleDrafts[action] || emailDraft.body;

    // Replace placeholders
    if (selectedClient) {
      newBody = newBody
        .replace(/{name}/g, selectedClient.name.split(" ")[0])
        .replace(/{company}/g, selectedClient.company)
        .replace(/{current}/g, emailDraft.body);
    }

    actions.updateEmailDraft({
      body: newBody,
      status: newBody.trim() ? "ready" : "draft",
    });

    setIsGenerating(false);
  };

  if (!selectedClient || !emailDraft) {
    return (
      <WidgetCard className="h-full" stepNumber={stepNumber} animationDelay={animationDelay} isDragging={isDragging}>
        <WidgetHeader title="Email Composer" />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div
              className="mx-auto h-16 w-16 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-600 flex items-center justify-center mb-3"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(161,161,170,0.1) 4px, rgba(161,161,170,0.1) 8px)",
              }}
            >
              <SparklesIcon className="h-6 w-6 text-stone-300 dark:text-stone-600" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Select a client to compose an email
            </p>
          </div>
        </div>
        <WidgetFooter
          primaryAction={{
            label: "Generate",
            icon: SparklesIcon,
            disabled: true,
          }}
        />
      </WidgetCard>
    );
  }

  return (
    <WidgetCard className="h-full" stepNumber={stepNumber} animationDelay={animationDelay} isDragging={isDragging}>
      <WidgetHeader title="Email Composer" />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* To field */}
        <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500 w-12">To:</span>
            <span className="text-sm text-stone-900 dark:text-white">
              {emailDraft.toName} &lt;{emailDraft.to}&gt;
            </span>
          </div>
        </div>

        {/* Subject field */}
        <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500 w-12">Subject:</span>
            <input
              type="text"
              placeholder="Enter subject..."
              value={emailDraft.subject}
              onChange={(e) => actions.updateEmailDraft({ subject: e.target.value })}
              disabled={emailDraft.status === "sent"}
              className="flex-1 text-sm bg-transparent border-0 p-0 focus:ring-0 text-stone-900 dark:text-white placeholder:text-stone-400 disabled:opacity-50"
            />
          </div>
        </div>

        {/* AI Quick Actions */}
        {emailDraft.status !== "sent" && (
          <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-4 w-4 text-primary-500" />
              <span className="text-xs font-medium text-stone-500">AI:</span>
              <div className="flex flex-wrap gap-1.5">
                {aiSuggestions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleAiAction(action)}
                    disabled={isGenerating}
                    className={`px-2 py-1 text-xs rounded-md transition-colors ${
                      isGenerating && lastAction === action
                        ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                    }`}
                  >
                    {isGenerating && lastAction === action ? (
                      <span className="flex items-center gap-1">
                        <ArrowPathIcon className="h-3 w-3 animate-spin" />
                        Generating...
                      </span>
                    ) : (
                      action
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-hidden">
          {emailDraft.status === "sent" ? (
            <div className="p-4 h-full">
              <div className="h-full rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Email sent successfully
                  </span>
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 whitespace-pre-wrap line-clamp-4">
                  {emailDraft.body}
                </p>
              </div>
            </div>
          ) : (
            <textarea
              placeholder="Compose your email... or click an AI action above to get started"
              value={emailDraft.body}
              onChange={(e) =>
                actions.updateEmailDraft({
                  body: e.target.value,
                  status: e.target.value.trim() ? "ready" : "draft",
                })
              }
              className="w-full h-full p-4 text-sm bg-transparent border-0 resize-none focus:ring-0 text-stone-900 dark:text-white placeholder:text-stone-400"
            />
          )}
        </div>
      </div>

      <WidgetFooter
        secondaryAction={
          emailDraft.status !== "sent"
            ? {
                label: "Discard",
                icon: TrashIcon,
                onClick: () => actions.resetEmail(),
              }
            : undefined
        }
        primaryAction={
          emailDraft.status === "sent"
            ? {
                label: "New email",
                icon: ArrowPathIcon,
                onClick: () => actions.resetEmail(),
              }
            : {
                label: "Generate",
                icon: SparklesIcon,
              }
        }
      />
    </WidgetCard>
  );
}
