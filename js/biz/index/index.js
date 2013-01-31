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
    $('li.top-nav-tab > .top-nav-link').mouseover(function() {
        $(this).next('.top-nav-sub').fadeIn(200);
        return false;
    //        $(this).find('.top-nav-sub').animate({
    //            opacity: 0.5,
    //            height:'auto'
    //        },200);
    //$(this).find('.depth1').addClass('cleddr1');
    }).mouseout(function() {
        $('.top-nav-sub').fadeOut(100);
        return false;
    //$('.depth1').removeClass('cleddr1');
    });

    $("#slider img").each(function(){
        $(this).attr("src", $(this).attr("rel"));
    });

    //    $.fn.nivoSlider.defaults = {
    //        effect: 'random', // 过渡效果
    //        slices: 15, //effect为切片效果时的数量
    //        boxCols: 8, //effect为格子效果时的列
    //        boxRows: 4, //effect为格子效果时的行
    //        animSpeed: 500, //动画速度
    //        pauseTime: 3000, //图片切换速度
    //        startSlide: 0, //从第几张开始
    //        directionNav: true, //是否显示图片切换按钮(上/下页)
    //        directionNavHide: true, //是否鼠标经过才显示
    //        controlNav: true, // 显示序列导航
    //        controlNavThumbs: false, // 显示图片导航
    //        controlNavThumbsFromRel: false, // 使用img的rel属性作为缩略图地址
    //        controlNavThumbsSearch: '.jpg', // 查找特定字符串(controlNavThumbs必须为true)
    //        controlNavThumbsReplace: '_thumb.jpg', // 替换成这个字符(controlNavThumbs必须为true)
    //        keyboardNav: true, // 键盘控制（左右箭头）PS:建议把代码中的keypress换成keydown,因为在Chrome下有兼容问题.
    //        pauseOnHover: true, // 鼠标经过时暂停播放
    //        manualAdvance: false, // 是否手动播放(false为自动播放幻灯片)
    //        captionOpacity: 0.1, // 字幕透明度
    //        prevText: 'Prev',
    //        nextText: 'Next',
    //        randomStart: false, //是否随机图片开始
    //        beforeChange: function(){}, //动画开始前触发
    //        afterChange: function(){}, //动画结束后触发
    //        slideshowEnd: function(){}, // 本轮循环结束触发
    //        lastSlide: function(){}, // 最后一张图片播放结束触发
    //        afterLoad: function(){} // 加载完毕时触发
    //    };

    $('#slider').nivoSlider({
        effect: "fade",
        directionNav: false,
        directionNavHide: false
    });

});


