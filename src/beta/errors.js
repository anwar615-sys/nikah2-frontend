import { ApiError } from "../lib/apiError.js";

const STATUS = {
  AUTH_REQUIRED: 401,
  INVALID_CREDENTIALS: 401,
  FORBIDDEN: 403,
  PLAN_REQUIRED: 403,
  CHAT_LIMIT_REACHED: 403,
  TIMED_IMAGE_NOT_ACCESSIBLE: 410,
  NOT_FOUND: 404,
  VALIDATION_FAILED: 400,
  CONFIRM_EMAIL_ON: 400,
  RATE_LIMITED: 429,
};

export function apiError(code, message) {
  return new ApiError(STATUS[code] || 400, code, message);
}

// Supabase Auth messages turned into plain, actionable text.
function fromAuthError(err) {
  const m = String(err.message || "");
  if (/invalid login credentials/i.test(m)) return apiError("INVALID_CREDENTIALS", "Incorrect email or password.");
  if (/email not confirmed/i.test(m))
    return apiError("CONFIRM_EMAIL_ON", "Sign-up is temporarily unavailable (email confirmation pending setup).");
  if (/already registered|already been registered|already exists/i.test(m))
    return apiError("VALIDATION_FAILED", "An account with this email already exists. Try logging in.");
  if (/database error saving new user/i.test(m))
    return apiError("VALIDATION_FAILED", "We couldn't create the account. The username may already be taken. Try another.");
  if (/password/i.test(m)) return apiError("VALIDATION_FAILED", m);
  if (/rate limit|too many/i.test(m)) return apiError("RATE_LIMITED", "Too many attempts. Please wait a minute and try again.");
  if (/invalid.*email|unable to validate email/i.test(m)) return apiError("VALIDATION_FAILED", "Please enter a valid email address.");
  if (/session|jwt|refresh token/i.test(m)) return apiError("AUTH_REQUIRED", "Please log in again.");
  return apiError("VALIDATION_FAILED", m || "Something went wrong. Please try again.");
}

export function toApiError(err) {
  if (err instanceof ApiError) return err;
  if (!err) return apiError("VALIDATION_FAILED", "Something went wrong. Please try again.");
  if (err.name === "TypeError" && /fetch|network/i.test(err.message || ""))
    return new ApiError(0, "NETWORK", "Couldn't reach the server. Check your connection and try again.");
  if (err.__isAuthError || /^Auth/.test(err.name || "")) return fromAuthError(err);

  const msg = String(err.message || "");
  const coded = /^([A-Z][A-Z_]+): ([\s\S]*)$/.exec(msg);
  if (coded) return apiError(coded[1], coded[2]);
  if (err.code === "42501" || /permission denied|row-level security/i.test(msg))
    return apiError("FORBIDDEN", "You don't have permission to do that.");
  if (err.code === "PGRST202") return apiError("NOT_FOUND", "Not found.");
  if (err.code === "22P02") return apiError("VALIDATION_FAILED", "Invalid request.");
  if (err.statusCode === "413" || /exceeded the maximum allowed size/i.test(msg))
    return apiError("VALIDATION_FAILED", "Photos must be under 5 MB.");
  if (/mime type/i.test(msg)) return apiError("VALIDATION_FAILED", "Photos must be JPG, PNG, WebP or GIF.");
  return apiError("VALIDATION_FAILED", msg || "Something went wrong. Please try again.");
}
