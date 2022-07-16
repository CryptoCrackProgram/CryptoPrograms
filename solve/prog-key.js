var plain,period,arrKey=[],solutions=[],cipher,cType,keyword,minPeriod,maxPeriod,numSols,uInt8Array,workerNumber,totalWorkers,isRunning,interCipher,key=[];function decipherProgKey(){"function"===typeof importScripts&&(importScripts("../support/decipherLib.js"),importScripts("../support/cryptoPrograms.js"));arrKey.length=0;initSolution();"undefined"!==typeof keyword&&(0<keyword.length?solveWithKeyword():solveProgKey());!1===isRunning&&self.postMessage({cmd:"STOP",msg:""})}
function solveProgKey(){var a;isRunning=!0;for(period=minPeriod;period<=maxPeriod;period+=1)for(a=1;26>a;a+=1){key=[];getIntermediateCipher(cipher,period,a);getInitialBestMatch();getRemainingKey();decipher(key.join(""));var c=getTetraScore(plain);solutions[numSols-1]<c&&(solutions[numSols-1]=c,solutions.sort(function(e,b){return b-e}),self.postMessage({cmd:"reslt",key:key.join(""),score:c,text:plain.toLowerCase()}))}isRunning=!1;self.postMessage({cmd:"progress",worker:workerNumber,trials:0,totalWorkers:totalWorkers})}
function getInitialBestMatch(){var a,c,e,b,d,f=ord("A"),g=[];for(a=d=0;26>a;a+=1)for(g[0]=a,c=0;26>c;c+=1)for(g[1]=c,e=0;26>e;e+=1)for(g[2]=e,b=0;26>b;b+=1){g[3]=b;var h=getTestKeyScore(g,4,0);h>d&&(d=h,key[0]=chr(a+f),key[1]=chr(c+f),key[2]=chr(e+f),key[3]=chr(b+f))}}
function getTestKeyScore(a,c,e){var b,d=0;switch(cType){case 0:for(;e<interCipher.length-c+1;e+=period){plain="";for(b=0;b<c;b+=1)plain+=decryptVigenere(interCipher[e+b],a[b]);d+=getSingleTetraScore(plain)}break;case 1:for(;e<interCipher.length-c+1;e+=period){plain="";for(b=0;b<c;b+=1)plain+=decryptBeaufort(interCipher[e+b],a[b]);d+=getSingleTetraScore(plain)}break;case 2:for(;e<interCipher.length-c+1;e+=period){plain="";for(b=0;b<c;b+=1)plain+=decryptVariant(interCipher[e+b],a[b]);d+=getSingleTetraScore(plain)}}return d}
function getRemainingKey(){var a,c,e=[],b=ord("A");for(a=4;a<period;a+=1){var d=0;e[0]=ord(key[a-3])-b;e[1]=ord(key[a-2])-b;e[2]=ord(key[a-1])-b;key[a]="A";for(c=0;26>c;c+=1){e[3]=c;var f=getTestKeyScore(e,4,a-3);f>d&&(d=f,key[a]=chr(c+b))}}}
function decipher(a){var c,e=ord("A");var b=interCipher.length;var d=0;plain="";switch(cType){case 0:for(c=0;c<b;c+=1)plain+=decryptVigenere(interCipher.charAt(c),ord(a.charAt(d))-e),d+=1,d===period&&(d=0);break;case 1:for(c=0;c<b;c+=1)plain+=decryptBeaufort(interCipher.charAt(c),ord(a.charAt(d))-e),d+=1,d===period&&(d=0);break;case 2:for(c=0;c<b;c+=1)plain+=decryptVariant(interCipher.charAt(c),ord(a.charAt(d))-e),d+=1,d===period&&(d=0)}return plain}
function solveWithKeyword(){var a;var c=0;period=keyword.length;for(a=1;26>a;a+=1){getIntermediateCipher(cipher,period,a);plain=decipher(keyword);var e=getTetraScore(plain);switch(cType){case 0:key=keyword+" (Vigenere)";break;case 1:key=keyword+" (Beaufort)";break;default:key=keyword+" (Variant)"}e>c&&(c=e,self.postMessage({cmd:"reslt",key:key,score:e,text:plain.toLowerCase()}))}isRunning=!1}
function getIntermediateCipher(a,c,e){var b,d;var f=d=0;var g=a.length;interCipher="";switch(cType){case 0:for(b=0;b<g;b+=1)0<b&&0===b%c&&(d+=e,25<d&&(d-=26)),interCipher+=decryptVigenere(a[f],d),f+=1;break;case 1:for(b=0;b<g;b+=1)0<b&&0===b%c&&(d+=e,25<d&&(d-=26)),interCipher+=decryptBeaufort(a[f],d),f+=1;break;case 2:for(b=0;b<g;b+=1)0<b&&0===b%c&&(d+=e,25<d&&(d-=26)),interCipher+=decryptVariant(a[f],d),f+=1}interCipher=interCipher.toUpperCase()}
self.addEventListener("message",function(a){a=a.data;cipher=a.cipher;uInt8Array=a.uInt8Array;totalWorkers=a.totalWorkers;workerNumber=a.workerNumber;numSols=a.numSols;cType=a.type;keyword=a.keyword;minPeriod=a.minPeriod;maxPeriod=a.maxPeriod;decipherProgKey()},!1);use strict";
var plain;
var period;
var arrKey = [];
var solutions = [];
var cipher;
var cType;
var keyword;
var minPeriod, maxPeriod;
var numSols;
var uInt8Array;
var workerNumber;
var totalWorkers;
var isRunning;
var interCipher;
var key = [];

function decipherProgKey() {
  if ('function' === typeof importScripts) {
    // importScripts("decipherLib.js");
    // importScripts("cryptoPrograms.js");
    importScripts("../support/decipherLib.js");
    importScripts("../support/cryptoPrograms.js");
  }
  arrKey.length = 0;
  initSolution();
  if (typeof keyword !== 'undefined') {
    if (keyword.length > 0) {
      solveWithKeyword();
    } else {
      solveProgKey();
    }
  }
  if (isRunning === false) {
    self.postMessage({'cmd': 'STOP', 'msg': ''});
  }
}

function solveProgKey() {
  var score;
  var progIndex;
  var keyTrials = 0;

  //if (minPeriod === maxPeriod) {
    //keyStart = minPeriod;
  //} else {
    //keyStart = minPeriod + workerNumber;
  //}
  isRunning = true;
  for (period = minPeriod; period <= maxPeriod; period += 1) {
    for (progIndex = 1; progIndex < 26; progIndex += 1) {
      key = [];
      getIntermediateCipher(cipher, period, progIndex);
      getInitialBestMatch();
      getRemainingKey();
      decipher(key.join(''));
      score = getTetraScore(plain);
      if (solutions[numSols-1] < score) {
        solutions[numSols-1] = score;
        solutions.sort(function(a, b){return b - a;}); 
        self.postMessage({'cmd': 'reslt',
                  'key': key.join(''),
                  'score': score,
                  'text': plain.toLowerCase()});
      }
    }
  }
  isRunning = false;
  self.postMessage({'cmd': 'progress',
            'worker': workerNumber,
            'trials': keyTrials,
            'totalWorkers': totalWorkers});
}

function getInitialBestMatch() {
  var i, j, k, m;
  var score;
  var bestScore;
  var ascA=ord('A');
  var testKey = [];

  bestScore = 0;
  for (i = 0; i < 26; i += 1) {
    testKey[0] = i;
    for (j = 0; j < 26; j += 1) {
      testKey[1] = j;
      for (k = 0; k < 26; k += 1) {
        testKey[2] = k;
        for (m = 0; m < 26; m += 1) {
          testKey[3] = m;

          score = getTestKeyScore(testKey, 4, 0);
          if (score > bestScore) {
            bestScore = score;
            key[0] = chr(i + ascA);
            key[1] = chr(j + ascA);
            key[2] = chr(k + ascA);
            key[3] = chr(m + ascA);
          }
        }
      }
    }
  }
}

function getTestKeyScore(testKey, length, start) {
  var i, j;
  var score = 0;

  switch (cType) {
    case 0:  // Vigenere
      for (i = start; i < interCipher.length - length + 1; i += period) {
        plain = "";
        for (j = 0; j < length; j += 1) {
          plain += decryptVigenere(interCipher[i + j], testKey[j]);
        }
        score += getSingleTetraScore(plain);
      }
      break;
    case 1:  // Beaufort
      for (i = start; i < interCipher.length - length + 1; i += period) {
        plain = "";
        for (j = 0; j < length; j += 1) {
          plain += decryptBeaufort(interCipher[i + j], testKey[j]);
        }
        score += getSingleTetraScore(plain);
      }
      break;
    case 2:  // Variant
      for (i = start; i < interCipher.length - length + 1; i += period) {
        plain = "";
        for (j = 0; j < length; j += 1) {
          plain += decryptVariant(interCipher[i + j], testKey[j]);
        }
        score += getSingleTetraScore(plain);
      }
      break;
  }
  return score;
}

function getRemainingKey() {
  var i, j;
  var score;
  var bestScore;
  var testKey = [];
  var ascA=ord('A');

  for (i = 4; i < period; i += 1) {
    bestScore = 0;
    testKey[0] = ord(key[i - 3]) - ascA;
    testKey[1] = ord(key[i - 2]) - ascA;
    testKey[2] = ord(key[i - 1]) - ascA;
    key[i] = 'A'; // Set key letter to 'A' in case no best match found
    for (j = 0; j < 26; j += 1) {
      testKey[3] = j;

      score = getTestKeyScore(testKey, 4, i - 3);
      if (score > bestScore) {
         bestScore = score;
         key[i] = chr(j + ascA);
      }
    }
  }
}

function decipher(key) {
  var i;
  var cipherLength;
  var keyPtr;
  var ascA=ord('A');

  cipherLength = interCipher.length;
  keyPtr = 0;
  plain = "";
  switch (cType) {
    case 0:  // Vigenere
      for (i = 0; i < cipherLength; i += 1) {
        plain += decryptVigenere(interCipher.charAt(i), ord(key.charAt(keyPtr)) - ascA);
        keyPtr += 1;
        if (keyPtr === period) {
          keyPtr = 0;
        }
      }
      break;
    case 1:  // Beaufort
      for (i = 0; i < cipherLength; i += 1) {
        plain += decryptBeaufort(interCipher.charAt(i), ord(key.charAt(keyPtr)) - ascA);
        keyPtr += 1;
        if (keyPtr === period) {
          keyPtr = 0;
        }
      }
      break;
    case 2:  // Variant
      for (i = 0; i < cipherLength; i += 1) {
        plain += decryptVariant(interCipher.charAt(i), ord(key.charAt(keyPtr)) - ascA);
        keyPtr += 1;
        if (keyPtr === period) {
          keyPtr = 0;
        }
      }
      break;
  }
  return plain;
}

function solveWithKeyword() {
  var progIndex;
  var score;
  var bestscore;

  bestscore = 0;
  period = keyword.length;
  for (progIndex = 1; progIndex < 26; progIndex += 1) {
    getIntermediateCipher(cipher, period, progIndex);
    plain = decipher(keyword);
    score = getTetraScore(plain);
    switch (cType) {
      case 0:
        key = keyword + " (Vigenere)";
        break;
      case 1:
        key = keyword + " (Beaufort)";
        break;
      default:
        key = keyword + " (Variant)";
    }
    if (score > bestscore) {
      bestscore = score;
      self.postMessage({'cmd': 'reslt',
                'key': key,
                'score': score,
                'text': plain.toLowerCase()});
    }
  }
  isRunning = false;
}

function getIntermediateCipher(cipher, period, progIndex) {
  var i;
  var ptr;
  var testKey;
  var cipherLength;

  testKey = 0;
  ptr = 0;
  cipherLength = cipher.length;
  interCipher = "";
  switch (cType) {
    case 0:  // Vigenere
      for (i = 0; i < cipherLength; i += 1) {
        if ((i > 0) && i % period === 0) {
          //testKey = (testKey + progIndex) % 26;
          testKey += progIndex;
          if (testKey > 25) {
            testKey -= 26;
          }
        }
        interCipher += decryptVigenere(cipher[ptr], testKey);
        ptr += 1;
      }
      break;
    case 1:  // Beaufort
      for (i = 0; i < cipherLength; i += 1) {
        if ((i > 0) && i % period === 0) {
          //testKey = (testKey + progIndex) % 26;
          testKey += progIndex;
          if (testKey > 25) {
            testKey -= 26;
          }
        }
        interCipher += decryptBeaufort(cipher[ptr], testKey);
        ptr += 1;
      }
      break;
    case 2:  // Variant
      for (i = 0; i < cipherLength; i += 1) {
        if ((i > 0) && i % period === 0) {
          //testKey = (testKey + progIndex) % 26;
          testKey += progIndex;
          if (testKey > 25) {
            testKey -= 26;
          }
        }
        interCipher += decryptVariant(cipher[ptr], testKey);
        ptr += 1;
      }
      break;
  }
  interCipher = interCipher.toUpperCase();
}

self.addEventListener('message', function(e) {
  var data = e.data;
  cipher = data.cipher;
  uInt8Array = data.uInt8Array;
  totalWorkers = data.totalWorkers;
  workerNumber = data.workerNumber;
  numSols = data.numSols;
  cType = data.type;
  keyword = data.keyword;
  minPeriod = data.minPeriod;
  maxPeriod = data.maxPeriod;
  decipherProgKey();
}, false);
