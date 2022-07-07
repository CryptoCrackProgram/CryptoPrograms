var plain,solutions=[],cipher,keyword,leftKywd,topKywd,numSols,uInt8Array,workerNumber,totalWorkers,alphabet,routes,isRunning;
function decipherCheckerbd(){"function"===typeof importScripts&&(importScripts("../support/decipherLib.js"),importScripts("../support/cryptoPrograms.js"));initSolution();6<leftKywd.length&&(combineKeys(leftKywd,0),leftKywd=leftKywd.substr(0,leftKywd.length/2));6<topKywd.length&&(combineKeys(topKywd,1),topKywd=topKywd.substr(0,topKywd.length/2));"undefined"!==typeof keyword&&(0<keyword.length?solveWithKeyword():solveCheckerbd());!1===isRunning&&self.postMessage({cmd:"STOP",msg:""})}
function solveCheckerbd(){var b,a,d,f,k=[];var m=[];var h=[],c=[];var n=alphabet.length;var e=Math.sqrt(alphabet.length);isRunning=!0;var t=0;a:for(;1E3>t;t+=1)if(isRunning){m=randomiseAlphabet(n,alphabet).split("");for(b=0;b<m.length;b+=1)c[b]=m[b],h[b]=m[b];plain=decrypt(c,e);b=5===e?getTetraScore(plain):getTetraScore(plain.replace(/[^a-z]/g,""));b>d&&(d=b);solutions[numSols-1]<b&&(solutions[numSols-1]=b,solutions.sort(function(q,r){return r-q}),self.postMessage({cmd:"reslt",key:c.join(""),score:b,
text:plain}));for(f=15;0<f;--f)if(isRunning){var p=m=0;do{var g=Math.floor(100*Math.random());switch(g){case 1:case 2:case 8:for(a=0;a<n;a+=1)c[a]=h[routes[g][a]];break;case 3:for(a=0;a<n;a+=1)c[a]=h[a];g=Math.floor(Math.random()*e)*e;var l=Math.floor(Math.random()*e)*e;for(a=0;a<e;a+=1)k[a]=c[g+a];for(a=0;a<e;a+=1)c[g+a]=c[l+a];for(a=0;a<e;a+=1)c[l+a]=k[a];break;case 4:for(a=0;a<n;a+=1)c[a]=h[a];g=Math.floor(Math.random()*e);l=Math.floor(Math.random()*e);for(a=0;a<e;a+=1)k[a]=c[g+a*e];for(a=0;a<
e;a+=1)c[g+a*e]=c[l+a*e];for(a=0;a<e;a+=1)c[l+a*e]=k[a];break;default:for(a=0;a<n;a+=1)c[a]=h[a];a=Math.floor(Math.random()*n);g=Math.floor(Math.random()*n);l=c[a];c[a]=c[g];c[g]=l}plain=decrypt(c,e);a=5===e?getTetraScore(plain):getTetraScore(plain.replace(/[^a-z]/g,""));a>p&&(p=a,p>d&&(d=p));solutions[numSols-1]<a&&(solutions[numSols-1]=a,solutions.sort(function(q,r){return r-q}),self.postMessage({cmd:"reslt",key:c.join(""),score:a,text:plain}));l=a-b;g=0;if(0<l)g=1;else{l=Math.pow(Math.E,l/f);var u=
(1E3*Math.random()+1)/1E3;l>u&&(g=1)}if(1===g){for(b=0;b<c.length;b+=1)h[b]=c[b];b=a}m+=1}while(1E3>m&&isRunning)}else break a}else break a;isRunning=!1}function decrypt(b,a){var d,f="";for(d=0;d<cipher.length;d+=2){var k=leftKywd.indexOf(cipher.charAt(d))%a;var m=topKywd.indexOf(cipher.charAt(d+1))%a;f+=b[k*a+m]}return f.toLowerCase()}
function solveWithKeyword(){var b,a;var d=alphabet.length;var f=Math.sqrt(d);isRunning=!0;if(5===f)var k=getKeyedAlphabet(alphabet,keyword);else{k=getKeyedAlphabet(englishAlph36,keyword);var m=getACAKeyedAlphabet(alphabet,keyword)}for(a=0;a<routes.length;a+=1){var h="";for(b=0;b<d;b+=1)h+=k[routes[a][b]];plain=decrypt(h.split(""),f);b=5===f?getTetraScore(plain):getTetraScore(plain.replace(/[^a-z]/g,""));solutions[numSols-1]<b&&(solutions[numSols-1]=b,solutions.sort(function(c,n){return n-c}),self.postMessage({cmd:"reslt",
key:h,score:b,text:plain}));if(6===f){h="";for(b=0;b<alphabet.length;b+=1)h+=m[routes[a][b]];plain=decrypt(h,f);b=getTetraScore(plain.replace(/[^a-z]/g,""));solutions[numSols-1]<b&&(solutions[numSols-1]=b,solutions.sort(function(c,n){return n-c}),self.postMessage({cmd:"reslt",key:h,score:b,text:plain}))}}isRunning=!1}
function combineKeys(b,a){var d;var f=b.length/2;for(d=a;d<cipher.length;d+=2){var k=b.indexOf(cipher.substr(d,1));k>=f&&(cipher=cipher.substr(0,d)+b.substr(k-f,1)+cipher.substr(d+1))}}self.addEventListener("message",function(b){b=b.data;cipher=b.cipher;uInt8Array=b.uInt8Array;totalWorkers=b.totalWorkers;workerNumber=b.workerNumber;numSols=b.numSols;alphabet=b.alphabet;keyword=b.keyword;leftKywd=b.leftKywd;topKywd=b.topKywd;routes=b.routes;decipherCheckerbd()},!1);