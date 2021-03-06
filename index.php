<?php
include ("/include/function.php");
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
        <?php include ('include/meta.php'); ?>
        <title>首页</title>
        <link rel="stylesheet" href="<?php echo WEB_HOST; ?>css/base.css?v=<?php echo Q_VERSION; ?>"/>
        <link rel="stylesheet" href="<?php echo WEB_HOST; ?>css/common.css?v=<?php echo Q_VERSION; ?>"/>
        <link rel="stylesheet" href="<?php echo WEB_HOST; ?>css/biz/index/index.css?v=<?php echo Q_VERSION; ?>"/>
        <script type='text/javascript' src="<?php echo WEB_HOST; ?>js/jquery/jquery-1.8.3.min.js?v=<?php echo Q_VERSION; ?>"></script>
        <script type='text/javascript' src="<?php echo WEB_HOST; ?>js/icinfo/icinfo-1.0.0.min.js?v=<?php echo Q_VERSION; ?>"></script>
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
                            <div><img src="images/index/index_slider_banner_01.png" alt="提示" title="提示" /></div>
                            <div><img src="images/index/index_slider_banner_02.png" alt="提示" title="提示" /></div>
                            <div><img src="images/index/index_slider_banner_03.png" alt="提示" title="提示" /></div>
                        </div>
                    </div>

                    <!-- banner -->
                    <div id="modal-index-banner" class="clearfix">
                        <ul>
                            <li><a href="/" title="提示"><img src="images/index/index_banner_01.png" /></a></li>
                            <li><a href="/" title="提示"><img src="images/index/index_banner_02.png" /></a></li>
                            <li><a href="/" title="提示"><img src="images/index/index_banner_03.png" /></a></li>
                        </ul>
                    </div>

                    <!-- 行业资讯 -->
                    <div class="modal-index-news clearfix">
                        <div id="modal-index-company-news" class="modal-index-news-left">
                            <div id="modal-index-company-news-title"></div>
                            <div id="modal-index-company-news-content">
                                <ul>
                                    <li><a>博进取精神，展飒爽英姿----2012西软团队活动之四  （11-29）</a></li>
                                    <li><a>仙境逍遥游--2012西软团队活动之一  （05-21）</a></li>
                                    <li><a>国庆放假通告及售后服务安排  （09-29）</a></li>
                                </ul>
                            </div>
                            <div id="modal-index-company-news-more"><a href="#"><img src="images/index/index_more_01.png" /></a></div>
                        </div>
                        <div id="modal-index-login" class="modal-index-news-right">
                            <div id="modal-index-login-title"></div>
                            <div id="modal-index-login-content">
                                <div id="login-input-warp-username" class="login-input-warp">
                                    <input type="text" id="" class="login_input" />
                                </div>
                                <div id="login-input-warp-password" class="login-input-warp">
                                    <input type="password" id="" class="login_input" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-index-news-vline"></div>

                    <!-- 行业资讯 -->
                    <div class="modal-index-news clearfix">
                        <div id="modal-index-industry-news" class="modal-index-news-left">
                            <div id="modal-index-industry-news-title"></div>
                            <div id="modal-index-industry-news-content">
                                <ul>
                                    <li><a>2013年中国在线旅游业十大趋势（01-08）</a></li>
                                    <li><a>2012年中国在线旅游业八大趋势（02-13）</a></li>
                                    <li><a>仙境逍遥游--2012西软团队活动之一（05-21）</a></li>
                                </ul>
                            </div>
                            <div id="modal-index-industry-news-more"><a href="#"><img src="images/index/index_more_02.png" /></a></div>
                        </div>

                        <div id="modal-index-contactus" class="modal-index-news-right">
                            <img src="images/index/index_24h.png" />

                        </div>
                    </div>
                </div>
            </div>
            <!-- 主体结束 -->

            <?php include ('include/footer.php'); ?>
        </div>
        <script type='text/javascript' src="<?php echo WEB_HOST; ?>js/slides/slides.jquery.js?v=<?php echo Q_VERSION; ?>" ></script>
        <script type='text/javascript' src="<?php echo WEB_HOST; ?>js/biz/index/index.js?v=<?php echo Q_VERSION; ?>" ></script>
    </body>
</html>
