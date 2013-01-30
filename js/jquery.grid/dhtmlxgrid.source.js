
//2.6//
var globalActiveDHTMLGridObject;
String.prototype._dhx_trim=function(){
    return this.replace(/&nbsp;/g, " ").replace(/(^[ \t]*)|([ \t]*$)/g, "");
};

function dhtmlxArray(ar){
    return dhtmlXHeir((ar||new Array()), dhtmlxArray._master);
}

dhtmlxArray._master={
    _dhx_find:function(pattern){
        for (var i = 0;i < this.length;i++){
            if (pattern == this[i])return i;
        }

        return -1;
    },
    _dhx_insertAt:function(ind, value){
        this[this.length]=null;
        for (var i = this.length-1;i >= ind;i--)this[i]=this[i-1]
        this[ind]=value
    },
    _dhx_removeAt:function(ind){
        this.splice(ind,1)
    },
    _dhx_swapItems:function(ind1, ind2){
        var tmp = this[ind1];
        this[ind1]=this[ind2]
        this[ind2]=tmp;
    }
};

function dhtmlXGridObject(id){
    if (_isIE)try{
        document.execCommand("BackgroundImageCache", false, true);
    }catch (e){}

    if (id){
        if (typeof (id)== 'object'){
            this.entBox=id
            this.entBox.id="cgrid2_"+this.uid();
        }else
            this.entBox=document.getElementById(id);
    }else {
        this.entBox=document.createElement("DIV");
        this.entBox.id="cgrid2_"+this.uid();
    }

    this.entBox.innerHTML="";
    dhtmlxEventable(this);
    var self = this;
    this._wcorr=0;
    this.cell=null;
    this.row=null;
    this.iconURL="";
    this.editor=null;
    this._f2kE=true;
    this._dclE=true;
    this.combos=new Array(0);
    this.defVal=new Array(0);
    this.rowsAr={};

    this.rowsBuffer=dhtmlxArray();
    this.rowsCol=dhtmlxArray();
    this._data_cache={};

    this._ecache={};

    this._ud_enabled=true;
    this.xmlLoader=new dtmlXMLLoaderObject(this.doLoadDetails, this, true, this.no_cashe);
    this._maskArr=[];
    this.selectedRows=dhtmlxArray();
    this.UserData={};

    this._sizeFix=this._borderFix=0;
    this.entBox.className+=" gridbox";
    this.entBox.style.width=this.entBox.getAttribute("width")
    ||(window.getComputedStyle
        ? (this.entBox.style.width||window.getComputedStyle(this.entBox, null)["width"])
        : (this.entBox.currentStyle
            ? this.entBox.currentStyle["width"]
            : this.entBox.style.width||0))
    ||"100%";
    this.entBox.style.height=this.entBox.getAttribute("height")
    ||(window.getComputedStyle
        ? (this.entBox.style.height||window.getComputedStyle(this.entBox, null)["height"])
        : (this.entBox.currentStyle
            ? this.entBox.currentStyle["height"]
            : this.entBox.style.height||0))
    ||"100%";
    this.entBox.style.cursor='default';
    this.entBox.onselectstart=function(){
        //return true;
        //选择
        return false
    };
    var t_creator=function(name){
        var t=document.createElement("TABLE");
        t.cellSpacing=t.cellPadding=0;
        t.style.cssText='width:100%;table-layout:fixed;';
        t.className=name.substr(2);
        return t;
    };

    this.obj=t_creator("c_obj");
    this.hdr=t_creator("c_hdr");
    this.hdr.style.marginRight="20px";
    this.hdr.style.paddingRight="20px";
    this.objBox=document.createElement("DIV");
    this.objBox.style.width="100%";
    this.objBox.style.overflow="auto";
    this.objBox.appendChild(this.obj);
    this.objBox.className="objbox";
    this.hdrBox=document.createElement("DIV");
    this.hdrBox.style.width="100%"
    this.hdrBox.style.height="25px";
    this.hdrBox.style.overflow="hidden";
    this.hdrBox.className="xhdr";
    this.preloadImagesAr=new Array(0)

    this.sortImg=document.createElement("IMG")
    this.sortImg.style.display="none";
    this.hdrBox.appendChild(this.sortImg)
    this.hdrBox.appendChild(this.hdr);
    this.hdrBox.style.position="relative";
    this.entBox.appendChild(this.hdrBox);
    this.entBox.appendChild(this.objBox);
    this.entBox.grid=this;
    this.objBox.grid=this;
    this.hdrBox.grid=this;
    this.obj.grid=this;
    this.hdr.grid=this;
    this.cellWidthPX=[];
    this.cellWidthPC=[];
    this.cellWidthType=this.entBox.cellwidthtype||"px";
    this.delim=this.entBox.delimiter||",";
    this._csvDelim=",";
    this.hdrLabels=[];
    this.columnIds=[];
    this.columnColor=[];
    this._hrrar=[];
    this.cellType=dhtmlxArray();
    this.cellAlign=[];
    this.initCellWidth=[];
    this.fldSort=[];
    this._srdh=(_isIE && (document.compatMode != "BackCompat") ? 24 : 20);
    this.imgURL=window.dhx_globalImgPath||"";
    this.isActive=false;
    this.isEditable=true;
    this.useImagesInHeader=false;
    this.pagingOn=false;
    this.rowsBufferOutSize=0;
    dhtmlxEvent(window, "unload", function(){
        try{
            if (self.destructor)self.destructor();
        }catch (e){}
    });
this.setSkin=function(name){
    this.skin_name=name;
    this.entBox.className="gridbox gridbox_"+name;
    this.skin_h_correction=0;
    this.enableAlterCss("ev_"+name, "odd_"+name, this.isTreeGrid())
    this._fixAlterCss()

    switch (name){
        case "clear":
            this._topMb=document.createElement("DIV");
            this._topMb.className="topMumba";
            this._topMb.innerHTML="<img style='left:0px' src='"+this.imgURL
            +"skinC_top_left.gif'><img style='right:20px' src='"+this.imgURL+"skinC_top_right.gif'>";
            this.entBox.appendChild(this._topMb);
            this._botMb=document.createElement("DIV");
            this._botMb.className="bottomMumba";
            this._botMb.innerHTML="<img style='left:0px' src='"+this.imgURL
            +"skinD_bottom_left.gif'><img style='right:20px' src='"+this.imgURL+"skinD_bottom_right.gif'>";
            this.entBox.appendChild(this._botMb);
            this.entBox.style.position="relative";
            this.skin_h_correction=20;
            break;
        case "dhx_skyblue":
        case "dhx_web":
        case "glassy_blue":
        case "dhx_black":
        case "dhx_blue":
        case "modern":
        case "light":
            this._srdh=20;
            this.forceDivInHeader=true;
            break;
        case "xp":
            this.forceDivInHeader=true;
            if ((_isIE)&&(document.compatMode != "BackCompat"))
                this._srdh=25;else this._srdh=22;
            break;
        case "mt":
            if ((_isIE)&&(document.compatMode != "BackCompat"))
                this._srdh=25;else this._srdh=22;
            break;
        case "gray":
            if ((_isIE)&&(document.compatMode != "BackCompat"))
                this._srdh=22;
            break;
        case "sbdark":
            break;
    }

    if (_isIE&&this.hdr){
        var d = this.hdr.parentNode;
        d.removeChild(this.hdr);
        d.appendChild(this.hdr);
    }

    this.setSizes();
};

if (_isIE)this.preventIECaching(true);
if (window.dhtmlDragAndDropObject)this.dragger=new dhtmlDragAndDropObject();
this._doOnScroll=function(e, mode){
    this.callEvent("onScroll", [
        this.objBox.scrollLeft,
        this.objBox.scrollTop
        ]);
    this.doOnScroll(e, mode);
};

this.doOnScroll=function(e, mode){
    this.hdrBox.scrollLeft=this.objBox.scrollLeft;
    if (this.ftr)this.ftr.parentNode.scrollLeft=this.objBox.scrollLeft;
    if (mode)return;
    if (this._srnd){
        if (this._dLoadTimer)window.clearTimeout(this._dLoadTimer);
        this._dLoadTimer=window.setTimeout(function(){
            if (self._update_srnd_view)self._update_srnd_view();
        }, 100);
    }
};

this.attachToObject=function(obj){
    obj.appendChild(this.globalBox?this.globalBox:this.entBox);
    this.setSizes();
};

this.init=function(fl){
    if ((this.isTreeGrid())&&(!this._h2)){
        this._h2=new dhtmlxHierarchy();
        if ((this._fake)&&(!this._realfake))
            this._fake._h2=this._h2;
        this._tgc={
            imgURL: null
        }
    }

if (!this._hstyles)return;
this.editStop()

this.lastClicked=null;
this.resized=null;
this.fldSorted=this.r_fldSorted=null;
this.cellWidthPX=[];
this.cellWidthPC=[];
if (this.hdr.rows.length > 0){
    this.clearAll(true);
}

var hdrRow = this.hdr.insertRow(0);
for (var i = 0;i < this.hdrLabels.length;i++){
    hdrRow.appendChild(document.createElement("TH"));
    hdrRow.childNodes[i]._cellIndex=i;
    hdrRow.childNodes[i].style.height="0px";
};

if (_isIE && _isIE<8)hdrRow.style.position="absolute";else
    hdrRow.style.height='auto';
var hdrRow = this.hdr.insertRow(_isKHTML ? 2 : 1);
hdrRow._childIndexes=new Array();
var col_ex = 0;
for (var i = 0; i < this.hdrLabels.length;i++){
    hdrRow._childIndexes[i]=i-col_ex;
    if ((this.hdrLabels[i] == this.splitSign)&&(i != 0)){
        if (_isKHTML)hdrRow.insertCell(i-col_ex);
        hdrRow.cells[i-col_ex-1].colSpan=(hdrRow.cells[i-col_ex-1].colSpan||1)+1;
        hdrRow.childNodes[i-col_ex-1]._cellIndex++;
        col_ex++;
        hdrRow._childIndexes[i]=i-col_ex;
        continue;
    };

    hdrRow.insertCell(i-col_ex);
    hdrRow.childNodes[i-col_ex]._cellIndex=i;
    hdrRow.childNodes[i-col_ex]._cellIndexS=i;
    this.setColumnLabel(i, this.hdrLabels[i]);
};

if (col_ex == 0)hdrRow._childIndexes=null;
this._cCount=this.hdrLabels.length;
if (_isIE)window.setTimeout(function(){
    self.setSizes();
}, 1);
if (!this.obj.firstChild)this.obj.appendChild(document.createElement("TBODY"));
var tar = this.obj.firstChild;
if (!tar.firstChild){
    tar.appendChild(document.createElement("TR"));
    tar=tar.firstChild;
    if (_isIE && _isIE<8)tar.style.position="absolute";else
        tar.style.height='auto';
    for (var i = 0;i < this.hdrLabels.length;i++){
        tar.appendChild(document.createElement("TH"));
        tar.childNodes[i].style.height="0px";
    }
    };

this._c_order=null;
if (this.multiLine != true)this.obj.className+=" row20px";
this.sortImg.style.position="absolute";
this.sortImg.style.display="none";
this.sortImg.src=this.imgURL+"sort_desc.gif";
this.sortImg.defLeft=0;
if (this.noHeader){
    this.hdrBox.style.display='none';
}else {
    this.noHeader=false
};

this.attachHeader();
this.attachHeader(0, 0, "_aFoot");
this.setSizes();
if (fl)this.parseXML()
this.obj.scrollTop=0

if (this.dragAndDropOff)this.dragger.addDragLanding(this.entBox, this);
if (this._initDrF)this._initD();
if (this._init_point)this._init_point();
};

this.setColumnSizes=function(gridWidth){
    var summ = 0;
    var fcols = [];
    for (var i = 0;i < this._cCount;i++){
        if ((this.initCellWidth[i] == "*")&& !this._hrrar[i]){
            this._awdth=false;
            fcols.push(i);
            continue;
        };

        if (this.cellWidthType == '%'){
            if (typeof this.cellWidthPC[i]=="undefined")this.cellWidthPC[i]=this.initCellWidth[i];
            this.cellWidthPX[i]=Math.floor(gridWidth*this.cellWidthPC[i]/100)||0;
        }else{
            if (typeof this.cellWidthPX[i]=="undefined")this.cellWidthPX[i]=this.initCellWidth[i];
        };

        if (!this._hrrar[i])summ+=this.cellWidthPX[i]*1;
    };

    if (fcols.length){
        var ms = Math.floor((gridWidth-summ)/fcols.length);
        if (ms < 0)ms=1;
        for (var i = 0;i < fcols.length;i++){
            var next=Math.max((this._drsclmW ? this._drsclmW[fcols[i]] : 0),ms)
            this.cellWidthPX[fcols[i]]=next;
            summ+=next;
        };

        if(gridWidth > summ){
            var last=fcols[fcols.length-1];
            this.cellWidthPX[last]=this.cellWidthPX[last] + (gridWidth-summ);
            summ = gridWidth;
        };

        this._setAutoResize();
    };

    this.obj.style.width=isNaN(summ) ? "auto" : summ+"px";
    this.hdr.style.width=isNaN(summ) ? "auto" : summ+"px";
    if (this.ftr)this.ftr.style.width=isNaN(summ) ? "auto" : summ+"px";
    this.chngCellWidth();
    return summ;
};

this.setSizes=function(){
    if ((!this.hdr.rows[0])) return;
    var quirks=this.quirks = (_isIE && document.compatMode=="BackCompat");
    var outerBorder=(this.entBox.offsetWidth-this.entBox.clientWidth)/2;
    if (this.globalBox){
        var splitOuterBorder=(this.globalBox.offsetWidth-this.globalBox.clientWidth)/2;
        if (this._delta_x && !this._realfake){
            var ow = this.globalBox.clientWidth;
            this.globalBox.style.width=this._delta_x;
            this.entBox.style.width=Math.max(0,(this.globalBox.clientWidth+(quirks?splitOuterBorder*2:0))-this._fake.entBox.clientWidth)+"px";
            if (ow != this.globalBox.clientWidth){
                this._fake._correctSplit(this._fake.entBox.clientWidth);
            }
        };

    if (this._delta_y && !this._realfake){
        this.globalBox.style.height=this._delta_y;
        this.entBox.style.overflow=this._fake.entBox.style.overflow="hidden";
        this.entBox.style.height=this._fake.entBox.style.height=this.globalBox.clientHeight+(quirks?splitOuterBorder*2:0)+"px";
    }
}else {
    if (this._delta_x){
        if (this.entBox.parentNode.tagName=="TD"){
            this.entBox.style.width="1px";
            this.entBox.style.width=parseInt(this._delta_x)*this.entBox.parentNode.clientWidth/100-outerBorder*2+"px";
        }else
            this.entBox.style.width=this._delta_x;
    };

    if (this._delta_y)this.entBox.style.height=this._delta_y;
};

window.clearTimeout(this._sizeTime);
if (!this.entBox.offsetWidth && (!this.globalBox || !this.globalBox.offsetWidth)){
    this._sizeTime=window.setTimeout(function(){
        self.setSizes()
    }, 250);
    return;
};

var border_x = (((this.entBox.cmp||this._delta_x) && (this.skin_name||"").indexOf("dhx")==0 && !quirks)?2:0);
var border_y = (((this.entBox.cmp||this._delta_y) && (this.skin_name||"").indexOf("dhx")==0 && !quirks)?2:0);
var isVScroll = this.parentGrid?false:(this.objBox.scrollHeight > this.objBox.offsetHeight);
var scrfix = _isFF?18:18;
var gridWidth=this.entBox.clientWidth-(this.skin_h_correction||0)*(quirks?0:1)-border_x;
var gridWidthActive=this.entBox.clientWidth-(this.skin_h_correction||0)-border_x;
var gridHeight=this.entBox.clientHeight-border_y;
var summ=this.setColumnSizes(gridWidthActive-(isVScroll?scrfix:0));
var isHScroll = this.parentGrid?false:((this.objBox.scrollWidth > this.objBox.offsetWidth)||(this.objBox.style.overflowX=="scroll"));
var headerHeight = this.hdr.clientHeight;
var footerHeight = this.ftr?this.ftr.clientHeight:0;
var newWidth=gridWidth;
var newHeight=gridHeight-headerHeight-footerHeight;
if (this._awdth && this._awdth[0] && this._awdth[1]==99999)isHScroll=0;
if (this._ahgr){
    if (this._ahgrMA)newHeight=this.entBox.parentNode.clientHeight-headerHeight-footerHeight;else
        newHeight=this.obj.offsetHeight+(isHScroll?scrfix:0);
    if (this._ahgrM){
        if (this._ahgrF)newHeight=Math.min(this._ahgrM,newHeight+headerHeight+footerHeight)-headerHeight-footerHeight;else
            newHeight=Math.min(this._ahgrM,newHeight);
    };

    if (isVScroll && newHeight>=this.obj.scrollHeight+(isHScroll?scrfix:0)){
        isVScroll=false;
        this.setColumnSizes(gridWidthActive);
    }
};

if ((this._awdth)&&(this._awdth[0])){
    if (this.cellWidthType == '%')this.cellWidthType="px";
    if (this._fake)summ+=this._fake.entBox.clientWidth;
    var newWidth=Math.min(Math.max(summ+(isVScroll?scrfix:0),this._awdth[2]),this._awdth[1]);
    if (this._fake)newWidth-=this._fake.entBox.clientWidth;
};

newHeight=Math.max(0,newHeight);
this._ff_size_delta=(this._ff_size_delta==0.1)?0.2:0.1;
if (!_isFF)this._ff_size_delta=0;
this.entBox.style.width=newWidth+(quirks?2:0)*outerBorder+this._ff_size_delta+"px";
this.entBox.style.height=newHeight+(quirks?2:0)*outerBorder+headerHeight+footerHeight+"px";
this.objBox.style.height=newHeight+((quirks&&!isVScroll)?2:0)*outerBorder+"px";
this.hdrBox.style.height=headerHeight+"px";
if (newHeight != gridHeight)this.doOnScroll(0, !this._srnd);
var ext=this["setSizes_"+this.skin_name];
if (ext)ext.call(this);
this.setSortImgPos();
if (headerHeight != this.hdr.clientHeight && this._ahgr)this.setSizes();
};

this.setSizes_clear=function(){
    var y=this.hdr.offsetHeight;
    var x=this.entBox.offsetWidth;
    var y2=y+this.objBox.offsetHeight;
    this._topMb.style.top=(y||0)+"px";
    this._topMb.style.width=(x+20)+"px";
    this._botMb.style.top=(y2-3)+"px";
    this._botMb.style.width=(x+20)+"px";
};

this.chngCellWidth=function(){
    if ((_isOpera)&&(this.ftr))
        this.ftr.width=this.objBox.scrollWidth+"px";
    var l = this._cCount;
    for (var i = 0;i < l;i++){
        this.hdr.rows[0].cells[i].style.width=this.cellWidthPX[i]+"px";
        this.obj.rows[0].childNodes[i].style.width=this.cellWidthPX[i]+"px";
        if (this.ftr)this.ftr.rows[0].cells[i].style.width=this.cellWidthPX[i]+"px";
    }
    };

this.setDelimiter=function(delim){
    this.delim=delim;
};

this.setInitWidthsP=function(wp){
    this.cellWidthType="%";
    this.initCellWidth=wp.split(this.delim.replace(/px/gi, ""));
    if (!arguments[1])this._setAutoResize();
};

this._setAutoResize=function(){
    if (this._realfake)return;
    var el = window;
    var self = this;
    dhtmlxEvent(window,"resize",function(){
        window.clearTimeout(self._resize_timer);
        if (self._setAutoResize)self._resize_timer=window.setTimeout(function(){
            self.setSizes();
            if (self._fake)self._fake._correctSplit();
        }, 100);
    })
};

this.setInitWidths=function(wp){
    if(!wp||$.trim(wp)==""){
        return false;
    };

    this.cellWidthType="px";
    this.initCellWidth=wp.split(this.delim);
    if (_isFF){
        for (var i = 0;i < this.initCellWidth.length;i++)if (this.initCellWidth[i] != "*")this.initCellWidth[i]=parseInt(this.initCellWidth[i]);
        }
    };

this.enableMultiline=function(state){
    this.multiLine=convertStringToBoolean(state);
};

this.enableMultiselect=function(state){
    this.selMultiRows=convertStringToBoolean(state);
};

this.setImagePath=function(path){
    this.imgURL=path;
};

this.setImagesPath=this.setImagePath;
this.setIconPath=function(path){
    this.iconURL=path;
};

this.setIconsPath=this.setIconPath;
this.changeCursorState=function(ev){
    var el = ev.target||ev.srcElement;
    if (el.tagName != "TD")el=this.getFirstParentOfType(el, "TD")
    if (!el)return;
    if ((el.tagName == "TD")&&(this._drsclmn)&&(!this._drsclmn[el._cellIndex]))
        return el.style.cursor="default";
    var check = (ev.layerX||0)+(((!_isIE)&&(ev.target.tagName == "DIV")) ? el.offsetLeft : 0);
    if ((el.offsetWidth-(ev.offsetX||(parseInt(this.getPosition(el, this.hdrBox))-check)*-1)) < (_isOpera?20:10)){
        el.style.cursor="E-resize";
    }else{
        el.style.cursor="default";
    };

    if (_isOpera)this.hdrBox.scrollLeft=this.objBox.scrollLeft;
};

this.startColResize=function(ev){
    if (this.resized)this.stopColResize();
    this.resized=null;
    var el = ev.target||ev.srcElement;
    if (el.tagName != "TD")el=this.getFirstParentOfType(el, "TD")
    var x = ev.clientX;
    var tabW = this.hdr.offsetWidth;
    var startW = parseInt(el.offsetWidth)

    if (el.tagName == "TD"&&el.style.cursor != "default"){
        if ((this._drsclmn)&&(!this._drsclmn[el._cellIndex]))
            return;
        self._old_d_mm=document.body.onmousemove;
        self._old_d_mu=document.body.onmouseup;
        document.body.onmousemove=function(e){
            if (self)self.doColResize(e||window.event, el, startW, x, tabW)
        };

        document.body.onmouseup=function(){
            if (self)self.stopColResize();
        }
    }
};

this.stopColResize=function(){
    document.body.onmousemove=self._old_d_mm||"";
    document.body.onmouseup=self._old_d_mu||"";
    this.setSizes();
    this.doOnScroll(0, 1)
    this.callEvent("onResizeEnd", [this]);
};

this.doColResize=function(ev, el, startW, x, tabW){
    el.style.cursor="E-resize";
    this.resized=el;
    var fcolW = startW+(ev.clientX-x);
    var wtabW = tabW+(ev.clientX-x)

    if (!(this.callEvent("onResize", [
        el._cellIndex,
        fcolW,
        this
        ])))
        return;
    if (_isIE)this.objBox.scrollLeft=this.hdrBox.scrollLeft;
    if (el.colSpan > 1){
        var a_sizes = new Array();
        for (var i = 0;i < el.colSpan;i++)a_sizes[i]=Math.round(fcolW*this.hdr.rows[0].childNodes[el._cellIndexS+i].offsetWidth/el.offsetWidth);
        for (var i = 0;i < el.colSpan;i++)this._setColumnSizeR(el._cellIndexS+i*1, a_sizes[i]);
    }else
        this._setColumnSizeR(el._cellIndex, fcolW);
    this.doOnScroll(0, 1);
    this.setSizes();
    if (this._fake && this._awdth)this._fake._correctSplit();
};

this._setColumnSizeR=function(ind, fcolW){
    if (fcolW > ((this._drsclmW&&!this._notresize)? (this._drsclmW[ind]||10) : 10)){
        this.obj.rows[0].childNodes[ind].style.width=fcolW+"px";
        this.hdr.rows[0].childNodes[ind].style.width=fcolW+"px";
        if (this.ftr)this.ftr.rows[0].childNodes[ind].style.width=fcolW+"px";
        if (this.cellWidthType == 'px'){
            this.cellWidthPX[ind]=fcolW;
        }else {
            var gridWidth = parseInt(this.entBox.offsetWidth);
            if (this.objBox.scrollHeight > this.objBox.offsetHeight)gridWidth-=17;
            var pcWidth = Math.round(fcolW / gridWidth*100)
            this.cellWidthPC[ind]=pcWidth;
        };

        if (this.sortImg.style.display!="none")this.setSortImgPos();
    }
};

this.setSortImgState=function(state, ind, order, row){
    order=(order||"asc").toLowerCase();
    if (!convertStringToBoolean(state)){
        this.sortImg.style.display="none";
        this.fldSorted=null;
        return;
    };

    if (order == "asc")this.sortImg.src=this.imgURL+"sort_asc.gif";else
        this.sortImg.src=this.imgURL+"sort_desc.gif";
    this.sortImg.style.display="";
    this.fldSorted=this.hdr.rows[0].childNodes[ind];
    var r = this.hdr.rows[row||1];
    if (!r)return;
    for (var i = 0;i < r.childNodes.length;i++){
        if (r.childNodes[i]._cellIndexS == ind){
            this.r_fldSorted=r.childNodes[i];
            return this.setSortImgPos();
        }
    };

return this.setSortImgState(state,ind,order,(row||1)+1);
};

this.setSortImgPos=function(ind, mode, hRowInd, el){
    if (this._hrrar && this._hrrar[this.r_fldSorted?this.r_fldSorted._cellIndex:ind])return;
    if (!el){
        if (!ind)var el = this.r_fldSorted;else
            var el = this.hdr.rows[hRowInd||0].cells[ind];
    };

    if (el != null){
        var pos = this.getPosition(el, this.hdrBox)
        var wdth = el.offsetWidth;
        this.sortImg.style.left=Number(pos[0]+wdth-13)+"px";
        this.sortImg.defLeft=parseInt(this.sortImg.style.left)
        this.sortImg.style.top=Number(pos[1]+5)+"px";
        if ((!this.useImagesInHeader)&&(!mode))
            this.sortImg.style.display="inline";
        this.sortImg.style.left=this.sortImg.defLeft+"px";
    }
};

this.setActive=function(fl){
    if (arguments.length == 0)var fl = true;
    if (fl == true){
        if (globalActiveDHTMLGridObject&&(globalActiveDHTMLGridObject != this))
            globalActiveDHTMLGridObject.editStop();
        globalActiveDHTMLGridObject=this;
        this.isActive=true;
    }else {
        this.isActive=false;
    }
};

this._doClick=function(ev){
    var selMethod = 0;
    var el = this.getFirstParentOfType(_isIE ? ev.srcElement : ev.target, "TD");
    if (!el)return;
    var fl = true;
    if (this.markedCells){
        var markMethod = 0;
        if (ev.shiftKey||ev.metaKey){
            markMethod=1;
        };

        if (ev.ctrlKey){
            markMethod=2;
        };

        this.doMark(el, markMethod);
        return true;
    };

    if (this.selMultiRows != false){
        if (ev.shiftKey&&this.row != null){
            selMethod=1;
        };

        if (ev.ctrlKey||ev.metaKey){
            selMethod=2;
        }
    };

this.doClick(el, fl, selMethod)
};

this._doContClick=function(ev){
    var el = this.getFirstParentOfType(_isIE ? ev.srcElement : ev.target, "TD");
    if ((!el)||( typeof (el.parentNode.idd) == "undefined"))
        return true;
    if (ev.button == 2||(_isMacOS&&ev.ctrlKey)){
        if (!this.callEvent("onRightClick", [
            el.parentNode.idd,
            el._cellIndex,
            ev
            ])){
            var z = function(e){
                (e||event).cancelBubble=true;
                return false;
            };
            (ev.srcElement||ev.target).oncontextmenu=z;
            return z(ev);
        };

        if (this._ctmndx){
            if (!(this.callEvent("onBeforeContextMenu", [
                el.parentNode.idd,
                el._cellIndex,
                this
                ])))
                return true;
            if (_isIE)ev.srcElement.oncontextmenu=function(){
                event.cancelBubble=true;
                return false;
            };

            if (this._ctmndx.showContextMenu){
                var dEl0=window.document.documentElement;
                var dEl1=window.document.body;
                var corrector = new Array((dEl0.scrollLeft||dEl1.scrollLeft),(dEl0.scrollTop||dEl1.scrollTop));
                if (_isIE){
                    var x= ev.clientX+corrector[0];
                    var y = ev.clientY+corrector[1];
                }else {
                    var x= ev.pageX;
                    var y = ev.pageY;
                };

                this._ctmndx.showContextMenu(x-1,y-1)
                this.contextID=this._ctmndx.contextMenuZoneId=el.parentNode.idd+"_"+el._cellIndex;
                this._ctmndx._skip_hide=true;
            }else {
                el.contextMenuId=el.parentNode.idd+"_"+el._cellIndex;
                el.contextMenu=this._ctmndx;
                el.a=this._ctmndx._contextStart;
                el.a(el, ev);
                el.a=null;
            };

            ev.cancelBubble=true;
            return false;
        }
    }else if (this._ctmndx){
    if (this._ctmndx.hideContextMenu)this._ctmndx.hideContextMenu()
    else
        this._ctmndx._contextEnd();
};

return true;
};

this.doClick=function(el, fl, selMethod, show){
    if (!this.selMultiRows)selMethod=0;
    var psid = this.row ? this.row.idd : 0;
    this.setActive(true);
    if (!selMethod)selMethod=0;
    if (this.cell != null)this.cell.className=this.cell.className.replace(/cellselected/g, "");
    if (el.tagName == "TD"){
        if (this.checkEvent("onSelectStateChanged"))
            var initial = this.getSelectedId();
        var prow = this.row;
        if (selMethod == 1){
            var elRowIndex = this.rowsCol._dhx_find(el.parentNode)
            var lcRowIndex = this.rowsCol._dhx_find(this.lastClicked)

            if (elRowIndex > lcRowIndex){
                var strt = lcRowIndex;
                var end = elRowIndex;
            }else {
                var strt = elRowIndex;
                var end = lcRowIndex;
            };

            for (var i = 0;i < this.rowsCol.length;i++)if ((i >= strt&&i <= end)){
                if (this.rowsCol[i]&&(!this.rowsCol[i]._sRow)){
                    if (this.rowsCol[i].className.indexOf("rowselected")== -1&&this.callEvent("onBeforeSelect", [
                        this.rowsCol[i].idd,
                        psid
                        ])){
                        this.rowsCol[i].className+=" rowselected";
                        this.selectedRows[this.selectedRows.length]=this.rowsCol[i]
                    }
                }else {
                this.clearSelection();
                return this.doClick(el, fl, 0, show);
            }
            }
        }else if (selMethod == 2){
    if (el.parentNode.className.indexOf("rowselected")!= -1){
        el.parentNode.className=el.parentNode.className.replace(/rowselected/g, "");
        this.selectedRows._dhx_removeAt(this.selectedRows._dhx_find(el.parentNode))
        var skipRowSelection = true;
    }
};

this.editStop()
if (typeof (el.parentNode.idd)== "undefined")
    return true;
if ((!skipRowSelection)&&(!el.parentNode._sRow)){
    if (this.callEvent("onBeforeSelect", [
        el.parentNode.idd,
        psid
        ])){
        if (selMethod == 0)this.clearSelection();
        this.cell=el;
        if ((prow == el.parentNode)&&(this._chRRS))
            fl=false;
        this.row=el.parentNode;
        this.row.className+=" rowselected"

        if (this.cell && _isIE && _isIE == 8 ){
            var next = this.cell.nextSibling;
            var parent = this.cell.parentNode;
            parent.removeChild(this.cell)
            parent.insertBefore(this.cell,next);
        };

        if (this.selectedRows._dhx_find(this.row)== -1)
            this.selectedRows[this.selectedRows.length]=this.row;
    }else fl = false;
};

if (this.cell && this.cell.parentNode.className.indexOf("rowselected")!= -1)
    this.cell.className=this.cell.className.replace(/cellselected/g, "")+" cellselected";
if (selMethod != 1)if (!this.row)return;
this.lastClicked=el.parentNode;
var rid = this.row.idd;
var cid = this.cell;
if (fl&& typeof (rid)!= "undefined" && cid && !skipRowSelection)
    self.onRowSelectTime=setTimeout(function(){
        self.callEvent("onRowSelect", [
            rid,
            cid._cellIndex
            ]);
    }, 100);
if (this.checkEvent("onSelectStateChanged")){
    var afinal = this.getSelectedId();
    if (initial != afinal)this.callEvent("onSelectStateChanged", [afinal,initial]);
}
};

this.isActive=true;
if (show !== false && this.cell && this.cell.parentNode.idd)this.moveToVisible(this.cell)
};

this.selectAll=function(){
    this.clearSelection();
    var coll = this.rowsBuffer;
    if (this.pagingOn)coll = this.rowsCol;
    for (var i = 0;i<coll.length;i ++){
        this._row(i).className+=" rowselected";
    };

    this.selectedRows=dhtmlxArray([].concat(coll));
    if (this.selectedRows.length){
        this.row = this.selectedRows[0];
        this.cell = this.row.cells[0];
    };

    if ((this._fake)&&(!this._realfake))
        this._fake.selectAll();
};

this.selectCell=function(r, cInd, fl, preserve, edit, show){
    if (!fl)fl=false;
    if (typeof (r)!= "object")
        r=this._row(r)
    if (!r || r==-1)return null;
    var c = r.childNodes[cInd];
    if (!c)c=r.childNodes[0];
    if (preserve)this.doClick(c, fl, 3, show)
    else
        this.doClick(c, fl, 0, show)

    if (edit)this.editCell();
};

this.moveToVisible=function(cell_obj, onlyVScroll){
    if (this.pagingOn){
        var newPage=Math.floor(this.getRowIndex(cell_obj.parentNode.idd) / this.rowsBufferOutSize)+1;
        if (newPage!=this.currentPage)this.changePage(newPage);
    };

    if (!cell_obj.offsetHeight && this._srnd){
        var mask=this._realfake?this._fake.rowsAr[cell_obj.parentNode.idd]:cell_obj.parentNode;
        var h=this.rowsBuffer._dhx_find(mask)*this._srdh;
        return this.objBox.scrollTop=h;
    };

    try{
        var distance = cell_obj.offsetLeft+cell_obj.offsetWidth+20;
        var scrollLeft = 0;
        if (distance > (this.objBox.offsetWidth+this.objBox.scrollLeft)){
            if (cell_obj.offsetLeft > this.objBox.scrollLeft)scrollLeft=cell_obj.offsetLeft-5
        }else if (cell_obj.offsetLeft < this.objBox.scrollLeft){
            distance-=cell_obj.offsetWidth*2/3;
            if (distance < this.objBox.scrollLeft)scrollLeft=cell_obj.offsetLeft-5
        };

        if ((scrollLeft)&&(!onlyVScroll))
            this.objBox.scrollLeft=scrollLeft;
        var distance = cell_obj.offsetTop+cell_obj.offsetHeight+20;
        if (distance > (this.objBox.offsetHeight+this.objBox.scrollTop)){
            var scrollTop = distance-this.objBox.offsetHeight;
        }else if (cell_obj.offsetTop < this.objBox.scrollTop){
            var scrollTop = cell_obj.offsetTop-5
        };

        if (scrollTop)this.objBox.scrollTop=scrollTop;
    }catch (er){}
};

this.editCell=function(){
    if (this.editor&&this.cell == this.editor.cell)return;
    this.editStop();
    if ((this.isEditable != true)||(!this.cell))
        return false;
    var c = this.cell;
    if (c.parentNode._locked)return false;
    this.editor=this.cells4(c);
    if (this.editor != null){
        if (this.editor.isDisabled()){
            this.editor=null;
            return false;
        };

        if (this.callEvent("onEditCell", [
            0,
            this.row.idd,
            this.cell._cellIndex
            ])!= false&&this.editor.edit){
            this._Opera_stop=(new Date).valueOf();
            c.className+=" editable";
            this.editor.edit();
            this.callEvent("onEditCell", [
                1,
                this.row.idd,
                this.cell._cellIndex
                ])
        }else {
            this.editor=null;
        }
    }
};

this.editStop=function(mode){
    if (_isOpera)if (this._Opera_stop){
        if ((this._Opera_stop*1+50)> (new Date).valueOf())
            return;
        this._Opera_stop=null;
    };

    if (this.editor&&this.editor != null){
        this.editor.cell.className=this.editor.cell.className.replace("editable", "");
        if (mode){
            var t = this.editor.val;
            this.editor.detach();
            this.editor.setValue(t);
            this.editor=null;
            return;
        };

        if (this.editor.detach())
            this.cell.wasChanged=true;
        var g = this.editor;
        this.editor=null;
        var z = this.callEvent("onEditCell", [
            2,
            this.row.idd,
            this.cell._cellIndex,
            g.getValue(),
            g.val
            ]);
        if (( typeof (z)== "string")||( typeof (z) == "number"))
            g[g.setImage ? "setLabel" : "setValue"](z);
        else if (!z)g[g.setImage ? "setLabel" : "setValue"](g.val);
        if (this._ahgr && this.multiLine)this.setSizes();
    }
};

this._nextRowCell=function(row, dir, pos){
    row=this._nextRow((this._groups?this.rowsCol:this.rowsBuffer)._dhx_find(row), dir);
    if (!row)return null;
    return row.childNodes[row._childIndexes ? row._childIndexes[pos] : pos];
};

this._getNextCell=function(acell, dir, i){
    acell=acell||this.cell;
    var arow = acell.parentNode;
    if (this._tabOrder){
        i=this._tabOrder[acell._cellIndex];
        if (typeof i != "undefined")if (i < 0)acell=this._nextRowCell(arow, dir, Math.abs(i)-1);else
            acell=arow.childNodes[i];
    }else {
        var i = acell._cellIndex+dir;
        if (i >= 0&&i < this._cCount){
            if (arow._childIndexes)i=arow._childIndexes[acell._cellIndex]+dir;
            acell=arow.childNodes[i];
        }else {
            acell=this._nextRowCell(arow, dir, (dir == 1 ? 0 : (this._cCount-1)));
        }
    };

if (!acell){
    if ((dir == 1)&&this.tabEnd){
        this.tabEnd.focus();
        this.tabEnd.focus();
        this.setActive(false);
    };

    if ((dir == -1)&&this.tabStart){
        this.tabStart.focus();
        this.tabStart.focus();
        this.setActive(false);
    };

    return null;
};

if (acell.style.display != "none"
    &&(!this.smartTabOrder||!this.cells(acell.parentNode.idd, acell._cellIndex).isDisabled()))
    return acell;
return this._getNextCell(acell, dir);
};

this._nextRow=function(ind, dir){
    var r = this._row(ind+dir);
    if (!r || r==-1)return null;
    if (r&&r.style.display == "none")return this._nextRow(ind+dir, dir);
    return r;
};

this.scrollPage=function(dir){
    if (!this.rowsBuffer.length)return;
    var master = this._realfake?this._fake:this;
    var new_ind = Math.floor((master._r_select||this.getRowIndex(this.row.idd)||0)+(dir)*this.objBox.offsetHeight / (this._srdh||20));
    if (new_ind < 0)new_ind=0;
    if (new_ind >= this.rowsBuffer.length)new_ind=this.rowsBuffer.length-1;
    if (this._srnd && !this.rowsBuffer[new_ind]){
        this.objBox.scrollTop+=Math.floor((dir)*this.objBox.offsetHeight / (this._srdh||20))*(this._srdh||20);
        master._r_select=new_ind;
    }else {
        this.selectCell(new_ind, this.cell._cellIndex, true, false,false,(this.multiLine || this._srnd));
        if (!this.multiLine && !this._srnd && !this._realfake)this.objBox.scrollTop=this.getRowById(this.getRowId(new_ind)).offsetTop;
        master._r_select=null;
    }
};

this.doKey=function(ev){
    if (!ev)return true;
    if ((ev.target||ev.srcElement).value !== window.undefined){
        var zx = (ev.target||ev.srcElement);
        if ((!zx.parentNode)||(zx.parentNode.className.indexOf("editable") == -1))
            return true;
    };

    if ((globalActiveDHTMLGridObject)&&(this != globalActiveDHTMLGridObject))
        return globalActiveDHTMLGridObject.doKey(ev);
    if (this.isActive == false){
        return true;
    };

    if (this._htkebl)return true;
    if (!this.callEvent("onKeyPress", [
        ev.keyCode,
        ev.ctrlKey,
        ev.shiftKey,
        ev
        ]))
        return false;
    var code = "k"+ev.keyCode+"_"+(ev.ctrlKey ? 1 : 0)+"_"+(ev.shiftKey ? 1 : 0);
    if (this.cell){
        if (this._key_events[code]){
            if (false === this._key_events[code].call(this))
                return true;
            if (ev.preventDefault)ev.preventDefault();
            ev.cancelBubble=true;
            return false;
        };

        if (this._key_events["k_other"])this._key_events.k_other.call(this, ev);
    };

    return true;
};

this.selectRow=function(r, fl, preserve, show){
    if (typeof (r)!= 'object')
        r=this._row(r);
    this.selectCell(r, 0, fl, preserve, false, show)
};

this.wasDblClicked=function(ev){
    var el = this.getFirstParentOfType(_isIE ? ev.srcElement : ev.target, "TD");
    if (el){
        var rowId = el.parentNode.idd;
        return this.callEvent("onRowDblClicked", [ rowId, el._cellIndex, this.opts ]);
    }
};

this._onHeaderClick=function(e, el){
    var opts = this.grid;
    el=el||opts.getFirstParentOfType(_isIE ? event.srcElement : e.target, "TD");
    if (this.grid.resized == null){
        if (!(this.grid.callEvent("onHeaderClick", [
            el._cellIndexS,
            (e||window.event)])))
            return false;
        opts.sortField(el._cellIndexS, false, el)

    }
};

this.deleteSelectedRows=function(){
    var num = this.selectedRows.length

    if (num == 0)return;
    var tmpAr = this.selectedRows;
    this.selectedRows=dhtmlxArray()
    for (var i = num-1;i >= 0;i--){
        var node = tmpAr[i]

        if (!this.deleteRow(node.idd, node)){
            this.selectedRows[this.selectedRows.length]=node;
        }else {
            if (node == this.row){
                var ind = i;
            }
        }
    };

if (ind){
    try{
        if (ind+1 > this.rowsCol.length)ind--;
        this.selectCell(ind, 0, true)
    }catch (er){
        this.row=null
        this.cell=null
    }
}
};

this.getSelectedRowId=function(){
    var selAr = new Array(0);
    var uni = {};

    for (var i = 0;i < this.selectedRows.length;i++){
        var id = this.selectedRows[i].idd;
        if (uni[id])continue;
        selAr[selAr.length]=id;
        uni[id]=true;
    };

    if (selAr.length == 0)return null;else
        return selAr.join(this.delim);
};

this.getSelectedCellIndex=function(){
    if (this.cell != null)return this.cell._cellIndex;else
        return -1;
};

this.getColWidth=function(ind){
    return parseInt(this.cellWidthPX[ind])+((_isFF) ? 2 : 0);
};

this.setColWidth=function(ind, value){
    if (this._hrrar[ind])return;
    if (this.cellWidthType == 'px')this.cellWidthPX[ind]=parseInt(value)-+((_isFF) ? 2 : 0);else
        this.cellWidthPC[ind]=parseInt(value);
    this.setSizes();
};

this.getRowIndex=function(row_id){
    for (var i = 0;i < this.rowsBuffer.length;i++)if (this.rowsBuffer[i]&&this.rowsBuffer[i].idd == row_id)return i;return -1;
};

this.getRowId=function(ind){
    return this.rowsBuffer[ind] ? this.rowsBuffer[ind].idd : this.undefined;
};

this.setRowId=function(ind, row_id){
    this.changeRowId(this.getRowId(ind), row_id)
};

this.changeRowId=function(oldRowId, newRowId){
    if (oldRowId == newRowId)return;
    var row = this.rowsAr[oldRowId]
    row.idd=newRowId;
    if (this.UserData[oldRowId]){
        this.UserData[newRowId]=this.UserData[oldRowId]
        this.UserData[oldRowId]=null;
    };

    if (this._h2&&this._h2.get[oldRowId]){
        this._h2.get[newRowId]=this._h2.get[oldRowId];
        this._h2.get[newRowId].id=newRowId;
        delete this._h2.get[oldRowId];
    };

    this.rowsAr[oldRowId]=null;
    this.rowsAr[newRowId]=row;
    for (var i = 0;i < row.childNodes.length;i++)if (row.childNodes[i]._code)row.childNodes[i]._code=this._compileSCL(row.childNodes[i]._val, row.childNodes[i]);if (this._mat_links && this._mat_links[oldRowId]){
        var a=this._mat_links[oldRowId];
        delete this._mat_links[oldRowId];
        for (var c in a)for (var i=0;i < a[c].length;i++)this._compileSCL(a[c][i].original,a[c][i]);
        };

    this.callEvent("onRowIdChange",[oldRowId,newRowId]);
};

this.setColumnIds=function(ids){
    this.columnIds=ids.split(this.delim)
};

this.setColumnId=function(ind, id){
    this.columnIds[ind]=id;
};

this.getColIndexById=function(id){
    for (var i = 0;i < this.columnIds.length;i++)if (this.columnIds[i] == id)return i;
    };

this.getColumnId=function(cin){
    return this.columnIds[cin];
};

this.getColumnLabel=function(cin, ind, hdr){
    var z = (hdr||this.hdr).rows[(ind||0)+1];
    for (var i=0;i<z.cells.length;i++)if (z.cells[i]._cellIndexS==cin)return (_isIE ? z.cells[i].innerText : z.cells[i].textContent);return "";
};

this.getColLabel = this.getColumnLabel;
this.getFooterLabel=function(cin, ind){
    return this.getColumnLabel(cin,ind,this.ftr);
};

this.setRowTextBold=function(row_id){
    var r=this.getRowById(row_id)
    if (r)r.style.fontWeight="bold";
};

this.setRowTextStyle=function(row_id, styleString){
    var r = this.getRowById(row_id)
    if (!r)return;
    for (var i = 0;i < r.childNodes.length;i++){
        var pfix = r.childNodes[i]._attrs["style"]||"";
        if (_isIE)r.childNodes[i].style.cssText=pfix+"width:"+r.childNodes[i].style.width+";"+styleString;else
            r.childNodes[i].style.cssText=pfix+"width:"+r.childNodes[i].style.width+";"+styleString;
    }
    };

this.setRowColor=function(row_id, color){
    var r = this.getRowById(row_id)

    for (var i = 0;i < r.childNodes.length;i++)r.childNodes[i].bgColor=color;
};

this.setCellTextStyle=function(row_id, ind, styleString){
    var r = this.getRowById(row_id)

    if (!r)return;
    var cell = r.childNodes[r._childIndexes ? r._childIndexes[ind] : ind];
    if (!cell)return;
    var pfix = "";
    if (_isIE)cell.style.cssText=pfix+"width:"+cell.style.width+";"+styleString;else
        cell.style.cssText=pfix+"width:"+cell.style.width+";"+styleString;
};

this.setRowTextNormal=function(row_id){
    var r=this.getRowById(row_id);
    if (r)r.style.fontWeight="normal";
};

this.doesRowExist=function(row_id){
    if (this.getRowById(row_id)!= null)
        return true
    else
        return false
};

this.getColumnsNum=function(){
    return this._cCount;
};

this.moveRowUp=function(row_id){
    var r = this.getRowById(row_id)

    if (this.isTreeGrid())
        return this.moveRowUDTG(row_id, -1);
    var rInd = this.rowsCol._dhx_find(r)
    if ((r.previousSibling)&&(rInd != 0)){
        r.parentNode.insertBefore(r, r.previousSibling)
        this.rowsCol._dhx_swapItems(rInd, rInd-1)
        this.setSizes();
        var bInd=this.rowsBuffer._dhx_find(r);
        this.rowsBuffer._dhx_swapItems(bInd,bInd-1);
        if (this._cssEven)this._fixAlterCss(rInd-1);
    }
};

this.moveRowDown=function(row_id){
    var r = this.getRowById(row_id)

    if (this.isTreeGrid())
        return this.moveRowUDTG(row_id, 1);
    var rInd = this.rowsCol._dhx_find(r);
    if (r.nextSibling){
        this.rowsCol._dhx_swapItems(rInd, rInd+1)

        if (r.nextSibling.nextSibling)r.parentNode.insertBefore(r, r.nextSibling.nextSibling)
        else
            r.parentNode.appendChild(r)
        this.setSizes();
        var bInd=this.rowsBuffer._dhx_find(r);
        this.rowsBuffer._dhx_swapItems(bInd,bInd+1);
        if (this._cssEven)this._fixAlterCss(rInd);
    }
};

this.getCombo=function(col_ind){
    if (!this.combos[col_ind]){
        this.combos[col_ind]=new dhtmlXGridComboObject();
    };

    return this.combos[col_ind];
};

this.setUserData=function(row_id, name, value){
    if (!row_id)row_id="gridglobaluserdata";
    if (!this.UserData[row_id])this.UserData[row_id]=new Hashtable()
    this.UserData[row_id].put(name, value)
};

this.getUserData=function(row_id, name){
    if (!row_id)row_id="gridglobaluserdata";
    this.getRowById(row_id);
    var z = this.UserData[row_id];
    return (z ? z.get(name) : "");
};

this.setEditable=function(fl){
    this.isEditable=convertStringToBoolean(fl);
};

this.selectRowById=function(row_id, multiFL, show, call){
    if (!call)call=false;
    this.selectCell(this.getRowById(row_id), 0, call, multiFL, false, show);
};

this.clearSelection=function(){
    this.editStop()

    for (var i = 0;i < this.selectedRows.length;i++){
        var r = this.rowsAr[this.selectedRows[i].idd];
        if (r)r.className=r.className.replace(/rowselected/g, "");
    };

    this.selectedRows=dhtmlxArray()
    this.row=null;
    if (this.cell != null){
        this.cell.className=this.cell.className.replace(/cellselected/g, "");
        this.cell=null;
    }
};

this.copyRowContent=function(from_row_id, to_row_id){
    var frRow = this.getRowById(from_row_id)

    if (!this.isTreeGrid())
        for (var i = 0;i < frRow.cells.length;i++){
            this.cells(to_row_id, i).setValue(this.cells(from_row_id, i).getValue())
        }else
        this._copyTreeGridRowContent(frRow, from_row_id, to_row_id);
    if (!_isIE)this.getRowById(from_row_id).cells[0].height=frRow.cells[0].offsetHeight
};

this.setFooterLabel=function(c, label, ind){
    return this.setColumnLabel(c,label,ind,this.ftr);
};

this.setColumnLabel=function(c, label, ind, hdr){
    var z = (hdr||this.hdr).rows[ind||1];
    var col = (z._childIndexes ? z._childIndexes[c] : c);
    if (!z.cells[col])return;
    if (!this.useImagesInHeader){
        var hdrHTML = "<div class='hdrcell'>"

        if (label.indexOf('img:[')!= -1){
            var imUrl = label.replace(/.*\[([^>]+)\].*/, "$1");
            label=label.substr(label.indexOf("]")+1, label.length)
            hdrHTML+="<img width='18px' height='18px' align='absmiddle' src='"+imUrl+"' hspace='2'>"
        };

        hdrHTML+=label;
        hdrHTML+="</div>";
        z.cells[col].innerHTML=hdrHTML;
        if (this._hstyles[col])z.cells[col].style.cssText=this._hstyles[col];
    }else {
        z.cells[col].style.textAlign="left";
        z.cells[col].innerHTML="<img src='"+this.imgURL+""+label+"' onerror='this.src = \""+this.imgURL
        +"imageloaderror.gif\"'>";
        var a = new Image();
        a.src=this.imgURL+""+label.replace(/(\.[a-z]+)/, ".des$1");
        this.preloadImagesAr[this.preloadImagesAr.length]=a;
        var b = new Image();
        b.src=this.imgURL+""+label.replace(/(\.[a-z]+)/, ".asc$1");
        this.preloadImagesAr[this.preloadImagesAr.length]=b;
    };

    if ((label||"").indexOf("#") != -1){
        var t = label.match(/(^|{)#([^}]+)(}|$)/);
        if (t){
            var tn = "_in_header_"+t[2];
            if (this[tn])this[tn]((this.forceDivInHeader ? z.cells[col].firstChild : z.cells[col]), col, label.split(t[0]));
        }
    }
};

this.setColLabel = function(a,b,ind,c){
    return this.setColumnLabel(a,b,(ind||0)+1,c);
};

this.clearAll=function(header){
    if (!this.obj.rows[0])return;
    if (this._h2){
        this._h2=new dhtmlxHierarchy();
        if (this._fake){
            if (this._realfake)this._h2=this._fake._h2;else
                this._fake._h2=this._h2;
        }
    };

this.limit=this._limitC=0;
this.editStop(true);
if (this._dLoadTimer)window.clearTimeout(this._dLoadTimer);
if (this._dload){
    this.objBox.scrollTop=0;
    this.limit=this._limitC||0;
    this._initDrF=true;
};

var len = this.rowsCol.length;
len=this.obj.rows.length;
for (var i = len-1;i > 0;i--){
    var t_r = this.obj.rows[i];
    t_r.parentNode.removeChild(t_r);
};

if (header){
    this._master_row=null;
    this.obj.rows[0].parentNode.removeChild(this.obj.rows[0]);
    for (var i = this.hdr.rows.length-1;i >= 0;i--){
        var t_r = this.hdr.rows[i];
        t_r.parentNode.removeChild(t_r);
    };

    if (this.ftr){
        this.ftr.parentNode.removeChild(this.ftr);
        this.ftr=null;
    };

    this._aHead=this.ftr=this.cellWidth=this._aFoot=null;
    this.cellType=dhtmlxArray();
    this._hrrar=[];
    this.columnIds=[];
    this.combos=[];
};

this.row=null;
this.cell=null;
this.rowsCol=dhtmlxArray()
this.rowsAr=[];
this._RaSeCol=[];
this.rowsBuffer=dhtmlxArray()
this.UserData=[]
this.selectedRows=dhtmlxArray();
if (this.pagingOn || this._srnd)this.xmlFileUrl="";
if (this.pagingOn)this.changePage(1);
if (this._contextCallTimer)window.clearTimeout(this._contextCallTimer);
if (this._sst)this.enableStableSorting(true);
this._fillers=this.undefined;
this.setSortImgState(false);
this.setSizes();
this.callEvent("onClearAll", []);
};

this.sortField=function(ind, repeatFl, r_el){
    if (this.getRowsNum()== 0)
        return false;
    var el = this.hdr.rows[0].cells[ind];
    if (!el)return;
    if (el.tagName == "TH"&&(this.fldSort.length-1)>= el._cellIndex
        &&this.fldSort[el._cellIndex] != 'na'){
        var data=this.getSortingState();
        var sortType= ( data[0]==ind && data[1]=="asc" ) ? "des" : "asc";
        if (!this.callEvent("onBeforeSorting", [
            ind,
            this.fldSort[ind],
            sortType
            ]))
            return;
        this.sortImg.src=this.imgURL+"sort_"+(sortType == "asc" ? "asc" : "desc")+".gif";
        if (this.useImagesInHeader){
            var cel = this.hdr.rows[1].cells[el._cellIndex].firstChild;
            if (this.fldSorted != null){
                var celT = this.hdr.rows[1].cells[this.fldSorted._cellIndex].firstChild;
                celT.src=celT.src.replace(/(\.asc\.)|(\.des\.)/, ".");
            };

            cel.src=cel.src.replace(/(\.[a-z]+)$/, "."+sortType+"$1")
        };

        this.sortRows(el._cellIndex, this.fldSort[el._cellIndex], sortType)
        this.fldSorted=el;
        this.r_fldSorted=r_el;
        var c = this.hdr.rows[1];
        var c = r_el.parentNode;
        var real_el = c._childIndexes ? c._childIndexes[el._cellIndex] : el._cellIndex;
        this.setSortImgPos(false, false, false, r_el);
    }
};

this.enableHeaderImages=function(fl){
    this.useImagesInHeader=fl;
};

this.setHeader=function(hdrStr, splitSign, styles){
    if (typeof (hdrStr)!= "object")
        var arLab = this._eSplit(hdrStr);else
        arLab=[].concat(hdrStr);
    var arWdth = new Array(0);
    var arTyp = new dhtmlxArray(0);
    var arAlg = new Array(0);
    var arVAlg = new Array(0);
    var arSrt = new Array(0);
    for (var i = 0;i < arLab.length;i++){
        arWdth[arWdth.length]=Math.round(100 / arLab.length);
        arTyp[arTyp.length]="ed";
        arAlg[arAlg.length]="left";
        arVAlg[arVAlg.length]="middle";
        arSrt[arSrt.length]="na";
    };

    this.splitSign=splitSign||"#cspan";
    this.hdrLabels=arLab;
    this.cellWidth=arWdth;
    if (!this.initCellWidth.length)this.setInitWidthsP(arWdth.join(this.delim),true);
    this.cellType=arTyp;
    this.cellAlign=arAlg;
    this.cellVAlign=arVAlg;
    this.fldSort=arSrt;
    this._hstyles=styles||[];
};

this._eSplit=function(str){
    if (![].push)return str.split(this.delim);
    var a = "r"+(new Date()).valueOf();
    var z = this.delim.replace(/([\|\+\*\^])/g, "\\$1")
    return (str||"").replace(RegExp(z, "g"), a).replace(RegExp("\\\\"+a, "g"), this.delim).split(a);
};

this.getColType=function(cInd){
    return this.cellType[cInd];
};

this.getColTypeById=function(cID){
    return this.cellType[this.getColIndexById(cID)];
};

this.setColTypes=function(typeStr){
    this.cellType=dhtmlxArray(typeStr.split(this.delim));
    this._strangeParams=new Array();
    for (var i = 0;i < this.cellType.length;i++){
        if ((this.cellType[i].indexOf("[")!= -1)){
            var z = this.cellType[i].split(/[\[\]]+/g);
            this.cellType[i]=z[0];
            this.defVal[i]=z[1];
            if (z[1].indexOf("=")== 0){
                this.cellType[i]="math";
                this._strangeParams[i]=z[0];
            }
        };

    if (!window["eXcell_"+this.cellType[i]])dhtmlxError.throwError("Configuration","Incorrect cell type: "+this.cellType[i],[this,this.cellType[i]]);
    }
};

this.setColSorting=function(sortStr){
    this.fldSort=sortStr.split(this.delim)

};

this.setColAlign=function(alStr){
    this.cellAlign=alStr.split(this.delim)
    for (var i=0;i < this.cellAlign.length;i++)this.cellAlign[i]=this.cellAlign[i]._dhx_trim();
};

this.setColVAlign=function(valStr){
    this.cellVAlign=valStr.split(this.delim)
};

this.setNoHeader=function(fl){
    this.noHeader=convertStringToBoolean(fl);
};

this.showRow=function(rowID){
    this.getRowById(rowID)

    if (this._h2)this.openItem(this._h2.get[rowID].parent.id);
    var c = this.getRowById(rowID).childNodes[0];
    while (c&&c.style.display == "none")c=c.nextSibling;
    if (c)this.moveToVisible(c, true)
};

this.setStyle=function(ss_header, ss_grid, ss_selCell, ss_selRow){
    this.ssModifier=[
    ss_header,
    ss_grid,
    ss_selCell,
    ss_selCell,
    ss_selRow
    ];
    var prefs = ["#"+this.entBox.id+" table.hdr td", "#"+this.entBox.id+" table.obj td",
    "#"+this.entBox.id+" table.obj tr.rowselected td.cellselected",
    "#"+this.entBox.id+" table.obj td.cellselected", "#"+this.entBox.id+" table.obj tr.rowselected td"];
    for (var i = 0;i < prefs.length;i++)if (this.ssModifier[i]){
        if (_isIE)document.styleSheets[0].addRule(prefs[i], this.ssModifier[i]);else
            document.styleSheets[0].insertRule(prefs[i]+(" {"+this.ssModifier[i]+" };"), document.styleSheets[0].cssRules.length);
    }
    };

this.setColumnColor=function(clr){
    this.columnColor=clr.split(this.delim)
};

this.enableAlterCss=function(cssE, cssU, perLevel, levelUnique){
    if (cssE||cssU)this.attachEvent("onGridReconstructed",function(){
        this._fixAlterCss();
        if (this._fake)this._fake._fixAlterCss();
    });
    this._cssSP=perLevel;
    this._cssSU=levelUnique;
    this._cssEven=cssE;
    this._cssUnEven=cssU;
};

this._fixAlterCss=function(ind){
    if (this._h2 && (this._cssSP || this._cssSU))
        return this._fixAlterCssTGR(ind);
    if (!this._cssEven && !this._cssUnEven)return;
    ind=ind||0;
    var j = ind;
    for (var i = ind;i < this.rowsCol.length;i++){
        if (!this.rowsCol[i])continue;
        if (this.rowsCol[i].style.display != "none"){
            if (this.rowsCol[i]._cntr){
                j=1;
                continue;
            };

            if (this.rowsCol[i].className.indexOf("rowselected")!= -1){
                if (j%2 == 1)this.rowsCol[i].className=this._cssUnEven+" rowselected "+(this.rowsCol[i]._css||"");else
                    this.rowsCol[i].className=this._cssEven+" rowselected "+(this.rowsCol[i]._css||"");
            }else {
                if (j%2 == 1)this.rowsCol[i].className=this._cssUnEven+" "+(this.rowsCol[i]._css||"");else
                    this.rowsCol[i].className=this._cssEven+" "+(this.rowsCol[i]._css||"");
            };

            j++;
        }
    }
    };

this.getPosition=function(oNode, pNode){
    if (!pNode && !_isChrome){
        var pos = getOffset(oNode);
        return [pos.left, pos.top];
    };

    pNode = pNode||document.body;
    var oCurrentNode = oNode;
    var iLeft = 0;
    var iTop = 0;
    while ((oCurrentNode)&&(oCurrentNode != pNode)){
        iLeft+=oCurrentNode.offsetLeft-oCurrentNode.scrollLeft;
        iTop+=oCurrentNode.offsetTop-oCurrentNode.scrollTop;
        oCurrentNode=oCurrentNode.offsetParent;
    };

    if (pNode == document.body){
        if (_isIE){
            iTop+=document.body.offsetTop||document.documentElement.offsetTop;
            iLeft+=document.body.offsetLeft||document.documentElement.offsetLeft;
        }else if (!_isFF){
            iLeft+=document.body.offsetLeft;
            iTop+=document.body.offsetTop;
        }
    };

return [iLeft, iTop];
};

this.getFirstParentOfType=function(obj, tag){
    while (obj&&obj.tagName != tag&&obj.tagName != "BODY"){
        obj=obj.parentNode;
    };

    return obj;
};

this.objBox.onscroll=function(){
    this.grid._doOnScroll();
};

if ((!_isOpera)||(_OperaRv > 8.5)){
    this.hdr.onmousemove=function(e){
        this.grid.changeCursorState(e||window.event);
    };

    this.hdr.onmousedown=function(e){
        return this.grid.startColResize(e||window.event);
    }
};

this.obj.onmousemove=this._drawTooltip;
this.obj.onclick=function(e){
    this.grid._doClick(e||window.event);
    if (this.grid._sclE)this.grid.editCell(e||window.event);
    (e||event).cancelBubble=true;
};

if (_isMacOS){
    this.entBox.oncontextmenu=function(e){
        e.cancelBubble=true;
        e.returnValue=false;
        return this.grid._doContClick(e||window.event);
    }
}else {
    this.entBox.onmousedown=function(e){
        return this.grid._doContClick(e||window.event);
    };

    this.entBox.oncontextmenu=function(e){
        if (this.grid._ctmndx)(e||event).cancelBubble=true;
        return !this.grid._ctmndx;
    }
};

//console.log(this.obj)
//var _this = this;
//$(this.obj).dblclick(function(e){
//
//	 if (!_this.wasDblClicked(e||window.event)){
//		return false;
//	 }
//
//	});
/* this.obj.ondblclick=function(e){
	 alert(1)
	 if (!this.grid.wasDblClicked(e||window.event)){
		 return false;
		 }
		 alert(2)
	 if (this.grid._dclE){
		  alert(3)
		 var row = this.grid.getFirstParentOfType((_isIE?event.srcElement:e.target),"TR");
		 if (row == this.grid.row)
		 	this.grid.editCell(e||window.event);
			};
		(e||event).cancelBubble=true;
		if (_isOpera){
			return false;
			}
	};*/
this.hdr.onclick=this._onHeaderClick;
this.sortImg.onclick=function(){
    self._onHeaderClick.apply({
        grid: self
    }, [
    null,
    self.r_fldSorted
    ]);
};

this.hdr.ondblclick=this._onHeaderDblClick;
if (!document.body._dhtmlxgrid_onkeydown){
    dhtmlxEvent(document, _isOpera?"keypress":"keydown",function(e){
        if (globalActiveDHTMLGridObject)return globalActiveDHTMLGridObject.doKey(e||window.event);
    });
    document.body._dhtmlxgrid_onkeydown=true;
};

dhtmlxEvent(document.body, "click", function(){
    if (self.editStop)self.editStop();
});
this.entBox.onbeforeactivate=function(){
    this._still_active=null;
    this.grid.setActive();
    event.cancelBubble=true;
};

this.entBox.onbeforedeactivate=function(){
    if (this.grid._still_active)this.grid._still_active=null;else
        this.grid.isActive=false;
    event.cancelBubble=true;
};

if (this.entBox.style.height.toString().indexOf("%") != -1)
    this._delta_y = this.entBox.style.height;
if (this.entBox.style.width.toString().indexOf("%") != -1)
    this._delta_x = this.entBox.style.width;
if (this._delta_x||this._delta_y)this._setAutoResize();
this.setColHidden=this.setColumnsVisibility
this.enableCollSpan = this.enableColSpan
this.setMultiselect=this.enableMultiselect;
this.setMultiLine=this.enableMultiline;
this.deleteSelectedItem=this.deleteSelectedRows;
this.getSelectedId=this.getSelectedRowId;
this.getHeaderCol=this.getColumnLabel;
this.isItemExists=this.doesRowExist;
this.getColumnCount=this.getColumnsNum;
this.setSelectedRow=this.selectRowById;
this.setHeaderCol=this.setColumnLabel;
this.preventIECashing=this.preventIECaching;
this.enableAutoHeigth=this.enableAutoHeight;
this.getUID=this.uid;
if (dhtmlx.image_path)this.setImagePath(dhtmlx.image_path);
if (dhtmlx.skin)this.setSkin(dhtmlx.skin);
return this;
};

dhtmlXGridObject.prototype={
    getRowAttribute: function(id, name){
        return this.getRowById(id)._attrs[name];
    },
    setRowAttribute: function(id, name, value){
        this.getRowById(id)._attrs[name]=value;
    },

    isTreeGrid:function(){
        return (this.cellType._dhx_find("tree") != -1);
    },



    setRowHidden:function(id, state){
        var f = convertStringToBoolean(state);
        var row = this.getRowById(id)

        if (!row)return;
        if (row.expand === "")this.collapseKids(row);
        if ((state)&&(row.style.display != "none")){
            row.style.display="none";
            var z = this.selectedRows._dhx_find(row);
            if (z != -1){
                row.className=row.className.replace("rowselected", "");
                for (var i = 0;i < row.childNodes.length;i++)row.childNodes[i].className=row.childNodes[i].className.replace(/cellselected/g, "");
                this.selectedRows._dhx_removeAt(z);
            };

            this.callEvent("onGridReconstructed", []);
        };

        if ((!state)&&(row.style.display == "none")){
            row.style.display="";
            this.callEvent("onGridReconstructed", []);
        };

        this.setSizes();
    },






    enableRowsHover:function(mode, cssClass){
        this._unsetRowHover(false,true);
        this._hvrCss=cssClass;
        if (convertStringToBoolean(mode)){
            if (!this._elmnh){
                this.obj._honmousemove=this.obj.onmousemove;
                this.obj.onmousemove=this._setRowHover;
                if (_isIE)this.obj.onmouseleave=this._unsetRowHover;else
                    this.obj.onmouseout=this._unsetRowHover;
                this._elmnh=true;
            }
        }else {
        if (this._elmnh){
            this.obj.onmousemove=this.obj._honmousemove;
            if (_isIE)this.obj.onmouseleave=null;else
                this.obj.onmouseout=null;
            this._elmnh=false;
        }
    }
},


enableEditEvents:function(click, dblclick, f2Key){
    this._sclE=convertStringToBoolean(click);
    this._dclE=convertStringToBoolean(dblclick);
    this._f2kE=convertStringToBoolean(f2Key);
},



enableLightMouseNavigation:function(mode){
    if (convertStringToBoolean(mode)){
        if (!this._elmn){
            this.entBox._onclick=this.entBox.onclick;
            this.entBox.onclick=function(){
                return true;
            };

            this.obj._onclick=this.obj.onclick;
            this.obj.onclick=function(e){
                var c = this.grid.getFirstParentOfType(e ? e.target : event.srcElement, 'TD');
                if (!c)return;
                this.grid.editStop();
                this.grid.doClick(c);
                this.grid.editCell();
                (e||event).cancelBubble=true;
            };

            this.obj._onmousemove=this.obj.onmousemove;
            this.obj.onmousemove=this._autoMoveSelect;
            this._elmn=true;
        }
    }else {
    if (this._elmn){
        this.entBox.onclick=this.entBox._onclick;
        this.obj.onclick=this.obj._onclick;
        this.obj.onmousemove=this.obj._onmousemove;
        this._elmn=false;
    }
}
},



_unsetRowHover:function(e, c){
    if (c)opts=this;else
        opts=this.grid;
    if ((opts._lahRw)&&(opts._lahRw != c)){
        for (var i = 0;i < opts._lahRw.childNodes.length;i++)opts._lahRw.childNodes[i].className=opts._lahRw.childNodes[i].className.replace(opts._hvrCss, "");
        opts._lahRw=null;
    }
},


_setRowHover:function(e){
    var c = this.grid.getFirstParentOfType(e ? e.target : event.srcElement, 'TD');
    if (c && c.parentNode!=this.grid._lahRw){
        this.grid._unsetRowHover(0, c);
        c=c.parentNode;
        if (!c.idd || c.idd=="__filler__")return;
        for (var i = 0;i < c.childNodes.length;i++)c.childNodes[i].className+=" "+this.grid._hvrCss;
        this.grid._lahRw=c;
    };

    this._honmousemove(e);
},


_autoMoveSelect:function(e){
    if (!this.grid.editor){
        var c = this.grid.getFirstParentOfType(e ? e.target : event.srcElement, 'TD');
        if (c.parentNode.idd)this.grid.doClick(c, true, 0);
    };

    this._onmousemove(e);
},



destructor:function(){
    this.editStop(true);
    if (this._sizeTime)this._sizeTime=window.clearTimeout(this._sizeTime);
    this.entBox.className=(this.entBox.className||"").replace(/gridbox.*/,"");
    if (this.formInputs)for (var i = 0;i < this.formInputs.length;i++)this.parentForm.removeChild(this.formInputs[i]);
    var a;
    this.xmlLoader=this.xmlLoader.destructor();
    for (var i = 0;i < this.rowsCol.length;i++)if (this.rowsCol[i])this.rowsCol[i].grid=null;for (i in this.rowsAr)if (this.rowsAr[i])this.rowsAr[i]=null;this.rowsCol=new dhtmlxArray();
    this.rowsAr=new Array();
    this.entBox.innerHTML="";
    var dummy=function(){};

    this.entBox.onclick = this.entBox.onmousedown = this.entBox.onbeforeactivate = this.entBox.onbeforedeactivate = this.entBox.onbeforedeactivate = this.entBox.onselectstart = dummy;
    this.setSizes = this._update_srnd_view = this.callEvent = dummy;
    this.entBox.grid=this.objBox.grid=this.hdrBox.grid=this.obj.grid=this.hdr.grid=null;
    for (a in this){
        if ((this[a])&&(this[a].m_obj))
            this[a].m_obj=null;
        this[a]=null;
    };

    if (this == globalActiveDHTMLGridObject)globalActiveDHTMLGridObject=null;
    return null;
},
getSortingState:function(){
    var z = new Array();
    if (this.fldSorted){
        z[0]=this.fldSorted._cellIndex;
        z[1]=(this.sortImg.src.indexOf("sort_desc.gif") != -1) ? "des" : "asc";
    };

    return z;
},
enableAutoHeight:function(mode, maxHeight, countFullHeight){
    this._ahgr=convertStringToBoolean(mode);
    this._ahgrF=convertStringToBoolean(countFullHeight);
    this._ahgrM=maxHeight||null;
    if (arguments.length == 1){
        this.objBox.style.overflowY=mode?"hidden":"auto";
    };

    if (maxHeight == "auto"){
        this._ahgrM=null;
        this._ahgrMA=true;
        this._setAutoResize();
    }
},

enableStableSorting:function(mode){
    this._sst=convertStringToBoolean(mode);
    this.rowsCol.stablesort=function(cmp){
        var size = this.length-1;
        for (var i = 0;i < this.length-1;i++){
            for (var j = 0;j < size;j++)if (cmp(this[j], this[j+1])> 0){
                var temp = this[j];
                this[j]=this[j+1];
                this[j+1]=temp;
            };

            size--;
        }
        }
    },
enableKeyboardSupport:function(mode){
    this._htkebl=!convertStringToBoolean(mode);
},
enableContextMenu:function(menu){
    this._ctmndx=menu;
},
setScrollbarWidthCorrection:function(width){},
enableTooltips:function(list){
    this._enbTts=list.split(",");
    for (var i = 0;i < this._enbTts.length;i++)this._enbTts[i]=convertStringToBoolean(this._enbTts[i]);
},
enableResizing:function(list){
    this._drsclmn=list.split(",");
    for (var i = 0;i < this._drsclmn.length;i++)this._drsclmn[i]=convertStringToBoolean(this._drsclmn[i]);
},
setColumnMinWidth:function(width, ind){
    if (arguments.length == 2){
        if (!this._drsclmW)this._drsclmW=new Array();
        this._drsclmW[ind]=width;
    }else
        this._drsclmW=width.split(",");
},
enableCellIds:function(mode){
    this._enbCid=convertStringToBoolean(mode);
},
lockRow:function(rowId, mode){
    var z = this.getRowById(rowId);
    if (z){
        z._locked=convertStringToBoolean(mode);
        if ((this.cell)&&(this.cell.parentNode.idd == rowId))
            this.editStop();
    }
},
_getRowArray:function(row){
    var text = new Array();
    for (var ii = 0;ii < row.childNodes.length;ii++){
        var a = this.cells3(row, ii);
        text[ii]=a.getValue();
    };

    return text;
},
_launchCommands:function(arr){
    for (var i = 0;i < arr.length;i++){
        var args = new Array();
        for (var j = 0;j < arr[i].childNodes.length;j++)if (arr[i].childNodes[j].nodeType == 1)args[args.length]=arr[i].childNodes[j].firstChild.data;this[arr[i].getAttribute("command")].apply(this, args);
    }
    },



_parseHead:function(xmlDoc){
    var hheadCol = this.xmlLoader.doXPath("./head", xmlDoc);
    if (hheadCol.length){
        var headCol = this.xmlLoader.doXPath("./column", hheadCol[0]);
        var asettings = this.xmlLoader.doXPath("./settings", hheadCol[0]);
        var awidthmet = "setInitWidths";
        var split = false;
        if (asettings[0]){
            for (var s = 0;s < asettings[0].childNodes.length;s++)switch (asettings[0].childNodes[s].tagName){
                case "colwidth":
                    if (asettings[0].childNodes[s].firstChild&&asettings[0].childNodes[s].firstChild.data == "%")awidthmet="setInitWidthsP";
                    break;
                case "splitat":
                    split=(asettings[0].childNodes[s].firstChild ? asettings[0].childNodes[s].firstChild.data : false);
                    break;
            }
            };

    this._launchCommands(this.xmlLoader.doXPath("./beforeInit/call", hheadCol[0]));
    if (headCol.length > 0){
        if (this.hdr.rows.length > 0)this.clearAll(true);
        var sets = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
        ];
        var attrs = ["", "width", "type", "align", "sort", "color", "format", "hidden", "id"];
        var calls = ["", awidthmet, "setColTypes", "setColAlign", "setColSorting", "setColumnColor", "",
        "", "setColumnIds"];
        for (var i = 0;i < headCol.length;i++){
            for (var j = 1;j < attrs.length;j++)sets[j].push(headCol[i].getAttribute(attrs[j]));
            sets[0].push((headCol[i].firstChild
                ? headCol[i].firstChild.data
                : "").replace(/^\s*((\s\S)*.+)\s*$/gi, "$1"));
        };

        this.setHeader(sets[0]);
        for (var i = 0;i < calls.length;i++)if (calls[i])this[calls[i]](sets[i].join(this.delim))

        for (var i = 0;i < headCol.length;i++){
            if ((this.cellType[i].indexOf('co')== 0)||(this.cellType[i] == "clist")){
                var optCol = this.xmlLoader.doXPath("./option", headCol[i]);
                if (optCol.length){
                    var resAr = new Array();
                    if (this.cellType[i] == "clist"){
                        for (var j = 0;j < optCol.length;j++)resAr[resAr.length]=optCol[j].firstChild
                            ? optCol[j].firstChild.data
                            : "";
                        this.registerCList(i, resAr);
                    }else {
                        var combo = this.getCombo(i);
                        for (var j = 0;j < optCol.length;j++)combo.put(optCol[j].getAttribute("value"),
                            optCol[j].firstChild
                            ? optCol[j].firstChild.data
                            : "");
                    }
                }
            }else if (sets[6][i])if ((this.cellType[i].toLowerCase().indexOf("calendar")!=-1)||(this.fldSort[i] == "date"))
            this.setDateFormat(sets[6][i]);else
            this.setNumberFormat(sets[6][i], i);
    };

this.init();
var param=sets[7].join(this.delim);
if (this.setColHidden && param.replace(/,/g,"")!="")
    this.setColHidden(param);
if ((split)&&(this.splitAt))
    this.splitAt(split);
};

this._launchCommands(this.xmlLoader.doXPath("./afterInit/call", hheadCol[0]));
};

var gudCol = this.xmlLoader.doXPath("//rows/userdata", xmlDoc);
if (gudCol.length > 0){
    if (!this.UserData["gridglobaluserdata"])this.UserData["gridglobaluserdata"]=new Hashtable();
    for (var j = 0;j < gudCol.length;j++){
        this.UserData["gridglobaluserdata"].put(gudCol[j].getAttribute("name"),
            gudCol[j].firstChild
            ? gudCol[j].firstChild.data
            : "");
    }
    }
},






getCheckedRows:function(col_ind){
    var d = new Array();
    this.forEachRowA(function(id){
        if (this.cells(id, col_ind).getValue() != 0)
            d.push(id);
    },true)
    return d.join(",");
},

checkAll:function(){
    var mode=arguments.length?arguments[0]:1;
    for (var cInd=0;cInd<this.getColumnsNum();cInd++){
        if(this.getColType(cInd)=="ch")this.setCheckedRows(cInd,mode)
            }
        },

uncheckAll:function(){
    this.checkAll(0);
},

setCheckedRows:function(cInd,v){
    this.forEachRowA(function(id){
        if(this.cells(id,cInd).isCheckbox())this.cells(id,cInd).setValue(v)
            })
    },


_drawTooltip:function(e){
    var c = this.grid.getFirstParentOfType(e ? e.target : event.srcElement, 'TD');
    if (!c || ((this.grid.editor)&&(this.grid.editor.cell == c)))
        return true;
    var r = c.parentNode;
    if (!r.idd||r.idd == "__filler__")return;
    var el = (e ? e.target : event.srcElement);
    if (r.idd == window.unknown)return true;
    if (!this.grid.callEvent("onMouseOver", [
        r.idd,
        c._cellIndex,
        (e||window.event)]))
        return true;
    if ((this.grid._enbTts)&&(!this.grid._enbTts[c._cellIndex])){
        if (el.title)el.title='';
        return true;
    };

    if (c._cellIndex >= this.grid._cCount)return;
    var ced = this.grid.cells3(r, c._cellIndex);
    if (!ced || !ced.cell || !ced.cell._attrs)return;
    if (el._title)ced.cell.title="";
    if (!ced.cell._attrs['title'])el._title=true;
    if (ced)el.title=ced.cell._attrs['title']
        ||(ced.getTitle
            ? ced.getTitle()
            : (ced.getValue()||"").toString().replace(/<[^>]*>/gi, ""));
    return true;
},


enableCellWidthCorrection:function(size){
    if (_isFF)this._wcorr=parseInt(size);
},



getAllRowIds:function(separator){
    var ar = [];
    for (var i = 0;i < this.rowsBuffer.length;i++)if (this.rowsBuffer[i])ar.push(this.rowsBuffer[i].idd);return ar.join(separator||this.delim)
},
getAllItemIds:function(){
    return this.getAllRowIds();
},




preventIECaching:function(mode){
    this.no_cashe=convertStringToBoolean(mode);
    this.xmlLoader.rSeed=this.no_cashe;
},
enableColumnAutoSize:function(mode){
    this._eCAS=convertStringToBoolean(mode);
},

_onHeaderDblClick:function(e){
    var opts = this.grid;
    var el = opts.getFirstParentOfType(_isIE ? event.srcElement : e.target, "TD");
    if (!opts._eCAS)return false;
    opts.adjustColumnSize(el._cellIndexS)
},


adjustColumnSize:function(cInd, complex){
    if (this._hrrar && this._hrrar[cInd])return;
    this._notresize=true;
    var m = 0;
    this._setColumnSizeR(cInd, 20);
    for (var j = 1;j < this.hdr.rows.length;j++){
        var a = this.hdr.rows[j];
        a=a.childNodes[(a._childIndexes) ? a._childIndexes[cInd] : cInd];
        if ((a)&&((!a.colSpan)||(a.colSpan < 2)) && a._cellIndex==cInd){
            if ((a.childNodes[0])&&(a.childNodes[0].className == "hdrcell"))
                a=a.childNodes[0];
            m=Math.max(m, ((_isFF||_isOpera) ? (a.textContent.length*7) : a.scrollWidth));
        }
    };

var l = this.obj.rows.length;
for (var i = 1;i < l;i++){
    var z = this.obj.rows[i];
    if (!this.rowsAr[z.idd])continue;
    if (z._childIndexes&&z._childIndexes[cInd] != cInd || !z.childNodes[cInd])continue;
    if (_isFF||_isOpera||complex)z=z.childNodes[cInd].textContent.length*7;else
        z=z.childNodes[cInd].scrollWidth;
    if (z > m)m=z;
};

m+=20+(complex||0);
this._setColumnSizeR(cInd, m);
this._notresize=false;
this.setSizes();
},



detachHeader:function(index, hdr){
    hdr=hdr||this.hdr;
    var row = hdr.rows[index+1];
    if (row)row.parentNode.removeChild(row);
    this.setSizes();
},


detachFooter:function(index){
    this.detachHeader(index, this.ftr);
},


attachHeader:function(values, style, _type){
    if (typeof (values)== "string")
        values=this._eSplit(values);
    if (typeof (style)== "string")
        style=style.split(this.delim);
    _type=_type||"_aHead";
    if (this.hdr.rows.length){
        if (values)this._createHRow([
            values,
            style
            ], this[(_type == "_aHead") ? "hdr" : "ftr"]);
        else if (this[_type])for (var i = 0;i < this[_type].length;i++)this.attachHeader.apply(this, this[_type][i]);
    }else {
        if (!this[_type])this[_type]=new Array();
        this[_type][this[_type].length]=[
        values,
        style,
        _type
        ];
    }
},

_createHRow:function(data, parent){
    if (!parent){
        if (this.entBox.style.position!="absolute")this.entBox.style.position="relative";
        var z = document.createElement("DIV");
        z.className="c_ftr".substr(2);
        this.entBox.appendChild(z);
        var t = document.createElement("TABLE");
        t.cellPadding=t.cellSpacing=0;
        if (!_isIE){
            t.width="100%";
            t.style.paddingRight="20px";
        };

        t.style.marginRight="20px";
        t.style.tableLayout="fixed";
        z.appendChild(t);
        t.appendChild(document.createElement("TBODY"));
        this.ftr=parent=t;
        var hdrRow = t.insertRow(0);
        var thl = ((this.hdrLabels.length <= 1) ? data[0].length : this.hdrLabels.length);
        for (var i = 0;i < thl;i++){
            hdrRow.appendChild(document.createElement("TH"));
            hdrRow.childNodes[i]._cellIndex=i;
        };

        if (_isIE && _isIE<8)hdrRow.style.position="absolute";else
            hdrRow.style.height='auto';
    };

    var st1 = data[1];
    var z = document.createElement("TR");
    parent.rows[0].parentNode.appendChild(z);
    for (var i = 0;i < data[0].length;i++){
        if (data[0][i] == "#cspan"){
            var pz = z.cells[z.cells.length-1];
            pz.colSpan=(pz.colSpan||1)+1;
            continue;
        };

        if ((data[0][i] == "#rspan")&&(parent.rows.length > 1)){
            var pind = parent.rows.length-2;
            var found = false;
            var pz = null;
            while (!found){
                var pz = parent.rows[pind];
                for (var j = 0;j < pz.cells.length;j++)if (pz.cells[j]._cellIndex == i){
                    found=j+1;
                    break;
                };

                pind--;
            };

            pz=pz.cells[found-1];
            pz.rowSpan=(pz.rowSpan||1)+1;
            continue;
        };

        var w = document.createElement("TD");
        w._cellIndex=w._cellIndexS=i;
        if (this._hrrar && this._hrrar[i] && !_isIE)w.style.display='none';
        if (typeof data[0][i] == "object")w.appendChild(data[0][i]);
        else {
            if (this.forceDivInHeader)w.innerHTML="<div class='hdrcell'>"+(data[0][i]||"&nbsp;")+"</div>";else
                w.innerHTML=(data[0][i]||"&nbsp;");
            if ((data[0][i]||"").indexOf("#") != -1){
                var t = data[0][i].match(/(^|{)#([^}]+)(}|$)/);
                if (t){
                    var tn = "_in_header_"+t[2];
                    if (this[tn])this[tn]((this.forceDivInHeader ? w.firstChild : w), i, data[0][i].split(t[0]));
                }
            }
        };

    if (st1)w.style.cssText=st1[i];
    z.appendChild(w);
};

var self = parent;
if (_isKHTML){
    if (parent._kTimer)window.clearTimeout(parent._kTimer);
    parent._kTimer=window.setTimeout(function(){
        parent.rows[1].style.display='none';
        window.setTimeout(function(){
            parent.rows[1].style.display='';
        }, 1);
    }, 500);
}
},





forEachRow:function(custom_code){
    for (var a in this.rowsAr)if (this.rowsAr[a]&&this.rowsAr[a].idd)custom_code.apply(this, [this.rowsAr[a].idd]);
        },
forEachRowA:function(custom_code){
    for (var a =0;a<this.rowsBuffer.length;a++){
        if (this.rowsBuffer[a])custom_code.call(this, this._row(a).idd);
    }
    },

forEachCell:function(rowId, custom_code){
    var z = this.getRowById(rowId);
    if (!z)return;
    for (var i = 0;i < this._cCount;i++)custom_code(this.cells3(z, i),i);
},

enableAutoWidth:function(mode, max_limit, min_limit){
    this._awdth=[
    convertStringToBoolean(mode),
    parseInt(max_limit||99999),
    parseInt(min_limit||0)
    ];
    if (arguments.length == 1)this.objBox.style.overflowX=mode?"hidden":"auto";
},



updateFromXML:function(url, insert_new, del_missed, afterCall){
    if (typeof insert_new == "undefined")insert_new=true;
    this._refresh_mode=[
    true,
    insert_new,
    del_missed
    ];
    this.load(url,afterCall)
},
_refreshFromXML:function(xml){
    if (this._f_rowsBuffer)this.filterBy(0,"");
    reset = false;
    if (window.eXcell_tree){
        eXcell_tree.prototype.setValueX=eXcell_tree.prototype.setValue;
        eXcell_tree.prototype.setValue=function(content){
            var r=this.grid._h2.get[this.cell.parentNode.idd]
            if (r && this.cell.parentNode.valTag){
                this.setLabel(content);
            }else
                this.setValueX(content);
        }
    };

var tree = this.cellType._dhx_find("tree");
xml.getXMLTopNode("rows");
var pid = xml.doXPath("//rows")[0].getAttribute("parent")||0;
var del = {};

if (this._refresh_mode[2]){
    if (tree != -1)this._h2.forEachChild(pid, function(obj){
        del[obj.id]=true;
    }, this);else
        this.forEachRow(function(id){
            del[id]=true;
        });
};

var rows = xml.doXPath("//row");
for (var i = 0;i < rows.length;i++){
    var row = rows[i];
    var id = row.getAttribute("id");
    del[id]=false;
    var pid = row.parentNode.getAttribute("id")||pid;
    if (this.rowsAr[id] && this.rowsAr[id].tagName!="TR"){
        if (this._h2)this._h2.get[id].buff.data=row;else
            this.rowsBuffer[this.getRowIndex(id)].data=row;
        this.rowsAr[id]=row;
    }else if (this.rowsAr[id]){
        this._process_xml_row(this.rowsAr[id], row, -1);
        this._postRowProcessing(this.rowsAr[id],true)
    }else if (this._refresh_mode[1]){
        var dadd={
            idd: id,
            data: row,
            _parser: this._process_xml_row,
            _locator: this._get_xml_data
        };

        if (this._refresh_mode[1]=="top")this.rowsBuffer.unshift(dadd);else
            this.rowsBuffer.push(dadd);
        if (this._h2){
            reset=true;
            (this._h2.add(id,(row.parentNode.getAttribute("id")||row.parentNode.getAttribute("parent")))).buff=this.rowsBuffer[this.rowsBuffer.length-1];
        };

        this.rowsAr[id]=row;
        row=this._row(this.rowsBuffer.length-1);
        this._insertRowAt(row,-1)
    }
};

if (this._refresh_mode[2])for (id in del){
    if (del[id]&&this.rowsAr[id])this.deleteRow(id);
};

this._refresh_mode=null;
if (window.eXcell_tree)eXcell_tree.prototype.setValue=eXcell_tree.prototype.setValueX;
if (reset)this._Sort();
if (this._f_rowsBuffer){
    this._f_rowsBuffer = null;
    this.filterByAll();
}
},



getCustomCombo:function(id, ind){
    var cell = this.cells(id, ind).cell;
    if (!cell._combo)cell._combo=new dhtmlXGridComboObject();
    return cell._combo;
},


setTabOrder:function(order){
    var t = order.split(this.delim);
    this._tabOrder=[];
    var max=this._cCount||order.length;
    for (var i = 0;i < max;i++)t[i]={
        c: parseInt(t[i]),
        ind: i
    };

    t.sort(function(a, b){
        return (a.c > b.c ? 1 : -1);
    });
    for (var i = 0;i < max;i++)if (!t[i+1]||( typeof t[i].c == "undefined"))
        this._tabOrder[t[i].ind]=(t[0].ind+1)*-1;else
        this._tabOrder[t[i].ind]=t[i+1].ind;
    },

i18n:{
    loading: "Loading",
    decimal_separator:".",
    group_separator:","
},


_key_events:{
    k13_1_0: function(){
        var rowInd = this.rowsCol._dhx_find(this.row)
        this.selectCell(this.rowsCol[rowInd+1], this.cell._cellIndex, true);
    },
    k13_0_1: function(){
        var rowInd = this.rowsCol._dhx_find(this.row)
        this.selectCell(this.rowsCol[rowInd-1], this.cell._cellIndex, true);
    },
    k13_0_0: function(){
        this.editStop();
        this.callEvent("onEnter", [
            (this.row ? this.row.idd : null),
            (this.cell ? this.cell._cellIndex : null)
            ]);
        this._still_active=true;
    },
    k9_0_0: function(){
        this.editStop();
        if (!this.callEvent("onTab",[true])) return true;
        var z = this._getNextCell(null, 1);
        if (z){
            this.selectCell(z.parentNode, z._cellIndex, (this.row != z.parentNode), false, true);
            this._still_active=true;
        }
    },
k9_0_1: function(){
    this.editStop();
    if (!this.callEvent("onTab",[false])) return false;
    var z = this._getNextCell(null, -1);
    if (z){
        this.selectCell(z.parentNode, z._cellIndex, (this.row != z.parentNode), false, true);
        this._still_active=true;
    }
},
k113_0_0: function(){
    if (this._f2kE)this.editCell();
},
k32_0_0: function(){
    var c = this.cells4(this.cell);
    if (!c.changeState||(c.changeState()=== false))
        return false;
},
k27_0_0: function(){
    this.editStop(true);
},
k33_0_0: function(){
    if (this.pagingOn)this.changePage(this.currentPage-1);else
        this.scrollPage(-1);
},
k34_0_0: function(){
    if (this.pagingOn)this.changePage(this.currentPage+1);else
        this.scrollPage(1);
},
k37_0_0: function(){
    if (!this.editor&&this.isTreeGrid())
        this.collapseKids(this.row)
    else
        return false;
},
k39_0_0: function(){
    if (!this.editor&&this.isTreeGrid())
        this.expandKids(this.row)
    else
        return false;
},
k40_0_0: function(){
    var master = this._realfake?this._fake:this;
    if (this.editor&&this.editor.combo)this.editor.shiftNext();
    else {
        if (!this.row.idd)return;
        var rowInd = Math.max((master._r_select||0),this.getRowIndex(this.row.idd))+1;
        if (this.rowsBuffer[rowInd]){
            master._r_select=null;
            this.selectCell(rowInd, this.cell._cellIndex, true);
            if (master.pagingOn)master.showRow(master.getRowId(rowInd));
        }else {
            this._key_events.k34_0_0.apply(this, []);
            if (this.pagingOn && this.rowsCol[rowInd])this.selectCell(rowInd, 0, true);
        }
    };

this._still_active=true;
},
k38_0_0: function(){
    var master = this._realfake?this._fake:this;
    if (this.editor&&this.editor.combo)this.editor.shiftPrev();
    else {
        if (!this.row.idd)return;
        var rowInd = this.getRowIndex(this.row.idd)+1;
        if (rowInd != -1 && (!this.pagingOn || (rowInd!=1))){
            var nrow = this._nextRow(rowInd-1, -1);
            this.selectCell(nrow, this.cell._cellIndex, true);
            if (master.pagingOn && nrow)master.showRow(nrow.idd);
        }else {
            this._key_events.k33_0_0.apply(this, []);
        }
    };

this._still_active=true;
}
},



_build_master_row:function(){
    var t = document.createElement("DIV");
    var html = ["<table><tr>"];
    for (var i = 0;i < this._cCount;i++)html.push("<td></td>");
    html.push("</tr></table>");
    t.innerHTML=html.join("");
    this._master_row=t.firstChild.rows[0];
},

_prepareRow:function(new_id){
    if (!this._master_row)this._build_master_row();
    var r = this._master_row.cloneNode(true);
    for (var i = 0;i < r.childNodes.length;i++){
        r.childNodes[i]._cellIndex=i;
        if (this._enbCid)r.childNodes[i].id="c_"+new_id+"_"+i;
        if (this.dragAndDropOff)this.dragger.addDraggableItem(r.childNodes[i], this);
    };

    r.idd=new_id;
    r.grid=this;
    return r;
},


_process_jsarray_row:function(r, data){
    r._attrs={};

    for (var j = 0;j < r.childNodes.length;j++)r.childNodes[j]._attrs={};

    this._fillRow(r, (this._c_order ? this._swapColumns(data) : data));
    return r;
},
_get_jsarray_data:function(data, ind){
    return data[ind];
},
_process_json_row:function(r, data){
    r._attrs={};

    for (var j = 0;j < r.childNodes.length;j++)r.childNodes[j]._attrs={};

    this._fillRow(r, (this._c_order ? this._swapColumns(data.data) : data.data));
    return r;
},
_get_json_data:function(data, ind){
    return data.data[ind];
},

_process_csv_row:function(r, data){
    r._attrs={};

    for (var j = 0;j < r.childNodes.length;j++)r.childNodes[j]._attrs={};

    this._fillRow(r, (this._c_order ? this._swapColumns(data.split(this.csv.cell)) : data.split(this.csv.cell)));
    return r;
},
_get_csv_data:function(data, ind){
    return data.split(this.csv.cell)[ind];
},


_process_xml_row:function(r, xml){
    var cellsCol = this.xmlLoader.doXPath(this.xml.cell, xml);
    var strAr = [];
    r._attrs=this._xml_attrs(xml);
    if (this._ud_enabled){
        var udCol = this.xmlLoader.doXPath("./userdata", xml);
        for (var i = udCol.length-1;i >= 0;i--)this.setUserData(r.idd,udCol[i].getAttribute("name"), udCol[i].firstChild
            ? udCol[i].firstChild.data
            : "");
    };

    for (var j = 0;j < cellsCol.length;j++){
        var cellVal = cellsCol[this._c_order?this._c_order[j]:j];
        if (!cellVal)continue;
        var cind = r._childIndexes?r._childIndexes[j]:j;
        var exc = cellVal.getAttribute("type");
        if (r.childNodes[cind]){
            if (exc)r.childNodes[cind]._cellType=exc;
            r.childNodes[cind]._attrs=this._xml_attrs(cellVal);
        };

        if (!cellVal.getAttribute("xmlcontent")){
            if (cellVal.firstChild)cellVal=cellVal.firstChild.data;else
                cellVal="";
        };

        strAr.push(cellVal);
    };

    for (j < cellsCol.length;j < r.childNodes.length;j++)r.childNodes[j]._attrs={};

    if (r.parentNode&&r.parentNode.tagName == "row")r._attrs["parent"]=r.parentNode.getAttribute("idd");
    this._fillRow(r, strAr);
    return r;
},
_get_xml_data:function(data, ind){
    data=data.firstChild;
    while (true){
        if (!data)return "";
        if (data.tagName == "cell")ind--;
        if (ind < 0)break;
        data=data.nextSibling;
    };

    return (data.firstChild ? data.firstChild.data : "");
},
render_row: function(a) {
    if (!this.rowsBuffer[a])
        return -1;
    if (this.rowsBuffer[a]._parser) {
        var b = this.rowsBuffer[a];
        if (this.rowsAr[b.idd] && this.rowsAr[b.idd].tagName == "TR")
            return this.rowsBuffer[a] = this.rowsAr[b.idd];
        var c = this._prepareRow(b.idd);
        this.rowsBuffer[a] = c;
        this.rowsAr[b.idd] = c;
        b._parser.call(this, c, b.data);
        this._postRowProcessing(c);
        return c
    }
    return this.rowsBuffer[a]
},
_get_cell_value: function(a, b, c) {
    return a._locator ? (this._c_order && (b = this._c_order[b]), a._locator.call(this, a.data, b)) : this.cells3(a, b)[c ? c : "getValue"]()
},
sortRows: function(a, b, c) {
    c = (c || "asc").toLowerCase();
    b = b || this.fldSort[a];
    a = a || 0;
    if (this.isTreeGrid())
        this.sortTreeRows(a, b, c);
    else {
        var d = {}, e = this.cellType[a], h = "getValue";
        e == "link" && (h = "getContent");
        if (e == "dhxCalendar" || e == "dhxCalendarA")
            h = "getDate";
        for (var j = 0; j < this.rowsBuffer.length; j++)
            d[this.rowsBuffer[j].idd] = this._get_cell_value(this.rowsBuffer[j], a, h);
        this._sortRows(a, b, c, d)
    }
    this.callEvent("onAfterSorting", [a, b, c])
},
_fillRow:function(r, text){
    if (this.editor){
        this.editStop();
    }

    var columns = this.opts.columns || text;
    var render = this.opts.render;
    for (var i = 0;i < r.childNodes.length;i++){
        // if ((i < text.length)||(this.defVal[i])){
        var ii=r.childNodes[i]._cellIndex;
        var val = text[ii];
        var html = val;
        $.each(text, function(k, v){
            if(k == columns[i]){
                val = v || "";
                html = v == null ? "" : (render[k] ? render[k](val, text) : v);
                return false;
            }
        });


        var aeditor = this.cells4(r.childNodes[i]);
        // if ((this.defVal[ii])&&((val == "")||( typeof (val) == "undefined"))){
        //val=this.defVal[ii];
        if (aeditor){
            aeditor.setValue(val);
            aeditor.setLabel(html);
        }

    // }
    //}else {
    //r.childNodes[i].innerHTML="";
    //r.childNodes[i]._clearCell=true;
    //}
    };
    return r;
},

_postRowProcessing:function(r,donly){
    if (r._attrs["class"])r._css=r.className=r._attrs["class"];
    if (r._attrs.locked)r._locked=true;
    if (r._attrs.bgColor)r.bgColor=r._attrs.bgColor;
    var cor=0;
    for (var i = 0;i < r.childNodes.length;i++){
        var c=r.childNodes[i];
        var ii=c._cellIndex;
        var s = c._attrs.style||r._attrs.style;
        if (s)c.style.cssText+=";"+s;
        if (c._attrs["class"])c.className=c._attrs["class"];
        s=c._attrs.align||this.cellAlign[ii];
        if (s)c.align=s;
        c.vAlign=c._attrs.valign||this.cellVAlign[ii];
        var color = c._attrs.bgColor||this.columnColor[ii];
        if (color)c.bgColor=color;
        if (c._attrs["colspan"] && !donly){
            this.setColspan(r.idd, i+cor, c._attrs["colspan"]);
            cor+=(c._attrs["colspan"]-1);
        };

        if (this._hrrar&&this._hrrar[ii]&&!donly){
            c.style.display="none";
        }
    };

this.callEvent("onRowCreated", [
    r.idd,
    r,
    null
    ]);
},
param: function(a){
    var s = [];
    var encode = function(str) {
        //str = encodeURIComponent(encodeURIComponent(str));
        //str = str.replace(/\+/g, "%u002B");
        //encodeURI encodeURIComponent escape
        return str;
    };
    function add(key, value) {
        s[s.length] = encode(key) + '=' + encode(value);
    };
    if (jQuery.isArray(a) || a.jquery)
        jQuery.each(a,
            function() {
                add(this.name, this.value);
            });
    else
        for (var j in a)
            if (jQuery.isArray(a[j]))
                jQuery.each(a[j],
                    function() {
                        add(j, this);
                    });
            else
                add(j, jQuery.isFunction(a[j]) ? a[j]() : a[j]);
    return s.join("&").replace(/%20/g, "+");

},
load:function(url, call, type){
    this.callEvent("onXLS", [this]);
    if (arguments.length == 2 && typeof call != "function"){
        type=call;
        call=null;
    };
    type=type||"xml";
    if (!this.xmlFileUrl)
        this.xmlFileUrl=url;
    this._data_type=type;

    this.requestTime = {
        req: {
            _start: new Date().getTime(),
            _end: new Date().getTime()
        },
        process: {
            _start: new Date().getTime(),
            _end: new Date().getTime()
        }
    };
    //if($.progressBar){
    //$.progressBar.show(0, 1);
    //}
    this.xmlLoader.onloadAction=function(opts, b, c, d, xml){
        if (!opts.callEvent)
            return;
        xml=opts["_process_"+type](xml);
        if (!opts._contextCallTimer)
            opts.callEvent("onXLE", [opts,0,0,xml]);
        var grid = this.mainObject;
        if (call){
            call(grid);
            call=null;
        }
    };

    /* @Author: Lincong; POST查询 this.param */
    if(this.opts.pager.method.toUpperCase() == "POST"){
        this.xmlLoader.loadXML(url, "POST", this.param(this.opts.pager.param));
    }else{
        this.xmlLoader.loadXML(url);
    }
    $(".dhtmlxGrid_selection").css({
        width: "0px",
        height: "0px"
    })
},

loadXML:function(url, afterCall){
    var grid = this.mainObject;
    this.load(url, function(){
        //send grid to onSuccess!
        afterCall(grid);
    }, "xml")
},

parse:function(data, call, type){
    if (arguments.length == 2 && typeof call != "function"){
        type=call;
        call=null;
    };

    type=type||"xml";
    this._data_type=type;
    data=this["_process_"+type](data);
    if (!this._contextCallTimer)this.callEvent("onXLE", [this,0,0,data]);
    if (call)call(this);
},

xml:{
    top: "rows",
    row: "./row",
    cell: "./cell",
    s_row: "row",
    s_cell: "cell",
    row_attrs: [],
    cell_attrs: []
},

csv:{
    row: "\n",
    cell: ","
},

_xml_attrs:function(node){
    var data = {};

    if (node.attributes.length){
        for (var i = 0;i < node.attributes.length;i++)data[node.attributes[i].name]=node.attributes[i].value;
    };

    return data;
},

_process_xml:function(xml){
    if (!xml.doXPath){
        var t = new dtmlXMLLoaderObject(function(){});
        if (typeof xml == "string")t.loadXMLString(xml);
        else {
            if (xml.responseXML)t.xmlDoc=xml;else
                t.xmlDoc={};

            t.xmlDoc.responseXML=xml;
        };

        xml=t;
    };

    if (this._refresh_mode)return this._refreshFromXML(xml);
    this._parsing=true;
    var top = xml.getXMLTopNode(this.xml.top)
    if (top.tagName.toLowerCase()!=this.xml.top) return;
    this._parseHead(top);
    var rows = xml.doXPath(this.xml.row, top)
    var cr = parseInt(xml.doXPath("//"+this.xml.top)[0].getAttribute("pos")||0);
    var total = parseInt(xml.doXPath("//"+this.xml.top)[0].getAttribute("total_count")||0);
    if (total&&!this.rowsBuffer[total-1])this.rowsBuffer[total-1]=null;
    if (this.isTreeGrid())
        return this._process_tree_xml(xml);
    for (var i = 0;i < rows.length;i++){
        if (this.rowsBuffer[i+cr])continue;
        var id = rows[i].getAttribute("id")||(i+cr+1);
        this.rowsBuffer[i+cr]={
            idd: id,
            data: rows[i],
            _parser: this._process_xml_row,
            _locator: this._get_xml_data
        };

        this.rowsAr[id]=rows[i];
    };

    this._dataset();
    this._parsing=false;
    return xml.xmlDoc.responseXML?xml.xmlDoc.responseXML:xml.xmlDoc;
},


_process_jsarray:function(data){
    this._parsing=true;
    if (data&&data.xmlDoc)eval("data="+data.xmlDoc.responseText+";");
    for (var i = 0;i < data.length;i++){
        var id = i+1;
        this.rowsBuffer.push({
            idd: id,
            data: data[i],
            _parser: this._process_jsarray_row,
            _locator: this._get_jsarray_data
        });
        this.rowsAr[id]=data[i];
    };

    this._dataset();
    this._parsing=false;
},

_process_csv:function(data){
    this._parsing=true;
    if (data.xmlDoc)data=data.xmlDoc.responseText;
    data=data.replace(/\r/g,"");
    data=data.split(this.csv.row);
    if (this._csvHdr){
        this.clearAll();
        var thead=data.splice(0,1)[0].split(this.csv.cell);
        if (!this._csvAID)thead.splice(0,1);
        this.setHeader(thead.join(this.delim));
        this.init();
    };

    for (var i = 0;i < data.length;i++){
        if (!data[i] && i==data.length-1)continue;
        if (this._csvAID){
            var id = i+1;
            this.rowsBuffer.push({
                idd: id,
                data: data[i],
                _parser: this._process_csv_row,
                _locator: this._get_csv_data
            });
        }else {
            var temp = data[i].split(this.csv.cell);
            var id = temp.splice(0,1)[0];
            this.rowsBuffer.push({
                idd: id,
                data: temp,
                _parser: this._process_jsarray_row,
                _locator: this._get_jsarray_data
            });
        };

        this.rowsAr[id]=data[i];
    };

    this._dataset();
    this._parsing=false;
},

_doPagination: function(data, error){
    //	if($.progressBar){
    //		$.progressBar.hide(0);
    //		}
    var _grid = this;
    var pageObject = [];
    var _endLoadTime = this._endLoadTime ? this._endLoadTime : 0;
    var _startLoadTime = this._startLoadTime ? this._startLoadTime : 0;
    this.opts.pager.loadingTime = _endLoadTime - _startLoadTime;

    var pager = this.opts.pager;
    if(error && !error.flag){
        var readyState = data.xmlDoc&&data.xmlDoc.readyState ? data.xmlDoc.readyState : "未知状态";
        var statusText = data.xmlDoc && readyState == 4 ? data.xmlDoc.statusText : "未知错误";
        var status = data.xmlDoc ? data.xmlDoc.status : "未知状态";
        //$(pager.id).html("<ul><li><span class='pager-server-error'>发生错误---状态:"+statusText+"; 响应:"+readyState+"; HTTP状态代码:"+status+"</span></li></ul>");
        $(pager.id).html("");

        if(!window.__GRID_ERROR__){
            window.__GRID_ERROR__ = true;
        }

        if(window.__GRID_ERROR__ && $.colorboxInited){
            window.__GRID_ERROR__ = false;
            var _err_id = "_err_id_"+new Date().getTime();
            $(".grid-error-layout").remove();
            var _err_box = $("<div class='grid-error-layout' id='"+_err_id+"'></div>");
            var _err_content = "<div class='grid-error-content'><div class='grid-error-title'>提示</div>"+error.e+"</div>";
            _err_box.append(_err_content);
            $("body").append(_err_box);

            var _colorbox_err_box= $("#"+_err_id);
            var opts = this.opts;
            $.colorbox({
                iframe: false,
                inline: true,
                href: _colorbox_err_box,
                fixed: true,
                opacity: 0.1,
                scrolling: true,
                overlayClose: false,
                title: "<font style='font-size:13px'>服务热线：400-888-4636　服务QQ群：12790338</font>",
                onOpen: function(){
                    _colorbox_err_box.fadeIn(0);
                },
                onClosed: function(){
                    _colorbox_err_box.fadeOut(0);
                    opts.onErrColorboxClose(_colorbox_err_box, data, error);
                },
                onCleanup: function(){
                    _colorbox_err_box.fadeOut(0);
                }
            });

            return;
        }


        //提示异常
        //var p = this.opts.pager;
        this._ERROR_ = data;

        if(!document._GRID_ERROR_INDEX_){
            document._GRID_ERROR_INDEX_ = 1;
        }
        var _ERROR_INDEX_ = document._GRID_ERROR_INDEX_ ? document._GRID_ERROR_INDEX_++ : 0;
        if(!document._GRID_ERROR_CACHE_){
            document._GRID_ERROR_CACHE_ = [];
        }
        document._GRID_ERROR_CACHE_[_ERROR_INDEX_] = {
            _GRID_ERROR_INDEX_: _ERROR_INDEX_,
            _ONLOADTIME_: this.opts.pager.loadingTime,
            _DATA_: data,
            _objBox: $(this.objBox)
        };

        if(!document.__SHOW_GRID_ERROR_BY_INDEX_){
            document.__SHOW_GRID_ERROR_BY_INDEX_ = function(index){
                $(".GRID_ERROR").remove();
                var _ERROR_CACHE_ = document._GRID_ERROR_CACHE_[index];
                var temp = "<div class='main GRID_ERROR' id='__SHOW_GRID_ERROR_BY_INDEX_"+index+"' style='position: absolute; display:none; padding:0; margin:0'>\
							<div><b> &nbsp; &nbsp;错误详情 </b> <a style='color:red' onclick='$(this).parent().parent().slideUp(500, function(){$(this).remove();});' href='javascript:;' >关闭</a><hr></div>\
							<div><table width='100%'>\
								<tr>\
									<th width='100'>错误索引</th><td width='0'>"+index+"</td>\
								</tr>\
								<tr>\
									<th>请求地址</th><td><a target='_blank' href='"+_ERROR_CACHE_._DATA_.filePath+"'>"+_ERROR_CACHE_._DATA_.filePath+"</a></td>\
								</tr>\
								<tr>\
									<th>请求状态</th><td><b>readyState:</b> \""+_ERROR_CACHE_._DATA_.xmlDoc.readyState+"\"<b>status: </b>\""+_ERROR_CACHE_._DATA_.xmlDoc.status+"\"<b>statusText: </b>\""+_ERROR_CACHE_._DATA_.xmlDoc.statusText+"\"<br></td>\
								</tr>\
								<tr>\
									<th>请求用时</th><td>"+_ERROR_CACHE_._ONLOADTIME_+"ms</td>\
								</tr>\
								<tr>\
									<th>响应内容</th><td><div id='_ERROR_responseText' style='overflow-y: auto; '>"+_ERROR_CACHE_._DATA_.xmlDoc.responseText+"</div></td>\
								</tr>\
							</table></div>\
						</div>";
                $("body").append($(temp));
                $("#__SHOW_GRID_ERROR_BY_INDEX_"+index).css({
                    position: "absolute",
                    top: _ERROR_CACHE_._objBox.offset().top,
                    left: _ERROR_CACHE_._objBox.offset().left,
                    width: _ERROR_CACHE_._objBox.width(),
                    height: _ERROR_CACHE_._objBox.height(),
                    background: "#fff"
                });
                $("#_ERROR_responseText").css({
                    height: _ERROR_CACHE_._objBox.height() - 68
                });

                //$("#__SHOW_GRID_ERROR_BY_INDEX_"+index).append("<a href='javascript:;' onclick=\"$('#__SHOW_GRID_ERROR_BY_INDEX_"+index+"').slideUp(500, function(){$('#__SHOW_GRID_ERROR_BY_INDEX_"+index+"').remove();});\">关闭</a>");

                $("#__SHOW_GRID_ERROR_BY_INDEX_"+index).slideDown();
            }
        }

        var _progress = $("<div class='dhxlayout_progress dhxlayout_progress_error' id='"+id+"_progress'>\
								<span class='dhxlayout_progress_error_text'>发生错误---状态:"+statusText+"; 响应:"+readyState+"; HTTP状态代码:"+status+"<a href='javascript:document.__SHOW_GRID_ERROR_BY_INDEX_("+_ERROR_INDEX_+");'>查看详细信息</a></span>\
								</div>");
        var id = $(this.hdrBox).parent().attr("id");
        _progress.css({
            top: $(this.objBox).offset().top,
            left: $(this.objBox).offset().left,
            height: $(this.objBox).height(),
            width: $(this.objBox).width()
        });
        $("body").append(_progress);
        return false;
    }

    var pagerStr = pager.pageStatMessage != "" ?
    '<ul>\
		<li><a class="pager-first">首页</a></li>\
		<li><a class="pager-prev">上一页</a></li>\
		<li><a class="pager-next">下一页</a></li>\
		<li><a class="pager-last">尾页</a></li>\
		<li><input class="pager-input" value="{currentPage}"/><a class="pager-go" type="button" value="go" >go</a></li>\
		<li><span class="pager-detail">共{total}条数据 共{pageCount}页 每页{pageSize}条 现在显示第 {currentPage} 页 {xls}{pdf} {print} {showStatus}</span></li>\
	</ul>' :
    '<ul>\
		<li><a class="pager-first">首页</a></li>\
		<li><a class="pager-prev">上一页</a></li>\
		<li><a class="pager-next">下一页</a></li>\
		<li><a class="pager-last">尾页</a></li>\
		<li><input class="pager-input" value="{currentPage}"/><a class="pager-go" type="button" value="go" >go</a></li>\
		<li><span class="pager-detail">'+pager.pageStatMessage+' {xls}{pdf} </span></li>\
	</ul>';



    //this is a number
    this.opts.pager.total = !data[pager.record] || data[pager.record] == null ? 0 : data[pager.record];
    //兼容新的json传递规则
    this.opts.pager.total = data.pagination && data.pagination.total ? data.pagination.total : this.opts.pager.total;

    //this is currentPage
    this.opts.pager.pageCount = Math.ceil(pager.total / pager.pageSize);

    if(pager.total == 0){
        pager.pageCount = 0;
        pager.page = 1;
    }

    var r1 = parseInt((pager.page - 1) * pager.pageSize) + 1.0;
    var r2 = parseInt(r1) + parseInt(pager.pageSize) - 1;

    if (pager.total < r2) {
        r2 = pager.total
        };

    for(i = r1; i <= r2; i++){
        pageObject.push(i);
    }

    //pageObject =

    var _options = "";
    if($.isArray(pager.pageSizeArray)){
        $.each(pager.pageSizeArray, function(i, n){
            _options += "<option value='"+ parseInt(n) +"' "+(n == pager.pageSize ? "selected" : "")+">"+parseInt(n)+"</option>";
        });
    }

    pagerStr = pagerStr.replace(/{total}/g, pager.total).replace(/{currentPage}/g, pager.page).replace(/{pageCount}/g, pager.pageCount);
    //pagerStr = !$.isArray(pager.pageSize) ?
    pagerStr = pagerStr
    .replace(/{pageSize}/g, "<select class='grid-pager-pageSizeArray'>"+_options+"</select>")
    .replace(/{print}/g, "<span class='grid-print-view'>打印</span>")
    .replace(/{xls}/, pager.showToXLS == true ? "<span class='grid-toXls'>导出</span>" : "")
    .replace(/{pdf}/, pager.showToPDF == true ? "<span class='grid-toPdf'>PDF</span>" : "");// :
    //pagerStr.replace(/{pageSize}/g, '<select class="pager-input" value="{currentPage}">'+_options+'</select>');

    //data grid fn group
    if(!window["_GRID_FN_"]){
        window['_GRID_FN_'] = {
            requestTime: {},
            showReqDetail: function(){
                var req_start = new Date(this.requestTime.req._start);
                var req_end = new Date(this.requestTime.req._end);
                var process_start = new Date(this.requestTime.process._start);
                var process_end = new Date(this.requestTime.process._end);

                alert("请求开始: "+req_start.toLocaleString()+"\n"+
                    "请求结束: "+req_end.toLocaleString()+"\n"+
                    "请求用时: "+(req_end-req_start)+"ms\n"+
                    "\n"+
                    "数据处理开始: "+process_start.toLocaleString()+"\n"+
                    "数据处理结束: "+process_end.toLocaleString()+"\n"+
                    "数据处理用时: "+(process_end-process_start)+"ms\n");
            }
        };
    }

    pagerStr = typeof(pager.showStatus) != "undefined" && pager.showStatus == true ? pagerStr.replace(/{showStatus}/g, ' <span class="grid-print-time-detail" onclick="_GRID_FN_.showReqDetail();">耗时</span> '+(pager.loadingTime/1000)+'秒') : pagerStr.replace(/{showStatus}/g, "");



    $(pager.id).html(pagerStr);

    var opts = this;

    $(pager.id).find(".grid-print-view").bind("click", function(){
        opts.printView();
    });

    $(pager.id).find(".pager-first").bind("click", function(){
        opts._pageBuilder('first');
    });
    $(pager.id).find(".pager-prev").bind("click", function(){
        opts._pageBuilder('prev');
    });
    $(pager.id).find(".pager-next").bind("click", function(){
        opts._pageBuilder('next');
    });
    $(pager.id).find(".pager-last").bind("click", function(){
        opts._pageBuilder('last');
    });
    var pageCount = this.opts.pager.pageCount;

    $(pager.id).find(".grid-pager-pageSizeArray").change(function(){
        var inputVal = $(pager.id).find(".grid-pager-pageSizeArray").val();
        pager.pageSize = parseInt(inputVal);
        opts._pageBuilder('input', 1);
    });
    $(pager.id).find(".pager-go").bind("click", function(){
        var inputVal = $.trim($(pager.id).find(".pager-input").val());
        if(isNaN(inputVal) || parseInt(inputVal) <= 0 || (pageCount == 1 && parseInt(inputVal) == 1)){
            $(pager.id).find(".pager-input").val(1);
            return false;
        }
        if(parseInt(inputVal) > pageCount){
            $(pager.id).find(".pager-input").val(pageCount)
            }
        opts._pageBuilder('input', $(pager.id).find(".pager-input").val());
    });
    $(pager.id).find(".grid-toXls").bind("click", function(){
        //try{
        var xls = pager.xls || {};

        if(xls.url && xls.url != ""){
            try{
                _grid.toExcel(xls.url, xls.mode||"", xls.header||"", xls.footer||"", xls.rows||"", xls.name||"");
            }catch(e){
                alert("导出excel失败，原因是"+e.message);
            }
        }else{
            alert("导出excel失败，请指定导出路径");
        }

    //}catch(e){
    //alert("导出excel失败，原因是"+e.message);
    //}

    });

    $(pager.id).find(".pager-input").focus(function(){
        $(this).select();
    }).keydown(function(e){
        e = e || e.event;
        if(e.keyCode == 13)
            $(pager.id).find(".pager-go").click();
    });
    if(pager.page==1){
        $(pager.id).find(".pager-first").addClass("pager-disabled");
        $(pager.id).find(".pager-prev").addClass("pager-disabled");
    }else{
        $(pager.id).find(".pager-first").removeClass("pager-disabled");
        $(pager.id).find(".pager-prev").removeClass("pager-disabled");
    }

    if(pager.page == pager.pageCount){
        $(pager.id).find(".pager-next").addClass("pager-disabled");
        $(pager.id).find(".pager-last").addClass("pager-disabled");
    }else{
        $(pager.id).find(".pager-next").removeClass("pager-disabled");
        $(pager.id).find(".pager-last").removeClass("pager-disabled");
    }
    if(pager.total==0){
        $(pager.id).find(".pager-next, .pager-last, .pager-next, .pager-first").removeClass("pager-disabled").addClass("pager-disabled");
    }
    //autoHeight
    if(this.opts.height == "auto"){
        var 	_girdBox = this.opts.self,
        _hdr = $(this.hdr),
        _hdrBox = $(this.hdrBox),
        _obj = $(this.obj),
        _objBox = $(this.objBox),
        _objHeight = $(this.obj).height();

        window.clearInterval(this._autoHeight);

        this._autoHeight = window.setInterval(function(){
            _hdrBox.height(_hdr.height());
            _obj.height(_objHeight + 20);
            _objBox.height(_obj.height());

            setTimeout(function(){
                $(_girdBox).height(_obj.height() + _hdr.height());
            }, 100);

        }, 1000);
    }





    this.requestTime.process._end = new Date().getTime();
    _GRID_FN_.requestTime = this.requestTime;
    return pageObject;
},
_pageBuilder: function(pageType, inputVal){
    var p = this.opts.pager;

    if(p.isChanged == true){
        if(!confirm(p.isContinueByDataChanged)){
            return false;
        }else{
            this.opts.pager.isChanged = false;
        }
    }

    //do page onLoad
    p.onLoad(pageType, inputVal);

    var flag = true;

    switch (pageType){
        case 'first':
            if (p.page == 1){
                flag = false;
                break;
            }
            this.opts.pager.page = 1;
            break;

        case 'prev':
            if (p.page == 1) {
                flag = false;
                break;
            }
            if (p.page > 1) {
                this.opts.pager.page = parseInt(p.page) - 1;
            }
            break;

        case 'next':
            if (p.page >= p.pageCount) {
                flag = false;
                break;
            }
            this.opts.pager.page = parseInt(p.page) + 1;
            break;

        case 'last':
            if (p.page >= p.pageCount){
                flag = false;
                break;
            }
            this.opts.pager.page = p.pageCount;
            break;
        case 'input':
            if(!inputVal || isNaN(inputVal) || parseInt(inputVal) > p.pageCount || parseInt(inputVal) <= 0){
                flag = false;
                break;
            }
            this.opts.pager.page = inputVal;
            //预留文本框页码跳转
            break;
    }

    if(flag == true){
        $(p.id).html("<ul><li><span class='pager-loading'>"+p.loadingMassage+"</span></li></ul>");
        var id = $(this.hdrBox).parent().attr("id");
        var _progress = $("#"+id+"_progress").length==1 ? $("#"+id+"_progress") : $("<div class='dhxlayout_progress' id='"+id+"_progress'></div>");
        _progress.css({
            top: $(this.objBox).offset().top,
            left: $(this.objBox).offset().left,
            height: $(this.objBox).height(),
            width: $(this.objBox).width()
        });
        $("body").append(_progress);

        var param = p.param ? $.param(p.param) : "";
        var qry = p.method.toUpperCase() == "POST" ? p.url+"?"+p.pageParmName+"="+p.page+"&"+p.pagesizeParmName+"="+p.pageSize : p.url+"?"+p.pageParmName+"="+p.page+"&"+p.pagesizeParmName+"="+p.pageSize+"&"+param;
        this._startLoadTime = new Date().getTime();
        //var grid = this.grid;
        this.clearAndLoad(qry, function(grid){
            p._onSuccess(grid);
            p.onComplete(grid, p);
            grid.opts.doBindRowClick(grid);
            _progress.fadeOut((typeof(p.fadeOut) == 'undefined' ? 500 : parseInt(p.fadeOut)), function(){
                _progress.remove();
            });
        }, "json");
    }
},
_process_json: function(data){
    this.requestTime.req._end = new Date().getTime();
    this.requestTime.process._start = new Date().getTime();
    this._endLoadTime = new Date().getTime();
    this._parsing=true;
    var _f = true;
    var _error = {
        e: "unknow error",
        flag: false
    }
    if (data&&data.xmlDoc){
        try{
            eval("data="+data.xmlDoc.responseText+";");
        }catch(e){
            _error.e = e;
            _f = false;
        }
    }
    if(data[this.opts.pager.root] == null){
        _error.e = "系统异常，请稍后重试，如多次不成功，请联系系统管理员。";
        _f = false;
    }

    //数据过滤
    data = this.opts.pager.dataFilter(data);

    if(!_f){
        this.rowsBuffer = {
            rows:[]
        };
        if(this.opts.pagerBuilder== true){
            this._doPagination(data, _error);
        }
        this.opts.pager.onError("{flag:false}", _error);
        return false;
    }
    var cacheData = tempData = {
        rows : []
    };
    this.cacheData = tempData;
    //分页
    var pagerObj = [];
    if(this.opts.pagerBuilder== true){
        pagerObj = this._doPagination(data);
    }

    if(data.flag){
        this.opts.pager.onError(data.flag, _error);
        this.rowsBuffer = {
            rows:[]
        };
        return false;
    }

    var root = this.opts.pager.root || "rows";

    $.each(data[root], function(i, n){
        tempData.rows[i]={
            data : {},
            id : null
        };

        tempData.rows[i].id = n.id;
        tempData.rows[i].data = n;
    });

    data = tempData;
    this.cacheData = tempData;

    for (var i = 0;i < data.rows.length;i++){
        var id = data.rows[i].id;
        data.rows[i]["data"]["_rownum"] = pagerObj[i];

        this.rowsBuffer.push({
            idd: id,
            data: data.rows[i],
            _parser: this._process_json_row,
            _locator: this._get_json_data
        });
        this.rowsAr[id]=data[i];
    };

    this._dataset();
    this._parsing=false;
},
_autoHeight: null,
_dataset:function(min, max){
    if (this._srnd){
        if (this._fillers){
            return this._update_srnd_view();
        }
        max=Math.min((this._get_view_size()+(this._srnd_pr||0)), this.rowsBuffer.length);
    };
    if (this.pagingOn){
        min=Math.max((min||0),(this.currentPage-1)*this.rowsBufferOutSize);
        max=Math.min(this.currentPage*this.rowsBufferOutSize, this.rowsBuffer.length)
    }else {
        min=min||0;
        max=max||this.rowsBuffer.length;
    };
    for (var i = min;i < max;i++){
        var r = this._row(i)
        if (r == -1){
            if (this.xmlFileUrl){
                if (this.callEvent("onDynXLS",[i,(this._dpref?this._dpref:(max-i))]))
                    this.load(this.xmlFileUrl+getUrlSymbol(this.xmlFileUrl)+"posStart="+i+"&count="+(this._dpref?this._dpref:(max-i)), this._data_type);
            };

            max=i;
            break;
        };

        if (!r.parentNode||!r.parentNode.tagName){
            this._insertRowAt(r, i);
            if (r._attrs["selected"] || r._attrs["select"]){
                this.selectRow(r,r._attrs["call"]?true:false,true);
                r._attrs["selected"]=r._attrs["select"]=null;
            }
        };

    if (this._ads_count && i-min==this._ads_count){
        var opts=this;
        this._context_parsing=this._context_parsing||this._parsing;
        return this._contextCallTimer=window.setTimeout(function(){
            opts._contextCallTimer=null;
            opts._dataset(i,max);
            if (!opts._contextCallTimer){
                if(opts._context_parsing)opts.callEvent("onXLE",[])
                else
                    opts._fixAlterCss();
                opts.callEvent("onDistributedEnd",[]);
                opts._context_parsing=false;
            }
        },this._ads_time)
    }
};

if (this._srnd&&!this._fillers)this._fillers=[this._add_filler(max, this.rowsBuffer.length-max)];
this.setSizes();
},

_row:function(ind){
    if (!this.rowsBuffer[ind])return -1;
    if (this.rowsBuffer[ind]._parser){
        var r = this.rowsBuffer[ind];
        if (this.rowsAr[r.idd] && this.rowsAr[r.idd].tagName=="TR")return this.rowsBuffer[ind]=this.rowsAr[r.idd];
        var row = this._prepareRow(r.idd);
        this.rowsBuffer[ind]=row;
        this.rowsAr[r.idd]=row;
        r._parser.call(this, row, r.data);
        this._postRowProcessing(row);
        return row;
    };

    return this.rowsBuffer[ind];
},


_get_cell_value:function(row, ind, method){
    if (row._locator){
        if (this._c_order)ind=this._c_order[ind];
        return row._locator.call(this, row.data, ind);
    };

    return this.cells3(row, ind)[method ? method : "getValue"]();
},


sortRows:function(col, type, order){
    order=(order||"asc").toLowerCase();
    type=(type||this.fldSort[col]);
    col=col||0;
    if (this.isTreeGrid())
        this.sortTreeRows(col, type, order);
    else{
        var arrTS = {};

        var atype = this.cellType[col];
        var amet = "getValue";
        if (atype == "link")amet="getContent";
        if (atype == "dhxCalendar"||atype == "dhxCalendarA")amet="getDate";
        for (var i = 0;i < this.rowsBuffer.length;i++)arrTS[this.rowsBuffer[i].idd]=this._get_cell_value(this.rowsBuffer[i], col, amet);
        this._sortRows(col, type, order, arrTS);
    };

    this.callEvent("onAfterSorting", [col,type,order]);
},

_sortCore:function(col, type, order, arrTS, s){
    var sort = "sort";
    if (this._sst){
        s["stablesort"]=this.rowsCol.stablesort;
        sort="stablesort";
    };

    if (type == 'str'){
        s[sort](function(a, b){
            if (order == "asc")return arrTS[a.idd] > arrTS[b.idd] ? 1 : -1
            else
                return arrTS[a.idd] < arrTS[b.idd] ? 1 : -1
        });
    }else if (type == 'int'){
        s[sort](function(a, b){
            var aVal = parseFloat(arrTS[a.idd]);
            aVal=isNaN(aVal) ? -99999999999999 : aVal;
            var bVal = parseFloat(arrTS[b.idd]);
            bVal=isNaN(bVal) ? -99999999999999 : bVal;
            if (order == "asc")return aVal-bVal;else
                return bVal-aVal;
        });
    }else if (type == 'date'){
        s[sort](function(a, b){
            var aVal = Date.parse(arrTS[a.idd])||(Date.parse("01/01/1900"));
            var bVal = Date.parse(arrTS[b.idd])||(Date.parse("01/01/1900"));
            if (order == "asc")return aVal-bVal
            else
                return bVal-aVal
        });
    }
},

_sortRows:function(col, type, order, arrTS){
    this._sortCore(col, type, order, arrTS, this.rowsBuffer);
    this._reset_view();
    this.callEvent("onGridReconstructed", []);
},

_reset_view:function(skip){
    if (!this.obj.rows[0])return;
    var tb = this.obj.rows[0].parentNode;
    var tr = tb.removeChild(tb.childNodes[0], true)
    if (_isKHTML)for (var i = tb.parentNode.childNodes.length-1;i >= 0;i--){
        if (tb.parentNode.childNodes[i].tagName=="TR")tb.parentNode.removeChild(tb.parentNode.childNodes[i],true);
    }else if (_isIE)for (var i = tb.childNodes.length-1;i >= 0;i--)tb.childNodes[i].removeNode(true);else
        tb.innerHTML="";
    tb.appendChild(tr)
    this.rowsCol=dhtmlxArray();
    if (this._sst)this.enableStableSorting(true);
    this._fillers=this.undefined;
    if (!skip){
        if (_isIE && this._srnd){
            this._dataset();
        }else
            this._dataset();
    }
},


deleteRow:function(row_id, node){
    if (!node)node=this.getRowById(row_id)

    if (!node)return;
    this.editStop();
    if (!this._realfake)if (this.callEvent("onBeforeRowDeleted", [row_id])== false)
        return false;
    var pid=0;
    if (this.cellType._dhx_find("tree")!= -1 && !this._realfake){
        pid=this._h2.get[row_id].parent.id;
        this._removeTrGrRow(node);
    }else {
        if (node.parentNode)node.parentNode.removeChild(node);
        var ind = this.rowsCol._dhx_find(node);
        if (ind != -1)this.rowsCol._dhx_removeAt(ind);
        for (var i = 0;i < this.rowsBuffer.length;i++)if (this.rowsBuffer[i]&&this.rowsBuffer[i].idd == row_id){
            this.rowsBuffer._dhx_removeAt(i);
            ind=i;
            break;
        }
        };

this.rowsAr[row_id]=null;
for (var i = 0;i < this.selectedRows.length;i++)if (this.selectedRows[i].idd == row_id)this.selectedRows._dhx_removeAt(i);if (this._srnd){
    for (var i = 0;i < this._fillers.length;i++){
        var f = this._fillers[i]
        if (!f)continue;
        if (f[0] >= ind)f[0]=f[0]-1;
        else if (f[1] >= ind)f[1]=f[1]-1;
    };

    this._update_srnd_view();
};

if (this.pagingOn)this.changePage();
if (!this._realfake)this.callEvent("onAfterRowDeleted", [row_id,pid]);
this.callEvent("onGridReconstructed", []);
if (this._ahgr)this.setSizes();
return true;
},

_addRow:function(new_id, text, ind){
    if (ind == -1|| typeof ind == "undefined")ind=this.rowsBuffer.length;
    if (typeof text == "string")text=text.split(this.delim);
    var row = this._prepareRow(new_id);
    row._attrs={};

    for (var j = 0;j < row.childNodes.length;j++)row.childNodes[j]._attrs={};

    this.rowsAr[row.idd]=row;
    if (this._h2)this._h2.get[row.idd].buff=row;
    this._fillRow(row, text)
    this._postRowProcessing(row)
    if (this._skipInsert){
        this._skipInsert=false;
        return this.rowsAr[row.idd]=row;
    };

    if (this.pagingOn){
        this.rowsBuffer._dhx_insertAt(ind,row);
        this.rowsAr[row.idd]=row;
        return row;
    };

    if (this._fillers){
        this.rowsCol._dhx_insertAt(ind, null);
        this.rowsBuffer._dhx_insertAt(ind,row);
        if (this._fake)this._fake.rowsCol._dhx_insertAt(ind, null);
        this.rowsAr[row.idd]=row;
        var found = false;
        for (var i = 0;i < this._fillers.length;i++){
            var f = this._fillers[i];
            if (f&&f[0] <= ind&&(f[0]+f[1])>= ind){
                f[1]=f[1]+1;
                f[2].firstChild.style.height=parseInt(f[2].firstChild.style.height)+this._srdh+"px";
                found=true;
                if (this._fake)this._fake._fillers[i][1]++;
            };

            if (f&&f[0] > ind){
                f[0]=f[0]+1
                if (this._fake)this._fake._fillers[i][0]++;
            }
        };

    if (!found)this._fillers.push(this._add_filler(ind, 1, (ind == 0 ? {
        parentNode: this.obj.rows[0].parentNode,
        nextSibling: (this.rowsCol[1])
    }: this.rowsCol[ind-1])));
    return row;
};

this.rowsBuffer._dhx_insertAt(ind,row);
return this._insertRowAt(row, ind);
},


addRow:function(new_id, text, ind){
    var r = this._addRow(new_id, text, ind);
    if (!this.dragContext)this.callEvent("onRowAdded", [new_id]);
    if (this.pagingOn)this.changePage(this.currentPage)

    if (this._srnd)this._update_srnd_view();
    r._added=true;
    if (this._ahgr)this.setSizes();
    this.callEvent("onGridReconstructed", []);
    return r;
},

_insertRowAt:function(r, ind, skip){
    this.rowsAr[r.idd]=r;
    if (this._skipInsert){
        this._skipInsert=false;
        return r;
    };

    if ((ind < 0)||((!ind)&&(parseInt(ind) !== 0)))
        ind=this.rowsCol.length;
    else {
        if (ind > this.rowsCol.length)ind=this.rowsCol.length;
    };

    if (this._cssEven){
        if ((this._cssSP ? this.getLevel(r.idd): ind)%2 == 1)
            r.className+=" "+this._cssUnEven+(this._cssSU ? (" "+this._cssUnEven+"_"+this.getLevel(r.idd)) : "");else
            r.className+=" "+this._cssEven+(this._cssSU ? (" "+this._cssEven+"_"+this.getLevel(r.idd)) : "");
    };

    if (!skip)if ((ind == (this.obj.rows.length-1))||(!this.rowsCol[ind]))
        if (_isKHTML)this.obj.appendChild(r);
        else {
            this.obj.firstChild.appendChild(r);
        }else {
        this.rowsCol[ind].parentNode.insertBefore(r, this.rowsCol[ind]);
    };

    this.rowsCol._dhx_insertAt(ind, r);
    return r;
},

getRowById:function(id){
    var row = this.rowsAr[id];
    if (row){
        if (row.tagName != "TR"){
            for (var i = 0;i < this.rowsBuffer.length;i++)if (this.rowsBuffer[i] && this.rowsBuffer[i].idd == id)return this._row(i);if (this._h2)return this._row(null,row.idd);
        };

        return row;
    };

    return null;
},


cellById:function(row_id, col){
    return this.cells(row_id, col);
},

cells:function(row_id, col){
    if (arguments.length == 0)return this.cells4(this.cell);else
        var c = this.getRowById(row_id);
    var cell = (c._childIndexes ? c.childNodes[c._childIndexes[col]] : c.childNodes[col]);
    return this.cells4(cell);
},

cellByIndex:function(row_index, col){
    return this.cells2(row_index, col);
},

cells2:function(row_index, col){
    var c = this._row(row_index);
    var cell = (c._childIndexes ? c.childNodes[c._childIndexes[col]] : c.childNodes[col]);
    return this.cells4(cell);
},

cells3:function(row, col){
    var cell = (row._childIndexes ? row.childNodes[row._childIndexes[col]] : row.childNodes[col]);
    return this.cells4(cell);
},

cells4:function(cell){
    var type = window["eXcell_"+(cell._cellType||this.cellType[cell._cellIndex])];
    if (type)return new type(cell);
},
cells5:function(cell, type){
    var type = type||(cell._cellType||this.cellType[cell._cellIndex]);
    if (!this._ecache[type]){
        if (!window["eXcell_"+type])var tex = eXcell_ro;else
            var tex = window["eXcell_"+type];
        this._ecache[type]=new tex(cell);
    };

    this._ecache[type].cell=cell;
    return this._ecache[type];
},
dma:function(mode){
    if (!this._ecache)this._ecache={};

    if (mode&&!this._dma){
        this._dma=this.cells4;
        this.cells4=this.cells5;
    }else if (!mode&&this._dma){
        this.cells4=this._dma;
        this._dma=null;
    }
},


getRowsNum:function(){
    return this.rowsBuffer.length;
},



enableEditTabOnly:function(mode){
    if (arguments.length > 0)this.smartTabOrder=convertStringToBoolean(mode);else
        this.smartTabOrder=true;
},

setExternalTabOrder:function(start, end){
    var grid = this;
    this.tabStart=( typeof (start) == "object") ? start : document.getElementById(start);
    this.tabStart.onkeydown=function(e){
        var ev = (e||window.event);
        if (ev.keyCode == 9){
            ev.cancelBubble=true;
            grid.selectCell(0, 0, 0, 0, 1);
            if (grid.smartTabOrder && grid.cells2(0, 0).isDisabled()){
                grid._key_events["k9_0_0"].call(grid);
            };

            this.blur();
            return false;
        }
    };

if(_isOpera)this.tabStart.onkeypress = this.tabStart.onkeydown;
this.tabEnd=( typeof (end) == "object") ? end : document.getElementById(end);
this.tabEnd.onkeydown=this.tabEnd.onkeypress=function(e){
    var ev = (e||window.event);
    if ((ev.keyCode == 9)&&ev.shiftKey){
        ev.cancelBubble=true;
        grid.selectCell((grid.getRowsNum()-1), (grid.getColumnCount()-1), 0, 0, 1);
        if (grid.smartTabOrder && grid.cells2((grid.getRowsNum()-1), (grid.getColumnCount()-1)).isDisabled()){
            grid._key_events["k9_0_1"].call(grid);
        };

        this.blur();
        return false;
    }
};

if(_isOpera)this.tabEnd.onkeypress = this.tabEnd.onkeydown;
},

uid:function(){
    if (!this._ui_seed)this._ui_seed=(new Date()).valueOf();
    return this._ui_seed++;
},

clearAndLoad:function(){
    var t=this._pgn_skin;
    this._pgn_skin=null;
    this.clearAll();
    this._pgn_skin=t;
    this._startLoadTime = new Date().getTime();
    this.load.apply(this,arguments);
},

getStateOfView:function(){
    if (this.pagingOn){
        var start = (this.currentPage-1)*this.rowsBufferOutSize;
        return [this.currentPage, start, Math.min(start+this.rowsBufferOutSize,this.rowsBuffer.length), this.rowsBuffer.length ];
    };

    return [
    Math.floor(this.objBox.scrollTop/this._srdh),
    Math.ceil(parseInt(this.objBox.offsetHeight)/this._srdh),
    this.rowsBuffer.length
    ];
}
};
(function(){
    function direct_set(name,value){
        this[name]=value;
    };

    function direct_call(name,value){
        this[name].call(this,value);
    };

    function joined_call(name,value){
        this[name].call(this,value.join(this.delim));
    };

    function set_options(name,value){
        for (var i=0;i < value.length;i++)if (typeof value[i] == "object"){
            var combo = this.getCombo(i);
            for (var key in value[i])combo.put(key, value[i][key]);
            }
        };

function header_set(name,value,obj){
    var rows = 1;
    var header = [];
    function add(i,j,value){
        if (!header[j])header[j]=[];
        if (typeof value == "object")value.toString=function(){
            return this.text;
        };

        header[j][i]=value;
    };

    for (var i=0;i<value.length;i++){
        if (typeof(value[i])=="object" && value[i].length){
            for (var j=0;j < value[i].length;j++)add(i,j,value[i][j]);
        }else
            add(i,0,value[i]);
    };

    for (var i=0;i<header.length;i++)for (var j=0;j<header[0].length;j++){
        var h=header[i][j];
        header[i][j]=(h||"").toString()||"&nbsp;";
        if (h&&h.colspan)for (var k=1;k < h.colspan;k++)add(j+k,i,"#cspan");
        if (h&&h.rowspan)for (var k=1;k < h.rowspan;k++)add(j,i+k,"#rspan");
    };

    this.setHeader(header[0]);
    for (var i=1;i < header.length;i++)this.attachHeader(header[i]);
};

var columns_map=[
{
    name:"label",
    def:"&nbsp;",
    operation:"setHeader",
    type:header_set
},
{
    name:"id",
    def:"",
    operation:"columnIds",
    type:direct_set
},
{
    name:"width",
    def:"*",
    operation:"setInitWidths",
    type:joined_call
},
{
    name:"align",
    def:"left",
    operation:"cellAlign",
    type:direct_set
},
{
    name:"valign",
    def:"middle",
    operation:"cellVAlign",
    type:direct_set
},
{
    name:"sort",
    def:"na",
    operation:"fldSort",
    type:direct_set
},
{
    name:"type",
    def:"ro",
    operation:"setColTypes",
    type:joined_call
},
{
    name:"options",
    def:"",
    operation:"",
    type:set_options
}];
dhtmlx.extend_api("dhtmlXGridObject",{
    _init:function(obj){
        return [obj.parent];
    },
    image_path:"setImagePath",
    columns:"columns",
    rows:"rows",
    headers:"headers",
    skin:"setSkin",
    smart_ing:"enableSmartRendering",
    css:"enableAlterCss",
    auto_height:"enableAutoHeight",
    save_hidden:"enableAutoHiddenColumnsSaving",
    save_cookie:"enableAutoSaving",
    save_size:"enableAutoSizeSaving",
    auto_width:"enableAutoWidth",
    block_selection:"enableBlockSelection",
    csv_id:"enableCSVAutoID",
    csv_header:"enableCSVHeader",
    cell_ids:"enableCellIds",
    colspan:"enableColSpan",
    column_move:"enableColumnMove",
    context_menu:"enableContextMenu",
    distributed:"enableDistributedParsing",
    drag:"enableDragAndDrop",
    drag_order:"enableDragOrder",
    tabulation:"enableEditTabOnly",
    header_images:"enableHeaderImages",
    header_menu:"enableHeaderMenu",
    keymap:"enableKeyboardSupport",
    mouse_navigation:"enableLightMouseNavigation",
    markers:"enableMarkedCells",
    math_editing:"enableMathEditing",
    math_serialization:"enableMathSerialization",
    drag_copy:"enableMercyDrag",
    multiline:"enableMultiline",
    multiselect:"enableMultiselect",
    save_column_order:"enableOrderSaving",
    hover:"enableRowsHover",
    rowspan:"enableRowspan",
    smart:"enableSmartRendering",
    save_sorting:"enableSortingSaving",
    stable_sorting:"enableStableSorting",
    undo:"enableUndoRedo",
    csv_cell:"setCSVDelimiter",
    date_format:"setDateFormat",
    drag_behavior:"setDragBehavior",
    editable:"setEditable",
    without_header:"setNoHeader",
    submit_changed:"submitOnlyChanged",
    submit_serialization:"submitSerialization",
    submit_selected:"submitOnlySelected",
    submit_id:"submitOnlyRowID",
    xml:"load"
},{
    columns:function(obj){
        for (var j=0;j<columns_map.length;j++){
            var settings = [];
            for (var i=0;i<obj.length;i++)settings[i]=obj[i][columns_map[j].name]||columns_map[j].def;
            var type=columns_map[j].type||direct_call;
            type.call(this,columns_map[j].operation,settings,obj);
        };

        this.init();
    },
    rows:function(obj){},
    attachFooter: function(a, b) {
        this.attachHeader(a, b, "_aFoot")
        },
    headers:function(obj){
        for (var i=0;i < obj.length;i++)this.attachHeader(obj[i]);
    }
});
})();
dhtmlXGridObject.prototype._dp_init=function(dp){
    dp.attachEvent("insertCallback", function(upd, id) {
        if (this.obj._h2)this.obj.addRow(id, row, null, parent);else
            this.obj.addRow(id, [], 0);
        var row = this.obj.getRowById(id);
        if (row){
            this.obj._process_xml_row(row, upd.firstChild);
            this.obj._postRowProcessing(row);
        }
    });
dp.attachEvent("updateCallback", function(upd, id) {
    var row = this.obj.getRowById(id);
    if (row){
        this.obj._process_xml_row(row, upd.firstChild);
        this.obj._postRowProcessing(row);
    }
});
dp.attachEvent("deleteCallback", function(upd, id) {
    this.obj.setUserData(id, this.action_param, "true_deleted");
    this.obj.deleteRow(id);
});
dp._methods=["setRowTextStyle","setCellTextStyle","changeRowId","deleteRow"];
this.attachEvent("onEditCell",function(state,id,index){
    if (dp._columns && !dp._columns[index])return true;
    var cell = this.cells(id,index)
    if (state==1){
        if(cell.isCheckbox()){
            dp.setUpdated(id,true)
        }
    }else if (state==2){
    if(cell.wasChanged()){
        dp.setUpdated(id,true)
    }
};

return true;
});
this.attachEvent("onRowPaste",function(id){
    dp.setUpdated(id,true)
});
this.attachEvent("onRowIdChange",function(id,newid){
    var ind=dp.findRow(id);
    if (ind<dp.updatedRows.length)dp.updatedRows[ind]=newid;
});
this.attachEvent("onSelectStateChanged",function(rowId){
    if(dp.updateMode=="row")dp.sendData();
    return true;
});
this.attachEvent("onEnter",function(rowId,celInd){
    if(dp.updateMode=="row")dp.sendData();
    return true;
});
this.attachEvent("onBeforeRowDeleted",function(rowId){
    if (!this.rowsAr[rowId])return true;
    if (this.dragContext && dp.dnd){
        window.setTimeout(function(){
            dp.setUpdated(rowId,true);
        },1);
        return true;
    };

    var z=dp.getState(rowId);
    if (this._h2){
        this._h2.forEachChild(rowId,function(el){
            dp.setUpdated(el.id,false);
            dp.markRow(el.id,true,"deleted");
        },this);
    };

    if (z=="inserted"){
        dp.set_invalid(rowId,false);
        dp.setUpdated(rowId,false);
        return true;
    };

    if (z=="deleted")return false;
    if (z=="true_deleted"){
        dp.setUpdated(rowId,false);
        return true;
    };

    dp.setUpdated(rowId,true,"deleted");
    return false;
});
this.attachEvent("onRowAdded",function(rowId){
    if (this.dragContext && dp.dnd)return true;
    dp.setUpdated(rowId,true,"inserted")
    return true;
});
dp._getRowData=function(rowId,pref){
    var data = [];
    data["gr_id"]=rowId;
    if (this.obj.isTreeGrid())
        data["gr_pid"]=this.obj.getParentId(rowId);
    var r=this.obj.getRowById(rowId);
    for (var i=0;i<this.obj._cCount;i++){
        if (this.obj._c_order)var i_c=this.obj._c_order[i];else
            var i_c=i;
        var c=this.obj.cells(r.idd,i);
        if (this._changed && !c.wasChanged()) continue;
        if (this._endnm)data[this.obj.getColumnId(i)]=c.getValue();else
            data["c"+i_c]=c.getValue();
    };

    var udata=this.obj.UserData[rowId];
    if (udata){
        for (var j=0;j<udata.keys.length;j++)if (udata.keys[j].indexOf("__")!=0)
            data[udata.keys[j]]=udata.values[j];
        };

    var udata=this.obj.UserData["gridglobaluserdata"];
    if (udata){
        for (var j=0;j<udata.keys.length;j++)data[udata.keys[j]]=udata.values[j];
    };

    return data;
};

dp._clearUpdateFlag=function(rowId){
    var row=this.obj.getRowById(rowId);
    if (row)for (var j=0;j<this.obj._cCount;j++)this.obj.cells(rowId,j).cell.wasChanged=false;
};

dp.checkBeforeUpdate=function(rowId){
    var valid=true;
    var c_invalid=[];
    for (var i=0;i<this.obj._cCount;i++)if (this.mandatoryFields[i]){
        var res=this.mandatoryFields[i].call(this.obj,this.obj.cells(rowId,i).getValue(),rowId,i);
        if (typeof res == "string"){
            this.messages.push(res);
            valid = false;
        }else {
            valid&=res;
            c_invalid[i]=!res;
        }
    };

if (!valid){
    this.set_invalid(rowId,"invalid",c_invalid);
    this.setUpdated(rowId,false);
};

return valid;
}
};

/*	custom Grid
 初始化普通GRID*/
;
(function($){
    $.fn.grid = function(options) {
        var defaults = {
            setColVAlign: "",
            onHeaderClick: function(){
                return true
                },
            onRowDblClicked: function(){},
            onRowClicked: function(){},
            onErrColorboxClose: function(){},		//当AJAX异常colorbox点击关闭时的回调
            enableSorting: true,			        //打开排序
            onBeforeSorting: function(){
                return true
                },
            onInited: function(){},
            height:"500px",
            width:"100%",
            genData: [],
            btn: {
                addBtn:"#addBtn",
                saveBtn:"#saveBtn",
                cancelBtn:"#cancelBtn",
                deleteBtn:"#deleteBtn"
            },
            onDoRowAdded: function(){},
            onDoRowAdd: function(){},
            onDoRowRm: function(){},
            onDoRowUpdate: function(){},
            debug: false,
            grid: null,						//表格对象
            listName: "",					//表格列表
            id: '',							//表格的div id
            pagerId: "",					//分页绑定的div id
            gridPanel: "",					//增删改 绑定的面板
            url: '',						//ajax请求地址
            root: "",						//返回的json中用于处理的对象名称
            skin: "dhx_skyblue",			//表格皮肤
            autoSkin: true,                         //启用自动皮肤载入
            setSubHeader: [],
            setHeader: "",
            columns: [],
            columnType: [],					//数据类型
            columnValidate: false,
            columnValidator: [],
            customValidate: function(){},
            css: {
                onErrorClass: "warn"
            },
            render: {},
            setInitWidths: "",
            footer: false,
            footerColumns: "",
            footerAlign: "",
            setInitWidthsP: "",
            setImagePath: "",
            pagerBuilder: true,							//是否分页
            cache: null,
            pager: {									//分页参数定义
                id: "",
                total: 0,								//总数据条数
                page: 1,								//默认页
                pageSize: 5,							//每页数据条数
                pageCount :0,							//总页数
                url: "",								//ajax请求地址
                root: "",								//返回的json中用于处理的对象名称
                record: "total",						//json中总条数的名称
                pageParmName :'pagination.currentPage',	//ajax请求需要发送的当前页key名称
                pagesizeParmName:'pagination.pageSize',	//ajax请求需要发送的每页数key名称
                resetPager: function(){},				//在doSearch时 建议重置分页
                setParam: function(){},				//设置附加查询参数
                param: {},								//查询参数
                isContinueByDataChanged: '数据已经改变,如果继续将丢失数据,是否继续?',		//数据修改后点击分页时的提示
                loadingMassage:"数据正在整理中，请您稍候...",								//分页时，分页栏显示的内容
                showStatus: true,															//显示ajax请求时间
                isChanged:false,															//
                onLoad: function(){},														//数据下载到本地后的回调
                onComplete: function(grid){},
                onSuccess: function(grid){},
                _onSuccess: function(grid){

                    if(grid.cacheData && grid.cacheData.rows && grid.cacheData.rows.length > 0){
                        opts.dataManage.list = [];
                        $.each(grid.cacheData.rows, function(i, n){
                            $.each(opts.columns, function(j){
                                if(opts.columnType[j] == "date"){
                                    n.data[opts.columns[j]] = $.icinfo.date.format({
                                        dateObj : n.data[opts.columns[j]]
                                        });
                                }
                            });
                            n.data.rowid = n.id;
                            opts.dataManage.list.push(n.data);
                        });
                    }
                    this.onSuccess(grid);
                },
                onError: function(e, _error){}
            },
            onRowClicked: function(rId, rIndex, grid){},
            doBindRowClick: function(grid){
                var $obj = $(grid.obj);
                $obj.find("td").click(function(e){
                    var el = grid.getFirstParentOfType(_isIE ? e.srcElement : e.target, "TD");
                    var rowId = el.parentNode.idd;
                    var row = null;
                    $.each(grid.cacheData.rows, function(i, n){
                        if(n.id == rowId){
                            row = n.data;
                            return false;
                        }
                    });
                    grid.callEvent("onRowClicked", [ row, el._cellIndex, grid, el, _isIE ? e.srcElement : e.target]);
                });
            },		//双击行回调
            onRowSelect: function(rowId, cellIndex){
                var opts = this;
                var row = null;
                $.each(opts.grid.cacheData.rows, function(i, n){
                    if(n.id == rowId){
                        row = n.data;
                        return false;
                    }
                });
                if(row == null){
                    return false;
                }
                //按columns将 行数据 赋入文本框
                $.each(opts.columns, function(i, n){
                    var key = opts.columns[i];
                    $("#"+key).val(opts.render[key] && (opts.columnType[i] != "date" && opts.columnType[i] != "select") ? opts.render[key](row[key], row):row[key]);
                });
                //隐藏删除按钮
                $(opts.gridPanel).find(opts.btn.deleteBtn).css({
                    display: ""
                });
                if($.browser.msie && $.browser.version == "6.0")
                    $(opts.gridPanel).fadeIn(300, function(){
                        opts.showRowSelectPanel(rowId, cellIndex, row);
                    });
                else
                    $(opts.gridPanel).slideDown(300, function(){
                        opts.showRowSelectPanel(rowId, cellIndex, row);
                    });
            },
            onRowSelected: function(rowId, cellIndex, row){},
            showRowSelectPanel: function(rowId, cellIndex, row){
                var opts = this;
                //面板上移
                $("html,body").animate({
                    scrollTop: $(opts.gridPanel).offset().top - 10
                    },  200);
                //设置焦点
                $("#"+opts.columns[cellIndex]).focus();
                $(opts.gridPanel).find(opts.btn.saveBtn).unbind("click").click(function(){
                    var object = opts.doFormCheck(); //表单校验
                    if(!object){
                        return false;
                    }else{
                        var index = opts.grid.getRowIndex(opts.grid.getSelectedId());
                        opts.grid.deleteSelectedRows();
                        var array = [];
                        $.each(opts.columns, function(i){
                            var key = opts.columns[i];
                            var value = opts.render[key] && opts.columnType[i] != "date" ? opts.render[key](object[key], object):object[key];
                            array.push(value);
                        });
                        opts.grid.addRow(rowId, array, index);
                        $.each(opts.grid.cacheData.rows, function(i, n){
                            if(n.id == rowId){
                                object.__status = n.data.__status;
                                opts.grid.cacheData.rows[i].data = object;
                            }
                        });
                        object.rowid = rowId;
                        object.id = rowId;
                        opts.dataManage["_update_"](object);
                        opts.grid.setSelectedRow(rowId);
                        opts.pager.isChanged = true;
                        opts.pager.onChanged(object, "update");
                        opts.onDoRowUpdate(row, object);
                        if($.browser.msie && $.browser.version == "6.0")
                            $(opts.gridPanel).fadeOut();
                        else
                            $(opts.gridPanel).slideUp(300);
                    }//else
                });
                opts.onRowSelected(rowId, cellIndex, row);
            },
            doRowAdd: function(){/*添加行*/
                var opts = this;
                //清空表单
                $.each(opts.columns, function(i){
                    var key = opts.columns[i];
                    $("#"+key).val("");
                });
                opts.onDoRowAdd(opts.columns, opts);
                $(opts.gridPanel).find(opts.btn.deleteBtn).css({
                    display: "none"
                });
                if($.browser.msie && $.browser.version == "6.0")
                    $(opts.gridPanel).fadeIn(300, function(){
                        opts.showRowAddPanel();
                    });
                else
                    $(opts.gridPanel).slideDown(300, function(){
                        opts.showRowAddPanel();
                    });
            },
            showRowAddPanel: function(){/*添加行面板*/
                var opts = this;
                $("html,body").animate({
                    scrollTop: $(opts.gridPanel).offset().top - 10
                    }, 200);

                $("#"+opts.columns[0]).focus();
                $(opts.gridPanel).find(opts.btn.saveBtn).unbind("click").click(function(){
                    var object = opts.doFormCheck();
                    if(!object){
                        return false;
                    }else{
                        opts.lastUid = opts.grid.uid();
                        var array = [];
                        $.each(opts.columns, function(i){
                            var key = opts.columns[i];
                            var value = opts.render[key] && opts.columnType[i] != "date"?opts.render[key](object[key], object):object[key];
                            array.push(value);
                        });
                        opts.grid.addRow(opts.lastUid, array, 0);
                        object.__status = "insert";
                        object.rowid = opts.lastUid;
                        object.id = opts.lastUid;
                        opts.grid.cacheData.rows.push({
                            id: opts.lastUid,
                            data: object
                        });
                        opts.dataManage["_insert_"](object);
                        opts.grid.setSelectedRow(opts.lastUid);
                        opts.pager.isChanged = true;
                        opts.pager.onChanged(object, "insert");
                        opts.onDoRowAdded(object);
                        if($.browser.msie && $.browser.version == "6.0")
                            $(opts.gridPanel).fadeOut();
                        else
                            $(opts.gridPanel).slideUp(300);
                    }
                });
            },
            doRowRm: function(){
                var opts = this;
                var rowId = opts.grid.getSelectedId();
                var object = {};
                $.each(opts.grid.cacheData.rows, function(i, n){
                    if(n.id == rowId){
                        object = opts.grid.cacheData.rows[i].data;
                        return false;
                    }
                });
                if(object == {}){
                    alert("ICINFO GRID ERROR:\n grid.doRowRm(null)");
                    return false;
                }
                object.rowid = rowId;
                object.id = rowId;
                opts.dataManage["_delete_"](object);
                opts.grid.deleteSelectedRows();
                opts.pager.isChanged = true;
                opts.pager.onChanged(object, "delete");
                opts.onDoRowRm(object);
                if($.browser.msie && $.browser.version == "6.0")
                    $(opts.gridPanel).fadeOut();
                else
                    $(opts.gridPanel).slideUp(300);
            },
            doFormCheck: function(){
                var opts = this;
                var array = {};
                var onErrorClass = opts.css.onErrorClass;
                var columnName = opts.setHeader.split(",");
                opts.columnValidateFlag = true;
                $.each(opts.columns, function(i){

                    var key = opts.columns[i];

                    //rownum 不需校验
                    if(key != "_rownum"){

                        var $input = $("#" + key);
                        var _v = $input.val();

                        array[key] = $("#"+key);
                        $input.removeClass(onErrorClass);
                        if (opts.columnValidate == true) {
                            //默认非空验证
                            if (opts.columnValidator[i].required) {
                                if ($.trim(_v) == "") {
                                    alert("请填写 " + columnName[i] + "!");
                                    opts.columnValidateFlag = false;
                                    $input.addClass(onErrorClass).focus();
                                    return false;
                                }
                            }
                            //默认长度验证
                            if (opts.columnValidator[i].maxlength) {
                                var _maxlength = parseInt(opts.columnValidator[i].maxlength - 0);
                                if (_v.length > _maxlength) {
                                    alert(columnName[i] + " 长度不能大于 " + _maxlength + "!")
                                    opts.columnValidateFlag = false;
                                    $input.addClass(onErrorClass).focus();
                                    return false;
                                }
                            }
                            //默认长度验证
                            if (opts.columnValidator[i].minlength) {
                                var _minlength = parseInt(opts.columnValidator[i].minlength - 0);
                                if (_v.length < _minlength) {
                                    alert(columnName[i] + " 长度不能小于 " + _minlength + "!");
                                    opts.columnValidateFlag = false;
                                    $input.addClass(onErrorClass).focus();
                                    return false;
                                }
                            }
                            //默认长度验证
                            if (opts.columnValidator[i].rangelength) {
                                var _rangelength = opts.columnValidator[i].rangelength;
                                if (_v.length <= _rangelength || _v.length >= _rangelength) {
                                    alert(columnName[i] + " 长度只能在 " + _rangelength[0]+"~"+_rangelength[1]+"之间!");
                                    opts.columnValidateFlag = false;
                                    $input.addClass(onErrorClass).focus();
                                    return false;
                                }
                            }

                            //默认min验证
                            if (opts.columnValidator[i]["min"]) {
                                var _min = opts.columnValidator[i]["min"];
                                if (_v < _min) {
                                    alert(columnName[i] + "不能小于"+_min+"!");
                                    opts.columnValidateFlag = false;
                                    $input.addClass(onErrorClass).focus();
                                    return false;
                                }
                            }
                            //默认max验证
                            if (opts.columnValidator[i]["max"]) {
                                var _max = opts.columnValidator[i]["max"];
                                if (_v > _max) {
                                    alert(columnName[i] + "不能大于"+_max+"!");
                                    opts.columnValidateFlag = false;
                                    $input.addClass(onErrorClass).focus();
                                    return false;
                                }
                            }
                            //默认range验证
                            if (opts.columnValidator[i].range) {
                                var _range = opts.columnValidator[i].range;
                                if ((_v - 0) <= _range[0] || (_v - 0) >= _range[1]) {
                                    alert(columnName[i] + " 大小只能在"+_range[0]+"~"+_range[1]+"之间!");
                                    opts.columnValidateFlag = false;
                                    $input.addClass(onErrorClass).focus();
                                    return false;
                                }
                            }
                            //默认数字验证
                            if (opts.columnValidator[i].number) {
                                if (isNaN(_v - 0)) {
                                    alert(columnName[i] + " 只能填写数字!");
                                    opts.columnValidateFlag = false;
                                    $input.addClass(onErrorClass).focus();
                                    return false;
                                }
                            }
                            //默认整数验证
                            if (opts.columnValidator[i].digits) {
                                if (!/^\d+$/.test(_v)) {
                                    alert(columnName[i] + " 只能填写整数!");
                                    opts.columnValidateFlag = false;
                                    $input.addClass(onErrorClass).focus();
                                    return false;
                                }
                            }

                            //默认身份证验证
                            if (opts.columnValidator[i].idNo) {
                                var __idNo__=function(idcard){
                                    var Errors=new Array("验证通过!","身份证号码位数不对!","身份证号码出生日期超出范围或含有非法字符!","身份证号码校验错误!","身份证地区非法!");
                                    var area={
                                        11:"北京",
                                        12:"天津",
                                        13:"河北",
                                        14:"山西",
                                        15:"内蒙古",
                                        21:"辽宁",
                                        22:"吉林",
                                        23:"黑龙江",
                                        31:"上海",
                                        32:"江苏",
                                        33:"浙江",
                                        34:"安徽",
                                        35:"福建",
                                        36:"江西",
                                        37:"山东",
                                        41:"河南",
                                        42:"湖北",
                                        43:"湖南",
                                        44:"广东",
                                        45:"广西",
                                        46:"海南",
                                        50:"重庆",
                                        51:"四川",
                                        52:"贵州",
                                        53:"云南",
                                        54:"西藏",
                                        61:"陕西",
                                        62:"甘肃",
                                        63:"青海",
                                        64:"宁夏",
                                        65:"新疆",
                                        71:"台湾",
                                        81:"香港",
                                        82:"澳门",
                                        91:"国外"
                                    }
                                    var idcard,Y,JYM,S,M,idcard_array=[];
                                    idcard_array=idcard.split("");
                                    if(area[parseInt(idcard.substr(0,2))]==null){
                                        return{
                                            result:false,
                                            e:"身份证号码不正确!"
                                        };

                                }
                                switch(idcard.length){
                                    case 15:
                                        if((parseInt(idcard.substr(6,2))+1900)%4==0||((parseInt(idcard.substr(6,2))+1900)%100==0&&(parseInt(idcard.substr(6,2))+1900)%4==0)){
                                        ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
                                    }else{
                                        ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
                                    }
                                    if(ereg.test(idcard))return{
                                        result:true
                                    };
                                    else{
                                        return{
                                            result:false,
                                            e:"身份证号码出生日期超出范围或含有非法字符!"
                                        };

                                    }
                                    break;
                                case 18:
                                    if(parseInt(idcard.substr(6,4))%4==0||(parseInt(idcard.substr(6,4))%100==0&&parseInt(idcard.substr(6,4))%4==0)){
                                    ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
                                }else{
                                    ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
                                }
                                if(ereg.test(idcard)){
                                    S=(parseInt(idcard_array[0])+parseInt(idcard_array[10]))*7
                                    +(parseInt(idcard_array[1])+parseInt(idcard_array[11]))*9
                                    +(parseInt(idcard_array[2])+parseInt(idcard_array[12]))*10
                                    +(parseInt(idcard_array[3])+parseInt(idcard_array[13]))*5
                                    +(parseInt(idcard_array[4])+parseInt(idcard_array[14]))*8
                                    +(parseInt(idcard_array[5])+parseInt(idcard_array[15]))*4
                                    +(parseInt(idcard_array[6])+parseInt(idcard_array[16]))*2
                                    +parseInt(idcard_array[7])*1
                                    +parseInt(idcard_array[8])*6
                                    +parseInt(idcard_array[9])*3;
                                    Y=S%11;
                                    M="F";
                                    JYM="10X98765432";
                                    M=JYM.substr(Y,1);
                                    if(M==idcard_array[17])return {
                                        result:true
                                    };
                                    else{
                                        return{
                                            result:false,
                                            e:"身份证号码出生日期超出范围或含有非法字符!"
                                        };

                                }
                                }else{
                                return{
                                    result:false,
                                    e:"身份证号码出生日期超出范围或含有非法字符!"
                                };

                        }
                        break;
                    default:{

                        return{
                            result:false,
                            e:"身份证号码位数不对!"
                        };

                    }
                    break;
                }
            };
        var _test = __idNo__(_v);
        if (!_test.result) {
            alert(columnName[i] + " 格式不正确，"+_test.e+"!");
            opts.columnValidateFlag = false;
            $input.addClass(onErrorClass).focus();
            return false;
        }
    }
    //默认tel验证
    if (opts.columnValidator[i].tel) {
        if (!/(\d{3}-\d{8}|\d{4}-\d{7}|\d{4}-\d{8}|\d{7}|\d{8}|\d{10})/.test(_v)) {
            alert(columnName[i] + " 格式有误，请输入正确的11位手机号码,如 13888888888!");
            opts.columnValidateFlag = false;
            $input.addClass(onErrorClass).focus();
            return false;
        }
    }

    //默认phone验证
    if (opts.columnValidator[i].phone) {
        if (!/^1[3|4|5|8]\d{9}$/.test(_v)) {
            alert(columnName[i] + " 格式有误，请输入正确的电话号码,\n如010-86212345、0571-88234636、\n\r88234636、4008884636!");
            opts.columnValidateFlag = false;
            $input.addClass(onErrorClass).focus();
            return false;
        }
    }

    //默认accept验证
    if (opts.columnValidator[i].accept) {
        var _accept = opts.columnValidator[i].accept;
        _accept = (typeof _accept == "string" ? _accept.replace(/,/g, '|') : _accept.join("|")).split("|");
        if ($.inArray(_v, _accept) == -1) {
            alert(columnName[i] + " 只能填写 "+_accept.join("|").replace(/\|/g, ",")+"中的值!");
            opts.columnValidateFlag = false;
            $input.addClass(onErrorClass).focus();
            return false;
        }
    }
    //默认email验证
    if (opts.columnValidator[i].email) {
        var value = _v;
        if (!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value)) {
            alert("请在 "+columnName[i] + " 内填写正确的email!");
            opts.columnValidateFlag = false;
            $input.addClass(onErrorClass).focus();
            return false;
        }
    }
    //默认url验证
    if (opts.columnValidator[i].url) {
        var value = _v;
        if (!/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)) {
            alert("请在 "+columnName[i] + " 内填写正确的url!");
            opts.columnValidateFlag = false;
            $input.addClass(onErrorClass).focus();
            return false;
        }
    }
}

}
//rownum

});
if(!opts.columnValidateFlag){
    return false;
}
//此处内置表单验证end
//
//				此处自定义表单验证start
//				@Desc: 可以用array.key来取对象
//				if(array.forMemCertName.val() == "1" && array.forMemCertCode.val().length != 18 && array.forMemCertCode.val().length != 15){
//				alert("请确认 正确的身份证号长度!"); array.forMemCertCode.focus(); return false;
//				}
//if(opts.customValidate == true){
var customValidateFlag = opts.customValidate(array);
if(customValidateFlag == false){
    return false;
}
//}
//此处自定义表单验证end

//返回object
var object = {};
$.each(opts.columns, function(i){
    var key = opts.columns[i];
    object[key] = $.trim($("#"+key).val());
});
return object;
},
hidePanel: function(){
    $(this.gridPanel).slideUp(200);
},
dataManage: {//数据管理器
    list: [],//临时列表
    _insert_: function(object){
        var that = this;
        object.__status = "insert";
        that.list.push(object);
    },
    _delete_: function(object){
        var that = this, index = null;
        $.each(that.list, function(i, n){
            if(n.id == object.id){
                index = i;
            }
        });

        if(index != null){
            if(object.__status == "insert"){
                that.list.splice(index, 1);
            }else{
                object.__status = "delete";
                that.list[index] = object;
            }
        }
    },
    _update_: function(object){
        var that = this;
        var index = null;
        var s = $.grep(that.list, function(n, i){

            return (object.__status == "insert");
        });

        $.each(that.list, function(i, n){
            var objectId = object.__status == "insert" ? object.rowid: object.id;
            var nId = n.__status == "insert" ? n.rowid: n.id;
            if(nId == objectId){
                object.id = n.id;
                object.rowid = n.rowid;
                index = i;
                return false;
            }
        });
        if(index != null){
            object.__status = (typeof(object.__status) == "undefined" || object.__status == "update"|| object.__status == "") ? "update": "insert";
            that.list[index] = object;
        }
    },
   /**
    * @desc 年检前端过滤器
    * @param {Function} callback 数据过滤回调
    * @example
    * ---------------------
    * var opts = $("#grid").data("grid");
    * var list = opts.dataManage._gen_(function(data){
    *      for(var i=0; i < data.length; i++){
    *          data[i].newName = ["icinfo", "_", i].join("");
    *      }
    *      return data;
    * });
    * console.log(list);
    * ---------------------
    *
    * @author com.icinfo.tc.lc
    */
    _gen_: function(callback){
        var that = this,
        data = [],
        list = [];
        //复制原始list
        for(var i=0;i<that.list.length;i++){
            list.push($.extend({},that.list[i]));
        }

        //过滤__status为空的
        data = $.grep(list, function(n, i){
            return  n.__status != "";
        });
        //组装数据
        $.each(data, function(i, n){
            delete data[i]._rownum;
            if(n.__status == "insert"){
                delete data[i].id;
                delete data[i].rowid;
            }
            if(n.__status == "update" || n.__status == "delete"){
                delete data[i].rowid;
            }
            //对象附加参数
            if(opts.genData.length>0){
                $.each(opts.genData, function(j, m){
                    $.each(m, function(k, v){
                        data[i][k] = v;
                    });
                });
            }
        });
        //可以通过回调对数据处理
        if(callback)
            data = callback(data);
        return data;
    },
    //返回分组列表
    _getGroupList_: function(){
        var that = this,
        _updateArray = [],
        _deleteArray = [],
        _insertArray = [];
        //滤出3个数组
        _updateArray = $.grep(that.list, function(n){
            return n.__status == "update";
        });
        _deleteArray = $.grep(that.list, function(n){
            return n.__status == "delete";
        });
        _insertArray = $.grep(that.list, function(n){
            return n.__status == "insert";
        });
        return {
            _update: _updateArray,
            _delete: _deleteArray,
            _insert: _insertArray
        };
    }
},
doLoad: function(){
    var opts = this
    opts.pager.id = opts.pagerId;
    opts.pager.url = opts.url;
    opts.pager.root = opts.root;
    opts.grid = new dhtmlXGridObject(self.attr("id"));
    var grid = opts.grid;
    if(!opts.setColSorting || opts.setColSorting == ""){
        opts.setColSorting = [];
        $.each(opts.columns, function(){
            opts.setColSorting.push("str");
        });
        opts.setColSorting = opts.setColSorting.join(",");
    }
    if(!opts.setColAlign || opts.setColAlign == ""){
        opts.setColAlign = [];
        $.each(opts.columns, function(){
            opts.setColAlign.push("center");
        });
        opts.setColAlign = opts.setColAlign.join(",");
    }
    if(!opts.setColTypes || opts.setColTypes == ""){
        opts.setColTypes = [];
        $.each(opts.columns, function(){
            opts.setColTypes.push("ro");
        });
        opts.setColTypes = opts.setColTypes.join(",");
    }

    opts._setInitWidthsP = "";
    if(!opts.setInitWidthsP || opts.setInitWidthsP == ""){
        var tmp = [];
        var len = opts.columns.length;
        $.each(opts.columns, function(){
            tmp.push(100 / len);
        });
        opts._setInitWidthsP = tmp.join(",");
    }
    if(opts.setInitWidths != ""){
        if(opts.debug && opts.columns.length != opts.setInitWidths.split(",").length){
            alert(debugTitle+"列表字段数("+opts.columns.length+")与设置宽度的个数("+opts.setInitWidths.split(",").length+")不一致")
        }
        grid.setInitWidths(opts.setInitWidths);
    }else{

        grid.setInitWidthsP(opts.setInitWidthsP == "" ? opts._setInitWidthsP : opts.setInitWidthsP);
    }

    if(!opts.headerAlign || opts.headerAlign == ""){
        opts.headerAlign = [];
        $.each(opts.columns, function(i){
            opts.headerAlign.push("text-align:center;");
        });
    }
    if(!opts.enableEditEvents || opts.enableEditEvents == ""){
        opts.enableEditEvents = [];
        $.each(opts.columns, function(i){
            opts.enableEditEvents.push(false);
        });
    }

    grid.setImagePath(opts.setImagePath);
    grid.setHeader(opts.setHeader, null, opts.headerAlign);
    if(opts.setSubHeader.length>0){
        $.each(opts.setSubHeader, function(i, n){
            opts.grid.attachHeader(n.header, n.style||null, n.align||"");
        });
    }
    if(opts.setColVAlign!="")
        grid.setColVAlign(opts.setColVAlign);
    grid.setColAlign(opts.setColAlign);
    grid.setColTypes(opts.setColTypes);
    grid.enableEditEvents(opts.enableEditEvents);

    //获取js的路径
    opts.skinPath = window["_dhtmlxgrid_skinPath"] || (function(scriptArr, i, me){
        for (i in scriptArr) {
            if (scriptArr[i].src && scriptArr[i].src.indexOf('dhtmlxcommon.js') !== -1)
                me = scriptArr[i];
        }
        window["_dhtmlxgrid_jsPath"] = me || scriptArr[scriptArr.length - 1];
        me = window["_dhtmlxgrid_jsPath"].src.replace(/\\/g, '/');
        return me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/'));
    }($("script")));

    if(opts.skin != "" && opts.autoSkin === true){

        var cssArr = [
        opts.skinPath + '/dhtmlxgrid.css',
        opts.skinPath + '/skins/dhtmlxgrid_' + opts.skin + '.css'
        ], cssLink;

        for(i=0; i<=cssArr.length-1; i++){
            cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = cssArr[i];
            window["_dhtmlxgrid_jsPath"].parentNode.insertBefore(cssLink, window["_dhtmlxgrid_jsPath"]);
        }
    }

    grid.setSkin(opts.skin);

    grid.setColSorting(opts.setColSorting);
    grid.enableStableSorting(true);

    grid.enableBlockSelection(true);
    grid.attachEvent("onBlockSelected", grid.copyBlockToClipboard);
    if(opts.footer){
        grid.attachFooter(opts.footerColumns, opts.footerAlign||"");
    }
    //grid.enableAutoWidth(true,$(document).width(),$(document).width());
    grid.opts = opts;

    opts.grid.init();

    opts.onInited(grid);

    opts.getJson();
},
doReload: function(){
    var opts = this;
    opts.getJson();
},
getJson: function(){
    var opts = this;
    var grid = opts.grid;
    var pager = opts.pager;
    var param = $.param(pager.param);
    var id = $(grid.hdrBox).parent().attr("id");
    $(pager.id).html("<ul><li><span class='pager-loading'>"+pager.loadingMassage+"</span></li></ul>");
    var _progress = $("#"+id+"_progress").length==1 ? $("#"+id+"_progress") : $("<div class='dhxlayout_progress' id='"+id+"_progress'></div>");
    _progress.css({
        top: $(grid.objBox).offset().top,
        left: $(grid.objBox).offset().left,
        height: $(grid.objBox).height(),
        width: $(grid.objBox).width()
    });
    $("body").append(_progress);



    var qry = pager.method == "POST" ? pager.url+"?"+pager.pageParmName+"="+pager.page+"&"+pager.pagesizeParmName+"="+pager.pageSize : pager.url+"?"+pager.pageParmName+"="+pager.page+"&"+pager.pagesizeParmName+"="+pager.pageSize+"&"+param;
    grid.clearAndLoad(qry, function(grid){
        try{
            opts.pager._onSuccess(grid);
            opts.pager.onComplete(grid, opts);
            opts.doBindRowClick(grid);
        }catch(e){
            if(window["console"] && window["console"]["log"]){
                console.log(e);
            }
        }
        _progress.fadeOut((typeof(pager.fadeOut) == 'undefined' ? 500 : parseInt(pager.fadeOut)), function(){
            _progress.remove();
        });
    }, "json");

},
doSearch: function(){
    var that = this;
    var pager = that.pager;
    pager.resetPager();
    pager.setParam();
    that.pager.page = 1;
    that.getJson();
}
};//defaults








var debugTitle = "ICINFO GRID DEBUG:\n";
var opts = $.extend(true, defaults, options || {});
var self = $(this).eq(0);
opts.self = self;
if(opts.debug && self.length == 0){
    alert(debugTitle+"div id is not found!");
}
if(opts.pagerId == ""){
    opts.pagerId = "#"+self.attr("id")+"Pager"
}
if($(opts.pagerId).length == 0){
    var $gridPager = $('<div id="'+opts.self.attr("id")+'Pager" class="gridPager"></div>');
    $(this).after($gridPager);
    if(opts.debug){
        alert(debugTitle+"$(opts.pagerId).length == 0");
    }
}
if(!opts.pagerBuilder){
    $gridPager.css({
        display: "none"
    });
}
if(opts.gridPanel == ""){
    opts.gridPanel = "#"+self.attr("id")+"Panel"
}
if(opts.debug && $(opts.gridPanel).length == 0){
    alert(debugTitle+"$(opts.gridPanel).length == 0");
}

var pager = {									    //分页参数定义
    id: "",
    method: "GET",
    total: 0,								//总数据条数
    page: 1,								//默认页
    pageSize: 5,							//每页数据条数
    pageSizeArray: [5,10,20,50,100],
    pageCount :0,							//总页数
    url: "",								//ajax请求地址
    root: "",								//返回的json中用于处理的对象名称
    record: "total",						//json中总条数的名称
    pageParmName :'pagination.currentPage',	//ajax请求需要发送的当前页key名称
    pagesizeParmName:'pagination.pageSize',	//ajax请求需要发送的每页数key名称
    resetPager: function(){
        this.total = 0;
        this.page = 1;
        this.pageCount = 0;
    },				                    //在doSearch时 建议重置分页
    setParam: function(){},				    //设置附加查询参数
    param: {},								//查询参数
    isContinueByDataChanged: '数据已经改变,如果继续将丢失数据,是否继续?',		//数据修改后点击分页时的提示
    loadingMassage:"数据正在整理中，请您稍候...",								//分页时，分页栏显示的内容
    showToPDF: false,
    pdfURL:"",
    showToXLS: false,
    xlsURL:"",
    showStatus: true,											//显示ajax请求时间
    isChanged:false,															//
    onLoad: function(){},													//数据下载到本地后的回调
    onComplete: function(grid){},
    onChanged: function(){},
    dataFilter: function(data){
        return data;
    },
    onSuccess: function(grid){},
    _onSuccess: function(grid){
        if(grid.cacheData && grid.cacheData.rows && grid.cacheData.rows.length > 0){
            opts.dataManage.list = [];
            $.each(grid.cacheData.rows, function(i, n){
                $.each(opts.columns, function(j){
                    if(opts.columnType[j] == "date"){
                        n.data[opts.columns[j]] = $.icinfo.date.format({
                            dateObj : n.data[opts.columns[j]]
                            });
                    }
                });
                n.data.rowid = n.id;
                opts.dataManage.list.push(n.data);
            });
        }
        this.onSuccess(grid);
    },
    onError: function(e, _error){}
};

opts.pager = $.extend(true, pager, opts.pager || {});

opts.doLoad();
opts.grid.attachEvent("onBeforeSorting", opts.onBeforeSorting);
opts.grid.attachEvent("onRowSelect", function(rowId, cellIndex){
    opts.onRowSelect(rowId, cellIndex, opts);
});
//	opts.grid.attachEvent("onResize", function(a,b,c){
//		return true;
//		});

opts.grid.attachEvent("onRowClicked", opts.onRowClicked);
//opts.grid.attachEvent("onRowDblClicked", opts.onRowDblClicked);
//opts.grid.attachEvent("onHeaderClick", opts.onHeaderClick);

//opts.grid.attachEvent("onRightClick", function(id, ind, obj){
//console.log(obj)
//});
//if($.browser.version != "6.0"){
//		$(window).resize(function(){
//			setTimeout(function(){
//				$(self).width(parseInt($(self).parent().width()));
//			}, 1000);
//		});
//}
//{addBtn:"#addBtn",saveBtn:"#saveBtn",cancelBtn:"#cancelBtn",deleteBtn:"#deleteBtn"}
if(opts.debug && $(opts.btn.addBtn).length == 0){
    alert(debugTitle+"$(opts.btn.addBtn).length == 0");
}
if(opts.debug && $(opts.btn.saveBtn).length == 0){
    alert(debugTitle+"$(opts.btn.saveBtn).length == 0");
}
if(opts.debug && $(opts.btn.cancelBtn).length == 0){
    alert(debugTitle+"$(opts.btn.cancelBtn).length == 0");
}
if(opts.debug && $(opts.btn.deleteBtn).length == 0){
    alert(debugTitle+"$(opts.btn.deleteBtn).length == 0");
}
$(opts.btn.cancelBtn).click(function(){
    opts.hidePanel();
});
$(opts.btn.addBtn).click(function(){
    opts.doRowAdd();
});
$(opts.btn.deleteBtn).click(function(){
    opts.doRowRm();
});
self.data({
    grid: opts
});
};//grid
})(jQuery);





/**
*   @desc: hide/show row (warning! - this command doesn't affect row indexes, only visual appearance)
*   @param: ind - column index
*   @param: state - true/false - hide/show row
*   @type:  public
*/
dhtmlXGridObject.prototype.setRowHidden=function(id,state){
    var f=convertStringToBoolean(state);
    //var ind=this.getRowIndex(id);
    //if (id<0)
    //   return;
    var row= this.getRowById(id)//this.rowsCol[ind];
    if(!row)
        return;

    if (row.expand==="")
        this.collapseKids(row);

    if ((state)&&(row.style.display!="none")){
        row.style.display="none";
        var z=this.selectedRows._dhx_find(row);
        if (z!=-1){
            row.className=row.className.replace("rowselected","");
            for (var i=0; i<row.childNodes.length; i++)
                row.childNodes[i].className=row.childNodes[i].className.replace(/cellselected/g,"");
            this.selectedRows._dhx_removeAt(z);
        }
        this.callEvent("onGridReconstructed",[]);
    }

    if ((!state)&&(row.style.display=="none")){
        row.style.display="";
        this.callEvent("onGridReconstructed",[]);
    }
    this.setSizes();
}

//#__pro_feature:21092006{
//#column_hidden:21092006{
/**
*   @desc: hide/show column
*   @param: ind - column index
*   @param: state - true/false - hide/show column
*   @type:  public
*   @edition: Professional
*/
dhtmlXGridObject.prototype.setColumnHidden=function(ind,state){
    if (!this.hdr.rows.length){
        if (!this._ivizcol) this._ivizcol=[];
        return this._ivizcol[ind]=state;
    }


    if ((this.fldSorted)&&(this.fldSorted.cellIndex==ind)&&(state))
        this.sortImg.style.display = "none";

    var f=convertStringToBoolean(state);
    if (f){
        if (!this._hrrar) this._hrrar=new Array();
        else if (this._hrrar[ind]) return;
        this._hrrar[ind]="display:none;";
        this._hideShowColumn(ind,"none");
    }
    else
    {
        if ((!this._hrrar)||(!this._hrrar[ind])) return;
        this._hrrar[ind]="";
        this._hideShowColumn(ind,"");
    }

    if ((this.fldSorted)&&(this.fldSorted.cellIndex==ind)&&(!state))
        this.sortImg.style.display = "inline";
}






/**
*   @desc: get show/hidden status of column
*   @param: ind - column index
*   @type:  public
*   @edition: Professional
*   @returns:  if column hidden then true else false
*/
dhtmlXGridObject.prototype.isColumnHidden=function(ind){
    if ((this._hrrar)&&(this._hrrar[ind])) return true;
    return false;
}


/**
*   @desc: set list of visible/hidden columns
*   @param: list - list of true/false separated by comma
*   @type:  public
*   @edition: Professional
*   @topic:0
*/
dhtmlXGridObject.prototype.setColumnsVisibility=function(list){
    this.setColHidden(list)
}
/**
*   @desc: set list of visible/hidden columns
*   @param: list - list of true/false separated by comma
*   @type:  deprecated
*	@newmethod: setColumnsVisibility
*   @edition: Professional
*   @topic:0
*/
dhtmlXGridObject.prototype.setColHidden=function(list){
    if (list) this._ivizcol=list.split(",");

    if (this.hdr.rows.length && this._ivizcol)
        for (var i=0; i<this._ivizcol.length; i++)
            this.setColumnHidden(i,this._ivizcol[i]);

}

/**
      *   @desc: fix hidden state for column in all rows
      *   @type: private
      */
dhtmlXGridObject.prototype._fixHiddenRowsAll=function(pb,ind,prop,state){
    var z=pb.rows.length;
    for(var i=0;i<z;i++){
        var x=pb.rows[i].cells;
        if (x.length!=this._cCount){
            for (var j=0; j<x.length; j++)
                if (x[j]._cellIndex==ind){
                    x[j].style[prop]=state;
                    break;
                }
        }
        else
            x[ind].style[prop]=state;
    }
}
/**
*   @desc: hide column
*   @param: ind - column index
*   @param: state - hide/show
*   @edition: Professional
*   @type:  private
*/
dhtmlXGridObject.prototype._hideShowColumn=function(ind,state){
    var hind=ind;
    if ((this.hdr.rows[1]._childIndexes)&&(this.hdr.rows[1]._childIndexes[ind]!=ind))
        hind=this.hdr.rows[1]._childIndexes[ind];

    if (state=="none"){
        this.hdr.rows[0].cells[ind]._oldWidth = this.hdr.rows[0].cells[ind].style.width;
        this.hdr.rows[0].cells[ind]._oldWidthP = this.cellWidthPC[ind];
        this.obj.rows[0].cells[ind].style.width = "0px";

        this._fixHiddenRowsAll(this.obj,ind,"display","none");
        if (this._fixHiddenRowsAllTG) this._fixHiddenRowsAllTG(ind,"none");

        if ((_isOpera&&_OperaRv<9)||_isKHTML||(_isFF)){
            this._fixHiddenRowsAll(this.hdr,ind,"display","none");
            if (this.ftr)
                this._fixHiddenRowsAll(this.ftr.childNodes[0],ind,"display","none");
        }

        this._fixHiddenRowsAll(this.hdr,ind,"whiteSpace","nowrap");

        if (!this.cellWidthPX.length && !this.cellWidthPC.length)
            this.cellWidthPX=[].concat(this.initCellWidth);

        if (this.cellWidthPX[ind]) this.cellWidthPX[ind]=0;
        if (this.cellWidthPC[ind]) this.cellWidthPC[ind]=0;
    }
    else {
        if (this.hdr.rows[0].cells[ind]._oldWidth){
            var zrow=this.hdr.rows[0].cells[ind];
            if (_isOpera||_isKHTML||(_isFF))
                this._fixHiddenRowsAll(this.hdr,ind,"display","");

            if (this.ftr)
                this._fixHiddenRowsAll(this.ftr.childNodes[0],ind,"display","");

            this.obj.rows[0].cells[ind].style.width = this.hdr.rows[0].cells[ind]._oldWidth;
            this._fixHiddenRowsAll(this.obj,ind,"display","");
            if (this._fixHiddenRowsAllTG) this._fixHiddenRowsAllTG(ind,"");

            zrow.style.width = zrow._oldWidth;

            this._fixHiddenRowsAll(this.hdr,ind,"whiteSpace","normal");

            if (zrow._oldWidthP) this.cellWidthPC[ind]=zrow._oldWidthP;
            if (zrow._oldWidth) this.cellWidthPX[ind]=parseInt(zrow._oldWidth);
        }
    }
    this.setSizes();

    if ((!_isIE)&&(!_isFF))
    {
        //dummy Opera/Safari fix
        this.obj.border=1;
        this.obj.border=0;
    }

}




//v.2.6 build 100722

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/

dhtmlXGridObject.prototype.enableBlockSelection = function(mode)
{
    if (typeof this._bs_mode == "undefined"){
        var self = this;
        this.obj.onmousedown = function(e) {
            if (self._bs_mode)self._OnSelectionStart((e||event),this);
            return true;
        };

        this._CSVRowDelimiter = this.csv.row;
        this.attachEvent("onResize", function() {
            self._HideSelection();
            return true;
        });
        this.attachEvent("onFilterEnd",this._HideSelection);
    };

    if (mode===false){
        this._bs_mode=false;
        return this._HideSelection();
    }else this._bs_mode=true;
};

dhtmlXGridObject.prototype.forceLabelSelection = function(mode)

{
    this._strictText = convertStringToBoolean(mode)
};

dhtmlXGridObject.prototype.disableBlockSelection = function()

{
    this.obj.onmousedown = null;
};

dhtmlXGridObject.prototype._OnSelectionStart = function(event, obj)

{
    var self = this;
    if (event.button == 2)return;
    var src = event.srcElement || event.target;
    if (this.editor){
        if (src.tagName && (src.tagName=="INPUT" || src.tagName=="TEXTAREA")) return;
        this.editStop();
    };

    if (!self.isActive)self.setActive(true);
    var pos = this.getPosition(this.obj);
    var x = event.clientX - pos[0] +document.body.scrollLeft;
    var y = event.clientY - pos[1] +document.body.scrollTop;
    this._CreateSelection(x-4, y-4);
    if (src == this._selectionObj){
        this._HideSelection();
        this._startSelectionCell = null;
    }else {
        while (src.tagName.toLowerCase()!= 'td')
            src = src.parentNode;
        this._startSelectionCell = src;
    };

    this.obj.onmousedown = null;
    this.obj[_isIE?"onmouseleave":"onmouseout"] = function(e){
        if (self._blsTimer)window.clearTimeout(self._blsTimer);
    };

    this.obj.onmmold=this.obj.onmousemove;
    this._init_pos=[x,y];
    this._selectionObj.onmousemove = this.obj.onmousemove = function(e) {
        e = e||event;
        e.returnValue = false;
        self._OnSelectionMove(e);
    };

    this._oldDMP=document.body.onmouseup;
    document.body.onmouseup = function(e) {
        e = e||event;
        self._OnSelectionStop(e, this);
        return true;
    };

    document.body.onselectstart = function(){
        return false
        }
    };

dhtmlXGridObject.prototype._getCellByPos = function(x,y){
    x=x;
    y=y;
    var _x=0;
    for (var i=0;i < this.obj.rows.length;i++){
        y-=this.obj.rows[i].offsetHeight;
        if (y<=0){
            _x=this.obj.rows[i];
            break;
        }
    };

if (!_x || !_x.idd)return null;
    for (var i=0;i < this._cCount;i++){
    x-=this.obj.rows[0].childNodes[i].offsetWidth;
    if (x<=0){
        while(true){
            if (_x._childIndexes && _x._childIndexes[i+1]==_x._childIndexes[i])_x=_x.previousSibling;else
                return this.cells(_x.idd,i).cell;
        }
    }
};

return null;
};

dhtmlXGridObject.prototype._OnSelectionMove = function(event)

{
    var self=this;
    this._ShowSelection();
    var pos = this.getPosition(this.obj);
    var X = event.clientX - pos[0]+document.body.scrollLeft;
    var Y = event.clientY - pos[1]+document.body.scrollTop;
    if ((Math.abs(this._init_pos[0]-X)<5) && (Math.abs(this._init_pos[1]-Y)<5)) return this._HideSelection();
    if(this._startSelectionCell==null)this._endSelectionCell = this._startSelectionCell = this.getFirstParentOfType(event.srcElement || event.target,"TD");
    else
    if (event.srcElement || event.target){
        if ((event.srcElement || event.target).className == "dhtmlxGrid_selection")
            this._endSelectionCell=(this._getCellByPos(X,Y)||this._endSelectionCell);
        else {
            var t = this.getFirstParentOfType(event.srcElement || event.target,"TD");
            if (t.parentNode.idd)this._endSelectionCell = t;
        }
    };

var BottomRightX = this.objBox.scrollLeft + this.objBox.clientWidth;
var BottomRightY = this.objBox.scrollTop + this.objBox.clientHeight;
var TopLeftX = this.objBox.scrollLeft;
var TopLeftY = this.objBox.scrollTop;
var nextCall=false;
if (this._blsTimer)window.clearTimeout(this._blsTimer);
    if (X+20 >= BottomRightX){
    this.objBox.scrollLeft = this.objBox.scrollLeft+20;
    nextCall=true;
}else if (X-20 < TopLeftX){
    this.objBox.scrollLeft = this.objBox.scrollLeft-20;
    nextCall=true;
};

if (Y+20 >= BottomRightY && !this._realfake){
    this.objBox.scrollTop = this.objBox.scrollTop+20;
    nextCall=true;
}else if (Y-20 < TopLeftY && !this._realfake){
    this.objBox.scrollTop = this.objBox.scrollTop-20;
    nextCall=true;
};

this._selectionArea = this._RedrawSelectionPos(this._startSelectionCell, this._endSelectionCell);
    if (nextCall){
    var a=event.clientX;
    var b=event.clientY;
    this._blsTimer=window.setTimeout(function(){
        self._OnSelectionMove({
            clientX:a,
            clientY:b
        })
        },100);
}
};

dhtmlXGridObject.prototype._OnSelectionStop = function(event){
    var self = this;
    if (this._blsTimer)window.clearTimeout(this._blsTimer);
    this.obj.onmousedown = function(e) {
        if (self._bs_mode)self._OnSelectionStart((e||event), this);
        return true;
    };

    this.obj.onmousemove = this.obj.onmmold||null;
    this._selectionObj.onmousemove = null;
    document.body.onmouseup = this._oldDMP||null;
    if ( parseInt( this._selectionObj.style.width )< 2 && parseInt( this._selectionObj.style.height ) < 2) {
        this._HideSelection();
    }else {
        var src = this.getFirstParentOfType(event.srcElement || event.target,"TD");
        if ((!src)|| (!src.parentNode.idd)){
            src=this._endSelectionCell;
        };

        if (!src)return this._HideSelection();
        while (src.tagName.toLowerCase()!= 'td')
            src = src.parentNode;
        this._stopSelectionCell = src;
        this._selectionArea = this._RedrawSelectionPos(this._startSelectionCell, this._stopSelectionCell);
        this.callEvent("onBlockSelected",[]);
    };

    document.body.onselectstart = function(){}
};

dhtmlXGridObject.prototype._RedrawSelectionPos = function(LeftTop, RightBottom)

{
    var pos = {};

    pos.LeftTopCol = LeftTop._cellIndex;
    pos.LeftTopRow = this.getRowIndex( LeftTop.parentNode.idd );
    pos.RightBottomCol = RightBottom._cellIndex;
    pos.RightBottomRow = this.getRowIndex( RightBottom.parentNode.idd );
    var LeftTop_width = LeftTop.offsetWidth;
    var LeftTop_height = LeftTop.offsetHeight;
    LeftTop = this.getPosition(LeftTop, this.obj);
    var RightBottom_width = RightBottom.offsetWidth;
    var RightBottom_height = RightBottom.offsetHeight;
    RightBottom = this.getPosition(RightBottom, this.obj);
    if (LeftTop[0] < RightBottom[0]){
        var Left = LeftTop[0];
        var Right = RightBottom[0] + RightBottom_width;
    }else {
        var foo = pos.RightBottomCol;
        pos.RightBottomCol = pos.LeftTopCol;
        pos.LeftTopCol = foo;
        var Left = RightBottom[0];
        var Right = LeftTop[0] + LeftTop_width;
    };

    if (LeftTop[1] < RightBottom[1]){
        var Top = LeftTop[1];
        var Bottom = RightBottom[1] + RightBottom_height;
    }else {
        var foo = pos.RightBottomRow;
        pos.RightBottomRow = pos.LeftTopRow;
        pos.LeftTopRow = foo;
        var Top = RightBottom[1];
        var Bottom = LeftTop[1] + LeftTop_height;
    };

    var Width = Right - Left;
    var Height = Bottom - Top;
    this._selectionObj.style.left = Left + 'px';
    this._selectionObj.style.top = Top + 'px';
    this._selectionObj.style.width = Width + 'px';
    this._selectionObj.style.height = Height + 'px';
    return pos;
};

dhtmlXGridObject.prototype._CreateSelection = function(x, y)

{
    if (this._selectionObj == null){
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.display = 'none';
        div.className = 'dhtmlxGrid_selection';
        this._selectionObj = div;
        this._selectionObj.onmousedown = function(e){
            e=e||event;
            if (e.button==2 || (_isMacOS&&e.ctrlKey))
                return this.parentNode.grid.callEvent("onBlockRightClick", ["BLOCK", e]);
        };

        this._selectionObj.oncontextmenu=function(e){
            (e||event).cancelBubble=true;
            return false;
        };

        this.objBox.appendChild(this._selectionObj);
    };

    this._selectionObj.style.width = '0px';
    this._selectionObj.style.height = '0px';
    this._selectionObj.style.left = x + 'px';
    this._selectionObj.style.top = y + 'px';
    this._selectionObj.startX = x;
    this._selectionObj.startY = y;
};

dhtmlXGridObject.prototype._ShowSelection = function()

{
    if (this._selectionObj)this._selectionObj.style.display = '';
};

dhtmlXGridObject.prototype._HideSelection = function()

{
    if (this._selectionObj)this._selectionObj.style.display = 'none';
    this._selectionArea = null;
};

dhtmlXGridObject.prototype.copyBlockToClipboard = function(){
    if ( this._selectionArea != null ){
        var serialized = new Array();

        if (this._mathSerialization)
            this._agetm="getMathValue";
        else if (this._strictText)
            this._agetm="getTitle";
        else
            this._agetm="getValue";

        for (var i=this._selectionArea.LeftTopRow;i<=this._selectionArea.RightBottomRow;i++){
            var data = this._serializeRowToCVS(this.rowsBuffer[i], null, this._selectionArea.LeftTopCol, this._selectionArea.RightBottomCol+1);
            if (!this._csvAID)
                serialized[serialized.length] = data.substr( data.indexOf( this.csv.cell ) + 1 );
            else
                serialized[serialized.length] = data;
        };
        serialized = serialized.join(this._CSVRowDelimiter);
        this.toClipBoard(serialized);
    }///if
};

dhtmlXGridObject.prototype.pasteBlockFromClipboard = function()
{
    var serialized = this.fromClipBoard();
    if (this._selectionArea != null){
        var startRow = this._selectionArea.LeftTopRow;
        var startCol = this._selectionArea.LeftTopCol;
    }else if (this.cell != null && !this.editor){
        var startRow = this.getRowIndex( this.cell.parentNode.idd );
        var startCol = this.cell._cellIndex;
    }else {
        return false;
    };

    serialized = serialized.split(this._CSVRowDelimiter);
    if ((serialized.length >1)&&(serialized[serialized.length-1]==""))
        serialized.splice(serialized.length-1,1);
    for (var i=0;i<serialized.length;i++){
        serialized[i] = serialized[i].split(this.csv.cell);
    };

    var endRow = startRow+serialized.length;
    var endCol = startCol+serialized[0].length;
    if (endCol > this._cCount)endCol = this._cCount;
    var k = 0;
    for (var i=startRow;i<endRow;i++){
        var row = this.render_row(i);
        if (row==-1)continue;
        var l = 0;
        for (var j=startCol;j<endCol;j++){
            var ed = this.cells3(row, j);
            if (ed.isDisabled()) {
                l++;
                continue;
            };

            if (this._onEditUndoRedo)this._onEditUndoRedo(2, row.idd, j, serialized[ k ][ l ], ed.getValue());
            if (ed.combo){
                var comboVa = ed.combo.values;
                for(var n=0;n<comboVa.length;n++)if (serialized[ k ][ l ] == comboVa[n]){
                    ed.setValue( ed.combo.keys[ n ]);
                    comboVa=null;
                    break;
                };

                if (comboVa!=null)ed.setValue( serialized[ k ][ l++ ] );else l++;
            }else
                ed[ ed.setImage ? "setLabel" : "setValue" ]( serialized[ k ][ l++ ] );
            ed.cell.wasChanged=true;
        };

        this.callEvent("onRowPaste",[row.idd])
        k++;
    }
    };

dhtmlXGridObject.prototype.loadCSVFile = function(path,afterCall){
    this.load(path,afterCall,"csv")
};

dhtmlXGridObject.prototype.enableCSVAutoID = function(mode){
    this._csvAID=convertStringToBoolean(mode);
};

dhtmlXGridObject.prototype.enableCSVHeader = function(mode){
    this._csvHdr=convertStringToBoolean(mode);
};

dhtmlXGridObject.prototype.setCSVDelimiter = function(str){
    this.csv.cell=str;
};

dhtmlXGridObject.prototype._csvAID = true;
dhtmlXGridObject.prototype.loadCSVString = function(str){
    this.parse(str,"csv")
};

dhtmlXGridObject.prototype.serializeToCSV = function(textmode){
    this.editStop()
    if (this._mathSerialization)this._agetm="getMathValue";
    else if (this._strictText || textmode)this._agetm="getTitle";else this._agetm="getValue";
    var out=[];
    if (this._csvHdr){
        for (var j=1;j < this.hdr.rows.length;j++){
            var a=[];
            for (var i=0;i<this._cCount;i++)if ((!this._srClmn)||(this._srClmn[i]))
                a.push(this.getColumnLabel(i,j-1));out.push(a.join(this.csv.cell));
        }
        };

var i=0;
var leni=this.rowsBuffer.length;
for(i;i<leni;i++){
    var temp=this._serializeRowToCVS(null,i)
    if (temp!="")out.push(temp);
};

return out.join(this.csv.row);
};

dhtmlXGridObject.prototype._serializeRowToCVS = function(r,i,start,end){
    var out = new Array();
    if (!r){
        r=this.render_row(i)
        if (this._fake && !this._fake.rowsAr[r.idd])this._fake.render_row(i);
    };

    if (!this._csvAID)out[out.length]=r.idd;
    start = start||0;
    end = end||this._cCount;
    var changeFl=false;
    var ind=start;
    while (r.childNodes[start]._cellIndex>ind && start)start--;
    for(var jj=start;ind<end;jj++){
        if (!r.childNodes[jj])break;
        var real_ind=r.childNodes[jj]._cellIndex;
        if ((!this._srClmn)||(this._srClmn[real_ind])){
            var cvx=r.childNodes[jj];
            var zx=this.cells(r.idd,real_ind);
            while (ind!=real_ind){
                ind++;
                out.push("")
                if (ind>=end)break;
            };

            if (ind>=end)break;
            ind++;
            if (zx.cell)zxVal=zx[this._agetm]();else zxVal="";
            if ((this._chAttr)&&(zx.wasChanged()))
                changeFl=true;
            out[out.length]=((zxVal===null)?"":zxVal)

            if ( this._ecspn && cvx.colSpan && cvx.colSpan >1 ){
                cvx=cvx.colSpan-1;
                for (var u=0;u<cvx;u++){
                    out[out.length] = "";
                    ind++;
                }
            }
        }
        else
            ind++;
    };

    if ((this._onlChAttr)&&(!changeFl)) return "";
    return out.join(this.csv.cell);
};

dhtmlXGridObject.prototype.toClipBoard=function(val){
    if (window.clipboardData){
        window.clipboardData.setData("Text",val);
    }else{

        try{
            (new Clipboard()).copy(val);
        }catch(e){
            try{
                clip.setText(val);
            }catch(e){
            };
        };
    }
};

dhtmlXGridObject.prototype.fromClipBoard=function(){
    if (window.clipboardData)return window.clipboardData.getData("Text");else
        return (new Clipboard()).paste();
};

dhtmlXGridObject.prototype.cellToClipboard = function(rowId,cellInd){
    if ((!rowId)||(!cellInd)){
        if (!this.selectedRows[0])
            return;
        rowId=this.selectedRows[0].idd;
        cellInd=this.cell._cellIndex;
    };
    var ed=this.cells(rowId,cellInd);
    this.toClipBoard(((ed.getLabel?ed.getLabel():ed.getValue())||"").toString());
};

dhtmlXGridObject.prototype.updateCellFromClipboard = function(rowId,cellInd){
    if ((!rowId)||(!cellInd)){
        if (!this.selectedRows[0])return;
        rowId=this.selectedRows[0].idd;
        cellInd=this.cell._cellIndex;
    };

    var ed=this.cells(rowId,cellInd);
    ed[ed.setImage?"setLabel":"setValue"](this.fromClipBoard());
};

dhtmlXGridObject.prototype.rowToClipboard = function(rowId){
    var out="";
    if (this._mathSerialization)this._agetm="getMathValue";
    else if (this._strictText)this._agetm="getTitle";else this._agetm="getValue";
    if (rowId)out=this._serializeRowToCVS(this.getRowById(rowId));else
        for (var i=0;i<this.selectedRows.length;i++){
            if (out)out+=this.csv.row;
            out+=this._serializeRowToCVS(this.selectedRows[i]);
        };

    this.toClipBoard(out);
};

dhtmlXGridObject.prototype.updateRowFromClipboard = function(rowId){
    var csv=this.fromClipBoard();
    if (!csv)return;
    if (rowId)var r=this.getRowById(rowId);else
        var r=this.selectedRows[0];
    if (!r)return;
    csv=(csv.split(this.csv.row)[0]).split(this.csv.cell);
    if (!this._csvAID)csv.splice(0,1);
    for (var i=0;i<csv.length;i++){
        var ed=this.cells3(r,i);
        ed[ed.setImage?"setLabel":"setValue"](csv[i]);
    }
    };

dhtmlXGridObject.prototype.addRowFromClipboard = function(){
    var csv=this.fromClipBoard();
    if (!csv)return;
    var z=csv.split(this.csv.row);
    for (var i=0;i<z.length;i++)if (z[i]){
        csv=z[i].split(this.csv.cell);
        if (this._csvAID)this.addRow(this.getRowsNum()+2,csv);
        else{
            if (this.rowsAr[csv[0]])csv[0]=this.uid();
            this.addRow(csv[0],csv.slice(1));
        }
    }
    };

dhtmlXGridObject.prototype.gridToClipboard = function(){
    this.toClipBoard(this.serializeToCSV());
};

dhtmlXGridObject.prototype.gridFromClipboard = function(){
    var csv=this.fromClipBoard();
    if (!csv)return;
    this.loadCSVString(csv);
};

dhtmlXGridObject.prototype.getXLS = function(path){
    if (!this.xslform){
        this.xslform=document.createElement("FORM");
        this.xslform.action=(path||"")+"xls.php";
        this.xslform.method="post";
        this.xslform.target=(_isIE?"_blank":"");
        document.body.appendChild(this.xslform);
        var i1=document.createElement("INPUT");
        i1.type="hidden";
        i1.name="csv";
        this.xslform.appendChild(i1);
        var i2=document.createElement("INPUT");
        i2.type="hidden";
        i2.name="csv_header";
        this.xslform.appendChild(i2);
    };

    var cvs = this.serializeToCSV();
    this.xslform.childNodes[0].value = cvs;
    var cvs_header = [];
    var l = this._cCount;
    for (var i=0;i<l;i++){
        cvs_header.push(this.getHeaderCol(i));
    };

    cvs_header = cvs_header.join(',');
    this.xslform.childNodes[1].value = cvs_header;
    this.xslform.submit();
};

dhtmlXGridObject.prototype.printView = function(before, after){
    var html="<style>TD {font-family:Arial;text-align:center;padding-left:2px;padding-right:2px; font-size:12px;};\n td.filter input, td.filter select {display:none;};\n </style>";
    var st_hr=null;
    if (this._fake){
        st_hr=[].concat(this._hrrar);
        for (var i=0;i<this._fake._cCount;i++)this._hrrar[i]=null;
    };

    html+="<base href='"+document.location.href+"'></base>";
    if (!this.parentGrid)html+=(before||"");
    html += '<table width="100%" border="2px" cellpadding="0" cellspacing="0">';
    var row_length = Math.max(this.rowsBuffer.length,this.rowsCol.length);
    var col_length = this._cCount;
    var width = this._printWidth();
    html += '<tr class="header_row_1">';
    for (var i=0;i<col_length;i++){
        if (this._hrrar && this._hrrar[i])continue;
        var hcell=this.hdr.rows[1].cells[this.hdr.rows[1]._childIndexes?this.hdr.rows[1]._childIndexes[parseInt(i)]:i];
        var colspan=(hcell.colSpan||1);
        var rowspan=(hcell.rowSpan||1);
        for (var j=1;j<colspan;j++)width[i]+=width[j];
        html += '<td rowspan="'+rowspan+'" width="'+width[i]+'%" style="background-color:lightgrey;" colspan="'+colspan+'">'+this.getHeaderCol(i)+'</td>';
        i+=colspan-1;
    };

    html += '</tr>';
    for (var i=2;i<this.hdr.rows.length;i++){
        if (_isIE){
            html+="<tr style='background-color:lightgrey' class='header_row_"+i+"'>";
            var cells=this.hdr.rows[i].childNodes;
            for (var j=0;j < cells.length;j++)if (!this._hrrar || !this._hrrar[cells[j]._cellIndex]){
                html+=cells[j].outerHTML;
            };

            html+="</tr>";
        }else
            html+="<tr class='header_row_"+i+"' style='background-color:lightgrey'>"+(this._fake?this._fake.hdr.rows[i].innerHTML:"")+this.hdr.rows[i].innerHTML+"</tr>";
    };

    for (var i=0;i<row_length;i++){
        html += '<tr>';
        if (this.rowsCol[i] && this.rowsCol[i]._cntr){
            html+=this.rowsCol[i].innerHTML.replace(/<img[^>]*>/gi,"")+'</tr>';
            continue;
        };

        if (this.rowsCol[i] && this.rowsCol[i].style.display=="none")continue;
        var row_id
        if (this.rowsCol[i])row_id=this.rowsCol[i].idd;
        else if (this.rowsBuffer[i])row_id=this.rowsBuffer[i].idd;else continue;
        for (var j=0;j<col_length;j++){
            if (this._hrrar && this._hrrar[j])continue;
            if(this.rowsAr[row_id] && this.rowsAr[row_id].tagName=="TR"){
                var c=this.cells(row_id, j);
                if (c._setState)var value="";
                else if (c.getContent)value = c.getContent();
                else if (c.getImage || c.combo)var value=c.cell.innerHTML;else var value = c.getValue()||c.cell.innerHTML||0;
            }else
                var value=this._get_cell_value(this.rowsBuffer[i],j);
            var color = this.columnColor[j]?'background-color:'+this.columnColor[j]+';':'';
            var align = this.cellAlign[j]?'text-align:'+this.cellAlign[j]+';':'';
            var cspan = c.getAttribute("colspan");
            html += '<td style="'+color+align+'" '+(cspan?'colSpan="'+cspan+'"':'')+'>'+(value===""?"&nbsp;":value)+'</td>';
            if (cspan)j+=cspan-1;
        };

        html += '</tr>';
        if (this.rowsCol[i] && this.rowsCol[i]._expanded){
            var sub=this.cells4(this.rowsCol[i]._expanded.ctrl);
            if (sub.getSubGrid)html += '<tr><td colspan="'+col_length+'">'+sub.getSubGrid().printView()+'</td></tr>';else
                html += '<tr><td colspan="'+col_length+'">'+this.rowsCol[i]._expanded.innerHTML+'</td></tr>';
        }
    };

if (this.ftr)for (var i=1;i<this.ftr.childNodes[0].rows.length;i++)html+="<tr style='background-color:lightgrey'>"+((this._fake)?this._fake.ftr.childNodes[0].rows[i].innerHTML:"")+this.ftr.childNodes[0].rows[i].innerHTML+"</tr>";
    html += '</table>';
    if (this.parentGrid)return html;
    html+=(after||"");
    var d = window.open('', '_blank');
    d.document.write(html);
    d.document.write("<script>window.onerror=function(){return true;}</script>");
    d.document.close();
    if (this._fake){
    this._hrrar=st_hr;
}
};

dhtmlXGridObject.prototype._printWidth=function(){
    var width = [];
    var total_width = 0;
    for (var i=0;i<this._cCount;i++){
        var w = this.getColWidth(i);
        width.push(w);
        total_width += w;
    };

    var percent_width = [];
    var total_percent_width = 0;
    for (var i=0;i<width.length;i++){
        var p = Math.floor((width[i]/total_width)*100);
        total_percent_width += p;
        percent_width.push(p);
    };

    percent_width[percent_width.length-1] += 100-total_percent_width;
    return percent_width;
};

dhtmlXGridObject.prototype.loadObject = function(obj){};

dhtmlXGridObject.prototype.loadJSONFile = function(path){};

dhtmlXGridObject.prototype.serializeToObject = function(){};

dhtmlXGridObject.prototype.serializeToJSON = function(){};

if (!window.clipboardData)window.clipboardData={
    _make:function(){
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip)return null;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans)return null;
        trans.addDataFlavor('text/unicode');
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        this._p=[clip,trans,str];
        return true;
    },
    setData:function(type,text){
        try{
            netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
        }catch(e){
            dhtmlxError.throwError("不好意思，复制遇到问题了","原因是剪贴板权限不足，请您使用IE系列浏览器！",[type,text]);
            return "";
        };

        if (!this._make()) return false;
        this._p[2].data=text;
        this._p[1].setTransferData("text/unicode",this._p[2],text.length*2);
        var clipid=Components.interfaces.nsIClipboard;
        this._p[0].setData(this._p[1],null,clipid.kGlobalClipboard);
    },
    getData:function(type){
        try{
            netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
        }catch(e){
            dhtmlxError.throwError("不好意思，黏贴遇到问题了","原因是剪贴板权限不足，请您使用IE系列浏览器！",[type]);
            return "";
        };

        if (!this._make()) return false;
        this._p[0].getData(this._p[1],this._p[0].kGlobalClipboard);
        var strLength = new Object();
        var str = new Object();
        try{
            this._p[1].getTransferData("text/unicode",str,strLength);
        }catch(e){
            return "";
        };

        if (str)str = str.value.QueryInterface(Components.interfaces.nsISupportsString);
        if (str)return str.data.substring(0,strLength.value / 2);
        return "";
    }
};
//v.2.6 build 100722

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/
dhtmlXGridObject.prototype.toPDF=function(url, mode, header, footer, rows, name){
    mode = mode || "color";
    var full_color = mode == "full_color";
    var grid_name = name || "Excel导出-"+new Date().getFullYear()+"年"+(new Date().getMonth()+1)+"月"+new Date().getDate()+"日";
    var grid = this;
    grid._asCDATA = true;
    eXcell_ch.prototype.getContent = function(){
        return this.getValue();
    };

    eXcell_ra.prototype.getContent = function(){
        return this.getValue();
    };

    function xml_top(profile) {
        var spans = [];
        for (var i=1;i<grid.hdr.rows.length;i++){
            spans[i]=[];
            for (var j=0;j<grid._cCount;j++){
                var cell = grid.hdr.rows[i].childNodes[j];
                if (!spans[i][j])spans[i][j]=[0,0];
                if (cell)spans[i][cell._cellIndexS]=[cell.colSpan, cell.rowSpan];
            }
            }

        var xml = "<rows profile='"+profile+"'";
        if (header) xml += " header='"+header+"'";
        if (footer) xml += " footer='"+footer+"'";
        xml += "><head>" + grid._serialiseExportConfig(spans).replace(/^<head/,"<columns").replace(/head>$/,"columns>");

        for (i=2; i < grid.hdr.rows.length;i++){
            var empty_cols = 0;
            var row = grid.hdr.rows[i];
            var cxml="";
            for (j=0; j < grid._cCount; j++){
                var s = spans[i][j];
                var rspan = (( s[0] && s[0] > 1 ) ? ' colspan="'+s[0]+'" ' : "");
                if (s[1] && s[1] > 1){
                    rspan+=' rowspan="'+s[1]+'" ';
                    empty_cols = -1;
                }

                var val = "";
                for (var k=0;k<row.cells.length;k++){
                    if (row.cells[k]._cellIndexS==j){
                        if (row.cells[k].getElementsByTagName("SELECT").length){
                            val="";
                        }else{
                            val = _isIE?row.cells[k].innerText:row.cells[k].textContent;
                        }
                        val=val.replace(/[ \n\r\t\xA0]+/," ");
                        break;
                    }
                }

                if (!val || val==" ") empty_cols++;
                cxml+="<column"+rspan+"><![CDATA["+val+"]]></column>";
            }

            if (empty_cols != grid._cCount) xml+="\n<columns>"+cxml+"</columns>";
        }

            xml+="</head>\n";
            return xml;
	}

	function xml_body() {
	    var xml =[];
	    if (rows)for (var i=0;i<rows.length;i++)xml.push(xml_row(grid.getRowIndex(rows[i])));else
	        for (var i=0;i<grid.getRowsNum();i++)
	            xml.push(xml_row(i));
	    return xml.join("\n");
	}

        function xml_footer() {
            var xml = ["<foot>"];
            if (!grid.ftr)
                return "";
            for (var i = 1; i < grid.ftr.rows.length; i++) {
                xml.push("<columns>");
                var row = grid.ftr.rows[i];
                for (var j = 0; j < grid._cCount; j++) {
                    if (grid._srClmn && !grid._srClmn[j])
                        continue;
                    if (grid._hrrar[j])
                        continue;
                    for (var k = 0; k < row.cells.length; k++) {
                        var val = "";
                        var span = "";
                        if (row.cells[k]._cellIndexS == j) {
                            val = _isIE ? row.cells[k].innerText : row.cells[k].textContent;
                            val = val.replace(/[ \n\r\t\xA0]+/, " ");
                            if (row.cells[k].colSpan && row.cells[k].colSpan != 1)
                                span = " colspan='" + row.cells[k].colSpan + "' ";
                            break;
                        }
                    }
                    xml.push("<column" + span + "><![CDATA[" + val + "]]></column>");
                }
                xml.push("</columns>");
            }
            xml.push("</foot>");
            return xml.join("\n");
        }

        function get_style(node, style) {
            return (window.getComputedStyle ? (window.getComputedStyle(node, null)[style]) : (node.currentStyle ? node.currentStyle[style] : null)) || "";
        }

        function xml_row(ind) {
             if (!grid.rowsBuffer[ind])
                 return "";
             var r = grid.render_row(ind);
             if (r.style.display == "none")
                 return "";
             var xml = "<row>";
             for (var i = 0; i < grid._cCount; i++) {
                 if (((!grid._srClmn) || (grid._srClmn[i])) && (!grid._hrrar[i])) {
                     var cell = grid.cells(r.idd, i);
                     if (full_color) {
                         var text_color = get_style(cell.cell, "color");
                         var bg_color = get_style(cell.cell, "backgroundColor");
                         if (bg_color == "transparent" || bg_color == "rgba(0, 0, 0, 0)")
                             bg_color = "rgb(255,255,255)";
                         xml += "<cell bgColor='" + bg_color + "' textColor='" + text_color + "'>";
                     } else
                         xml += "<cell>";
                     xml += "<![CDATA[" + (cell.getContent ? cell.getContent() : cell.getTitle()) + "]]></cell>";
                 }
             }
             return xml + "</row>";
         }

	function xml_end(){
	    var xml = "</rows>";
	    return xml;
	}

	var uid = "form_"+grid.uid();
	var form = $("<form id='"+uid+"' name='"+uid+"' method=post target='_blank' action='"+url+"'></form>");
	$("body").append(form);
	form.css({display:"none"});
	form.append("<textarea name='grid_xml' id='grid_xml_"+uid+"' ></textarea><input id='grid_name_"+uid+"' name='grid_name' value='' />");
	$("#grid_name_"+uid).val(grid_name);
        $("#grid_xml_"+uid).val(xml_top(mode).replace("\u2013", "-") + xml_body() + xml_footer() + xml_end());
	form.submit();
        form.remove();
};

dhtmlXGridObject.prototype._serialiseExportConfig=function(spans){
    var out = "<head>";
    for (var i = 0;i < this.hdr.rows[0].cells.length;i++){
        if (this._srClmn && !this._srClmn[i])continue;
        var sort = this.fldSort[i];
        if (sort == "cus"){
            sort = this._customSorts[i].toString();
            sort=sort.replace(/function[\ ]*/,"").replace(/\([^\f]*/,"");
        }

        var s = spans[1][i];
        var rpans = (( s[1] && s[1] > 1 ) ? ' rowspan="'+s[1]+'" ' : "")+(( s[0] && s[0] > 1 ) ? ' colspan="'+s[0]+'" ' : "");
        out+="<column "+rpans+" width='"+this.getColWidth(i)+"' align='"+this.cellAlign[i]+"' type='"+this.cellType[i]
        +"' sort='"+(sort||"na")+"' color='"+(this.columnColor[i]||"")+"'"
        +(this.columnIds[i]
            ? (" id='"+this.columnIds[i]+"'")
            : "")+">";
        if (this._asCDATA)out+="<![CDATA["+this.getHeaderCol(i)+"]]>";else
            out+=this.getHeaderCol(i);
        var z = this.getCombo(i);
        if (z)for (var j = 0;j < z.keys.length;j++)out+="<option value='"+z.keys[j]+"'>"+z.values[j]+"</option>";
        out+="</column>";
    };

    return out+="</head>";
};

dhtmlXGridObject.prototype.toExcel = dhtmlXGridObject.prototype.toPDF;

 //v.2.6 build 100722

 /*
 Copyright DHTMLX LTD. http://www.dhtmlx.com
 To use this component please contact sales@dhtmlx.com to obtain license
 */