var cipher,numSols,uInt8Array,workerNumber,totalWorkers,isRunning,minRails,maxRails,plain=[],solutions=[];function decipherRailfence(){"function"===typeof importScripts&&(importScripts("../support/decipherLib.js"),importScripts("../support/cryptoPrograms.js"));initSolution();decrypt();!1===isRunning&&self.postMessage({cmd:"STOP",msg:""})}
function decrypt(){var b,d,a,f;isRunning=!0;cipher=cipher.toLowerCase();for(b=minRails;b<=maxRails;b+=1){var e=2*b-2;var k=e-1;for(d=0;d<=k;d+=1){var c=0;var g=e;for(a=f=1-d;a<=cipher.length;a+=e)0<a&&(plain[a-1]=cipher[c],c+=1);f+=1;g-=2;do{for(a=f;a<=cipher.length;a+=e){0<a&&(plain[a-1]=cipher[c],c+=1);var h=a+g;h<=cipher.length&&0<h&&(plain[h-1]=cipher[c],c+=1)}f+=1;g-=2}while(0<g);for(a=b-d;a<=cipher.length;a+=e)a<=cipher.length&&0<a&&(plain[a-1]=cipher[c],c+=1);a=getTetraScore(plain.join("").replace(/[^a-z]/g,
""));solutions[numSols-1]<a&&(solutions[numSols-1]=a,solutions.sort(function(l,m){return m-l}),self.postMessage({cmd:"reslt",key:"Rails:"+b.toString()+" Offset:"+d.toString(),score:a,text:plain.join("")}))}}isRunning=!1}self.addEventListener("message",function(b){b=b.data;cipher=b.cipher;uInt8Array=b.uInt8Array;totalWorkers=b.totalWorkers;workerNumber=b.workerNumber;numSols=b.numSols;minRails=b.minRails;maxRails=b.maxRails;decipherRailfence()},!1);