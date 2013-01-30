<?php
include ("include/function.php");
?>
<!--
 Copyright (c) 2012 Lincong All rights reserved.
 Mail lincong1987@gmail.com
 QQ 159257119
 This software is the confidential and proprietary information of Lincong,
 Inc. ("Confidential Information"). You shall not disclose such Confidential
 Information and shall use it only in accordance with the terms of the license
 agreement you entered into with Lincong.
-->

<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <?php include ('/include/meta.php'); ?>
        <title></title>
        <link rel="stylesheet" href="/css/base.css?v=<?php echo Q_VERSION; ?>"/>
        <link rel="stylesheet" href="/css/common.css?v=<?php echo Q_VERSION; ?>"/>
        <link rel="stylesheet" href="/css/index.css?v=<?php echo Q_VERSION; ?>"/>
        <script src="js/jquery/jquery-1.8.3.min.js?v=<?php echo Q_VERSION; ?>"></script>
        <script src="js/icinfo/icinfo-1.0.0.min.js?v=<?php echo Q_VERSION; ?>"></script>
        <script src="js/nivo-slider/nivo.slider-3.2.min.js?v=<?php echo Q_VERSION; ?>"></script>
        <script>
            $(function(){
                $('#wrap-nav .menu > li').hover(function() {
                    $(this).find('.children').animate({ opacity: 0.5, height:'auto' },200);
                    $(this).find('.depth1').addClass('cleddr1');
                }, function() {
                    $('.children').stop(true,true).hide();
                    $('.depth1').removeClass('cleddr1');
                }
            ).slice(-1,-1).find('.children').addClass('sleft');

            });
        </script>
    </head>

    <body>
        <div class="wrapper">
            <?php include ('/include/header.php'); ?>
            <div class="modal-main">
                <div class="container">

asdasd




                </div>
            </div>
            <?php include ('/include/footer.php'); ?>
        </div>
    </body>
</html>
