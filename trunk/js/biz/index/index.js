/*
 *  Copyright (c) 2012 Lincong All rights reserved.
 *  Mail lincong1987@gmail.com
 *  QQ 159257119
 *  This software is the confidential and proprietary information of Lincong,
 *  Inc. ("Confidential Information"). You shall not disclose such Confidential
 *  Information and shall use it only in accordance with the terms of the license
 *  agreement you entered into with Lincong.
 */

var timer;
$(function(){

    $(".top-nav-tab").mouseover(function(){
        clearTimeout(timer);
        $(".top-nav-link").removeClass("top-nav-link-hover");
        $(".top-nav-sub").css('visibility', 'hidden');

        $(this).find(".top-nav-link").addClass("top-nav-link-hover");
        $('ul:first',this).css({
            visibility: 'visible',
            opacity: 0.7
        });
    }).mouseout(function(){
        var me = this;
        clearTimeout(timer);
        timer = setTimeout(function(){
            $(me).find(".top-nav-link").removeClass("top-nav-link-hover");
            $('ul:first',me).css('visibility', 'hidden');
        }, 500);
    });

    $(".top-nav-sub").mouseover(function(){
        clearTimeout(timer);
    });

    $("#modal-index-slider").slides({
        effect: 'fade',
        preloadImage: 'images/loading.gif',
        paginationClass: "slider-control"
    });

});


