var routes,gridSz,gridWd;
function genRoutes(a){var c,b;gridSz=a;gridWd=Math.sqrt(a);routes=[];for(c=0;48>c;c+=1)routes[c]=[];for(a=0;48>a;a+=1){var d=0;switch(a){case 0:for(c=0;c<gridSz;c+=1)routes[a][c]=c;break;case 1:mirrorKeywordRoutes(0,a);break;case 2:flipKeywordRoutes(0,a);break;case 3:flipKeywordRoutes(1,a);break;case 4:var e=!0;for(c=0;c<gridSz;c+=gridWd){if(!0===e)for(b=0;b<gridWd;b+=1)routes[a][c+b]=d,d+=1;else for(b=gridWd-1;0<=b;--b)routes[a][c+b]=d,d+=1;e=!e}break;case 5:mirrorKeywordRoutes(4,a);break;case 6:flipKeywordRoutes(4,
a);break;case 7:flipKeywordRoutes(5,a);break;case 8:for(c=0;c<gridWd;c+=1)for(b=0;b<gridWd;b+=1)routes[a][b*gridWd+c]=routes[0][c*gridWd+b];break;case 9:mirrorKeywordRoutes(8,a);break;case 10:flipKeywordRoutes(8,a);break;case 11:flipKeywordRoutes(9,a);break;case 12:rotateKeywordRoutes(6,a);break;case 13:mirrorKeywordRoutes(12,a);break;case 14:flipKeywordRoutes(12,a);break;case 15:flipKeywordRoutes(13,a);break;case 16:b=0;do{if(b<gridWd){e=0;var f=b}else e=b-gridWd+1,f=gridWd-1;for(c=e;c<=f;c+=1){var g=
c;var h=f-c+e;routes[a][g*gridWd+h]=d;d+=1}b+=1}while(d<gridSz);break;case 17:mirrorKeywordRoutes(16,a);break;case 18:flipKeywordRoutes(16,a);break;case 19:flipKeywordRoutes(17,a);break;case 20:b=0;do{b<gridWd?(e=0,f=b):(e=b-gridWd+1,f=gridWd-1);for(c=e;c<=f;c+=1)1===b%2?(g=f-c+e,h=c):(g=c,h=f-c+e),routes[a][g*gridWd+h]=d,d+=1;b+=1}while(d<gridSz);break;case 21:mirrorKeywordRoutes(20,a);break;case 22:flipKeywordRoutes(20,a);break;case 23:flipKeywordRoutes(21,a);break;case 24:rotateKeywordRoutes(18,
a);break;case 25:mirrorKeywordRoutes(24,a);break;case 26:flipKeywordRoutes(24,a);break;case 27:mirrorKeywordRoutes(26,a);break;case 28:rotateKeywordRoutes(22,a);break;case 29:mirrorKeywordRoutes(28,a);break;case 30:flipKeywordRoutes(28,a);break;case 31:flipKeywordRoutes(29,a);break;case 32:f=-1;b=gridWd;e=-gridWd;do{e=-1*e/gridWd;for(c=0;c<b;c+=1)f+=e,routes[a][f]=d,d+=1;e*=gridWd;--b;for(c=0;c<b;c+=1)f+=e,routes[a][f]=d,d+=1}while(0<b);break;case 33:rotateKeywordRoutes(32,a);break;case 34:rotateKeywordRoutes(33,
a+1);break;case 35:rotateKeywordRoutes(35,a-1);break;case 36:mirrorKeywordRoutes(33,a);break;case 37:mirrorKeywordRoutes(32,a);break;case 38:mirrorKeywordRoutes(35,a);break;case 39:mirrorKeywordRoutes(34,a);break;case 40:for(c=0;c<gridWd;c+=1)for(b=0;b<gridWd;b+=1)routes[a][c*gridWd+b]=gridSz-1-routes[36][c*gridWd+b];break;case 41:rotateKeywordRoutes(40,a);break;case 42:rotateKeywordRoutes(41,a);break;case 43:rotateKeywordRoutes(42,a);break;case 44:flipKeywordRoutes(42,a);break;case 45:flipKeywordRoutes(41,
a);break;case 46:flipKeywordRoutes(40,a);break;case 47:flipKeywordRoutes(43,a)}}return routes}function flipKeywordRoutes(a,c){var b,d;for(b=0;b<Math.floor(gridWd/2);b+=1)for(d=0;d<gridWd;d+=1)routes[c][b*gridWd+d]=routes[a][(gridWd-b-1)*gridWd+d],routes[c][(gridWd-b-1)*gridWd+d]=routes[a][b*gridWd+d];if(1===gridWd%2)for(b=Math.floor(gridWd/2)*gridWd,d=0;d<gridWd;d+=1)routes[c][b+d]=routes[a][b+d]}
function mirrorKeywordRoutes(a,c){var b,d;for(b=0;b<gridWd;b+=1)for(d=0;d<gridWd;d+=1)routes[c][b*gridWd+d]=routes[a][b*gridWd+(gridWd-d-1)]}function rotateKeywordRoutes(a,c){var b,d;for(b=0;b<gridWd;b+=1)for(d=0;d<gridWd;d+=1)routes[c][b*gridWd+d]=routes[a][(gridWd-d-1)*gridWd+b]};