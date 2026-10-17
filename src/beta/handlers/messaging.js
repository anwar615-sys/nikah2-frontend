import { route } from "../registry.js";
import { rpc } from "../client.js";
import { signedUrl, signedUrls } from "../media.js";

// Database messages carry a private storage path; the page needs a short-lived link instead.
export async function withMedia(messages) {
  const links = await signedUrls("chat-media", messages.filter((m) => m.mediaPath).map((m) => m.mediaPath));
  return messages.map(({ mediaPath, ...m }) => (mediaPath ? { ...m, media: { mediaUrl: links[mediaPath] || null } } : m));
}

route("GET", "/messaging/conversations/summary", async () => rpc("conversations_summary"));

route("POST", "/messaging/conversations", async ({ body = {} }) => rpc("start_conversation", { target: body.targetUserId }));

route("GET", "/messaging/conversations/:id/messages", async ({ params, query }) => {
  const r = await rpc("messages_list", { conv: params.id, lim: Number(query.limit) || 50 });
  return { items: await withMedia(r.items || []) };
});

route("POST", "/messaging/conversations/:id/messages", async ({ params, body = {} }) => {
  const r = await rpc("send_message", {
    conv: params.id,
    kind: body.type,
    body: body.text ?? null,
    media: body.mediaId ?? null,
    dur: body.durationSeconds ?? null,
    noshot: body.noScreenshot ?? false,
  });
  const [message] = await withMedia([r.message]);
  return { message };
});

route("PATCH", "/messaging/conversations/:id/read", async ({ params, body = {} }) => {
  await rpc("mark_read", { conv: params.id, ids: body.messageIds || [] });
  return null;
});

route("GET", "/messaging/conversations/:id/settings", async ({ params }) => rpc("conv_settings_get", { conv: params.id }));
route("PATCH", "/messaging/conversations/:id/settings", async ({ params, body = {} }) =>
  rpc("conv_settings_update", { conv: params.id, patch: body }),
);

route("POST", "/messaging/conversations/:id/unmatch", async ({ params }) => {
  await rpc("unmatch", { conv: params.id });
  return null;
});

// View-once photo: the database records the view, then a 60-second link is issued.
route("POST", "/media/timed-images/:id/view", async ({ params }) => {
  const r = await rpc("timed_image_view", { mid: params.id });
  return { signedUrl: await signedUrl("chat-media", r.path, 60), durationSecondsRemaining: r.durationSeconds };
});
