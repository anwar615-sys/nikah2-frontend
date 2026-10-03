// Living hero shaders, ported verbatim from the approved prototype (version 6, boat removed).
// One full-screen pass over the photo: water ripples + glints, leaf sway, cloud billow and wisps, sunrise grade, dither.
export const VERTEX_SHADER = `attribute vec2 p; varying vec2 v; void main(){ v = p*0.5+0.5; gl_Position = vec4(p,0.,1.); }`;

export const FRAGMENT_SHADER = `precision highp float;
uniform sampler2D img; uniform float t; uniform vec2 res; uniform float imgAspect; varying vec2 v;
uniform float rise; uniform float dawn; uniform float sunStrength;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float s=0., a=.5; for(int i=0;i<5;i++){ s+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=.5; } return s; }
float box(vec2 uv, vec4 r, float e){ return smoothstep(r.x-e,r.x+e,uv.x)*(1.-smoothstep(r.z-e,r.z+e,uv.x))*smoothstep(r.y-e,r.y+e,uv.y)*(1.-smoothstep(r.w-e,r.w+e,uv.y)); }
void main(){
  // cover-fit: map screen to image uv (y down)
  vec2 s = vec2(v.x, 1.-v.y); float ca = res.x/res.y; vec2 uv = s;
  if (ca > imgAspect) { float k = imgAspect/ca; uv.y = (s.y-.5)*k+.5; } else { float k = ca/imgAspect; uv.x = (s.x-.5)*k+.5; }
  vec3 base = texture2D(img, uv).rgb;
  float lum = dot(base, vec3(.299,.587,.114));
  // ---- zones (image coordinates, 0..1, y down) ----
  float water = box(uv, vec4(-.1, .508, 1.1, .738), .01);
  water *= 1. - box(uv, vec4(.588, .40, .958, 1.2), .008);           // keep the couple still
  water = max(water, box(uv, vec4(.955, .53, 1.1, .785), .01));       // strip of water at the far right
  float blueish = smoothstep(.0, .08, base.b - base.r);
  water *= blueish;
  float leafZone = max(max(box(uv, vec4(-.1,-.1,.19,.30),.02), box(uv, vec4(.17,-.1,.86,.185),.02)), max(box(uv, vec4(.84,-.1,1.1,.175),.015), box(uv, vec4(.94,-.1,1.1,.30),.012)));
  float skyZone = (1.-smoothstep(.40,.47,uv.y)) * (1.-leafZone*.6);
  float skyCol = smoothstep(.55,.7,lum) * smoothstep(-.02,.06, base.b - base.g);
  // ---- leaves: gusting sway, stronger further from the branch line (top edge) ----
  float gust = .55 + .45*sin(t*.55 + 1.3*sin(t*.17));
  float hang = smoothstep(.0,.3, uv.y) + .25;
  vec2 lw = vec2(fbm(uv*7. + vec2(t*.7, 0.)) - .5, fbm(uv*7. + vec2(3.1, t*.62)) - .5);
  vec2 leafOff = lw * vec2(.010, .006) * gust * hang;
  leafOff.x += sin(t*1.7 + uv.y*18. + uv.x*6.) * .002 * gust * hang;
  // ---- water: layered ripples drifting toward the viewer ----
  float depth = smoothstep(.5,.75,uv.y);                                 // nearer water ripples more
  vec2 wq = vec2(uv.x*(6.+depth*10.), uv.y*60.);
  float r1 = noise(wq + vec2(t*.25, -t*.9));
  float r2 = noise(wq*1.9 + vec2(-t*.35, -t*1.4));
  vec2 waterOff = vec2((r1-.5)*.0035, (r2-.5)*.006) * (.35+depth*1.4);
  // ---- sky: slow billowing of existing clouds ----
  vec2 skyOff = vec2(fbm(uv*3.+vec2(t*.02,0.))-.5, fbm(uv*3.+vec2(5.,t*.015))-.5) * .006;
  vec2 off = leafOff*leafZone + waterOff*water + skyOff*skyZone*skyCol;
  vec3 col = texture2D(img, uv + off).rgb;
  // sparkles on the water: sun glints that come and go
  float g = noise(vec2(uv.x*140., uv.y*260.) + vec2(t*.9, -t*1.8)) * noise(vec2(uv.x*37., uv.y*80.) + vec2(-t*.4, t*.3));
  float glint = smoothstep(.62,.78, g) * water * (.25+depth*.9) * smoothstep(.5,.8,lum+.12);
  col += vec3(.96,1.,.98) * glint * .38;
  // light shimmer bands on the water surface
  col += water * (r1*r2 - .25) * .06;
  // drifting cloud wisps: slow, continuous, never repeating within view
  float c = fbm(vec2(uv.x*2.6 - t*.02, uv.y*5.5) + vec2(0., t*.004));
  float wisp = smoothstep(.55,.85,c) * skyZone * skyCol * (1.-smoothstep(.25,.45,uv.y)*.6);
  col = mix(col, vec3(1.), wisp*.4);
  // ---- sunrise: dawn grade, sun behind the far mountains, golden path on the water ----
  vec2 sc = vec2(.505, mix(.53, .405, rise));
  vec2 dv = (uv - sc) * vec2(imgAspect, 1.);
  float d = length(dv);
  float behindHills = 1. - smoothstep(.432, .446, uv.y);
  float occ = behindHills * smoothstep(.45,.62,lum);
  vec3 dawnCol = col * vec3(.52,.44,.66) + vec3(.06,.02,.05);
  dawnCol = mix(dawnCol, dawnCol*vec3(1.35,.95,.7), (1.-smoothstep(.3,.5,abs(uv.y-.47)*2.)) * .6);
  col = mix(col, dawnCol, dawn);
  float glow = exp(-d*7.) * (.35+.65*rise);
  col += vec3(1., .62, .30) * glow * (.75*dawn + .22*sunStrength) * (.55 + skyZone*.6 + water*.4);
  float disk = smoothstep(.034, .026, d) * occ * sunStrength;
  col = mix(col, vec3(1., .95, .80), disk);
  col += vec3(1., .86, .6) * smoothstep(.09, .02, d) * occ * .35 * sunStrength;
  float rx = abs(uv.x - sc.x) * imgAspect;
  float path = exp(-rx*rx*(260. - depth*150.)) * water * smoothstep(.3,.9, r1*1.2 + r2*.4) * rise;
  col += vec3(1., .76, .44) * path * (.8*dawn + .3*sunStrength);
  col += (hash(gl_FragCoord.xy + fract(t)*91.7) - .5) * (2.5/255.);   // dither: hides 8-bit banding
  gl_FragColor = vec4(col, 1.);
}`;
