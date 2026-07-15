"use client";

import { useState } from "react";
import { MessageCircle, Star } from "lucide-react";
import { BRANDS, whatsappLink, type BrandKey } from "@/lib/brands";
import { cn } from "@/lib/cn";

/**
 * In-app feedback form. There's no backend in this build, so on submit it
 * composes the feedback into a WhatsApp message to the kitchen's real line —
 * the same channel guests already use to order. Sefofo also links its
 * Google Form as an alternative.
 */
export function FeedbackForm({ brand }: { brand: BrandKey }) {
  const b = BRANDS[brand];
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const canSend = rating > 0 || message.trim().length > 0;

  function send() {
    if (!canSend) return;
    const parts = [`Hi ${b.name}! Here's my feedback:`];
    if (rating > 0) parts.push(`Rating: ${"⭐".repeat(rating)} (${rating}/5)`);
    if (name.trim()) parts.push(`From: ${name.trim()}`);
    if (message.trim()) parts.push(message.trim());
    window.open(whatsappLink(brand, parts.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <div data-brand={brand} className="flex flex-col gap-4">
      <div>
        <label className="label text-muted">Your rating</label>
        <div className="mt-2 flex gap-1" role="radiogroup" aria-label={`Rating for ${b.name}`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              className="rounded-md p-0.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Star
                className={cn(
                  "size-7 transition-colors",
                  (hover || rating) >= n ? "fill-brand text-brand" : "text-muted",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor={`fb-name-${brand}`} className="label text-muted">
          Name <span className="normal-case">(optional)</span>
        </label>
        <input
          id={`fb-name-${brand}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        />
      </div>

      <div>
        <label htmlFor={`fb-msg-${brand}`} className="label text-muted">
          What did you think?
        </label>
        <textarea
          id={`fb-msg-${brand}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder={`Tell ${b.shortName} about your meal, service, or anything else…`}
          className="mt-2 w-full resize-y rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        />
      </div>

      <button
        type="button"
        onClick={send}
        disabled={!canSend}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-on-brand transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <MessageCircle className="size-4" /> Send to {b.shortName} on WhatsApp
      </button>

      {b.feedbackUrl && (
        <a
          href={b.feedbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-brand"
        >
          Prefer a form? Open {b.shortName}'s feedback form
        </a>
      )}
    </div>
  );
}
