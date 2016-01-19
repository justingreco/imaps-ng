//>>built
define("esri/toolbars/_VertexMover","dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/has dojo/sniff dojo/dom-style dojox/gfx/Moveable ../kernel ../geometry/Point ../graphic ../geometry/webMercatorUtils".split(" "),function(g,n,l,m,p,q,s,t,u,v,r){g=g(null,{declaredClass:"esri.toolbars.VertexMover",constructor:function(a,b,c,e,k,h,f,d){this.point=a;this.symbol=b;this.relatedGraphic=c;this.segIndex=e;this.ptIndex=k;this.segLength=h;this.editor=f;this.map=f.map;this._scratchGL=f.toolbar._scratchGL;
this._placeholder=d||!1;this._type=c.geometry.type;this._init();this._enable()},refresh:function(a){if(a||this._needRefresh())this._disable(),this._enable()},destroy:function(){this._disable();this.graphic&&this._scratchGL.remove(this.graphic);this.point=this.symbol=this.graphic=this.relatedGraphic=this.segIndex=this.ptIndex=this.segLength=this.editor=this.map=this._scratchGL=null},_init:function(){var a=new u(this.point.toJson()),a=new v(a,this.symbol);switch(this._type){case "multipoint":a._shape=
this.relatedGraphic.getDojoShape().children[this.ptIndex];break;case "polyline":case "polygon":this._scratchGL.add(a)}this.graphic=a},_enable:function(){var a=this.graphic.getDojoShape();a&&(a._hasMover=!0,this._moveable=this._getMoveable(a),(a=a.getEventSource())&&q.set(a,"cursor",this.editor.toolbar._cursors[this._placeholder?"move-gv":"move-v"]))},_disable:function(){var a=this._moveable;if(a){l.disconnect(this._startHandle);l.disconnect(this._firstHandle);l.disconnect(this._movingHandle);l.disconnect(this._stopHandle);
var b=a.shape;b&&(b=b.getEventSource())&&q.set(b,"cursor",null);a.destroy();this._moveable=null}},_needRefresh:function(){var a=this.graphic.getDojoShape(),b=!1;if(a)switch(this._type){case "multipoint":var c=this.relatedGraphic.getDojoShape();c&&(c=c.children[this.ptIndex],a!==c&&(this.graphic._shape=c,b=!0));break;case "polyline":case "polygon":b=!a._hasMover}return b},_getMoveable:function(a){a=new s(a,p("mac")&&p("ff")&&!m("esri-touch")&&{leftButtonOnly:!0});this._startHandle=l.connect(a,"onMoveStart",
this,this._moveStartHandler);this._firstHandle=l.connect(a,"onFirstMove",this,this._firstMoveHandler);this._movingHandle=l.connect(a,"onMoving",this,this._movingHandler);this._stopHandle=l.connect(a,"onMoveStop",this,this._moveStopHandler);return a},_getPtIndex:function(){return this.ptIndex+(this._placeholder?1:0)},_getInfo:function(){return{graphic:this.graphic,isGhost:this._placeholder,segmentIndex:this.segIndex,pointIndex:this._getPtIndex()}},_moveStartHandler:function(a){var b=this.map;b.snappingManager&&
b.snappingManager._setUpSnapping();a.shape.moveToFront();this.constructor.onMoveStart(this);this.editor.toolbar.onVertexMoveStart(this.relatedGraphic,this._getInfo())},_firstMoveHandler:function(a){var b=a.shape,c=this._getControlEdges(),e=this._scratchGL._div,k,h=[],f=a.host.shape._wrapOffsets[0]||0;for(k=0;k<c.length;k++){var d=c[k];d.x1+=f;d.x2+=f;h.push([e.createLine({x1:d.x1,y1:d.y1,x2:d.x2,y2:d.y2}).setStroke(this.editor._lineStroke),d.x1,d.y1,d.x2,d.y2])}b._lines=h;a.shape.moveToFront();this.constructor.onFirstMove(this);
this.editor.toolbar.onVertexFirstMove(this.relatedGraphic,this._getInfo())},_movingHandler:function(a,b,c){b=this.map;m("esri-pointer")&&(c=b.navigationManager.pointerEvents._processTouchEvent(c,c),b.snappingManager&&b.snappingManager._onSnappingMouseMoveHandler(c));c=a.shape;a=c.getTransform();b=c._lines;for(c=0;c<b.length;c++){var e=b[c];e[0].setShape({x1:e[1]+a.dx,y1:e[2]+a.dy,x2:e[3],y2:e[4]})}this.editor.toolbar.onVertexMove(this.relatedGraphic,this._getInfo(),a)},_moveStopHandler:function(a){a=
a.shape;var b=this.editor.toolbar,c=a.getTransform(),e=this.map,k=this.graphic,h=b._geo?r.geographicToWebMercator(k.geometry):k.geometry,f,d=a._lines;if(d){for(f=0;f<d.length;f++)d[f][0].removeShape();a._lines=null}f=!1;var d=!0,l=this._getInfo();c&&(c.dx||c.dy)?this._placeholder&&(this._placeholder=!1,f=!0):d=!1;var g;e.snappingManager&&(g=e.snappingManager._snappingPoint);g=g||e.toMap(e.toScreen(h).offset(c.dx,c.dy));e.snappingManager&&e.snappingManager._killOffSnapping();a.setTransform(null);k.setGeometry(b._geo?
r.webMercatorToGeographic(g,!0):g);this.constructor.onMoveStop(this,c);b.onVertexMoveStop(this.relatedGraphic,l,c);if(!d)b.onVertexClick(this.relatedGraphic,l);if(f)b.onVertexAdd(this.relatedGraphic,this._getInfo())},_getControlEdges:function(){var a=this.map,b=this.relatedGraphic.geometry,c=this.segIndex,e=this.ptIndex,k=this.segLength,h=this._scratchGL._div.getTransform(),f=h.dx,h=h.dy,d=a.toScreen(this.graphic.geometry),a=d.x-f,d=d.y-h,g=[],b=this.editor._getControlPoints(this,b,c,e,k);b[0]&&g.push({x1:a,
y1:d,x2:b[0].x-f,y2:b[0].y-h});b[1]&&g.push({x1:a,y1:d,x2:b[1].x-f,y2:b[1].y-h});return g}});m("extend-esri")&&n.setObject("toolbars.VertexMover",g,t);n.mixin(g,{onMoveStart:function(){},onFirstMove:function(){},onMoveStop:function(){}});return g});