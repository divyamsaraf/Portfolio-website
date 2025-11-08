import axios from "axios";
import { createClient } from "@supabase/supabase-js";

/**
 * Axios instance with Supabase auth token
 * Automatically adds auth header to all requests
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const axiosWithAuth = axios.create({});

// Add auth token to all requests
axiosWithAuth.interceptors.request.use(
  async (config: any) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token && config.headers) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
    } catch (err) {
      console.error("Error getting auth token:", err);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 responses by redirecting to login
axiosWithAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to admin login
      if (typeof window !== "undefined") {
        window.location.href = "/admin";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosWithAuth;

