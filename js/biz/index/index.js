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

    $(".top-nav-sub").mouseover(function(){
        clearTimeout(timer);
    });

    $("#modal-index-slider").slides({
        effect: 'fade',
        fadeSpeed: 500,
        play: 3000,
        hoverPause: true,
        paginationClass: "slider-control"
    });

});


