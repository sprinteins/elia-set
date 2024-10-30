try{self["workbox:core:6.5.4"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:6.5.4"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class i{constructor(e,t,i="GET"){this.handler=s(t),this.match=e,this.method=i}setCatchHandler(e){this.catchHandler=s(e)}}class n extends i{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class r{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const i=s.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:i,url:s});let c=r&&r.handler;const a=e.method;if(!c&&this.i.has(a)&&(c=this.i.get(a)),!c)return;let o;try{o=c.handle({url:s,request:e,event:t,params:n})}catch(e){o=Promise.reject(e)}const l=r&&r.catchHandler;return o instanceof Promise&&(this.o||l)&&(o=o.catch((async i=>{if(l)try{return await l.handle({url:s,request:e,event:t,params:n})}catch(e){e instanceof Error&&(i=e)}if(this.o)return this.o.handle({url:s,request:e,event:t});throw i}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:i}){const n=this.t.get(s.method)||[];for(const r of n){let n;const c=r.match({url:e,sameOrigin:t,request:s,event:i});if(c)return n=c,(Array.isArray(n)&&0===n.length||c.constructor===Object&&0===Object.keys(c).length||"boolean"==typeof c)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e,t="GET"){this.i.set(t,s(e))}setCatchHandler(e){this.o=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let c;const a=()=>(c||(c=new r,c.addFetchListener(),c.addCacheListener()),c);function o(e,s,r){let c;if("string"==typeof e){const t=new URL(e,location.href);c=new i((({url:e})=>e.href===t.href),s,r)}else if(e instanceof RegExp)c=new n(e,s,r);else if("function"==typeof e)c=new i(e,s,r);else{if(!(e instanceof i))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=e}return a().registerRoute(c),c}try{self["workbox:strategies:6.5.4"]&&_()}catch(e){}const l={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null},h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[h.prefix,e,h.suffix].filter((e=>e&&e.length>0)).join("-"),f=e=>e||u(h.precache),d=e=>e||u(h.runtime);function w(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const b=new Set;function y(e){return"string"==typeof e?new Request(e):e}class g{constructor(e,t){this.l={},Object.assign(this,t),this.event=t.event,this.h=e,this.u=new p,this.p=[],this.v=[...e.plugins],this.m=new Map;for(const e of this.v)this.m.set(e,{});this.event.waitUntil(this.u.promise)}async fetch(e){const{event:s}=this;let i=y(e);if("navigate"===i.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?i.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))i=await e({request:i.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const r=i.clone();try{let e;e=await fetch(i,"navigate"===i.mode?void 0:this.h.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=y(e);let s;const{cacheName:i,matchOptions:n}=this.h,r=await this.getCacheKey(t,"read"),c=Object.assign(Object.assign({},n),{cacheName:i});s=await caches.match(r,c);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:i,matchOptions:n,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,s){const i=y(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const r=await this.getCacheKey(i,"write");if(!s)throw new t("cache-put-with-no-response",{url:(c=r.url,new URL(String(c),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var c;const a=await this.R(s);if(!a)return!1;const{cacheName:o,matchOptions:l}=this.h,h=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,i){const n=w(t.url,s);if(t.url===n)return e.match(t,i);const r=Object.assign(Object.assign({},i),{ignoreSearch:!0}),c=await e.keys(t,r);for(const t of c)if(n===w(t.url,s))return e.match(t,i)}(h,r.clone(),["__WB_REVISION__"],l):null;try{await h.put(r,u?a.clone():a)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of b)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:f,newResponse:a.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this.l[s]){let i=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))i=y(await e({mode:t,request:i,event:this.event,params:this.params}));this.l[s]=i}return this.l[s]}hasCallback(e){for(const t of this.h.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this.h.plugins)if("function"==typeof t[e]){const s=this.m.get(t),i=i=>{const n=Object.assign(Object.assign({},i),{state:s});return t[e](n)};yield i}}waitUntil(e){return this.p.push(e),e}async doneWaiting(){let e;for(;e=this.p.shift();)await e}destroy(){this.u.resolve(null)}async R(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class v{constructor(e={}){this.cacheName=d(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,i="params"in e?e.params:void 0,n=new g(this,{event:t,request:s,params:i}),r=this.q(n,s,t);return[r,this.U(r,n,s,t)]}async q(e,s,i){let n;await e.runCallbacks("handlerWillStart",{event:i,request:s});try{if(n=await this.L(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const r of e.iterateCallbacks("handlerDidError"))if(n=await r({error:t,event:i,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:i,request:s,response:n});return n}async U(e,t,s,i){let n,r;try{n=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:i,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:i,request:s,response:n,error:r}),t.destroy(),r)throw r}}function m(e,t){const s=t();return e.waitUntil(s),s}try{self["workbox:precaching:6.5.4"]&&_()}catch(e){}function R(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:i}=e;if(!i)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(i,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(i,location.href),r=new URL(i,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:r.href}}class q{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class U{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._=e}}let x,L;async function E(e,s){let i=null;if(e.url){i=new URL(e.url).origin}if(i!==self.location.origin)throw new t("cross-origin-copy-response",{origin:i});const n=e.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},c=s?s(r):r,a=function(){if(void 0===x){const e=new Response("");if("body"in e)try{new Response(e.body),x=!0}catch(e){x=!1}x=!1}return x}()?n.body:await n.blob();return new Response(a,c)}class j extends v{constructor(e={}){e.cacheName=f(e.cacheName),super(e),this.j=!1!==e.fallbackToNetwork,this.plugins.push(j.copyRedirectedCacheableResponsesPlugin)}async L(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this.C(e,t):await this.O(e,t))}async O(e,s){let i;const n=s.params||{};if(!this.j)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{const t=n.integrity,r=e.integrity,c=!r||r===t;i=await s.fetch(new Request(e,{integrity:"no-cors"!==e.mode?r||t:void 0})),t&&c&&"no-cors"!==e.mode&&(this.N(),await s.cachePut(e,i.clone()))}return i}async C(e,s){this.N();const i=await s.fetch(e);if(!await s.cachePut(e,i.clone()))throw new t("bad-precaching-response",{url:e.url,status:i.status});return i}N(){let e=null,t=0;for(const[s,i]of this.plugins.entries())i!==j.copyRedirectedCacheableResponsesPlugin&&(i===j.defaultPrecacheCacheabilityPlugin&&(e=s),i.cacheWillUpdate&&t++);0===t?this.plugins.push(j.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}j.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},j.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await E(e):e};class C{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this.k=new Map,this.T=new Map,this.P=new Map,this.h=new j({cacheName:f(e),plugins:[...t,new U({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.h}precache(e){this.addToCacheList(e),this.W||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.W=!0)}addToCacheList(e){const s=[];for(const i of e){"string"==typeof i?s.push(i):i&&void 0===i.revision&&s.push(i.url);const{cacheKey:e,url:n}=R(i),r="string"!=typeof i&&i.revision?"reload":"default";if(this.k.has(n)&&this.k.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.k.get(n),secondEntry:e});if("string"!=typeof i&&i.integrity){if(this.P.has(e)&&this.P.get(e)!==i.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this.P.set(e,i.integrity)}if(this.k.set(n,e),this.T.set(n,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return m(e,(async()=>{const t=new q;this.strategy.plugins.push(t);for(const[t,s]of this.k){const i=this.P.get(s),n=this.T.get(t),r=new Request(t,{integrity:i,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:i}=t;return{updatedURLs:s,notUpdatedURLs:i}}))}activate(e){return m(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this.k.values()),i=[];for(const n of t)s.has(n.url)||(await e.delete(n),i.push(n.url));return{deletedURLs:i}}))}getURLsToCacheKeys(){return this.k}getCachedURLs(){return[...this.k.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.k.get(t.href)}getIntegrityForCacheKey(e){return this.P.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}const O=()=>(L||(L=new C),L);class N extends i{constructor(e,t){super((({request:s})=>{const i=e.getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:i=!0,urlManipulation:n}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const c=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield c.href,s&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=s,yield e.href}if(i){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=i.get(n);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}var k;self.skipWaiting(),k={},function(e){O().precache(e)}([{url:"public/ace/ext-searchbox.js",revision:"c3ad58df7587107f71fc1d511624250d"},{url:"public/ace/mode-xml.js",revision:"9785371a49d2674f50bc4884eef35301"},{url:"public/ace/theme-solarized_dark.js",revision:"06f0522377bc0d70432b087bd37ffdf6"},{url:"public/ace/theme-solarized_light.js",revision:"e5f391ed15940217eea430074be6f6e5"},{url:"public/ace/worker-xml.js",revision:"1028c8cbfbf27b3242f66ea35531eaa4"},{url:"public/apple-touch-icon.png",revision:"62e7c75a8b21624dca15bd0bef539438"},{url:"public/css/normalize.css",revision:"112272e51c80ffe5bd01becd2ce7d656"},{url:"public/favicon-16x16.png",revision:"275aa2d0c672623cc28f0572348befe7"},{url:"public/favicon-32x32.png",revision:"2ee56f4805a985f34bd914dad9a5af78"},{url:"public/google/fonts/roboto-mono-v13.css",revision:"e1eb94539e43886f10f2776d68363800"},{url:"public/google/fonts/roboto-v27.css",revision:"e2632eed0f396ae44ab740aecf61194e"},{url:"public/google/icons/material-icons-outlined.css",revision:"a52bef2eb1033e6ac2171ef197b28b2c"},{url:"public/icon-192x192.png",revision:"31ae08296b6be35de83931d8e1cf966b"},{url:"public/icon-512x512.png",revision:"1e7723b8736961b09acce6ea63178a40"},{url:"public/icon.svg",revision:"26984e5d2724d581bc7fb39c3f7cb389"},{url:"public/js/worker.js",revision:"58de284a35de76395be12041549d0ddf"},{url:"public/js/xmlvalidate.js",revision:"8563000f6f29b8531f7fede17f5f5a69"},{url:"public/js/xmlvalidate.wasm",revision:"622a405972a204ca97e7e994a0e8244b"},{url:"public/maskable_icon.png",revision:"dcf4d1e9a7c6d791c83345eadaa8251d"},{url:"public/monochrome_icon.png",revision:"329ec2d6785a691c932962b40c48f19f"},{url:"public/mstile-144x144.png",revision:"e65bc3ab3bcbf366bfb1a8aea688ba45"},{url:"public/mstile-150x150.png",revision:"a3b54491a78398fdd16d9d650bcee21a"},{url:"public/mstile-310x150.png",revision:"dbab2415b660994355da616a7b05f56e"},{url:"public/mstile-310x310.png",revision:"08f78b8fb9c4618eeb87dc76254dee39"},{url:"public/mstile-70x70.png",revision:"2707a4bc27e42e15c0bf88302bcab503"},{url:"public/xml/CC-EULA.pdf",revision:"84642855997c978c5d96187c63835413"},{url:"public/xml/Disclaimer.md",revision:"28939f2eb3c7c1fdd4facee8675590cf"},{url:"browserconfig.xml",revision:"a8c181f3745541f8aa4653452592763b"},{url:"CHANGELOG.md",revision:"a4da878c1585267676591c37865406b0"},{url:"favicon.ico",revision:"84e4fb128b947bc51ebf808a4f5b2512"},{url:"index.html",revision:"cad3d3f29d50d1455399e2b9f5dc70d3"},{url:"main.js",revision:"4d6ef7a998d8ca313ba41f47a6fdd525"},{url:"manifest.json",revision:"ebd412a518db90c6f36bbbd044455cef"},{url:"project.json",revision:"ea5460cf287f85f9b8827d537bbce117"},{url:"README.md",revision:"1996785fe58a33cca3a12a6fbc92ae83"},{url:"snowpack.config.js",revision:"4b757f3e97758f8d6065b9b626a872ed"}]),function(e){const t=O();o(new N(t,e))}(k),o(/.*/,new class extends v{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(l),this.D=e.networkTimeoutSeconds||0}async L(e,s){const i=[],n=[];let r;if(this.D){const{id:t,promise:c}=this.K({request:e,logs:i,handler:s});r=t,n.push(c)}const c=this.M({timeoutId:r,request:e,logs:i,handler:s});n.push(c);const a=await s.waitUntil((async()=>await s.waitUntil(Promise.race(n))||await c)());if(!a)throw new t("no-response",{url:e.url});return a}K({request:e,logs:t,handler:s}){let i;return{promise:new Promise((t=>{i=setTimeout((async()=>{t(await s.cacheMatch(e))}),1e3*this.D)})),id:i}}async M({timeoutId:e,request:t,logs:s,handler:i}){let n,r;try{r=await i.fetchAndCachePut(t)}catch(e){e instanceof Error&&(n=e)}return e&&clearTimeout(e),!n&&r||(r=await i.cacheMatch(t)),r}},"GET");
//# sourceMappingURL=sw.js.map