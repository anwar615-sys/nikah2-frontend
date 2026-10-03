var GENDER_EMOJI = { woman: `👩`, man: `🧔`, other: `🧑` };

function seekingLabel(e) {
  return e === `man` ? `Woman` : e === `woman` ? `Man` : `Anyone`;
}

function toPersonCard(e) {
  return {
    id: e.id,
    name: e.displayName,
    age: e.age,
    city: e.city,
    country: e.nationality,
    kids: e.hasKids || `—`,
    seeking: seekingLabel(e.gender),
    avatar: e.avatarUrl,
    gender: e.gender,
  };
}

var FEATURED_COUNTRIES = [
  `UAE`,
  `Qatar`,
  `Egypt`,
  `Oman`,
  `Saudi Arabia`,
  `Bangladesh`,
];

var COUNTRIES =
  `Afghanistan.Albania.Algeria.Argentina.Australia.Austria.Bahrain.Bangladesh.Belgium.Brazil.Canada.China.Denmark.Egypt.Finland.France.Germany.India.Indonesia.Iraq.Ireland.Italy.Japan.Jordan.Kuwait.Lebanon.Malaysia.Morocco.Netherlands.New Zealand.Nigeria.Norway.Oman.Pakistan.Philippines.Poland.Portugal.Qatar.Russia.Saudi Arabia.Singapore.South Africa.South Korea.Spain.Sri Lanka.Sweden.Switzerland.Syria.Thailand.Turkey.UAE.UK.US.Yemen`
    .split(`.`)
    .sort((e, t) => e.localeCompare(t));

var menuItemStyle = {
  width: `100%`,
  textAlign: `left`,
  padding: `11px 14px`,
  border: `none`,
  background: `transparent`,
  cursor: `pointer`,
  fontSize: 13,
  color: `var(--fg)`,
  borderBottom: `1px solid var(--line)`,
  fontFamily: `'DM Sans', sans-serif`,
};

var COUNTRIES_ISO_URL = `https://countriesnow.space/api/v0.1/countries/iso`;

var STATES_URL = `https://countriesnow.space/api/v0.1/countries/states/q`;

export {
  COUNTRIES,
  COUNTRIES_ISO_URL,
  FEATURED_COUNTRIES,
  GENDER_EMOJI,
  STATES_URL,
  menuItemStyle,
  toPersonCard,
};
