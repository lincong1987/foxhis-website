/*
 *  Copyright (c) 2012 Lincong All rights reserved.
 *  Mail lincong1987@gmail.com
 *  QQ 159257119
 *  This software is the confidential and proprietary information of Lincong,
 *  Inc. ("Confidential Information"). You shall not disclose such Confidential
 *  Information and shall use it only in accordance with the terms of the license
 *  agreement you entered into with Lincong.
 */
$(function(){
    $('.top-nav-tab').mouseover(function() {
        $(this).find('.top-nav-sub').slideDown(300);
        return;
    }).mouseover(function(){
        $('.top-nav-sub').slideUp(100);
    });

    $("#slider img").each(function(){
        $(this).attr("src", $(this).attr("rel"));
    });

    $("#modal-index-slider").slides({
        effect: 'fade',
        preloadImage: 'images/loading.gif',
        paginationClass: "slider-control"
    });

});


