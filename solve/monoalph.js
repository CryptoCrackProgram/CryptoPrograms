var cipher,uInt8Array,totalWorkers,workerNumber,numSols,keyword,isRunning,keyTrials,plainAlphabet,accents,arrKey=[],solutions=[],cipherGrid=[];function decipherMonoAlph(){"function"===typeof importScripts&&(importScripts("../support/decipherLib.js"),importScripts("../support/cryptoPrograms.js"));keyTrials=0;arrKey.length=0;initSolution();"undefined"!==typeof keyword&&(0<keyword.length?solveWithKeyword(keyword):solveMonoAlph());!1===isRunning&&self.postMessage({cmd:"STOP",msg:""})}
function solveMonoAlph(){var a,e,f,b=[];var g=[];var d=[];var h=englishAlph.length;isRunning=!0;cipherGrid=[];for(a=0;a<h;a+=1)cipherGrid[a]=[];for(e=0;1E3>e;e+=1)if(isRunning){g=randomiseAlphabet(h,englishAlph).split("");for(a=0;a<g.length;a+=1)d[a]=g[a],b[a]=g[a];var c=decrypt(cipher,d,plainAlphabet);var l=accents?getAccentedTetraScore(c,plainAlphabet):getTetraScore(c);keyTrials+=1;solutions[numSols-1]<l&&(solutions[numSols-1]=l,solutions.sort(function(m,n){return n-m}),self.postMessage({cmd:"reslt",
key:d.join(""),score:l,text:c}));for(f=15;2<f;--f){g=0;do{for(a=0;a<b.length;a+=1)d[a]=b[a];a=Math.floor(Math.random()*h);c=Math.floor(Math.random()*h);var k=d[a];d[a]=d[c];d[c]=k;c=decrypt(cipher,d,plainAlphabet);a=accents?getAccentedTetraScore(c,plainAlphabet):getTetraScore(c);solutions[numSols-1]<a&&(solutions[numSols-1]=a,solutions.sort(function(m,n){return n-m}),self.postMessage({cmd:"reslt",key:d.join(""),keyType:1,score:a,text:c}));keyTrials+=1;k=a-l;c=0;if(0<k)c=1;else{k=Math.pow(Math.E,k/
f);var p=(1E3*Math.random()+1)/1E3;k>p&&(c=1)}1===c&&(b=d.slice(),l=a);g+=1}while(1E3>g&&isRunning)}}isRunning=!1}function decrypt(a,e,f){var b=a;f=f.toLowerCase();for(a=0;a<e.length;a+=1)b=b.replaceAll(e[a],f.substr(a,1));return b}String.prototype.replaceAll=function(a,e){return this.replace(new RegExp(a,"g"),e)};
function solveWithKeyword(a){var e;var f=getKeyedLangAlph(a,englishAlph);for(e=0;2>=e;e+=1){switch(e){case 0:case 1:var b=f;var g=plainAlphabet;break;case 2:g=b=f}for(a=0;a<englishAlph.length;a+=1){var d=decrypt(cipher,b,g);var h=accents?getAccentedTetraScore(d,g):getTetraScore(d);if(solutions[numSols-1]<h){var c=b;solutions[numSols-1]=h;solutions.sort(function(l,k){return k-l});self.postMessage({cmd:"reslt",key:c,keyType:e,score:h,text:d})}b=b[b.length-1]+b.substring(0,b.length-1)}}isRunning=!1}
self.addEventListener("message",function(a){a=a.data;cipher=a.cipher;uInt8Array=a.uInt8Array;totalWorkers=a.totalWorkers;workerNumber=a.workerNumber;numSols=a.numSols;keyword=a.keyword;plainAlphabet=a.alphabet;accents=a.accents;decipherMonoAlph()},!1);