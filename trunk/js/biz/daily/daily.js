/*!
 * 日志 js文件
 * author com.icinfo.tc.lc
 * date 2012-8-30 15:05:18
 */

var daily = {
    init: function(){
        daily.tpl.init();
        daily.ui.init();
        daily.bind.init();

        daily.data.getPrivateDailyList({
            param: {
                "dailyType.dailyShare" : 0,
                "daily.dailyUserId" : GLOBAL.user.id
            }
        });

        daily.data.getPrivateDailyTypeList({
            param: {
                "dailyType.dailyShare" : 0,
                "dailyType.dailyTypeUserId" : GLOBAL.user.id
            }
        });
        daily.data.getPublicDailyTypeList({
            param: {
                "dailyType.dailyShare" : 1,
                "dailyType.dailyTypeUserId" : 0
            }
        });
    }
};


/*************************************************************************************************** tpl
 * 日志模板模块
 */
daily.tpl =  {
    init : function(){
        // 编译日志列表模板
        juicer.set("view-main-list-tpl");

        juicer.set("view-add-daily-type-tpl");
    }
};


/*************************************************************************************************** ui
 *
 * 日志的ui模块
 */
daily.ui =  {
    init: function(){


        // 添加新日志
        $("#button-add-daily-type").button({
            icons: {
                primary: 'ui-icon-plus'
            },
            text: false
        });

        // 添加新日志
        $("#button-add-daily").button({
            icons: {
                primary: 'ui-icon-document'
            }
        });

        $("#button-save-daily").button({
            icons: {
                primary: 'ui-icon-disk'
            }
        });
        $("#button-save-cancel-daily").button({
            icons: {
                primary: 'ui-icon-cancel'
            }
        });

        // 删除以选中的日志
        $("#button-delete-daily").button({
            icons: {
                primary: 'ui-icon-trash'
            }
        });

        $("#important-notes").button({
            icons: {
                primary: 'ui-icon-star'
            }
        });
        $("#trash-notes").button({
            icons: {
                primary: 'ui-icon-trash'
            }
        });
        $("#all-notes").button();

        $("#all-notes-area").accordion({
            autoHeight: true,
            navigation: true,
            clearStyle: true,
            fillSpace: true,
            collapsible: false,
            change: function(){
                $(".layout-left").accordion("resize");
            }
        });

        $(".layout-left").accordion({
            autoHeight: true,
            navigation: true,
            change: function(){
                $(this).accordion("resize");
            }
        });

    //this.accordionResize();
    },
    accordionResize: function(){
        $("#all-notes-area").accordion("resize");
        $(".layout-left").accordion("resize");
    }

};



/*************************************************************************************************** bind
 * 事件绑定
 */
daily.bind =   {
    init: function(){

        $("#button-add-daily").on("click", function(){
            daily.view.editDaily();
        });


        $("#button-save-cancel-daily").on("click", function(){
            daily.view.cancelEditDaily();
        });

        // 搜索按钮的事件绑定
        $("#search-button").on("click", function(){
            daily.search.init();
        });

        // 所有日志按钮 点击事件
        $("#all-notes").on("click", function(){
            daily.data.getPrivateDailyList({
                param: {
                    "dailyType.dailyTypeUserId" : GLOBAL.user.id
                }
            })
        });


        // 重要日志按钮 点击事件
        $("#important-notes").on("click", function(){
            daily.data.getPrivateDailyList({
                param: {
                    "daily.dailyImportant": 1,
                    "dailyType.dailyTypeUserId" : GLOBAL.user.id
                }
            })
        });


        // 回收站按钮 点击事件
        $("#trash-notes").on("click", function(){
            daily.data.getPrivateDailyList({
                param: {
                    "daily.dailyStatus": 2,
                    "dailyType.dailyTypeUserId" : GLOBAL.user.id
                }
            });
        });


        $("#button-add-daily-type").on("click", function(){
            daily.view.addDailyType();
        });

    },
    afterRenderGridView: function(){
        $(".daily-list-item").hover(function(){
            $(this).find(".daily-con-private").fadeOut(0);
            $(this).find(".daily-action").fadeIn(0);
        }, function(){
            $(this).find(".daily-action").fadeOut(0);
            $(this).find(".daily-con-private").fadeIn(0);
        });
        //$(".daily-list-item")


    }
};


/*************************************************************************************************** search
 * 搜索模块
 */
daily.search =   {
    keyword: "",
    init: function(){
        var keyword = this.keyword = $.trim($("#search-input").val());
        daily.data.getSearchResult({
            param: {
                "daily.dailyUserId" : GLOBAL.user.id,
                "daily.dailyTitle" : keyword
            }
        });
    }
};



/*************************************************************************************************** data
 * 日志数据支持模块
 */
daily.data = {
    cache: {
        list: [],
        get: function(dailyObj){
            var list = $.grep(daily.data.cache.list, function(n){
                return dailyObj.id == n.id;
            });
            return list;
        },
        set: function(dailyObj){
            if(this.get(dailyObj).length == 0){
                this.list.push(dailyObj);
            }
            return dailyObj;
        },
        update: function(dailyObj){
            return $.map(this.list, function(n, i){
                if(n.id == dailyObj.id){
                    n = dailyObj;
                }
            });
        }
    },
    getSearchResult: function(options){
        $("#view-main-pager").pager({
            url: daily.action.doReadDailyListAction,
            param: options&&options.param || {},
            root: "results",
            onSuccess: function(data){
                $.each(data.results, function(i, n){
                    daily.data.cache.set(n);
                });
                $("#view-main-list").html(juicer.get("view-main-list-tpl").render(data));
                daily.search.keyword = "";
                daily.bind.afterRenderGridView();
            }
        });
    },
    getPrivateDailyList: function(options){
        $("#view-main-pager").pager({
            url: daily.action.doReadDailyListAction,
            root: "results",
            param: options.param||{},
            onSuccess: function(data){
                $.each(data.results, function(i, n){
                    daily.data.cache.set(n);
                });
                $("#view-main-list").html(juicer.get("view-main-list-tpl").render(data));
                daily.bind.afterRenderGridView();
            }
        });
    },
    getPublicDailyList: function(options){
        options = options || {};
        $("#view-main-pager").pager({
            url: daily.action.getPublicDailyListAction,
            param: options.param||{},
            root: options.root || "results",
            onSuccess: function(data){
                $.each(data.results, function(i, n){
                    daily.data.cache.set(n);
                });
                $("#view-main-list").html(juicer.get("view-main-list-tpl").render(data));
                daily.bind.afterRenderGridView();
            }
        });
    },
    getPrivateDailyTypeList: function(options){
        $.ajax({
            url: daily.action.doReadDailyTypeListAction,
            data: options&&options.param || {},
            error: function(e1,e2,e3){
                daily.notify.error({
                    text: "获取数据时发生以下错误：" + e2
                });
            },
            success: function(data){
                daily.view.doBuildDailyTypeTree(data, "private-daily-tree");
            }
        });
    },
    getPublicDailyTypeList: function(options){
        $.ajax({
            url: daily.action.doReadDailyTypeListAction,
            data: options&&options.param || {},
            error: function(e1,e2,e3){
                daily.notify.error({
                    text: "获取数据时发生以下错误：" + e2
                });
            },
            success: function(data){
                daily.view.doBuildDailyTypeTree(data, "public-daily-tree");
            }
        });
    },
    doModDaily: function(dailyList, callback){
        $.ajax({
            type: "post",
            url: daily.action.doModDailyAction,
            data: icinfo.form.arraySerialize("dailyList", dailyList),
            error: function(e1,e2,e3){
                daily.notify.error({
                    text: "在修改日志时发生以下错误：" + e2
                });
            },
            success: function(data){
                if(data.result == "success"){
                    daily.notify.success({
                        text: dailyList.length + " 条数据已保存"
                    });
                    if(callback)callback(data);
                }else{
                    daily.notify.error({
                        text: "发生错误："+data.results
                    });
                }
                $.dialog({
                    id: "dialog-add-dailyType"
                }).close();
            }
        });
    },
    doSaveDailyType: function(dailyTypeList, treeId){
        $.ajax({
            type: "post",
            url: daily.action.doSaveDailyTypeAction,
            data: icinfo.form.arraySerialize("dailyTypeList", dailyTypeList),
            error: function(e1,e2,e3){
                daily.notify.error({
                    text: "在保存日志类型时发生以下错误：" + e2
                });
            },
            success: function(data){
                if(data.result == "success"){
                    daily.data.getPrivateDailyTypeList({
                        param: {
                            "dailyType.dailyTypeUserId" : GLOBAL.user.id
                        }
                    });
                    daily.notify.success({
                        text: dailyTypeList.length + " 条数据已保存"
                    });
                }else{
                    daily.notify.error({
                        text: "发生错误："+data.results
                    });
                }
                $.dialog({
                    id: "dialog-add-dailyType"
                }).close();
            }
        });
    },
    doModDailyType: function(dailyTypeList, treeId){
        $.ajax({
            type: "post",
            url: daily.action.doModDailyTypeAction,
            data: icinfo.form.arraySerialize("dailyTypeList", dailyTypeList),
            error: function(e1,e2,e3){
                daily.notify.error({
                    text: "在修改日志类型时发生以下错误：" + e2
                });
            },
            success: function(data){
                if(data.result == "success"){
                    daily.edit.updateDailyType(dailyTypeList, treeId);
                    daily.notify.success({
                        text: dailyTypeList.length + " 条数据已修改"
                    });
                }else{
                    daily.notify.error({
                        text: "发生错误："+data.results
                    });
                }
            }
        });
    },
    doRmDailyType: function(dailyTypeList, treeId){
        $.ajax({
            type: "post",
            url: daily.action.doRmDailyTypeAction,
            data: icinfo.form.arraySerialize("dailyTypeList", dailyTypeList),
            error: function(e1,e2,e3){
                daily.notify.error({
                    text: "在删除日志类型时发生以下错误：" + e2
                });
            },
            success: function(data){
                if(data.result == "success"){
                    daily.notify.success({
                        text: dailyTypeList.length + " 条数据已删除"
                    });
                }else{
                    daily.notify.error({
                        text: "发生错误："+data.results
                    });
                }
            }
        });
    }
};


/*************************************************************************************************** view
 * 视图模块
 */
daily.view = {
    ztree: {},
    viewGridList: function(options){
        juicer.get(options.tplId).render(data);
    },
    /**
     *
     */
    viewDaily: function(daily){
        $("#toolbar-right-top, #view-grid, #view-main-pager").hide();
        $("#editor-right-top, #view-editor").show();


    },
    editDaily: function(){
        $("#toolbar-right-top, #view-grid, #view-main-pager").hide();
        $("#editor-right-top, #view-editor").show();

    },
    cancelViewDaily: function(){
        $("#editor-right-top, #view-editor").hide();
        $("#toolbar-right-top, #view-grid, #view-main-pager").show();

    },
    cancelEditDaily: function(){
        $("#editor-right-top, #view-editor").hide();
        $("#toolbar-right-top, #view-grid, #view-main-pager").show();

    },
    calcelAddDaily: function(){

    },
    addDaily: function(){

    },
    addDailyType: function(){
        $.dialog({
            id: "dialog-add-dailyType",
            title: "添加日志分类",
            padding: "0 0",
            lock: true,
            content: juicer.get("view-add-daily-type-tpl").render(),
            ok: function(){
                if($.trim($("#dailyTypeName").val()) == ""){
                    daily.dialog.alert("名称不能为空！", function(){
                        $("#dailyTypeName").focus();
                    });
                    return false;
                }
                daily.data.doSaveDailyType([{
                    dailyTypeName: $.trim($("#dailyTypeName").val()),
                    dailyTypeUserId: GLOBAL.user.id
                }], "private-daily-tree");
                return false;
            }
        });
    },
    doBuildDailyTypeTree: function(data, treeId){
        var treeData = data.results;
        $.each(treeData, function(i){
            treeData[i].open = true;
        });

        this.ztree[treeId] = $.fn.zTree.init($("#"+treeId), {
            callback: {
                onClick: function(event, treeId, treeNode){

                    daily.data.getPrivateDailyList({
                        param: (function(){
                            return "public-daily-tree" == treeId ? {
                                "daily.dailyType" : treeNode.id
                            }:{
                                "daily.dailyType" : treeNode.id,
                                "daily.dailyUserId" : GLOBAL.user.id
                            };
                        })()
                    });
                },
                onDrop: function (event, treeId, treeNodes, targetNode, moveType) {
                    var nodes = [];
                    $.each(treeNodes, function(i, n){
                        nodes.push({
                            id: n.id,
                            pid: moveType != null && moveType != "inner" ? targetNode.pid :targetNode.id,
                            dailyTypeName: n.dailyTypeName
                        });
                    });
                    daily.edit.doModDailyType(nodes);
                },
                beforeRename: function (treeId, treeNode, newName) {
                    if(newName.length < 3){
                        daily.dialog.alert("新的部门名称长度不能小于3位", function(){
                            $("#"+treeNode.tId+" .rename").focus();
                        });
                        return false;
                    }
                    return true;
                },
                onRename: function (event, treeId, treeNode) {
                    daily.edit.doModDailyType([{
                        id: treeNode.id,
                        dailyTypeName: treeNode.dailyTypeName
                    }], treeId);
                },
                beforeRemove: function (treeId, treeNode) {
                    return confirm("您是否要删除["+treeNode.dailyTypeName+"]，删除后无法恢复，请谨慎操作！");
                },
                onRemove: function (event, treeId, treeNode) {
                    daily.edit.doRmDailyType([{
                        id: treeNode.id
                    }]);
                }
            },
            view: {
                addDiyDom: function(treeId, treeNode){
                    var aObj = $("#" + treeNode.tId + "_a");
                    aObj.append("<span class='daily-count'> ("+treeNode.dailyCount+")</span>");
                }
            },
            edit: {
                enable: true,
                removeTitle : "删除",
                renameTitle : "修改",
                showRenameBtn: treeId == "public-daily-tree" ? false:true,
                showRemoveBtn: treeId == "public-daily-tree" ? false:true,
                drag: {
                    autoExpandTrigger: true,
                    isCopy : false,
                    isMove : true
                }
            },
            data: {
                key: {
                    name: "dailyTypeName",
                    title: "dailyTypeName"
                },
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "pid"
                }
            }
        }, treeData);

        daily.ui.accordionResize();
    }
};


/*************************************************************************************************** dialog
 * dialog模块
 */
daily.dialog =  {
    alert: function(content, ok){
        ok = ok || $.noop;
        $.dialog({
            title: "错误",
            icon: 'error',
            lock: true,
            opacity: .1,
            content: content,
            ok: ok
        });
    }
}



/*************************************************************************************************** notify
 * 消息模块
 */
daily.notify =   {
    success: function(options){
        $.pnotify($.extend({}, {
            type: "success",
            title: '成功',
            text: '您的操作已成功'
        }, options||{}));
    },
    error: function(options){
        $.pnotify($.extend({}, {
            type: "error",
            title: '错误',
            text: '发生未知错误，您的操作可能没有成功'
        }, options||{}));
    },
    notice: function(options){
        $.pnotify($.extend({}, {
            type: "notice",
            title: '警告',
            text: '此操作有可能会遇到未知问题'
        }, options||{}));
    },
    info: function(options){
        $.pnotify($.extend({}, {
            type: "info",
            title: '消息',
            text: '消息提示'
        }, options||{}));
    }
};



/*************************************************************************************************** edit
 * 编辑模块
 */
daily.edit =  {
    add: function(){
        daily.view.edit();
    },
    open: function(id){

    },
    mod: function(id){

    },
    rm: function(){
        var checkedDaily = $(".checked-daily:checked");
        if(checkedDaily.length == 0){
            return;
        }
    },
    /**
         * @param {HTMLElement} o 重要标记元素
         */
    setDailyImportant: function(o){

        if($(o).attr("dailyUserId") != GLOBAL.user.id){
            daily.notify.notify({
                title: "警告",
                text: "无法切换不属于您的日志重要性标记"
            });
            return;
        }

        var dailyImportant = $(o).attr("dailyImportant") == "1" ? 0 : 1;

        daily.data.doModDaily([{
            dailyImportant: dailyImportant,
            id: $(o).attr("dailyId")
        }], function(){
            $(o)[(dailyImportant == 0 ? "add" : "remove")+"Class"]("ui-icon-important-disabled").attr("dailyImportant", dailyImportant);
        });


    },
    doSaveDailyType: function(dailyType){
    //                    nodes[0].id = json.results;
    //                    DEPT.addNode(nodes[0]);
    },
    doRmDailyType: function(dailyType){

    },
    doModDailyType: function(dailyType, treeId){
        if(dailyType && dailyType.length>0){
            daily.data.doModDailyType(dailyType, treeId);
        }
    },
    updateDailyType: function(dailyType, treeId){
        $.each(dailyType, function(i, n){
            var ztree = $.fn.zTree.getZTreeObj(treeId),
            node = ztree.getNodeByParam("id", n.id);
            node.dailyTypeName = n.dailyTypeName;
            node.dailyCount = n.dailyCount || node.dailyCount;
            var aObj = $("#" + node.tId + "_a .daily-count");
            aObj.html("("+node.dailyCount+")");
            ztree.updateNode(node);
        });
    }
};
