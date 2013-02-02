<?php
include("/../../../include/function.php");
?>
<!--
 Copyright (c) 2012 Lincong All rights reserved.
 Mail lincong1987@gmail.com
 QQ 159257119
 This software is the confidential and proprietary information of Lincong,
 Inc. ("Confidential Information"). You shall not disclose such Confidential
 Information and shall use it only in accordance with the terms of the license
 agreement you entered into with Lincong.
 page: honor.php
-->
<html lang="zh-CN">
    <head>
        <?php include ('../../../include/meta.php'); ?>
        <title>企业荣誉</title>
        <link rel="stylesheet" href="<?php echo WEB_HOST; ?>css/base.css?v=<?php echo Q_VERSION; ?>"/>
        <link rel="stylesheet" href="<?php echo WEB_HOST; ?>css/common.css?v=<?php echo Q_VERSION; ?>"/>
        <link rel="stylesheet" href="<?php echo WEB_HOST; ?>css/biz/about/about.css?v=<?php echo Q_VERSION; ?>"/>
        <script type='text/javascript' src="<?php echo WEB_HOST; ?>js/jquery/jquery-1.8.3.min.js?v=<?php echo Q_VERSION; ?>"></script>
        <script type='text/javascript' src="<?php echo WEB_HOST; ?>js/icinfo/icinfo-1.0.0.min.js?v=<?php echo Q_VERSION; ?>"></script>
    </head>

    <body>
        <div class="wrapper">
            <?php include ('../../../include/header.php'); ?>
            <!-- 主体开始 -->
            <div class="modal-main clearfix">
                <div class="container">
                    <!-- 左右结构 -->
                    <table class="modal-l-r">
                        <colgroup>
                            <col style="width: 140px" />
                            <col />
                        </colgroup>
                        <tr>
                            <td class="modal-left" valign="top">
                                <div class="modal-left-menu">
                                    <div class="modal-left-menu-title">
                                        <h3><a class="modal-left-menu-title-link">关于我们</a></h3>
                                        <ul class="modal-left-menu-content">
                                            <li><a href="<?php echo WEB_HOST; ?>php/biz/about/introduction.php" target="_self">西软简介</a></li>
                                            <li><a href="<?php echo WEB_HOST; ?>php/biz/about/expansion.php" target="_self">发展概述</a></li>
                                            <li><a href="<?php echo WEB_HOST; ?>php/biz/about/honor.php" target="_self" class="hover">企业荣誉</a></li>
                                            <li><a href="<?php echo WEB_HOST; ?>php/biz/about/culture.php" target="_self">西软文化</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                            <td class="modal-left-right">
                                <!-- 企业荣誉 -->
                                <div class="modal-about-honor">
                                    <div class="modal-about-honor-banner">
                                        <img src="<?php echo WEB_HOST; ?>images/about/honor_banner.png" />
                                    </div>
                                    <div class="modal-about-honor-title"></div>
                                    <div class="modal-about-honor-content">
                                        <img src="<?php echo WEB_HOST; ?>images/about/honor_content.png" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- 主体结束 -->

                <?php include ('../../../include/footer.php'); ?>
            </div>
    </body>
</html>