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
<html lang="zh-CN" xmlns:wb=“http://open.weibo.com/wb”>
    <head>
        <?php include ('include/meta.php'); ?>
        <title>首页</title>
        <link rel="stylesheet" href="css/base.css?v=<?php echo Q_VERSION; ?>"/>
        <link rel="stylesheet" href="css/common.css?v=<?php echo Q_VERSION; ?>"/>
        <link rel="stylesheet" href="css/biz/index/index.css?v=<?php echo Q_VERSION; ?>"/>

    </head>

    <body>
        <div class="wrapper">
            <?php include ('include/header.php'); ?>
            <!-- 主体开始 -->
            <div class="modal-main clearfix">
                <div class="container">
                    <!-- 主页焦点图 -->
                    <div id="modal-index-slider" class="clearfix">
                        <div class="slides_container">
                            <div><img src="images/index/index_slider_banner_01.png" /></div>
                            <div><img src="images/index/index_slider_banner_02.png" /></div>
                            <div><img src="images/index/index_slider_banner_03.png" /></div>
                        </div>
                    </div>

                    <!-- banner -->
                    <div id="modal-index-banner" class="clearfix">
                        <ul>
                            <li><a href="/"><img src="images/index/index_banner_01.png" /></a></li>
                            <li><a href="/"><img src="images/index/index_banner_02.png" /></a></li>
                            <li><a href="/"><img src="images/index/index_banner_03.png" /></a></li>
                        </ul>
                    </div>

                    <!-- 行业资讯 -->
                    <div class="modal-index-news">
                        <div id="modal-index-company-news" class="modal-index-news-left"></div>
                        <div id="modal-index-login" class="modal-index-news-right"></div>
                    </div>

                    <!-- 行业资讯 -->
                    <div class="modal-index-news">
                        <div id="modal-index-industry-news" class="modal-index-news-left"></div>
                        <div id="modal-index-contactus" class="modal-index-news-right"></div>
                    </div>
                </div>
            </div>
            <!-- 主体结束 -->

            <?php include ('include/footer.php'); ?>
        </div>

        <script type='text/javascript' src="js/jquery/jquery-1.8.3.min.js?v=<?php echo Q_VERSION; ?>"></script>
        <script type='text/javascript' src="js/icinfo/icinfo-1.0.0.min.js?v=<?php echo Q_VERSION; ?>"></script>
        <script type='text/javascript' src="js/slides/slides.jquery.js?v=<?php echo Q_VERSION; ?>" ></script>
        <script type='text/javascript' src="js/biz/index/index.js?v=<?php echo Q_VERSION; ?>" ></script>
        <script type='text/javascript' src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js" charset="utf-8"></script>
    </body>
</html>
