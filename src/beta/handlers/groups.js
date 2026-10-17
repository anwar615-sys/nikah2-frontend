import { route } from "../registry.js";
import { rpc } from "../client.js";

route("POST", "/groups", async ({ body = {} }) => rpc("group_create", { name: body.name, member_ids: body.memberIds || [] }));
route("GET", "/groups/:id", async ({ params }) => rpc("group_get", { gid: params.id }));
route("PATCH", "/groups/:id", async ({ params, body = {} }) => rpc("group_update", { gid: params.id, name: body.name }));
route("DELETE", "/groups/:id", async ({ params }) => {
  await rpc("group_delete", { gid: params.id });
  return null;
});
route("POST", "/groups/:id/members", async ({ params, body = {} }) => rpc("group_add_member", { gid: params.id, uid: body.userId }));
route("DELETE", "/groups/:id/members/:uid", async ({ params }) => {
  await rpc("group_remove_member", { gid: params.id, uid: params.uid });
  return null;
});
