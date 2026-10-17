// Route table shared by the handler files. Literal routes must be registered before
// parameterised ones on the same prefix (e.g. /people/ai-match before /people/:id).
export const routes = [];

export function route(method, pattern, handler) {
  const keys = [];
  const re = new RegExp(
    "^" + pattern.replace(/\//g, "\\/").replace(/:(\w+)/g, (_, k) => (keys.push(k), "([^/?]+)")) + "\\/?$",
  );
  routes.push({ method, re, keys, handler });
}
