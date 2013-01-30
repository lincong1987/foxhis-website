
var TEMP = ICINFO = {};

ICINFO.CONFIG = {
    desk : 1,                                //当前显示桌面
    dockPos : 'top',                 //应用码头位置,参数有:top,left,right
    appXY : 'x',                         //图标排列方式,参数有:x,y
    appButtonTop : 20,           //快捷方式top初始位置
    appButtonLeft : 20,          //快捷方式left初始位置
    createIndexid : 1,           //z-index初始值
    windowMinWidth : 215,        //窗口最小宽度
    windowMinHeight : 59,        //窗口最小高度
    appIcon : $_GLOBAL.imgSrc+"/shortcut/default/default.png",
    wallpaper : $_GLOBAL.imgSrc+'/wallpaper/wallpaper1.jpg',                  //壁纸
    wallpaperWidth : 1920,          //壁纸宽度
    wallpaperHeight : 1200,         //壁纸高度
    wallpaperType : 'tianchong'           //壁纸显示方式,参数有:tianchong,shiying,pingpu,lashen,juzhong
};
/**
 *  图标
 */
ICINFO.app = (function(){
    return {
        /**
 * 获得图标排列方式,x横向排列,y纵向排列
 */
        getXY : function(fun){
            $.ajax({
                type : 'POST',
                url : $_GLOBAL.detail.doGetUserAppxyAction,
                data : 'ac=getAppXY',
                success : function(json){
                    ICINFO.CONFIG.appXY = json.results;
                    if(fun){
                        fun();
                    }
                }
            });
        },
        /**
 *  更新图标排列方式
 */
        updateXY : function(appXY, fun){
            $.ajax({
                type : 'POST',
                url : $_GLOBAL.detail.doSaveUserAppxyAction,
                data : {
                    "userdetail.appXY" : appXY
                },
                //'ac=setAppXY&appxy=' + appXY,
                success : function(){
                    ICINFO.CONFIG.appXY = appXY;
                    if(typeof(fun) != 'undefined'){
                        fun();
                    }
                }
            });
        },
        /**
		 *  获取图标
		 */
        get : function(){
            //绘制图标表格
            var grid = ICINFO.grid.getAppGrid();
            var dockGrid = ICINFO.grid.getDockAppGrid();
            //获取json数组并循环输出每个图标
            $.ajax({
                type: "POST",
                url : $_GLOBAL.userApp.doGetUserAppAction,
                data: {},
                success: function(json){
                    // ICINFO.Api.ErrorHandle(json.result);

                    var sc = {
                        dockapp: [],
                        desk1app: [],
                        desk2app: [],
                        desk3app: [],
                        desk4app: [],
                        desk5app: []
                    };

                    $.each(json.results, function(i, n){
                        sc[n.appContainer+"app"].push({
                            id: n.appId,
                            apptype: n.appType,
                            iconName: n.appName,
                            iconUrl: n.appIcon == null || n.appIcon == "" ? ICINFO.CONFIG.appIcon : n.appIcon
                        });
                    });

                    //加载应用码头图标
                    if(sc['dockapp'] != null){
                        var dock_append = '', temp = {};
                        for(var i = 0; i < sc['dockapp'].length; i++){
                            temp = {
                                'top' : dockGrid[i]['startY'],
                                'left' : dockGrid[i]['startX'],
                                'title' : sc['dockapp'][i]['iconName'],
                                'id' : sc['dockapp'][i]['id'],
                                'imgsrc' : sc['dockapp'][i]['iconUrl']
                            };
                            switch(sc['dockapp'][i]['apptype']){
                                case 'app':
                                    dock_append += appTemp(temp);
                                    break;
                                case 'folder':
                                    dock_append += folderTemp(temp);
                                    break;
                                case 'widget':
                                    dock_append += widgetTemp(temp);
                                    break;
                            }
                            temp = {};
                        }
                        $('#dock-bar .dock-applist').html('').append(dock_append);
                    }
                    //加载桌面图标
                    for(var j = 1; j <= 5; j++){
                        var desk_append = '';
                        var temp = {};
                        if(sc['desk' + j + 'app'] != null){
                            for(i = 0; i < sc['desk' + j + 'app'].length; i++){
                                temp = {
                                    'top' : grid[i]['startY'] + 7,
                                    'left' : grid[i]['startX'] + 16,
                                    'title' : sc['desk' + j + 'app'][i]['iconName'],
                                    'id' : sc['desk' + j + 'app'][i]['id'],
                                    'imgsrc' : sc['desk' + j + 'app'][i]['iconUrl']
                                };
                                switch(sc['desk' + j + 'app'][i]['apptype']){
                                    case 'app':
                                        desk_append += appTemp(temp);
                                        break;
                                    case 'folder':
                                        desk_append += folderTemp(temp);
                                        break;
                                    case 'widget':
                                        desk_append += widgetTemp(temp);
                                        break;
                                }
                                temp = {};
                            }
                        }
                        desk_append += addTemp({
                            'top' : grid[i]['startY'] + 7,
                            'left' : grid[i]['startX'] + 16
                        });
                        $('#desk-' + j + ' li').remove();
                        $('#desk-' + j).append(desk_append);
                        i = 0;
                    }
                    //绑定'我的应用'图标点击事件
                    $('body').on('click', 'li.add-app', function(){
                        ICINFO.window.create(0,{
                            num : 'yysc',
                            title : '我的应用',
                            url : 'appCenter.do',
                            width : 800,
                            height : 484,
                            resize : false
                        });
                    });
                    //绑定图标拖动事件
                    ICINFO.app.move();
                    //绑定应用码头拖动事件
                    ICINFO.dock.move();
                    //加载滚动条
                    ICINFO.app.getScrollbar();
                    //绑定滚动条拖动事件
                    ICINFO.app.moveScrollbar();
                    //绑定图标右击事件
                    $('.shortcut').on('contextmenu', function(e){
                        $('.popup-menu').hide();
                        $('.quick_view_container').remove();
                        if($(this).hasClass('app')){
                            var popupmenu = ICINFO.popupMenu.app($(this));
                            var l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
                            var t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
                            popupmenu.css({
                                left : l,
                                top : t
                            }).show();
                        }else{
                            var popupmenu = ICINFO.popupMenu.folder($(this));
                            var l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
                            var t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
                            popupmenu.css({
                                left : l,
                                top : t
                            }).show();
                        }
                        return false;
                    });////绑定图标右击事件
                }// success tag end
            });
        },
        /**
         * 添加应用
         */
        add : function(appid, fun){
            $.ajax({
                type : 'POST',
                url : $_GLOBAL.ajax.app,
                data : 'ac=addMyApp&appid=' + appid + '&desk=' + ICINFO.CONFIG.desk,
                success : function(){
                    if(typeof(fun) !== 'undefined'){
                        fun();
                    }
                }
            });
        },
        /**
         * 删除应用
         */
        remove : function(appid, fun){
            $.ajax({
                type : 'POST',
                url : $_GLOBAL.ajax.app,
                data : 'ac=delMyApp&appid=' + appid,
                success : function(){
                    if(typeof(fun) !== 'undefined'){
                        fun();
                    }
                }
            });
        },
        /**
         * 图标拖动
         * 这块代码略多,主要处理了9种情况下的拖动,分别是:
         * 桌面拖动到应用码头、桌面拖动到文件夹内、当前桌面上拖动(排序)
         * 应用码头拖动到桌面、应用码头拖动到文件夹内、应用码头上拖动(排序)
         * 文件夹内拖动到桌面、文件夹内拖动到应用码头、不同文件夹之间拖动
         */
        move : function(){
            //应用码头图标拖动
            $('#dock-bar .dock-applist').off('mousedown', 'li').on('mousedown', 'li', function(e){
                e.preventDefault();
                e.stopPropagation();
                if(e.button == 0 || e.button == 1){
                    var oldobj = $(this), x, y, cx, cy, dx, dy, lay, obj = $('<li id="shortcut_shadow">' + oldobj.html() + '</li>');
                    dx = cx = e.clientX;
                    dy = cy = e.clientY;
                    x = dx - oldobj.offset().left;
                    y = dy - oldobj.offset().top;
                    //绑定鼠标移动事件
                    $(document).on('mousemove', function(e){
                        $('body').append(obj);
                        lay = ICINFO.maskBox.desk();
                        lay.show();
                        cx = e.clientX <= 0 ? 0 : e.clientX >= $(document).width() ? $(document).width() : e.clientX;
                        cy = e.clientY <= 0 ? 0 : e.clientY >= $(document).height() ? $(document).height() : e.clientY;
                        _l = cx - x;
                        _t = cy - y;
                        if(dx != cx || dy != cy){
                            obj.css({
                                left : _l,
                                top : _t
                            }).show();
                        }
                    }).on('mouseup', function(){
                        $(document).off('mousemove').off('mouseup');
                        obj.remove();
                        if(typeof(lay) !== 'undefined'){
                            lay.hide();
                        }
                        //判断是否移动图标,如果没有则判断为click事件
                        if(dx == cx && dy == cy){
                            if(oldobj.attr('type') == 'widget'){
                                ICINFO.widget.create(oldobj.attr('shortcut'));
                            }else{
                                ICINFO.window.create(oldobj.attr('shortcut'));
                            }
                            return false;
                        }
                        var folderId = ICINFO.grid.searchFolderGrid(cx, cy);
                        if(folderId != null){
                            if(oldobj.hasClass('folder') == false){
                                $.ajax({
                                    type : 'POST',
                                    url : $_GLOBAL.ajax.app,
                                    data : 'ac=updateMyApp&movetype=dock-folder&id=' + oldobj.attr('shortcut') + '&from=' + oldobj.index() + '&to=' + folderId + '&desk=' + ICINFO.CONFIG.desk,
                                    success : function(){
                                        oldobj.remove();
                                        ICINFO.deskTop.appresize();
                                        ICINFO.folderView.init($('#folder_' + folderId));
                                        ICINFO.window.updateFolder(folderId);
                                    }
                                });
                            }
                        }else{
                            var icon, icon2;
                            var iconIndex = $('#desk-' + ICINFO.CONFIG.desk + ' li.shortcut').length == 0 ? -1 : $('#desk-' + ICINFO.CONFIG.desk + ' li').index(oldobj);
                            var iconIndex2 = $('#dock-bar .dock-applist').html() == '' ? -1 : $('#dock-bar .dock-applist li').index(oldobj);

                            var dock_w2 = ICINFO.CONFIG.dockPos == 'left' ? 0 : ICINFO.CONFIG.dockPos == 'top' ? ($(window).width() - $('#dock-bar .dock-applist').width() - 20) / 2 : $(window).width() - $('#dock-bar .dock-applist').width();
                            var dock_h2 = ICINFO.CONFIG.dockPos == 'top' ? 0 : ($(window).height() - $('#dock-bar .dock-applist').height() - 20) / 2;
                            icon2 = ICINFO.grid.searchDockAppGrid(cx - dock_w2, cy - dock_h2);
                            if(icon2 != null && icon2 != oldobj.index()){
                                $.ajax({
                                    type : 'POST',
                                    url : $_GLOBAL.ajax.app,
                                    data : 'ac=updateMyApp&movetype=dock-dock&id=' + oldobj.attr('shortcut') + '&from=' + oldobj.index() + '&to=' + icon2 + '&desk=' + ICINFO.CONFIG.desk,
                                    success : function(){
                                        if(icon2 < iconIndex2){
                                            $('#dock-bar .dock-applist li.shortcut:eq(' + icon2 + ')').before(oldobj);
                                        }else if(icon2 > iconIndex2){
                                            $('#dock-bar .dock-applist li.shortcut:eq(' + icon2 + ')').after(oldobj);
                                        }
                                        ICINFO.deskTop.appresize();
                                    }
                                });
                            }else{
                                var dock_w = ICINFO.CONFIG.dockPos == 'left' ? 73 : 0;
                                var dock_h = ICINFO.CONFIG.dockPos == 'top' ? 73 : 0;
                                icon = ICINFO.grid.searchAppGrid(cx - dock_w, cy - dock_h);
                                if(icon != null){
                                    $.ajax({
                                        type : 'POST',
                                        url : $_GLOBAL.ajax.app,
                                        data : 'ac=updateMyApp&movetype=dock-desk&id=' + oldobj.attr('shortcut') + '&from=' + oldobj.index() + '&to=' + (icon + 1) + '&desk=' + ICINFO.CONFIG.desk,
                                        success : function(){
                                            if(icon < iconIndex){
                                                $('#desk-' + ICINFO.CONFIG.desk + ' li.shortcut:eq(' + icon + ')').before(oldobj);
                                            }else if(icon > iconIndex){
                                                $('#desk-' + ICINFO.CONFIG.desk + ' li.shortcut:eq(' + icon + ')').after(oldobj);
                                            }else{
                                                if(iconIndex == -1){
                                                    $('#desk-' + ICINFO.CONFIG.desk + ' li.add-app').before(oldobj);
                                                }
                                            }
                                            ICINFO.deskTop.appresize();
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
                return false;
            });
            //桌面图标拖动
            $('#desk .desktop-container').off('mousedown', 'li.shortcut').on('mousedown', 'li.shortcut', function(e){
                e.preventDefault();
                e.stopPropagation();
                if(e.button == 0 || e.button == 1){
                    var oldobj = $(this), x, y, cx, cy, dx, dy, lay, obj = $('<li id="shortcut_shadow">' + oldobj.html() + '</li>');
                    dx = cx = e.clientX;
                    dy = cy = e.clientY;
                    x = dx - oldobj.offset().left;
                    y = dy - oldobj.offset().top;
                    //绑定鼠标移动事件
                    $(document).on('mousemove', function(e){
                        $('body').append(obj);
                        lay = ICINFO.maskBox.desk();
                        lay.show();
                        cx = e.clientX <= 0 ? 0 : e.clientX >= $(document).width() ? $(document).width() : e.clientX;
                        cy = e.clientY <= 0 ? 0 : e.clientY >= $(document).height() ? $(document).height() : e.clientY;
                        _l = cx - x;
                        _t = cy - y;
                        if(dx != cx || dy != cy){
                            obj.css({
                                left : _l,
                                top : _t
                            }).show();
                        }
                    }).on('mouseup', function(){
                        $(document).off('mousemove').off('mouseup');
                        obj.remove();
                        if(typeof(lay) !== 'undefined'){
                            lay.hide();
                        }
                        //判断是否移动图标,如果没有则判断为click事件
                        if(dx == cx && dy == cy){
                            if(oldobj.attr('type') == 'widget'){
                                ICINFO.widget.create(oldobj.attr('shortcut'));
                            }else if(oldobj.attr('type') == 'app'){
                                ICINFO.window.create(oldobj.attr('shortcut'));
                            }else{
                                ICINFO.folderView.init(oldobj);
                            }
                            return false;
                        }
                        var folderId = ICINFO.grid.searchFolderGrid(cx, cy);
                        if(folderId != null){
                            if(oldobj.hasClass('folder') == false){
                                $.ajax({
                                    type : 'POST',
                                    url : $_GLOBAL.ajax.app,
                                    data : 'ac=updateMyApp&movetype=desk-folder&id=' + oldobj.attr('shortcut') + '&from=' + (oldobj.index() - 2) + '&to=' + folderId + '&desk=' + ICINFO.CONFIG.desk,
                                    success : function(){
                                        oldobj.remove();
                                        ICINFO.deskTop.appresize();
                                        ICINFO.folderView.init($('#folder_' + folderId));
                                        ICINFO.window.updateFolder(folderId);
                                    }
                                });
                            }
                        }else{
                            var icon, icon2;
                            var iconIndex = $('#desk-' + ICINFO.CONFIG.desk + ' li.shortcut').length == 0 ? -1 : $('#desk-' + ICINFO.CONFIG.desk + ' li').index(oldobj);
                            var iconIndex2 = $('#dock-bar .dock-applist').html() == '' ? -1 : $('#dock-bar .dock-applist li').index(oldobj);

                            var dock_w2 = ICINFO.CONFIG.dockPos == 'left' ? 0 : ICINFO.CONFIG.dockPos == 'top' ? ($(window).width() - $('#dock-bar .dock-applist').width() - 20) / 2 : $(window).width() - $('#dock-bar .dock-applist').width();
                            var dock_h2 = ICINFO.CONFIG.dockPos == 'top' ? 0 : ($(window).height()-$('#dock-bar .dock-applist').height() - 20) / 2;
                            icon2 = ICINFO.grid.searchDockAppGrid(cx - dock_w2, cy - dock_h2);
                            if(icon2 != null){
                                $.ajax({
                                    type : 'POST',
                                    url : $_GLOBAL.ajax.app,
                                    data : 'ac=updateMyApp&movetype=desk-dock&id=' + oldobj.attr('shortcut') + '&from=' + (oldobj.index() - 2) + '&to=' + (icon2 + 1) + '&desk=' + ICINFO.CONFIG.desk,
                                    success : function(){
                                        if(icon2 < iconIndex2){
                                            $('#dock-bar .dock-applist li.shortcut:eq(' + icon2 + ')').before(oldobj);
                                        }else if(icon2 > iconIndex2){
                                            $('#dock-bar .dock-applist li.shortcut:eq(' + icon2 + ')').after(oldobj);
                                        }else{
                                            if(iconIndex2 == -1){
                                                $('#dock-bar .dock-applist').append(oldobj);
                                            }
                                        }
                                        if($('#dock-bar .dock-applist li.shortcut').length > 7){
                                            $('#desk-' + ICINFO.CONFIG.desk + ' li.shortcut').last().after($('#dock-bar .dock-applist li.shortcut').last());
                                        }
                                        ICINFO.deskTop.appresize();
                                    }
                                });
                            }else{
                                var dock_w = ICINFO.CONFIG.dockPos == 'left' ? 73 : 0;
                                var dock_h = ICINFO.CONFIG.dockPos == 'top' ? 73 : 0;
                                icon = ICINFO.grid.searchAppGrid(cx - dock_w, cy - dock_h);
                                if(icon != null && icon != (oldobj.index() - 2)){
                                    $.ajax({
                                        type : 'POST',
                                        url : $_GLOBAL.ajax.app,
                                        data : 'ac=updateMyApp&movetype=desk-desk&id=' + oldobj.attr('shortcut') + '&from=' + (oldobj.index() - 2) + '&to=' + icon + '&desk=' + ICINFO.CONFIG.desk,
                                        success : function(){
                                            if(icon < iconIndex){
                                                $('#desk-' + ICINFO.CONFIG.desk + ' li.shortcut:eq(' + icon + ')').before(oldobj);
                                            }else if(icon > iconIndex){
                                                $('#desk-' + ICINFO.CONFIG.desk + ' li.shortcut:eq(' + icon + ')').after(oldobj);
                                            }else{
                                                if(iconIndex == -1){
                                                    $('#desk-' + ICINFO.CONFIG.desk + ' li.add-app').before(oldobj);
                                                }
                                            }
                                            ICINFO.deskTop.appresize();
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            });
            //文件夹内图标拖动
            $('.folder_body, .quick_view_container').off('mousedown', 'li').on('mousedown', 'li', function(e){
                e.preventDefault();
                e.stopPropagation();
                if(e.button == 0 || e.button == 1){
                    var oldobj = $(this), x, y, cx, cy, dx, dy, lay, obj = $('<li id="shortcut_shadow">' + oldobj.html() + '</li>');
                    dx = cx = e.clientX;
                    dy = cy = e.clientY;
                    x = dx - oldobj.offset().left;
                    y = dy - oldobj.offset().top;
                    //绑定鼠标移动事件
                    $(document).on('mousemove', function(e){
                        $('body').append(obj);
                        lay = ICINFO.maskBox.desk();
                        lay.show();
                        cx = e.clientX <= 0 ? 0 : e.clientX >= $(document).width() ? $(document).width() : e.clientX;
                        cy = e.clientY <= 0 ? 0 : e.clientY >= $(document).height() ? $(document).height() : e.clientY;
                        _l = cx - x;
                        _t = cy - y;
                        if(dx != cx || dy != cy){
                            obj.css({
                                left : _l,
                                top : _t
                            }).show();
                        }
                    }).on('mouseup', function(){
                        $(document).off('mousemove').off('mouseup');
                        obj.remove();
                        if(typeof(lay) !== 'undefined'){
                            lay.hide();
                        }
                        //判断是否移动图标,如果没有则判断为click事件
                        if(dx == cx && dy == cy){
                            if(oldobj.attr('type') == 'widget'){
                                ICINFO.widget.create(oldobj.attr('shortcut'));
                            }else{
                                ICINFO.window.create(oldobj.attr('shortcut'));
                            }
                            return false;
                        }
                        var folderId = ICINFO.grid.searchFolderGrid(cx, cy);
                        if(folderId != null){
                            if(oldobj.parents('.folder-window').attr('window') != folderId){
                                $.ajax({
                                    type : 'POST',
                                    url : $_GLOBAL.ajax.app,
                                    data : 'ac=updateMyApp&movetype=folder-folder&id=' + oldobj.attr('shortcut') + '&from=' + oldobj.parents('.folder-window').attr('window') + '&to=' + folderId + '&desk=' + ICINFO.CONFIG.desk,
                                    success : function(){
                                        oldobj.remove();
                                        ICINFO.deskTop.appresize();
                                        ICINFO.folderView.init($('#folder_' + folderId));
                                        ICINFO.window.updateFolder(folderId);
                                    }
                                });
                            }
                        }else{
                            var icon, icon2;
                            var iconIndex = $('#desk-' + ICINFO.CONFIG.desk + ' li.shortcut').length == 0 ? -1 : $('#desk-' + ICINFO.CONFIG.desk + ' li').index(oldobj);
                            var iconIndex2 = $('#dock-bar .dock-applist').html() == '' ? -1 : $('#dock-bar .dock-applist li').index(oldobj);

                            var dock_w2 = ICINFO.CONFIG.dockPos == 'left' ? 0 : ICINFO.CONFIG.dockPos == 'top' ? ($(window).width() - $('#dock-bar .dock-applist').width() - 20) / 2 : $(window).width() - $('#dock-bar .dock-applist').width();
                            var dock_h2 = ICINFO.CONFIG.dockPos == 'top' ? 0 : ($(window).height() - $('#dock-bar .dock-applist').height() - 20) / 2;
                            icon2 = ICINFO.grid.searchDockAppGrid(cx - dock_w2, cy - dock_h2);
                            if(icon2 != null){
                                $.ajax({
                                    type : 'POST',
                                    url : $_GLOBAL.ajax.app,
                                    data : 'ac=updateMyApp&movetype=folder-dock&id=' + oldobj.attr('shortcut') + '&from=' + oldobj.parents('.folder-window').attr('window') + '&to=' + (icon2 + 1) + '&desk=' + ICINFO.CONFIG.desk,
                                    success : function(){
                                        var folderId = oldobj.parents('.folder-window').attr('window');
                                        if(icon2 < iconIndex2){
                                            $('#dock-bar .dock-applist li.shortcut:eq(' + icon2 + ')').before(oldobj);
                                        }else if(icon2 > iconIndex2){
                                            $('#dock-bar .dock-applist li.shortcut:eq(' + icon2 + ')').after(oldobj);
                                        }else{
                                            if(iconIndex2 == -1){
                                                $('#dock-bar .dock-applist').append(oldobj);
                                            }
                                        }
                                        if($('#dock-bar .dock-applist li.shortcut').length > 7){
                                            $('#desk-' + ICINFO.CONFIG.desk + ' li.shortcut').last().after($('#dock-bar .dock-applist li.shortcut').last());
                                        }
                                        ICINFO.deskTop.appresize();
                                        ICINFO.folderView.init($('#folder_' + folderId));
                                    }
                                });
                            }else{
                                var dock_w = ICINFO.CONFIG.dockPos == 'left' ? 73 : 0;
                                var dock_h = ICINFO.CONFIG.dockPos == 'top' ? 73 : 0;
                                icon = ICINFO.grid.searchAppGrid(cx - dock_w, cy - dock_h);
                                if(icon != null){
                                    $.ajax({
                                        type : 'POST',
                                        url : $_GLOBAL.ajax.app,
                                        data : 'ac=updateMyApp&movetype=folder-desk&id=' + oldobj.attr('shortcut') + '&from=' + oldobj.parents('.folder-window').attr('window') + '&to=' + (icon + 1) + '&desk=' + ICINFO.CONFIG.desk,
                                        success : function(){
                                            var folderId = oldobj.parents('.folder-window').attr('window');
                                            if(icon < iconIndex){
                                                $('#desk-' + ICINFO.CONFIG.desk + ' li.shortcut:eq(' + icon + ')').before(oldobj);
                                            }else if(icon > iconIndex){
                                                $('#desk-' + ICINFO.CONFIG.desk + ' li.shortcut:eq(' + icon + ')').after(oldobj);
                                            }else{
                                                if(iconIndex == -1){
                                                    $('#desk-' + ICINFO.CONFIG.desk + ' li.add-app').before(oldobj);
                                                }
                                            }
                                            ICINFO.deskTop.appresize();
                                            ICINFO.folderView.init($('#folder_' + folderId));
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            });
        },
        /**
		 *  加载滚动条
		 */
        getScrollbar : function(){
            setTimeout(function(){
                $('#desk .desktop-container').each(function(){
                    var desk = $(this), scrollbar = desk.children('.scrollbar');
                    //先清空所有附加样式
                    scrollbar.hide();
                    desk.scrollLeft(0).scrollTop(0);
                    /**
                     * 判断图标排列方式
                     * 横向排列超出屏幕则出现纵向滚动条,纵向排列超出屏幕则出现横向滚动条
                     */
                    if(ICINFO.CONFIG.appXY == 'x'){
                        /**
                         * 获得桌面图标定位好后的实际高度
                         * 因为显示的高度是固定的,而实际的高度是根据图标个数会变化
                         */
                        var deskH = parseInt(desk.children('.add-app').css('top')) + 108;
                        /**
                         * 计算滚动条高度
                         * 高度公式(图标纵向排列计算滚动条宽度以此类推):
                         * 滚动条实际高度 = 桌面显示高度 / 桌面实际高度 * 滚动条总高度(桌面显示高度)
                         * 如果"桌面显示高度 / 桌面实际高度 >= 1"说明图标个数未能超出桌面,则不需要出现滚动条
                         */
                        if(desk.height() / deskH < 1){
                            desk.children('.scrollbar-y').height(desk.height() / deskH * desk.height()).css('top',0).show();
                        }
                    }else{
                        var deskW = parseInt(desk.children('.add-app').css('left')) + 106;
                        if(desk.width() / deskW < 1){
                            desk.children('.scrollbar-x').width(desk.width() / deskW * desk.width()).css('left',0).show();
                        }
                    }
                });
            },500);
        },
        /**
         * 移动滚动条
         */
        moveScrollbar : function(){
            /**
             * 手动拖动
             */
            $('.scrollbar').on('mousedown', function(e){
                var x, y, cx, cy, deskrealw, deskrealh, movew, moveh;
                var scrollbar = $(this), desk = scrollbar.parent('.desktop-container');
                deskrealw = parseInt(desk.children('.add-app').css('left')) + 106;
                deskrealh = parseInt(desk.children('.add-app').css('top')) + 108;
                movew = desk.width() - scrollbar.width();
                moveh = desk.height() - scrollbar.height();
                if(scrollbar.hasClass('scrollbar-x')){
                    x = e.clientX - scrollbar.offset().left;
                }else{
                    y = e.clientY - scrollbar.offset().top;
                }
                $(document).on('mousemove', function(e){
                    if(scrollbar.hasClass('scrollbar-x')){
                        if(ICINFO.CONFIG.dockPos == 'left'){
                            cx = e.clientX - x - 73 < 0 ? 0 : e.clientX - x - 73 > movew ? movew : e.clientX - x - 73;
                        }else{
                            cx = e.clientX - x < 0 ? 0 : e.clientX - x > movew ? movew : e.clientX - x;
                        }
                        scrollbar.css('left', cx / desk.width() * deskrealw + cx);
                        desk.scrollLeft(cx / desk.width() * deskrealw);
                    }else{
                        if(ICINFO.CONFIG.dockPos == 'top'){
                            cy = e.clientY - y - 73 < 0 ? 0 : e.clientY - y - 73 > moveh ? moveh : e.clientY - y - 73;
                        }else{
                            cy = e.clientY - y < 0 ? 0 : e.clientY - y > moveh ? moveh : e.clientY - y;
                        }
                        scrollbar.css('top', cy / desk.height() * deskrealh + cy);
                        desk.scrollTop(cy / desk.height() * deskrealh);
                    }
                }).on('mouseup', function(){
                    $(this).off('mousemove').off('mouseup');
                });
            });
            /**
			 *  鼠标滚轮
			 *  只支持纵向滚动条
			 */
            $('#desk .desktop-container').each(function(i){
                $('#desk-' + (i + 1)).on('mousewheel', function(event, delta){
                    var desk = $(this), deskrealh = parseInt(desk.children('.add-app').css('top')) + 108, scrollupdown;
                    /**
					 *  delta == -1   往下
					 *  delta == 1        往上
					 *  chrome下鼠标滚轮每滚动一格,页面滑动距离是200px,所以下面也用这个值来模拟每次滑动的距离
					 */
                    if(delta < 0){
                        scrollupdown = desk.scrollTop() + 200 > deskrealh - desk.height() ? deskrealh - desk.height() : desk.scrollTop() + 200;
                    }else{
                        scrollupdown = desk.scrollTop() - 200 < 0 ? 0 : desk.scrollTop() - 200;
                    }
                    desk.stop(false, true).animate({
                        scrollTop:scrollupdown
                    },300);
                    desk.children('.scrollbar-y').stop(false, true).animate({
                        top : scrollupdown / deskrealh * desk.height() + scrollupdown
                    }, 300);
                });
            });
        },
        /**
		 *  获得应用评分
		 */
        getStar : function(appid){
            $.ajax({
                type : 'POST',
                url : $_GLOBAL.ajax.app,
                data : 'ac=getAppStar&appid=' + appid,
                success : function(msg){
                    $('#star .star-num').text(Math.floor(msg));
                    $('#star i').css('width', (msg * 20) + '%');
                    $('#star ul').data('appid', appid);
                }
            });
        }
    }
})();

/**
 *  全局视图
 */
ICINFO.appmanage = (function(){
    return {
        init : function(){
            $('#amg_dock_container').html('').append($('#dock-container .dock-applist li').clone());
            $('#desk .desktop-container').each(function(i){
                $('#amg_folder_container .folderItem:eq(' + i + ') .folderInner').html('')
                $(this).children('.shortcut').each(function(){
                    $('#amg_folder_container .folderItem:eq(' + i + ') .folderInner').append($(this).clone());
                });
            });
            $('#desktop').hide();
            $('#appmanage').show();
            $('#amg_folder_container .folderItem').show().addClass('folderItem_turn');
            $('#amg_folder_container').height($(document).height() - 80);
            $('#appmanage .amg_close').off('click').on('click', function(){
                ICINFO.appmanage.close();
            });
            ICINFO.appmanage.appresize();
            ICINFO.appmanage.move();
            ICINFO.appmanage.getScrollbar();
            ICINFO.appmanage.moveScrollbar();
        },
        getScrollbar : function(){
            setTimeout(function(){
                $('#amg_folder_container .folderItem').each(function(){
                    var desk = $(this).find('.folderInner'), deskrealh = parseInt(desk.children('.shortcut:last').css('top')) + 41, scrollbar = desk.next('.scrollBar');
                    //先清空所有附加样式
                    scrollbar.hide();
                    desk.scrollTop(0);
                    if(desk.height() / deskrealh < 1){
                        scrollbar.height(desk.height() / deskrealh * desk.height()).css('top',0).show();
                    }
                });
            },500);
        },
        moveScrollbar : function(){
            /**
			 *  手动拖动
			 */
            $('.scrollBar').on('mousedown', function(e){
                var y, cy, deskrealh, moveh;
                var scrollbar = $(this), desk = scrollbar.prev('.folderInner');
                deskrealh = parseInt(desk.children('.shortcut:last').css('top')) + 41;
                moveh = desk.height() - scrollbar.height();
                y = e.clientY - scrollbar.offset().top;
                $(document).on('mousemove', function(e){
                    //减80px是因为顶部dock区域的高度为80px,所以计算移动距离需要先减去80px
                    cy = e.clientY - y - 80 < 0 ? 0 : e.clientY - y - 80 > moveh ? moveh : e.clientY - y - 80;
                    scrollbar.css('top', cy);
                    desk.scrollTop(cy / desk.height() * deskrealh);
                }).on('mouseup', function(){
                    $(this).off('mousemove').off('mouseup');
                });
            });
            /**
			 *  鼠标滚轮
			 */
            $('#amg_folder_container .folderInner').off('mousewheel').on('mousewheel', function(event, delta){
                var desk = $(this), deskrealh = parseInt(desk.children('.shortcut:last').css('top')) + 41, scrollupdown;
                /**
				 *  delta == -1   往下
				 *  delta == 1        往上
				 */
                if(delta < 0){
                    scrollupdown = desk.scrollTop() + 120 > deskrealh - desk.height() ? deskrealh - desk.height() : desk.scrollTop() + 120;
                }else{
                    scrollupdown = desk.scrollTop() - 120 < 0 ? 0 : desk.scrollTop() - 120;
                }
                desk.stop(false, true).animate({
                    scrollTop : scrollupdown
                }, 300);
                desk.next('.scrollBar').stop(false, true).animate({
                    top : scrollupdown / deskrealh * desk.height()
                }, 300);
            });
        },
        resize : function(){
            $('#amg_folder_container').height($(document).height() - 80);
            ICINFO.appmanage.getScrollbar();
        },
        appresize : function(){
            var manageDockGrid = ICINFO.grid.getManageDockAppGrid();
            $('#amg_dock_container li').each(function(i){
                $(this).animate({
                    'left' : manageDockGrid[i]['startX'],
                    'top' : 10
                }, 500);
            });
            for(var i = 0; i < 5; i++){
                var manageAppGrid = ICINFO.grid.getManageAppGrid();
                $('#amg_folder_container .folderItem:eq(' + i + ') .folderInner li').each(function(j){
                    $(this).animate({
                        'left' : 0,
                        'top' : manageAppGrid[j]['startY']
                    }, 500).attr('desk', i);
                });
            }
        },
        close : function(){
            $('#desktop').show();
            $('#appmanage').hide();
            $('#amg_folder_container .folderItem').removeClass('folderItem_turn');
            ICINFO.app.get();
        },
        move : function(){
            $('#amg_dock_container').off('mousedown').on('mousedown', 'li', function(e){
                e.preventDefault();
                e.stopPropagation();
                if(e.button == 0 || e.button == 1){
                    var oldobj = $(this), x, y, cx, cy, dx, dy, lay, obj = $('<li id="shortcut_shadow">' + oldobj.html() + '</li>');
                    dx = cx = e.clientX;
                    dy = cy = e.clientY;
                    x = dx - oldobj.offset().left;
                    y = dy - oldobj.offset().top;
                    //绑定鼠标移动事件
                    $(document).on('mousemove', function(e){
                        $('body').append(obj);
                        lay = ICINFO.maskBox.desk();
                        lay.show();
                        cx = e.clientX <= 0 ? 0 : e.clientX >= $(document).width() ? $(document).width() : e.clientX;
                        cy = e.clientY <= 0 ? 0 : e.clientY >= $(document).height() ? $(document).height() : e.clientY;
                        _l = cx - x;
                        _t = cy - y;
                        if(dx != cx || dy != cy){
                            obj.css({
                                left : _l,
                                top : _t
                            }).show();
                        }
                    }).on('mouseup', function(){
                        $(document).off('mousemove').off('mouseup');
                        obj.remove();
                        if(typeof(lay) !== 'undefined'){
                            lay.hide();
                        }
                        //判断是否移动图标,如果没有则判断为click事件
                        if(dx == cx && dy == cy){
                            ICINFO.appmanage.close();
                            ICINFO.window.create(oldobj.attr('shortcut'));
                            return false;
                        }
                        var icon, icon2;
                        var iconIndex = $('#amg_folder_container .folderItem:eq(' + oldobj.attr('desk') + ') .folderInner li').length == 0 ? -1 : $('#amg_folder_container .folderItem:eq(' + oldobj.attr('desk') + ') .folderInner li').index(oldobj);
                        var iconIndex2 = $('#amg_dock_container').html() == '' ? -1 : $('#amg_dock_container li').index(oldobj);
                        if(cy <= 80){
                            icon2 = ICINFO.grid.searchManageDockAppGrid(cx);
                            if(icon2 != null && icon2 != oldobj.index()){
                                $.ajax({
                                    type : 'POST',
                                    url : $_GLOBAL.AJAX_Interface,
                                    data : 'ac=updateMyApp&movetype=dock-dock&id=' + oldobj.attr('shortcut') + '&from=' + oldobj.index() + '&to=' + icon2 + '&desk=' + ICINFO.CONFIG.desk,
                                    success : function(){
                                        if(icon2 < iconIndex2){
                                            $('#amg_dock_container li.shortcut:eq(' + icon2 + ')').before(oldobj);
                                        }else if(icon2 > iconIndex2){
                                            $('#amg_dock_container li.shortcut:eq(' + icon2 + ')').after(oldobj);
                                        }
                                        ICINFO.appmanage.appresize();
                                        ICINFO.appmanage.getScrollbar();
                                    }
                                });
                            }
                        }else{
                            var movedesk = parseInt(cx / ($(document).width() / 5));
                            icon = ICINFO.grid.searchManageAppGrid(cy - 90, movedesk);
                            if(icon != null){
                                $.ajax({
                                    type : 'POST',
                                    url : $_GLOBAL.AJAX_Interface,
                                    data : 'ac=updateMyApp&movetype=dock-desk&id=' + oldobj.attr('shortcut') + '&from=' + oldobj.index() + '&to=' + (icon + 1) + '&desk=' + (movedesk + 1),
                                    success : function(){
                                        if(icon < iconIndex){
                                            $('#amg_folder_container .folderItem:eq(' + movedesk + ') .folderInner li:eq(' + icon + ')').before(oldobj);
                                        }else if(icon > iconIndex){
                                            $('#amg_folder_container .folderItem:eq(' + movedesk + ') .folderInner li:eq(' + icon + ')').after(oldobj);
                                        }else{
                                            if(iconIndex == -1){
                                                $('#amg_folder_container .folderItem:eq(' + movedesk + ') .folderInner').append(oldobj);
                                            }
                                        }
                                        ICINFO.appmanage.appresize();
                                        ICINFO.appmanage.getScrollbar();
                                    }
                                });
                            }
                        }
                    });
                }
                return false;
            });
            $('#amg_folder_container').off('mousedown', 'li.shortcut').on('mousedown', 'li.shortcut', function(e){
                e.preventDefault();
                e.stopPropagation();
                if(e.button == 0 || e.button == 1){
                    var oldobj = $(this), x, y, cx, cy, dx, dy, lay, obj = $('<li id="shortcut_shadow2">' + oldobj.html() + '</li>');
                    dx = cx = e.clientX;
                    dy = cy = e.clientY;
                    x = dx - oldobj.offset().left;
                    y = dy - oldobj.offset().top;
                    //绑定鼠标移动事件
                    $(document).on('mousemove', function(e){
                        $('body').append(obj);
                        lay = ICINFO.maskBox.desk();
                        lay.show();
                        cx = e.clientX <= 0 ? 0 : e.clientX >= $(document).width() ? $(document).width() : e.clientX;
                        cy = e.clientY <= 0 ? 0 : e.clientY >= $(document).height() ? $(document).height() : e.clientY;
                        _l = cx - x;
                        _t = cy - y;
                        if(dx != cx || dy != cy){
                            obj.css({
                                left:_l,
                                top:_t
                            }).show();
                        }
                    }).on('mouseup', function(){
                        $(document).off('mousemove').off('mouseup');
                        obj.remove();
                        if(typeof(lay) !== 'undefined'){
                            lay.hide();
                        }
                        //判断是否移动图标,如果没有则判断为click事件
                        if(dx == cx && dy == cy){
                            ICINFO.appmanage.close();
                            ICINFO.window.create(oldobj.attr('shortcut'));
                            return false;
                        }
                        var icon, icon2;
                        var iconIndex = $('#amg_folder_container .folderItem:eq(' + oldobj.attr('desk') + ') .folderInner li').length == 0 ? -1 : $('#amg_folder_container .folderItem:eq(' + oldobj.attr('desk') + ') .folderInner li').index(oldobj);
                        var iconIndex2 = $('#amg_dock_container').html() == '' ? -1 : $('#amg_dock_container li').index(oldobj);
                        if(cy <= 80){
                            icon2 = ICINFO.grid.searchManageDockAppGrid(cx);
                            if(icon2 != null){
                                $.ajax({
                                    type : 'POST',
                                    url : $_GLOBAL.AJAX_Interface,
                                    data : 'ac=updateMyApp&movetype=desk-dock&id=' + oldobj.attr('shortcut') + '&from=' + oldobj.index() + '&to=' + (icon2 + 1) + '&desk=' + (parseInt(oldobj.attr('desk')) + 1),
                                    success : function(){
                                        if(icon2 < iconIndex2){
                                            $('#amg_dock_container li.shortcut:eq(' + icon2 + ')').before(oldobj);
                                        }else if(icon2 > iconIndex2){
                                            $('#amg_dock_container li.shortcut:eq(' + icon2 + ')').after(oldobj);
                                        }else{
                                            if(iconIndex2 == -1){
                                                $('#amg_dock_container').append(oldobj);
                                            }
                                        }
                                        if($('#amg_dock_container li.shortcut').length > 7){
                                            $('#amg_folder_container .folderItem:eq(' + oldobj.attr('desk') + ') .folderInner li.shortcut').last().after($('#amg_dock_container li.shortcut').last());
                                        }
                                        ICINFO.appmanage.appresize();
                                        ICINFO.appmanage.getScrollbar();
                                    }
                                });
                            }
                        }else{
                            var movedesk = parseInt(cx / ($(document).width() / 5));
                            icon = ICINFO.grid.searchManageAppGrid(cy - 90, movedesk);
                            if(icon != null){
                                //判断是在同一桌面移动,还是跨桌面移动
                                if(movedesk == oldobj.attr('desk')){
                                    $.ajax({
                                        type : 'POST',
                                        url : $_GLOBAL.AJAX_Interface,
                                        data : 'ac=updateMyApp&movetype=desk-desk&id=' + oldobj.attr('shortcut') + '&from=' + oldobj.index() + '&to=' + icon + '&desk=' + (movedesk + 1),
                                        success : function(){
                                            if(icon < iconIndex){
                                                $('#amg_folder_container .folderItem:eq(' + movedesk + ') .folderInner li:eq(' + icon + ')').before(oldobj);
                                            }else if(icon > iconIndex){
                                                $('#amg_folder_container .folderItem:eq(' + movedesk + ') .folderInner li:eq(' + icon + ')').after(oldobj);
                                            }else{
                                                if(iconIndex == -1){
                                                    $('#amg_folder_container .folderItem:eq(' + movedesk + ') .folderInner').append(oldobj);
                                                }
                                            }
                                            ICINFO.appmanage.appresize();
                                            ICINFO.appmanage.getScrollbar();
                                        }
                                    });
                                }else{
                                    $.ajax({
                                        type : 'POST',
                                        url : $_GLOBAL.AJAX_Interface,
                                        data : 'ac=updateMyApp&movetype=desk-otherdesk&id=' + oldobj.attr('shortcut') + '&from=' + oldobj.index() + '&to=' + icon + '&desk=' + (parseInt(oldobj.attr('desk')) + 1) + '&otherdesk=' + (movedesk + 1),
                                        success : function(){
                                            if(icon != -1){
                                                $('#amg_folder_container .folderItem:eq(' + movedesk + ') .folderInner li:eq(' + icon + ')').before(oldobj);
                                            }else{
                                                $('#amg_folder_container .folderItem:eq(' + movedesk + ') .folderInner').append(oldobj);
                                            }
                                            ICINFO.appmanage.appresize();
                                            ICINFO.appmanage.getScrollbar();
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
                return false;
            });
        }
    }
})();
/**
 *  一个不属于其他模块的模块
 */
ICINFO.base = (function(){
    return {
        /**
		 *	系统初始化
		 */
        init : function(){
            //增加离开页面确认窗口,IE下有bug,暂时屏蔽
            if(!$.browser.msie){
                window.onbeforeunload = Util.confirmExit;
            }
            //绑定body点击事件,主要目的就是为了强制隐藏右键菜单
            $('body').on('click', function(){
                $('.popup-menu').hide();
                $('.quick_view_container').remove();
            });
            //绑定浏览器resize事件
            ICINFO.base.resize();
            //用于判断网页是否缩放,该功能提取自QQ空间
            ICINFO.zoom.init();
            //加载壁纸
            ICINFO.wallpaper.get(function(){
                ICINFO.wallpaper.set();
            });
            //初始化分页栏
            ICINFO.navbar.init();
            //绑定任务栏点击事件
            ICINFO.taskbar.init();
            //获得dock的位置
            ICINFO.dock.getPos(function(){
                //获取图标排列顺序
                ICINFO.app.getXY(function(){
                    /**
				 *          当dockPos为top时                  当dockPos为left时                 当dockPos为right时
				 *  -----------------------   -----------------------   -----------------------
				 *  | o o o                 dock  |   | o | o                           |   | o                           | o |
				 *  -----------------------   | o | o                           |   | o                           | o |
				 *  | o o                                 |   | o | o                           |   | o                           | o |
				 *  | o +                                 |   |   | o                           |   | o                           |   |
				 *  | o                         desk  |   |   | o                 desk  |   | o                 desk  |   |
				 *  | o                                   |   |   | +                           |   | +                           |   |
				 *  -----------------------   -----------------------   -----------------------
				 *  因为desk区域的尺寸和定位受dock位置的影响,所以加载图标前必须先定位好dock的位置
				 */
                    ICINFO.app.get();
                });
            });
            //绑定应用码头2个按钮的点击事件
            $('.dock-tool-pinyin').on('mousedown', function(){
                return false;
            }).on('click',function(){
                javascript:(function(q){
                    q?q.toggle():function(d,j){
                        j=d.createElement('script');
                        j.async=true;
                        j.src='//ime.qq.com/fcgi-bin/getjs';
                        j.setAttribute('ime-cfg','lt=2');
                        d=d.getElementsByTagName('head')[0];
                        d.insertBefore(j,d.firstChild)
                    }(document)
                })(window.QQWebIME);
            });
            $('.dock-tool-style').on('mousedown', function(){
                return false;
            }).on('click', function(){
                ICINFO.window.create(0,{
                    num : 'ztsz',
                    title : '主题设置',
                    url : $_GLOBAL.wallpaper.doGetWallpaperAction,
                    width : 580,
                    height : 520,
                    resize : false
                });
            });
            //桌面右键
            $('#desk').on('contextmenu', function(e){
                $(".popup-menu").hide();
                $('.quick_view_container').remove();
                var popupmenu = ICINFO.popupMenu.desk();
                l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
                t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
                popupmenu.css({
                    left : l,
                    top : t
                }).show();
                return false;
            });
            //全局视图界面右键
            $('#appmanage').on('contextmenu', function(){
                $(".popup-menu").hide();
                return false;
            });
        },
        /**
		 * 退出登录
		 */
        logout : function(){
            $('.loginmask-tip').html("注销中...");
            $('.loginmask').fadeIn();
            $.ajax({
                type : 'POST',
                url : $_GLOBAL.flow.doLogoutAction,
                error: function(){
                    ICINFO.Api.ErrorHandle(arguments);
                    $('.loginmask-tip').html("注销失败...");
                    $('.loginmask').animate({
                        top: 0- $('.loginmask').height()
                    }, 3000, function(){
                        $(this).hide().css({
                            top: 0,
                            opacity:0.8
                        });
                    });
                },
                success : function(json){
                    //statusMess: 1
                    if(json.result == "success"){

                        $('#desktop').hide();
                        $('.login').show();

                        //清空桌面图标
                        $('#desk .desktop-container').html('');
                        //清空桌面窗口
                        $('#desk .window-container').remove();
                        //清空任务栏
                        $('#task-content-inner').html('');
                        //清空应用码头
                        $('#dock-container .dock-applist').html('');
                        //重置分页导航
                        $('#navContainer').removeClass('nav-current-1 nav-current-2 nav-current-3 nav-current-4 nav-current-5').addClass('nav-current-1');


                        $('.loginmask').animate({
                            top: 0- $('.loginmask').height()
                        }, 3000, function(){
                            $(this).hide().css({
                                top: 0,
                                opacity:0.8
                            });
                        });
                    }else{
                        $('.loginmask-tip').html("注销失败...");
                        $('.loginmask').animate({
                            top: 0- $('.loginmask').height()
                        }, 3000, function(){
                            $(this).hide().css({
                                top: 0,
                                opacity:0.8
                            });
                        });
                    }
                }
            });
        },
        resize : function(){
            $(window).on('resize', function(){
                ICINFO.deskTop.resize(250);
            });
        },
        help : function(){
            if($.browser.msie && $.browser.version !== '9.0'){
            //IE6,7,8基本就告别新手帮助了
            }else{
                $('#help').show();
                $('#step1').show();
                $('.close').on('click', function(){
                    $('.step').hide();
                    $('#help').hide();
                });
                $('.next').on('click', function(){
                    var obj = $(this).parents('.step');
                    var step = obj.attr('step');
                    obj.hide();
                    $('#step' + (parseInt(step) + 1)).show();
                });
                $('.over').on('click', function(){
                    $(this).parents('.step').hide();
                    $('#help').hide();
                });
            }
        }
    }
})();
/**
 *  桌面
 */
ICINFO.deskTop = (function(){
    return {
        /**
		 *  处理浏览器改变大小后的事件
		 */
        resize : function(time){
            //使用doTimeout插件,防止出现resize两次的bug
            $.doTimeout('resize', time, function(){
                if($('#desktop').css('display') !== 'none'){
                    ICINFO.dock.getPos(function(){
                        ICINFO.taskbar.resize();
                        //更新图标定位
                        ICINFO.deskTop.appresize();
                        //更新窗口定位
                        ICINFO.deskTop.windowresize();
                        //更新滚动条
                        ICINFO.app.getScrollbar();
                    });
                }else{
                    ICINFO.appmanage.resize();
                }
                ICINFO.wallpaper.set();
            });
        },
        /**
 *  重新排列图标
 */
        appresize : function(){
            var grid = ICINFO.grid.getAppGrid(), dockGrid = ICINFO.grid.getDockAppGrid();
            $('#dock-bar .dock-applist li').each(function(i){
                $(this).animate({
                    'left' : dockGrid[i]['startX'],
                    'top' : dockGrid[i]['startY']
                }, 500);
            });
            for(var j = 1; j <= 5; j++){
                $('#desk-' + j + ' li').each(function(i){
                    $(this).animate({
                        'left' : grid[i]['startX'] + 16,
                        'top' : grid[i]['startY'] + 7
                    }, 500);
                });
            }
        },
        /**
		 *  重新定位窗口位置
		 */
        windowresize : function(){
            $('#desk div.window-container').each(function(){
                var windowdata = $(this).data('info');
                currentW = $(window).width() - $(this).width();
                currentH = $(window).height() - $(this).height();
                _l = windowdata['left'] / windowdata['emptyW'] * currentW >= currentW ? currentW : windowdata['left'] / windowdata['emptyW'] * currentW;
                _l = _l <= 0 ? 0 : _l;
                _t = windowdata['top'] / windowdata['emptyH'] * currentH >= currentH ? currentH : windowdata['top'] / windowdata['emptyH'] * currentH;
                _t = _t <= 0 ? 0 : _t;
                $(this).animate({
                    'left' : _l,
                    'top' : _t
                }, 500);
            });
        }
    }
})();
/**
 *  应用码头
 */
ICINFO.dock = (function(){
    return {
        getPos : function(fun){
            $.ajax({
                type : 'POST',
                url : $_GLOBAL.detail.doGetUserDockPosAction,
                error: function(){
                    ICINFO.Api.ErrorHandle(arguments);
                },
                success : function(json){
                    console.log("ICINFO.dock.getPos")
                    ICINFO.CONFIG.dockPos = json.results;
                    ICINFO.dock.setPos();
                    if(typeof(fun) != 'undefined'){
                        fun();
                    }
                }
            });
        },
        setPos : function(){
            var desktop = $('#desk-' + ICINFO.CONFIG.desk), desktops = $('#desk .desktop-container');
            var desk_w = desktop.css('width', '100%').width(), desk_h = desktop.css('height', '100%').height();
            //清除dock位置样式
            $('#dock-container').removeClass('dock-top').removeClass('dock-left').removeClass('dock-right');
            $('#dock-bar').removeClass('top-bar').removeClass('left-bar').removeClass('right-bar').hide();
            if(ICINFO.CONFIG.dockPos == 'top'){
                $('#dock-bar').addClass('top-bar').children('#dock-container').addClass('dock-top');
                desktops.css({
                    'width' : desk_w,
                    'height' : desk_h - 143,
                    'left' : desk_w,
                    'top' : 73
                });
                desktop.css({
                    'left' : 0
                });
            }else if(ICINFO.CONFIG.dockPos == 'left'){
                $('#dock-bar').addClass('left-bar').children('#dock-container').addClass('dock-left');
                desktops.css({
                    'width' : desk_w - 73,
                    'height' : desk_h - 70,
                    'left' : desk_w + 73,
                    'top' : 0
                });
                desktop.css({
                    'left' : 73
                });
            }else if(ICINFO.CONFIG.dockPos == 'right'){
                $('#dock-bar').addClass('right-bar').children('#dock-container').addClass('dock-right');
                desktops.css({
                    'width' : desk_w - 73,
                    'height' : desk_h - 70,
                    'left' : desk_w,
                    'top' : 0
                });
                desktop.css({
                    'left' : 0
                });
            }
            $('#dock-bar').show();
            ICINFO.taskbar.resize();
        },
        updatePos : function(pos, fun){
            $.ajax({
                type : 'POST',
                url : $_GLOBAL.detail.doSaveUserDockPosAction,
                data : {
                    "" : pos
                },
                success : function(){
                    ICINFO.CONFIG.dockPos = pos;
                    if(typeof(fun) != 'undefined'){
                        fun();
                    }
                }
            });
        },
        move : function(){
            $('#dock-container').off('mousedown').on('mousedown',function(e){
                if(e.button == 0 || e.button == 1){
                    var lay = ICINFO.maskBox.dock(), location;
                    $(document).on('mousemove', function(e){
                        lay.show();
                        if(e.clientY < lay.height() * 0.2){
                            location = 'top';
                        }else if(e.clientX < lay.width() * 0.5){
                            location = 'left';
                        }else{
                            location = 'right';
                        }
                        $('.dock_drap_effect').removeClass('hover');
                        $('.dock_drap_effect_' + location).addClass('hover');
                    }).on('mouseup', function(){
                        $(document).off('mousemove').off('mouseup');
                        lay.hide();
                        if(location != ICINFO.CONFIG.dockPos && typeof(location) != 'undefined'){
                            ICINFO.dock.updatePos(location, function(){
                                //更新码头位置
                                ICINFO.dock.setPos();
                                //更新图标位置
                                ICINFO.deskTop.appresize();
                                //更新滚动条
                                ICINFO.app.getScrollbar();
                            });
                        }
                    });
                }
            });
        }
    }
})();

ICINFO.folderView = (function(){
    return {
        init : function(obj){
            var folderViewHtml = '';
            $.getJSON($_GLOBAL.AJAX_Interface + '?ac=getMyFolderApp&folderid=' + obj.attr('shortcut'), function(sc){
                var height = 0;
                if(sc != null){
                    for(var i = 0; i < sc.length; i++){
                        if(sc[i]['apptype'] == 'app'){
                            folderViewHtml += appTemp({
                                'top' : 0,
                                'left' : 0,
                                'title' : sc[i]['iconName'],
                                'id' : sc[i]['id'],
                                'imgsrc' : sc[i]['iconUrl']
                            });
                        }else{
                            folderViewHtml += widgetTemp({
                                'top' : 0,
                                'left' : 0,
                                'title' : sc[i]['iconName'],
                                'id' : sc[i]['id'],
                                'imgsrc' : sc[i]['iconUrl']
                            });
                        }
                    }
                    if(sc.length % 4 == 0){
                        height += Math.floor(sc.length / 4) * 60;
                    }else{
                        height += (Math.floor(sc.length / 4) + 1) * 60;
                    }
                }else{
                    folderViewHtml = '文件夹为空';
                    height += 30;
                }
                var left = parseInt(obj.css('left')) + 80, top = parseInt(obj.css('top')) - 20;
                if(ICINFO.CONFIG.dockPos == 'top'){
                    top += 80;
                }else if(ICINFO.CONFIG.dockPos == 'left'){
                    left += 73;
                }
                //判断预览面板是否有超出屏幕
                var isScrollbar = false;
                if(height + top + 46 > $(document).height()){
                    var outH = height + top + 46 - $(document).height();
                    if(outH <= top){
                        top -= outH;
                    }else{
                        height -= outH - top;
                        top = 0;
                        isScrollbar = true;
                    }
                }
                $('.quick_view_container').remove();
                if(left + 340 > $(document).width()){
                    //预览居左
                    $('body').append(folderViewTemp({
                        'shortcut' : obj.attr('shortcut'),
                        'apps' : folderViewHtml,
                        'top' : top,
                        'left' : left - 340 - 80,
                        'height' : height,
                        'mlt' : Math.ceil((height + 26) / 2),
                        'mlm' : false,
                        'mlb' : Math.ceil((height + 26) / 2),
                        'mrt' : ICINFO.CONFIG.dockPos == 'top' ? parseInt(obj.css('top')) - top + 80 : parseInt(obj.css('top')) - top,
                        'mrm' : true,
                        'mrb' : height + 26 - (parseInt(obj.css('top')) - top) - 20
                    }));
                }else{
                    //预览居右
                    $('body').append(folderViewTemp({
                        'shortcut' : obj.attr('shortcut'),
                        'apps' : folderViewHtml,
                        'top' : top,
                        'left' : left,
                        'height' : height,
                        'mlt' : ICINFO.CONFIG.dockPos == 'top' ? parseInt(obj.css('top')) - top + 80 : parseInt(obj.css('top')) - top,
                        'mlm' : true,
                        'mlb' : height + 26 - (parseInt(obj.css('top')) - top) - 20,
                        'mrt' : Math.ceil((height + 26) / 2),
                        'mrm' : false,
                        'mrb' : Math.ceil((height + 26) / 2)
                    }));
                }
                $('body').on('contextmenu', '.shortcut', function(e){
                    $('.popup-menu').hide();
                    TEMP.AppRight = ICINFO.popupMenu.app($(this));
                    var l = ($(document).width() - e.clientX) < TEMP.AppRight.width() ? (e.clientX - TEMP.AppRight.width()) : e.clientX;
                    var t = ($(document).height() - e.clientY) < TEMP.AppRight.height() ? (e.clientY - TEMP.AppRight.height()) : e.clientY;
                    TEMP.AppRight.css({
                        left : l,
                        top : t
                    }).show();
                    return false;
                });
                $('.quick_view_container_open').on('click',function(){
                    ICINFO.window.create($(this).parents('.quick_view_container').attr('shortcut'));
                    $('#quick_view_container_' + $(this).parents('.quick_view_container').attr('shortcut')).remove();
                });
                ICINFO.folderView.getScrollbar(obj.attr('shortcut'),isScrollbar);
                ICINFO.folderView.moveScrollbar(obj.attr('shortcut'));
                ICINFO.app.move();
            });
        },
        getScrollbar : function(id, isScrollbar){
            var view = '#quick_view_container_list_in_' + id;
            var scrollbar = '#quick_view_container_list_' + id + ' .scrollBar';
            if(isScrollbar){
                $('#quick_view_container_list_' + id + ' .scrollBar_bgc').show();
                $(scrollbar).show().height($(view).height() / (Math.ceil($(view).children().length / 4) * 60) * $(view).height());
            }else{
                $('#quick_view_container_list_' + id + ' .scrollBar_bgc').hide();
                $(scrollbar).hide().height(0);
            }
        },
        moveScrollbar : function(id){
            var view = '#quick_view_container_list_in_' + id;
            var scrollbar = '#quick_view_container_list_' + id + ' .scrollBar';
            /**
			 *  手动拖动
			 */
            $(scrollbar).on('mousedown', function(e){
                var offsetTop = $('#quick_view_container_' + id).offset().top + 36;
                var y, cy, deskrealh, moveh;
                var scrollbar = $(this), desk = $(view);
                deskrealh = Math.ceil($(view).children().length / 4) * 60;
                moveh = desk.height() - scrollbar.height();
                y = e.clientY - scrollbar.offset().top;
                $(document).on('mousemove', function(e){
                    cy = e.clientY - y - offsetTop < 0 ? 0 : e.clientY - y - offsetTop > moveh ? moveh : e.clientY - y - offsetTop;
                    scrollbar.css('top', cy);
                    desk.scrollTop(cy / desk.height() * deskrealh);
                }).on('mouseup', function(){
                    $(this).off('mousemove').off('mouseup');
                });
            });
            /**
			 *  鼠标滚轮
			 */
            $(view).off('mousewheel').on('mousewheel', function(event, delta){
                var desk = $(this), deskrealh = Math.ceil($(view).children().length / 4) * 60, scrollupdown;
                /**
				 *  delta == -1   往下
				 *  delta == 1        往上
				 */
                if(delta < 0){
                    scrollupdown = desk.scrollTop() + 40 > deskrealh - desk.height() ? deskrealh - desk.height() : desk.scrollTop() + 40;
                }else{
                    scrollupdown = desk.scrollTop() - 40 < 0 ? 0 : desk.scrollTop() - 40;
                }
                desk.stop(false, true).animate({
                    scrollTop : scrollupdown
                }, 300);
                $(scrollbar).stop(false, true).animate({
                    top : scrollupdown / deskrealh * desk.height()
                }, 300);
            });
        }
    }
})();
/**
 *  图标布局格子
 *  这篇文章里有简单说明格子的作用
 *  http://www.cnblogs.com/hooray/archive/2012/03/23/2414410.html
 */
ICINFO.grid = (function(){
    return {
        getAppGrid : function(){
            var width, height;
            width = $('#desk-' + ICINFO.CONFIG.desk).width() - ICINFO.CONFIG.appButtonLeft;
            height = $('#desk-' + ICINFO.CONFIG.desk).height() - ICINFO.CONFIG.appButtonTop;
            var appGrid = [], _top = ICINFO.CONFIG.appButtonTop, _left = ICINFO.CONFIG.appButtonLeft;
            for(var i = 0; i < 10000; i++){
                appGrid.push({
                    startY : _top,
                    endY : _top + 100,
                    startX : _left,
                    endX : _left + 120
                });
                if(ICINFO.CONFIG.appXY == 'x'){
                    _left += 120;
                    if(_left + 100 > width){
                        _top += 100;
                        _left = ICINFO.CONFIG.appButtonLeft;
                    }
                }else{
                    _top += 100;
                    if(_top + 70 > height){
                        _top = ICINFO.CONFIG.appButtonTop;
                        _left += 120;
                    }
                }
            }
            return appGrid;
        },
        searchAppGrid : function(x, y){
            var grid = ICINFO.grid.getAppGrid(), j = grid.length;
            var flags = 0, appLength = $('#desk-' + ICINFO.CONFIG.desk + ' li.shortcut').length - 1;
            for(var i = 0; i < j; i++){
                if(x >= grid[i].startX && x <= grid[i].endX){
                    flags += 1;
                }
                if(y >= grid[i].startY && y <= grid[i].endY){
                    flags += 1;
                }
                if(flags === 2){
                    return i > appLength ? appLength : i;
                }else{
                    flags = 0;
                }
            }
            return null;
        },
        getDockAppGrid : function(){
            var dock = $('#dock-bar .dock-applist');
            var height = dock.height();
            var dockAppGrid = [], _left = 0, _top = 0;
            for(var i = 0; i < 7; i++){
                dockAppGrid.push({
                    startY : _top,
                    endY : _top + 62,
                    startX : _left,
                    endX : _left + 62
                });
                _top += 62;
                if(_top + 62 > height){
                    _top = 0;
                    _left += 62;
                }
            }
            return dockAppGrid;
        },
        searchDockAppGrid : function(x, y){
            var grid = ICINFO.grid.getDockAppGrid(), j = grid.length, flags = 0,
            appLength = $('#dock-bar .dock-applist li.shortcut').length - 1;
            for(var i = 0; i < j; i++){
                if(x >= grid[i].startX && x <= grid[i].endX){
                    flags += 1;
                }
                if(y >= grid[i].startY && y <= grid[i].endY){
                    flags += 1;
                }
                if(flags === 2){
                    return i > appLength ? appLength : i;
                }else{
                    flags = 0;
                }
            }
            return null;
        },
        getFolderGrid : function(){
            var folderGrid = [];
            $('.folder-window:visible').each(function(){
                folderGrid.push({
                    zIndex : $(this).css('z-index'),
                    id : $(this).attr('window'),
                    startY : $(this).offset().top,
                    endY : $(this).offset().top + $(this).height(),
                    startX :  $(this).offset().left,
                    endX :  $(this).offset().left +  $(this).width()
                });
            });
            folderGrid.sort(function(x, y){
                return y['zIndex'] - x['zIndex'];
            });
            return folderGrid;
        },
        searchFolderGrid : function(x, y){
            var folderGrid = ICINFO.grid.getFolderGrid(), j = folderGrid.length, flags = 0;
            for(var i = 0; i < j; i++){
                if(x >= folderGrid[i].startX && x <= folderGrid[i].endX){
                    flags += 1;
                }
                if(y >= folderGrid[i].startY && y <= folderGrid[i].endY){
                    flags += 1;
                }
                if(flags === 2){
                    return folderGrid[i]['id'];
                }else{
                    flags = 0;
                }
            }
            return null;
        },
        getManageDockAppGrid : function(){
            var manageDockAppGrid = [], _left = 20;
            for(var i = 0; i < 7; i++){
                manageDockAppGrid.push({
                    startX : _left,
                    endX : _left + 72
                });
                _left += 72;
            }
            return manageDockAppGrid;
        },
        searchManageDockAppGrid : function(x){
            var grid = ICINFO.grid.getManageDockAppGrid(), j = grid.length, flags = 0,
            appLength = $('#amg_dock_container li.shortcut').length - 1;
            for(var i = 0; i < j; i++){
                if(x >= grid[i].startX && x <= grid[i].endX){
                    flags += 1;
                }
                if(flags === 1){
                    return i > appLength ? appLength : i;
                }else{
                    flags = 0;
                }
            }
            return null;
        },
        getManageAppGrid : function(){
            var manageAppGrid = [], _top = 0;
            for(var i = 0; i < 10000; i++){
                manageAppGrid.push({
                    startY : _top,
                    endY : _top + 40
                });
                _top += 40;
            }
            return manageAppGrid;
        },
        searchManageAppGrid : function(y, desk){
            var grid = ICINFO.grid.getManageAppGrid(), j = grid.length, flags = 0,
            appLength = $('#amg_folder_container .folderItem:eq('+desk+') .folderInner li').length - 1;
            for(var i = 0; i < j; i++){
                if(y >= grid[i].startY && y <= grid[i].endY){
                    flags += 1;
                }
                if(flags === 1){
                    return i > appLength ? appLength : i;
                }else{
                    flags = 0;
                }
            }
            return null;
        }
    }
})();
/**
 *  透明遮罩层
 *  当拖动图标、窗口等一切可拖动的对象时,会加载一个遮罩层
 *  避免拖动时触发或选中一些不必要的操作,安全第一
 */
ICINFO.maskBox = (function(){
    return {
        desk : function(){
            if(!TEMP.maskBoxDesk){
                TEMP.maskBoxDesk = $('<div id="maskbox"></div>');
                $('body').append(TEMP.maskBoxDesk);
            }
            return TEMP.maskBoxDesk;
        },
        dock : function(){
            if(!TEMP.maskBoxDock){
                TEMP.maskBoxDock = $('<div style="z-index:1000000003;display:block;cursor:default;background:none;width:100%;height:100%;position:absolute;top:0;left:0"><div id="docktop" class="dock_drap_effect dock_drap_effect_top"></div><div id="dockleft" class="dock_drap_effect dock_drap_effect_left"></div><div id="dockright" class="dock_drap_effect dock_drap_effect_right"></div><div id="dockmask" class="dock_drap_mask"><div class="dock_drop_region_top"></div><div class="dock_drop_region_left"></div><div class="dock_drop_region_right"></div></div></div>');
                $('body').append(TEMP.maskBoxDock);
            }
            return TEMP.maskBoxDock;
        }
    }
})();
/**
 *  分页导航
 */
ICINFO.navbar = (function(){
    return {
        /**
		 *  初始化
		 */
        init : function(){
            $('#nav-bar').css({
                'left' : $(document).width() / 2 - 105,
                'top' : 30
            }).show();
            ICINFO.navbar.move();
            ICINFO.navbar.deskSwitch();
        },
        /**
		 *  拖动
		 */
        move : function(){
            $('#nav-bar').on('mousedown', function(e){
                if(e.button == 0 || e.button == 1){
                    var x, y, cx, cy, lay, obj = $('#nav-bar');
                    x = e.clientX - obj.offset().left;
                    y = e.clientY - obj.offset().top;
                    //绑定鼠标移动事件
                    $(document).on('mousemove', function(e){
                        lay = ICINFO.maskBox.desk();
                        lay.show();
                        cx = e.clientX - x <= 0 ? 0 : e.clientX - x > $(document).width() - 210 ? $(document).width() - 210 : e.clientX - x;
                        cy = e.clientY - y <= 10 ? 10 : e.clientY - y > $(document).height() - 50 ? $(document).height() - 50 : e.clientY - y;
                        obj.css({
                            left : cx,
                            top : cy
                        });
                    }).on('mouseup', function(){
                        if(typeof(lay) !== 'undefined'){
                            lay.hide();
                        }
                        $(this).off('mousemove').off('mouseup');
                    });
                }
            });
        },
        /**
		 *  点击切换
		 */
        deskSwitch : function(){
            $('#nav-bar .nav-container').on('mousedown', 'a.indicator', function(e){
                if(e.button == 0 || e.button == 1){
                    var x, y, cx, cy, dx, dy, lay, obj = $('#nav-bar'), thisobj = $(this);
                    dx = cx = obj.offset().left;
                    dy = cy = obj.offset().top;
                    x = e.clientX - dx;
                    y = e.clientY - dy;
                    //绑定鼠标移动事件
                    $(document).on('mousemove', function(e){
                        lay = ICINFO.maskBox.desk();
                        lay.show();
                        cx = e.clientX - x <= 0 ? 0 : e.clientX - x > $(document).width() - 210 ? $(document).width() - 210 : e.clientX - x;
                        cy = e.clientY - y <= 10 ? 10 : e.clientY - y > $(document).height() - 50 ? $(document).height() - 50 : e.clientY - y;
                        obj.css({
                            left : cx,
                            top : cy
                        });
                    }).on('mouseup', function(){
                        if(dx == cx && dy == cy){
                            if(typeof(thisobj.attr('index')) !== 'undefined'){
                                var nav = $('#navContainer'), currindex = ICINFO.CONFIG.desk, switchindex = thisobj.attr('index'),
                                currleft = $('#desk-' + currindex).offset().left, switchleft = $('#desk-' + switchindex).offset().left;
                                if(currindex != switchindex){
                                    if(!$('#desk-' + switchindex).hasClass('animated') && !$('#desk-' + currindex).hasClass('animated')){
                                        $('#desk-' + currindex).addClass('animated').animate({
                                            left : switchleft
                                        }, 500, 'easeInOutCirc', function(){
                                            $(this).removeClass('animated');
                                        });
                                        $('#desk-'+switchindex).addClass('animated').animate({
                                            left : currleft
                                        }, 500, 'easeInOutCirc', function(){
                                            $(this).removeClass('animated');
                                            nav.removeClass('nav-current-' + currindex).addClass('nav-current-' + switchindex);
                                            ICINFO.CONFIG.desk = switchindex;
                                        });
                                    }
                                }
                            }else{
                                //初始化全局视图
                                ICINFO.appmanage.init();
                            }
                        }
                        if(typeof(lay) !== 'undefined'){
                            lay.hide();
                        }
                        $(this).off('mousemove').off('mouseup');
                    });
                }
            });
        }
    }
})();
/**
 *  右键菜单
 */
ICINFO.popupMenu = (function(){
    return {
        /**
		 *  图标右键
		 */
        app : function(obj){
            if(!TEMP.popupMenuApp){
                TEMP.popupMenuApp = $('<div class="popup-menu app-menu" style="z-index:9990;display:none"><ul><li style="border-bottom:1px solid #F0F0F0"><a menu="open" href="javascript:;">打开应用</a></li><li><a menu="move" href="javascript:;">移动应用到<b class="arrow">?</b></a><div class="popup-menu" style="display:none"><ul><li><a menu="moveto" desk="1" href="javascript:;">桌面1</a></li><li><a menu="moveto" desk="2" href="javascript:;">桌面2</a></li><li><a menu="moveto" desk="3" href="javascript:;">桌面3</a></li><li><a menu="moveto" desk="4" href="javascript:;">桌面4</a></li><li><a menu="moveto" desk="5" href="javascript:;">桌面5</a></li></ul></div></li><li><b class="uninstall"></b><a menu="del" href="javascript:;">卸载应用</a></li></ul></div>');
                $('body').append(TEMP.popupMenuApp);
                $('.app-menu').on('contextmenu', function(){
                    return false;
                });
            }
            $('.app-menu a[menu="moveto"]').removeClass('disabled');
            if(obj.parent().hasClass('desktop-container')){
                $('.app-menu a[menu="moveto"]').each(function(){
                    if($(this).attr('desk') == ICINFO.CONFIG.desk){
                        $(this).addClass('disabled');
                    }
                });
            }
            //绑定事件
            $('.app-menu li').off('mouseover').off('mouseout').on('mouseover', function(){
                if($(this).children('a').attr('menu') == 'move'){
                    $(this).children('a').addClass('focus');
                    if($(document).width() - $('.app-menu').offset().left > 250){
                        $(this).children('div').css({
                            left : 122,
                            top : -2
                        });
                    }else{
                        $(this).children('div').css({
                            left : -126,
                            top : -2
                        });
                    }
                    $(this).children('div').show();
                }
            }).on('mouseout', function(){
                $(this).children('a').removeClass('focus');
                $(this).children('div').hide();
            });
            $('.app-menu a[menu="moveto"]').off('click').on('click', function(){
                var desk = $(this).attr('desk');
                $.ajax({
                    type : 'POST',
                    url : $_GLOBAL.AJAX_Interface,
                    data : 'ac=moveMyApp&id=' + obj.attr('shortcut') + '&todesk=' + desk,
                    success : function(){
                        $('#desk-' + desk + ' li.add-app').before(obj);
                        ICINFO.deskTop.appresize();
                        ICINFO.app.getScrollbar();
                    }
                });
                $('.task-menu').hide();
            });
            $('.app-menu a[menu="open"]').off('click').on('click', function(){
                ICINFO.window.create(obj.attr('shortcut'));
                $('.task-menu').hide();
            });
            $('.app-menu a[menu="del"]').off('click').on('click', function(){
                $.ajax({
                    type : 'POST',
                    url : $_GLOBAL.AJAX_Interface,
                    data : 'ac=delMyApp&appid=' + obj.attr('shortcut'),
                    success : function(){
                        obj.find('img, span').show().animate({
                            opacity : 'toggle',
                            width : 0,
                            height : 0
                        }, 500, function(){
                            obj.remove();
                            ICINFO.deskTop.resize(250);
                        });
                    }
                });
                $('.task-menu').hide();
            });
            return TEMP.popupMenuApp;
        },
        /**
		 *  文件夹右键
		 */
        folder : function(obj){
            if(!TEMP.popupMenuFolder){
                TEMP.popupMenuFolder = $('<div class="popup-menu folder-menu" style="z-index:9990;display:none"><ul><li style="border-bottom:1px solid #F0F0F0"><a menu="open" href="javascript:;">打开</a></li><li><b class="edit"></b><a menu="rename" href="javascript:;">重命名</a></li><li><b class="del"></b><a menu="del" href="javascript:;">删除</a></li></ul></div>');
                $('body').append(TEMP.popupMenuFolder);
                $('.folder-menu').on('contextmenu', function(){
                    return false;
                });
            }
            //绑定事件
            $('.folder-menu a[menu="open"]').off('click').on('click', function(){
                ICINFO.window.create(obj.attr('shortcut'));
                $('.task-menu').hide();
            });
            $('.folder-menu a[menu="del"]').off('click').on('click', function(){
                art.dialog({
                    title : '删除“' + obj.find('span').text() + '”文件夹',
                    id : 'delfolder',
                    content : '删除文件夹的同时会删除文件夹内所有应用',
                    icon : 'warning',
                    ok : function(){
                        $.ajax({
                            type : 'POST',
                            url : $_GLOBAL.AJAX_Interface,
                            data : 'ac=delMyApp&appid=' + obj.attr('shortcut') + '&isfolder=1',
                            success : function(){
                                obj.find('img, span').show().animate({
                                    opacity : 'toggle',
                                    width : 0,
                                    height : 0
                                }, 500, function(){
                                    obj.remove();
                                    ICINFO.deskTop.resize(250);
                                });
                            }
                        });
                    },
                    cancel : true
                });
                $('.task-menu').hide();
            });
            $('.folder-menu a[menu="rename"]').off('click').on('click', function(){
                $('#folderName').val(obj.find('span').text());
                $('.fcDropdown_item').each(function(){
                    if($(this).children('img').attr('src') == obj.find('img').attr('src')){
                        $('.folderSelector img').attr('src', obj.find('img').attr('src')).attr('idx', $(this).children('img').attr('idx'));
                    }
                });
                $('.folderNameError').hide();
                art.dialog({
                    title : '重命名“' + obj.find('span').text() + '”文件夹',
                    width : 400,
                    id : 'addfolder',
                    padding : 0,
                    content : document.getElementById('addfolder'),
                    ok : function(){
                        if($('#folderName').val() != ''){
                            $.ajax({
                                type : 'POST',
                                url : $_GLOBAL.AJAX_Interface,
                                data : 'ac=updateFolder&name=' + $('#folderName').val() + '&icon=' + $('.folderSelector img').attr('idx') + '&id=' + obj.attr('shortcut'),
                                success : function(){
                                    ICINFO.app.get();
                                }
                            });
                        }else{
                            $('.folderNameError').show();
                            return false;
                        }
                    },
                    cancel : true
                });
                $('.folderSelector').off('click').on('click', function(){
                    $('.fcDropdown').show();
                });
                $('.fcDropdown_item').off('click').on('click', function(){
                    $('.folderSelector img').attr('src', $(this).children('img').attr('src')).attr('idx', $(this).children('img').attr('idx'));
                    $('.fcDropdown').hide();
                });
                $('.task-menu').hide();
            });
            return TEMP.popupMenuFolder;
        },
        /**
		 *  任务栏右键
		 */
        task : function(obj){
            if(!TEMP.popupMenuTask){
                TEMP.popupMenuTask = $('<div class="popup-menu task-menu" style="z-index:9990;display:none"><ul><li><a menu="max" href="javascript:;">最大化</a></li><li style="border-bottom:1px solid #F0F0F0"><a menu="hide" href="javascript:;">最小化</a></li><li><a menu="close" href="javascript:;">关闭</a></li></ul></div>');
                $('body').append(TEMP.popupMenuTask);
                $('.task-menu').on('contextmenu', function(){
                    return false;
                });
            }
            //绑定事件
            $('.task-menu a[menu="max"]').off('click').on('click', function(){
                $('#window_' + obj.attr('window') + '_warp').css('visibility', 'visible');
                $('#window_' + obj.attr('window') + '_inner .title-handle .ha-max').click();
                $('.task-menu').hide();
            });
            $('.task-menu a[menu="hide"]').off('click').on('click', function(){
                $('#window_' + obj.attr('window') + '_inner .title-handle .ha-hide').click();
                $('.task-menu').hide();
            });
            $('.task-menu a[menu="close"]').off('click').on('click', function(){
                ICINFO.window.close(obj.attr('window'));
                $('.task-menu').hide();
            });
            return TEMP.popupMenuTask;
        },
        /**
		 *  桌面右键
		 */
        desk : function(){
            if(!TEMP.popupMenuDesk){
                TEMP.popupMenuDesk = $('<div class="popup-menu desk-menu" style="z-index:9990;display:none"><ul><li><a menu="hideall" href="javascript:;">显示桌面</a></li><li><b class="refresh"></b><a menu="refresh" href="javascript:;">刷新</a></li><li style="border-bottom:1px solid #F0F0F0"><a menu="closeall" href="javascript:;">关闭所有应用</a></li><li style="border-bottom:1px solid #F0F0F0"><b class="folder"></b><a menu="addfolder" href="javascript:;">新建文件夹</a></li><li><b class="themes"></b><a menu="themes" href="javascript:;">主题设置</a></li><li><b class="setting"></b><a menu="setting" href="javascript:;">桌面设置</a></li><li style="border-bottom:1px solid #F0F0F0"><a menu="view" href="javascript:;">图标设置<b class="arrow">?</b></a><div class="popup-menu" style="display:none"><ul><li><b class="hook"></b><a menu="orderby" orderby="x" href="javascript:;">横向排列</a></li><li><b class="hook"></b><a menu="orderby" orderby="y" href="javascript:;">纵向排列</a></li></ul></div></li><li><a menu="logout" href="javascript:;">注销</a></li></ul></div>');
                $('body').append(TEMP.popupMenuDesk);
                $('.desk-menu').on('contextmenu', function(){
                    return false;
                });
                //绑定事件
                $('.desk-menu li').off('mouseover').off('mouseout').on('mouseover', function(){
                    if($(this).children('a').attr('menu') == 'view'){
                        $(this).children('a').addClass('focus');
                        if($(document).width() - $('.desk-menu').offset().left > 250){
                            $(this).children('div').css({
                                left : 122,
                                top : -2
                            });
                        }else{
                            $(this).children('div').css({
                                left : -126,
                                top : -2
                            });
                        }
                        $(this).children('div').show();
                    }
                }).on('mouseout', function(){
                    $(this).children('a').removeClass('focus');
                    $(this).children('div').hide();
                });
                $('.desk-menu a[menu="orderby"]').off('click').on('click', function(){
                    var xy = $(this).attr('orderby');
                    if(ICINFO.CONFIG.appXY != xy){
                        ICINFO.app.updateXY(xy, function(){
                            ICINFO.deskTop.appresize();
                            ICINFO.app.getScrollbar();
                        });
                    }
                    $('.task-menu').hide();
                });
                $('.desk-menu a[menu="refresh"]').on('click', function(){
                    ICINFO.app.get();
                });
                $('.desk-menu a[menu="hideall"]').on('click', function(){
                    ICINFO.taskbar.hideAll();
                });
                $('.desk-menu a[menu="closeall"]').on('click', function(){
                    $('#desk .window-container').each(function(){
                        ICINFO.window.close($(this).attr('window'));
                    });
                });
                $('.desk-menu a[menu="addfolder"]').on('click', function(){
                    $('#folderName').val('新建文件夹');
                    $('.folderSelector img').attr('src', OS_CONFIG.imgSrc+'ui/folder_default.png').attr('idx', 'default');
                    $('.folderNameError').hide();
                    art.dialog({
                        title : '新建文件夹',
                        width : 400,
                        id : 'addfolder',
                        padding : 0,
                        content : document.getElementById('addfolder'),
                        ok : function(){
                            if($('#folderName').val() != ''){
                                $.ajax({
                                    type : 'POST',
                                    url : $_GLOBAL.AJAX_Interface,
                                    data : 'ac=addFolder&name=' + $('#folderName').val() + '&icon=' + $('.folderSelector img').attr('idx'),
                                    success : function(folderid){
                                        $.ajax({
                                            type : 'POST',
                                            url : $_GLOBAL.AJAX_Interface,
                                            data : 'ac=addMyApp&appid=' + folderid + '&desk=' + ICINFO.CONFIG.desk,
                                            success : function(){
                                                ICINFO.app.get();
                                            }
                                        });
                                    }
                                });
                            }else{
                                $('.folderNameError').show();
                                return false;
                            }
                        },
                        cancel : true
                    });
                    $('.folderSelector').off('click').on('click', function(){
                        $('.fcDropdown').show();
                    });
                    $('.fcDropdown_item').off('click').on('click', function(){
                        $('.folderSelector img').attr('src', $(this).children('img').attr('src')).attr('idx', $(this).children('img').attr('idx'));
                        $('.fcDropdown').hide();
                    });
                });
                $('.desk-menu a[menu="themes"]').on('click', function(){
                    ICINFO.window.create(0,{
                        num : 'ztsz',
                        title : '主题设置',
                        url : 'sysapp/wallpaper/',
                        width : 580,
                        height : 520,
                        resize : false
                    });
                });
                $('.desk-menu a[menu="setting"]').on('click', function(){
                    ICINFO.window.create(0,{
                        num : 'zmsz',
                        title : '桌面设置',
                        url : 'sysapp/desksetting/',
                        width : 750,
                        height : 450,
                        resize : false
                    });
                });
                $('.desk-menu a[menu="logout"]').on('click', function(){
                    ICINFO.base.logout();
                });
            }
            $('.desk-menu a[menu="orderby"]').each(function(){
                $(this).prev().hide();
                if($(this).attr('orderby') == ICINFO.CONFIG.appXY){
                    $(this).prev().show();
                }
            });
            return TEMP.popupMenuDesk;
        }
    }
})();
/**
 *  任务栏
 */
ICINFO.taskbar = (function(){
    return {
        init : function(){
            $('#task-content-inner').off('click').on('click', 'a.task-item', function(){
                if($(this).hasClass('task-item-current')){
                    ICINFO.window.hide($(this).attr('window'));
                }else{
                    ICINFO.window.show2top($(this).attr('window'));
                }
            }).off('contextmenu').on('contextmenu', 'a.task-item', function(e){
                $('.popup-menu').hide();
                $('.quick_view_container').remove();
                ICINFO.taskbar.rightClick($(this), e.clientX, e.clientY);
                return false;
            });
        },
        hideAll : function(){
            $('#task-content-inner a.task-item').removeClass('task-item-current');
            $('#desk-' + ICINFO.CONFIG.desk).nextAll('div.window-container').css('visibility', 'hidden');
        },
        rightClick: function(obj, x, y){
            $('.popup-menu').hide();
            $('.quick_view_container').remove();
            var popupmenu = ICINFO.popupMenu.task(obj);
            l = $(document).width() - x < popupmenu.width() ? x - popupmenu.width() : x;
            t = y - popupmenu.height();
            popupmenu.css({
                left : l,
                top : t
            }).show();
            return false;
        },
        pageClick : function(showW, realW){
            var overW = realW - showW;
            if(ICINFO.CONFIG.dockPos == 'right'){
                $('#task-content-inner').animate({
                    marginLeft : 0
                }, 200);
            }else{
                $('#task-content-inner').animate({
                    marginRight : 0
                }, 200);
            }
            $('#task-next a').addClass('disable');
            $('#task-pre a').removeClass('disable');
            $('#task-next-btn').off('click').on('click',function(){
                if($(this).hasClass('disable') == false){
                    if(ICINFO.CONFIG.dockPos == 'right'){
                        var marginL = parseInt($('#task-content-inner').css('margin-left')) + 114;
                        if(marginL >= 0){
                            marginL = 0;
                            $('#task-next a').addClass('disable');
                        }
                        $('#task-pre a').removeClass('disable');
                        $('#task-content-inner').animate({
                            marginLeft : marginL
                        }, 200);
                    }else{
                        var marginR = parseInt($('#task-content-inner').css('margin-right')) + 114;
                        if(marginR >= 0){
                            marginR = 0;
                            $('#task-next a').addClass('disable');
                        }
                        $('#task-pre a').removeClass('disable');
                        $('#task-content-inner').animate({
                            marginRight : marginR
                        }, 200);
                    }
                }
            });
            $('#task-pre-btn').off('click').on('click', function(){
                if($(this).hasClass('disable') == false){
                    if(ICINFO.CONFIG.dockPos == 'right'){
                        var marginL = parseInt($('#task-content-inner').css('margin-left')) - 114;
                        if(marginL <= overW * -1){
                            marginL = overW * -1;
                            $('#task-pre a').addClass('disable');
                        }
                        $('#task-next a').removeClass('disable');
                        $('#task-content-inner').animate({
                            marginLeft : marginL
                        }, 200);
                    }else{
                        var marginR = parseInt($('#task-content-inner').css('margin-right')) - 114;
                        if(marginR <= overW * -1){
                            marginR = overW * -1;
                            $('#task-pre a').addClass('disable');
                        }
                        $('#task-next a').removeClass('disable');
                        $('#task-content-inner').animate({
                            marginRight : marginR
                        }, 200);
                    }
                }
            });
        },
        resize : function(){
            if(ICINFO.CONFIG.dockPos == 'left'){
                $('#task-bar').css({
                    'left' : 73,
                    'right' : 0
                });
                $('#task-content-inner').removeClass('fl');
            }else if(ICINFO.CONFIG.dockPos == 'right'){
                $('#task-bar').css({
                    'left' : 0,
                    'right' : 73
                });
                $('#task-content-inner').addClass('fl');
            }else{
                $('#task-bar').css({
                    'left' : 0,
                    'right' : 0
                });
                $('#task-content-inner').removeClass('fl');
            }
            var w = $('#task-bar').width(), taskItemW = $('#task-content-inner .task-item').length * 114, showW = w - 112;
            if(taskItemW >= showW){
                $('#task-next, #task-pre').show();
                $('#task-content').css('width', showW);
                ICINFO.taskbar.pageClick(showW, taskItemW);
            }else{
                $('#task-next, #task-pre').hide();
                $('#task-content').css('width','100%');
                $('#task-content-inner').css({
                    'margin-left' : 0,
                    'margin-right' : 0
                });
            }
        }
    }
})();
/**
 *  壁纸
 */
ICINFO.wallpaper = (function(){
    return {
        /**
		 * 获得壁纸
		 * 通过ajax到后端获取壁纸信息,同时设置壁纸
		 */
        get : function(fun){
            $.ajax({
                type : 'POST',
                url : $_GLOBAL.wallpaper.doGetUserWallpaperAction,
                success : function(json){
                    var wallpaper = json.wallpaper;
                    var userDetail = json.loginInfo.userDetail;

                    ICINFO.CONFIG.wallpaper = wallpaper.wpUrl;
                    ICINFO.CONFIG.wallpaperType = userDetail.userWallpaperLayout;
                    ICINFO.CONFIG.wallpaperWidth = wallpaper.wpWidth;
                    ICINFO.CONFIG.wallpaperHeight = wallpaper.wpUrl;

                    if(fun)fun();
                }
            });
        },
        /**
		 * 设置壁纸
		 * 平铺和居中可直接用css样式background解决
		 * 而填充、适应和拉伸则需要进行模拟
		 */
        set : function(){
            $('#zoomWallpaperGrid').remove();
            var w = $(window).width();
            var h = $(window).height();
            switch(ICINFO.CONFIG.wallpaperType){
                case 'pingpu':
                    $('body').append('<div id="zoomWallpaperGrid" style="position:absolute;z-index:-10;top:0;left:0;height:100%;width:100%;background:url(' + ICINFO.CONFIG.wallpaper + ') repeat"></div>');
                    break;
                case 'juzhong':
                    $('body').append('<div id="zoomWallpaperGrid" style="position:absolute;z-index:-10;top:0;left:0;height:100%;width:100%;background:url(' + ICINFO.CONFIG.wallpaper + ') no-repeat 50% 50%"></div>');
                    break;
                case 'tianchong':
                    var t = (h - ICINFO.CONFIG.wallpaperHeight) / 2, l = (w - ICINFO.CONFIG.wallpaperWidth) / 2;
                    $('body').append('<div id="zoomWallpaperGrid" style="position:absolute;z-index:-10;left:0;top:0;overflow:hidden;height:'+h+'px;width:'+w+'px"><img id="zoomWallpaper" style="position:absolute;height:' + ICINFO.CONFIG.wallpaperHeight + 'px;width:' + ICINFO.CONFIG.wallpaperWidth + 'px;top:' + t + 'px;left:' + l + 'px"><div style="position:absolute;height:' + h + 'px;width:' + w + 'px;background:#fff;opacity:0;filter:alpha(opacity=0)"></div></div>');
                    $('#zoomWallpaper').attr('src', ICINFO.CONFIG.wallpaper).on('load', function(){
                        $(this).show();
                    });
                    break;
                case 'shiying':
                    var imgH, imgW, t, l;
                    if(ICINFO.CONFIG.wallpaperHeight / ICINFO.CONFIG.wallpaperWidth > h / w){
                        imgH = h;
                        imgW = ICINFO.CONFIG.wallpaperWidth * (h / ICINFO.CONFIG.wallpaperHeight);
                        t = 0;
                        l = (w - imgW) / 2;
                    }else if(ICINFO.CONFIG.wallpaperHeight / ICINFO.CONFIG.wallpaperWidth < h / w){
                        imgW = w;
                        imgH = ICINFO.CONFIG.wallpaperHeight * (w / ICINFO.CONFIG.wallpaperWidth);
                        l = 0;
                        t = (h - imgH) / 2;
                    }else{
                        imgH = ICINFO.CONFIG.wallpaperHeight;
                        imgW = ICINFO.CONFIG.wallpaperWidth;
                        t = l = 0;
                    }
                    $('body').append('<div id="zoomWallpaperGrid" style="position:absolute;z-index:-10;left:0;top:0;overflow:hidden;height:' + h + 'px;width:' + w + 'px"><img id="zoomWallpaper" style="position:absolute;height:' + imgH + 'px;width:' + imgW + 'px;top:' + t + 'px;left:' + l + 'px"><div style="position:absolute;height:' + h + 'px;width:' + w + 'px;background:#fff;opacity:0;filter:alpha(opacity=0)"></div></div>');
                    $('#zoomWallpaper').attr('src', ICINFO.CONFIG.wallpaper).on('load', function(){
                        $(this).show();
                    });
                    break;
                case 'lashen':
                    $('body').append('<div id="zoomWallpaperGrid" style="position:absolute;z-index:-10;left:0;top:0;overflow:hidden;height:' + h + 'px;width:' + w + 'px"><img id="zoomWallpaper" style="position:absolute;height:' + h + 'px;width:' + w + 'px;top:0;left:0"><div style="position:absolute;height:' + h + 'px;width:' + w + 'px;background:#fff;opacity:0;filter:alpha(opacity=0)"></div></div>');
                    $('#zoomWallpaper').attr('src', ICINFO.CONFIG.wallpaper).on('load', function(){
                        $(this).show();
                    });
                    break;
            }
        },
        /**
		 *	更新壁纸
		 *	通过ajax到后端进行更新,同时获得壁纸
		 */
        update : function(wallpapertype, wallpaper){
            $.ajax({
                type : 'POST',
                url : $_GLOBAL.wallpaper.doSaveUserWallpaperAction,
                data : 'ac=setWallpaper&wptype=' + wallpapertype + '&wp=' + wallpaper,
                success : function(){
                    ICINFO.wallpaper.get(function(){
                        ICINFO.wallpaper.set();
                    });
                }
            });
        }
    }
})();
/**
 *  小挂件
 */
ICINFO.widget = (function(){
    return {
        create : function(id, obj){
            //判断窗口是否已打开
            var iswidgetopen = false, widgetid;
            if(id === 0){
                widgetid = typeof(obj.num) == 'undefined' || obj.num == '' ? Date.parse(new Date()) : obj.num;
            }else{
                widgetid = id;
            }
            $('#desk .widget').each(function(){
                if($(this).attr('widget') == widgetid){
                    iswidgetopen = true;
                }
            });
            //如果没有打开,则进行创建
            if(iswidgetopen == false){
                // test

                function nextDo(options){
                    console.log("ICINFO.widget.create.nextDo >>> options:", options)
                    $('#desk').append(widgetWindowTemp({
                        'width' : options.width,
                        'height' : options.height,
                        'num' : options.num,
                        'url' : options.url
                    }));
                    var widget = '#widget_' + options.num + '_warp';
                    //绑定小挂件上各个按钮事件
                    ICINFO.widget.handle($(widget));
                    //绑定小挂件移动
                    ICINFO.widget.move($(widget));
                }
                if(id === 0){
                    var options = {
                        num : typeof(obj.num) == 'undefined' || obj.num == '' ? Date.parse(new Date()) : obj.num,
                        url : obj.url,
                        width : obj.width,
                        height : obj.height
                    };
                    nextDo(options);
                }else{
                    ZENG.msgbox.show('小挂件正在加载中,请耐心等待...', 6, 100000);
                    $.getJSON($_GLOBAL.AJAX_Interface + '?ac=getMyAppById&id=' + id, function(widget){
                        if(widget != null){
                            ZENG.msgbox._hide();
                            var options = {
                                num : widget['id'],
                                url : widget['url'],
                                width : widget['width'],
                                height : widget['height']
                            };
                            nextDo(options);
                        }else{
                            ZENG.msgbox.show('小挂件加载失败', 5, 2000);
                            return false;
                        }
                    });
                }
            }
        },
        move : function(obj){
            obj.on('mousedown', '.move', function(e){
                var lay, x, y;
                x = e.clientX - obj.offset().left;
                y = e.clientY - obj.offset().top;
                //绑定鼠标移动事件
                $(document).on('mousemove', function(e){
                    lay = ICINFO.maskBox.desk();
                    lay.show();
                    _l = e.clientX - x;
                    _t = e.clientY - y;
                    _t = _t < 0 ? 0 : _t;
                    obj.css({
                        left : _l,
                        top : _t
                    });
                }).on('mouseup', function(){
                    $(this).off('mousemove').off('mouseup');
                    if(typeof(lay) !== 'undefined'){
                        lay.hide();
                    }
                });
            });
        },
        close : function(id){
            $('#widget_' + id + '_warp').html('').remove();
        },
        handle : function(obj){
            obj.on('click', '.ha-close', function(){
                ICINFO.widget.close(obj.attr('widget'));
            })
        }
    }
})();
/**
 *  应用窗口
 */
ICINFO.window = (function(){
    return {
        /**
		 *  创建窗口,可创建系统窗口和自定义窗口
		 *  系统窗口:ICINFO.window.create(id);
		 *          id为应用id,也就是数据库tb_apps/tb_folders表的tbid
		 *          示例:ICINFO.window.create(12);
		 *  自定义窗口:ICINFO.window.create(0,{title,url,width,height,resize});
		 *          因为是自定义窗口,所以id就写0,不能省略
		 *          后面参数依次为:标题、地址、宽、高、是否可拉伸
		 *          示例:ICINFO.window.create(0,{title:"百度",url:"http://www.baidu.com",width:800,height:400,resize:false});
		 */
        create : function(id, obj){
            $('.popup-menu').hide();
            $('.quick_view_container').remove();
            //判断窗口是否已打开
            var iswindowopen = false, windowid;
            if(id === 0){
                windowid = typeof(obj.num) == 'undefined' || obj.num == '' ? Date.parse(new Date()) : obj.num;
            }else{
                windowid = id;
            }
            $('#task-content-inner a.task-item').each(function(){
                if($(this).attr('window') == windowid){
                    iswindowopen = true;
                    ICINFO.window.show2top(windowid);
                }
            });
            //如果没有打开,则进行创建
            if(iswindowopen == false){
                function nextDo(options){
                    console.log("ICINFO.window.create.nextDo >>> options:", options)
                    var window_warp = '#window_' + options.num + '_warp';
                    var window_inner = '#window_' + options.num + '_inner';
                    var window_frame = '#window_' + options.num + '_frame';
                    var window_folder = '#window_' + options.num + '_folder';
                    $('.window-mask').show();
                    $('.window-container iframe, .window-container .folder_body').hide();
                    $('#task-content-inner a.task-item').removeClass('task-item-current');
                    $('.window-container').removeClass('window-current');
                    var top = ($(window).height() - options.height) / 2 <= 0 ? 0 : ($(window).height() - options.height) / 2;
                    var left = ($(window).width() - options.width) / 2 <= 0 ? 0 : ($(window).width() - options.width) / 2;
                    if(options.type == 'app'){
                        //新增任务栏
                        $('#task-content-inner').prepend(taskTemp({
                            'num' : options.num,
                            'title' : options.title,
                            'imgsrc' : options.imgsrc
                        }));
                        $('#task-content-inner').css('width', $('#task-content-inner .task-item').length * 114);
                        ICINFO.taskbar.resize();
                        //新增窗口
                        TEMP.windowTemp = {
                            'width' : options.width,
                            'height' : options.height,
                            'top' : top,
                            'left' : left,
                            'emptyW' : $(window).width() - options.width,
                            'emptyH' : $(window).height() - options.height,
                            'zIndex' : ICINFO.CONFIG.createIndexid,
                            'num' : options.num,
                            'title' : options.title,
                            'url' : options.url,
                            'imgsrc' : options.imgsrc
                        };
                        if(options.resize){
                            TEMP.windowTemp['resize'] = true;
                            TEMP.windowTemp['titlebar'] = true;
                            if(window.fullScreenApi.supportsFullScreen){
                                TEMP.windowTemp['titlebarFullscreen'] = true;
                            }
                        }
                        if(options.setbar){
                            TEMP.windowTemp['setbar'] = true;
                        }
                        $('#desk').append(windowTemp(TEMP.windowTemp));
                        $(window_warp).data('info', TEMP.windowTemp);
                        ICINFO.CONFIG.createIndexid += 1;
                        //iframe加载完毕后
                        $(window_frame).on('load', function(){
                            if(options.resize){
                                //绑定窗口拉伸事件
                                ICINFO.window.resize($(window_warp));
                            }
                            //隐藏loading
                            $(window_inner + ' .window-frame').children('div').eq(1).fadeOut();
                        });
                        $(window_warp).on('contextmenu',function(){
                            return false;
                        });
                        //绑定窗口上各个按钮事件
                        ICINFO.window.handle($(window_warp));
                        //绑定窗口移动
                        ICINFO.window.move($(window_warp));
                        //绑定窗口遮罩层点击事件
                        $('.window-mask').off('click').on('click', function(){
                            ICINFO.window.show2top($(this).parents('.window-container').attr('window'));
                        });
                    }else{
                        //新增任务栏
                        $('#task-content-inner').prepend(taskTemp({
                            'num' : options.num,
                            'title' : options.title,
                            'imgsrc' : options.imgsrc
                        }));
                        $('#task-content-inner').css('width', $('#task-content-inner .task-item').length * 114);
                        ICINFO.taskbar.resize();
                        //新增窗口
                        TEMP.folderWindowTemp = {
                            'width' : options.width,
                            'height' : options.height,
                            'top' : top,
                            'left' : left,
                            'emptyW' : $(window).width() - options.width,
                            'emptyH' : $(window).height() - options.height,
                            'zIndex' : ICINFO.CONFIG.createIndexid,
                            'num' : options.num,
                            'title' : options.title,
                            'imgsrc' : options.imgsrc,
                            'resize' : true,
                            'titlebar' : true
                        };
                        $('#desk').append(folderWindowTemp(TEMP.folderWindowTemp));
                        $(window_warp).data('info', TEMP.folderWindowTemp);
                        ICINFO.CONFIG.createIndexid += 1;
                        //iframe加载完毕后
                        $.getJSON($_GLOBAL.AJAX_Interface + '?ac=getMyFolderApp&folderid=' + options.num, function(sc){
                            if(sc != null){
                                for(var i = 0; i < sc.length; i++){
                                    if(sc[i]['apptype'] == 'app'){
                                        $(window_folder).append(appTemp({
                                            'top' : 0,
                                            'left' : 0,
                                            'title' : sc[i]['iconName'],
                                            'id' : sc[i]['id'],
                                            'imgsrc' : sc[i]['iconUrl']
                                        }));
                                    }else{
                                        $(window_folder).append(widgetTemp({
                                            'top' : 0,
                                            'left' : 0,
                                            'title' : sc[i]['iconName'],
                                            'id' : sc[i]['id'],
                                            'imgsrc' : sc[i]['iconUrl']
                                        }));
                                    }
                                }
                                ICINFO.app.move();
                            }
                            appEvent();
                        });
                        function appEvent(){
                            $(window_warp).on('contextmenu', function(){
                                return false;
                            });
                            //绑定文件夹内图标右击事件
                            $(window_folder).on('contextmenu', '.shortcut', function(e){
                                $('.popup-menu').hide();
                                $('.quick_view_container').remove();
                                var popupmenu = ICINFO.popupMenu.app($(this));
                                var l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
                                var t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
                                popupmenu.css({
                                    left : l,
                                    top : t
                                }).show();
                                return false;
                            });
                            //绑定窗口缩放事件
                            ICINFO.window.resize($(window_warp));
                            //隐藏loading
                            $(window_inner + ' .window-frame').children('div').eq(1).fadeOut();
                            //绑定窗口上各个按钮事件
                            ICINFO.window.handle($(window_warp));
                            //绑定窗口移动
                            ICINFO.window.move($(window_warp));
                            //绑定窗口遮罩层点击事件
                            $('.window-mask').off('click').on('click', function(){
                                ICINFO.window.show2top($(this).parents('.window-container').attr('window'));
                            });
                        }
                    }
                }
                if(id === 0){
                    var options = {
                        type : 'app',
                        num : typeof(obj.num) == 'undefined' || obj.num == '' ? Date.parse(new Date()) : obj.num,
                        imgsrc : $_GLOBAL.imgSrc+'ui/default_icon.png',
                        title : obj.title,
                        url : obj.url,
                        width : obj.width,
                        height : obj.height,
                        resize : obj.resize,
                        setbar : false
                    };
                    nextDo(options);
                }else{
                    ZENG.msgbox.show('应用正在加载中,请耐心等待...', 6, 100000);
                    $.ajax({
                        url: $_GLOBAL.app.doGetUserAppByIdAction,
                        data: {
                            "app.id" : id
                        },
                        success : function(json){
                            var app = json.results.length >0 ? json.results[0] : null;
                            if(app != null){
                                ZENG.msgbox._hide();
                                app.apptype = "app";
                                //app.id = "app";
                                app.iconName = app.appName;
                                app.iconUrl = app.appIcon || "hxkf/images\/shortcut\/default\/default.png";
                                app.url = app.appUrl;
                                app.width = app.appWidth || "800";
                                app.height = app.appHeight || "600";
                                app.resize = app.appResize || "1";
                                app.appid = app.id;

                                var options =  {
                                    type : app['apptype'],
                                    num : app['id'],
                                    title : app['iconName'],
                                    imgsrc : app['iconUrl'],
                                    url : app['url'],
                                    width : app['width'],
                                    height : app['height'],
                                    resize : app['resize'],
                                    setbar : app['setbar'],
                                    appid : app['appid']
                                };
                                nextDo(options);
                            }else{
                                ZENG.msgbox.show('数据拉取失败', 5, 2000);
                                return false;
                            }
                        }
                    });
                }
            }
        },
        close : function(id){
            $('#window_' + id + '_warp').removeData('info').html('').remove();
            $('#task-content-inner a.task-item[window="' + id + '"]').html('').remove();
            $('#task-content-inner').css('width', $('#task-content-inner .task-item').length * 114);
            $('#task-bar, #nav-bar').removeClass('min-zIndex');
            ICINFO.taskbar.resize();
        },
        hide : function(id){
            ICINFO.window.show2top(id);
            $('#window_' + id + '_warp').css('visibility', 'hidden');
            $('#task-content-inner a.task-item[window="' + id + '"]').removeClass('task-item-current');
            if($('#window_' + id + '_warp').attr('ismax') == 1){
                $('#task-bar, #nav-bar').removeClass('min-zIndex');
            }
        },
        max : function(id){
            ICINFO.window.show2top(id);
            $('#window_' + id + '_inner .title-handle .ha-max').hide().next(".ha-revert").show();
            $('#window_' + id + '_warp').attr('ismax',1).animate({
                width : '100%',
                height : '100%',
                top : 0,
                left : 0
            }, 200);
            $('#task-bar, #nav-bar').addClass('min-zIndex');
        },
        revert : function(id){
            ICINFO.window.show2top(id);
            $('#window_' + id + '_inner .title-handle .ha-revert').hide().prev('.ha-max').show();
            var obj = $('#window_' + id + '_warp'), windowdata = obj.data('info');
            obj.attr('ismax',0).animate({
                width : windowdata['width'],
                height : windowdata['height'],
                left : windowdata['left'],
                top : windowdata['top']
            }, 500);
            $('#task-bar, #nav-bar').removeClass('min-zIndex');
        },
        refresh : function(id){
            ICINFO.window.show2top(id);
            $('#window_' + id + '_frame').attr('src', $('#window_' + id + '_frame').attr('src'));
        },
        show2top : function(id){
            //改变任务栏样式
            $('#task-content-inner a.task-item').removeClass('task-item-current');
            $('#task-content-inner a.task-item[window="' + id + '"]').addClass('task-item-current');
            if($('#window_' + id + '_warp').attr('ismax') == 1){
                $('#task-bar, #nav-bar').addClass('min-zIndex');
            }
            //改变窗口样式
            $('#desk .window-container .window-container').removeClass('window-current');
            $('#window_' + id + '_warp').addClass('window-current').css({
                'z-index' : ICINFO.CONFIG.createIndexid,
                'visibility' : 'visible'
            });
            //改变窗口遮罩层样式
            $('#desk .window-container .window-mask').show();
            $('#window_' + id + '_inner .window-mask').hide();
            //改变iframe显示
            if($('#window_' + id + '_warp').hasClass('folder-window')){
                $('#desk .window-container .folder_body').hide();
                $('#window_' + id + '_inner .folder_body').show();
            }else{
                $('#desk .window-container iframe').hide();
                $('#window_' + id + '_inner iframe').show();
            }
            ICINFO.CONFIG.createIndexid += 1;
        },
        updateFolder : function(folderid){
            var obj = $('#window_' + folderid + '_warp');
            ICINFO.window.show2top(folderid);
            $.getJSON($_GLOBAL.AJAX_Interface + '?ac=getMyFolderApp&folderid=' + folderid, function(sc){
                if(sc != null){
                    var folder_append = '';
                    for(var i = 0; i < sc.length; i++){
                        temp = {
                            'top' : 0,
                            'left' : 0,
                            'title' : sc[i]['iconName'],
                            'id' : sc[i]['id'],
                            'imgsrc' : sc[i]['iconUrl']
                        };
                        switch(sc['dockapp'][i]['apptype']){
                            case 'app':
                                folder_append += appTemp(temp);
                                break;
                            case 'widget':
                                folder_append += widgetTemp(temp);
                                break;
                        }
                        temp = {};
                    }
                    obj.find('.folder_body').html('').append(folder_append).on('contextmenu', '.shortcut', function(e){
                        $('.popup-menu').hide();
                        $('.quick_view_container').remove();
                        TEMP.AppRight = ICINFO.popupMenu.app($(this));
                        var l = ($(document).width() - e.clientX) < TEMP.AppRight.width() ? (e.clientX - TEMP.AppRight.width()) : e.clientX;
                        var t = ($(document).height() - e.clientY) < TEMP.AppRight.height() ? (e.clientY - TEMP.AppRight.height()) : e.clientY;
                        TEMP.AppRight.css({
                            left : l,
                            top : t
                        }).show();
                        return false;
                    });
                    ICINFO.app.move();
                }
            });
        },
        handle : function(obj){
            obj.on('dblclick', '.title-bar', function(e){
                //判断当前窗口是否已经是最大化
                if(obj.find('.ha-max').is(':hidden')){
                    obj.find('.ha-revert').click();
                }else{
                    obj.find('.ha-max').click();
                }
            }).on('click', '.ha-hide', function(){
                ICINFO.window.hide(obj.attr('window'));
            }).on('click', '.ha-max', function(){
                ICINFO.window.max(obj.attr('window'));
                ICINFO.window.hackIframeHeight4IE6(obj);
            }).on('click', '.ha-revert', function(){
                ICINFO.window.revert(obj.attr('window'));
                ICINFO.window.hackIframeHeight4IE6(obj);
            }).on('click', '.ha-fullscreen', function(){
                window.fullScreenApi.requestFullScreen(document.getElementById(obj.find('iframe').attr('id')));
            }).on('click', '.ha-close', function(){
                ICINFO.window.close(obj.attr('window'));
            }).on('click', '.refresh', function(){
                ICINFO.window.refresh(obj.attr('window'));
            }).on('click', '.help', function(){
                var help = art.dialog({
                    title : '帮助',
                    follow : document.getElementById($(this).attr('id')),
                    width : 196
                });
                $.ajax({
                    type : 'POST',
                    url : $_GLOBAL.AJAX_Interface,
                    data : 'ac=getAppRemark&appid=' + obj.data('info').num,
                    success : function(msg){
                        help.content(msg);
                    }
                });
            }).on('click', '.star', function(){
                art.dialog({
                    title : '给“' + obj.data('info').title + '”打分',
                    width : 250,
                    id : 'star',
                    content : document.getElementById('star')
                });
                ICINFO.app.getStar(obj.data('info').num);
            }).on('contextmenu', '.window-container', function(){
                $('.popup-menu').hide();
                $('.quick_view_container').remove();
                return false;
            });
            $('#star ul li').off('click').on('click', function(){
                var num = $(this).attr('num');
                var appid = $(this).parent('ul').data('appid');
                if(!isNaN(num) && /^[1-5]$/.test(num)){
                    $.ajax({
                        type : 'POST',
                        url : $_GLOBAL.AJAX_Interface,
                        data : 'ac=updateAppStar&appid=' + appid + '&starnum=' + num,
                        success : function(msg){
                            if(msg){
                                alert('打分成功');
                                ICINFO.app.getStar(appid);
                            }else{
                                alert('你已经打过分了');
                            }
                        }
                    });
                }
            });
        },
        move : function(obj){
            obj.on('mousedown', '.title-bar', function(e){
                if(obj.attr('ismax') == 1){
                    return false;
                }
                ICINFO.window.show2top(obj.attr('window'));
                var windowdata = obj.data('info'), lay, x, y;
                x = e.clientX - obj.offset().left;
                y = e.clientY - obj.offset().top;
                //绑定鼠标移动事件
                $(document).on('mousemove', function(e){
                    lay = ICINFO.maskBox.desk();
                    lay.show();
                    //强制把右上角还原按钮隐藏,最大化按钮显示
                    obj.find('.ha-revert').hide().prev('.ha-max').show();
                    _l = e.clientX - x;
                    _t = e.clientY - y;
                    _w = windowdata['width'];
                    _h = windowdata['height'];
                    //窗口贴屏幕顶部10px内 || 底部60px内
                    _t = _t <= 10 ? 0 : _t >= lay.height()-30 ? lay.height()-30 : _t;
                    obj.css({
                        width : _w,
                        height : _h,
                        left : _l,
                        top : _t
                    });
                    obj.data('info').left = obj.offset().left;
                    obj.data('info').top = obj.offset().top;
                }).on('mouseup', function(){
                    $(this).off('mousemove').off('mouseup');
                    if(typeof(lay) !== 'undefined'){
                        lay.hide();
                    }
                });
            });
        },
        resize : function(obj){
            obj.find('div.window-resize').on('mousedown', function(e){
                //增加背景遮罩层
                var resizeobj = $(this), lay, x = e.clientX, y = e.clientY, w = obj.width(), h = obj.height();
                $(document).on('mousemove', function(e){
                    lay = ICINFO.maskBox.desk();
                    lay.show();
                    _x = e.clientX;
                    _y = e.clientY;
                    //当拖动到屏幕边缘时,自动贴屏
                    _x = _x <= 10 ? 0 : _x >= (lay.width()-12) ? (lay.width()-2) : _x;
                    _y = _y <= 10 ? 0 : _y >= (lay.height()-12) ? lay.height() : _y;
                    switch(resizeobj.attr('resize')){
                        case 't':
                            h + y - _y > ICINFO.CONFIG.windowMinHeight ? obj.css({
                                height : h + y - _y,
                                top : _y
                            }) : obj.css({
                                height : ICINFO.CONFIG.windowMinHeight
                            });
                            break;
                        case 'r':
                            w - x + _x > ICINFO.CONFIG.windowMinWidth ? obj.css({
                                width : w - x + _x
                            }) : obj.css({
                                width : ICINFO.CONFIG.windowMinWidth
                            });
                            break;
                        case 'b':
                            h - y + _y > ICINFO.CONFIG.windowMinHeight ? obj.css({
                                height : h - y + _y
                            }) : obj.css({
                                height : ICINFO.CONFIG.windowMinHeight
                            });
                            break;
                        case 'l':
                            w + x - _x > ICINFO.CONFIG.windowMinWidth ? obj.css({
                                width : w + x - _x,
                                left : _x
                            }) : obj.css({
                                width : ICINFO.CONFIG.windowMinWidth
                            });
                            break;
                        case 'rt':
                            h + y - _y > ICINFO.CONFIG.windowMinHeight ? obj.css({
                                height : h + y - _y,
                                top : _y
                            }) : obj.css({
                                height : ICINFO.CONFIG.windowMinHeight
                            });
                            w - x + _x > ICINFO.CONFIG.windowMinWidth ? obj.css({
                                width : w - x + _x
                            }) : obj.css({
                                width : ICINFO.CONFIG.windowMinWidth
                            });
                            break;
                        case 'rb':
                            w - x + _x > ICINFO.CONFIG.windowMinWidth ? obj.css({
                                width : w - x + _x
                            }) : obj.css({
                                width : ICINFO.CONFIG.windowMinWidth
                            });
                            h - y + _y > ICINFO.CONFIG.windowMinHeight ? obj.css({
                                height : h - y + _y
                            }) : obj.css({
                                height : ICINFO.CONFIG.windowMinHeight
                            });
                            break;
                        case 'lt':
                            w + x - _x > ICINFO.CONFIG.windowMinWidth ? obj.css({
                                width : w + x - _x,
                                left : _x
                            }) : obj.css({
                                width : ICINFO.CONFIG.windowMinWidth
                            });
                            h + y - _y > ICINFO.CONFIG.windowMinHeight ? obj.css({
                                height : h + y - _y,
                                top : _y
                            }) : obj.css({
                                height : ICINFO.CONFIG.windowMinHeight
                            });
                            break;
                        case 'lb':
                            w + x - _x > ICINFO.CONFIG.windowMinWidth ? obj.css({
                                width : w + x - _x,
                                left : _x
                            }) : obj.css({
                                width : ICINFO.CONFIG.windowMinWidth
                            });
                            h - y + _y > ICINFO.CONFIG.windowMinHeight ? obj.css({
                                height : h - y + _y
                            }) : obj.css({
                                height : ICINFO.CONFIG.windowMinHeight
                            });
                            break;
                    }
                    ICINFO.window.hackIframeHeight4IE6(obj);
                }).on('mouseup',function(){
                    if(typeof(lay) !== 'undefined'){
                        lay.hide();
                    }
                    obj.data('info').width = obj.width();
                    obj.data('info').height = obj.height();
                    obj.data('info').left = obj.offset().left;
                    obj.data('info').top = obj.offset().top;
                    obj.data('info').emptyW = $(window).width() - obj.width();
                    obj.data('info').emptyH = $(window).height() - obj.height();
                    $(this).off('mousemove').off('mouseup');
                });
            });
        },
        /**
		 *  更新IE6下iframe的高度
		 *  因为IE6下iframe高度无法自适应,所以在每次改变窗口大小时都需要计算出iframe的实际高度
		 */
        hackIframeHeight4IE6 : function(obj){
            if($.browser.msie && $.browser.version === '6.0'){
                $(obj).find('.window-frame').css('height', $(obj).find('.window-frame').parent().height() - 59);
            }
        }
    }
})();

/**
 *  一个从QQ空间提取出来的功能,进行了二次包装
 *  用于判断页面是否处于缩放状态中,并给予提示
 *  可在浏览页时按住ctrl+鼠标滚轮进行测试预览
 */
ICINFO.zoom = (function(){
    return {
        /**
         *  初始化
         *  其实也不用初始化,可以直接把object代码写在页面上
         *  需要注意的是onchange参数,调用的是ICINFO.zoom.check方法
         */
        init : function(){
            /**
             *  使用SWFObject.js插入flash
             *  http://www.cnblogs.com/wuxinxi007/archive/2009/10/27/1590709.html
             */
            swfobject.embedSWF($_GLOBAL.zoomSwf, 'zoombox', '10', '10', '6.0.0', 'expressInstall.swf', '', {
                allowScriptAccess : 'always',
                wmode : 'transparent',
                scale : 'noScale'
            }, {
                id : 'accessory_zoom',
                name : 'zoom_detect'
            });
        },
        /**
         *  为什么会有个参数o?其实我也不知道
         *  我只知道o.scale的值是数字,当o.scale大于1时,页面处于放大状态,反之则为缩小状态
         */
        check : function(o){
            var s = o.scale, m = s > 1 ? '放大' : '缩小';
            if(s != 1){
                zoomlevel = s;
                $('#zoom-tip').show().find('span').text('您的浏览器目前处于' + m + '状态,会导致显示不正常,您可以键盘按“ctrl+数字0”组合键恢复初始状态!');
            }else{
                if(s != zoomlevel){
                    $('#zoom-tip').fadeOut();
                }
            }
        },
        /**
         * 关闭,其实是删除,如果想做关闭,把代码改成hide()即可
         */
        close : function(){
            $('#zoom-tip').remove();
        }
    }
})();


ICINFO.Api = (function(){
    return {
        ErrorHandle : function(){
            if(window.console&&console.log){
                console.log(arguments);
            }

            var e = Array.prototype.slice.call(arguments, 0);
            console.log(e)

        },
        login: function(){},
        error: function(){}
    }
})();