//>>built
define("dojox/data/JsonRestStore","dojo/_base/lang dojo/_base/declare dojo/_base/connect dojox/rpc/Rest dojox/rpc/JsonRest dojox/json/schema dojox/data/ServiceStore".split(" "),function(k,r,s,m,d,p,t){var u=k.getObject("dojox.rpc",!0),n=r("dojox.data.JsonRestStore",t,{constructor:function(a){s.connect(m._index,"onUpdate",this,function(a,b,c,g){var d=this.service.servicePath;if(a.__id&&a.__id.substring(0,d.length)==d)this.onSet(a,b,c,g)});this.idAttribute=this.idAttribute||"id";"string"==typeof a.target&&
(a.target=a.target.match(/\/$/)||this.allowNoTrailingSlash?a.target:a.target+"/",this.service||(this.service=d.services[a.target]||m(a.target,!0)));d.registerService(this.service,a.target,this.schema);this.schema=this.service._schema=this.schema||this.service._schema||{};this.service._store=this;this.service.idAsRef=this.idAsRef;this.schema._idAttr=this.idAttribute;var b=d.getConstructor(this.service),c=this;this._constructor=function(a){b.call(this,a);c.onNew(this)};this._constructor.prototype=b.prototype;
this._index=m._index},loadReferencedSchema:!0,idAsRef:!1,referenceIntegrity:!0,target:"",allowNoTrailingSlash:!1,newItem:function(a,b){a=new this._constructor(a);if(b){var c=this.getValue(b.parent,b.attribute,[]),c=c.concat([a]);a.__parent=c;this.setValue(b.parent,b.attribute,c)}return a},deleteItem:function(a){var b=[],c=l._getStoreForItem(a)||this;if(this.referenceIntegrity){d._saveNotNeeded=!0;var q=m._index,f=function(g){var d;b.push(g);g.__checked=1;for(var e in g)if("__"!=e.substring(0,2)){var h=
g[e];h==a?g!=q&&(g instanceof Array?(d=d||[]).push(e):(l._getStoreForItem(g)||c).unsetAttribute(g,e)):"object"==typeof h&&h&&(h.__checked||f(h),"object"==typeof h.__checked&&g!=q&&(l._getStoreForItem(g)||c).setValue(g,e,h.__checked))}if(d){e=d.length;for(g=g.__checked=g.concat();e--;)g.splice(d[e],1);return g}return null};f(q);d._saveNotNeeded=!1;for(var e=0;b[e];)delete b[e++].__checked}d.deleteObject(a);c.onDelete(a)},changing:function(a,b){d.changing(a,b)},cancelChanging:function(a){if(a.__id){dirtyObjects=
d.getDirtyObjects();for(var b=0;b<dirtyObjects.length;b++)if(a==dirtyObjects[b].object){dirtyObjects.splice(b,1);break}}},setValue:function(a,b,c){var d=a[b],f=a.__id?l._getStoreForItem(a):this;p&&(f.schema&&f.schema.properties)&&p.mustBeValid(p.checkPropertyChange(c,f.schema.properties[b]));if(b==f.idAttribute)throw Error("Can not change the identity attribute for an item");f.changing(a);if((a[b]=c)&&!c.__parent)c.__parent=a;f.onSet(a,b,d,c)},setValues:function(a,b,c){if(!k.isArray(c))throw Error("setValues expects to be passed an Array object as its value");
this.setValue(a,b,c)},unsetAttribute:function(a,b){this.changing(a);var c=a[b];delete a[b];this.onSet(a,b,c,void 0)},save:function(a){if(!a||!a.global)(a=a||{}).service=this.service;if("syncMode"in a?a.syncMode:this.syncMode)u._sync=!0;a=d.commit(a);this.serverVersion=this._updates&&this._updates.length;return a},revert:function(a){d.revert(!(a&&a.global)&&this.service)},isDirty:function(a){return d.isDirty(a,this)},isItem:function(a,b){return a&&a.__id&&(b||this.service==d.getServiceAndId(a.__id).service)},
_doQuery:function(a){var b=d.query(this.service,"string"==typeof a.queryStr?a.queryStr:a.query,a),c=this;this.loadReferencedSchema&&b.addCallback(function(a){var f=b.ioArgs&&b.ioArgs.xhr&&b.ioArgs.xhr.getResponseHeader("Content-Type"),e=f&&f.match(/definedby\s*=\s*([^;]*)/);f&&!e&&(e=(e=b.ioArgs.xhr.getResponseHeader("Link"))&&e.match(/<([^>]*)>;\s*rel="?definedby"?/));if(e=e&&e[1])return f=d.getServiceAndId((c.target+e).replace(/^(.*\/)?(\w+:\/\/)|[^\/\.]+\/\.\.\/|^.*\/(\/)/,"$2$3")),f=d.byId(f.service,
f.id),f.addCallbacks(function(b){k.mixin(c.schema,b);return a},function(b){console.error(b);return a}),f});return b},_processResults:function(a,b){var c=a.length;return{totalCount:b.fullLength||(b.request.count==c?(b.request.start||0)+2*c:c),items:a}},getConstructor:function(){return this._constructor},getIdentity:function(a){a=a.__clientId||a.__id;if(!a)return a;var b=this.service.servicePath.replace(/[^\/]*$/,"");return a.substring(0,b.length)!=b?a:a.substring(b.length)},fetchItemByIdentity:function(a){var b=
a.identity,c=this;b.toString().match(/^(\w*:)?\//)&&(b=d.getServiceAndId(b),c=b.service._store,a.identity=b.id);a._prefix=c.service.servicePath.replace(/[^\/]*$/,"");return c.inherited(arguments)},onSet:function(){},onNew:function(){},onDelete:function(){},getFeatures:function(){var a=this.inherited(arguments);a["dojo.data.api.Write"]=!0;a["dojo.data.api.Notification"]=!0;return a},getParent:function(a){return a&&a.__parent}});n.getStore=function(a,b){if("string"==typeof a.target){a.target=a.target.match(/\/$/)||
a.allowNoTrailingSlash?a.target:a.target+"/";var c=(d.services[a.target]||{})._store;if(c)return c}return new (b||n)(a)};var l=k.getObject("dojox.data",!0);l._getStoreForItem=function(a){if(a.__id){var b=d.getServiceAndId(a.__id);if(b&&b.service._store)return b.service._store;a=a.__id.toString().match(/.*\//)[0];return new n({target:a})}return null};k.getObject("dojox.json.ref",!0)._useRefs=!0;return n});