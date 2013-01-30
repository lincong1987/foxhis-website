
/*!
 * ICINFO AJAX PAGINATION
 *
 * this is a jQuery plugin for web pagination.
 *
 * author com.icinfo.tc.lc
 * date 2012-8-27 17:11:21
 */

$.pagerManager = {
    list: []
};

$.pagerManager.defaults = {
    debug: false,
    method: "GET",
    total: 0,
    page: 1,
    pageSize: 10,
    pageCount :0,
    url: "",
    root: "",
    record: "rowTotal",
    pageParmName: 'pagination.currentPage',
    pagesizeParmName: 'pagination.pageSize',
    dataType: "json",
    lang: {
        first: "首页",
        prev: "上页",
        next: "下页",
        last: "尾页",
        start: 1,
        end: 9
    },
    detail: "共{total}条数据 共{pageCount}页 现在显示第{page}页",
    resetPager: function(){
        this.total = 0;
        this.page = 1;
        this.pageCount = 0;
    },
    param: {},
    loadingMassage: "page loading...",
    render: {
        page: function(options){

            var ul = $('<ul class="pages"></ul>');

            ul.append(options.render.button(options.lang.first, options))
            .append(options.render.button(options.lang.prev, options));

            var start = options.lang.start,
            end = options.lang.end;

            if (options.page > 4) {
                start = options.page - 4;
                end = options.page + 4;
            }
            if (end > options.pageCount) {
                start = options.pageCount - 8;
                end = options.pageCount;
            }
            if (start < 1) {
                start = 1;
            }


            for (var _page = start; _page <= end; _page++) {
                var btn = $('<li>' + (_page) + '</li>');
                if(options.page == _page){
                    btn.addClass("current");
                }else{
                    btn.data("targetPage", _page);
                    btn.data("currentPage", options.page);
                    btn.bind("click", function(e){
                        options._onPageClick(e, options, btn);
                        });
                }
                ul.append(btn);
            }

            ul.append(options.render.button(options.lang.next, options))
            .append(options.render.button(options.lang.last, options));

            var totalCount = !options.total ? "" : options.total;
            var nowPage = options.pagecount == 0 ? 0 : options.page;

            ul.append(("<li class='detail'>"+options.detail+"</li>").replace(/{total}/g, totalCount).replace(/{pageCount}/g, options.pageCount).replace(/{page}/g, nowPage));
            return ul;
        },
        button: function(label, options){
            var btn = $('<li>' + label + '</li>');

            var targetPage = 1;

            // switch the label to
            switch (label) {
                case options.lang.first:
                    targetPage = 1;
                    break;
                case options.lang.prev:
                    targetPage = options.page - 1;
                    break;
                case options.lang.next:
                    targetPage = options.page + 1;
                    break;
                case options.lang.last:
                    targetPage = options.pageCount;
                    break;
            }

            btn.data("targetPage", targetPage);
            btn.data("currentPage", options.page);

            btn.bind("click", function(e){
                options._onPageClick(e, options, btn);
            });

            if (label == options.lang.first || label ==  options.lang.prev) {
                if(options.page <= 1){
                    btn.addClass('empty').unbind("click");
                }
            }else{
                if(options.page >= options.pageCount){
                    btn.addClass('empty').unbind("click");
                }
            }

            return btn;
        }
    },
    dataFilter: function(data, options){
        return data;
    },
    onPageClick: function(){return true},
    _onPageClick: function(e, options){

        if(!options.onPageClick(e, options)){
            return false;
        }

        var param = {};

        param[options.pageParmName] = $(e.target).data("targetPage");
        param[options.pagesizeParmName] = options.pageSize;

        options.param = $.extend({}, options.param, param);

        $.ajax({
            dataType: options.dataType,
            type: options.method,
            url: options.url,
            data: options.param,
            error: options.onError,
            success: function(data){
                options._onSuccess(data, options);
            }
        });

    },
    /**
     * @param {Object} data The json parseed response
     * @param {Object} options The pager setting
     */
    onSuccess: function(){},
    /**
     * @param {Object} data The json parseed response
     * @param {Object} options The pager setting
     */
    _onSuccess: function(data, options){
        // The data filter you need
        data = options.dataFilter(data, options);

        options.total = (data.pagination && data.pagination.total) || data.rowTotal || (data[options.record] && data[options.record].length) || 0
        options.pageCount = Math.ceil(options.total / options.pageSize);

        options.page = (data.pagination && data.pagination.currentPage) || options.page;

        if(options.total == 0){
            options.pageCount = 0;
            options.page = 1;
        }

        options.pager.empty().append(options.render.page(options));
        options.onSuccess(data, options);
    },
    onError: function(){}
};

(function($) {
    $.extend($.fn, {
        pager: function(settings){
            return this.each(function(index) {
                var options = $.extend({}, $.pagerManager.defaults, settings);
                $(this).data("options", options);
                options.pager = $(this);
                if(options.debug){console.log("pager init>>> pager DOM is ", options.pager)}
                // 如果配置中数据源地址为空或json名为空
                if(options.url == "" || options.root == ""){
                    if(options.debug){console.log("数据源地址为空或json名为空", options)}
                    return;
                }
                var idx = $(this).data("idx");
                if(!idx){
                    idx = "icinfo_pager_idx_" + index;
                    $(this).data("idx", idx);
                    $.pagerManager.list.push({
                        pager: options,
                        idx: idx
                    });
                }

                if(options.debug){console.log("pager init>>> pager idx is ", idx)}

                $(this).addClass("icinfo-pager").html(options.loadingMassage);

                var param = {};

                param[options.pageParmName] = options.param[options.pageParmName] || options.page;
                param[options.pagesizeParmName] = options.pageSize;

                options.param = $.extend({}, options.param, param);
                if(options.debug){console.log("pager init>>> pager param is ", options.param, $.param(options.param))}
                $.ajax({
                    dataType: options.dataType,
                    type: options.method,
                    url: options.url,
                    data: options.param,
                    error: options.onError,
                    success: function(data){
                        options._onSuccess(data, options);
                    }
                });
            });
        }
    });

})(jQuery);