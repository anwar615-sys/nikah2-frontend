import { route } from "../registry.js";
import { rpc } from "../client.js";

// Every admin function checks is_admin() in the database and writes the audit log.
const A = "/admin";

route("GET", `${A}/analytics`, async () => rpc("admin_analytics"));

route("GET", `${A}/users`, async ({ query }) => rpc("admin_users", { f: query }));
route("GET", `${A}/users/flagged`, async () => rpc("admin_users_flagged"));
route("POST", `${A}/users/bulk`, async ({ body = {} }) => rpc("admin_users_bulk", { ids: body.ids || [], action: body.action }));
route("GET", `${A}/users/:id`, async ({ params }) => rpc("admin_user_get", { uid: params.id }));
route("DELETE", `${A}/users/:id`, async ({ params }) => {
  await rpc("admin_user_delete", { uid: params.id });
  return null;
});
route("PATCH", `${A}/users/:id/profile`, async ({ params, body = {} }) =>
  rpc("admin_user_profile_update", { uid: params.id, patch: body }),
);
route("PATCH", `${A}/users/:id/block`, async ({ params, body = {} }) =>
  rpc("admin_user_block", { uid: params.id, blocked: !!body.blocked }),
);
route("POST", `${A}/users/:id/suspend`, async ({ params, body = {} }) =>
  rpc("admin_user_suspend", { uid: params.id, duration: body.duration || "24h", reason: body.reason || "" }),
);
route("DELETE", `${A}/users/:id/suspend`, async ({ params }) => {
  await rpc("admin_user_unsuspend", { uid: params.id });
  return null;
});
route("POST", `${A}/users/:id/verification`, async ({ params, body = {} }) =>
  rpc("admin_user_verification", { uid: params.id, decision: body.decision }),
);
route("GET", `${A}/users/:id/calls`, async ({ params }) => rpc("admin_user_calls", { uid: params.id }));

route("GET", `${A}/verifications`, async () => rpc("admin_verifications"));

route("GET", `${A}/reports`, async ({ query }) => rpc("admin_reports", { f: query }));
route("PATCH", `${A}/reports/:id`, async ({ params, body = {} }) => rpc("admin_report_update", { rid: params.id, status: body.status }));
route("GET", `${A}/reports/:id/context`, async ({ params }) => rpc("admin_report_context", { rid: params.id }));

route("GET", `${A}/audit-log`, async ({ query }) =>
  rpc("admin_audit_log", { page: Number(query.page) || 1, lim: Number(query.limit) || 50 }),
);
route("GET", `${A}/subscriptions`, async () => rpc("admin_subscriptions"));
route("GET", `${A}/payments`, async ({ query }) => rpc("admin_payments", { lim: Number(query.limit) || 30 }));
