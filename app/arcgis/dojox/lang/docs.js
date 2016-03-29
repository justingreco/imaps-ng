//>>built
define("dojox/lang/docs",["dojo","dijit","dojox"],function(f,z,t){f.provide("dojox.lang.docs");(function(){function y(c){}var g={},h=[],n=t.lang.docs._loadedDocs={},l=function(c,a){g[a]=c},r=function(c){var a=c.type||"",b,e=!1,d=!1,m,a=a.replace(/\?/,function(){e=!0;return""}),a=a.replace(/\[\]/,function(){d=!0;return""});a.match(/HTML/)?a="string":"String"==a||"Number"==a||"Boolean"==a||"Object"==a||"Array"==a||"Integer"==a||"Function"==a?a=a.toLowerCase():"bool"==a?a="boolean":a?(b=f.getObject(a)||
{},m=!0):b={};b=b||{type:a};d&&(b={items:b,type:"array"},m=!1);m||(e&&(b.optional=!0),/const/.test(c.tags)&&(b.readonly=!0));return b},u=function(c,a){var b=n[a];if(b){c.description=b.description;c.properties={};c.methods={};if(b.properties)for(var e=b.properties,d=0,m=e.length;d<m;d++)"prototype"==e[d].scope&&((c.properties[e[d].name]=r(e[d])).description=e[d].summary);if(b.methods){e=b.methods;d=0;for(m=e.length;d<m;d++)if((a=e[d].name)&&"prototype"==e[d].scope){var p=c.methods[a]={};p.description=
e[d].summary;var k=e[d].parameters;if(k){p.parameters=[];for(var q=0,g=k.length;q<g;q++){var h=k[q],l=p.parameters[q]=r(h);l.name=h.name;l.optional="optional"==h.usage}}if((k=e[d]["return-types"])&&k[0])k=r(k[0]),k.type&&(p.returns=k)}}(b=b.superclass)&&(c["extends"]=f.getObject(b))}},s=function(c){h.push(c)},v=f.declare;f.declare=function(c){var a=v.apply(this,arguments);l(a,c);return a};f.mixin(f.declare,v);var w,x=f.require;f.require=function(c){s(c);return x.apply(this,arguments)};t.lang.docs.init=
function(c){function a(){f.require=x;h=null;try{f.xhrGet({sync:!c,url:f.baseUrl+"../util/docscripts/api.json",handleAs:"text"}).addCallbacks(function(a){n=(new Function("return "+a))();l=u;for(var b in g)l(g[b],b);g=null},y)}catch(a){}}if(w)return null;w=!0;var b=function(a,b){return f.xhrGet({sync:b||!c,url:f.baseUrl+"../util/docscripts/api/"+a+".json",handleAs:"text"}).addCallback(function(a){a=(new Function("return "+a))();for(var b in a)n[b]||(n[b]=a[b])})};try{var e=h.shift();b(e,!0).addCallbacks(function(){s=
function(a){if(!n[a])try{b(a)}catch(c){n[a]={}}};f.forEach(h,function(a){s(a)});h=null;l=u;for(i in g)l(g[i],i);g=null},a)}catch(d){a()}return null}})()});