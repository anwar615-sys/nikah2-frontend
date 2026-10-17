import { getSupabase } from "./client.js";
import { apiError } from "./errors.js";
import { MAX_UPLOAD_BYTES, IMAGE_TYPES } from "./config.js";

export async function currentSession() {
  const { data } = await getSupabase().auth.getSession();
  return data?.session || null;
}

export async function currentUserId() {
  return (await currentSession())?.user?.id || null;
}

export function checkImage(file) {
  if (!file || typeof file !== "object") throw apiError("VALIDATION_FAILED", "Choose a photo first.");
  if (file.type && !IMAGE_TYPES.includes(file.type)) throw apiError("VALIDATION_FAILED", "Photos must be JPG, PNG, WebP or GIF.");
  if (file.size > MAX_UPLOAD_BYTES) throw apiError("VALIDATION_FAILED", "Photos must be under 5 MB.");
}

function extension(file) {
  const fromType = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" }[file.type];
  return fromType || (String(file.name || "").split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
}

export function newPath(prefix, file) {
  return `${prefix}/${crypto.randomUUID()}.${extension(file)}`;
}

export async function uploadImage(bucket, path, file) {
  checkImage(file);
  const sb = getSupabase();
  const { error } = await sb.storage.from(bucket).upload(path, file, { contentType: file.type || undefined, upsert: false });
  if (error) throw error;
  const publicUrl = bucket === "avatars" ? sb.storage.from(bucket).getPublicUrl(path).data.publicUrl : undefined;
  return { path, publicUrl };
}

export async function signedUrl(bucket, path, seconds = 300) {
  const { data, error } = await getSupabase().storage.from(bucket).createSignedUrl(path, seconds);
  if (error) throw error;
  return data.signedUrl;
}

// One request for many photo links; a link that fails is simply left empty.
export async function signedUrls(bucket, paths, seconds = 3600) {
  if (!paths.length) return {};
  const { data, error } = await getSupabase().storage.from(bucket).createSignedUrls(paths, seconds);
  if (error) return {};
  return Object.fromEntries((data || []).map((x) => [x.path, x.signedUrl]));
}
