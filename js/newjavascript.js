
(function(window,document,undefined){
    if(typeof(window.VEditor)!='undefined'){
        throw"VEditor变量名冲突";
    }
    var DOC_BASE_URL=window.location.href.replace(/[\?#].*$/,'').split('/').slice(0,-1).join('/');
    var BASE_URL=(function(){
        var scriptList=document.getElementsByTagName('script');
        for(var i=0;i<scriptList.length;i++){
            var src=scriptList[i].src;
            if(src&&/ve\.(\w|\.)*js/.test(src)){
                return src;
            }
        }
    return null;
    })();
    var VEditor={
    baseURL:BASE_URL,
    documentBaseURL:DOC_BASE_URL,
    plugin:{},
    version:'1',
    blankChar:'\uFEFF',
    fillCharReg:new RegExp('\uFEFF','g'),
    caretChar:'\u2009',
    ui:{},
    dom:{},
    list:[],
    lookup:{},
    popupEditor:null,
    add:function(editor){
        this.list.push(editor);
        this.lookup[editor.conf.veID||editor.id]=editor;
    },
    isHelperNode:function(node){
        return new RegExp(this.blankChar).test(node.nodeValue)||new RegExp(this.fillCharReg).test(node.nodeValue)||new RegExp(this.caretChar).test(node.nodeValue);
    },
    get:function(id){
        return this.lookup[id];
    },
    init:function(conf){
        var t=this,r;
        var iterator=function(i,s,d){
            if(typeof conf[s]=='undefined')return;
            if(typeof conf[s]=='string')
                conf[d]=conf[s];
            else if(conf[s].constructor==Array){
                conf[d]=conf[s][i];
            }
            else if(typeof conf[s]=='function'){
                conf[d]=conf[s](i);
            }
        };

    if(r=conf.renderTo){
        if(document.getElementById(r)){
            r=conf.renderTo;
        }
    }
else if(conf.elements){
    for(var i=0;i<conf.elements.length;i++){
        var el=conf.elements[i];
        if(typeof el=='string')
            el=document.getElementById(conf.elements[i]);
        if(!el.nodeType)continue;
        iterator(i,'toolbarContainers','toolbarContainer');
        iterator(i,'inputContainers','iframeContainer');
        iterator(i,'statusbarContainers','statusbarContainer');
        if(el.nodeName=='TEXTAREA'){
            el.style.display='none';
            el.setAttribute('veditor',1);
            var div=document.createElement('div');
            div.lang.ClassName='textarea_con textarea'+el.id+'_con';
            el.parentNode.insertBefore(div,el);
            VEditor.init(VEditor.lang.extend({
                renderTo:div,
                defaultValue:el.value,
                veID:el.id
                },conf));
            if(conf.inputContainers){
                div.style.display='none';
            }
        }
    else{
        VEditor.init(VEditor.lang.extend({
            renderTo:el,
            veID:el.id
            },conf));
    }
    }
}
if(!r){
    return;
}
conf=VEditor.lang.extend({
    id:conf['veID']||'ve'+[parseInt(Math.random()*1000000),new Date().getTime()].join(''),
    height:'340'
},conf);
function _init(t){
    var editor=new VEditor.Editor(conf);
    editor.init();
    t.add(editor);
}
if(t.list.length==0){
    _init(t);
}else{
    setTimeout(function(){
        _init(t);
    },100);
}
}
};

window.veEditor=window.VEditor=VEditor;
})(window,document);
(function(window,document,ve,undefined){
    var PROTOTYPE_FIELDS=['constructor','hasOwnProperty','isPrototypeOf','propertyIsEnumerable','toLocaleString','toString','prototype','valueOf'];
    var lang={
        each:function(o,cb,s){
            var n,l;
            if(!o){
                return 0;
            }
            s=s||o;
            if(typeof(o.length)!='undefined'){
                for(n=0,l=o.length;n<l;n++){
                    if(cb.call(s,o[n],n,o)===false){
                        return 0;
                    }
                }
                }else{
        for(n in o){
            if(o.hasOwnProperty&&o.hasOwnProperty(n)&&cb.call(s,o[n],n,o)===false){
                return 0;
            }
        }
        }
return 1;
},
arrayIndex:function(arr,item,start){
    for(var i=start||0,len=arr.length;i<len;i++){
        if(arr[i]===item){
            return i;
        }
    }
return-1;
},
coll2Arr:function(collection){
    var list=[];
    for(var i=0;i<collection.length;i++){
        list.push(collection[i]);
    }
    return list;
},
arg2Arr:function(args,startPos){
    startPos=startPos||0;
    return Array.prototype.slice.call(args,startPos);
},
isArray:function(value){
    return this.getType(obj)=='array';
},
isNoBomOrDom:function(value){
    if(!value||typeof(value)!='object'){
        return true;
    }else{
        if(ve.ua.ie){
            return!value['nodeType']&&!value['window']&&!value['srcElement'];
        }else{
            return ve.lang.getType(value)=='object';
        }
    }
},
getType:function(obj){
    return obj===null?'null':(obj===undefined?'undefined':Object.prototype.toString.call(obj).slice(8,-1).toLowerCase());
},
grep:function(arr,callback){
    var o=[];
    this.each(arr,function(v){
        if(callback(v)){
            o.push(v);
        }
    });
return o;
},
isScalar:function(value){
    var type=ve.lang.getType(value);
    return type=='number'||type=='boolean'||type=='string'||type=='null'||type=='undefined';
},
extend:function(){
    if(arguments.length<2){
        throw('params error');
    }
    var args=ve.lang.arg2Arr(arguments),result,deepCopy=false;
    if(ve.lang.isScalar(args[args.length-1])){
        return args.pop();
    }
    if(ve.lang.getType(args[0])=='boolean'){
        deepCopy=args[0];
        args=args.slice(1);
    }
    for(var i=args.length-1;i>=0;i--){
        if(result&&i==0){
            break;
        }
        else if(ve.lang.isScalar(args[i])||!ve.lang.isNoBomOrDom(args[i])){
            result=args[i];
        }
        else{
            if(i>0){
                result=args[i-1];
            }else if(!result){
                var type=ve.lang.getType(args[i]);
                result=type=='array'?[]:{};

        }
        for(var key in args[i]){
            var item=args[i][key];
            if(deepCopy&&typeof(item)=='object'){
                result[key]=ve.lang.extend(false,item);
            }else{
                result[key]=item;
            }
        }
    for(var j=0;j<PROTOTYPE_FIELDS.length;j++){
        key=PROTOTYPE_FIELDS[j];
        if(Object.prototype.hasOwnProperty.call(args[i],key)){
            result[key]=args[i][key];
        }
    }
    }
}
return result;
},
bind:function(obj,fn){
    var slice=Array.prototype.slice,args=slice.call(arguments,2);
    return function(){
        obj=obj||this;
        fn=typeof fn=='string'?obj[fn]:fn;
        fn=typeof fn=='function'?fn:function(){};

        return fn.apply(obj,args.concat(slice.call(arguments,0)));
    };

},
Class:function(s,p){
    var t=this,sp,ns,cn,scn,c,de=0;
    s=/^((static) )?([\w.]+)(\s*:\s*([\w.]+))?/.exec(s);
    cn=s[3].match(/(^|\.)(\w+)$/i)[2];
    ns=t.createNS(s[3].replace(/\.\w+$/,''));
    if(ns[cn])
        return;
    if(s[2]=='static'){
        ns[cn]=p;
        if(this.onCreate)
            this.onCreate(s[2],s[3],ns[cn]);
        return;
    }
    if(!p[cn]){
        p[cn]=function(){};

        de=1;
    }
    ns[cn]=p[cn];
    t.extend(ns[cn].prototype,p);
    if(s[5]){
        if(!t.resolve(s[5])){
            throw('ve.Class namespace parser error');
        }
        sp=t.resolve(s[5]).prototype;
        scn=s[5].match(/\.(\w+)$/i)[1];
        c=ns[cn];
        if(de){
            ns[cn]=function(){
                return sp[scn].apply(this,arguments);
            };

    }else{
        ns[cn]=function(){
            this.base=sp[scn];
            return c.apply(this,arguments);
        };

}
ns[cn].prototype[cn]=ns[cn];
t.each(sp,function(f,n){
    ns[cn].prototype[n]=sp[n];
});
t.each(p,function(f,n){
    if(sp[n]){
        ns[cn].prototype[n]=function(){
            this.base=sp[n];
            return f.apply(this,arguments);
        };

}else{
    if(n!=cn)
        ns[cn].prototype[n]=f;
}
});
}
t.each(p['static'],function(f,n){
    ns[cn][n]=f;
});
if(this.onCreate){
    this.onCreate(s[2],s[3],ns[cn].prototype);
}
},
createNS:function(n,o){
    var i,v;
    o=o||window;
    n=n.split('.');
    for(i=0;i<n.length;i++){
        v=n[i];
        if(!o[v]){
            o[v]={};

    }
    o=o[v];
    }
return o;
},
resolve:function(n,o){
    var i,l;
    o=o||window;
    n=n.split('.');
    for(i=0,l=n.length;i<l;i++){
        o=o[n[i]];
        if(!o){
            break;
        }
    }
return o;
}
};

ve.lang=lang;
ve.extend=lang.extend;
})(window,document,VEditor);
﻿(function(window,document,ve,undefined){
    if(!QZFL){
        throw"NO QZFL FOUND";
    }
    ve.adapter=QZFL;
    ve.ua=QZFL.userAgent;
    ua.ie9Mode=(9-((navigator.userAgent.indexOf('Trident/5.0')>-1)?0:1)-(window.XDomainRequest?0:1)-(window.XMLHttpRequest?0:1))==9;
    ua.docMode=document.documentMode;
    ve.dom=ve.lang.extend(ve.dom,{
        get:$,
        getXY:QZFL.dom.getXY,
        setXY:QZFL.dom.setXY,
        getRect:QZFL.dom.getRect,
        getSize:QZFL.dom.getSize,
        setSize:QZFL.dom.setSize,
        getStyle:QZFL.dom.getStyle,
        setStyle:QZFL.dom.setStyle,
        getById:QZFL.dom.getById,
        removeElement:QZFL.dom.removeElement,
        insertCSSLink:QZFL.css.insertCSSLink,
        insertStyleSheet:QZFL.css.insertStyleSheet,
        hasClass:QZFL.css.hasClassName,
        addClass:QZFL.css.addClassName,
        removeClass:QZFL.css.removeClassName,
        contains:QZFL.dom.contains,
        convertHexColor:QZFL.css.convertHexColor,
        remove:function(node,keepChildren){
            var parent=node.parentNode,child;
            if(parent){
                if(keepChildren&&node.hasChildNodes()){
                    while(child=node.firstChild){
                        parent.insertBefore(child,node);
                    }
                }
            parent.removeChild(node);
        }
        return node;
    },
    getParent:function(el,con){
        var fn=typeof(con)=='function'?con:function(node){
            if(con=='*'){
                return node.nodeType==1;
            }else{
                return node.nodeType==1&&node.tagName.toLowerCase()==con.toLowerCase();
            }
        };
    while(el&&el.parentNode){
        if(fn(el)){
            return el;
        }
        el=el.parentNode;
    }
    },
setHTML:function(e,h){
    if(!e)return;
    e.innerHTML=h;
},
setStyles:function(el,styles){
    ve.lang.each(styles,function(n,i){
        ve.dom.setStyle(el,i,n);
    });
},
isHidden:function(e){
    return!e||e.style.display=='none'||ve.dom.getStyle(e,'display')=='none';
},
isBlock:function(n){
    if(!n){
        return false;
    }
    n=n.nodeName||n;
    return/^(BODY|H[1-6]|HR|P|DIV|ADDRESS|PRE|FORM|TABLE|LI|OL|UL|TR|TD|CAPTION|BLOCKQUOTE|CENTER|DL|DT|DD|DIR|FIELDSET|NOSCRIPT|NOFRAMES|MENU|ISINDEX|SAMP)$/i.test(n);
},
insertAfter:function(newNode,currentNode){
    return $e(newNode).insertAfter(currentNode);
},
isLinkNode:function(node){
    if(!node||node.tagName!='A'){
        return false;
    }
    if(ve.ua.ie){
        if(node.getAttribute('href')){
            return true;
        }else{
            var reg=new RegExp('<a[^>]*?\\shref="','i');
            return reg.test(node.outerHTML);
        }
    }else{
    return node.getAttribute('href')!==null;
}
},
nodeIndex:function(node,normalized){
    var idx=0,lastNodeType,lastNode,nodeType;
    if(node){
        for(lastNodeType=node.nodeType,node=node.previousSibling,lastNode=node;node;node=node.previousSibling){
            nodeType=node.nodeType;
            if(normalized&&nodeType==3){
                if(nodeType==lastNodeType||!node.nodeValue.length){
                    continue;
                }
            }
        idx++;
        lastNodeType=nodeType;
        }
    }
return idx;
},
findCommonAncestor:function(a,b){
    var ps=a,pe;
    while(ps){
        pe=b;
        while(pe&&ps!=pe){
            pe=pe.parentNode;
        }
        if(ps==pe){
            break;
        }
        ps=ps.parentNode;
    }
    if(!ps&&a.ownerDocument){
        return a.ownerDocument.documentElement;
    }
    return ps;
},
TreeWalker:function(start_node,root_node){
    var node=start_node;
    function findSibling(node,start_name,sibling_name,shallow){
        var sibling,parent;
        if(node){
            if(!shallow&&node[start_name])
                return node[start_name];
            if(node!=root_node){
                sibling=node[sibling_name];
                if(sibling)
                    return sibling;
                for(parent=node.parentNode;parent&&parent!=root_node;parent=parent.parentNode){
                    sibling=parent[sibling_name];
                    if(sibling)
                        return sibling;
                }
                }
            }
};

this.current=function(){
    return node;
};

this.next=function(shallow){
    return(node=findSibling(node,'firstChild','nextSibling',shallow));
};

this.prev=function(shallow){
    return(node=findSibling(node,'lastChild','previousSibling',shallow));
};

},
styleCompare:function(styleStr1,styleStr2){
    if(styleStr1==styleStr2){
        return true;
    }
    if(!styleStr1||!styleStr2){
        return false;
    }
    var _getStyleHash=function(str){
        var p=str.split(';');
        var hash={};

        ve.lang.each(p,function(c){
            if(c.indexOf(':')>=0){
                var tmp=c.split(':');
                hash[ve.string.trim(tmp[0])]=ve.string.trim(tmp[1]);
            }
        });
    return hash;
};

var ex1=true,ex2=true,hash1=_getStyleHash(styleStr1),hash2=_getStyleHash(styleStr2);
for(var k in hash1){
    if(!hash2[k]||hash1[k]!=hash2[k]){
        ex1=false;
        break;
    }
}
for(var k in hash2){
    if(!hash1[k]||hash2[k]!=hash1[k]){
        ex2=false;
        break;
    }
}
return ex1&&ex2;
},
mergerToParent:function(node){
    var parent=node.parentNode;
    while(parent&&ve.dtd.$removeEmpty[parent.tagName]){
        if(parent.tagName==node.tagName||parent.tagName=='A'){
            if(parent.tagName=='SPAN'&&!ve.dom.styleCompare(parent.style.cssText,node.style.cssText)||(parent.tagName=='A'&&node.tagName=='SPAN')){
                if(parent.childNodes.length>1||parent!==node.parentNode){
                    node.style.cssText=parent.style.cssText+";"+node.style.cssText;
                    parent=parent.parentNode;
                    continue;
                }else{
                    parent.style.cssText+=";"+node.style.cssText;
                    if(parent.tagName=='A'){
                        parent.style.textDecoration='underline';
                    }
                }
            }
    if(parent.tagName!='A'){
        parent===node.parentNode&&ve.dom.remove(node,true);
        break;
    }
}
parent=parent.parentNode;
}
},
fixNodeDupParent:function(node){
    if(node.nodeType!=1||(node.tagName!=node.parentNode.tagName)){
        return node;
    }
    var hasOtherChild,parent=node.parentNode;
    ve.lang.each(parent.childNodes,function(child){
        if(child!=node){
            if(child.nodeType==3&&!ve.string.trim(child.nodeValue)){}else{
                hasOtherChild=true;
                return true;
            }
        }
    });
if(!hasOtherChild){
    ve.dom.remove(node);
    return parent;
}else{
    return node;
}
},
insertHTML:function(element,where,html){
    if(element.insertAdjacentHTML){
        element.insertAdjacentHTML(where,html);
    }
    else if(typeof HTMLElement!="undefined"&&!window.opera){
        var range=element.ownerDocument.createRange();
        range.setStartBefore(element);
        var fragment=range.createContextualFragment(html);
        switch(where.toLowerCase()){
            case"beforebegin":
                element.parentNode.insertBefore(fragment,element);
                break;
            case"afterbegin":
                element.insertBefore(fragment,element.firstChild);
                break;
            case"beforeend":
                element.appendChild(fragment);
                break;
            case"afterend":
                if(!element.nextSibling){
                element.parentNode.appendChild(fragment);
            }else{
                element.parentNode.insertBefore(fragment,element.nextSibling);
            }
            break;
        }
    }
return{
    beforebegin:element.previousSibling,
    afterbegin:element.firstChild,
    beforeend:element.lastChild,
    afterend:element.nextSibling
    }
    [where];
},
getWindowRegion:function(win,doc){
    var win=win||window;
    var doc=doc||win.document;
    var info={};

    info.screenLeft=win.screenLeft?win.screenLeft:win.screenX;
    info.screenTop=win.screenTop?win.screenTop:win.screenY;
    if(win.innerWidth){
        info.visibleWidth=win.innerWidth;
        info.visibleHeight=win.innerHeight;
        info.horizenScroll=win.pageXOffset;
        info.verticalScroll=win.pageYOffset;
    }else{
        var tag=(doc.documentElement&&doc.documentElement.clientWidth)?doc.documentElement:doc.body;
        info.visibleWidth=tag.clientWidth;
        info.visibleHeight=tag.clientHeight;
        info.horizenScroll=tag.scrollLeft;
        info.verticalScroll=tag.scrollTop;
    }
    var tag=(doc.documentElement&&doc.documentElement.scrollWidth)?doc.documentElement:doc.body;
    info.documentWidth=Math.max(tag.scrollWidth,info.visibleWidth);
    info.documentHeight=Math.max(tag.scrollHeight,info.visibleHeight);
    return info;
},
create:function(n,a,h,p){
    var t=this,e=n,k;
    e=typeof n=='string'?document.createElement(n):n;
    ve.dom.setAttrs(e,a);
    if(h){
        if(h.nodeType){
            e.appendChild(h);
        }else{
            ve.dom.setHTML(e,h);
        }
    }
return p&&p.nodeType?p.appendChild(e):e;
},
setAttr:function(e,n,v){
    var t=this;
    switch(n){
        case"style":
            if(typeof v!='string'){
            ve.lang.each(v,function(v,n){
                ve.dom.setStyle(e,n,v);
            });
            return;
        }
        e.style.cssText=v;
        break;
        case"class":
            e.className=v||'';
            break;
        default:
            e.setAttribute(n,v);
            break;
    }
},
setAttrs:function(e,o){
    var t=this;
    ve.lang.each(o,function(v,n){
        t.setAttr(e,n,v);
    });
},
selector:QZFL.selector,
find:QZFL.selector,
getViewPort:function(w){
    var isIE=ve.ua.ie,w=!w?window:w,d=w.document,b=(!isIE||d.compatMode=="CSS1Compat")&&d.documentElement||d.body;
    return{
        x:w.pageXOffset||b.scrollLeft,
        y:w.pageYOffset||b.scrollTop,
        w:w.innerWidth||b.clientWidth,
        h:w.innerHeight||b.clientHeight
        };

},
getRegion:function(el,doc){
    var xy=QZFL.dom.getXY(el,doc),sz=QZFL.dom.getSize(el);
    return{
        top:xy[1],
        left:xy[0],
        width:sz[0],
        height:sz[1]
        }
    },
drag:function(dragEl,el){
    el=el?$(el):dragEl.parentNode;
    var startdrag=false,startX,startY,origX,origY,deltaX,deltaY,_this=dragEl,timer;
    if(!dragEl)return;
    QZFL.dom.setStyle(dragEl,'cursor','move');
    function _mousedown(e){
        ve.dom.event.cancel(e);
        var s=e.target||e.srcElement;
        if(/a|button/i.test(s.nodeName))return false;
        startdrag=true;
        startX=e.clientX,startY=e.clientY;
        origX=el.offsetLeft,origY=el.offsetTop;
        deltaX=startX-origX,deltaY=startY-origY;
        timer=setTimeout(function(){
            QZFL.dom.setStyle(el,'opacity',.6);
        },400);
        if(_this.setCapture)_this.setCapture();
        ve.dom.event.add(document,'mousemove',_mousemove);
        ve.dom.event.add(dragEl,'mouseup',_mouseup);
    };

    function _mousemove(e){
        if(!startdrag)return;
        QZFL.dom.setStyle(el,'left',((e.clientX-deltaX)<0?0:(e.clientX-deltaX))+'px');
        QZFL.dom.setStyle(el,'top',((e.clientY-deltaY)<0?0:(e.clientY-deltaY))+'px');
        QZFL.dom.setStyle(el,'opacity',.6);
    };

    function _mouseup(e){
        startdrag=false;
        clearTimeout(timer);
        if(_this.releaseCapture)_this.releaseCapture();
        QZFL.dom.setStyle(el,'opacity',1);
        ve.dom.event.remove(document,'mousemove',_mousemove);
        ve.dom.event.remove(dragEl,'mouseup',_mouseup);
    };

    ve.dom.event.add(dragEl,'mousedown',_mousedown);
},
clone:function(node,deep,doc){
    var _this=this,clone;
    doc=document||doc;
    if(!ve.ua.ie||node.nodeType!==1||deep){
        return node.cloneNode(deep);
    }
    if(!deep){
        clone=doc.createElement(node.nodeName);
        ve.lang.each(_this.getAllAttributes(node),function(attr){
            _this.setAttr(clone,attr.nodeName,node.getAttribute(attr.nodeName));
        });
        return clone;
    }
    return clone.firstChild;
},
getAllAttributes:function(n){
    var o;
    if(!n){
        return[];
    }
    if(ve.ua.ie){
        o=[];
        if(n.nodeName=='OBJECT'){
            return n.attributes;
        }
        if(n.nodeName==='OPTION'&&n.getAttribute('selected')){
            o.push({
                specified:1,
                nodeName:'selected'
            });
        }
        n.cloneNode(false).outerHTML.replace(/<\/?[\w:\-]+ ?|=[\"][^\"]+\"|=\'[^\']+\'|=[\w\-]+|>/gi,'').replace(/[\w:\-]+/gi,function(a){
            o.push({
                specified:1,
                nodeName:a
            });
        });
        return o;
    }
    return n.attributes;
}
});
ve.dom.event=QZFL.event;
ve.dom.event.add=QZFL.event.addEvent;
ve.dom.event.remove=QZFL.event.removeEvent;
ve.dom.event.onDOMReady=function(fn){
    QZFL.event.onDomReady(fn)
    };

ve.dom.event.cancel=function(e){
    QZFL.event.preventDefault(e);
    QZFL.event.cancelBubble(e);
    return false;
}
ve.dom.event.cancelBubble=QZFL.event.cancelBubble;
ve.dom.event.preventDefault=QZFL.event.preventDefault;
ve.dom.event.getTarget=QZFL.event.getTarget;
})(window,document,VEditor);
(function(ve){
    ve.lang.Class('VEditor.EventManager',{
        EventManager:function(){
            this._prevList=[];
            this._midList=[];
            this._lastList=[];
        },
        add:function(fn,usePipe,pos){
            var item={
                fn:fn,
                rec:usePipe
            };

            switch(pos){
                case-1:
                    this._prevList.unshift(item);
                    break;
                case 1:
                    this._lastList.push(item);
                    break;
                default:
                    this._midList.push(item);
            }
        },
    addFirst:function(fn,usePipe){
        return this.add(fn,usePipe,-1);
    },
    addLast:function(fn,usePipe){
        return this.add(fn,usePipe,1);
    },
    remove:function(fn){
        var _this=this;
        var found;
        ve.lang.each(this._prevList,function(item,i){
            if(item.fn==fn){
                _this._prevList.splice(i,1);
                found=true;
                return false;
            }
        });
    ve.lang.each(this._midList,function(item,i){
        if(item.fn==fn){
            _this._midList.splice(i,1);
            found=true;
            return false;
        }
    });
    ve.lang.each(this._lastList,function(item,i){
        if(item.fn==fn){
            _this._lastList.splice(i,1);
            found=true;
            return false;
        }
    });
return found;
},
_getList:function(){
    return this._prevList.concat(this._midList).concat(this._lastList);
},
fire:function(){
    var scope=arguments[0]||this,evList=this._getList(),arg,ret,retIsArray;
    if(arguments.length>2){
        retIsArray=true;
        arg=ve.lang.arg2Arr(arguments,1);
    }else{
        arg=arguments[1]||null;
    }
    ret=arg;
    ve.lang.each(evList,function(item){
        var fnRet;
        if(retIsArray){
            fnRet=item.fn.apply(scope,ve.lang.extend(true,ret));
        }else{
            var _p=ve.lang.isNoBomOrDom(ret)&&typeof(ret)=='object'?ve.lang.extend(true,ret):ret;
            fnRet=item.fn.call(scope,_p);
        }
        if(item.rec){
            if((retIsArray&&ve.lang.isArray(fnRet))||(!retIsArray&&fnRet!==undefined)){
                ret=fnRet;
            }else{
                throw('FUNCTION RETURN FORMAT NOT AVERIBLE');
            }
        }
    });
return ret;
}
});
})(VEditor);
(function(window,document,ve,undefined){
    ve.lang.Class('VEditor.net.ScriptLoader',{
        ScriptLoader:function(config){
            this.queue=[];
            this.allDones=[];
            this.lookup={};

    },
    queue:[],
    allDones:[],
    lookup:{},
    load:function(u,conf){
        var t=this,sc;
        var def={
            cache:1,
            charset:'utf-8',
            window:window,
            callback:typeof conf=='function'?conf:(conf&&conf['callback']||function(){})
            };

        conf=ve.lang.extend(def,conf);
        function done(){
            conf['callback'].call(conf.window.document,u);
            if(sc.removeNode)sc.removeNode(true);else head.removeChild(sc);
        };

        sc=conf.window.document.createElement('script');
        sc.setAttribute('charset',conf['charset']);
        sc.src=u;
        sc.onreadystatechange=sc.onload=function(){
            if(!sc.readyState||sc.readyState=="loaded"||sc.readyState=="complete"){
                done();
            }
        };

    var head=conf.window.document.getElementsByTagName('head')[0]||conf.window.document.body
        head.appendChild(sc);
    },
    loadQueue:function(fn){
        var t=this;
        if(this.queue.length>0){
            var u=t.queue.shift();
            t.load(u,function(){
                t.allDones.push(u)
                t.loadQueue(fn);
            });
            return;
        }
        if(typeof fn=='function')fn.call(t,t.allDones);
    },
    add:function(url,cb){
        if(this.lookup[url])return;
        this.lookup[url]=url;
        this.queue.push(url);
    }
});
ve.lang.Class('VEditor.net.CSSLoader',{
    CSSLoader:function(){},
    load:function(u,win){
        if(!u)return;
        win=win||window;
        var css=win.document.createElement('link');
        css.rel='stylesheet';
        css.type='text/css';
        css.href=u;
        head=win.document.getElementsByTagName('head')[0]||win.document.body
        head.appendChild(css);
        return css;
    }
});
})(window,document,VEditor);
(function(ve){
    var enre=/(&|"|'|<|>)/g,trim=/^\s+|\s+$/g,dere=/(&amp;|&lt;|&gt;|&quot;|&#39;)/g,enmap={
        '&':'&amp;',
        '<':'&lt;',
        '>':'&gt;',
        '"':'&quot;',
        "'":'&#39;'
    },demap={
        '&amp;':'&',
        '&lt;':'<',
        '&gt;':'>',
        '&quot;':'"',
        '&#39;':"'",
        '&apos;':"'"
    };

    ve.string={
        htmlencode:function(str){
            return str.replace(enre,function(_0,_1){
                return enmap[_1]||_0;
            });
        },
        htmldecode:function(str){
            return str.replace(dere,function(_0,_1){
                return demap[_1]||_0;
            });
        },
        trim:function(str){
            if(!str){
                return str;
            }
            return str.replace(trim,'').replace(ve.fillCharReg,'');
        }
    };

})(VEditor);
(function(window,ve){
    var _path=(function(){
        var pl=location.href.replace(/\/[^\/]*$/,''),base=ve.baseURL,r,baseURL;
        if(base.indexOf('/')==0){
            baseURL=location.protocol+'//'+location.hostname+(location.port?':'+location.port:'')+base;
        }else if(base.indexOf('../')==0){
            while(base.indexOf('../')==0){
                r=pl=pl.replace(/\/\w+$/,'');
                base=base.replace('../','');
            }
            base=r+'/'+base;
            baseURL=base
            }else if(base.indexOf(location.protocol)==0){
            baseURL=base;
        }else{
            baseURL=pl+'/'+base;
        }
        return baseURL;
    })();
    ve.lang.Class('VEditor.util.Path',{
        Path:function(){
            if(this.baseURL)return this;
            this.baseURL=_path;
        },
        toAbs:function(u){
            var pl=location.href.replace(/[\?#][\s\S]+$/,''),base=this.baseURL,r=pl;
            if(u.indexOf('../')==0){
                while(u.indexOf('../')==0){
                    r=r.replace(/[\/][^\/]+$/,'');
                    u=u.replace('../','');
                }
                r=r+'/'+u;
            }
            else if(u.indexOf('://')>0)r=u;else r=base.replace(/\/[\w\.]+$/,'')+'/'+u;
            return r;
        }
    });
ve.path=new ve.util.Path();
    })(window,VEditor);
(function(window,document,ve){
    ve.lang.Class('VEditor.Editor',{
        Editor:function(conf){
            var t=this;
            t.id=t.editorId=conf.id;
            t.toolbarlist={};

            t.buttons={};

            t.lookuptoolbars={};

            t.bookmark=null;
            t.initComplete=0;
            t._iframe_loaded=false;
            t.shortcuts={};

            t.conf=ve.lang.extend({
                plugins:'',
                toolbarContainer:'',
                iframeContainer:'',
                statusbarContainer:'',
                language:'cn',
                adapter:'',
                viewer:'def',
                editorCss:'',
                tab4space:4,
                newlineTag:'div',
                autoAdjust:false,
                useShortcut:1,
                popupdialog_provider:'def',
                popupdialog_resizable:false,
                popupdialog_draggable:false,
                popupConfig:{},
                mode:'elements',
                styleWithCSS:true,
                pluginsyntax:/^([\s\S]+?(?:(\w+)\.js|\(|,|$))\(?([^\)]*)\)?$/,
                defaultValue:'&nbsp;',
                domain:ve.domain||null
                },conf);
            ve.lang.each(['onInit','onKeyPress','onKeyDown','onKeyUp','onMouseOver','onMouseDown','onMouseUp','onClick','onBeforeExecCommand','onAfterExecCommand','onInitComplete','onActive','onUnActive','onSelectContent','onUIRendered','onBlur','onFocus','onBeforeOpenListBox','onBeforeGetContent','onGetContent','onSetContent','onSaveContent','onPaste','onResize','onPluginsInited','onIframeLoaded','onAfterUpdateVERange','onAfterUpdateVERangeLazy','onNodeRemoved'],function(n){
                t[n]=new ve.EventManager(t);
            });
        },
        preInited:false,
        preInit:function(){
            var t=this,pls=t.conf['plugins'],adapter,viewsr,scloader=new ve.net.ScriptLoader();
            function allDone(s){
                if(!pls){
                    t.init();
                    return;
                }
                var re=t.conf.pluginsyntax,di,na,fname;
                ve.lang.each(pls.split(','),function(n){
                    var ma=n.match(re);
                    ma=ma||[];
                    di=ma[1].replace(/\(/,'');
                    fname=ma[2]||di;
                    na=ma[3];
                    if(na.indexOf('+')>=0){
                        var sp=na.split('+');
                        if(sp.length){
                            if(ve.plugin.lookup[sp[0]]){
                                return;
                            }else{
                                ve.plugin.add(di,fname);
                            }
                        }else{
                        ve.plugin.add(na,fname);
                    }
                }else{
                    ve.plugin.add(di,di);
                }
            });
    if(ve.plugin.urls[di]&&!ve.plugin.scriptLoader.queue.length){
        setTimeout(function(){
            t.init();
        },1000);
        return;
    }
    ve.plugin.loadAll(function(){
        t.init();
    });
    }
    if(t.conf.adapter&&!ve.adapter){
        adapter=/^https?\:\/\//.test(t.conf.adapter)&&t.conf.adapter||('adapter/'+t.conf.adapter+'.adapter.js');
        var a=new ve.util.Path().toAbs(adapter);
        scloader.add(a);
    }
    viewsr=/^https?\:\/\//.test(t.conf.viewer)&&t.conf.viewer||('view/'+t.conf.viewer+'/view.js');
    if(!ve.viewManager.lookup[t.conf.viewer]){
        a=new ve.util.Path().toAbs(viewsr);
        t.conf.viewerurl=t.conf.viewer;
        t.conf.viewer=t.conf.viewer.split('/').pop().replace(/\.js/,'');
        scloader.add(a);
    }
    t.preInited=true;
    if(scloader.queue.length>0){
        scloader.loadQueue(allDone);
    }else{
        allDone('local');
    }
},
createLayout:function(){
    var t=this,dom=ve.dom,ec,ic,tc,sc;
    t.editorContainer=ec=ve.dom.create('div',{
        'class':'veEditorContainer editor_container_'+t.conf.id,
        id:t.conf.id+'Container'
        });
    t.toolbarContainer=t.toolbarManager.createContainer({
        'class':'veToolbarContainer editor_toolbar_container_'+t.conf.id,
        'style':{
            'overflow':'hidden',
            width:t.conf.width
            }
        });
t.iframeContainer=ve.dom.create('div',{
    'class':'veIframeContainer editor_iframe_container_'+t.conf.id,
    'style':{
        width:t.conf.width,
        height:t.conf.height
        }
    });
t.statusbarContainer=ve.dom.create('div',{
    'class':'veStatusbarContainer editor_statusbar_container_'+t.conf.id,
    'style':{
        'overflow':'hidden',
        width:t.conf.width
        }
    });
ve.lang.each(['statusbarContainer','toolbarContainer','iframeContainer'],function(n){
    var el=ve.dom.get(t.conf[n]);
    (el||ec)['appendChild'](t[n])
    });
return{
    editorContainer:ec,
    toolbarContainer:tc||t.toolbarContainer,
    iframeContainer:ic||t.iframeContainer,
    statusbarContainer:sc||t.statusbarContainer
    };

},
init:function(){
    var t=this,s=t.conf,pls=t.conf['plugins'],plm=ve.plugin;
    if(!t.preInited){
        t.preInit();
        return;
    }
    if(!this.conf.renderTo||!ve.dom.get(this.conf.renderTo)){
        throw"NO EDITOR RENDER TARGET";
    }
    t.toolbarManager=new ve.ui.ToolbarManager(t,{
        name:'default'
    });
    ve.lang.each(['addToolbar','getToolbar','addButton','getButton','addControl','getControl'],function(method){
        t[method]=function(){
            return t.toolbarManager[method].apply(t.toolbarManager,ve.lang.arg2Arr(arguments));
        };

    });
t.toolbarlist['default']=t.toolbarManager;
t.controlManager=new ve.ui.ControlManager(t);
var view=ve.viewManager.lookup[this.conf.viewer];
if(!view){
    return;
}
t.history=new ve.History(t);
t.viewControl=new view();
t.viewControl.init(t,this.conf.viewerurl||this.conf.viewer);
t.viewControl.renderUI(t);
t.toolbarManager.toolbarContainer=t.toolbarContainer;
t.toolbarManager.init();
t.onUIRendered.fire();
t.editorcommands=new ve.EditorCommands(t);
ve.lang.each(['addCommand'],function(method){
    t[method]=function(){
        return t.editorcommands[method].apply(t.editorcommands,ve.lang.arg2Arr(arguments));
    };

});
t.popupDialog=new ve.ui.PopupDialogManager(t,ve.lang.extend(t.conf.popupConfig,{
    provider:t.conf.popupdialog_provider,
    resizable:t.conf.popupdialog_resizable,
    draggable:t.conf.popupdialog_draggable,
    titlebar:t.conf.titlebar
    }));
ve.dom.get(this.conf.renderTo).appendChild(t.editorContainer);
ve.dom.setStyle(t.editorContainer,'width',this.conf.width);
t.iframeHTML='<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />';
var frameUrl='javascript:;';
if(this.conf.domain){
    if(ve.ua.ie){
        frameUrl='javascript:(function(){document.open();document.domain = "'+this.conf.domain+'";var ed = window.parent.VEditor.get("'+this.conf.veID+'");document.write(ed.iframeHTML);document.close();ed.initIframe();})()';
    }
    t.iframeHTML+='<script type="text/javascript">document.domain = "'+this.conf.domain+'";</script>';
}
if(ve.ua.ie&&!this.conf.domain){
    frameUrl='javascript:(function(){document.open();var ed = window.parent.VEditor.get("'+this.conf.veID+'");document.write(ed.iframeHTML);document.close();})()';
    t.iframeHTML+='</head><body style="min-height:'+this.conf.height+'px" onload="(function() {var ed = parent.VEditor.get(\''+this.conf.veID+'\'); ed.initIframe();}) ();"></body></html>';
}else{
    t.iframeHTML+='</head><body style="min-height:'+this.conf.height+'px"></body></html>';
}
t.iframeElement=ve.dom.create('iframe',{
    id:this.conf.id+'_Iframe',
    src:frameUrl,
    frameBorder:'0',
    allowTransparency:'true',
    style:{
        width:'100%',
        height:'100%'
    }
});
ve.dom.event.add(t.iframeElement,'load',function(){
    t._iframe_loaded=true;
    t.onIframeLoaded.fire(t.iframeElement);
});
t.iframeContainer.appendChild(t.iframeElement);
if(!ve.ua.ie||!this.conf.domain){
    t.initIframe();
}
var url={},ppc=[],matches;
if(pls){
    ve.lang.each(pls.split(','),function(n){
        matches=n.match(t.conf.pluginsyntax);
        if(/^https?/.test(matches[1])&&matches[2]!='plugin')matches[3]=matches[2];
        if(matches[3]){
            ppc=ppc.concat(matches[3].split('+'));
            url[matches[1].replace(/\(/g,'')||matches[3]]=matches[3]||matches[1];
        }
        else{
            ppc.push(n);
            url[n]=n;
        }
    });
}
ve.lang.each(url,function(n,i){
    ve.lang.each(n.split('+'),function(m){
        url[m]=i;
    });
});
ve.lang.each(ppc,function(n,i){
    var c=plm.lookup[n],o;
    if(c){
        try{
            o=new c();
            if(o.init){
                o.init(t,/^https?/.test(url[n])?url[n]:('plugins/'+url[n]));
            }
        }catch(ex){
        window.console&&console.log('编辑器插件报错:',n,ex);
    }
}
});
t.onPluginsInited.fire(t);
if(t._iframeInited){
    t._fireInitComplete();
}else{
    t._needFireInitCompleteInInitIframe=true;
}
return t;
},
_initCompleteFired:false,
_fireInitComplete:function(){
    var t=this;
    if(t._initCompleteFired){
        return;
    }else{
        t._initCompleteFired=true;
        setTimeout(function(){
            t.onInitComplete.fire(t);
        },100);
    }
},
_needFireInitCompleteInInitIframe:false,
_iframeInited:false,
initIframe:function(){
    if(this._iframeInited){
        return;
    }
    var t=this,d;
    try{
        d=this.getDoc();
    }catch(ex){
        throw('IE IFRAME访问没有权限');
        return;
    }
    if(!d.body){
        window.setTimeout(function(){
            t.initIframe();
        },10);
        return;
    }
    d.open();
    d.write(t.iframeHTML);
    d.close();
    if(ve.ua.ie){
        d.body.disabled=true;
        d.body.contentEditable=true;
        d.body.disabled=false;
    }else{
        d.body.contentEditable=true;
        d.body.spellcheck=false;
    }
    if(this.conf.height){
        d.body.style.height=t.conf.height+'px';
    }
    d.body.innerHTML='<'+t.conf.newlineTag+'>'+t.conf.defaultValue+'</'+t.conf.newlineTag+'>';
    t.selection=new ve.Selection(this.getWin(),d,this);
    t.bindEditorDomEvent();
    t.onInit.fire();
    if(t.conf.styleWithCSS){
        try{
            d.execCommand("styleWithCSS",0,false);
        }catch(e){
            try{
                d.execCommand("useCSS",0,true);
            }catch(e){}
        }
    }
if(t.conf.useShortcut){
    t.addShortcut('ctrl+b','Bold');
    t.addShortcut('ctrl+i','Italic');
    t.addShortcut('ctrl+u','Underline');
    t.addShortcut('ctrl+alt+l','justifyleft');
    t.addShortcut('ctrl+alt+c','justifycenter');
    t.addShortcut('ctrl+alt+r','justifyright');
    t.addShortcut('ctrl+s','saveContent');
}
t._iframeInited=true;
if(t._needFireInitCompleteInInitIframe){
    t._fireInitComplete();
}
setTimeout(function(){
    t.focus();
},100);
},
showStatusbar:function(html,timeout,showCloseBtn){
    var _this=this;
    ve.dom.setStyle(this.statusbarContainer,'display','block');
    if(showCloseBtn===undefined||showCloseBtn){
        html+='<a href="javascript:;" id="ve_editor_status_bar_close_btn" style="display:block; position:absolute; top:0; right:4px; text-decoration:none; color:white">X</a>';
    }
    this.statusbarContainer.innerHTML='<div class="veStatusbarContainer_wrap">'+html+'</div>';
    ve.dom.event.add(ve.dom.get('ve_editor_status_bar_close_btn'),'click',function(e){
        _this.hideStatusbar();
        ve.dom.event.preventDefault(e);
        return false;
    });
    if(timeout){
        window.setTimeout(function(){
            _this.hideStatusbar();
        },timeout*1000);
    }
},
hideStatusbar:function(){
    var t=this;
    ve.dom.setStyle(t.statusbarContainer,'display','none');
},
focus:function(){
    this.getWin().focus();
    if(this.bookmark&&ve.ua.ie){
        this.selection.moveToBookmark(this.bookmark);
    }
    this.onFocus.fire(this);
},
isFocused:function(){
    var nativeRange=ve.Range.getNativeRange(this.getWin(),this.getDoc());
    if(ve.ua.ie){
        return!!nativeRange;
    }else{
        return nativeRange&&nativeRange.rangeCount;
    }
},
getWin:function(){
    return window.frames[this.conf.id+'_Iframe']||document.getElementById(this.conf.id+'_Iframe').contentWindow;
},
getDoc:function(){
    var w=this.getWin();
    return w.contentDocument||w.document;
},
getBody:function(){
    return this.getDoc().body;
},
addShortcut:function(p,cmd){
    var _this=this,fn;
    if(typeof(cmd)=='function'){
        fn=cmd;
    }else if(this.editorcommands.hasCommand(cmd)){
        fn=function(){
            _this.editorcommands.execCommand(cmd,false);
            return false;
        }
    }else{
    throw('NO SHORTCUT HANDLER FOUND');
}
p=p.toLowerCase();
var k=p.split('+'),o={
    fn:fn,
    alt:0,
    ctrl:0,
    shift:0
};

ve.lang.each(k,function(v){
    switch(v){
        case'alt':case'ctrl':case'shift':
            o[v]=true;
            break;
        case'enter':
            o.keyCode=13;
            break;
        default:
            o.charCode=v.charCodeAt(0);
            o.keyCode=v.toUpperCase().charCodeAt(0);
            break;
    }
});
_this.shortcuts[p]=o;
},
setContent:function(params){
    var _this=this;
    params=ve.lang.extend(true,{
        forcusFirst:true,
        addHistory:false
    },params);
    if(!this.isFocused()){
        this.focus();
    }
    this.clearContent();
    var div=document.createElement('div');
    params.content='<div id="veditor_content_fix">'+params.content+'</div>';
    this.insertHtml(params);
    var _tmp=this.getDoc().getElementById('veditor_content_fix');
    if(_tmp){
        ve.dom.remove(_tmp,true);
    }
    if(!params.addHistory){
        this.history.reset(this.getBody().innerHTML);
    }
    if(params.forcusFirst){
        var rng=this.getVERange();
        var first=this.getBody().firstChild;
        if(!first){
            first=this.getDoc().createElement('DIV');
            this.getBody().appendChild(first);
        }
        if(ve.dtd.$empty[first.tagName]){
            rng.setStartBefore(first);
        }else if(first.firstChild){
            rng.setStartBefore(first.firstChild);
        }else{
            rng.selectNodeContents(first);
        }
        rng.collapse(true);
        rng.select();
        this.updateLastVERange();
    }
},
_lastVERange:null,
getVERange:function(){
    return this._lastVERange||this.updateLastVERange();
},
_updateFireing:false,
updateLastVERange:function(rng){
    var _this=this;
    this._lastVERange=rng||(new ve.Range(this.getWin(),this.getDoc()));
    this.onAfterUpdateVERange.fire(this._lastVERange);
    if(!this._updateFireing){
        this._updateFireing=true;
        setTimeout(function(){
            _this.onAfterUpdateVERangeLazy.fire(_this._lastVERange);
            _this._updateFireing=false;
        },400);
    }
    return this._lastVERange;
},
querySelectionStyle:function(styleKey){
    var rng=this.getVERange();
    var el;
    if(rng.collapsed||rng.startContainer.nodeType==3){
        el=rng.startContainer;
    }else{
        el=rng.startContainer.childNodes[rng.startOffset];
    }
    if(!el){
        return null;
    }
    if(el&&el.nodeType!=1){
        try{
            if(!el.ownerDocument||!el.parentNode){
                return null;
            }
            el=el.parentNode;
        }catch(ex){}
    }
var styleVal;
try{
    var styleVal=ve.dom.getStyle(el,styleKey);
}catch(ex){}
return styleVal;
},
insertHtml:function(params){
    var _this=this;
    params=ve.lang.extend(true,{
        content:null,
        useParser:false
    },params);
    if(!ve.string.trim(params.content)){
        return;
    }
    if(params.useParser){
        _html=this.onSetContent.fire(this,params.content);
        params.content=_html===undefined?params.content:_html;
    }
    this.editorcommands.execCommand('insertHtml',params.content);
},
getContent:function(){
    this.onBeforeGetContent.fire(this);
    var html=this.getBody().innerHTML||'';
    html=this.onGetContent.fire(this,html);
    html=html.replace(/\uFEFF/g,'');
    if(this._autoProcessContent){
        var processedStr=this._autoProcessContent(html);
        return processedStr===undefined?html:processedStr;
    }else{
        return html;
    }
},
getTextContent:function(){
    var html=this.getContent();
    return html.replace(/<\w[\s\S]*?>|<\/\w+>/g,'');
},
clearContent:function(){
    this.getBody().innerHTML='';
    this.focus();
    this.updateLastVERange();
    this.history.add();
},
isEmpty:function(){
    var textContent=this.getTextContent();
    textContent=textContent.replace(/\&nbsp;/ig,'');
    textContent=ve.string.trim(textContent);
    if(textContent){
        return false;
    }else{
        var empty=true;
        var nodes=this.getBody().getElementsByTagName('*');
        ve.lang.each(nodes,function(node){
            if(!ve.dtd.$removeEmpty[node.tagName]&&!ve.dtd.$removeEmptyBlock[node.tagName]&&node.tagName!='BR'&&node.nodeType==1){
                empty=false;
                return true;
            }
        });
    return empty;
}
},
resize:function(){
    if(!this.conf.autoAdjust){
        return;
    }
    var t=this,w=t.getWin(),d=t.getDoc(),b=t.getBody(),_DIF_OFFSET=50;
    t.iframeContainer.style.height='auto';
    if(t.__resizing__){
        return;
    }
    t.__resizing__=true;
    setTimeout(function(){
        if(ve.ua.chrome){
            b.style.overflow='auto';
            tmpNode=d.createElement('span');
            b.appendChild(tmpNode);
            var h=Math.max(tmpNode.offsetTop+tmpNode.offsetHeight,t.conf.height);
            b.style.height=(h+10)+'px';
            t.iframeElement.style.height=(h+10)+'px';
            b.style.overflow='hidden';
            tmpNode.parentNode.removeChild(tmpNode);
            t.__resizing__=false;
            return;
        }
        var winRegion=ve.dom.getWindowRegion(t.iframeElement,t.getDoc());
        var bodyHeight=Math.max(b.offsetHeight,t.conf.height);
        if(ve.ua.ie!=6){
            b.style.overflowX='hidden';
        }
        if(!ve.ua.ie){
            bodyHeight=Math.max(bodyHeight,b.parentNode.offsetHeight);
        }else if(ve.ua.ie==9){
            b.style.overflow='auto';
            b.parentNode.style.height='auto';
            t.iframeElement.style.height='auto';
        }
        if(ve.ua.ie==6){
            if(b.offsetHeight<t.conf.height+_DIF_OFFSET){
                b.style.height=t.conf.height+'px';
            }else{
                b.style.height='auto';
            }
        }
    else if(ve.ua.ie9Mode&&ve.ua.docMode!=9){
        b.style.overflowY='auto';
        if(b.offsetHeight<t.conf.height+_DIF_OFFSET){
            b.style.height=t.conf.height+_DIF_OFFSET+'px';
            t.iframeElement.style.height=t.conf.height+_DIF_OFFSET+'px';
        }else{
            b.style.height='auto';
        }
        return;
    }
    else{
        b.style.height='auto';
    }
    if(winRegion.verticalScroll){
        t.iframeElement.style.height=(winRegion.documentHeight+_DIF_OFFSET)+'px';
    }else if(ve.ua.ie9Mode&&ve.ua.docMode!=9){
        t.iframeElement.style.height=(bodyHeight+_DIF_OFFSET)+'px';
    }else{
        t.iframeElement.style.height=(bodyHeight+_DIF_OFFSET)+'px';
    }
    t.__resizing__=false;
    },50);
},
bindEditorDomEvent:function(){
    var t=this,w=t.getWin(),d=t.getDoc(),b=t.getBody();
    var dom=ve.dom;
    ve.dom.event.add(d,'click',function(e){
        t.onClick.fire(t,e);
    });
    ve.dom.event.add(d,'keypress',function(e){
        return t.onKeyPress.fire(t,e);
    });
    var sd;
    ve.dom.event.add(d,'keydown',function(e){
        if(!e.ctrlKey&&sd&&+new Date-sd<100){
            return;
        }
        var b=t.onKeyDown.fire(t,e);
        if(false===b){
            ve.dom.event.cancel(e);
        }
        sd=+new Date;
    });
    ve.dom.event.add(d,'keyup',function(e){
        t.onKeyUp.fire(t,e);
    });
    ve.dom.event.add(d,'mousedown',function(e){
        t.onMouseDown.fire(t,e);
    });
    ve.dom.event.add(d,'mouseup',function(e){
        t.onMouseUp.fire(t,e);
        t.bookmark=t.selection.getBookmark();
        if(t.selection.getContent().length>0){
            t.onSelectContent.fire(t,e);
        }
    });
ve.dom.event.add(b,'paste',function(e){
    var r=t.onPaste.fire(t,e);
    if(false===r){
        return false;
    }
});
if(t.conf.autoAdjust){
    if(ve.ua.ie&&ve.ua.ie!=9){
        ve.dom.event.add(w,'resize',ve.lang.bind(t,t.resize));
    }else{
        ve.dom.event.add(b,'DOMSubtreeModified',ve.lang.bind(t,t.resize));
    }
}
function find(e){
    var v=null;
    if(!e||!e.altKey&&!e.ctrlKey&&!e.metaKey)
        return v;
    ve.lang.each(t.shortcuts,function(o){
        if(ve.ua.mac&&o.ctrl!=e.metaKey)
            return;
        else if(!ve.ua.mac&&o.ctrl!=e.ctrlKey)
            return;
        if(o.alt!=e.altKey)
            return;
        if(o.shift!=e.shiftKey)
            return;
        if(e.keyCode==o.keyCode||(e.charCode&&e.charCode==o.charCode)){
            v=o;
            return false;
        }
    });
return v;
};

var upsd;
t.onKeyUp.add(function(e){
    if(upsd&&+new Date-upsd<50){
        return;
    }
    t.bookmark=t.selection.getBookmark();
    upsd=+new Date;
});
t.onKeyUp.add(function(e){
    var o=find(e);
    if(o){
        ve.dom.event.cancel(e);
    }
});
t.onKeyPress.add(function(e){
    var o=find(e);
    if(o)
        ve.dom.event.cancel(e);
});
t.onKeyDown.add(function(e){
    var o=find(e);
    if(o){
        var b=o.fn.call(t,e);
        if(b===false){
            ve.dom.event.cancel(e);
        }
    }
});
if(typeof t.conf.tab4space=='number'){
    var isup=true;
    ve.dom.event.add(d,'keydown',function(e){
        if(e.keyCode==9){
            ve.dom.event.cancel(e);
            if(!isup){
                return;
            }
            t.insertHtml({
                content:new Array(1+t.conf.tab4space).join('&nbsp;')
                });
            isup=false;
        }
    });
t.onKeyUp.add(function(e){
    if(e.keyCode==9){
        isup=true;
    }
});
}
if(ve.ua.ie){
    t.onKeyDown.add(function(evt){
        var cc=evt.keyCode||evt.charcode;
        if(8==cc){
            var _veRange=t.getVERange();
            if(!_veRange.collapsed){
                _veRange.deleteContents();
                t.bookmark=t.selection.getBookmark();
                ve.dom.event.cancel();
                return;
            }
        }
    });
}
if(ve.ua.chrome){
    t.onMouseDown.add(function(ev){
        var rng=t.getVERange();
        var node=ve.dom.event.getTarget(ev);
        if(node.tagName=='IMG'){
            rng.selectNode(node);
            rng.select();
        }
    });
};

var _useHack=false;
ve.dom.event.add(t.getDoc(),'mouseup',function(ev){
    if(ve.ua.ie){
        var mouseX=ve.dom.event.mouseX(ev);
        var mouseY=ve.dom.event.mouseY(ev);
    }
    setTimeout(function(){
        if(ve.ua.ie&&_useHack){
            var rng;
            try{
                var sel=d.selection?d.selection:w.getSelection();
                if(sel.type=='None'){
                    rng=sel.rangeCount>0?sel.getRangeAt(0):(sel.createRange?sel.createRange():d.createRange());
                    rng.moveToPoint(mouseX,mouseY);
                }
                if(rng){
                    var cusRange=new ve.Range(w,d,rng);
                    t.updateLastVERange(cusRange);
                    return;
                }
            }catch(ex){}
    }
    var rng=t.updateLastVERange();
    _useHack=!rng.collapsed;
},50);
});
t.onKeyUp.addFirst(function(){
    t.updateLastVERange();
});
t.onAfterExecCommand.addFirst(function(){
    t.updateLastVERange();
});
}
},{});
ve.Editor.ui={};

})(window,document,VEditor);
(function(window,document,ve,undefined){
    var IS_BROWSER_COMMANDS=/^(Bold|Italic|Underline|justifycenter|justifyleft|justifyright|justifyfull|FontSize|removeformat|FontName|InsertOrderedList|InsertUnorderedList|indent|outdent)$/i;
    ve.lang.Class('VEditor.EditorCommands',{
        EditorCommands:function(editor){
            var _this=this;
            this.editor=editor;
            this.commands={};

            this.editor.onAfterUpdateVERangeLazy.add(function(range){
                _this.updateCommandState();
            });
            this._addSomeInternalCommands();
        },
        execCommand:function(cmd){
            var _this=this,args=ve.lang.arg2Arr(arguments,1),fireParams=[this.editor,cmd].concat(args);
            this.editor.onBeforeExecCommand.fire.apply(this.editor.onBeforeExecCommand,fireParams);
            if(typeof(cmd)=='function'){
                cmd.apply(this.editor,args);
            }
            else if(this.commands[cmd]){
                this.commands[cmd].apply(this.editor,args);
            }
            else if(typeof(cmd)=='string'&&IS_BROWSER_COMMANDS.test(cmd)){
                this.execBrowserCommand.apply(this.editor,ve.lang.arg2Arr(arguments));
            }
            else{
                throw('NO COMMAND FOUND');
            }
            this.editor.onAfterExecCommand.fire.apply(this.editor.onAfterExecCommand,fireParams);
        },
        execBrowserCommand:function(cmd,ui,val){
            var ed=this,f,args=ve.lang.arg2Arr(arguments,1),d=ed.getDoc(),b=ed.getBody(),isIE=ve.ua.ie,isIE9=ve.ua.ie==9;
            ed.selection.moveToBookmark(ed.bookmark);
            if(isIE&&!isIE9&&ed.bookmark&&!ed.bookmark.length){
                if(!/justifycenter|justifyleft|justifyright|justifyfull/i.test(cmd)){
                    ed.insertHtml({
                        content:'<span id="veditor_caret" unselectable="on">'+ve.blankChar+'</span>'
                        });
                    var r=d.body.createTextRange();
                    var sp=d.getElementById('veditor_caret');
                    r.moveToElementText(sp);
                    r.select();
                    d.execCommand(cmd,ui||false,val);
                    var _rm=function(b){
                        sp=d.getElementById('veditor_caret');
                        if(sp){
                            sp.removeNode(b);
                        }
                    }
                ed.onKeyUp.add(function(){
                    _rm();
                });
                ed.onClick.add(function(){
                    _rm(true);
                });
                ed.onBlur.add(function(){
                    _rm(true);
                });
            }else{
                var tn=ed.currentNode;
                if(tn&&tn.nodeName=='IMG'){
                    pn=tn.parentNode;
                    pn.removeAttribute('align');
                    pn.style.textAlign='';
                    var cr=d.body.createControlRange();
                    cr.add(tn);
                    cr.select();
                }
                d.execCommand(cmd,ui||false,val);
            }
        }else{
        d.execCommand(cmd,ui||false,val);
    }
    },
addCommand:function(name,fn){
    if(this.commands[name]||!fn){
        throw('ADD COMMAND PARAM ERROR');
    }
    this.commands[name]=fn;
},
removeCommand:function(name){
    if(this.commands[name]){
        this.commands[name]=null;
    }
},
hasCommand:function(name){
    return!!this.commands[name]||IS_BROWSER_COMMANDS.test(name);;
},
queryCommandState:function(cmd){
    switch(cmd){
        case'justifycenter':case'justifyleft':case'justifyright':case'justifyfull':
            return this.queryStateJustify(cmd,cmd.slice(7));
        default:
            var state;
            try{
            state=this.editor.getDoc().queryCommandState(cmd);
            if(!state){
                state=(this['_queryState'+cmd]&&this['_queryState'+cmd]());
            }
        }catch(ex){}
        return state;
}
return false;
},
updateCommandState:function(){
    var _this=this;
    var updateItems=['justifycenter','justifyleft','justifyright','justifyfull','InsertOrderedList','InsertUnorderedList','indent','outdent'];
    ve.lang.each(updateItems,function(cmd){
        var btn=_this.editor.getButton(cmd);
        if(btn){
            var actState=!!_this.queryCommandState(cmd)?'setActive':'setUnActive';
            btn[actState]();
        }
    });
},
queryStateJustify:function(cmd,val){
    var ed=this.editor,n=ed.selection.getNode(),dom=ve.dom;
    if(n&&n.nodeName=='IMG'){
        if(ve.dom.getStyle(n,'float')==val){
            return 1;
        }
        return n.parentNode.style.textAlign==val;
    }
    if(n&&n.nodeType==1&&(n.align||n.style.textAlign)){
        return val==n.align||val==n.style.textAlign;
    }
    else{
        _parent=ve.dom.getParent(n,function(d){
            return d.nodeType==1&&(d.align||d.style.textAlign);
        });
        return _parent&&(val==_parent.align||val==_parent.style.textAlign);
    }
},
_addSomeInternalCommands:function(){
    var ed=this.editor,_this=this;
    this.addCommand('saveContent',function(){
        ed.onSaveContent.fire(ed,ed.getContent());
    });
    this.addCommand('removeformat',function(){
        console.log('removeformat execute');
        ed.getDoc().execCommand('removeformat',false,null);
        cn=ed.selection.getNode();
        cn&&cn.removeAttribute('style');
    });
    this.addCommand('insertHtml',function(html){
        var rng=ed.getVERange();
        rng.insertHtml(html);
        rng.collapse();
        rng.select();
    });
    var FONT_OP_HASH={
        'FontName':['fontFamily'],
        'FontSize':['fontSize'],
        'ForeColor':['color'],
        'BackColor':['backgroundColor'],
        'Bold':['fontWeight','bold'],
        'UnBold':['fontWeight','normal'],
        'Italic':['fontStyle','italic'],
        'UnItalic':['fontStyle','normal'],
        'Underline':['textDecoration','underline'],
        'UnUnderline':['textDecoration','none']
        };

    for(var i in FONT_OP_HASH){
        (function(i){
            _this.addCommand(i,function(ui,val){
                var key=FONT_OP_HASH[i][0],styleVal=val||FONT_OP_HASH[i][1],rng=ed.getVERange();
                if(!rng.collapsed){
                    var attr={
                        style:{}
                };

                attr.style[key]=styleVal;
                rng.setInlineStyle('span',attr);
            }else{
                var curVal=ed.querySelectionStyle(key);
                if(curVal!=styleVal){
                    var span=rng.doc.createElement('span');
                    span.innerHTML=ve.blankChar;
                    rng.insertNode(span);
                    var node=ve.dom.fixNodeDupParent(span);
                    node.style[key]=styleVal;
                    rng.selectNodeContents(node);
                    rng.collapse(true);
                }
            }
            rng.select();
        });
    })(i);
    };

}
});
})(window,document,VEditor);
(function(window,document,ve,undefined){
    ve.lang.Class('VEditor.Selection',{
        Selection:function(win,doc,editor){
            var t=this;
            t.win=win;
            t.doc=doc;
            t.startContainer=t.endContainer=null;
            t.startOffset=t.endOffset=0;
            t.collapsed=true;
        },
        getContent:function(s){
            var t=this,r=t.getRng(),dom=ve.dom,e=ve.dom.create("body"),se=t.getSel(),wb,wa,n;
            s=s||{};

            wb=wa='';
            s.get=true;
            s.format=s.format||'html';
            if(s.format=='text'){
                return t.isCollapsed()?'':(r.text||(se.toString?se.toString():''));
            }
            if(r.cloneContents){
                n=r.cloneContents();
                if(n){
                    e.appendChild(n);
                }
            }else if(r.item||typeof r.htmlText!='undefined'){
            e.innerHTML=r.item?r.item(0).outerHTML:r.htmlText;
        }else{
            e.innerHTML=r.toString();
        }
        if(/^\s/.test(e.innerHTML)){
            wb=' ';
        }
        if(/\s+$/.test(e.innerHTML)){
            wa=' ';
        }
        s.content=t.isCollapsed()?'':wb+e.innerHTML+wa;
        return s.content;
    },
    getBookmark:function(){
        var t=this,r=t.getRng(),tr,sx,sy,e,sp,bp,le,c=-0xFFFFFF,s,ro=t.doc.body,wb=0,wa=0,nv;
        if(ve.ua.ie){
            if(r.item){
                e=r.item(0);
                ve.lang.each(t.doc.getElementsByTagName(e.nodeName),function(n,i){
                    if(e==n){
                        sp=i;
                        return false;
                    }
                });
            return{
                tag:e.nodeName,
                index:sp
            };

    }
    tr=t.doc.body.createTextRange();
        tr.moveToElementText(ro);
        tr.collapse(true);
        bp=Math.abs(tr.move('character',c));
        tr=r.duplicate();
        tr.collapse(true);
        sp=Math.abs(tr.move('character',c));
        tr=r.duplicate();
        tr.collapse(false);
        le=Math.abs(tr.move('character',c))-sp;
        return{
        start:sp-bp,
        length:le
    };

}
e=t.getNode();
    s=t.getSel();
    if(!s){
    return null;
}
function getPos(r,sn,en){
    var w=t.doc.createTreeWalker(r,NodeFilter.SHOW_TEXT,null,false),n,p=0,d={};
    while((n=w.nextNode())!=null){
        if(n==sn)
            d.start=p;
        if(n==en){
            d.end=p;
            return d;
        }
        p+=(n.nodeValue.replace(/[\r\n]/g,'')||'').length;
    }
    return null;
};

if(s.anchorNode==s.focusNode&&s.anchorOffset==s.focusOffset){
    e=getPos(ro,s.anchorNode,s.focusNode);
    if(!e)
        return{
            scrollX:sx,
            scrollY:sy
        };
    (s.anchorNode.nodeValue.replace(/[\r\n]/g,'')||'').replace(/^\s+/,function(a){
        wb=a.length;
    });
    return{
        start:Math.max(e.start+s.anchorOffset-wb,0),
        end:Math.max(e.end+s.focusOffset-wb,0),
        beg:s.anchorOffset-wb==0
        };

}else{
    e=getPos(ro,r.startContainer,r.endContainer);
    if(!e){
        return{
            scrollX:sx,
            scrollY:sy
        };

}
return{
    start:Math.max(e.start+r.startOffset-wb,0),
    end:Math.max(e.end+r.endOffset-wa,0),
    beg:r.startOffset-wb==0
    };

}
},
moveToBookmark:function(b){
    var t=this,r=t.getRng(),s=t.getSel(),ro=t.doc.body,sd,nvl,nv;
    if(!b){
        return false;
    }
    function getPos(r,sp,ep){
        var w=t.doc.createTreeWalker(r,NodeFilter.SHOW_TEXT,null,false),n,p=0,d={},o,v,wa,wb;
        while((n=w.nextNode())!=null){
            wa=wb=0;
            nv=n.nodeValue||'';
            nvl=nv.replace(/[\r\n]/g,'').length;
            p+=nvl;
            if(p>=sp&&!d.startNode){
                o=sp-(p-nvl);
                if(b.beg&&o>=nvl){
                    continue;
                }
                d.startNode=n;
                d.startOffset=o+wb;
            }
            if(p>=ep){
                d.endNode=n;
                d.endOffset=ep-(p-nvl)+wb;
                return d;
            }
        }
    return null;
};

if(ve.ua.ie){
    if(b.tag){
        r=ro.createControlRange();
        ve.lang.each(t.doc.getElementsByTagName(b.tag),function(n,i){
            if(i==b.index){
                r.addElement(n);
                return false;
            }
        });
}else{
    try{
        if(b.start<0)
            return true;
        r=s.createRange();
        r.moveToElementText(ro);
        r.collapse(true);
        r.moveStart('character',b.start);
        r.moveEnd('character',b.length);
    }catch(ex2){
        return true;
    }
}
try{
    r.select();
}
catch(ex){}
return true;
}
if(!s){
    return false;
}
if(b.rng){
    s.removeAllRanges();
    s.addRange(b.rng);
}else{
    if(b.start&&b.end){
        try{
            sd=getPos(ro,b.start,b.end);
            if(sd){
                r=t.doc.createRange();
                r.setStart(sd.startNode,sd.startOffset);
                r.setEnd(sd.endNode,sd.endOffset);
                s.removeAllRanges();
                s.addRange(r);
            }
        }catch(ex){}
}
}
},
getSel:function(){
    return ve.Range.getSelection(this.win,this.doc);
},
getRng:function(){
    return ve.Range.getNativeRange(this.win,this.doc);
},
getNode:function(){
    var t=this,r=t.getRng(),s=t.getSel(),e;
    if(!ve.ua.ie){
        if(!r){
            return document.body;
        }
        e=r.commonAncestorContainer;
        if(!r.collapsed){
            if(ve.ua.webkit&&s.anchorNode&&s.anchorNode.nodeType==1){
                return s.anchorNode.childNodes[s.anchorOffset];
            }
            if(r.startContainer==r.endContainer){
                if(r.startOffset-r.endOffset<2){
                    if(r.startContainer.hasChildNodes()){
                        e=r.startContainer.childNodes[r.startOffset];
                        return e;
                    }
                }
            }
    }
return e.parentNode;
}
return r.item?r.item(0):r.parentElement();
},
isCollapsed:function(){
    var t=this,r=t.getRng(),s=t.getSel();
    if(!r||r.item)
        return false;
    return!s||r.boundingWidth==0||r.collapsed;
},
collapse:function(b){
    var t=this,r=t.getRng(),n;
    if(r.item){
        n=r.item(0);
        r=this.win.document.body.createTextRange();
        r.moveToElementText(n);
    }
    r.collapse(!!b);
    t.select();
}
});
})(window,document,VEditor);
(function(window,document,ve,undefined){
    var EXTRACT=0,CLONE=1,DELETE=2;
    ve.lang.Class('VEditor.Range',{
        win:null,
        doc:null,
        lastRange:null,
        startContainer:null,
        startOffset:0,
        endContainer:null,
        endOffset:0,
        collapsed:true,
        guid:1,
        bookmarkStartId:'veditor_bookmark_start',
        bookmarkEndId:'veditor_bookmark_end',
        bookmarkTag:'span',
        Range:function(win,doc,range){
            this.win=win;
            this.doc=doc;
            this.startContainer=null;
            this.endContainer=null;
            this.startOffset=null;
            this.endOffset=null;
            var rng=range||(ve.ua.ie?_getIERange(win,doc):_getW3CRange(win,doc));
            this._convertBrowserRange(rng);
            this._fixNeighborNode();
        },
        _convertBrowserRange:function(browserRange){
            if(!ve.ua.ie){
                var sel=_getSelection(this.win,this.doc);
                if(sel&&sel.rangeCount){
                    var firstRange=sel.getRangeAt(0);
                    var lastRange=sel.getRangeAt(sel.rangeCount-1);
                    this.setStart(firstRange.startContainer,firstRange.startOffset);
                    this.setEnd(lastRange.endContainer,lastRange.endOffset);
                    this.collapsed=this._isCollapsed();
                }else{
                    this.setStart(this.doc.body.firstChild||this.doc.body,0);
                    this.collapse(true);
                }
            }else{
            if(browserRange.item){
                this.selectNode(browserRange.item(0));
            }else{
                var bi=this.getBoundaryInformation(browserRange,true);
                console.log('bi:',bi.container,bi.offset);
                this.setStart(bi.container,bi.offset);
                if(browserRange.compareEndPoints('StartToEnd',browserRange)!=0){
                    bi=this.getBoundaryInformation(browserRange,false);
                    this.setEnd(bi.container,bi.offset);
                }
            }
        }
    },
getBoundaryInformation:function(range,isStart){
    range=range.duplicate();
    range.collapse(isStart);
    var parent=range.parentElement();
    if(!parent||parent.document!=this.doc){
        window.console&&console.log('[失焦!]:getBoundaryInformation');
        return{
            container:this.doc.body,
            offset:0
        };

}
if(!parent.hasChildNodes()){
    return{
        container:parent,
        offset:0
    };

}
var siblings=parent.children,child,testRange=range.duplicate(),startIndex=0,endIndex=siblings.length-1,index=-1,distance;
while(startIndex<=endIndex){
    index=Math.floor((startIndex+endIndex)/2);
    child=siblings[index];
    if(child.nodeType==8){
        child=child.nextSibling||child.previousSibling;
    }
    testRange.moveToElementText(child);
    var position=testRange.compareEndPoints('StartToStart',range);
    if(position>0){
        endIndex=index-1;
    }else if(position<0){
        startIndex=index+1;
    }else{
        return{
            container:parent,
            offset:ve.dom.nodeIndex(child)
            };

}
}
if(index==-1){
    testRange.moveToElementText(parent);
    testRange.setEndPoint('StartToStart',range);
    distance=testRange.text.replace(/(\r\n|\r)/g,'\n').length;
    siblings=parent.childNodes;
    if(!distance){
        child=siblings[siblings.length-1];
        return{
            container:child,
            offset:child.nodeValue.length
            };

}
var i=siblings.length;
while(distance>0)
    distance-=siblings[--i].nodeValue.length;
return{
    container:siblings[i],
    offset:-distance
    }
}
testRange.collapse(position>0);
testRange.setEndPoint(position>0?'StartToStart':'EndToStart',range);
distance=testRange.text.replace(/(\r\n|\r)/g,'\n').length;
if(!distance){
    return ve.dtd.$empty[child.tagName]||ve.dtd.$nonChild[child.tagName]?{
        container:parent,
        offset:ve.dom.nodeIndex(child)+(position>0?0:1)
        }:{
        container:child,
        offset:position>0?0:child.childNodes.length
        }
    }
while(distance>0){
    try{
        var pre=child;
        child=child[position>0?'previousSibling':'nextSibling'];
        distance-=child.nodeValue.length;
    }catch(e){
        return{
            container:parent,
            offset:ve.dom.nodeIndex(pre)
            };

}
}
return{
    container:child,
    offset:position>0?-distance:child.nodeValue.length+distance
    }
},
_fixNeighborNode:function(){
    if(this.collapsed&&this.startContainer){
        var ps=this.startContainer.previousSibling;
        var ns=this.startContainer.nextSibling;
        if(ve.ua.ie==9){
            if(ps&&ps.nodeType==1&&ps.tagName=='BR'){
                var evt=this.win.event;
                if(evt){
                    var mouseX=evt.pageX||(evt.clientX+(this.doc.documentElement.scrollLeft||this.doc.body.scrollLeft));
                    var testNode=this.doc.createElement('span');
                    this.startContainer.parentNode.insertBefore(testNode,ps);
                    var testRegion=ve.dom.getRegion(testNode,this.doc);
                    if(testRegion&&testRegion.left&&Math.abs(testRegion.left-mouseX)>3){
                        this.setStartBefore(ps);
                        this.collapse(true);
                    }
                    ve.dom.remove(testNode);
                }
            }
        }
var neighborIsOk=function(node){
    return node&&node.nodeType==1&&node.tagName=='SPAN'&&!ve.string.trim(node.innerHTML);
};

var ps=null,ns=null;
if(this.startContainer.nodeType==3&&this.startOffset==this.startContainer.nodeValue.length){
    ns=this.startContainer.nextSibling;
    if(neighborIsOk(ns)){
        console.log('ns',ns);
        this.selectNodeContents(ns);
    }
}
else if(this.startContainer.nodeType==1&&this.startOffset>0&&this.startContainer.childNodes[this.startOffset-1]){
    ns=this.startContainer.childNodes[this.startOffset-1].nextSibling;
    if(neighborIsOk(ns)){
        console.log('ns',ns);
        this.selectNodeContents(ns);
    }
}
else if(this.startContainer.nodeType==3&&this.startOffset==0){
    ps=this.startContainer.previousSibling;
    if(neighborIsOk(ps)){
        console.log('ps',ps);
        this.selectNodeContents(ps);
    }
}
}
},
createDocumentFragment:function(){
    return this.doc.createDocumentFragment();
},
setStart:function(node,offset){
    this.setNodePoint(true,node,offset);
},
setEnd:function(node,offset){
    this.setNodePoint(false,node,offset);
},
setStartBefore:function(node){
    this.setStart(node.parentNode,ve.dom.nodeIndex(node));
},
setStartAfter:function(node){
    this.setStart(node.parentNode,ve.dom.nodeIndex(node)+1);
},
setEndBefore:function(node){
    this.setEnd(node.parentNode,ve.dom.nodeIndex(node));
},
setEndAfter:function(node){
    this.setEnd(node.parentNode,ve.dom.nodeIndex(node)+1);
},
collapse:function(toStart){
    if(toStart){
        this.endContainer=this.startContainer;
        this.endOffset=this.startOffset;
    }else{
        this.startContainer=this.endContainer;
        this.startOffset=this.endOffset;
    }
    this.collapsed=true;
},
setInlineStyle:function(tagName,attrs,list){
    var _this=this;
    if(this.collapsed){
        return this;
    }
    this.adjustRange();
    this.maxiumRange(false,function(node){
        return _this.isBlockElement(node);
    });
    this.adjustRangeBoundary();
    var bookmark=this.createBookmark();
    var end=bookmark.end;
    var filterFn=function(node){
        return node.nodeType==1?node.tagName.toLowerCase()!='br':(node.nodeValue!=ve.blankChar&&node.nodeValue!=ve.caretChar);
    };

    var current=getNextDomNode(bookmark.start,false,filterFn);
    var node,pre,range=this.cloneRange();
    while(current&&(getNodeRelexPosition(current,end)&4)){
        if(current.nodeType==3||ve.dtd[tagName][current.tagName]){
            range.setStartBefore(current);
            node=current;
            while(node&&(node.nodeType==3||ve.dtd[tagName][node.tagName])&&node!==end){
                pre=node;
                node=getNextDomNode(node,node.nodeType==1,null,function(parent){
                    return ve.dtd[tagName][parent.tagName]
                    })
                }
            range.setEndAfter(pre);
            var frag=range.extractContents(),el;
            if(list&&list.length>0){
                var level,top;
                top=level=list[0].cloneNode(false);
                for(var i=1,ci;ci=list[i++];){
                    level.appendChild(ci.cloneNode(false));
                    level=level.firstChild;
                }
                el=level;
            }else{
                el=range.doc.createElement(tagName)
                }
            if(attrs){
                ve.dom.setAttrs(el,attrs)
                }
            el.appendChild(frag);
            range.insertNode(list?top:el);
            var aNode;
            var fp=function(node,tagName){
                if(node.tagName==tagName){
                    return node;
                }
                while(n=node.parentNode&&n.tagName!='BODY'){
                    if(n&&n.tagName==tagName){
                        return n;
                    }
                }
            }
    if(tagName=='span'&&attrs.style&&/text\-decoration/.test(attrs.style)&&(aNode=fp(el,'A'))){
        ve.dom.setAttrs(aNode,attrs);
        ve.dom.remove(el,true);
        el=aNode;
    }else{}
    current=getNextDomNode(el,false,filterFn);
    ve.dom.mergerToParent(el);
    if(node===end){
        break;
    }
}else{
    current=getNextDomNode(current,true,filterFn)
    }
}
return this.moveToBookmark(bookmark);
},
isBlockElement:function(node){
    return node&&node.nodeType==1&&(ve.dtd.$block[node.tagName]||ve.dtd.$displayBlock[ve.dom.getStyle(node,'display').toLowerCase()])&&!ve.dtd.$nonChild[node.tagName];
},
_isEmptyNode:function(node){
    var _this=this;
    if(!node||!node.firstChild){
        return true;
    }
    var isEmpty=true;
    ve.lang.each(node.childNodes,function(node){
        if(node.tagName!='BR'&&!_this._isBookmarkNode(node)&&!ve.isHelperNode(node)){
            isEmpty=false;
            return true;
        }
    });
return isEmpty;
},
insertHtml:function(html){
    var _this=this;
    var div=this.doc.createElement('div');
    div.style.display='inline';
    div.innerHTML=ve.string.trim(html);
    if(!this.collapsed){
        this.deleteContents();
        if(this.startContainer.nodeType==1){
            var child=this.startContainer.childNodes[this.startOffset],pre;
            if(child&&this.isBlockElement(child)&&(pre=child.previousSibling)&&this.isBlockElement(pre)){
                this.setEnd(pre,pre.childNodes.length);
                this.collapse();
                while(child.firstChild){
                    pre.appendChild(child.firstChild);
                }
                ve.dom.remove(child);
            }
        }
    }
var child,parent,pre,tmp,hadBreak=0;
while(child=div.firstChild){
    this.insertNode(child);
    if(!hadBreak&&child.nodeType==1&&this.isBlockElement(child)){
        parent=ve.dom.getParent(child,function(node){
            return _this.isBlockElement(node)&&node!=child;
        });
        if(parent&&parent.tagName!='BODY'&&!(ve.dtd[parent.tagName.toLowerCase()][child.nodeName]&&child.parentNode===parent)){
            if(!ve.dtd[parent.tagName.toLowerCase()][child.nodeName]){
                pre=parent;
            }else{
                tmp=child.parentNode;
                while(tmp!==parent){
                    pre=tmp;
                    tmp=tmp.parentNode;
                }
            }
        this.breakParent(child,pre||tmp);
        var pre=child.previousSibling;
        if(pre&&!pre.childNodes.length){
            ve.dom.remove(pre);
        }
        hadBreak=1;
    }
}
var next=child.nextSibling;
if(!div.firstChild&&next&&this.isBlockElement(next)){
    this.setStart(next,0);
    this.collapse(true);
    break;
}
this.setEndAfter(child);
this.collapse();
}
child=this.startContainer;
if(this.isBlockElement(child)&&this._isEmptyNode(child)){
    child.innerHTML=ve.ua.ie?'':'<br/>'
    }
this.select(true);
},
breakParent:function(node,parent){
    var tmpNode,parentClone=node,clone=node,leftNodes,rightNodes;
    do{
        if(!parentClone.parentNode){
            break;
        }
        parentClone=parentClone.parentNode;
        if(leftNodes){
            tmpNode=parentClone.cloneNode(false);
            if(!tmpNode){
                break;
            }
            tmpNode.appendChild(leftNodes);
            leftNodes=tmpNode;
            tmpNode=parentClone.cloneNode(false);
            tmpNode.appendChild(rightNodes);
            rightNodes=tmpNode;
        }else{
            leftNodes=parentClone.cloneNode(false);
            rightNodes=leftNodes.cloneNode(false);
        }
        while(tmpNode=clone.previousSibling){
            leftNodes.insertBefore(tmpNode,leftNodes.firstChild);
        }
        while(tmpNode=clone.nextSibling){
            rightNodes.appendChild(tmpNode);
        }
        clone=parentClone;
    }while(parent!==parentClone&&(parentClone.parentNode&&parentClone.parentNode.tagName!='BODY'));
    tmpNode=parent.parentNode;
    tmpNode.insertBefore(leftNodes,parent);
    tmpNode.insertBefore(rightNodes,parent);
    tmpNode.insertBefore(node,rightNodes);
    ve.dom.remove(parent);
    return node;
},
removeInlineStyle:function(tagList){
    if(this.collapsed){
        return this;
    }
    this.minifyRange();
    this.adjustRangeBoundary();
    var start=this.startContainer,end=this.endContainer;
    while(1){
        if(start.nodeType==1){
            if(ve.lang.arrayIndex(tagList,start.tagName.toLowerCase())>-1){
                break;
            }
            if(start.tagName=='BODY'){
                start=null;
                break;
            }
        }
    start=start.parentNode;
}
while(1){
    if(end.nodeType==1){
        if(ve.lang.arrayIndex(tagList,end.tagName.toLowerCase())>-1){
            break;
        }
        if(end.tagName=='BODY'){
            end=null;
            break;
        }
    }
end=end.parentNode;
}
var bookmark=this.createBookmark(),frag,tmpRange;
if(start){
    tmpRange=this.cloneRange();
    tmpRange.setEndBefore(bookmark.start);
    tmpRange.setStartBefore(start);
    frag=tmpRange.extractContents();
    tmpRange.insertNode(frag);
    this._clearEmptySibling(start,true);
    start.parentNode.insertBefore(bookmark.start,start);
}
if(end){
    tmpRange=this.cloneRange();
    tmpRange.setStartAfter(bookmark.end);
    tmpRange.setEndAfter(end);
    frag=tmpRange.extractContents();
    tmpRange.insertNode(frag);
    this._clearEmptySibling(end,false,true);
    end.parentNode.insertBefore(bookmark.end,end.nextSibling);
}
var current=getNextDomNode(bookmark.start,false,function(node){
    return node.nodeType==1
    }),next;
while(current&&current!==bookmark.end){
    next=getNextDomNode(current,true,function(node){
        return node.nodeType==1
        });
    if(ve.lang.arrayIndex(tagList,current.tagName.toLowerCase())>-1){
        ve.dom.remove(current,true);
    }
    current=next;
}
return this.moveToBookmark(bookmark);
},
removeBookmark:function(){
    var _this=this;
    var nodeList=this.doc.getElementsByTagName(this.bookmarkTag);
    ve.lang.each(nodeList,function(node){
        if(_this._isBookmarkNode(node)){
            ve.dom.remove(node);
        }
    });
},
createBookmark:function(bSerialize,useStaticBookmarkId){
    var endNode,startNode=this.doc.createElement(this.bookmarkTag);
    startNode.style.cssText='display:none';
    startNode.appendChild(this.doc.createTextNode(ve.blankChar));
    startNode.id=this.bookmarkStartId+(useStaticBookmarkId?'':this.guid++);
    if(!this.collapsed){
        endNode=startNode.cloneNode(true);
        endNode.id=this.bookmarkEndId+(useStaticBookmarkId?'':this.guid++);
    }
    this.insertNode(startNode);
    if(endNode){
        this.collapse(false);
        this.insertNode(endNode);
        this.setEndBefore(endNode)
        }
    this.setStartAfter(startNode);
    return{
        start:bSerialize?startNode.id:startNode,
        end:endNode?bSerialize?endNode.id:endNode:null,
        id:bSerialize
    }
},
moveToBookmark:function(bookmark){
    var start=bookmark.id?this.doc.getElementById(bookmark.start):bookmark.start,end=bookmark.end&&bookmark.id?this.doc.getElementById(bookmark.end):bookmark.end;
    if(start){
        this.setStartBefore(start);
        ve.dom.remove(start);
    }
    if(end){
        this.setEndBefore(end);
        ve.dom.remove(end);
    }else{
        this.collapse(true);
    }
    return this;
},
_isBookmarkNode:function(node){
    return node&&node.id&&(node.id.indexOf(this.bookmarkStartId)===0||node.id.indexOf(this.bookmarkEndId)===0);
},
_splitTextNode:function(textNode,offset){
    var doc=textNode.ownerDocument;
    if(ve.ua.ie&&offset==textNode.nodeValue.length){
        var next=doc.createTextNode('');
        return ve.dom.insertAfter(textNode,next);
    }
    if(ve.ua.ie>6){
        var node=textNode.cloneNode(false);
        node.deleteData(0,offset)
        textNode.deleteData(offset,textNode.length-offset);
        if(textNode.nextSibling){
            textNode.parentNode.insertBefore(node,textNode.nextSibling);
        }else{
            textNode.parentNode.appendChild(node);
        }
        return node;
    }else{
        return textNode.splitText(offset);
    }
},
adjustRange:function(ignoreEnd){
    this.adjustTextRange();
    var start=this.startContainer,offset=this.startOffset,collapsed=this.collapsed,end=this.endContainer;
    if(start.nodeType==3){
        if(offset==0){
            this.setStartBefore(start);
        }else{
            if(offset>=start.nodeValue.length){
                this.setStartAfter(start);
            }else{
                var textNode=this._splitTextNode(start,offset);
                if(start===end){
                    this.setEnd(textNode,this.endOffset-offset);
                }else if(start.parentNode===end){
                    this.endOffset+=1;
                }
                this.setStartBefore(textNode);
            }
        }
    if(collapsed){
        return this.collapse(true);
    }
}
if(!ignoreEnd){
    offset=this.endOffset;
    end=this.endContainer;
    if(end.nodeType==3){
        if(offset==0){
            this.setEndBefore(end);
        }else{
            if(offset>=end.nodeValue.length){
                this.setEndAfter(end);
            }else{
                this._splitTextNode(end,offset);
                this.setEndAfter(end);
            }
        }
    }
}
return this;
},
adjustRangeBoundary:function(){
    if(!this.collapsed){
        if(!this.startContainer.nodeType!=1){
            return this;
        }
        while(this.startContainer.tagName.toLowerCase()!='body'&&this.startOffset==this.startContainer[this.startContainer.nodeType==3?'nodeValue':'childNodes'].length){
            this.setStartAfter(this.startContainer);
        }
        while(this.endContainer.tagName.toLowerCase()!='body'&&!this.endOffset){
            this.setEndBefore(this.endContainer);
        }
    }
return this;
},
adjustTextRange:function(){
    if(this.collapsed){
        return;
    }
    if(this.startContainer.nodeType==3){
        if(!this.startOffset){
            this.setStartBefore(this.startContainer);
        }else if(this.startOffset>=this.startContainer.nodeValue.length){
            this.setStartAfter(this.startContainer);
        }
    }
if(this.endContainer.nodeType==3){
    if(!this.endOffset){
        this.setEndBefore(this.endContainer);
    }else if(this.endOffset>=this.endContainer.nodeValue.length){
        this.setEndAfter(this.endContainer);
    }
}
},
minifyRange:function(ignoreEnd){
    var child;
    while(this.startContainer.nodeType==1&&(child=this.startContainer.childNodes[this.startOffset])&&child.nodeType==1&&!this._isBookmarkNode(child)&&!ve.dtd.$empty[child.tagName]&&!ve.dtd.$nonChild[child.tagName]){
        this.setStart(child,0);
    }
    if(this.collapsed){
        return this.collapse(true);
    }
    if(!ignoreEnd){
        while(this.endContainer.nodeType==1&&this.endOffset>0&&(child=this.endContainer.childNodes[this.endOffset-1])&&child.nodeType==1&&!this._isBookmarkNode(child)&&!ve.dtd.$empty[child.tagName]&&!ve.dtd.$nonChild[child.tagName]){
            this.setEnd(child,child.childNodes.length);
        }
    }
return this;
},
maxiumRange:function(toBlock,stopFn){
    var pre,node,tmp=this.doc.createTextNode('');
    if(toBlock){
        node=this.startContainer;
        if(node.nodeType==1){
            if(node.childNodes[this.startOffset]){
                pre=node=node.childNodes[this.startOffset]
                }else{
                node.appendChild(tmp);
                pre=node=tmp;
            }
        }else{
        pre=node;
    }
    while(1){
        if(this.isBlockElement(node)){
            node=pre;
            while((pre=node.previousSibling)&&!this.isBlockElement(pre)){
                node=pre;
            }
            this.setStartBefore(node);
            break;
        }
        pre=node;
        node=node.parentNode;
    }
    node=this.endContainer;
    if(node.nodeType==1){
        if(pre=node.childNodes[this.endOffset]){
            node.insertBefore(tmp,pre);
        }else{
            node.appendChild(tmp)
            }
        pre=node=tmp;
    }else{
        pre=node;
    }
    while(1){
        if(this.isBlockElement(node)){
            node=pre;
            while((pre=node.nextSibling)&&!this.isBlockElement(pre)){
                node=pre;
            }
            this.setEndAfter(node);
            break;
        }
        pre=node;
        node=node.parentNode;
    }
    if(tmp.parentNode===this.endContainer){
        this.endOffset--;
    }
    ve.dom.remove(tmp);
}
if(!this.collapsed){
    while(this.startOffset==0){
        if(stopFn&&stopFn(this.startContainer)){
            break;
        }
        if(this.startContainer.tagName=='BODY'){
            break;
        }
        this.setStartBefore(this.startContainer);
    }
    while(this.endOffset==(this.endContainer.nodeType==1?this.endContainer.childNodes.length:this.endContainer.nodeValue.length)){
        if(stopFn&&stopFn(this.endContainer)){
            break;
        }
        if(this.endContainer.tagName=='BODY'){
            break;
        }
        this.setEndAfter(this.endContainer)
        }
    }
return this;
},
_isEmptyInlineElement:function(node){
    if(node.nodeType!=1||!ve.dtd.$removeEmpty[node.tagName])
        return 0;
    node=node.firstChild;
    while(node){
        if(this._isBookmarkNode(node)){
            return 0;
        }
        if(node.nodeType==1&&!this._isEmptyInlineElement(node)||node.nodeType==3&&!this._isWhitespace(node)){
            return 0;
        }
        node=node.nextSibling;
    }
    return 1;
},
_isWhitespace:function(node){
    return!new RegExp('[^ \t\n\r'+ve.blankChar+']').test(node.nodeValue);
},
_clearEmptySibling:function(node,ingoreNext,ingorePre){
    var _this=this;
    function clear(next,dir){
        var tmpNode;
        while(next&&!_this._isBookmarkNode(next)&&(_this._isEmptyInlineElement(next)||_this._isWhitespace(next))){
            tmpNode=next[dir];
            ve.dom.remove(next);
            next=tmpNode;
        }
    }!ingoreNext&&clear(node.nextSibling,'nextSibling');
!ingorePre&&clear(node.previousSibling,'previousSibling');
},
_removeFillData:function(fillData,doc,excludeNode){
    try{
        if(fillData&&domUtils.inDoc(fillData,doc)){
            if(!fillData.nodeValue.replace(ve.fillCharReg,'').length){
                var tmpNode=fillData.parentNode;
                ve.dom.remove(fillData);
                while(tmpNode&&this._isEmptyInlineElement(tmpNode)&&!tmpNode.contains(excludeNode)){
                    fillData=tmpNode.parentNode;
                    ve.dom.remove(tmpNode);
                    tmpNode=fillData;
                }
            }else{
            fillData.nodeValue=fillData.nodeValue.replace(ve.fillCharReg,'')
            }
        }
}catch(e){}
},
select:function(notInsertFillData,textRange){
    if(ve.ua.ie){
        var nativeRange;
        if(!this.collapsed){
            this.minifyRange();
        }
        var node=this.getClosedNode();
        if(node&&!textRange){
            try{
                nativeRange=this.doc.body.createControlRange();
                nativeRange.addElement(node);
                nativeRange.select();
            }catch(e){}
            return this;
        }
        var bookmark=this.createBookmark(),start=bookmark.start,end;
        nativeRange=this.doc.body.createTextRange();
        nativeRange.moveToElementText(start);
        nativeRange.moveStart('character',1);
        if(!this.collapsed&&bookmark.end){
            var nativeRangeEnd=this.doc.body.createTextRange();
            end=bookmark.end;
            nativeRangeEnd.moveToElementText(end);
            nativeRange.setEndPoint('EndToEnd',nativeRangeEnd);
        }else{
            if(!notInsertFillData&&this.startContainer.nodeType!=3){
                var tmp=this.doc.createElement('span');
                tmp.appendChild(this.doc.createTextNode(ve.blankChar));
                start.parentNode.insertBefore(tmp,start);
                var tmpText=this.doc.createTextNode(ve.blankChar);
                start.parentNode.insertBefore(tmpText,start);
                nativeRange.moveStart('character',-1);
                nativeRange.collapse(true);
            }
        }
    this.moveToBookmark(bookmark);
    tmp&&ve.dom.remove(tmp);
    tmpText&&ve.dom.remove(tmpText);
    nativeRange.select();
}else{
    var sel=_getSelection(this.win,this.doc);
    var txtNode;
    if(ve.ua.firefox){
        this.doc.body.focus();
    }else{
        this.win.focus();
    }
    if(sel){
        sel.removeAllRanges();
        if(this.collapsed&&!notInsertFillData){
            txtNode=this.doc.createTextNode(ve.blankChar);
            this.insertNode(txtNode);
            this.setStart(txtNode,ve.ua.webkit?1:0);
            this.collapse(true);
        }
        var nativeRange=this.doc.createRange();
        nativeRange.setStart(this.startContainer,this.startOffset);
        nativeRange.setEnd(this.endContainer,this.endOffset);
        sel.addRange(nativeRange);
    }
}
this.removeBookmark();
},
getClosedNode:function(){
    var node;
    if(!this.collapsed){
        var range=this.cloneRange();
        range.adjustRange();
        range.minifyRange();
        if(range.startContainer.nodeType==1&&range.startContainer===range.endContainer&&range.endOffset-range.startOffset==1){
            var child=range.startContainer.childNodes[range.startOffset];
            if(child&&child.nodeType==1&&(ve.dtd.$empty[child.tagName]||ve.dtd.$nonChild[child.tagName])){
                node=child;
            }
        }
    }
return node;
},
selectNode:function(node){
    this.setStartBefore(node);
    this.setEndAfter(node);
},
selectNodeContents:function(node){
    this.setStart(node,0);
    this.setEnd(node,node.nodeType===1?node.childNodes.length:node.nodeValue.length);
},
compareBoundaryPoints:function(h,r){
    var sc=this.startContainer,so=this.startOffset,ec=this.endContainer,eo=this.endOffset,rsc=r.startContainer,rso=r.startOffset,rec=r.endContainer,reo=r.endOffset;
    if(h===0)
        return this._compareBoundaryPoints(sc,so,rsc,rso);
    if(h===1)
        return this._compareBoundaryPoints(ec,eo,rsc,rso);
    if(h===2)
        return this._compareBoundaryPoints(ec,eo,rec,reo);
    if(h===3)
        return this._compareBoundaryPoints(sc,so,rec,reo);
},
deleteContents:function(){
    this._traverse(DELETE);
},
extractContents:function(){
    return this._traverse(EXTRACT);
},
cloneContents:function(){
    return this._traverse(CLONE);
},
insertNode:function(node){
    var first=node,length=1;
    if(node.nodeType==11){
        first=node.firstChild;
        length=node.childNodes.length;
    }
    this.adjustRange(true);
    var nextNode=this.startContainer.childNodes[this.startOffset];
    try{
        if(nextNode){
            this.startContainer.insertBefore(node,nextNode);
        }else{
            this.startContainer.appendChild(node);
        }
    }catch(ex){};

if(first.parentNode===this.endContainer){
    this.endOffset=this.endOffset+length;
}
this.setStartBefore(first);
},
surroundContents:function(n){
    var f=this.extractContents();
    this.insertNode(n);
    n.appendChild(f);
    this.selectNode(n);
},
cloneRange:function(){
    var newRange=new ve.Range(this.win,this.doc);
    newRange.setStart(this.startContainer,this.startOffset);
    newRange.setEnd(this.endContainer,this.endOffset);
    return newRange;
},
_getSelectedNode:function(container,offset){
    var child;
    if(container.nodeType==3){
        return container;
    }
    if(offset<0){
        return container;
    }
    child=container.firstChild;
    while(child&&offset>0){
        --offset;
        child=child.nextSibling;
    }
    if(child){
        return child;
    }
    return container;
},
_isCollapsed:function(){
    return this.startContainer&&this.endContainer&&this.startContainer==this.endContainer&&this.startOffset==this.endOffset;
},
_compareBoundaryPoints:function(containerA,offsetA,containerB,offsetB){
    var c,offsetC,n,cmnRoot,childA,childB;
    if(containerA==containerB){
        if(offsetA==offsetB){
            return 0;
        }
        if(offsetA<offsetB){
            return-1;
        }
        return 1;
    }
    c=containerB;
    while(c&&c.parentNode!=containerA)
        c=c.parentNode;
    if(c){
        offsetC=0;
        n=containerA.firstChild;
        while(n!=c&&offsetC<offsetA&&n.nextSibling){
            offsetC++;
            n=n.nextSibling;
        }
        if(offsetA<=offsetC){
            return-1;
        }
        return 1;
    }
    c=containerA;
    while(c&&c.parentNode!=containerB){
        c=c.parentNode;
    }
    if(c){
        offsetC=0;
        n=containerB.firstChild;
        while(n!=c&&offsetC<offsetB&&n.nextSibling){
            offsetC++;
            n=n.nextSibling;
        }
        if(offsetC<offsetB)
            return-1;
        return 1;
    }
    childA=containerA;
    while(childA&&childA.parentNode!=cmnRoot){
        childA=childA.parentNode;
    }
    if(!childA){
        childA=cmnRoot;
    }
    childB=containerB;
    while(childB&&childB.parentNode!=cmnRoot)
        childB=childB.parentNode;
    if(!childB){
        childB=cmnRoot;
    }
    if(childA==childB){
        return 0;
    }
    n=cmnRoot.firstChild;
    while(n){
        if(n==childA){
            return-1;
        }
        if(n==childB){
            return 1;
        }
        n=n.nextSibling;
    }
},
setNodePoint:function(bStart,node,offset){
    if(node.nodeType==1&&(ve.dtd.$empty[node.tagName]||ve.dtd.$nonChild[node.tagName])){
        offset=ve.dom.nodeIndex(node)+(bStart?0:1);
        node=node.parentNode;
    }
    if(bStart){
        this.startContainer=node;
        this.startOffset=offset;
        if(!this.endContainer){
            this.collapse(true);
        }
    }else{
    this.endContainer=node;
    this.endOffset=offset;
    if(!this.startContainer){
        this.collapse(false);
    }
}
this.collapsed=this._isCollapsed();
},
_traverse:function(how){
    var c,endContainerDepth=0,startContainerDepth=0,p,depthDiff,startNode,endNode,sp,ep;
    if(this.startContainer==this.endContainer){
        return this._traverseSameContainer(how);
    }
    for(c=this.endContainer,p=c.parentNode;p;c=p,p=p.parentNode){
        if(p==this.startContainer){
            return this._traverseCommonStartContainer(c,how);
        }
        ++endContainerDepth;
    }
    for(c=this.startContainer,p=c.parentNode;p;c=p,p=p.parentNode){
        if(p==this.endContainer){
            return this._traverseCommonEndContainer(c,how);
        }
        ++startContainerDepth;
    }
    depthDiff=startContainerDepth-endContainerDepth;
    startNode=this.startContainer;
    while(depthDiff>0){
        startNode=startNode.parentNode;
        depthDiff--;
    }
    endNode=this.endContainer;
    while(depthDiff<0){
        endNode=endNode.parentNode;
        depthDiff++;
    }
    for(sp=startNode.parentNode,ep=endNode.parentNode;sp!=ep;sp=sp.parentNode,ep=ep.parentNode){
        startNode=sp;
        endNode=ep;
    }
    return this._traverseCommonAncestors(startNode,endNode,how);
},
_traverseSameContainer:function(how){
    var frag,s,sub,n,cnt,sibling,xferNode,start,len;
    if(how!=DELETE)
        frag=this.createDocumentFragment();
    if(this.startOffset==this.endOffset)
        return frag;
    if(this.startContainer.nodeType==3){
        s=this.startContainer.nodeValue;
        sub=s.substring(this.startOffset,this.endOffset);
        if(how!=CLONE){
            n=this.startContainer;
            start=this.startOffset;
            len=this.endOffset-this.startOffset;
            if(start===0&&len>=n.nodeValue.length-1){
                ve.dom.remove(n);
            }else{
                n.deleteData(start,len);
            }
            this.collapse(true);
        }
        if(how==DELETE){
            return;
        }
        if(sub.length>0){
            frag.appendChild(doc.createTextNode(sub));
        }
        return frag;
    }
    n=this._getSelectedNode(this.startContainer,this.startOffset);
    cnt=this.endOffset-this.startOffset;
    while(n&&cnt>0){
        sibling=n.nextSibling;
        xferNode=this._traverseFullySelected(n,how);
        if(frag){
            frag.appendChild(xferNode);
        }
        --cnt;
        n=sibling;
    }
    if(how!=CLONE){
        this.collapse(true);
    }
    return frag;
},
_traverseCommonStartContainer:function(endAncestor,how){
    var frag,n,endIdx,cnt,sibling,xferNode;
    if(how!=DELETE){
        frag=this.createDocumentFragment();
    }
    n=this._traverseRightBoundary(endAncestor,how);
    if(frag){
        frag.appendChild(n);
    }
    endIdx=ve.dom.nodeIndex(endAncestor);
    cnt=endIdx-this.startOffset;
    if(cnt<=0){
        if(how!=CLONE){
            this.setEndBefore(endAncestor);
            this.collapse(false);
        }
        return frag;
    }
    n=endAncestor.previousSibling;
    while(cnt>0){
        sibling=n.previousSibling;
        xferNode=this._traverseFullySelected(n,how);
        if(frag)
            frag.insertBefore(xferNode,frag.firstChild);
        --cnt;
        n=sibling;
    }
    if(how!=CLONE){
        this.setEndBefore(endAncestor);
        this.collapse(false);
    }
    return frag;
},
_traverseCommonEndContainer:function(startAncestor,how){
    var frag,startIdx,n,cnt,sibling,xferNode;
    if(how!=DELETE)
        frag=this.createDocumentFragment();
    n=this._traverseLeftBoundary(startAncestor,how);
    if(frag)
        frag.appendChild(n);
    startIdx=ve.dom.nodeIndex(startAncestor);
    ++startIdx;
    cnt=this.endOffset-startIdx;
    n=startAncestor.nextSibling;
    while(n&&cnt>0){
        sibling=n.nextSibling;
        xferNode=this._traverseFullySelected(n,how);
        if(frag)
            frag.appendChild(xferNode);
        --cnt;
        n=sibling;
    }
    if(how!=CLONE){
        this.setStartAfter(startAncestor);
        this.collapse(true);
    }
    return frag;
},
_traverseCommonAncestors:function(startAncestor,endAncestor,how){
    var n,frag,commonParent,startOffset,endOffset,cnt,sibling,nextSibling;
    if(how!=DELETE)
        frag=this.createDocumentFragment();
    n=this._traverseLeftBoundary(startAncestor,how);
    if(frag)
        frag.appendChild(n);
    commonParent=startAncestor.parentNode;
    startOffset=ve.dom.nodeIndex(startAncestor);
    endOffset=ve.dom.nodeIndex(endAncestor);
    ++startOffset;
    cnt=endOffset-startOffset;
    sibling=startAncestor.nextSibling;
    while(cnt>0){
        nextSibling=sibling.nextSibling;
        n=this._traverseFullySelected(sibling,how);
        if(frag)
            frag.appendChild(n);
        sibling=nextSibling;
        --cnt;
    }
    n=this._traverseRightBoundary(endAncestor,how);
    if(frag)
        frag.appendChild(n);
    if(how!=CLONE){
        this.setStartAfter(startAncestor);
        this.collapse(true);
    }
    return frag;
},
_traverseRightBoundary:function(root,how){
    var next=this._getSelectedNode(this.endContainer,this.endOffset-1),parent,clonedParent,prevSibling,clonedChild,clonedGrandParent,isFullySelected=next!=this.endContainer;
    if(next==root){
        return this._traverseNode(next,isFullySelected,false,how);
    }
    parent=next.parentNode;
    clonedParent=this._traverseNode(parent,false,false,how);
    while(parent){
        while(next){
            prevSibling=next.previousSibling;
            clonedChild=this._traverseNode(next,isFullySelected,false,how);
            if(how!=DELETE){
                if(clonedParent.firstChild){
                    clonedParent.insertBefore(clonedChild,clonedParent.firstChild);
                }else{
                    clonedParent.appendChild(clonedChild);
                }
            }
        isFullySelected=true;
        next=prevSibling;
    }
    if(parent==root){
        return clonedParent;
    }
    next=parent.previousSibling;
    parent=parent.parentNode;
    clonedGrandParent=this._traverseNode(parent,false,false,how);
    if(how!=DELETE){
        clonedGrandParent.appendChild(clonedParent);
    }
    clonedParent=clonedGrandParent;
}
},
_traverseLeftBoundary:function(root,how){
    var next=this._getSelectedNode(this.startContainer,this.startOffset),isFullySelected=next!=this.startContainer,parent,clonedParent,nextSibling,clonedChild,clonedGrandParent;
    if(next==root)
        return this._traverseNode(next,isFullySelected,true,how);
    parent=next.parentNode;
    clonedParent=this._traverseNode(parent,false,true,how);
    while(parent){
        while(next){
            nextSibling=next.nextSibling;
            clonedChild=this._traverseNode(next,isFullySelected,true,how);
            if(how!=DELETE)
                clonedParent.appendChild(clonedChild);
            isFullySelected=true;
            next=nextSibling;
        }
        if(parent==root)
            return clonedParent;
        next=parent.nextSibling;
        parent=parent.parentNode;
        clonedGrandParent=this._traverseNode(parent,false,true,how);
        if(how!=DELETE)
            clonedGrandParent.appendChild(clonedParent);
        clonedParent=clonedGrandParent;
    }
},
_mergSibling:function(node,ingorePre,ingoreNext){
    function merg(rtl,start,node){
        var next;
        if((next=node[rtl])&&!this._isBookmarkNode(next)&&next.nodeType==1&&domUtils.isSameElement(node,next)){
            while(next.firstChild){
                if(start=='firstChild'){
                    node.insertBefore(next.lastChild,node.firstChild);
                }else{
                    node.appendChild(next.firstChild)
                    }
                }
        ve.dom.remove(next);
    }
}!ingorePre&&merg('previousSibling','firstChild',node);
!ingoreNext&&merg('nextSibling','lastChild',node);
},
_traverseNode:function(n,isFullySelected,isLeft,how){
    var txtValue,newNodeValue,oldNodeValue,offset,newNode;
    if(isFullySelected){
        return this._traverseFullySelected(n,how);
    }
    if(n.nodeType==3){
        txtValue=n.nodeValue;
        if(isLeft){
            offset=this.startOffset;
            newNodeValue=txtValue.substring(offset);
            oldNodeValue=txtValue.substring(0,offset);
        }else{
            offset=this.endOffset;
            newNodeValue=txtValue.substring(0,offset);
            oldNodeValue=txtValue.substring(offset);
        }
        if(how!=CLONE){
            n.nodeValue=oldNodeValue;
        }
        if(how==DELETE){
            return;
        }
        newNode=ve.dom.clone(n,false);
        newNode.nodeValue=newNodeValue;
        return newNode;
    }
    if(how==DELETE){
        return;
    }
    return ve.dom.clone(n,false);
},
_traverseFullySelected:function(n,how){
    if(how!=DELETE){
        return how==CLONE?ve.dom.clone(n,true):n;
    }
    ve.dom.remove(n);
}
});
var getDomNode=function(node,start,ltr,startFromChild,fn,guard){
    var tmpNode=startFromChild&&node[start],parent;
    !tmpNode&&(tmpNode=node[ltr]);
    while(!tmpNode&&(parent=(parent||node).parentNode)){
        if(parent.tagName=='BODY'||guard&&!guard(parent))
            return null;
        tmpNode=parent[ltr];
    }
    if(tmpNode&&fn&&!fn(tmpNode)){
        return getDomNode(tmpNode,start,ltr,false,fn)
        }
    return tmpNode;
};

var getNextDomNode=function(node,startFromChild,filter,guard){
    return getDomNode(node,'firstChild','nextSibling',startFromChild,filter,guard);
};

var getNodeRelexPosition=function(nodeA,nodeB){
    if(nodeA===nodeB){
        return 0;
    }
    var node,parentsA=[nodeA],parentsB=[nodeB];
    node=nodeA;
    while(node&&node.parentNode){
        node=node.parentNode;
        if(node===nodeB){
            return 10;
        }
        parentsA.push(node);
    }
    node=nodeB;
    while(node&&node.parentNode){
        node=node.parentNode
        if(node===nodeA){
            return 20;
        }
        parentsB.push(node);
    }
    parentsA.reverse();
    parentsB.reverse();
    if(parentsA[0]!==parentsB[0])
        return 1;
    var i=-1;
    while(i++,parentsA[i]===parentsB[i]);
    nodeA=parentsA[i];
    nodeB=parentsB[i];
    while(nodeA=nodeA.nextSibling){
        if(nodeA===nodeB){
            return 4
            }
        }
return 2;
}
var _getSelection=function(win,doc){
    return doc.selection?doc.selection:win.getSelection();
};

var _getIERange=function(win,doc){
    var sel,rng;
    try{
        if(sel=_getSelection(win,doc)){
            rng=sel.rangeCount>0?sel.getRangeAt(0):(sel.createRange?sel.createRange():doc.createRange());
        }
    }catch(ex){
    return null;
}
if(!rng){
    rng=ve.ua.ie?doc.body.createTextRange():doc.createRange();
}
return rng;
};

var _getW3CRange=function(win,doc){
    var rng;
    try{
        var s=_getSelection(win,doc);
        if(s){
            rng=s.rangeCount>0?s.getRangeAt(0):(s.createRange?s.createRange():doc.createRange());
        }
    }catch(ex){};

return rng;
};

VEditor.Range.getSelection=_getSelection;
VEditor.Range.getNativeRange=function(win,doc){
    return ve.ua.ie?_getIERange(win,doc):_getW3CRange(win,doc);
};

})(window,document,VEditor);
(function(window,document,ve,undefined){
    ve.lang.Class('VEditor.PluginManager',{
        lookup:{},
        urls:{},
        PluginManager:function(){},
        scriptLoader:new ve.net.ScriptLoader(),
        add:function(n,u,cb){
            var pu=n;
            if(this.urls[u||n])
                return;
            if(typeof u=='function')cb=u;
            if(!/^https?\:\/\//.test(n)){
                pu='plugins/'+(u||n)+'/plugin.js';
            }
            var url=new ve.util.Path().toAbs(pu);
            this.urls[u||n]=url;
            this.scriptLoader.add(url,cb||function(){});
        },
        load:function(n,u,cb){
            var pu=n,t=this,cb='function'!=typeof cb?function(){}:cb;
            if(this.urls[u]){
                cb.call(t,t.lookup[n]);
                return;
            }
            if(!/^https?\:\/\//.test(u)){
                return;
            }
            t.urls[u]=u;
            t.scriptLoader.load(u,function(){
                cb.call(t,t.lookup[n]);
            });
        },
        loadAll:function(fn){
            this.scriptLoader.loadQueue(fn);
        },
        register:function(n,t){
            t=typeof t=='string'?ve.lang.resolve(t):t;
            this.lookup[n]=t;
        }
    });
ve.plugin=new VEditor.PluginManager();
    })(window,document,VEditor);
(function(ve,undefined){
    var MAX_HISTORY_COUNT=20;
    var MAX_KEYDOWN_COUNT=5;
    var CURRENT_KEY_COUNT=MAX_KEYDOWN_COUNT;
    ve.lang.Class('VEditor.History',{
        index:0,
        data:[],
        maxHistoryCount:20,
        onBeforeAdd:null,
        onChange:null,
        History:function(ed){
            var _this=this;
            this.editor=ed;
            this.onBeforeAdd=new ve.EventManager(this.editor);
            this.onChange=new ve.EventManager(this.editor);
            this.editor.onBeforeExecCommand.add(function(cmd){
                _this.add();
            });
            _this.editor.onAfterExecCommand.addLast(function(cmd){
                if(cmd!='undo'&&cmd!='redo'){
                    _this.add();
                }
            });
        this.editor.onInitComplete.add(function(){
            _this.editor.addCommand('undo',function(){
                _this.undo();
            });
            _this.editor.addCommand('redo',function(){
                _this.redo();
            });
            _this.editor.addShortcut('ctrl+z','undo');
            _this.editor.addShortcut('ctrl+y','redo');
            _this.onBeforeAdd.add(function(){
                CURRENT_KEY_COUNT=0;
            });
            var ignoreKeys={
                16:1,
                17:1,
                18:1,
                37:1,
                38:1,
                39:1,
                40:1
            };

            var InputMethodDetectedHash={
                229:1,
                231:1,
                197:1
            };

            var bInputMethodOpened;
            ve.dom.event.add(_this.editor.getDoc(),'keydown',function(e){
                var rng=_this.editor.getVERange();
                if(!rng.collapsed){
                    _this.add();
                }
                bInputMethodOpened=!!InputMethodDetectedHash[e.keyCode];
            });
            _this.editor.onKeyUp.addLast(function(e){
                var keyCode=e.keyCode;
                var rng=_this.editor.getVERange();
                if(keyCode==32||/^[0-9]$/.test(String.fromCharCode(keyCode))){
                    bInputMethodOpened=false;
                    CURRENT_KEY_COUNT=MAX_KEYDOWN_COUNT;
                }
                if(keyCode==8){
                    CURRENT_KEY_COUNT=MAX_KEYDOWN_COUNT;
                }
                if(bInputMethodOpened){
                    CURRENT_KEY_COUNT=MAX_KEYDOWN_COUNT;
                }else if(!ignoreKeys[keyCode]&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey){
                    if(++CURRENT_KEY_COUNT>=MAX_KEYDOWN_COUNT){
                        _this.add();
                    }
                }
            });
    });
    this.reset();
},
updateState:function(){
    var _this=this;
    setTimeout(function(){
        _this.onChange.fire(_this,_this.hasUndo(),_this.hasRedo());
    },0);
},
getHtmlContent:function(){
    return ve.string.trim(this.editor.getBody().innerHTML);
},
_typingTm:null,
add:function(){
    this.onBeforeAdd.fire();
    var currentClip=this.getClip();
    if(this.data[this.index].content==currentClip.content){
        return;
    }
    if((this.index+1)>=MAX_HISTORY_COUNT){
        this.data=this.data.slice(MAX_HISTORY_COUNT-this.index,MAX_HISTORY_COUNT);
        this.data.push(this.getClip());
    }
    else{
        this.data.push(this.getClip());
        this.index++;
    }
    this.updateState();
},
getClip:function(){
    if(ve.ua.safari){
        var content=this.getHtmlContent();
        return{
            content:content,
            fullContent:content
        }
    }
var body=this.editor.getBody();
    var content=this.getHtmlContent();
    var fullContent=content;
    if(!this.editor.isFocused()){
    this.editor.focus();
}
var rng=this.editor.getVERange();
    var bookmark=rng.createBookmark(true,true);
    var fullContent=ve.string.trim(body.innerHTML);
    rng.moveToBookmark(bookmark);
    rng.select(true);
    return{
    fullContent:fullContent,
    content:content
}
},
restore:function(clip){
    this.editor.getBody().innerHTML=clip.fullContent;
    if(clip.initState){
        this.editor.getBody().innerHTML=clip.fullContent;
    }else{
        var rng=this.editor.getVERange();
        var bookmark={
            id:true,
            start:rng.bookmarkStartId,
            end:rng.bookmarkEndId
            }
        rng.moveToBookmark(bookmark);
        rng.select(true);
    }
},
redo:function(){
    if(this.hasRedo()){
        var clip=this.data[++this.index];
        this.restore(clip);
        this.updateState();
    }
},
undo:function(){
    if(this.hasUndo()){
        var clip=this.data[--this.index];
        this.restore(clip);
        this.updateState();
    }
},
hasUndo:function(){
    return this.index>0;
},
hasRedo:function(){
    return this.index<(this.data.length-1);
},
reset:function(html){
    html=html||'';
    html=ve.string.trim(html);
    CURRENT_KEY_COUNT=MAX_KEYDOWN_COUNT;
    this.index=0;
    this.data=[{
        content:html,
        fullContent:html,
        initState:true
    }];
    this.updateState();
}
});
})(VEditor);
(function(ve,undefined){
    var X=function(t){
        var a=arguments;
        for(var i=1;i<a.length;i++){
            var x=a[i];
            for(var k in x){
                if(!t.hasOwnProperty(k)){
                    t[k]=x[k];
                }
            }
            }
return t;
};

var _t=function(obj){
    var tmp={};

    for(var key in obj){
        var item=obj[key];
        if(typeof(item)=='object'){
            tmp[key.toUpperCase()]=transToUpperCase(item);
        }else{
            tmp[key.toUpperCase()]=item;
        }
    }
return tmp;
};

ve.dtd=(function(){
    var A=_t({
        isindex:1,
        fieldset:1
    }),B=_t({
        input:1,
        button:1,
        select:1,
        textarea:1,
        label:1
    }),C=X(_t({
        a:1
    }),B),D=X({
        iframe:1
    },C),E=_t({
        hr:1,
        ul:1,
        menu:1,
        div:1,
        blockquote:1,
        noscript:1,
        table:1,
        center:1,
        address:1,
        dir:1,
        pre:1,
        h5:1,
        dl:1,
        h4:1,
        noframes:1,
        h6:1,
        ol:1,
        h1:1,
        h3:1,
        h2:1
    }),F=_t({
        ins:1,
        del:1,
        script:1,
        style:1
    }),G=X(_t({
        b:1,
        acronym:1,
        bdo:1,
        'var':1,
        '#':1,
        abbr:1,
        code:1,
        br:1,
        i:1,
        cite:1,
        kbd:1,
        u:1,
        strike:1,
        s:1,
        tt:1,
        strong:1,
        q:1,
        samp:1,
        em:1,
        dfn:1,
        span:1
    }),F),H=X(_t({
        sub:1,
        img:1,
        embed:1,
        object:1,
        sup:1,
        basefont:1,
        map:1,
        applet:1,
        font:1,
        big:1,
        small:1
    }),G),I=X(_t({
        p:1
    }),H),J=X(_t({
        iframe:1
    }),H,B),K=_t({
        img:1,
        embed:1,
        noscript:1,
        br:1,
        kbd:1,
        center:1,
        button:1,
        basefont:1,
        h5:1,
        h4:1,
        samp:1,
        h6:1,
        ol:1,
        h1:1,
        h3:1,
        h2:1,
        form:1,
        font:1,
        '#':1,
        select:1,
        menu:1,
        ins:1,
        abbr:1,
        label:1,
        code:1,
        table:1,
        script:1,
        cite:1,
        input:1,
        iframe:1,
        strong:1,
        textarea:1,
        noframes:1,
        big:1,
        small:1,
        span:1,
        hr:1,
        sub:1,
        bdo:1,
        'var':1,
        div:1,
        object:1,
        sup:1,
        strike:1,
        dir:1,
        map:1,
        dl:1,
        applet:1,
        del:1,
        isindex:1,
        fieldset:1,
        ul:1,
        b:1,
        acronym:1,
        a:1,
        blockquote:1,
        i:1,
        u:1,
        s:1,
        tt:1,
        address:1,
        q:1,
        pre:1,
        p:1,
        em:1,
        dfn:1
    }),L=X(_t({
        a:0
    }),J),M=_t({
        tr:1
    }),N=_t({
        '#':1
    }),O=X(_t({
        param:1
    }),K),P=X(_t({
        form:1
    }),A,D,E,I),Q=_t({
        li:1
    }),R=_t({
        style:1,
        script:1
    }),S=_t({
        base:1,
        link:1,
        meta:1,
        title:1
    }),T=X(S,R),U=_t({
        head:1,
        body:1
    }),V=_t({
        html:1
    });
    var block=_t({
        address:1,
        blockquote:1,
        center:1,
        dir:1,
        div:1,
        section:1,
        header:1,
        footer:1,
        nav:1,
        article:1,
        aside:1,
        figure:1,
        dialog:1,
        hgroup:1,
        time:1,
        meter:1,
        menu:1,
        command:1,
        keygen:1,
        output:1,
        progress:1,
        audio:1,
        video:1,
        details:1,
        datagrid:1,
        datalist:1,
        dl:1,
        fieldset:1,
        form:1,
        h1:1,
        h2:1,
        h3:1,
        h4:1,
        h5:1,
        h6:1,
        hr:1,
        isindex:1,
        noframes:1,
        ol:1,
        p:1,
        pre:1,
        table:1,
        ul:1
    }),empty=_t({
        area:1,
        base:1,
        br:1,
        col:1,
        hr:1,
        img:1,
        input:1,
        link:1,
        meta:1,
        param:1,
        embed:1
    });
    return{
        $displayBlock:{
            '-webkit-box':1,
            '-moz-box':1,
            'block':1,
            'list-item':1,
            'table':1,
            'table-row-group':1,
            'table-header-group':1,
            'table-footer-group':1,
            'table-row':1,
            'table-column-group':1,
            'table-column':1,
            'table-cell':1,
            'table-caption':1
        },
        $nonBodyContent:X(V,U,S),
        $block:block,
        $inline:L,
        $body:X(_t({
            script:1,
            style:1
        }),block),
        $cdata:_t({
            script:1,
            style:1
        }),
        $empty:empty,
        $nonChild:_t({
            iframe:1
        }),
        $listItem:_t({
            dd:1,
            dt:1,
            li:1
        }),
        $list:_t({
            ul:1,
            ol:1,
            dl:1
        }),
        $isNotEmpty:_t({
            table:1,
            ul:1,
            ol:1,
            dl:1,
            iframe:1,
            area:1,
            base:1,
            col:1,
            hr:1,
            img:1,
            embed:1,
            input:1,
            link:1,
            meta:1,
            param:1
        }),
        $removeEmpty:_t({
            a:1,
            abbr:1,
            acronym:1,
            address:1,
            b:1,
            bdo:1,
            big:1,
            cite:1,
            code:1,
            del:1,
            dfn:1,
            em:1,
            font:1,
            i:1,
            ins:1,
            label:1,
            kbd:1,
            q:1,
            s:1,
            samp:1,
            small:1,
            span:1,
            strike:1,
            strong:1,
            sub:1,
            sup:1,
            tt:1,
            u:1,
            'var':1
        }),
        $removeEmptyBlock:_t({
            'p':1,
            'div':1
        }),
        $tableContent:_t({
            caption:1,
            col:1,
            colgroup:1,
            tbody:1,
            td:1,
            tfoot:1,
            th:1,
            thead:1,
            tr:1,
            table:1
        }),
        $notTransContent:_t({
            pre:1,
            script:1,
            style:1,
            textarea:1
        }),
        html:U,
        head:T,
        style:N,
        script:N,
        body:P,
        base:{},
        link:{},
        meta:{},
        title:N,
        col:{},
        tr:_t({
            td:1,
            th:1
        }),
        img:{},
        embed:{},
        colgroup:_t({
            thead:1,
            col:1,
            tbody:1,
            tr:1,
            tfoot:1
        }),
        noscript:P,
        td:P,
        br:{},
        th:P,
        center:P,
        kbd:L,
        button:X(I,E),
        basefont:{},
        h5:L,
        h4:L,
        samp:L,
        h6:L,
        ol:Q,
        h1:L,
        h3:L,
        option:N,
        h2:L,
        form:X(A,D,E,I),
        select:_t({
            optgroup:1,
            option:1
        }),
        font:L,
        ins:L,
        menu:Q,
        abbr:L,
        label:L,
        table:_t({
            thead:1,
            col:1,
            tbody:1,
            tr:1,
            colgroup:1,
            caption:1,
            tfoot:1
        }),
        code:L,
        tfoot:M,
        cite:L,
        li:P,
        input:{},
        iframe:P,
        strong:L,
        textarea:N,
        noframes:P,
        big:L,
        small:L,
        span:_t({
            '#':1,
            br:1
        }),
        hr:L,
        dt:L,
        sub:L,
        optgroup:_t({
            option:1
        }),
        param:{},
        bdo:L,
        'var':L,
        div:P,
        object:O,
        sup:L,
        dd:P,
        strike:L,
        area:{},
        dir:Q,
        map:X(_t({
            area:1,
            form:1,
            p:1
        }),A,F,E),
        applet:O,
        dl:_t({
            dt:1,
            dd:1
        }),
        del:L,
        isindex:{},
        fieldset:X(_t({
            legend:1
        }),K),
        thead:M,
        ul:Q,
        acronym:L,
        b:L,
        a:X(_t({
            a:1
        }),J),
        blockquote:X(_t({
            td:1,
            tr:1,
            tbody:1,
            li:1
        }),P),
        caption:L,
        i:L,
        u:L,
        tbody:M,
        s:L,
        address:X(D,I),
        tt:L,
        legend:L,
        q:L,
        pre:X(G,C),
        p:X(_t({
            'a':1
        }),L),
        em:L,
        dfn:L
    };

})();
})(VEditor);
(function(window,document,ve,undefined){
    ve.lang.Class('VEditor.ViewManager',{
        lookup:{},
        urls:{},
        register:function(n,t){
            t=typeof t=='string'?ve.lang.resolve(t):t;
            this.lookup[n]=t;
        }
    });
ve.lang.Class('VEditor.ViewControler',{
    ViewControler:function(){},
    renderUI:function(){}
});
ve.viewManager=new VEditor.ViewManager();
})(window,document,VEditor);
(function(window,document,ve,undefined){
    ve.lang.Class('VEditor.ui.Control',{
        Control:function(id,s){
            var _this=this;
            this.id=id;
            this.active=0;
            this.conf=s||{
                toggle:false
            };

            this.disabled=!!this.conf.disabled;
            this.rendered=false;
            this.normalClass='';
            this.overClass='veControlOver';
            this.enabledClass='veControlEnabled';
            this.disabledClass='veControlDisabled';
            this.activeClass='veControlActive';
            this.dom=null;
            ve.lang.each('onClick,onMouseDown,onKeyDown,onKeyUp,onKeyPress,onMouseOver,onMouseOut,onMouseUp'.split(','),function(n){
                _this[n]=new ve.EventManager();
            })
            },
        hide:function(){
            if(this.dom){
                ve.dom.setStyle(this.dom,'display','none');
            }
        },
    show:function(){
        if(this.dom){
            ve.dom.setStyle(this.dom,'display','block');
        }
    },
    getDom:function(){
        return this.dom;
    },
    setDisable:function(){
        if(this.dom){
            ve.dom.removeClass(this.dom,this.enabledClass);
            ve.dom.removeClass(this.dom,this.activeClass);
            ve.dom.addClass(this.dom,this.disabledClass);
            this.disabled=true;
        }
    },
setEnabled:function(){
    if(this.dom){
        ve.dom.addClass(this.dom,this.enabledClass);
        ve.dom.removeClass(this.dom,this.activeClass);
        ve.dom.removeClass(this.dom,this.disabledClass);
        this.disabled=false;
    }
},
renderHTML:function(){},
    renderDOM:function(){},
    renderTo:function(n,where,rela){
    if(!n||!n.nodeType){
        return;
    }
    var html=this.renderHTML(),node;
    if(!html){
        node=this.renderDOM();
        this.dom=node;
        if(!node){
            return;
        }
        if(node.nodeType==1){
            if(rela&&rela.nodeType==1){
                switch(where){
                    case'before':case 0:
                        n.insertBefore(node,rela);
                        break;
                    case'after':case 1:
                        if(rela.nextSibling){
                        n.insertBefore(node,rela.nextSibling);
                    }
                    else{
                        n.appendChild(node);
                    }
                    break;
                    default:
                        break;
                }
            }else{
            n.appendChild(node);
        }
    }
}
else{
    var tmpContainer=document.createElement('div'),f;
    tmpContainer.innerHTML=html;
    for(var i=0;i<tmpContainer.childNodes.length;i++){
        if(tmpContainer.childNodes[i].nodeType==3){
            tn=document.createTextNode(tmpContainer.childNodes[i]);
        }else{
            tn=tmpContainer.childNodes[i];
        }
        if(rela&&rela.nodeType==1){
            switch(where){
                case'before':case 0:
                    n.insertBefore(tn,rela);
                    break;
                case'after':case 1:
                    if(rela.nextSibling){
                    n.insertBefore(tn,rela.nextSibling);
                }
                else{
                    n.appendChild(tn);
                }
                break;
                default:
                    break;
            }
        }else{
        n.appendChild(tn);
    }
    this.dom=tn;
    }
}
this.bindHandler();
},
bindHandler:function(){},
remove:function(){
    ve.dom.remove(this.dom);
},
toggleActive:function(){
    if(!this.conf.toggle&&!this.disabled){
        return;
    }
    this[this.active?'setUnActive':'setActive']();
    return this.active;
},
setActive:function(){
    if(!this.conf.toggle&&!this.disabled){
        return;
    }
    this.active=1;
    ve.dom.addClass(this.dom,this.activeClass);
},
setUnActive:function(){
    if(!this.conf.toggle&&!this.disabled){
        return;
    }
    this.active=0;
    ve.dom.removeClass(this.dom,this.activeClass);
}
});
ve.lang.Class('VEditor.ui.ControlManager',{
    ControlManager:function(editor){
        this.controls={};

        this.editor=editor
        },
    get:function(id){
        var id=this.generateId(id);
        return this.controls[id];
    },
    add:function(c){
        this.controls[c.id]=c;
        return c;
    },
    generateId:function(id){
        return this.editor.id+'_'+id;
    },
    createControlGroup:function(id,s){
        var id=this.generateId(id);
        var cc=new ve.ui.Toolbar(id,s);
        return this.add(cc);
    },
    createButton:function(n,conf){
        conf=ve.lang.extend({
            editor:this.editor
            },conf||{});
        var id=this.generateId(n);
        if(this.get(id)){
            return null;
        }
        var btn=new ve.ui.Button(id,conf);
        if(conf.onInit){
            conf.onInit.apply(btn);
        }
        if(conf.onClick){
            btn.onClick.add(conf.onClick);
        }
        return this.add(btn)
        },
    createListBox:function(name,conf){
        if(this.get(this.editor.id+'_'+name)){
            return null;
        }
        conf=ve.lang.extend({
            editor:this.editor
            },conf||{});
        var id=this.generateId(name);
        var list=new ve.ui.ListBox(id,conf);
        if(conf.onInit){
            conf.onInit.apply(list);
        }
        if(conf.onChange){
            list.onChange.add(conf.onChange);
        }
        return this.add(list)
        }
    });
})(window,document,VEditor);
(function(window,document,ve,undefined){
    ve.lang.Class('VEditor.ui.Base',{
        Base:function(ed,s){
            var t=this;
            ve.lang.each(['onLoad'],function(n){
                t[n]=new ve.EventManager(t);
            });
        },
        loadSrc:function(){
            var t=this,s=t.conf,sc=new ve.net.ScriptLoader();
            if(!s.loaded){
                sc.load(s.providerSrc,{
                    callback:function(){
                        s.loaded=true;
                        t.onLoad.fire(t);
                    }
                });
        }
    }
    })
})(window,document,VEditor);
(function(window,document,ve,undefined){
    ve.lang.Class('VEditor.ui.Container:VEditor.ui.Control',{
        Container:function(id,s){
            this.base(id,s);
            this.id=id;
            this.conf=s;
            this.controls=[];
            this.lookup={};

    },
    add:function(c){
        this.lookup[c.id]=c;
        this.controls.push(c);
        return c;
    },
    get:function(n){
        return this.lookup[n];
    },
    renderHTML:function(){
        return'<div id="'+this.id+'" class="veCommContainer '+(this.conf['class']||'')+'"></div>'
        }
    });
})(window,document,VEditor);
(function(window,document,ve,undefined){
    ve.lang.Class('VEditor.ui.ToolbarManager',{
        ToolbarManager:function(ed,conf){
            this.editor=ed;
            this.conf=ve.lang.extend({
                width:'auto'
            },conf);
            this.lookuptoolbars={};

            this.toolbarContainer=ed.toolbarContainer;
        },
        init:function(grep){
            if(typeof grep!='function')
                grep=function(){
                    return true;
                };

            var t=this;
            ve.lang.each(t.lookuptoolbars,function(n){
                n.renderTo(t.toolbarContainer||t.editor.toolbarContainer);
                ve.lang.each(n.controls,function(m){
                    var b=grep(m);
                    if(b===false)
                        return;
                    m.renderTo(n.dom);
                });
            });
        },
        createContainer:function(opt){
            opt=opt||{};

            return ve.dom.create('div',{
                'class':(opt['class']||'')+' '+(this.conf['class']||''),
                'style':ve.lang.extend(opt['style']||{},{
                    'overflow':'hidden',
                    width:this.conf.width
                    })
                });
        },
        addToolbar:function(tb){
            var t=this.editor,id=tb.id;
            this.lookuptoolbars[id]=tb;
        },
        getToolbar:function(id){
            var t=this.editor;
            return this.lookuptoolbars[t.conf.id+'_'+id];
        },
        addButton:function(id,conf){
            var ed=this.editor,cm=ed.controlManager,b;
            conf=conf||{};

            btn=cm.createButton(id,conf);
            this.addControl(btn,conf);
            return btn;
        },
        getButton:function(id){
            return this.getControl(id);
        },
        addControl:function(c,s){
            var t=this.editor,to=s.to,cons,toolbardom,cm=t.controlManager,oldlength,where='afterbegin';
            s=s||{};

            if(!this.lookuptoolbars[t.id+'_'+to]){
                var tb=cm.createToolbar(to,{
                    'class':'ve'+to+'_toolbar'
                    });
                tb.renderTo(this.editor.toolbarContainer);
                this.lookuptoolbars[t.id+'_'+to]=tb;
            }
            cons=this.lookuptoolbars[t.id+'_'+to].controls;
            if(typeof s.at=='undefined')
                s.at=cons.length;
            toolbardom=this.lookuptoolbars[t.id+'_'+to].dom;
            c.renderTo(toolbardom,'before',cons[s.at]&&cons[s.at].dom);
            cons.splice(s.at,0,c);
        },
        getControl:function(id){
            var id=this.editor.controlManager.generateId(id);
            for(var i in this.lookuptoolbars){
                for(var j=0;j<this.lookuptoolbars[i].controls.length;j++){
                    if(id==this.lookuptoolbars[i].controls[j].id)
                        return this.lookuptoolbars[i].controls[j];
                }
                }
            }
        });
ve.lang.Class('VEditor.ui.Toolbar:VEditor.ui.Container',{
    Toolbar:function(id,s){
        this.base(id,s);
    },
    renderHTML:function(){
        var s=this.conf;
        var h='<div id="'+this.id+'" class="veToolbar '+(s['class']||'')+'">'
        return h+'</div>';
    }
});
})(window,document,VEditor);
(function(window,document,ve,undefined){
    var dom=ve.dom;
    ve.lang.Class('VEditor.ui.Button:VEditor.ui.Control',{
        Button:function(id,conf){
            var t=this;
            conf=ve.lang.extend({
                toggle:1
            },conf);
            this.base(id,conf)
            this.type='button';
            this.classPrefix='veButton_';
            this.normalClass='veButton';
            this.overClass='veButton_over';
            this.enabledClass='veButton_enabled';
            this.disabledClass='veButton_disabled';
            this.activeClass='veButton_active';
        },
        renderHTML:function(){
            var s=this.conf;
            var html=(['<a href="javascript:;" id="',this.id,'" class="',this.normalClass,' ',(s.disabled?this.disabledClass:this.enabledClass),' ',this.classPrefix+s['class'],'" title="',(s.title),'">','<span class="veIcon ',s['class'],'">',(s.text||''),'</span>','</a>']).join('');
            return html;
        },
        bindHandler:function(){
            var _this=this;
            var t=this,s=t.conf;
            ve.dom.event.add(this.dom,'click',function(e){
                ve.dom.event.preventDefault(e);
                if(s.disabled||t.disabled){
                    return;
                }
                if(typeof(t.conf.cmd)=='function'){
                    t.conf.cmd.apply(_this);
                }else if(t.conf.cmd){
                    t.conf.editor.editorcommands.execCommand(t.conf.cmd);
                }
                _this.onClick.fire(_this);
                return false;
            });
            ve.dom.event.add(this.dom,'mousedown',function(e){
                var b=t.onMouseDown.fire(t,e,s);
                if(b===false){
                    ve.dom.event.preventDefault(e);
                    return false;
                }
            });
        ve.dom.event.add(this.dom,'mouseup',function(e){
            var b=t.onMouseUp.fire(t,e);
            if(b===false){
                ve.dom.event.preventDefault(e);
                return false;
            }
        });
    if(s.disabled){
        return;
    }
    ve.dom.event.add(this.dom,'mouseover',function(e){
        if(!_this.disabled){
            ve.dom.addClass(_this.dom,_this.overClass);
            t.onMouseOver.fire();
        }
    });
    ve.dom.event.add(this.dom,'mouseout',function(e){
        if(!_this.disabled){
            ve.dom.removeClass(_this.dom,_this.overClass);
            t.onMouseOut.fire();
        }
    });
}
});
})(window,document,VEditor);
(function(window,document,ve,undefined){
    var dom=ve.dom;
    ve.lang.Class('VEditor.ui.ListBox:VEditor.ui.Control',{
        ListBox:function(id,conf){
            conf=ve.lang.extend(true,{
                cmd:function(){},
                ui:false,
                items:[],
                editor:null,
                onInit:null
            },conf);
            this.listboxid=id+'_panel';
            this.base(id,conf);
            this.dom=null;
            this.panel=null;
            this.classPrefix='veList';
            this.onChange=new ve.EventManager();
            this._createListPanel();
        },
        renderHTML:function(){
            var html=(['<div class="',this.classPrefix,' ',this.classPrefix,this.conf['class'],'" id="',this.id,'">','<div class="',this.classPrefix,'_current">','<a href="javascript:;">',this.conf['title'],'</a>','</div>','<div class="',this.classPrefix,'_downicon">','<a href="javascript:;"></a>','</div>','</div>']).join('');
            return html;
        },
        getListItemHtml:function(item,pos){
            var name=item[1]||item[0],val=item[0],attr=item[2]||'',extClass=item[3]||'';
            iconStyle=item[4]||'';
            var html=(['<div class="',this.classPrefix,'_item_con ',extClass,'" seq="',pos,'" value="',val,'">','<a href="javascript:;" class="',this.classPrefix,'Item">','<span class="sel_icon sel_icon_hidden" style="',iconStyle,'"><b>','\u221a','</b></span>','<span class="item_cont" ',attr,'>',name,'</span>','<span class="icon_suffix"></span>','</a>','</div>']).join('');
            return html;
        },
        addItem:function(params){
            var params=ve.lang.extend(true,{
                pos:'last'
            },params);
            if(!params.item){
                return
            };

            if(params.pos=='last'){
                params.pos=this.conf.items.length
                };

            if(params.pos=='first'){
                params.pos=0;
            };

            params.pos=Math.min(params.pos,this.conf.items.length);
            params.pos=Math.max(params.pos,0);
            this.conf.items.splice(params.pos,0,params.item);
            var list=ve.dom.selector('#'+this.listboxid)[0];
            if(list){
                var relItem=ve.dom.selector('>div',list),html=this.getListItemHtml(params.item,params.pos),item;
                if(!relItem[params.pos]){
                    item=ve.dom.insertHTML(relItem[params.pos-1],'afterend',html);
                }else{
                    item=ve.dom.insertHTML(relItem[params.pos],'beforebegin',html);
                }
                if(item){
                    this.bindListItemEvent(item);
                }
            }
        },
    setCaption:function(val){
        var _this=this;
        var name=this.getNameByValue(val);
        if(!name){
            name=this.conf.title;
            val=-1;
        }
        var listCaption=ve.dom.selector('.'+_this.classPrefix+'_current',_this.dom)[0];
        ve.dom.setHTML(listCaption,'<a value="'+val+'" href="javascript:;">'+name+'</a>');
    },
    getNameByValue:function(val){
        if(!val){
            return null;
        }
        var found,name;
        ve.lang.each(this.conf.items,function(item){
            if(item[0]==val){
                found=true;
                name=item[1]||item[0];
                return true;
            }
        });
    return found?name:null;
},
bindListItemEvent:function(listItem){
    var _this=this;
    ve.dom.event.add(listItem,'click',function(e){
        var seq=this.getAttribute('seq');
        _this.conf.value=this.getAttribute('value');
        _this.onChange.fire(_this,_this.conf.value);
        if(typeof _this.conf.items[+seq][3]=='function'){
            _this.conf.items[+seq][3].call(_this,_this.conf,this);
        }
        _this.setCaption(_this.conf.value);
        ve.dom.addClass(this,'current');
        ve.dom.removeClass(_this.dom,_this.classPrefix+'_active');
        _this.hidePanel();
        ve.dom.event.preventDefault(e);
        return false;
    });
    var _lastOverItem;
    var hoverClassName=this.classPrefix+'_item_over';
    ve.dom.event.add(listItem,'mouseover',function(){
        if(_lastOverItem){
            ve.dom.removeClass(_lastOverItem,hoverClassName);
        }
        ve.dom.addClass(this,hoverClassName);
        _lastOverItem=this;
    });
    ve.dom.event.add(listItem,'mouseout',function(){
        ve.dom.removeClass(this,hoverClassName);
    });
},
hidePanel:function(){
    this.panel.style.display='none';
},
showPanel:function(){
    this.panel.style.display='';
},
toggleList:function(show){
    if(this.disabled){
        return;
    }
    show=show===undefined?this.panel.style.display=='none':!!show;
    if(show){
        var pos=ve.dom.getXY(this.dom);
        var size=ve.dom.getSize(this.dom);
        ve.dom.setStyles(this.panel,{
            display:'',
            top:(pos[1]+size[1])+'px',
            left:(pos[0]-1)+'px'
            });
    }else{
        this.panel.style.display='none';
    }
    ve.dom[show?'addClass':'removeClass'](this.dom,this.classPrefix+'_active');
    if(show){
        this.conf.editor.onBeforeOpenListBox.fire();
    }
    return show;
},
_createListPanel:function(){
    var _this=this;
    var _class=this.classPrefix+' '+this.classPrefix+'_list '+this.classPrefix+'_'+this.conf['class']+'_list';
    var html='<div style="position:absolute; display:none" class="'+_class+'" id="'+this.listboxid+'">';
    if(this.conf.title){
        html+='<div value="-1" class="veList_item_con"><a href="javascript:;" value="-1" class="'+this.classPrefix+'Title">'+this.conf.title+'</a></div>';
    }
    ve.lang.each(this.conf.items,function(item,index){
        html+=_this.getListItemHtml(item,index);
    });
    html+='</div>';
    this.panel=ve.dom.insertHTML(document.body,'beforeend',html);
    var al=ve.dom.selector('.'+this.classPrefix+'_item_con',this.panel);
    ve.lang.each(al,function(item){
        _this.bindListItemEvent(item);
    });
},
updateCurrentState:function(val){
    this.setCaption(val);
    var al=ve.dom.selector('.'+this.classPrefix+'_item_con',this.panel);
    ve.lang.each(al,function(item){
        if(item.getAttribute('value')==val){
            ve.dom.addClass(item,'current');
        }else{
            ve.dom.removeClass(item,'current');
        }
    });
},
bindHandler:function(){
    var t=this,_this=this,s=t.conf,cp=t.classPrefix,ed=s.editor,uid=this.listboxid,isFirstOpen=false;
    var icon=ve.dom.selector('.'+cp+'_downicon',this.dom),curr=ve.dom.selector('.'+cp+'_current',this.dom),d=ve.dom.get(uid),list=ve.dom.selector('.'+cp+'_list',this.dom);
    ve.dom.event.add(this.dom,'mouseover',function(e){
        if(!t.disabled){
            ve.dom.addClass(this,cp+'_'+(s['overSuffix']||'over'));
            t.onMouseOver.fire();
        }
    });
ve.dom.event.add(this.dom,'mouseout',function(e){
    if(!t.disabled){
        ve.dom.removeClass(this,cp+'_'+(s['overSuffix']||'over'),'');
        t.onMouseOut.fire();
    }
});
ve.dom.event.add(this.dom,'click',function(){
    _this.toggleList();
    ve.dom.event.preventDefault();
    return false;
});
ve.dom.event.add(document,'click',function(e){
    var tag=ve.dom.event.getTarget(e);
    if(!ve.dom.contains(_this.panel,tag)&&!ve.dom.contains(_this.dom,tag)){
        _this.toggleList(false);
    }
});
this.conf.editor.onClick.add(function(){
    _this.toggleList(false);
});
}
});
})(window,document,VEditor);
(function(ve){
    var undefined=undefined,instance,ready,lookup={};

    ve.lang.Class('VEditor.ui.PopupDialogManager:VEditor.ui.Base',{
        PopupDialogManager:function(ed,s){
            this.base(ed,s);
            var t=this,url;
            t.editor=ed;
            t.conf=s||{};

            t.currentPopup=null;
            if(/^http/.test(t.conf.provider)){
                url=t.conf.provider;
                t.conf.provider=url.split('/').pop().replace(/\.js[\s\S]*$/,'');
            }
            else{
                url=new ve.util.Path().toAbs('core/ui/popup/'+t.conf.provider+'.js');
            }
            t.conf.providerSrc=url;
            t.conf.providerSrcLoaded=false;
            ve.lang.each(['onBeforeOpen','onOpen','onClose','onDrag'],function(n){
                t[n]=new ve.EventManager(t);
            });
        },
        lookup:{},
        createInstance:function(){
            var t=this,p=t.conf.provider,cls,w;
            cls=lookup[p];
            if(cls){
                w=new cls(this,t.editor,t.conf);
            }
            return w||t;
        },
        open:function(s){
            var t=this;
            var fn=function(){
                var w,c;
                w=t.createInstance();
                instance=w;
                s=s||{};

                c=w&&w.open(s)||window.open(s.src,s.name,s.conf);
                t.currentPopup=c;
                VEditor.popupEditor=this.editor;
                t.onOpen.fire(t);
            };

            if(t.conf.loaded){
                fn.call(t);
            }
            else{
                t.onLoad.add(fn);
                t.loadSrc();
            }
        },
    close:function(){
        var c=this.currentPopup;
        if(c){
            if(c.nodeType){
                ve.dom.remove(c);
            }
            else{
                c.close();
            }
        }
    this.onClose.fire(instance)
        },
    'static':{
        register:function(name,c){
            var cls=lookup[name];
            if(cls)return;
            cls=typeof c=='string'?ve.lang.resolve(c):c;
            lookup[name]=cls;
        }
    }
});
})(VEditor);
(function(window,document,ve,undefined){
    var dom=ve.dom;
    ve.lang.Class('VEditor.ui.SimplePopup',{
        SimplePopup:function(ed,el,s){
            var t=this;
            this.editor=ed;
            this.el=el;
            this.conf=ve.lang.extend({
                src:'',
                content:'',
                width:'300px',
                canClose:true,
                height:'200px'
            },s||{});
            this.d=this._renderDOM();
        },
        show:function(s){
            if(s){
                ve.dom.setStyles(this.d,s);
            }
            this.d.style.display='block';
        },
        hide:function(){
            this.d.style.display='none';
        },
        getDOM:function(){
            return this.d;
        },
        _renderDOM:function(){
            var t=this,str,attrs,id,html;
            var top=0;
            left=0;
            if(t.el){
                elpos=ve.dom.getXY(t.el);
                elsize=ve.dom.getSize(t.el);
                top=elpos[1]+elsize[1];
                left=elpos[0];
            }
            id='qzonesimplepopup';
            attrs={
                'class':'simplepopupcon',
                'id':id,
                style:{
                    position:'absolute',
                    left:left,
                    top:top,
                    width:t.conf.width,
                    height:t.conf.height,
                    display:'none'
                }
            };

        if(t.conf.canClose){
            html='<div class="close_con"><a href="#" class="close_icon">x</a></div>';
        }
        if(t.conf.src){
            html+='<div class="iframe_con"><iframe src="'+t.conf.src+'" width="'+t.conf.width+'" height="'+t.conf.height+'" frameborder="0"></iframe></div>';
        }
        else if(t.conf.content){
            html+='<div class="content_con">'+t.conf.content+'</div>';
        }
        var popup=ve.dom.create('div',attrs,html);
        ve.dom.event.add(popup,'click',function(e){
            ve.dom.event.preventDefault(e);
            return false;
        });
        document.body.appendChild(popup)
        var icons=ve.dom.find('#'+id+' a.close_icon');
        ve.lang.each(icons,function(icon){
            ve.dom.event.add(icon,'click',function(e){
                t.hide();
                ve.dom.event.preventDefault(e);
                return false;
            });
        });
        ve.dom.event.add(document.body,'keydown',function(e){
            var e=e||window.event;
            if(e.keyCode==0x1B){
                t.hide();
                ve.dom.event.preventDefault(e);
            }
        });
    return popup;
    }
});
ve.ui.showSimplePopup=function(ed,el,conf){
    var p=new VEditor.ui.SimplePopup(ed,el,conf);
    return p;
}
})(window,document,VEditor);
(function(ve,undefined){
    var X=function(t){
        var a=arguments;
        for(var i=1;i<a.length;i++){
            var x=a[i];
            for(var k in x){
                if(!t.hasOwnProperty(k)){
                    t[k]=x[k];
                }
            }
            }
return t;
};

var _t=function(obj){
    var tmp={};

    for(var key in obj){
        var item=obj[key];
        if(typeof(item)=='object'){
            tmp[key.toUpperCase()]=transToUpperCase(item);
        }else{
            tmp[key.toUpperCase()]=item;
        }
    }
return tmp;
};

ve.dtd=(function(){
    var A=_t({
        isindex:1,
        fieldset:1
    }),B=_t({
        input:1,
        button:1,
        select:1,
        textarea:1,
        label:1
    }),C=X(_t({
        a:1
    }),B),D=X({
        iframe:1
    },C),E=_t({
        hr:1,
        ul:1,
        menu:1,
        div:1,
        blockquote:1,
        noscript:1,
        table:1,
        center:1,
        address:1,
        dir:1,
        pre:1,
        h5:1,
        dl:1,
        h4:1,
        noframes:1,
        h6:1,
        ol:1,
        h1:1,
        h3:1,
        h2:1
    }),F=_t({
        ins:1,
        del:1,
        script:1,
        style:1
    }),G=X(_t({
        b:1,
        acronym:1,
        bdo:1,
        'var':1,
        '#':1,
        abbr:1,
        code:1,
        br:1,
        i:1,
        cite:1,
        kbd:1,
        u:1,
        strike:1,
        s:1,
        tt:1,
        strong:1,
        q:1,
        samp:1,
        em:1,
        dfn:1,
        span:1
    }),F),H=X(_t({
        sub:1,
        img:1,
        embed:1,
        object:1,
        sup:1,
        basefont:1,
        map:1,
        applet:1,
        font:1,
        big:1,
        small:1
    }),G),I=X(_t({
        p:1
    }),H),J=X(_t({
        iframe:1
    }),H,B),K=_t({
        img:1,
        embed:1,
        noscript:1,
        br:1,
        kbd:1,
        center:1,
        button:1,
        basefont:1,
        h5:1,
        h4:1,
        samp:1,
        h6:1,
        ol:1,
        h1:1,
        h3:1,
        h2:1,
        form:1,
        font:1,
        '#':1,
        select:1,
        menu:1,
        ins:1,
        abbr:1,
        label:1,
        code:1,
        table:1,
        script:1,
        cite:1,
        input:1,
        iframe:1,
        strong:1,
        textarea:1,
        noframes:1,
        big:1,
        small:1,
        span:1,
        hr:1,
        sub:1,
        bdo:1,
        'var':1,
        div:1,
        object:1,
        sup:1,
        strike:1,
        dir:1,
        map:1,
        dl:1,
        applet:1,
        del:1,
        isindex:1,
        fieldset:1,
        ul:1,
        b:1,
        acronym:1,
        a:1,
        blockquote:1,
        i:1,
        u:1,
        s:1,
        tt:1,
        address:1,
        q:1,
        pre:1,
        p:1,
        em:1,
        dfn:1
    }),L=X(_t({
        a:0
    }),J),M=_t({
        tr:1
    }),N=_t({
        '#':1
    }),O=X(_t({
        param:1
    }),K),P=X(_t({
        form:1
    }),A,D,E,I),Q=_t({
        li:1
    }),R=_t({
        style:1,
        script:1
    }),S=_t({
        base:1,
        link:1,
        meta:1,
        title:1
    }),T=X(S,R),U=_t({
        head:1,
        body:1
    }),V=_t({
        html:1
    });
    var block=_t({
        address:1,
        blockquote:1,
        center:1,
        dir:1,
        div:1,
        section:1,
        header:1,
        footer:1,
        nav:1,
        article:1,
        aside:1,
        figure:1,
        dialog:1,
        hgroup:1,
        time:1,
        meter:1,
        menu:1,
        command:1,
        keygen:1,
        output:1,
        progress:1,
        audio:1,
        video:1,
        details:1,
        datagrid:1,
        datalist:1,
        dl:1,
        fieldset:1,
        form:1,
        h1:1,
        h2:1,
        h3:1,
        h4:1,
        h5:1,
        h6:1,
        hr:1,
        isindex:1,
        noframes:1,
        ol:1,
        p:1,
        pre:1,
        table:1,
        ul:1
    }),empty=_t({
        area:1,
        base:1,
        br:1,
        col:1,
        hr:1,
        img:1,
        input:1,
        link:1,
        meta:1,
        param:1,
        embed:1
    });
    return{
        $displayBlock:{
            '-webkit-box':1,
            '-moz-box':1,
            'block':1,
            'list-item':1,
            'table':1,
            'table-row-group':1,
            'table-header-group':1,
            'table-footer-group':1,
            'table-row':1,
            'table-column-group':1,
            'table-column':1,
            'table-cell':1,
            'table-caption':1
        },
        $nonBodyContent:X(V,U,S),
        $block:block,
        $inline:L,
        $body:X(_t({
            script:1,
            style:1
        }),block),
        $cdata:_t({
            script:1,
            style:1
        }),
        $empty:empty,
        $nonChild:_t({
            iframe:1
        }),
        $listItem:_t({
            dd:1,
            dt:1,
            li:1
        }),
        $list:_t({
            ul:1,
            ol:1,
            dl:1
        }),
        $isNotEmpty:_t({
            table:1,
            ul:1,
            ol:1,
            dl:1,
            iframe:1,
            area:1,
            base:1,
            col:1,
            hr:1,
            img:1,
            embed:1,
            input:1,
            link:1,
            meta:1,
            param:1
        }),
        $removeEmpty:_t({
            a:1,
            abbr:1,
            acronym:1,
            address:1,
            b:1,
            bdo:1,
            big:1,
            cite:1,
            code:1,
            del:1,
            dfn:1,
            em:1,
            font:1,
            i:1,
            ins:1,
            label:1,
            kbd:1,
            q:1,
            s:1,
            samp:1,
            small:1,
            span:1,
            strike:1,
            strong:1,
            sub:1,
            sup:1,
            tt:1,
            u:1,
            'var':1
        }),
        $removeEmptyBlock:_t({
            'p':1,
            'div':1
        }),
        $tableContent:_t({
            caption:1,
            col:1,
            colgroup:1,
            tbody:1,
            td:1,
            tfoot:1,
            th:1,
            thead:1,
            tr:1,
            table:1
        }),
        $notTransContent:_t({
            pre:1,
            script:1,
            style:1,
            textarea:1
        }),
        html:U,
        head:T,
        style:N,
        script:N,
        body:P,
        base:{},
        link:{},
        meta:{},
        title:N,
        col:{},
        tr:_t({
            td:1,
            th:1
        }),
        img:{},
        embed:{},
        colgroup:_t({
            thead:1,
            col:1,
            tbody:1,
            tr:1,
            tfoot:1
        }),
        noscript:P,
        td:P,
        br:{},
        th:P,
        center:P,
        kbd:L,
        button:X(I,E),
        basefont:{},
        h5:L,
        h4:L,
        samp:L,
        h6:L,
        ol:Q,
        h1:L,
        h3:L,
        option:N,
        h2:L,
        form:X(A,D,E,I),
        select:_t({
            optgroup:1,
            option:1
        }),
        font:L,
        ins:L,
        menu:Q,
        abbr:L,
        label:L,
        table:_t({
            thead:1,
            col:1,
            tbody:1,
            tr:1,
            colgroup:1,
            caption:1,
            tfoot:1
        }),
        code:L,
        tfoot:M,
        cite:L,
        li:P,
        input:{},
        iframe:P,
        strong:L,
        textarea:N,
        noframes:P,
        big:L,
        small:L,
        span:_t({
            '#':1,
            br:1
        }),
        hr:L,
        dt:L,
        sub:L,
        optgroup:_t({
            option:1
        }),
        param:{},
        bdo:L,
        'var':L,
        div:P,
        object:O,
        sup:L,
        dd:P,
        strike:L,
        area:{},
        dir:Q,
        map:X(_t({
            area:1,
            form:1,
            p:1
        }),A,F,E),
        applet:O,
        dl:_t({
            dt:1,
            dd:1
        }),
        del:L,
        isindex:{},
        fieldset:X(_t({
            legend:1
        }),K),
        thead:M,
        ul:Q,
        acronym:L,
        b:L,
        a:X(_t({
            a:1
        }),J),
        blockquote:X(_t({
            td:1,
            tr:1,
            tbody:1,
            li:1
        }),P),
        caption:L,
        i:L,
        u:L,
        tbody:M,
        s:L,
        address:X(D,I),
        tt:L,
        legend:L,
        q:L,
        pre:X(G,C),
        p:X(_t({
            'a':1
        }),L),
        em:L,
        dfn:L
    };

})();
})(VEditor);
(function(ve,undefined){
    ve.lang.Class('VEditor.Editor.Def: VEditor.ViewControler',{
        init:function(editor,url){
            var t=this;
            t.editor=editor;
            var cssLoader=new ve.net.CSSLoader();
            t.editor.onInit.add(function(){
                cssLoader.load(new ve.util.Path().toAbs('view/'+t.editor.conf.viewer+'/css/content.css'),t.editor.getWin());
                if(t.editor.conf.contentCSS){
                    cssLoader.load(t.editor.conf.contentCSS,t.editor.iframeContent);
                }
            });
        cssLoader.load(new ve.util.Path().toAbs('view/'+t.editor.conf.viewer+'/css/global.css'));
    },
    renderUI:function(o){
        var t=this,cm=t.editor.controlManager,tb,layout;
        layout=t.editor.createLayout();
        var tb=cm.createControlGroup('group1',{
            'class':'veOperateToolbar'
        });
        tb.add(cm.createButton('save',{
            title:'保存',
            'class':'veSave',
            cmd:'saveContent'
        }));
        tb.add(cm.createButton('undo',{
            title:'撤销(ctrl+z)',
            'class':'veUndo',
            cmd:'undo',
            onInit:function(){
                var _this=this;
                t.editor.history.onChange.add(function(hasUndo,hasRedo){
                    _this[hasUndo?'setEnabled':'setDisable']();
                });
            }
        }));
    tb.add(cm.createButton('redo',{
        title:'重做(ctrl+y)',
        'class':'veRedo',
        cmd:'redo',
        onInit:function(){
            var _this=this;
            t.editor.history.onChange.add(function(hasUndo,hasRedo){
                _this[hasRedo?'setEnabled':'setDisable']();
            });
        }
    }));
    t.editor.addToolbar(tb);
    var tb=cm.createControlGroup('group2',{
        'class':'veFontStyleToolbar'
    });
    tb.add(cm.createListBox('fontname',{
        title:'选择字体',
        'class':'FontName',
        cmd:'FontName',
        onInit:function(){
            var _this=this;
            t.editor.onAfterUpdateVERangeLazy.add(function(){
                var fontFamily=t.editor.querySelectionStyle('fontFamily');
                if(fontFamily){
                    fontFamily=fontFamily.indexOf('楷体')>=0?'楷体,楷体_GB2312':fontFamily;
                    fontFamily=fontFamily.indexOf('仿宋')>=0?'仿宋,仿宋_GB2312':fontFamily;
                }
                _this.updateCurrentState(fontFamily);
            });
        },
        onChange:function(val){
            t.editor.editorcommands.execCommand(this.conf.cmd,this.conf.ui,val);
        },
        items:[['宋体','宋体','style=\"font-family:Simson\"'],['黑体','黑体','style=\"font-family:Simhei\"'],['仿宋,仿宋_GB2312','仿宋','style=\"font-family:仿宋,仿宋_GB2312\"'],['楷体,楷体_GB2312','楷体','style=\"font-family:楷体,楷体_GB2312\"'],['隶书','隶书','style=\"font-family:隶书\"'],['微软雅黑','微软雅黑','style=\"font-family:Microsoft Yahei\"'],['幼圆','幼圆','style=\"font-family:幼圆\"'],['Arial','Arial','style=\"font-family:Arial\"'],['Calibri','Calibri','style=\"font-family:Calibri\"'],['Tahoma','Tahoma','style=\"font-family:Tahoma\"'],['Helvetica','Helvetica','style=\"font-family:Helvetica\"'],['Verdana','Verdana','style=\"font-family:Verdana\"']]
        }));
    tb.add(cm.createListBox('fontsize',{
        title:'选择字号',
        'class':'FontSize',
        cmd:'FontSize',
        onInit:function(){
            var _this=this;
            t.editor.onAfterUpdateVERangeLazy.add(function(){
                var fontSize=t.editor.querySelectionStyle('fontSize');
                _this.updateCurrentState(fontSize);
            });
        },
        onChange:function(val){
            t.editor.editorcommands.execCommand(this.conf.cmd,this.conf.ui,val);
        },
        items:[['10px','7(10px)','style=\"font-size:10px\"',null,'padding-top:0px'],['12px','6(12px)','style=\"font-size:12px\"',null,'padding-top:0px'],['14px','5(14px)','style=\"font-size:14px\"',null,'padding-top:0px'],['16px','4(16px)','style=\"font-size:16px\"',null,'padding-top:2px'],['18px','3(18px)','style=\"font-size:18px\"',null,'padding-top:5px'],['24px','2(24px)','style=\"font-size:24px\"',null,'padding-top:8px'],['36px','1(36px)','style=\"font-size:36px\"',null,'padding-top:18px']]
        }));
    tb.add(cm.createButton('bold',{
        title:'加粗(ctrl+b)',
        'class':'veBold',
        onInit:function(){
            var _this=this;
            t.editor.onAfterUpdateVERangeLazy.add(function(){
                var fontWeight=t.editor.querySelectionStyle('fontWeight')||'';
                var act;
                if(parseInt(fontWeight,10)){
                    act=fontWeight>400?'setActive':'setUnActive';
                }else{
                    act=fontWeight.toLowerCase().indexOf('bold')>=0?'setActive':'setUnActive';
                }
                _this[act]();
            });
        },
        onClick:function(){
            var cmd=this.toggleActive()?'Bold':'UnBold';
            t.editor.editorcommands.execCommand(cmd);
        }
    }));
tb.add(cm.createButton('italic',{
    title:'斜体(ctrl+i)',
    'class':'veItalic',
    onInit:function(){
        var _this=this;
        t.editor.onAfterUpdateVERangeLazy.add(function(){
            var fontStyle=t.editor.querySelectionStyle('fontStyle')||'';
            var act=fontStyle.toLowerCase().indexOf('italic')>=0?'setActive':'setUnActive';
            _this[act]();
        });
    },
    onClick:function(){
        var cmd=this.toggleActive()?'Italic':'UnItalic';
        t.editor.editorcommands.execCommand(cmd);
    }
}));
tb.add(cm.createButton('underline',{
    title:'下划线(ctrl+u)',
    'class':'veUnderline',
    onInit:function(){
        var _this=this;
        t.editor.onAfterUpdateVERangeLazy.add(function(){
            var underline=t.editor.querySelectionStyle('textDecoration')||'';
            var act=underline.toLowerCase().indexOf('underline')>=0?'setActive':'setUnActive';
            _this[act]();
        });
    },
    onClick:function(){
        var cmd=this.toggleActive()?'Underline':'UnUnderline';
        t.editor.editorcommands.execCommand(cmd);
    }
}));
t.editor.addToolbar(tb);
var tb=cm.createControlGroup('group3',{
    'class':'veJustifyToolbar'
});
tb.add(cm.createButton('justifyleft',{
    title:'左对齐(ctrl+alt+l)',
    'class':'veJustifyLeft',
    cmd:'justifyleft'
}));
tb.add(cm.createButton('justifycenter',{
    title:'居中对齐(ctrl+alt+c)',
    'class':'veJustifyCenter',
    cmd:'justifycenter'
}));
tb.add(cm.createButton('justifyright',{
    title:'右对齐(ctrl+alt+r)',
    'class':'veJustifyRight',
    cmd:'justifyright'
}));
tb.add(cm.createButton('justifyfull',{
    title:'默认',
    'class':'veJustifyFull',
    cmd:'justifyfull'
}));
tb.add(cm.createButton('listol',{
    title:'有序列表',
    'class':'veOrderedList',
    cmd:'InsertOrderedList'
}));
tb.add(cm.createButton('listul',{
    title:'无序列表',
    'class':'veUnorderedList',
    cmd:'InsertUnorderedList'
}));
tb.add(cm.createButton('tableft',{
    title:'向左缩进',
    'class':'veTabLeft',
    cmd:'outdent'
}));
tb.add(cm.createButton('tabright',{
    title:'向右缩进',
    'class':'veTabRight',
    cmd:'indent'
}));
t.editor.addToolbar(tb);
var tb=cm.createControlGroup('group4',{
    'class':'veAdvToolbar'
});
t.editor.addToolbar(tb);
var tb=cm.createControlGroup('group5',{
    'class':'veExtraToolbar'
});
tb.add(cm.createButton('removeformat',{
    title:'清除格式',
    'class':'veRemoveFormat',
    cmd:'removeformat'
}));
t.editor.addToolbar(tb);
}
});
ve.viewManager.register('def',ve.Editor.Def);
})(VEditor);
LINE_HEIGHT='1.6';
var createRegEX=function(pattern,flags){
    try{
        var reg=new RegExp('');
        reg.compile(pattern,flags);
        return reg;
    }catch(e){
        console.log('createRegEX出错：',e,pattern,flags);
    }
};
(function(ve){
    ve.lang.Class('VEditor.plugin.QzoneMedia',{
        setConfig:function(key,val){
            this.config[key]=val;
            return this;
        },
        getConfig:function(key){
            return key?this.config[key]:this.config;
        },
        showPanel:function(){
            var _this=this;
            var panelConfig=this.getConfig('panel');
            var dlg=QZONE.FP.popupDialog(panelConfig.name,{
                src:panelConfig.url
                },panelConfig.width,panelConfig.height);
            if(this.popupCallback){
                QZFL.FP.appendPopupFn(function(){
                    _this.popupCallback();
                });
            }
            return dlg;
        },
        getEditorEleFrameRegion:function(tag){
            var region={
                left:0,
                top:0,
                width:0,
                height:0
            };

            var innerPos=ve.dom.getXY(tag);
            var iframePos=ve.dom.getXY(this.editor.iframeElement);
            var iframeScrollTop=this.editor.getBody().scrollTop;
            var iframeScrollLeft=this.editor.getBody().scrollLeft;
            region.left=iframePos[0]+innerPos[0]+iframeScrollLeft;
            region.top=iframePos[1]+innerPos[1]+iframeScrollTop;
            region.width=tag.offsetWidth;
            region.height=tag.offsetHeight;
            return region;
        },
        init:function(editor,url){
            this.editor=editor;
            this.bindSetContentEvent();
            this.bindGetContentEvent();
        },
        closePanel:function(){
            window.setTimeout(function(){
                try{
                    QZONE.FP.closePopup();
                }catch(e){};

            },100)
        },
    setSetContentFilter:function(fun){
        if(!this.editor.SetContentFilterList){
            this.editor.SetContentFilterList=[];
        }
        this.editor.SetContentFilterList.push(fun);
    },
    setGetContentFilter:function(fun){
        if(!this.editor.GetContentFilterList){
            this.editor.GetContentFilterList=[];
        }
        this.editor.GetContentFilterList.push(fun);
    },
    bindSetContentEvent:function(){
        var _this=this;
        this.editor.onSetContent.add(function(data){
            var html=data;
            if(_this.editor.SetContentFilterList){
                for(var i=0;i<_this.editor.SetContentFilterList.length;i++){
                    var fn=_this.editor.SetContentFilterList[i];
                    html=fn(html);
                }
                }
        return html;
        },true);
    },
    bindGetContentEvent:function(){
        var _this=this;
        this.editor.onGetContent.add(function(data){
            var html=data;
            if(_this.editor.GetContentFilterList){
                for(var i=0;i<_this.editor.GetContentFilterList.length;i++){
                    var fn=_this.editor.GetContentFilterList[i];
                    html=fn(html);
                }
                }
        return html;
        },true);
},
isInWhiteList:function(url){
    var isQQVideo=/^http:\/\/((\w+\.|)(video|v|tv)).qq.com/i.test(url);
    var isImgCache=/^http:\/\/(?:cnc.|edu.|ctc.)?imgcache.qq.com/i.test(url)||/^http:\/\/(?:cm.|cn.|os.|cnc.|edu.)?qzs.qq.com/i.test(url);
    var isComic=/^http:\/\/comic.qq.com/i.test(url);
    return(isQQVideo||isImgCache||isComic);
},
escData:function(str){
    var rEscHTML=/[&<>\x27\x22]/g,hEscHTML={
        '&':'&amp;',
        '<':'&lt;',
        '>':'&gt;',
        "'":'&#039;',
        '"':'&quot;'
    };

    return(str+'').replace(rEscHTML,function(c){
        return hEscHTML[c];
    });
},
restData:function(str){
    if(!ve.plugin.QzoneMedia.__utilDiv){
        ve.plugin.QzoneMedia.__utilDiv=document.createElement("div");
    }
    var t=ve.plugin.QzoneMedia.__utilDiv;
    t.innerHTML=(str+'');
    if(typeof(t.innerText)!='undefined'){
        return t.innerText;
    }else if(typeof(t.textContent)!='undefined'){
        return t.textContent;
    }else if(typeof(t.text)!='undefined'){
        return t.text;
    }else{
        return'';
    }
},
setCache:function(data){
    if(!window.qzonemedia_cache_id_count){
        window.qzonemedia_cache_id_count=1000;
        window.qzonemedia_cache_data={};

}
window.qzonemedia_cache_id_count+=1;
window.qzonemedia_cache_data[window.qzonemedia_cache_id_count]=data;
return window.qzonemedia_cache_id_count;
},
getCache:function(id){
    return window.qzonemedia_cache_data[id]||null;
}
});
ve.plugin.register('qzonemedia',VEditor.plugin.QzoneMedia);
})(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.HtmlEditor',{
        editor:null,
        currentControl:null,
        editorState:0,
        copyState:false,
        htmlElement:null,
        config:{
            className:'veHtmlEditor'
        },
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.currentControl=this.editor.addButton('toggleHtmlEditor',{
                to:'group5',
                at:1,
                'class':'veHtml',
                title:'切换到HTML代码模式',
                cmd:function(){
                    _this.toggleHtmlEditor();
                }
            });
        this.createHtmlContainer();
        this.bindBeforeGetContentEvent();
        this._tmp_fn=ve.lang.bind(this,this.listenSetContentEvent);
        this.editor.onSetContent.add(this._tmp_fn);
    },
    _tmp_fn:null,
    listenSetContentEvent:function(html){
        if(!this.editorState){
            return;
        }
        this.setCode(this.htmlElement.value+html);
        return html;
    },
    toggleHtmlEditor:function(){
        this.currentControl[!this.editorState?'setActive':'setUnActive']();
        this.editor.iframeElement.style.display=!this.editorState?'none':'';
        this.htmlElement.style.display=!this.editorState?'':'none';
        if(!this.editorState){
            this.htmlElement.focus();
        }
        try{
            if(window._VE_QZONE_SIDE_ALBUM_OBJ){
                window._VE_QZONE_SIDE_ALBUM_OBJ.panel.style.display=!this.editorState?'none':'';
            }
        }catch(ex){}
        this.htmlElement.style.color=this.editor.getBody().style.color;
        this.htmlElement.style.borderColor=this.editor.getBody().style.color;
        this.setOtherToolbarButtonsState(this.editorState);
        if(!this.editorState){
            this.setCode(this.editor.getContent());
        }else{
            this.setHTML(this.htmlElement.value);
        }
        this.editorState=this.editorState?0:1;
    },
    setOtherToolbarButtonsState:function(enabled){
        var ctrls=[],cm=this.editor.controlManager;
        var groupIdPre=cm.generateId('group');
        for(var i in cm.controls){
            var _gp=cm.controls[i];
            if(_gp.id&&_gp.id.indexOf(groupIdPre)<0&&!_gp.conf.disabled){
                ctrls.push(_gp);
            }
        }
    for(var i=0;i<ctrls.length;i++){
        if(ctrls[i].setEnabled&&ctrls[i].id!=cm.generateId('toggleHtmlEditor')&&ctrls[i].id!=cm.generateId('submitBlog')&&ctrls[i].id!=cm.generateId('save')){
            ctrls[i][enabled?'setEnabled':'setDisable']();
        }
    }
    },
createHtmlContainer:function(){
    var ta=ve.createElement
    this.htmlElement=ve.dom.create('textarea',{
        allowtransparency:'true',
        allowTransparency:'true',
        style:{
            width:'100%',
            height:'500px',
            border:'1px solid #ccc',
            fontSize:'14px',
            background:'transparent',
            display:'none'
        }
    },null,this.editor.iframeContainer);
this.htmlElement.className=this.config.className;
},
bindBeforeGetContentEvent:function(){
    var _this=this;
    _this.editor.onBeforeGetContent.add(function(){
        if(_this.editorState){
            _this.setHTML(_this.htmlElement.value);
        }
    });
return this.htmlElement;
},
setHTML:function(html){
    this.editor.onSetContent.remove(this._tmp_fn);
    this.editor.setContent({
        content:html
    });
    this.editor.onSetContent.add(this._tmp_fn);
},
setCode:function(html){
    html=this.formatHTML(html);
    this.htmlElement.value=html;
},
formatHTML:function(html){
    try{
        var str;
        str=html.replace(/<br(\s*?)\/{0,1}>/ig,"<br/>\r\n");
        str=str.replace(/<\/p>/ig,"</p>\r\n");
        str=str.replace(/<div([^>]*?)>/ig,"<div$1>\r\n");
        str=str.replace(/<\/div>/ig,"</div>\r\n");
        str=str.replace(/<table([^>]*?)>/ig,"\r\n<table$1>");
        str=str.replace(/<\/table>/ig,"\r\n</table>\r\n");
    }catch(ex){
        QZFL.console.print(ex);
        return html;
    }
    return str;
}
});
ve.plugin.register('htmleditor',VEditor.plugin.HtmlEditor);
})(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.ToolbarSwitcher',{
        editor:null,
        curToolbarMode:'default',
        button:null,
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.btn=this.editor.addButton('switchtoolbar',{
                to:'group5',
                at:0,
                'class':'veToolbarSwitcher',
                title:'工具条模式切换',
                text:'高级功能<b></b>',
                cmd:function(){
                    _this.switchToolbar();
                }
            });
        this.editor.onInitComplete.add(function(){
            _this.editor.toolbarContainer.className='veToolbarContainer';
            _this.curToolbarMode='default';
            _this.btn.getDom().innerHTML='高级功能<b></b>';
        });
    },
    switchToolbar:function(){
        var tag=this.curToolbarMode=='advance'?'default':'advance';
        this.editor.toolbarContainer.className=this.curToolbarMode=='default'?'veToolbarAdvMode':'veToolbarContainer';
        var tagText=this.curToolbarMode=='default'?'基本功能<b></b>':'高级功能<b></b>';
        this.curToolbarMode=tag;
        this.btn.getDom().innerHTML=tagText;
    }
    });
ve.plugin.register('toolbarswitcher',VEditor.plugin.ToolbarSwitcher);
})(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.link',{
        editor:null,
        pop:null,
        node:null,
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.btn=this.editor.addButton('setLink',{
                to:'group4',
                at:5,
                'class':'veLink',
                title:'设置链接',
                cmd:function(){
                    _this.showPanel(null,_this.btn.getDom());
                }
            });
        ve.lang.each(['removeLink','addLink','adjustLink'],function(method){
            _this.editor.addCommand(method,function(){
                return _this[method].apply(_this,ve.lang.arg2Arr(arguments));
            });
        });
        ve.dom.event.add(document.body,'click',function(e){
            var target=ve.dom.event.getTarget(e);
            if(_this.pop){
                var popPanel=_this.pop.getDOM();
                if(!ve.dom.contains(_this.editor.iframeContainer,target)&&!ve.dom.contains(popPanel,target)&&!ve.dom.contains(_this.btn.getDom(),target)){
                    _this.closePanel();
                }
            }
        });
    this.editor.onClick.add(function(e){
        var link=ve.dom.event.getTarget(e);
        if(link.tagName=='IMG'){
            _this.closePanel();
            return;
        }
        var aLink=ve.dom.getParent(link,function(node){
            if(node.tagName=='A'){
                return true;
            }
        });
    if(!ve.dom.isLinkNode(aLink)){
        _this.closePanel();
    }else{
        _this.node=aLink;
        var href=aLink.href;
        var region=ve.dom.getRegion(aLink);
        var iframeRegion=ve.dom.getRegion(_this.editor.iframeContainer);
        _this.showPanel(href,null,{
            top:region.top+iframeRegion.top+region.height,
            left:region.left+iframeRegion.left
            });
        ve.dom.event.preventDefault(e);
        return false;
    }
    });
},
showPanel:function(link,node,config){
    var config=ve.lang.extend({
        left:0,
        top:0
    },config||{});
    var html=(['<div id="ed-insert-link-panel"><strong>设置超链接</strong>','<div>','<input type="text" id="link-val" style="padding:2px 1px; border:1px solid #bbb; border-right-color:#ddd; border-bottom-color:#ddd; border-radius:3px"/>','<input type="button" value="设置" id="link-submit-btn" style="height:20px; width:40px; margin-left:5px;" title="设置链接"/>','<input type="button" value="删除" id="link-remove-btn" style="height:20px; width:40px; margin-left:5px;" title="删除链接"/>','</div></div>']).join('');
    if(!this.pop){
        this.pop=ve.ui.showSimplePopup(this.editor,node,{
            content:html,
            height:70,
            width:320
        });
        this.setupEvent(this.pop.getDOM());
    }
    ve.dom.get('link-val').value=link||'http://';
    this.pop.show();
    if(node){
        var region=ve.dom.getRegion(node);
        config=ve.lang.extend(config||{},{
            left:region.left,
            top:region.top+region.height
            });
    }
    var toolbarContainerRegion=ve.dom.getRegion(this.editor.toolbarContainer);
    var popRegion=ve.dom.getRegion(this.pop.getDOM());
    if((config.left+popRegion.width)>(toolbarContainerRegion.left+toolbarContainerRegion.width)){
        config.left=toolbarContainerRegion.left+toolbarContainerRegion.width-popRegion.width;
    }
    this.pop.show(config);
},
closePanel:function(){
    this.node=null;
    if(this.pop){
        this.pop.hide();
    }
},
addLink:function(link,text){
    text=text||link;
    var rng=this.editor.getVERange();
    if(ve.ua.ie==6){
        var start,end;
        var start=rng.startContainer.nodeType==3?rng.startContainer.parentNode:rng.startContainer.childNodes[rng.startOffset];
        var end=rng.endContainer.nodeType==3?rng.endContainer.parentNode:rng.endContainer.childNodes[rng.endOffset-1];
        start=start.nodeType==3?start.parentNode:start;
        end=end.nodeType==3?end.parentNode:end;
        if(start.parentNode==end.parentNode&&start.parentNode.tagName=='A'){
            start=start.parentNode;
            end=end.parentNode;
        }
        if(start==end&&start.tagName=='A'){
            start.href=link;
            start.title=text;
            return;
        }
    }
this._enlargeRngToA(rng);
rng.removeInlineStyle('a');
if(rng.collapsed){
    var a=this.editor.getDoc().createElement('a');
    a.href=link;
    a.title=text;
    a.innerHTML=text;
    rng.insertNode(a);
    rng.selectNode(a);
}else{
    rng.setInlineStyle('a',{
        href:link,
        title:text
    });
}
rng.collapse();
rng.select();
this.editor.showStatusbar('链接设置成功',3);
},
_enlargeRngToA:function(rng){
    ve.dom.getParent(rng.startContainer,function(node){
        if(node.nodeType==1&&node.tagName=='A'){
            rng.setStartBefore(node);
            return true;
        }
    });
ve.dom.getParent(rng.endContainer,function(node){
    if(node.nodeType==1&&node.tagName=='A'){
        rng.setEndAfter(node);
        return true;
    }
});
rng.removeBookmark();
},
removeLink:function(){
    var rng=this.editor.getVERange();
    this._enlargeRngToA(rng);
    if(rng.startContainer==rng.endContainer){
        var start=rng.startContainer.childNodes[rng.startOffset];
        var end=rng.endContainer.childNodes[rng.endOffset];
        var startIndex=ve.dom.nodeIndex(start);
        var endIndex=ve.dom.nodeIndex(end);
        var as=[];
        if(ve.dom.isLinkNode(start)){
            as.push(start);
        }
        if(ve.dom.isLinkNode(end)&&start!=end){
            as.push(end);
        }
        for(var i=startIndex;i<endIndex;i++){
            var tmp=rng.startContainer.childNodes[i].getElementsByTagName('A')||[];
            as.concat(tmp);
        }
        var bookmark=rng.createBookmark();
        ve.lang.each(as,function(a){
            ve.dom.remove(a,true);
        });
        rng.moveToBookmark(bookmark);
    }else{
        try{
            var bookmark=rng.createBookmark();
            rng.removeInlineStyle(['a']);
            rng.moveToBookmark(bookmark);
        }catch(ex){};

}
rng.collapse();
rng.select();
this.editor.showStatusbar('链接删除成功',3);
},
adjustLink:function(link){
    if(!link||link.toLowerCase()=='http://'){
        this.removeLink();
    }else{
        text=link;
        link=link.indexOf('://')>0?link:'http://'+link;
        this.addLink(link,text);
    }
},
setupEvent:function(container){
    var _this=this;
    ve.dom.event.add(ve.dom.get('link-val'),'keydown',function(e){
        var e=e||window.event;
        if(e.keyCode==13){
            _this.editor.editorcommands.execCommand('adjustLink',ve.dom.get('link-val').value);
            _this.closePanel();
        }
    });
ve.dom.event.add(ve.dom.get('link-submit-btn'),'click',function(e){
    _this.editor.editorcommands.execCommand('adjustLink',ve.dom.get('link-val').value);
    _this.closePanel();
});
ve.dom.event.add(ve.dom.get('link-remove-btn'),'click',function(e){
    _this.editor.editorcommands.execCommand('adjustLink');
    _this.closePanel();
});
}
});
ve.plugin.register('link',VEditor.plugin.link);
})(VEditor);
(function(ve){
    var insertedCssLink;
    function loadColorPicker(url,node,editor,onChangeColor,callback){
        var option={
            defaultTab:0,
            needFloat:true,
            realtime:false,
            cssText:''
        };

        var handler=function(){
            var picker=new ColorPicker(node,onChangeColor,option);
            editor.onClick.add(function(){
                picker.hide();
            });
            editor.onBeforeOpenListBox.add(function(){
                picker.hide();
            });
            callback(picker);
        };

        if(window.ColorPicker){
            handler();
        }else{
            var sc=new ve.net.ScriptLoader();
            sc.load(url,{
                callback:function(){
                    handler();
                }
            });
    }
}
ve.lang.Class('VEditor.plugin.ForeColor',{
    init:function(editor,url){
        var _this=this;
        var pickerUrl=new ve.util.Path().toAbs('plugins/color/colorpicker.js');
        var pickerCss=new ve.util.Path().toAbs('plugins/color/colorpicker.css')
        var colorPicker;
        this.editor=editor;
        this.btn=this.editor.addButton('setForeColor',{
            to:'group2',
            'class':'veForeColor',
            title:'设置文本颜色',
            cmd:function(){
                if(!colorPicker){
                    loadColorPicker(pickerUrl,_this.btn.getDom(),_this.editor,function(color){
                        _this.editor.editorcommands.execCommand('ForeColor',false,color);
                    },function(picker){
                        colorPicker=picker;
                        colorPicker.show();
                    });
                }else{
                    colorPicker.show();
                }
                if(!insertedCssLink){
                    insertedCssLink=true;
                    ve.dom.insertCSSLink(pickerCss);
                }
            }
        });
}
});
ve.plugin.register('forecolor',VEditor.plugin.ForeColor);
ve.lang.Class('VEditor.plugin.BackColor',{
    init:function(editor,url){
        var _this=this;
        var pickerUrl=new ve.util.Path().toAbs(url+'/colorpicker.js');
        var pickerCss=new ve.util.Path().toAbs(url+'/colorpicker.css')
        var colorPicker;
        this.editor=editor;
        this.btn=this.editor.addButton('setBackColor',{
            to:'group2',
            'class':'veBackColor',
            title:'设置背景颜色',
            cmd:function(){
                if(!colorPicker){
                    loadColorPicker(pickerUrl,_this.btn.getDom(),_this.editor,function(color){
                        _this.editor.editorcommands.execCommand('BackColor',false,color);
                    },function(picker){
                        colorPicker=picker;
                        colorPicker.show();
                    });
                }else{
                    colorPicker.show();
                }
                if(!insertedCssLink){
                    insertedCssLink=true;
                    ve.dom.insertCSSLink(pickerCss);
                }
            }
        });
}
});
ve.plugin.register('backcolor',VEditor.plugin.BackColor);
})(VEditor);
(function(ve){
    var REMOVEABLE_TAGS_N_CONTENT=/^(style|comment|select|option|script|title|head|button)/i;
    var REMOVEABLE_TAGS=/^(!doctype|html|link|base|body|pre|input|frame|frameset|iframe|ilayer|layer|meta|textarea|form|area|bgsound|player|applet|xml)/i;
    var HIGHT_RISK_INLINE_EVENT=/^(onmouseover|onclick|onload|onmousemove|onmouseout)/i;
    var WORD_CLASS=/(MsoListParagraph|MsoNormal|msocomoff|MsoCommentReference|MsoCommentText|msocomtxt|blog_details_)/i;
    var REMOVEABLE_STYLE_KEY=/^(text-autospace|background-color|mso-|layout-grid)/i;
    var REMOVEABLE_STYLE_VAL=/expression/i;
    var IGNORE_ATTR_BY_TAG=/^(param|embed|object|video|audio)/i;
    var REMOVEABLE_ATTR_KEY=/^(lang|eventsListUID)/i;
    var TAG_JUDGE=/<([^>\s]+)([^>]*)>([\s\S]*?)<\/\1>/g;
    var ATTR_SEP_EXP=/([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g;
    ve.lang.Class('VEditor.plugin.XPaste',{
        editor:null,
        url:null,
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.editor.onGetContent.add(function(str){
                return _this.cleanContent(str,true);
            },true);
            if(ve.ua.ie){
                this.editor.onKeyDown.add(function(e){
                    if(!e.ctrlKey||!e.keyCode!='86'){
                        return;
                    }
                    return _this.onPasteHandler(e);
                });
            }
            this.editor.onPaste.add(function(e){
                return _this.onPasteHandler(e);
            });
        },
        _processing:false,
        onPasteHandler:function(e){
            var _this=this;
            if(this._processing){
                return false;
            }else{
                this._processing=true;
            }
            var ptms=new Date();
            if(e&&e.clipboardData){
                str=e.clipboardData.getData('text/html');
                if(str){
                    str=this.cleanContent(str);
                    this.editor.insertHtml({
                        content:str
                    });
                    this._processing=false;
                    ve.dom.event.preventDefault(e);
                    return false;
                }
            }
        else{
            setTimeout(function(){
                var body=_this.editor.getBody();
                var rng=_this.editor.updateLastVERange();
                var bookmark=rng.createBookmark(true,true);
                var str=_this.cleanContent(body.innerHTML)||'<div></div>';
                body.innerHTML=str;
                rng.moveToBookmark(bookmark);
                rng.select(true);
                _this.editor.updateLastVERange();
                _this._processing=false;
            },0);
        }
    },
    processStrByReg:function(str,regItems,onMatch){
        var _this=this;
        for(var i=0;i<regItems.length;i++){
            var v=regItems[i];
            if(v.constructor==RegExp){
                str=str.replace(v,function(){
                    if(onMatch){
                        return onMatch.apply(_this,arguments);
                    }
                    return'';
                });
            }else{
                str=str.replace(v[0],function(){
                    if(onMatch){
                        var arg=arguments;
                        return onMatch.apply(_this,arg);
                    }
                    return arguments[v[1].substring(1)];
                });
            }
        }
    return str;
},
cleanContent:function(str,cleanLineHeight){
    str=this.processStrByReg(str,[/[\r]/gi,/[\n]/gi,/<![^>]+>/g,/<\??xml[^>]*>/gi,/<\/xml>/gi,/(\&nbsp;)*$/gi]);
    str=this.cleanPairTags(str);
    str=this.processStrByReg(str,[[/<\/?([\w|\:]+)[^>]*>/gi]],this.cleanTag);
    this._processing=false;
    str=this.processStrByReg(str,[[/<(\w+)\s+([^>]+)>/gi]],function(){
        var args=ve.lang.arg2Arr(arguments);
        args.push(cleanLineHeight);
        return this.onAttrMatch.apply(this,args);
    });
    return str;
},
cleanPairTags:function(str){
    var _this=this;
    str=str.replace(TAG_JUDGE,function(match,tag,attr,content){
        if(REMOVEABLE_TAGS_N_CONTENT.test(tag)){
            return'';
        }else{
            if(TAG_JUDGE.test(content)){
                content=_this.cleanPairTags(content);
            }
            return'<'+tag+attr+'>'+content+'</'+tag+'>';
        }
    });
return str;
},
cleanTag:function(match,tag){
    if(REMOVEABLE_TAGS.test(tag)){
        return'';
    }
    if(tag.substring(0,1)!='$'&&!ve.dtd[tag.toLowerCase()]&&tag.toLowerCase()!='marquee'){
        return'';
    }
    return match;
},
onAttrMatch:function(match,tag,attrStr,cleanLineHeight){
    if(IGNORE_ATTR_BY_TAG.test(tag)){
        return match;
    }
    var arr=(' '+attrStr).match(ATTR_SEP_EXP);
    var keepAttrs={};

    var _trimAttr=function(attr){
        attr=ve.string.trim(attr);
        if(/^["|'](.*)['|"]$/.test(attr)){
            return attr.substring(1,attr.length-1);
        }
        return attr;
    };

    var _buildAttrStr=function(attrs){
        var a=[];
        for(var i in attrs){
            if((i.toLowerCase()!='class'||i.toLowerCase()!='style')&&!attrs[i]){}
            else if(attrs[i]===null||attrs[i]===undefined){
                a.push(i);
            }else{
                a.push(i+'="'+attrs[i]+'"');
            }
        }
    return(a.length?' ':'')+a.join(' ');
};

for(var i=0;i<arr.length;i++){
    var spos=arr[i].indexOf('=');
    var key=arr[i].substring(0,spos);
    var val=_trimAttr(arr[i].substring(spos+1))||null;
    switch(key.toLowerCase()){
        case'id':
            val=this.onIdFilter(val);
            break;
        case'class':
            val=this.onClassFilter(val);
            break;
        case'style':
            val=this.onStyleFilter(val,cleanLineHeight);
            break;
        default:
            val=this.onCustomAttrFilter(key.toLowerCase(),val);
    }
    keepAttrs[key]=val;
}
var newAttrStr=_buildAttrStr(keepAttrs);
    return'<'+tag+newAttrStr+'>';
},
onCustomAttrFilter:function(key,val){
    if(HIGHT_RISK_INLINE_EVENT.test(key)||REMOVEABLE_ATTR_KEY.test(key)){
        return null;
    }
    return val;
},
onIdFilter:function(id){
    if(/^(musicFlash|veditor)/i.test(id)){
        return id;
    }
    return null;
},
onClassFilter:function(classStr){
    if(WORD_CLASS.test(classStr)){
        return null;
    }
    return classStr;
},
onStyleFilter:function(styleStr,cleanLineHeight){
    if(!ve.string.trim(styleStr)){
        return styleStr;
    }
    var keepStyles={};

    var a=styleStr.split(';');
    var _buildStyleStr=function(styles){
        var a=[];
        for(var i in styles){
            if(styles[i]){
                a.push(i+':'+styles[i]+'');
            }
        }
    return a.join(';');
};

var addBGTransparent;
for(var i=0;i<a.length;i++){
    var str=ve.string.trim(a[i]);
    var pos=str.indexOf(':');
    var key=ve.string.trim(str.substring(0,pos));
    var val=ve.string.trim(str.substring(pos+1));
    if(key.toLowerCase()=='background'){
        if(/url|position|repeat/i.test(val)){
            addBGTransparent=true;
        }else{
            val=null;
        }
    }
else if(REMOVEABLE_STYLE_KEY.test(key)||REMOVEABLE_STYLE_VAL.test(val)||(cleanLineHeight&&/^line-height/i.test(key))){
    val=null;
}
keepStyles[key]=val;
}
if(addBGTransparent){
    keepStyles['background-color']='transparent';
}
return _buildStyleStr(keepStyles);
},
showStatusTip:function(){
    var _this=this;
    this.editor.showStatusbar('当前粘贴的内容已经经过过滤处理，如果与您实际的内容不符合，请手动编辑');
    setTimeout(function(){
        _this.editor.hideStatusbar();
    },3000);
}
});
ve.plugin.register('xpaste',VEditor.plugin.XPaste);
})(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.RemoveFormat',{
        editor:null,
        curToolbarMode:'default',
        button:null,
        init:function(editor,url){
            return;
            var _this=this;
            this.editor=editor;
            this.editor.addCommand('removeformat',function(){
                _this.removeFormat();
            });
            var btn=this.editor.addButton('removeformat',{
                to:'group5',
                at:0,
                'class':'veRemoveFormat',
                title:'清除格式',
                text:'',
                cmd:'removeformat'
            });
        },
        removeFormat:function(){
            var veRange=ed.getVERange();
            veRange.removeInlineStyle(['A','SPAN']);
            veRange.setInlineStyle('span',{
                style:'color:green'
            });
            return;
        }
    });
ve.plugin.register('removeformat',VEditor.plugin.RemoveFormat);
    })(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.SOSOEmotion',{
        bEmotionLoaded:false,
        btnElement:null,
        editor:null,
        jsPath:'http://image.soso.com/js/sosoexp_platform.js',
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.btn=this.editor.addButton('showEmotionPanel',{
                to:'group4',
                at:2,
                'class':'veEmotion',
                title:'表情',
                cmd:function(){
                    _this.btnElement=_this.btn.getDom();
                    _this.show();
                }
            });
        this.editor.onClick.add(function(){
            _this.hide()
            });
    },
    show:function(){
        var _this=this;
        if(typeof SOSO_EXP!=="object"){
            QZFL.imports(this.jsPath,function(){
                if(typeof SOSO_EXP==="object"){
                    SOSO_EXP.Register(30001,'qzone',_this.btnElement,'bottom',_this.editor,function(a,b){
                        _this.insertEmotion(b);
                    });
                    _this.btnElement.setAttribute('binded','1');
                    SOSO_EXP.Platform.popupBox(_this.btnElement);
                }
            });
    }
    else if(!_this.btnElement.getAttribute('binded')){
        SOSO_EXP.Register(30001,'qzone',_this.btnElement,'bottom',_this.editor,function(a,b){
            _this.insertEmotion(b);
        });
        SOSO_EXP.Platform.popupBox(_this.btnElement);
    }
    },
insertEmotion:function(sosoEmotionUrl){
    sosoEmotionUrl=sosoEmotionUrl.replace(/^http:\/\/cache.soso.com\/img\/img\/e(\d{1,3}).gif/gi,"/qzone/em/e$1.gif");
    var html='<img src="'+sosoEmotionUrl+'"/>&nbsp;';
    this.editor.insertHtml({
        content:html
    });
},
hide:function(){
    if(typeof(SOSO_EXP)=='object'){
        SOSO_EXP.Platform.hideBox();
    }
}
});
ve.plugin.register('sosoemotion',VEditor.plugin.SOSOEmotion);
})(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.ImageTools',{
        toolbar:null,
        editor:null,
        _lastImg:null,
        _lastAttr:null,
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.editor.onMouseUp.add(function(e){
                var img=QZFL.event.getTarget(e);
                if(img.tagName!='IMG'){
                    _this.hideTools();
                    return;
                }
                if(!_this.checkImageEditAviable(img)){
                    img.setAttribute("unselectable","on");
                    img.style.MozUserSelect="none";
                    img.style.MozUserFocus="ignore";
                    img.blur();
                    ve.dom.event.cancel();
                    return false;
                }
                _this._lastImg=img;
                _this._lastAtrr={
                    width:img.width,
                    height:img.height
                    }
                _this.showTools(img);
                ve.dom.event.add(img,'mouseup',function(){
                    if(_this._lastImg){
                        ve.dom.event.remove(_this._lastImg,'mouseup',arguments.callee);
                        _this._lastImg=null;
                        _this._lastAtrr=null;
                    }
                });
            });
        ve.dom.event.add(document.body,'click',function(){
            _this.hideTools();
        });
        this.editor.onKeyDown.add(function(e){
            _this.hideTools();
        });
        this.editor.onNodeRemoved.add(function(){
            _this.hideTools();
        });
    },
    checkImageEditAviable:function(node){
        if(!node.tagName=='IMG'||/em\/e(\d{1,3}).gif/i.test(node.src)||/blog_music/i.test(node.className)||/blog_video/i.test(node.className)||/blog_flash/i.test(node.className)){
            return false;
        }
        return true;
    },
    disableScale:function(tag){
        if(!tag||tag.tagName!='IMG'){
            return;
        }
    },
    showTools:function(img){
        var _this=this;
        this.curImg=img;
        if(!this.toolbar){
            this.toolbar=QZFL.dom.createElementIn('div');
            this.toolbar.className='qzEditor_tips pic_tips';
            this.toolbar.innerHTML=(['<ul class="pic_function" id="qzEditor_tips_pic_function">','<li class="father_button pic_position">','<a title="编辑图片位置" class="main_btn first" href="javascript:;">','<span class="icon_sprite icon_pic_position"></span><em class="none">编辑图片位置</em>','</a>','<ol class="dropdown_functions">','<li><a href="javascript:;" id="_pic_func_align_reset"><span class="icon_sprite icon_pic_reset"></span><em class="text_intro">默认</em></a></li>','<li><a href="javascript:;" id="_pic_func_align_left"><span class="icon_sprite icon_pic_left"></span><em class="text_intro">居左</em></a></li>','<li><a href="javascript:;" id="_pic_func_align_center"><span class="icon_sprite icon_pic_center"></span><em class="text_intro">居中</em></a></li>','<li><a href="javascript:;" id="_pic_func_align_right"><span class="icon_sprite icon_pic_right"></span><em class="text_intro">居右</em></a></li>','<li><a href="javascript:;" id="_pic_func_align_round_left"><span class="icon_sprite icon_pic_left_round"></span><em class="text_intro">居左环绕</em></a></li>','<li><a href="javascript:;" id="_pic_func_align_round_right"><span class="icon_sprite icon_pic_right_round"></span><em class="text_intro">居右环绕</em></a></li>','</ol>','</li>','<li class="father_button pic_size">','<a title="编辑图片大小" class="main_btn first" href="javascript:;">','<span class="icon_sprite icon_pic_size"></span><em class="none">编辑图片大小</em>','</a>','<ol class="dropdown_functions">','<li><a href="javascript:;" id="_pic_func_original"><span class="icon_sprite icon_size_default"></span><em class="text_intro">默认</em></a></li>','<li><a href="javascript:;" id="_pic_func_big"><span class="icon_sprite icon_size_full"></span><em class="text_intro">大</em></a></li>','<li><a href="javascript:;" id="_pic_func_middle"><span class="icon_sprite icon_size_bigger"></span><em class="text_intro">中</em></a></li>','<li><a href="javascript:;" id="_pic_func_small"><span class="icon_sprite icon_size_smaller"></span><em class="text_intro">小</em></a></li>','</ol>','</li>','<li class="father_button pic_link ">','<a class="main_btn" title="插入图片链接地址" href="javascript:;">','<span class="icon_sprite icon_pic_link"></span><span class="none">插入图片链接地址</span>','</a>','<div class="dropdown_functions pic_link_item ">','<strong class="title">链接地址:</strong>','<input type="text" class="url"  style="padding:2px 1px; border:1px solid #bbb; border-right-color:#ddd; border-bottom-color:#ddd; border-radius:3px" id="_pic_func_link" value="http://"/>','<input type="button" style="height:20px; width:40px; margin-left:5px;" value="设置" id="_pic_func_setLink_btn" />','<input type="button" style="height:20px; width:40px; margin-left:5px;" value="删除" id="_pic_func_removeLink_btn" />','</div>','</li>','</ul>']).join('');
            var btns=ve.dom.get('qzEditor_tips_pic_function').getElementsByTagName('A');
            for(var i=0;i<btns.length;i++){
                if(ve.dom.hasClass(btns[i],'main_btn')){
                    var li=btns[i].parentNode;
                    ve.dom.event.add(li,'mouseover',function(){
                        ve.dom.addClass(this,'current');
                        this.setAttribute('_hover','1');
                    });
                    ve.dom.event.add(li,'mouseout',function(){
                        var _this=this;
                        setTimeout(function(){
                            if(!_this.getAttribute('_hover')){
                                ve.dom.removeClass(_this,'current');
                            }
                        },500);
                    _this.removeAttribute('_hover','1');
                    });
                ve.dom.event.add(li,'click',function(e){
                    this.setAttribute('_hover','1');
                    ve.dom.event.cancel(e);
                    return false;
                });
            }
            }
    ve.dom.event.add(ve.dom.get('_pic_func_align_reset'),'click',function(){
        _this.setImageAlign(_this.curImg);
    });
    ve.dom.event.add(ve.dom.get('_pic_func_align_left'),'click',function(){
        _this.setImageAlign(_this.curImg,'left');
    });
    ve.dom.event.add(ve.dom.get('_pic_func_align_center'),'click',function(){
        _this.setImageAlign(_this.curImg,'center');
    });
    ve.dom.event.add(ve.dom.get('_pic_func_align_right'),'click',function(){
        _this.setImageAlign(_this.curImg,'right');
    });
    ve.dom.event.add(ve.dom.get('_pic_func_align_round_left'),'click',function(){
        _this.setImageAlign(_this.curImg,'roundLeft');
    });
    ve.dom.event.add(ve.dom.get('_pic_func_align_round_right'),'click',function(){
        _this.setImageAlign(_this.curImg,'roundRight');
    });
    ve.dom.event.add(ve.dom.get('_pic_func_original'),'click',function(){
        _this.setImgSize(_this.curImg);
    });
    ve.dom.event.add(ve.dom.get('_pic_func_big'),'click',function(){
        _this.setImgSize(_this.curImg,800);
    });
    ve.dom.event.add(ve.dom.get('_pic_func_middle'),'click',function(){
        _this.setImgSize(_this.curImg,500);
    });
    ve.dom.event.add(ve.dom.get('_pic_func_small'),'click',function(){
        _this.setImgSize(_this.curImg,300);
    });
}
setTimeout(function(){
    _this.initLink(img);
},10);
this.updateToolsPosition(img);
    },
    setImgSize:function(img,boxSize){
        this.editor.history.add();
        var oriH=img.getAttribute('originHeight')||img.height;
        oriH=parseInt(oriH,10);
        var oriW=img.getAttribute('originWidth')||img.width;
        oriW=parseInt(oriW,10);
        if(!boxSize){
            img.style.height=oriH+'px';
            img.style.width=oriW+'px';
        }else{
            img.style.width=boxSize+'px';
            img.style.height=Math.ceil(boxSize*oriH/oriW)+'px';
        }
        img.setAttribute('originHeight',oriH);
        img.setAttribute('originWidth',oriW);
        this.updateToolsPosition(img);
        this.editor.resize();
        ve.dom.event.preventDefault();
        return false;
    },
    initLink:function(img){
        var _this=this;
        var link=ve.dom.getParent(img,function(node){
            if(node.tagName=='A'){
                return true;
            }
        });
    if(ve.dom.isLinkNode(link)){
        ve.dom.get('_pic_func_link').value=link.href;
    }else{
        ve.dom.get('_pic_func_link').value='http://';
    }
    ve.dom.event.add(ve.dom.get('_pic_func_link'),'keydown',function(e){
        var e=e||window.event;
        if(e.keyCode==13){
            _this.editor.editorcommands.execCommand('adjustLink',ve.dom.get('_pic_func_link').value);
            _this.hideTools();
        }
    });
ve.dom.event.add(ve.dom.get('_pic_func_setLink_btn'),'click',function(){
    _this.editor.editorcommands.execCommand('adjustLink',ve.dom.get('_pic_func_link').value);
    _this.hideTools();
});
ve.dom.event.add(ve.dom.get('_pic_func_removeLink_btn'),'click',function(){
    _this.editor.editorcommands.execCommand('adjustLink','');
    _this.hideTools();
});
},
setImageAlign:function(img,align){
    this.editor.history.add();
    var updateStyle={};

    switch(align){
        case'left':
            updateStyle={
            'marginRight':'auto',
            'display':'block'
        };

        break;
        case'right':
            updateStyle={
            'marginLeft':'auto',
            'display':'block'
        };

        break;
        case'center':
            updateStyle={
            'marginLeft':'auto',
            'marginRight':'auto',
            'display':'block'
        };

        break;
        case'roundLeft':
            updateStyle={
            'float':'left'
        };

        break;
        case'roundRight':
            updateStyle={
            'float':'right'
        };

        break;
    }
    var clearStyle={
        'marginLeft':0,
        'marginRight':0,
        'float':'none',
        'display':''
    };

    ve.dom.setStyles(img,clearStyle);
    ve.dom.setStyles(img,updateStyle);
    this.updateToolsPosition(img);
    ve.dom.event.cancel();
    return false;
},
hideTools:function(){
    if(this.toolbar){
        this.toolbar.style.display='none';
    }
},
updateToolsPosition:function(img){
    var toolbarRegion=ve.dom.getRegion(this.toolbar),iframeRegion=ve.dom.getRegion(this.editor.iframeElement);
    try{
        var imgRegion=ve.dom.getRegion(img);
        var styles={
            display:'block',
            top:iframeRegion.top+imgRegion.top,
            left:iframeRegion.left+imgRegion.left
            };

        for(var i in styles){
            ve.dom.setStyle(this.toolbar,i,styles[i]);
        }
        }catch(ex){
    ve.dom.setStyle(this.toolbar,'display','none');
}
}
});
ve.plugin.register('imagetools',VEditor.plugin.ImageTools);
})(VEditor);
(function(ve){
    var isVip=false;
    try{
        isVip=QZONE.FP.getBitMapFlag(27)==1;
    }catch(ex){}
    ve.lang.Class('VEditor.plugin.QzoneFlash:VEditor.plugin.QzoneMedia',{
        editor:null,
        config:{
            baseURL:'http://'+window.IMGCACHE_DOMAIN+'/qzone/newblog/v5/editor/dialog/flash.html',
            panel:{
                url:null,
                name:'插入Flash动画',
                width:430,
                height:(isVip?235:275)
                },
            pUrl:'',
            pAlbumId:'',
            cssClassName:'blog_flash',
            defaultFlashWidth:500,
            defaultFlashHeight:425,
            disableScale:false
        },
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.config.panel.url=this.config.baseURL+'?editorid='+this.editor.editorId;
            this.editor.addButton('FlashButton',{
                to:'group4',
                at:1,
                'class':'veInsertFlash',
                title:'插入Flash动画',
                cmd:function(){
                    _this.showFlashPanel();
                }
            });
        this.editor.onMouseDown.add(function(ev){
            _this.toggleflashInfoPanel(ev);
        });
        this.editor.onKeyDown.add(function(ev){
            _this.toggleflashInfoPanel(ev,true);
        });
        ve.dom.event.add(document.body,'click',function(ev){
            var tag=ve.dom.event.getTarget(ev);
            if(_this.flashInfoPanel&&(tag==_this.flashInfoPanel||ve.dom.contains(_this.flashInfoPanel,tag))){}else{
                _this.toggleflashInfoPanel(ev,true);
            }
        });
    this.setSetContentFilter(function(html){
        return _this.onSetContent(html);
    })
    this.setGetContentFilter(function(html){
        return _this.onGetContent(html);
    });
    },
    showFlashPanel:function(){
        var _this=this;
        QZONE.FP._t.popupCallback=function(){
            var id=_this.editor.editorId;
            if(QZONE.FP._t.g_arrQZEditorReturnVal&&QZONE.FP._t.g_arrQZEditorReturnVal[id]){
                var data=QZONE.FP._t.g_arrQZEditorReturnVal[id];
                if(data[4]){
                    data[5]=parseInt(data[5],10)||0;
                    data[6]=parseInt(data[6],10)||0;
                }else{
                    data[6]=data[5]=undefined;
                }
                var FlashData=_this._fixFlashData(data[0],data[3],data[2],data[6],data[5]);
                var cache_id=_this.setCache(FlashData);
                var style=FlashData.abs?';position:absolute; top:'+FlashData.top+'px'+';left:'+FlashData.left+'px;':'';
                html='<img src="/ac/b.gif" alt="flash" class="'+_this.config.cssClassName+'" style="width:'+FlashData.width+'px;height:'+FlashData.height+'px;'+style+'" cache_id="'+cache_id+'" />';
                _this.editor.insertHtml({
                    content:html
                });
            }
            try{
                QZONE.FP._t.g_arrQZEditorReturnVal[id]=null;
            }catch(e){};

            _this.closePanel();
        };

        _this.showPanel();
    },
    onSetContent:function(str){
        var _this=this;
        str=str.replace(/<object([^>]+)>(.*?)<\/object>/ig,function(){
            try{
                if(/class=("|')*blog_flash/i.test(arguments[1])){
                    var res=/(<embed([^>]+)>)/ig.exec(arguments[2]);
                    if(!!res){
                        return res[1];
                    }
                }
            }catch(err){}
        return arguments[0];
    });
str=str.replace(/<embed([^>]+)>/ig,function(){
    try{
        if(/class=("|')*blog_flash/i.test(arguments[1])){
            var width=/width="([^"]+)"/i.exec(arguments[1])||[];
            var height=/height="([^"]+)"/i.exec(arguments[1])||[];
            var src=/src="([^"]+)"/i.exec(arguments[1])||[];
            var _top=/top\:([^px]+)/i.exec(arguments[1])||[];
            var left=/left:([^px]+)/i.exec(arguments[1])||[];
            var FlashData=_this._fixFlashData(src[1],width[1],height[1],_top[1],left[1]);
            var absStyle=FlashData.abs?';position:absolute; top:'+FlashData.top+'px'+';left:'+FlashData.left+'px;':'';
            var cache_id=_this.setCache(FlashData);
            return'<img src="/ac/b.gif" class="blog_flash'+'" style="width:'+FlashData.width+'px;height:'+FlashData.height+'px;'+absStyle+'" cache_id="'+cache_id+'" />';
        }
    }catch(err){}
    return arguments[0];
});
return str;
},
toggleflashInfoPanel:function(ev,hide){
    var tag;
    if(!ev||(!ev.target&&!ev.srcElement)){
        tag=ve.dom.event.getTarget();
    }else{
        tag=ev.target||ev.srcElement;
    }
    if(!hide&&tag&&tag.tagName=='IMG'&&ve.dom.hasClass(tag,'blog_flash')){
        if(!this.flashInfoPanel){
            var html=['<strong>Flash地址：</strong><br/>','<input type="text" value="" readonly="readonly"/><br/>','<strong>大小：<span></span></strong>'].join('');
            this.flashInfoPanel=document.createElement('div');
            this.flashInfoPanel.className='ve_video_info_tip';
            this.flashInfoPanel.style.display='none';
            this.flashInfoPanel.innerHTML=html;
            document.body.appendChild(this.flashInfoPanel);
        }
        var FlashData=this.getCache(tag.getAttribute('cache_id'));
        FlashData.width=parseInt((tag.width||tag.style.width),10)||FlashData.width;
        FlashData.height=parseInt((tag.height||tag.style.height),10)||FlashData.height;
        var imgReg=this.getEditorEleFrameRegion(tag);
        var left=imgReg.width>300?(imgReg.left+imgReg.width-265)+'px':(imgReg.left+imgReg.width+3)+'px';
        var top=imgReg.height>100?(imgReg.top+imgReg.height-75)+'px':(imgReg.top+imgReg.height+3)+'px';
        this.flashInfoPanel.style.left=left;
        this.flashInfoPanel.style.top=top;
        this.flashInfoPanel.style.display='';
        this.flashInfoPanel.getElementsByTagName('span')[0].innerHTML=FlashData.width+'x'+FlashData.height;
        this.flashInfoPanel.getElementsByTagName('input')[0].value=FlashData.source;
    }else if(this.flashInfoPanel){
        this.flashInfoPanel.style.display='none';
    }
},
_fixFlashData:function(source,width,height,top,left){
    var Data={
        'source':source,
        'width':parseInt(width,10)||this.config.defaultFlashWidth,
        'height':parseInt(height,10)||this.config.defaultFlashHeight,
        'top':top||0,
        'left':left||0,
        'abs':!(top===undefined)
        }
    return Data;
},
onGetContent:function(str){
    var _this=this;
    str=str.replace(/<img([^>]+)>/ig,function(){
        try{
            if(/class=("|')*blog_flash/i.test(arguments[1])){
                var cache_id=/cache_id="([^"]+)"/i.exec(arguments[1]);
                var FlashData=_this.getCache(cache_id[1]);
                var w=/width="([^"]+)"/i.exec(arguments[1])||[];
                var h=/height="([^"]+)"/i.exec(arguments[1])||[];
                FlashData.width=(w&&w[1])?w[1]:FlashData.width;
                FlashData.height=(h&&h[1])?h[1]:FlashData.height;
                if(FlashData.source){
                    var flag=_this.isInWhiteList(FlashData.source);
                    var isQQSound=/qzone\/flashmod\/ivrplayer\/ivrplayer.swf/i.test(FlashData.source);
                    var style=FlashData.abs?' style="position:absolute;left:'+FlashData.left+'px; top:'+FlashData.top+'px"':'';
                    var embed_html='<embed class="blog_flash" id="'+Math.random()+'" menu="false" invokeURLs="false" allowNetworking="'+(flag?'all':'internal')+'" allowFullScreen="'+
                    (flag?'true':'false')+'" allowscriptaccess="'+(flag?'always':'never')+'"'+((isQQSound&&flag)?(' flashvars="autoplay=1"'):'')+' wmode="transparent" src="'+FlashData.source+'" height="'+FlashData.height+'" width="'+FlashData.width+'"'+style+'/>';
                    return embed_html;
                }
            }
        }catch(err){}
    return arguments[0];
});
return str;
}
});
ve.plugin.register('qzoneflash',VEditor.plugin.QzoneFlash);
})(VEditor);
(function(ve){
    var loadImageQueue=function(imgSrcList,callback){
        var len=imgSrcList.length;
        var count=0;
        var infoList={};

        var allDone=function(){
            var result=[];
            ve.lang.each(imgSrcList,function(item,index){
                result.push(infoList[item]);
            });
            callback(result);
        };

        ve.lang.each(imgSrcList,function(src){
            infoList[src]={
                width:null,
                height:null,
                src:src
            };

            var img=new Image();
            img.onload=function(){
                infoList[this.src]={
                    width:this.width,
                    height:this.height,
                    src:this.src
                    };

                if(++count==len){
                    allDone();
                }
            };

        img.onerror=function(){
            if(++count==len){
                allDone();
            }
        };

        img.src=src;
    });
};

ve.lang.Class('VEditor.plugin.QzoneImage:VEditor.plugin.QzoneMedia',{
    editor:null,
    lastBlogAlbumId:null,
    config:{
        baseURL:'http://'+window.IMGCACHE_DOMAIN+'/qzone/app/photo/insert_photo.html#referer=blog_editor',
        blogType:null,
        panel:{
            url:null,
            name:'插入图片',
            width:610,
            height:490
        },
        cssClassName:'',
        disableScale:false,
        IMG_MAX_WIDTH:870
    },
    init:function(editor,url){
        var _this=this;
        this.editor=editor;
        this.config.blogType=7;
        var goLastAid=0;
        this.editor.addButton('ImageButton',{
            to:'group4',
            at:1,
            'class':'veInsertImage',
            title:'插入图片',
            cmd:function(){
                QZONE.FP._t.insertPhotoContent=null;
                _this.config.panel.url=([_this.config.baseURL,'&blog_type=',_this.blogType,'&uin=',QZBlog.Util.getSpaceUin(),'&goLastAid='+goLastAid,]).join('');
                goLastAid=1;
                _this.showPanel();
            }
        });
    this.setSetContentFilter(function(html){
        return _this.onSetContent(html);
    });
},
popupCallback:function(){
    var _this=this;
    var data=QZONE.FP._t.insertPhotoContent;
    if(data&&data.photos&&data.photos.length){
        this.lastBlogAlbumId=data.lastAlbumId;
        var len=data.photos.length;
        var queue=[];
        this.editor.showStatusbar('正在插入图片...',20)
        ve.lang.each(data.photos,function(photo){
            queue.push(photo.url);
        });
        loadImageQueue(queue,function(itemList){
            var htmls=[len>1?'<br/>':''];
            ve.lang.each(itemList,function(item,index){
                if(item.src){
                    var style='';
                    var photoData=data.photos[index];
                    if(item.width&&item.height){
                        var w=item.width,h=item.height;
                        if(w>_this.config.IMG_MAX_WIDTH){
                            h=parseInt((_this.config.IMG_MAX_WIDTH/w)*h,10);
                            w=_this.config.IMG_MAX_WIDTH;
                        }
                        style+=w?'width:'+w+'px;':'';
                        style+=h?'height:'+h+'px':'';
                    }
                    htmls.push('<img src="',QZFL.string.trim(item.src),'" alt="图片"'+(style?' style="'+style+'"':'')+'/>');
                    if(data.needAlbumName&&photoData.name){
                        htmls.push('<br/>照片名称：'+photoData.name);
                    }
                    if(data.needAlbumName&&photoData.albumName){
                        htmls.push('<br/>所属相册：'+'<a href="'+photoData.albumUrl+'">'+photoData.albumName+'</a>');
                    }
                    if(data.needPhotoDesc&&photoData.desc){
                        htmls.push('<br/>照片描述：'+photoData.desc);
                    }
                    if(len>1){
                        htmls.push('<br/><br/>');
                    }
                }
            });
        _this.editor.insertHtml({
            content:htmls.join('')
            });
        setTimeout(function(){
            _this.editor.resize();
            _this.editor.hideStatusbar();
        },100);
    });
}
this.closePanel();
    QZONE.FP._t.insertPhotoContent=null;
},
onSetContent:function(str){
    var result;
    result=str.replace(/<img([^>]+)>/ig,function(){
        try{
            var str=arguments[1];
            var orgSrc=/orgsrc="([^"]+)"/i.exec(str);
            orgSrc=orgSrc&&orgSrc[1]?orgSrc[1]:'';
            var osrc=/ORIGINSRC="([^"]+)"/i.exec(str);
            osrc=osrc&&osrc[1]?osrc[1]:'';
            if(orgSrc||osrc){
                str=str.replace(/(\bsrc=["|'](.*?)["|'])/ig,function(){
                    return' src="'+(osrc||orgSrc)+'"';
                });
                str=str.replace(/\borgsrc=["|'](.*?)["|']/ig,'');
                str=str.replace(/\bORIGINSRC=["|'](.*?)["|']/ig,'');
            }
            return'<img'+str+'/>';
        }catch(err){}
        return arguments[0];
    });
    return result||str;
}
});
ve.plugin.register('qzoneimage',VEditor.plugin.QzoneImage);
})(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.QzoneMusic:VEditor.plugin.QzoneMedia',{
        editor:null,
        config:{
            baseURL:'http://'+window.IMGCACHE_DOMAIN+'/music/musicbox_v2_1/doc/blog_add_song.html',
            panel:{
                url:null,
                name:'插入音乐',
                width:640,
                height:330
            },
            pUrl:'',
            pAlbumId:'',
            cssClassName1:'blog_music',
            cssClassName2:'blog_music_multiple',
            disableScale:true
        },
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.config.panel.url=this.config.baseURL+'?editorid='+this.editor.editorId;
            this.editor.addButton('MusicButton',{
                to:'group4',
                at:1,
                'class':'veInsertMusic',
                title:'插入音乐',
                cmd:function(){
                    top.popupCallback=function(){
                        var id=_this.editor.editorId;
                        if(top.g_arrQZEditorReturnVal&&top.g_arrQZEditorReturnVal[id]){
                            var data=top.g_arrQZEditorReturnVal[id];
                            var arr=data.split("|");
                            var cache_id=_this.setCache(data);
                            var html='<img src="/ac/b.gif" alt="音乐" cache_id="'+cache_id+'" class="'+(arr.length>7?_this.config.cssClassName2:_this.config.cssClassName1)+'" onresizestart="return false;"/>';
                            _this.editor.insertHtml({
                                content:html
                            });
                        }
                        try{
                            top.g_arrQZEditorReturnVal[id]=null;
                        }catch(ex){
                            window.console&&console.log(ex);
                        };

                        _this.closePanel();
                    };

                    _this.showPanel();
                }
            });
        this.setSetContentFilter(function(html){
            return _this.onSetContent(html);
        });
        this.setGetContentFilter(function(html){
            return _this.onGetContent(html);
        });
    },
    onSetContent:function(html){
        var _this=this;
        try{
            str=html.replace(/<object([^>]+)>(.*?)<\/object>/ig,function(){
                try{
                    if(/class=("|')*blog_music/i.test(arguments[1])){
                        var data=/ ubb="([^"]+)"/i.exec(arguments[1]);
                        var arr=data[1].split("|");
                        var cache_id=_this.setCache(data[1]);
                        return'<img src="/ac/b.gif" alt="音乐" cache_id="'+cache_id+'" class="'+(arr.length>7?_this.config.cssClassName2:_this.config.cssClassName1)+'" onresizestart="return false;"/> ';
                    }
                }catch(err){
                console.log('qzonemusic onSetContent err ',err);
            }
                return arguments[0];
            });
    }catch(e){
        console.log('qzonemusic onSetContent err',e);
    }
        return str||html;
    },
    onGetContent:function(str){
        var _this=this;
        var count=0;
        str=str.replace(/<img([^>]+)>/ig,function(){
            try{
                if(/class=("|')*blog_music/i.test(arguments[1])){
                    var cache_id=/cache_id="([^"]+)"/i.exec(arguments[1]);
                    var data=_this.getCache(cache_id[1]);
                    ++count;
                    var arr=data.split("|");
                    var src='http://'+IMGCACHE_DOMAIN+'/music/musicbox_v2_1/img/MusicFlash.swf';
                    var height=(arr.length>7)?190:100;
                    var width=(arr.length>7?440:410);
                    var id="musicFlash"+(count-1);
                    var name="musicFlash**";
                    var _class="blog_music";
                    var ubb=data;
                    return'<object'+' codeBase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=8,0,0,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+width+'"'+' height="'+height+'"'+' src="'+src+'"'+' bgcolor="#ffffff" menu="true" allowScriptAccess="always" name="'+name+'" id="'+id+'" ubb="'+ubb+'" class="'+_class+'">'+'<param name="movie" value="'+src+'" />'+'<param name="data" value="'+src+'" />'+'<param name="bgColor" value="#ffffff" />'+'<param name="wmode" value="transparent" />'+'<param name="menu" value="true" />'+'<param name="allowScriptAccess" value="always" />'+'</object>';
                }
            }catch(err){}
            return arguments[0];
        });
    return str;
}
});
ve.plugin.register('qzonemusic',VEditor.plugin.QzoneMusic);
})(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.QzoneQQShowBubble:VEditor.plugin.QzoneMedia',{
        editor:null,
        config:{
            baseURL:'http://ptlogin2.qq.com/showbub?uin='+QZONE.cookie.get('zzpaneluin')+'&clientkey='+QZONE.cookie.get('zzpanelkey'),
            panel:{
                url:null,
                name:'插入QQ秀泡泡',
                width:900,
                height:505
            },
            pUrl:'',
            pAlbumId:'',
            cssClassName:'',
            disableScale:true,
            cacheKeyPre:'image_'
        },
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.editor.addButton('QQShowBubbleButton',{
                to:'group4',
                at:1,
                'class':'veInsertQQShowBubble',
                title:'插入QQ秀泡泡',
                cmd:function(){
                    _this.config.panel.url=_this.config.baseURL+(!!_this.config.pUrl?('&url='+_this.config.pUrl.URLencode()):'')+(!!_this.config.pAlbumId?("&albid="+_this.config.pAlbumId):'');
                    parent._tempQFCallback=function(url,width,height,sContent){
                        var html='<img src="'+url+'" transimg="1" alt="'+sContent+'" style="height:'+height+'px; width:'+width+'px"/>'
                        _this.editor.insertHtml({
                            content:html
                        });
                        _this.closePanel();
                    };

                    _this.showPanel();
                }
            });
    }
    });
ve.plugin.register('qzoneqqshowbubble',VEditor.plugin.QzoneQQShowBubble);
})(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.QzoneVideo:VEditor.plugin.QzoneMedia',{
        editor:null,
        videoInfoPanel:null,
        config:{
            baseURL:'http://'+IMGCACHE_DOMAIN+'/qzone/app/video/htmlout/blog.html',
            panel:{
                url:null,
                name:'插入视频',
                width:526,
                height:450
            },
            cssClassName:'blog_video',
            disableScale:false,
            defaultVideoWidth:500,
            defaultVideoHeight:425
        },
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.config.panel.url=this.config.baseURL+'?editorid='+this.editor.editorId;
            this.editor.addButton('VideoButton',{
                to:'group4',
                at:1,
                'class':'veInsertVideo',
                title:'插入视频',
                cmd:function(){
                    QZONE.FP._t.popupCallback=function(){
                        try{
                            var id=_this.editor.editorId;
                            var data=QZONE.FP._t.g_arrQZEditorReturnVal[id];
                            if(data){
                                var VideoData;
                                if(data[0]<2){
                                    VideoData=_this._fixVideoData(data[1],data[2],data[3],null,null,null,null,data[5],data[4]);
                                }else{
                                    VideoData=_this._fixVideoData(data[1],data[4],data[3],null,null,null,null,data[7],data[8]);
                                }
                                var cache_id=_this.setCache(VideoData);
                                var html=(['<img src="'+(VideoData.thumb||'/ac/b.gif')+'" alt="视频" cache_id="',cache_id,'" class="',_this.config.cssClassName,'" style="width:',VideoData.width,'px; height:',VideoData.height,'px"/>']).join('');
                                _this.editor.insertHtml({
                                    content:html
                                });
                            }
                            QZONE.FP._t.g_arrQZEditorReturnVal[id]=null;
                            _this.closePanel();
                        }catch(ex){};

                };

                _this.showPanel();
            }
            });
    this.editor.onMouseDown.add(function(ev){
        _this.toggleVideoInfoPanel();
    });
    this.editor.onKeyDown.add(function(ev){
        _this.toggleVideoInfoPanel(ev,true);
    });
    ve.dom.event.add(document.body,'click',function(ev){
        var tag=QZFL.event.getTarget(ev);
        if(_this.videoInfoPanel&&(tag==_this.videoInfoPanel||QZFL.dom.isAncestor(_this.videoInfoPanel,tag))){}else{
            _this.toggleVideoInfoPanel(ev,true);
        }
    });
    this.setSetContentFilter(function(html){
        return _this.onSetContent(html);
    });
    this.setGetContentFilter(function(html){
        return _this.onGetContent(html);
    });
},
onSetContent:function(str){
    var result,_this=this;
    result=str.replace(/<object([^>]+)>(.*?)<\/object>/ig,function(){
        try{
            if(/class=("|')*[blog_video|blog_qqVideo]/i.test(arguments[1])){
                var res=/(<embed([^>]+)>)/ig.exec(arguments[2]);
                if(!!res){
                    return res[1];
                }
            }
        }catch(err){}
    return arguments[0];
});
result=result.replace(/<embed([^>]+)>/ig,function(){
    try{
        if(/class=("|')*[blog_video|blog_qqVideo]/i.test(arguments[1])){
            var w=/width="([^"]+)"/i.exec(arguments[1])||[];
            var h=/height="([^"]+)"/i.exec(arguments[1])||[];
            var loop=/loop="([^"]+)"/i.exec(arguments[1])||[];
            var autostart=/autostart="([^"]+)"/i.exec(arguments[1])||[];
            var autoplay=/autoplay="([^"]+)"/i.exec(arguments[1])||[];
            var videoThumb=/videothumb="([^"]+)"/i.exec(arguments[1])||[];
            var videoTitle=/videotitle="([^"]+)"/i.exec(arguments[1])||[];
            var src=/src="([^"]+)"/i.exec(arguments[1]);
            var count=0;
            var VideoData=_this._fixVideoData(src[1],w[1],h[1],loop[1],autostart[1],autoplay[1],null,videoThumb[1],decodeURI(videoTitle[1]).replace(/\%2b/ig,'+'));
            var cache_id=_this.setCache(VideoData);
            return(['<img src="'+(VideoData.thumb||'/ac/b.gif')+'" class="blog_video" style="width:',VideoData.width,'px;height:',VideoData.height,'px;" cache_id="',cache_id,'" />']).join('');
        }
    }catch(err){}
    return arguments[0];
});
return result||str;
},
onGetContent:function(html){
    var _this=this;
    str=html.replace(/<img([^>]+)>/ig,function(){
        try{
            if(/class=("|')*[blog_video|blog_qqVideo]/i.test(arguments[1])){
                var cache_id=/cache_id="([^"]+)"/i.exec(arguments[1]);
                VideoData=_this.getCache(cache_id[1]);
                var w=/width="([^"]+)"/i.exec(arguments[1])||[];
                var h=/height="([^"]+)"/i.exec(arguments[1])||[];
                VideoData.width=(w&&w[1])?w[1]:VideoData.width;
                VideoData.height=(h&&h[1])?h[1]:VideoData.height;
                if(VideoData){
                    var isQQVideo=/^http:\/\/((\w+\.|)(video|v|tv)).qq.com/i.test(VideoData.source);
                    var embed_html=(['<embed class="blog_video" type="application/x-shockwave-flash" ','allownetworking="',(_this.isInWhiteList(VideoData.source)?'all" allowScriptAccess="always" ':'internal" '),'id="blog_video_',(new Date()).getTime(),'" enablecontextmenu="False" ','width="',VideoData.width,'" ','videothumb="',VideoData.thumb,'" ','videotitle="',URIencode(VideoData.title).replace(/\+/g,'%2b'),'" ','height="',VideoData.height,'" ','loop="',VideoData.loop,'" autostart="',VideoData.autostart,'" wmode="opaque" showstatusbar="1" invokeurls="false" allowfullscreen="true" ','src="',VideoData.source,'"/>']).join('');
                    if(!isQQVideo){
                        return embed_html;
                    }
                    var html=(['<object class="blog_video" type="application/x-shockwave-flash" id="blog_video_o_',(new Date()).getTime(),'" data="',VideoData.source,'"','codeBase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=8,0,0,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ','width="',VideoData.width,'" height="',VideoData.height,'">','<param name="loop" value="',VideoData.loop,'" />','<param name="autostart" value="',VideoData.autostart,'" />','<param name="movie" value="',VideoData.source,'" />','<param name="allowFullScreen" value="true" />','<param name="wmode" value="opaque" />','<param name="allowScriptAccess" value="always" />','<param name="allownetworking" value="all" />',embed_html,'</object>']).join('');
                    return html;
                }
            }
        }catch(err){
        console&&console.log('qzonevideo onGetContent',err);
    }
    return arguments[0];
});
return str;
},
_fixVideoData:function(source,width,height,loop,autostart,autoplay,allowfullscreen,thumb,title){
    var vD={
        'source':source,
        'width':parseInt(width,10)||this.config.defaultVideoWidth,
        'height':parseInt(height,10)||this.config.defaultVideoHeight,
        'loop':(loop&&(loop==1||loop.toLowerCase()=='true'))?'true':'false',
        'autostart':(autostart&&(autostart==1||autostart.toLowerCase()=='true'))?'true':'false',
        'allowfullscreen':(allowfullscreen&&(allowfullscreen==1||allowfullscreen.toLowerCase()=='true'))?'true':'false',
        'autoplay':(autoplay&&(autoplay==1||autoplay.toLowerCase()=='true'))?'true':'false',
        'thumb':thumb||null,
        'title':title
    }
    return vD;
},
toggleVideoInfoPanel:function(ev,hide){
    var tag;
    if(!ev||(!ev.target&&!ev.srcElement)){
        tag=ve.dom.event.getTarget();
    }else{
        tag=ev.target||ev.srcElement;
    }
    if(!hide&&tag&&tag.tagName=='IMG'&&ve.dom.hasClass(tag,'blog_video')){
        if(!this.videoInfoPanel){
            var html=['<strong>视频地址：</strong><br/>','<input type="text" value="" readonly="readonly"/><br/>','<strong>大小：<span></span></strong>'].join('');
            this.videoInfoPanel=document.createElement('div');
            this.videoInfoPanel.className='ve_video_info_tip';
            this.videoInfoPanel.style.display='none';
            this.videoInfoPanel.innerHTML=html;
            document.body.appendChild(this.videoInfoPanel);
        }
        var VideoData=this.getCache(tag.getAttribute('cache_id'));
        VideoData.width=parseInt((tag.width||tag.style.width),10)||VideoData.width;
        VideoData.height=parseInt((tag.height||tag.style.height),10)||VideoData.height;
        var imgReg=this.getEditorEleFrameRegion(tag);
        var left=imgReg.width>300?(imgReg.left+imgReg.width-265)+'px':(imgReg.left+imgReg.width+3)+'px';
        var top=imgReg.height>100?(imgReg.top+imgReg.height-75)+'px':(imgReg.top+imgReg.height+3)+'px';
        this.videoInfoPanel.style.left=left;
        this.videoInfoPanel.style.top=top;
        this.videoInfoPanel.style.display='';
        this.videoInfoPanel.getElementsByTagName('span')[0].innerHTML=VideoData.width+'x'+VideoData.height;
        this.videoInfoPanel.getElementsByTagName('input')[0].value=VideoData.source;
    }else if(this.videoInfoPanel){
        this.videoInfoPanel.style.display='none';
    }
}
});
ve.plugin.register('qzonevideo',VEditor.plugin.QzoneVideo);
})(VEditor);
(function(ve){
    var insertedCssLink;
    function loadColorPicker(url,node,editor,onChangeColor,callback){
        var option={
            defaultTab:0,
            needFloat:true,
            realtime:false,
            cssText:''
        };

        var handler=function(){
            var picker=new ColorPicker(node,onChangeColor,option);
            editor.onClick.add(function(){
                picker.hide();
            });
            editor.onBeforeOpenListBox.add(function(){
                picker.hide();
            });
            callback(picker);
        };

        if(window.ColorPicker){
            handler();
        }else{
            var sc=new ve.net.ScriptLoader();
            sc.load(url,{
                callback:function(){
                    handler();
                }
            });
    }
}
ve.lang.Class('VEditor.plugin.GlowFont:VEditor.plugin.QzoneMedia',{
    init:function(editor,url){
        var _this=this;
        _this.editor=editor;
        var pickerUrl=new ve.util.Path().toAbs('plugins/color/colorpicker.js');
        var pickerCss=new ve.util.Path().toAbs('plugins/color/colorpicker.css')
        var colorPicker;
        this.btn=_this.editor.addButton('GlowFont',{
            to:'group2',
            'class':'veGlowFont',
            title:'设置发光字体',
            cmd:function(){
                if(!colorPicker){
                    loadColorPicker(pickerUrl,_this.btn.getDom(),_this.editor,function(color){
                        _this.setGlowFont(color);
                    },function(picker){
                        colorPicker=picker;
                        colorPicker.show();
                    });
                }else{
                    colorPicker.show();
                }
                if(!insertedCssLink){
                    insertedCssLink=true;
                    ve.dom.insertCSSLink(pickerCss);
                }
            }
        });
_this.setGetContentFilter(function(html){
    var str=html.replace(/<span([^>]+)>/ig,function(){
        try{
            var match=arguments[1];
            if(/glowfont=/i.test(match)){
                var tmp=/glowfont="([^"]+)"/i.exec(match);
                var glowFontCss=tmp[1]||'';
                if(glowFontCss){
                    match=match.replace(/\bglowfont="([^"]+)"/i,function(){
                        return'';
                    });
                    if(/style=/i.test(match)){
                        var match=match.replace(/style="([^"]+)"/i,function(){
                            return'style="'+glowFontCss+'"';
                        });
                    }else{
                        return'<span'+match+' style="'+glowFontCss+'">';
                    }
                }
            }
    return'<span'+match+'>';
    }catch(ex){
        return arguments[0];
    }
});
    return str||html;
});
},
setGlowFont:function(color){
    var ed=this.editor;
    var cssText='display:inline-block; '+'color:white; '+'text-shadow:'+'1px 0 4px '+color+',0 1px 4px '+color+',0 -1px 4px '+color+',-1px 0 4px '+color+';'+'filter:glow(color='+color+',strength=3)';
    var rng=ed.getVERange();
    if(rng.startContainer===rng.endContainer&&rng.startContainer.tagName!='BODY'&&ve.dtd.$empty[rng.startContainer.tagName]){}else if(!rng.collapsed){
        ed.history.add();
        rng.setInlineStyle('span',{
            style:cssText,
            glowfont:cssText
        });
        rng.collapse();
        rng.select();
        ed.updateLastVERange();
    }else{
        ed.showStatusbar('您需要选中文字之后再设定发光字',3);
    }
}
});
ve.plugin.register('glowfont',VEditor.plugin.GlowFont);
})(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.QzoneVipFont',{
        editor:null,
        isVip:!!QZONE.FP.getBitMapFlag(27),
        selectListFontEotSrc:'/qzonestyle/act/font/eot/SELECT0.eot',
        selectListFontTTFSrc:'/qzonestyle/act/font/ttf/selectf.ttf',
        specialFontList:[{
            id:'dou',
            name:'豆豆体',
            classPrefix:'qzone_font_dou',
            eotSrc:'/qzonestyle/act/font/eot/TCDOU0.eot',
            ttfSrc:''
        },{
            id:'tao',
            name:'桃心体',
            classPrefix:'qzone_font_tao',
            eotSrc:'/qzonestyle/act/font/eot/TCLOVE0.eot',
            ttfSrc:''
        },{
            id:'xiaohua',
            name:'小花体',
            classPrefix:'qzone_font_xiaohua',
            eotSrc:'/qzonestyle/act/font/eot/TCHUAYU0.eot',
            ttfSrc:''
        },{
            id:'qingxiu',
            name:'清秀体',
            classPrefix:'qzone_font_qingxiu',
            eotSrc:'/qzonestyle/act/font/eot/TCQINGX0.eot',
            ttfSrc:''
        },{
            id:'huajuan',
            name:'花卷体',
            classPrefix:'qzone_font_huajuan',
            eotSrc:'/qzonestyle/act/font/eot/TCHUAJU0.eot',
            ttfSrc:''
        },{
            id:'fountainpen',
            name:'钢笔体',
            classPrefix:'qzone_font_pen',
            eotSrc:'/qzonestyle/act/font/eot/TCGANGB0.eot',
            ttfSrc:''
        }],
        init:function(editor,url){
            this.editor=editor;
            var _this=this;
            this.editor.onInitComplete.add(function(){
                var cm=_this.editor.controlManager;
                fontList=cm.get('fontname');
                for(var i=0;i<_this.specialFontList.length;i++){
                    var key=_this.specialFontList[i].id;
                    var name=_this.specialFontList[i].name;
                    fontList.addItem({
                        item:[key,name+'<img src="/ac/b.gif" class="icon_vip_yl_s"/>','style=\"font-family:sefont\"'],
                        pos:'last'
                    });
                }
                });
        this.editor.onAfterExecCommand.add(function(cmd,ui,val){
            if(cmd=='FontName'){
                for(var i=0;i<_this.specialFontList.length;i++){
                    if(_this.specialFontList[i].id==val){
                        _this.loadFontSource(_this.specialFontList[i]);
                        return;
                    }
                }
                }
        });
this.editor.onSetContent.add(function(str){
    var fontObjList=_this.getSpecialFontListFromStr(str);
    for(var i=0;i<fontObjList.length;i++){
        _this.loadFontSource(fontObjList[i]);
    }
    });
if(ve.ua.ie){
    this.insertStyleSheet('pagestyle','@font-face { font-family: sefont; font-style: normal;font-weight: normal;src: url('+this.selectListFontEotSrc+');}',document);
}else{
    QZFL.css.insertStyleSheet(null,'@font-face {font-style: normal; font-weight: normal; font-family: sefont; src: url('+this.selectListFontTTFSrc+') format("opentype");}');
}
QZFL.css.insertStyleSheet(null,'.veStatusbarContainer a {color:yellow; font-weight:bold; text-decoration:underline; margin-right:2px} \
    .veStatusbarContainer {background-color:rgb(66, 83, 66); filter:Alpha(opacity=50); background-color:rgba(66, 83, 66,0.5)}\
    .veStatusbarContainer_wrap {position:relative;}');
},
getSpecialFontListFromStr:function(strHtml){
    var arr=[];
    var _this=this;
    strHtml=strHtml.replace(/<(font|span)([^>]+)>/ig,function(){
        var res=/face=("|)([^"\s]+)("|)/.exec(arguments[2]);
        if(res&&res[2]){
            for(var i=0;i<_this.specialFontList.length;i++){
                if(res[2].indexOf(_this.specialFontList[i].id)!=-1){
                    arr.push(_this.specialFontList[i]);
                }
            }
            }
    return arguments[0];
});
strHtml=strHtml.replace(/<(div|span)([^>]+)>(.*?)<\/(div|span)[^>]*>/ig,function(){
    var res=/font-family: ([^;]+)/ig.exec(arguments[2]);
    if(res&&res[1]){
        for(var i=0;i<_this.specialFontList.length;i++){
            if(res[1].indexOf(_this.specialFontList[i].id)!=-1){
                arr.push(_this.specialFontList[i]);
            }
        }
        }
return arguments[0];
});
return QZFL.lang.uniqueArray(arr);
},
loadFontSource:function(fontObj,callback){
    if(!ve.ua.ie){
        this.editor.showStatusbar('<a target="_blank" class="unline c_tx" href="http://qzone.qq.com/helpcenter/yellow_info.htm?56">个性字体</a>仅在IE浏览器下才可查看效果，请更换浏览器或选择其它字体。');
    }else if(!this.isVip){
        this.editor.showStatusbar('个性字体仅限黄钻用户使用，普通用户发表日志后无法显示个性效果。\
     <a class="unline c_tx" href="http://paycenter.qq.com/home?aid=zone.font" target="_blank">加入黄钻贵族</a>\
     <a target="_blank" class="unline c_tx" href="http://qzone.qq.com/helpcenter/yellow_info.htm?56" target="_blank">个性字体使用帮助</a>');
    }else{
        this.editor.showStatusbar('正在加载个性字体...',4);
    }
    var rules='@font-face { font-family: '+fontObj.id+'; font-style: normal;font-weight: normal;src: url('+fontObj.eotSrc+');}';
    this.insertStyleSheet('pagestyle',rules,this.editor.getDoc());
},
insertStyleSheet:function(sheetId,rules,doc){
    var styleNode=doc.getElementById(sheetId);
    if(!styleNode){
        var styleNode=doc.createElement("style");
        styleNode.type='text/css';
        if(sheetId){
            styleNode.id=sheetId;
        }
        doc.getElementsByTagName("head")[0].appendChild(styleNode);
    }
    var sheet=styleNode.sheet||doc.styleSheets[sheetId];
    if(ve.ua.ie){
        sheet.cssText+=rules;
    }else{
        sheet.insertRule(rules,0);
    }
    return styleNode.sheet||styleNode;
}
});
ve.plugin.register('qzonevipfont',ve.plugin.QzoneVipFont);
})(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.QzoneVphoto:VEditor.plugin.QzoneMedia',{
        editor:null,
        config:{
            defaultVideoWidth:520,
            defaultVideoHeight:390
        },
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.setSetContentFilter(function(html){
                return _this.onSetContent(html);
            });
            this.setGetContentFilter(function(html){
                return _this.onGetContent(html);
            });
        },
        onSetContent:function(str){
            var _this=this;
            str=str.replace(/<object([^>]+)>(.*?)<\/object>/ig,function(){
                try{
                    if(/class=("|')*blog_album/i.test(arguments[1])){
                        var res=/(<embed([^>]+)>)/ig.exec(arguments[2]);
                        if(!!res){
                            return res[1];
                        }
                    }
                }catch(err){}
            return arguments[0];
        });
    str=str.replace(/<embed([^>]+)>/ig,function(){
        try{
            if(/class=("|')*blog_album/i.test(arguments[1])){
                var w=/width="([^"]+)"/i.exec(arguments[1])||[];
                var h=/height="([^"]+)"/i.exec(arguments[1])||[];
                var loop=/loop="([^"]+)"/i.exec(arguments[1])||[];
                var autostart=/autostart="([^"]+)"/i.exec(arguments[1])||[];
                var autoplay=/autoplay="([^"]+)"/i.exec(arguments[1])||[];
                var src=/src="([^"]+)"/i.exec(arguments[1]);
                var imgurl=/imgurl="([^"]+)"/i.exec(arguments[1]);
                var count=0;
                var VideoData=_this._fixVideoData(src[1],w[1],h[1],loop[1],autostart[1],autoplay[1],null,imgurl[1]);
                var cache_id=_this.setCache(VideoData);
                return(['<img src="',VideoData.imgurl,'" class="blog_album" style="width:',VideoData.width,'px;height:',VideoData.height,'px;" cache_id="',cache_id,'" />']).join('');
            }
        }catch(err){}
        return arguments[0];
    });
    return str;
},
onGetContent:function(html){
    var _this=this;
    str=html.replace(/<img([^>]+)>/ig,function(){
        try{
            if(/class=("|')*blog_album/i.test(arguments[1])){
                var cache_id=/cache_id="([^"]+)"/i.exec(arguments[1]);
                VideoData=_this.getCache(cache_id[1]);
                if(VideoData){
                    var embed_html=(['<embed class="blog_album" type="application/x-shockwave-flash" ','allownetworking="',(_this.isInWhiteList(VideoData.source)?'all" allowScriptAccess="always" ':'internal" '),'id="blog_album_',(new Date()).getTime(),'" enablecontextmenu="False" ','width="',VideoData.width,'" ','height="',VideoData.height,'" ',(VideoData.imgurl?'imgurl="'+VideoData.imgurl+'" ':''),'loop="',VideoData.loop,'" autostart="',VideoData.autostart,'" showstatusbar="1" invokeurls="false" allowfullscreen="true" ','src="',VideoData.source,'"/>']).join('');
                    return embed_html;
                }
            }
        }catch(err){}
    return arguments[0];
});
return str;
},
_fixVideoData:function(source,width,height,loop,autostart,autoplay,allowfullscreen,imgurl){
    var vD={
        'source':source,
        'width':parseInt(width,10)||this.config.defaultVideoWidth,
        'height':parseInt(height,10)||this.config.defaultVideoHeight,
        'loop':(loop&&(loop==1||loop.toLowerCase()=='true'))?'true':'false',
        'autostart':(autostart&&(autostart==1||autostart.toLowerCase()=='true'))?'true':'false',
        'allowfullscreen':(allowfullscreen&&(allowfullscreen==1||allowfullscreen.toLowerCase()=='true'))?'true':'false',
        'autoplay':(autoplay&&(autoplay==1||autoplay.toLowerCase()=='true'))?'true':'false',
        'imgurl':imgurl
    }
    return vD;
}
});
ve.plugin.register('qzonevphoto',VEditor.plugin.QzoneVphoto);
})(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.ScreenShot',{
        editor:null,
        uploader:null,
        uploadURL:null,
        userLocation:null,
        bCheckUserLocationSending:false,
        DIYClipBoardImg:0,
        loginUin:null,
        blogType:"7",
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.editor.addButton('showScreenShotPanel',{
                to:'group4',
                at:2,
                'class':'veScreen',
                title:'截屏',
                cmd:function(){
                    _this.start();
                }
            });
        this.editor.onPaste.add(function(e){
            _this.pasteEvent(e);
        });
        this.editor.onInitComplete.add(function(){
            ve.dom.event.add(_this.editor.getDoc(),'contextmenu',function(){
                _this.updateContextMenu();
            });
            _this.editor.onKeyDown.add(function(e){
                _this.pasteEvent(e);
            });
        });
        this.loginUin=QZONE.FP._t.g_iLoginUin;
    },
    start:function(){
        if(this.checkBrowserCompitable()){
            this.doCapture();
        }
    },
    checkBrowserCompitable:function(){
        return true;
    },
    doCapture:function(){
        var _this=this;
        var screencapture=this.getCaptureObject('ScreenCapture');
        if(!screencapture){
            this.showInstallCaptureObjectGuild();
            return;
        }
        screencapture.OnCaptureFinished=function(){
            _this.prePaste();
            screencapture.BringToFront(window);
            var fileID=screencapture.SaveClipBoardBmpToFile(1);
            _this.uploadPic(fileID);
        };

        screencapture.DoCapture();
    },
    showInstallCaptureObjectGuild:function(){
        this.editor.showStatusbar('您的浏览器还没有安装截屏插件，<a href="http://mail.qq.com/cgi-bin/readtemplate?t=browser_addon&check=false" target="_blank">请点击这里进行安装</a>');
    },
    getCaptureObject:function(id){
        var obj=null;
        try{
            if(ve.ua.ie){
                obj=new ActiveXObject('TXGYMailActiveX.'+id);
            }else{
                if(!document.getElementById("ffScreenPlugin")){
                    var oDiv=document.createElement('div');
                    document.body.appendChild(oDiv);
                    if(ve.ua.firefox){
                        oDiv.innerHTML='<embed id="ffScreenPlugin" type="application/x-tencent-qmail" hidden="true"></embed>';
                    }else{
                        oDiv.innerHTML='<embed id="ffScreenPlugin" type="application/x-tencent-qmail-webkit" hidden="true"></embed>';
                    }
                }
            var pluginObject=document.getElementById('ffScreenPlugin');
            if(id=="ScreenCapture"){
                obj=pluginObject.CreateScreenCapture();
            }
            else if(id=="Uploader"){
                obj=pluginObject.CreateUploader();
            }
        }
    }catch(ex){
    obj=null;
}
    return obj;
},
updateContextMenu:function(){
    var screencapture=this.getCaptureObject('ScreenCapture');
    if(!screencapture){
        return;
    }
    var fileID=screencapture.SaveClipBoardBmpToFile(1);
    if(fileID!=''){
        this._tempFileID=fileID;
    }
    if(screencapture.IsClipBoardImage&&window.clipboardData){
        window.clipboardData.setData("Text","TencentMailPlugin_QZONE");
        this.DIYClipBoardImg=1;
    }
},
pasteEvent:function(e){
    e=e||window.event;
    if(e.ctrlKey&&e.keyCode==17&&e.type!='paste'){
        return;
    }
    if(e.ctrlKey&&(e.keyCode==86)||(e.keyCode==118)||(e.keyCode==59)){
        var screencapture=this.getCaptureObject('ScreenCapture');
        if(!!screencapture&&screencapture.IsClipBoardImage){
            this.editorPaste(e);
            return false;
        }else{
            return true;
        }
    }else if(e.type=='paste'){
    var screencapture=this.getCaptureObject('ScreenCapture');
    if(!!screencapture&&(screencapture.IsClipBoardImage||this._tempFileID)){
        this.editorPaste(e);
        return false;
    }else{
        return true;
    }
}
if(e.ctrlKey&&(e.keyCode==67)||(e.keyCode==99)){
    this.DIYClipBoardImg=0;
}
},
prePaste:function(){
    if(!this.uploader){
        this.uploader=this.getCaptureObject('Uploader');
    }
    if(!this.uploader){
        this.showInstallCaptureObjectGuild();
    }else{
        this.uploader.OnEvent=ve.lang.bind(this,this.uploaderOnEvent);
    }
},
uploaderOnEvent:function(obj,eventID,p1,p2,p3){
    if(eventID==1){
        QZFL.widget.msgbox.show('处理截图预览时遇到错误，请稍后再试。',1,3000);
        this.uploader.OnEvent=null;
    }else if(eventID==2){
        QZFL.widget.msgbox.show('正在处理图片预览，请稍候 : '+Math.round(p1/p2*100)+'%',1);
    }else if(eventID==3){
        if(!this.uploadDone(this.uploader.Response)){
            return;
        };

        this.pasteImg();
    }
},
doPaste:function(){
    var screencapture=this.getCaptureObject('ScreenCapture');
    if(!screencapture){
        return true;
    }
    if(screencapture.IsClipBoardImage){
        this.prePaste();
        screencapture.BringToFront(window);
        var fileID=screencapture.SaveClipBoardBmpToFile(1);
        this.uploadPic(fileID);
        return false;
    }
    if(this.DIYClipBoardImg==1){
        this.prePaste();
        screencapture.BringToFront(window);
        var fileID=this._tempFileID;
        this.uploadPic(fileID);
        return false;
    }
    if(ve.ua.ie&&ve.ua.ie<=6){
        return false;
    }
},
uploadPic:function(fileID){
    var _this=this;
    if(!this.uploadURL){
        this.checkUserLocation(function(){
            _this.uploadPic(fileID);
        });
        return;
    }else if(this.uploadURL=="invalid"){
        var msg="暂时无法获取您当前的地理位置，请稍后再试。"
        QZFL.widget.msgbox.show(msg,1,3000);
        return;
    }
    if(fileID){
        this.uploader.URL=this.uploadURL;
        this.uploader.ClearFormItems();
        this.uploader.AddHeader('cookie',document.cookie);
        this.uploader.AddFormItem('picname2',1,0,fileID);
        this.uploader.AddFormItem('blogtype',0,0,this.blogType);
        this.uploader.AddFormItem('json',0,0,"1");
        this.uploader.AddFormItem('refer',0,0,'blog');
        this.uploader.StartUpload();
    }
},
checkUserLocation:function(callback){
    var _this=this;
    if(this.uploadURL){
        callback();
        return;
    }else if(this.bCheckUserLocationSending){
        setTimeout(function(){
            _this.checkUserLocation(callback);
        },1000);
        return;
    }
    this.bCheckUserLocationSending=true;
    try{
        var cfg=parent.QZONE.dataCenter.get('user_domain_'+this.loginUin);
        this.userLocation=cfg[cfg.domain['default']].u;
    }catch(ex){};

    if(!this.userLocation){
        var url='http://route.store.qq.com/GetRoute?UIN='+this.loginUin+"&type=json&version=2";
        var JG=new QZFL.JSONGetter(url,void(0),null,"GB2312");
        JG.onSuccess=function(data){
            _this.bCheckUserLocationSending=false;
            try{
                _this.userLocation=data[data.domain['default']].u;
            }catch(e){}
            if(_this.userLocation){
                _this.uploadURL="http://"+_this.userLocation+"/cgi-bin/upload/cgi_upload_illustrated";
                callback();
            }else{
                _this.checkUserLocation2(callback);
            }
        };

    JG.onError=JG.onTimeout=function(){
        _this.bCheckUserLocationSending=false;
        _this.checkUserLocation2(callback);
    };

    JG.send("photoDomainNameCallback");
    return;
}else{
    this.uploadURL="http://"+this.userLocation+"/cgi-bin/upload/cgi_upload_illustrated"
    callback();
}
},
checkUserLocation2:function(callback){
    var _this=this;
    if(this.uploadURL){
        callback();
        return;
    }
    if(this.bCheckUserLocationSending){
        setTimeout(function(){
            _this.checkUserLocation2(callback);
        },1000);
        return;
    }
    this.bCheckUserLocationSending=true;
    var url='http://rb.store.qq.com/GetRoute?UIN='+this.loginUin+"&type=json&version=2";
    var JG=new QZFL.JSONGetter(url,void(0),null,"GB2312");
    JG.onSuccess=function(data){
        _this.bCheckUserLocationSending=false;
        try{
            _this.userLocation=data[data.domain['default']].u;
        }catch(e){}
        if(_this.userLocation){
            _this.uploadURL="http://"+_this.userLocation+"/cgi-bin/upload/cgi_upload_illustrated";
            callback();
        }else{
            _this.checkUserLocation2(callback);
        }
    };

JG.onError=JG.onTimeout=function(){
    _this.bCheckUserLocationSending=false;
};

JG.send("photoDomainNameCallback");
return;
},
pasteImg:function(){
    var src=QZFL.dataCenter.get('capturePic');
    QZFL.widget.msgbox.hide();
    try{
        QZONE.FP.closePopup();
    }catch(e){};

    if(typeof(src)!='undefined'){
        var html='<img src="'+src+'" alt="图片"/>';
        this.editor.insertHtml({
            content:html
        });
        QZFL.dataCenter.save("capturePic",null);
    }
},
uploadDone:function(str){
    var _r=/{.*}/ig;
    if(!str.match(_r)){
        QZFL.widget.msgbox.show('上传图片失败，请稍后再试。',1,3000);
        return false;
    }
    var strMsg='';
    var o=eval("("+str+")");
    if(o.error!=null){
        strMsg=o.error;
        QZFL.widget.msgbox.show(strMsg,1,3000);
        return false;
    }
    QZFL.dataCenter.save('capturePic',o.url);
    return true;
},
editorPaste:function(e){
    var _this=this;
    var screencapture=this.getCaptureObject('ScreenCapture');
    if(!screencapture){
        return;
    }
    if(screencapture.IsClipBoardImage||(this.DIYClipBoardImg==1&&window.clipboardData.getData("Text")=="TencentMailPlugin_QZONE")){
        if(!this.uploadURL){
            this.checkUserLocation(function(){
                _this.doPaste();
            });
        }else{
            this.doPaste();
        }
        ve.dom.event.preventDefault(e);
        return false;
    }
}
});
ve.plugin.register('screenshot',VEditor.plugin.ScreenShot);
})(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.QzoneSideAlbum',{
        loginUin:QZBlog.Logic.SpaceHostInfo.getLoginUin(),
        parentWin:QZONE.FP._t,
        parentDoc:QZONE.FP._t.document,
        editor:null,
        panel:null,
        panelState:true,
        styleSheetId:'ve-plugin-qzonesidebaralbum',
        appFrame:null,
        dragTag:null,
        initTop:QZFL.dom.getXY($('blog-editor-toolbar'))[1]+(QZBlog.Logic.isInPengyou?15:0)+2,
        photoLogicSrc:'/qzone/client/photo/pages/qzone_v4/script/photo_logic.js',
        cache_data:{},
        picListPageSize:5,
        picListPageCurIndex:1,
        picListPageCount:1,
        picListCurAlbumId:null,
        init:function(editor,url){
            if(window.screen.width<1280||window.screen.height<720||QZBlog.Util.isOldXWMode()||(parent['g_version']!=6)){
                return;
            }
            QZBlog.Logic.TCISDClick('picsidebar.init','/BlogEditer');
            var _this=this;
            window._VE_QZONE_SIDE_ALBUM_OBJ=this;
            this.editor=editor;
            this.editor.onInitComplete.add(function(){
                _this.setupDragEvent();
            });
            this.appFrame=window.frameElement;
            this.loadPhotoLogicFile(function(){
                _this.initPanel();
                _this.updatePicList(-1);
                setTimeout(function(){
                    _this.updateAlbumList();
                },2000);
            });
            this.bindPageUnloadHandle();
        },
        initPanel:function(){
            var inPengyou=QZBlog.Logic.isInPengyou;
            var _appWidth=QZFL.dom.getSize(this.appFrame)[0]||900;
            _appWidth=inPengyou?920:_appWidth;
            this.panel=this.parentDoc.createElement('div');
            this.panel.className='blog_extendbar';
            this.panel.style.cssText='position:absolute; z-index:5; overflow-x:hidden; width:113px; height:550px; top:'+this.initTop+'px; margin-left:'+(_appWidth+1)+'px;';
            this.panel.innerHTML=(['<a class="blog_foldbt" href="javascript:;">收起<b class="ui_trig ui_trig_t"></b></a><input type="text" style="width:1px;height:1px; display:block; position:absolute; left:99999px"/>','<div class="blog_picshow">','<div class="picshow_hd">','<h4><span id="ve_editor_sideablum_panel_album_title" style="cursor:pointer">最新照片</span></h4>','<div class="picshow_menu">','<a class="menu_hd" href="javascript:;" title="点此查看全部相册列表"><b class="ui_trig ui_trig_b"></b></a>','<div class="menu_bd" style="display:none; max-height:410px">','<ul class="menu_list">','</ul>','</div>','</div>','</div>','<div class="picshow_bd" style="height:420px">','<div class="picshow_list"><div class="list_item"></div></div>','<div class="picshow_nav" style="display:none">','<label class="nav_r" title="下一页"><b class="ui_trig ui_trig_r"></b></label>','<label class="nav_l" title="上一页"><b class="ui_trig ui_trig_l"></b></label>','</div>','</div>','</div>',]).join('');
            this.appFrame.parentNode.insertBefore(this.panel,this.appFrame);
            this.parentWin.QZFL.css.insertCSSLink('http://qzonestyle.gtimg.cn/qzone_v6/blog_extendbar.css',this.styleSheetId);
            this.setupPanelEvent();
            this.setupClickState();
        },
        _getPanelDomBySelector:function(selector){
            return this.parentWin.$e(selector,this.panel).elements[0];
        },
        loadPhotoLogicFile:function(callback){
            QZFL.imports(this.photoLogicSrc,function(data){
                callback&&callback();
            });
        },
        updateAlbumList:function(succCallBack,errCallBack){
            var _this=this;
            _this._getPanelDomBySelector('.menu_bd').innerHTML='<ul class="menu_list"><li class="loading">正在加载...</li></ul>';
            PhotoLogic.getAlbumList({
                uin:_this.loginUin,
                type:15,
                refer:'blog',
                refresh:false,
                callBack:function(d){
                    var html='<ul class="menu_list"><li class="loading">相册数据为空</li></ul>';
                    if(d.albums.length){
                        html='<ul class="menu_list"><li><a href="javascript:;" albumid="-1">最新照片</a></li>';
                        for(var i=0;i<d.albums.length;i++){
                            html+='<li><a href="javascript:;" albumid="'+d.albums[i].id+'" title="'+d.albums[i].name.trim()+'">'+d.albums[i].name.trim()+'</a></li>';
                        }
                        html+='</ul>';
                    }
                    _this._getPanelDomBySelector('.menu_bd').innerHTML=html;
                    if(d.albums.length>14&&QZFL.userAgent.ie==6){
                        _this._getPanelDomBySelector('.menu_bd').style.height='410px';
                    }
                    succCallBack&&succCallBack(d);
                },
                errBack:function(){
                    _this._getPanelDomBySelector('.menu_bd').innerHTML='<ul class="menu_list"><li class="loading_fail"><p>拉取失败</p><i class="ui_ico icon_refresh" rel="refresh-album-list" title="重新拉取"></i></li></ul>';
                    errCallBack&&errCallBack(d);
                }
            });
    },
    updatePicList:function(aid,pageIndex,succCallBack,errCallBack){
        var _this=this;
        pageIndex=pageIndex>0?pageIndex:1;
        aid=aid||_this.picListCurAlbumId;
        if(!aid){
            throw"NO ALBUM ID";
        }
        var cache_key=_this.loginUin+'_'+aid;
        _this.picListCurAlbumId=aid;
        _this.picListPageCurIndex=pageIndex;
        _this._getPanelDomBySelector('.picshow_list').innerHTML='<div class="loading" title="正在加载"></div>';
        QZFL.css.removeClassName(_this._getPanelDomBySelector('.picshow_list'),'picshow_nopic');
        _this._getPanelDomBySelector('.picshow_nav').style.display='none';
        var callback=function(d){
            if(d&&d.photos&&d.photos.length){
                var html='';
                _this.cache_data[cache_key]=d;
                _this.picListPageCount=Math.ceil(d.photos.length/_this.picListPageSize);
                for(var i=(pageIndex-1)*_this.picListPageSize;(i<d.photos.length)&&(i<pageIndex*_this.picListPageSize);i++){
                    html+='<div class="list_item" title="拖动插入到日志"><img src="'+d.photos[i].pre.trim()+'" rel="'+(d.photos[i].origin_url||d.photos[i].url).trim()+'"/></div>';
                }
                _this._getPanelDomBySelector('.picshow_list').innerHTML=html;
                _this._bindImgEffect();
            }else{
                _this.picListPageCount=1;
                _this._getPanelDomBySelector('.picshow_list').innerHTML='<span class="no_pic"></span><p>'+(aid==-1?'无最新照片':'本相册无照片')+'</p>';
                QZFL.css.addClassName(_this._getPanelDomBySelector('.picshow_list'),'picshow_nopic');
            }
            _this._getPanelDomBySelector('.picshow_nav').style.display=_this.picListPageCount<2?'none':'';
            QZFL.css[pageIndex==1?'addClassName':'removeClassName'](_this._getPanelDomBySelector('.nav_l'),'disable');
            QZFL.css[pageIndex==_this.picListPageCount?'addClassName':'removeClassName'](_this._getPanelDomBySelector('.nav_r'),'disable');
            succCallBack&&succCallBack();
        };

        if(_this.cache_data[cache_key]){
            callback(_this.cache_data[cache_key]);
            return;
        }
        _this._getPanelDomBySelector('.picshow_list').innerHTML='<div class="loading" title="加载中"></div>';
        PhotoLogic[(aid==-1?'getNewPhoto':'getPhotoList')]({
            refresh:false,
            uin:_this.loginUin,
            id:aid,
            callBack:callback,
            errBack:function(){
                _this._getPanelDomBySelector('.picshow_list').innerHTML='<span class="pic_break"></span><p><i class="ui_ico icon_refresh" rel="refresh-pic-list" title="重新拉取"></i></p>';
                QZFL.css.addClassName(_this._getPanelDomBySelector('.picshow_list'),'picshow_nopic');
                errCallBack&&errCallBack();
            }
        });
    },
    _bindImgEffect:function(){
        var _this=this;
        var imgs=$e('.picshow_list img',_this.panel).elements;
        for(var i=0;i<imgs.length;i++){
            QZFL.event.addEvent(imgs[i],'load',function(){
                var h=this.style.height||this.height||this.naturalHeight,w=this.style.width||this.width||this.naturalWidth;
                if(h/w>(60/80)){
                    QZFL.css.addClassName(this.parentNode,'show_width');
                }else{
                    QZFL.css.addClassName(this.parentNode,'show_height');
                }
            });
        QZFL.event.addEvent(imgs[i],'mouseover',function(){
            QZFL.css.addClassName(this.parentNode,'cur');
        });
        QZFL.event.addEvent(imgs[i],'mouseout',function(){
            QZFL.css.removeClassName(this.parentNode,'cur');
        });
        }
    },
togglePanel:function(state){
    state=state===undefined?!this.panelState:state;
    this._getPanelDomBySelector('.blog_foldbt').innerHTML=(state?'收起':'展开快速插图')+'<b class="ui_trig '+(state?'ui_trig_t':'ui_trig_b')+'"></b>';
    this._getPanelDomBySelector('.blog_picshow').style.display=state?'':'none';
    this.panelState=state;
},
toggleAlbumSelectPanel:function(state){
    state=state===undefined?(this._getPanelDomBySelector('.menu_bd').style.display=='none'):state;
    this._getPanelDomBySelector('.menu_bd').style.display=(state?'block':'none');
    this._getPanelDomBySelector('.menu_bd').parentNode.className=state?'picshow_menu cur':'picshow_menu';
},
setupPanelEvent:function(container){
    var _this=this;
    var pQZFL=this.parentWin.QZFL;
    pQZFL.event.addEvent(QZONE.FP._t,'scroll',_this._bindPanelScroll);
    pQZFL.event.addEvent(_this._getPanelDomBySelector('.blog_foldbt'),'click',function(){
        _this.togglePanel();
        pQZFL.event.preventDefault();
        return false;
    });
    pQZFL.event.addEvent(this._getPanelDomBySelector('.menu_hd'),'click',function(){
        _this.toggleAlbumSelectPanel();
        pQZFL.event.preventDefault();
        return false;
    });
    pQZFL.event.addEvent(this._getPanelDomBySelector('#ve_editor_sideablum_panel_album_title'),'click',function(){
        _this.toggleAlbumSelectPanel();
        pQZFL.event.preventDefault();
        return false;
    });
    pQZFL.event.addEvent(this.parentDoc.body,'click',_this._hideAlbumSelectPanel);
    pQZFL.event.addEvent(this._getPanelDomBySelector('.menu_bd'),'click',function(e){
        var clickTag=_this.parentWin.QZFL.event.getTarget(e);
        var albumid=clickTag.getAttribute('albumid');
        if(albumid){
            _this.updatePicList(albumid);
            _this._getPanelDomBySelector('.picshow_hd h4 span').innerHTML=clickTag.innerHTML;
            _this._getPanelDomBySelector('.picshow_hd h4 span').title=clickTag.innerHTML.toRealStr();
            ;
            _this.toggleAlbumSelectPanel(false);
        }
        pQZFL.event.preventDefault();
    });
    pQZFL.event.addEvent(this._getPanelDomBySelector('.picshow_list'),'mousedown',function(e){
        var tag=pQZFL.event.getTarget(e);
        if(tag.tagName=='IMG'){
            _this.dragTag=tag;
        }
    });
pQZFL.event.addEvent(this._getPanelDomBySelector('.picshow_list'),'click',function(e){
    var tag=pQZFL.event.getTarget(e);
    if(tag.tagName=='IMG'){
        _this.dragTag=null;
        var id='drag_img_'+Math.random();
        _this.editor.insertHtml({
            content:'<img src="'+tag.getAttribute('rel')+'" id="'+id+'"/>'
            });
        _this.bindImageResize(id);
        _this.bindImgOnloadEvent();
    }
});
pQZFL.event.addEvent(this._getPanelDomBySelector('.picshow_list'),'click',function(e){
    var tag=pQZFL.event.getTarget(e);
    if(tag.getAttribute('rel')=='refresh-pic-list'){
        _this.updatePicList();
        pQZFL.event.preventDefault();
        return false;
    }
});
pQZFL.event.addEvent(this.panel,'click',function(e){
    var tag=pQZFL.event.getTarget(e);
    if(tag.getAttribute('rel')=='refresh-album-list'){
        _this.updateAlbumList();
        pQZFL.event.preventDefault();
        return false;
    }
});
pQZFL.event.addEvent(this._getPanelDomBySelector('.nav_l'),'click',function(){
    if(_this.picListPageCurIndex>1){
        _this.updatePicList(null,_this.picListPageCurIndex-1);
    }
});
pQZFL.event.addEvent(this._getPanelDomBySelector('.nav_r'),'click',function(){
    if(_this.picListPageCurIndex<_this.picListPageCount){
        _this.updatePicList(null,_this.picListPageCurIndex+1);
    }
});
},
bindImgOnloadEvent:function(){
    var _this=this;
    var imgs=this.editor.getDoc().getElementsByTagName('IMG');
    for(var i=0;i<imgs.length;i++){
        QZFL.event.addEvent(imgs[i],'load',function(){
            _this.editor.resize();
        });
    }
    },
_bindPanelScroll:function(e){
    var _this=window._VE_QZONE_SIDE_ALBUM_OBJ;
    var pQZFL=_this.parentWin.QZFL;
    var ie6=QZFL.userAgent.ie==6
    var _scrollTop=pQZFL.dom.getScrollTop();
    var _qzone_toolbar_top=0;
    var _tmp=_this.parentDoc.getElementById('QZ_Toolbar_Container');
    var _toolbarTop=QZFL.dom.getXY($('blog-editor-toolbar'))[1];
    var _appFrameTop=pQZFL.dom.getXY(_this.appFrame)[1];
    var _appFrameHeight=pQZFL.dom.getSize(_this.appFrame)[1];
    if(_tmp&&!ie6){
        _qzone_toolbar_top=QZFL.dom.getSize(_tmp)[1]+(parseInt(_tmp.style.marginTop)||0);
    }
    var _checkTop=_appFrameTop+_toolbarTop;
    _checkTop-=_qzone_toolbar_top;
    var _maxTop=_qzone_toolbar_top+_appFrameHeight+_appFrameTop-pQZFL.dom.getSize(_this.panel)[1];
    if(_checkTop<_scrollTop){
        if(_maxTop<_scrollTop){
            _this.panel.style.position='absolute';
            if(ie6){
                _this.panel.style.marginTop=(_maxTop-_appFrameTop)+'px';
                _this.panel.style.top=_this.initTop-100+'px';
            }else{
                _this.panel.style.marginTop='0px';
                _this.panel.style.top=(_maxTop-_appFrameTop)+'px';
            }
        }else if(ie6){
        _this.panel.style.top=_this.initTop+'px';
        _this.panel.style.marginTop=(_scrollTop-_checkTop)+'px';
    }else{
        _this.panel.style.position='fixed';
        _this.panel.style.top=_qzone_toolbar_top+'px';
    }
}else{
    _this.panel.style.position='absolute';
    _this.panel.style.marginTop=0;
    _this.panel.style.top=_this.initTop+'px';
}
},
_hideAlbumSelectPanel:function(e){
    var _this=window._VE_QZONE_SIDE_ALBUM_OBJ;
    var clickTag=_this.parentWin.QZFL.event.getTarget(e);
    if(!_this.parentWin.QZFL.dom.isAncestor(_this._getPanelDomBySelector('.menu_bd').parentNode,clickTag)&&clickTag!=_this.parentDoc.getElementById('ve_editor_sideablum_panel_album_title')){
        _this.toggleAlbumSelectPanel(false);
    };

},
setupDragEvent:function(){
    var _this=this;
    var _handle=function(){
        if(!_this.dragTag){
            return;
        }else{
            _this.dragTag=null;
            setTimeout(function(){
                var imgs=_this.editor.getBody().getElementsByTagName('IMG');
                for(var i=0;i<imgs.length;i++){
                    if(imgs[i].getAttribute('rel')){
                        imgs[i].id='drag_img_'+Math.random();
                        _this.bindImageResize(imgs[i].id);
                        imgs[i].setAttribute('src',imgs[i].getAttribute('rel'));
                        imgs[i].removeAttribute('rel');
                    }
                    if(QZFL.css.hasClassName(imgs[i].parentNode,'list_item')){
                        QZFL.dom.swapNode(imgs[i].parentNode,imgs[i]);
                    }
                }
            QZBlog.Logic.TCISDClick('picsidebar.dragevent','/BlogEditer');
            },100);
    }
};

QZFL.event.addEvent(_this.editor.getDoc(),'mousemove',_handle);
if(QZFL.userAgent.firefox){
    QZFL.event.addEvent(_this.editor.getDoc(),'drop',function(){
        if(_this.dragTag&&_this.editor.getBody().innerHTML.replace('<div>','').replace('</div>','').replace(' ','')==''){
            var id='drag_img_'+Math.random();
            _this.editor.getBody().innerHTML='<img id="'+id+'" src="'+_this.dragTag.getAttribute('rel')+'"/>';
            _this.bindImageResize(id);
            _this.dragTag=null;
            QZFL.event.preventDefault();
            return false;
        }
    });
}
},
bindImageResize:function(id){
    var maxWidth=this.editor.getBody().offsetWidth-20;
    var img=this.editor.getDoc().getElementById(id);
    if(!img){
        return;
    }
    var width=img.width||img.offsetWidth||img.clientWidth;
    var ed=this.editor;
    if(width&&width>maxWidth){
        img.style.width=(maxWidth-20)+'px';
    }else{
        ve.dom.event.add(img,'load',function(){
            var w=this.width,h=this.height;
            if(w>maxWidth){
                h=parseInt((maxWidth/w)*h,10);
                w=maxWidth;
            }
            this.style.width=w+'px';
            this.style.height=h+'px';
            ed.resize();
        });
    }
    img.removeAttribute('id');
},
setupClickState:function(){
    QZBlog.Logic.TCISDClick.batchBind({
        'a.blog_foldbt':'picsidebar.shouqi',
        'div.picshow_menu a.menu_hd':'picsidebar.xiangcemingxiala',
        'ul.menu_list a':'picsidebar.xiangceming',
        'div.picshow_nav label.nav_r':'picsidebar.fanye',
        'div.picshow_nav label.nav_l':'picsidebar.fanye',
        'div.picshow_list img':'picsidebar.imageclick'
    },{
        url:'/BlogEditer',
        prepare:true,
        container:this.panel,
        eventType:'click'
    });
},
bindPageUnloadHandle:function(){
    if(PageScheduler){
        var pQZFL=this.parentWin.QZFL;
        var _this=this;
        PageScheduler.addEvent('pageunload',function(){
            try{
                pQZFL.event.removeEvent(QZONE.FP._t,'scroll',_this._bindPanelScroll);
                pQZFL.dom.removeElement(_this.styleSheetId);
                pQZFL.dom.removeElement(_this.panel);
                pQZFL.event.removeEvent(_this.parentDoc.body,'click',_this._hideAlbumSelectPanel);
            }catch(ex){
                console.log('侧栏插入图片卸载出错',ex);
            }
        });
    PageScheduler.addEvent('afterDoPreviewBlog',function(){
        _this.panel.style.display='none';
    });
    PageScheduler.addEvent('cancelpreview',function(){
        _this.panel.style.display='';
    });
}
}
});
ve.plugin.register('qzonesidealbum',VEditor.plugin.QzoneSideAlbum);
})(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.QzoneDoc:VEditor.plugin.QzoneMedia',{
        editor:null,
        config:{
            baseURL:'http://'+IMGCACHE_DOMAIN+'/qzone/newblog/v5/dialog/upload_blog.html',
            blogType:null,
            panel:{
                url:null,
                name:'上传文档',
                width:400,
                height:265
            },
            cssClassName:'',
            disableScale:false
        },
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.config.blogType=7;
            this.editor.addButton('DocButton',{
                to:'group4',
                at:7,
                'class':'veUploadWord',
                title:'插入文档',
                cmd:function(){
                    _this.config.panel.url=([_this.config.baseURL,'?blog_type=',_this.blogType,'&uin=',QZBlog.Util.getSpaceUin()]).join('');
                    _this.showPanel();
                }
            });
    },
    popupCallback:function(){
        var data=PAGE_CACHE.get('BlogDocHtml');
        if(!!data){
            data=data.trim();
            this.editor.insertHtml({
                content:data,
                useParser:true
            });
            PAGE_CACHE.remove('BlogDocHtml');
            var docName=PAGE_CACHE.get('BlogDocName');
            if(!!docName&&$("blog-title-input")){
                var title=$("blog-title-input").value.trim("R");
                if(title.length==0||title==$('blog-title-input').getAttribute('placeholder')){
                    var idx=docName.lastIndexOf('.');
                    if(idx>0){
                        docName=docName.substr(0,idx);
                    }
                    PageScheduler.setBlogTitle(docName);
                }
                PAGE_CACHE.remove('BlogDocName');
            }
        }
    }
});
ve.plugin.register('qzonedoc',VEditor.plugin.QzoneDoc);
})(VEditor);
(function(ve){
    ve.lang.Class('VEditor.plugin.QzoneBlogSave',{
        editor:null,
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.editor.onSubmitBlogButtonClick=new ve.EventManager();
            this.editor.addButton('submitBlog',{
                to:'group1',
                at:0,
                'class':'veSubmitBlog',
                title:'发表日志',
                cmd:function(){
                    _this.editor.onSubmitBlogButtonClick.fire();
                }
            });
    }
    });
ve.plugin.register('qzoneblogsave',VEditor.plugin.QzoneBlogSave);
})(VEditor);
(function(ve){
    var CHECK_TIMER;
    ve.lang.Class('VEditor.plugin.QzoneImageAutoSaver',{
        editor:null,
        init:function(editor,url){
            var _this=this;
            this.editor=editor;
            this.editor.onPaste.add(function(){
                _this.checkQuoteExternalImage();
            });
            this.editor.onKeyDown.add(function(){
                _this.checkQuoteExternalImage();
            });
        },
        checkQuoteExternalImage:function(){
            var _this=this;
            clearTimeout(CHECK_TIMER);
            CHECK_TIMER=setTimeout(function(){
                var _html=_this.editor.getBody().innerHTML;
                var extImgs=_this.getExternalImages(_html);
                if(extImgs&&extImgs.length>0){
                    _this.editor.showStatusbar('您日志中的网络图片将在发表后缓存。');
                }else{
                    _this.editor.hideStatusbar();
                }
            },3000);
    },
    getExternalImages:function(html){
        var arr=[];
        if(!html){
            return arr;
        }
        html=html.replace(/<img([^>]+)>/ig,function(){
            try{
                var em=/em\/e(\d{1,3}).gif/i.exec(arguments[1]);
                if(em){
                    return;
                }
                var src=/orgSrc="([^"]+)"/i.exec(arguments[1])||/src="([^"]+)"/i.exec(arguments[1]);if(!src||/ac\/b\.gif/i.test(src[1])){return;}
                if(!/^http:\/\/[^\s]*photo.store.qq.com/i.test(src[1])&&!/.qq.com\//i.test(src[1])&&!/.soso.com\//i.test(src[1])&&!/.paipaiimg.com\//i.test(src[1])&&!/.qpic.cn\//i.test(src[1])&&!/.paipai.com\//i.test(src[1])){
                    arr.push(src[1]);
                }
            }catch(err){
            console.log('err',err);
        }
            return arguments[0];
        });
    return this._uniqueArray(arr);
    },
    _uniqueArray:function(arr){
        if(!arr||!arr.length){
            return arr;
        }
        var flag={},index=0;
        while(index<arr.length){
            if(flag[arr[index]]==typeof(arr[index])){
                arr.splice(index,1);
                continue;
            }
            flag[arr[index].toString()]=typeof(arr[index]);
            ++index;
        }
        return arr;
    }
});
ve.plugin.register('qzoneimageas',VEditor.plugin.QzoneImageAutoSaver);
})(VEditor);/*  |xGv00|86190bf6957c1069cfde14caea424d15 */