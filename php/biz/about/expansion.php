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
        <title>发展概述</title>
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
                    <div class="modal-about-expansion-banner">
                        <img src="<?php echo WEB_HOST; ?>images/about/expansion_banner.png" />
                    </div>
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
                                            <li><a href="<?php echo WEB_HOST; ?>php/biz/about/expansion.php" target="_self" class="hover">发展概述</a></li>
                                            <li><a href="<?php echo WEB_HOST; ?>php/biz/about/honor.php" target="_self">企业荣誉</a></li>
                                            <li><a href="<?php echo WEB_HOST; ?>php/biz/about/culture.php" target="_self">西软文化</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                            <td class="modal-left-right">
                                <!-- 发展概述 -->
                                <div class="modal-about-expansion">
                                    <div class="modal-about-expansion-title"></div>
                                    <div class="modal-about-expansion-content">
                                        <div class="modal-tab">
                                            <div class="modal-tab-title clearfix">
                                                <ul>
                                                    <li><a>1988-1992</a></li>
                                                    <li><a>1993-1997</a></li>
                                                    <li><a>1998-2002</a></li>
                                                    <li><a>2003-2008</a></li>
                                                </ul>
                                            </div>
                                            <div class="modal-tab-content-top">
                                                <img src="<?php echo WEB_HOST; ?>images/about/expansion_tab_content_top.png" />
                                            </div>
                                            <div class="modal-tab-content-warp">
                                                <div class="modal-tab-content">内容1</div>
                                                <div class="modal-tab-content">内容2</div>
                                                <div class="modal-tab-content">内容3</div>
                                                <div class="modal-tab-content">内容4</div>
                                            </div>
                                            <div class="modal-tab-bottom">
                                                <img src="<?php echo WEB_HOST; ?>images/about/expansion_tab_bottom.png" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <!-- 主体结束 -->
            <?php include ('../../../include/footer.php'); ?>
        </div>
        <script type="text/javascript">
            $(function(){
                $(".modal-tab-title>ul>li>a").click(function(){
                    var index = $(".modal-tab-title>ul>li>a").index(this);
                    console.log(index)
                    $(".modal-tab-content").hide(0);
                    $(".modal-tab-title>ul>li>a").removeClass("hover");
                    $(".modal-tab-content").eq(index).show(0);
                    $(this).addClass("hover");
                });
                $(".modal-tab-title>ul>li>a:eq(0)").click();
            });
        </script>
    </body>
</html>