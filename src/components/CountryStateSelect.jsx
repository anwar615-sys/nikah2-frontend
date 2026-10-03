import * as React from "react";
import { SearchableSelect } from "./SearchableSelect";
import {
  loadCountries,
  readSessionCache,
  writeSessionCache,
} from "../lib/countries";
import { STATES_URL } from "../lib/people";

async function Fn(e) {
  if (!e) return [];
  let t = `nikha2_states_v2_${e}`,
    n = readSessionCache(t);
  if (n) return n;
  try {
    let n = await fetch(`${STATES_URL}?country=${encodeURIComponent(e)}`);
    if (!n.ok) return [];
    let r = await n.json();
    if (r?.error) return [];
    let i = (r?.data?.states || [])
      .map((e) => e.name)
      .sort((e, t) => e.localeCompare(t));
    return (writeSessionCache(t, i), i);
  } catch {
    return [];
  }
}

var In = {
  width: `100%`,
  padding: `11px 14px`,
  borderRadius: 12,
  border: `1.5px solid var(--line)`,
  background: `var(--bg)`,
  color: `var(--fg)`,
  fontSize: 13.5,
  fontFamily: `var(--font-ui)`,
  outline: `none`,
};

function CountryStateSelect({
  country: e,
  state: t,
  onCountryChange: n,
  onStateChange: r,
  inputStyle: i = In,
  countryLabel: a = `Country`,
  stateLabel: o = `Location (State/Region)`,
  labelStyle: s,
  required: c = !1,
}) {
  let [l, u] = (0, React.useState)([]),
    [d, f] = (0, React.useState)(!0),
    [p, m] = (0, React.useState)([]),
    [h, g] = (0, React.useState)(!1),
    [_, y] = (0, React.useState)(!1);
  (0, React.useEffect)(() => {
    let e = !1;
    return (
      loadCountries()
        .then((t) => {
          e || u(t);
        })
        .catch(() => {
          e || u([]);
        })
        .finally(() => {
          e || f(!1);
        }),
      () => {
        e = !0;
      }
    );
  }, []);
  let b = (0, React.useCallback)((e) => {
    if (!e) {
      (m([]), y(!1));
      return;
    }
    (g(!0),
      y(!1),
      Fn(e)
        .then((e) => {
          (m(e), y(e.length === 0));
        })
        .finally(() => g(!1)));
  }, []);
  (0, React.useEffect)(() => {
    b(e);
  }, [e]);
  let x = (e) => {
      (n(e), r(``));
    },
    S = l.map((e) => e.name);
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        {s && <label style={s}>{a}</label>}
        <SearchableSelect
          value={e}
          onChange={x}
          options={S}
          placeholder={`Select ${c ? `your ` : ``}country`}
          loading={d}
          inputStyle={i}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        {s && <label style={s}>{o}</label>}
        {_ && e ? (
          <input
            type="text"
            value={t}
            onChange={(e) => r(e.target.value)}
            placeholder="Enter state/region"
            style={i}
          />
        ) : (
          <SearchableSelect
            value={t}
            onChange={r}
            options={p}
            placeholder={e ? `Select state/region` : `Select a country first`}
            loading={h}
            disabled={!e}
            inputStyle={i}
            emptyLabel={h ? `Loading…` : `No states/regions found`}
          />
        )}
      </div>
    </>
  );
}

export { CountryStateSelect };
