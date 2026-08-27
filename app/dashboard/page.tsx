"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
export default function Dashboard() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setEmail(data.user.email ?? "");
    });
  }, []);

  return (
    <main>
      <h1>EDGE AI TRADER</h1>
      <p>Welcome, {email}</p>
      <p>AI Forex Agent Dashboard</p>
    </main>
  );
}
