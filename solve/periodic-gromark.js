var plain,solutions=[],cipher,primer,keyword,numSols,uInt8Array,workerNumber,totalWorkers,alphabet,routes,isRunning,runningKey=[];function decipherPerdGromark(){"function"===typeof importScripts&&(importScripts("../support/decipherLib.js"),importScripts("../support/cryptoPrograms.js"));initSolution();createRunningKey();alphabet=englishAlph;"undefined"!==typeof keyword&&(0<keyword.length?solveWithKeyword():solvePerdGromark());!1===isRunning&&self.postMessage({cmd:"STOP",msg:""})}
function solvePerdGromark(){var b,a,c,d,k,e,f=ord("A"),g=[],h=[];var n=primer.length;for(b=0;7>b;b+=1)h[b]=b<n?ord("Z"):f;isRunning=!0;b=f;a:for(;b<=h[5];b+=1)for(g[5]=chr(b),a=f;a<=h[4];a+=1)for(g[4]=chr(a),c=f;c<=h[3];c+=1)if(g[3]=chr(c),isRunning)for(d=f;d<=h[2];d+=1)if(g[2]=chr(d),isRunning)for(k=f;k<=h[1];k+=1)for(g[1]=chr(k),e=f+workerNumber;e<=h[0];e+=totalWorkers){g[0]=chr(e);keyword=g.join("").substr(0,n);var m=getKeywordOrder(keyword);if(m===primer){m=getKeyedAlphabet(alphabet,keyword);
var l=rearrangeAlphabet(m);plain=decrypt(l);l=getTetraScore(plain);solutions[numSols-1]<l&&(solutions[numSols-1]=l,solutions.sort(function(p,q){return q-p}),self.postMessage({cmd:"reslt",key:m,score:l,text:plain}))}}else break a;else break a;isRunning=!1}
function decrypt(b){var a,c,d;var k=alphabet.length;plain="";for(a=d=c=0;a<cipher.length;a+=1){var e=b.indexOf(cipher.charAt(a))-b.indexOf(keyword.charAt(c))-runningKey[a];0>e&&(e+=k);d+=1;d===keyword.length&&(d=0,c=(c+1)%keyword.length);e=alphabet.charAt(e);plain+=e}return plain.toLowerCase()}
function solveWithKeyword(){var b=getKeyedAlphabet(alphabet,keyword);var a=rearrangeAlphabet(b);plain=decrypt(a);a=getTetraScore(plain);solutions[numSols-1]<a&&(solutions[numSols-1]=a,solutions.sort(function(c,d){return d-c}),self.postMessage({cmd:"reslt",key:b,score:a,text:plain}));isRunning=!1}
function rearrangeAlphabet(b){var a,c;var d=ord("A");var k=ord("Z"),e=[],f=[];var g=0;var h=keyword.length;for(a=0;a<h;a+=1)f[a]="";for(a=d;a<=k;a+=1)for(d=chr(a),c=keyword.indexOf(d);0<=c&&g<h;)e[c]=g,g+=1,c=keyword.indexOf(d,c+1);for(a=c=0;a<b.length;a+=1)f[e[a%h]]+=b.charAt(c),c+=1;return f.join("")}function createRunningKey(){var b,a=0;for(b=0;b<primer.length;b+=1)runningKey[b]=parseInt(primer.charAt(b));for(;b<cipher.length;)runningKey[b]=(runningKey[a]+runningKey[a+1])%10,a+=1,b+=1}
function getKeywordOrder(b){var a,c;var d=ord("A");var k=ord("Z"),e=[];var f=0;var g=b.length;for(a=0;a<g;a+=1)e[a]="";for(a=d;a<=k;a+=1)for(d=chr(a),c=b.indexOf(d);0<=c&&f<g;)e[c]=f+1,f+=1,c=b.indexOf(d,c+1);return e.join("")}self.addEventListener("message",function(b){b=b.data;cipher=b.cipher;uInt8Array=b.uInt8Array;totalWorkers=b.totalWorkers;workerNumber=b.workerNumber;numSols=b.numSols;primer=b.primer;keyword=b.keyword;routes=b.routes;decipherPerdGromark()},!1);