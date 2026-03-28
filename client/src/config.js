const ENV =
    typeof window !== "undefined" && window.__ENV__ ? window.__ENV__ : {};

export const API_URL =
    ENV.API_URL ||
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_BACK_END_URL ||
    "";

export const APP_ENV = ENV.APP_ENV ||
    import.meta.env.VITE_APP_ENV || "production";

export const API_KEY = ENV.API_KEY ||
    import.meta.env.VITE_API_KEY || "";