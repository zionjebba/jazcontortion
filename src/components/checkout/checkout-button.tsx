"use client";

import { useState } from "react";

type CheckoutButtonProps = {
  slug: string;
  price: number;
};

export function CheckoutButton({
  slug,
  price,
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(
        "/api/payments/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slug,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ?? "Unable to start checkout.",
        );
        setIsLoading(false);
        return;
      }

      window.location.href = data.authorizationUrl;
    } catch {
      setError(
        "Unable to connect to the payment provider.",
      );
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isLoading}
        className="mt-6 w-full rounded-full bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:-translate-y-1 disabled:pointer-events-none disabled:opacity-50"
      >
        {isLoading
          ? "REDIRECTING..."
          : `BUY NOW — GHS ${price}`}
      </button>

      {error && (
        <p className="mt-4 text-center text-sm font-semibold text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}