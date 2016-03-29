//>>built
define("esri/renderers/utils","dojo/_base/lang dojo/_base/array dojo/has dojo/date/locale ../kernel ../numberUtils ../Color dojo/i18n!../nls/jsapi dojo/i18n!dojo/cldr/nls/gregorian".split(" "),function(l,k,s,p,t,n,q,u,v){function w(a){return a&&k.map(a,function(a){return new q(a)})}var h={},x={millisecond:0,second:1,minute:2,hour:3,day:4,month:5,year:6},r={millisecond:[{formatLength:"long",selector:"date"},{formatLength:"medium",selector:"time"}],second:[{formatLength:"long",selector:"date"},{formatLength:"medium",
selector:"time"}],minute:[{formatLength:"long",selector:"date"},{formatLength:"short",selector:"time"}],hour:[{formatLength:"long",selector:"date"},{formatLength:"short",selector:"time"}],day:[{formatLength:"long",selector:"date"}],month:[{formatLength:"long",selector:"date"}],year:[{selector:"year"}]};l.mixin(h,{createColorStops:function(a){var b=a.values,d=a.colors,f=a.labelIndexes;a=[];return a=k.map(b,function(a,e){var g="";0===e?g="\x3c ":e===b.length-1&&(g="\x3e ");return{value:a,color:d[e],
label:!f||-1<k.indexOf(f,e)?g+n.format(a):null}})},updateColorStops:function(a){var b=a.stops;a=a.changes;var d=[],f,c=k.map(b,function(a){return a.value});k.forEach(a,function(a){d.push(a.index);c[a.index]=a.value});f=n.round(c,{indexes:d});k.forEach(b,function(a,d){a.value=c[d];var m="";0===d?m="\x3c ":d===b.length-1&&(m="\x3e ");a.label=null!=a.label?m+n.format(f[d]):null})},createClassBreakLabel:function(a){var b=a.minValue,d=a.maxValue,f=a.isFirstBreak?"":"\x3e ";a="percent-of-total"===a.normalizationType?
"%":"";b=null==b?"":n.format(b);d=null==d?"":n.format(d);return f+b+a+" "+u.smartMapping.minToMax+" "+d+a},setLabelsForClassBreaks:function(a){var b=a.classBreaks,d=a.classificationMethod,f=a.normalizationType,c=[];b&&b.length&&"standard-deviation"!==d&&(a.round?(c.push(b[0].minValue),k.forEach(b,function(a){c.push(a.maxValue)}),c=n.round(c),k.forEach(b,function(a,b){a.label=h.createClassBreakLabel({minValue:0===b?c[0]:c[b],maxValue:c[b+1],isFirstBreak:0===b,normalizationType:f})})):k.forEach(b,function(a,
b){a.label=h.createClassBreakLabel({minValue:a.minValue,maxValue:a.maxValue,isFirstBreak:0===b,normalizationType:f})}))},updateClassBreak:function(a){var b=a.classBreaks,d=a.normalizationType,f=a.change,c=f.index,f=f.value,e=-1,g=-1,m=b.length;"standard-deviation"!==a.classificationMethod&&(0===c?e=c:c===m?g=c-1:(g=c-1,e=c),-1<e&&e<m&&(a=b[e],a.minValue=f,a.label=h.createClassBreakLabel({minValue:a.minValue,maxValue:a.maxValue,isFirstBreak:0===e,normalizationType:d})),-1<g&&g<m&&(a=b[g],a.maxValue=
f,a.label=h.createClassBreakLabel({minValue:a.minValue,maxValue:a.maxValue,isFirstBreak:0===g,normalizationType:d})))},calculateDateFormatInterval:function(a){var b,d,f=a.length,c,e,g,m,h,l,n=Infinity,p;a=k.map(a,function(a){return new Date(a)});for(b=0;b<f-1;b++){c=a[b];g=[];h=Infinity;l="";for(d=b+1;d<f;d++)e=a[d],e=c.getFullYear()!==e.getFullYear()&&"year"||c.getMonth()!==e.getMonth()&&"month"||c.getDate()!==e.getDate()&&"day"||c.getHours()!==e.getHours()&&"hour"||c.getMinutes()!==e.getMinutes()&&
"minute"||c.getSeconds()!==e.getSeconds()&&"second"||"millisecond",m=x[e],m<h&&(h=m,l=e),g.push(e);h<n&&(n=h,p=l)}return p},createUniqueValueLabel:function(a){var b=a.value,d=a.fieldInfo,f=a.domain;a=a.dateFormatInterval;var c=String(b);if(f=f&&f.codedValues?f.getName(b):null)c=f;else if("number"===typeof b)if(d&&"esriFieldTypeDate"===d.type){var e=new Date(b);if(a&&r[a])var g=k.map(r[a],function(a){return p.format(e,a)}).reverse(),c=1==g.length?g[0]:v["dateTimeFormat-medium"].replace(/\'/g,"").replace(/\{(\d+)\}/g,
function(a,b){return g[b]});else c=p.format(e)}else c=n.format(b);return c},cloneColorInfo:function(a){var b;a&&(b=l.mixin({},a),b.colors=w(b.colors),b.stops=b.stops&&k.map(b.stops,function(a){a=l.mixin({},a);a.color&&(a.color=new q(a.color));return a}));return b},cloneSizeInfo:function(a){var b;if(a){b=l.mixin({},a);b.stops&&(b.stops=k.map(b.stops,function(a){return l.mixin({},a)}));if((a=b.minSize)&&"object"===typeof a)b.minSize=h.cloneSizeInfo(a);if((a=b.maxSize)&&"object"===typeof a)b.maxSize=
h.cloneSizeInfo(a);if(a=b.legendOptions)if(b.legendOptions=l.mixin({},a),a=a.customValues)b.legendOptions.customValues=a.slice(0)}return b}});s("extend-esri")&&l.setObject("renderer.utils",h,t);return h});