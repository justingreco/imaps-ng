//>>built
define("esri/dijit/metadata/base/Templated","dojo/_base/declare dojo/_base/lang dojo/dom-style dojo/has ./etc/docUtil dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/i18n!../nls/i18nBase ../../../kernel".split(" "),function(b,d,e,f,c,g,h,k,l,m){b=b([g,h,k],{_destroyWasCalled:!1,_escapeSingleQuotes:!1,i18nBase:l,templateString:"\x3cdiv data-dojo-attach-point\x3d'containerNode'\x3e\x3c/div\x3e",hide:!1,postCreate:function(){this.inherited(arguments);this.hide&&e.set(this.domNode,
"display","none")},destroy:function(){this._destroyWasCalled=!0;this.inherited(arguments)},setI18nNodeText:function(b,a){c.setI18nNodeText(b,a)},setNodeText:function(b,a){c.setNodeText(b,a)},_escapeValue:function(b){var a=this.inherited(arguments);if(this._escapeSingleQuotes&&-1!==a.indexOf("\x26#x27;")){for(var c=0;10>c;c++)if(-1!==a.indexOf("\\\x26#x27;"))a=a.replace(/\\&#x27;/g,"\x26#x27;");else break;a=a.replace(/&#x27;/g,"\\\x26#x27;")}return a}});f("extend-esri")&&d.setObject("dijit.metadata.base.Templated",
b,m);return b});