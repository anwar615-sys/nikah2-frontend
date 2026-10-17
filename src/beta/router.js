// Maps the existing REST paths (BLUEPRINT.md §6) to beta handlers.
import { routes } from "./registry.js";
import "./handlers/account.js";
import "./handlers/people.js";
import "./handlers/messaging.js";
import "./handlers/groups.js";
import "./handlers/admin.js";

export function match(method, path) {
  const [pathname, qs = ""] = String(path).split("?");
  const query = Object.fromEntries(new URLSearchParams(qs));
  for (const r of routes) {
    if (r.method !== method) continue;
    const m = r.re.exec(pathname);
    if (!m) continue;
    const params = {};
    r.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
    return { handler: r.handler, params, query };
  }
  return null;
}
