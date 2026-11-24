/* FX worlds: shape -> blur -> distortion -> glow pipelines, the After Effects way, in one WebGL shader.
   Learned from the user's "viral SaaS backgrounds" guide (2026-11-24): flat shapes or stacked gradient circles,
   then directional blur, twirl, lens (barrel) warp, scale-crop, dither noise, exponential glow, in that strict order.
   Reordering breaks the look. No radial "orb" look: blobs and shapes merge, stretch, twist and repeat.
   BG.fx(mode, palette, ctx, w, h, t, {hue}) draws into ctx. Pure function of t. Load backgrounds.js first. */
(function (root) {
  const BG = root.BG;
  const FS = `#version 300 es
precision highp float;
uniform vec2 uRes; uniform float uT; uniform int uMode; uniform vec3 uC0,uC1,uC2,uC3; uniform float uHue;
out vec4 o;
float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*vn(p);p=p*2.03+17.1;a*=.5;}return s;}
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
vec2 twirl(vec2 p,float ang,float R){float d=length(p);return rot(ang*exp(-d*d/(R*R)))*p;}
vec2 lens(vec2 p,float k){return p*(1.+k*dot(p,p));}
vec3 g4(vec2 p,float t){ // 4-colour gradient, points wiggle (BG-2)
  vec2 a=vec2(-.7,-.3)+.12*vec2(sin(t*.7),cos(t*.6)),b=vec2(-.2,-.45)+.15*vec2(sin(t*.5+1.),cos(t*.8)),
       c=vec2(.25,-.3)+.13*vec2(sin(t*.6+2.),cos(t*.5+1.)),d=vec2(.75,-.45)+.14*vec2(sin(t*.4+3.),cos(t*.7+2.));
  vec4 w=1./vec4(dot(p-a,p-a),dot(p-b,p-b),dot(p-c,p-c),dot(p-d,p-d)+.0001)+.0001; w=w*w;
  return (uC0*w.x+uC1*w.y+uC2*w.z+uC3*w.w)/(w.x+w.y+w.z+w.w);}
vec3 src(vec2 p,float t){
  if(uMode==0){ // BG-1 ribbon: stacked radial-gradient circles, alternate inverted, gliding down
    float sp=.5, sh=fract(t*.06)*2.*sp; vec3 c=vec3(0);
    for(int i=0;i<6;i++){vec2 ce=vec2(.05,-1.25+float(i)*sp-sh+ .1); float q=length(p-ce)/.25;
      if(q<1.){ bool inv=(i%2==1); c=(inv?mix(uC1,uC0,q):mix(uC0,uC1,q))*smoothstep(1.,.8,q);} }
    return c;}
  if(uMode==1){ // BG-2 horizon: wiggled rectangle, turbulent edge, 4-colour fill, soft (huge blur)
    float x=p.x; float edge=-.3+.07*sin(1.4*x+t*.6)+.05*sin(3.1*x-t*.4)+.09*(fbm(vec2(x*1.2,t*.25))-.5);
    float m=smoothstep(.28,-.22,p.y-edge)*smoothstep(-.75,-.1,p.y-edge+.2); return g4(p,t)*m;}
  if(uMode==2){ // goo: metaballs merge into one liquid shape
    float f=0.; vec3 c=vec3(0); float ws=0.;
    for(int i=0;i<7;i++){float fi=float(i); vec2 ce=vec2(.55*sin(t*.23+fi*1.9),.28*cos(t*.19+fi*2.7)); float r=.09+.05*sin(fi*3.1);
      float k=r*r/max(dot(p-ce,p-ce),1e-4); f+=k; vec3 col=fi<2.?uC0:fi<4.?uC1:fi<6.?uC2:uC3; c+=col*k; ws+=k;}
    return (c/ws)*smoothstep(.75,1.35,f);}
  if(uMode==3){ // marble: repeated diagonal bands, domain-warped
    vec2 q=p+.4*vec2(fbm(p*1.6+t*.06),fbm(p*1.6+5.2-t*.05))-.2; float v=(q.x+q.y)*4.; float id=floor(v), fr=fract(v);
    float band=smoothstep(.0,.25,fr)*smoothstep(1.,.6,fr); vec3 col=mod(id,3.)<1.?uC0:mod(id,3.)<2.?uC1:uC2; float zone=smoothstep(.55,.05,abs(p.y+.35*p.x+.05*sin(t*.2))); return col*band*zone;}
  if(uMode==4){ // ripples: repeated rings off centre, warped
    vec2 q=p-vec2(-.55,.35); q+=.12*vec2(fbm(p*2.+t*.1),fbm(p*2.+9.-t*.1)); float d=length(q);
    float v=.5+.5*sin(d*24.-t*1.4); return mix(uC0,uC1,clamp(d,0.,1.))*pow(v,7.)*smoothstep(1.2,.15,d);}
  if(uMode==5){ // pillars: repeated capsules of varying height
    float n=13.; float xi=floor((p.x+1.)*n/2.), fx=fract((p.x+1.)*n/2.); float hgt=.12+.22*(.5+.5*sin(xi*1.7+t*.9));
    float m=step(abs(fx-.5),.2)*step(abs(p.y+.05),hgt); vec3 col=mod(xi,4.)<1.?uC0:mod(xi,4.)<2.?uC1:mod(xi,4.)<3.?uC2:uC3; return col*m*smoothstep(.95,.25,abs(p.x));}
  if(uMode==6){ // petals: repeated rotated ellipses around a point
    vec3 c=vec3(0); vec2 q=p-vec2(.35,-.05);
    for(int i=0;i<9;i++){float a=float(i)*.698+t*.05; vec2 r=rot(a)*q; r.x-=.22; float e=length(r/vec2(.24,.07));
      vec3 col=i%3==0?uC0:i%3==1?uC1:uC2; c+=col*.55*step(e,1.);}
    return c;}
  if(uMode==7){ // shapes: big flat shapes overlapping (circle, slab, wedge)
    vec3 c=vec3(0); c+=uC0*.8*step(length(p-vec2(-.4+.05*sin(t*.2),.1)),.33);
    vec2 r=rot(.5+.04*sin(t*.15))*(p-vec2(.35,-.15)); c+=uC1*.75*step(abs(r.x),.12)*step(abs(r.y),.6);
    c+=uC2*.6*step(p.y,-.25+.3*p.x+.03*sin(t*.3))*step(-.9,p.x); return c;}
  if(uMode==8){ // silk: repeated ribbons with phase offset
    vec3 c=vec3(0); for(int i=0;i<5;i++){float fi=float(i); float y=.15*sin(p.x*2.2+fi*.55+t*.35)-.1+fi*.05;
      float m=smoothstep(.035,.0,abs(p.y-y)); c+=(i%2==0?uC0:uC1)*m*(.5+.12*fi);} return c;}
  // 9 echo: a trail of repeated capsules along a diagonal
  vec3 c=vec3(0); for(int i=0;i<8;i++){float fi=float(i); vec2 ce=vec2(-.7+fi*.19,.35-fi*.1)+.03*vec2(sin(t*.4+fi),cos(t*.3+fi));
    vec2 r=rot(.6)*(p-ce); float m=step(length(r/vec2(.16,.05)),1.); c+=mix(uC0,uC2,fi/7.)*m*(1.-fi*.08);} return c;
}
vec3 hueRot(vec3 c,float a){const vec3 k=vec3(.57735);float ca=cos(a);return c*ca+cross(k,c)*sin(a)+k*dot(k,c)*(1.-ca);}
void main(){
  vec2 p=(gl_FragCoord.xy-.5*uRes)/uRes.y; float t=uT;
  // per-mode effect settings: dir angle, blur length, twirl angle, twirl radius, lens, scale
  float ang=.785,len=.5,tw=.9,tr=.4,lk=.35,sc=1.5,jb=.04,k=.8;
  if(uMode==1){len=.0;tw=.0;lk=.15;sc=1.1;k=.55;}
  if(uMode==2){ang=.3;len=.12;tw=.8;tr=.5;lk=.25;sc=1.2;jb=.07;k=.85;}
  if(uMode==3){ang=.4;len=.18;tw=.6;tr=.6;lk=.3;sc=1.2;jb=.06;k=.55;}
  if(uMode==4){len=.04;tw=.4;tr=.6;lk=.2;sc=1.1;jb=.06;k=.6;}
  if(uMode==5){ang=1.5708;len=.3;tw=.3;tr=.5;lk=.3;sc=1.15;jb=.05;k=.6;}
  if(uMode==6){ang=.2;len=.14;tw=1.4;tr=.4;lk=.25;sc=1.1;jb=.05;k=.75;}
  if(uMode==7){ang=.6;len=.28;tw=.9;tr=.55;lk=.35;sc=1.15;jb=.05;k=.65;}
  if(uMode==8){ang=0.;len=.3;tw=.5;tr=.5;lk=.3;sc=1.2;jb=.04;k=.75;}
  if(uMode==9){ang=.55;len=.25;tw=.6;tr=.45;lk=.3;sc=1.15;jb=.05;k=.7;}
  // strict order (read backwards for sampling): scale-crop -> lens -> twirl -> directional blur (+ small box blur)
  vec2 q=p/sc; q=lens(q,lk); q=twirl(q,tw,tr);
  vec2 dir=vec2(cos(ang),sin(ang)); vec3 acc=vec3(0); const int N=64;
  for(int i=0;i<N;i++){float s=(float(i)/float(N-1)-.5)*len; float fi=float(i); vec2 j=jb*sqrt((fi+.5)/float(N))*vec2(cos(fi*2.39996),sin(fi*2.39996)); // even disc (Vogel), smooth box-blur
    acc+=src(q+dir*s+j,t);}
  vec3 c=acc/float(N)*k;
  if(uMode==1){ // huge blur already in the edge; breathing glow pool
    float br=1.+.12*sin(t*.9)+.06*sin(t*2.3); c*=br; }
  c=hueRot(c,uHue);
  // exponential glow: soft highlight roll-off + screen bloom of the bright part
  vec3 glow=1.-exp(-c*1.6); c=glow+ .18*glow*glow;
  c=clamp(c,0.,1.); c=mix(c,c*c*(3.-2.*c),.35); // contrast S-curve on black
  c+=(h21(gl_FragCoord.xy+fract(t)*91.)-.5)*.045; // dither noise, no banding
  o=vec4(c,1.);
}`;
  const VS = `#version 300 es
in vec2 a; void main(){gl_Position=vec4(a,0,1);}`;
  const PAL = {
    solar:   ['#ff9d00','#ffe500','#ff4d1a','#ffd28a'],
    aqua:    ['#00ffd8','#006bff','#00ffe6','#005cff'],
    violet:  ['#7a2bff','#ff3fd0','#3a1aff','#ffa0f0'],
    lime:    ['#c6ff00','#00e07a','#00ffb0','#5aff3a'],
    crimson: ['#ff1f4a','#ff8a3d','#ff2fa0','#ffd0c0'],
    ice:     ['#9fd8ff','#ffffff','#4c7dff','#bfe9ff'],
    sunset:  ['#ff5a36','#7a3cff','#2340ff','#ffb36b'],
    steel:   ['#3f6dff','#a8c4ff','#1b2fa8','#e2ebff']
  };
  let gl, cv, prog, U = {};
  function init() {
    if (gl) return; cv = document.createElement('canvas');
    gl = cv.getContext('webgl2', { preserveDrawingBuffer: true, premultipliedAlpha: false }); if (!gl) throw new Error('WebGL2 not available');
    const sh = (ty, s) => { const x = gl.createShader(ty); gl.shaderSource(x, s); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(x)); return x; };
    prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    gl.useProgram(prog); const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    ['uRes','uT','uMode','uC0','uC1','uC2','uC3','uHue'].forEach(n => U[n] = gl.getUniformLocation(prog, n));
  }
  const rgb = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };
  const MODES = ['ribbon','horizon','goo','marble','ripples','pillars','petals','shapes','silk','echo'];
  function fx(mode, palette, ctx, w, h, t, opts) {
    init(); const m = MODES.indexOf(mode); if (m < 0) throw new Error('unknown fx ' + mode);
    const P = (typeof palette === 'string' ? PAL[palette] : palette); if (!P) throw new Error('unknown palette ' + palette);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    gl.viewport(0, 0, w, h); gl.uniform2f(U.uRes, w, h); gl.uniform1f(U.uT, t); gl.uniform1i(U.uMode, m);
    gl.uniform3fv(U.uC0, rgb(P[0])); gl.uniform3fv(U.uC1, rgb(P[1])); gl.uniform3fv(U.uC2, rgb(P[2])); gl.uniform3fv(U.uC3, rgb(P[3]));
    gl.uniform1f(U.uHue, (opts && opts.hue) || 0); gl.drawArrays(gl.TRIANGLES, 0, 3);
    ctx.drawImage(cv, 0, 0, w, h);
  }
  const curated = [
    ['ribbon','solar'],['ribbon','aqua'],['ribbon','violet'],['ribbon','crimson'],
    ['horizon','aqua'],['horizon','violet'],['horizon','solar'],['horizon','lime'],
    ['goo','sunset'],['goo','aqua'],['goo','violet'],['goo','ice'],
    ['marble','sunset'],['marble','steel'],['marble','crimson'],['marble','lime'],
    ['ripples','aqua'],['ripples','violet'],['pillars','steel'],['pillars','sunset'],
    ['petals','crimson'],['petals','ice'],['shapes','sunset'],['shapes','steel'],
    ['silk','violet'],['silk','solar'],['echo','aqua'],['echo','crimson']
  ];
  BG.fx = fx; BG.fxModes = MODES; BG.fxPalettes = Object.keys(PAL);
  BG.fxNames = curated.map(([m, p]) => 'fx:' + m + '-' + p);
  const base = BG.draw; BG.draw = function (n, c, w, h, t, o) { const mm = n.match(/^fx:(\w+)-(\w+)$/); if (mm) return fx(mm[1], mm[2], c, w, h, t, o); return base(n, c, w, h, t, o); };
})(typeof window !== 'undefined' ? window : globalThis);
