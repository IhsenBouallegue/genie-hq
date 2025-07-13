"use client";

import { useEffect, useState } from "react";

const UnsubscribePageClient = ({ email }: { email: string | null }) => {
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

  useEffect(() => {
    if (!email) {
      setStatus("failed");
      return;
    }

    const unsubscribeUser = async () => {
      try {
        const response = await fetch("/api/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (_error) {
        setStatus("failed");
      }
    };

    unsubscribeUser();
  }, [email]);

  return (
    <div className="flex justify-center items-center h-screen">
      {status === "loading" && <p>Unsubscribing...</p>}
      {status === "success" && <p>You have been successfully unsubscribed.</p>}
      {status === "failed" && <p>Failed to unsubscribe. Please try again later.</p>}
    </div>
  );
};

export default UnsubscribePageClient;
