import { COUNTRIES_ISO_URL } from "./people";

var countriesCache = null;

function readSessionCache(e) {
  try {
    let t = sessionStorage.getItem(e);
    return t ? JSON.parse(t) : null;
  } catch {
    return null;
  }
}

function writeSessionCache(e, t) {
  try {
    sessionStorage.setItem(e, JSON.stringify(t));
  } catch {}
}

function flagEmoji(e) {
  return !e || e.length !== 2
    ? ``
    : String.fromCodePoint(
        ...[...e.toUpperCase()].map((e) => 127462 + (e.charCodeAt(0) - 65)),
      );
}

function loadCountries() {
  if (countriesCache) return countriesCache;
  let e = readSessionCache(`nikha2_countries_v2`);
  return e
    ? ((countriesCache = Promise.resolve(e)), countriesCache)
    : ((countriesCache = fetch(COUNTRIES_ISO_URL)
        .then((e) => {
          if (!e.ok) throw Error(`Failed to load country list.`);
          return e.json();
        })
        .then((e) => {
          if (e?.error || !Array.isArray(e?.data))
            throw Error(`Unexpected country list response.`);
          let t = e.data
            .map((e) => ({
              name: e.name,
              code: e.Iso2,
              flag: flagEmoji(e.Iso2),
            }))
            .filter((e) => e.name && e.code)
            .sort((e, t) => e.name.localeCompare(t.name));
          return (writeSessionCache(`nikha2_countries_v2`, t), t);
        })
        .catch((e) => {
          throw ((countriesCache = null), e);
        })),
      countriesCache);
}

export { loadCountries, readSessionCache, writeSessionCache };
