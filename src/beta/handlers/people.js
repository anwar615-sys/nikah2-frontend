import { route } from "../registry.js";
import { rpc } from "../client.js";

route("GET", "/people", async ({ query }) => rpc("people_search", { f: query }));
route("GET", "/people/ai-match", async () => rpc("people_ai_match"));
route("GET", "/people/:id", async ({ params }) => rpc("person_get", { pid: params.id }));

route("POST", "/users/:id/block", async ({ params }) => {
  await rpc("block_user", { uid: params.id });
  return null;
});

route("POST", "/reports", async ({ body = {} }) => {
  await rpc("report_create", {
    t_type: body.targetType,
    t_id: body.targetId,
    reason: body.reason,
    details: body.details ?? null,
  });
  return null;
});
