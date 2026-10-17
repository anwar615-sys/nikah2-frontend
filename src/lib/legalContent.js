// Privacy Policy, Cookie Policy, Beta Notice and the beta additions to the Terms.
// Written for India's Digital Personal Data Protection Act 2023 (DPDP), with the
// basics members in the EU/UK expect under the GDPR. Company details come from
// legalConfig.js. Have a lawyer review these texts before the full launch.
//
// Each section is [title, body, id?]; body is a string or a list of paragraphs.
import { legalValue as v } from "./legalConfig.js";

const company = () => v("companyName");

export const PRIVACY_SECTIONS = () => [
  [
    `1. Who we are`,
    [
      `Nikha2 ("Nikha2", "we", "us") is a matrimonial service for people looking for a second chance at marriage. It is run by ${company()}, ${v("registeredAddress")}. For this Policy, we are the "Data Fiduciary" (DPDP Act) and "controller" (GDPR) of your personal data.`,
      `Nikha2 is currently an early-access beta. The Beta Notice explains what that means.`,
      `Questions about privacy: ${v("contactEmail")}.`,
    ],
  ],
  [
    `2. What we collect`,
    [
      `Account details: your name, email address, username, phone number and country code, and your password (stored only as a secure hash by our sign-in provider; we never see it).`,
      `Profile details you choose to add: gender, age range, nationality, state or city, religion, whether you have children, a short bio, hobbies and a profile photo, and who may see your contact details.`,
      `Verification photos: the ID or selfie photos you upload to get a verified badge.`,
      `Your activity: messages and photos you send, view-once photo views, read receipts, conversations and groups you join, members you block, reports you make, and the plan you choose.`,
      `Plan records: during the beta, a record of each simulated payment (plan, amount, success or failure). No card or bank details are ever collected in the beta.`,
      `Consent records: which version of the Terms and this Policy you accepted, and when.`,
      `Technical data: when you were last active (to show "online now"), and your IP address and browser details, which our hosting providers process in their logs to run and secure the service.`,
    ],
  ],
  [
    `3. Sensitive details: religion and family`,
    [
      `Religion and whether you have children are personal. You share them so that we can show you compatible members, and they appear on your profile to other members. We ask for your explicit consent to this when you sign up and record that consent.`,
      `You can change these details at any time in your account. You can withdraw your consent by deleting your account (see section 8). We never use these details for advertising and never sell them.`,
    ],
  ],
  [
    `4. Why we use your data, and on what basis`,
    [
      `To run the service you signed up for: your account, profile, matching, Explore, messaging and plans (your consent, and performing our agreement with you).`,
      `To keep members safe: verifying profiles, reviewing reports, blocking or suspending accounts that break the rules, and preventing fraud and abuse (legitimate uses permitted by law, and our legitimate interest in a safe service).`,
      `To meet legal obligations, such as responding to lawful requests from authorities.`,
      `To remember optional settings such as your theme, only if you allow it (see the Cookie Policy).`,
      `We do not use your data for advertising, we do not sell it, and we do not use automated decisions that have legal or similarly significant effects on you. "AI-Based Match" in the beta is a simple ranking based on shared profile details.`,
    ],
  ],
  [
    `5. Who can see your information`,
    [
      `Signed-in members can see your profile: name, age range, gender, city or state, nationality, religion, whether you have children, bio, hobbies, photo, verified and plan badges, and whether you are online. Your email and phone number are shown only as your contact-visibility setting allows.`,
      `Visitors who are not signed in see only your first name and basic details, never your photo or contact details.`,
      `Messages are visible only to the members of that conversation. Our moderators can read the messages connected to a report, to investigate it. Every moderator action is recorded in an audit log that cannot be edited.`,
      `During the beta, messages are encrypted in transit and stored encrypted by our database provider, but they are not end-to-end encrypted. End-to-end encryption is planned for the full launch.`,
    ],
  ],
  [
    `6. Service providers and where your data is stored`,
    [
      `Supabase (database, sign-in, file storage and real-time chat). Your data is stored on Amazon Web Services servers in Mumbai, India.`,
      `Vercel (hosts the website). Pages are delivered through Vercel's worldwide network, so your request and IP address may be handled outside India.`,
      `countriesnow.space (country and state lists on the sign-up form). When the list loads, your browser contacts this service, which receives your IP address. We send it none of your details.`,
      `These providers act only on our instructions and under data-processing terms. If you live outside India, your data is transferred to and stored in India; where the GDPR applies, we rely on the safeguards in our providers' data-processing agreements.`,
      `We do not use advertising networks, analytics trackers or social-media pixels. Google sign-in is not used during the beta.`,
    ],
  ],
  [
    `7. How long we keep it`,
    [
      `We keep your account and profile while your account is open.`,
      `When you delete your account, we delete your account, profile, profile and verification photos, consent records, blocks and read receipts straight away. Messages and chat photos you sent stay in the other person's conversation without your name, because they are part of their conversation too. Reports and plan records are kept without your name for safety and accounting.`,
      `If a moderator closes an account for breaking the rules, we remove the personal details from it and keep the minimum needed to stop the person rejoining and to handle any dispute.`,
      `Deleted data can remain in our providers' backups for a short time until those backups expire.`,
      `If the beta ends, we will tell members in advance before any data is moved to the full service or reset.`,
    ],
  ],
  [
    `8. Your rights`,
    [
      `Access: download a copy of your data at any time from Account → Privacy → "Download my data".`,
      `Correction: edit your details in your account, or ask us to correct anything you can't change yourself.`,
      `Erasure: delete your account from Account → Privacy → "Delete account".`,
      `Withdraw consent: you can withdraw consent at any time, as easily as you gave it, by changing your details, your cookie settings, or deleting your account. Withdrawing doesn't affect what we did before.`,
      `Nominate: under the DPDP Act you may nominate someone to exercise these rights if you die or become unable to. Write to the Grievance Officer to do so.`,
      `Grievances: contact our Grievance Officer (section 12). If you are not satisfied with our answer, you can complain to the Data Protection Board of India. Members in the EU or UK may also object to processing, ask for their data in a portable format, and complain to their local data protection authority.`,
      `We answer requests as soon as we can and within 30 days at the latest.`,
    ],
  ],
  [
    `9. Age limit`,
    `Nikha2 is only for adults aged 18 or over. We do not knowingly collect data from anyone under 18, and we close accounts we find belong to someone under 18.`,
  ],
  [
    `10. Security`,
    [
      `Connections to Nikha2 are encrypted (HTTPS). Passwords are stored only as secure hashes. Database rules make sure each member can reach only their own data and the conversations they belong to. Private photos are stored privately and shown through links that expire within minutes. Moderator actions are logged.`,
      `No service can be perfectly secure. If a breach affects your personal data, we will inform you and the Data Protection Board of India as the law requires.`,
    ],
  ],
  [`11. Cookies and similar storage`, `We use only the browser storage needed to run the site, plus optional preference storage if you allow it. See the Cookie Policy for the full list and to change your choice.`],
  [
    `12. Contact and Grievance Officer`,
    [
      `Grievance Officer: ${v("grievanceOfficerName")}, ${v("grievanceOfficerEmail")}.`,
      `Company: ${company()}, ${v("registeredAddress")}. Email: ${v("contactEmail")}.`,
    ],
  ],
  [`13. Changes to this Policy`, `We will update the "Last updated" date when this Policy changes, and tell signed-in members about significant changes before they apply. If a change needs your consent, we will ask again.`],
];

// Every item Nikha2 stores in your browser. Names match the code exactly.
export const COOKIE_TABLE = [
  ["nikha2-auth", "Essential", "Keeps you signed in (sign-in session).", "Until you log out"],
  ["nikha2_tokens", "Essential", "Tells the site you are signed in.", "Until you log out"],
  ["nikha2-consent", "Essential", "Remembers your cookie choice and the policy version you saw.", "Until you change it or the policy changes"],
  ["nikha2_countries_v2", "Essential", "Keeps the country list during your visit so the sign-up form loads quickly (session storage).", "Until you close the tab"],
  ["nikha2-theme", "Preferences", "Remembers light or dark theme.", "Until you change it or clear it"],
  ["nikha2-motion", "Preferences", "Remembers whether animations are on or off.", "Until you change it or clear it"],
  ["nikha2-hero-paused", "Preferences", "Remembers that you paused the homepage animation.", "Until you change it or clear it"],
];

export const COOKIE_SECTIONS = () => [
  [
    `1. What we use`,
    [
      `Nikha2 does not set advertising or tracking cookies, and no third party places cookies through our site. We use your browser's storage (local storage and session storage), which works like cookies, for the items listed below.`,
      `Essential items are needed for signing in and for remembering your cookie choice; the site can't work without them, so they are always on.`,
      `Preference items remember settings such as light or dark theme. They are optional: we store them only if you choose "Accept all" or allow Preferences under "Customise". With "Essential only", your settings still work during your visit but are not remembered.`,
      `Analytics: we don't use any analytics today. If we ever add them, they will be off unless you switch them on.`,
    ],
  ],
  [`2. Your choice`, `When you first visit, we ask you to choose "Accept all", "Essential only" or "Customise". You can change your choice at any time with the "Change cookie settings" button on this page or the "Cookie settings" link at the bottom of every page. Choosing "Essential only" also removes any preference items already saved.`],
  [`3. Other sites we contact`, `The sign-up form loads country and state lists from countriesnow.space, which receives your IP address when the list loads. Fonts are served from our own site, not from Google.`],
  [`4. Questions`, `Contact ${v("contactEmail")}. Our Privacy Policy explains how we handle personal data.`],
];

export const BETA_SECTIONS = () => [
  [`What "early access beta" means`, `Nikha2 is open to the public as an early-access beta so members can start meeting each other while we finish the full service. Everything you see works with real members, but features may change, and occasionally something may not work as expected.`],
  [
    `No real payments`,
    [
      `Choosing Basic or Premium during the beta opens a "Beta checkout – no charge" screen. No card is needed and no money is taken. Your plan changes straight away so you can try its features.`,
      `Before paid plans start, we will tell you, and you will only be charged if you choose to pay at that point.`,
    ],
  ],
  [
    `Not included yet`,
    [`Real payments.`, `Voice and video calls.`, `End-to-end encrypted chats (messages are encrypted in transit and at rest, but not end-to-end).`, `Email notifications.`, `Sign-in with Google.`],
  ],
  [`Your data`, `We plan to carry your account and profile into the full launch. If a reset is ever needed, we will tell members at least 14 days in advance so you can download your data first. The Privacy Policy applies in full during the beta.`],
  [`Feedback and safety`, `Tell us about problems through the support chat. Our safety rules and the Terms apply during the beta, and moderators review every report.`],
];

export const BETA_TERMS_SECTION = () => [
  `13. Early access beta`,
  `While Nikha2 is in its early-access beta: no payments are taken (plan purchases are simulated and free of charge), features may change or be withdrawn, and the service is provided "as is". We may reset beta data only after telling members at least 14 days in advance. The Beta Notice gives the details.`,
  "beta-terms",
];

export const REFUND_SECTION = (beta) => [
  beta ? `14. Refunds` : `13. Refunds`,
  beta
    ? `No payments are taken during the beta, so there is nothing to refund. Before paid plans launch, the refund policy for paid plans will be published here and shown at checkout before you pay.`
    : `Plan prices, renewals and refunds are shown at checkout before you pay. If you believe you were charged in error, contact us and we will look into it promptly.`,
  "refunds",
];
