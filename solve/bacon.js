"use strict";
var plain;
var solutions = [];
var cipher;
var keyword;
var numSols;
var uInt8Array;
var workerNumber;
var totalWorkers;
var isRunning;
var cipherLength;
var alphabetMask = [];

function decipherBacon() {
  if ('function' === typeof importScripts) {
    // importScripts("decipherLib.js");
    // importScripts("cryptoPrograms.js");
    importScripts("../support/decipherLib.js");
    importScripts("../support/cryptoPrograms.js");
  }
  initSolution();
  createMasks();
  cipherLength = cipher.length;
  if (typeof keyword !== 'undefined') {
    if (keyword.length > 0) {
      solveWithKeyword();
    } else {
      solveBacon();
    }
  }
  if (isRunning === false) {
    self.postMessage({'cmd': 'STOP', 'msg': ''});
  }
}

function solveBacon() {
  var score;
  var keyStart;
  var keyEnd;
  var keyTrial;
  var key;
  var posn;
  var numberOfBitsSet;
  var ascA=ord('A');
  var ascZ=ord('Z');

  keyStart = Math.floor(0x4000000 / totalWorkers) * workerNumber;
  keyEnd = Math.floor(0x4000000 / totalWorkers) * (workerNumber + 1);
  keyTrial = 0;
  if (totalWorkers > 1) {
    keyStart = workerNumber;
  } else {
    keyStart = 0;
  }
  isRunning = true;
  for (keyTrial = keyStart; keyTrial < keyEnd; keyTrial += totalWorkers) {
    numberOfBitsSet = numberOfSetBits(keyTrial);
    // Assume key contains between 6 and 19 chars representing A and B
    if (numberOfBitsSet > 6 && numberOfBitsSet < 19) {
      if (keyIsValid(keyTrial)) {
        if (testKey(keyTrial)) {
          score = getTetraScore(plain);
          key = "";
          for (posn = ascA; posn <= ascZ; posn += 1) {
            if ((keyTrial & alphabetMask[posn]) > 0) {
              key += 'B';
            } else {
              key += 'A';
            }
          }

          if (solutions[numSols-1] < score) {
            solutions[numSols-1] = score;
            solutions.sort(function(a, b){return b - a;});
            self.postMessage({'cmd': 'reslt',
                      'key': key,
                      'score': score,
                      'text': plain});
          }
        }
      }
      self.postMessage({'cmd': 'progress',
                'worker': workerNumber,
                'trials': keyTrial,
                'totalWorkers': totalWorkers
                });
    }
  }
  isRunning = false;
}

function keyIsValid(key) {
  // Five letter group can't start with 'bb...'
  var ptr;
  var isValid;
  var ch1, ch2;

  ptr = 0;
  isValid = true;
  do {
    ch1 = cipher.charAt(ptr);
    ptr += 1;
    ch2 = cipher.charAt(ptr);
    ptr += 1;
    if (((key & alphabetMask[ch1]) > 0) && (key & alphabetMask[ch2]) > 0) {
      isValid = false;
    }
  } while ((isValid === true) && (ptr < (cipherLength)) );
  return (isValid);
}

function testKey(key) {
  var posn;
  var group;
  var ch;
  var bitGroup;
  var ciphPtr;
  var textIsValid;
  var asca=ord('a');
  var ascz=ord('z');

  plain = "";
  textIsValid = true;
  ciphPtr = 0;
  for (posn = 0; posn < cipherLength; posn += 5) {
    bitGroup = 0;
    for (group = 0; group < 5; group += 1) {
      ch = ord(cipher.charAt(ciphPtr));
      ciphPtr += 1;
      bitGroup = bitGroup << 1;
      if ((key & alphabetMask[ch]) > 0) {
        bitGroup += 1;
      }
    }

    // Convert bits to letter. A=00000, B=00001, C=00010, ...)
    // Allow for I/J and U/V combined
    bitGroup = bitGroup + asca + (bitGroup > 8) + (bitGroup > 19);
    if ( bitGroup > ascz ) {
      bitGroup = '?';
      textIsValid = false;
    }
    plain += chr(bitGroup);
  }
  return (textIsValid);
}

function numberOfSetBits(n) {
    n = n - ((n >> 1) & 0x55555555);
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
    return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
}

function createMasks() {
  alphabetMask[90] = 0x1; // Z
  alphabetMask[89] = 0x2; // Y
  alphabetMask[88] = 0x4; // X
  alphabetMask[87] = 0x8; // W
  alphabetMask[86] = 0x10; // V
  alphabetMask[85] = 0x20; // U
  alphabetMask[84] = 0x40; // T
  alphabetMask[83] = 0x80; // S
  alphabetMask[82] = 0x100; // R
  alphabetMask[81] = 0x200; // Q
  alphabetMask[80] = 0x400; // P
  alphabetMask[79] = 0x800; // O
  alphabetMask[78] = 0x1000; // N
  alphabetMask[77] = 0x2000; // M
  alphabetMask[76] = 0x4000; // L
  alphabetMask[75] = 0x8000; // K
  alphabetMask[74] = 0x10000; // J
  alphabetMask[73] = 0x20000; // I
  alphabetMask[72] = 0x40000; // H
  alphabetMask[71] = 0x80000; // G
  alphabetMask[70] = 0x100000; // F
  alphabetMask[69] = 0x200000; // E
  alphabetMask[68] = 0x400000; // D
  alphabetMask[67] = 0x800000; // C
  alphabetMask[66] = 0x1000000; // B
  alphabetMask[65] = 0x2000000; // A
}

function solveWithKeyword() {
  var key;
  var score;
  var keyTrial;

  key = keyword.replace(/[A]/gi, '0');
  key = key.replace(/[B]/gi, '1');
  keyTrial = parseInt(key, 2);
  if (keyIsValid(keyTrial)) {
    if (testKey(keyTrial)) {
      score = getTetraScore(plain);
      self.postMessage({'cmd': 'reslt',
                'key': keyword,
                'score': score,
                'text': plain.toLowerCase()});
    }
  } else {
    self.postMessage({'cmd': 'reslt',
              'key': '',
              'score': 0,
              'text': 'Key not valid!'});
  }
  isRunning = false;
}

self.addEventListener('message', function(e) {
  var data = e.data;
  cipher = data.cipher;
  uInt8Array = data.uInt8Array;
  totalWorkers = data.totalWorkers;
  workerNumber = data.workerNumber;
  numSols = data.numSols;
  keyword = data.keyword;
  decipherBacon();
}, false);
