// Supabase Realtime presented as the Socket.IO events the chat page already uses:
//   receives: message:new {conversationId, message}, typing:update {conversationId, isTyping}
//   sends:    typing:start / typing:stop {conversationId, targetUserId}
// Call events (call:*) are not part of the beta and are ignored.

// Same shape as the database's _message_json(): view-once photo paths are never exposed.
export function rowToMessage(r) {
  return {
    id: r.id,
    conversationId: r.conversation_id,
    senderId: r.sender_id,
    type: r.type,
    text: r.text,
    createdAt: r.created_at,
    ...(r.type === "image" ? { mediaPath: r.media_path } : {}),
    ...(r.type === "timed_image"
      ? { timed: { durationSeconds: r.duration_seconds ?? 5, noScreenshot: !!r.no_screenshot } }
      : {}),
  };
}

export async function createBetaSocket({ supabase, meId, conversationIds = [], dispatch, mapMessages = async (m) => m }) {
  const typingChannels = new Map();

  // Row-level security limits these events to conversations the member belongs to.
  const messages = supabase
    .channel(`messages:${meId}`)
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, async (payload) => {
      const r = payload?.new;
      if (!r || r.sender_id === meId) return; // the sender already shows their own message
      joinTyping(r.conversation_id);
      const [message] = await mapMessages([rowToMessage(r)]);
      dispatch("message:new", { conversationId: r.conversation_id, message });
    })
    .subscribe();

  function joinTyping(conversationId) {
    if (!conversationId || typingChannels.has(conversationId)) return typingChannels.get(conversationId);
    const ch = supabase
      .channel(`typing:${conversationId}`)
      .on("broadcast", { event: "typing" }, (msg) => {
        const p = msg?.payload;
        if (!p || p.from === meId) return;
        dispatch("typing:update", { conversationId: p.conversationId, isTyping: !!p.isTyping });
      })
      .subscribe();
    typingChannels.set(conversationId, ch);
    return ch;
  }

  conversationIds.forEach(joinTyping);

  return {
    send(event, payload = {}) {
      if (event !== "typing:start" && event !== "typing:stop") return;
      const ch = joinTyping(payload.conversationId);
      ch?.send({
        type: "broadcast",
        event: "typing",
        payload: { conversationId: payload.conversationId, from: meId, isTyping: event === "typing:start" },
      });
    },
    async stop() {
      await supabase.removeChannel(messages);
      for (const ch of typingChannels.values()) await supabase.removeChannel(ch);
      typingChannels.clear();
    },
  };
}

// Used by src/lib/socket.js in beta builds.
export async function startBetaSocket({ dispatch }) {
  const [{ getSupabase, rpc }, { withMedia }, { currentUserId }] = await Promise.all([
    import("./client.js"),
    import("./handlers/messaging.js"),
    import("./media.js"),
  ]);
  const meId = await currentUserId();
  if (!meId) return null;
  const summary = await rpc("conversations_summary").catch(() => ({ items: [] }));
  return createBetaSocket({
    supabase: getSupabase(),
    meId,
    conversationIds: (summary.items || []).map((c) => c.conversationId),
    dispatch,
    mapMessages: withMedia,
  });
}
