var cipher,uInt8Array,totalWorkers,workerNumber,numSols,keyword,isRunning,solutions=[],keyTrials;function decipherPollux(){"function"===typeof importScripts&&(importScripts("../support/decipherLib.js"),importScripts("../support/cryptoPrograms.js"),importScripts("../support/morse.js"));initSolution();"undefined"!==typeof keyword&&(0<keyword.length?solveWithKeyword(keyword):solvePollux());!1===isRunning&&self.postMessage({cmd:"STOP",msg:""})}
function solvePollux(){var b,c=[],a=[],d=[];for(b=keyTrials=0;10>b;b+=1)d[b]=2;isRunning=!0;for(a[0]=0;a[0]<=d[0];a[0]+=1)for(c[0]=".-x".charAt(a[0]),a[1]=0;a[1]<=d[1];a[1]+=1)for(c[1]=".-x".charAt(a[1]),a[2]=0;a[2]<=d[2];a[2]+=1)for(c[2]=".-x".charAt(a[2]),a[3]=0;a[3]<=d[3];a[3]+=1)for(c[3]=".-x".charAt(a[3]),a[4]=0;a[4]<=d[4];a[4]+=1)for(c[4]=".-x".charAt(a[4]),a[5]=0;a[5]<=d[5];a[5]+=1)for(c[5]=".-x".charAt(a[5]),a[6]=0;a[6]<=d[6];a[6]+=1){c[6]=".-x".charAt(a[6]);for(a[7]=0;a[7]<=d[7];a[7]+=1)for(c[7]=
".-x".charAt(a[7]),a[8]=0;a[8]<=d[8];a[8]+=1)for(c[8]=".-x".charAt(a[8]),a[9]=0;a[9]<=d[9];a[9]+=1)c[9]=".-x".charAt(a[9]),decrypt(c.join("")),keyTrials+=1;self.postMessage({cmd:"progress",worker:workerNumber,trials:keyTrials,totalWorkers:totalWorkers})}isRunning=!1}function solveWithKeyword(b){decrypt(b);isRunning=!1}
function decrypt(b){var c,a="";var d=b.charAt(b.length-1)+b.substr(0,b.length-1);for(c=0;c<cipher.length;c+=1){var e=+cipher.charAt(c);a+=d.charAt(e)}c=convertMorseToAnyPlain(a+"x");e=getTetraScore(c.replace(/[^a-z]/g,""));solutions[numSols-1]<e&&(solutions[numSols-1]=e,solutions.sort(function(f,g){return g-f}),self.postMessage({cmd:"reslt",key:b,score:e,text:c}))}
self.addEventListener("message",function(b){b=b.data;cipher=b.cipher;uInt8Array=b.uInt8Array;totalWorkers=b.totalWorkers;workerNumber=b.workerNumber;numSols=b.numSols;keyword=b.keyword;decipherPollux()},!1);