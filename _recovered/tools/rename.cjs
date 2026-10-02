// Scope-aware rename of top-level minified identifiers using the TypeScript checker.
const ts = require('/opt/npm-tools/node_modules/typescript');
const fs = require('fs');
const [, , inFile, outFile] = process.argv;
const MAP = {
  // shared infra
  It: 'AuthContext', Lt: 'useAuth', Ao: 'AuthProvider',
  Vt: 'API_BASE', Ht: 'TOKENS_KEY', Ut: 'getTokens', Wt: 'setTokens', Gt: 'ApiError',
  Kt: 'refreshPromise', qt: 'refreshTokens', Jt: 'apiRequest', B: 'api',
  Yt: 'GENDER_EMOJI', Xt: 'seekingLabel', Zt: 'toPersonCard', Qt: 'FEATURED_COUNTRIES', $t: 'COUNTRIES',
  en: 'menuItemStyle', On: 'COUNTRIES_ISO_URL', kn: 'STATES_URL',
  ga: 'SOCKET_URL', va: 'getSocket', ya: 'disconnectSocket', ba: 'useScreenshotGuard',
  U: 'ADMIN_THEME',
  // layout / shared UI
  zt: 'Navbar', tn: 'SupportChatWidget', nn: 'OnlineNowPanel', on: 'Toast', fn: 'Footer',
  Tn: 'GoogleSignInButton', Fa: 'GoogleButton', Ln: 'SearchableSelect', Rn: 'CountryStateSelect',
  Yn: 'PlanBadge', Qn: 'UpgradeModal', tr: 'ConfirmDialog', qn: 'ReportBlockModal', Zn: 'ProfileModal',
  En: 'LoginPasswordToggle', Wn: 'SignupPasswordToggle', pr: 'AccountPasswordToggle',
  fr: 'AccountField', wr: 'ProfileField', Bn: 'UsernameField',
  // public pages
  an: 'HomePage', pn: 'HowItWorksPage', dn: 'PlanFeatureCell', hn: 'WayDifferentSection',
  gn: 'FeaturesPage', bn: 'StoryCard', xn: 'FeatureCard', Sn: 'TestimonialCard', Cn: 'SuccessStoriesPage',
  Dn: 'LoginPage', Gn: 'SignupPage', Na: 'SafetyPage',
  // member pages
  er: 'ExplorePage', mr: 'AccountPage', Tr: 'CompleteProfilePage',
  // messaging
  xa: 'TimedImageMessage', Sa: 'ChatImage', Ca: 'SendImageModal', Ta: 'MessageRow', Ea: 'MessageComposer',
  Da: 'ConversationListItem', Oa: 'CreateGroupModal', ka: 'GroupSettingsModal', ja: 'MessagingPage',
  // admin
  Ka: 'AdminLoginPage', Ja: 'AdminDashboard', to: 'AdminUsersTable', no: 'AdminCheckbox', ro: 'AdminSelect',
  io: 'AdminFlaggedUsers', ao: 'AdminUsersPage', lo: 'AdminDefRow', uo: 'AdminUserTabs', fo: 'AdminEditProfile',
  po: 'AdminUserCalls', mo: 'AdminUserDetail', ho: 'AdminVerificationPhoto', go: 'AdminVerificationsPage',
  xo: 'AdminReportContext', So: 'AdminReportsPage', wo: 'AdminAuditLogPage', Do: 'AdminBillingPage', ko: 'AdminLayout',
  // calls
  Vo: 'CallProvider', Wo: 'MicIcon', Go: 'CameraIcon', Ko: 'SpeakerIcon', qo: 'SpeakerToggleIcon',
  Zo: 'CallAvatar', ns: 'VideoTile', rs: 'CallScreen', as: 'CallNotice', os: 'CallOverlay',
  // routing
  ss: 'RequireAuth', cs: 'RequireAdmin', ls: 'ScrollToTop', us: 'ProfileCompletionGate', ds: 'App',
  // router + hooks
  ct: 'Navigate', dt: 'Routes', lt: 'Route', Tt: 'BrowserRouter', Ot: 'Link', ze: 'useNavigate', R: 'useLocation', Pt: 'useSearchParams', Ve: 'useParams',
  Er: 'CallContext', Dr: 'useCall', rn: 'useInView', Mo: 'getAudioContext', Jo: 'useAudioOutputs',
  // libraries
  v: 'React', y: 'ReactDOMClient', z: 'jsxRuntime',
};
const src = fs.readFileSync(inFile, 'utf8');
const host = {
  getScriptFileNames: () => ['/in.js'], getScriptVersion: () => '1',
  getScriptSnapshot: (f) => (f === '/in.js' ? ts.ScriptSnapshot.fromString(src) : undefined),
  getCurrentDirectory: () => '/', getCompilationSettings: () => ({ allowJs: true, noLib: true, noResolve: true }),
  getDefaultLibFileName: () => 'lib.d.ts', fileExists: (f) => f === '/in.js', readFile: () => src,
};
const ls = ts.createLanguageService(host);
const program = ls.getProgram();
const sf = program.getSourceFile('/in.js');
const checker = program.getTypeChecker();

// Collect top-level declaration symbols.
const targets = new Map();
function addDecl(nameNode) {
  if (nameNode && ts.isIdentifier(nameNode) && MAP[nameNode.text]) {
    const sym = checker.getSymbolAtLocation(nameNode);
    if (sym) targets.set(sym, MAP[nameNode.text]);
  }
}
for (const st of sf.statements) {
  if (ts.isFunctionDeclaration(st) || ts.isClassDeclaration(st)) addDecl(st.name);
  if (ts.isVariableStatement(st)) st.declarationList.declarations.forEach((d) => addDecl(d.name));
}
const edits = [];
(function walk(n) {
  if (ts.isIdentifier(n) && MAP[n.text]) {
    const sym = checker.getSymbolAtLocation(n);
    if (sym && targets.has(sym)) {
      // shorthand property `{ x }` must become `{ x: NewName }`
      const p = n.parent;
      if (p && ts.isShorthandPropertyAssignment(p) && p.name === n)
        edits.push([n.getStart(sf), n.getEnd(), `${n.text}: ${targets.get(sym)}`]);
      else edits.push([n.getStart(sf), n.getEnd(), targets.get(sym)]);
    }
  }
  ts.forEachChild(n, walk);
})(sf);
edits.sort((a, b) => b[0] - a[0]);
let out = src;
for (const [s, e, t] of edits) out = out.slice(0, s) + t + out.slice(e);
fs.writeFileSync(outFile, out);
const found = new Set([...targets.values()]);
console.log('renamed', edits.length, 'refs;', found.size, 'of', Object.keys(MAP).length, 'symbols');
console.log('missing:', Object.entries(MAP).filter(([, v]) => !found.has(v)).map(([k]) => k).join(' '));
