//>>built
define("xstyle/main",["require","put-selector/put"],function(D,z){function H(a,b){return a&&a.then?a.then(b):b(a)}function u(a,b,d){return H(a,function(a){var c=b[0];if(!a)return d(c||a);if(c&&a.get)return u(a.get(c),b.slice(1),d);if(a.receive)return a.receive(c?function(a){u(a,b,d)}:d);if(c)return u(a[c],b.slice(1),d);d(a)})}function fa(a,b,d){u(a,b.slice(0,b.length-1),function(a){var c=b[b.length-1];a.set?a.set(c,d):a[c]=d})}function W(a){a=p.getElementsByTagName(a);for(var b=0;b<a.length;b++)O(a[b])}
function ga(){return this.join("")}function X(a){this.value=a}function O(a,b,d){function k(){D(["xstyle/load-imports"],function(c){c(a,function(){O(a,b,!0)})})}var c=a.sheet||a.styleSheet||a,e=c.needsParsing,g=c.rules||c.cssRules;if(c.imports&&!d&&c.imports.length)return k();if(!e)for(var f=0;f<g.length;f++){var l=g[f];if(l.href&&!d)return k();l.selectorText&&"x-"==l.selectorText.substring(0,2)&&(e=!0,/^'/.test(l.style.content))}I(c.localSource||(c.ownerNode||c.ownerElement).innerHTML,c,b)}function I(a,
b,d){function k(a,b,J){(y[a]||(y[a]={}))[b]=J}function c(a){y[a]||(y[a]={});k("selector","x-"+a,{onRule:function(b){b.eachProperty(function(b,Q){var c=Q.toString();do{c=c.match(/([^, \(]+)(?:[, ]+(.+))?/);if(!c)break;var d=c[1];if("module"==d)return k(a,b,Q[1].args[0]);if("default"==d){if("pseudo"==a)try{p.querySelectorAll("x:"+b);break}catch(h){}}else if("prefix"!=d)return k(a,b,function(){return Q})}while(c=c[2])})}})}function e(){}function g(a){this.caller=a;this.args=[]}function f(a,b){b.onRule();
var c=y.selector[a];c&&l(c,"onRule",b)}function l(a,c,J,ha){if(a){var e=h,k=function(a){"string"==typeof a&&b.addRule(e.fullSelector(),a);0==--C&&d&&d(b)};C++;var f=function(a){function E(a){console.error("Error occurred processing "+c.slice(2).toLowerCase()+" "+J+("{"==e.operator?' in rule "'+e.selector+'" {'+e.cssText:"")+". "+a.message);a&&console.error(a)}try{var d=a[c](J,ha,e,b);e instanceof g&&(e.result=d);d&&d.then?d.then(k,E):k(d)}catch(h){E(h)}};"string"==typeof a?D([a],f):f(a)}}function P(a,
b){function c(a,b){b||(q+=a);if(m)if(m.push)"string"==typeof m[m.length-1]&&"string"==typeof a?m[m.length-1]+=a:a&&m.push(a);else if("string"==typeof m&&"string"==typeof a)m+=a;else{var E=[m,a];E.toString=ga;m=E}else m=a}h=w;for(var e=x.lastIndex=0,k=!0,q="",g=!0;;){var r=x.exec(a),t=r[4],s=r[1],v=r[2],r=r[3],p,n,m,z,r=r&&Y(r),s=Y(s);if(g){if(v?(q=n=s,p=v.charAt(0),z="?"==v.charAt(1)):q=r=s,m=r,n||"/"!=t)g=!1}else r=r?s+v:s,c(r);switch(t){case "'":case '"':var u="'"==t?ia:ja;u.lastIndex=x.lastIndex;
(t=u.exec(a))||error("unterminated string");t=t[1];x.lastIndex=u.lastIndex;c(new X(t));continue;case "/":"*"==a[x.lastIndex]?(R.lastIndex=x.lastIndex+1,R.exec(a),x.lastIndex=R.lastIndex):c("/");continue;case "\\":t=u.lastIndex++;c(a.charAt(t));continue;case "(":case "{":case "[":var A=!1;if("{"==t){g=!0;c(s=h.newRule(q),!0);if(p){k=!1;if(!v||"\x3e"==v.charAt(1))m.creating=!0;"\x3d"==p&&r&&(A=!0)}h.root&&k&&(s.cssRule=b.cssRules[e++])}else v=r.match(/(.*?)([\w-]*)$/),c(s=h.newCall(v[2],m,h)),s.ref=
F(h,v[2]),(m.calls||(m.calls=[])).push(s);s.parent=h;s.selector=m.creating?".x-generated-"+S++:h.root?q:h.selector+" "+q;A&&(v=F(h,r.match(/[^\s]+$/)[0],!0))&&Z(v,s);h.currentName=n;h.currentSequence=m;h.assignmentOperator=p;K.push(h=s);h.operator=t;h.start=x.lastIndex;q="";h.selector&&h.selector.replace(/:([-\w]+)/,function(a,b){var c=y.pseudo[b];c&&l(c,"onPseudo",b,h)});m=n=null;continue}if(m)if(s=m[0],s.charAt&&"@"==s.charAt(0))"import"==m[0].slice(1,7)&&(v=I.getStyleSheet(b.cssRules[e++],m,b),
C++,r=x.lastIndex,P(v.localSource,v),x.lastIndex=r);else try{h[":"==p?"setValue":"declareProperty"](n,m,z)}catch(B){console.error(B.stack||B)}switch(t){case ":":g=!0;p=":";break;case "}":case ")":case "]":$[h.operator]!=t&&console.error("Incorrect opening operator "+h.operator+" with closing operator "+t);n=null;h.cssText=a.slice(h.start,x.lastIndex-1);"}"==t&&(f(h.selector,h),k=!0,q="");K.pop();h=K[K.length-1];m=h.currentSequence;n=h.currentName;p=h.assignmentOperator;h.root&&"}"==t&&(g=!0,p=!1);
break;case "":d&&d();return;case ";":m=null,g=!0,p=k=!1,q=""}}}b.addRule||(b.addRule=function(a,b,c){return this.insertRule(a+"{"+b+"}",0<=c?c:this.cssRules.length)});b.deleteRule||(b.deleteRule=b.removeRule);var y={property:{}};c("property");c("function");c("pseudo");y["function"]["var"]=A;y["function"]["extends"]=A;var C=1;(b.href||location.href).replace(/[^\/]+$/,"");e.prototype={eachProperty:function(a){for(var b=this.values||0,c=0;c<b.length;c++){var d=b[c];a.call(this,d||"unnamed",b[d])}},fullSelector:function(){return(this.parent?
this.parent.fullSelector():"")+(this.selector||"")+" "},newRule:function(a){return(this.rules||(this.rules={}))[a]=new e},newCall:function(a,b,c){return new g(a)},addSheetRule:function(a,c){if(c&&"@"!=a.charAt(0)){var d=b.addRule(a,c);-1==d&&(d=b.cssRules.length-1);return b.cssRules[d]}},onRule:function(){this.getCssRule()},getCssRule:function(){this.cssRule||(this.cssRule=this.addSheetRule(this.selector,this.cssText));return this.cssRule},get:function(a){return this.values[a]},declareProperty:function(a,
b,c){if("\x3e"==b[0].toString().charAt(0))a||(this.generator=b,b=aa(b,this),A.addRenderer("",b,this,b));else{var d=a in n.style||F(this,a);if(!c||!d)(this.properties||(this.properties={}))[a]=b,d&&console.warn('Overriding existing property "'+a+'"')}},setValue:function(a,b){var c=this.values||(this.values=[]);c.push(a);c[a]=b;if(c=b.calls)for(var d=0;d<c.length;d++){var e=c[d],h=e.ref;h&&"function"==typeof h.call&&h.call(e,this,a,b)}if(a){do{if(c=F(this,a)){var q=this;H(L(q,a,c),function(c){c=c.splice?
c:[c];for(var d=0;d<c.length&&!c[d].put(b,q,a);d++);});break}a=a.substring(0,a.lastIndexOf("-"))}while(a)}},cssText:""};var q=g.prototype=new e;q.declareProperty=q.setValue=function(a,b){this.args.push(b)};q.toString=function(){var a=this.operator;return a+this.args+$[a]};var h,w=new e;w.root=!0;w.properties={Math:Math,module:function(a){return{then:function(b){D([a],b)}}},item:{forElement:function(a){for(;!a.item;)a=a.parentNode;return{element:a,receive:function(b){b(a.item)}}}},prefix:{put:function(a,
b,c){if("string"==typeof n.style[G+c])return b.addSheetRule(b.selector,G+c+":"+a)}},"var":{put:function(a,b,c){(b.variables||(b.variables={}))[c]=a;b=(b=b.variableListeners)&&b[c]||0;for(c=0;c<b.length;c++)b[c](a)},call:function(a,b,c,d){this.receive(function(a){b.addSheetRule(b.selector,c+": "+d.toString().replace(/var\([^)]+\)/g,a))},b,a.args[0])},receive:function(a,b,c){var d=b;do{if(b=d.variables&&d.variables[c])return d=d.variableListeners||(d.variableListeners={}),(d[c]||(d[c]=[])).push(a),
a(b);d=d.parent}while(d);a()}},on:{put:function(a,b,c){L(b,c,a)}}};w.css=a;w.parse=P;var K=[w];P(a,b);0==--C&&d&&d(b);return w}function ba(){W("link");W("style");if(!T)if(T=!0,ka["dom-qsa2.1"]){for(var a=0,b=B.length;a<b;a++)ca(B[a]);da()}else for(var d=p.all,a=0,b=d.length;a<b;a++)ea(d[a])}function ca(a){for(var b=p.querySelectorAll(a.selector),d=a.name,k=0,c=b.length;k<c;k++){var e=b[k],g=e.elementalStyle;g||(g=e.elementalStyle={},e.elementalSpecificities={});var f=e.renderings;f||(f=e.renderings=
[],M.push(e));f.push({name:d,rendered:g[d]==a.propertyValue,renderer:a});g[d]=a.propertyValue}}function da(){for(var a=0;a<M.length;a++){var b=M[a],d=b.renderings,k=b.elementalStyle;delete b.renderings;for(var c=0;c<d.length;c++){var e=d[c],g=e.renderer,f=g.rendered;U=k[e.name]==g.propertyValue;if(!f&&U)try{g.render(b)}catch(l){console.error(l,l.stack),z(b,"div.error",l.toString())}f&&(!U&&g.unrender)&&(g.unrender(b),d.splice(c--,1))}}M=[]}function ea(a,b){for(var d=0,k=B.length;d<k;d++){var c=B[d];
(!b||b==c.selector)&&(V?V.call(a,c.selector):a.currentStyle[c.name]==c.propertyValue)&&c.render(a)}}function aa(a,b){S++;a=a.sort?a:[a];return function(d,k){for(var c=d,e=0,g=a.length;e<g;e++){var f=a[e];try{if(f.eachProperty)if(f.args)if("("==f.operator){var l=a[e+1];l&&l.eachProperty&&z(c,l.selector);var n=f.args.toString(),y=L(f,0,n);(function(a,c){H(y,function(d){d.forElement&&(d=d.forElement(c));var e=a.appendChild(p.createTextNode("Loading"));d.receive(function(b){if(b&&b.sort){e&&(e.parentNode.removeChild(e),
e=null);var c=l&&l.eachProperty&&l.get("each");c&&(c=aa(c,l));b.forEach(c?function(b){c(a,b)}:function(b){z(a,la[a.tagName]||"div",b)})}else"value"in a?(a.value=b,a["-x-variable"]=d):e.nodeValue=b},b,n)})})(c,d)}else z(c,f.toString());else z(c,f.selector),A.update(c,f.selector);else if("string"==typeof f){"\x3d"==f.charAt(0)&&(f=f.slice(1));for(var C=f.split(","),f=0,q=C.length;f<q;f++){var h=C[f].trim();if(h){var h=h.replace(/\([^)]*\)/,function(a){}),w=z(0==f?c:d,h);k&&(w.item=k);l=a[e+1];w!=c&&
(!l||!l.eachProperty)&&A.update(w);c=w}}}else c.appendChild(p.createTextNode(f.value))}catch(u){console.error(u,u.stack),c.appendChild(p.createTextNode(u))}}return c}}function L(a,b,d){function k(){var a=e.length+1,b=[],c=[],d,k,f=function(e){return function(g){b[e]=g;a--;if(0>=a){k=!0;d=p?p.apply(this,b):b[0];for(g=0;g<c.length;g++)c[g](d)}}};if(p)for(var g=0;g<e.length;g++){var l=e[g];u(l[0],l.slice(1),f(g))}else{var l=e[0],n={then:function(a){c.push(a)}};H(l[0],function(a){n=a;for(var b=1;b<l.length;b++)if(n&&
n.get)n=n.get(l[b]);else{n={receive:function(b){u(a,l.slice(1),b)},put:function(a){fa(resolve,l.slice(1),a)}};break}for(b=0;b<c.length;b++)c[b](n)});return n}f(-1)();return d&&d.then?d:{receive:function(a){c&&c.push(a);k&&a(d)}}}var c=a["var-expr-"+b];if(e)return c;var e=[],g;e.id=S++;var f=[],l;d=d.join?d.join(""):d.toString();c=d.match(/^[\w_$\/\.-]*$/);d=d.replace(/("[^\"]*")|([\w_$\.\/-]+)/g,function(b,c,d){if(d){l=d.split("/");b=l.join("_");f.push(b);e.push(l);c=l[0];d=F(a,c);if("string"==typeof d||
d instanceof Array)d=L(a,c,d);else if(!d)throw Error('Could not find reference "'+c+'"');d.forElement&&(g=!0);l[0]=d}return b});if(!c)var p=Function.apply(this,f.concat(["return xstyleReturn("+d+")"]));e.func=p;a["var-expr-"+b]=e;return a["var-expr-"+b]=g?{forElement:function(b){for(var c,d=b;!V.call(b,a.selector);)b=b.parentNode;for(b=0;b<e.length;b++){var g=e[b],f=g[0];f.forElement&&(f=g[0]=f.forElement(d));g=f.element;if(d!=c){for(;d!=g;){if(d==c)return;d=d.parentNode}c=d}}d=c["expr-result-"+e.id];
d||(c["expr-result-"+e.id]=d=k(),d.element=c);return d}}:k()}function F(a,b,d){do{var k=a.properties&&a.properties[b]||d&&a.rules&&a.rules[b];a=a.parent}while(!k&&a);return k}function Z(a,b){b.cssText+=a.cssText;"values,properties,variables,calls".replace(/\w+/g,function(d){a[d]&&(b[d]=Object.create(a[d]))});var d=b.getCssRule();a.eachProperty(function(a,c){b.setValue(a,c);if(a){var e=d.style;e[a]||(e[a]=c)}});a.generator&&b.declareProperty(null,a.generator)}var x=/\s*([^{\}\[\]\(\)\/\\'":=;]*)([=:]\??\s*([^{\}\[\]\(\)\/\\'":;]*))?([{\}\[\]\(\)\/\\'":;]|$)/g,
ia=/((?:\\.|[^'])*)'/g,ja=/((?:\\.|[^"])*)"/g,R=/\*\//g,S=0,la={TABLE:"tr",TBODY:"tr",TR:"td",UL:"li",OL:"li",SELECT:"option"},$={"{":"}","[":"]","(":")"},p=document,Y="".trim?function(a){return a.trim()}:function(a){return a.replace(/^\s+|\s+$/g,"")},n=p.createElement("div");X.prototype.toString=function(){return'"'+this.value.replace(/["\\\n\r]/g,"\\$\x26")+'"'};var N=navigator.userAgent,G=-1<N.indexOf("WebKit")?"-webkit-":-1<N.indexOf("Firefox")?"-moz-":-1<N.indexOf("MSIE")?"-ms-":-1<N.indexOf("Opera")?
"-o-":"";I.getStyleSheet=function(a,b){return a.styleSheet};p.addEventListener("change",function(a){a=a.target;var b=a["-x-variable"];b.put&&b.put(a.value)});var n=p.createElement("div"),ka={"dom-qsa2.1":!!n.querySelectorAll},V=n.matches||n.matchesSelector||n.webkitMatchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector,B=[],M=[],T;/e/.test(p.readyState||"")?setTimeout(ba,200):p.addEventListener("DOMContentLoaded",ba);var U,A={process:O,vendorPrefix:G,applyProperty:function(a,
b){return"opacity"==a&&"-ms-"==G?"filter: alpha(opacity\x3d"+100*b+"); zoom: 1;":G+a+":"+b+";"},onFunction:function(a,b,d){},onCall:function(a,b){function d(){var b=c,d="extends"==a?"rules":"variables";do{if(!b)throw Error('Could not find "'+k[0]+'" in the defined '+d);var e=b[d]&&b[d][k[0]],b=b.parent}while(!e);return e}var k=b.args,c=b.parent;if("extends"==a){var e=d();Z(e,c)}else if("var"==a)return function(a){a.addSheetRule(a.selector,a.currentName+": "+a.currentSequence.toString().replace(/var\([^)]+\)/g,
d()))}},parse:I,addRenderer:function(a,b,d,k){a={selector:d.selector,propertyValue:b,name:a,render:k};B.push(a);T&&ca(a);da()},update:ea,clearRenderers:function(){B=[]},load:function(a,b,d,k){b(["xstyle/css"],function(c){c.load(a,b,d,k)})}};return A});xstyleReturn=function(D){return 1==arguments.length?D:[].slice.call(arguments)};