var uInt8Array,singleScores=[],englishAlph="ABCDEFGHIJKLMNOPQRSTUVWXYZ",englishAlphNum="A1B2C3D4E5F6G7H8I9J0KLMNOPQRSTUVWXYZ";
function readTetragraph(a,b){var c=new XMLHttpRequest;"withCredentials"in c?(c.open("GET",a,!0),c.responseType="arraybuffer",c.onload=function(d){4!==c.readyState||200!==c.status&&0!==c.status||(uInt8Array=new Uint8Array(c.response),document.getElementById("warning").value=b+" data file loaded")},c.send()):"undefined"!==typeof XDomainRequest?(c=new XDomainRequest,c.open("GET",a)):c=null}
function readDatafile(){var a=document.getElementById("accent")&&!0===document.getElementById("accent").checked?!0:!1;var b=document.getElementById("langID").value;switch(b){case "English":a="https://dl.dropboxusercontent.com/s/42tcwikamtux0g4/engTetra.dat?raw=1";break;case "Afrikaans":a="https://dl.dropboxusercontent.com/s/j47g3we5vw66ehr/afrTetra.dat?raw=1";break;case "Catalan":a="https://dl.dropboxusercontent.com/s/v984wahx6caj6dk/catTetra.dat?raw=1";break;case "Danish":a=!0===a?"https://dl.dropboxusercontent.com/s/5b644gjdxbmtfym/danTetraX.dat?raw=1":
"https://dl.dropboxusercontent.com/s/4df4bzmn2xw8ho2/danTetra.dat?raw=1";break;case "Dutch":a="https://dl.dropboxusercontent.com/s/th5o7izf0cflbp5/dutTetra.dat?raw=1";break;case "Esperanto":a="https://dl.dropboxusercontent.com/s/255a0884nmsrlr4/espTetra.dat?raw=1";break;case "French":a="https://dl.dropboxusercontent.com/s/dv7hvkylx3bevbp/freTetra.dat?raw=1";break;case "German":a=!0===a?"https://dl.dropboxusercontent.com/s/9xysmydx4657oje/gerTetraX.dat?raw=1":"https://dl.dropboxusercontent.com/s/asjflg0my7wssc6/gerTetra.dat?raw=1";
break;case "Italian":a="https://dl.dropboxusercontent.com/s/hlw9t46v3rovxce/itaTetra.dat?raw=1";break;case "Latin":a="https://dl.dropboxusercontent.com/s/exodri5hdw9rsfh/latTetra.dat?raw=1";break;case "Norwegian":a=!0===a?"https://dl.dropboxusercontent.com/s/05o1vsz8y2x37uf/norTetraX.dat?raw=1":"https://dl.dropboxusercontent.com/s/0d7ply20htwnqt5/norTetra.dat?raw=1";break;case "Polish":a="https://dl.dropboxusercontent.com/s/rvmys2zdqfj8d1s/polTetra.dat?raw=1";break;case "Portuguese":a="https://dl.dropboxusercontent.com/s/4e9m2t204tsi5ah/porTetra.dat?raw=1";
break;case "Spanish":a=!0===a?"https://dl.dropboxusercontent.com/s/aas4hlxnc8dtwku/spaTetraX.dat?raw=1":"https://dl.dropboxusercontent.com/s/5mfbut9cnvooaoa/spaTetra.dat?raw=1";break;case "Swedish":a=!0===a?"https://dl.dropboxusercontent.com/s/xllje0rkitna4k5/sweTetraX.dat?raw=1":"https://dl.dropboxusercontent.com/s/ypi28wemup02pvt/sweTetra.dat?raw=1";break;default:a="https://dl.dropboxusercontent.com/s/42tcwikamtux0g4/engTetra.dat?raw=1"}readTetragraph(a,b)}
function readSingles(a){var b,c,d,e=new XMLHttpRequest;a="https://dl.dropboxusercontent.com/s/rwdr38nel01klxt/engSingles.txt?raw=1";"withCredentials"in e?(e.open("GET",a,!0),e.responseType="text",e.onload=function(f){if(4===e.readyState&&(200===e.status||0===e.status))for(c=e.responseText,d=c.split("\n"),b=0;b<d.length;b+=1)singleScores[b]=0<d[b]?10*Math.log10(d[b]):0},e.send()):"undefined"!==typeof XDomainRequest?(e=new XDomainRequest,e.open("GET",a)):e=null}
function readSinglesData(){switch(document.getElementById("langID").value.substring(0,3)){case "Eng":var a="https://dl.dropboxusercontent.com/s/42tcwikamtux0g4/engTetra.dat?raw=1";break;case "Afr":a="https://dl.dropboxusercontent.com/s/j47g3we5vw66ehr/afrTetra.dat?raw=1";break;case "Cat":a="https://dl.dropboxusercontent.com/s/v984wahx6caj6dk/catTetra.dat?raw=1";break;case "Dan":a="https://dl.dropboxusercontent.com/s/4df4bzmn2xw8ho2/danTetra.dat?raw=1";break;case "Dut":a="https://dl.dropboxusercontent.com/s/th5o7izf0cflbp5/dutTetra.dat?raw=1";
break;case "Esp":a="https://dl.dropboxusercontent.com/s/255a0884nmsrlr4/espTetra.dat?raw=1";break;case "Fre":a="https://dl.dropboxusercontent.com/s/dv7hvkylx3bevbp/freTetra.dat?raw=1";break;case "Ger":a="https://dl.dropboxusercontent.com/s/asjflg0my7wssc6/gerTetra.dat?raw=1";break;case "Ita":a="https://dl.dropboxusercontent.com/s/hlw9t46v3rovxce/itaTetra.dat?raw=1";break;case "Lat":a="https://dl.dropboxusercontent.com/s/exodri5hdw9rsfh/latTetra.dat?raw=1";break;case "Nor":a="https://dl.dropboxusercontent.com/s/0d7ply20htwnqt5/norTetra.dat?raw=1";
break;case "Pol":a="https://dl.dropboxusercontent.com/s/rvmys2zdqfj8d1s/polTetra.dat?raw=1";break;case "Por":a="https://dl.dropboxusercontent.com/s/4e9m2t204tsi5ah/porTetra.dat?raw=1";break;case "Spa":a="https://dl.dropboxusercontent.com/s/5mfbut9cnvooaoa/spaTetra.dat?raw=1";break;case "Swe":a="https://dl.dropboxusercontent.com/s/ypi28wemup02pvt/sweTetra.dat?raw=1";break;default:a="https://dl.dropboxusercontent.com/s/42tcwikamtux0g4/engTetra.dat?raw=1"}readSingles(a)}
function periodChanged(a){var b=parseInt(document.getElementById("minPerd").value),c=parseInt(document.getElementById("maxPerd").value);0===a?c<b&&(document.getElementById("maxPerd").value=b):c<b&&(document.getElementById("minPerd").value=c)}function sortFunction(a,b){return a[0]===b[0]?0:a[0]<b[0]?1:-1}function getPerdCiphName(a){switch(a){case 0:return"Vigen\u00e8re";case 1:return"Beaufort";case 2:return"Variant Beaufort";case 3:return"Porta"}return"Gronsfeld"}
function typeChanged(a){a=Number(getRadioVal(document.forms.frm,"ciphTyp"));document.getElementById("header").innerHTML=getCiphName(a)+" Cipher"}function cleanInput(a,b){if("undefined"===typeof a)return"";a=a.toUpperCase();switch(b){case 0:var c=a.replace(/[^A-Z]/g,"");break;case 1:c=a.replace(/[^0-9]/g,"");break;case 2:c=a.replace(/[^A-Z0-9]/g,"");break;case 3:c=a.replace(/[^A-J0-9]/g,"");break;case 4:c=a.replace(/[^A-Z#]/g,"");break;case 5:c=a.replace(/[^0-9.\s]/g,"")}return c}
function readLanguages(){return"English Afrikaans Catalan Danish Dutch Esperanto French German Italian Latin Norwegian Polish Portuguese Spanish Swedish".split(" ")}function readLangMenu(){var a,b=document.getElementById("langID"),c=readLanguages();for(a=0;a<c.length;a+=1){var d=c[a];var e=document.createElement("option");e.textContent=d;e.value=d;b.appendChild(e)}}
function readWorkersMenu(){var a=document.getElementById("workerCount"),b=[];window.opr&&opr.addons||window.opera||navigator.userAgent.indexOf(" OPR/");/constructor/i.test(window.HTMLElement);var c=!!document.documentMode;var d=navigator.hardwareConcurrency||4;!c&&window.StyleMedia||c||(d-=2);1>d&&(d=1);for(c=0;c<d;c+=1)b[c]=c+1;for(c=0;c<b.length;c+=1){d=b[c];var e=document.createElement("option");e.textContent=d;e.value=d;a.appendChild(e)}}
function readMissingLetterMenu(){var a,b=document.getElementById("missingLtr"),c=[];for(a=0;a<englishAlph.length;a+=1)c[a]=englishAlph.charAt(a);for(a=0;a<c.length;a+=1){var d=c[a];var e=document.createElement("option");e.textContent=d;"J"===d&&(e.selected=!0);e.value=d;b.appendChild(e)}}function readAlphabets(){return["ABCDEFGHIJKLMNOPQRSTUVWXYZ","ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789","ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:';?!-\""]}
function readLangAlphabets(){var a="undefined"===typeof a?"ABCDEFGHIJKLMNOPQRSTUVWXYZ":alph26;if(!0===document.getElementById("accent").checked){switch(document.getElementById("langID").value){case "Danish":a+="\u00c6\u00d8\u00c5";break;case "German":a+="\u00c4\u00d6\u00dc";break;case "Norwegian":a+="\u00c6\u00d8\u00c5";break;case "Swedish":a+="\u00c5\u00c4\u00d6"}26<a.length&&(a=a.replace("Q",""),a=a.replace("W",""),a=a.replace("Z",""))}return a}
function readAlphbtMenu(){var a,b=document.getElementById("alphID"),c=readAlphabets();for(a=0;a<c.length;a+=1){var d=c[a];var e=document.createElement("option");e.textContent=d;e.value=d;b.appendChild(e)}}function convertToLetters(a){var b,c="";a=a.toUpperCase();for(b=0;b<a.length;b+=1)if(isNumeric(a[b])){var d=chr(ord(a[b])-ord("1")+ord("A"));c+=d}else c+=a[b];return c}
function convertToNumbers(a){var b,c="";a=a.toUpperCase();for(b=0;b<a.length;b+=1)if(isNumeric(a[b])){var d=chr(ord(a[b])-ord("1")+ord("A"));c+=d}else c+=a[b];return c}function isKeywordRepeated(a){var b,c=!0;for(b=0;b<a.length;b+=1)0<"".indexOf(""[b],b+1)&&(c=!1);return c}function isKeywordComplete(a){var b,c=!0;for(b=0;b<a.length;b+=1)isNumeric(a[b])&&chr(ord(a[b])-ord("1")+ord("A"));for(b=0;b<a.length;b+=1)-1===a.indexOf(chr(ord("A")+b))&&(c=!1);return c}
function isNumeric(a){return!isNaN(parseFloat(a))&&isFinite(a)}function getFactorial(a){function b(d){return 0===d||1===d?1:0<c[d]?c[d]:c[d]=b(d-1)*d}var c=[];return b(a)}function initSolution(){var a,b;for(a=0;a<=maxSol;a+=1)for(solutions[a]=[3],b=0;3>b;b+=1)solutions[a][b]=0}function initSolutionFour(){var a,b;for(a=0;a<=maxSol;a+=1)for(solutions[a]=[4],b=0;4>b;b+=1)solutions[a][b]=0};