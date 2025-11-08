import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import type { User } from "../lib/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          // Check if user is admin
          const isAdmin = await checkAdminAccess(session.user.email || "");
          if (isAdmin) {
            setUser({
              id: session.user.id,
              email: session.user.email || "",
              user_metadata: session.user.user_metadata,
            });
          } else {
            setError("Unauthorized: Admin access required");
            await supabase.auth.signOut();
          }
        }
      } catch (err) {
        console.error("Error checking session:", err);
        setError("Failed to check authentication");
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const isAdmin = await checkAdminAccess(session.user.email || "");
        if (isAdmin) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            user_metadata: session.user.user_metadata,
          });
          setError(null);
        } else {
          setError("Unauthorized: Admin access required");
          await supabase.auth.signOut();
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const checkAdminAccess = async (email: string): Promise<boolean> => {
    try {
      const { data, error: queryError } = await supabase
        .from("admin_users")
        .select("email")
        .eq("email", email)
        .single();

      if (queryError) {
        console.warn("Admin check failed:", queryError);
        return false;
      }

      return !!data;
    } catch (err) {
      console.error("Error checking admin access:", err);
      return false;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.user) {
        const isAdmin = await checkAdminAccess(data.user.email || "");
        if (!isAdmin) {
          setError("Unauthorized: Admin access required");
          await supabase.auth.signOut();
          return false;
        }
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Sign in failed";
      setError(errorMessage);
      return false;
    }
  };

  const signInWithMagicLink = async (email: string) => {
    try {
      setError(null);

      // Get the correct redirect URL from environment or window
      const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/admin`
        : typeof window !== "undefined"
          ? `${window.location.origin}/admin`
          : "";

      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (signInError) throw signInError;
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Magic link sign in failed";
      setError(errorMessage);
      return false;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      setUser(null);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Sign out failed";
      setError(errorMessage);
      return false;
    }
  };

  return {
    user,
    loading,
    error,
    signInWithEmail,
    signInWithMagicLink,
    signOut,
    isAuthenticated: !!user,
  };
}

