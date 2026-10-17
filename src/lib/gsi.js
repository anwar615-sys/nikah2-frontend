// Loads Google's sign-in script only on pages that show a Google button,
// so other pages make no request to Google.
let loading = null;

export function loadGsi() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.accounts?.id) return Promise.resolve();
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => {
        loading = null;
        reject(new Error("Google sign-in could not load."));
      };
      document.head.appendChild(s);
    });
  }
  return loading;
}

// Google sign-in is not offered during the public beta.
export const GOOGLE_SIGNIN_ENABLED = import.meta.env.VITE_BETA !== "true";
