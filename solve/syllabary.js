var cipher,uInt8Array,totalWorkers,workerNumber,numSols,alphabet,language,type,isRunning,keyTrials,solutions=[],keySquare,cipherPairs;
function decipherSyllabary(){"function"===typeof importScripts&&(importScripts("../support/decipherLib.js"),importScripts("../support/cryptoPrograms.js"));keyTrials=0;initSolution();keySquare=readKeysquare();"KU"===type?(cipherPairs=cipher.match(/(..?)/g),cipherPairs=cipherPairs.map(Number),solveKUSyllabary()):solveUKSyllabary();!1===isRunning&&self.postMessage({cmd:"STOP",msg:""})}
function solveKUSyllabary(){var a;var c=[];var e=[];var u=[],q=[],b=[],r=[],p=[],g;var t=!1;isRunning=!0;p=[].concat.apply([],keySquare);for(a=0;1E3>a;a+=1){if(!t){e=p.slice();c=randomiseNumbers(100);var l=15;var f=g=0;do c[f]<100-g&&isNaN(e[c[f]])&&(q[g]=e[c[f]],isNaN(e[c[f]+1])||(q[g+1]=e[c[f]+1],g+=1,e.splice(c[f]+1,1)),e.splice(c[f],1),g+=1,--l),f+=1;while(0<l);u=q.concat(e)}r=u.slice();var h=decryptKU(r);f=l=Math.floor(4E4*getTetraScore(h.replace(/[^a-z]/g,""))/(h.length*h.length));t=!1;for(c=
20;0<=c;c-=.1)for(e=0;1E3>e;e+=1){b=r.slice();do{var d=Math.floor(15*Math.random());var k=Math.floor(100*Math.random())}while(d===k||!isNaN(b[d])||!isNaN(b[k]));if(d<k){var m=b[k];if(isNaN(b[k+1]))var n="";else n=b[k+1],b.splice(k+1,1);b.splice(k,1);var v=b[d];isNaN(b[d+1])?h="":(h=b[d+1],b.splice(d+1,1));b.splice(d,1)}else v=b[d],isNaN(b[d+1])?h="":(h=b[d+1],b.splice(d+1,1)),b.splice(d,1),m=b[k],isNaN(b[k+1])?n="":(n=b[k+1],b.splice(k+1,1)),b.splice(k,1);isNaN(b[d])?(""!==n&&b.splice(d,0,n),b.splice(d,
0,m)):(""!==n&&b.splice(d+1,0,n),b.splice(d+1,0,m));d=findPosition(b,g,v);isNaN(b[d])?(""!==h&&b.splice(d,0,h),b.splice(d,0,v)):(""!==h&&b.splice(d+1,0,h),b.splice(d+1,0,v));h=decryptKU(b);v=Math.floor(4E4*getTetraScore(h.replace(/[^a-z]/g,""))/(h.length*h.length));d=v-l;0<=d?(l=v,r=b.slice()):0<c&&(d=Math.pow(Math.E,d/c),k=(1E3*Math.random()+1)/1E3,d>k&&(l=v,r=b.slice()));l>f&&(f=l,t=!0,u=r.slice(),solutions[numSols-1]<f&&(solutions[numSols-1]=f,solutions.sort(function(w,x){return x-w}),self.postMessage({cmd:"reslt",
key:u.slice(0,g).join("-"),score:f,text:h})))}}isRunning=!1}function findPosition(a,c,e){for(;c<a.length&&!(isNaN(a[c])&&e<a[c]);c+=1);return c}
function solveUKSyllabary(){var a,c,e,u,q,b=[],r=[];var p=[];var g=[],t=[],l=[],f=[],h=[],d=[];isRunning=!0;var k=!1;for(e=0;1E3>e;e+=1){if(!k){p=randomiseNumbers(10);for(a=0;a<p.length;a+=1)b[a]=p[a];p=randomiseNumbers(10);for(a=0;a<p.length;a+=1)r[a]=p[a]}for(a=0;10>a;a+=1)l[a]=b[a],f[a]=r[a];var m=decryptUK(l,f);p=q=Math.floor(4E4*getTetraScore(m.replace(/[^a-z]/g,""))/(m.length*m.length));k=!1;for(c=20;0<=c;c-=.1)for(u=0;1E3>u;u+=1){for(a=0;a<l.length;a+=1)g[a]=l[a],t[a]=f[a];m=Math.floor(10*
Math.random());do a=Math.floor(10*Math.random());while(m===a);if(0===u%2){var n=g[m];g[m]=g[a];g[a]=n}else n=t[m],t[m]=t[a],t[a]=n;m=decryptUK(g,t);a=Math.floor(4E4*getTetraScore(m.replace(/[^a-z]/g,""))/(m.length*m.length));n=a-q;if(0<=n)for(q=a,a=0;a<g.length;a+=1)l[a]=g[a],f[a]=t[a];else if(0<c){n=Math.pow(Math.E,n/c);var v=(1E3*Math.random()+1)/1E3;if(n>v)for(q=a,a=0;a<g.length;a+=1)l[a]=g[a],f[a]=t[a]}if(q>p){p=q;k=!0;for(a=0;a<l.length;a+=1)b[a]=l[a],r[a]=f[a];for(a=0;a<l.length;a+=1)d[b[a]]=
a,h[r[a]]=a;solutions[numSols-1]<p&&(solutions[numSols-1]=p,solutions.sort(function(w,x){return x-w}),self.postMessage({cmd:"reslt",key:h.join("")+"/"+d.join(""),score:p,text:m}))}}}isRunning=!1}function decryptUK(a,c){var e;var u=cipher.length;var q="";for(e=0;e<u;e+=2){var b=a[Number(cipher[e])];var r=c[Number(cipher[e+1])];q+=keySquare[b][r]}return q.toLowerCase()}function decryptKU(a){var c;var e="";for(c=0;c<cipherPairs.length;c+=1)e+=a[Number(cipherPairs[c])];return e.toLowerCase()}
function readKeysquare(){switch(language){case "French":keySquare=["A 1 AI AIS AIT AN ANS AR AS B".split(" "),"2 C 3 CE D 4 DAN DE DEL DES".split(" "),"DU E 5 ED EDE EL ELL EM EME EN".split(" "),"ENT ER ES ESE EST EUR F 6 G 7".split(" "),"GE H 8 I 9 IE ION IT J 0".split(" "),"K L LA LE LES LLE M ME MEN N".split(" "),"NE NO NON NS NT O ON ONT OU OUI".split(" "),"OUR OUS P PAR Q QU QUE QUI R RE".split(" "),"RES S SE SSE T TE TI TIO TRE TTE".split(" "),"U UI UN UNE UR V W X Y Z".split(" ")];break;case "German":keySquare=
["A 1 AB AHT ALS AM AN AU AUF B".split(" "),"2 BE BEN BER C 3 CH CHE CHT D".split(" "),"4 DA DE DEN DER DES DI DIE DU E".split(" "),"5 EI EIN EL EN END ER F 6 G".split(" "),"7 GE GEN H 8 HA HE HEN I 9".split(" "),"ICH IE IN ISC IST IT J 0 K L".split(" "),"M MI MIT N ND NDE NE NO NS NUR".split(" "),"O OB P Q R RCH RE S SCH SE".split(" "),"ST T TE TEN U UE UM UN UND UNG".split(" "),"V VON W WAR WAS WO X Y Z ZU".split(" ")];break;case "Italian":keySquare=["A 1 AL AN AR ATO B 2 C 3".split(" "),"CA CHE CI CO D 4 DA DE DI E".split(" "),
"5 EL EN ER ES ET F 6 G 7".split(" "),"GI H 8 I 9 IA IC IL IN ION".split(" "),"IS IT J 0 K L LA LE LI LL".split(" "),"LO M MA ME MI MO N NA NE NI".split(" "),"NO NTE O OL ON OR OS P PA PER".split(" "),"PR Q QU R RA RE RI RO S SA".split(" "),"SE SI SO SS ST T TA TE TI TO".split(" "),"TR TT U UN V W X Y Z ZIO".split(" ")];break;case "Spanish":keySquare=["A 1 AD ADO AL AQU AR ARA AS B".split(" "),"2 C 3 CI CIO CO CON D 4 DE".split(" "),"DEL DI E 5 EDE EL EN ER ES EST".split(" "),"F 6 G 7 H 8 HAY I 9 IO".split(" "),
"IST J 0 K L LA LAS LO LOS M".split(" "),"MAS ME MI MUY N NEI NO NON NTE O".split(" "),"ON OR OS OSA P PER POR Q QU QUE".split(" "),"R RA RE RES S SDE SE SER SI SIN".split(" "),"SON ST SU SUS T TA TE TI TU U".split(" "),"UE UN UNA UNO V VA W X Y Z".split(" ")];break;case "Latin":keySquare=["A 1 AD AE AM ANT AS AT ATI ATU".split(" "),"B 2 BUS C 3 CON CUM D 4 E".split(" "),"5 EM ENT EQU ER ERA ERI ES ET EX".split(" "),"F 6 G 7 H 8 I 9 IA IBU".split(" "),"IN IO ION IS ISS IT ITA ITU J 0".split(" "),
"K L M N NE NT O OS P PER".split(" "),"PRO Q QUA QUE QUI QUO R RA RAT RE".split(" "),"RI RUM S SE SI SSE STR T TA TAT".split(" "),"TE TER TI TIS TO TUM TUR U UA UI".split(" "),"UM UNT UR US UT V W X Y Z".split(" ")];break;default:keySquare=["A 1 AL AN AND AR ARE AS AT ATE".split(" "),"ATI B 2 BE C 3 CA CE CO COM".split(" "),"D 4 DA DE E 5 EA ED EN ENT".split(" "),"ER ERE ERS ES EST F 6 G 7 H".split(" "),"8 HAS HE I 9 IN ING ION IS IT".split(" "),"IVE J 0 K L LA LE M ME N".split(" "),"ND NE NT O OF ON OR OU P Q".split(" "),
"R RA RE RED RES RI RO S SE SH".split(" "),"ST STO T TE TED TER TH THE THI THR".split(" "),"TI TO U V VE W WE X Y Z".split(" ")]}return keySquare}self.addEventListener("message",function(a){a=a.data;cipher=a.cipher;uInt8Array=a.uInt8Array;totalWorkers=a.totalWorkers;workerNumber=a.workerNumber;numSols=a.numSols;alphabet=a.alphabet;language=a.language;type=a.type;decipherSyllabary()},!1);