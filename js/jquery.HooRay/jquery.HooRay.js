/*
	整理：胡尐睿丶
	联系方式：hooray0905@foxmail.com
*/

/*
	ie6 png透明修正
	DD_belatedPNG.fix('.png_bg');
	DD_belatedPNG.fixPng( someNode );
*/
if($.browser.msie&&($.browser.version=="6.0")&&!$.support.style){
var DD_belatedPNG={ns:"DD_belatedPNG",imgSize:{},delay:10,nodesFixed:0,createVmlNameSpace:function(){if(document.namespaces&&!document.namespaces[this.ns]){document.namespaces.add(this.ns,"urn:schemas-microsoft-com:vml")}},createVmlStyleSheet:function(){var b,a;b=document.createElement("style");b.setAttribute("media","screen");document.documentElement.firstChild.insertBefore(b,document.documentElement.firstChild.firstChild);if(b.styleSheet){b=b.styleSheet;b.addRule(this.ns+"\\:*","{behavior:url(#default#VML)}");b.addRule(this.ns+"\\:shape","position:absolute;");b.addRule("img."+this.ns+"_sizeFinder","behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;");this.screenStyleSheet=b;a=document.createElement("style");a.setAttribute("media","print");document.documentElement.firstChild.insertBefore(a,document.documentElement.firstChild.firstChild);a=a.styleSheet;a.addRule(this.ns+"\\:*","{display: none !important;}");a.addRule("img."+this.ns+"_sizeFinder","{display: none !important;}")}},readPropertyChange:function(){var b,c,a;b=event.srcElement;if(!b.vmlInitiated){return}if(event.propertyName.search("background")!=-1||event.propertyName.search("border")!=-1){DD_belatedPNG.applyVML(b)}if(event.propertyName=="style.display"){c=(b.currentStyle.display=="none")?"none":"block";for(a in b.vml){if(b.vml.hasOwnProperty(a)){b.vml[a].shape.style.display=c}}}if(event.propertyName.search("filter")!=-1){DD_belatedPNG.vmlOpacity(b)}},vmlOpacity:function(b){if(b.currentStyle.filter.search("lpha")!=-1){var a=b.currentStyle.filter;a=parseInt(a.substring(a.lastIndexOf("=")+1,a.lastIndexOf(")")),10)/100;b.vml.color.shape.style.filter=b.currentStyle.filter;b.vml.image.fill.opacity=a}},handlePseudoHover:function(a){setTimeout(function(){DD_belatedPNG.applyVML(a)},1)},fix:function(a){if(this.screenStyleSheet){var c,b;c=a.split(",");for(b=0;b<c.length;b++){this.screenStyleSheet.addRule(c[b],"behavior:expression(DD_belatedPNG.fixPng(this))")}}},applyVML:function(a){a.runtimeStyle.cssText="";this.vmlFill(a);this.vmlOffsets(a);this.vmlOpacity(a);if(a.isImg){this.copyImageBorders(a)}},attachHandlers:function(i){var d,c,g,e,b,f;d=this;c={resize:"vmlOffsets",move:"vmlOffsets"};if(i.nodeName=="A"){e={mouseleave:"handlePseudoHover",mouseenter:"handlePseudoHover",focus:"handlePseudoHover",blur:"handlePseudoHover"};for(b in e){if(e.hasOwnProperty(b)){c[b]=e[b]}}}for(f in c){if(c.hasOwnProperty(f)){g=function(){d[c[f]](i)};i.attachEvent("on"+f,g)}}i.attachEvent("onpropertychange",this.readPropertyChange)},giveLayout:function(a){a.style.zoom=1;if(a.currentStyle.position=="static"){a.style.position="relative"}},copyImageBorders:function(b){var c,a;c={borderStyle:true,borderWidth:true,borderColor:true};for(a in c){if(c.hasOwnProperty(a)){b.vml.color.shape.style[a]=b.currentStyle[a]}}},vmlFill:function(e){if(!e.currentStyle){return}else{var d,f,g,b,a,c;d=e.currentStyle}for(b in e.vml){if(e.vml.hasOwnProperty(b)){e.vml[b].shape.style.zIndex=d.zIndex}}e.runtimeStyle.backgroundColor="";e.runtimeStyle.backgroundImage="";f=true;if(d.backgroundImage!="none"||e.isImg){if(!e.isImg){e.vmlBg=d.backgroundImage;e.vmlBg=e.vmlBg.substr(5,e.vmlBg.lastIndexOf('")')-5)}else{e.vmlBg=e.src}g=this;if(!g.imgSize[e.vmlBg]){a=document.createElement("img");g.imgSize[e.vmlBg]=a;a.className=g.ns+"_sizeFinder";a.runtimeStyle.cssText="behavior:none; position:absolute; left:-10000px; top:-10000px; border:none; margin:0; padding:0;";c=function(){this.width=this.offsetWidth;this.height=this.offsetHeight;g.vmlOffsets(e)};a.attachEvent("onload",c);a.src=e.vmlBg;a.removeAttribute("width");a.removeAttribute("height");document.body.insertBefore(a,document.body.firstChild)}e.vml.image.fill.src=e.vmlBg;f=false}e.vml.image.fill.on=!f;e.vml.image.fill.color="none";e.vml.color.shape.style.backgroundColor=d.backgroundColor;e.runtimeStyle.backgroundImage="none";e.runtimeStyle.backgroundColor="transparent"},vmlOffsets:function(d){var h,n,a,e,g,m,f,l,j,i,k;h=d.currentStyle;n={W:d.clientWidth+1,H:d.clientHeight+1,w:this.imgSize[d.vmlBg].width,h:this.imgSize[d.vmlBg].height,L:d.offsetLeft,T:d.offsetTop,bLW:d.clientLeft,bTW:d.clientTop};a=(n.L+n.bLW==1)?1:0;e=function(b,p,q,c,s,u){b.coordsize=c+","+s;b.coordorigin=u+","+u;b.path="m0,0l"+c+",0l"+c+","+s+"l0,"+s+" xe";b.style.width=c+"px";b.style.height=s+"px";b.style.left=p+"px";b.style.top=q+"px"};e(d.vml.color.shape,(n.L+(d.isImg?0:n.bLW)),(n.T+(d.isImg?0:n.bTW)),(n.W-1),(n.H-1),0);e(d.vml.image.shape,(n.L+n.bLW),(n.T+n.bTW),(n.W),(n.H),1);g={X:0,Y:0};if(d.isImg){g.X=parseInt(h.paddingLeft,10)+1;g.Y=parseInt(h.paddingTop,10)+1}else{for(j in g){if(g.hasOwnProperty(j)){this.figurePercentage(g,n,j,h["backgroundPosition"+j])}}}d.vml.image.fill.position=(g.X/n.W)+","+(g.Y/n.H);m=h.backgroundRepeat;f={T:1,R:n.W+a,B:n.H,L:1+a};l={X:{b1:"L",b2:"R",d:"W"},Y:{b1:"T",b2:"B",d:"H"}};if(m!="repeat"||d.isImg){i={T:(g.Y),R:(g.X+n.w),B:(g.Y+n.h),L:(g.X)};if(m.search("repeat-")!=-1){k=m.split("repeat-")[1].toUpperCase();i[l[k].b1]=1;i[l[k].b2]=n[l[k].d]}if(i.B>n.H){i.B=n.H}d.vml.image.shape.style.clip="rect("+i.T+"px "+(i.R+a)+"px "+i.B+"px "+(i.L+a)+"px)"}else{d.vml.image.shape.style.clip="rect("+f.T+"px "+f.R+"px "+f.B+"px "+f.L+"px)"}},figurePercentage:function(d,c,f,a){var b,e;e=true;b=(f=="X");switch(a){case"left":case"top":d[f]=0;break;case"center":d[f]=0.5;break;case"right":case"bottom":d[f]=1;break;default:if(a.search("%")!=-1){d[f]=parseInt(a,10)/100}else{e=false}}d[f]=Math.ceil(e?((c[b?"W":"H"]*d[f])-(c[b?"w":"h"]*d[f])):parseInt(a,10));if(d[f]%2===0){d[f]++}return d[f]},fixPng:function(c){c.style.behavior="none";var g,b,f,a,d;if(c.nodeName=="BODY"||c.nodeName=="TD"||c.nodeName=="TR"){return}c.isImg=false;if(c.nodeName=="IMG"){if(c.src.toLowerCase().search(/\.png$/)!=-1){c.isImg=true;c.style.visibility="hidden"}else{return}}else{if(c.currentStyle.backgroundImage.toLowerCase().search(".png")==-1){return}}g=DD_belatedPNG;c.vml={color:{},image:{}};b={shape:{},fill:{}};for(a in c.vml){if(c.vml.hasOwnProperty(a)){for(d in b){if(b.hasOwnProperty(d)){f=g.ns+":"+d;c.vml[a][d]=document.createElement(f)}}c.vml[a].shape.stroked=false;c.vml[a].shape.appendChild(c.vml[a].fill);c.parentNode.insertBefore(c.vml[a].shape,c)}}c.vml.image.shape.fillcolor="none";c.vml.image.fill.type="tile";c.vml.color.fill.on=false;g.attachHandlers(c);g.giveLayout(c);g.giveLayout(c.offsetParent);c.vmlInitiated=true;g.applyVML(c)}};try{document.execCommand("BackgroundImageCache",false,true)}catch(r){}DD_belatedPNG.createVmlNameSpace();DD_belatedPNG.createVmlStyleSheet();
}

/*
	SWFObject v2.2
	swfobject.embedSWF("test.swf", "myContent", "300", "120", "9.0.0", "expressInstall.swf");
*/
swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 * t: current time, b: begInnIng value, c: change In value, d: duration
 */
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing,{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
	jQuery.cookie
	$.cookie('the_cookie'); //读取Cookie值
	$.cookie('the_cookie', 'the_value'); //设置cookie的值
	$.cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true});
*/
jQuery.cookie=function(A,B,C){if(typeof B!='undefined'){C=C||{};if(B===null){B='';C.expires=-1;}var D='';if(C.expires&&(typeof C.expires=='number'||C.expires.toUTCString)){var E;if(typeof C.expires=='number'){E=new Date();E.setTime(E.getTime()+(C.expires*24*60*60*1000));}else {E=C.expires;}D='; expires='+E.toUTCString();}var F=C.path?'; path='+(C.path):'';var G=C.domain?'; domain='+(C.domain):'';var H=C.secure?'; secure':'';document.cookie=[A,'=',encodeURIComponent(B),D,F,G,H].join('');}else {var I=null;if(document.cookie&&document.cookie!=''){var J=document.cookie.split(';');for(var K=0;K<J.length;K++){var L=jQuery.trim(J[K]);if(L.substring(0,A.length+1)==(A+'=')){I=decodeURIComponent(L.substring(A.length+1));break;}}}return I;}};

/*
	表单ajax插件
	基于 jQuery Form Plugin 2.95
	http://malsup.com/jquery/form/
*/
;(function($) {
$.fn.ajaxSubmit = function(options) {
	if (!this.length) {
		log('ajaxSubmit: skipping submit process - no element selected');
		return this;
	}
	var method, action, url, $form = this;
	if (typeof options == 'function') {
		options = { success: options };
	}
	method = this.attr('method');
	action = this.attr('action');
	url = (typeof action === 'string') ? $.trim(action) : '';
	url = url || window.location.href || '';
	if (url) {
		url = (url.match(/^([^#]+)/)||[])[1];
	}
	options = $.extend(true, {
		url:  url,
		success: $.ajaxSettings.success,
		type: method || 'GET',
		iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
	}, options);
	var veto = {};
	this.trigger('form-pre-serialize', [this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
		return this;
	}
	if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSerialize callback');
		return this;
	}
	var traditional = options.traditional;
	if ( traditional === undefined ) {
		traditional = $.ajaxSettings.traditional;
	}
	var qx,n,v,a = this.formToArray(options.semantic);
	if (options.data) {
		options.extraData = options.data;
		qx = $.param(options.data, traditional);
	}
	if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSubmit callback');
		return this;
	}
	this.trigger('form-submit-validate', [a, this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
		return this;
	}
	var q = $.param(a, traditional);
	if (qx) {
		q = ( q ? (q + '&' + qx) : qx );
	}
	if (options.type.toUpperCase() == 'GET') {
		options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
		options.data = null;  // data is null for 'get'
	}
	else {
		options.data = q; // data is the query string for 'post'
	}
	var callbacks = [];
	if (options.resetForm) {
		callbacks.push(function() { $form.resetForm(); });
	}
	if (options.clearForm) {
		callbacks.push(function() { $form.clearForm(options.includeHidden); });
	}
	if (!options.dataType && options.target) {
		var oldSuccess = options.success || function(){};
		callbacks.push(function(data) {
			var fn = options.replaceTarget ? 'replaceWith' : 'html';
			$(options.target)[fn](data).each(oldSuccess, arguments);
		});
	}
	else if (options.success) {
		callbacks.push(options.success);
	}
	options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
		var context = options.context || options;	// jQuery 1.4+ supports scope context
		for (var i=0, max=callbacks.length; i < max; i++) {
			callbacks[i].apply(context, [data, status, xhr || $form, $form]);
		}
	};
	var fileInputs = $('input:file:enabled[value]', this); // [value] (issue #113)
	var hasFileInputs = fileInputs.length > 0;
	var mp = 'multipart/form-data';
	var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);
	var fileAPI = !!(hasFileInputs && fileInputs.get(0).files && window.FormData);
	log("fileAPI :" + fileAPI);
	var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;
	if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
		if (options.closeKeepAlive) {
			$.get(options.closeKeepAlive, function() {
				fileUploadIframe(a);
			});
		}
  		else {
			fileUploadIframe(a);
  		}
	}
	else if ((hasFileInputs || multipart) && fileAPI) {
		options.progress = options.progress || $.noop;
		fileUploadXhr(a);
	}
	else {
		$.ajax(options);
	}
	 this.trigger('form-submit-notify', [this, options]);
	 return this;
	function fileUploadXhr(a) {
		var formdata = new FormData();
		for (var i=0; i < a.length; i++) {
			if (a[i].type == 'file')
				continue;
			formdata.append(a[i].name, a[i].value);
		}
		$form.find('input:file:enabled').each(function(){
			var name = $(this).attr('name'), files = this.files;
			if (name) {
				for (var i=0; i < files.length; i++)
					formdata.append(name, files[i]);
			}
		});
		if (options.extraData) {
			for (var k in options.extraData)
				formdata.append(k, options.extraData[k])
		}
		options.data = null;
		var s = $.extend(true, {}, $.ajaxSettings, options, {
			contentType: false,
			processData: false,
			cache: false,
			type: 'POST'
		});
      s.data = null;
      var beforeSend = s.beforeSend;
      s.beforeSend = function(xhr, o) {
          o.data = formdata;
          if(xhr.upload) { // unfortunately, jQuery doesn't expose this prop (http://bugs.jquery.com/ticket/10190)
              xhr.upload.onprogress = function(event) {
                  o.progress(event.position, event.total);
              };
          }
          if(beforeSend)
              beforeSend.call(o, xhr, options);
      };
      $.ajax(s);
   }
	function fileUploadIframe(a) {
		var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
		var useProp = !!$.fn.prop;
		if (a) {
			if ( useProp ) {
				// ensure that every serialized input is still enabled
				for (i=0; i < a.length; i++) {
					el = $(form[a[i].name]);
					el.prop('disabled', false);
				}
			} else {
				for (i=0; i < a.length; i++) {
					el = $(form[a[i].name]);
					el.removeAttr('disabled');
				}
			};
		}
		if ($(':input[name=submit],:input[id=submit]', form).length) {
			alert('Error: Form elements must not have name or id of "submit".');
			return;
		}
		s = $.extend(true, {}, $.ajaxSettings, options);
		s.context = s.context || s;
		id = 'jqFormIO' + (new Date().getTime());
		if (s.iframeTarget) {
			$io = $(s.iframeTarget);
			n = $io.attr('name');
			if (n == null)
			 	$io.attr('name', id);
			else
				id = n;
		}
		else {
			$io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
			$io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
		}
		io = $io[0];
		xhr = { // mock object
			aborted: 0,
			responseText: null,
			responseXML: null,
			status: 0,
			statusText: 'n/a',
			getAllResponseHeaders: function() {},
			getResponseHeader: function() {},
			setRequestHeader: function() {},
			abort: function(status) {
				var e = (status === 'timeout' ? 'timeout' : 'aborted');
				log('aborting upload... ' + e);
				this.aborted = 1;
				$io.attr('src', s.iframeSrc); // abort op in progress
				xhr.error = e;
				s.error && s.error.call(s.context, xhr, e, status);
				g && $.event.trigger("ajaxError", [xhr, s, e]);
				s.complete && s.complete.call(s.context, xhr, e);
			}
		};
		g = s.global;
		if (g && ! $.active++) {
			$.event.trigger("ajaxStart");
		}
		if (g) {
			$.event.trigger("ajaxSend", [xhr, s]);
		}
		if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
			if (s.global) {
				$.active--;
			}
			return;
		}
		if (xhr.aborted) {
			return;
		}
		sub = form.clk;
		if (sub) {
			n = sub.name;
			if (n && !sub.disabled) {
				s.extraData = s.extraData || {};
				s.extraData[n] = sub.value;
				if (sub.type == "image") {
					s.extraData[n+'.x'] = form.clk_x;
					s.extraData[n+'.y'] = form.clk_y;
				}
			}
		}
		var CLIENT_TIMEOUT_ABORT = 1;
		var SERVER_ABORT = 2;
		function getDoc(frame) {
			var doc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument ? frame.contentDocument : frame.document;
			return doc;
		}
		var csrf_token = $('meta[name=csrf-token]').attr('content');
		var csrf_param = $('meta[name=csrf-param]').attr('content');
		if (csrf_param && csrf_token) {
			s.extraData = s.extraData || {};
			s.extraData[csrf_param] = csrf_token;
		}
		function doSubmit() {
			var t = $form.attr('target'), a = $form.attr('action');
			form.setAttribute('target',id);
			if (!method) {
				form.setAttribute('method', 'POST');
			}
			if (a != s.url) {
				form.setAttribute('action', s.url);
			}
			if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
				$form.attr({
					encoding: 'multipart/form-data',
					enctype:  'multipart/form-data'
				});
			}
			if (s.timeout) {
				timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
			}
			function checkState() {
				try {
					var state = getDoc(io).readyState;
					log('state = ' + state);
					if (state.toLowerCase() == 'uninitialized')
						setTimeout(checkState,50);
				}
				catch(e) {
					log('Server abort: ' , e, ' (', e.name, ')');
					cb(SERVER_ABORT);
					timeoutHandle && clearTimeout(timeoutHandle);
					timeoutHandle = undefined;
				}
			}
			var extraInputs = [];
			try {
				if (s.extraData) {
					for (var n in s.extraData) {
						extraInputs.push(
							$('<input type="hidden" name="'+n+'">').attr('value',s.extraData[n])
								.appendTo(form)[0]);
					}
				}
				if (!s.iframeTarget) {
					$io.appendTo('body');
					io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
				}
				setTimeout(checkState,15);
				form.submit();
			}
			finally {
				form.setAttribute('action',a);
				if(t) {
					form.setAttribute('target', t);
				} else {
					$form.removeAttr('target');
				}
				$(extraInputs).remove();
			}
		}
		if (s.forceSync) {
			doSubmit();
		}
		else {
			setTimeout(doSubmit, 10); // this lets dom updates render
		}
		var data, doc, domCheckCount = 50, callbackProcessed;
		function cb(e) {
			if (xhr.aborted || callbackProcessed) {
				return;
			}
			try {
				doc = getDoc(io);
			}
			catch(ex) {
				log('cannot access response document: ', ex);
				e = SERVER_ABORT;
			}
			if (e === CLIENT_TIMEOUT_ABORT && xhr) {
				xhr.abort('timeout');
				return;
			}
			else if (e == SERVER_ABORT && xhr) {
				xhr.abort('server abort');
				return;
			}
			if (!doc || doc.location.href == s.iframeSrc) {
				if (!timedOut)
					return;
			}
			io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);
			var status = 'success', errMsg;
			try {
				if (timedOut) {
					throw 'timeout';
				}
				var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
				log('isXml='+isXml);
				if (!isXml && window.opera && (doc.body == null || doc.body.innerHTML == '')) {
					if (--domCheckCount) {
						log('requeing onLoad callback, DOM not available');
						setTimeout(cb, 250);
						return;
					}
				}
				var docRoot = doc.body ? doc.body : doc.documentElement;
				xhr.responseText = docRoot ? docRoot.innerHTML : null;
				xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
				if (isXml)
					s.dataType = 'xml';
				xhr.getResponseHeader = function(header){
					var headers = {'content-type': s.dataType};
					return headers[header];
				};
				if (docRoot) {
					xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
					xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
				}
				var dt = (s.dataType || '').toLowerCase();
				var scr = /(json|script|text)/.test(dt);
				if (scr || s.textarea) {
					var ta = doc.getElementsByTagName('textarea')[0];
					if (ta) {
						xhr.responseText = ta.value;
						xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
						xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
					}
					else if (scr) {
						var pre = doc.getElementsByTagName('pre')[0];
						var b = doc.getElementsByTagName('body')[0];
						if (pre) {
							xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
						}
						else if (b) {
							xhr.responseText = b.textContent ? b.textContent : b.innerText;
						}
					}
				}
				else if (dt == 'xml' && !xhr.responseXML && xhr.responseText != null) {
					xhr.responseXML = toXml(xhr.responseText);
				}
				try {
					data = httpData(xhr, dt, s);
				}
				catch (e) {
					status = 'parsererror';
					xhr.error = errMsg = (e || status);
				}
			}
			catch (e) {
				log('error caught: ',e);
				status = 'error';
				xhr.error = errMsg = (e || status);
			}
			if (xhr.aborted) {
				log('upload aborted');
				status = null;
			}
			if (xhr.status) { // we've set xhr.status
				status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
			}
			if (status === 'success') {
				s.success && s.success.call(s.context, data, 'success', xhr);
				g && $.event.trigger("ajaxSuccess", [xhr, s]);
			}
			else if (status) {
				if (errMsg == undefined)
					errMsg = xhr.statusText;
				s.error && s.error.call(s.context, xhr, status, errMsg);
				g && $.event.trigger("ajaxError", [xhr, s, errMsg]);
			}
			g && $.event.trigger("ajaxComplete", [xhr, s]);
			if (g && ! --$.active) {
				$.event.trigger("ajaxStop");
			}
			s.complete && s.complete.call(s.context, xhr, status);
			callbackProcessed = true;
			if (s.timeout)
				clearTimeout(timeoutHandle);
			setTimeout(function() {
				if (!s.iframeTarget)
					$io.remove();
				xhr.responseXML = null;
			}, 100);
		}
		var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
			if (window.ActiveXObject) {
				doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = 'false';
				doc.loadXML(s);
			}
			else {
				doc = (new DOMParser()).parseFromString(s, 'text/xml');
			}
			return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
		};
		var parseJSON = $.parseJSON || function(s) {
			return window['eval']('(' + s + ')');
		};
		var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4
			var ct = xhr.getResponseHeader('content-type') || '',
				xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
				data = xml ? xhr.responseXML : xhr.responseText;
			if (xml && data.documentElement.nodeName === 'parsererror') {
				$.error && $.error('parsererror');
			}
			if (s && s.dataFilter) {
				data = s.dataFilter(data, type);
			}
			if (typeof data === 'string') {
				if (type === 'json' || !type && ct.indexOf('json') >= 0) {
					data = parseJSON(data);
				} else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
					$.globalEval(data);
				}
			}
			return data;
		};
	}
};
$.fn.ajaxForm = function(options) {
	if (this.length === 0) {
		var o = { s: this.selector, c: this.context };
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing ajaxForm');
			$(function() {
				$(o.s,o.c).ajaxForm(options);
			});
			return this;
		}
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}
	return this.ajaxFormUnbind().bind('submit.form-plugin', function(e) {
		if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
			e.preventDefault();
			$(this).ajaxSubmit(options);
		}
	}).bind('click.form-plugin', function(e) {
		var target = e.target;
		var $el = $(target);
		if (!($el.is(":submit,input:image"))) {
			var t = $el.closest(':submit');
			if (t.length == 0) {
				return;
			}
			target = t[0];
		}
		var form = this;
		form.clk = target;
		if (target.type == 'image') {
			if (e.offsetX != undefined) {
				form.clk_x = e.offsetX;
				form.clk_y = e.offsetY;
			} else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
				var offset = $el.offset();
				form.clk_x = e.pageX - offset.left;
				form.clk_y = e.pageY - offset.top;
			} else {
				form.clk_x = e.pageX - target.offsetLeft;
				form.clk_y = e.pageY - target.offsetTop;
			}
		}
		setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
	});
};
$.fn.ajaxFormUnbind = function() {
	return this.unbind('submit.form-plugin click.form-plugin');
};
$.fn.formToArray = function(semantic) {
	var a = [];
	if (this.length === 0) {
		return a;
	}
	var form = this[0];
	var els = semantic ? form.getElementsByTagName('*') : form.elements;
	if (!els) {
		return a;
	}
	var i,j,n,v,el,max,jmax;
	for(i=0, max=els.length; i < max; i++) {
		el = els[i];
		n = el.name;
		if (!n) {
			continue;
		}
		if (semantic && form.clk && el.type == "image") {
			if(!el.disabled && form.clk == el) {
				a.push({name: n, value: $(el).val(), type: el.type });
				a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
			}
			continue;
		}
		v = $.fieldValue(el, true);
		if (v && v.constructor == Array) {
			for(j=0, jmax=v.length; j < jmax; j++) {
				a.push({name: n, value: v[j]});
			}
		}
		else if (v !== null && typeof v != 'undefined') {
			a.push({name: n, value: v, type: el.type});
		}
	}
	if (!semantic && form.clk) {
		var $input = $(form.clk), input = $input[0];
		n = input.name;
		if (n && !input.disabled && input.type == 'image') {
			a.push({name: n, value: $input.val()});
			a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
		}
	}
	return a;
};
$.fn.formSerialize = function(semantic) {
	return $.param(this.formToArray(semantic));
};
$.fn.fieldSerialize = function(successful) {
	var a = [];
	this.each(function() {
		var n = this.name;
		if (!n) {
			return;
		}
		var v = $.fieldValue(this, successful);
		if (v && v.constructor == Array) {
			for (var i=0,max=v.length; i < max; i++) {
				a.push({name: n, value: v[i]});
			}
		}
		else if (v !== null && typeof v != 'undefined') {
			a.push({name: this.name, value: v});
		}
	});
	return $.param(a);
};
$.fn.fieldValue = function(successful) {
	for (var val=[], i=0, max=this.length; i < max; i++) {
		var el = this[i];
		var v = $.fieldValue(el, successful);
		if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
			continue;
		}
		v.constructor == Array ? $.merge(val, v) : val.push(v);
	}
	return val;
};
$.fieldValue = function(el, successful) {
	var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	if (successful === undefined) {
		successful = true;
	}
	if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
		(t == 'checkbox' || t == 'radio') && !el.checked ||
		(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
		tag == 'select' && el.selectedIndex == -1)) {
			return null;
	}
	if (tag == 'select') {
		var index = el.selectedIndex;
		if (index < 0) {
			return null;
		}
		var a = [], ops = el.options;
		var one = (t == 'select-one');
		var max = (one ? index+1 : ops.length);
		for(var i=(one ? index : 0); i < max; i++) {
			var op = ops[i];
			if (op.selected) {
				var v = op.value;
				if (!v) { // extra pain for IE...
					v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
				}
				if (one) {
					return v;
				}
				a.push(v);
			}
		}
		return a;
	}
	return $(el).val();
};
$.fn.clearForm = function(includeHidden) {
	return this.each(function() {
		$('input,select,textarea', this).clearFields(includeHidden);
	});
};
$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
	var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
	return this.each(function() {
		var t = this.type, tag = this.tagName.toLowerCase();
		if (re.test(t) || tag == 'textarea' || (includeHidden && /hidden/.test(t)) ) {
			this.value = '';
		}
		else if (t == 'checkbox' || t == 'radio') {
			this.checked = false;
		}
		else if (tag == 'select') {
			this.selectedIndex = -1;
		}
	});
};
$.fn.resetForm = function() {
	return this.each(function() {
		if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
			this.reset();
		}
	});
};
$.fn.enable = function(b) {
	if (b === undefined) {
		b = true;
	}
	return this.each(function() {
		this.disabled = !b;
	});
};
$.fn.selected = function(select) {
	if (select === undefined) {
		select = true;
	}
	return this.each(function() {
		var t = this.type;
		if (t == 'checkbox' || t == 'radio') {
			this.checked = select;
		}
		else if (this.tagName.toLowerCase() == 'option') {
			var $sel = $(this).parent('select');
			if (select && $sel[0] && $sel[0].type == 'select-one') {
				$sel.find('option').selected(false);
			}
			this.selected = select;
		}
	});
};
$.fn.ajaxSubmit.debug = false;
function log() {
	if (!$.fn.ajaxSubmit.debug)
		return;
	var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
	if (window.console && window.console.log) {
		window.console.log(msg);
	}
	else if (window.opera && window.opera.postError) {
		window.opera.postError(msg);
	}
};
})(jQuery);

/*
jquery.placeholder.js placeholder属性模拟插件
http://www.zhangxinxu.com/wordpress/2012/02/html5-placeholder%E4%BD%BF%E7%94%A8%E7%BB%8F%E9%AA%8C%E5%88%86%E4%BA%AB%E5%8F%8A%E6%8B%93%E5%B1%95/
*/
$.fn.placeholder=function(A){var B={labelMode:false,labelStyle:{},labelAlpha:false,labelAcross:false};var C=$.extend({},B,A||{});var D=function(elementEditable,elementCreateLabel){if(elementEditable.val()===""){elementCreateLabel.css("opacity",0.4).html(elementEditable.data("placeholder"));}else {elementCreateLabel.html("");}};$(this).each(function(){var E=$(this),isPlaceholder="placeholder" in document.createElement("input"),placeholder=E.attr("placeholder");if(!placeholder||(!C.labelMode&&isPlaceholder)||(C.labelMode&&!C.labelAcross&&isPlaceholder)){return;}E.data("placeholder",placeholder);if(C.labelMode){var F=E.attr("id"),elementLabel=null;if(!F){F="placeholder"+Math.random();E.attr("id",F);}elementLabel=$('<label for="'+F+'"></label>').css($.extend({lineHeight:"1.3",position:"absolute",color:"graytext",cursor:"text",margin:"2px 0 0 3px"},C.labelStyle)).insertBefore(E);if(C.labelAlpha){E.bind({"focus":function(){D($(this),elementLabel);},"input":function(){D($(this),elementLabel);},"blur":function(){if(this.value===""){elementLabel.css("opacity",1).html(placeholder);}}});if(!window.screenX){E.bind("keyup",function(){D($(this),elementLabel);});E.get(0).onpaste=function(){setTimeout(function(){D(E,elementLabel);},30);}}elementLabel.get(0).oncontextmenu=function(){E.trigger("focus");return false;}}else {E.bind({"focus":function(){elementLabel.html("");},"blur":function(){if($(this).val()===""){elementLabel.html(placeholder);}}});}if(C.labelAcross){E.removeAttr("placeholder");}if(E.val()===""){elementLabel.html(placeholder);}}else {E.bind({"focus":function(){if($(this).val()===placeholder){$(this).val("");}$(this).css("color","");},"blur":function(){if($(this).val()===""){$(this).val(placeholder).css("color","graytext");}}});if(E.val()===""){E.val(placeholder).css("color","graytext");}}});};

/*
分页插件pagination
基于Pagination 1.2
修正了按钮圆角的问题，调用了corner插件
*******************************************************************************************
*/
$.fn.pagination = function(maxentries, opts){
	opts = jQuery.extend({
		items_per_page:10,
		num_display_entries:5,
		current_page:0,
		num_edge_entries:1,
		link_to:"javascript:",
		prev_text:"<",
		next_text:">",
		ellipse_text:"...",
		prev_show_always:true,
		next_show_always:true,
		corner:'4px',
		callback:function(){return false;}
	},opts||{});

	return this.each(function(){
		$(this).attr("np",numPages());
		function numPages() {
			return Math.ceil(maxentries/opts.items_per_page);
		}
		function getInterval()  {
			var ne_half = Math.ceil(opts.num_display_entries/2);
			var np = numPages();
			var upper_limit = np-opts.num_display_entries;
			var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
			var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
			return [start,end];
		}
		function pageSelected(page_id, evt){
			current_page = page_id;
			$('#do').attr('pid',current_page);
			drawLinks();
			var continuePropagation = opts.callback(page_id, panel);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
				else {
					evt.cancelBubble = true;
				}
			}
			setTimeout(setCorner,10);
			return continuePropagation;
		}
		function setCorner(){
		if(opts.corner==0) return;
		$(panel).find("span").corner(opts.corner).end().find("a").corner(opts.corner+" Hover").end();
		}
		function drawLinks() {
			panel.empty();
			var interval = getInterval();
			var np = numPages();
			var getClickHandler = function(page_id) {
				return function(evt){ return pageSelected(page_id,evt); }
			}
			var appendItem = function(page_id, appendopts){
				page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
				appendopts = jQuery.extend({text:page_id+1, classes:""}, appendopts||{});
				if(page_id == current_page){
					var lnk = $("<span class='current'>"+(appendopts.text)+"</span>");
				}
				else
				{
					var lnk = $("<a>"+(appendopts.text)+"</a>")
						.bind("click", getClickHandler(page_id))
						.attr('href', opts.link_to.replace(/__id__/,page_id));
				}
				if(appendopts.classes){lnk.addClass(appendopts.classes);}
				panel.append(lnk);
			}
			if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
				appendItem(current_page-1,{text:opts.prev_text, classes:"prev"});
			}
			if (interval[0] > 0 && opts.num_edge_entries > 0)
			{
				var end = Math.min(opts.num_edge_entries, interval[0]);
				for(var i=0; i<end; i++) {
					appendItem(i);
				}
				if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
				{
					jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
			}
			for(var i=interval[0]; i<interval[1]; i++) {
				appendItem(i);
			}
			if (interval[1] < np && opts.num_edge_entries > 0)
			{
				if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
				{
					jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
				var begin = Math.max(np-opts.num_edge_entries, interval[1]);
				for(var i=begin; i<np; i++) {
					appendItem(i);
				}
			}
			if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
				appendItem(current_page+1,{text:opts.next_text, classes:"next"});
			}
		setTimeout(setCorner,10);
		}
		opts.current_page=(opts.current_page<0) ? 0 : opts.current_page;
		var current_page = opts.current_page;
		$('#do').attr('pid',current_page);
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		var panel = jQuery(this);
		this.selectPage = function(page_id){ pageSelected(page_id);}
		this.prevPage = function(){
			if (current_page > 0) {
				pageSelected(current_page - 1);
				return true;
			}
			else {
				return false;
			}
		}
		this.nextPage = function(){
			if(current_page < numPages()-1) {
				pageSelected(current_page+1);
				return true;
			}
			else {
				return false;
			}
		}
		drawLinks();
	});
};

/*
	定时器
	$("#close-button").oneTime(1000,function(){});
	$("#close-button").stopTime();
	1. everyTime(时间间隔, [计时器名称], 函式名称, [次数限制], [等待函式程序完成])
	2. oneTime(时间间隔, [计时器名称], 呼叫的函式)
	3. stopTime ([计时器名称], [函式名称])
*/
jQuery.fn.extend({everyTime:function(A,B,C,D,E){return this.each(function(){jQuery.timer.add(this,A,B,C,D,E);});},oneTime:function(A,B,C){return this.each(function(){jQuery.timer.add(this,A,B,C,1);});},stopTime:function(A,B){return this.each(function(){jQuery.timer.remove(this,A,B);});}});jQuery.extend({timer:{guid:1,global:{},regex:/^([0-9]+)\s*(.*s)?$/,powers:{'ms':1,'cs':10,'ds':100,'s':1000,'das':10000,'hs':100000,'ks':1000000},timeParse:function(A){if(A==undefined||A==null)return null;var B=this.regex.exec(jQuery.trim(A.toString()));if(B[2]){var C=parseInt(B[1],10);var D=this.powers[B[2]]||1;return C*D;}else {return A;}},add:function(A,B,C,D,E,F){var G=0;if(jQuery.isFunction(C)){if(!E)E=D;D=C;C=B;}B=jQuery.timer.timeParse(B);if(typeof B!='number'||isNaN(B)||B<=0)return;if(E&&E.constructor!=Number){F=!!E;E=0;}E=E||0;F=F||false;if(!A.$timers)A.$timers={};if(!A.$timers[C])A.$timers[C]={};D.$timerID=D.$timerID||this.guid++;var H=function(){if(F&&this.inProgress)return;this.inProgress=true;if((++G>E&&E!==0)||D.call(A,G)===false)jQuery.timer.remove(A,C,D);this.inProgress=false;};H.$timerID=D.$timerID;if(!A.$timers[C][D.$timerID])A.$timers[C][D.$timerID]=window.setInterval(H,B);if(!this.global[C])this.global[C]=[];this.global[C].push(A);},remove:function(A,B,E){var D=A.$D,ret;if(D){if(!B){for(B in D)this.remove(A,B,E);}else if(D[B]){if(E){if(E.$timerID){window.clearInterval(D[B][E.$timerID]);delete D[B][E.$timerID];}}else {for(var E in D[B]){window.clearInterval(D[B][E]);delete D[B][E];}}for(ret in D[B])break;if(!ret){ret=null;delete D[B];}}for(ret in D)break;if(!ret)A.$D=null;}}}});if(jQuery.browser.msie)jQuery(window).one("unload",function(){var A=jQuery.timer.global;for(var B in A){var C=A[B],i=C.length;while(--i)jQuery.timer.remove(C[i],B);}});

/*
	置顶插件scrolltotop
	scrolltotop.controlHTML='<a href="#top" id="scrolltotop">返回顶部</a>';
	scrolltotop.init();
*/
scrolltotop={setting:{startline:100,scrollto:0,scrollduration:500,fadeduration:[500,100]},controlHTML:'<a href="#top" id="scrolltotop"></a>',controlattrs:{offsetx:5,offsety:5},anchorkeyword:'#top',state:{isvisible:false,shouldvisible:false},scrollup:function(){if(!this.cssfixedsupport){if(this.$control!=undefined)this.$control.css({opacity:0})};var A=isNaN(this.setting.scrollto)?this.setting.scrollto:parseInt(this.setting.scrollto);if(typeof A=="string"&&jQuery('#'+A).length==1){A=jQuery('#'+A).offset().top;}else {A=this.setting.scrollto;};if(this.$body!=undefined)this.$body.animate({scrollTop:A},this.setting.scrollduration);},keepfixed:function(){var $A=jQuery(A);var B=$A.scrollLeft()+$A.width()-this.$control.width()-this.controlattrs.offsetx;var C=$A.scrollTop()+$A.height()-this.$control.height()-this.controlattrs.offsety;this.$control.css({left:B+'px',top:C+'px'});},togglecontrol:function(){var A=jQuery(window).scrollTop();if(!this.cssfixedsupport){this.keepfixed();};this.state.shouldvisible=(A>=this.setting.startline)?true:false;if(this.state.shouldvisible&&!this.state.isvisible){this.$control.stop().animate({opacity:1},this.setting.fadeduration[0]);this.state.isvisible=true;}else if(this.state.shouldvisible==false&&this.state.isvisible){this.$control.stop().animate({opacity:0},this.setting.fadeduration[1]);this.state.isvisible=false;}},init:function(){jQuery(document).ready(function($){if($("body").attr('scrolltotop')!='no'){scrolltotop.cssfixedsupport=!document.all||document.all&&document.compatMode=="CSS1Compat"&&window.XMLHttpRequest;scrolltotop.$body=(window.opera)?(document.compatMode=="CSS1Compat"?$('html'):$('body')):$('html,body');scrolltotop.$control=$('<div id="topcontrol">'+scrolltotop.controlHTML+'</div>').css({position:scrolltotop.cssfixedsupport?'fixed':'absolute',bottom:scrolltotop.controlattrs.offsety,right:scrolltotop.controlattrs.offsetx,opacity:0,cursor:'pointer'}).click(function(){scrolltotop.scrollup();return false;}).appendTo('body');if(document.all&&!window.XMLHttpRequest&&scrolltotop.$control.text()!=''){scrolltotop.$control.css({width:scrolltotop.$control.width()});};scrolltotop.togglecontrol();$('a[href="'+scrolltotop.anchorkeyword+'"]').click(function(){scrolltotop.scrollup();return false;});$(window).bind('scroll resize',function(e){scrolltotop.togglecontrol();});}});}};

/*
	工具提示tooltip
	指向参数：gravity:'n'; // nw | n | ne | w | e | sw | s | se
	隐显参数：fade:true	delayIn: 500, delayOut: 1000
	html支持参数：html:true
	$('.shelp').eq(0).tooltip({trigger: 'manual',classname:'paopaotip',corner:'10px',gravity:'s'});
	$('.shelp').eq(0).tooltip('show');
*/
function fixTitle($ele){if($ele.attr('title')||typeof($ele.attr('original-title'))!='string'){$ele.attr('original-title',$ele.attr('title')||'').removeAttr('title');}}function Tooltip(A,B){this.$A=$(A);this.options=B;this.enabled=true;fixTitle(this.$A);}Tooltip.prototype={show:function(){var A=this.getTitle();if(A&&this.enabled){var $B=this.tip();$B.find('.'+this.options.classname+'-inner')[this.options.html?'html':'text'](A);$B[0].className=this.options.classname;$B.remove().css({top:0,left:0,visibility:'hidden',display:'block'}).appendTo(document.body);var C=$.extend({},this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight});var D=$B[0].offsetWidth,actualHeight=$B[0].offsetHeight;var E=(typeof this.options.gravity=='function')?this.options.gravity.call(this.$element[0]):this.options.gravity;var F;switch(E.charAt(0)){case'n':F={top:C.top+C.height+this.options.offset,left:C.left+C.width/2-D/2};break;case's':F={top:C.top-actualHeight-this.options.offset,left:C.left+C.width/2-D/2};break;case'e':F={top:C.top+C.height/2-actualHeight/2,left:C.left-D-this.options.offset};break;case'w':F={top:C.top+C.height/2-actualHeight/2,left:C.left+C.width+this.options.offset};break;}if(E.length==2){if(E.charAt(1)=='w'){F.left=C.left+C.width/2-15;}else {F.left=C.left+C.width/2-D+15;}}$B.css(F).addClass(this.options.classname+'-'+E);if(this.options.fade){$B.stop().css({opacity:0,display:'block',visibility:'visible'}).animate({opacity:this.options.opacity});}else {$B.css({visibility:'visible',opacity:this.options.opacity});}$B.find('.tooltip-cls').parent().css('left',D-22);$B.find('.tooltip-cls').click(function(){$B.hide();});}},hide:function(){if(this.options.fade){this.tip().stop().fadeOut(function(){$(this).remove();});}else {this.tip().remove();}},getTitle:function(){var A,$B=this.$element,D=this.options;fixTitle($B);var A,D=this.options;if(typeof D.title=='string'){A=$B.attr(D.title=='title'?'original-title':D.title);}else if(typeof D.title=='function'){A=D.title.call($B[0]);}A=(''+A).replace(/(^\s*|\s*$)/,"");return A||D.fallback;},tip:function(){if(!this.$tip){this.$tip=$('<div class="'+this.options.classname+'"></div>').html((this.options.showcls?'<div style="position:relative;float:left"><span style="position:absolute;left:0;top:-5px;width:16px;height:16px"><span class="tooltip-cls"></span></span></div>':'')+'<div class="'+this.options.classname+'-arrow"></div><div class="'+this.options.classname+'-inner"/></div>');}return this.$tip;},validate:function(){if(!this.$element[0].parentNode){this.hide();this.$element=null;this.options=null;}},enable:function(){this.enabled=true;},disable:function(){this.enabled=false;},toggleEnabled:function(){this.enabled=!this.enabled;}};$.fn.tooltip=function(A){if(A===true){return this.data('tooltip');}else if(typeof A=='string'){if(this.data('tooltip')!=undefined)return this.data('tooltip')[A]();}A=$.extend({},$.fn.tooltip.defaults,A);function get(ele){var B=$.data(ele,'tooltip');if(!B){B=new Tooltip(ele,$.fn.tooltip.elementOptions(ele,A));$.data(ele,'tooltip',B);}return B;}function enter(){var B=get(this);B.hoverState='in';if(A.delayIn==0){B.show();}else {setTimeout(function(){if(B.hoverState=='in')B.show();},A.delayIn);}};function leave(){var B=get(this);B.hoverState='out';if(A.delayOut==0){B.hide();}else {setTimeout(function(){if(B.hoverState=='out')B.hide();},A.delayOut);}};if(!A.live)this.each(function(){get(this);});if(A.trigger!='manual'){var E=A.live?'live':'bind',eventIn=A.trigger=='hover'?'mouseenter':'focus',eventOut=A.trigger=='hover'?'mouseleave':'blur';this[E](eventIn,enter)[E](eventOut,leave);}return this;};$.fn.tooltip.defaults={delayIn:0,delayOut:0,fade:false,fallback:'',gravity:'nw',html:true,live:false,offset:0,opacity:1,title:'title',classname:'tooltip',corner:'3px',trigger:'hover',showcls:false};$.fn.tooltip.elementOptions=function(A,B){return $.metadata?$.extend({},B,$(A).metadata()):B;};$.fn.tooltip.autoNS=function(){return $(this).offset().top>($(document).scrollTop()+$(window).height()/2)?'s':'n';};$.fn.tooltip.autoWE=function(){return $(this).offset().left>($(document).scrollLeft()+$(window).width()/2)?'e':'w';};

/*
	doTimeOut
	demo：http://www.css88.com/demo/dotimeout
*/
(function($){var a={},c="doTimeout",d=Array.prototype.slice;$[c]=function(){return b.apply(window,[0].concat(d.call(arguments)))};$.fn[c]=function(){var f=d.call(arguments),e=b.apply(this,[c+f[0]].concat(f));return typeof f[0]==="number"||typeof f[1]==="number"?this:e};function b(l){var m=this,h,k={},g=l?$.fn:$,n=arguments,i=4,f=n[1],j=n[2],p=n[3];if(typeof f!=="string"){i--;f=l=0;j=n[1];p=n[2]}if(l){h=m.eq(0);h.data(l,k=h.data(l)||{})}else{if(f){k=a[f]||(a[f]={})}}k.id&&clearTimeout(k.id);delete k.id;function e(){if(l){h.removeData(l)}else{if(f){delete a[f]}}}function o(){k.id=setTimeout(function(){k.fn()},j)}if(p){k.fn=function(q){if(typeof p==="string"){p=g[p]}p.apply(m,d.call(n,i))===true&&!q?o():e()};o()}else{if(k.fn){j===undefined?e():k.fn(j===false);return true}else{e()}}}})(jQuery);

/*
 * jScrollPane - v2.0.0beta11 - 2012-04-23
 * http://jscrollpane.kelvinluck.com/
 */
(function(b,a,c){b.fn.jScrollPane=function(e){function d(D,O){var ay,Q=this,Y,aj,v,al,T,Z,y,q,az,aE,au,i,I,h,j,aa,U,ap,X,t,A,aq,af,am,G,l,at,ax,x,av,aH,f,L,ai=true,P=true,aG=false,k=false,ao=D.clone(false,false).empty(),ac=b.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";aH=D.css("paddingTop")+" "+D.css("paddingRight")+" "+D.css("paddingBottom")+" "+D.css("paddingLeft");f=(parseInt(D.css("paddingLeft"),10)||0)+(parseInt(D.css("paddingRight"),10)||0);function ar(aQ){var aL,aN,aM,aJ,aI,aP,aO=false,aK=false;ay=aQ;if(Y===c){aI=D.scrollTop();aP=D.scrollLeft();D.css({overflow:"hidden",padding:0});aj=D.innerWidth()+f;v=D.innerHeight();D.width(aj);Y=b('<div class="jspPane" />').css("padding",aH).append(D.children());al=b('<div class="jspContainer" />').css({width:aj+"px",height:v+"px"}).append(Y).appendTo(D)}else{D.css("width","");aO=ay.stickToBottom&&K();aK=ay.stickToRight&&B();aJ=D.innerWidth()+f!=aj||D.outerHeight()!=v;if(aJ){aj=D.innerWidth()+f;v=D.innerHeight();al.css({width:aj+"px",height:v+"px"})}if(!aJ&&L==T&&Y.outerHeight()==Z){D.width(aj);return}L=T;Y.css("width","");D.width(aj);al.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}Y.css("overflow","auto");if(aQ.contentWidth){T=aQ.contentWidth}else{T=Y[0].scrollWidth}Z=Y[0].scrollHeight;Y.css("overflow","");y=T/aj;q=Z/v;az=q>1;aE=y>1;if(!(aE||az)){D.removeClass("jspScrollable");Y.css({top:0,width:al.width()-f});n();E();R();w()}else{D.addClass("jspScrollable");aL=ay.maintainPosition&&(I||aa);if(aL){aN=aC();aM=aA()}aF();z();F();if(aL){N(aK?(T-aj):aN,false);M(aO?(Z-v):aM,false)}J();ag();an();if(ay.enableKeyboardNavigation){S()}if(ay.clickOnTrack){p()}C();if(ay.hijackInternalLinks){m()}}if(ay.autoReinitialise&&!av){av=setInterval(function(){ar(ay)},ay.autoReinitialiseDelay)}else{if(!ay.autoReinitialise&&av){clearInterval(av)}}aI&&D.scrollTop(0)&&M(aI,false);aP&&D.scrollLeft(0)&&N(aP,false);D.trigger("jsp-initialised",[aE||az])}function aF(){if(az){al.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'),b('<div class="jspDragBottom" />'))),b('<div class="jspCap jspCapBottom" />')));U=al.find(">.jspVerticalBar");ap=U.find(">.jspTrack");au=ap.find(">.jspDrag");if(ay.showArrows){aq=b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",aD(0,-1)).bind("click.jsp",aB);af=b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",aD(0,1)).bind("click.jsp",aB);if(ay.arrowScrollOnHover){aq.bind("mouseover.jsp",aD(0,-1,aq));af.bind("mouseover.jsp",aD(0,1,af))}ak(ap,ay.verticalArrowPositions,aq,af)}t=v;al.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){t-=b(this).outerHeight()});au.hover(function(){au.addClass("jspHover")},function(){au.removeClass("jspHover")}).bind("mousedown.jsp",function(aI){b("html").bind("dragstart.jsp selectstart.jsp",aB);au.addClass("jspActive");var s=aI.pageY-au.position().top;b("html").bind("mousemove.jsp",function(aJ){V(aJ.pageY-s,false)}).bind("mouseup.jsp mouseleave.jsp",aw);return false});o()}}function o(){ap.height(t+"px");I=0;X=ay.verticalGutter+ap.outerWidth();Y.width(aj-X-f);try{if(U.position().left===0){Y.css("margin-left",X+"px")}}catch(s){}}function z(){if(aE){al.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'),b('<div class="jspDragRight" />'))),b('<div class="jspCap jspCapRight" />')));am=al.find(">.jspHorizontalBar");G=am.find(">.jspTrack");h=G.find(">.jspDrag");if(ay.showArrows){ax=b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",aD(-1,0)).bind("click.jsp",aB);x=b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",aD(1,0)).bind("click.jsp",aB);
if(ay.arrowScrollOnHover){ax.bind("mouseover.jsp",aD(-1,0,ax));x.bind("mouseover.jsp",aD(1,0,x))}ak(G,ay.horizontalArrowPositions,ax,x)}h.hover(function(){h.addClass("jspHover")},function(){h.removeClass("jspHover")}).bind("mousedown.jsp",function(aI){b("html").bind("dragstart.jsp selectstart.jsp",aB);h.addClass("jspActive");var s=aI.pageX-h.position().left;b("html").bind("mousemove.jsp",function(aJ){W(aJ.pageX-s,false)}).bind("mouseup.jsp mouseleave.jsp",aw);return false});l=al.innerWidth();ah()}}function ah(){al.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){l-=b(this).outerWidth()});G.width(l+"px");aa=0}function F(){if(aE&&az){var aI=G.outerHeight(),s=ap.outerWidth();t-=aI;b(am).find(">.jspCap:visible,>.jspArrow").each(function(){l+=b(this).outerWidth()});l-=s;v-=s;aj-=aI;G.parent().append(b('<div class="jspCorner" />').css("width",aI+"px"));o();ah()}if(aE){Y.width((al.outerWidth()-f)+"px")}Z=Y.outerHeight();q=Z/v;if(aE){at=Math.ceil(1/y*l);if(at>ay.horizontalDragMaxWidth){at=ay.horizontalDragMaxWidth}else{if(at<ay.horizontalDragMinWidth){at=ay.horizontalDragMinWidth}}h.width(at+"px");j=l-at;ae(aa)}if(az){A=Math.ceil(1/q*t);if(A>ay.verticalDragMaxHeight){A=ay.verticalDragMaxHeight}else{if(A<ay.verticalDragMinHeight){A=ay.verticalDragMinHeight}}au.height(A+"px");i=t-A;ad(I)}}function ak(aJ,aL,aI,s){var aN="before",aK="after",aM;if(aL=="os"){aL=/Mac/.test(navigator.platform)?"after":"split"}if(aL==aN){aK=aL}else{if(aL==aK){aN=aL;aM=aI;aI=s;s=aM}}aJ[aN](aI)[aK](s)}function aD(aI,s,aJ){return function(){H(aI,s,this,aJ);this.blur();return false}}function H(aL,aK,aO,aN){aO=b(aO).addClass("jspActive");var aM,aJ,aI=true,s=function(){if(aL!==0){Q.scrollByX(aL*ay.arrowButtonSpeed)}if(aK!==0){Q.scrollByY(aK*ay.arrowButtonSpeed)}aJ=setTimeout(s,aI?ay.initialDelay:ay.arrowRepeatFreq);aI=false};s();aM=aN?"mouseout.jsp":"mouseup.jsp";aN=aN||b("html");aN.bind(aM,function(){aO.removeClass("jspActive");aJ&&clearTimeout(aJ);aJ=null;aN.unbind(aM)})}function p(){w();if(az){ap.bind("mousedown.jsp",function(aN){if(aN.originalTarget===c||aN.originalTarget==aN.currentTarget){var aL=b(this),aO=aL.offset(),aM=aN.pageY-aO.top-I,aJ,aI=true,s=function(){var aR=aL.offset(),aS=aN.pageY-aR.top-A/2,aP=v*ay.scrollPagePercent,aQ=i*aP/(Z-v);if(aM<0){if(I-aQ>aS){Q.scrollByY(-aP)}else{V(aS)}}else{if(aM>0){if(I+aQ<aS){Q.scrollByY(aP)}else{V(aS)}}else{aK();return}}aJ=setTimeout(s,aI?ay.initialDelay:ay.trackClickRepeatFreq);aI=false},aK=function(){aJ&&clearTimeout(aJ);aJ=null;b(document).unbind("mouseup.jsp",aK)};s();b(document).bind("mouseup.jsp",aK);return false}})}if(aE){G.bind("mousedown.jsp",function(aN){if(aN.originalTarget===c||aN.originalTarget==aN.currentTarget){var aL=b(this),aO=aL.offset(),aM=aN.pageX-aO.left-aa,aJ,aI=true,s=function(){var aR=aL.offset(),aS=aN.pageX-aR.left-at/2,aP=aj*ay.scrollPagePercent,aQ=j*aP/(T-aj);if(aM<0){if(aa-aQ>aS){Q.scrollByX(-aP)}else{W(aS)}}else{if(aM>0){if(aa+aQ<aS){Q.scrollByX(aP)}else{W(aS)}}else{aK();return}}aJ=setTimeout(s,aI?ay.initialDelay:ay.trackClickRepeatFreq);aI=false},aK=function(){aJ&&clearTimeout(aJ);aJ=null;b(document).unbind("mouseup.jsp",aK)};s();b(document).bind("mouseup.jsp",aK);return false}})}}function w(){if(G){G.unbind("mousedown.jsp")}if(ap){ap.unbind("mousedown.jsp")}}function aw(){b("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");if(au){au.removeClass("jspActive")}if(h){h.removeClass("jspActive")}}function V(s,aI){if(!az){return}if(s<0){s=0}else{if(s>i){s=i}}if(aI===c){aI=ay.animateScroll}if(aI){Q.animate(au,"top",s,ad)}else{au.css("top",s);ad(s)}}function ad(aI){if(aI===c){aI=au.position().top}al.scrollTop(0);I=aI;var aL=I===0,aJ=I==i,aK=aI/i,s=-aK*(Z-v);if(ai!=aL||aG!=aJ){ai=aL;aG=aJ;D.trigger("jsp-arrow-change",[ai,aG,P,k])}u(aL,aJ);Y.css("top",s);D.trigger("jsp-scroll-y",[-s,aL,aJ]).trigger("scroll")}function W(aI,s){if(!aE){return}if(aI<0){aI=0}else{if(aI>j){aI=j}}if(s===c){s=ay.animateScroll}if(s){Q.animate(h,"left",aI,ae)
}else{h.css("left",aI);ae(aI)}}function ae(aI){if(aI===c){aI=h.position().left}al.scrollTop(0);aa=aI;var aL=aa===0,aK=aa==j,aJ=aI/j,s=-aJ*(T-aj);if(P!=aL||k!=aK){P=aL;k=aK;D.trigger("jsp-arrow-change",[ai,aG,P,k])}r(aL,aK);Y.css("left",s);D.trigger("jsp-scroll-x",[-s,aL,aK]).trigger("scroll")}function u(aI,s){if(ay.showArrows){aq[aI?"addClass":"removeClass"]("jspDisabled");af[s?"addClass":"removeClass"]("jspDisabled")}}function r(aI,s){if(ay.showArrows){ax[aI?"addClass":"removeClass"]("jspDisabled");x[s?"addClass":"removeClass"]("jspDisabled")}}function M(s,aI){var aJ=s/(Z-v);V(aJ*i,aI)}function N(aI,s){var aJ=aI/(T-aj);W(aJ*j,s)}function ab(aV,aQ,aJ){var aN,aK,aL,s=0,aU=0,aI,aP,aO,aS,aR,aT;try{aN=b(aV)}catch(aM){return}aK=aN.outerHeight();aL=aN.outerWidth();al.scrollTop(0);al.scrollLeft(0);while(!aN.is(".jspPane")){s+=aN.position().top;aU+=aN.position().left;aN=aN.offsetParent();if(/^body|html$/i.test(aN[0].nodeName)){return}}aI=aA();aO=aI+v;if(s<aI||aQ){aR=s-ay.verticalGutter}else{if(s+aK>aO){aR=s-v+aK+ay.verticalGutter}}if(aR){M(aR,aJ)}aP=aC();aS=aP+aj;if(aU<aP||aQ){aT=aU-ay.horizontalGutter}else{if(aU+aL>aS){aT=aU-aj+aL+ay.horizontalGutter}}if(aT){N(aT,aJ)}}function aC(){return -Y.position().left}function aA(){return -Y.position().top}function K(){var s=Z-v;return(s>20)&&(s-aA()<10)}function B(){var s=T-aj;return(s>20)&&(s-aC()<10)}function ag(){al.unbind(ac).bind(ac,function(aL,aM,aK,aI){var aJ=aa,s=I;Q.scrollBy(aK*ay.mouseWheelSpeed,-aI*ay.mouseWheelSpeed,false);return aJ==aa&&s==I})}function n(){al.unbind(ac)}function aB(){return false}function J(){Y.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(s){ab(s.target,false)})}function E(){Y.find(":input,a").unbind("focus.jsp")}function S(){var s,aI,aK=[];aE&&aK.push(am[0]);az&&aK.push(U[0]);Y.focus(function(){D.focus()});D.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(aN){if(aN.target!==this&&!(aK.length&&b(aN.target).closest(aK).length)){return}var aM=aa,aL=I;switch(aN.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:s=aN.keyCode;aJ();break;case 35:M(Z-v);s=null;break;case 36:M(0);s=null;break}aI=aN.keyCode==s&&aM!=aa||aL!=I;return !aI}).bind("keypress.jsp",function(aL){if(aL.keyCode==s){aJ()}return !aI});if(ay.hideFocus){D.css("outline","none");if("hideFocus" in al[0]){D.attr("hideFocus",true)}}else{D.css("outline","");if("hideFocus" in al[0]){D.attr("hideFocus",false)}}function aJ(){var aM=aa,aL=I;switch(s){case 40:Q.scrollByY(ay.keyboardSpeed,false);break;case 38:Q.scrollByY(-ay.keyboardSpeed,false);break;case 34:case 32:Q.scrollByY(v*ay.scrollPagePercent,false);break;case 33:Q.scrollByY(-v*ay.scrollPagePercent,false);break;case 39:Q.scrollByX(ay.keyboardSpeed,false);break;case 37:Q.scrollByX(-ay.keyboardSpeed,false);break}aI=aM!=aa||aL!=I;return aI}}function R(){D.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function C(){if(location.hash&&location.hash.length>1){var aK,aI,aJ=escape(location.hash.substr(1));try{aK=b("#"+aJ+', a[name="'+aJ+'"]')}catch(s){return}if(aK.length&&Y.find(aJ)){if(al.scrollTop()===0){aI=setInterval(function(){if(al.scrollTop()>0){ab(aK,true);b(document).scrollTop(al.position().top);clearInterval(aI)}},50)}else{ab(aK,true);b(document).scrollTop(al.position().top)}}}}function m(){if(b(document.body).data("jspHijack")){return}b(document.body).data("jspHijack",true);b(document.body).delegate("a[href*=#]","click",function(s){var aI=this.href.substr(0,this.href.indexOf("#")),aK=location.href,aO,aP,aJ,aM,aL,aN;if(location.href.indexOf("#")!==-1){aK=location.href.substr(0,location.href.indexOf("#"))}if(aI!==aK){return}aO=escape(this.href.substr(this.href.indexOf("#")+1));aP;try{aP=b("#"+aO+', a[name="'+aO+'"]')}catch(aQ){return}if(!aP.length){return}aJ=aP.closest(".jspScrollable");aM=aJ.data("jsp");aM.scrollToElement(aP,true);if(aJ[0].scrollIntoView){aL=b(a).scrollTop();aN=aP.offset().top;if(aN<aL||aN>aL+b(a).height()){aJ[0].scrollIntoView()}}s.preventDefault()
})}function an(){var aJ,aI,aL,aK,aM,s=false;al.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(aN){var aO=aN.originalEvent.touches[0];aJ=aC();aI=aA();aL=aO.pageX;aK=aO.pageY;aM=false;s=true}).bind("touchmove.jsp",function(aQ){if(!s){return}var aP=aQ.originalEvent.touches[0],aO=aa,aN=I;Q.scrollTo(aJ+aL-aP.pageX,aI+aK-aP.pageY);aM=aM||Math.abs(aL-aP.pageX)>5||Math.abs(aK-aP.pageY)>5;return aO==aa&&aN==I}).bind("touchend.jsp",function(aN){s=false}).bind("click.jsp-touchclick",function(aN){if(aM){aM=false;return false}})}function g(){var s=aA(),aI=aC();D.removeClass("jspScrollable").unbind(".jsp");D.replaceWith(ao.append(Y.children()));ao.scrollTop(s);ao.scrollLeft(aI);if(av){clearInterval(av)}}b.extend(Q,{reinitialise:function(aI){aI=b.extend({},ay,aI);ar(aI)},scrollToElement:function(aJ,aI,s){ab(aJ,aI,s)},scrollTo:function(aJ,s,aI){N(aJ,aI);M(s,aI)},scrollToX:function(aI,s){N(aI,s)},scrollToY:function(s,aI){M(s,aI)},scrollToPercentX:function(aI,s){N(aI*(T-aj),s)},scrollToPercentY:function(aI,s){M(aI*(Z-v),s)},scrollBy:function(aI,s,aJ){Q.scrollByX(aI,aJ);Q.scrollByY(s,aJ)},scrollByX:function(s,aJ){var aI=aC()+Math[s<0?"floor":"ceil"](s),aK=aI/(T-aj);W(aK*j,aJ)},scrollByY:function(s,aJ){var aI=aA()+Math[s<0?"floor":"ceil"](s),aK=aI/(Z-v);V(aK*i,aJ)},positionDragX:function(s,aI){W(s,aI)},positionDragY:function(aI,s){V(aI,s)},animate:function(aI,aL,s,aK){var aJ={};aJ[aL]=s;aI.animate(aJ,{duration:ay.animateDuration,easing:ay.animateEase,queue:false,step:aK})},getContentPositionX:function(){return aC()},getContentPositionY:function(){return aA()},getContentWidth:function(){return T},getContentHeight:function(){return Z},getPercentScrolledX:function(){return aC()/(T-aj)},getPercentScrolledY:function(){return aA()/(Z-v)},getIsScrollableH:function(){return aE},getIsScrollableV:function(){return az},getContentPane:function(){return Y},scrollToBottom:function(s){V(i,s)},hijackInternalLinks:b.noop,destroy:function(){g()}});ar(O)}e=b.extend({},b.fn.jScrollPane.defaults,e);b.each(["mouseWheelSpeed","arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){e[this]=e[this]||e.speed});return this.each(function(){var f=b(this),g=f.data("jsp");if(g){g.reinitialise(e)}else{g=new d(f,e);f.data("jsp",g)}})};b.fn.jScrollPane.defaults={showArrows:false,maintainPosition:true,stickToBottom:false,stickToRight:false,clickOnTrack:true,autoReinitialise:false,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:false,animateDuration:300,animateEase:"linear",hijackInternalLinks:false,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:0,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:false,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:true,hideFocus:false,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:0.8}})(jQuery,this);

/*
	jquery.mousewheel 3.0.6
	https://github.com/brandonaaron/jquery-mousewheel/
*/
(function($){var B=['DOMMouseScroll','mousewheel'];if($.event.fixHooks){for(var C=B.length;C;){$.event.fixHooks[B[--C]]=$.event.mouseHooks;}}$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var C=B.length;C;){this.addEventListener(B[--C],handler,false);}}else {this.onmousewheel=handler;}},teardown:function(){if(this.removeEventListener){for(var C=B.length;C;){this.removeEventListener(B[--C],handler,false);}}else {this.onmousewheel=null;}}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel");},unmousewheel:function(fn){return this.unbind("mousewheel",fn);}});function handler(event){var F=event||window.event,args=[].slice.call(arguments,1),delta=0,returnValue=true,deltaX=0,deltaY=0;event=$.event.fix(F);event.type="mousewheel";if(F.wheelDelta){delta=F.wheelDelta/120;}if(F.detail){delta=-F.detail/3;}deltaY=delta;if(F.axis!==undefined&&F.axis===F.HORIZONTAL_AXIS){deltaY=0;deltaX=-1*delta;}if(F.wheelDeltaY!==undefined){deltaY=F.wheelDeltaY/120;}if(F.wheelDeltaX!==undefined){deltaX=-1*F.wheelDeltaX/120;}args.unshift(event,delta,deltaX,deltaY);return ($.event.dispatch||$.event.handle).apply(this,args);}})(jQuery);

/*
	tab插件idTabs
	基于idTabs v3.0
	$("#usual ul").idTabs();
	$(".fade").fadeTabs();
	idTabs("tab2");
*/
// Helper functions
var idTabs, //shortcut
undefined,  //speed up
href = function(e){ return $(e).attr("href"); },
type = function(o){ //reliable
  return o===null && "Null"
	  || o===undefined && "Undefined"
	  || ({}).toString.call(o).slice(8,-1);
};
$.fn.idTabs = function(){
  var s = idTabs.args.apply(this,arguments),
  action = s.update&&"update" || s.remove&&"remove" || "bind";
  s.area = this; //save context
  idTabs[action](s);
  return this; //chainable
};
idTabs = $.idTabs = function(tabarea,options,data){
  // Settings
  var e, tabs, items, test=$(), meta = $.metadata?$(tabarea).metadata():{}, //metadata
  s = {tab:idTabs.tab,item:idTabs.item}; //helpers
  s = $.extend(s,idTabs.settings,meta,options||{}); //settings
  s.tabarea = $(tabarea); //save context
  s.data = data||"idTabs"+ +new Date; //save expando
  // Play nice
  $.each({selected:'.',event:'!',start:'#'},function(n,c){
	if(type(s[n])=="String" && s[n].indexOf(c)==0)
	  s[n] = s[n].substr(1); }); //removes type characters
  if(s.start===null) s.start=-1; //no tab selected
  // Find tabs
  items = []; //save elements
  s.tabs = tabs = $("a[href^=#]",tabarea); //save tabs
  tabs.each(function(){ //add items
	test = s.item(href(this));
	if(test.length) items=items.concat(test.get());
  });
  s.items = $(items).hide(); //hide items
  // Save Settings
  e="idTabs."+s.event;
  data=s.tabarea.data("idTabs")||{};
  data[e]=s;
  s.tabarea.data("idTabs",data);
  // Bind idTabs
  tabs.trigger(e).data(s.data,s)
	  .bind(e,{s:s},function(){ //wrapper function due to jQuery bug
		return idTabs.unbind.apply(this,arguments); })
	  .bind(s.event,{s:s},idTabs.find);
  // Select default tab
	 type(s.start) == "Number" && (s.start<0 || (test=tabs.eq(s.start)).length)
  || type(s.start) == "String" && (test=tabs.filter("a[href=#"+s.start+"]")).length
  || (test=tabs.filter('.'+s.selected).removeClass(s.selected)).length
  || (s.start===undefined && (test=tabs.eq(0)).length);
  if(test.length) test.trigger(s.event);

  return s; //return current settings (be creative)
};
// Parse arguments into settings
idTabs.args = function(){
  var a,i=0,s={},args=arguments,
  // Handle string flags .!:
  str = function(_,a){
	if(a.indexOf('.')==0) s.selected = a;
	else if(a.indexOf('!')==0)
	  if(/^!(true|false)$/i.test(a)) s.toggle = /^!true$/i.test(a);
	  else s.event = a;
	else if(a.indexOf(':')==0) {
	  a=a.substr(1).toLowerCase();
	  if(a.indexOf('!')==0) s[a.substr(1)]=false;
	  else s[a]=true;
	} else if(a) s.start = a;
  };
  // Loop through arguments matching options
  while(i<args.length) {
	a=args[i++];
	switch(type(a)){
	  case "Object"   : $.extend(s,a); break;
	  case "Boolean"  : s.change = a;  break;
	  case "Number"   : s.start = a;   break;
	  case "Function" : s.click = a;   break;
	  case "Null"     : s.start = a;   break;
	  case "String"   : $.each(a.split(/\s+/g),str);
	  default: break;
	}
  }
  return s; //settings object
};
// Bind idTabs
idTabs.bind = function(s){
  if(!s) return;
  var data = "idTabs"+ +new Date; //instance expando
  if(s.grouped) $.idTabs(s.area,s,data);
  else s.area.each(function(){ $.idTabs(this,s,data); });
};
// Rebind idTabs
idTabs.update = function(s){
  if(!s) return;
  s.update=false;
  var self,data,n,e = s.event;
  e = (e+"").indexOf('!')==0 && e.substr(1) || e;
  e = e?"idTabs."+e:"";
  return s.area.each(function(){
	self = $(this);
	data = self.data("idTabs");
	if(!data) return;
	if(e) {
	  n=$.extend({},data[e],s);
	  idTabs.remove(data[e])
	  idTabs(n.tabarea,n,n.data);
	} else for(e in data) {
	  if(!Object.hasOwnProperty.call(data, e)) continue;
	  n=$.extend({},data[e],s);
	  idTabs.remove(data[e]);
	  idTabs(n.tabarea,n,n.data);
	}
  });
};
// Unbind idTabs
idTabs.remove = function(s){
  if(!s) return;
  var data,tabs,e = s.event;
  e = (e+"").indexOf('!')==0 && e.substr(1) || e;
  e = "idTabs"+(e?"."+e:"");
  return s.area.each(function(){
	data=$(this).data("idTabs");
	delete data["idTabs."+s.event];
	$(this).data("idTabs",data);
	tabs = s.tabs || $("a[href^=#]",this); //save tabs
	if(!tabs.length && $(this).is("a[href^=#]")) tabs = $(this);
	tabs.trigger(e);
  });
};
// Find tabs
idTabs.find = function(e){
  // Save self since clicked tab may not be the first tab in the tabarea
  var self=this, ret=false, s=e.data.s;
  // Find first tab within each tabset
  $("a[href="+href(this)+"]:first",s.area).each(function(){
	var t = $(this).data(s.data); //tab's settings
	if(t) ret=idTabs.showtab.call(t.tabarea==s.tabarea?self:this,t,e)||ret;
  });
  return ret;
};
// Show tab
idTabs.showtab = function(s,e){
  if(!s || !s.toggle && $(this).is('.'+s.selected))
	return s&&s.change; //return if already selected
  var id = href(this); //find id
  if(s.click && s.click.call(this,id,s,e)==false) return s.change; //call custom func
  if(s.toggle && $(this).is('.'+s.selected)) id=null; //hide items
  return idTabs.show.call(this,id,s,e); //call default func
};
// Show item
idTabs.show = function(id,s){
  s.tabs.removeClass(s.selected); //clear tabs
  s.tab(id).addClass(s.selected); //select tab(s)
  s.items.hide(); //hide all items
  s.item(id).show(); //show item(s)
  return s.change; //option for changing url
};
// Unbind idTabs
idTabs.unbind = function(e){
  var s = e.data.s;
  $(this).removeData(s.data)
  .unbind("idTabs."+s.event);
  return false;
};
// Extend idTabs
idTabs.extend = function(){
  var args = arguments;
  return function(){
	[].push.apply(args,arguments);
	this.idTabs.apply(this,args);
  };
};
// Matching tabs
idTabs.tab = function(id){
  if(!id) return $([]);
  return $("a[href="+id+"]",this.tabarea);
};
// Matching items
idTabs.item = function(id){
  if(!id) return $([]);
  var item = $(id);
  return item.length?item:$('.'+id.substr(1));
};
// Defaults
idTabs.settings = {
  start:undefined,
  change:false,
  click:null,
  selected:".selected",
  event:"!click",
  toggle:false,
  grouped:false
};
// Auto-run
$(function(){ $(".idTabs").idTabs(); });

/*
	圆角插件corner
	基于jquery.corner.js
	修正了按钮圆角的问题，调用了corner插件
	$('.qmenu').corner("5px");
*/
if(!document.createElement('canvas').getContext){(function(){var m=Math;var y=m.round;var z=m.sin;var A=m.cos;var Z=10;var B=Z/2;function getContext(){if(this.context_){return this.context_}return this.context_=new CanvasRenderingContext2D_(this)}var C=Array.prototype.slice;function bind(f,b,c){var a=C.call(arguments,2);return function(){return f.apply(b,a.concat(C.call(arguments)))}}var D={init:function(a){if(/MSIE/.test(navigator.userAgent)&&!window.opera){var b=a||document;b.createElement('canvas');b.attachEvent('onreadystatechange',bind(this.init_,this,b))}},init_:function(a){if(!a.namespaces['g_vml_']){a.namespaces.add('g_vml_','urn:schemas-microsoft-com:vml')}if(!a.styleSheets['ex_canvas_']){var b=a.createStyleSheet();b.owningElement.id='ex_canvas_';b.cssText='canvas{display:inline-block;overflow:hidden;'+'text-align:left;width:300px;height:150px}'+'g_vml_\\:*{behavior:url(#default#VML)}'}},i:function(a){if(!a.getContext){a.getContext=getContext;a.attachEvent('onpropertychange',onPropertyChange);a.attachEvent('onresize',onResize);var b=a.attributes;if(b.width&&b.width.specified){a.style.width=b.width.nodeValue+'px'}else{a.width=a.clientWidth}if(b.height&&b.height.specified){a.style.height=b.height.nodeValue+'px'}else{a.height=a.clientHeight}}return a}};function onPropertyChange(e){var a=e.srcElement;switch(e.propertyName){case'width':a.style.width=a.attributes.width.nodeValue+'px';a.getContext().clearRect();break;case'height':a.style.height=a.attributes.height.nodeValue+'px';a.getContext().clearRect();break}}function onResize(e){var a=e.srcElement;if(a.firstChild){a.firstChild.style.width=a.clientWidth+'px';a.firstChild.style.height=a.clientHeight+'px'}}D.init();var E=[];for(var i=0;i<16;i++){for(var j=0;j<16;j++){E[i*16+j]=i.toString(16)+j.toString(16)}}function createMatrixIdentity(){return[[1,0,0],[0,1,0],[0,0,1]]}function processStyle(a){var b,alpha=1;a=String(a);if(a.substring(0,3)=='rgb'){var c=a.indexOf('(',3);var d=a.indexOf(')',c+1);var e=a.substring(c+1,d).split(',');b='#';for(var i=0;i<3;i++){b+=E[Number(e[i])]}if(e.length==4&&a.substr(3,1)=='a'){alpha=e[3]}}else{b=a}return[b,alpha]}function processLineCap(a){switch(a){case'butt':return'flat';case'round':return'round';case'square':default:return'square'}}function CanvasRenderingContext2D_(a){this.m_=createMatrixIdentity();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.strokeStyle='#000';this.fillStyle='#000';this.lineWidth=1;this.lineJoin='miter';this.lineCap='butt';this.miterLimit=Z*1;this.globalAlpha=1;this.canvas=a;var b=a.ownerDocument.createElement('div');b.style.width=a.clientWidth+'px';b.style.height=a.clientHeight+'px';b.style.overflow='hidden';b.style.position='absolute';a.appendChild(b);this.element_=b;this.arcScaleX_=1;this.arcScaleY_=1}var F=CanvasRenderingContext2D_.prototype;F.clearRect=function(){this.element_.innerHTML='';this.currentPath_=[]};F.beginPath=function(){this.currentPath_=[]};F.moveTo=function(a,b){var p=this.getCoords_(a,b);this.currentPath_.push({type:'moveTo',x:p.x,y:p.y});this.currentX_=p.x;this.currentY_=p.y};F.lineTo=function(a,b){var p=this.getCoords_(a,b);this.currentPath_.push({type:'lineTo',x:p.x,y:p.y});this.currentX_=p.x;this.currentY_=p.y};F.bezierCurveTo=function(a,b,c,d,e,f){var p=this.getCoords_(e,f);var g=this.getCoords_(a,b);var h=this.getCoords_(c,d);this.currentPath_.push({type:'bezierCurveTo',cp1x:g.x,cp1y:g.y,cp2x:h.x,cp2y:h.y,x:p.x,y:p.y});this.currentX_=p.x;this.currentY_=p.y};F.fillRect=function(a,b,c,d){this.beginPath();this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+c,b+d);this.lineTo(a,b+d);this.closePath();this.fill();this.currentPath_=[]};F.createLinearGradient=function(a,b,c,d){return new CanvasGradient_('gradient')};F.createRadialGradient=function(a,b,c,d,e,f){var g=new CanvasGradient_('gradientradial');g.radius1_=c;g.radius2_=f;g.focus_.x=a;g.focus_.y=b;return g};F.stroke=function(d){var e=[];var f=false;var a=processStyle(d?this.fillStyle:this.strokeStyle);var g=a[0];var h=a[1]*this.globalAlpha;var W=10;var H=10;e.push('<g_vml_:shape',' fillcolor="',g,'"',' filled="',Boolean(d),'"',' style="position:absolute;width:',W,';height:',H,';"',' coordorigin="0 0" coordsize="',Z*W,' ',Z*H,'"',' stroked="',!d,'"',' strokeweight="',this.lineWidth,'"',' strokecolor="',g,'"',' path="');var j=false;var k={x:null,y:null};var l={x:null,y:null};for(var i=0;i<this.currentPath_.length;i++){var p=this.currentPath_[i];var c;switch(p.type){case'moveTo':e.push(' m ');c=p;e.push(y(p.x),',',y(p.y));break;case'lineTo':e.push(' l ');e.push(y(p.x),',',y(p.y));break;case'close':e.push(' x ');p=null;break;case'bezierCurveTo':e.push(' c ');e.push(y(p.cp1x),',',y(p.cp1y),',',y(p.cp2x),',',y(p.cp2y),',',y(p.x),',',y(p.y));break;case'at':case'wa':e.push(' ',p.type,' ');e.push(y(p.x-this.arcScaleX_*p.radius),',',y(p.y-this.arcScaleY_*p.radius),' ',y(p.x+this.arcScaleX_*p.radius),',',y(p.y+this.arcScaleY_*p.radius),' ',y(p.xStart),',',y(p.yStart),' ',y(p.xEnd),',',y(p.yEnd));break}if(p){if(k.x==null||p.x<k.x){k.x=p.x}if(l.x==null||p.x>l.x){l.x=p.x}if(k.y==null||p.y<k.y){k.y=p.y}if(l.y==null||p.y>l.y){l.y=p.y}}}e.push(' ">');if(typeof this.fillStyle=='object'){var m={x:'50%',y:'50%'};var n=l.x-k.x;var o=l.y-k.y;var q=n>o?n:o;m.x=y(this.fillStyle.focus_.x/n*100+50)+'%';m.y=y(this.fillStyle.focus_.y/o*100+50)+'%';var r=[];if(this.fillStyle.type_=='gradientradial'){var s=this.fillStyle.radius1_/q*100;var t=this.fillStyle.radius2_/q*100-s}else{var s=0;var t=100}var u={offset:null,color:null};var v={offset:null,color:null};this.fillStyle.colors_.sort(function(a,b){return a.offset-b.offset});for(var i=0;i<this.fillStyle.colors_.length;i++){var w=this.fillStyle.colors_[i];r.push(w.offset*t+s,'% ',w.color,',');if(w.offset>u.offset||u.offset==null){u.offset=w.offset;u.color=w.color}if(w.offset<v.offset||v.offset==null){v.offset=w.offset;v.color=w.color}}r.pop();e.push('<g_vml_:fill',' color="',v.color,'"',' color2="',u.color,'"',' type="',this.fillStyle.type_,'"',' focusposition="',m.x,', ',m.y,'"',' colors="',r.join(''),'"',' opacity="',h,'" />')}else if(d){e.push('<g_vml_:fill color="',g,'" opacity="',h,'" />')}else{var x=Math.max(this.arcScaleX_,this.arcScaleY_)*this.lineWidth;e.push('<g_vml_:stroke',' opacity="',h,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',processLineCap(this.lineCap),'"',' weight="',x,'px"',' color="',g,'" />')}e.push('</g_vml_:shape>');this.element_.insertAdjacentHTML('beforeEnd',e.join(''))};F.fill=function(){this.stroke(true)};F.closePath=function(){this.currentPath_.push({type:'close'})};F.getCoords_=function(a,b){return{x:Z*(a*this.m_[0][0]+b*this.m_[1][0]+this.m_[2][0])-B,y:Z*(a*this.m_[0][1]+b*this.m_[1][1]+this.m_[2][1])-B}};function CanvasPattern_(){}G_vmlCMjrc=D})()}if(jQuery.browser.msie){document.execCommand("BackgroundImageCache",false,true)}(function($){var N=$.browser.msie;var O=N&&!window.XMLHttpRequest;var P=$.browser.opera;var Q=typeof document.createElement('canvas').getContext=="function";var R=function(i){return parseInt(i,10)||0};var S=function(a,b,c){var x=a,y;if(x.currentStyle){y=x.currentStyle[b]}else if(window.getComputedStyle){if(typeof arguments[2]=="string")b=c;y=document.defaultView.getComputedStyle(x,null).getPropertyValue(b)}return y};var T=function(a,p){return S(a,'border'+p+'Color','border-'+p.toLowerCase()+'-color')};var U=function(a,p){if(a.currentStyle&&!P){w=a.currentStyle['border'+p+'Width'];if(w=='thin')w=2;if(w=='medium'&&!(a.currentStyle['border'+p+'Style']=='none'))w=4;if(w=='thick')w=6}else{p=p.toLowerCase();w=document.defaultView.getComputedStyle(a,null).getPropertyValue('border-'+p+'-width')}return R(w)};var V=function(a,i){return a.tagName.toLowerCase()==i};var W=function(e,a,b,c,d){if(e=='tl')return a;if(e=='tr')return b;if(e=='bl')return c;if(e=='br')return d};var X=function(a,b,c,d,e,f,g){var h,curve_to;if(d.indexOf('rgba')!=-1){var i=/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;var j=i.exec(d);if(j){var k=[R(j[1]),R(j[2]),R(j[3])];d='rgb('+k[0]+', '+k[1]+', '+k[2]+')'}}var l=a.getContext('2d');if(b==1||g=='notch'){if(e>0&&b>1){l.fillStyle=f;l.fillRect(0,0,b,b);l.fillStyle=d;h=W(c,[0-e,0-e],[e,0-e],[0-e,e],[e,e]);l.fillRect(h[0],h[1],b,b)}else{l.fillStyle=d;l.fillRect(0,0,b,b)}return a}else if(g=='bevel'){h=W(c,[0,0,0,b,b,0,0,0],[0,0,b,b,b,0,0,0],[0,0,b,b,0,b,0,0],[b,b,b,0,0,b,b,b]);l.fillStyle=d;l.beginPath();l.moveTo(h[0],h[1]);l.lineTo(h[2],h[3]);l.lineTo(h[4],h[5]);l.lineTo(h[6],h[7]);l.fill();if(e>0&&e<b){l.strokeStyle=f;l.lineWidth=e;l.beginPath();h=W(c,[0,b,b,0],[0,0,b,b],[b,b,0,0],[0,b,b,0]);l.moveTo(h[0],h[1]);l.lineTo(h[2],h[3]);l.stroke()}return a}h=W(c,[0,0,b,0,b,0,0,b,0,0],[b,0,b,b,b,0,0,0,0,0],[0,b,b,b,0,b,0,0,0,b],[b,b,b,0,b,0,0,b,b,b]);l.fillStyle=d;l.beginPath();l.moveTo(h[0],h[1]);l.lineTo(h[2],h[3]);if(c=='br')l.bezierCurveTo(h[4],h[5],b,b,h[6],h[7]);else l.bezierCurveTo(h[4],h[5],0,0,h[6],h[7]);l.lineTo(h[8],h[9]);l.fill();if(e>0&&e<b){var m=e/2;var n=b-m;h=W(c,[n,m,n,m,m,n],[n,n,n,m,m,m],[n,n,m,n,m,m,m,n],[n,m,n,m,m,n,n,n]);curve_to=W(c,[0,0],[0,0],[0,0],[b,b]);l.strokeStyle=f;l.lineWidth=e;l.beginPath();l.moveTo(h[0],h[1]);l.bezierCurveTo(h[2],h[3],curve_to[0],curve_to[1],h[4],h[5]);l.stroke()}return a};var Y=function(p,a){var b=document.createElement('canvas');b.setAttribute("height",a);b.setAttribute("width",a);b.style.display="block";b.style.position="absolute";b.className="jrCorner";Z(p,b);if(!Q&&N){if(typeof G_vmlCanvasManager=="object"){b=G_vmlCanvasManager.initElement(b)}else if(typeof G_vmlCMjrc=="object"){b=G_vmlCMjrc.i(b)}else{throw Error('Could not find excanvas');}}return b};var Z=function(p,a){if(p.is("table")){p.children("tbody").children("tr:first").children("td:first").append(a);p.css('display','block')}else if(p.is("td")){if(p.children(".JrcTdContainer").length===0){p.html('<div class="JrcTdContainer" style="padding:0px;position:relative;margin:-1px;zoom:1;">'+p.html()+'</div>');p.css('zoom','1');if(O){p.children(".JrcTdContainer").get(0).style.setExpression("height","this.parentNode.offsetHeight")}}p.children(".JrcTdContainer").append(a)}else{p.append(a)}};if(N){var ba=document.createStyleSheet();ba.media='print';ba.cssText='.jrcIECanvasDiv { display:none !important; }'}var bb=function(D){if(this.length==0||!(Q||N)){return this}if(D=="destroy"){return this.each(function(){var p,elm=$(this);if(elm.is(".jrcRounded")){if(typeof elm.data("ie6tmr.jrc")=='number')window.clearInterval(elm.data("ie6tmr.jrc"));if(elm.is("table"))p=elm.children("tbody").children("tr:first").children("td:first");else if(elm.is("td"))p=elm.children(".JrcTdContainer");else p=elm;p.children(".jrCorner").remove();elm.unbind('mouseleave.jrc').unbind('mouseenter.jrc').removeClass('jrcRounded').removeData('ie6tmr.jrc');if(elm.is("td"))elm.html(elm.children(".JrcTdContainer").html())}})}var o=(D||"").toLowerCase();var E=R((o.match(/(\d+)px/)||[])[1])||"auto";var F=((o.match(/(#[0-9a-f]+)/)||[])[1])||"auto";var G=/round|bevel|notch/;var H=((o.match(G)||['round'])[0]);var I=/hover/.test(o);var J=/oversized/.test(o);var K=o.match("hiddenparent");if(N){var G=/ie6nofix|ie6fixinit|ie6fixexpr|ie6fixonload|ie6fixwidthint|ie6fixheightint|ie6fixbothint/;var L=((o.match(G)||['ie6fixinit'])[0])}var M={tl:/top|left|tl/.test(o),tr:/top|right|tr/.test(o),bl:/bottom|left|bl/.test(o),br:/bottom|right|br/.test(o)};if(!M.tl&&!M.tr&&!M.bl&&!M.br)M={tl:1,tr:1,bl:1,br:1};this.each(function(){var d=$(this),rbg=null,bg,s,b,pr;var a=this;var e=S(this,'display');var f=S(this,'position');var g=S(this,'lineHeight','line-height');if(F=="auto"){s=d.siblings(".jrcRounded:eq(0)");if(s.length>0){b=s.data("rbg.jrc");if(typeof b=="string"){rbg=b}}}if(K||rbg===null){var h=this.parentNode,hidden_parents=new Array(),a=0;while((typeof h=='object')&&!V(h,'html')){if(K&&S(h,'display')=='none'){hidden_parents.push({originalvisibility:S(h,'visibility'),elm:h});h.style.display='block';h.style.visibility='hidden'}var j=S(h,'backgroundColor','background-color');if(rbg===null&&j!="transparent"&&j!="rgba(0, 0, 0, 0)"){rbg=j}h=h.parentNode}if(rbg===null)rbg="#ffffff"}if(F=="auto"){bg=rbg;d.data("rbg.jrc",rbg)}else{bg=F}if(e=='none'){var k=S(this,'visibility');this.style.display='block';this.style.visibility='hidden';var l=true}else{var m=false}var n=d.height();var p=d.width();if(I){var q=o.replace(/hover|ie6nofix|ie6fixinit|ie6fixexpr|ie6fixonload|ie6fixwidthint|ie6fixheightint|ie6fixbothint/g,"");if(L!='ie6nofix')q="ie6fixinit "+q;d.bind("mouseenter.jrc",function(){d.addClass(d.attr("hoverclass"))});d.bind("mouseleave.jrc",function(){d.removeClass(d.attr("hoverclass"))})}if(O&&L!='ie6nofix'){this.style.zoom=1;if(L!='ie6fixexpr'){if(d.width()%2!=0)d.width(d.width()+1);if(d.height()%2!=0)d.height(d.height()+1)}$(window).load(function(){if(L=='ie6fixonload'){if(d.css('height')=='auto')d.height(d.css('height'));if(d.width()%2!=0)d.width(d.width()+1);if(d.height()%2!=0)d.height(d.height()+1)}else if(L=='ie6fixwidthint'||L=='ie6fixheightint'||L=='ie6fixbothint'){var c,ie6FixFunction;if(L=='ie6fixheightint'){ie6FixFunction=function(){d.height('auto');var a=d.height();if(a%2!=0)a=a+1;d.css({height:a})}}else if(L=='ie6fixwidthint'){ie6FixFunction=function(){d.width('auto');var a=d.width();if(a%2!=0)a=a+1;d.css({width:a});d.data('lastWidth.jrc',d.get(0).offsetWidth)}}else if(L=='ie6fixbothint'){ie6FixFunction=function(){d.width('auto');d.height('auto');var a=d.width();var b=d.height();if(b%2!=0)b=b+1;if(a%2!=0)a=a+1;d.css({width:a,height:b})}}c=window.setInterval(ie6FixFunction,100);d.data("ie6tmr.jrc",c)}})}var r=n<p?this.offsetHeight:this.offsetWidth;if(E=="auto"){E=r/2;if(E>10)E=r/4}if(E>r/2&&!J){E=r/2}E=Math.floor(E);var t=U(this,'Top');var u=U(this,'Right');var v=U(this,'Bottom');var w=U(this,'Left');if(f=='static'&&!V(this,'td')){this.style.position='relative'}else if(f=='fixed'&&N&&!(document.compatMode=='CSS1Compat'&&!O)){this.style.position='absolute'}if(t+u+v+w>0){this.style.overflow='visible'}if(l)d.css({display:'none',visibility:k});if(typeof hidden_parents!="undefined"){for(var i=0;i<hidden_parents.length;i++){hidden_parents[i].elm.style.display='none';hidden_parents[i].elm.style.visibility=hidden_parents[i].originalvisibility}}var x=0-t,p_right=0-u,p_bottom=0-v,p_left=0-w;var y=(d.find("canvas").length>0);if(y){if(V(this,'table'))pr=d.children("tbody").children("tr:first").children("td:first");else if(V(this,'td'))pr=d.children(".JrcTdContainer");else pr=d}if(M.tl){bordersWidth=t<w?t:w;if(y)pr.children("canvas.jrcTL").remove();var z=X(Y(d,E),E,'tl',bg,bordersWidth,T(this,'Top'),H);$(z).css({left:p_left,top:x}).addClass('jrcTL')}if(M.tr){bordersWidth=t<u?t:u;if(y)pr.children("canvas.jrcTR").remove();var A=X(Y(d,E),E,'tr',bg,bordersWidth,T(this,'Top'),H);$(A).css({right:p_right,top:x}).addClass('jrcTR')}if(M.bl){bordersWidth=v<w?v:w;if(y)pr.children("canvas.jrcBL").remove();var B=X(Y(d,E),E,'bl',bg,bordersWidth,T(this,'Bottom'),H);$(B).css({left:p_left,bottom:p_bottom}).addClass('jrcBL')}if(M.br){bordersWidth=v<u?v:u;if(y)pr.children("canvas.jrcBR").remove();var C=X(Y(d,E),E,'br',bg,bordersWidth,T(this,'Bottom'),H);$(C).css({right:p_right,bottom:p_bottom}).addClass('jrcBR')}if(N)d.children('canvas.jrCorner').children('div').addClass('jrcIECanvasDiv');if(O&&L=='ie6fixexpr'){if(M.bl){B.style.setExpression("bottom","this.parentNode.offsetHeight % 2 == 0 || this.parentNode.offsetWidth % 2 == 0 ? 0-(parseInt(this.parentNode.currentStyle['borderBottomWidth'])) : 0-(parseInt(this.parentNode.currentStyle['borderBottomWidth'])+1)")}if(M.br){C.style.setExpression("right","this.parentNode.offsetWidth  % 2 == 0 || this.parentNode.offsetWidth % 2 == 0 ? 0-(parseInt(this.parentNode.currentStyle['borderRightWidth']))  : 0-(parseInt(this.parentNode.currentStyle['borderRightWidth'])+1)");C.style.setExpression("bottom","this.parentNode.offsetHeight % 2 == 0 || this.parentNode.offsetWidth % 2 == 0 ? 0-(parseInt(this.parentNode.currentStyle['borderBottomWidth'])) : 0-(parseInt(this.parentNode.currentStyle['borderBottomWidth'])+1)")}if(M.tr){A.style.setExpression("right","this.parentNode.offsetWidth   % 2 == 0 || this.parentNode.offsetWidth % 2 == 0 ? 0-(parseInt(this.parentNode.currentStyle['borderRightWidth']))  : 0-(parseInt(this.parentNode.currentStyle['borderRightWidth'])+1)")}}d.addClass('jrcRounded')});if(typeof arguments[1]=="function")arguments[1](this);return this};$.fn.corner=bb})(jQuery);

/*
	腾讯UED提示信息
	ZENG.msgbox.show("设置成功！", 4, 2000);
	ZENG.msgbox.show("服务器繁忙，请稍后再试。", 1, 2000);
	ZENG.msgbox.show("数据拉取失败", 5, 2000);
	ZENG.msgbox.show("正在加载中，请稍后...", 6,8000);
*/
window.ZENG=window.ZENG||{};ZENG.dom={getById:function(a){return document.getElementById(a)},get:function(a){return(typeof(a)=="string")?document.getElementById(a):a},createElementIn:function(d,f,e,c){var a=(f=ZENG.dom.get(f)||document.body).ownerDocument.createElement(d||"div"),b;if(typeof(c)=="object"){for(b in c){if(b=="class"){a.className=c[b]}else{if(b=="style"){a.style.cssText=c[b]}else{a[b]=c[b]}}}}e?f.insertBefore(a,f.firstChild):f.appendChild(a);return a},getStyle:function(b,f){b=ZENG.dom.get(b);if(!b||b.nodeType==9){return null}var a=document.defaultView&&document.defaultView.getComputedStyle,c=!a?null:document.defaultView.getComputedStyle(b,""),d="";switch(f){case"float":f=a?"cssFloat":"styleFloat";break;case"opacity":if(!a){var h=100;try{h=b.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(g){try{h=b.filters("alpha").opacity}catch(g){}}return h/100}else{return parseFloat((c||b.style)[f])}break;case"backgroundPositionX":if(a){f="backgroundPosition";return((c||b.style)[f]).split(" ")[0]}break;case"backgroundPositionY":if(a){f="backgroundPosition";return((c||b.style)[f]).split(" ")[1]}break}if(a){return(c||b.style)[f]}else{return(b.currentStyle[f]||b.style[f])}},setStyle:function(c,g,h){if(!(c=ZENG.dom.get(c))||c.nodeType!=1){return false}var e,b=true,d=(e=document.defaultView)&&e.getComputedStyle,f=/z-?index|font-?weight|opacity|zoom|line-?height/i;if(typeof(g)=="string"){e=g;g={};g[e]=h}for(var a in g){h=g[a];if(a=="float"){a=d?"cssFloat":"styleFloat"}else{if(a=="opacity"){if(!d){a="filter";h=h>=1?"":("alpha(opacity="+Math.round(h*100)+")")}}else{if(a=="backgroundPositionX"||a=="backgroundPositionY"){e=a.slice(-1)=="X"?"Y":"X";if(d){var i=ZENG.dom.getStyle(c,"backgroundPosition"+e);a="backgroundPosition";typeof(h)=="number"&&(h=h+"px");h=e=="Y"?(h+" "+(i||"top")):((i||"left")+" "+h)}}}}if(typeof c.style[a]!="undefined"){c.style[a]=h+(typeof h==="number"&&!f.test(a)?"px":"");b=b&&true}else{b=b&&false}}return b},getScrollTop:function(a){var b=a||document;return Math.max(b.documentElement.scrollTop,b.body.scrollTop)},getClientHeight:function(a){var b=a||document;return b.compatMode=="CSS1Compat"?b.documentElement.clientHeight:b.body.clientHeight}};ZENG.string={RegExps:{trim:/^\s+|\s+$/g,ltrim:/^\s+/,rtrim:/\s+$/,nl2br:/\n/g,s2nb:/[\x20]{2}/g,URIencode:/[\x09\x0A\x0D\x20\x21-\x29\x2B\x2C\x2F\x3A-\x3F\x5B-\x5E\x60\x7B-\x7E]/g,escHTML:{re_amp:/&/g,re_lt:/</g,re_gt:/>/g,re_apos:/\x27/g,re_quot:/\x22/g},escString:{bsls:/\\/g,sls:/\//g,nl:/\n/g,rt:/\r/g,tab:/\t/g},restXHTML:{re_amp:/&amp;/g,re_lt:/&lt;/g,re_gt:/&gt;/g,re_apos:/&(?:apos|#0?39);/g,re_quot:/&quot;/g},write:/\{(\d{1,2})(?:\:([xodQqb]))?\}/g,isURL:/^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i,cut:/[\x00-\xFF]/,getRealLen:{r0:/[^\x00-\xFF]/g,r1:/[\x00-\xFF]/g},format:/\{([\d\w\.]+)\}/g},commonReplace:function(a,c,b){return a.replace(c,b)},format:function(c){var b=Array.prototype.slice.call(arguments),a;c=String(b.shift());if(b.length==1&&typeof(b[0])=="object"){b=b[0]}ZENG.string.RegExps.format.lastIndex=0;return c.replace(ZENG.string.RegExps.format,function(d,e){a=ZENG.object.route(b,e);return a===undefined?d:a})}};ZENG.object={routeRE:/([\d\w_]+)/g,route:function(d,c){d=d||{};c=String(c);var b=ZENG.object.routeRE,a;b.lastIndex=0;while((a=b.exec(c))!==null){d=d[a[0]];if(d===undefined||d===null){break}}return d}};var ua=ZENG.userAgent={},agent=navigator.userAgent;ua.ie=9-((agent.indexOf("Trident/5.0")>-1)?0:1)-(window.XDomainRequest?0:1)-(window.XMLHttpRequest?0:1);if(typeof(ZENG.msgbox)=="undefined"){ZENG.msgbox={}}ZENG.msgbox._timer=null;ZENG.msgbox.loadingAnimationPath=ZENG.msgbox.loadingAnimationPath||("gb_tip_loading.gif");ZENG.msgbox.show=function(c,g,h,a){if(typeof(a)=="number"){a={topPosition:a}}a=a||{};var j=ZENG.msgbox,i='<span class="zeng_msgbox_layer" style="display:none;z-index:10000;" id="mode_tips_v2"><span class="gtl_ico_{type}"></span>{loadIcon}{msgHtml}<span class="gtl_end"></span></span>',d='<span class="gtl_ico_loading"></span>',e=[0,0,0,0,"succ","fail","clear"],b,f;j._loadCss&&j._loadCss(a.cssPath);b=ZENG.dom.get("q_Msgbox")||ZENG.dom.createElementIn("div",document.body,false,{className:"zeng_msgbox_layer_wrap"});b.id="q_Msgbox";b.style.display="";b.innerHTML=ZENG.string.format(i,{type:e[g]||"hits",msgHtml:c||"",loadIcon:g==6?d:""});j._setPosition(b,h,a.topPosition)};ZENG.msgbox._setPosition=function(a,f,d){f=f||5000;var g=ZENG.msgbox,b=ZENG.dom.getScrollTop(),e=ZENG.dom.getClientHeight(),c=Math.floor(e/2)-40;ZENG.dom.setStyle(a,"top",((document.compatMode=="BackCompat"||ZENG.userAgent.ie<7)?b:0)+((typeof(d)=="number")?d:c)+"px");clearTimeout(g._timer);a.firstChild.style.display="";f&&(g._timer=setTimeout(g.hide,f))};ZENG.msgbox.hide=function(a){var b=ZENG.msgbox;if(a){clearTimeout(b._timer);b._timer=setTimeout(b._hide,a)}else{b._hide()}};ZENG.msgbox._hide=function(){var a=ZENG.dom.get("q_Msgbox"),b=ZENG.msgbox;clearTimeout(b._timer);if(a){var c=a.firstChild;ZENG.dom.setStyle(a,"display","none")}};

/*
	全屏插件
	http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/
*/
(function(){
    var fullScreenApi = {
            supportsFullScreen: false,
            isFullScreen: function() { return false; },
            requestFullScreen: function() {},
            cancelFullScreen: function() {},
            fullScreenEventName: '',
            prefix: ''
        },
        browserPrefixes = 'webkit moz o ms khtml'.split(' ');
    // check for native support
    if (typeof document.cancelFullScreen != 'undefined') {
        fullScreenApi.supportsFullScreen = true;
    } else {
        // check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
            fullScreenApi.prefix = browserPrefixes[i];
            if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
                fullScreenApi.supportsFullScreen = true;
                break;
            }
        }
    }
    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
        fullScreenApi.isFullScreen = function() {
            switch (this.prefix) {
                case '':
                    return document.fullScreen;
                case 'webkit':
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + 'FullScreen'];
            }
        }
        fullScreenApi.requestFullScreen = function(el) {
            return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
        }
        fullScreenApi.cancelFullScreen = function(el) {
            return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
        }
    }
    // jQuery plugin
    if (typeof jQuery != 'undefined') {
        jQuery.fn.requestFullScreen = function() {
            return this.each(function() {
                if (fullScreenApi.supportsFullScreen) {
                    fullScreenApi.requestFullScreen(this);
                }
            });
        };
    }
    window.fullScreenApi = fullScreenApi;
})();

/*
* jQuery jUploader 1.0
* http://www.kudystudio.com
* Author: kudy chen (kudychen@gmail.com)
*
* Copyright 2012, kudy studio
* Dual licensed under the MIT or GPL Version 3 licenses.
*
* Last Modified: 2012-03-31
*/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(5($){q.7=$.7=5(2){2=$.1s({},$.7.m,2);2.4=$.7.1x();2.l=f;3 1w=5(){2.9=(1D 2.9==\'1A\')?$(\'#\'+2.9):$(2.9);2.9.1h({1c:\'1d\',1k:\'1H\',1z:\'1C\',1I:\'20\'}).18(\'7-9\').p(\'21\',5(){$(x).18(\'7-9-1g\')}).p(\'22\',5(){$(x).1X(\'7-9-1g\')}).H(\'F\').G(2.k.h);8(2.S){2.9.p(\'23\',E)};2.9.I(N());6 2.9};3 U=5(){3 4=\'s\'+2.4;3 a=$(\'<a 4="\'+4+\'" b="\'+4+\'" 1f="16:f;" 1j="1i:1m"></a>\').p(\'27\',1b);6 a};3 W=5(){3 4=\'t\'+2.4;3 B=$(\'<B 4="\'+4+\'" b="\'+4+\'" Q="\'+2.Q+\'" 26="s\'+2.4+\'" 1W="1N" 1J="1T/B-1Q" 1j="1i:1m"></B>\');6 B};3 N=5(){3 v=$(\'<v O="c" 1R="x.1S();" />\');v.y("4",\'7-c\'+2.4).y("b",\'1Z\').1h({1k:\'1V\',1U:0,1P:0,1L:0,1K:0,1O:0,1M:\'25\',24:\'29\',28:\'1Y\',1c:\'1d\'}).p(\'1F\',5(){2.d=M(x);8(1u(x)){h()}});8(q.1E){v.y(\'1y\',"-1")};6 v};3 1u=5(c){3 b=M(c);8(!1v(b)){z(\'1t\',b);6 f}1G 8(b==\'\'){z(\'1n\',b);6 f};6 A};3 M=5(c){6 c.1B.u(/.*(\\/|\\\\)/,"")};3 15=5(b){8(b.R>2a){b=b.1q(0,19)+\'...\'+b.1q(-13)};6 b};3 1v=5(d){3 Z=(-1!==d.2D(\'.\'))?d.u(/.*[.]/,\'\').11():\'\';8(!2.r.R){6 A};2F(3 i=0;i<2.r.R;i++){8(2.r[i].11()==Z){6 A}};6 f};3 z=5(O,d){3 o=2.k[O].u(\'{c}\',15(d)).u(\'{V}\',2.r.2G(\', \'));2.z(o)};3 P=5(o){8(2.12&&q.14)14.P(\'[7] \'+o)};3 h=5(){2.l=A;2.1r(2.d);$(C.j).I(U()).I(W());$(\'#7-c\'+2.4).y(\'4\',\'7-c-l\'+2.4).2z(\'#t\'+2.4);2.9.I(N().2y());8(2.S){2.9.H(\'F\').G(2.k.E)};$(\'#t\'+2.4).1a(0).2A()};3 E=5(){8(2.l){2.l=f;2.1o(2.d);2.9.H(\'F\').G(2.k.h);$(\'#t\'+2.4).L();$(\'#s\'+2.4).y(\'1f\',\'16:f;\').L();$(\'#7-c\'+2.4).17()}};3 1b=5(){3 a=$(\'#s\'+2.4).1a(0);8(!a.2C){6};8((a.w&&a.w.j&&a.w.j.n=="f")||(a.J.C&&a.J.C.j&&a.J.C.j.n=="f")){6};3 K=a.w?a.w:a.J.C;3 D;8(K.j.n==\'\'){6};2.l=f;$(\'#7-c\'+2.4).17();2.9.H(\'F\').G(2.k.h);P("n = "+K.j.n);2I{3 Y=K.j.n.u(/<X>(.*)<\\/X>/g,\'$1\');D=2O("("+Y+")")}2Q(e){D={};};2S(5(){$(\'#t\'+2.4).L();$(\'#s\'+2.4).L()},10);2.1p(2.d,D)};$(q).p(\'2K\',5(e){8(!2.l)6;3 e=e||q.2J;e.2N=2.k.T;6 2.k.T});6 1w()};$.7.2M=1.0;$.7.m={9:2i,Q:\'h.2h\',r:[],S:A,1r:5(d){},1p:5(d,D){},1o:5(d){},k:{h:\'2E\',E:\'2l\',1n:"{c} 2k 2g, 2c 2b 1l 2d 2f 2e.",1t:"{c} 2t 2s 2u. 2w {V} 1e 2v.",T:"2r 1l 1e 2n 2m, 8 2o 2q 2p 2j h 2x 2L 2R."},z:5(o){2P(o)},12:f};$.7.2H=5(m){$.7.m=$.1s({},$.7.m,m)};$.7.1x=(5(){3 4=0;6 5(){6++4}})()})(2B);',62,179,'||options|var|id|function|return|jUploader|if|button|iframe|name|file|fileName||false||upload||body|messages|uploading|defaults|innerHTML|message|bind|window|allowedExtensions|jUploaderIframe|jUploaderForm|replace|input|contentDocument|this|attr|showMessage|true|form|document|response|cancel|span|text|children|append|contentWindow|doc|remove|getFileName|createInput|type|log|action|length|cancelable|onLeave|createIframe|extensions|createForm|pre|json|ext||toLowerCase|debug||console|formatFileName|javascript|show|addClass||get|complete|cursor|pointer|are|src|hover|css|display|style|position|files|none|emptyFile|onCancel|onComplete|slice|onUpload|extend|invalidExtension|validateFile|isAllowedExtension|initButton|createId|tabIndex|overflow|string|value|hidden|typeof|attachEvent|change|else|relative|direction|enctype|opacity|margin|fontFamily|post|padding|top|data|onchange|blur|multipart|right|absolute|method|removeClass|baseline|jUploaderFile|ltr|mouseover|mouseout|click|fontSize|Arial|target|load|verticalAlign|118px|33|select|please|again|it|without|empty|aspx|null|the|is|Cancel|uploaded|being|you|now|leave|The|invalid|has|extension|allowed|Only|will|hide|appendTo|submit|jQuery|parentNode|indexOf|Upload|for|join|setDefaults|try|event|beforeunload|be|version|returnValue|eval|alert|catch|cancelled|setTimeout'.split('|'),0,{}));

/*
	无缝滚动 HRwfgd
	@DOM
		<div id="marquee">
			<ul>
				<li></li>
				<li></li>
			</ul>
		</div>
	@CSS
		#marquee{width:200px;height:50px;overflow:hidden}
	@Usage
		$('#marquee').HRwfgd(options);
	@options
		isEqual			:true,		//所有滚动的元素长宽是否相等,true,false
		loop			:0,			//循环滚动次数，0时无限
		direction		:'left',	//滚动方向，'left','right','up','down'
		scrollAmount	:1,			//步长
		scrollDelay		:20			//时长
*/
$.fn.HRwfgd = function(options) {
	var opts = $.extend({},{
		isEqual			:true,
		loop			:0,
		direction		:'left',
		scrollAmount	:1,
		scrollDelay		:20
	}, options);
	this.each(function() {
		var $marquee = $(this);
		var _scrollObj = $marquee.get(0);
		var scrollW = $marquee.width();
		var scrollH = $marquee.height();
		var $element = $marquee.children();
		var $kids = $element.children();
		var scrollSize = 0;
		var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1: 0;
		$element.css(_type ? 'width': 'height', 10000);
		if (opts.isEqual) {
			scrollSize = $kids[_type ? 'outerWidth': 'outerHeight']() * $kids.length
		} else {
			//查询所有父容器，如果是隐藏的，将其显示
			$kids.parents().each(function(){
				if($(this).is(":hidden")){
					$(this).addClass("hr_wfgd").show();
				}
			})
			$kids.each(function() {
				scrollSize += $(this)[_type ? 'outerWidth': 'outerHeight']()
			})
			//计算完毕后，还原父容器到初始状态
			$(document).find(".hr_wfgd").each(function(){
				if($(this).is(":visible")){
					$(this).hide().removeClass("hr_wfgd");
				}
			});
		}
		if (scrollSize < (_type ? scrollW: scrollH)) return;
		$element.append($kids.clone()).css(_type ? 'width': 'height', scrollSize * 2);
		var numMoved = 0;
		function scrollFunc() {
			var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft': 'scrollTop';
			if (opts.loop > 0) {
				numMoved += opts.scrollAmount;
				if (numMoved > scrollSize * opts.loop) {
					_scrollObj[_dir] = 0;
					return clearInterval(moveId)
				}
			}
			if (opts.direction == 'left' || opts.direction == 'up') {
				_scrollObj[_dir] += opts.scrollAmount;
				if (_scrollObj[_dir] >= scrollSize) {
					_scrollObj[_dir] = 0
				}
			} else {
				_scrollObj[_dir] -= opts.scrollAmount;
				if (_scrollObj[_dir] <= 0) {
					_scrollObj[_dir] = scrollSize
				}
			}
		}
		var moveId = setInterval(scrollFunc, opts.scrollDelay);
		$marquee.hover(function() {
			clearInterval(moveId)
		},
		function() {
			clearInterval(moveId);
			moveId = setInterval(scrollFunc, opts.scrollDelay)
		})
	})
};

/*
	手风琴 HRsfq
	@DOM
		<ul id="HRsfq">
			<li>
				<a>汽车</a>
				<div>...</div>
			</li>
			<li>
				<a>火车</a>
				<div>...</div>
			</li>
			<li>
				<a>飞机</a>
				<div>...</div>
			</li>
		</ul>
	@CSS
		#HRsfq li a{display:block;cursor:pointer;background:#0CF url('open.gif') no-repeat center right}
		#HRsfq li a:hover{background:#7FD2FF url('open.gif') no-repeat center right}
		#HRsfq li.HRsfq-active a{background:#7FD2FF url('close.gif') no-repeat center right;color:#fff}
		#HRsfq li div{width:900px}
	@Usage
		$('#HRsfq').HRsfq(options);
	@Options
		activeClass		:'HRsfq-active',	//手风琴标题选中样式名
		speed			:'normal',			//滚动速度，'slow','normal','fast'，也可以用数值代替，比如2000表示2000毫秒
		openRow			:0					//展开第几条，默认为0不展开
*/
$.fn.HRsfq = function(options){
	var options = $.extend({}, {
		activeClass		:'HRsfq-active',
		speed			:'normal',
		openRow			:0
	}, options);
	this.each(function() {
		var $ul = $(this);
		$ul.children('li').each(function(){
			$(this).children('div').hide();
			$(this).children('a').click(function(e){
				$(this).parent('li').toggleClass(options.activeClass).siblings().removeClass(options.activeClass).children('div').slideUp(options.speed);
				$(this).siblings().slideToggle(options.speed);
			});
		});
		if(options.openRow >= 0){
			$ul.children('li:nth-child('+options.openRow+')').addClass(options.activeClass).children('div').show();
		}
	});
};

/*
	锚点连接 HRmdlj
	@DOM
		<a href="#mdlj">锚点连接</a>
		...
		...
		<div id="mdlj"></div>
	@Usage
		$('a').HRmdlj(options);
	@options
		speed:'normal'			//滑动速度，'slow','normal','fast'，也可以用数值代替，比如2000表示2000毫秒
*/
$.fn.HRmdlj = function(options){
	var options = $.extend({}, {
		speed:'normal'
	}, options);
	this.each(function(){
		$(this).click(function() {
			var target = $(this).attr('href');
			var destination = $(target).offset().top;
			$('html,body').animate({scrollTop : destination}, options.speed);
			return false;
		});
	});
};

/*
	多选按钮 HRcheckbox
	@DOM
		<link rel="stylesheet" rev="stylesheet" href="jquery.HooRay/jquery.HooRay.css" />
		<div>
			<input type="checkbox" name="city" value="1" id="city_1" /><label for="city_1">北京</label>
			<input type="checkbox" name="city" value="2" id="city_2" /><label for="city_2">上海</label>
			<input type="checkbox" name="city" value="3" id="city_3" /><label for="city_3">杭州</label>
		</div>
	@Usage
		$('div').HRcheckbox(options);
	@options
		skin:1			//皮肤选择
*/
$.fn.HRcheckbox = function(options){
	var options = $.extend({}, {
		skin:1
	}, options);
	this.find('input:checkbox').each(function(){
		var input = $(this);
		var label = $('label[for="'+input.attr('id')+'"]');
		var inputType = 'checkbox';
		$('<div class="hr-'+ inputType + options.skin + '"></div>').insertBefore(input).append(input, label);
		var allInputs = $('input[name="'+input.attr('name')+'"]');
		label.hover(function(){
			if(input.is(':checked')){
				$(this).addClass('checkedHover');
			}else{
				$(this).addClass('hover');
			}
		},function(){
			$(this).removeClass('hover checkedHover');
		});
		input.bind('updateState',function(){
			if(input.is(':checked')){
				label.addClass('checked');
			}else{
				label.removeClass('checked checkedHover');
			}
		}).trigger('updateState').click(function(){
			$(this).trigger('updateState');
		});
	});
};

/*
	单选按钮 HRradio
	@DOM
		<div>
			<input type="radio" name="sex" id="sex_1" value="1" /><label for="sex_1">男</label>
			<input type="radio" name="sex" id="sex_2" value="2" /><label for="sex_2">女</label>
		</div>
	@Usage
		$('div').HRradio(options);
	@options
		skin:1			//皮肤选择
*/
$.fn.HRradio = function(options){
	var options = $.extend({}, {
		skin:1
	}, options);
	this.find('input:radio').each(function(){
		if($(this).is('[type=radio]')){
			var input = $(this);
			var label = $('label[for="'+input.attr('id')+'"]');
			var inputType = 'radio';
			$('<div class="hr-'+ inputType + options.skin + '"></div>').insertBefore(input).append(input, label);
			var allInputs = $('input[name="'+input.attr('name')+'"]');
			label.hover(function(){
				$(this).addClass('hover');
			},function(){
				$(this).removeClass('hover checkedHover');
			});
			input.bind('updateState', function(){
				if(input.is(':checked')){
					allInputs.each(function(){
						$('label[for="'+$(this).attr('id')+'"]').removeClass('checked');
					});
					label.addClass('checked');
				}else{
					label.removeClass('checked checkedHover');
				}
			}).trigger('updateState').click(function(){
				$(this).trigger('updateState');
			});
		}
	});
};

/*
	控制多选按钮选择数量 HRchecknum
	@CSS
		label.disabled{color:#CCC}
	@DOM
		<div>
			<input type="checkbox" name="city" value="1" id="city_1" /><label for="city_1">北京</label>
			<input type="checkbox" name="city" value="2" id="city_2" /><label for="city_2">上海</label>
			<input type="checkbox" name="city" value="3" id="city_3" /><label for="city_3">杭州</label>
		</div>
	@Usage
		$('div').HRchecknum(options);
	@options
		maxnum:1		//最多能选择几个
*/
$.fn.HRchecknum = function(options){
	var options = $.extend({}, {
		maxnum:1
	}, options);
	var box = this;
	var cb = this.find('input:checkbox');
	cb.each(function(){
		$(this).bind('click', function(){
			if($(this).is(':checked')){
				if(cb.filter(':checked').length >= options.maxnum){
					cb.not(':checked').each(function(){
						$(this).attr('disabled','true');
						var thisid = $(this).attr('id');
						$('label[for="'+thisid+'"]').addClass('disabled');
					});
				}
			}else{
				cb.removeAttr('disabled');
				box.find('label.disabled').removeClass('disabled');
			}
		});
	});
};

/*
	下拉列表 HRxllb
	@DOM
		<div class="HRxllb">
			选择你的语言：
			<select name="language1" id="language1">
				<option value="0">青菜</option>
				<option value="1" selected="selected">菠菜</option>
				<option value="2">花菜</option>
			</select>
		</div>
	@Usage
		$('.HRxllb').HRxllb(options);
	@options
		skin			:1,				//皮肤选择
		color			:'#79A2BD',		//字体默认颜色
		hoverColor		:'#fff',		//鼠标经过颜色
		selectedColor	:'#fff',		//选中颜色
		disabledColor	:'#ccc'			//禁用颜色
		optionsHeight	:''				//显示options的总高度
		reload			:false			//是否重新载入下拉列表
*/
$.fn.HRxllb = function(options){
	var options = $.extend({}, {
		skin			:1,
		color			:'#79A2BD',
		hoverColor		:'#fff',
		selectedColor	:'#fff',
		disabledColor	:'#ccc',
		optionsHeight	:'',
		reload			:false
	}, options);
	var box = $(this);
	$(function(){
		//样式名前缀，用来区分皮肤
		var classPrefix = "hr-xllb"+options.skin+"-";
		//id前缀，用来区分每一个下拉列表
		var idPrefix = "hr-xllb-"+$(box).find("select").attr("id")+"-";
		var selectId = $(box).find("select").attr("id");
		var optionsHeight = 0;

		if(options.reload){
			//IE6下可能会出现的BUG，解决办法就是在reload前把select强制show()，再hide()
			$(box).find("select").show().hide().nextAll().remove();
			$(box).append("<div class='"+classPrefix+"select "+idPrefix+"select' style='color:"+options.color+"'>"+$(box).find("select option:selected").html()+"</div>");
			if(options.optionsHeight == "" || options.optionsHeight > ($(box).find("select option,select optgroup").length*24+10)){
				$(box).append("<div class='"+idPrefix+"div' style='padding:0;margin:0;width:175px'></div>");
			}else{
				$(box).append("<div class='"+idPrefix+"div' style='padding:0;margin:0;position:absolute;z-index:1000;display:none;width:175px;height:"+options.optionsHeight+"px;overflow-x:hidden;overflow-y:scroll'></div>");
			}
			$("."+idPrefix+"div").append("<ul class='"+classPrefix+"options "+idPrefix+"options'></ul>");
			$("."+idPrefix+"options").append("<div class='"+classPrefix+"top' style='color:"+options.disabledColor+"'></div>");
			$(box).find("select#"+selectId).children().each(function(){
				//判断当前html元素是否是optgroup
				if($(this).context.nodeName == "OPTGROUP"){
					if($(this).attr('disabled') == "disabled"){
						$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-optgroup disabled' style='color:"+options.disabledColor+"'>"+$(this).attr('label')+"</li>");
						$(this).children().each(function(){
							if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
								$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
							}else{
								$("."+idPrefix+"options").append("<li class='open disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
							}
						});
					}else{
						$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-optgroup disabled' style='color:"+options.color+"'>"+$(this).attr('label')+"</li>");
						$(this).children().each(function(){
							if($(this).attr('disabled') == "disabled"){
								if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
									$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='padding-left:30px;width:120px;color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
								}else{
									$("."+idPrefix+"options").append("<li class='open disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
								}
							}else{
								if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
									$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected' style='padding-left:30px;width:120px;color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
								}else{
									$("."+idPrefix+"options").append("<li class='open' style='padding-left:30px;width:120px;color:"+options.color+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
								}
							}
						});
					}
				}else{
					if($(this).attr('disabled')){
						if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
							$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}else{
							$("."+idPrefix+"options").append("<li class='open disabled' style='color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}
					}else{
						if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
							$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected' style='color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}else{
							$("."+idPrefix+"options").append("<li class='open' style='color:"+options.color+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}
					}
				}
			});
			$("."+idPrefix+"options").append("<div class='"+classPrefix+"bottom' style='color:"+options.disabledColor+"'></div>");
		}else{
			//隐藏select元素
			$(box).find("select").hide();
			//开始创建模拟select需要的元素
			$(box).append("<div class='"+classPrefix+"select "+idPrefix+"select' style='color:"+options.color+"'>"+$(box).find("select option:selected").html()+"</div>");
			if(options.optionsHeight == "" || options.optionsHeight > ($(box).find("select option,select optgroup").length*24+10)){
				$(box).append("<div class='"+idPrefix+"div' style='padding:0;margin:0;width:175px'></div>");
			}else{
				$(box).append("<div class='"+idPrefix+"div' style='padding:0;margin:0;position:absolute;z-index:1000;display:none;width:175px;height:"+options.optionsHeight+"px;overflow-x:hidden;overflow-y:scroll'></div>");
			}
			$("."+idPrefix+"div").append("<ul class='"+classPrefix+"options "+idPrefix+"options'></ul>");
			$("."+idPrefix+"options").append("<div class='"+classPrefix+"top' style='color:"+options.disabledColor+"'></div>");
			$(box).find("select#"+selectId).children().each(function(){
				//判断当前html元素是否是optgroup
				if($(this).context.nodeName == "OPTGROUP"){
					if($(this).attr('disabled') == "disabled"){
						$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-optgroup disabled' style='color:"+options.disabledColor+"'>"+$(this).attr('label')+"</li>");
						$(this).children().each(function(){
							if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
								$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
							}else{
								$("."+idPrefix+"options").append("<li class='open disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
							}
						});
					}else{
						$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-optgroup disabled' style='color:"+options.color+"'>"+$(this).attr('label')+"</li>");
						$(this).children().each(function(){
							if($(this).attr('disabled') == "disabled"){
								if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
									$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='padding-left:30px;width:120px;color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
								}else{
									$("."+idPrefix+"options").append("<li class='open disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
								}
							}else{
								if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
									$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected' style='padding-left:30px;width:120px;color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
								}else{
									$("."+idPrefix+"options").append("<li class='open' style='padding-left:30px;width:120px;color:"+options.color+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
								}
							}
						});
					}
				}else{
					if($(this).attr('disabled')){
						if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
							$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}else{
							$("."+idPrefix+"options").append("<li class='open disabled' style='color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}
					}else{
						if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
							$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected' style='color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}else{
							$("."+idPrefix+"options").append("<li class='open' style='color:"+options.color+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}
					}
				}
			});
			$("."+idPrefix+"options").append("<div class='"+classPrefix+"bottom' style='color:"+options.disabledColor+"'></div>");
			//结束创建
			//判断select是否可用
			if(!$(box).find("select").attr('disabled')){
				$("."+idPrefix+"select").live('mouseover',function(){
					$(this).addClass(classPrefix+"select-hover");
				}).live('mouseout',function(){
					$(this).removeClass(classPrefix+"select-hover");
				});
				//绑定点击下拉列表事件
				$("body").live('click',function(e){
					var clickme = $(e.target);
					//判断用户鼠标点击区域，模拟鼠标移出select点击隐藏options
					if(!clickme.hasClass(idPrefix+"select")){
						$("."+idPrefix+"div").hide();
						$(box).find("."+idPrefix+"select").removeClass(classPrefix+"select-open");
						$(box).find("."+idPrefix+"options").hide();
					}else{
						//判断当前元素在屏幕整体的上方还是下方，自动判断显示区域
						var marginTop = $(box).offset().top-$(window).scrollTop();
						var marginBottom = $(window).height()-($(box).offset().top-$(window).scrollTop())-24;
						if(marginTop > marginBottom){
							$("."+classPrefix+"top").show();
							$("."+classPrefix+"bottom").hide();
							//实时获取options的高度，防止执行reload方法后，options的高度不更新
							if(options.optionsHeight == "" || options.optionsHeight > ($(box).find("select option,select optgroup").length*24+10)){
								optionsHeight = $(box).find("select option,select optgroup").length*24+10;
							}else{
								optionsHeight = options.optionsHeight;
							}
							$("."+idPrefix+"div").css("margin-top","-"+(optionsHeight+24)+"px");
						}else{
							$("."+classPrefix+"top").hide();
							$("."+classPrefix+"bottom").show();
							$("."+idPrefix+"div").css("margin-top","0");
						}
						//切换options的隐藏/显示
						if($(box).find("."+idPrefix+"options").css("display") == "block"){
							$(box).find("."+idPrefix+"select").removeClass(classPrefix+"select-open");
							$(box).find("."+idPrefix+"options").hide();
							$("."+idPrefix+"div").hide();
						}else{
							$(box).find("."+idPrefix+"select").addClass(classPrefix+"select-open");
							$(box).find("."+idPrefix+"options").show();
							$("."+idPrefix+"div").show();
						}
					}
				});
				//options的鼠标移入、移出、点击事件
				$(box).find("."+idPrefix+"options li:not(.disabled)").live('mouseover',function(){
					$(this).addClass(classPrefix+"open-hover");
					$(this).css({color:options.hoverColor});
				}).live('mouseout',function(){
					$(this).removeClass(classPrefix+"open-hover");
					if($(this).attr("class") == "open"){
						$(this).css({color:options.color});
					}else{
						$(this).css({color:options.selectedColor});
					}
				}).live('click',function(){
					//移除options的选中样式
					$("."+idPrefix+"options").find("li").not($("."+idPrefix+"options").find("li."+classPrefix+"open-optgroup")).removeClass(classPrefix+"open-selected").addClass("open").css({color:options.color});
					$("."+idPrefix+"options").find("li.disabled").not($("."+idPrefix+"options").find("li."+classPrefix+"open-optgroup")).css({color:options.disabledColor});
					//添加当前点击的options为选中样式
					$(this).addClass(classPrefix+"open-selected");
					//修改真实select里选中的options
					$(box).find("select").val($(box).find("."+classPrefix+"options li."+classPrefix+"open-selected div").html());
					//隐藏options并修改显示为选中的options
					$("."+idPrefix+"select").removeClass(classPrefix+"select-open").addClass(classPrefix+"select");
					$("."+idPrefix+"select").html($(this).html());
					$("."+idPrefix+"options").hide();
				});
				$(box).find("."+idPrefix+"options li.disabled").live('click',function(){
					return false;
				});
			}else{
				$("."+idPrefix+"select").css({color:options.disabledColor});
			}
		}
	});
};

/*
	高亮显示 HRglxs
	@DOM
		<div class="HRtpzs1">
			<img src="diqiu.jpg" />
			<p>超级玛丽</p>
		</DIV>
	@Usage
		$('.banner').HRglxs(options);
	@options
		opacity		:0.5,		//透明度，0~1
		bgcolor		:'#fff',	//遮罩层背景色
		speed		:'normal'	//滑动速度，'slow','normal','fast'，也可以用数值代替，比如2000表示2000毫秒
*/
$.fn.HRglxs = function(options){
	var options = $.extend({}, {
		opacity		:0.5,
		bgcolor		:'#fff',
		speed		:'normal'
	}, options);
	this.each(function(){
		var box = $(this);
		$(box).bind("mouseover",function(){
			if(isMouseLeaveOrEnter(getEvent(),this)){
				$(this).click(function(){
					if(!$("div").hasClass("HRglxs-bg")){
						$(box).addClass("hr-glxs");
						if($.browser.msie && $.browser.version == "6.0"){
							//ie6无法遮住select，则只能将其隐藏
							$("select:visible").addClass("hr-glxs-select-hidden");
							//ie6不支持position:fixed
							$("body").append("<div class='HRglxs-bg' style='position:absolute;left:expression(documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth);top:0;width:100%;height:"+$(window).height()+"px;display:none;z-index:9998;background-color:"+options.bgcolor+";filter:progid:DXImageTransform.Microsoft.Alpha(opacity="+options.opacity*100+");opacity:"+options.opacity+";'></div>");
						}else{
							$("body").append("<div class='HRglxs-bg' style='position:fixed;top:0;left:0;width:100%;height:100%;display:none;z-index:9998;background-color:"+options.bgcolor+";filter:progid:DXImageTransform.Microsoft.Alpha(opacity="+options.opacity*100+");opacity:"+options.opacity+";'></div>");
						}
						$(".HRglxs-bg").fadeIn(options.speed);
					}
				});
			}
		}).bind("mouseout",function(){
			if(isMouseLeaveOrEnter(getEvent(),this)){
				$(".HRglxs-bg").click(function(){
					if($("div").hasClass("HRglxs-bg")){
						$("select").removeClass("hr-glxs-select-hidden");
						$(".HRglxs-bg").fadeOut(options.speed,function(){
							$(box).removeClass("hr-glxs");
							$(".HRglxs-bg").remove();
						});
					}
				});
			}
		});
	});
};

/* artTemplate - Template Engine */
/* https://github.com/aui/artTemplate */
var template=function(c,g){return template["object"===typeof g?"render":"compile"].apply(template,arguments)};(function(c,g){c.version="1.0";c.openTag="<%";c.closeTag="%>";c.parser=null;c.render=function(a,b){var d;d=l[a];void 0===d&&!q&&((d=document.getElementById(a))&&c.compile(a,d.value||d.innerHTML),d=l[a]);return void 0===d?i({id:a,name:"Render Error",message:"Not Cache"}):d(b)};c.compile=function(a,b,d){function f(d){try{return g.call(n,d)}catch(e){if(!r)return c.compile(a,b,!0)(d);e.id=a||b;e.name="Render Error";e.source=b;return i(e)}}var r=d;"string"!==typeof b&&(r=b,b=a,a=null);try{var g=v(b,r)}catch(j){return j.id=a,j.name="Syntax Error",i(j)}f.toString=function(){return g.toString()};a&&(l[a]=f);return f};c.helper=function(a,b){if(void 0===b)return n[a];n[a]=b};var l={},n={},o="".trim,q=o&&!g.document,v=function(a,b){function d(a){m+=a.split(/\n/).length-1;a=a.replace(/('|"|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n");a=k[1]+"'"+a+"'"+k[2];return a+"\n"}function f(a){var d=m;j?a=j(a):b&&(a=a.replace(/\n/g,function(){m++;return"$line="+m+";"}));0===a.indexOf("=")&&(a=k[1]+(o?"$getValue(":"")+a.substring(1).replace(/[\s;]*$/,"")+(o?")":"")+k[2]);b&&(a="$line="+d+";"+a);g(a);return a+"\n"}function g(a){a=a.replace(/\/\*.*?\*\/|'[^']*'|"[^"]*"|\.[\$\w]+/g,"");p.call(a.split(/[^\$\w\d]+/),function(a){if(/^(this|\$helpers)$/.test(a))throw{message:'Prohibit the use of the "'+a+'"'};a&&!t[a]&&!/^\d/.test(a)&&!i[a]&&(s+=a+"="+("include"===a?q:n[a]?"$helpers."+a:"$data."+a)+",",i[a]=!0)})}var l=c.closeTag,j=c.parser,h,e="",m=1,i={$out:!0,$line:!0},s="var $helpers=this,"+(b?"$line=0,":""),k=o?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],q="function(id,data){if(data===undefined){data=$data}return $helpers.$render(id,data)}";p.call(a.split(c.openTag),function(a){var a=a.split(l),b=a[0],c=a[1];1===a.length?e+=d(b):(e+=f(b),c&&(e+=d(c)))});h=e;b&&(h="try{"+h+"}catch(e){e.line=$line;throw e}");h=s+k[0]+h+"return "+k[3];try{return new Function("$data",h)}catch(u){throw u.temp="function anonymous($data) {"+h+"}",u;}},i=function(a){var b="[template]:\n"+a.id+"\n\n[name]:\n"+a.name;a.message&&(b+="\n\n[message]:\n"+a.message);a.line&&(b+="\n\n[line]:\n"+a.line,b+="\n\n[source]:\n"+a.source.split(/\n/)[a.line-1].replace(/^[\s\t]+/,""));a.temp&&(b+="\n\n[temp]:\n"+a.temp);g.console&&console.error(b);return"{Template Error}"},p=Array.prototype.forEach||function(a,b){for(var c=this.length>>>0,f=0;f<c;f++)f in this&&a.call(b,this[f],f,this)},t={};p.call("break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield".split(","),function(a){t[a]=!0});c.helper("$forEach",p);c.helper("$render",c.render);c.helper("$getValue",function(a){return void 0===a?"":a})})(template,this);if("undefined"!==typeof module&&module.exports)module.exports=template;