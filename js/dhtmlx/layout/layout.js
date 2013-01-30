/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/
dhtmlx=function(obj){for (var a in obj)dhtmlx[a]=obj[a];return dhtmlx;};dhtmlx.extend_api=function(name,map,ext){var t = window[name];if (!t)return;window[name]=function(obj){if (obj && typeof obj == "object" && !obj.tagName){var that = t.apply(this,(map._init?map._init(obj):arguments));for (var a in dhtmlx)if (map[a])this[map[a]](dhtmlx[a]);for (var a in obj){if (map[a])this[map[a]](obj[a]);else if (a.indexOf("on")==0){this.attachEvent(a,obj[a]);}
 }
 }else
 var that = t.apply(this,arguments);if (map._patch)map._patch(this);return that||this;};window[name].prototype=t.prototype;if (ext)dhtmlXHeir(window[name].prototype,ext);};dhtmlxAjax={get:function(url,callback){var t=new dtmlXMLLoaderObject(true);t.async=(arguments.length<3);t.waitCall=callback;t.loadXML(url)
 return t;},
 post:function(url,post,callback){var t=new dtmlXMLLoaderObject(true);t.async=(arguments.length<4);t.waitCall=callback;t.loadXML(url,true,post)
 return t;},
 getSync:function(url){return this.get(url,null,true)
 },
 postSync:function(url,post){return this.post(url,post,null,true);}
}
function dtmlXMLLoaderObject(funcObject, dhtmlObject, async, rSeed){this.xmlDoc="";if (typeof (async)!= "undefined")
 this.async=async;else
 this.async=true;this.onloadAction=funcObject||null;this.mainObject=dhtmlObject||null;this.waitCall=null;this.rSeed=rSeed||false;return this;};dtmlXMLLoaderObject.count = 0;dtmlXMLLoaderObject.prototype.waitLoadFunction=function(dhtmlObject){var once = true;this.check=function (){if ((dhtmlObject)&&(dhtmlObject.onloadAction != null)){if ((!dhtmlObject.xmlDoc.readyState)||(dhtmlObject.xmlDoc.readyState == 4)){if (!once)return;once=false;dtmlXMLLoaderObject.count++;if (typeof dhtmlObject.onloadAction == "function")dhtmlObject.onloadAction(dhtmlObject.mainObject, null, null, null, dhtmlObject);if (dhtmlObject.waitCall){dhtmlObject.waitCall.call(this,dhtmlObject);dhtmlObject.waitCall=null;}
 }
 }
 };return this.check;};dtmlXMLLoaderObject.prototype.getXMLTopNode=function(tagName, oldObj){if (this.xmlDoc.responseXML){var temp = this.xmlDoc.responseXML.getElementsByTagName(tagName);if(temp.length==0 && tagName.indexOf(":")!=-1)
 var temp = this.xmlDoc.responseXML.getElementsByTagName((tagName.split(":"))[1]);var z = temp[0];}else
 var z = this.xmlDoc.documentElement;if (z){this._retry=false;return z;}
 if (!this._retry){this._retry=true;var oldObj = this.xmlDoc;this.loadXMLString(this.xmlDoc.responseText.replace(/^[\s]+/,""), true);return this.getXMLTopNode(tagName, oldObj);}
 dhtmlxError.throwError("LoadXML", "Incorrect XML", [
 (oldObj||this.xmlDoc),
 this.mainObject
 ]);return document.createElement("DIV");};dtmlXMLLoaderObject.prototype.loadXMLString=function(xmlString, silent){if (!_isIE){var parser = new DOMParser();this.xmlDoc=parser.parseFromString(xmlString, "text/xml");}else {this.xmlDoc=new ActiveXObject("Microsoft.XMLDOM");this.xmlDoc.async=this.async;this.xmlDoc.onreadystatechange = function(){};this.xmlDoc["loadXM"+"L"](xmlString);}

 if (silent)return;if (this.onloadAction)this.onloadAction(this.mainObject, null, null, null, this);if (this.waitCall){this.waitCall();this.waitCall=null;}
}
dtmlXMLLoaderObject.prototype.loadXML=function(filePath, postMode, postVars, rpc){if (this.rSeed)filePath+=((filePath.indexOf("?") != -1) ? "&" : "?")+"a_dhx_rSeed="+(new Date()).valueOf();this.filePath=filePath;if ((!_isIE)&&(window.XMLHttpRequest))
 this.xmlDoc=new XMLHttpRequest();else {this.xmlDoc=new ActiveXObject("Microsoft.XMLHTTP");}
 if (this.async)this.xmlDoc.onreadystatechange=new this.waitLoadFunction(this);this.xmlDoc.open(postMode ? "POST" : "GET", filePath, this.async);if (rpc){this.xmlDoc.setRequestHeader("User-Agent", "dhtmlxRPC v0.1 ("+navigator.userAgent+")");this.xmlDoc.setRequestHeader("Content-type", "text/xml");}
 else if (postMode)this.xmlDoc.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');this.xmlDoc.setRequestHeader("X-Requested-With","XMLHttpRequest");this.xmlDoc.send(null||postVars);if (!this.async)(new this.waitLoadFunction(this))();};dtmlXMLLoaderObject.prototype.destructor=function(){this._filterXPath = null;this._getAllNamedChilds = null;this._retry = null;this.async = null;this.rSeed = null;this.filePath = null;this.onloadAction = null;this.mainObject = null;this.xmlDoc = null;this.doXPath = null;this.doXPathOpera = null;this.doXSLTransToObject = null;this.doXSLTransToString = null;this.loadXML = null;this.loadXMLString = null;this.doSerialization = null;this.xmlNodeToJSON = null;this.getXMLTopNode = null;this.setXSLParamValue = null;return null;}
dtmlXMLLoaderObject.prototype.xmlNodeToJSON = function(node){var t={};for (var i=0;i<node.attributes.length;i++)t[node.attributes[i].name]=node.attributes[i].value;t["_tagvalue"]=node.firstChild?node.firstChild.nodeValue:"";for (var i=0;i<node.childNodes.length;i++){var name=node.childNodes[i].tagName;if (name){if (!t[name])t[name]=[];t[name].push(this.xmlNodeToJSON(node.childNodes[i]));}
 }
 return t;}
function callerFunction(funcObject, dhtmlObject){this.handler=function(e){if (!e)e=window.event;funcObject(e, dhtmlObject);return true;};return this.handler;};function getAbsoluteLeft(htmlObject){return getOffset(htmlObject).left;}
function getAbsoluteTop(htmlObject){return getOffset(htmlObject).top;}
function getOffsetSum(elem) {var top=0, left=0;while(elem){top = top + parseInt(elem.offsetTop);left = left + parseInt(elem.offsetLeft);elem = elem.offsetParent;}
 return {top: top, left: left};}
function getOffsetRect(elem) {var box = elem.getBoundingClientRect();var body = document.body;var docElem = document.documentElement;var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;var clientTop = docElem.clientTop || body.clientTop || 0;var clientLeft = docElem.clientLeft || body.clientLeft || 0;var top = box.top + scrollTop - clientTop;var left = box.left + scrollLeft - clientLeft;return {top: Math.round(top), left: Math.round(left) };}
function getOffset(elem) {if (elem.getBoundingClientRect){return getOffsetRect(elem);}else {return getOffsetSum(elem);}
}
function convertStringToBoolean(inputString){if (typeof (inputString)== "string")
 inputString=inputString.toLowerCase();switch (inputString){case "1":
 case "true":
 case "yes":
 case "y":
 case 1:
 case true:
 return true;break;default: return false;}
}
function getUrlSymbol(str){if (str.indexOf("?")!= -1)
 return "&"
 else
 return "?"
}
function dhtmlDragAndDropObject(){if (window.dhtmlDragAndDrop)return window.dhtmlDragAndDrop;this.lastLanding=0;this.dragNode=0;this.dragStartNode=0;this.dragStartObject=0;this.tempDOMU=null;this.tempDOMM=null;this.waitDrag=0;window.dhtmlDragAndDrop=this;return this;};dhtmlDragAndDropObject.prototype.removeDraggableItem=function(htmlNode){htmlNode.onmousedown=null;htmlNode.dragStarter=null;htmlNode.dragLanding=null;}
dhtmlDragAndDropObject.prototype.addDraggableItem=function(htmlNode, dhtmlObject){htmlNode.onmousedown=this.preCreateDragCopy;htmlNode.dragStarter=dhtmlObject;this.addDragLanding(htmlNode, dhtmlObject);}
dhtmlDragAndDropObject.prototype.addDragLanding=function(htmlNode, dhtmlObject){htmlNode.dragLanding=dhtmlObject;}
dhtmlDragAndDropObject.prototype.preCreateDragCopy=function(e){if ((e||window.event)&& (e||event).button == 2)
 return;if (window.dhtmlDragAndDrop.waitDrag){window.dhtmlDragAndDrop.waitDrag=0;document.body.onmouseup=window.dhtmlDragAndDrop.tempDOMU;document.body.onmousemove=window.dhtmlDragAndDrop.tempDOMM;return false;}

 if (window.dhtmlDragAndDrop.dragNode)window.dhtmlDragAndDrop.stopDrag(e);window.dhtmlDragAndDrop.waitDrag=1;window.dhtmlDragAndDrop.tempDOMU=document.body.onmouseup;window.dhtmlDragAndDrop.tempDOMM=document.body.onmousemove;window.dhtmlDragAndDrop.dragStartNode=this;window.dhtmlDragAndDrop.dragStartObject=this.dragStarter;document.body.onmouseup=window.dhtmlDragAndDrop.preCreateDragCopy;document.body.onmousemove=window.dhtmlDragAndDrop.callDrag;window.dhtmlDragAndDrop.downtime = new Date().valueOf();if ((e)&&(e.preventDefault)){e.preventDefault();return false;}
 return false;};dhtmlDragAndDropObject.prototype.callDrag=function(e){if (!e)e=window.event;dragger=window.dhtmlDragAndDrop;if ((new Date()).valueOf()-dragger.downtime<100) return;if (!dragger.dragNode){if (dragger.waitDrag){dragger.dragNode=dragger.dragStartObject._createDragNode(dragger.dragStartNode, e);if (!dragger.dragNode)return dragger.stopDrag();dragger.dragNode.onselectstart=function(){return false;}
 dragger.gldragNode=dragger.dragNode;document.body.appendChild(dragger.dragNode);document.body.onmouseup=dragger.stopDrag;dragger.waitDrag=0;dragger.dragNode.pWindow=window;dragger.initFrameRoute();}
 else return dragger.stopDrag(e, true);}
 if (dragger.dragNode.parentNode != window.document.body && dragger.gldragNode){var grd = dragger.gldragNode;if (dragger.gldragNode.old)grd=dragger.gldragNode.old;grd.parentNode.removeChild(grd);var oldBody = dragger.dragNode.pWindow;if (grd.pWindow && grd.pWindow.dhtmlDragAndDrop.lastLanding)grd.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(grd.pWindow.dhtmlDragAndDrop.lastLanding);if (_isIE){var div = document.createElement("Div");div.innerHTML=dragger.dragNode.outerHTML;dragger.dragNode=div.childNodes[0];}else
 dragger.dragNode=dragger.dragNode.cloneNode(true);dragger.dragNode.pWindow=window;dragger.gldragNode.old=dragger.dragNode;document.body.appendChild(dragger.dragNode);oldBody.dhtmlDragAndDrop.dragNode=dragger.dragNode;}
 dragger.dragNode.style.left=e.clientX+15+(dragger.fx
 ? dragger.fx*(-1)
 : 0)
 +(document.body.scrollLeft||document.documentElement.scrollLeft)+"px";dragger.dragNode.style.top=e.clientY+3+(dragger.fy
 ? dragger.fy*(-1)
 : 0)
 +(document.body.scrollTop||document.documentElement.scrollTop)+"px";if (!e.srcElement)var z = e.target;else
 z=e.srcElement;dragger.checkLanding(z, e);}
dhtmlDragAndDropObject.prototype.calculateFramePosition=function(n){if (window.name){var el = parent.frames[window.name].frameElement.offsetParent;var fx = 0;var fy = 0;while (el){fx+=el.offsetLeft;fy+=el.offsetTop;el=el.offsetParent;}
 if ((parent.dhtmlDragAndDrop)){var ls = parent.dhtmlDragAndDrop.calculateFramePosition(1);fx+=ls.split('_')[0]*1;fy+=ls.split('_')[1]*1;}
 if (n)return fx+"_"+fy;else
 this.fx=fx;this.fy=fy;}
 return "0_0";}
dhtmlDragAndDropObject.prototype.checkLanding=function(htmlObject, e){if ((htmlObject)&&(htmlObject.dragLanding)){if (this.lastLanding)this.lastLanding.dragLanding._dragOut(this.lastLanding);this.lastLanding=htmlObject;this.lastLanding=this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, e.clientX,
 e.clientY, e);this.lastLanding_scr=(_isIE ? e.srcElement : e.target);}else {if ((htmlObject)&&(htmlObject.tagName != "BODY"))
 this.checkLanding(htmlObject.parentNode, e);else {if (this.lastLanding)this.lastLanding.dragLanding._dragOut(this.lastLanding, e.clientX, e.clientY, e);this.lastLanding=0;if (this._onNotFound)this._onNotFound();}
 }
}
dhtmlDragAndDropObject.prototype.stopDrag=function(e, mode){dragger=window.dhtmlDragAndDrop;if (!mode){dragger.stopFrameRoute();var temp = dragger.lastLanding;dragger.lastLanding=null;if (temp)temp.dragLanding._drag(dragger.dragStartNode, dragger.dragStartObject, temp, (_isIE
 ? event.srcElement
 : e.target));}
 dragger.lastLanding=null;if ((dragger.dragNode)&&(dragger.dragNode.parentNode == document.body))
 dragger.dragNode.parentNode.removeChild(dragger.dragNode);dragger.dragNode=0;dragger.gldragNode=0;dragger.fx=0;dragger.fy=0;dragger.dragStartNode=0;dragger.dragStartObject=0;document.body.onmouseup=dragger.tempDOMU;document.body.onmousemove=dragger.tempDOMM;dragger.tempDOMU=null;dragger.tempDOMM=null;dragger.waitDrag=0;}
dhtmlDragAndDropObject.prototype.stopFrameRoute=function(win){if (win)window.dhtmlDragAndDrop.stopDrag(1, 1);for (var i = 0;i < window.frames.length;i++){try{if ((window.frames[i] != win)&&(window.frames[i].dhtmlDragAndDrop))
 window.frames[i].dhtmlDragAndDrop.stopFrameRoute(window);}catch(e){}
 }
 try{if ((parent.dhtmlDragAndDrop)&&(parent != window)&&(parent != win))
 parent.dhtmlDragAndDrop.stopFrameRoute(window);}catch(e){}
}
dhtmlDragAndDropObject.prototype.initFrameRoute=function(win, mode){if (win){window.dhtmlDragAndDrop.preCreateDragCopy();window.dhtmlDragAndDrop.dragStartNode=win.dhtmlDragAndDrop.dragStartNode;window.dhtmlDragAndDrop.dragStartObject=win.dhtmlDragAndDrop.dragStartObject;window.dhtmlDragAndDrop.dragNode=win.dhtmlDragAndDrop.dragNode;window.dhtmlDragAndDrop.gldragNode=win.dhtmlDragAndDrop.dragNode;window.document.body.onmouseup=window.dhtmlDragAndDrop.stopDrag;window.waitDrag=0;if (((!_isIE)&&(mode))&&((!_isFF)||(_FFrv < 1.8)))
 window.dhtmlDragAndDrop.calculateFramePosition();}
 try{if ((parent.dhtmlDragAndDrop)&&(parent != window)&&(parent != win))
 parent.dhtmlDragAndDrop.initFrameRoute(window);}catch(e){}
 for (var i = 0;i < window.frames.length;i++){try{if ((window.frames[i] != win)&&(window.frames[i].dhtmlDragAndDrop))
 window.frames[i].dhtmlDragAndDrop.initFrameRoute(window, ((!win||mode) ? 1 : 0));}catch(e){}
 }
}
 _isFF = false;_isIE = false;_isOpera = false;_isKHTML = false;_isMacOS = false;_isChrome = false;_FFrv = false;_KHTMLrv = false;_OperaRv = false;if (navigator.userAgent.indexOf('Macintosh')!= -1)
 _isMacOS=true;if (navigator.userAgent.toLowerCase().indexOf('chrome')>-1)
 _isChrome=true;if ((navigator.userAgent.indexOf('Safari')!= -1)||(navigator.userAgent.indexOf('Konqueror') != -1)){_KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf('Safari')+7, 5));if (_KHTMLrv > 525){_isFF=true;_FFrv = 1.9;}else
 _isKHTML=true;}else if (navigator.userAgent.indexOf('Opera')!= -1){_isOpera=true;_OperaRv=parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf('Opera')+6, 3));}
else if (navigator.appName.indexOf("Microsoft")!= -1){_isIE=true;if ((navigator.appVersion.indexOf("MSIE 8.0")!= -1 || navigator.appVersion.indexOf("MSIE 9.0")!= -1 || navigator.appVersion.indexOf("MSIE 10.0")!= -1 ) && document.compatMode != "BackCompat"){_isIE=8;}
}else {_isFF=true;_FFrv = parseFloat(navigator.userAgent.split("rv:")[1])
}
dtmlXMLLoaderObject.prototype.doXPath=function(xpathExp, docObj, namespace, result_type){if (_isKHTML || (!_isIE && !window.XPathResult))
 return this.doXPathOpera(xpathExp, docObj);if (_isIE){if (!docObj)if (!this.xmlDoc.nodeName)docObj=this.xmlDoc.responseXML
 else
 docObj=this.xmlDoc;if (!docObj)dhtmlxError.throwError("LoadXML", "Incorrect XML", [
 (docObj||this.xmlDoc),
 this.mainObject
 ]);if (namespace != null)docObj.setProperty("SelectionNamespaces", "xmlns:xsl='"+namespace+"'");if (result_type == 'single'){return docObj.selectSingleNode(xpathExp);}
 else {return docObj.selectNodes(xpathExp)||new Array(0);}
 }else {var nodeObj = docObj;if (!docObj){if (!this.xmlDoc.nodeName){docObj=this.xmlDoc.responseXML
 }
 else {docObj=this.xmlDoc;}
 }
 if (!docObj)dhtmlxError.throwError("LoadXML", "Incorrect XML", [
 (docObj||this.xmlDoc),
 this.mainObject
 ]);if (docObj.nodeName.indexOf("document")!= -1){nodeObj=docObj;}
 else {nodeObj=docObj;docObj=docObj.ownerDocument;}
 var retType = XPathResult.ANY_TYPE;if (result_type == 'single')retType=XPathResult.FIRST_ORDERED_NODE_TYPE
 var rowsCol = new Array();var col = docObj.evaluate(xpathExp, nodeObj, function(pref){return namespace
 }, retType, null);if (retType == XPathResult.FIRST_ORDERED_NODE_TYPE){return col.singleNodeValue;}
 var thisColMemb = col.iterateNext();while (thisColMemb){rowsCol[rowsCol.length]=thisColMemb;thisColMemb=col.iterateNext();}
 return rowsCol;}
}
function _dhtmlxError(type, name, params){if (!this.catches)this.catches=new Array();return this;}
_dhtmlxError.prototype.catchError=function(type, func_name){this.catches[type]=func_name;}
_dhtmlxError.prototype.throwError=function(type, name, params){if (this.catches[type])return this.catches[type](type, name, params);if (this.catches["ALL"])return this.catches["ALL"](type, name, params);alert("Error type: "+arguments[0]+"\nDescription: "+arguments[1]);return null;}
window.dhtmlxError=new _dhtmlxError();dtmlXMLLoaderObject.prototype.doXPathOpera=function(xpathExp, docObj){var z = xpathExp.replace(/[\/]+/gi, "/").split('/');var obj = null;var i = 1;if (!z.length)return [];if (z[0] == ".")obj=[docObj];else if (z[0] == ""){obj=(this.xmlDoc.responseXML||this.xmlDoc).getElementsByTagName(z[i].replace(/\[[^\]]*\]/g, ""));i++;}else
 return [];for (i;i < z.length;i++)obj=this._getAllNamedChilds(obj, z[i]);if (z[i-1].indexOf("[")!= -1)
 obj=this._filterXPath(obj, z[i-1]);return obj;}
dtmlXMLLoaderObject.prototype._filterXPath=function(a, b){var c = new Array();var b = b.replace(/[^\[]*\[\@/g, "").replace(/[\[\]\@]*/g, "");for (var i = 0;i < a.length;i++)if (a[i].getAttribute(b))
 c[c.length]=a[i];return c;}
dtmlXMLLoaderObject.prototype._getAllNamedChilds=function(a, b){var c = new Array();if (_isKHTML)b=b.toUpperCase();for (var i = 0;i < a.length;i++)for (var j = 0;j < a[i].childNodes.length;j++){if (_isKHTML){if (a[i].childNodes[j].tagName&&a[i].childNodes[j].tagName.toUpperCase()== b)
 c[c.length]=a[i].childNodes[j];}
 else if (a[i].childNodes[j].tagName == b)c[c.length]=a[i].childNodes[j];}
 return c;}
function dhtmlXHeir(a, b){for (var c in b)if (typeof (b[c])== "function")
 a[c]=b[c];return a;}
function dhtmlxEvent(el, event, handler){if (el.addEventListener)el.addEventListener(event, handler, false);else if (el.attachEvent)el.attachEvent("on"+event, handler);}
dtmlXMLLoaderObject.prototype.xslDoc=null;dtmlXMLLoaderObject.prototype.setXSLParamValue=function(paramName, paramValue, xslDoc){if (!xslDoc)xslDoc=this.xslDoc

 if (xslDoc.responseXML)xslDoc=xslDoc.responseXML;var item =
 this.doXPath("/xsl:stylesheet/xsl:variable[@name='"+paramName+"']", xslDoc,
 "http:/\/www.w3.org/1999/XSL/Transform", "single");if (item != null)item.firstChild.nodeValue=paramValue
}
dtmlXMLLoaderObject.prototype.doXSLTransToObject=function(xslDoc, xmlDoc){if (!xslDoc)xslDoc=this.xslDoc;if (xslDoc.responseXML)xslDoc=xslDoc.responseXML

 if (!xmlDoc)xmlDoc=this.xmlDoc;if (xmlDoc.responseXML)xmlDoc=xmlDoc.responseXML


 if (!_isIE){if (!this.XSLProcessor){this.XSLProcessor=new XSLTProcessor();this.XSLProcessor.importStylesheet(xslDoc);}
 var result = this.XSLProcessor.transformToDocument(xmlDoc);}else {var result = new ActiveXObject("Msxml2.DOMDocument.3.0");try{xmlDoc.transformNodeToObject(xslDoc, result);}catch(e){result = xmlDoc.transformNode(xslDoc);}
 }
 return result;}
dtmlXMLLoaderObject.prototype.doXSLTransToString=function(xslDoc, xmlDoc){var res = this.doXSLTransToObject(xslDoc, xmlDoc);if(typeof(res)=="string")
 return res;return this.doSerialization(res);}
dtmlXMLLoaderObject.prototype.doSerialization=function(xmlDoc){if (!xmlDoc)xmlDoc=this.xmlDoc;if (xmlDoc.responseXML)xmlDoc=xmlDoc.responseXML
 if (!_isIE){var xmlSerializer = new XMLSerializer();return xmlSerializer.serializeToString(xmlDoc);}else
 return xmlDoc.xml;}
dhtmlxEventable=function(obj){obj.attachEvent=function(name, catcher, callObj){name='ev_'+name.toLowerCase();if (!this[name])this[name]=new this.eventCatcher(callObj||this);return(name+':'+this[name].addEvent(catcher));}
 obj.callEvent=function(name, arg0){name='ev_'+name.toLowerCase();if (this[name])return this[name].apply(this, arg0);return true;}
 obj.checkEvent=function(name){return (!!this['ev_'+name.toLowerCase()])
 }
 obj.eventCatcher=function(obj){var dhx_catch = [];var z = function(){var res = true;for (var i = 0;i < dhx_catch.length;i++){if (dhx_catch[i] != null){var zr = dhx_catch[i].apply(obj, arguments);res=res&&zr;}
 }
 return res;}
 z.addEvent=function(ev){if (typeof (ev)!= "function")
 ev=eval(ev);if (ev)return dhx_catch.push(ev)-1;return false;}
 z.removeEvent=function(id){dhx_catch[id]=null;}
 return z;}
 obj.detachEvent=function(id){if (id != false){var list = id.split(':');this[list[0]].removeEvent(list[1]);}
 }
 obj.detachAllEvents = function(){for (var name in this){if (name.indexOf("ev_")==0)
 delete this[name];}
 }
 obj = null;};if(!window.dhtmlx)window.dhtmlx = {};(function(){var _dhx_msg_cfg = null;function callback(config, result){var usercall = config.callback;modality(false);config.box.parentNode.removeChild(config.box);_dhx_msg_cfg = config.box = null;if (usercall)usercall(result);}
 function modal_key(e){if (_dhx_msg_cfg){e = e||event;var code = e.which||event.keyCode;if (dhtmlx.message.keyboard){if (code == 13 || code == 32)callback(_dhx_msg_cfg, true);if (code == 27)callback(_dhx_msg_cfg, false);}
 if (e.preventDefault)e.preventDefault();return !(e.cancelBubble = true);}
 }
 if (document.attachEvent)document.attachEvent("onkeydown", modal_key);else
 document.addEventListener("keydown", modal_key, true);function modality(mode){if(!modality.cover){modality.cover = document.createElement("DIV");modality.cover.onkeydown = modal_key;modality.cover.className = "dhx_modal_cover";document.body.appendChild(modality.cover);}
 var height = document.body.scrollHeight;modality.cover.style.display = mode?"inline-block":"none";}
 function button(text, result){return "<div class='dhtmlx_popup_button' result='"+result+"' ><div>"+text+"</div></div>";}
 function info(text){if (!t.area){t.area = document.createElement("DIV");t.area.className = "dhtmlx_message_area";t.area.style[t.position]="5px";document.body.appendChild(t.area);}
 t.hide(text.id);var message = document.createElement("DIV");message.innerHTML = "<div>"+text.text+"</div>";message.className = "dhtmlx-info dhtmlx-" + text.type;message.onclick = function(){t.hide(text.id);text = null;};if (t.position == "bottom" && t.area.firstChild)t.area.insertBefore(message,t.area.firstChild);else
 t.area.appendChild(message);if (text.expire > 0)t.timers[text.id]=window.setTimeout(function(){t.hide(text.id);}, text.expire);t.pull[text.id] = message;message = null;return text.id;}
 function _boxStructure(config, ok, cancel){var box = document.createElement("DIV");box.className = " dhtmlx_modal_box dhtmlx-"+config.type;box.setAttribute("dhxbox", 1);var inner = '';if (config.width)box.style.width = config.width;if (config.height)box.style.height = config.height;if (config.title)inner+='<div class="dhtmlx_popup_title">'+config.title+'</div>';inner+='<div class="dhtmlx_popup_text"><span>'+(config.content?'':config.text)+'</span></div><div class="dhtmlx_popup_controls">';if (ok)inner += button(config.ok || "OK", true);if (cancel)inner += button(config.cancel || "Cancel", false);if (config.buttons){for (var i=0;i<config.buttons.length;i++)inner += button(config.buttons[i],i);}
 inner += '</div>';box.innerHTML = inner;if (config.content){var node = config.content;if (typeof node == "string")node = document.getElementById(node);if (node.style.display == 'none')node.style.display = "";box.childNodes[config.title?1:0].appendChild(node);}
 box.onclick = function(e){e = e ||event;var source = e.target || e.srcElement;if (!source.className)source = source.parentNode;if (source.className == "dhtmlx_popup_button"){result = source.getAttribute("result");result = (result == "true")||(result == "false"?false:result);callback(config, result);}
 };config.box = box;if (ok||cancel)_dhx_msg_cfg = config;return box;}
 function _createBox(config, ok, cancel){var box = config.tagName ? config : _boxStructure(config, ok, cancel);if (!config.hidden)modality(true);document.body.appendChild(box);var x = Math.abs(Math.floor(((window.innerWidth||document.documentElement.offsetWidth) - box.offsetWidth)/2));var y = Math.abs(Math.floor(((window.innerHeight||document.documentElement.offsetHeight) - box.offsetHeight)/2));if (config.position == "top")box.style.top = "-3px";else
 box.style.top = y+'px';box.style.left = x+'px';box.onkeydown = modal_key;box.focus();if (config.hidden)dhtmlx.modalbox.hide(box);return box;}
 function alertPopup(config){return _createBox(config, true, false);}
 function confirmPopup(config){return _createBox(config, true, true);}
 function boxPopup(config){return _createBox(config);}
 function box_params(text, type, callback){if (typeof text != "object"){if (typeof type == "function"){callback = type;type = "";}
 text = {text:text, type:type, callback:callback };}
 return text;}
 function params(text, type, expire, id){if (typeof text != "object")text = {text:text, type:type, expire:expire, id:id};text.id = text.id||t.uid();text.expire = text.expire||t.expire;return text;}
 dhtmlx.alert = function(){text = box_params.apply(this, arguments);text.type = text.type || "confirm";return alertPopup(text);};dhtmlx.confirm = function(){text = box_params.apply(this, arguments);text.type = text.type || "alert";return confirmPopup(text);};dhtmlx.modalbox = function(){text = box_params.apply(this, arguments);text.type = text.type || "alert";return boxPopup(text);};dhtmlx.modalbox.hide = function(node){while (node && node.getAttribute && !node.getAttribute("dhxbox"))
 node = node.parentNode;if (node){node.parentNode.removeChild(node);modality(false);}
 };var t = dhtmlx.message = function(text, type, expire, id){text = params.apply(this, arguments);text.type = text.type||"info";var subtype = text.type.split("-")[0];switch (subtype){case "alert":
 return alertPopup(text);case "confirm":
 return confirmPopup(text);case "modalbox":
 return boxPopup(text);default:
 return info(text);break;}
 };t.seed = (new Date()).valueOf();t.uid = function(){return t.seed++;};t.expire = 4000;t.keyboard = true;t.position = "top";t.pull = {};t.timers = {};t.hideAll = function(){for (var key in t.pull)t.hide(key);};t.hide = function(id){var obj = t.pull[id];if (obj && obj.parentNode){window.setTimeout(function(){obj.parentNode.removeChild(obj);obj = null;},2000);obj.className+=" hidden";if(t.timers[id])window.clearTimeout(t.timers[id]);delete t.pull[id];}
 };})();function dhtmlXLayoutPanel(){}
function dhtmlXLayoutObject(base, view, skin) {if (!window.dhtmlXContainer){alert(this.i18n.dhxcontalert);return;}





 var that = this;this._autodetectSkin = function() {var t = document.createElement("DIV");t.className = "dhxlayout_skin_detect";if (document.body.childNodes.length > 0)document.body.insertBefore(t, document.body.childNodes[0]);else document.body.appendChild(t);var w = t.offsetWidth;document.body.removeChild(t);t = null;if (w == 199)return "dhx_skyblue";if (w == 299)return "dhx_blue";if (w == 399)return "dhx_black";if (w == 499)return "dhx_web";if (w == 599)return "dhx_terrace";return "dhx_skyblue";}

 this.skin = (skin != null ? skin : (typeof(dhtmlx) != "undefined" && typeof(dhtmlx.skin) == "string" ? dhtmlx.skin : this._autodetectSkin()));this.setSkin = function(skin) {if (!this.skinParams[skin])return;this.skin = skin;this._CPanelHeight = this.skinParams[this.skin]["cpanel_height"];this._collapsedW = this.skinParams[this.skin]["cpanel_collapsed_width"];this._collapsedH = this.skinParams[this.skin]["cpanel_collapsed_height"];this.tpl.className = "dhtmlxLayoutPolyContainer_"+this.skin+(this._r?" dhxlayout_rtl":"");this.sizer.className = "dhxLayout_Sizer_"+this.skin;if (this.dhxWins)this.dhxWins.setSkin(this.skin);for (var a in this.polyObj)this.polyObj[a].skin = this.skin;this.base.skin = this.skin;this._fixIcons();this.setSizes();}

 this._isIPad = (navigator.userAgent.search(/iPad/gi)>=0);this._dblClickTM = 600;this._mTop = 0;this._mBottom = 0;if (typeof(base)== "string") {base = document.getElementById(base);}


 if ((base._isWindow == true || base._isCell)&& !this.base) {if (base._isCell && base.attachLayout)return base.attachLayout(view, skin);if (base.isWindow)return base.attachLayout(view, skin);this.base = base;}

 if (base == document.body && !this.base){document.body.style.overflow = "hidden";}

 if ((typeof(base)== "object" || base == document.body) && !this.base) {var contObj = document.createElement("DIV");contObj.className = "dhxcont_global_layout_area";base.appendChild(contObj);base._isLayout = true;this.cont = new dhtmlXContainer(base);this.cont.setContent(contObj);if (base == document.body){if (this.skin == "dhx_skyblue"||this.skin == "dhx_blue"){this.cont.obj._offsetTop = 2;this.cont.obj._offsetLeft = 2;this.cont.obj._offsetHeight = -4;this.cont.obj._offsetWidth = -4;}
 if (this.skin == "dhx_web"){this.cont.obj._offsetTop = 9;this.cont.obj._offsetLeft = 9;this.cont.obj._offsetHeight = -18;this.cont.obj._offsetWidth = -18;}
 if (this.skin == "dhx_terrace"){this.cont.obj._offsetTop = 14;this.cont.obj._offsetLeft = 14;this.cont.obj._offsetHeight = -28;this.cont.obj._offsetWidth = -28;}
 document.body.className += " dhxlayout_fullscreened";}

 base.adjustContent(base, this._mTop, null, null, this._mBottom);this.base = document.createElement("DIV");this.base.style.overflow = "hidden";this.base.style.position = "absolute";this.base.style.left = "0px";this.base.style.top = "0px";this.base.style.width = contObj.childNodes[0].style.width;this.base.style.height = contObj.childNodes[0].style.height;contObj.childNodes[0].appendChild(this.base);if (base == document.body){this._tmTime = null;this._lw = null;this._doOnResizeStart = function() {window.clearTimeout(this._tmTime);this._tmTime = window.setTimeout(function(){that._doOnResizeEnd();},200);}
 this._doOnResizeEnd = function() {this.setSizes(false);}

 if (_isIE){window.attachEvent("onresize", that._doOnResizeStart);}else {window.addEventListener("resize", that._doOnResizeStart, false);}

 }

 base._doOnAttachToolbar = function(){that.setSizes();}
 }

 this.items = new Array();this.cells = function(id) {if (this.polyObj[id] != null){return this.polyObj[id];}
 return null;}

 this.getIdByIndex = function(ind) {if (ind < 0)return null;if (ind >= this.items.length)return null;return this.items[ind]._idd;}

 this.getIndexById = function(id) {if (this.cells(id)!= null) return this.cells(id).getIndex();return null;}



 this.imagePath = dhtmlx.image_path||"codebase/imgs/";this.setImagePath = function(path) {this.imagePath = path;}



 this.polyObj = {};this.sepHor = new Array();this.sepVer = new Array();this._layoutView = (view!=null?String(view).toUpperCase():"3E");this._minWidth = 40;this._minHeight = 40;this._CPanelBtnsWidth = 32;this.skinParams = {"dhx_black" : {"hor_sep_height": 5, "ver_sep_width": 5, "cpanel_height": 34, "cpanel_collapsed_width": 18, "cpanel_collapsed_height": 18},
 "dhx_blue" : {"hor_sep_height": 5, "ver_sep_width": 5, "cpanel_height": 34, "cpanel_collapsed_width": 18, "cpanel_collapsed_height": 18},
 "dhx_skyblue" : {"hor_sep_height": 5, "ver_sep_width": 5, "cpanel_height": 26, "cpanel_collapsed_width": 18, "cpanel_collapsed_height": 18},

 "dhx_web" : {"hor_sep_height": 9, "ver_sep_width": 9, "cpanel_height": 27, "cpanel_collapsed_width": 18, "cpanel_collapsed_height": 18, "cell_pading_max": 1, "cell_pading_min": 0},
 "dhx_terrace" : {"hor_sep_height": 14, "ver_sep_width": 14, "cpanel_height": 37, "cpanel_collapsed_width": 18, "cpanel_collapsed_height": 18, "cell_pading_max": 1, "cell_pading_min": 0}

 };this._CPanelHeight = this.skinParams[this.skin]["cpanel_height"];this._collapsedW = this.skinParams[this.skin]["cpanel_collapsed_width"];this._collapsedH = this.skinParams[this.skin]["cpanel_collapsed_height"];this.tpl = document.createElement("TABLE");this.tpl.dir = "ltr";this.tpl.className = "dhtmlxLayoutPolyContainer_"+this.skin;this.tpl.cellSpacing = 0;this.tpl.cellPadding = 0;var bd = document.createElement("TBODY");this.tpl.appendChild(bd);this.tpl.border = 0;this.tplSizes = {};this._effects = {"collapse": false, "resize": false, "highlight": true };this.sizer = document.createElement("DIV");this.sizer.className = "dhxLayout_Sizer_"+this.skin;this.sizer.style.display = "none";document.body.appendChild(this.sizer);this._attachSizer = function(obj) {that.sizer.style.left = getAbsoluteLeft(obj)+"px";that.sizer.style.top = getAbsoluteTop(obj)+"px";that.sizer.style.width = obj.offsetWidth+"px";that.sizer.style.height = obj.offsetHeight+"px";if (that._sizerML != null)that.sizer.style.marginLeft = that._sizerML+"px";if (that._sizerMT != null)that.sizer.style.marginTop = that._sizerMT+"px";that.sizer.style.display = "";that.sizer.className = "dhxLayout_Sizer_"+that.skin;if (obj._dir != null){that.sizer.className += " "+(obj._dir=="hor"?"dhxCursorNResize":"dhxCursorWResize");}
 }


 this.listViews = function() {var views = new Array();for (var a in this.tplData){views[views.length] = a;}
 return views;}
 this._init = function() {this.obj = document.createElement("DIV");this.obj.className = "dhtmlxLayoutObject";this.base.appendChild(this.obj);this.obj.appendChild(this.tpl);this.w = this.obj.offsetWidth;this.h = this.obj.offsetHeight;this._xmlLoader.loadXMLString(this.tplData[this._layoutView]!=null?this.tplData[this._layoutView]:this.tplData["3E"]);this._initWindows();}

 this._autoHor = new Array();this._autoVer = new Array();this._dimension = new Array(320, 200);this._rowsRatio = 100;this._colsRatio = 100;this._xmlParser = function() {var tableDataH = new Array();var tableDataV = new Array();var tableSeps = {};var root = this.getXMLTopNode("layout");for (var q=0;q<root.childNodes.length;q++){if (root.childNodes[q].tagName == "row"){var row = root.childNodes[q];var tr = document.createElement("TR");that.tpl.childNodes[0].appendChild(tr);for (var w=0;w<row.childNodes.length;w++){if (row.childNodes[w].tagName == "cell"){var cell = row.childNodes[w];var td = document.createElement("TD");td._dir = "null";if (cell.getAttribute("obj")!= null) {var obj = cell.getAttribute("obj");var wh = String(cell.getAttribute("wh")).split(",");var f = isNaN(wh[0]);var tdW = (isNaN(wh[0])?parseInt(that.polyObj[wh[0]].style.width):0);for (var q1=0;q1<tableDataH.length;q1++){for (var w1=0;w1<tableDataH[q1].length;w1++){if (tableDataH[q1][w1] == obj){if (!f){f = true;var mw = that.base.offsetWidth - tableSeps[obj][0]*that.skinParams[that.skin]["ver_sep_width"];for (var r=0;r<tableDataH[q1].length;r++){if (!isNaN(tableDataH[q1][r])) {mw -= tableDataH[q1][r];wh[0] -= 1;}}
 tdW = Math.ceil(mw/wh[0]);}
 tableDataH[q1][w1] = tdW;}
 }
 }
 td.style.width = tdW+"px";var f = isNaN(wh[1]);var tdH = (isNaN(wh[1])?parseInt(that.polyObj[wh[1]].style.height):0);for (var q1=0;q1<tableDataV.length;q1++){for (var w1=0;w1<tableDataV[q1].length;w1++){if (tableDataV[q1][w1] == obj){if (!f){f = true;var mh = that.base.offsetHeight - tableSeps[obj][1]*that.skinParams[that.skin]["hor_sep_height"];for (var r=0;r<tableDataV.length;r++){if (!isNaN(tableDataV[r][w1])) {mh -= tableDataV[r][w1];wh[1] -= 1;}}
 tdH = Math.ceil(mh/wh[1]);}
 tableDataV[q1][w1] = tdH;}
 }
 }
 td.style.height = tdH+"px";td.className = "dhtmlxLayoutSinglePoly";td.innerHTML = "";td._minW = (cell.getAttribute("minWidth") != null ? Number(cell.getAttribute("minWidth")):that._minWidth);td._minH = (cell.getAttribute("minHeight") != null ? Number(cell.getAttribute("minHeight")):that._minHeight);td._initCPanel = (cell.getAttribute("cpanel") != null ? (cell.getAttribute("cpanel")=="false"?false:true):true);td._resize = cell.getAttribute("resize");var rd = String(cell.getAttribute("neighbors")).split(";");for (var e=0;e<rd.length;e++){var p = String(rd[e]).split(",");if (p.length > 1){rd[e] = p;}}
 td._rowData = rd;that.polyObj[obj] = td;}
 if (cell.getAttribute("sep")!= null) {var sep = cell.getAttribute("sep");if (sep == "hor"){td.className = "dhtmlxLayoutPolySplitterHor";td._dir = "hor";var top = cell.getAttribute("top").split(";");for (var e=0;e<top.length;e++){var p = String(top[e]).split(",");if (p.length > 1){top[e] = p;}}
 td._top = top;var bottom = cell.getAttribute("bottom").split(";");for (var e=0;e<bottom.length;e++){var p = String(bottom[e]).split(",");if (p.length > 1){bottom[e] = p;}}
 td._bottom = bottom;that.sepHor[that.sepHor.length] = td;}else {td.className = "dhtmlxLayoutPolySplitterVer";td._dir = "ver";var left = cell.getAttribute("left").split(";");for (var e=0;e<left.length;e++){var p = String(left[e]).split(",");if (p.length > 1){left[e] = p;}}
 td._left = left;var right = cell.getAttribute("right").split(";");for (var e=0;e<right.length;e++){var p = String(right[e]).split(",");if (p.length > 1){right[e] = p;}}
 td._right = right;that.sepVer[that.sepVer.length] = td;}
 td._dblClick = cell.getAttribute("dblclick");td._isSep = true;td.innerHTML = '<div style="height:2px;overflow:hidden;">&nbsp;</div>';}
 if (cell.getAttribute("colspan")!= null) {td.colSpan = cell.getAttribute("colspan");}
 if (cell.getAttribute("rowspan")!= null) {td.rowSpan = cell.getAttribute("rowspan");}
 tr.appendChild(td);}
 }
 }

 if (root.childNodes[q].tagName == "autosize"){that._autoHor = (root.childNodes[q].getAttribute("hor")).split(";");that._autoVer = (root.childNodes[q].getAttribute("ver")).split(";");that._totalCols = root.childNodes[q].getAttribute("cols");that._totalRows = root.childNodes[q].getAttribute("rows");that._dimension[0] = that._totalCols * that._colsRatio;that._dimension[1] = that._totalRows * that._rowsRatio;}

 if (root.childNodes[q].tagName == "table"){var data = root.childNodes[q].getAttribute("data");var r = String(data).split(";");for (var q1=0;q1<r.length;q1++){tableDataH[q1] = new Array();tableDataV[q1] = new Array();var c = String(r[q1]).split(",");for (var w1=0;w1<c.length;w1++){tableDataH[q1][w1] = c[w1];tableDataV[q1][w1] = c[w1];if (tableSeps[c[w1]] == null){tableSeps[c[w1]] = new Array(0, 0);}
 }
 }

 for (var a in tableSeps){var f = false;for (var q1=0;q1<tableDataH.length;q1++){for (var w1=0;w1<tableDataH[q1].length;w1++){if (tableDataH[q1][w1] == a && !f){f = true;for (var e1=0;e1<tableDataH[q1].length;e1++){if (tableDataH[q1][e1]!=a)tableSeps[a][0]++;}
 for (var e1=0;e1<tableDataH.length;e1++){if (tableDataH[e1][w1]!=a)tableSeps[a][1]++;}
 }
 }
 }
 }
 }
 }
 tableDataH = null;tableDataV = null;that._buildSurface();this.destructor();}
 this._xmlLoader = new dtmlXMLLoaderObject(this._xmlParser, window);this.listAutoSizes = function() {var hor = this._availAutoSize[this._layoutView+"_hor"];var ver = this._availAutoSize[this._layoutView+"_ver"];var currentHor = (this._autoHor).join(";");var currentVer = (this._autoVer).join(";");return new Array(currentHor, currentVer, hor, ver);}

 this.setAutoSize = function(hor, ver) {if (hor != null){var allow = false;var data = this._availAutoSize[this._layoutView+"_hor"];for (var q=0;q<data.length;q++){allow = allow || (data[q] == hor);}
 if (allow == true){this._autoHor = hor.split(";");}
 }
 if (ver != null){var allow = false;var data = this._availAutoSize[this._layoutView+"_ver"];for (var q=0;q<data.length;q++){allow = allow || (data[q] == ver);}
 if (allow == true){this._autoVer = ver.split(";");}
 }
 }
 this._buildSurface = function() {for (var r=0;r<this.tpl.childNodes[0].childNodes.length;r++){var tr = this.tpl.childNodes[0].childNodes[r];for (var c=0;c<tr.childNodes.length;c++){var td = tr.childNodes[c];var that = this;if (!td._isSep){td._isCell = true;td.skin = this.skin;td.getId = function() {return this._idd;}

 td.getIndex = function() {return this._ind;}

 td.showHeader = function() {that.showPanel(this._idd);}

 td.hideHeader = function() {that.hidePanel(this._idd);}

 td.isHeaderVisible = function() {return that.isPanelVisible(this._idd);}

 td.setText = function(text) {that.setText(this._idd, text);}

 td.getText = function() {return that.getText(this._idd);}

 td.expand = function() {if (!that._isCollapsed(this._idd)) return;that._expand(this._idd, "hide");}

 td.collapse = function() {if (that._isCollapsed(this._idd)) return;that._collapse(this._idd, "hide");}

 td.isCollapsed = function() {return that._isCollapsed(this._idd);}

 td.dock = function() {if (!that._isCollapsed(this._idd)) return;that._expand(this._idd, "dock");that.dockWindow(this._idd);}

 td.undock = function() {if (that._isCollapsed(this._idd)) return;that.unDockWindow(this._idd);that._collapse(this._idd, "dock");}

 td.setWidth = function(width) {if (!Number(width)) return;var k = this._isBlockedWidth||false;this._isBlockedWidth = false;that._setWidth(this._idd, width);this._isBlockedWidth = k;}

 td.getWidth = function() {return parseInt(this.style.width);}

 td.setHeight = function(height) {if (!Number(height)) return;var k = this._isBlockedHeight||false;this._isBlockedHeight = false;that._setHeight(this._idd, height);this._isBlockedHeight = k;}

 td.getHeight = function() {return parseInt(this.style.height);}

 td.fixSize = function(width, height) {that._fixSize(this._idd, width, height);}

 td.progressOn = function() {that._progressControl(this._idd, true);}

 td.progressOff = function() {that._progressControl(this._idd, false);}


 td._doOnAttachMenu = function() {this.adjustContent(this.childNodes[0], (this._noHeader?0:that.skinParams[that.skin]["cpanel_height"]));this.updateNestedObjects();}
 td._doOnAttachToolbar = function() {this.adjustContent(this.childNodes[0], (this._noHeader?0:that.skinParams[that.skin]["cpanel_height"]));this.updateNestedObjects();}
 td._doOnAttachStatusBar = function() {this.adjustContent(this.childNodes[0], (this._noHeader?0:that.skinParams[that.skin]["cpanel_height"]));this.updateNestedObjects();}


 td._doOnFrameContentLoaded = function(){that.callEvent("onContentLoaded", [this._idd]);}

 td._doOnResize = function() {this.adjustContent(this.childNodes[0], (this._noHeader?0:that.skinParams[that.skin]["cpanel_height"]));this.updateNestedObjects();}

 td._redraw = function() {}

 td.showArrow = function() {this.childNodes[0].childNodes[0].childNodes[4].style.display = "";}
 td.hideArrow = function() {this.childNodes[0].childNodes[0].childNodes[4].style.display = "none";}
 td.isArrowVisible = function() {return (this.childNodes[0].childNodes[0].childNodes[4].style.display!="none");}


 }

 if (td._dir == "ver"){td.onselectstart = function(e) {e = e||event;e.returnValue = false;}
 if (_isIE){td["ondblclick"] = function() {that._doOnDoubleClick(this);}
 }
 td[this._isIPad?"ontouchstart":"onmousedown"] = function(e) {e = e||event;if (!_isIE){if (!this._lastClick){this._lastClick = new Date().getTime();}else {var t = this._lastClick;this._lastClick = new Date().getTime();if (t + that._dblClickTM >= this._lastClick){if (that._doOnDoubleClick(this)=== true) return;}
 }
 }
 var p = that._findDockCellsVer(this);that._resAreaData = new Array();if (p[0] != null && p[1] != null){if (String(document.body.className).search("dhxCursorWResize") == -1) {document.body.className += " dhxCursorWResize";}
 that._resObj = this;that._anyExpL = p[0];that._anyExpR = p[1];that._collectResAreaData(p);that._resX = (that._isIPad?e.touches[0].clientX:e.clientX);if (that._effects["resize"] == false){that._attachSizer(this);that.sizer._leftXStart = parseInt(that.sizer.style.left);var objLeft = that.polyObj[that._anyExpL[0]];that._resXMaxWidthLeft = parseInt(objLeft.style.width)-that._minWidth;var objRight = that.polyObj[that._anyExpR[0]];that._resXMaxWidthRight = parseInt(objRight.style.width)-that._minWidth;if (that._alterSizes.length > 0){for (var q=0;q<that._alterSizes.length;q++){for (var w=0;w<that._anyExpL.length;w++){if (that._alterSizes[q][0] == that._anyExpL[w]){var newVal = that._resXMaxWidthLeft = parseInt(objLeft.style.width)-that._alterSizes[q][1];if (newVal < that._resXMaxWidthLeft){that._resXMaxWidthLeft = newVal;}
 }
 }
 for (var w=0;w<that._anyExpR.length;w++){if (that._alterSizes[q][0] == that._anyExpR[w]){newVal = parseInt(objRight.style.width)-that._alterSizes[q][1];if (newVal < that._resXMaxWidthRight){that._resXMaxWidthRight = newVal;}
 }
 }
 }
 }
 that._resXStart = that._resX;}

 that._resFunc = that._resizeVer;that._showCovers();if (that._isIPad)e.preventDefault();}
 }
 td.onmouseup = function() {if (that._effects["resize"] == true){that._resizeStop();that._anyExpL = null;that._anyExpR = null;}
 }
 }
 if (td._dir == "hor"){td.onselectstart = function(e) {e = e||event;e.returnValue = false;}
 td[this._isIPad?"ontouchstart":"onmousedown"] = function(e) {e = e||event;if (!this._lastClick){this._lastClick = new Date().getTime();}else {var t = this._lastClick;this._lastClick = new Date().getTime();if (t + that._dblClickTM >= this._lastClick){if (that._doOnDoubleClick(this)=== true) return;}
 }
 var p = that._findDockCellsHor(this);that._resAreaData = new Array();if (p[0] != null && p[1] != null){if (String(document.body.className).search("dhxCursorNResize") == -1) {document.body.className += " dhxCursorNResize";}

 that._resObj = this;that._anyExpT = p[0];that._anyExpB = p[1];that._collectResAreaData(p);that._resY = (that._isIPad?e.touches[0].clientY:e.clientY);if (that._effects["resize"] == false){that._attachSizer(this);that.sizer._topYStart = parseInt(that.sizer.style.top);var objTop = that.polyObj[that._anyExpT[0]];that._resYMaxHeightTop = parseInt(objTop.style.height)-that._minHeight;var objBottom = that.polyObj[that._anyExpB[0]];that._resYMaxHeightBottom = parseInt(objBottom.style.height)-that._minHeight;if (that._alterSizes.length > 0){for (var q=0;q<that._alterSizes.length;q++){for (var w=0;w<that._anyExpT.length;w++){if (that._alterSizes[q][0] == that._anyExpT[w]){var newVal = parseInt(objTop.style.height)-that._alterSizes[q][2]-(objTop.childNodes[0].style.display!="none"?that.skinParams[that.skin]["cpanel_height"]:0);if (newVal < that._resYMaxHeightTop){that._resYMaxHeightTop = newVal;}
 }
 }
 for (var w=0;w<that._anyExpB.length;w++){if (that._alterSizes[q][0] == that._anyExpB[w]){var newVal = parseInt(objBottom.style.height)-that._alterSizes[q][2]-(objBottom.childNodes[0].style.display!="none"?that.skinParams[that.skin]["cpanel_height"]:0);if (newVal < that._resYMaxHeightBottom){that._resYMaxHeightBottom = newVal;}
 }
 }
 }
 }
 that._resYStart = that._resY;}

 that._resFunc = that._resizeHor;that._showCovers();if (that._isIPad)e.preventDefault();}
 }
 td.onmouseup = function() {if (that._effects["resize"] == true){that._resizeStop();that._anyExpT = null;that._anyExpB = null;}
 }
 }
 }
 }

 for (var a in this.polyObj){this.polyObj[a]._collapsed = false;this.polyObj[a]._idd = a;this.polyObj[a]._ind = this.items.length;this.items[this.items.length] = this.polyObj[a];var nod = document.createElement("DIV");nod.style.position = "relative";nod.style.left = "0px";nod.style.top = "0px";nod.style.width = this.polyObj[a].style.width;nod.style.height = this.polyObj[a].style.height;nod.style.overflow = "hidden";this.polyObj[a].appendChild(nod);var bar = document.createElement("DIV");bar._dockCell = a;bar._resize = this.polyObj[a]._resize;bar.className = "dhtmlxPolyInfoBar";bar.innerHTML = "<div class='dhtmlxInfoBarLabel'>"+a+"</div>"+
 "<div class='dhtmlxInfoBarButtonsFake'><div class='dhtmlxInfoBarButtonsFake2'></div></div>"+
 "<div class='dhtmlxInfoButtonDock' title='"+this.i18n.dock+"'></div>"+
 "<div class='dhtmlxInfoButtonUnDock' style='display: none;' title='"+this.i18n.undock+"'></div>"+
 "<div class='dhtmlxInfoButtonShowHide_"+bar._resize+"' title='"+this.i18n.collapse+"'></div>"+
 "<div class='dhtmlxLineL'></div>"+
 "<div class='dhtmlxLineR'></div>";if (this.polyObj[a]._initCPanel == true){bar._h = this._CPanelHeight;bar.style.display = "";}else {bar._h = 0;bar.style.display = "none";}

 this.polyObj[a].childNodes[0].appendChild(bar);bar.ondblclick = function() {that.callEvent("onDblClick", [this._dockCell]);}
 bar.childNodes[4].onclick = function() {var pId = this.parentNode._dockCell;if (that._isCollapsed(pId)) {that._expand(pId, "hide");}else {that._collapse(pId, "hide");}
 }

 for (var r=0;r<bar.childNodes.length;r++){bar.childNodes[r].onselectstart = function(e) {e = e||event;e.returnValue = false;}
 }

 var contObj = document.createElement("DIV");contObj.className = "dhxcont_global_content_area";this.polyObj[a].childNodes[0].appendChild(contObj);var cont = new dhtmlXContainer(this.polyObj[a]);cont.setContent(contObj);if (this.skin == "dhx_web")this.polyObj[a]._setPadding(this.skinParams[this.skin]["cell_pading_max"], "dhxcont_layout_dhx_web");if (this.skin == "dhx_terrace")this.polyObj[a]._setPadding(this.skinParams[this.skin]["cell_pading_max"], "dhxcont_layout_dhx_terrace");this.polyObj[a].adjustContent(this.polyObj[a].childNodes[0], this.skinParams[this.skin]["cpanel_height"]);}
 this._fixIcons();}

 this._resX = null;this._resY = null;this._resObj = null;this._resFunc = null;this._anyExpL = null;this._anyExpR = null;this._anyExpT = null;this._anyExpB = null;this._expand = function(pId, mode) {this._doExpand(this.polyObj[pId]._resize, pId, this.polyObj[pId]._rowData, mode);}
 this._collapse = function(pId, mode) {if (this._isCollapsed(pId)) return;this.polyObj[pId]._savedW = parseInt(this.polyObj[pId].style.width);this.polyObj[pId]._savedH = parseInt(this.polyObj[pId].style.height);this._doCollapse(this.polyObj[pId]._resize, pId, this.polyObj[pId]._rowData, mode);}
 this._isCollapsed = function(pId) {return this.polyObj[pId]._collapsed;}

 this._checkAlterMinSize = function(data) {this._alterSizes = new Array();for (var q=0;q<data.length;q++){for (var w=0;w<data[q].length;w++){if (this.polyObj[data[q][w]].vs[this.polyObj[data[q][w]].av].layout != null){var dims = this.polyObj[data[q][w]].vs[this.polyObj[data[q][w]].av].layout._defineWindowMinDimension(this.polyObj[data[q][w]], true);dims[0] = data[q][w];this._alterSizes[this._alterSizes.length] = dims;}
 }
 }
 }

 this._findDockCellsVer = function(resObj) {var res = new Array(null, null);if (resObj == null){return res;}

 var anyExpL = null;for (var q=resObj._left.length-1;q>=0;q--){if (anyExpL == null){if (typeof(resObj._left[q])== "object") {var isBlocked = false;for (var w=0;w<resObj._left[q].length;w++){isBlocked = isBlocked || (this.polyObj[resObj._left[q][w]]._isBlockedWidth||false);}
 if (!isBlocked){anyExpL = resObj._left[q];}
 }else if(this.polyObj[resObj._left[q]]._collapsed == false){if (!this.polyObj[resObj._left[q]]._isBlockedWidth){anyExpL = resObj._left[q];}
 }
 }
 }

 var anyExpR = null;for (var q=0;q<resObj._right.length;q++){if (anyExpR == null){if (typeof(resObj._right[q])== "object") {var isBlocked = false;for (var w=0;w<resObj._right[q].length;w++){isBlocked = isBlocked || (this.polyObj[resObj._right[q][w]]._isBlockedWidth||false);}
 if (!isBlocked){anyExpR = resObj._right[q];}
 }else if(this.polyObj[resObj._right[q]]._collapsed == false){if (!this.polyObj[resObj._right[q]]._isBlockedWidth){anyExpR = resObj._right[q];}
 }
 }
 }

 if (anyExpL == null || anyExpR == null){return res;}

 if (typeof(anyExpL)== "string") {anyExpL = new Array(anyExpL);}
 if (typeof(anyExpR)== "string") {anyExpR = new Array(anyExpR);}

 res[0] = anyExpL;res[1] = anyExpR;this._checkAlterMinSize(res);this._minWLAlter = 0;this._minWRAlter = 0;if (this._alterSizes.length > 0 && this._effects["resize"] == true){var objL = new Array();var objR = new Array();for (var q=0;q<anyExpL.length;q++){objL[q] = this.polyObj[anyExpL[q]];}
 for (var q=0;q<anyExpR.length;q++){objR[q] = this.polyObj[anyExpR[q]];}
 for (var q=0;q<objL.length;q++){for (var w=0;w<this._alterSizes.length;w++){if (this._alterSizes[w][0] == objL[q]._idd && this._minWLAlter < this._alterSizes[w][1]){this._minWLAlter = this._alterSizes[w][1];}}}
 for (var q=0;q<objR.length;q++){for (var w=0;w<this._alterSizes.length;w++){if (this._alterSizes[w][0] == objR[q]._idd && this._maxWRAlter < this._alterSizes[w][1]){this._minWRAlter = this._alterSizes[w][1];}}}
 }
 return res;}

 this._findDockCellsHor = function(resObj) {var res = new Array(null, null);if (resObj == null){return res;}

 var anyExpT = null;for (var q=resObj._top.length-1;q>=0;q--){if (anyExpT == null){if (typeof(resObj._top[q])== "object") {var isBlocked = false;for (var w=0;w<resObj._top[q].length;w++){isBlocked = isBlocked || (this.polyObj[resObj._top[q][w]]._isBlockedHeight||false);}
 if (!isBlocked){anyExpT = resObj._top[q];}
 }else if(this.polyObj[resObj._top[q]]._collapsed == false){if (!this.polyObj[resObj._top[q]]._isBlockedHeight){anyExpT = resObj._top[q];}
 }
 }
 }

 var anyExpB = null;for (var q=0;q<resObj._bottom.length;q++){if (anyExpB == null){if (typeof(resObj._bottom[q])== "object") {var isBlocked = false;for (var w=0;w<resObj._bottom[q].length;w++){isBlocked = isBlocked || (this.polyObj[resObj._bottom[q][w]]._isBlockedHeight||false);}
 if (!isBlocked){anyExpB = resObj._bottom[q];}
 }else if(this.polyObj[resObj._bottom[q]]._collapsed == false){if (!this.polyObj[resObj._bottom[q]]._isBlockedHeight){anyExpB = resObj._bottom[q];}
 }
 }
 }

 if (anyExpT == null || anyExpB == null){return res;}

 if (typeof(anyExpT)== "string") {anyExpT = new Array(anyExpT);}
 if (typeof(anyExpB)== "string") {anyExpB = new Array(anyExpB);}

 res[0] = anyExpT;res[1] = anyExpB;this._checkAlterMinSize(res);this._minHTAlter = 0;this._minHBAlter = 0;if (this._alterSizes.length > 0 && this._effects["resize"] == true){var objT = new Array();var objB = new Array();for (var q=0;q<anyExpT.length;q++){objT[q] = this.polyObj[anyExpT[q]];}
 for (var q=0;q<anyExpB.length;q++){objB[q] = this.polyObj[anyExpB[q]];}
 for (var q=0;q<objT.length;q++){for (var w=0;w<this._alterSizes.length;w++){if (this._alterSizes[w][0] == objT[q]._idd && this._minHTAlter < this._alterSizes[w][2]){this._minHTAlter = this._alterSizes[w][2];}}}
 for (var q=0;q<objB.length;q++){for (var w=0;w<this._alterSizes.length;w++){if (this._alterSizes[w][0] == objB[q]._idd && this._minHBAlter < this._alterSizes[w][2]){this._minHBAlter = this._alterSizes[w][2];}}}
 }

 return res;}

 this._resizeVer = function(e) {if (this._isIPad)e.preventDefault();if (this._resObj == null || this._anyExpL == null || this._anyExpR == null)return;var cx = (this._isIPad?e.touches[0].clientX:e.clientX);if (this._effects["resize"] == false){this._resX = cx;var offsetX = cx - this._resXStart;if (-offsetX > this._resXMaxWidthLeft && offsetX < 0){offsetX = -this._resXMaxWidthLeft;this._resX = offsetX+this._resXStart;}
 if (offsetX > this._resXMaxWidthRight && offsetX > 0){offsetX = this._resXMaxWidthRight;this._resX = offsetX+this._resXStart;}
 this.sizer.style.left = this.sizer._leftXStart+offsetX+"px";return;}

 var anyExpL = this._anyExpL;var anyExpR = this._anyExpR;var newX = cx;var offsetX = cx - that._resX;var objL = new Array();var objR = new Array();for (var q=0;q<anyExpL.length;q++){objL[q] = this.polyObj[anyExpL[q]];}
 for (var q=0;q<anyExpR.length;q++){objR[q] = this.polyObj[anyExpR[q]];}

 var wL = parseInt(objL[0].style.width);var wR = parseInt(objR[0].style.width);if (offsetX < 0){var newWL = wL + offsetX;if (newWL > objL[0]._minW && newWL > this._minWLAlter){var newWR = wR + wL - newWL;for (var q=0;q<objL.length;q++)this._setW(objL[q], newWL);for (var q=0;q<objR.length;q++)this._setW(objR[q], newWR);this._resX = newX;}
 }else if (offsetX > 0){var newWR = wR - offsetX;if (newWR > objR[0]._minW && newWR > this._minWRAlter){var newWL = wL + wR - newWR;for (var q=0;q<objL.length;q++)this._setW(objL[q], newWL);for (var q=0;q<objR.length;q++)this._setW(objR[q], newWR);this._resX = newX;}
 }
 }
 this._resizeHor = function(e) {if (this._resObj == null || this._anyExpT == null || this._anyExpB == null)return;var cy = (this._isIPad?e.touches[0].clientY:e.clientY);if (this._effects["resize"] == false){this._resY = cy;var offsetY = cy - this._resYStart;if (-offsetY > this._resYMaxHeightTop && offsetY < 0){offsetY = -this._resYMaxHeightTop;this._resY = offsetY + this._resYStart;}
 if (offsetY > this._resYMaxHeightBottom && offsetY > 0){offsetY = this._resYMaxHeightBottom;this._resY = offsetY + this._resYStart;}
 this.sizer.style.top = this.sizer._topYStart+offsetY+"px";return;}

 var anyExpT = this._anyExpT;var anyExpB = this._anyExpB;var newY = cy;var offsetY = cy - that._resY;var objT = new Array();var objB = new Array();for (var q=0;q<anyExpT.length;q++){objT[q] = this.polyObj[anyExpT[q]];}
 for (var q=0;q<anyExpB.length;q++){objB[q] = this.polyObj[anyExpB[q]];}

 var hT = parseInt(objT[0].style.height);var hB = parseInt(objB[0].style.height);if (offsetY < 0){var newHT = hT + offsetY;if (newHT > objT[0]._minH + this._minHTAlter){var newHB = hB + hT - newHT;for (var q=0;q<objT.length;q++)this._setH(objT[q], newHT);for (var q=0;q<objB.length;q++)this._setH(objB[q], newHB);this._resY = newY;}
 }else if (offsetY > 0){var newHB = hB - offsetY;if (newHB > objB[0]._minH + this._minHBAlter){var newHT = hT + hB - newHB;for (var q=0;q<objT.length;q++)this._setH(objT[q], newHT);for (var q=0;q<objB.length;q++)this._setH(objB[q], newHB);this._resY = newY;}
 }
 }

 this._resizeStop = function() {var p = document.body.className;if (p.search("dhxCursorWResize")!== -1 || p.search("dhxCursorNResize") !== -1) {document.body.className = String(document.body.className).replace(/dhxCursorWResize/g,"").replace(/dhxCursorNResize/g,"");}
 if (this._resObj == null)return;if (this._effects["resize"] == false){this.sizer.style.display = "none";if (this._resObj._dir == "hor"){var objTop = (typeof(this._anyExpT[0])=="object"?this._anyExpT[0][0]:this._anyExpT[0]);var offsetY = this._resY-this._resYStart;var newH = parseInt(this.polyObj[objTop].style.height)+offsetY;this._setHeight(objTop, newH);}else {var objLeft = (typeof(this._anyExpL[0])=="object"?this._anyExpL[0][0]:this._anyExpL[0]);var offsetX = this._resX-this._resXStart;var newW = parseInt(this.polyObj[objLeft].style.width)+offsetX;this._setWidth(objLeft, newW);}

 var objs = {};var parseData = function(data) {if (data != null){for (var q=0;q<data.length;q++){if (typeof(data[q])== "object") parseData(data[q]);objs[data[q]] = true;}
 }
 }
 parseData(this._anyExpT);parseData(this._anyExpB);parseData(this._anyExpL);parseData(this._anyExpR);var ids = new Array();for (var a in objs){ids[ids.length] = a;}


 if (typeof(this._anyExpT)== "object" && this._anyExpT != null) {this.updateNestedObjectsArray(this._anyExpT);this._anyExpT = null;}
 if (typeof(this._anyExpB)== "object" && this._anyExpB != null) {this.updateNestedObjectsArray(this._anyExpB);this._anyExpB = null;}
 if (typeof(this._anyExpL)== "object" && this._anyExpL != null) {this.updateNestedObjectsArray(this._anyExpL);this._anyExpL = null;}
 if (typeof(this._anyExpR)== "object" && this._anyExpR != null) {this.updateNestedObjectsArray(this._anyExpR);this._anyExpR = null;}


 this._resObj = null;this._resFunc = null;this._hideCovers();this._fixToolbars();this._fixCollapsedText();this.callEvent("onPanelResizeFinish", [ids]);return;}

 var poly = new Array();if (this._resObj._left != null){for (var q=0;q<this._resObj._left.length;q++){poly[poly.length] = this._resObj._left[q];}}
 if (this._resObj._right != null){for (var q=0;q<this._resObj._right.length;q++){poly[poly.length] = this._resObj._right[q];}}
 if (this._resObj._top != null){for (var q=0;q<this._resObj._top.length;q++){poly[poly.length] = this._resObj._top[q];}}
 if (this._resObj._bottom != null){for (var q=0;q<this._resObj._bottom.length;q++){poly[poly.length] = this._resObj._bottom[q];}}
 this._resFunc = null;this._resObj = null;this._hideCovers();var cells = new Array();for (var q=0;q<poly.length;q++){if (typeof(poly[q])== "object") {for (var w=0;w<poly[q].length;w++){cells[cells.length] = this.polyObj[poly[q][w]];}
 }else {cells[cells.length] = this.polyObj[poly[q]];}
 }
 for (var q=0;q<cells.length;q++)cells[q].updateNestedObjects();this._fixCollapsedText();this.callEvent("onPanelResizeFinish", []);}
 this._showCovers = function() {for (var a in this.polyObj){if (this._effects["highlight"] && this._isResizable(a)) {this.polyObj[a].showCoverBlocker();}}
 this._fixToolbars();}
 this._hideCovers = function() {for (var a in this.polyObj){this.polyObj[a].hideCoverBlocker();}
 this._fixToolbars();}
 this._isResizable = function(pId) {var need = false;for (var q=0;q<this._resAreaData.length;q++){need = need || (this._resAreaData[q] == pId);}
 return need;}
 this._collectResAreaData = function(obj) {for (var q=0;q<obj.length;q++){if (typeof(obj[q])== "string") {this._resAreaData[this._resAreaData.length] = obj[q];}else if (typeof(obj[q])== "object") {this._collectResAreaData(obj[q]);}
 }
 }
 this._doOnDoubleClick = function(sep) {if (sep._dblClick == null)return;if (this.polyObj[sep._dblClick] == null)return;if (this.polyObj[sep._dblClick]._noHeader)return;var obj = this.polyObj[sep._dblClick];if (obj.childNodes[0].style.display == "none")return;if (obj._collapsed == true){this._doExpand(obj._resize, sep._dblClick, obj._rowData, "hide");}else {obj._savedW = parseInt(obj.style.width);obj._savedH = parseInt(obj.style.height);this._doCollapse(obj._resize, sep._dblClick, obj._rowData, "hide");}
 return true;}

 this._doOnSelectStart = function(e) {e = e||event;if (that._resObj != null)e.returnValue = false;}
 this._doOnMouseMove = function(e) {e = e||event;if (that._resObj != null && that._resFunc != null)that._resFunc(e);}
 this._doOnMouseUp = function() {that._resizeStop();}


 if (this._isIPad){document.addEventListener("touchmove", that._doOnMouseMove, false);document.addEventListener("touchend", that._doOnMouseUp, false);}else {if (_isIE){document.body.attachEvent("onselectstart", that._doOnSelectStart);document.body.attachEvent("onmousemove", that._doOnMouseMove);document.body.attachEvent("onmouseup", that._doOnMouseUp);}else {document.body.addEventListener("mousemove", that._doOnMouseMove, false);document.body.addEventListener("mouseup", that._doOnMouseUp, false);}
 }

 this._doExpand = function(dir, pId, rowData, mode) {if (rowData.length <= 1)return;var ind = -1;for (var q=0;q<rowData.length;q++){if (rowData[q] == pId){ind = q;}}
 if (ind == -1)return;var anyExp = null;for (var q=ind+1;q<rowData.length;q++){if (anyExp == null){if (typeof(rowData[q])== "string") {if (this.polyObj[rowData[q]]._collapsed == false){anyExp = rowData[q];}}else {anyExp = rowData[q];}
 }
 }

 if (anyExp == null){for (var q=ind-1;q>=0;q--){if (anyExp == null){if (typeof(rowData[q])== "string") {if (this.polyObj[rowData[q]]._collapsed == false){anyExp = rowData[q];}}else {anyExp = rowData[q];}
 }
 }
 }
 if (anyExp == null)return;if (typeof(anyExp)!= "object") {anyExp = new Array(anyExp);}
 if (dir == "hor"){var availSpace = 65536;for (var q=0;q<anyExp.length;q++){var newDim = (this.polyObj[anyExp[q]].vs[this.polyObj[anyExp[q]].av].layout!=null?this.polyObj[anyExp[q]].vs[this.polyObj[anyExp[q]].av].layout._defineWindowMinDimension(this.polyObj[anyExp[q]],true):[0,0]);var av2 = parseInt(this.polyObj[anyExp[q]].style.width) - this._minWidth - newDim[1];if (av2 < availSpace)availSpace = av2;}
 var maxSize = this.polyObj[pId]._savedW;if (maxSize > availSpace)maxSize = availSpace;if (maxSize < this._minWidth)return;var step = Math.round(maxSize/3);}else {var availSpace = 65536;for (var q=0;q<anyExp.length;q++){var newDim = (this.polyObj[anyExp[q]].vs[this.polyObj[anyExp[q]].av].layout!=null?this.polyObj[anyExp[q]].vs[this.polyObj[anyExp[q]].av].layout._defineWindowMinDimension(this.polyObj[anyExp[q]],true):[0,0,0]);var av2 = parseInt(this.polyObj[anyExp[q]].style.height) - this._minHeight - newDim[2];if (av2 < availSpace)availSpace = av2;}

 var maxSize = this.polyObj[pId]._savedH;if (maxSize > availSpace)maxSize = availSpace;if (maxSize < this._minHeight)return;var step = Math.round(maxSize/3);}


 this.polyObj[pId].childNodes[0].childNodes[1].style.display = "";this.polyObj[pId].childNodes[0].childNodes[0].className = "dhtmlxPolyInfoBar";this.polyObj[pId].childNodes[0].childNodes[0].childNodes[1].style.display = "";this.polyObj[pId].childNodes[0].childNodes[0].childNodes[2].style.display = "";this.polyObj[pId].childNodes[0].childNodes[0].childNodes[4].style.display = "";var obj2 = new Array();for (var q=0;q<anyExp.length;q++){obj2[q] = this.polyObj[anyExp[q]];}


 if (this.polyObj[pId].className == "dhtmlxLayoutSinglePolyTabbarCollapsed"){this.polyObj[pId].className = "dhtmlxLayoutSinglePolyTabbar";}
 this._expandEffect(this.polyObj[pId], obj2, maxSize, mode, (this._effects["collapse"]==true?step:1000000), dir);}
 this._doCollapse = function(dir, pId, rowData, mode) {if (rowData.length <= 1)return;var ind = -1;for (var q=0;q<rowData.length;q++){if (rowData[q] == pId){ind = q;}}
 if (ind == -1)return;var anyExp = null;for (var q=ind+1;q<rowData.length;q++){if (anyExp == null){if (typeof(rowData[q])== "string") {if (this.polyObj[rowData[q]]._collapsed == false){anyExp = rowData[q];}}else {anyExp = rowData[q];}
 }
 }

 if (anyExp == null){for (var q=ind-1;q>=0;q--){if (anyExp == null){if (typeof(rowData[q])== "string") {if (this.polyObj[rowData[q]]._collapsed == false){anyExp = rowData[q];}}else {anyExp = rowData[q];}
 }
 }
 }
 if (anyExp == null){if (rowData[ind+1] != null){anyExp = rowData[ind+1];}
 }

 if (anyExp == null){if (ind-1 >= 0){if (rowData[ind-1] != null){anyExp = rowData[ind-1];}
 }
 }

 if (anyExp != null){if (typeof(anyExp)!= "object") {if (this.polyObj[anyExp]._collapsed == true){this.polyObj[anyExp].childNodes[0].childNodes[1].style.display = "";this.polyObj[anyExp]._collapsed = false;this.polyObj[anyExp].childNodes[0].childNodes[0].className = "dhtmlxPolyInfoBar";this.polyObj[anyExp].childNodes[0].childNodes[0].childNodes[1].style.display = "";this.polyObj[anyExp].childNodes[0].childNodes[0].childNodes[4].title = this.i18n.collapse;this.polyObj[anyExp].childNodes[0].childNodes[0].childNodes[2].style.display = "";this.polyObj[anyExp].childNodes[0].childNodes[0].childNodes[3].style.display = "none";this.polyObj[anyExp].childNodes[0].childNodes[0].childNodes[4].style.display = "";if (this.polyObj[anyExp]._isUnDocked === true){this.dockWindow(anyExp);}


 if (this.polyObj[anyExp].className == "dhtmlxLayoutSinglePolyTabbarCollapsed"){this.polyObj[anyExp].className = "dhtmlxLayoutSinglePolyTabbar";}

 this._fixSplitters();this._fixIcons();this.polyObj[anyExp].removeAttribute("title");this._fixToolbars();this.callEvent("onExpand", [anyExp]);}

 anyExp = new Array(anyExp);}
 var obj2 = new Array();for (var q=0;q<anyExp.length;q++){obj2[q] = this.polyObj[anyExp[q]];}

 if (dir == "hor"){var step = Math.round(Math.max(this.polyObj[pId].offsetWidth, this.polyObj[anyExp[0]].offsetWidth)/3);}else {var step = Math.round(Math.max(this.polyObj[pId].offsetHeight, this.polyObj[anyExp[0]].offsetHeight)/3);}

 this.polyObj[pId].childNodes[0].childNodes[1].style.display = "none";this._collapseEffect(this.polyObj[pId], obj2, mode, (this._effects["collapse"]==true?step:1000000), dir);}
 }


 this.setEffect = function(efName, efValue) {if (this._effects[efName] != null && typeof(efValue)== "boolean") {this._effects[efName] = efValue;}
 }

 this.getEffect = function(efName) {if (this._effects[efName] != null){return this._effects[efName];}
 return null;}

 this._expandEffect = function(obj, obj2, maxSize, mode, step, dir) {if (dir == "hor"){var s = parseInt(obj.style.width);var s2 = parseInt(obj2[0].style.width);}else {var s = parseInt(obj.style.height);var s2 = parseInt(obj2[0].style.height);}
 var newS = s + step;if (newS > maxSize){newS = maxSize;}

 if (dir == "hor"){obj.style.width = newS+"px";obj.childNodes[0].style.width = obj.style.width;}else {obj.style.height = newS+"px";obj.childNodes[0].style.height = obj.style.height;}
 obj.adjustContent(obj.childNodes[0], (obj._noHeader?0:this.skinParams[this.skin]["cpanel_height"]));for (var q=0;q<obj2.length;q++){if (dir == "hor"){obj2[q].style.width = s2+s-newS+"px";obj2[q].childNodes[0].style.width = obj2[q].style.width;}else {obj2[q].style.height = s2+s-newS+"px";obj2[q].childNodes[0].style.height = obj2[q].style.height;}
 obj2[q].adjustContent(obj2[q].childNodes[0], (obj2[q]._noHeader?0:this.skinParams[this.skin]["cpanel_height"]));}

 if (newS != maxSize){window.setTimeout(function(){that._expandEffect(obj, obj2, maxSize, mode, step, dir);}, 4);}else {obj._collapsed = false;for (var q=0;q<obj2.length;q++){obj2[q].updateNestedObjects();}
 this.polyObj[obj._idd].updateNestedObjects();this.polyObj[obj._idd].childNodes[0].childNodes[0].childNodes[4].title = this.i18n.collapse;this._fixSplitters();this._fixIcons();obj.removeAttribute("title");this._fixToolbars();this.callEvent("onExpand", [obj._idd]);}
 }
 this._collapseEffect = function(obj, obj2, mode, step, dir) {if (dir == "hor"){var s = parseInt(obj.style.width);var s2 = parseInt(obj2[0].style.width);}else {var s = parseInt(obj.style.height);var s2 = parseInt(obj2[0].style.height);}
 var newS = s - step;if (dir == "hor"){if (newS < this._collapsedW){newS = this._collapsedW;}
 obj.style.width = newS+"px";obj.childNodes[0].style.width = obj.style.width;}else {if (newS < this._collapsedH){newS = this._collapsedH;}
 obj.style.height = newS+"px";obj.childNodes[0].style.height = obj.style.height;}



 for (var q=0;q<obj2.length;q++){if (dir == "hor"){obj2[q].style.width = s2+(s-newS)+"px";obj2[q].childNodes[0].style.width = obj2[q].style.width;}else {obj2[q].style.height = s2+(s-newS)+"px";obj2[q].childNodes[0].style.height = obj2[q].style.height;}
 obj2[q].adjustContent(obj2[q].childNodes[0], (obj2[q]._noHeader?0:this.skinParams[this.skin]["cpanel_height"]));}


 if ((newS > this._collapsedW && dir == "hor")|| (newS > this._collapsedH && dir == "ver")) {window.setTimeout(function(){that._collapseEffect(obj, obj2, mode, step, dir);}, 4);}else {for (var q=0;q<obj2.length;q++){if (dir == "hor"){obj2[q].style.width = s2+(s-newS)+"px";obj2[q].childNodes[0].style.width = obj2[q].style.width;}else {obj2[q].style.height = s2+(s-newS)+"px";obj2[q].childNodes[0].style.height = obj2[q].style.height;}
 obj2[q].adjustContent(obj2[q].childNodes[0], (obj2[q]._noHeader?0:this.skinParams[this.skin]["cpanel_height"]));}

 obj._collapsed = true;if (dir == "hor"){obj.childNodes[0].childNodes[0].className = "dhtmlxPolyInfoBarCollapsedVer";}else {obj.childNodes[0].childNodes[0].className = "dhtmlxPolyInfoBarCollapsedHor";}

 for (var q=0;q<obj2.length;q++){obj2[q].updateNestedObjects();}

 if (mode == "hide"){obj.childNodes[0].childNodes[0].childNodes[1].style.display = "";obj.childNodes[0].childNodes[0].childNodes[2].style.display = "none";obj.childNodes[0].childNodes[0].childNodes[3].style.display = "none";obj.childNodes[0].childNodes[0].childNodes[4].style.display = "";}else {obj.childNodes[0].childNodes[0].childNodes[1].style.display = "";obj.childNodes[0].childNodes[0].childNodes[2].style.display = "";obj.childNodes[0].childNodes[0].childNodes[3].style.display = "none";obj.childNodes[0].childNodes[0].childNodes[4].style.display = "none";}

 if (obj.className == "dhtmlxLayoutSinglePolyTabbar"){obj.className = "dhtmlxLayoutSinglePolyTabbarCollapsed";}
 this.polyObj[obj._idd].childNodes[0].childNodes[0].childNodes[4].title = this.i18n.expand;this._fixSplitters();this._fixIcons();obj.title = this.getTextTooltip(obj._idd);this._fixToolbars();this._fixCollapsedText();this.callEvent("onCollapse", [obj._idd]);}
 }

 this._setW = function(cellObj, w) {cellObj.style.width = w + "px";cellObj.childNodes[0].style.width = cellObj.style.width;cellObj.adjustContent(cellObj.childNodes[0], (cellObj._noHeader?0:this.skinParams[this.skin]["cpanel_height"]));}
 this._setH = function(cellObj, h) {cellObj.style.height = h + "px";cellObj.childNodes[0].style.height = cellObj.style.height;cellObj.adjustContent(cellObj.childNodes[0], (cellObj._noHeader?0:this.skinParams[this.skin]["cpanel_height"]));}
 this._setWidth = function(pId, width) {if (this.polyObj[pId] == null)return;if (!Number(width)) return;var sep = null;for (var q=0;q<this.sepVer.length;q++){var p = this.sepVer[q]._left;if (p[p.length-1] == pId){sep = new Array(this.sepVer[q], "left");}else if (typeof(p[p.length-1])== "object") {var k = p[p.length-1];for (var e=0;e<k.length;e++){if (k[e] == pId){sep = new Array(this.sepVer[q], "left");}}
 }

 var p = this.sepVer[q]._right;if (p[0] == pId){sep = new Array(this.sepVer[q], "right");}else if (typeof(p[0])== "object") {var k = p[0];for (var e=0;e<k.length;e++){if (k[e] == pId){sep = new Array(this.sepVer[q], "right");}}
 }
 }
 if (sep != null){var set = this._findDockCellsVer(sep[0]);var anyExpL = set[0];var anyExpR = set[1];if (anyExpL == null || anyExpR == null)return;var sumSize = parseInt(this.polyObj[anyExpL[0]].style.width) + parseInt(this.polyObj[anyExpR[0]].style.width);if (width < this._minWidth){width = this._minWidth;}else if (width > sumSize - this._minWidth){width = sumSize - this._minWidth;}
 var width2 = sumSize - width;for (var q=0;q<anyExpL.length;q++){this._setW(this.polyObj[anyExpL[q]],(sep[1]=="left"?width:width2));this.polyObj[anyExpL[q]].updateNestedObjects();}
 for (var q=0;q<anyExpR.length;q++){this._setW(this.polyObj[anyExpR[q]],(sep[1]=="right"?width:width2));this.polyObj[anyExpR[q]].updateNestedObjects();}
 }
 }
 this._setHeight = function(pId, height) {if (this.polyObj[pId] == null)return;if (!Number(height)) return;var sep = null;for (var q=0;q<this.sepHor.length;q++){var p = this.sepHor[q]._top;if (p[p.length-1] == pId){sep = new Array(this.sepHor[q], "top");}else if (typeof(p[p.length-1])== "object") {var k = p[p.length-1];for (var e=0;e<k.length;e++){if (k[e] == pId){sep = new Array(this.sepHor[q], "top");}}
 }

 var p = this.sepHor[q]._bottom;if (p[0] == pId){sep = new Array(this.sepHor[q], "bottom");}else if (typeof(p[0])== "object") {var k = p[0];for (var e=0;e<k.length;e++){if (k[e] == pId){sep = new Array(this.sepHor[q], "bottom");}}
 }
 }
 if (sep != null){var set = this._findDockCellsHor(sep[0]);var anyExpT = set[0];var anyExpB = set[1];if (anyExpT == null || anyExpB == null)return;var sumSize = parseInt(this.polyObj[anyExpT[0]].style.height) + parseInt(this.polyObj[anyExpB[0]].style.height);if (height < this._minHeight){height = this._minHeight;}else if (height > sumSize - this._minHeight){height = sumSize - this._minHeight;}
 var height2 = sumSize - height;for (var q=0;q<anyExpT.length;q++){this._setH(this.polyObj[anyExpT[q]],(sep[1]=="top"?height:height2));this.polyObj[anyExpT[q]].updateNestedObjects();}
 for (var q=0;q<anyExpB.length;q++){this._setH(this.polyObj[anyExpB[q]],(sep[1]=="bottom"?height:height2));this.polyObj[anyExpB[q]].updateNestedObjects();}
 }
 }
 this.updateNestedObjectsArray = function(obj) {for (var q=0;q<obj.length;q++){if (typeof(obj[q])=="object") {this.updateNestedObjectsArray(obj[q]);}else {this.polyObj[obj[q]].updateNestedObjects();}
 }
 }
 this.dockWindow = function(id) {if (!this.dhxWins)return;if (!this.dhxWins.window(this.dhxWinsIdPrefix+id)) return;this.dhxWins.window(this.dhxWinsIdPrefix+id).close();this.dhxWins.window(this.dhxWinsIdPrefix+id).moveContentTo(this.polyObj[id]);this.polyObj[id]._isUnDocked = false;this.callEvent("onDock", [id]);}
 this.unDockWindow = function(id) {this._initWindows(id);this.polyObj[id].moveContentTo(this.dhxWins.window(this.dhxWinsIdPrefix+id));this.polyObj[id]._isUnDocked = true;this.callEvent("onUnDock", [id]);}

 this._initWindows = function(id) {if (!window.dhtmlXWindows)return;if (!this.dhxWins){this.dhxWins = new dhtmlXWindows();this.dhxWins.setSkin(this.skin);this.dhxWins.setImagePath(this.imagePath);this.dhxWinsIdPrefix = "";if (!id)return;}
 var idd = this.dhxWinsIdPrefix+id;if (!this.dhxWins.window(idd)) {var self = this;var w1 = this.dhxWins.createWindow(idd, 20, 20, 320, 200);w1.setText(this.polyObj[id].getText());w1.button("close").hide();w1.attachEvent("onClose", function(win){win.hide();});w1.button("dock").show();w1.button("dock").attachEvent("onClick", function(win){self.polyObj[id].dock();});w1.dockedCell = this.polyObj[id];}else {this.dhxWins.window(idd).show();}
 }

 this.isPanelVisible = function(pId) {return (!this.polyObj[pId]._noHeader);}
 this.showPanel = function(pId) {if (this.polyObj[pId] == null)return;if (this.polyObj[pId]._collapsed == true)return;var bar = this.polyObj[pId].childNodes[0].childNodes[0];bar.style.display = "";this.polyObj[pId]._noHeader = false;if (this.skin == "dhx_web")this.polyObj[pId]._setPadding(this.skinParams[this.skin]["cell_pading_max"], "dhxcont_layout_dhx_web");if (this.skin == "dhx_terrace")this.polyObj[pId]._setPadding(this.skinParams[this.skin]["cell_pading_max"], "dhxcont_layout_dhx_terrace");this.polyObj[pId].adjustContent(this.polyObj[pId].childNodes[0], this.skinParams[this.skin]["cpanel_height"]);this.polyObj[pId].updateNestedObjects();}
 this.hidePanel = function(pId) {if (this.polyObj[pId] == null)return;if (this.polyObj[pId]._collapsed == true)return;var bar = this.polyObj[pId].childNodes[0].childNodes[0];bar.style.display = "none";this.polyObj[pId]._noHeader = true;if (this.skin == "dhx_web")this.polyObj[pId]._setPadding(this.skinParams[this.skin]["cell_pading_min"], "");if (this.skin == "dhx_terrace"){this.polyObj[pId]._setPadding(this.skinParams[this.skin]["cell_pading_min"], "");}
 this.polyObj[pId].adjustContent(this.polyObj[pId].childNodes[0], 0);this.polyObj[pId].updateNestedObjects();}
 this.setText = function(pId, text) {this._changeCPanelText(pId, text);}
 this.getText = function(pId) {return this.polyObj[pId].childNodes[0].childNodes[0].childNodes[0].innerHTML;}
 this.getTextTooltip = function(pId) {var t = this.polyObj[pId].childNodes[0].childNodes[0].childNodes[0];return (t.innerText||t.textContent);}
 this._changeCPanelText = function(pId, text) {var layout = that;if (layout.polyObj[pId] == null)return;layout.polyObj[pId].childNodes[0].childNodes[0].childNodes[0].innerHTML = text;if (that.dhxWins != null){if (that.dhxWins.window(that.dhxWinsIdPrefix+pId)!= null) {that.dhxWins.window(that.dhxWinsIdPrefix+pId).setText(text);}
 }
 }

 this.forEachItem = function(handler) {for (var q=0;q<this.items.length;q++){handler(this.items[q]);}
 }
 this._fixPositionInWin = function(w, h) {this.base.style.width = w+"px";this.base.style.height = h+"px";}

 this.attachMenu = function() {if (this.base._isWindow){this.menu = this.base._window.attachMenu();}else {this.cont.obj.skin = this.skin;this.menu = this.cont.obj.attachMenu();this.cont.obj.adjustContent(this.cont.obj, 0);this.setSizes();}
 return this.menu;}

 this.detachMenu = function() {if (!this.menu)return;this.cont.obj.detachMenu();this.setSizes();this.menu = null;}

 this.showMenu = function() {if (!this.menu)return;this.cont.obj.showMenu();this.setSizes();}

 this.hideMenu = function() {if (!this.menu)return;this.cont.obj.hideMenu();this.setSizes();}

 this.attachToolbar = function() {if (this.base._isWindow){this.toolbar = this.base._window.attachToolbar();}else {this.cont.obj.skin = this.skin;this.toolbar = this.cont.obj.attachToolbar();this.cont.obj.adjustContent(this.cont.obj, 0);this.setSizes();}
 return this.toolbar;}

 this.detachToolbar = function() {if (!this.toolbar)return;this.cont.obj.detachToolbar();this.setSizes();this.toolbar = null;}

 this.showToolbar = function() {if (!this.toolbar)return;this.cont.obj.showToolbar();this.setSizes();}

 this.hideToolbar = function() {if (!this.toolbar)return;this.cont.obj.hideToolbar();this.setSizes();}

 this.attachStatusBar = function() {if (this.base._isWindow){this.statusbar = this.base._window.attachStatusBar();}else {this.statusbar = this.cont.obj.attachStatusBar();this.cont.obj.adjustContent(this.cont.obj, 0);this.setSizes();}
 return this.statusbar;}

 this.detachStatusBar = function() {if (!this.statusbar)return;this.cont.obj.detachStatusBar();this.setSizes();this.statusbar = null;}

 this.showStatusBar = function() {if (!this.statusbar)return;this.cont.obj.showStatusBar();this.setSizes();}

 this.hideStatusBar = function() {if (!this.statusbar)return;this.cont.obj.hideStatusBar();this.setSizes();}

 this.progressOn = function() {this._progressControlGlobal(true);}

 this.progressOff = function() {this._progressControlGlobal(false);}
 this._progressControl = function(id, state) {if (this.polyObj[id] == null)return;if (this.polyObj[id]._progressCover == null){var p1 = document.createElement("DIV");p1.className = "dhtmlxLayoutPolyProgress";this.polyObj[id].childNodes[0].appendChild(p1);var p2 = document.createElement("DIV");p2.className = "dhtmlxLayoutPolyProgressBGIMG";this.polyObj[id].childNodes[0].appendChild(p2);this.polyObj[id]._progressCover = new Array(p1,p2);}

 this.polyObj[id]._progressCover[0].style.display = (state==true?"":"none");this.polyObj[id]._progressCover[1].style.display = this.polyObj[id]._progressCover[0].style.display;}
 this._progressControlGlobal = function(state) {if (this._progressCover == null){var p1 = document.createElement("DIV");p1.className = "dhtmlxLayoutPolyProgressGlobal_"+this.skin;this.obj.appendChild(p1);var p2 = document.createElement("DIV");p2.className = "dhtmlxLayoutPolyProgressBGIMGGlobal_"+this.skin;this.obj.appendChild(p2);this._progressCover = new Array(p1,p2);}
 this._progressCover[0].style.display = (state==true?"":"none");this._progressCover[1].style.display = this._progressCover[0].style.display;}

 this._fixSize = function(pId, width, height) {if (this.polyObj[pId] == null)return;this.polyObj[pId]._isBlockedWidth = width;this.polyObj[pId]._isBlockedHeight = height;this._fixSplitters();}
 this._fixSplitters = function() {for (var q=0;q<this.sepVer.length;q++){var data = this._findDockCellsVer(this.sepVer[q]);if (data[0] == null || data[1] == null){if (this.sepVer[q].className != "dhtmlxLayoutPolySplitterVerInactive"){this.sepVer[q].className = "dhtmlxLayoutPolySplitterVerInactive";}
 }else {if (this.sepVer[q].className != "dhtmlxLayoutPolySplitterVer"){this.sepVer[q].className = "dhtmlxLayoutPolySplitterVer";}
 }
 }

 for (var q=0;q<this.sepHor.length;q++){var data = this._findDockCellsHor(this.sepHor[q]);if (data[0] == null || data[1] == null){if (this.sepHor[q].className != "dhtmlxLayoutPolySplitterHorInactive"){this.sepHor[q].className = "dhtmlxLayoutPolySplitterHorInactive";}
 }else {if (this.sepHor[q].className != "dhtmlxLayoutPolySplitterHor"){this.sepHor[q].className = "dhtmlxLayoutPolySplitterHor";}
 }
 }
 }
 this._fixIcons = function() {for (var a in this.polyObj){var data = this.polyObj[a]._rowData;var cps = this.polyObj[a]._collapsed;var idx = -1;for (var q=0;q<data.length;q++){if (typeof(data[q])== "object") {}else {if (data[q] == a){idx = q;}
 }
 }

 var newIcon = null;if (idx != -1){for (var q=idx+1;q<data.length;q++){if (typeof(data[q])== "object") {newIcon = (this.polyObj[a]._resize=="ver"?(cps?"b":"t"):(cps?"r":"l"));}else if (this.polyObj[data[q]]._collapsed == false){newIcon = (this.polyObj[a]._resize=="ver"?(cps?"b":"t"):(cps?"r":"l"));}
 }
 if (newIcon == null && idx >= 1){for (var q=idx-1;q>=0;q--){if (typeof(data[q])== "object") {newIcon = (this.polyObj[a]._resize=="ver"?(cps?"t":"b"):(cps?"l":"r"));}else if (this.polyObj[data[q]]._collapsed == false){newIcon = (this.polyObj[a]._resize=="ver"?(cps?"t":"b"):(cps?"l":"r"));}
 }
 }
 }

 if (newIcon != null){var dir = this.polyObj[a]._resize;this.polyObj[a].childNodes[0].childNodes[0].childNodes[4].className = "dhtmlxInfoButtonShowHide_"+dir+" dhxLayoutButton_"+this.skin+"_"+dir+(this.polyObj[a]._collapsed?"2":"1")+newIcon;}
 }
 }


 this._defineWindowMinDimension = function(win, inLayout) {if (inLayout == true){var dim = new Array();dim[0] = parseInt(win.style.width);dim[1] = parseInt(win.style.height);}else {var dim = win.getDimension();if (dim[0] == "100%"){dim[0] = win.offsetWidth;}
 if (dim[1] == "100%"){dim[1] = win.offsetHeight;}
 }

 var hor = that._getNearestParents("hor");var ver = that._getNearestParents("ver");if (!inLayout){var resH = new Array();var resV = new Array();for (var a in hor){resH[resH.length] = a;}
 for (var a in ver){resV[resV.length] = a;}
 that._checkAlterMinSize(new Array(resH, resV));var hor2 = {};var ver2 = {};for (var q=0;q<that._alterSizes.length;q++){var a = that._alterSizes[q][0];var w = that._alterSizes[q][1];var h = that._alterSizes[q][2];if (hor2[a] == null){hor2[a] = w;}else {if (w > hor2[a]){hor2[a] = w;}}
 if (ver2[a] == null){ver2[a] = h;}else {if (h > ver2[a]){ver2[a] = h;}}
 }
 for (var a in hor){if (hor2[a] != null){hor[a] = hor[a]-hor2[a]+that._minWidth;}}
 for (var a in ver){if (ver2[a] != null){ver[a] = ver[a]-ver2[a]+that._minHeight-(that.polyObj[a].childNodes[0].style.display!="none"?that.skinParams[that.skin]["cpanel_height"]:0);}}
 }


 var minWidth = 65536;for (var a in hor){if (hor[a] < minWidth){minWidth = hor[a];}}
 minWidth = minWidth - that._minWidth;minWidth = dim[0] - minWidth;if (minWidth < that._dimension[0] && !inLayout){minWidth = that._dimension[0];}

 var minHeight = 65536;for (var a in ver){if (ver[a] < minHeight){minHeight = ver[a];}}
 minHeight = minHeight - that._minHeight;minHeight = dim[1] - minHeight;if (minHeight < that._dimension[1] && !inLayout){minHeight = that._dimension[1];}

 if (inLayout == true)return ["",minWidth,minHeight];win.setMinDimension(minWidth, minHeight);}
 this._getNearestParents = function(resize) {var data = (resize=="hor"?this._autoHor:this._autoVer);var pool = {};for (var q=0;q<data.length;q++){var id = data[q];if (this.polyObj[id]._collapsed == true && this.polyObj[id]._resize == resize){var rowData = this.polyObj[id]._rowData;var e = -1;for (var w=0;w<rowData.length;w++){if (typeof(rowData[w])== "object") {e = w;}else {if (rowData[w] == id)e = w;}}
 var r = e;id = null;if (e > 0){for (var w=e-1;w>=0;w--){if (typeof(rowData[w])== "object") {id = rowData[w];}else {if (this.polyObj[rowData[w]]._collapsed == false && id == null){id = rowData[w];}}}}
 if (id == null){for (var w=r;w<rowData.length;w++){if (typeof(rowData[w])== "object") {id = rowData[w];}else {if (this.polyObj[rowData[w]]._collapsed == false && id == null){id = rowData[w];}}}}
 }
 if (id != null){if (typeof(id)== "string") {id = new Array(id);}
 for (var w=0;w<id.length;w++){pool[id[w]] = parseInt(resize=="hor"?this.polyObj[id[w]].style.width:this.polyObj[id[w]].style.height);}
 }
 }
 return pool;}


 this.setSizes = function(skipAdjust) {var dim = this._defineWindowMinDimension(this.base, true);this.cont.obj.setMinContentSize(dim[1], dim[2]);this.cont.obj.adjustContent(this.cont.obj, 0);if (!this.base.offsetParent)return;if (this.cont && skipAdjust !== false)this.cont.obj.adjustContent(this.cont.obj, this._mTop, null, null, this._mBottom);var xw = this.base.offsetParent.offsetWidth-this.base.offsetWidth+(this._baseWFix!=null?this._baseWFix:0);var xh = this.base.offsetParent.offsetHeight-this.base.offsetHeight+(this._baseHFix!=null?this._baseHFix:0);this.base.style.width = parseInt(this.base.style.width)+xw+"px";this.base.style.height = parseInt(this.base.style.height)+xh+"px";var both = {};for (var a in this._getNearestParents("hor")) {this.polyObj[a].style.width = Math.max(0,parseInt(this.polyObj[a].style.width)+xw)+"px";this.polyObj[a].childNodes[0].style.width = this.polyObj[a].style.width;both[a] = 1;}
 for (var a in this._getNearestParents("ver")) {this.polyObj[a].style.height = Math.max(0,parseInt(this.polyObj[a].style.height)+xh)+"px";this.polyObj[a].childNodes[0].style.height = this.polyObj[a].style.height;both[a] = 1;}
 for (var a in both){this.polyObj[a].adjustContent(this.polyObj[a].childNodes[0], (this.polyObj[a]._noHeader?0:this.skinParams[this.skin]["cpanel_height"]));this.polyObj[a].updateNestedObjects();}
 this.callEvent("onResizeFinish", []);return;}

 dhtmlxEventable(this);this._init();}
dhtmlXLayoutObject.prototype.unload = function(removeParent) {if (this._isIPad){document.removeEventListener("touchmove", this._doOnMouseMove, false);document.removeEventListener("touchend", this._doOnMouseUp, false);}else {if (_isIE){document.body.detachEvent("onselectstart", this._doOnSelectStart);document.body.detachEvent("onmousemove", this._doOnMouseMove);document.body.detachEvent("onmouseup", this._doOnMouseUp);}else {document.body.removeEventListener("mousemove", this._doOnMouseMove, false);document.body.removeEventListener("mouseup", this._doOnMouseUp, false);}
 }
 this._doOnSelectStart = null;this._doOnMouseMove = null;this._doOnMouseUp = null;for (var a in this.polyObj){var p = this.polyObj[a];p._isCell = null;p.skin = null;p.getId = null;p.getIndex = null;p.showHeader = null;p.hideHeader = null;p.isHeaderVisible = null;p.setText = null;p.getText = null;p.expand = null;p.collapse = null;p.isCollapsed = null;p.dock = null;p.undock = null;p.setWidth = null;p.getWidth = null;p.setHeight = null;p.getHeight = null;p.fixSize = null;p.progressOn = null;p.progressOff = null;p._doOnAttachMenu = null;p._doOnAttachToolbar = null;p._doOnAttachStatusBar = null;p._collapsed = null;p._idd = null;p._ind = null;p._rowData = null;p._dir = null;p._initCPanel = null;p._minW = null;p._minH = null;p._resize = null;p._savedH = null;p._savedW = null;p.ondblclick = null;var bar = p.childNodes[0].childNodes[0];bar.className = "";bar._dockCell = null;bar._resize = null;bar._h = null;bar.ondblclick = null;bar.childNodes[4].onclick = null;for (var r=0;r<bar.childNodes.length;r++)bar.childNodes[r].onselectstart = null;while (bar.childNodes.length > 0)bar.removeChild(bar.childNodes[0]);bar.parentNode.removeChild(bar);bar = null;p._dhxContDestruct();p._dhxContDestruct = null;p.removeChild(p.childNodes[0]);p.parentNode.removeChild(p);p = null;}
 for (var a in this.polyObj)this.polyObj[a] = null;for (var q=0;q<this.items.length;q++)this.items[q] = null;this.polyObj = null;this.items = null;var t = this.tpl.childNodes[0];while (t.childNodes.length > 0){while (t.childNodes[0].childNodes.length > 0){var r = t.childNodes[0].childNodes[0];r._top = null;r._bottom = null;r._left = null;r._right = null;r._dblClick = null;r._isSep = null;r._dir = null;r._lastClick = null;r.ondblclick = null;r.onmousedown = null;r.onmouseup = null;r.onselectstart = null;while (r.childNodes.length > 0)r.removeChild(r.childNodes[0]);r.parentNode.removeChild(r);r = null;}
 t.removeChild(t.childNodes[0]);}
 t.parentNode.removeChild(t);t = null;this.tpl.parentNode.removeChild(this.tpl);this.tpl = null;for (var a in this.sepHor)this.sepHor[a] = null;for (var a in this.sepVer)this.sepVer[a] = null;this.sepHor = null;this.sepVer = null;if (this._ha){this.detachEvent(this._haEv);this._haEv = null;while (this._ha.childNodes.length > 0)this._ha.removeChild(this._ha.childNodes[0]);this._ha.parentNode.removeChild(this._ha);this._ha = null;}
 if (this._fa){this.detachEvent(this._faEv);this._faEv = null;while (this._fa.childNodes.length > 0)this._fa.removeChild(this._fa.childNodes[0]);this._fa.parentNode.removeChild(this._fa);this._fa = null;}

 this.attachHeader = null;this.attachFooter = null;this._autoHor = null;this._autoVer = null;this._availAutoSize = null;this._dimension = null;this._effects = null;this._layoutView = null;this._mBottom = null;this._mTop = null;this._minWidth = null;this._minHeight = null;this._resFunc = null;this._resObj = null;this._resX = null;this._resY = null;this._colsRatio = null;this._rowsRatio = null;this._totalCols = null;this._totalRows = null;this._xmlLoader = null;this.w = null;this.h = null;this.imagePath = null;this.skin = null;this.skinParams = null;this.tplData = null;this.tplSizes = null;this._CPanelBtnsWidth = null;this._CPanelHeight = null;if (this.sizer.parentNode)this.sizer.parentNode.removeChild(this.sizer);this.sizer = null;this._alterSizes = null;this._attachSizer = null;this._buildSurface = null;this._changeCPanelText = null;this._checkAlterMinSize = null;this._collapse = null;this._collapseEffect = null;this._collectResAreaData = null;this._defineWindowMinDimension = null;this._doCollapse = null;this._doExpand = null;this._expand = null;this._expandEffect = null;this._findDockCellsHor = null;this._findDockCellsVer = null;this._fixIcons = null;this._fixPositionInWin = null;this._fixSize = null;this._fixSplitters = null;this._getNearestParents = null;this._hideCovers = null;this._init = null;this._initWindows = null;this._isCollapsed = null;this._isResizable = null;this._progressControl = null;this._progressControlGlobal = null;this._resizeHor = null;this._resizeStop = null;this._resizeVer = null;this._resAreaData = null;this._setH = null;this._setHeight = null;this._setW = null;this._setWidth = null;this._showCovers = null;this._xmlParser = null;this.attachEvent = null;this.attachMenu = null;this.attachStatusBar = null;this.attachToolbar = null;this.callEvent = null;this.cells = null;this.checkEvent = null;this.detachEvent = null;this.dockWindow = null;this.eventCatcher = null;this.forEachItem = null;this.getEffect = null;this.getIdByIndex = null;this.getIndexById = null;this.getText = null;this.getTextTooltip = null;this.hidePanel = null;this.isPanelVisible = null;this.listAutoSizes = null;this.listViews = null;this.progressOff = null;this.progressOn = null;this.setAutoSize = null;this.setEffect = null;this.setImagePath = null;this.setSizes = null;this.setSkin = null;this.setText = null;this.showPanel = null;this.unDockWindow = null;this.unload = null;this.updateNestedObjectsArray = null;this.setCollapsedText = null;this.attachMenu = null;this.attachToolbar = null;this.attachStatusBar = null;this.detachMenu = null;this.detachToolbar = null;this.detachStatusBar = null;this.showMenu = null;this.showToolbar = null;this.showStatusBar = null;this.hideMenu = null;this.hideToolbar = null;this.hideStatusBar = null;this._cells = null;this._autosize = null;this._effect = null;this._isIPad = null;this.i18n = null;this.dhx_SeverCatcherPath = null;this._autodetectSkin = null;this._doOnDoubleClick = null;this._dblClickTM = null;this._collapsedH = null;this._collapsedW = null;this._minWLAlter = null;this._minWRAlter = null;this._minHBAlter = null;this._minHTAlter = null;this._resXStart = null;this._resYStart = null;this._resXMaxWidthLeft = null;this._resXMaxWidthRight = null;this._resYMaxHeightTop = null;this._resYMaxHeightBottom = null;if (this.obj){this.obj.parentNode.removeChild(this.obj);this.obj = null;}

 if (this.base){if (this.base == document.body){}else {this.base.parentNode.removeChild(this.base);this.base = null;}
 }


 if (this.cont){this.cont.obj._dhxContDestruct();this.cont = null;}



 if (this.dhxWins){this.dhxWins.unload();this.dhxWins = null;this.dhxWinsIdPrefix = null;}


 if (this._doOnResizeStart){if (_isIE){window.detachEvent("onresize", this._doOnResizeStart);}else {window.removeEventListener("resize", this._doOnResizeStart, false);}
 this._doOnResizeStart = null;this._doOnResizeEnd = null;this._tmTime = null;}

 this.detachAllEvents();this.detachAllEvents = null;that = null;}
dhtmlXLayoutObject.prototype.tplData = {"1C": '<layout><autosize hor="a" ver="a" rows="1" cols="1"/><table data="a"/><row><cell obj="a" wh="1,1" resize="ver" neighbors="a"/></row></layout>',
 "2E": '<layout><autosize hor="a;b" ver="b" rows="2" cols="1"/><table data="a;b"/><row><cell obj="a" wh="1,2" resize="ver" neighbors="a;b"/></row><row sep="true"><cell sep="hor" top="a" bottom="b" dblclick="a"/></row><row><cell obj="b" wh="1,2" resize="ver" neighbors="a;b"/></row></layout>',
 "2U": '<layout><autosize hor="b" ver="a;b" rows="1" cols="2"/><table data="a,b"/><row><cell obj="a" wh="2,1" resize="hor" neighbors="a;b"/><cell sep="ver" left="a" right="b"/><cell obj="b" wh="2,1" resize="hor" neighbors="a;b"/></row></layout>',

 "3E": '<layout><autosize hor="a;b;c" ver="c" rows="3" cols="1"/><table data="a;b;c"/><row><cell obj="a" wh="1,3" resize="ver" neighbors="a;b;c"/></row><row sep="yes"><cell sep="hor" top="a" bottom="b;c" dblclick="a"/></row><row><cell obj="b" wh="1,3" resize="ver" neighbors="a;b;c"/></row><row sep="yes"><cell sep="hor" top="a;b" bottom="c" dblclick="b"/></row><row><cell obj="c" wh="1,3" resize="ver" neighbors="a;b;c"/></row></layout>',
 "3W": '<layout><autosize hor="c" ver="a;b;c" rows="1" cols="3"/><table data="a,b,c"/><row><cell obj="a" wh="3,1" resize="hor" neighbors="a;b;c"/><cell sep="ver" left="a" right="b;c" dblclick="a"/><cell obj="b" wh="3,1" resize="hor" neighbors="a;b;c"/><cell sep="ver" left="a;b" right="c" dblclick="b"/><cell obj="c" wh="3,1" resize="hor" neighbors="a;b;c"/></row></layout>',
 "3J": '<layout><autosize hor="b" ver="b;c" rows="2" cols="2"/><table data="a,b;c,b"/><row><cell obj="a" wh="2,2" resize="ver" neighbors="a;c"/><cell sep="ver" left="a,c" right="b" dblclick="b" rowspan="3"/><cell obj="b" wh="2,1" resize="hor" neighbors="a,c;b" rowspan="3"/></row><row sep="yes"><cell sep="hor" top="a" bottom="c" dblclick="a"/></row><row><cell obj="c" wh="2,2" resize="ver" neighbors="a;c"/></row></layout>',
 "3T": '<layout><autosize hor="a;c" ver="b;c" rows="2" cols="2"/><table data="a,a;b,c"/><row><cell obj="a" wh="1,2" resize="ver" neighbors="a;b,c" colspan="3"/></row><row sep="true"><cell sep="hor" top="a" bottom="b,c" dblclick="a" colspan="3"/></row><row><cell obj="b" wh="2,2" resize="hor" neighbors="b;c"/><cell sep="ver" left="b" right="c" dblclick="b"/><cell obj="c" wh="2,2" resize="hor" neighbors="b;c"/></row></layout>',
 "3L": '<layout><autosize hor="b;c" ver="a;c" rows="2" cols="2"/><table data="a,b;a,c"/><row><cell obj="a" wh="2,1" resize="hor" neighbors="a;b,c" rowspan="3"/><cell sep="ver" left="a" right="b,c" dblclick="a" rowspan="3"/><cell obj="b" wh="2,2" resize="ver" neighbors="b;c"/></row><row sep="true"><cell sep="hor" top="b" dblclick="b" bottom="c"/></row><row><cell obj="c" wh="b,2" resize="ver" neighbors="b;c"/></row></layout>',
 "3U": '<layout><autosize hor="b;c" ver="c" rows="2" cols="2"/><table data="a,b;c,c"/><row><cell obj="a" wh="2,2" resize="hor" neighbors="a;b"/><cell sep="ver" left="a" right="b" dblclick="a"/><cell obj="b" wh="2,2" resize="hor" neighbors="a;b"/></row><row sep="true"><cell sep="hor" top="a,b" bottom="c" dblclick="c" colspan="3"/></row><row><cell obj="c" wh="1,2" resize="ver" neighbors="a,b;c" colspan="3"/></row></layout>',

 "4H": '<layout><autosize hor="d" ver="a;c;d" rows="2" cols="3"/><table data="a,b,d;a,c,d"/><row><cell obj="a" wh="3,1" resize="hor" neighbors="a;b,c;d" rowspan="3"/><cell sep="ver" left="a" right="b,c;d" dblclick="a" rowspan="3"/><cell obj="b" wh="3,2" resize="ver" neighbors="b;c"/><cell sep="ver" left="a;b,c" right="d" dblclick="d" rowspan="3"/><cell obj="d" wh="3,1" resize="hor" neighbors="a;b,c;d" rowspan="3"/></row><row sep="true"><cell sep="hor" top="b" dblclick="b" bottom="c"/></row><row><cell obj="c" wh="3,2" resize="ver" neighbors="b;c"/></row></layout>',
 "4I": '<layout><autosize hor="a;c;d" ver="d" rows="3" cols="2"/><table data="a,a;b,c;d,d"/><row><cell obj="a" wh="1,3" resize="ver" neighbors="a;b,c;d" colspan="3"/></row><row sep="true"><cell sep="hor" top="a" bottom="b,c;d" dblclick="a" colspan="3"/></row><row><cell obj="b" wh="2,3" resize="hor" neighbors="b;c"/><cell sep="ver" left="b" dblclick="b" right="c"/><cell obj="c" wh="2,3" resize="hor" neighbors="b;c"/></row><row sep="true"><cell sep="hor" top="a;b,c" bottom="d" dblclick="d" colspan="3"/></row><row><cell obj="d" wh="1,3" resize="ver" neighbors="a;b,c;d" colspan="3"/></row></layout>',
 "4T": '<layout><autosize hor="a;d" ver="b;c;d" rows="2" cols="3"/><table data="a,a,a;b,c,d"/><row><cell obj="a" wh="1,2" resize="ver" neighbors="a;b,c,d" colspan="5"/></row><row sep="true"><cell sep="hor" top="a" bottom="b,c,d" dblclick="a" colspan="5"/></row><row><cell obj="b" wh="3,2" resize="hor" neighbors="b;c;d"/><cell sep="ver" left="b" right="c;d" dblclick="b"/><cell obj="c" wh="3,2" resize="hor" neighbors="b;c;d"/><cell sep="ver" left="b;c" right="d" dblclick="c"/><cell obj="d" wh="3,2" resize="hor" neighbors="b;c;d"/></row></layout>',
 "4U": '<layout><autosize hor="c;d" ver="d" rows="2" cols="3"/><table data="a,b,c;d,d,d"/><row><cell obj="a" wh="3,2" resize="hor" neighbors="a;b;c"/><cell sep="ver" left="a" right="b;c" dblclick="a"/><cell obj="b" wh="3,2" resize="hor" neighbors="a;b;c"/><cell sep="ver" left="a;b" right="c" dblclick="b"/><cell obj="c" wh="3,2" resize="hor" neighbors="a;b;c"/></row><row sep="true"><cell sep="hor" top="a,b,c" bottom="d" dblclick="d" colspan="5"/></row><row><cell obj="d" wh="1,2" resize="ver" neighbors="a,b,c;d" colspan="5"/></row></layout>',

 "5H": '<layout><autosize hor="b;c;d" ver="a;c;e" rows="3" cols="3"/><table data="a,b,e;a,c,e;a,d,e"/><row><cell obj="a" wh="3,1" resize="hor" neighbors="a;b,c,d" rowspan="5"/><cell sep="ver" left="a" right="b,c,d;e" dblclick="a" rowspan="5"/><cell obj="b" wh="3,3" resize="ver" neighbors="b;c;d"/><cell sep="ver" left="a;b,c,d" right="e" dblclick="e" rowspan="5"/><cell obj="e" wh="3,1" resize="hor" neighbors="b,c,d;e" rowspan="5"/></row><row sep="true"><cell sep="hor" top="b" dblclick="b" bottom="c;d"/></row><row><cell obj="c" wh="3,3" resize="ver" neighbors="b;c;d"/></row><row sep="true"><cell sep="hor" top="b;c" dblclick="c" bottom="d"/></row><row><cell obj="d" wh="3,3" resize="ver" neighbors="b;c;d"/></row></layout>',
 "5I": '<layout><autosize hor="a;d;e" ver="e" rows="3" cols="3"/><table data="a,a,a;b,c,d;e,e,e"/><row><cell obj="a" wh="1,3" resize="ver" neighbors="a;b,c,d;e" colspan="5"/></row><row sep="match"><cell sep="hor" top="a" bottom="b,c,d;e" dblclick="a" colspan="5"/></row><row><cell obj="b" wh="3,3" resize="hor" neighbors="b;c;d"/><cell sep="ver" left="b" right="c;d" dblclick="b"/><cell obj="c" wh="3,3" resize="hor" neighbors="b;c;d"/><cell sep="ver" left="b;c" right="d" dblclick="c"/><cell obj="d" wh="3,3" resize="hor" neighbors="b;c;d"/></row><row sep="match"><cell sep="hor" top="a;b,c,d" bottom="e" dblclick="e" colspan="5"/></row><row><cell obj="e" wh="1,3" resize="ver" neighbors="a;b,c,d;e" colspan="5"/></row></layout>',

 "6I": '<layout><autosize hor="a;e;f" ver="f" rows="3" cols="4"/><table data="a,a,a,a;b,c,d,e;f,f,f,f"/><row><cell obj="a" wh="1,3" resize="ver" neighbors="a;b,c,d,e;f" colspan="7"/></row><row sep="true"><cell sep="hor" top="a" bottom="b,c,d,e;f" dblclick="a" colspan="7"/></row><row><cell obj="b" wh="4,3" resize="hor" neighbors="b;c;d;e"/><cell sep="ver" left="b" right="c;d;e" dblclick="b"/><cell obj="c" wh="4,3" resize="hor" neighbors="b;c;d;e"/><cell sep="ver" left="b;c" right="d;e" dblclick="c"/><cell obj="d" wh="4,3" resize="hor" neighbors="b;c;d;e"/><cell sep="ver" left="b;c;d" right="e" dblclick="d"/><cell obj="e" wh="4,3" resize="hor" neighbors="b;c;d;e"/></row><row sep="true"><cell sep="hor" top="a;b,c,d,e" bottom="f" dblclick="f" colspan="7"/></row><row><cell obj="f" wh="1,3" resize="ver" neighbors="a;b,c,d,e;f" colspan="7"/></row></layout>'
};dhtmlXLayoutObject.prototype._availAutoSize = {"1C_hor": new Array("a"),
 "1C_ver": new Array("a"),
 "2E_hor": new Array("a;b"),
 "2E_ver": new Array("a", "b"),
 "2U_hor": new Array("a", "b"),
 "2U_ver": new Array("a;b"),
 "3E_hor": new Array("a;b;c"),
 "3E_ver": new Array("a", "b", "c"),
 "3W_hor": new Array("a", "b", "c"),
 "3W_ver": new Array("a;b;c"),
 "3J_hor": new Array("a;c", "b"),
 "3J_ver": new Array("a;b", "c;b"),
 "3T_hor": new Array("a;b", "a;c"),
 "3T_ver": new Array("a", "b;c"),
 "3L_hor": new Array("a", "b;c"),
 "3L_ver": new Array("a;b", "a;c"),
 "3U_hor": new Array("a;c", "b;c"),
 "3U_ver": new Array("a;b", "c"),
 "4H_hor": new Array("a", "b;c", "d"),
 "4H_ver": new Array("a;b;d", "a;c;d"),
 "4I_hor": new Array("a;b;d", "a;c;d"),
 "4I_ver": new Array("a", "b;c", "d"),
 "4T_hor": new Array("a;b", "a;c", "a;d"),
 "4T_ver": new Array("a", "b;c;d"),
 "4U_hor": new Array("a;d", "b;d", "c;d"),
 "4U_ver": new Array("a;b;c", "d"),
 "5H_hor": new Array("a", "b;c;d", "e"),
 "5H_ver": new Array("a;b;e", "a;c;e", "a;d;e"),
 "5I_hor": new Array("a;b;e", "a;c;e", "a;d;e"),
 "5I_ver": new Array("a", "b;c;d", "e"),
 "6I_hor": new Array("a;b;f", "a;c;f", "a;d;f", "a;e;f"),
 "6I_ver": new Array("a", "b;c;d;e", "f")
};dhtmlXLayoutObject.prototype.setCollapsedText = function(cell, text) {if (!this.polyObj[cell])return;var bar = this.polyObj[cell].childNodes[0].childNodes[0];if (bar.childNodes[bar.childNodes.length-1]._ct === true){var p = bar.childNodes[bar.childNodes.length-1];}else {var p = document.createElement("DIV");p._ct = true;p.className = "dhtmlxInfoBarLabel_collapsed_"+this.polyObj[cell]._resize;bar.appendChild(p);}
 p.innerHTML = text;this._fixCollapsedText();bar = null;};dhtmlXLayoutObject.prototype._fixCollapsedText = function() {for (var a in this.polyObj){if (this.polyObj[a]._resize == "hor"){var bar = this.polyObj[a].childNodes[0].childNodes[0];if (bar.childNodes[bar.childNodes.length-1]._ct === true){bar.childNodes[bar.childNodes.length-1].style.width = Math.max(0,bar.offsetHeight-bar.childNodes[4].offsetTop-bar.childNodes[4].offsetHeight-12)+"px";}
 }
 }
}
dhtmlXLayoutObject.prototype.i18n = {dhxcontalert: "dhtmlxcontainer.js is missed on the page",
 collapse: "Collapse",
 expand: "Expand",
 dock: "Dock",
 undock: "UnDock"
};(function(){dhtmlx.extend_api("dhtmlXLayoutObject",{_init:function(obj){return [obj.parent, obj.pattern, obj.skin];},
 image_path:"setImagePath",
 effect:"_effect",
 cells:"_cells",
 autosize:"_autosize"
 },{_cells:function(arr){for (var q=0;q<arr.length;q++){var data = arr[q];var cell = this.cells(data.id);if (cell){if (data.height)cell.setHeight(data.height);if (data.width)cell.setWidth(data.width);if (data.text)cell.setText(data.text);if (data.collapse)cell.collapse();if (data.fix_size)cell.fixSize(data.fix_size[0], data.fix_size[1]);if (data.header === false)cell.hideHeader();}
 }
 },
 _autosize:function(arr){this.setAutoSize(arr[0],arr[1]);},
 _effect:function(data){if (data.collapse)this.setEffect("collapse", data.collapse);if (data.resize)this.setEffect("resize", data.resize);if (data.highlight)this.setEffect("highlight", data.highlight);}
 });})();dhtmlXLayoutObject.prototype.attachHeader = function(obj) {if (this._ha)return;if (typeof(obj)!= "object") obj = document.getElementById(obj);var ofsH = obj.offsetHeight+(this.skin=="dhx_web"?9:2)+2;this.cont.obj._offsetTop = ofsH;this.cont.obj._offsetHeight = -ofsH;this.setSizes();this._ha = document.createElement("DIV");this._ha.style.position = "absolute";this._ha.style.top = "2px";this._ha.style.left = this.cont.obj.vs[this.cont.obj.av].dhxcont.style.left;this._ha.style.width = this.cont.obj.vs[this.cont.obj.av].dhxcont.style.width;this._ha.style.height = obj.offsetHeight+"px";document.body.appendChild(this._ha);this._ha.appendChild(obj);this._haEv = this.attachEvent("onResizeFinish", function(){this._ha.style.width = this.cont.obj.vs[this.cont.obj.av].dhxcont.style.width;});}
dhtmlXLayoutObject.prototype.attachFooter = function(obj) {if (this._fa)return;if (typeof(obj)!= "object") obj = document.getElementById(obj);var ofsH = obj.offsetHeight+(this.skin=="dhx_web"?9:2)-2;this.cont.obj._offsetHeight = this.cont.obj._offsetHeight-ofsH;this.setSizes();this._fa = document.createElement("DIV");this._fa.style.position = "absolute";this._fa.style.bottom = "2px";this._fa.style.left = this.cont.obj.vs[this.cont.obj.av].dhxcont.style.left;this._fa.style.width = this.cont.obj.vs[this.cont.obj.av].dhxcont.style.width;this._fa.style.height = obj.offsetHeight+"px";document.body.appendChild(this._fa);this._fa.appendChild(obj);this._faEv = this.attachEvent("onResizeFinish", function(){this._fa.style.width = this.cont.obj.vs[this.cont.obj.av].dhxcont.style.width;});}
dhtmlXLayoutObject.prototype._fixToolbars = function() {if (!_isIE)return;for (var a in this.polyObj){if (this.polyObj[a].vs[this.polyObj[a].av].toolbar != null)this.polyObj[a].vs[this.polyObj[a].av].toolbar._fixSpacer();}
}
dhtmlXLayoutObject.prototype._hideBorders = function() {if (this.skin != "dhx_terrace")return;this._cpm_old = this.skinParams[this.skin].cell_pading_max;this.skinParams[this.skin].cell_pading_max = [1,0,0,0];for (var a in this.polyObj){this.polyObj[a]._setPadding(this.skinParams[this.skin]["cell_pading_max"], "dhxcont_layout_"+this.skin);this.polyObj[a].adjustContent(this.polyObj[a].childNodes[0], this.skinParams[this.skin]["cpanel_height"]);}

}
function dhtmlXContainer(obj) {var that = this;this.obj = obj;obj = null;this.obj._padding = true;this.dhxcont = null;this.st = document.createElement("DIV");this.st.style.position = "absolute";this.st.style.left = "-200px";this.st.style.top = "0px";this.st.style.width = "100px";this.st.style.height = "1px";this.st.style.visibility = "hidden";this.st.style.overflow = "hidden";document.body.insertBefore(this.st, document.body.childNodes[0]);this.obj._getSt = function() {return that.st;}

 this.obj.dv = "def";this.obj.av = this.obj.dv;this.obj.cv = this.obj.av;this.obj.vs = {};this.obj.vs[this.obj.av] = {};this.obj.view = function(name) {if (!this.vs[name]){this.vs[name] = {};this.vs[name].dhxcont = this.vs[this.dv].dhxcont;var mainCont = document.createElement("DIV");mainCont.style.position = "relative";mainCont.style.left = "0px";mainCont.style.width = "200px";mainCont.style.height = "200px";mainCont.style.overflow = "hidden";mainCont.style.visibility = "";that.st.appendChild(mainCont);this.vs[name].dhxcont.mainCont[name] = mainCont;mainCont = null;}

 this.avt = this.av;this.av = name;return this;}

 this.obj.setActive = function() {if (!this.vs[this.av])return;this.cv = this.av;if (this.vs[this.avt].dhxcont == this.vs[this.avt].dhxcont.mainCont[this.avt].parentNode){that.st.appendChild(this.vs[this.avt].dhxcont.mainCont[this.avt]);if (this.vs[this.avt].menu)that.st.appendChild(document.getElementById(this.vs[this.avt].menuId));if (this.vs[this.avt].toolbar)that.st.appendChild(document.getElementById(this.vs[this.avt].toolbarId));if (this.vs[this.avt].sb)that.st.appendChild(document.getElementById(this.vs[this.avt].sbId));}




 if (this._isCell){}



 if (this.vs[this.av].dhxcont != this.vs[this.av].dhxcont.mainCont[this.av].parentNode){this.vs[this.av].dhxcont.insertBefore(this.vs[this.av].dhxcont.mainCont[this.av],this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length-1]);if (this.vs[this.av].menu)this.vs[this.av].dhxcont.insertBefore(document.getElementById(this.vs[this.av].menuId), this.vs[this.av].dhxcont.childNodes[0]);if (this.vs[this.av].toolbar)this.vs[this.av].dhxcont.insertBefore(document.getElementById(this.vs[this.av].toolbarId), this.vs[this.av].dhxcont.childNodes[(this.vs[this.av].menu?1:0)]);if (this.vs[this.av].sb)this.vs[this.av].dhxcont.insertBefore(document.getElementById(this.vs[this.av].sbId), this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length-1]);}

 if (this._doOnResize)this._doOnResize();if (this._isWindow)this.updateNestedObjects();this.avt = null;}

 this.obj._viewRestore = function() {var t = this.av;if (this.avt){this.av = this.avt;this.avt = null;}
 return t;}

 this.setContent = function(data) {this.obj.vs[this.obj.av].dhxcont = data;this.obj._init();data = null;}

 this.obj._init = function() {this.vs[this.av].dhxcont.innerHTML = "<div ida='dhxMainCont' style='position: relative;left: 0px;top: 0px;overflow: hidden;'></div>"+
 "<div class='dhxcont_content_blocker' style='display: none;'></div>";this.vs[this.av].dhxcont.mainCont = {};this.vs[this.av].dhxcont.mainCont[this.av] = this.vs[this.av].dhxcont.childNodes[0];}

 this.obj._genStr = function(w) {var s = "";var z = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";for (var q=0;q<w;q++)s += z.charAt(Math.round(Math.random() * (z.length-1)));return s;}

 this.obj.setMinContentSize = function(w, h) {this.vs[this.av]._minDataSizeW = w;this.vs[this.av]._minDataSizeH = h;}

 this.obj._setPadding = function(p, altCss) {if (typeof(p)== "object") {this._offsetTop = p[0];this._offsetLeft = p[1];this._offsetWidth = p[2];this._offsetHeight = p[3];p = null;}else {this._offsetTop = p;this._offsetLeft = p;this._offsetWidth = -p*2;this._offsetHeight = -p*2;}
 this.vs[this.av].dhxcont.className = "dhxcont_global_content_area "+(altCss||"");}

 this.obj.moveContentTo = function(cont) {for (var a in this.vs){cont.view(a).setActive();var pref = null;if (this.vs[a].grid)pref = "grid";if (this.vs[a].tree)pref = "tree";if (this.vs[a].tabbar)pref = "tabbar";if (this.vs[a].folders)pref = "folders";if (this.vs[a].layout)pref = "layout";if (pref != null){cont.view(a).attachObject(this.vs[a][pref+"Id"], false, true, false);cont.vs[a][pref] = this.vs[a][pref];cont.vs[a][pref+"Id"] = this.vs[a][pref+"Id"];cont.vs[a][pref+"Obj"] = this.vs[a][pref+"Obj"];this.vs[a][pref] = null;this.vs[a][pref+"Id"] = null;this.vs[a][pref+"Obj"] = null;}

 if (this.vs[a]._frame){cont.vs[a]._frame = this.vs[a]._frame;this.vs[a]._frame = null;}

 if (this.vs[a].menu != null){if (cont.cv == cont.av){cont.vs[cont.av].dhxcont.insertBefore(document.getElementById(this.vs[a].menuId), cont.vs[cont.av].dhxcont.childNodes[0]);}else {var st = cont._getSt();st.appendChild(document.getElementById(this.vs[a].menuId));st = null;}
 cont.vs[a].menu = this.vs[a].menu;cont.vs[a].menuId = this.vs[a].menuId;cont.vs[a].menuHeight = this.vs[a].menuHeight;this.vs[a].menu = null;this.vs[a].menuId = null;this.vs[a].menuHeight = null;if (this.cv == this.av && this._doOnAttachMenu)this._doOnAttachMenu("unload");if (cont.cv == cont.av && cont._doOnAttachMenu)cont._doOnAttachMenu("move");}

 if (this.vs[a].toolbar != null){if (cont.cv == cont.av){cont.vs[cont.av].dhxcont.insertBefore(document.getElementById(this.vs[a].toolbarId), cont.vs[cont.av].dhxcont.childNodes[(cont.vs[cont.av].menu!=null?1:0)]);}else {var st = cont._getSt();st.appendChild(document.getElementById(this.vs[a].toolbarId));st = null;}

 cont.vs[a].toolbar = this.vs[a].toolbar;cont.vs[a].toolbarId = this.vs[a].toolbarId;cont.vs[a].toolbarHeight = this.vs[a].toolbarHeight;this.vs[a].toolbar = null;this.vs[a].toolbarId = null;this.vs[a].toolbarHeight = null;if (this.cv == this.av && this._doOnAttachToolbar)this._doOnAttachToolbar("unload");if (cont.cv == cont.av && cont._doOnAttachToolbar)cont._doOnAttachToolbar("move");}

 if (this.vs[a].sb != null){if (cont.cv == cont.av){cont.vs[cont.av].dhxcont.insertBefore(document.getElementById(this.vs[a].sbId), cont.vs[cont.av].dhxcont.childNodes[cont.vs[cont.av].dhxcont.childNodes.length-1]);}else {var st = cont._getSt();st.appendChild(document.getElementById(this.vs[a].sbId));return st;}

 cont.vs[a].sb = this.vs[a].sb;cont.vs[a].sbId = this.vs[a].sbId;cont.vs[a].sbHeight = this.vs[a].sbHeight;this.vs[a].sb = null;this.vs[a].sbId = null;this.vs[a].sbHeight = null;if (this.cv == this.av && this._doOnAttachStatusBar)this._doOnAttachStatusBar("unload");if (cont.cv == cont.av && cont._doOnAttachStatusBar)cont._doOnAttachStatusBar("move");}


 var objA = this.vs[a].dhxcont.mainCont[a];var objB = cont.vs[a].dhxcont.mainCont[a];while (objA.childNodes.length > 0)objB.appendChild(objA.childNodes[0]);}

 cont.view(this.av).setActive();cont = null;}

 this.obj.adjustContent = function(parentObj, offsetTop, marginTop, notCalcWidth, offsetBottom) {var dhxcont = this.vs[this.av].dhxcont;var mainCont = dhxcont.mainCont[this.av];dhxcont.style.left = (this._offsetLeft||0)+"px";dhxcont.style.top = (this._offsetTop||0)+offsetTop+"px";var cw = parentObj.clientWidth+(this._offsetWidth||0);if (notCalcWidth !== true)dhxcont.style.width = Math.max(0, cw)+"px";if (notCalcWidth !== true)if (dhxcont.offsetWidth > cw)dhxcont.style.width = Math.max(0, cw*2-dhxcont.offsetWidth)+"px";var ch = parentObj.clientHeight+(this._offsetHeight||0);dhxcont.style.height = Math.max(0, ch-offsetTop)+(marginTop!=null?marginTop:0)+"px";if (dhxcont.offsetHeight > ch - offsetTop)dhxcont.style.height = Math.max(0, (ch-offsetTop)*2-dhxcont.offsetHeight)+"px";if (offsetBottom)if (!isNaN(offsetBottom)) dhxcont.style.height = Math.max(0, parseInt(dhxcont.style.height)-offsetBottom)+"px";if (this.vs[this.av]._minDataSizeH != null){if (parseInt(dhxcont.style.height)< this.vs[this.av]._minDataSizeH) dhxcont.style.height = this.vs[this.av]._minDataSizeH+"px";}
 if (this.vs[this.av]._minDataSizeW != null){if (parseInt(dhxcont.style.width)< this.vs[this.av]._minDataSizeW) dhxcont.style.width = this.vs[this.av]._minDataSizeW+"px";}

 if (notCalcWidth !== true){mainCont.style.width = dhxcont.clientWidth+"px";if (mainCont.offsetWidth > dhxcont.clientWidth)mainCont.style.width = Math.max(0, dhxcont.clientWidth*2-mainCont.offsetWidth)+"px";}

 var menuOffset = (this.vs[this.av].menu!=null?(!this.vs[this.av].menuHidden?this.vs[this.av].menuHeight:0):0);var toolbarOffset = (this.vs[this.av].toolbar!=null?(!this.vs[this.av].toolbarHidden?this.vs[this.av].toolbarHeight:0):0);var statusOffset = (this.vs[this.av].sb!=null?(!this.vs[this.av].sbHidden?this.vs[this.av].sbHeight:0):0);mainCont.style.height = dhxcont.clientHeight+"px";if (mainCont.offsetHeight > dhxcont.clientHeight)mainCont.style.height = Math.max(0, dhxcont.clientHeight*2-mainCont.offsetHeight)+"px";mainCont.style.height = Math.max(0, parseInt(mainCont.style.height)-menuOffset-toolbarOffset-statusOffset)+"px";mainCont = null;dhxcont = null;parentObj = null;}
 this.obj.coverBlocker = function() {return this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length-1];}
 this.obj.showCoverBlocker = function() {var t = this.coverBlocker();t.style.display = "";t = null;}
 this.obj.hideCoverBlocker = function() {var t = this.coverBlocker();t.style.display = "none";t = null;}
 this.obj.updateNestedObjects = function(fromInit) {if (this.skin == "dhx_terrace"){var mtAttached = (this.vs[this.av].menu != null || this.vs[this.av].toolbar != null);if (this.vs[this.av].grid){var gTop = (mtAttached||this._isWindow?14:0);var gBottom = (this._isWindow?14:0);var gLeft = (this._isWindow?14:0);if (fromInit){if (!this._isWindow){this.vs[this.av].grid.entBox.style.border = "0px solid white";this.vs[this.av].grid.skin_h_correction = -2;}

 this.vs[this.av].grid.dontSetSizes = true;this.vs[this.av].gridObj.style.position = "absolute";}

 this.vs[this.av].gridObj.style.top = gTop+"px";this.vs[this.av].gridObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)-gTop-gBottom+"px";this.vs[this.av].gridObj.style.left = gLeft+"px";this.vs[this.av].gridObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)-(gLeft*2)+"px";this.vs[this.av].grid.setSizes();}

 if (this.vs[this.av].tree){var gTop = (mtAttached||this._isWindow?14:0);var gBottom = (this._isWindow?14:0);var gLeft = (this._isWindow?14:0);if (fromInit){this.vs[this.av].treeObj.style.position = "absolute";}

 this.vs[this.av].treeObj.style.top = gTop+"px";this.vs[this.av].treeObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)-gTop-gBottom+"px";this.vs[this.av].treeObj.style.left = gLeft+"px";this.vs[this.av].treeObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)-(gLeft*2)+"px";}

 if (this.vs[this.av].form){var gTop = (mtAttached||this._isWindow?14:0);var gBottom = (this._isWindow?14:0);var gLeft = (this._isWindow?14:0);if (fromInit){this.vs[this.av].formObj.style.position = "absolute";}

 this.vs[this.av].formObj.style.top = gTop+"px";this.vs[this.av].formObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)-gTop-gBottom+"px";this.vs[this.av].formObj.style.left = gLeft+"px";this.vs[this.av].formObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)-(gLeft*2)+"px";this.vs[this.av].form.setSizes();}

 if (this.vs[this.av].layout){if (fromInit){if (!this._isWindow && !this._isCell)this.vs[this.av].layout._hideBorders();}


 var gTop = (this._isCell&&this._noHeader&&!mtAttached?0:14);var gBottom = (this._isCell&&this._noHeader?0:14)
 var gLeft = (this._isCell&&this._noHeader?0:14);this.vs[this.av].layoutObj.style.top = gTop+"px";this.vs[this.av].layoutObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)-gTop-gBottom+"px";this.vs[this.av].layoutObj.style.left = gLeft+"px";this.vs[this.av].layoutObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)-(gLeft*2)+"px";this.vs[this.av].layout.setSizes();}

 if (this.vs[this.av].accordion){if (fromInit){this.vs[this.av].accordion._hideBorders = true;}

 var gTop = (this._isCell&&this._noHeader&&!mtAttached?0:14);var gBottom = (this._isCell&&this._noHeader?0:14)
 var gLeft = (this._isCell&&this._noHeader?0:14);this.vs[this.av].accordionObj.style.top = gTop+"px";this.vs[this.av].accordionObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)-gTop-gBottom+"px";this.vs[this.av].accordionObj.style.left = gLeft+"px";this.vs[this.av].accordionObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)-(gLeft*2)+"px";this.vs[this.av].accordion.setSizes();}


 if (this.vs[this.av].tabbar != null){var gTop = (!mtAttached && this._isCell && this._noHeader ? 0:14);var gBottom = (this._isCell && this._noHeader ? gTop : 28);var gLeft = (this._isCell && this._noHeader ? 0 : 14);this.vs[this.av].tabbarObj.style.top = gTop+"px";this.vs[this.av].tabbarObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)-gBottom+"px";this.vs[this.av].tabbarObj.style.left = gLeft+"px";this.vs[this.av].tabbarObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)-(gLeft*2)+"px";this.vs[this.av].tabbar.adjustOuterSize();}

 if (this.vs[this.av].editor){if (fromInit){if (this.vs[this.av].editor.tb != null && this.vs[this.av].editor.tb instanceof dhtmlXToolbarObject){}

 }

 var gTop = 14;var gLeft = 14;this.vs[this.av].editorObj.style.top = gTop+"px";this.vs[this.av].editorObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)-(gTop*2)+"px";this.vs[this.av].editorObj.style.left = gLeft+"px";this.vs[this.av].editorObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)-(gLeft*2)+"px";if (!_isIE)this.vs[this.av].editor._prepareContent(true);this.vs[this.av].editor.setSizes();}


 if (this.vs[this.av].dockedCell){this.vs[this.av].dockedCell.updateNestedObjects();}

 return;}

 if (this.vs[this.av].grid){this.vs[this.av].grid.setSizes();}
 if (this.vs[this.av].sched){this.vs[this.av].sched.setSizes();}
 if (this.vs[this.av].tabbar){this.vs[this.av].tabbar.adjustOuterSize();}
 if (this.vs[this.av].folders){this.vs[this.av].folders.setSizes();}
 if (this.vs[this.av].editor){if (!_isIE)this.vs[this.av].editor._prepareContent(true);this.vs[this.av].editor.setSizes();}


 if (this.vs[this.av].layout){if ((this._isAcc || this._isTabbarCell)&& this.skin == "dhx_skyblue") {this.vs[this.av].layoutObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)+2+"px";this.vs[this.av].layoutObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)+2+"px";}else {this.vs[this.av].layoutObj.style.width = this.vs[this.av].dhxcont.mainCont[this.av].style.width;this.vs[this.av].layoutObj.style.height = this.vs[this.av].dhxcont.mainCont[this.av].style.height;}
 this.vs[this.av].layout.setSizes();}

 if (this.vs[this.av].accordion != null){if (this.skin == "dhx_web"){this.vs[this.av].accordionObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)+"px";this.vs[this.av].accordionObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)+"px";}else {this.vs[this.av].accordionObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)+2+"px";this.vs[this.av].accordionObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)+2+"px";}
 this.vs[this.av].accordion.setSizes();}

 if (this.vs[this.av].dockedCell){this.vs[this.av].dockedCell.updateNestedObjects();}

 if (this.vs[this.av].form)this.vs[this.av].form.setSizes();}

 this.obj.attachStatusBar = function() {if (this.vs[this.av].sb)return;var sbObj = document.createElement("DIV");if (this._isCell){sbObj.className = "dhxcont_sb_container_layoutcell";}else {sbObj.className = "dhxcont_sb_container";}
 sbObj.id = "sbobj_"+this._genStr(12);sbObj.innerHTML = "<div class='dhxcont_statusbar'></div>";if (this.cv == this.av)this.vs[this.av].dhxcont.insertBefore(sbObj, this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length-1]);else that.st.appendChild(sbObj);sbObj.setText = function(text) {this.childNodes[0].innerHTML = text;}
 sbObj.getText = function() {return this.childNodes[0].innerHTML;}
 sbObj.onselectstart = function(e) {e=e||event;e.returnValue=false;return false;}

 this.vs[this.av].sb = sbObj;this.vs[this.av].sbHeight = (this.skin=="dhx_web"?41:(this.skin=="dhx_skyblue"?23:sbObj.offsetHeight));this.vs[this.av].sbId = sbObj.id;if (this._doOnAttachStatusBar)this._doOnAttachStatusBar("init");this.adjust();return this.vs[this._viewRestore()].sb;}

 this.obj.detachStatusBar = function() {if (!this.vs[this.av].sb)return;this.vs[this.av].sb.setText = null;this.vs[this.av].sb.getText = null;this.vs[this.av].sb.onselectstart = null;this.vs[this.av].sb.parentNode.removeChild(this.vs[this.av].sb);this.vs[this.av].sb = null;this.vs[this.av].sbHeight = null;this.vs[this.av].sbId = null;this._viewRestore();if (this._doOnAttachStatusBar)this._doOnAttachStatusBar("unload");}

 this.obj.getFrame = function(){return this.getView()._frame;};this.obj.getView = function(name){return this.vs[name||this.av];};this.obj.attachMenu = function(skin) {if (this.vs[this.av].menu)return;var menuObj = document.createElement("DIV");menuObj.style.position = "relative";menuObj.style.overflow = "hidden";menuObj.id = "dhxmenu_"+this._genStr(12);if (this.cv == this.av)this.vs[this.av].dhxcont.insertBefore(menuObj, this.vs[this.av].dhxcont.childNodes[0]);else that.st.appendChild(menuObj);if (typeof(skin)!= "object") {this.vs[this.av].menu = new dhtmlXMenuObject(menuObj.id, (skin||this.skin));}else {skin.parent = menuObj.id;this.vs[this.av].menu = new dhtmlXMenuObject(skin);}
 this.vs[this.av].menuHeight = (this.skin=="dhx_web"?29:menuObj.offsetHeight);this.vs[this.av].menuId = menuObj.id;if (this._doOnAttachMenu)this._doOnAttachMenu("init");this.adjust();return this.vs[this._viewRestore()].menu;}

 this.obj.detachMenu = function() {if (!this.vs[this.av].menu)return;var menuObj = document.getElementById(this.vs[this.av].menuId);this.vs[this.av].menu.unload();this.vs[this.av].menu = null;this.vs[this.av].menuId = null;this.vs[this.av].menuHeight = null;if (menuObj)menuObj.parentNode.removeChild(menuObj);menuObj = null;this._viewRestore();if (this._doOnAttachMenu)this._doOnAttachMenu("unload");}

 this.obj.attachToolbar = function(skin) {if (this.vs[this.av].toolbar)return;var toolbarObj = document.createElement("DIV");toolbarObj.style.position = "relative";toolbarObj.style.overflow = "hidden";toolbarObj.id = "dhxtoolbar_"+this._genStr(12);if (this.cv == this.av)this.vs[this.av].dhxcont.insertBefore(toolbarObj, this.vs[this.av].dhxcont.childNodes[(this.vs[this.av].menu!=null?1:0)]);else that.st.appendChild(toolbarObj);if (typeof(skin)!= "object") {this.vs[this.av].toolbar = new dhtmlXToolbarObject(toolbarObj.id, (skin||this.skin));}else {skin.parent = toolbarObj.id;this.vs[this.av].toolbar = new dhtmlXToolbarObject(skin);}
 this.vs[this.av].toolbarHeight = toolbarObj.offsetHeight;this.vs[this.av].toolbarId = toolbarObj.id;if (this._doOnAttachToolbar)this._doOnAttachToolbar("init");this.adjust();var t = this;this.vs[this.av].toolbar.attachEvent("_onIconSizeChange",function(size){t.vs[t.av].toolbarHeight = this.cont.offsetHeight;t.vs[t.av].toolbarId = this.cont.id;if (t._doOnAttachToolbar)t._doOnAttachToolbar("iconSizeChange");});if (this.skin != "dhx_terrace")this.vs[this.av].toolbar.callEvent("_onIconSizeChange",[]);return this.vs[this._viewRestore()].toolbar;}

 this.obj.detachToolbar = function() {if (!this.vs[this.av].toolbar)return;var toolbarObj = document.getElementById(this.vs[this.av].toolbarId);this.vs[this.av].toolbar.unload();this.vs[this.av].toolbar = null;this.vs[this.av].toolbarId = null;this.vs[this.av].toolbarHeight = null;if (toolbarObj)toolbarObj.parentNode.removeChild(toolbarObj);toolbarObj = null;this._viewRestore();if (this._doOnAttachToolbar)this._doOnAttachToolbar("unload");}

 this.obj.attachGrid = function() {if (this._isWindow && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this._redraw();}

 var obj = document.createElement("DIV");obj.id = "dhxGridObj_"+this._genStr(12);obj.style.width = "100%";obj.style.height = "100%";obj.cmp = "grid";document.body.appendChild(obj);this.attachObject(obj.id, false, true, false);this.vs[this.av].grid = new dhtmlXGridObject(obj.id);this.vs[this.av].grid.setSkin(this.skin);if (this.skin == "dhx_skyblue" || this.skin == "dhx_black" || this.skin == "dhx_blue"){this.vs[this.av].grid.entBox.style.border = "0px solid white";this.vs[this.av].grid._sizeFix = 2;}
 this.vs[this.av].gridId = obj.id;this.vs[this.av].gridObj = obj;if (this.skin == "dhx_terrace"){this.adjust();this.updateNestedObjects(true);}

 return this.vs[this._viewRestore()].grid;}

 this.obj.attachScheduler = function(day,mode,cont_id,scheduler) {scheduler = scheduler || window.scheduler;var ready = 0;if (cont_id){obj = document.getElementById(cont_id);if (obj)ready = 1;}
 if (!ready){var tabs = cont_id || '<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>';var obj = document.createElement("DIV");obj.id = "dhxSchedObj_"+this._genStr(12);obj.innerHTML = '<div id="'+obj.id+'" class="dhx_cal_container" style="width:100%;height:100%;"><div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>'+tabs+'</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div></div>';document.body.appendChild(obj.firstChild);}

 this.attachObject(obj.id, false, true, false);this.vs[this.av].sched = scheduler;this.vs[this.av].schedId = obj.id;scheduler.setSizes = scheduler.update_view;scheduler.destructor=function(){};scheduler.init(obj.id,day,mode);return this.vs[this._viewRestore()].sched;}

 this.obj.attachTree = function(rootId) {if (this._isWindow && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this._redraw();}

 var obj = document.createElement("DIV");obj.id = "dhxTreeObj_"+this._genStr(12);obj.style.width = "100%";obj.style.height = "100%";obj.cmp = "tree";document.body.appendChild(obj);this.attachObject(obj.id, false, true, false);this.vs[this.av].tree = new dhtmlXTreeObject(obj.id, "100%", "100%", (rootId||0));this.vs[this.av].tree.setSkin(this.skin);this.vs[this.av].tree.allTree.childNodes[0].style.marginTop = "2px";this.vs[this.av].tree.allTree.childNodes[0].style.marginBottom = "2px";this.vs[this.av].treeId = obj.id;this.vs[this.av].treeObj = obj;if (this.skin == "dhx_terrace"){this.adjust();this.updateNestedObjects(true);}

 return this.vs[this._viewRestore()].tree;}

 this.obj.attachTabbar = function(mode) {if (this._isWindow && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.style.border = "none";this.setDimension(this.w, this.h);}

 var obj = document.createElement("DIV");obj.id = "dhxTabbarObj_"+this._genStr(12);obj.style.width = "100%";obj.style.height = "100%";obj.style.overflow = "hidden";obj.cmp = "tabbar";if (!this._isWindow)obj._hideBorders = true;document.body.appendChild(obj);this.attachObject(obj.id, false, true, false);if (this._isCell){this.hideHeader();obj._hideBorders = false;this._padding = false;}

 this.vs[this.av].tabbar = new dhtmlXTabBar(obj.id, mode||"top", (this.skin=="dhx_terrace"?null:20));if (!this._isWindow && this.skin != "dhx_terrace")this.vs[this.av].tabbar._s.expand = true;this.vs[this.av].tabbar.setSkin(this.skin);this.vs[this.av].tabbar.adjustOuterSize();this.vs[this.av].tabbarId = obj.id;this.vs[this.av].tabbarObj = obj;if (this.skin == "dhx_terrace"){this.adjust();this.updateNestedObjects(true);}

 return this.vs[this._viewRestore()].tabbar;}

 this.obj.attachFolders = function() {if (this._isWindow && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this._redraw();}
 var obj = document.createElement("DIV");obj.id = "dhxFoldersObj_"+this._genStr(12);obj.style.width = "100%";obj.style.height = "100%";obj.style.overflow = "hidden";obj.cmp = "folders";document.body.appendChild(obj);this.attachObject(obj.id, false, true, false);this.vs[this.av].folders = new dhtmlxFolders(obj.id);this.vs[this.av].folders.setSizes();this.vs[this.av].foldersId = obj.id;this.vs[this.av].foldersObj = obj;return this.vs[this._viewRestore()].folders;}

 this.obj.attachAccordion = function() {if (this._isWindow && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this._redraw();}

 var obj = document.createElement("DIV");obj.id = "dhxAccordionObj_"+this._genStr(12);this._padding = true;if (this.skin == "dhx_web"){obj.style.left = "0px";obj.style.top = "0px";obj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)+"px";obj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)+"px";}else if (this.skin != "dhx_terrace"){obj.style.left = "-1px";obj.style.top = "-1px";obj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)+2+"px";obj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)+2+"px";}


 obj.style.position = "relative";obj.cmp = "accordion";document.body.appendChild(obj);this.attachObject(obj.id, false, true, false);this.vs[this.av].accordion = new dhtmlXAccordion(obj.id, this.skin);this.vs[this.av].accordion.setSizes();this.vs[this.av].accordionId = obj.id;this.vs[this.av].accordionObj = obj;if (this.skin == "dhx_terrace"){this.adjust();this.updateNestedObjects(true);}

 return this.vs[this._viewRestore()].accordion;}

 this.obj.attachLayout = function(view, skin) {if (this._isCell && this.skin == "dhx_skyblue"){this.hideHeader();this.vs[this.av].dhxcont.style.border = "0px solid white";this.adjustContent(this.childNodes[0], 0);}

 if (this._isCell && this.skin == "dhx_web"){this.hideHeader();}

 this._padding = true;var obj = document.createElement("DIV");obj.id = "dhxLayoutObj_"+this._genStr(12);obj.style.overflow = "hidden";obj.style.position = "absolute";obj.style.left = "0px";obj.style.top = "0px";obj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)+"px";obj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)+"px";if ((this._isTabbarCell || this._isAcc)&& (this.skin == "dhx_skyblue")) {obj.style.left = "-1px";obj.style.top = "-1px";obj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)+2+"px";obj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)+2+"px";}


 obj.dhxContExists = true;obj.cmp = "layout";document.body.appendChild(obj);this.attachObject(obj.id, false, true, false);this.vs[this.av].layout = new dhtmlXLayoutObject(obj, view, (skin||this.skin));if (this._isWindow)this.attachEvent("_onBeforeTryResize", this.vs[this.av].layout._defineWindowMinDimension);this.vs[this.av].layoutId = obj.id;this.vs[this.av].layoutObj = obj;if (this.skin == "dhx_terrace"){if (this._isCell){this.style.backgroundColor = "transparent";this.vs[this.av].dhxcont.style.backgroundColor = "transparent";this.hideHeader();}
 this.adjust();this.updateNestedObjects(true);}

 return this.vs[this._viewRestore()].layout;}

 this.obj.attachEditor = function(skin) {if (this._isWindow && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this._redraw();}

 var obj = document.createElement("DIV");obj.id = "dhxEditorObj_"+this._genStr(12);obj.style.position = "relative";obj.style.display = "none";obj.style.overflow = "hidden";obj.style.width = "100%";obj.style.height = "100%";obj.cmp = "editor";document.body.appendChild(obj);if (this.skin == "dhx_terrace")obj._attached = true;this.attachObject(obj.id, false, true, false);this.vs[this.av].editor = new dhtmlXEditor(obj.id, skin||this.skin);this.vs[this.av].editorId = obj.id;this.vs[this.av].editorObj = obj;if (this.skin == "dhx_terrace"){this.adjust();this.updateNestedObjects(true);}

 return this.vs[this._viewRestore()].editor;}

 this.obj.attachMap = function(opts) {var obj = document.createElement("DIV");obj.id = "GMapsObj_"+this._genStr(12);obj.style.position = "relative";obj.style.display = "none";obj.style.overflow = "hidden";obj.style.width = "100%";obj.style.height = "100%";obj.cmp = "gmaps";document.body.appendChild(obj);this.attachObject(obj.id, false, true, true);if (!opts)opts = {center: new google.maps.LatLng(40.719837,-73.992348), zoom: 11, mapTypeId: google.maps.MapTypeId.ROADMAP};this.vs[this.av].gmaps = new google.maps.Map(obj, opts);return this.vs[this.av].gmaps;}


 this.obj.attachObject = function(obj, autoSize, localCall, adjustMT) {if (typeof(obj)== "string") obj = document.getElementById(obj);if (autoSize){obj.style.visibility = "hidden";obj.style.display = "";var objW = obj.offsetWidth;var objH = obj.offsetHeight;}
 this._attachContent("obj", obj);if (autoSize && this._isWindow){obj.style.visibility = "";this._adjustToContent(objW, objH);}

 if (this.skin == "dhx_terrace"){if (this.vs[this.av].menu != null || this.vs[this.av].toolbar != null){this.adjust(typeof(adjustMT)=="undefined"||adjustMT==true);this.updateNestedObjects(true);}
 }
 if (!localCall){this._viewRestore();}

 }

 this.obj.detachObject = function(remove, moveTo) {var p = null;var pObj = null;var t = ["tree","grid","layout","tabbar","accordion","folders"];for (var q=0;q<t.length;q++){if (this.vs[this.av][t[q]]){p = this.vs[this.av][t[q]];pObj = this.vs[this.av][t[q]+"Obj"];if (remove){if (p.unload)p.unload();if (p.destructor)p.destructor();while (pObj.childNodes.length > 0)pObj.removeChild(pObj.childNodes[0]);pObj.parentNode.removeChild(pObj);pObj = null;p = null;}else {document.body.appendChild(pObj);pObj.style.display = "none";}
 this.vs[this.av][t[q]] = null;this.vs[this.av][t[q]+"Id"] = null;this.vs[this.av][t[q]+"Obj"] = null;}
 }

 if (p != null && pObj != null)return new Array(p, pObj);if (remove && this.vs[this.av]._frame){this._detachURLEvents();this.vs[this.av]._frame = null;}

 var objA = this.vs[this.av].dhxcont.mainCont[this.av];while (objA.childNodes.length > 0){if (remove == true){objA.removeChild(objA.childNodes[0]);}else {var obj = objA.childNodes[0];if (moveTo != null){if (typeof(moveTo)!= "object") moveTo = document.getElementById(moveTo);moveTo.appendChild(obj);}else {document.body.appendChild(obj);}
 obj.style.display = "none";}
 }

 objA = moveTo = null;}


 this.obj.appendObject = function(obj) {if (typeof(obj)== "string") {obj = document.getElementById(obj);}
 this._attachContent("obj", obj, true);}

 this.obj.attachHTMLString = function(str) {this._attachContent("str", str);var z=str.match(/<script[^>]*>[^\f]*?<\/script>/g)||[];for (var i=0;i<z.length;i++){var s=z[i].replace(/<([\/]{0,1})script[^>]*>/g,"")
 if (s){if (window.execScript)window.execScript(s);else window.eval(s);}
 }
 }

 this.obj.attachURL = function(url, ajax) {this._attachContent((ajax==true?"urlajax":"url"), url, false);if (this.skin == "dhx_terrace"){if (this.vs[this.av].menu != null || this.vs[this.av].toolbar != null){this.adjust(true);this.updateNestedObjects(true);}
 }
 this._viewRestore();}
 this.obj.adjust = function(adjustMT) {if (this.skin == "dhx_skyblue"){if (this.vs[this.av].menu){if (this._isWindow || this._isLayout){this.vs[this.av].menu._topLevelOffsetLeft = 0;document.getElementById(this.vs[this.av].menuId).style.height = "26px";this.vs[this.av].menuHeight = document.getElementById(this.vs[this.av].menuId).offsetHeight;if (this._doOnAttachMenu)this._doOnAttachMenu("show");}
 if (this._isCell){document.getElementById(this.vs[this.av].menuId).className += " in_layoutcell";this.vs[this.av].menuHeight = 25;}
 if (this._isAcc){document.getElementById(this.vs[this.av].menuId).className += " in_acccell";this.vs[this.av].menuHeight = 25;}
 if (this._doOnAttachMenu)this._doOnAttachMenu("adjust");}
 if (this.vs[this.av].toolbar){if (this._isWindow){document.getElementById(this.vs[this.av].toolbarId).className += " in_window";}
 if (this._isLayout){document.getElementById(this.vs[this.av].toolbarId).className += " in_layout";}
 if (this._isCell){document.getElementById(this.vs[this.av].toolbarId).className += " in_layoutcell";}
 if (this._isAcc){document.getElementById(this.vs[this.av].toolbarId).className += " in_acccell";}
 if (this._isTabbarCell){document.getElementById(this.vs[this.av].toolbarId).className += " in_tabbarcell";}
 }
 }

 if (this.skin == "dhx_web"){if (this.vs[this.av].toolbar){if (this._isWindow){document.getElementById(this.vs[this.av].toolbarId).className += " in_window";}
 if (this._isLayout){document.getElementById(this.vs[this.av].toolbarId).className += " in_layout";}
 if (this._isCell){document.getElementById(this.vs[this.av].toolbarId).className += " in_layoutcell";}
 if (this._isAcc){document.getElementById(this.vs[this.av].toolbarId).className += " in_acccell";}
 if (this._isTabbarCell){document.getElementById(this.vs[this.av].toolbarId).className += " in_tabbarcell";}
 }
 }

 if (this.skin == "dhx_terrace"){var mtLRPad = 0;if (this._isWindow || this._isCell || this._isAcc || this._isTabbarCell)mtLRPad = 14;if (this._isCell && this._noHeader)mtLRPad = 0;var mtTPad = 0;if (this._isWindow || this._isCell || this._isAcc || this._isTabbarCell)mtTPad = 14;if (this._isCell && this._noHeader)mtTPad = 0;var mBPad = ((adjustMT == true && !this.vs[this.av].toolbar) || this._isLayout ? 14 : 0);var tBPad = (adjustMT == true || this._isLayout ? 14 : 0);var mtAttached = false;if (this.vs[this.av].menu){document.getElementById(this.vs[this.av].menuId).style.marginLeft = mtLRPad+"px";document.getElementById(this.vs[this.av].menuId).style.marginRight = mtLRPad+"px";document.getElementById(this.vs[this.av].menuId).style.marginTop = mtTPad+"px";document.getElementById(this.vs[this.av].menuId).style.marginBottom = mBPad+"px";this.vs[this.av].menuHeight = 32+mtTPad+mBPad;if (this._doOnAttachMenu)this._doOnAttachMenu("show");mtAttached = true;}

 if (this.vs[this.av].toolbar){if (mtTPad == 0 && this.vs[this.av].menu != null & this._isCell)mtTPad = 14;document.getElementById(this.vs[this.av].toolbarId).style.marginLeft = mtLRPad+"px";document.getElementById(this.vs[this.av].toolbarId).style.marginRight = mtLRPad+"px";document.getElementById(this.vs[this.av].toolbarId).style.marginTop = mtTPad+"px";document.getElementById(this.vs[this.av].toolbarId).style.marginBottom = tBPad+"px";this.vs[this.av].toolbarHeight = 32+mtTPad+tBPad;if (this._doOnAttachToolbar)this._doOnAttachToolbar("show");mtAttached = true;}
 }
 }


 this.obj._attachContent = function(type, obj, append) {if (append !== true){if (this.vs[this.av]._frame){this._detachURLEvents();this.vs[this.av]._frame = null;}
 while (this.vs[this.av].dhxcont.mainCont[this.av].childNodes.length > 0)this.vs[this.av].dhxcont.mainCont[this.av].removeChild(this.vs[this.av].dhxcont.mainCont[this.av].childNodes[0]);}

 if (type == "url"){if (this._isWindow && obj.cmp == null && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this._redraw();}
 var fr = document.createElement("IFRAME");fr.frameBorder = 0;fr.border = 0;fr.style.width = "100%";fr.style.height = "100%";fr.setAttribute("src","javascript:false;");this.vs[this.av].dhxcont.mainCont[this.av].appendChild(fr);fr.src = obj;this.vs[this.av]._frame = fr;this._attachURLEvents();}else if (type == "urlajax"){if (this._isWindow && obj.cmp == null && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this.vs[this.av].dhxcont.mainCont[this.av].style.backgroundColor = "#FFFFFF";this._redraw();}
 var t = this;var tav = String(this.av).valueOf();var xmlParser = function(){var tmp = t.av;t.av = tav;t.attachHTMLString(this.xmlDoc.responseText, this);t.av = tmp;if (t._doOnFrameContentLoaded)t._doOnFrameContentLoaded();this.destructor();}
 var xmlLoader = new dtmlXMLLoaderObject(xmlParser, window);xmlLoader.dhxWindowObject = this;xmlLoader.loadXML(obj);}else if (type == "obj"){if (this._isWindow && obj.cmp == null && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this.vs[this.av].dhxcont.mainCont[this.av].style.backgroundColor = "#FFFFFF";this._redraw();}
 this.vs[this.av].dhxcont._frame = null;this.vs[this.av].dhxcont.mainCont[this.av].appendChild(obj);this.vs[this.av].dhxcont.mainCont[this.av].style.overflow = (append===true?"auto":"hidden");obj.style.display = "";}else if (type == "str"){if (this._isWindow && obj.cmp == null && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this.vs[this.av].dhxcont.mainCont[this.av].style.backgroundColor = "#FFFFFF";this._redraw();}
 this.vs[this.av].dhxcont._frame = null;this.vs[this.av].dhxcont.mainCont[this.av].innerHTML = obj;}
 }

 this.obj._attachURLEvents = function() {var t = this;var fr = this.vs[this.av]._frame;if (_isIE){fr.onreadystatechange = function(a) {if (fr.readyState == "complete"){try {fr.contentWindow.document.body.onmousedown=function(){if(t._doOnFrameMouseDown)t._doOnFrameMouseDown();};}catch(e){};try{if(t._doOnFrameContentLoaded)t._doOnFrameContentLoaded();}catch(e){};}
 }
 }else {fr.onload = function() {try{fr.contentWindow.onmousedown=function(){if(t._doOnFrameMouseDown)t._doOnFrameMouseDown();};}catch(e){};try{if(t._doOnFrameContentLoaded)t._doOnFrameContentLoaded();}catch(e){};}
 }
 }

 this.obj._detachURLEvents = function() {if (_isIE){try {this.vs[this.av]._frame.onreadystatechange = null;this.vs[this.av]._frame.contentWindow.document.body.onmousedown = null;this.vs[this.av]._frame.onload = null;}catch(e) {};}else {try {this.vs[this.av]._frame.contentWindow.onmousedown = null;this.vs[this.av]._frame.onload = null;}catch(e) {};}
 }

 this.obj.showMenu = function() {if (!(this.vs[this.av].menu && this.vs[this.av].menuId)) return;if (document.getElementById(this.vs[this.av].menuId).style.display != "none") return;this.vs[this.av].menuHidden = false;if (this._doOnAttachMenu)this._doOnAttachMenu("show");document.getElementById(this.vs[this.av].menuId).style.display = "";this._viewRestore();}

 this.obj.hideMenu = function() {if (!(this.vs[this.av].menu && this.vs[this.av].menuId)) return;if (document.getElementById(this.vs[this.av].menuId).style.display == "none") return;document.getElementById(this.vs[this.av].menuId).style.display = "none";this.vs[this.av].menuHidden = true;if (this._doOnAttachMenu)this._doOnAttachMenu("hide");this._viewRestore();}

 this.obj.showToolbar = function() {if (!(this.vs[this.av].toolbar && this.vs[this.av].toolbarId)) return;if (document.getElementById(this.vs[this.av].toolbarId).style.display != "none") return;this.vs[this.av].toolbarHidden = false;if (this._doOnAttachToolbar)this._doOnAttachToolbar("show");document.getElementById(this.vs[this.av].toolbarId).style.display = "";this._viewRestore();}

 this.obj.hideToolbar = function() {if (!(this.vs[this.av].toolbar && this.vs[this.av].toolbarId)) return;if (document.getElementById(this.vs[this.av].toolbarId).style.display == "none") return;this.vs[this.av].toolbarHidden = true;document.getElementById(this.vs[this.av].toolbarId).style.display = "none";if (this._doOnAttachToolbar)this._doOnAttachToolbar("hide");this._viewRestore();}

 this.obj.showStatusBar = function() {if (!(this.vs[this.av].sb && this.vs[this.av].sbId)) return;if (document.getElementById(this.vs[this.av].sbId).style.display != "none") return;this.vs[this.av].sbHidden = false;if (this._doOnAttachStatusBar)this._doOnAttachStatusBar("show");document.getElementById(this.vs[this.av].sbId).style.display = "";this._viewRestore();}

 this.obj.hideStatusBar = function() {if (!(this.vs[this.av].sb && this.vs[this.av].sbId)) return;if (document.getElementById(this.vs[this.av].sbId).style.display == "none") return;this.vs[this.av].sbHidden = true;document.getElementById(this.vs[this.av].sbId).style.display = "none";if (this._doOnAttachStatusBar)this._doOnAttachStatusBar("hide");this._viewRestore();}

 this.obj._dhxContDestruct = function() {var av = this.av;for (var a in this.vs){this.av = a;this.detachMenu();this.detachToolbar();this.detachStatusBar();this.detachObject(true);this.vs[a].dhxcont.mainCont[a] = null;}

 for (var a in this.vs){this.vs[a].dhxcont.mainCont = null;this.vs[a].dhxcont.innerHTML = "";this.vs[a].dhxcont = null;this.vs[a] = null;}
 this.vs = null;this.attachMenu = null;this.attachToolbar = null;this.attachStatusBar = null;this.detachMenu = null;this.detachToolbar = null;this.detachStatusBar = null;this.showMenu = null;this.showToolbar = null;this.showStatusBar = null;this.hideMenu = null;this.hideToolbar = null;this.hideStatusBar = null;this.attachGrid = null;this.attachScheduler = null;this.attachTree = null;this.attachTabbar = null;this.attachFolders = null;this.attachAccordion = null;this.attachLayout = null;this.attachEditor = null;this.attachObject = null;this.detachObject = null;this.appendObject = null;this.attachHTMLString = null;this.attachURL = null;this.attachMap = null;this.view = null;this.show = null;this.adjust = null;this.setMinContentSize = null;this.moveContentTo = null;this.adjustContent = null;this.coverBlocker = null;this.showCoverBlocker = null;this.hideCoverBlocker = null;this.updateNestedObjects = null;this._attachContent = null;this._attachURLEvents = null;this._detachURLEvents = null;this._viewRestore = null;this._setPadding = null;this._init = null;this._genStr = null;this._dhxContDestruct = null;this._getSt = null;this.getFrame = null;this.getView = null;this.setActive = null;that.st.innerHTML = "";that.st.parentNode.removeChild(that.st);that.st = null;that.setContent = null;that.dhxcont = null;that.obj = null;that = null;if (dhtmlx.detaches)for (var a in dhtmlx.detaches)dhtmlx.detaches[a](this);}


 if (dhtmlx.attaches)for (var a in dhtmlx.attaches)this.obj[a] = dhtmlx.attaches[a];return this;}
function dataProcessor(serverProcessorURL){this.serverProcessor = serverProcessorURL;this.action_param="!nativeeditor_status";this.object = null;this.updatedRows = [];this.autoUpdate = true;this.updateMode = "cell";this._tMode="GET";this.post_delim = "_";this._waitMode=0;this._in_progress={};this._invalid={};this.mandatoryFields=[];this.messages=[];this.styles={updated:"font-weight:bold;",
 inserted:"font-weight:bold;",
 deleted:"text-decoration : line-through;",
 invalid:"background-color:FFE0E0;",
 invalid_cell:"border-bottom:2px solid red;",
 error:"color:red;",
 clear:"font-weight:normal;text-decoration:none;"
 };this.enableUTFencoding(true);dhtmlxEventable(this);return this;}
dataProcessor.prototype={setTransactionMode:function(mode,total){this._tMode=mode;this._tSend=total;},
 escape:function(data){if (this._utf)return encodeURIComponent(data);else
 return escape(data);},

 enableUTFencoding:function(mode){this._utf=convertStringToBoolean(mode);},

 setDataColumns:function(val){this._columns=(typeof val == "string")?val.split(","):val;},

 getSyncState:function(){return !this.updatedRows.length;},

 enableDataNames:function(mode){this._endnm=convertStringToBoolean(mode);},

 enablePartialDataSend:function(mode){this._changed=convertStringToBoolean(mode);},

 setUpdateMode:function(mode,dnd){this.autoUpdate = (mode=="cell");this.updateMode = mode;this.dnd=dnd;},
 ignore:function(code,master){this._silent_mode=true;code.call(master||window);this._silent_mode=false;},

 setUpdated:function(rowId,state,mode){if (this._silent_mode)return;var ind=this.findRow(rowId);mode=mode||"updated";var existing = this.obj.getUserData(rowId,this.action_param);if (existing && mode == "updated")mode=existing;if (state){this.set_invalid(rowId,false);this.updatedRows[ind]=rowId;this.obj.setUserData(rowId,this.action_param,mode);if (this._in_progress[rowId])this._in_progress[rowId]="wait";}else{if (!this.is_invalid(rowId)){this.updatedRows.splice(ind,1);this.obj.setUserData(rowId,this.action_param,"");}
 }

 if (!state)this._clearUpdateFlag(rowId);this.markRow(rowId,state,mode);if (state && this.autoUpdate)this.sendData(rowId);},
 _clearUpdateFlag:function(id){},
 markRow:function(id,state,mode){var str="";var invalid=this.is_invalid(id);if (invalid){str=this.styles[invalid];state=true;}
 if (this.callEvent("onRowMark",[id,state,mode,invalid])){str=this.styles[state?mode:"clear"]+str;this.obj[this._methods[0]](id,str);if (invalid && invalid.details){str+=this.styles[invalid+"_cell"];for (var i=0;i < invalid.details.length;i++)if (invalid.details[i])this.obj[this._methods[1]](id,i,str);}
 }
 },
 getState:function(id){return this.obj.getUserData(id,this.action_param);},
 is_invalid:function(id){return this._invalid[id];},
 set_invalid:function(id,mode,details){if (details)mode={value:mode, details:details, toString:function(){return this.value.toString();}};this._invalid[id]=mode;},

 checkBeforeUpdate:function(rowId){return true;},

 sendData:function(rowId){if (this._waitMode && (this.obj.mytype=="tree" || this.obj._h2)) return;if (this.obj.editStop)this.obj.editStop();if(typeof rowId == "undefined" || this._tSend)return this.sendAllData();if (this._in_progress[rowId])return false;this.messages=[];if (!this.checkBeforeUpdate(rowId)&& this.callEvent("onValidationError",[rowId,this.messages])) return false;this._beforeSendData(this._getRowData(rowId),rowId);},
 _beforeSendData:function(data,rowId){if (!this.callEvent("onBeforeUpdate",[rowId,this.getState(rowId),data])) return false;this._sendData(data,rowId);},
 serialize:function(data, id){if (typeof data == "string")return data;if (typeof id != "undefined")return this.serialize_one(data,"");else{var stack = [];var keys = [];for (var key in data)if (data.hasOwnProperty(key)){stack.push(this.serialize_one(data[key],key+this.post_delim));keys.push(key);}
 stack.push("ids="+this.escape(keys.join(",")));if (dhtmlx.security_key)stack.push("dhx_security="+dhtmlx.security_key);return stack.join("&");}
 },
 serialize_one:function(data, pref){if (typeof data == "string")return data;var stack = [];for (var key in data)if (data.hasOwnProperty(key))
 stack.push(this.escape((pref||"")+key)+"="+this.escape(data[key]));return stack.join("&");},
 _sendData:function(a1,rowId){if (!a1)return;if (!this.callEvent("onBeforeDataSending",rowId?[rowId,this.getState(rowId),a1]:[null, null, a1])) return false;if (rowId)this._in_progress[rowId]=(new Date()).valueOf();var a2=new dtmlXMLLoaderObject(this.afterUpdate,this,true);var a3 = this.serverProcessor+(this._user?(getUrlSymbol(this.serverProcessor)+["dhx_user="+this._user,"dhx_version="+this.obj.getUserData(0,"version")].join("&")):"");if (this._tMode!="POST")a2.loadXML(a3+((a3.indexOf("?")!=-1)?"&":"?")+this.serialize(a1,rowId));else
 a2.loadXML(a3,true,this.serialize(a1,rowId));this._waitMode++;},
 sendAllData:function(){if (!this.updatedRows.length)return;this.messages=[];var valid=true;for (var i=0;i<this.updatedRows.length;i++)valid&=this.checkBeforeUpdate(this.updatedRows[i]);if (!valid && !this.callEvent("onValidationError",["",this.messages])) return false;if (this._tSend)this._sendData(this._getAllData());else
 for (var i=0;i<this.updatedRows.length;i++)if (!this._in_progress[this.updatedRows[i]]){if (this.is_invalid(this.updatedRows[i])) continue;this._beforeSendData(this._getRowData(this.updatedRows[i]),this.updatedRows[i]);if (this._waitMode && (this.obj.mytype=="tree" || this.obj._h2)) return;}
 },








 _getAllData:function(rowId){var out={};var has_one = false;for(var i=0;i<this.updatedRows.length;i++){var id=this.updatedRows[i];if (this._in_progress[id] || this.is_invalid(id)) continue;if (!this.callEvent("onBeforeUpdate",[id,this.getState(id)])) continue;out[id]=this._getRowData(id,id+this.post_delim);has_one = true;this._in_progress[id]=(new Date()).valueOf();}
 return has_one?out:null;},



 setVerificator:function(ind,verifFunction){this.mandatoryFields[ind] = verifFunction||(function(value){return (value!="");});},

 clearVerificator:function(ind){this.mandatoryFields[ind] = false;},





 findRow:function(pattern){var i=0;for(i=0;i<this.updatedRows.length;i++)if(pattern==this.updatedRows[i])break;return i;},












 defineAction:function(name,handler){if (!this._uActions)this._uActions=[];this._uActions[name]=handler;},





 afterUpdateCallback:function(sid, tid, action, btag) {var marker = sid;var correct=(action!="error" && action!="invalid");if (!correct)this.set_invalid(sid,action);if ((this._uActions)&&(this._uActions[action])&&(!this._uActions[action](btag)))
 return (delete this._in_progress[marker]);if (this._in_progress[marker]!="wait")this.setUpdated(sid, false);var soid = sid;switch (action) {case "inserted":
 case "insert":
 if (tid != sid){this.obj[this._methods[2]](sid, tid);sid = tid;}
 break;case "delete":
 case "deleted":
 this.obj.setUserData(sid, this.action_param, "true_deleted");this.obj[this._methods[3]](sid);delete this._in_progress[marker];return this.callEvent("onAfterUpdate", [sid, action, tid, btag]);break;}

 if (this._in_progress[marker]!="wait"){if (correct)this.obj.setUserData(sid, this.action_param,'');delete this._in_progress[marker];}else {delete this._in_progress[marker];this.setUpdated(tid,true,this.obj.getUserData(sid,this.action_param));}

 this.callEvent("onAfterUpdate", [sid, action, tid, btag]);},


 afterUpdate:function(that,b,c,d,xml){xml.getXMLTopNode("data");if (!xml.xmlDoc.responseXML)return;var atag=xml.doXPath("//data/action");for (var i=0;i<atag.length;i++){var btag=atag[i];var action = btag.getAttribute("type");var sid = btag.getAttribute("sid");var tid = btag.getAttribute("tid");that.afterUpdateCallback(sid,tid,action,btag);}
 that.finalizeUpdate();},
 finalizeUpdate:function(){if (this._waitMode)this._waitMode--;if ((this.obj.mytype=="tree" || this.obj._h2)&& this.updatedRows.length)
 this.sendData();this.callEvent("onAfterUpdateFinish",[]);if (!this.updatedRows.length)this.callEvent("onFullSync",[]);},






 init:function(anObj){this.obj = anObj;if (this.obj._dp_init)this.obj._dp_init(this);},


 setOnAfterUpdate:function(ev){this.attachEvent("onAfterUpdate",ev);},
 enableDebug:function(mode){},
 setOnBeforeUpdateHandler:function(func){this.attachEvent("onBeforeDataSending",func);},




 setAutoUpdate: function(interval, user) {interval = interval || 2000;this._user = user || (new Date()).valueOf();this._need_update = false;this._loader = null;this._update_busy = false;this.attachEvent("onAfterUpdate",function(sid,action,tid,xml_node){this.afterAutoUpdate(sid, action, tid, xml_node);});this.attachEvent("onFullSync",function(){this.fullSync();});var self = this;window.setInterval(function(){self.loadUpdate();}, interval);},



 afterAutoUpdate: function(sid, action, tid, xml_node) {if (action == 'collision'){this._need_update = true;return false;}else {return true;}
 },



 fullSync: function() {if (this._need_update == true){this._need_update = false;this.loadUpdate();}
 return true;},



 getUpdates: function(url,callback){if (this._update_busy)return false;else
 this._update_busy = true;this._loader = this._loader || new dtmlXMLLoaderObject(true);this._loader.async=true;this._loader.waitCall=callback;this._loader.loadXML(url);},



 _v: function(node) {if (node.firstChild)return node.firstChild.nodeValue;return "";},



 _a: function(arr) {var res = [];for (var i=0;i < arr.length;i++){res[i]=this._v(arr[i]);};return res;},



 loadUpdate: function(){var self = this;var version = this.obj.getUserData(0,"version");var url = this.serverProcessor+getUrlSymbol(this.serverProcessor)+["dhx_user="+this._user,"dhx_version="+version].join("&");url = url.replace("editing=true&","");this.getUpdates(url, function(){var vers = self._loader.doXPath("//userdata");self.obj.setUserData(0,"version",self._v(vers[0]));var upds = self._loader.doXPath("//update");if (upds.length){self._silent_mode = true;for (var i=0;i<upds.length;i++){var status = upds[i].getAttribute('status');var id = upds[i].getAttribute('id');var parent = upds[i].getAttribute('parent');switch (status) {case 'inserted':
 self.callEvent("insertCallback",[upds[i], id, parent]);break;case 'updated':
 self.callEvent("updateCallback",[upds[i], id, parent]);break;case 'deleted':
 self.callEvent("deleteCallback",[upds[i], id, parent]);break;}
 }

 self._silent_mode = false;}

 self._update_busy = false;self = null;});}
};window.dhx||(dhx={});dhx.version="3.0";dhx.codebase="./";dhx.name="Core";dhx.clone=function(a){var b=dhx.clone.ua;b.prototype=a;return new b};dhx.clone.ua=function(){};dhx.extend=function(a,b,c){if(a.o)return dhx.PowerArray.insertAt.call(a.o,b,1),a;for(var d in b)if(!a[d]||c)a[d]=b[d];b.defaults&&dhx.extend(a.defaults,b.defaults);b.$init&&b.$init.call(a);return a};dhx.copy=function(a){var b=a.length?[]:{};arguments.length>1&&(b=arguments[0],a=arguments[1]);for(var c in a)a[c]&&typeof a[c]=="object"&&!dhx.isDate(a[c])?(b[c]=a[c].length?[]:{},dhx.copy(b[c],a[c])):b[c]=a[c];return b};dhx.single=function(a){var b=null,c=function(c){b||(b=new a({}));b.Fa&&b.Fa.apply(b,arguments);return b};return c};dhx.protoUI=function(){var a=arguments,b=a[0].name,c=function(a){if(!c)return dhx.ui[b].prototype;var e=c.o;if(e){for(var f=[e[0]],g=1;g<e.length;g++)f[g]=e[g],f[g].o&&(f[g]=f[g].call(dhx,f[g].name)),f[g].prototype&&f[g].prototype.name&&(dhx.ui[f[g].prototype.name]=f[g]);dhx.ui[b]=dhx.proto.apply(dhx,f);if(c.p)for(g=0;g<c.p.length;g++)dhx.Type(dhx.ui[b],c.p[g]);c=e=null}return this!=dhx?new dhx.ui[b](a):dhx.ui[b]};c.o=Array.prototype.slice.call(arguments,0);return dhx.ui[b]=c};dhx.proto=function(){for(var a=arguments,b=a[0],c=!!b.$init,d=[],e=a.length-1;e>0;e--){if(typeof a[e]=="function")a[e]=a[e].prototype;a[e].$init&&d.push(a[e].$init);if(a[e].defaults){var f=a[e].defaults;if(!b.defaults)b.defaults={};for(var g in f)dhx.isUndefined(b.defaults[g])&&(b.defaults[g]=f[g])}if(a[e].type&&b.type)for(g in a[e].type)b.type[g]||(b.type[g]=a[e].type[g]);for(var i in a[e])b[i]||(b[i]=a[e][i])}c&&d.push(b.$init);b.$init=function(){for(var a=0;a<d.length;a++)d[a].apply(this,arguments)};var h=function(a){this.$ready=[];this.$init(a);this.X&&this.X(a,this.defaults);for(var b=0;b<this.$ready.length;b++)this.$ready[b].call(this)};h.prototype=b;b=a=null;return h};dhx.bind=function(a,b){return function(){return a.apply(b,arguments)}};dhx.require=function(a){dhx.V[a]||(dhx.exec(dhx.ajax().sync().get(dhx.codebase+a).responseText),dhx.V[a]=!0)};dhx.V={};dhx.exec=function(a){window.execScript?window.execScript(a):window.eval(a)};dhx.wrap=function(a,b){return!a?b:function(){var c=a.apply(this,arguments);b.apply(this,arguments);return c}};dhx.isUndefined=function(a){return typeof a=="undefined"};dhx.delay=function(a,b,c,d){return window.setTimeout(function(){var d=a.apply(b,c||[]);a=b=c=null;return d},d||1)};dhx.uid=function(){if(!this.N)this.N=(new Date).valueOf();this.N++;return this.N};dhx.toNode=function(a){return typeof a=="string"?document.getElementById(a):a};dhx.toArray=function(a){return dhx.extend(a||[],dhx.PowerArray,!0)};dhx.toFunctor=function(a){return typeof a=="string"?eval(a):a};dhx.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"};dhx.isDate=function(a){return a instanceof Date};dhx.H={};dhx.event=function(a,b,c,d){var a=dhx.toNode(a),e=dhx.uid();d&&(c=dhx.bind(c,d));dhx.H[e]=[a,b,c];a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c);return e};dhx.eventRemove=function(a){if(a){var b=dhx.H[a];b[0].removeEventListener?b[0].removeEventListener(b[1],b[2],!1):b[0].detachEvent&&b[0].detachEvent("on"+b[1],b[2]);delete this.H[a]}};dhx.EventSystem={$init:function(){if(!this.d)this.d={},this.q={},this.I={}},blockEvent:function(){this.d.P=!0},unblockEvent:function(){this.d.P=!1},mapEvent:function(a){dhx.extend(this.I,a,!0)},on_setter:function(a){if(a)for(var b in a)typeof a[b]=="function"&&this.attachEvent(b,a[b])},callEvent:function(a,b){if(this.d.P)return!0;var a=a.toLowerCase(),c=this.d[a.toLowerCase()],d=!0;if(c)for(var e=0;e<c.length;e++)if(c[e].apply(this,b||[])===!1)d=!1;this.I[a]&&!this.I[a].callEvent(a,b)&&(d=!1);return d},
attachEvent:function(a,b,c){var a=a.toLowerCase(),c=c||dhx.uid(),b=dhx.toFunctor(b),d=this.d[a]||dhx.toArray();d.push(b);this.d[a]=d;this.q[c]={f:b,t:a};return c},detachEvent:function(a){if(this.q[a]){var b=this.q[a].t,c=this.q[a].f,d=this.d[b];d.remove(c);delete this.q[a]}},hasEvent:function(a){a=a.toLowerCase();return this.d[a]?!0:!1}};dhx.extend(dhx,dhx.EventSystem);dhx.PowerArray={removeAt:function(a,b){a>=0&&this.splice(a,b||1)},remove:function(a){this.removeAt(this.find(a))},insertAt:function(a,b){if(!b&&b!==0)this.push(a);else{var c=this.splice(b,this.length-b);this[b]=a;this.push.apply(this,c)}},find:function(a){for(var b=0;b<this.length;b++)if(a==this[b])return b;return-1},each:function(a,b){for(var c=0;c<this.length;c++)a.call(b||this,this[c])},map:function(a,b){for(var c=0;c<this.length;c++)this[c]=a.call(b||this,this[c]);return this}};dhx.env={};(function(){if(navigator.userAgent.indexOf("Mobile")!=-1)dhx.env.mobile=!0;if(dhx.env.mobile||navigator.userAgent.indexOf("iPad")!=-1||navigator.userAgent.indexOf("Android")!=-1)dhx.env.touch=!0;navigator.userAgent.indexOf("Opera")!=-1?dhx.env.isOpera=!0:(dhx.env.isIE=!!document.all,dhx.env.isFF=!document.all,dhx.env.isWebKit=navigator.userAgent.indexOf("KHTML")!=-1,dhx.env.isSafari=dhx.env.isWebKit&&navigator.userAgent.indexOf("Mac")!=-1);if(navigator.userAgent.toLowerCase().indexOf("android")!=
-1)dhx.env.isAndroid=!0;dhx.env.transform=!1;dhx.env.transition=!1;for(var a={names:["transform","transition"],transform:["transform","WebkitTransform","MozTransform","OTransform","msTransform"],transition:["transition","WebkitTransition","MozTransition","OTransition","msTransition"]},b=document.createElement("DIV"),c=0;c<a.names.length;c++)for(var d=a[a.names[c]],e=0;e<d.length;e++)if(typeof b.style[d[e]]!="undefined"){dhx.env[a.names[c]]=d[e];break}b.style[dhx.env.transform]="translate3d(0,0,0)";dhx.env.translate=b.style[dhx.env.transform]?"translate3d":"translate";var f="",g=!1;dhx.env.isOpera&&(f="-o-",g="O");dhx.env.isFF&&(f="-Moz-");dhx.env.isWebKit&&(f="-webkit-");dhx.env.isIE&&(f="-ms-");dhx.env.transformCSSPrefix=f;dhx.env.transformPrefix=g||dhx.env.transformCSSPrefix.replace(/-/gi,"");dhx.env.transitionEnd=dhx.env.transformCSSPrefix=="-Moz-"?"transitionend":dhx.env.transformPrefix+"TransitionEnd"})();dhx.env.svg=function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")}();dhx.html={s:0,denySelect:function(){if(!dhx.s)dhx.s=document.onselectstart;document.onselectstart=dhx.html.stopEvent},allowSelect:function(){if(dhx.s!==0)document.onselectstart=dhx.s||null;dhx.s=0},index:function(a){for(var b=0;a=a.previousSibling;)b++;return b},da:{},createCss:function(a){var b="",c;for(c in a)b+=c+":"+a[c]+";";var d=this.da[b];d||(d="s"+dhx.uid(),this.addStyle("."+d+"{"+b+"}"),this.da[b]=d);return d},addStyle:function(a){var b=document.createElement("style");b.setAttribute("type",
"text/css");b.setAttribute("media","screen");b.styleSheet?b.styleSheet.cssText=a:b.appendChild(document.createTextNode(a));document.getElementsByTagName("head")[0].appendChild(b)},create:function(a,b,c){var b=b||{},d=document.createElement(a),e;for(e in b)d.setAttribute(e,b[e]);if(b.style)d.style.cssText=b.style;if(b["class"])d.className=b["class"];if(c)d.innerHTML=c;return d},getValue:function(a){a=dhx.toNode(a);return!a?"":dhx.isUndefined(a.value)?a.innerHTML:a.value},remove:function(a){if(a instanceof
Array)for(var b=0;b<a.length;b++)this.remove(a[b]);else a&&a.parentNode&&a.parentNode.removeChild(a)},insertBefore:function(a,b,c){a&&(b&&b.parentNode?b.parentNode.insertBefore(a,b):c.appendChild(a))},locate:function(a,b){if(a.tagName)var c=a;else a=a||event,c=a.target||a.srcElement;for(;c;){if(c.getAttribute){var d=c.getAttribute(b);if(d)return d}c=c.parentNode}return null},offset:function(a){if(a.getBoundingClientRect){var b=a.getBoundingClientRect(),c=document.body,d=document.documentElement,e=
window.pageYOffset||d.scrollTop||c.scrollTop,f=window.pageXOffset||d.scrollLeft||c.scrollLeft,g=d.clientTop||c.clientTop||0,i=d.clientLeft||c.clientLeft||0,h=b.top+e-g,j=b.left+f-i;return{y:Math.round(h),x:Math.round(j)}}else{for(j=h=0;a;)h+=parseInt(a.offsetTop,10),j+=parseInt(a.offsetLeft,10),a=a.offsetParent;return{y:h,x:j}}},posRelative:function(a){a=a||event;return dhx.isUndefined(a.offsetX)?{x:a.layerX,y:a.layerY}:{x:a.offsetX,y:a.offsetY}},pos:function(a){a=a||event;if(a.pageX||a.pageY)return{x:a.pageX,
y:a.pageY};var b=dhx.env.isIE&&document.compatMode!="BackCompat"?document.documentElement:document.body;return{x:a.clientX+b.scrollLeft-b.clientLeft,y:a.clientY+b.scrollTop-b.clientTop}},preventEvent:function(a){a&&a.preventDefault&&a.preventDefault();return dhx.html.stopEvent(a)},stopEvent:function(a){(a||event).cancelBubble=!0;return!1},addCss:function(a,b){a.className+=" "+b},removeCss:function(a,b){a.className=a.className.replace(RegExp(" "+b,"g"),"")}};dhx.ready=function(a){this.Da?a.call():this.B.push(a)};dhx.B=[];(function(){var a=document.getElementsByTagName("SCRIPT");if(a.length)a=(a[a.length-1].getAttribute("src")||"").split("/"),a.splice(a.length-1,1),dhx.codebase=a.slice(0,a.length).join("/")+"/";dhx.event(window,"load",function(){dhx.callEvent("onReady",[]);dhx.delay(function(){dhx.Da=!0;for(var a=0;a<dhx.B.length;a++)dhx.B[a].call();dhx.B=[]})})})();dhx.locale=dhx.locale||{};dhx.ready(function(){dhx.event(document.body,"click",function(a){dhx.callEvent("onClick",[a||event])})});(function(){var a={},b=RegExp("(\\r\\n|\\n)","g"),c=RegExp('(\\")',"g");dhx.Template=function(d){if(typeof d=="function")return d;if(a[d])return a[d];d=(d||"").toString();if(d.indexOf("->")!=-1)switch(d=d.split("->"),d[0]){case "html":d=dhx.html.getValue(d[1]);break;case "http":d=(new dhx.ajax).sync().get(d[1],{uid:dhx.uid()}).responseText}d=(d||"").toString();d=d.replace(b,"\\n");d=d.replace(c,'\\"');d=d.replace(/\{obj\.([^}?]+)\?([^:]*):([^}]*)\}/g,'"+(obj.$1?"$2":"$3")+"');d=d.replace(/\{common\.([^}\(]*)\}/g,
"\"+(common.$1||'')+\"");d=d.replace(/\{common\.([^\}\(]*)\(\)\}/g,'"+(common.$1?common.$1(obj,common):"")+"');d=d.replace(/\{obj\.([^}]*)\}/g,'"+(obj.$1)+"');d=d.replace("{obj}",'"+obj+"');d=d.replace(/#([^#'";, ]+)#/gi,'"+(obj.$1)+"');try{a[d]=Function("obj","common",'return "'+d+'";')}catch(e){}return a[d]};dhx.Template.empty=function(){return""};dhx.Template.bind=function(a){return dhx.bind(dhx.Template(a),this)};dhx.Type=function(a,b){if(a.o){if(!a.p)a.p=[];a.p.push(b)}else{if(typeof a=="function")a=
a.prototype;if(!a.types)a.types={"default":a.type},a.type.name="default";var c=b.name,g=a.type;c&&(g=a.types[c]=dhx.clone(b.baseType?a.types[b.baseType]:a.type));for(var i in b)g[i]=i.indexOf("template")===0?dhx.Template(b[i]):b[i];return c}}})();dhx.Settings={$init:function(){this.a=this.config={}},define:function(a,b){return typeof a=="object"?this.M(a):this.Q(a,b)},Q:function(a,b){var c=this[a+"_setter"];return this.a[a]=c?c.call(this,b,a):b},M:function(a){if(a)for(var b in a)this.Q(b,a[b])},X:function(a,b){var c={};b&&(c=dhx.extend(c,b));typeof a=="object"&&!a.tagName&&dhx.extend(c,a,!0);this.M(c)},ya:function(a,b){for(var c in b)switch(typeof a[c]){case "object":a[c]=this.ya(a[c]||{},b[c]);break;case "undefined":a[c]=b[c]}return a}};dhx.ajax=function(a,b,c){if(arguments.length!==0){var d=new dhx.ajax;if(c)d.master=c;return d.get(a,null,b)}return!this.getXHR?new dhx.ajax:this};dhx.ajax.count=0;dhx.ajax.prototype={master:null,getXHR:function(){return dhx.env.isIE?new ActiveXObject("Microsoft.xmlHTTP"):new XMLHttpRequest},send:function(a,b,c){var d=this.getXHR();dhx.isArray(c)||(c=[c]);if(typeof b=="object"){var e=[],f;for(f in b){var g=b[f];if(g===null||g===dhx.undefined)g="";e.push(f+"="+encodeURIComponent(g))}b=e.join("&")}b&&this.request==="GET"&&(a=a+(a.indexOf("?")!=-1?"&":"?")+b,b=null);d.open(this.request,a,!this.Ka);this.request==="POST"&&d.setRequestHeader("Content-type","application/x-www-form-urlencoded");var i=this;d.onreadystatechange=function(){if(!d.readyState||d.readyState==4){dhx.ajax.count++;if(c&&i)for(var a=0;a<c.length;a++)if(c[a]){var b=c[a].success||c[a];if(d.status>=400||!d.status&&!d.responseText)b=c[a].error;b&&b.call(i.master||i,d.responseText,d.responseXML,d)}c=i=i.master=null}};d.send(b||null);return d},get:function(a,b,c){this.request="GET";return this.send(a,b,c)},post:function(a,b,c){this.request="POST";return this.send(a,b,c)},put:function(a,b,c){this.request="PUT";return this.send(a,
b,c)},del:function(a,b,c){this.request="DELETE";return this.send(a,b,c)},sync:function(){this.Ka=!0;return this},bind:function(a){this.master=a;return this}};dhx.send=function(a,b,c){var d=dhx.html.create("FORM",{action:a,method:c||"POST"},""),e;for(e in b){var f=dhx.html.create("INPUT",{type:"hidden",name:e,value:b[e]},"");d.appendChild(f)}d.style.display="none";document.body.appendChild(d);d.submit();document.body.removeChild(d)};dhx.AtomDataLoader={$init:function(a){this.data={};if(a)this.a.datatype=a.datatype||"json",this.$ready.push(this.xa)},xa:function(){this.Y=!0;this.a.url&&this.url_setter(this.a.url);this.a.data&&this.data_setter(this.a.data)},url_setter:function(a){if(!this.Y)return a;this.load(a,this.a.datatype);return a},data_setter:function(a){if(!this.Y)return a;this.parse(a,this.a.datatype);return!0},load:function(a,b,c){if(a.$proxy)a.load(this,typeof b=="string"?b:"json");else{this.callEvent("onXLS",[]);if(typeof b==
"string")this.data.driver=dhx.DataDriver[b],b=c;else if(!this.data.driver)this.data.driver=dhx.DataDriver.json;var d=[{success:this.L,error:this.A}];b&&(dhx.isArray(b)?d.push.apply(d,b):d.push(b));return dhx.ajax(a,d,this)}},parse:function(a,b){this.callEvent("onXLS",[]);this.data.driver=dhx.DataDriver[b||"json"];this.L(a,null)},L:function(a,b,c){var d=this.data.driver,e=d.toObject(a,b);if(e){var f=d.getRecords(e)[0];this.data=d?d.getDetails(f):a}else this.A(a,b,c);this.callEvent("onXLE",[])},A:function(a,
b,c){this.callEvent("onXLE",[]);this.callEvent("onLoadError",arguments);dhx.callEvent("onLoadError",[a,b,c,this])},v:function(a){if(!this.a.dataFeed||this.J||!a)return!0;var b=this.a.dataFeed;if(typeof b=="function")return b.call(this,a.id||a,a);b=b+(b.indexOf("?")==-1?"?":"&")+"action=get&id="+encodeURIComponent(a.id||a);this.callEvent("onXLS",[]);dhx.ajax(b,function(a,b,e){this.J=!0;var f=dhx.DataDriver.toObject(a,b);f?this.setValues(f.getDetails(f.getRecords()[0])):this.A(a,b,e);this.J=!1;this.callEvent("onXLE",
[])},this);return!1}};dhx.DataDriver={};dhx.DataDriver.json={toObject:function(a){a||(a="[]");if(typeof a=="string"){try{eval("dhx.temp="+a)}catch(b){return null}a=dhx.temp}if(a.data){var c=a.data.config={},d;for(d in a)d!="data"&&(c[d]=a[d]);a=a.data}return a},getRecords:function(a){return a&&!dhx.isArray(a)?[a]:a},getDetails:function(a){return typeof a=="string"?{id:dhx.uid(),value:a}:a},getInfo:function(a){var b=a.config;return!b?{}:{k:b.total_count||0,j:b.pos||0,Ba:b.parent||0,G:b.config,K:b.dhx_security}},child:"data"};dhx.DataDriver.html={toObject:function(a){if(typeof a=="string"){var b=null;a.indexOf("<")==-1&&(b=dhx.toNode(a));if(!b)b=document.createElement("DIV"),b.innerHTML=a;return b.getElementsByTagName(this.tag)}return a},getRecords:function(a){for(var b=[],c=0;c<a.childNodes.length;c++){var d=a.childNodes[c];d.nodeType==1&&b.push(d)}return b},getDetails:function(a){return dhx.DataDriver.xml.tagToObject(a)},getInfo:function(){return{k:0,j:0}},tag:"LI"};dhx.DataDriver.jsarray={toObject:function(a){return typeof a=="string"?(eval("dhx.temp="+a),dhx.temp):a},getRecords:function(a){return a},getDetails:function(a){for(var b={},c=0;c<a.length;c++)b["data"+c]=a[c];return b},getInfo:function(){return{k:0,j:0}}};dhx.DataDriver.csv={toObject:function(a){return a},getRecords:function(a){return a.split(this.row)},getDetails:function(a){for(var a=this.stringToArray(a),b={},c=0;c<a.length;c++)b["data"+c]=a[c];return b},getInfo:function(){return{k:0,j:0}},stringToArray:function(a){for(var a=a.split(this.cell),b=0;b<a.length;b++)a[b]=a[b].replace(/^[ \t\n\r]*(\"|)/g,"").replace(/(\"|)[ \t\n\r]*$/g,"");return a},row:"\n",cell:","};dhx.DataDriver.xml={U:function(a){return!a||!a.documentElement?null:a.getElementsByTagName("parsererror").length?null:a},toObject:function(a){if(this.U(b))return b;var b=typeof a=="string"?this.fromString(a.replace(/^[\s]+/,"")):a;return this.U(b)?b:null},getRecords:function(a){return this.xpath(a,this.records)},records:"/*/item",child:"item",config:"/*/config",getDetails:function(a){return this.tagToObject(a,{})},getInfo:function(a){var b=this.xpath(a,this.config),b=b.length?this.assignTypes(this.tagToObject(b[0],
{})):null;return{k:a.documentElement.getAttribute("total_count")||0,j:a.documentElement.getAttribute("pos")||0,Ba:a.documentElement.getAttribute("parent")||0,G:b,K:a.documentElement.getAttribute("dhx_security")||null}},xpath:function(a,b){if(window.XPathResult){var c=a;if(a.nodeName.indexOf("document")==-1)a=a.ownerDocument;for(var d=[],e=a.evaluate(b,c,null,XPathResult.ANY_TYPE,null),f=e.iterateNext();f;)d.push(f),f=e.iterateNext();return d}else{var g=!0;try{typeof a.selectNodes=="undefined"&&(g=
!1)}catch(i){}if(g)return a.selectNodes(b);else{var h=b.split("/").pop();return a.getElementsByTagName(h)}}},assignTypes:function(a){for(var b in a){var c=a[b];typeof c=="object"?this.assignTypes(c):typeof c=="string"&&c!==""&&(c=="true"?a[b]=!0:c=="false"?a[b]=!1:c==c*1&&(a[b]*=1))}return a},tagToObject:function(a,b){var b=b||{},c=!1,d=a.attributes;if(d&&d.length){for(var e=0;e<d.length;e++)b[d[e].name]=d[e].value;c=!0}for(var f=a.childNodes,g={},e=0;e<f.length;e++)if(f[e].nodeType==1){var i=f[e].tagName;typeof b[i]!="undefined"?(dhx.isArray(b[i])||(b[i]=[b[i]]),b[i].push(this.tagToObject(f[e],{}))):b[f[e].tagName]=this.tagToObject(f[e],{});c=!0}if(!c)return this.nodeValue(a);b.value=b.value||this.nodeValue(a);return b},nodeValue:function(a){return a.firstChild?a.firstChild.data:""},fromString:function(a){try{if(window.DOMParser)return(new DOMParser).parseFromString(a,"text/xml");if(window.ActiveXObject){var b=new ActiveXObject("Microsoft.xmlDOM");b.loadXML(a);return b}}catch(c){return null}}};dhx.DataLoader=dhx.proto({$init:function(a){a=a||"";this.l=dhx.toArray();this.data=new dhx.DataStore;this.data.attachEvent("onClearAll",dhx.bind(this.la,this));this.data.attachEvent("onServerConfig",dhx.bind(this.ka,this));this.data.feed=this.pa},pa:function(a,b,c){if(this.r)return this.r=[a,b,c];else this.r=!0;this.S=[a,b];this.ra.call(this,a,b,c)},ra:function(a,b,c){var d=this.data.url;a<0&&(a=0);this.load(d+(d.indexOf("?")==-1?"?":"&")+(this.dataCount()?"continue=true&":"")+"start="+a+"&count="+
b,[this.qa,c])},qa:function(){var a=this.r,b=this.S;this.r=!1;typeof a=="object"&&(a[0]!=b[0]||a[1]!=b[1])&&this.data.feed.apply(this,a)},load:function(a,b){var c=dhx.AtomDataLoader.load.apply(this,arguments);this.l.push(c);if(!this.data.url)this.data.url=a},loadNext:function(a,b,c,d,e){this.a.datathrottle&&!e?(this.ea&&window.clearTimeout(this.ea),this.ea=dhx.delay(function(){this.loadNext(a,b,c,d,!0)},this,0,this.a.datathrottle)):(!b&&b!==0&&(b=this.dataCount()),this.data.url=this.data.url||d,this.callEvent("onDataRequest",
[b,a,c,d])&&this.data.url&&this.data.feed.call(this,b,a,c))},Na:function(a,b){var c=this.S;return this.r&&c&&c[0]<=b&&c[1]+c[0]>=a+b?!0:!1},L:function(a,b,c){this.l.remove(c);var d=this.data.driver.toObject(a,b);if(d)this.data.Ca(d);else return this.A(a,b,c);this.ma();this.callEvent("onXLE",[])},removeMissed_setter:function(a){return this.data.Ga=a},scheme_setter:function(a){this.data.scheme(a)},dataFeed_setter:function(a){this.data.attachEvent("onBeforeFilter",dhx.bind(function(a,c){if(this.a.dataFeed){var d=
{};if(a||c){if(typeof a=="function"){if(!c)return;a(c,d)}else d={text:c};this.clearAll();var e=this.a.dataFeed,f=[];if(typeof e=="function")return e.call(this,c,d);for(var g in d)f.push("dhx_filter["+g+"]="+encodeURIComponent(d[g]));this.load(e+(e.indexOf("?")<0?"?":"&")+f.join("&"),this.a.datatype);return!1}}},this));return a},ma:function(){if(this.a.ready&&!this.Ea){var a=dhx.toFunctor(this.a.ready);a&&dhx.delay(a,this,arguments);this.Ea=!0}},la:function(){for(var a=0;a<this.l.length;a++)this.l[a].abort();this.l=dhx.toArray()},ka:function(a){this.M(a)}},dhx.AtomDataLoader);dhx.DataStore=function(){this.name="DataStore";dhx.extend(this,dhx.EventSystem);this.setDriver("json");this.pull={};this.order=dhx.toArray()};dhx.DataStore.prototype={setDriver:function(a){this.driver=dhx.DataDriver[a]},Ca:function(a){this.callEvent("onParse",[this.driver,a]);this.c&&this.filter();var b=this.driver.getInfo(a);if(b.K)dhx.securityKey=b.K;b.G&&this.callEvent("onServerConfig",[b.G]);var c=this.driver.getRecords(a);this.wa(b,c);this.Z&&this.va&&this.va(this.Z);this.aa&&(this.blockEvent(),this.sort(this.aa),this.unblockEvent());this.callEvent("onStoreLoad",[this.driver,a]);this.refresh()},wa:function(a,b){var c=(a.j||0)*1,d=
!0,e=!1;if(c===0&&this.order[0]){if(this.Ga)for(var e={},f=0;f<this.order.length;f++)e[this.order[f]]=!0;d=!1;c=this.order.length}for(var g=0,f=0;f<b.length;f++){var i=this.driver.getDetails(b[f]),h=this.id(i);this.pull[h]?d&&this.order[g+c]&&g++:(this.order[g+c]=h,g++);this.pull[h]?(dhx.extend(this.pull[h],i,!0),this.D&&this.D(this.pull[h]),e&&delete e[h]):(this.pull[h]=i,this.C&&this.C(i))}if(e){this.blockEvent();for(var j in e)this.remove(j);this.unblockEvent()}if(!this.order[a.k-1])this.order[a.k-
1]=dhx.undefined},id:function(a){return a.id||(a.id=dhx.uid())},changeId:function(a,b){this.pull[a]&&(this.pull[b]=this.pull[a]);this.pull[b].id=b;this.order[this.order.find(a)]=b;this.c&&(this.c[this.c.find(a)]=b);this.callEvent("onIdChange",[a,b]);this.Ha&&this.Ha(a,b);delete this.pull[a]},item:function(a){return this.pull[a]},update:function(a,b){dhx.isUndefined(b)&&(b=this.item(a));this.D&&this.D(b);if(this.callEvent("onBeforeUpdate",[a,b])===!1)return!1;this.pull[a]=b;this.callEvent("onStoreUpdated",
[a,b,"update"])},refresh:function(a){this.ca||(a?this.callEvent("onStoreUpdated",[a,this.pull[a],"paint"]):this.callEvent("onStoreUpdated",[null,null,null]))},silent:function(a,b){this.ca=!0;a.call(b||this);this.ca=!1},getRange:function(a,b){a=a?this.indexById(a):this.$min||this.startOffset||0;b?b=this.indexById(b):(b=Math.min(this.$max||this.endOffset||Infinity,this.dataCount()-1),b<0&&(b=0));if(a>b)var c=b,b=a,a=c;return this.getIndexRange(a,b)},getIndexRange:function(a,b){for(var b=Math.min(b||
Infinity,this.dataCount()-1),c=dhx.toArray(),d=a||0;d<=b;d++)c.push(this.item(this.order[d]));return c},dataCount:function(){return this.order.length},exists:function(a){return!!this.pull[a]},move:function(a,b){var c=this.idByIndex(a),d=this.item(c);this.order.removeAt(a);this.order.insertAt(c,Math.min(this.order.length,b));this.callEvent("onStoreUpdated",[c,d,"move"])},scheme:function(a){this.Oa=a;this.C=a.$init;this.D=a.$update;this.$=a.$serialize;if(a.$group)this.Z=a.$group;this.aa=a.$sort;delete a.$init;delete a.$update;delete a.$serialize;delete a.$group;delete a.$sort},sync:function(a,b,c){typeof b!="function"&&(c=b,b=null);if(a.name!="DataStore")a=a.data;var d=dhx.bind(function(){this.order=dhx.toArray([].concat(a.order));this.c=null;this.pull=a.pull;b&&this.silent(b);this.W&&this.W();c?c=!1:this.refresh()},this);this.u=[a.attachEvent("onStoreUpdated",d)];d()},add:function(a,b){this.C&&this.C(a);var c=this.id(a),d=this.order.length;if(dhx.isUndefined(b)||b<0)b=d;b>d&&(b=Math.min(this.order.length,
b));if(this.callEvent("onBeforeAdd",[c,a,b])===!1)return!1;this.pull[c]=a;this.order.insertAt(c,b);if(this.c){var e=this.c.length;!b&&this.order.length&&(e=0);this.c.insertAt(c,e)}this.callEvent("onAfterAdd",[c,b]);this.callEvent("onStoreUpdated",[c,a,"add"]);return c},remove:function(a){if(dhx.isArray(a))for(var b=0;b<a.length;b++)this.remove(a[b]);else{if(this.callEvent("onBeforeDelete",[a])===!1)return!1;var c=this.item(a);this.order.remove(a);this.c&&this.c.remove(a);delete this.pull[a];this.callEvent("onAfterDelete",
[a]);this.callEvent("onStoreUpdated",[a,c,"delete"])}},clearAll:function(){this.pull={};this.order=dhx.toArray();this.c=null;this.callEvent("onClearAll",[]);this.refresh()},idByIndex:function(a){return this.order[a]},indexById:function(a){var b=this.order.find(a);return b},next:function(a,b){return this.order[this.indexById(a)+(b||1)]},first:function(){return this.order[0]},last:function(){return this.order[this.order.length-1]},previous:function(a,b){return this.order[this.indexById(a)-(b||1)]},
sort:function(a,b,c){var d=a;typeof a=="function"?d={as:a,dir:b}:typeof a=="string"&&(d={by:a.replace(/#/g,""),dir:b,as:c});var e=[d.by,d.dir,d.as];this.callEvent("onBeforeSort",e)&&(this.Ja(d),this.refresh(),this.callEvent("onAfterSort",e))},Ja:function(a){if(this.order.length){var b=this.Ia.na(a),c=this.getRange(this.first(),this.last());c.sort(b);this.order=c.map(function(a){return this.id(a)},this)}},ta:function(a){if(this.c&&!a)this.order=this.c,delete this.c;return this.order.length},sa:function(a,
b,c){for(var d=dhx.toArray(),e=0;e<this.order.length;e++){var f=this.order[e];a(this.item(f),b)&&d.push(f)}if(!c||!this.c)this.c=this.order;this.order=d},filter:function(a,b,c){if(this.callEvent("onBeforeFilter",[a,b])&&this.ta(c)){if(a){var d=a,b=b||"";typeof a=="string"&&(a=a.replace(/#/g,""),b=b.toString().toLowerCase(),d=function(b,c){return(b[a]||"").toString().toLowerCase().indexOf(c)!=-1});this.sa(d,b,c)}this.refresh();this.callEvent("onAfterFilter",[])}},each:function(a,b){for(var c=0;c<this.order.length;c++)a.call(b||
this,this.item(this.order[c]))},za:function(a,b){return function(){return a[b].apply(a,arguments)}},provideApi:function(a,b){b&&this.mapEvent({onbeforesort:a,onaftersort:a,onbeforeadd:a,onafteradd:a,onbeforedelete:a,onafterdelete:a,onbeforeupdate:a});for(var c="sort,add,remove,exists,idByIndex,indexById,item,update,refresh,dataCount,filter,next,previous,clearAll,first,last,serialize,sync".split(","),d=0;d<c.length;d++)a[c[d]]=this.za(this,c[d])},serialize:function(){for(var a=this.order,b=[],c=0;c<
a.length;c++){var d=this.pull[a[c]];if(this.$&&(d=this.$(d),d===!1))continue;b.push(d)}return b},Ia:{na:function(a){return this.oa(a.dir,this.ja(a.by,a.as))},ga:{date:function(a,b){a-=0;b-=0;return a>b?1:a<b?-1:0},"int":function(a,b){a*=1;b*=1;return a>b?1:a<b?-1:0},string_strict:function(a,b){a=a.toString();b=b.toString();return a>b?1:a<b?-1:0},string:function(a,b){if(!b)return 1;if(!a)return-1;a=a.toString().toLowerCase();b=b.toString().toLowerCase();return a>b?1:a<b?-1:0}},ja:function(a,b){if(!a)return b;typeof b!="function"&&(b=this.ga[b||"string"]);return function(c,d){return b(c[a],d[a])}},oa:function(a,b){return a=="asc"||!a?b:function(a,d){return b(a,d)*-1}}}};dhx.BaseBind={bind:function(a,b,c){typeof a=="string"&&(a=dhx.ui.get(a));a.b&&a.b();this.b&&this.b();a.getBindData||dhx.extend(a,dhx.BindSource);if(!this.ha){var d=this.render;if(this.filter){var e=this.a.id;this.data.W=function(){a.n[e]=!1}}this.render=function(){if(!this.T){this.T=!0;var a=this.callEvent("onBindRequest");this.T=!1;return d.apply(this,a===!1?arguments:[])}};if(this.getValue||this.getValues)this.save=function(){if(!this.validate||this.validate())a.setBindData(this.getValue?this.getValue:
this.getValues(),this.a.id)};this.ha=!0}a.addBind(this.a.id,b,c);this.attachEvent(this.touchable?"onAfterRender":"onBindRequest",function(){return a.getBindData(this.a.id)});this.isVisible(this.a.id)&&this.refresh()},e:function(a){a.removeBind(this.a.id);var b=this.u||(this.data?this.data.u:0);if(b&&a.data)for(var c=0;c<b.length;c++)a.data.detachEvent(b[c])}};dhx.BindSource={$init:function(){this.m={};this.n={};this.w={};this.ia(this)},saveBatch:function(a){this.R=!0;a.call(this);this.R=!1;this.i()},setBindData:function(a,b){b&&(this.w[b]=!0);if(this.setValue)this.setValue(a);else if(this.setValues)this.setValues(a);else{var c=this.getCursor();c&&(a=dhx.extend(this.item(c),a,!0),this.update(c,a))}this.callEvent("onBindUpdate",[a,b]);this.save&&this.save();b&&(this.w[b]=!1)},getBindData:function(a,b){if(this.n[a])return!1;var c=dhx.ui.get(a);c.isVisible(c.a.id)&&
(this.n[a]=!0,this.F(c,this.m[a][0],this.m[a][1]),b&&c.filter&&c.refresh())},addBind:function(a,b,c){this.m[a]=[b,c]},removeBind:function(a){delete this.m[a];delete this.n[a];delete this.w[a]},ia:function(a){a.filter?dhx.extend(this,dhx.CollectionBind):a.setValue?dhx.extend(this,dhx.ValueBind):dhx.extend(this,dhx.RecordBind)},i:function(){if(!this.R)for(var a in this.m)this.w[a]||(this.n[a]=!1,this.getBindData(a,!0))},O:function(a,b,c){a.setValue?a.setValue(c?c[b]:c):a.filter?a.data.silent(function(){this.filter(b,
c)}):!c&&a.clear?a.clear():a.v(c)&&a.setValues(dhx.clone(c));a.callEvent("onBindApply",[c,b,this])}};dhx.DataValue=dhx.proto({name:"DataValue",isVisible:function(){return!0},$init:function(a){var b=(this.data=a)&&a.id?a.id:dhx.uid();this.a={id:b};dhx.ui.views[b]=this},setValue:function(a){this.data=a;this.callEvent("onChange",[a])},getValue:function(){return this.data},refresh:function(){this.callEvent("onBindRequest")}},dhx.EventSystem,dhx.BaseBind);dhx.DataRecord=dhx.proto({name:"DataRecord",isVisible:function(){return!0},$init:function(a){this.data=a||{};var b=a&&a.id?a.id:dhx.uid();this.a={id:b};dhx.ui.views[b]=this},getValues:function(){return this.data},setValues:function(a){this.data=a;this.callEvent("onChange",[a])},refresh:function(){this.callEvent("onBindRequest")}},dhx.EventSystem,dhx.BaseBind,dhx.AtomDataLoader,dhx.Settings);dhx.DataCollection=dhx.proto({name:"DataCollection",isVisible:function(){return!this.data.order.length&&!this.data.c&&!this.a.dataFeed?!1:!0},$init:function(a){this.data.provideApi(this,!0);var b=a&&a.id?a.id:dhx.uid();this.a.id=b;dhx.ui.views[b]=this;this.data.attachEvent("onStoreLoad",dhx.bind(function(){this.callEvent("onBindRequest",[])},this))},refresh:function(){this.callEvent("onBindRequest",[])}},dhx.DataLoader,dhx.EventSystem,dhx.BaseBind,dhx.Settings);dhx.ValueBind={$init:function(){this.attachEvent("onChange",this.i)},F:function(a,b,c){var d=this.getValue()||"";c&&(d=c(d));if(a.setValue)a.setValue(d);else if(a.filter)a.data.silent(function(){this.filter(b,d)});else{var e={};e[b]=d;a.v(d)&&a.setValues(e)}a.callEvent("onBindApply",[d,b,this])}};dhx.RecordBind={$init:function(){this.attachEvent("onChange",this.i)},F:function(a,b){var c=this.getValues()||null;this.O(a,b,c)}};dhx.CollectionBind={$init:function(){this.g=null;this.attachEvent("onSelectChange",function(){var a=this.getSelected();this.setCursor(a?a.id||a:"")});this.attachEvent("onAfterCursorChange",this.i);this.data.attachEvent("onStoreUpdated",dhx.bind(function(a){a&&a==this.getCursor()&&this.i()},this));this.data.attachEvent("onClearAll",dhx.bind(function(){this.g=null},this));this.data.attachEvent("onIdChange",dhx.bind(function(a,b){if(this.g==a)this.g=b},this))},setCursor:function(a){if(!(a==this.g||a!==
null&&!this.item(a)))this.callEvent("onBeforeCursorChange",[this.g]),this.g=a,this.callEvent("onAfterCursorChange",[a])},getCursor:function(){return this.g},F:function(a,b){var c=this.item(this.getCursor())||null;this.O(a,b,c)}};if(!dhx.ui)dhx.ui={};if(!dhx.ui.views)dhx.ui.views={},dhx.ui.get=function(a){return a.a?a:dhx.ui.views[a]};dhtmlXDataStore=function(a){var b=new dhx.DataCollection(a),c="_dp_init";b[c]=function(a){var b="_methods";a[b]=["dummy","dummy","changeId","dummy"];this.data.Aa={add:"inserted",update:"updated","delete":"deleted"};this.data.attachEvent("onStoreUpdated",function(b,c,e){b&&!a.ba&&a.setUpdated(b,!0,this.Aa[e])});b="_getRowData";a[b]=function(a){var b=this.obj.data.item(a),c={id:a,"!nativeeditor_status":this.obj.getUserData(a)};if(b)for(var d in b)d.indexOf("_")!==0&&(c[d]=b[d]);return c};this.changeId=
function(b,c){this.data.changeId(b,c);a.ba=!0;this.data.callEvent("onStoreUpdated",[c,this.item(c),"update"]);a.ba=!1};b="_clearUpdateFlag";a[b]=function(){};this.fa={}};b.dummy=function(){};b.setUserData=function(a,b,c){this.fa[a]=c};b.getUserData=function(a){return this.fa[a]};b.dataFeed=function(a){this.define("dataFeed",a)};dhx.extend(b,dhx.BindSource);return b};if(window.dhtmlXDataView)dhtmlXDataView.prototype.b=function(){this.isVisible=function(){return!this.data.order.length&&!this.data.c&&!this.a.dataFeed?!1:!0};this.a = this.a||this._settings;if(!this.a.id)this.a.id=dhx.uid();this.unbind=dhx.BaseBind.unbind;this.unsync=dhx.BaseBind.unsync;dhx.ui.views[this.a.id]=this};if(window.dhtmlXChart)dhtmlXChart.prototype.b=function(){this.isVisible=function(){return!this.data.order.length&&!this.data.Ma&&!this.a.dataFeed?!1:!0};this.a = this.a||this._settings;if(!this.a.id)this.a.id=dhx.uid();this.unbind=dhx.BaseBind.unbind;this.unsync=dhx.BaseBind.unsync;dhx.ui.views[this.a.id]=this};dhx.BaseBind.unsync=function(a){return dhx.BaseBind.e.call(this,a)};dhx.BaseBind.unbind=function(a){return dhx.BaseBind.e.call(this,a)};dhx.BaseBind.legacyBind=function(){return dhx.BaseBind.bind.apply(this,arguments)};dhx.BaseBind.legacySync=function(a,b){this.b&&this.b();a.b&&a.b();this.attachEvent("onAfterEditStop",function(a){this.save(a);return!0});this.save=function(b){b||(b=this.getCursor());var d=this.item(b),e=a.item(b),f;for(f in d)f.indexOf("$")!==0&&(e[f]=d[f]);a.refresh(b)};return a&&a.name=="DataCollection"?a.data.sync.apply(this.data,arguments):this.data.sync.apply(this.data,arguments)};if(window.dhtmlXForm)dhtmlXForm.prototype.bind=function(a){dhx.BaseBind.bind.apply(this,arguments);a.getBindData(this.a.id)},dhtmlXForm.prototype.unbind=function(a){dhx.BaseBind.e.call(this,a)},dhtmlXForm.prototype.b=function(){if(dhx.isUndefined(this.a))this.a={id:dhx.uid(),dataFeed:this.h},dhx.ui.views[this.a.id]=this},dhtmlXForm.prototype.v=function(a){if(!this.a.dataFeed||this.J||!a)return!0;var b=this.a.dataFeed;if(typeof b=="function")return b.call(this,a.id||a,a);b=b+(b.indexOf("?")==-1?"?":
"&")+"action=get&id="+encodeURIComponent(a.id||a);this.load(b);return!1},dhtmlXForm.prototype.setValues=dhtmlXForm.prototype.setFormData,dhtmlXForm.prototype.getValues=function(){return this.getFormData(!1,!0)},dhtmlXForm.prototype.dataFeed=function(a){this.a?this.a.dataFeed=a:this.h=a},dhtmlXForm.prototype.refresh=dhtmlXForm.prototype.isVisible=function(){return!0};if(window.scheduler){if(!window.Scheduler)window.Scheduler={};Scheduler.$syncFactory=function(a){a.sync=function(b,c){this.b&&this.b();b.b&&b.b();var d="_process_loading",e=function(){a.clearAll();for(var e=b.data.order,g=b.data.pull,i=[],h=0;h<e.length;h++)i[h]=c&&c.copy?dhx.clone(g[e[h]]):g[e[h]];a[d](i)};this.save=function(a){a||(a=this.getCursor());var c=this.item(a),d=b.item(a);this.callEvent("onStoreSave",[a,c,d])&&(dhx.extend(b.item(a),c,!0),b.update(a))};this.item=function(a){return this.getEvent(a)};this.u=[b.data.attachEvent("onStoreUpdated",function(){e.call(this)}),b.data.attachEvent("onIdChange",function(a,b){combo.changeOptionId(a,b)})];this.attachEvent("onEventChanged",function(a){this.save(a)});this.attachEvent("onEventAdded",function(a,c){b.data.pull[a]||b.add(c)});e()};a.unsync=function(a){dhx.BaseBind.e.call(this,a)};a.b=function(){if(!this.a)this.a={id:dhx.uid()}}};Scheduler.$syncFactory(window.scheduler)}
if(window.dhtmlXCombo)dhtmlXCombo.prototype.bind=function(){dhx.BaseBind.bind.apply(this,arguments)},dhtmlXCombo.unbind=function(a){dhx.BaseBind.e.call(this,a)},dhtmlXCombo.unsync=function(a){dhx.BaseBind.e.call(this,a)},dhtmlXCombo.prototype.dataFeed=function(a){this.a?this.a.dataFeed=a:this.h=a},dhtmlXCombo.prototype.sync=function(a){this.b&&this.b();a.b&&a.b();var b=this,c=function(){b.clearAll();b.addOption(this.serialize())};this.u=[a.data.attachEvent("onStoreUpdated",function(){c.call(this)}),
a.data.attachEvent("onIdChange",function(a,c){b.changeOptionId(a,c)})];c.call(a)},dhtmlXCombo.prototype.b=function(){if(dhx.isUndefined(this.a))this.a={id:dhx.uid(),dataFeed:this.h},dhx.ui.views[this.a.id]=this,this.data={silent:dhx.bind(function(a){a.call(this)},this)},dhtmlxEventable(this.data),this.attachEvent("onChange",function(){this.callEvent("onSelectChange",[this.getSelectedValue()])}),this.attachEvent("onXLE",function(){this.callEvent("onBindRequest",[])})},dhtmlXCombo.prototype.item=function(){return this.Pa},
dhtmlXCombo.prototype.getSelected=function(){return this.getSelectedValue()},dhtmlXCombo.prototype.isVisible=function(){return!this.optionsArr.length&&!this.a.dataFeed?!1:!0},dhtmlXCombo.prototype.refresh=function(){this.render(!0)},dhtmlXCombo.prototype.filter=function(){alert("not implemented")};if(window.dhtmlXGridObject)dhtmlXGridObject.prototype.bind=function(a,b,c){dhx.BaseBind.bind.apply(this,arguments)},dhtmlXGridObject.prototype.unbind=function(a){dhx.BaseBind.e.call(this,a)},dhtmlXGridObject.prototype.unsync=function(a){dhx.BaseBind.e.call(this,a)},dhtmlXGridObject.prototype.dataFeed=function(a){this.a?this.a.dataFeed=a:this.h=a},dhtmlXGridObject.prototype.sync=function(a,b){this.b&&this.b();a.b&&a.b();var c=this,d="_parsing",e="_parser",f="_locator",g="_process_store_row",i="_get_store_data";this.save=function(b){b||(b=this.getCursor());dhx.extend(a.item(b),this.item(b),!0);a.update(b)};var h=function(){var a=0;c.z?(a=c.z,c.z=!1):c.clearAll();var b=this.dataCount();if(b){c[d]=!0;for(var h=a;h<b;h++){var k=this.order[h];if(k&&(!a||!c.rowsBuffer[h]))c.rowsBuffer[h]={idd:k,data:this.pull[k]},c.rowsBuffer[h][e]=c[g],c.rowsBuffer[h][f]=c[i],c.rowsAr[k]=this.pull[k]}if(!c.rowsBuffer[b-1])c.rowsBuffer[b-1]=dhtmlx.undefined,c.xmlFileUrl=c.xmlFileUrl||!0;c.pagingOn?c.changePage():c.Qa&&c.La?c.Ra():
(c.render_dataset(),c.callEvent("onXLE",[]));c[d]=!1}};this.u=[a.data.attachEvent("onStoreUpdated",function(a,b,d){d=="delete"?(c.deleteRow(a),c.data.callEvent("onStoreUpdated",[a,b,d])):d=="update"?(c.callEvent("onSyncUpdate",[b,d]),c.update(a,b),c.data.callEvent("onStoreUpdated",[a,b,d])):d=="add"?(c.callEvent("onSyncUpdate",[b,d]),c.add(a,b,this.indexById(a)),c.data.callEvent("onStoreUpdated",[a,b,d])):h.call(this)}),a.data.attachEvent("onStoreLoad",function(b,d){c.xmlFileUrl=a.data.url;c.z=b.getInfo(d).j}),
a.data.attachEvent("onIdChange",function(a,b){c.changeRowId(a,b)})];c.attachEvent("onDynXLS",function(b,d){for(var e=b;e<b+d;e++)if(!a.data.order[e])return a.loadNext(d,b),!1;c.z=b;h.call(a.data)});h.call(a.data);c.attachEvent("onEditCell",function(a,b){a==2&&this.save(b);return!0});c.attachEvent("onClearAll",function(){var a="_f_rowsBuffer";this[a]=null});b&&b.sort&&c.attachEvent("onBeforeSorting",function(b,d,e){if(d=="connector")return!1;var f=this.getColumnId(b);a.sort("#"+f+"#",e=="asc"?"asc":
"desc",d=="int"?d:"string");c.setSortImgState(!0,b,e);return!1});b&&b.filter&&c.attachEvent("onFilterStart",function(b,d){var e="_con_f_used";if(c[e]&&c[e].length)return!1;a.data.silent(function(){a.filter();for(var e=0;e<b.length;e++)if(d[e]!=""){var f=c.getColumnId(b[e]);a.filter("#"+f+"#",d[e],e!=0)}});a.refresh();return!1});b&&b.select&&c.attachEvent("onRowSelect",function(b){a.setCursor(b)});c.clearAndLoad=function(b){a.clearAll();a.load(b)}},dhtmlXGridObject.prototype.b=function(){if(dhx.isUndefined(this.a)){this.a=
{id:dhx.uid(),dataFeed:this.h};dhx.ui.views[this.a.id]=this;this.data={silent:dhx.bind(function(a){a.call(this)},this)};dhtmlxEventable(this.data);for(var a="_cCount",b=0;b<this[a];b++)this.columnIds[b]||(this.columnIds[b]="cell"+b);this.attachEvent("onSelectStateChanged",function(a){this.callEvent("onSelectChange",[a])});this.attachEvent("onSelectionCleared",function(){this.callEvent("onSelectChange",[null])});this.attachEvent("onEditCell",function(a,b){a===2&&this.getCursor&&b&&b==this.getCursor()&&
this.i();return!0});this.attachEvent("onXLE",function(){this.callEvent("onBindRequest",[])})}},dhtmlXGridObject.prototype.item=function(a){if(a===null)return null;var b=this.getRowById(a);if(!b)return null;var c="_attrs",d=dhx.copy(b[c]);d.id=a;for(var e=this.getColumnsNum(),f=0;f<e;f++)d[this.columnIds[f]]=this.cells(a,f).getValue();return d},dhtmlXGridObject.prototype.update=function(a,b){for(var c=0;c<this.columnIds.length;c++){var d=this.columnIds[c];dhx.isUndefined(b[d])||this.cells(a,c).setValue(b[d])}var e=
"_attrs",f=this.getRowById(a)[e];for(d in b)f[d]=b[d];this.callEvent("onBindUpdate",[a])},dhtmlXGridObject.prototype.add=function(a,b,c){for(var d=[],e=0;e<this.columnIds.length;e++){var f=this.columnIds[e];d[e]=dhx.isUndefined(b[f])?"":b[f]}this.addRow(a,d,c);var g="_attrs";this.getRowById(a)[g]=dhx.copy(b)},dhtmlXGridObject.prototype.getSelected=function(){return this.getSelectedRowId()},dhtmlXGridObject.prototype.isVisible=function(){var a="_f_rowsBuffer";return!this.rowsBuffer.length&&!this[a]&&
!this.a.dataFeed?!1:!0},dhtmlXGridObject.prototype.refresh=function(){this.render_dataset()},dhtmlXGridObject.prototype.filter=function(a,b){if(this.a.dataFeed){var c={};if(!a&&!b)return;if(typeof a=="function"){if(!b)return;a(b,c)}else dhx.isUndefined(a)?c=b:c[a]=b;this.clearAll();var d=this.a.dataFeed;if(typeof d=="function")return d.call(this,b,c);var e=[],f;for(f in c)e.push("dhx_filter["+f+"]="+encodeURIComponent(c[f]));this.load(d+(d.indexOf("?")<0?"?":"&")+e.join("&"));return!1}if(b===null)return this.filterBy(0,
function(){return!1});this.filterBy(0,function(c,d){return a.call(this,d,b)})};if(window.dhtmlXTreeObject)dhtmlXTreeObject.prototype.bind=function(){dhx.BaseBind.bind.apply(this,arguments)},dhtmlXTreeObject.prototype.unbind=function(a){dhx.BaseBind.e.call(this,a)},dhtmlXTreeObject.prototype.dataFeed=function(a){this.a?this.a.dataFeed=a:this.h=a},dhtmlXTreeObject.prototype.b=function(){if(dhx.isUndefined(this.a))this.a={id:dhx.uid(),dataFeed:this.h},dhx.ui.views[this.a.id]=this,this.data={silent:dhx.bind(function(a){a.call(this)},this)},dhtmlxEventable(this.data),this.attachEvent("onSelect",
function(a){this.callEvent("onSelectChange",[a])}),this.attachEvent("onEdit",function(a,b){a===2&&b&&b==this.getCursor()&&this.i();return!0})},dhtmlXTreeObject.prototype.item=function(a){return a===null?null:{id:a,text:this.getItemText(a)}},dhtmlXTreeObject.prototype.getSelected=function(){return this.getSelectedItemId()},dhtmlXTreeObject.prototype.isVisible=function(){return!0},dhtmlXTreeObject.prototype.refresh=function(){},dhtmlXTreeObject.prototype.filter=function(a,b){if(this.a.dataFeed){var c=
{};if(a||b){if(typeof a=="function"){if(!b)return;a(b,c)}else dhx.isUndefined(a)?c=b:c[a]=b;this.deleteChildItems(0);var d=this.a.dataFeed;if(typeof d=="function")return d.call(this,[data.id||data,data]);var e=[],f;for(f in c)e.push("dhx_filter["+f+"]="+encodeURIComponent(c[f]));this.loadXML(d+(d.indexOf("?")<0?"?":"&")+e.join("&"));return!1}}},dhtmlXTreeObject.prototype.update=function(a,b){dhx.isUndefined(b.text)||this.setItemText(a,b.text)};dhtmlx.skin='dhx_terrace';