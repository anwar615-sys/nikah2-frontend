const ts = (()=>{try{return require('typescript')}catch(e){return require('/opt/npm-tools/node_modules/typescript')}})();
const path=require('path'), fs=require('fs');
const files=[]; (function w(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f); fs.statSync(p).isDirectory()?w(p):/\.jsx?$/.test(f)&&files.push(p);}})(process.argv[2]);
const prog=ts.createProgram(files,{allowJs:true,checkJs:true,noEmit:true,jsx:ts.JsxEmit.Preserve,lib:['lib.es2023.d.ts','lib.dom.d.ts','lib.dom.iterable.d.ts'],module:ts.ModuleKind.ESNext,moduleResolution:ts.ModuleResolutionKind.Bundler,target:ts.ScriptTarget.ES2022,skipLibCheck:true,types:[]});
const want=new Set([2304,2552,2632,2540,2588,1005,1109,1128,1161,2300,2451,2307,2305,2614,2724]);
const counts={};
for(const d of ts.getPreEmitDiagnostics(prog)){ if(!want.has(d.code))continue; const m=ts.flattenDiagnosticMessageText(d.messageText,' ');
  if(d.code===2307 && /'(react|react-dom\/client|react-router-dom|socket\.io-client)'/.test(m)) continue;
  const k=d.code; counts[k]=(counts[k]||0)+1;
  if(counts[k]<=15){ const {line}=d.file?d.file.getLineAndCharacterOfPosition(d.start):{line:0}; console.log(`${d.code} ${d.file?path.relative('.',d.file.fileName):''}:${line+1} ${m}`);} }
console.log('counts',counts);
